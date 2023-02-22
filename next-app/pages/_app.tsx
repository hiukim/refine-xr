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
