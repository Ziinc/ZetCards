var path = require("path");
const shared = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.(tsx|ts)?$/, use: ["ts-loader"], exclude: /node_modules/ }
    ]
  }
  //   https://stackoverflow.com/questions/61225751/how-to-compile-a-fable-vs-code-plugin-with-webpack
};
const extConfig = {
  ...shared,
  target: "node",
  entry: {
    ext: "./lib/extension.ts"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "../[resource-path]"
  },
  externals: {
    vscode: "commonjs vscode"
  }
  //…
};

const clientConfig = {
  ...shared,
  target: "web", // <=== can be omitted as default is 'web'
  entry: {
    webview: "./lib/App.tsx"
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
  //…
};

module.exports = [extConfig, clientConfig];
