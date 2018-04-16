// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
// import Test from '../views/test/test.vue'

// 异步引入组件，webpack会将异步文件打包成 0.js、1.js，这样会导致长缓存失效，重新打包，整个缓存都失效了
// 给异步组件来个名字 component: () => import(/* webpackChunkName: "haha" */ '../xxxx') 打包出来的名字就叫做 haha

export default [
  { path: '/', redirect: '/app' },
  { path: '/app', component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'), title: 'my todolist', description: 'this is a todolist vue-ssr' },
  { path: '/login', component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue'), title: '登陆', description: 'this is a login vue-ssr' },
  // 这种方式在history模式下刷新有问题，因此应该采用query的形式
  // { path: '/test/:id', props: true, component: Test }
  { path: '/test', props: (route) => ({ id: route.query.id }), component: () => import('../views/test/test.vue') }
]
