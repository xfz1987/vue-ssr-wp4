const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
	const user = ctx.request.body
	if (user.username === 'xfz' && user.password === 'xfz123') {
		// 将session写入到cookie中
		ctx.session.user = {
			username: 'xfz'
		}
		ctx.body = {
      		success: true,
      		data: {
      		  username: 'xfz'
      		}
    	}
	} else {
		ctx.status = 400
    	ctx.body = {
    	  	success: false,
    	  	message: 'username or password error'
    	}
	}
})

module.exports = userRouter