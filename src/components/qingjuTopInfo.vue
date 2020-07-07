<template>
  <div class="top-info" :style="{backgroundImage: 'url(' + bgIMG + ')', backgroundColor: bgDefault}">
    <div class="my-qingju-main">
      <div class="top-info-left">
        <img :src="userInfo.headPortrait" :onerror="errIcon" alt="" class="top-icon">
        <div class="user-info">
          <p>
            <span class="user-name">{{$store.state.userInfo.userName}}</span>
            <span class="user-flag" v-if="$store.state.userInfo.userCategoryCode === '1' || $store.state.userInfo.userCategoryCode === '0' " :title="userInfo.credentials"></span>
          </p>
          <div class="user-company-info" :title="`${userInfo.credentials} | ${userInfo.code} | ${userInfo.userRole} | 邀请码：${userInfo.invitationCode}`">
            <span v-if="userInfo.credentials">{{userInfo.credentials}}</span>
            <span v-if="userInfo.code">{{userInfo.code}}</span>
            <span v-if="userInfo.userRole">{{userInfo.userRole}}</span>
            <span v-if="userInfo.invitationCode&& $store.state.userInfo.isFriend">邀请码：{{userInfo.invitationCode}}</span>
          </div>
          <!-- <div class="more-text">
            更多操作
            <ul class="more-container"  v-if="false">
              <li>编辑个人资料</li>
              <li>编辑个人资料</li>
              <li>编辑个人资料</li>
            </ul>
          </div> -->
        </div>
      </div>
      <div class="top-info-right">
        <div class="right-block">
          <div class="info-right-list" v-has="['5aLq6M', '8X2Lki']">
            <p class="num">{{userInfo.releaseQuantity||0}}</p>
            <p>发布项目</p>
          </div>
          <div class="info-right-list" v-has="['spTkUC']">
            <p class="num">{{userInfo.accountBalance|formatMoney}}</p>
            <p>账户总额</p>
          </div><!-- userCategoryCode : '' 2个人版：老用户 新用户 0 1：企业账号 企业下账号    -->
          <div class="info-right-list" v-has="['SzqO1Q', 'M8JTNi']" v-if="$store.state.userInfo.userCategoryCode === '1' || $store.state.userInfo.userCategoryCode === '0' ">
            <p class="num">{{userInfo.numberOfMembers||0}}</p>
            <p>用户组</p>
          </div>
        </div>
        <!-- <router-link to="/myqingju/design">装饰封面</router-link> -->
        <div class="btn-container"><!-- 装饰封面触发区域 -->
          <span  class="btn-design" @click="goDesignPage">装饰封面</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  data () {
    return {
      userInfo: [],
      bgIMG: '',
      errIcon: 'this.src = "' + require('@/assets/img/err-header-icon01.png') + '"',
      bgDefault: ''
    }
  },
  watch: {
    '$store.state.headerIcon' (val) {
      this.bgIMG = val
    }
  },
  methods: {
    goDesignPage () {
      this.$store.commit('changeHeaderIcon', true)
    }
  },
  mounted () {
    api.getFrontDeskUserInfo(JSON.parse(localStorage.QingjuuserId)).then(res => {
      this.userInfo = res.dataList[0]
      this.bgIMG = this.userInfo.cover
      this.bgDefault = '#99cc33'
    })
    this.$store.commit('changeHeaderIcon', false)
  }
}
</script>
<style lang="less" scoped>
  .top-info{
    position: relative;
    height: 160px;
    color: #fff;
    margin-top: 60px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .top-icon{
    display: inline-block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #fff;
    margin-top: 20px;
  }
  .user-info{
    display: inline-block;
    margin-left: 40px;
    margin-top: 25px;
    vertical-align: top;
  }
  .user-name{
    font-size: 36px;
  }
  .user-flag{
    display: inline-block;
    cursor: pointer;
    line-height: 35px;
    width: 80px;
    padding-left: 40px;
    color: #fff;
    background-color: rgba(0, 179, 138, 1);
    position: relative;
    top: -7px;
    left: 15px;
    &:after{
      content: '企业认证';
      font-size: 14px;
      display: inline-block;
      line-height: 35px;
    }
    &:before{
      content: '';
      position: absolute;
      left: 15px;
      top: 8px;
      width: 16px;
      height: 18px;
      background: url('../assets/img/company-auth-icon.png') center center no-repeat;
    }
  }
  .user-company-info{
    margin-top: 30px;
    span{
      padding:0 10px;
      border-left: 1px solid #fff;
      &:last-child{
        border-right: 1px solid #fff;
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .user-company-info{
      width: 350px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  @media screen and (min-width: 1600px) and (max-width: 1750px) {
    .user-company-info{
      width: 400px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .more-text{
    position: relative;
    margin-top: 10px;
  }
  .more-container{
    position: absolute;
    top: 5px;
  }
  .top-info-right{
    margin-top: 30px;
    .info-right-list{
      min-width: 200px;
      text-align: center;
      border-left: 1px solid;
      display: inline-block;
      .num{
        font-size: 30px;
        padding: 10px;
      }
    }
    .info-right-list:last-child{
      border-right: 1px solid;
    }
  }
  .btn-container{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100px;
    .btn-design{display: none;}
    &:hover{.btn-design{display: block;}}
    .btn-design{
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 80px;
      height: 30px;
      line-height: 30px;
      background-color: #fff;
      border-radius: 20px;
      border-bottom-right-radius: 0;
      color: #00B38B;
      text-align: center;
      border: 1px solid #00B38B;
      cursor: pointer;
    }
  }
</style>
