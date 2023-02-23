import React from "react";
import { GetServerSideProps } from "next";
import { useOne, HttpError } from "@pankod/refine-core";
import { useExternalScript } from "../hooks/use-external-script";
import dataProvider from "@pankod/refine-simple-rest";
import styles from "../styles/modelviewer.module.css";

export const ModelviewerXR: React.FC<IResourceComponentsProps> = ({assetData, experienceData}) => {
  const scriptState = useExternalScript("https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js");

  if (scriptState != "ready") {
    return <div>Loading...</div>
  }

  const modelURL = assetData.model[0].response.url;
  const scale = experienceData.scale? experienceData.scale: 1;

  return (
    <div style={{width: "100vw", height: "90vh"}}>
      <model-viewer
	style={{width: "100%", height: "100%"}}
	ar
	autoplay
	scale={scale+" "+scale+" "+scale}
	camera-controls
	touch-action="pan-y"
	src={modelURL}
      >
      </model-viewer>
    </div>
  )
}

export default ModelviewerXR;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const experienceData = (await dataProvider(process.env.API_URL).getOne({
      resource: "modelviewer-experiences",
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
