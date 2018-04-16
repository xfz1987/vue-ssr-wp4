import Vuex from 'vuex'
import defaultState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default () => {
  return new Vuex.Store({
    // 开发环境开启严格模式，生产环境关闭
    strict: process.env.NODE_ENV === 'development',
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
