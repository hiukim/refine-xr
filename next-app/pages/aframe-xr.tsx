import React from "react";
import { GetServerSideProps } from "next";
import { useOne, HttpError } from "@pankod/refine-core";
import { useExternalScript } from "../hooks/use-external-script";
import dataProvider from "@pankod/refine-simple-rest";
import styles from "../styles/modelviewer.module.css";

export const AframeXR: React.FC<IResourceComponentsProps> = ({assetData, experienceData}) => {
  const scriptState = useExternalScript("https://aframe.io/releases/1.4.0/aframe.min.js");

console.log("experienceData", experienceData);
  const modelURL = assetData.model[0].response.url;
  //console.log("data", assetData, experienceData);
  //const modelURL = "https://cdn.glitch.com/324a5290-5aa7-4efc-92d6-ae0736433b12%2Fspinosaurus.glb";
  //
  const scale = experienceData.scale? experienceData.scale: 1;

  if (scriptState != "ready") {
    return <div>Loading...</div>
  }

  return (
    <div style={{width: "100%", height: "100%", position: "absolute"}}>
      <a-scene renderer="antialias: true;" vr-mode-ui="enabled: true">
	<a-sky color={experienceData.skyColor || "#FFFFFF"}></a-sky>

	<a-entity position="0 0 -5" rotation="0 0 0" scale={scale+" "+scale+" "+scale}
	    gltf-model={modelURL}>
	</a-entity>
      </a-scene>
    </div>
  )
}

export default AframeXR;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const experienceData = (await dataProvider(process.env.API_URL).getOne({
      resource: "aframe-experiences",
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
