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

import { AssetCreate } from "./assets/asset-create";
import { AssetList } from "./assets/list";
import { AssetEdit } from "./assets/edit";
import { AssetShow } from "./assets/show";

import { ModelviewerExperienceList } from "./modelviewer-experiences/list";
import { ModelviewerXR } from "./modelviewer-experiences/xr";

//const API_URL = "https://api.fake-rest.refine.dev";
const API_URL = "http://localhost:4000";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      //routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={{
	  ...routerProvider,
	  routes: [
	      {
		  element: <ModelviewerXR />,
		  path: "/modelviewer-xr/1",
	      },
	  ],
      }}
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
          edit: AntdInferencer,
          show: AntdInferencer,
          create: AntdInferencer,
          canDelete: true,
        }
      ]}
    >
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
