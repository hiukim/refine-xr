import React from "react";
import { useOne, HttpError } from "@pankod/refine-core";
import { useTable, List, Table } from "@pankod/refine-antd";
import { useRouter } from 'next/router';
import { useExternalScript } from "../../hooks/use-external-script";
//import "@google/model-viewer";
//
interface IProduct {
  id: number;
}

export const ModelviewerXR: React.FC<IResourceComponentsProps> = () => {
  //const API_URL = "https://api.fake-rest.refine.dev";
  const scriptState = useExternalScript("https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js");

  const router = useRouter();

console.log("router query id: ", router.query.id);

  const { data, isLoading, isError } = useOne<IProduct, HttpError>({
      resource: "assets",
      id: router.query.id,
  });

  console.log("data", data, isLoading, isError);

  if (scriptState != "ready") {
    return <div>Loading...</div>
  }

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
