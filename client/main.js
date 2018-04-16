import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import './assets/styles/common.css'
import createRouter from './router'
import createStore from './store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  console.log('1.beforeEach')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('2.beforeResolve')
  next()
})

router.afterEach((to, from, next) => {
  console.log('3.after each')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
