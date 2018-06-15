'use strict';

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // stats: 'errors-only',
    host, // Defaults to 'localhost'
    port, // Defaults to 8080
    open: false,
    overlay: true,
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