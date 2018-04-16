/**
 * webpack.client.js的入口文件
 */

import createApp from './create-app'
import bus from './util/bus'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('auth', () => {
  router.replace('/login')
})

router.onReady(() => {
  app.$mount('#app')
})
