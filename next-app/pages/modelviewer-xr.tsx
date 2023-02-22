import React from "react";
import { GetServerSideProps } from "next";
import { useOne, HttpError } from "@pankod/refine-core";
import { useExternalScript } from "../hooks/use-external-script";
import dataProvider from "@pankod/refine-simple-rest";
import styles from "../styles/modelviewer.module.css";
console.log("styles", styles);

export const ModelviewerXR: React.FC<IResourceComponentsProps> = ({assetData, experienceData}) => {
  const scriptState = useExternalScript("https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js");

  if (scriptState != "ready") {
    return <div>Loading...</div>
  }

  const modelURL = assetData.model[0].response.url;

  return (
    <div style={{width: "100vw", height: "90vh"}}>
      <model-viewer
	style={{width: "100%", height: "100%"}}
	ar
	autoplay
	scale="0.2 0.2 0.2"
	camera-controls
	touch-action="pan-y"
	src={modelURL}
      >
	<button className={styles.hotspot} slot="hotspot-hand" data-position="0.12 0 0" data-normal="0 0 0 ">
	  <div className={styles.annotation}>right leg</div>
	</button>
      </model-viewer>
    </div>
  )

  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <model-viewer style={{width: "100%", height: "100%"}} alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum" src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb" ar environment-image="https://modelviewer.dev/shared-assets/environments/moon_1k.hdr" poster="https://modelviewer.dev/shared-assets/models/NeilArmstrong.webp" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
    </div>
  )

  //if (!data) return null ;

/*
  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
	<model-viewer style={{display: "inline-block", width: "100%", height: "100%"}} alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum" src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb" ar environment-image="https://modelviewer.dev/shared-assets/environments/moon_1k.hdr" poster="https://modelviewer.dev/shared-assets/models/NeilArmstrong.webp" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
    </div>
  )
*/
}

export default ModelviewerXR;

export const getServerSideProps: GetServerSideProps = async (context) => {

//console.log("context", context);
  const experienceData = (await dataProvider(process.env.API_URL).getOne({
      resource: "modelviewer-experiences",
      id: 1
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
