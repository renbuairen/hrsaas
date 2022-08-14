<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { importEmployees } from '@/api/employees'
import { formatTime } from '@/filters/index'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (const key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]

            const date = new Date((timestamp - 1) * 24 * 3600000)

            date.setFullYear(date.getFullYear() - 70)

            obj[importMapKeyPath[key]] = formatTime(date)
          }
          obj[importMapKeyPath[key]] = item[key]
        }
        return obj
      })
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss"></style>
