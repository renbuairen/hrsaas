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
