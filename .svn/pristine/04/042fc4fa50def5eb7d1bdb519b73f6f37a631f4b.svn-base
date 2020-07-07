<template>
  <div class="add-users-container">
    <div class="left">
      <div class="left-tags">
        <!-- v-if="tag.checked" -->
        <el-tag
          v-for="tag in $store.state.rolesList.userList"
          :key="tag.id"
          v-if="tag.fixed"
          type="info"
          :disable-transitions="false">
          <span>{{tag.name}}</span>
        </el-tag>
        <el-tag
          v-for="tag in $store.state.rolesList.userList"
          :key="tag.id"
          v-if="!tag.fixed"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          <span>{{tag.name}}</span>
        </el-tag>
        <el-popover trigger="manual" v-model="popoverVisible"  placement="bottom-start">
          <div class="result-block" v-for="item in searchData" :key="item.code" @click="getUser(item)">
            <img :src="item.headPortraits" :onerror="errIcon" class="icon-head"/>
            <div class="result-right">
              <p>账号：{{item.code}}</p>
              <p>用户名：{{item.userName}}</p>
              <p>账号：{{item.code}}</p>
              <p>
                {{$store.state.userInfo.companyName}} - 
                <span v-for="role in item.firmBaseRole" :key="role.id">{{role.name}}</span>
              </p>
            </div>
          </div>
          <div v-if="!searchData.length" class="no-result-block">
            没有匹配到任何结果
          </div>
          <input  slot="reference" v-model="searchUser" class="search-input" @input="getSearchData" placeholder="搜索"/>
        </el-popover>
      </div>
      <div class="btn-box">
        <button class="btn-common  btn-width-100" 
          :class="{'btn-submit': $store.state.rolesList.userList.length}"
          @click="handleSubmit">确定</button>
        <button class="btn-common btn-cancel btn-width-100" @click="handleCancel">取消</button>
      </div>
    </div>
    <div class="right">
      <div v-show="$store.state.rolesList.currentLevel == 0"> 
        <p class="title">{{$store.state.userInfo.companyName}}</p>
        <div class="company-structure" v-for="(item, index) in companyData" :key="item.name">
          <p class="structure-title" @click="handleStructureVisible(index)">
            {{item.name}}
          </p>
        </div>
      </div>
      <div v-show="$store.state.rolesList.currentLevel != 0">
        <!-- 组织架构 -->
        <div v-show="navData  && selectedIndex === 0">
          <roles-component :dataItem="navData" v-if="navData.length"
          :levelInComponent='1'></roles-component>
          <p v-else>暂无数据</p>
        </div>
        <!-- 未分配用户 -->
        <div v-show="navAnonymousData && selectedIndex === 1">
         <chk-component :listsData="navAnonymousData"></chk-component>
        </div>
        <!-- 角色 -->
        <div v-show="rolesList　&& selectedIndex === 2">
          <div v-show="$store.state.rolesList.currentLevel === 1">
            <bream></bream>
            <ul class="roles-list" v-if="rolesList.length">
              <li v-for="list in rolesList" :key="list.id" @click="getRolesData(list)">
                {{list.name}}
                <span class="fr fr-arrow">></span>
              </li>
            </ul>
            <p v-else class="no-data">暂无数据</p>
          </div>
          <!-- 不重复 -->
         <chk-component v-if="$store.state.rolesList.currentLevel === 2" :listsData="navRolesData"></chk-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import rolesComponent from './rolesaddComponent'
