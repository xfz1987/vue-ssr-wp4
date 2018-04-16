/**
 * 通知插件
 * 全局注册组件
 * 调用方法挂载在全局Vue上,use anywhere
 */
import Notification from './notification.vue'
import notify from './function'

export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
