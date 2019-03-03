const webpack = require('webpack');

const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    disableHostCheck: true,
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
