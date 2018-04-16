import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/' //localhost:8000/base/app
    linkActiveClass: 'active-class',
    linkExactActiveClass: 'exact-active-class',
    scrollBehavior (to, from, savedPosition) {
      return savedPosition || { x: 0, y: 0 }
    },
    fallback: true
  })
}
