'use strict';

const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  devServer: {
    // stats: 'normal',

    watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolen too)
      poll: 1000,
    },

    host: process.env.HOST,
    port: process.env.PORT,
    
    open: false,
    
    overlay: true,
  },

  plugins: [
    // Ignore node_modules so CPU usage with poll
    // watching drops significantly.
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, 'node_modules')
    ]),
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
    new ErrorOverlayPlugin(),
  ],
};