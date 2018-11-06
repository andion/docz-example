import babelConfig from "./babel.config";

let cssModulesIndex = 0;
let cssModulesIndexes = {};

export default {
  port: process.env.PORT || 5000,
  dest: "../docker/dist/docs",

  modifyBundlerConfig: (config, dev, args) => ({
    ...config,

    module: {
      ...config.module,
      rules: [
        {
          test: /.+\.js$/,
          use: {
            loader: "babel-loader",
            options: babelConfig
          }
        },
        {
          test: /.+\.jsx$/,
          use: {
            loader: "babel-loader",
            options: {
              ...babelConfig,
              plugins: [...(babelConfig.plugins || []), "react-docgen"]
            }
          }
        },
        {
          test: /.+\.css?$/,
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
        },
        ...config.module.rules
      ]
    },

    resolve: {
      ...config.resolve,
      symlinks: false
    }
  })
};
