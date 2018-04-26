import { Configuration } from "webpack";
import * as path from "path";

const config: Configuration = {
  entry: "./src/scripts/client/index.ts",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/js")
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