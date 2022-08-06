<template>
  <el-dialog title="添加部门" :visible="visible" width="50%" @close="onClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择部门负责人"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          v-model="formData.introduce"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addDeptApi, getDeptsApi } from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    const checkDeptName = (rule, value, callback) => {
      //1.判断value是否和添加的同级部门重复(获取到同级部门)
      const isRepeat = this.currentNode.children?.some(
        (item) => item.name === value
      )
      //2.如果重复了 callback(new Error(*部门重复"))
      isRepeat ? callback(new Error('部门重复')) : callback()
    }
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      const isRepeat = depts.some((item) => item.code === value)

      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      employees: [],
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          },
          {
            validator: checkDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入部门编码',
            trigger: 'blur'
          },
          {
            validator: checkDeptCode,
            trigger: 'blur'
          }
        ],
        manager: [
          {
            required: true,
            message: '请输入部门负责人',
            trigger: 'change'
          }
        ],
        introduce: [
          {
            required: true,
            message: '请输入部门介绍',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },

  created() {
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      this.employees = await getEmployeesApi()
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      try {
        await addDeptApi(this.formData)
        this.$message.success('添加成功')
        await this.$refs.form.resetFields()

        this.$parent.loadDepts()
        this.onClose()
      } catch (error) {
        this.$message.error('添加失败')
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
