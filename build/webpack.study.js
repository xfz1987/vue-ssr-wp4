const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, '../study/index.js'),
	output: {
		filename: 'boundle.js',
		path: path.join(__dirname, '../temp')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
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
				use: [
					{loader: 'vue-style-loader'},
    	    	  	{loader:'css-loader',options:{minimize: false, importLoaders:1}},
    	    	  	{loader: 'postcss-loader',options:{sourceMap:true, config: {path: path.resolve(__dirname, '../postcss.config.js')} }}
				]
			},
			{
				test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    			loader: 'file-loader?name=images/[name].[ext]'
			}
		]
	},
	devServer: {
		port: '3000',
		//编译错误时，显示在网页上
		overlay: {
			errors: true
		},
		// 热更新内容，而不会刷新页面
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    	new HTMLPlugin({
    		template: path.join(__dirname, 'template.html'),
    		name: 'index.html'
    	})
	],
	resolve: {
		alias: {
			'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
		}
	}
};