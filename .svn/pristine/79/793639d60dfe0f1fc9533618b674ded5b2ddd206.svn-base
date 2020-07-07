<template>
  <div>
    <authComponent v-if="$store.state.userInfo.userCategoryCode === '2' || !!$store.state.userInfo.userCategoryCode === false"></authComponent>
    <div class="qingju-user-memeber" v-else>
      <div class="left-member">
        <div class="search" v-has="['cfazeg']">
          <span @click="handleKeyword"></span>
          <input type="text" v-model="keyword" @keyup.enter='handleKeyword' placeholder="姓名、账号、手机号码">
        </div>
        <div class="user-menu" v-has="['SzqO1Q']">
          <p class="title" :title="$store.state.userInfo.companyName" @click="handleStructureVisible(-1)">{{$store.state.userInfo.companyName}}</p>
          <div class="company-structure" v-for="(item, index) in companyData" :key="item.name">
            <p class="structure-title" @click="handleStructureVisible(index)">
              <span class="icon" :style="{borderColor: index === 1 ? '#fff' : ''}"></span>
              {{item.name}}
              <router-link :to="item.url" class="to-path-text" v-if="item.url">管理</router-link>
            </p>
            <!-- lazy -->
            <transition-group
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:after-enter="afterEnter"
              v-on:before-leave="beforeLeave"
              v-on:leave="leave"
            >
              <div v-show="index === 0 && structureNav[index]"  key="user-tree" class="user-tree">
                <el-tree  v-if="navData[0] && navData[0].deptInfoList"
                :data="navData[0] && navData[0].deptInfoList" :props="defaultProps"
                @node-click="handleNodeClick"></el-tree>
                <p class="any-data" v-else>暂无数据</p>
              </div>
              <div v-show="index === 1 && structureNav[index]" key="anonymous-ul" class="anonymous-ul" >
                <ul v-if="navAnonymousData && navAnonymousData.length > 0">
                  <li v-for="role in navAnonymousData" :key="role.name">
                    {{role.name}}
                  </li>
                </ul>
                <!-- <p class="any-data"  v-else>暂无数据</p> -->
              </div>
              <div v-show="index === 2 && structureNav[index]" key="roles-ul" class="roles-ul" >
                <ul v-if="navRolesData && navRolesData.length > 0">
                  <li v-for="(role, roleIndex) in navRolesData" :key="role.name" 
                  :class="{'active-li': navRolesSelected === roleIndex}"
                   @click="handleRolesList(role, roleIndex)">
                    {{role.name}}
                  </li>
                </ul>
                <p class="any-data" v-else>暂无数据</p>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
      <div class="right-member" >
        <p class="top">
          <span class="title">用户列表</span>
          <router-link to="/myqingju/userAdd" class="btn btn-green" v-has="['4o0MTD']">添加用户</router-link>
        </p>
        <el-table ref="multipleTable" v-has="['BbOCme']"
          :data="tableData" 
          class="myQingju-table"
          :header-cell-class-name="tableHeaderClassName" 
          :row-class-name="tableRowClassName">
          <el-table-column label="用户信息" width="350">
            <template slot-scope="scope">
              <img :src="scope.row.headPortraits" alt="" class="header-icon" :onerror="errIcon" @click="goDetails(scope.row)">
              <div class="info-right">
                <router-link class="name" :to="{path: '/myqingju/userDetails', query: {userId: scope.row.userId}}" target="_blank">{{scope.row.userName}}</router-link>
                <p class="time">加入时间：{{scope.row.joinTime}}</p>
                <p class="time">账号：{{scope.row.code}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" prop="phone" min-width="120"> </el-table-column>
          <el-table-column label="用户角色" prop="roleName" :render-header="renderRoles" min-width="110">
            <template slot-scope="scope">
              <p v-for="role in scope.row.firmBaseRole" :key="role.id">{{role.name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态"  prop="status" :render-header="renderStatus" min-width="100"></el-table-column>
          <el-table-column label="操作" v-if="operate">
            <template slot-scope="scope">
              <div class="more-handle more-handle-green"><!-- userCategory : 1 企业下用户  0 企业用户 -->
                <p @click="handleEditClick(scope.$index)" v-has="['cuasJ0']">编辑</p>
                <p @click="handleSetRoles(scope.$index)" v-has="['RFoulB']" 
                  v-if="(scope.row.userCategory !== '0') && (scope.row.status !== '禁用')">设置角色</p>
                <p class="gray" v-else v-has="['RFoulB']" @click="graySetRole">设置角色</p>
                <p @click="handleModifyPwd(scope.$index)" v-has="['5yWtNE']">修改密码</p>
                <p @click="handleForbidden(scope.$index)" v-has="['zs2AkG']"
                v-if="scope.row.userCategory !== '0'">
                {{scope.row.status === '禁用' ? '启用' : '禁用'}}</p>
                <p class="gray" v-else v-has="['zs2AkG']" @click="graySetRole"> {{scope.row.status === '禁用' ? '启用' : '禁用'}}</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-layout">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[20,30,50,100]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <!-- 弹窗 -->
      <el-dialog title="基本信息" width='600px' :visible.sync='editInfoVisible' class="msg-dialog">
        <addUserComponent diffInfo='edit' :userId="tableData[indexSelect] && tableData[indexSelect].userId"
        :editInfoVisible="editInfoVisible"
        @handleEditVisible="handleEditVisible"></addUserComponent>
      </el-dialog>
      <el-dialog title="设置角色" width="600px" :visible.sync='setRolesVisible' class="msg-dialog">
        <div class="set-role-div">
          <span class="role-title">选择角色</span>
          <ul class="set-role-ul">
            <li class="set-role-li"  v-for="item in navRolesData" :key="item.id" >
              <el-checkbox v-model="setRolesLists" :label="item.id" :disabled="item.id === '10000000-0000-0000-0000-000000000012'">{{item.name}}</el-checkbox>
              <span class="details">{{item.functionStr}}</span>
            </li>
          </ul>
        </div>
        <div class="set-role-footer">
          <p class="red-tip">注：分配角色后，需要退出登录，选择角色生效。</p>
          <div class="btn-common btn-green btn-submit btn-width-100" @click="handleSetRolesClick">确定</div>
          <div class="btn-common btn-cancel btn-width-100" @click="setRolesVisible = false">取消</div>
        </div>
      </el-dialog>
      <el-dialog title="修改密码" width="600px" :visible.sync='modifyPwdVisible' class="msg-dialog">
        <el-form :model="modifyPwdData" ref="modifyPwdData" class="delete-form"
        :rules="rulePwd" label-width="100px" label-position="left">
          <el-form-item label="新密码" prop="firstPwd">
            <el-input type="text" v-model="modifyPwdData.firstPwd" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="secondPwd">
            <el-input type="text" v-model="modifyPwdData.secondPwd" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item class="btn-form-item">
            <div class="btn-common btn-green btn-submit btn-width-100" @click="handleModifyPwdClick">确定</div>
            <div class="btn-common btn-cancel btn-width-100" @click="modifyPwdVisible = false">取消</div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <confirm-component :visibleProps='forbiddenVisible'>
        <template #color5>
          确认要将此账号设为{{tableData[indexSelect] && tableData[indexSelect].status === '有效' ? '禁用':'启用'}}状态吗？
        </template>
        <p v-if="tableData[indexSelect] && tableData[indexSelect].status === '有效'">设置为禁用状态后，该账户将会被立即停用，无法登陆青矩平台，系统仍保留相关信息！</p>
        <p v-else>设置为有效状态后，该账户将会被立即启用。</p>
        <template #btn>
            <button @click="handleForbiddenClick">确定</button>
            <button @click="forbiddenVisible = false">取消</button>
        </template>
      </confirm-component>
    </div>
    <span class="J-operate" v-has="['cuasJ0', 'RFoulB', '5yWtNE', 'zs2AkG']"></span> 
  </div>
</template>
<script>
import addUserComponent from './userEdit'
import confirmComponent from '@/components/confirmComponent'
import filterComponent from '@/components/filterComponent'
import api from '@/fetch/api'
import authComponent from './roleNotAuth'
export default {
  components: {
    addUserComponent, 
    confirmComponent, 
    filterComponent,
    authComponent
  },
  data () {
    var validateFirstPwd = (rule, value, callback) => {
      if (!value) {
        callback('请输入新密码')
      } else if (value != this.modifyPwdData.secondPwd) {
        callback()
      }
    }
    var validateSecondPwd = (rule, value, callback) => {
      if (!value) {
        callback('请确认输入新密码')
      } else if (value != this.modifyPwdData.firstPwd) {
        callback('密码输入不一致')
      }
    }
    return {
      errIcon: 'this.src = "' + require('@/assets/img/err-header-icon01.png') + '"',
      operate: false,
      companyData: [
        {
          name: '按照组织架构查看',
          url: '/myqingju/frameManage'
        },
        {
          name: '未分配组织的用户',
          url: ''
        },
        {
          name: '按角色组查看',
          url: '/myqingju/rolesList'
        },
      ],
      structureNav:[],
      navData: [],
      navRolesData: [],
      navRolesDataCopy: [],
      navAnonymousData: [],
      tableData:[],
      modifyPwdData: {
        firstPwd: '',
        secondPwd: ''
      },
      rulePwd: {
        firstPwd: [
          {
            required: true, validator: validateFirstPwd, trigger: 'blur'
          }
        ],
        secondPwd: [
          {
            required: true, validator: validateSecondPwd, trigger: 'blur'
          }
        ],
      },
      currentPage : 1,
      editInfoVisible: false,
      setRolesVisible: false,
      modifyPwdVisible: false,
      forbiddenVisible: false,
      defaultProps: {
        children: 'deptInfoList',
        label: 'name'
      },
      dataForBE: {
        departmentId: '',
        firmId: '',
        inquiryMode: '',
        page: 1,
        pageSize: 20
      },
      total: 0,
      setRolesLists: [],
      indexSelect: '',
      filterStatusData: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '有效',
          value: '1'
        },
        {
          name: '无效',
          value: '0'
        },
      ],
      radSelectData: '', // 单选值
      chkSelectData: [],
      filterRolesData: [],
      keyword: '',
      navRolesSelected: ''
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      // console.log(row.status === '禁用')
      if (row.status === '禁用') {
        return 'warning-row';
      }
      return ''
    },
    graySetRole () {
      this.$message.error('暂不支持修改，若需修改，请联系相关人员...')
    },
    goDetails (item) {
      this.$router.push({
        path: '/myqingju/userDetails',
        query: {'userId': item.userId}
      })
    },
    tableHeaderClassName ({row, rowIndex, columnIndex}) {
      if (columnIndex === 4) {
        return 'text-right-header'
      }
    },
    handleStructureVisible (index) {
      this.$set(this.structureNav, index, !this.structureNav[index])
      this.navRolesSelected = ''
      switch (index) {
        case -1: 
          this.dataForBE.inquiryMode = ''
          this.dataForBE.departmentId = ''
          this.dataForBE.roleId = []
          this.getUserList()
          break;
        case 0:
          if (this.navData && this.navData.length === 0) {
            this.getOrganizeStructureList()
          }
          this.dataForBE.inquiryMode = ''
          this.dataForBE.departmentId = ''
          this.dataForBE.roleId = []
          this.getUserList()
          break;
        case 1:
          if (this.navAnonymousData && this.navAnonymousData.length === 0) {
            this.getOrganizeStructureList()
          }
          this.dataForBE.inquiryMode = '1'
          this.dataForBE.departmentId = ''
          this.dataForBE.roleId = []
          this.getUserList()
          break;
        case 2:
          if (this.navRolesData && this.navRolesData.length === 0) {
            this.getFirmRoles()
          }
          break;
      
        default:
          break;
      }
    },
     handleSizeChange (val) {
      this.dataForBE.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.dataForBE.page = val
      this.getUserList()
    },
    handleEditClick (index) {
      this.indexSelect = index
      this.editInfoVisible = true
    },
    handleSetRoles (index) {
      this.setRolesVisible = true
      this.indexSelect = index
      if (this.navRolesData && this.navRolesData.length === 0) {
        this.getFirmRoles()
      }
      this.setRolesLists = this.tableData[index].firmBaseRole.map(item => {
        // if (item.id !== '10000000-0000-0000-0000-000000000012') {}
          return item.id
      })
    },
    handleModifyPwd (index) {
      this.indexSelect = index
      this.modifyPwdVisible = true
    },
    handleForbidden (index) {
      this.indexSelect = index
      this.forbiddenVisible = true
    },
    handleForbiddenClick () {
      api.firmUserDisabled(this.tableData[this.indexSelect].userId).then(() => {
        this.$message({
          type: 'success',
          message: '更改成功!'
        })
        this.tableData[this.indexSelect].status === '有效' ? '无效' : '有效'
        this.forbiddenVisible = false
        this.getUserList()
      })
    },
    handleNodeClick(data) {
      this.dataForBE.departmentId = data.id
      this.dataForBE.roleId = []
      this.dataForBE.inquiryMode = ''
      this.navRolesSelected = ''
      this.dataForBE.page = 1
      this.currentPage = 1
      this.getUserList()
    },
    handleRolesList(role, index) {
      this.dataForBE.roleId = [role.id]
      this.dataForBE.departmentId = ''
      this.dataForBE.inquiryMode = ''
      this.navRolesSelected = index
      this.getUserList()
    },
    handleEditVisible () {
      this.editInfoVisible = false
      this.getUserList()
    },
    getOrganizeStructureList () {
      let id = JSON.parse(localStorage.firmId)
      api.getOrganizeStructureList(id)
      .then(res => {
        this.navData = res.dataList
      })
    },
    getFirmRoles () {
      let id = JSON.parse(localStorage.firmId)
      api.getFirmRoles(id).then(res => {
        this.navRolesDataCopy = res.dataList.filter(item => item.id != '10000000-0000-0000-0000-000000000012')
        this.navRolesData = res.dataList
      })
    },
    getUserList () {
      this.dataForBE.firmId = JSON.parse(localStorage.firmId)
      api.getUserList(this.dataForBE).then(res => {
        this.tableData = res.dataList
        this.total = res.count
      })
    },
    handleKeyword () {
      this.dataForBE.roleId = []
      this.dataForBE.departmentId = ''
      this.dataForBE.inquiryMode = ''
      this.dataForBE.keyword = this.keyword
      this.currentPage = 1
      this.dataForBE.page = 1
      this.getUserList()
    },
    handleModifyPwdClick(value) {
      if (this.modifyPwdData.firstPwd.trim() 
      && this.modifyPwdData.secondPwd.trim() 
      && this.modifyPwdData.firstPwd === this.modifyPwdData.secondPwd) {
        let data = {
          confirmPassword: this.modifyPwdData.secondPwd,
          newPassword: this.modifyPwdData.firstPwd,
          userId: this.tableData[this.indexSelect].userId 
        }
        api.changePassword(data).then(res => {
          this.$message.success('修改密码成功')
          this.modifyPwdVisible = false
        })
      } else {
        this.$refs['modifyPwdData'].validate()
      }
 
    },
    handleSetRolesClick () {
      let data = {
        firmId: JSON.parse(localStorage.firmId),
        roleIds: this.setRolesLists.filter(item => {
          if (item !== '10000000-0000-0000-0000-000000000012') {
            return item
          }
        }),
        userId:  this.tableData[this.indexSelect].userId 
      }
      api.setRole(data).then(res => {
        this.$message.success('设置角色成功')
        this.setRolesVisible = false
        this.getUserList()
      })
    },
    getRoleList () {
      let id = JSON.parse(localStorage.firmId)
      api.getRoleList(id).then(res => {
        this.filterRolesData = res.dataList.map(item => {
          item.value = item.id
          return item
        })
      })
    },
    filterClick (val) {
      this.currentPage = 1
      this.dataForBE.page = 1
      this.radSelectData = val.value
      if (val.value) {
        this.dataForBE.userStatus = [val.value]
      } else {
        this.dataForBE.userStatus = []
      }
      this.getUserList()
    },
    filterChkClick (val) {
      this.currentPage = 1
      this.dataForBE.page = 1
      if (val.length) {
        this.dataForBE.roleId = val
      } else {
        this.dataForBE.roleId = []
      }
      this.chkSelectData = val
      this.getUserList()
    },
    renderStatus (h, {column}) {
      return h(
        'div', [
          h('span', column.label),
          h('el-popover', {
            props: {
              trigger: 'click',
              'popper-class': 'minWidthChange', // 最小宽度重置
              'visible-arrow':false,
              'popper-class': 'filterPopver' 
            },
          },
          [
            h(filterComponent, { // 自定义不需要引号
              props: {
                filterData: this.filterStatusData,
                radSelectData: this.radSelectData
              },
              on: {
                filterClick: this.filterClick
              }
            }),
            h('span',
            {
              class: {
                triangle: true,
                'active-triangle': this.radSelectData
              },
              slot: 'reference'
            })
          ],
          ),
        ]
      )
    },
    renderRoles (h, {column}) {
      return h(
        'div', [
          h('span', column.label),
          h('el-popover', {
            props: {
              trigger: 'click',
              'visible-arrow':false,
              'popper-class': 'filterPopver' 
            },
          },
          [
            h(filterComponent, { // 自定义不需要引号
              props: {
                filterData: this.filterRolesData,
                chkSelectData: this.chkSelectData,
                multiple: true
              },
              on: {
                filterClick: this.filterChkClick
              }
            }),
            h('span',
            {
              class: {
                triangle: true,
                'active-triangle': this.chkSelectData.length
              },
              slot: 'reference'
            })
          ],
          ),
        ]
      )
    },
    beforeEnter (el) {
      el.style.height = '0';
    },
    enter (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      } else {
        el.style.height = '';
      }
      el.style.overflow = 'hidden';
    },
    afterEnter (el) {
      el.style.height = ''
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden';
    },
    leave (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = 0
      }
    }
  },

  mounted () {
    this.getUserList()
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
.qingju-user-memeber{
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  input::-webkit-input-placeholder {
    color: #999;
  }
  input[type="text"]{
    -web-kit-appearance:none;
    -moz-appearance: none;
    outline: 0;
    color: #999;
    border-bottom: 1px solid #C2CAD8;
    height: 24px;
    padding-bottom: 5px;
    padding-left: 20px;
    color: #666;
    min-width: 280px;
    // line-height: 24px;
  }
  .search{
    position: relative;
    span{
      cursor: pointer;
      &:before{
       content: '';
       display: inline-block;
       width: 10px;
       height: 10px;
       border: 1px solid #999;
       border-radius: 50%;
       position: absolute;
       left: 0;
       top: 5px;
     }
     &:after{
       content: '';
       display: inline-block;
       width: 1px;
       height: 5px;
       transform: rotate(-45deg);
       background-color: #999;
       position: absolute;
       left: 11px;
       top: 15px;
     }
    }
  }
  .user-menu{
    width: 300px;
    .title{
      line-height: 40px;
      font-size: 18px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      &:hover{
        color: #03B189;
      }
    }
  }
  .company-structure{
    min-width: 300px;
    .structure-title{
      height: 40px;
      line-height: 40px;
      position: relative;
      font-size: 14px;
      cursor: pointer;
      .icon{
        content: '';
        display: inline-block;
        width: 11px;
        height: 11px;
        border-left: 1px solid #D4D5D6;
        border-bottom: 1px solid #D4D5D6;
        margin-right: 10px; 
      }
      &:hover{
        color: #03B189;
      }
    }
    .to-path-text{
      float: right;
      position: relative;
      right: 15px;
      color: #03B189;
    }
  }
  .right-member{
    margin-left: 40px;
    flex: auto;
    overflow: hidden;
    .top{
      margin-bottom: 15px;
    }
    .title{
      font-size: 18px;
      color: #666;
    }
    .btn{
      float: right;
    }
  }
}
.pagination-layout{
  text-align: right;
  margin-right: 20px;
}
.myQingju-table{
  .header-icon{
    display: inline-block;
    width: 50px;
    height: 50px;
    // background-color: #03B189;
    border-radius: 50%;
    vertical-align: middle;
  }
  .info-right{
    display: inline-block;
    margin-left: 20px;
    line-height: 24px;
    vertical-align: middle;
  }
  .name{
    color: #00B38A;
    cursor: pointer;
  }
  .time{
    color: #999;
  }
}
/* 设置角色弹窗 */
.role-title{
  color: #888888;
  float: left;
}
.set-role-ul{
  float: left;
  .set-role-li{
    >p{
      color: #D5D4D4;
      margin-bottom: 20px;
    }
  }
  .el-checkbox{
    display: block;
    margin-bottom: 20px;
    &:first-child{
      margin-left: 30px;
    }
  }
}
.set-role-div{
  overflow: hidden;
  padding: 20px 20px 0;
}
.set-role-footer{
  padding-left: 85px;
}
.red-tip{
  color: #D71818;
  font-size: 12px;
  margin-bottom: 20px;
}
.btn-form-item{
  margin-top: 40px;
}
/* 角色列表 */
.roles-ul, .anonymous-ul{
  li{
    height: 40px;
    line-height: 40px;
    padding-left: 26px;
    color: #5a5e66;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    &:hover{
      background-color: #f5f7fa;
    }
  }
  .active-li{
    background-color: #f5f7fa;
  }
}
.user-tree, .roles-ul, .anonymous-ul {
  transition: height .8s;
}
.any-data{
  height: 30px;
  line-height: 30px;
  color: #5a5e66;
  text-align: center;
}
.delete-form{
  padding: 20px 20px 0;
}
.gray{
  &:hover{
    color: #999;
  }
}
</style>

<style>
.el-table .warning-row {
  background: rgba(242,242,242,1);
}
</style>
