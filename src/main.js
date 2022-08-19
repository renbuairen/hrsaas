import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 全部导出 并设置别名
import * as filters from '@/filters'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
// 全部导出 并设置别名
import * as directives from '@/directives'

import components from '@/components'
Vue.use(components)

import Print from 'vue-print-nb'
Vue.use(Print)

// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 注册eLement ui
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

//循环注册
for (const key in directives) {
  Vue.directive(key, directives[key])
}

//循环注册过滤器
for (const key in filters) {
  Vue.filter(key, filters[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
