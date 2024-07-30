const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const JATE = require('./manifest.json')

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },

    module: {
      rules: [
        { test: /\.txt$/, use: 'raw-loader' },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
