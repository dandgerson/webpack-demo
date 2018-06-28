'use strict';

const path = require('path');
const glob = require('glob');

// Tools
const merge = require('webpack-merge');

// Plugins
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Configuration parts
const parts = require('./webpack.parts');

// for purifyCSS, loadJavaScript
const PATHS = {
  app: path.join(__dirname, 'src'),
};

const commonConfig = merge([
  parts.loadJavaScript({ include: PATHS.app }),

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
    use: ['css-loader', parts.autoprefix(), 'sass-loader'],
  }),

  // plugin should be applied after MiniCssExtractPlugin
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),

  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),

]);

const developmentConfig = merge([

  parts.loadCSS(),

  parts.loadImages(),

  {
    devtool: 'source-map',
    // devtool: false,
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