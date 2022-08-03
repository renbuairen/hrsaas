import router from '@/router'
import store from '@/store'
//路由(全局)前置守卫
//会在所有路由进入之前触发
// to:去哪里的路由信息
// from:来自于哪个路由的信息
// next:是否进入
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (!store.state.user.userInfo.userId) store.dispatch('user/getUserInfo')
    //1.登录
    //是否进入登录页
    if (to.path === '/login') next('/') // 1.1是跳到首页
    //1.2不是 直接进入
    else next()
  } else {
    //2.未登录
    // 访问的是否在白名单(未登录也能访问的页面)
    const isCludes = whiteList.includes(to.path)
    // 2.1在白名单放行
    if (isCludes) next()
    //2.2 不在白名单(不登录不能访问)跳到登录页
    else next('/login')
  }
})
