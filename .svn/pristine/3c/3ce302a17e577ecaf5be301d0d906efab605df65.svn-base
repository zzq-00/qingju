<template>
  <div>
    <headerComponent></headerComponent>
    <div class="my-qingju-main" v-if="operate">
      <div class="user-contaienr"> 
        <div class="top-container"><!-- 限制条件： 不是个人用户；企业用户不能是管理员 -->
          <p class="top-button" v-if="(userInfo.userCategory === '1' || userInfo.userCategory === '0') && !isRoot">
            <button class="btn-common btn-cancel btn-width-100" @click="forbiddenVisible = true" v-if="userInfo.userStatus !== '2'">
              {{userInfo.userStatus === '1' ? '禁用账号' : '启用账号'}}
            </button>
            <button class="btn-common btn-submit btn-width-100" @click="setRolesVisible = true">编辑角色</button>
          </p>
          <img :src="userInfo.headPortrait" :onerror="errIcon" alt=""  class="left-img">
          <div class="right-container">
            <p class="name">{{userInfo.userName || userInfo.code}}</p>
            <p class="row-top-15" v-if="userInfo.userCategory === '1' || userInfo.userCategory === '0'">
              <span class="col" v-if="userInfo.credentials">
                <span class="title">所属机构：</span>
                <span class="text">{{userInfo.credentials}}</span>
              </span>
              <span class="col beforeLine" v-if="userInfo.userRole">
                <span class="title">用户角色：</span>
                <span class="text">{{userInfo.userRole}}</span>
              </span>
              <span class="col beforeLine" v-if="userInfo.organization">
                <span class="title">组织架构：</span>
                <span class="text">{{userInfo.organization}}</span>
              </span>
            </p>
            <!-- <p v-else>
              <span class="col">
                <span class="title">认证信息：</span>
                <span class="text">{{userInfo.credentials}}</span>
              </span>
            </p> -->
            <p class="row-top-30">
              <span class="email"><span class=" el-icon-goods dis-span"></span>{{userInfo.code}}</span>
            </p>
            <p class="row-top-15">
              <span class="num" v-if="userInfo.phoneNumber"><span class="dis-span el-icon-mobile-phone"></span>{{userInfo.phoneNumber}}</span>
              <span class="num" v-if="userInfo.email"><span class="dis-span el-icon-message"></span>{{userInfo.email}}</span>
              <span class="num " v-if="userInfo.dateAdded"><span class="dis-span el-icon-time"></span>{{userInfo.dateAdded}}</span>
            </p>
          </div>
        </div>
        <userComponent></userComponent>
      <el-dialog title="设置角色" width="600px" :visible.sync='setRolesVisible' class="msg-dialog">
        <div class="set-role-div">
          <span class="role-title">选择角色</span>
          <ul class="set-role-ul">
            <li class="set-role-li" v-for="item in navRolesData" :key="item.id">
              <el-checkbox v-model="roleSelect" :label="item.id">{{item.name}}</el-checkbox>
              <span class="details">{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="set-role-footer">
          <p class="red-tip">注：分配角色后，需要退出登录，选择角色生效。</p>
          <div class="btn-common btn-green btn-submit btn-width-100" @click="handleSetRolesClick">确定</div>
          <div class="btn-common btn-cancel btn-width-100" @click="setRolesVisible = false">取消</div>
        </div>
      </el-dialog>
      </div>
    </div>
    <!-- 或改为页面 -->
    <!-- <span v-else> 您没有查看用户详情的权限， 请联系相关负责人分配 </span> -->
    <no-auth v-else class="margin-top-100"></no-auth>
    <span class="J-operate-details" v-has="['BrgVjk']"></span>
    <confirm-component :visibleProps='forbiddenVisible'>
        <template #color5>
          确认要将此账号设为禁用状态吗？
        </template>
        <p v-if="userInfo.status === '有效'">设置为禁用状态后，该账户将会被立即停用，无法登陆青矩平台，系统仍保留相关信息！</p>
        <p v-else>设置为有效状态后，该账户将会被立即启用。</p>
        <template #btn>
            <button @click="handleForbiddenClick">确定</button>
            <button @click="forbiddenVisible = false">取消</button>
        </template>
      </confirm-component>
  </div>
</template>
<script>
import headerComponent from '@/components/qingjuHeader'
import noAuth from '@/components/noAuth'
import userComponent from './userDetailsComponent/index'
import confirmComponent from '@/components/confirmComponent'
import api from '@/fetch/api'
export default {
  components:{
    headerComponent,
    userComponent,
    confirmComponent,
    noAuth
  },
  data () {
    return {
      errIcon: 'this.src = "' + require('@/assets/img/err-header-icon01.png') + '"',
      operate: false,
      setRolesVisible: false,
      navRolesData: [],
      userInfo: {},
      roleSelect: [],
      forbiddenVisible: false,
      isRoot: false // 不是管理员
    }
  },
  methods: {
     handleSetRolesClick () {
      let data = {
        firmId: JSON.parse(localStorage.firmId),
        roleIds: this.roleSelect,
        userId:  this.$route.query.userId
      }
      api.setRole(data).then(res => {
        this.$message.success('设置角色成功')
        this.setRolesVisible = false
      })
    },
    getFirmRoles () {
      let id = JSON.parse(localStorage.firmId)
      api.getFirmRoles(id).then(res => {
        this.navRolesData = res.dataList.filter(item => item.id != '10000000-0000-0000-0000-000000000012')
      })
    },
    getUserInfo () {
      api.getDiffUserInfo(this.$route.query.userId).then(res => {
        this.userInfo = res.dataList[0]
      })
    },
    handleForbiddenClick () {
      api.firmUserDisabled(this.$route.query.userId).then(() => {
        this.$message({
          type: 'success',
          message: '更改成功!'
        })
        this.userInfo.status === '有效' ? '无效' : '有效'
        if (this.userInfo !== '2') {
          let status = this.userInfo.userStatus === '1' ? '0' : '1'
          this.userInfo.userStatus = status
        }
        this.forbiddenVisible = false
      })
    },
    
  },
  mounted () {
    this.getFirmRoles()
    this.getUserInfo()
     // hack 操作的显示
    let dNoneoperate = document.getElementsByClassName('J-operate-details')[0]
    if (dNoneoperate&&!dNoneoperate.style.display) {
      this.operate = true
    }
    // isRoot
    let roles = JSON.parse(localStorage.firmCurrentUserInfo)
    this.isRoot = roles && roles.baseRole.some(item => {
      return item.id === '10000000-0000-0000-0000-000000000011'
    })
  }
}
</script>
<style lang="less" scoped>
.my-qingju-main{
  margin-top: 90px;
}
.user-contaienr{
  padding: 50px 30px 30px;
  background-color: #fff;
  font-size: 14px;
  width: 100%;
}
.top-container{
  overflow: hidden;
  .top-button{
    text-align: right;
  }
  .btn-common{
    height: 30px;
    line-height: 30px;
  }
  .left-img{
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 50px;
    // background-color: #999;
    vertical-align: top;
  }
  .right-container{
    display: inline-block;
    .row-top-15{
      margin-top: 15px;
    }
    .row-top-30{
      margin-top: 30px;
    }
    .title{
      color: #999;
      // padding-left: 10px;
    }
    .email{
      color: #666;
    }
    .num{
      margin-right: 30px;
    }
  }
  .name{
    font-size: 30px;
  }
  .col{
    padding-right: 10px;
  }
  .text{
    text-decoration: underline;
  }
  .beforeLine{
    &:before{
      content: '';
      display: inline-block;
      width: 2px;
      height: 15px;
      background-color: #666;
      margin-right: 10px;
      margin-left: 5px;
      vertical-align: middle;
      position: relative;
      bottom: 3px;
    }
  }
}
/* 设置角色弹窗 */
.role-title{
  color: #888888;
  float: left;
}
.set-role-ul{
  float: left;
  margin-left: 20px;
  .set-role-li{
    >p{
      color: #D5D4D4;
      margin-bottom: 20px;
    }
  }
  .set-role-li + .set-role-li{
    margin-top: 20px;
  }
  .details{
    color: #D5D4D4;
  }
}
.set-role-div{
  overflow: hidden;
  padding: 30px;
  padding-bottom: 10px;
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
.dis-span{
  padding-right:5px;
}
.margin-top-100{
  margin-top: 100px;
}
</style>
