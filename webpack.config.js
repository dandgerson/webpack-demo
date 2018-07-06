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
  build: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
  parts.loadJavaScript({ include: PATHS.app }),

  parts.generateSourceMaps({ type: 'source-map' }),

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

  {
    optimization: {
      splitChunks: {
        chunks: 'initial',
      },
    },
  },

  parts.clean(PATHS.build),

  parts.minifyJavaScript(),

  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // safe: true,
      parser: require('postcss-safe-parser'),
    },
  }),

  parts.attachRevision(),
]);

const developmentConfig = merge([

  parts.loadCSS(),

  parts.loadImages(),

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