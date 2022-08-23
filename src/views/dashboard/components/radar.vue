<template>
  <div id="main" class="radarCharts">雷达图</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},

  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '人员绩效表'
        },
        legend: {
          data: ['张三', '李四']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '打游戏', max: 100 },
            { name: '摸鱼', max: 100 },
            { name: '代码', max: 100 },
            { name: '上班', max: 100 },
            { name: '测试', max: 100 },
            { name: '吃饭', max: 100 }
          ]
        },
        series: [
          {
            name: '个人能力',
            type: 'radar',
            data: [
              {
                value: [50, 50, 50, 50, 50, 50],
                name: '张三'
              },
              {
                value: [100, 100, 100, 100, 100, 100],
                name: '李四'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 500px;
  height: 500px;
}
</style>
