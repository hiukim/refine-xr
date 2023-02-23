import React, {useEffect, useMemo, useRef} from "react";
import { GetServerSideProps } from "next";
import { useOne, HttpError } from "@pankod/refine-core";
import { useExternalScript } from "../hooks/use-external-script";
import dataProvider from "@pankod/refine-simple-rest";
import styles from "../styles/modelviewer.module.css";
import {loadGLTF, loadImage} from "../libs/loaders";

const compileTarget = async({container, targetImageURL, modelURL}) => {
  const compiler = new window.MINDAR.IMAGE.Compiler();

  const targetImage = await loadImage(targetImageURL);

  const dataList = await compiler.compileImageTargets([targetImage], (progress) => {
    console.log("compile progress", progress);
  });
  const exportedBuffer = await compiler.exportData();

  const blob = new Blob([exportedBuffer]);
  const mindSrc = URL.createObjectURL(blob);

  await buildScene({container, mindSrc, modelURL});
}

const buildScene = async ({container, modelURL, mindSrc}) => {
  const {THREE} = window.MINDAR.IMAGE;

  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container,
    imageTargetSrc: mindSrc,
  });

  const { renderer, scene, camera } = mindarThree;

  const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
  scene.add(light);

  const m = await loadGLTF(modelURL);
  m.scene.scale.set(0.2, 0.2, 0.2);
  //m.scene.position.set(0, -0.4, 0);

  const anchor = mindarThree.addAnchor(0);
  anchor.group.add(m.scene);

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

export const ImageTrackXR: React.FC<IResourceComponentsProps> = ({assetData, experienceData}) => {
  const containerRef = useRef();

  const scriptState = useExternalScript("https://cdn.jsdelivr.net/npm/mind-ar@1.1.5/dist/mindar-image.prod.js");
  const script2State = useExternalScript("https://cdn.jsdelivr.net/npm/mind-ar@1.1.5/dist/mindar-image-three.prod.js");

  const modelURL = assetData.model[0].response.url;
  const targetImageURL = experienceData.targetImage[0].response.url; 

  const scriptReady = useMemo(() => {
    return scriptState === 'ready' && script2State === 'ready';
  }, [scriptState, script2State]);

  useEffect(() => {
    if (scriptReady) {
	compileTarget({container: containerRef.current, targetImageURL, modelURL});
    }
  }, [scriptReady]);

  return (
    <div style={{width: "100vw", height: "100vh"}} ref={containerRef}>
      {!scriptReady && <div>Loading...</div>}
    </div>
  )
}

export default ImageTrackXR;

export const getServerSideProps: GetServerSideProps = async (context) => {

console.log("context", context);
  const experienceData = (await dataProvider(process.env.API_URL).getOne({
      resource: "imagetrack-experiences",
      id: context.query.id 
  })).data;
  const assetData = (await dataProvider(process.env.API_URL).getOne({
      resource: "assets",
      id: experienceData.asset.id 
  })).data;

  return {
    props: {
      experienceData,
      assetData
    }
  }
}

