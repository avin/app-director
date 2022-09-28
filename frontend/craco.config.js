const path = require('path');
const craco = require('@craco/craco');
const _ = require('lodash');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      _.set(
        webpackConfig,
        ['resolve', 'alias', '@'],
        path.resolve(__dirname, `${paths.appSrc}/`),
      );

      const htmlWebpackPluginInstance = webpackConfig.plugins.find(
        (webpackPlugin) => webpackPlugin instanceof HtmlWebpackPlugin,
      );
      if (htmlWebpackPluginInstance) {
        htmlWebpackPluginInstance.userOptions.inject = false;
      }

      return webpackConfig;
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    devServerConfig.https = {
      key: fs.readFileSync(
        '../node_modules/localhost-certs/files/server.key',
        'utf8',
      ),
      cert: fs.readFileSync(
        '../node_modules/localhost-certs/files/server.crt',
        'utf8',
      ),
    };
    return devServerConfig;
  },
};
