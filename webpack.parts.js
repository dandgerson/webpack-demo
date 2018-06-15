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