<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select @change="updateCalendar" v-model="currentYear">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select @change="updateCalendar" v-model="currentMonth">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      currentDate: '',
      years: []
    }
  },

  created() {
    this.initCaldndar()
  },

  methods: {
    initCaldndar() {
      const data = new Date()
      this.currentYear = data.getFullYear()
      this.currentMonth = data.getMonth()
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => item + index)

      this.currentDate = data
    },
    isWeek(date) {
      return date.getDay() == 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar-table__row .current,
::v-deep .el-calendar-table__row .next {
  border: none !important;
}
.cell-box {
  color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  span {
    color: red;
  }
}
</style>
