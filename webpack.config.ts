import { Configuration } from "webpack";
import * as path from "path";

const config: Configuration = {
  entry: [
    "babel-polyfill",
    "./src/scripts/client/index.ts"
  ],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/client")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ],
  }
};

export default config;