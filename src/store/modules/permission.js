import router, { constantRoutes, asyncRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [], //我们自己维护的路由规则,所有路由规则( 路由+筛选后的动态路由)
    points: [] //按钮权限
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, points) {
      state.points = points
    }
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      //怎么动态添加路由规则?
      // console.log(router)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])

      context.commit('setRoutes', routes)
    },
    setPointsAction(context, points) {
      context.commit('setPoints', points)
    }
  }
}
