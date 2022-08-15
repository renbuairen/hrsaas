import PageTools from '@/components/PageTools'
import UploadExcel from './UploadExcel'
import Uploadlmg from './Uploadlmg'

const components = [PageTools, UploadExcel, Uploadlmg]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })

    // Vue.component('PageTools', PageTools)
  }
}
