const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // cleans dist folder on build
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // handles CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo App",   // this will become the <title>
      templateContent: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Todo App</title>
        </head>
        <body>
          <div id="app">
            <div id="projects"></div>
            <div id="todos"></div>
          </div>
        </body>
        </html>
      `,
    }),
  ],
};