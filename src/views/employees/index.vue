<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template #left-tag>
          <span>共{{ total }}条记录</span>
        </template>
        <template #right>
          <el-button type="danger">excel导出</el-button>
          <el-button type="primary" @click="$router.push('/import')"
            >excel导入</el-button
          >
          <el-button type="success" @click="addClose">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            :formatter="formatFormOfEmployment"
          />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :current-page="pages.page"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>

    <!--添加员工组件-->
    <AddEmployees
      :visible.sync="showAddEmployees"
      @onSave="getEmployeesInfoCreated"
    />
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployeeApi } from '@/api/employees'
import employees from '@/constant/employees'
import AddEmployees from './components/add-employees.vue'
export default {
  data() {
    return {
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 5
      },
      showAddEmployees: false
    }
  },

  created() {
    this.getEmployeesInfoCreated()
  },
  components: {
    AddEmployees
  },

  methods: {
    async getEmployeesInfoCreated() {
      const res = await getEmployeesInfoApi(this.pages)
      this.employees = res.rows
      this.total = res.total
    },
    changePage(val) {
      this.pages.page = val
      this.getEmployeesInfoCreated()
    },
    formatFormOfEmployment(row, coLumn, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async delEmployee(id) {
      await this.$confirm('是否删除该员工?')
      await delEmployeeApi(id)
      this.$message.success('删除成功')
      this.getEmployeesInfoCreated()
    },
    addClose() {
      this.showAddEmployees = true
    }
  }
}
</script>

<style scoped lang="less"></style>
