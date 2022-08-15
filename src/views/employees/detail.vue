<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabHandleClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.mobile" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="user" label="个人详情">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane name="job" label="岗位信息" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { getUserDetail, saveUserDetailById } from '@/api/user.js'
import UserInfo from './components/user-info'
export default {
  data() {
    return {
      formData: {},
      activeName: Cookie.get('tabActive') || 'account'
    }
  },
  components: {
    UserInfo
  },

  created() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      const res = await getUserDetail(this.$route.params.id)
      this.formData = res
    },
    async onSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('修改成功')
    },
    tabHandleClick() {
      Cookie.set('tabActive', this.activeName)
    }
  }
}
</script>

<style scoped lang="scss"></style>
