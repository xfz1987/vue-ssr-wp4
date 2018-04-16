/**
 * 开发环境路由处理 - 非JSON方式
 * 优点: 性能优化了，renderer.renderToString
 * 缺点: 开发环不建议使用，因为无法写入到内存中，只能写到硬盘中
 * 方案: 开发环境使用 bundle.json，生产环境使用 server-entry.js
 */
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../../build/webpack.server')
const serverRender = require('./server-render-no-bundle')

/* start 在node中运行webpack */
//获取webpack配置
const serverCompiler = webpack(serverConfig)

//每次打包生成的新的文件
let bundle;
//监听每次文件变化（err打包错误，eslint错误在stats中）
serverCompiler.watch({}, (err, stats) => {
	if (err) throw err
	stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.warn(warn))
    
    const bundlePath = path.join(serverConfig.output.path, 'server-entry.js')
    
    delete require.cache[bundlePath]
    bundle = require('../../../server-build/server-entry.js').default
    
    console.log('================= new bundle generlate ========================')
})
/* end */

/* node 返回 渲染的html */
const handleSSR = async (ctx) => {
	if (!bundle) {
		ctx.body = 'please wait for a monment, html will come soon'
	} else {
		//因为在开发环境中，文件都在内存中，因此需要ajax向客户端webpack-dev-server发起请求来获取文件
		const clientManifestResp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')
		//客户端静态资源的路径
		const clientManifest = clientManifestResp.data

		//读取ejs模板
		const template = fs.readFileSync(path.join(__dirname, '../../server.template.ejs'), 'utf-8')
		
		const renderer = VueServerRenderer.createRenderer({
			inject: false,
			clientManifest
		})

		await serverRender(ctx, renderer, template, bundle)
	}	
}

//配置路由
const router = new Router();
router.get('*', handleSSR)

module.exports = router