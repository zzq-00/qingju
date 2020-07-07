<template>
  <div class="account-container">
    <div v-if="!login&&!payment">
      <h3 class="accout-title">账户安全</h3>
      <ul class="account-box">
        <li class="account-div">
          <i class="icon"></i>
          <span class="title">登录密码</span>
          <span class="detail">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全</span>
          <router-link to="/Setting/accountsecurity/resetpassword" class="opration" v-has="['G81qMI']">修改</router-link>
        </li>
        <li class="account-div">
          <i class="icon"></i>
          <span class="title">支付密码</span>
          <span class="detail payment-detail">建议您定期修改支密码，提高安全性</span>
          <router-link v-if="!hasPassword" to="/Setting/accountsecurity/paymentpassword" class="opration" v-has="['lCVNOD']">修改</router-link>
          <router-link v-else to="/Setting/accountsecurity/updatePassword" class="opration" v-has="['lCVNOD']">修改</router-link>
        </li>
      </ul>
    </div>
  
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  data () {
    return {
      login: false,
      payment: false,
      hasPassword: false // 是否已经设置了支付密码
    }
  },
  methods: {
    pwdClick (name) {
      this[name] = true
    },
    editClick () {
      this.login = false
      this.payment = false
    }
  },
  mounted () {
    api.hasPassword().then((res) => {
      this.hasPassword = res.hasPassword
    })
  }
}
</script>

<style lang="less" scoped>
.account-container{
  padding:0 20px;
}
  .accout-title{
    border-bottom: 1px solid #D7D7D7;
    color: #666666;
    font-size: 18px;
    font-weight: normal;
    line-height: 59px;
  }
  .account-box{
    padding: 0 20px;
    .account-div{
      padding: 20px;
      border-bottom: 1px solid #D7D7D7;
      line-height: 30px;
      .icon{
        display: inline-block;
        width: 32px;
        height: 24px;
        background: url('../../assets/img/account-success.png') no-repeat;
        margin-left: 20px;
      }
      .title{
        color: #666;
        font-size: 20px;
        margin-left: 50px;
        font-weight: bold;
      }
      .detail{
        color: #ff0000;
        font-size: 14px;
        margin-left: 30px;
        border-left: 1px solid #ced4e0;
        padding-left: 30px;
        &:hover{
          color: #7abd54;
        }
      }
      .payment-detail{
        color: #666;
      }
      .opration{
        color: #0066CC;
        font-size: 14px;
        cursor: pointer;
        float: right;
        margin-top: 5px;
      }
    }
  }
</style>

