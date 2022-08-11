<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="isLoading">
        <!-- 头部 -->
        <TreeTools :isRoot="true" :treeNode="company" />
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools
              @add="showAddDept"
              :treeNode="data"
              @delDepts="loadDepts"
              @edit="showEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加弹窗层 -->
    <AddDept
      ref="addDept"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    ></AddDept>
  </div>
</template>

<script>
import AddDept from '@/views/departments/components/add-dept.vue'
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      treeData: [],
      defaultProps: {
        label: 'name' // 将data中哪个数据名显示到树形页面中
      },
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currentNode: {},
      isLoading: false
    }
  },
  components: {
    TreeTools,
    AddDept
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      this.isLoading = true
      const res = await getDeptsApi()
      this.treeData = transListToTree(res.depts, '')
      this.isLoading = false
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptsById(val.id)
    }
  }
}
</script>

<style scoped lang="scss"></style>
