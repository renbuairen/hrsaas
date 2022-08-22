import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: {
    id: 'employees' //用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id', // query传参 动态路由传参
      component: () => import('@/views/employees/detail'),
      hidden: true // 不在左侧菜单显示
    },
    {
      path: 'print/:id', // 二级默认路由
      component: () => import('@/views/employees/print'), // 按需加载
      hidden: true
    }
  ]
}
