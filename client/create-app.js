/**
 * 给服务端渲染用的，和main.js不同之处就是，每次服务器渲染要重新创建一个vue实例，否则会之前渲染的状态冲突
 * 返回创建实例的方法
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import Notification from './components/notification'
import Tabs from './components/tabs'

import './assets/styles/common.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
