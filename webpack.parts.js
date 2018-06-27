'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');


exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // stats: 'errors-only',
    
    host, // Defaults to 'localhost'
    port, // Defaults to 8080

    open: false,
    overlay: true,
    
    // Hot Module Replacement
    hot: true,
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        include,
        exclude,

        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.(sc|sa|c)ss$/,
          include,
          exclude,

          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()],
  },
});