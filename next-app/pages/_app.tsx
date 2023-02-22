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
import { ModelviewerExperienceShow } from "./modelviewer-experiences/show";
import { ModelviewerXR } from "./modelviewer-experiences/xr";

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
          edit: AntdInferencer,
          show: ModelviewerExperienceShow,
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
