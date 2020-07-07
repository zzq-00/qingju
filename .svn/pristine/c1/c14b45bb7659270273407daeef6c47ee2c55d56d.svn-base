<template>
  <div>
    <div class="nav">
      <div class="container clearfix">
        <router-link to="/" class="logo">青矩</router-link>
        <h2>欢迎登录</h2>
      </div>
    </div>
    <div class="content clearfix">
      <div class="container">
        <p>让青矩，把时间还给你！</p>
        <div class="login-window">
          <div class="login-change">
            <span :class="['methodsName', {selection: loginMethods=='number'}]" @click="changeMethod('number')">账号登录</span>
            <span></span>
            <span :class="['methodsName', {selection: loginMethods=='code'}]" @click="changeMethod('code')">验证码登录</span>
            <div style="clear:both"></div>
          </div>
          <div class="login-form">
            <div class="register-form" ref="form" v-if="loginMethods=='number'">
              <div class="register-div">
                <input type="text" v-model="form.account" placeholder="请输入账号/手机号/邮箱" @blur="validateAccounts" @change="changeAccounts" @keyup.enter="submitForm()">
                <div class="tips-info">{{accountInfo}}</div>
              </div>
              <div class="register-div">
                <input type="password" v-model="form.pwd" placeholder="密码" @blur="validatePassword" @change="changePassword" @keyup.enter="submitForm()">
                <div class="tips-info">{{passWordInfo}}</div>
              </div>

              <div class="forget-pwd" @click="gotoForget">忘记密码?</div>
              <el-button type="primary" @click="submitForm()" v-if="!loginState">登 录</el-button>
              <a href="javascript:" class="subBtn" v-else>登录中
                <span class="dotting"></span>
              </a>
            </div>
            <div class="register-form" ref="codeform" v-if="loginMethods=='code'">
              <div class="register-div">
                <input type="text" v-model="codeForm.phone" placeholder="请输入手机号" @blur="validatePhone" @change="changePhone" @keyup.enter="submitForms()">
                <div class="tips-info">{{phoneInfo}}</div>
              </div>
              <div class="register-div">
                <input type="text" v-model="codeForm.sms" placeholder="短信验证码" @blur="validateCode" @change="changeCode" @keyup.enter="submitForms()">
                <div v-if="countdown===0&&!isSend&&!upperLimit&&isNewOld" class="code-btn no-click">获取验证码</div>
                <div @click.stop="sendVerifyCode($event)" v-if="countdown===0&&isSend&&!upperLimit&&isNewOld" class="code-btn buttons">获取验证码</div>
                <div @click="sendVerifyCode" v-if="countdown===0&&isSend&&!isNewOld" class="code-btn buttons">重新获取</div>
                <div v-if="countdown!=0&&isSend&&!upperLimit" class="code-btn buttons">{{countdown+'s'}}</div>
                <div class="tips-info">{{tipsInfo}}</div>
              </div>
              <div class="forget-pwd" @click="gotoForget">忘记密码?</div>
              <el-button type="primary" @click="submitForms()" v-if="!loginState">登 录</el-button>
              <a href="javascript:" class="subBtn" v-else>登录中
                <span class="dotting"></span>
              </a>
            </div>
          </div>
          <div class="login-btn">
            <span class="methodsName" @click="changeRegister('person')">个人注册</span>
            <span></span>
            <span class="methodsName" @click="changeRegister('company')">企业注册</span>
            <div style="clear:both"></div>
          </div>
        </div>
      </div>
    </div>
    <footerComponents />
  </div>
