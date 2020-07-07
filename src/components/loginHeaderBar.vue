<template>
  <div class="login container clearfix">
    <div class="fl">
      <!-- <a target="_blank" href="http://www.tzecc.com/">天职咨询集团</a> -->
      <router-link to="/Setting/personInfo" v-if="$store.state.userInfo.userName">您好，{{$store.state.userInfo.userName}}</router-link>
    </div>
    <div class="fr">
      <router-link to="/login" v-if="!$store.state.userInfo.userName">登录</router-link>
      <router-link to="/register/person" v-if="!$store.state.userInfo.userName">注册</router-link>
      <router-link to="/myqingju" v-if="$store.state.userInfo.userName" @mouseenter.native="showFloatWindow = true">我的青矩</router-link>
      <a href="javascript:;" @click="showInquiry">证书查询</a>
      <!-- <a href="/info/Introduction" target="_blank">关于我们</a> -->
      <a href="javascript:;" class="wechat-code">
        青矩微信
        <img src="@/assets/img/wechat.jpg" alt="微信二维码" width="120px" height="120px">
      </a>
      <router-link to="/en/poster">English</router-link>
    </div>
    <div class="float-window" v-show="showFloatWindow" @mouseleave="showFloatWindow = false">
      <personalWindow />
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import personalWindow from '@/components/personalWindow'

export default {
  components: {
    personalWindow
  },
  data() {
    return {
      showFloatWindow: false
    }
  },
  methods: {
    showInquiry() {
      if (!this.$store.state.userInfo.id) {
        this.$message.error('未登录，请登录后再进行该操作')
        this.$router.push('/login')
        return
      }
      this.$store.commit('changeCertificate', true)
    }
  },
  mounted() {}
}
</script>

<style lang='less' scoped>
.login {
  font-size: 12px;
  position: relative;
  > div {
    &:not(.float-window) {
      height: 30px;
      line-height: 30px;
    }
    &:nth-child(2) {
      > a {
        padding: 2px 10px;
        & + a {
          border-left: 1px solid #bcbcbc;
        }
        &:hover {
          text-decoration: underline;
          color: #2d9769;
        }
        &.wechat-code {
          position: relative;
          > img {
            display: none;
            position: absolute;
            left: -42px;
            top: 28px;
          }
          &:hover {
            > img {
              display: block;
              z-index: 101;
            }
          }
        }
      }
    }
  }
}

.float-window {
  position: absolute;
  top: 31px;
  right: 0px;
  z-index: 5;
}
</style>
