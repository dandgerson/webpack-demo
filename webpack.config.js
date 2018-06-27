'use strict';

const path = require('path');

// Tools
const merge = require('webpack-merge');

// Plugins
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Configuration parts
const parts = require('./webpack.parts');

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', 'sass-loader'],
  })
]);

const developmentConfig = merge([

  parts.loadCSS(),

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