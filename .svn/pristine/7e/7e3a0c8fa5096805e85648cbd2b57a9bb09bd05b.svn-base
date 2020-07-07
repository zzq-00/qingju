<template>
<div>
  <div class="auth-container">
    <img src="../assets/img/auth.png" alt="" class="img">
    <div class="content">
      <p class="green">
        您没有访问权限，请联系企业相关管理人员
      </p>
      <div class="deal-box">
        <p>
          <span>你还可以：</span>
          <!-- <a href="javascript:window.history.go(-1)" class="blue">返回上一页</a> -->
        </p>
        <div class="click-div">
          <p>
            <router-link class="blue text" to="/">返回网站首页</router-link>
          </p>
          <p>
            <router-link class="blue text" to="/login">返回登录界面</router-link>
          </p>
          <p>
            <router-link class="blue text" to="/info/Contact">联系我们</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
   <!-- <footerComponents></footerComponents> -->
  </div>
</template>
<script>
import footerComponents from './footerComponents'
export default {
  components: {footerComponents},
  beforeDestroy () {
    sessionStorage.removeItem('navURL')
  }
}
</script>

<style lang="less" scoped>
.auth-container{
  width: 80vw;
  height: 50vh;
  min-height: 400px;
  margin: 100px auto;
  margin-top: 0;
  margin-bottom: 40px;
  background-color: #fff;
  position: relative;
}
.img{
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
}
.content{
  position: absolute;
  left: 50%;
  top: 30%;
  .deal-box{
    font-size: 14px;
    margin-left: 60px;
    .blue{
      color: #0EAF63;
    }
  }
}
.green{
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 60px;
}
.click-div{
  margin-left: 50px;
  > p{
    margin-bottom: 10px;
  }
}
</style>
