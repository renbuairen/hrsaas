import store from '@/store'

export const imgError = {
  //当绑定的元素插入到DOM 中时
  inserted(el, { value }) {
    // 监听dom img图片加载失败的事件
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = () => {
        el.src = value
      }
    }
  },
  //指绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  }
}

export const isHas = {
  // bind:指令和dom定
  // inserted:指令所绑定的元素插入到父节点
  // update: 指令所定的Vnode
  inserted(el, { value }) {
    const has = store.state.permission.points.includes(value)
    if (!has) {
      el.remove()
    }
  }
}
