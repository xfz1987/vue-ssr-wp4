/**
 * webpack3 使用，该项目已升级至webpack4
 */

const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')//抽离css
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const config = {
	target: 'web',
	entry: path.join(__dirname, 'src/main.js'),
	output: {
		filename: 'boundle.js',
		path: path.join(__dirname, 'dist')
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
				test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    			loader: 'file-loader?name=images/[name].[ext]'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
      		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    	}),
		new HTMLPlugin({
			minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
		})
	]
};

if(isDev){
	config.module.rules.push({
		test: /\.css$/,
		use: [
			{loader: 'style-loader'},
          	{loader:'css-loader',options:{minimize: false, importLoaders:1}},
          	{loader: 'postcss-loader',options:{sourceMap:true, config: {path: path.resolve(__dirname, 'postcss.config.js')} }}
		]
	});
	config.devtool = '#cheap-module-eval-source-map';
	config.devServer = {
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
	};
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		//减少无关错误信息的展示
    	new webpack.NoEmitOnErrorsPlugin()
	);
}else{
	config.entry = {
		app: path.join(__dirname, 'src/main.js'),
		vendor: ['vue']
	};
	config.output.filename = '[name].[chunkhash:5].js';
	config.output.publicPath = './';
	config.module.rules.push({
		test: /\.css$/,
		use: ExtractPlugin.extract({
			fallback: 'style-loader',
			use: [
          		{loader:'css-loader',options:{minimize: true, importLoaders:1}},
          		{loader: 'postcss-loader',options:{config: {path: path.resolve(__dirname, 'postcss.config.js')} }}
			]
		})
	});
	config.plugins.push(
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
        new UglifyJSPlugin()
    )
}

module.exports = config;