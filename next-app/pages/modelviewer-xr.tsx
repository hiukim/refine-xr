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
