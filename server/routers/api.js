/**
 * 处理API的请求
 * @type {[type]}
 */

const Router = require('koa-router')

//只处理以 /api 为开头的请求 
const apiRouter = new Router({ prefix: '/api' })

//登陆验证
const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}

// 将验证注入到apiRouter中，则在请求apiRouter中任意路由都会先检查登陆
apiRouter.use(validateUser)


const successResp = (data) => {
	return {
		success: true,
		data
	}
}

apiRouter
	.get('/todos', async (ctx) => {
		const todos = await ctx.db.getAllTodos()
		ctx.body = successResp(todos)
	})
	.post('/todo', async (ctx) => {
		const data = await ctx.db.addTodo(ctx.request.body)
		ctx.body = successResp(data)
	})
	.put('/todo/:id', async (ctx) => {
		const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
		ctx.body = successResp(data)
	})
	.delete('/todo/:id', async (ctx) => {
    	const data = await ctx.db.deleteTodo(ctx.params.id)
    	ctx.body = successResp(data)
  	})
  	.post('/delete/completed', async (ctx) => {
    	const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    	ctx.body = successResp(data)
  	})

module.exports = apiRouter