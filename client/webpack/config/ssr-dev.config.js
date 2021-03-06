import baseConfig from "./ssr-base.config";
import merge from "webpack-merge";
import nodeExternals from "webpack-node-externals";

const config = merge(baseConfig, {
  devtool: "source-map",

  // With the SSR rescue, we don't want to recompile all the node modules every time
  // something changes, so it's faster to leave those as dynamic requires.
  externals: [nodeExternals({ modulesFromFile: true })]
});

export default config;