</template>
<script>
import api from '@/fetch/api'
import { getCookie, setCookie } from '@/assets/js/utils'
import footerComponents from '@/components/footerComponents'
export default {
  components: {
    footerComponents
  },
  data() {
    return {
      loginState: false,
      loginMethods: 'number', //默认选择账号登录
      form: {
        account: '',
        loginMethod: '',
        phone: '',
        pwd: '',
        remember: '',
        verificationCode: ''
      },
      codeForm: {
        phone: '',
        sms: ''
      },
      countdown: 0,
      isSend: false,
      upperLimit: false, //短信发送次数是否达到上限
      isNewOld: true, //是否是重新获取
      tipsInfo: '', //发送短息达到上限的提示
      accountInfo: '', //账号信息验证提示
      passWordInfo: '',
      phoneInfo: ''
    }
  },
  watch: {
    newValue(val, oldVal) {
      this.isNewOld = true
      this.isSend = false
      this.tipsInfo = ''
      if (/1[345678]\d{9}/.test(val.trim())) {
        api
          .verifyMessage({
            bank: '',
            bankAccount: '',
            phone: val,
            callMethod: '1', //登录传1，注册传2    后台SJ要求,数据不用，传空
            company: '',
            email: '',
            taxNumber: '',
            verityCode: ''
          })
          .then(res => {
            if (res.errorCode == '200') {
              this.isSend = true
            }
          })
          .catch(res => {})
      }
    }
  },
  computed: {
    newValue() {
      return this.codeForm.phone
    }
  },

  methods: {
    // 选择登录方法
    changeMethod(val) {
      this.loginMethods = val
      if (this.$refs.form) {
        this.form.account = ''
        this.form.pwd = ''
        this.accountInfo = ''
        this.passWordInfo = ''
      }
      if (this.$refs.codeform) {
        this.codeForm.phone = ''
        this.codeForm.sms = ''
        this.phoneInfo = ''
        this.tipsInfo = ''
      }
    },
    //忘记密码
    gotoForget() {
      this.$router.push('/forget')
    },
    changeAccounts() {
      this.accountInfo = ''
    },
    // 验证账号登录方式的 账号
    validateAccounts() {
      if (!this.form.account) {
        this.accountInfo = '请输入账号/手机号/邮箱'
      } else {
        api
          .verifyMessage({
            account: this.form.account,
            bank: '',
            bankAccount: '',
            callMethod: '',
            company: '',
            email: '',
            phone: '',
            taxNumber: '',
            verityCode: ''
          })
          .then(res => {
            if (res.errorCode == '200') {
              let _this = this
              _this.isSend = true
            }
          })
          .catch(res => {
            if (res.errorMsg != '内部错误') {
              let _this = this
              _this.isSend = false
              _this.accountInfo = res.errorMsg
            }
          })
      }
    },
    //
    validatePassword() {
      if (!this.form.pwd) {
        this.passWordInfo = '请输入密码'
      } else {
        this.passWordInfo = ''
      }
    },
    changePassword() {
      this.passWordInfo = ''
    },
    validatePhone() {
      if (!this.codeForm.phone) {
        this.phoneInfo = '请输入手机号码'
      } else if (!/1[345678]\d{9}/.test(this.codeForm.phone.trim())) {
        this.phoneInfo = '你输入的手机号码有误'
      } else {
        api
          .verifyMessage({
            bank: '',
            bankAccount: '',
            phone: this.codeForm.phone,
            callMethod: '1', //登录传1，注册传2    后台SJ要求,数据不用，传空
            company: '',
            email: '',
            taxNumber: '',
            verityCode: ''
          })
          .then(res => {
            if (res.errorCode == '200') {
              let _this = this
              _this.isSend = true
              _this.phoneInfo = ''
            }
          })
          .catch(res => {
            if (res.errorMsg != '内部错误') {
              let _this = this
              _this.isSend = false
              _this.phoneInfo = res.errorMsg
            }
          })
      }
    },
    changePhone() {
      this.phoneInfo = ''
    },
    validateCode() {
      if (!this.codeForm.sms) {
        this.tipsInfo = '请输入短信验证码'
      } else {
        this.tipsInfo = ''
      }
    },
    changeCode() {
      this.tipsInfo = ''
    },
    //账号登录
    submitForm() {
      if (!this.form.account) return (this.accountInfo = '请输入账号/手机号/邮箱')
      if (!this.form.pwd) return (this.passWordInfo = '请输入密码')
      this.loginState = true
      if (this.accountInfo == '' && this.passWordInfo == '') {
        api
          .publishPeopleLogin(this.form)
          .then(res => {
            if (res.errorCode == 200) {
              this.accountInfo = ''
              this.passWordInfo = ''
              this.login(res)
            }
          })
          .catch(res => {
            this.loginState = false
            if (res.errorCode == 9024) {
              this.$router.push({ path: '/register/company', query: { step: 4, auditStatus: 1 } })
            }
            if (res.errorCode == 9025) {
              this.$router.push({ path: '/register/company', query: { step: 4, auditStatus: 2, reasonForRejection: res.dataList[0].reasonForRejection } })
            } else {
              this.$message.error(res.errorMsg)
            }
          })
      } else {
        return false
      }
    },
    //验证码登录
    submitForms() {
      if (!this.codeForm.phone) return (this.phoneInfo = '请输入手机号码')
      if (!this.codeForm.sms) return (this.tipsInfo = '请输入短信验证码')
      this.loginState = true
      if (this.phoneInfo == '' && this.tipsInfo == '') {
        let data = {
          phone: this.codeForm.phone,
          verificationCode: this.codeForm.sms,
          loginMethod: 'codeLogin'
        }
        api
          .frontDeskVerificationCodeLogin(data)
          .then(res => {
            if (res.errorCode == 200) {
              this.login(res)
            }
          })
          .catch(res => {
            this.loginState = false
            if (res.errorMsg != '内部错误') {
              this.tipsInfo = res.errorMsg
            }
          })
      } else {
        return false
      }
    },
    //选择注册方式
    changeRegister(val) {
      if (val == 'company') {
        this.$router.push({ path: '/register/' + val, query: { step: 1 } })
      } else {
        this.$router.push('/register/' + val)
      }
    },
    //
    login(res) {
      window.localStorage.firmId = JSON.stringify(res.dataList[0].firmId) || JSON.stringify(res.dataList[0].id)
      window.localStorage.QingjuuserId = JSON.stringify(res.dataList[0].id)
      window.localStorage.QingjuAccount = JSON.stringify(res.dataList[0].userName || '青矩用户')
      window.localStorage.QingjuTelePhone = JSON.stringify(res.dataList[0].telephone)
      window.localStorage.isTzecc = JSON.stringify(res.dataList[0].isTzecc)
      window.localStorage.statusString = JSON.stringify(res.dataList[0].statusString) // 当前账户是否为有效
      setCookie('QingjuLoginAddress', JSON.stringify(res.dataList[0].address))
      setCookie('QingjuLoginTime', JSON.stringify(res.dataList[0].lastLoginTime))
      localStorage.firmCurrentUserInfo = JSON.stringify(res.dataList[0].firmCurrentUserInfo) // 权限
      // sessionStorage.setItem('isLoginOut', 'in')
      // 获取用户信息
      api.getUserInfo().then(resUser => {
        if (!resUser.dataList[0].userName) resUser.dataList[0].userName = resUser.dataList[0].code || '青矩用户'
        // 考虑企业下用户
        resUser.dataList[0].id = resUser.dataList[0].id
        this.$store.commit('setUserInfo', resUser.dataList[0])
        // 保证获取了用户信息再跳转
        if (getCookie('oldPath')) {
          if (getCookie('oldPath') === '/login' || getCookie('oldPath') === '/forget'
          || getCookie('oldPath') === '/register/company?step=1'
          || getCookie('oldPath') === '/register/company?step=2'
          || getCookie('oldPath') === '/register/person' || getCookie('oldPath').includes('reset')) {
            this.$router.push('/')
          } else {
            this.$router.push(getCookie('oldPath'))
          }
        } else {
          this.$router.push('/')
        }
      })
    },
    // 获取手机验证码
    sendVerifyCode() {
      if (window.localStorage.hasBeenSentLogin) {
        let beforePhone = JSON.parse(window.localStorage.hasBeenSentLogin).phone
        if (this.codeForm.phone == beforePhone) {
          if (!this.timeDifference()) {
            return (this.tipsInfo = '操作过于频繁，请稍后再试')
          } else {
            this.tipsInfo = ''
          }
        }
      }
      /*  */
      this.tipsInfo = ''
      if (this.countdown != 0) {
        this.$message({
          message: '120秒内不得重复获取',
          type: 'warning'
        })
        return false
      }
      this.countdown = 120
      api
        .sendVerifyCodeLogin({ phone: this.codeForm.phone })
        .then(res => {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
          this.isNewOld = false
          this.timedCount()
          window.localStorage.hasBeenSentLogin = JSON.stringify({ phone: this.codeForm.phone, sendTime: new Date().getTime() })
        })
        .catch(res => {
          this.countdown = 0
          this.tipsInfo = res.errorMsg
        })
    },
    timeDifference() {
      if (window.localStorage.hasBeenSentLogin) {
        let stime = JSON.parse(window.localStorage.hasBeenSentLogin).sendTime
        let etime = new Date().getTime()
        let usedTime = etime - stime //两个时间戳相差的毫秒数
        let days = Math.floor(usedTime / (24 * 3600 * 1000))
        //计算出小时数
        let leave1 = usedTime % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000))
        let time = days + '天' + hours + '时' + minutes + '分'
        if (days >= 0 && hours >= 0 && minutes >= 2) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    // 倒计时
    timedCount() {
      let s = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearTimeout(s)
        }
      }, 1000)
    }
  },
  mounted () {
    if (this.$route.path != '/login') {
      this.$router.replace('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.nav {
  box-sizing: border-box;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  .logo {
    float: left;
    text-indent: -200000px;
    width: 143px;
    background: url(../assets/logo.png) no-repeat center;
    background-size: contain;
  }
  h2 {
    float: left;
    font-size: 24px;
    font-weight: 700;
    color: #666;
    margin-left: 25px;
  }
}
.content {
  height: 500px;
  background: url(../assets/img/u1.jpg) no-repeat center;
  position: relative;
  .container {
    > p {
      font-size: 48px;
      color: #fff;
      position: absolute;
      top: 210px;
    }
  }
}
.login-window {
  width: 340px;
  height: 370px;
  padding: 0 20px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  right: 20%;
  transform: translate(0, -50%);
  .login-change {
    text-align: center;
    margin-top: 30px;
    span {
      float: left;
    }
    span:nth-child(1) {
      margin-left: 63px;
    }
    .methodsName {
      color: #333333;
      font-size: 14px;
      font-weight: 400;
      height: 14px;
      line-height: 14px;
      padding: 3px 0;
    }

    span:nth-child(1):hover {
      color: #00b38a;
      cursor: pointer;
    }
    span:nth-child(3):hover {
      color: #00b38a;
      cursor: pointer;
    }
    .selection {
      color: #00b38a;
    }
    span:nth-child(2) {
      width: 1px;
      height: 20px;
      background: rgba(228, 228, 228, 1);
      margin: 0 50px;
    }
  }
  .login-form {
    margin-top: 31px;
    margin-bottom: 35px;
    .register-form {
      input {
        width: 304px;
        height: 43px;
        border: 1px solid rgba(204, 204, 204, 1);
        padding: 0 17px;
        margin-bottom: 20px;
      }
      .register-div {
        position: relative;
        .tips-info {
          color: #fa5555;
          font-size: 12px;
          line-height: 1;
          padding-top: 4px;
          position: absolute;
          top: 45px;
        }
        .no-click {
          cursor: not-allowed;
          background-color: #f2f2f2;
          color: #ccc;
          width: 150px;
        }
        .code-btn {
          position: absolute;
          text-align: center;
          height: 43px;
          line-height: 43px;
          top: 1px;
          right: 1px;
          font-size: 14px;
        }
        .buttons {
          width: 150px;
          background-color: #f2f2f2;
          color: #333;
          cursor: pointer;
        }
      }
      .forget-pwd {
        display: inline-block;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 21px;
        cursor: pointer;
      }
      .forget-pwd:hover {
        color: #24b892;
      }
      .subBtn {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background-color: #009966;
      }
      // 三个小点的加载
      .dotting {
        display: inline-block;
        min-width: 2px;
        min-height: 2px;
        box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor;
        -webkit-animation: dot 4s infinite step-start both;
        animation: dot 4s infinite step-start both;
      }
      .dotting:before {
        content: '...';
      } /* IE8 */
      .dotting::before {
        content: '';
      }
      :root .dotting {
        margin-right: 8px;
      } /* IE9+,FF,CH,OP,SF */
      :root .dotting {
        margin-right: 8px;
      } /* IE9+,FF,CH,OP,SF */

      @-webkit-keyframes dot {
        25% {
          box-shadow: none;
        }
        50% {
          box-shadow: 2px 0 currentColor;
        }
        75% {
          box-shadow: 2px 0 currentColor, 6px 0 currentColor;
        }
      }
      @keyframes dot {
        25% {
          box-shadow: none;
        }
        50% {
          box-shadow: 2px 0 currentColor;
        }
        75% {
          box-shadow: 2px 0 currentColor, 6px 0 currentColor;
        }
      }
      .el-button,
      .el-input__inner {
        width: 100%;
      }
      .el-button--primary {
        background: #03b189;
      }
      .el-button--primary:hover {
        background: #21a57e;
      }
      .el-form-item {
      }

      .tips-info {
        color: #fa5555;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
      }
    }
  }
  .login-btn {
    span {
      float: left;
    }
    span:nth-child(1) {
      margin-left: 93px;
    }
    .methodsName {
      color: #333333;
      font-size: 14px;
      font-weight: 400;
      height: 14px;
      line-height: 14px;
    }

    span:nth-child(1):hover {
      color: #00b38a;
      cursor: pointer;
    }
    span:nth-child(3):hover {
      color: #00b38a;
      cursor: pointer;
    }
    .selection {
      color: #00b38a;
    }
    span:nth-child(2) {
      width: 1px;
      height: 14px;
      background: rgba(228, 228, 228, 1);
      margin: 0 20px;
    }
  }
}
</style>
<style scoped>
.register-form >>> .el-form-item__content {
  height: 40px !important;
}
</style>

