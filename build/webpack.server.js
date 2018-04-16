/**
 * webpack打包生成vue-ssr-server-bundle.json文件，不会生成js文件
 * vue-server-renderer/server-plugin来实现的
 */
const webpack = require('webpack');
const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');
const VueServerPlugin = require('vue-server-renderer/server-plugin')//服务端渲染，生成json文件，来处理逻辑
const createVueLoaderOpts = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	mode: process.env.NODE_ENV || 'development',
	target: 'node',
	entry: path.join(__dirname, '../client/server-entry.js'),
	output: {
		libraryTarget: 'commonjs2',//module.exports = xxx，因为是运行在node环境下的代码
		filename: 'server-entry.js',
		path: path.join(__dirname, '../server-build'),
		publicPath: process.env.NODE_ENV=='production' ? '/public/' : 'http://127.0.0.1:8000/' 
	},
	devtool: 'source-map',
	//抽出依赖包
	externals: Object.keys(require('../package.json').dependencies),
	module: {
		rules: [
			{
				test: /\.(vue|jsx|js)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				enforce: 'pre' //在其他loader处理前，先eslint，post为之后
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: createVueLoaderOpts(isDev)
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractPlugin.extract({
					fallback: 'vue-style-loader',
					use: [
        		  		{loader:'css-loader',options:{minimize: true, sourceMap: true, importLoaders:1}},
        		  		{loader: 'postcss-loader',options:{config: {path: path.resolve(__dirname, 'postcss.config.js')} }}
					]
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    			loader: isDev ? 'file-loader?name=images/[name].[ext]': 'file-loader?name=images/[name].[hash:5].[ext]'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
      		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      		'process.env.VUE_ENV': '"server"'
    	}),
    	new ExtractPlugin({
			filename: 'main.[checkHash:5].css',
			allChunks: true
		}),
	],
	resolve: {
		alias: {
   	 		'model': path.join(__dirname, '../client/model/server-model.js')
  		}
	}
};


//开发环境使用 vue-ssr-server-bundle.json，生产环境使用 server-entry.js
if (isDev) {
	//生成vue-ssr-server-bundle.json
	config.plugins.push(new VueServerPlugin())
}

module.exports = config;