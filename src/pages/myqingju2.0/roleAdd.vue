<template>
  <div class="role-add-container">
    <p class="page-title">{{$route.query.id?'编辑角色':'新建角色'}}</p>
    <el-form :model="form" ref="form" :rules="rules" 
    class="form-role"
     status-icon label-position="left" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input type="text" v-model="form.name" style="width: 450px;"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input type="text" v-model="form.description" style="width: 450px;"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="functionEnumsObj">
        <!-- 表 组件 -->
        <roles-component :name="form.name" :description="form.description"></roles-component>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import rolesComponent from './rolesComponent'
import api from '@/fetch/api'
export default {
  components:{
    rolesComponent
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        functionEnumsObj: {}
      },
      rules: {
        name: [
          { required: true, message: '请填写角色名称', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
  },
  mounted () {
    let id = this.$route.query.id
    let data = {
      firmId: JSON.parse(localStorage.firmId),
      id: id
    }
    api.getUserRoles(data).then(res => {
      this.form.name = res.dataList[0].name
      this.form.description = res.dataList[0].description
      this.form.functionEnumsObj = res.dataList[0]
    })
  }
}
</script>
<style lang="less" scoped>
.role-add-container{
  padding: 20px;
}
.form-role{margin-top: 30px;}
</style>

<style>
.form-role .el-form-item__content{
  line-height: 0;
}
.form-role .checkbox .el-checkbox {
  display: block;
}
</style>
