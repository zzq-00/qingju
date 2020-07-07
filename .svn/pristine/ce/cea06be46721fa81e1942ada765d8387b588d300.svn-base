<template>
  <header class="register-header">
    <div class="container">
      <router-link class="logo" to="/"></router-link>
      <span class="title">找回密码</span>
      <div class="fr">
        <span class="register-path" @click="gotoLogin">青矩首页</span>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    gotoLogin() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.register-header {
  font-size: 14px;
  background-color: #fcfafa;
  padding: 6px;
  .title {
    font-size: 24px;
    color: #707070;
    font-weight: bold;
    margin-left: 30px;
    vertical-align: middle;
    &:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 20px;
      background-color: #707070;
      margin-right: 30px;
    }
  }
}
.logo {
  display: inline-block;
  vertical-align: middle;
  width: 110px;
  height: 47px;
  background: url(../assets/logo.png) no-repeat center;
  background-size: cover;
}
.fr {
  position: relative;
  top: 13px;
  span {
    cursor: pointer;
  }
  span + span {
    margin-left: 20px;
  }
  .register-path:hover {
    color: #24b892;
  }
}
</style>