import chkComponent from './rolesChkComponent'
import api from '@/fetch/api'
import bream from './rolesaddBream'
export default {
  components: {
    rolesComponent,
    chkComponent,
    bream
  },
  props: ['popoverParent'],
  data () {
    return {
      errIcon: 'this.src = "' + require('@/assets/img/err-header-icon01.png') + '"',
      companyData: [
        {
          name: '按照组织架构查看',
          level: '0'
        },
        {
          name: '未分配组织的用户',
          level: '0'
        },
        {
          name: '按角色组查看',
          level: '0'
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      structureNav:[],
      navData: [],
      navAnonymousData: [],
      dataForBE: {
        departmentId: '',
        firmId: '',
        inquiryMode: '',
        page: 1,
        pageSize: 10000
      },
      rolesList: [],
      navRolesData: [],
      searchUser: '', // 筛选输入值
      searchData: [],
      selectedIndex: '',
      dataForSearch: {
        page: 1,
        pageSize: 10000,
        departmentId: '',
        firmId: JSON.parse(localStorage.firmId),
        inquiryMode: '',
      },
      popoverVisible: false
    }
  },
  watch: {
    searchUser: function (val) {
      if (!val.trim()) {
        this.popoverVisible = false
      }
    },
    '$store.state.rolesList.userVisible': function (val) {
      if (!val) {
        this.popoverVisible = val
        this.searchUser = ''
      }
    }
  },
  methods: {
    getSearchData () {
      this.searchData = []
      if (this.searchUser.trim()) {
        this.popoverVisible = true
        this.dataForSearch.keyword = this.searchUser
        api.getUserList(this.dataForSearch).then(res => {
          this.searchData = res.dataList
        })
      } else {
        this.popoverVisible = false
      }
    },
    getUser (item) {
      let dataForBE = {
        name : item.userName || item.code,
        id: item.userId
      }
      let res = true
      res = this.$store.state.rolesList.userList.every(data => {
        if (dataForBE.id === data.id) {
          this.$message.error('不能重复添加数据')
          this.popoverVisible = false
          return false
        } else {
          return true
        }
      })
      if (res) {
        this.searchUser = ''
        this.$store.commit('PUSHUSER', dataForBE)
      }
    },
    handleStructureVisible (index) {
      this.selectedIndex = index
      switch (index) {
        case 0:
          if (!this.navData.length) {
            this.getDepartmentById(index);
          }
          break;
        case 1: 
          if (!this.navAnonymousData.length) {
            this.dataForBE.inquiryMode = '1'
            this.getUserList().then(val => {
              this.navAnonymousData = val
            })
          }
          break;
        case 2: 
          if (!this.rolesList.length) {
            this.getRoleList()
          }
          break;
        default:
          break;
      }
      // 面包屑和展示第一级
      this.$store.commit('PUSHBREAD', this.companyData[index])
      this.$store.commit('SETLEVEL', 1)
    },
    getUserList () {
      return new Promise((resolve, reject) => {
        this.dataForBE.firmId = JSON.parse(localStorage.firmId)
        api.getUserList(this.dataForBE).then(res => {
          let data = res.dataList.map(item => {
            let objItem = {
              id: item.userId,
              name: item.userName || item.code
            }
            return objItem
          })
          resolve(data)
        })
      })
    },
    getRoleList(){
      api.getRoleList(JSON.parse(localStorage.firmId)).then(res => {
        this.rolesList = res.dataList.map(item => {
          item.level = 1
          return item
        })
      })
    },
    getRolesData(list) {
      this.dataForBE.rolesId = [list.id]
      this.dataForBE.inquiryMode = ''
      this.$store.commit('SETLEVEL', 2)
      this.$store.commit('PUSHBREAD', list)
      this.getUserList().then(val => {
        this.navRolesData = val
      })
    },
    handleNodeClick(){},
    handleClose(val){
      this.$store.commit('POPUSER', val)
    },
    // 公司下第一级子部门列表
    getDepartmentById (index) {
      api.getDepartmentById(JSON.parse(localStorage.firmId)).then(res => {
        res.dataList.forEach(item => {
          item.level = 1
          item.checked = false
          item.depart = true
          this.navData.push(item)
        })
      })
    },
    handleSubmit(){
      if (this.$store.state.rolesList.userList.length) {
        let data = {
          firmId: JSON.parse(localStorage.firmId),
          roleId: sessionStorage.rolesId,
          userId: this.$store.state.rolesList.userIdstate.map(item => {
            if (!item.fixed) {
              return item.id
            }
          }).filter(item => item),
          deptId: this.$store.state.rolesList.deptIdstate.map(item => {
            if (!item.fixed) {
              return item.id
            }
          }).filter(item => item)
        }
        api.setUpAnAccount(data).then(res => {
          this.$message.success('添加成功')
          this.$store.commit('DIALOGTOGGLE')
        })
      } else {
        this.$message.warning('请至少选择一位新成员')
      }
    },
    handleCancel () {
      this.$store.commit('DIALOGTOGGLE')
      this.popoverVisible=false
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
  }
}
</script>
<style lang="less" scoped>
.add-users-container{
  overflow: hidden;
}
.left{
  border-right: 1px solid #ccc;
  padding: 20px 10px;
  float: left;
}

.left-tags{
  min-height: 500px;
  width: 280px;
}
.el-tag{
  // &:first-child{
    //   margin-left: 10px;
  // }
  margin-right: 10px;
  margin-bottom: 10px;
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
.right::-webkit-scrollbar {
  display: none;
}
.right{
    padding-top: 30px;
    max-height: 550px;
    overflow-y: auto;
    position: relative;
    float: left;
    width: 290px;
    overflow: -moz-hidden-unscrollable;
    -ms-overflow-style: none;
    
    .title{
      padding-left: 20px;
      font-size: 32px;
      margin-bottom: 10px;
      line-height: 50px;
      height: 50px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
}
.structure-title{
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  cursor: pointer;
  &:hover{
    background-color: aliceblue;
  }
  &:before{
    content: '';
    display: inline-block;
    width: 11px;
    height: 11px;
    border-left: 1px solid #D4D5D6;
    border-bottom: 1px solid #D4D5D6;
    margin-right: 10px; 
  }
}
.roles-list{
  > li {
    cursor: pointer;
    padding-left: 20px;
    display: block;
    height: 40px;
    line-height: 40px;
    &:hover{
      background-color: aliceblue;
    }
  }
}
.fr-arrow{
  position: relative;
  right: 20px;
}
.btn-box{
  padding-left: 20px;
}
.no-data{
  padding-left: 20px;
  margin-top: 20px;
}
.search-input{
  width: 100%;
  outline: none;
  height: 32px;
  line-height: 24px;
}
.icon-head{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: top;
  margin-right: 10px;
}
.result-right{
  display: inline-block;
  width: 190px;
  > p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.result-block{
  padding: 5px 0;
  width: 255px;
}
.no-result-block{
  height: 50px;
  line-height: 50px;
  width: 255px;
}
.result-block + .result-block{
  border-top: 1px solid #D4D5D6;
}
</style>
