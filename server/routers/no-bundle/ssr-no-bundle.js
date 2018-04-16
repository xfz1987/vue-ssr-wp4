/**
 * 生产环境路由处理
 */
const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')
const serverRender = require('./server-render-no-bundle')
const clientManifest = require('../../../public/vue-ssr-client-manifest.json')
const bundle = require('../../../server-build/server-entry.js').default

const renderer = VueServerRenderer.createRenderer({
	inject: false,
	clientManifest
})

//读取ejs模板
const template = fs.readFileSync(path.join(__dirname, '../../server.template.ejs'), 'utf-8')

//配置路由
const router = new Router();
router.get('*', async (ctx) => {
	await serverRender(ctx, renderer, template, bundle)
})

module.exports = router