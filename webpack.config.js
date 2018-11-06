const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const babelConfig = require("./babel.config");

const app = process.env.TRABENET_APP || "bundle";

let cssModulesIndex = 0;
const cssModulesIndexes = {};

module.exports = {
  entry: "./main.jsx",

  output: {
    filename: `${app}.js`,
    path: path.resolve(__dirname, "..", "./dist")
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelConfig
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              getLocalIdent: (_, localIdentName, localName, options) => {
                const index = (cssModulesIndexes[localName] =
                  cssModulesIndexes[localName] || cssModulesIndex++);
                return `${localName}$${index}`;
              }
            }
          }
        ]
      }
    ]
  },

  devtool: "cheap-eval-source-map",

  resolve: {
    mainFields: ["browser", "main", "module"],
    extensions: [".js", ".jsx", ".json"],
    symlinks: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dev app</title>
</head>
<body>
  <div id="app"/></div>
  <script src="bundle.js"></script>
</body>
</html>
    `
    })
  ],

  devServer: {
    port: process.env.PORT || 4000,
    overlay: {
      errors: true,
      warnings: true
    },
    progress: true,
    compress: false,
    historyApiFallback: true,
    hot: true,
    stats: {
      assets: true,
      colors: true,
      modules: false
    }
  }
};
