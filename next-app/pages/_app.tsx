import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine-antd/dist/reset.css";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";

import { AssetCreate } from "../components/assets/create";
import { AssetList } from "../components/assets/list";
import { AssetEdit } from "../components/assets/edit";
import { AssetShow } from "../components/assets/show";

import { ModelviewerExperienceList } from "../components/modelviewer-experiences/list";
import { ModelviewerExperienceShow } from "../components/modelviewer-experiences/show";
import { ModelviewerExperienceCreate } from "../components/modelviewer-experiences/create";
import { ModelviewerExperienceEdit } from "../components/modelviewer-experiences/edit";

import { AframeExperienceList } from "../components/aframe-experiences/list";
import { AframeExperienceShow } from "../components/aframe-experiences/show";
import { AframeExperienceCreate } from "../components/aframe-experiences/create";
import { AframeExperienceEdit } from "../components/aframe-experiences/edit";

import { ImageTrackExperienceList } from "../components/imagetrack-experiences/list";
import { ImageTrackExperienceShow } from "../components/imagetrack-experiences/show";
import { ImageTrackExperienceCreate } from "../components/imagetrack-experiences/create";
import { ImageTrackExperienceEdit } from "../components/imagetrack-experiences/edit";

//const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(pageProps.API_URL)}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      options={{
	reactQuery: {
	  devtoolConfig: false
	}
      }}
      catchAll={<ErrorComponent />}
      resources={[
        {
          name: "assets",
          //list: AntdInferencer,
	  list: AssetList,
          //edit: AntdInferencer,
          edit: AssetEdit,
          //show: AntdInferencer,
          show: AssetShow,
          //create: AntdInferencer,
          create: AssetCreate,
          canDelete: true,
        },
        {
          name: "modelviewer-experiences",
          list: ModelviewerExperienceList,
          edit: ModelviewerExperienceEdit,
          show: ModelviewerExperienceShow,
          create: ModelviewerExperienceCreate,
          canDelete: true,
	  options: {label: "Markerless AR"},
        },
        {
          name: "imagetrack-experiences",
          list: ImageTrackExperienceList,
          edit: ImageTrackExperienceEdit,
          show: ImageTrackExperienceShow,
          create: ImageTrackExperienceCreate,
          canDelete: true,
	  options: {label: "ImageTrack AR"},
        },
        {
          name: "aframe-experiences",
          list: AframeExperienceList,
          edit: AframeExperienceEdit,
          show: AframeExperienceShow,
          create: AframeExperienceCreate,
          canDelete: true,
	  options: {label: "VR"},
        }
      ]}
    >
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
