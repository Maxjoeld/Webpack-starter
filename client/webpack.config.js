let path = require('path');
const { join, resolve } = require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
    // 'webpack-dev-server/client?http://' + require("os").hostname() + ':3000/',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-react",
            '@babel/preset-env',
            {
              plugins: [
                '@babel/plugin-proposal-class-properties',
                "@babel/plugin-transform-runtime"
              ]
            }
          ]
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
        ]
      },
      { test: /\.s?css$/, use: ["style-loader", "css-loader", "sass-loader"] },
    ]
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "src/index.html")
    })
  ]
};