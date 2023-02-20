import React from "react";
import { useOne, HttpError } from "@pankod/refine-core";
import { useTable, List, Table } from "@pankod/refine-antd";
import { useRouter } from 'next/router';
//import "@google/model-viewer";

export const ModelviewerXR: React.FC<IResourceComponentsProps> = () => {
  const API_URL = "https://api.fake-rest.refine.dev";

/*
  const router = useRouter();

  const { data, isLoading, isError } = useOne({
      resource: "modelviewer-experiences",
      id: router.query.id,
  });

  console.log("data", data, isLoading, isError);
*/

  return (
    <div>
      <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
	Experience

	<model-viewer alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum" src="https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb" ar environment-image="shared-assets/environments/moon_1k.hdr" poster="shared-assets/models/NeilArmstrong.webp" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>

    </div>
  )
}

export default ModelviewerXR;
