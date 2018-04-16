const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')//抽离css
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const createVueLoaderOpts = require('./vue-loader.config');
const VueClientPlugin = require('vue-server-renderer/client-plugin')
// const cdnConfig = require('../app.config').cdn

const isDev = process.env.NODE_ENV === 'development';

const baseConfig = {
	mode: process.env.NODE_ENV || 'development',
	target: 'web',
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
				test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    			loader: isDev ? 'file-loader?name=images/[name].[ext]': 'file-loader?name=images/[name].[hash:5].[ext]'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
      		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    	}),
    	//没有指定，会自动生成 vue-ssr-client-manifest.json文件，
    	//该文件包就是前端资源文件的路径及异步加载文件的路径和关系的图谱
    	//该文件用于服务端渲染时，写入html中script与link所用
    	new VueClientPlugin()
    ]
};


let config = {};

if(isDev){
	config = merge(baseConfig, {
		// entry: path.join(__dirname, '../client/main.js'),
		entry: path.join(__dirname, '../client/client-entry.js'),
		output: {
			filename: 'boundle.js',
			path: path.join(__dirname, '../public'),
			publicPath: 'http://127.0.0.1:8000/'
		},
		//wbpack4默认会加devtool
		//devtool: '#cheap-module-eval-source-map',
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						{loader: 'vue-style-loader'},
    	    		  	{loader:'css-loader',options:{minimize: false, importLoaders:1}},
    	    		  	{loader: 'postcss-loader',options:{sourceMap:true, config: {path: path.resolve(__dirname, '../postcss.config.js')} }}
					]
				}
			]
		},
		devServer: {
			port: '8000',
			host: '0.0.0.0',
			//编译错误时，显示在网页上
			overlay: {
				errors: true
			},
			//加上这个，否则无法热更替，因为资源跨域了
			headers: { 'Access-control-Allow-Origin': '*' },
			//用于SPA前端路由
			historyApiFallback: {
				index: '/index.html'
			},
			//设置代理，方便纯前(localhost:8000)端调API使用
			proxy: {
    			'/api': 'http://127.0.0.1:3333',
    			'/user': 'http://127.0.0.1:3333'
  			},
			// 热更新内容，而不会刷新页面
			hot: true
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			//减少无关错误信息的展示（webpack4干掉了）
    		// new webpack.NoEmitOnErrorsPlugin(),
    		new HTMLPlugin({
    			template: path.join(__dirname, 'template.html'),
    			name: 'index.html'
    		})
		]
	});
}else{
	config = merge(baseConfig, {
		entry: {
			app: path.join(__dirname, '../client/client-entry.js')
		},
		output: {
			filename: '[name].[hash:5].js',
			path: path.join(__dirname, '../public'),
			publicPath: '/public/',
			// publicPath: cdnConfig,
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ExtractPlugin.extract({
						fallback: 'vue-style-loader',
						use: [
        			  		{loader:'css-loader',options:{minimize: true, sourceMap: true, importLoaders:1}},
        			  		{loader: 'postcss-loader',options:{config: {path: path.resolve(__dirname, 'postcss.config.js')} }}
						]
					})
				}
			]
		},
		//提取公共文件（webapck4）
		optimization: {			
	       	splitChunks: {
            	chunks: 'all',
        	},
        	runtimeChunk: true
		},
		plugins: [
			// new ExtractPlugin('main.[Hash:5].css'),
			new ExtractPlugin({
				filename: 'main.[chunkhash:5].css',
				allChunks: true
			}),
        	//webpack4 废弃掉了CommonsChunkPlugin
        	//vendor一定要放在runtime之前，否则抽取不出来
        	// new webpack.optimize.CommonsChunkPlugin({
        	//     name: 'vendor'
        	// }),
        	// //提取webpack相关的恶心代码
        	// new webpack.optimize.CommonsChunkPlugin({
        	//     name: 'runtime'
        	// }),
        	new UglifyJSPlugin(),
        	// new HTMLPlugin(),
        	// 用来给异步组件重命名
        	new webpack.NamedChunksPlugin()
		]
	});
}

config.resolve = {
	alias: {
		'model': path.join(__dirname, '../client/model/client-model.js')
	}
}



module.exports = config;