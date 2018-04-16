# VUE-SSR

## vue-ssr优势
> - SPA的SEO实现
> - 以前在客户端页面的初始ajax数据请求可以在服务端直接渲染出来，客户端无需再次ajax请求，并且页面的标签内容直接先渲染出来(而无需客户端通过执行js再render页面)提升应用的性能，缩短白屏时间
> - 说白了，就是把以前在客户端页面初始化的事情在服务端干了，客户端直接吃现成的了

## 技术要点
> vue+vuex+vue-router+wepback3/4+koa2
> vue-server-renderer/client-plugin + vue-server-renderer/server-plugin
> - client-plugin: 用于打包静态资源文件与manifest.json(所有静态资源的引用路径，服务端渲染时，插入html中link、script标签使用)
> - server-plugin: 生成在服务端的vue资源文件，node程序执行这些文件相应逻辑，进而生成数据内容
> - **注意:使用webpack4目前遇到的问题就是抽取css为一个单独文件有问题，建议使用mini-css-extract-plugin 来 替换 extract-text-webpack-plugin**
> - 服务端在生产环境建议: 不使用server-plugin，而直接使用server.entry.js，这样可以提高性能，为什么提高星星呢
```
比如:登陆重定向时，
//bundle方式, 由 /app -> /login 执行2遍renderToString
const appString = await renderer.renderToString(context)
// 在服务端直接做登陆跳转
if (context.router.currentRoute.fullPath !== ctx.path) {
    return ctx.redirect(context.router.currentRoute.fullPath)
}
//no-bundle方式，由 /app -> /login 执行1遍renderToString
const app = await bundle(context)
if (context.router.currentRoute.fullPath !== ctx.path) {
  return ctx.redirect(context.router.currentRoute.fullPath)
}
const appString = await renderer.renderToString(app, context)
//renderToString十分好性能，因此看出no-bundle的好处了吧
```

![](readImg/flow.png)

## wepback配置需要说明的地方
1.在开发环境中，想使用热更新，需要安装vue-style-loader,并且替换style-loader，否则css样式无法热更新
```
{
    test: /\.css$/,
    use: [
        {loader: 'vue-style-loader'},//style-loader
        {loader:'css-loader',options:{minimize: false, importLoaders:1}},
        {loader: 'postcss-loader',options:{sourceMap:true, config: {path: path.resolve(__dirname, '../postcss.config.js')} }}
    ]
},
```

2.开发过程中要eslint
eslint
eslint-config-standard
eslint-loader
eslint-plugin-html
eslint-plugin-import
eslint-plugin-node
eslint-plugin-promise
eslint-plugin-standard
```
{
    "extends": "standard",
    plugins: [
        "html"
    ],
    "parser": "babel-eslint"
}
```

3.git commit时自动eslint
> **注意**: 一定要先git init，再install husky
> npm i -D husky
> package.json >  "precommit": "npm run eslint-fix"

4.升级到webpack4
> 先把之前的webpack相关的所有依赖全部uninstall
> 重新安装最新版本，另外还要装webpack-cli
> **注意:** 如果还有提示没到相应的版本 则 xxx@next
```
1.制定环境
const baseConfig = {
    mode: process.env.NODE_ENV || 'production',
}
2.干掉devtool，webpack4在开发环境默认添加
3.干掉CommonsChunkPlugin，换成optimization
//提取公共文件
optimization: {
    splitChunks: {
        chunks: 'all'
    },
    runtimeChunk: true
},
4.去掉entry中vendor
//生成 app.js vendors-app.js runtiome-app.js
```
## vue-router按需加载（提升首页加载速度）
> 1.npm i -S babel-plugin-syntax-dynamic-import
> 2.修改.babelrc
> `"plugins": ["syntax-dynamic-import"]`
> 3.修改routes
> `{ path: '/app', component: () => import('../views/todo/todo.vue') }`