<template>
  <header class="qingju-header">
    <div class="header-flex my-qingju-main">
      <div class="qingju-header-left">
        <!-- userCategoryCode : '' 2个人版：老用户 新用户 0 1：企业账号 企业下账号    -->
        <router-link class="logo" to="/">{{$store.state.userInfo.userCategoryCode === '1' || $store.state.userInfo.userCategoryCode === '0' ? '企业版' : '个人版'}}</router-link>
        <ul class="qingju-header-nav">
          <li class="qingju-header-li" v-for="(item, index) in navData" :key="item.name" :class="{'li-active': selectIndex === index}">
            <span @click="handleClick(item, index)">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="qingju-header-right" @mouseenter="showFloatWindow = true">
        <span class="name">{{$store.state.userInfo.userName}}</span>
        <img :src="$store.state.userInfo.headPortraits" alt="" :onerror="errIcon" class="right-header-icon">
      </div>
    </div>
    <div v-show="showFloatWindow" @mouseleave="showFloatWindow = false">
      <personal-window class="float-window" />
    </div>
  </header>
</template>
<script>
import personalWindow from '@/components/personalWindow'
export default {
  components: {
    personalWindow
  },
  data() {
    return {
      navData: [
        {
          name: '我的青矩',
          url: '/myqingju'
        },
        {
          name: '资料设置',
          url: '/Setting'
        },
        {
          name: '系统信息',
          url: '/information' // 要换个名
        }
      ],
      errIcon: 'this.src = "' + require('@/assets/img/err-header-icon01.png') + '"',
      showFloatWindow: false,
      selectIndex: ''
    }
  },
  methods: {
    handleClick(item, index) {
      this.selectIndex = index
      // index === 0 && (item.url = sessionStorage.navURL)
      this.$router.push(item.url)
    }
  },
  mounted() {
    // console.log(this.$route)
    this.navData.forEach((item, index) => {
      if (item.url.includes(this.$route.matched[0].path)) {
        this.selectIndex = index
      }
    })
  }
}
</script>

<style lang="less" scoped>
.qingju-header {
  background-color: #fff;
  box-shadow: 0 0 10px #ccc;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.header-flex {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  color: #707070;
  font-size: 30px;
  float: left;
  margin-top: 7px;
  display: flex;
  align-items: center;
  &:before {
    content: '';
    width: 46px;
    height: 45px;
    background: url('../assets/img/qingju-header-icon.png') no-repeat center;
  }
  &:after {
    content: '';
    width: 2px;
    height: 20px;
    background-color: #707070;
    margin: 0 40px;
  }
}
.qingju-header-nav {
  height: 60px;
  font-size: 18px;
  color: #666;
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.qingju-header-li {
  cursor: pointer;
}
.li-active {
  color: #0eaf63;
  position: relative;
  a {
    color: #0eaf63;
  }
  &:after {
    content: '';
    position: absolute;
    width: 70px;
    height: 2px;
    bottom: -8px;
    left: 0;
    background-color: #0eaf63;
  }
}

.qingju-header-right {
  cursor: pointer;
  .name {
    // color: #666;
    position: relative;
    &:after {
      content: '';
      display: inline-block;
      margin-left: 10px;
      width: 0;
      height: 0;
      border-top: 5px solid #666;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      position: relative;
      top: -3px;
    }
  }
  .right-header-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: #cccccc;
    border-radius: 50%;
    margin-left: 20px;
  }
}
.float-window {
  position: absolute;
  top: 60px;
  right: 10px;
  z-index: 1;
}
</style>
