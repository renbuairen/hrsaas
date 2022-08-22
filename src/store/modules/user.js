import { login, getUserInfoApi, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    //登录获取token
    async getToken(context, payload) {
      const res = await login(payload)
      console.log(res)
      context.commit('setToken', res)

      setTokenTime()
    },
    //获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })

      return userBaseInfo
    },
    //退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 重置路由
      resetRouter()
      // {root: true} context 相当于全局的context
      context.commit('permission/setRoutes', [], { root: true })
    }
  }
}
