const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public/js"),
  },
  resolve: {
    extensions: [`.js`, `.ts`],
    alias: {
      "~": path.resolve(__dirname, "src/"),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    port: 1337,
    watchContentBase: true,
  },
  devtool: "source-map",
};
