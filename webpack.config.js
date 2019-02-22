let path = require('path');
const { join, resolve } = require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin');
// @babel/preset-env", want to be able to support older browsers
// so babel would be responsible to transfrom es classes to old es5 syntax
// "@babel/preset-react" // transfroms jsx into normal javascript

module.exports = {
    entry: './app/entry.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js'
		},
		module: {
			rules: [
				// run the babel loader on any js file that is in our application
				// the reg expression searches for all js files 
				// cs loader changes <href url(./backrdoung.jpg) to require ('image')
				// style-loader takes css being reuired and applied the styles directly to that page
				{ test: /\.(js)$/, use: 'babel-loader'},
				{ test: /\.s?css$/, 
					use: ['style-loader', 'css-loader', "sass-loader"]}
			]
		},
		mode: 'development',
		plugins: [
			new HtmlWebpackPlugin({
				template: resolve(__dirname, 'app/index.html')
			})
		]
};