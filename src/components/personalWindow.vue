<template>
  <div class="person-window">
    <div class="header clearfix">
      <img class="fl" :src="$store.state.userInfo.headPortraits" :onerror="errIcon" width="70px" height="70px">
      <div class="fl">
        <h5>
          <router-link to="">{{$store.state.userInfo.userName}}</router-link>
          <router-link to="/Setting/userAttestation">
            <img :src="require('@/assets/img/u452.png')" alt="" v-if="$store.state.userInfo.authType =='1'">
          </router-link>
          <router-link to="/Setting/userAttestation">
            <img :src="require('@/assets/img/u459.png')" alt="" v-if="$store.state.userInfo.authType =='2'">
          </router-link>
        </h5>
        <el-rate v-model="value" disabled text-color="#ff9900" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </div>
    </div>
    <div class="content">
      <ul>
        <li><img :src="require('@/assets/img/u10449.png')" width="12px" height="12px" alt="">
          <a href="javascript:;" @click="handleProject">我的项目</a>
        </li>
        <li><img :src="require('@/assets/img/u451.png')" width="12px" height="12px" alt="">
          <a href="javascript:;" @click="handleAccount">我的账户</a>
        </li>
        <li><img :src="require('@/assets/img/u449.png')" width="12px" height="12px" alt="">
          <router-link to="/benefits">福利专区</router-link>
        </li>
        <li><img :src="require('@/assets/img/u450.png')" width="12px" height="12px" alt="">
          <router-link to="/Setting/personInfo">资料设置</router-link>
        </li>
      </ul>
      <div class="projects" v-for="(item,index) in $store.state.noPayListData" :key="index">
        <h4 @click="gotoPages(item)"><img :src="require('@/assets/img/u774.png')" alt=""> {{item.name}}</h4>
        <div class="clearfix">
          <ul class="clearfix fl">
            <li v-for="i in item.engineers" :key="i.professional">{{i.professional}}</li>
          </ul>
          <span class="fr">待付款</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <span @click="logout">安全退出</span>
    </div>
    <!-- 权限 -->
    <span class="J-operateAccount" v-has="['spTkUC']"></span>
    <span class="J-operateProject" v-has="['5aLq6M', '8X2Lki']"></span>
  </div>
</template>
<script>
import api from "@/fetch/api";

export default {
  data() {
    return {
      value: 5,
      errIcon: 'this.src = "' + require('@/assets/img/err-header-icon01.png') + '"',
      operateAccount: false,
      operateProject: false
    }
  },
  methods: {
    // 注销
    logout() {
      // 学习平台退出
      // api.learnLoginOut('http://user.online.qingju.cn/sso/logout', 'ssoUserLogout', (result)=>{
      //   if(result){
      //     }
      // });
      let path = '/'
      window.location.href = 'http://user.online.qingju.cn/sso/logout?url=' + path
      api.logout().then(res => {
        window.localStorage.removeItem("QingjuuserId")
        window.localStorage.removeItem("firmId")
        window.localStorage.removeItem("QingjuTelePhone")
        window.localStorage.removeItem("QingjuAccount")
        window.localStorage.removeItem("authType")
        window.localStorage.removeItem("couponState")
        window.localStorage.removeItem("hasRedirect")
        window.localStorage.removeItem("statusString")
        window.localStorage.removeItem("isTzecc")
        window.localStorage.removeItem("accountInfo")
        /* 权限 */
        window.localStorage.removeItem("ROLES-qingju")
        window.localStorage.removeItem("firmCurrentUserInfo")
        sessionStorage.removeItem('navURL')
        this.$router.push('/')
        window.location.reload();
      })

    },
    getUserInfo() {
      api.getUserInfo().then(res => {
        if (!res.dataList[0].userName) res.dataList[0].userName = res.dataList[0].code || '青矩用户'
        // 考虑企业下用户
        res.dataList[0].id =  res.dataList[0].id
        this.$store.commit('setUserInfo', res.dataList[0])
        api.getNonPaymentProject(res.dataList[0].id).then(res => {
          this.$store.commit('setNoPayListData', res.dataList)
        })
      }).catch(err => {
      })
    },
    gotoPages(item) {
      if (item.engineers[0].professional === 'BIM') {
        window.open(`/myqingju/BIMDetail/${item.projectBaseId}`, '_blank');
      } else if (item.engineers[0].professional === '智能建模') {
        window.open(`/myqingju/modelingDetail/${item.projectBaseId}`, '_blank');
      } else {
        window.open(`/myqingju/projectDetail/${item.projectBaseId}`, '_blank');
      }
    },
    handleAccount () {
      if (this.operateAccount) {
        this.$router.push('/myqingju/financeCenter')
      } else {
        this.$message.error('您没有权限，如需开通，请联系管理人员')
      }
    },
    handleProject () {
      if (this.operateProject) {
        this.$router.push('/myqingju/project')
      } else {
        this.$message.error('您没有权限，如需开通，请联系管理人员')
      }
    }
  },
  mounted() {
    if (window.localStorage.QingjuAccount && !this.$store.state.userInfo.id) {
      this.getUserInfo()
    }
    // hack 操作的显示
    let dNoneoperateAccount = document.getElementsByClassName('J-operateAccount')[0]
    if (dNoneoperateAccount && !dNoneoperateAccount.style.display) {
      this.operateAccount = true
    }
    // hack 操作的显示
    let dNoneoperateProject = document.getElementsByClassName('J-operateProject')[0]
    if (dNoneoperateProject && !dNoneoperateProject.style.display) {
      this.operateProject = true
    }
  }
}
</script>
<style lang="less" scoped>
.person-window {
  box-sizing: border-box;
  width: 300px;
  max-height: 400px;
  background-color: #fff;
  padding: 0 18px;
  box-shadow: -1px 1px 7px #ccc;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  &::-webkit-scrollbar-button {
    height: 0;
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  .header {
    padding-top: 30px;
    > img {
      border-radius: 50%;
      overflow: hidden;
    }
    > div {
      margin-left: 20px;
      > h5 {
        margin: 10px 0;
        font-size: 14px;
        a:first-child {
          display: inline-block;
          vertical-align: middle;
          max-width: 130px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  .content {
    width: 262px;
    > ul {
      margin-top: 25px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > li {
        flex: 0 0 128px;
        width: 128px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background-color: #f3f5f7;
        font-size: 13px;
        &:nth-child(n + 3) {
          margin-top: 5px;
        }
        > img {
          margin-left: -10px;
          margin-right: 10px;
          vertical-align: baseline;
        }
        > a {
          &:hover {
            color: rgb(0, 157, 76);
            text-decoration: underline;
          }
        }
      }
    }
    .projects {
      padding: 12px 0 20px;
      border-bottom: 1px solid #e4e4e4;
      > h4 {
        cursor: pointer;
        font-size: 14px;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      > div {
        > ul {
          padding-left: 4px;
          > li {
            float: left;
            font-size: 13px;
            width: 95px;
            height: 23px;
            line-height: 23px;
            text-align: center;
            color: #fff;
            &:nth-child(1) {
              background-color: #e0972a;
            }
            &:nth-child(2) {
              background-color: #e92634;
            }
            margin-top: 13px;
            & + li {
              margin-left: 8px;
            }
          }
        }
        > span {
          color: #009d4c;
          font-size: 12px;
          margin-top: 20px;
        }
      }
    }
  }
  .footer {
    text-align: right;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #666;
    > span {
      cursor: pointer;
    }
  }
}
</style>
