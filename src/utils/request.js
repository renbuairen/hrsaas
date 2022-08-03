// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'

const service = axios.create({
  // 创建一个axios的实例
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

const timeout = 10 * 1000

function isTimeOut() {
  const currentTime = Date.now()
  const nowTime = getTokenTime()
  return currentTime - nowTime > timeout
}

service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeOut()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
}) // 请求拦截器

service.interceptors.response.use(
  (res) => {
    //请求成功的函数
    const { success, data, message } = res.data
    if (success) return data
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async (err) => {
    //对响应错误做点什么
    if (err.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(err.message)
    }

    return Promise.reject(err)
  }
) // 响应拦截器
export default service // 导出axios实例
