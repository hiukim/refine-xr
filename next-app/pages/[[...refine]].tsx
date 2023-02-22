import { GetServerSideProps } from "next";
import {
  NextRouteComponent /*, handleRefineParams */,
} from "@pankod/refine-nextjs-router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { resource, action, id } = handleRefineParams(context.params?.refine);
  return {
    props: {
      API_URL: process.env.API_URL,
      XR_SERVE_URL: process.env.XR_SERVE_URL
    },
  };
};

export default NextRouteComponent;

/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `NextRouteComponent` like the following:
 *
 * export default NextRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
