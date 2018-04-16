/**
 * node服务入口文件
 */
const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const koaBody = require('koa-body')
const session = require('koa-session')

const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDB = require('./db/db')
const config = require('../app.config')

const db = createDB(config.db.appId, config.db.appkey)

const app = new Koa()

//使用session
app.keys = ['vue ssr xfz']
app.use(session({
  key: 'v-ssr-id',
  //过期时间 2小时
  maxAge: 2 * 60 * 60 * 1000
}, app))

const isDev = process.env.NODE_ENV === 'development'

//错误处理
app.use(async (ctx, next) => {
	try {
		console.log(`request width path ${ctx.path}`)
		await next()
	} catch (err){
		console.log(err)
		ctx.status = 500
		if (isDev) {
			ctx.body = err.message
		} else {
			ctx.body = 'please try again later...'
		}
	}
})

//添加db到全局ctx
app.use(async (ctx, next) => {
	ctx.db = db
	await next()
})

//处理favicon
app.use(async (ctx, next) => {
	if (ctx.path === '/favicon.ico') {
		await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
	} else {
		await next()
	}
})

let pageRouter

if (isDev) {
	pageRouter = require('./routers/dev-ssr')
	// pageRouter = require('./routers/no-bundle/dev-ssr-no-bundle')
} else {
	const staticRouter = require('./routers/static')
	app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
	// pageRouter = require('./routers/ssr')
	pageRouter = require('./routers/no-bundle/ssr-no-bundle')
}

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
	console.log(`server is running on port ${HOST}:${PORT}`)
})