<template>
  <div>
    <el-dialog
      @open="onOpen"
      @close="close"
      title="分配角色"
      :visible="visible"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="(item, index) in roles"
          :key="index"
          :label="item.id"
        >
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail, assignRoles } from '@/api/user'
export default {
  name: 'assign-role',
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    employeesId: {
      type: String,
      required: true
    }
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    async getRolesList() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },

    // 获取员工角色
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetail(this.employeesId)
      this.checkList = roleIds
    },
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.close()
      this.$parent.getEmployeesInfoCreated()
    }
  }
}
</script>

<style scoped lang="scss"></style>
