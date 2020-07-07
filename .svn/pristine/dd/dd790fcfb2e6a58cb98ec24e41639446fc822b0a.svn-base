<template>
  <div>
    <!-- 未开通页面 authType 1：个人注册 2：企业注册 -->
    <authComponent v-if="$store.state.userInfo.userCategoryCode === '2' || !!$store.state.userInfo.userCategoryCode === false "></authComponent>
    <div v-else  class="roles-container"><!-- -if="$store.state.userInfo.authType === '2'" -->
      <div class="top">
        <span class="title">权限列表</span>
        <router-link to="/myqingju/roleAdd" class="btn btn-green" v-has="['CGyn7Z']">新建角色</router-link>
      </div>
      <el-table ref="multipleTable" :data="tableData" v-has="['g5yfeq']" 
        class="myQingju-table">
        <el-table-column label="序号" show-overflow-tooltip >
          <template slot-scope="scope">
            <span>{{scope.$index + currentPage}}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="创建人" prop="founder"></el-table-column>
        <el-table-column label="创建日期" prop="createTime"></el-table-column>
        <el-table-column label="操作" v-if="operate">
          <template slot-scope="scope">
            <div class="more-handle">
              <div class="more-handle-green" v-if="!Number(scope.row.identifier)">
                <router-link :to="{path: '/myqingju/roleAdd', query: {id: scope.row.id}}" class="green" v-has="['tqGYmy']">权限设置</router-link>
                <p @click="handlePreDel(scope.row)" v-has="['fQZp46']">删除</p>
                <p @click="handleRolesUser(scope.row)" v-has="['TP5oMh']">人员维护</p>
              </div>
              <p class="gray" v-else>不可编辑</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination-layout">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div> -->
    </div>
    <confirm-component :visibleProps='Visible'>
      <template #color5>
        确认是否要删除该角色权限？该角色权限删除后，
      </template>
      <p>角色组下的用户不在拥有该权限，只能以其他身份登录青矩平台！</p>
      <template #btn>
          <button @click="handleDel">确定</button>
          <button @click="Visible = false">取消</button>
      </template>
    </confirm-component>
    <span class="J-operate" v-has="['tqGYmy', 'fQZp46', 'TP5oMh']"></span> 
  </div>
</template>
<script>
import authComponent from './roleNotAuth'
import confirmComponent from '@/components/confirmComponent';

import api from '@/fetch/api'
export default {
  components: {authComponent,confirmComponent},
  data () {
    return {
       tableData:[],
      // deptId: '',
      currentPage: 1,
      Visible: false,
      currentItem: {},
      operate: false,
      dataForBE: {

      }
    }
  },
  methods: {
    //  handleSizeChange (val) {
    //   this.dataForBE.pageSize = val
    //   this.getTable()
    // },
    // handleCurrentChange (val) {
    //   this.dataForBE.page = val
    //   this.getTable()
    // },
    handleRolesUser (items) {
      // 添加成员有用
      sessionStorage.setItem('rolesId', items.id)
      this.$router.push({path: '/myqingju/rolesUser', query: {name: items.name}})
    },
    getRoleList () {
      let id = JSON.parse(localStorage.firmId)
      api.getRoleList(id).then(res => {
        this.tableData = res.dataList
      })
    },
    handlePreDel (item) {
      this.currentItem = item
      this.Visible = true
    },
    handleDel () {
      api.deleteRole(this.currentItem.id).then(res => {
        this.$message.success('删除成功')
        this.Visible = false
        this.getRoleList()
      })
    }
  },
  mounted () {
    this.getRoleList()
    // hack 操作的显示
    let dNoneoperate = document.getElementsByClassName('J-operate')[0]
    if (dNoneoperate&&!dNoneoperate.style.display) {
      this.operate = true
    }
  }
}
</script>

<style lang="less" scoped>
.roles-container{
  padding:20px;
  .top{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .title{
      font-size: 18px;
      color: #666;
      border:none;
    }
  .btn{
    float: right;
  }
}
</style>
