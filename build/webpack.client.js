const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')//抽离css
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const createVueLoaderOpts = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development';

const baseConfig = {
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
				test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    			loader: isDev ? 'file-loader?name=images/[name].[ext]': 'file-loader?name=images/[name].[hash:5].[ext]'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
      		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    	})
    ]
};


let config = {};

if(isDev){
	config = merge(baseConfig, {
		entry: path.join(__dirname, '../client/main.js'),
		output: {
			filename: 'boundle.js',
			path: path.join(__dirname, '../dist')
		},
		devtool: '#cheap-module-eval-source-map',
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
			//用于SPA前端路由
			// historyFallback: {
			// },
			// 热更新内容，而不会刷新页面
			hot: true
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			//减少无关错误信息的展示
    		new webpack.NoEmitOnErrorsPlugin(),
    		new HTMLPlugin()
		]
	});
}else{
	config = merge(baseConfig, {
		entry: {
			app: path.join(__dirname, '../client/main.js'),
			vendor: ['vue']
		},
		output: {
			filename: '[name].[chunkhash:5].js',
			path: path.join(__dirname, '../dist'),
			publicPath: './'
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ExtractPlugin.extract({
						fallback: 'style-loader',
						use: [
        			  		{loader:'css-loader',options:{minimize: true, importLoaders:1}},
        			  		{loader: 'postcss-loader',options:{config: {path: path.resolve(__dirname, 'postcss.config.js')} }}
						]
					})
				}
			]
		},
		plugins: [
			new ExtractPlugin('main.[hash:5].css'),
        	new webpack.optimize.ModuleConcatenationPlugin(),
        	//vendor一定要放在runtime之前，否则抽取不出来
        	new webpack.optimize.CommonsChunkPlugin({
        	    name: 'vendor'
        	}),
        	//提取webpack相关的恶心代码
        	new webpack.optimize.CommonsChunkPlugin({
        	    name: 'runtime'
        	}),
        	new UglifyJSPlugin(),
        	new HTMLPlugin({
				minify: {
           	     	collapseWhitespace: true,
           	     	removeAttributeQuotes: true
           	 	},
			})
		]
	});
}



module.exports = config;