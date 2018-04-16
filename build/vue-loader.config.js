module.exports = (isDev) => {
	return {
		//去掉空格
		preserveWhitepace: true,
		//把vue里面的css抽离出来，否则css始终在vue中
		//vue认为css在vue中的效率更高，因此要结合实际请款看是否要抽离出来
		extractCSS: !isDev,
		// cssModules: {
  //     		localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
  //     		camelCase: true
  //   	},
    	// hotReload: false, // 根据环境变量生成
	}
};