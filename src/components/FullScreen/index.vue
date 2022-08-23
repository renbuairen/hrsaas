<template>
  <div style="margin: 0 20px">
    <svg-icon
      className="fullscreen"
      iconClass="fullscreen"
      @click="onFullScreen"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
  font-size: 20px;
}
</style>
