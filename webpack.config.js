'use strict';

const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const commonConfig = merge([
  
  parts.loadCSS(),

  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  {
    devtool: 'source-map',
  },

  parts.devServer({
    // Customize host/port here if nedeed
    host: process.env.HOST,
    port: process.env.PORT,
  }),

  {
    plugins: [
      new webpack.WatchIgnorePlugin([
        path.join(__dirname, 'node_modules')
      ]),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};