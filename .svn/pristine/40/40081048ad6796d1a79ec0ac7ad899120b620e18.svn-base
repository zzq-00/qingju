<template>
  <div class="one-form">
    <div class="form-input">
      <input type="text" placeholder="请设置登录账号" v-model="oneform.account" @blur="blurAccount">
    </div>
    <p class="tips">{{accountTips}}</p>
    <div class="form-input">
      <input type="text" placeholder="请输入手机号" v-model="oneform.mobile" @blur="blurMobile">
      <img src="@/assets/img/ok.png" alt="" v-if="mobileOK">
    </div>
    <p class="tips">{{mobileTips}}</p>
    <div class="form-input code-input">
      <input type="text" placeholder="请输入手机验证码" v-model="oneform.code" @blur="blurCode">
      <div v-if="countdown===0&&!isSend&&!upperLimit&&isNewOld" class="code-btn no-click">获取验证码</div>
      <div @click.stop="sendVerifyCode($event)" v-if="countdown===0&&isSend&&!upperLimit&&isNewOld" class="code-btn buttons">获取验证码</div>
      <div @click="sendVerifyCode" v-if="countdown===0&&isSend&&!isNewOld" class="code-btn buttons">重新获取</div>
      <div v-if="countdown!=0&&isSend&&!upperLimit" class="code-btn seconds">{{countdown+'s'}}</div>
      <img src="@/assets/img/ok.png" alt="" v-if="codeOK">
    </div>
    <p class="tips" :class="[normalSend==true?'surplusTips':'']">{{codeTips}}</p>
    <div class="form-input">
      <input type="text" placeholder="请输入邮箱" v-model="oneform.email" @blur="blurEmail">
      <img src="@/assets/img/ok.png" alt="" v-if="emailOK">
    </div>
    <p class="tips">{{emailTips}}</p>
    <div class="form-input">
      <input :type="password" placeholder="请输入密码" v-model="oneform.password" @blur="blurPassword">
      <img src="@/assets/img/seePas.png" alt="" class="see-pas" v-if="password=='password'&&oneform.password" @click="seePassword('see')">
      <img src="@/assets/img/closePas.png" alt="" class="see-pas" v-if="password=='text'&&oneform.password" @click="seePassword('close')">
    </div>
    <p class="tips">{{passwordTips}}</p>
    <div class="agreement-content">
      <p @click="tick">
        <img src="@/assets/img/notAgree.png" alt="" v-if="!agreeStatus">
        <img src="@/assets/img/agree.png" alt="" v-else>
      </p>
      注册青矩，即表示您同意
      <a href="/info/Agreement" target="_blank" class="green">《青矩注册协议》</a>
    </div>
    <p class="agreetips">{{agreeTips}}</p>
    <button class="btn-common btn-submit btn-width" @click="submitOneForm()">下 一 步</button>
    <p class="register-btn">
      <span @click="gotoPath">个人注册</span>
    </p>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  data() {
    return {
      countdown: 0,
      oneform: {
        account: '',
        mobile: '',
        code: '',
        email: '',
        password: ''
      },
      accountTips: '', //账号提示
      accountOK: false,
      mobileTips: '', //手机号提示
      codeTips: '', //验证码提示
      emailTips: '', //邮箱提示
      passwordTips: '', //密码提示
      agreeStatus: false, //是否同意协议
      agreeTips: '',
      password: 'password', //密码是显示还是隐藏
      mobileOK: false, //电话输入正确图标
      codeOK: false,
      emailOK: false,
      isSend: false,
      upperLimit: false, //短信发送次数是否达到上限
      isNewOld: true, //是否是重新获取
      tipsInfo: '', //发送短息达到上限的提示
      normalSend: false
    }
  },
  watch: {
    agreeStatus(val, oldVal) {
      if (val == true) {
        this.agreeTips = ''
      }
    },
    accountValue(val, oldVal) {
      this.accountTips = ''
      this.accountOK = false
    },
    newValue(val, oldVal) {
      this.mobileTips = ''
      this.isNewOld = true
      this.isSend = false
      if (/1[345678]\d{9}/.test(val.trim())) {
        api
          .verifyMessage({
            phone: val,
            callMethod: ''
          })
          .then(res => {
            this.isSend = true
          })
          .catch(res => {
            this.isSend = false
          })
      }
    },
    codeValue(val, oldVal) {
      this.codeTips = ''
    },
    emailValue(val, oldVal) {
      this.emailTips = ''
    },
    passwordValue(val, oldVal) {
      this.passwordTips = ''
    }
  },
  computed: {
    accountValue() {
      return this.oneform.account
    },
    newValue() {
      return this.oneform.mobile
    },
    codeValue() {
      return this.oneform.code
    },
    emailValue() {
      return this.oneform.email
    },
    passwordValue() {
      return this.oneform.password
    }
  },
  methods: {
    gotoPath() {
      this.$router.push('/register/person')
    },
    blurAccount() {
      if (this.oneform.account) {
        if (!/^[a-zA-Z0-9_]{3,25}$/.test(this.oneform.account)) {
          this.accountTips = '请输入3-25位字符，不能使用特殊符号（包括汉字）'
          this.accountOK = false
        } else {
          api
            .acountVerifyMessage(this.oneform.account)
            .then(res => {
              this.accountTips = ''
              this.accountOK = true
            })
            .catch(res => {
              this.accountTips = res.errorMsg
              this.accountOK = false
            })
        }
      } else {
        this.accountTips = '请输入您的账号'
        this.accountOK = false
      }
    },
    blurMobile() {
      if (this.oneform.mobile) {
        if (!/1[345678]\d{9}/.test(this.oneform.mobile.trim())) {
          this.mobileTips = '你输入的手机号码有误'
        } else {
          api
            .verifyMessage({
              phone: this.oneform.mobile,
              callMethod: ''
            })
            .then(res => {
              this.mobileTips = ''
              this.mobileOK = true
              this.isSend = true
            })
            .catch(res => {
              this.mobileTips = res.errorMsg
              this.mobileOK = false
              this.isSend = false
            })
        }
      } else {
        this.mobileTips = '请输入手机号码'
      }
    },
    blurCode() {
      if (this.oneform.code) {
        let data = {
          phone: this.oneform.mobile,
          verityCode: this.oneform.code,
          callMethod: ''
        }
        api
          .verifyMessage(data)
          .then(res => {
            if (res.errorCode == '200') {
              this.codeTips = ''
              this.codeOK = true
            }
          })
          .catch(res => {
            this.codeTips = res.errorMsg
            this.codeOK = false
          })
      } else {
        this.codeTips = '请输入手机验证码'
        this.normalSend = false
      }
    },
    blurEmail() {
      if (this.oneform.email) {
        if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.oneform.email)) {
          api
            .verifyMessage({
              email: this.oneform.email,
              callMethod: ''
            })
            .then(res => {
              this.emailTips = ''
              this.emailOK = true
            })
            .catch(res => {
              this.emailTips = res.errorMsg
              this.emailOK = false
            })
        } else {
          this.emailTips = '您输入的邮箱格式不正确，请重新输入'
        }
      } else {
        this.emailTips = '请设置邮箱'
      }
    },
    blurPassword() {
      if (this.oneform.password) {
      } else {
        this.passwordTips = '请设置密码'
      }
    },
    // 获取手机验证码
    sendVerifyCode() {
      if (window.localStorage.companyReg) {
        let beforePhone = JSON.parse(window.localStorage.companyReg).phone
        if (this.oneform.mobile == beforePhone) {
          if (!this.timeDifference()) {
            return (this.codeTips = '操作过于频繁，请稍后再试')
          } else {
            this.codeTips = ''
          }
        }
      }
      this.codeTips = ''
      if (this.countdown != 0) {
        this.$message({
          message: '120秒内不得重复获取',
          type: 'warning'
        })
        return false
      }
      this.countdown = 120
      api
        .companySendVerifyCode({ phone: this.oneform.mobile })
        .then(res => {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
          this.isNewOld = false
          this.timedCount()
          window.localStorage.companyReg = JSON.stringify({ phone: this.oneform.mobile, sendTime: new Date().getTime() })
          this.getVerificationCodeNumber(this.oneform.mobile)
        })
        .catch(res => {
          this.normalSend = false
          this.countdown = 0
          this.codeTips = res.errorMsg
        })
    },
    getVerificationCodeNumber(tel) {
      api
        .getVerificationCodeNumber(tel)
        .then(res => {
          this.normalSend = true
          this.codeTips = '该手机还可以获取' + res.dataList + '次验证码，请尽快验证'
        })
        .catch(res => {
          this.normalSend = false
        })
    },
    timeDifference() {
      if (window.localStorage.companyReg) {
        let stime = JSON.parse(window.localStorage.companyReg).sendTime
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
    },
    seePassword(val) {
      if (val == 'see') {
        this.password = 'text'
      }
      if (val == 'close') {
        this.password = 'password'
      }
    },
    // 勾选协议
    tick() {
      this.agreeStatus = !this.agreeStatus
    },
    submitOneForm() {
      if (this.accountOK && this.mobileOK && this.codeOK && this.emailOK && this.password && this.agreeStatus) {
        this.$emit('oneData', this.oneform)
        window.localStorage.oneData = JSON.stringify(this.oneform)
      } else {
        this.blurAccount()
        this.blurMobile()
        this.blurCode()
        this.blurEmail()
        this.blurPassword()
        if (this.agreeStatus) {
          this.agreeTips = ''
        } else {
          this.agreeTips = '您未同意平台协议'
        }
      }
    }
  },
  mounted() {
    window.localStorage.removeItem('oneData')
  }
}
</script>
<style lang="less" scoped>
.one-form {
  .code-input {
    position: relative;
    .code-btn {
      position: absolute;
      width: 150px;
      height: 48px;
      font-size: 14px;
      line-height: 48px;
      background: rgba(242, 242, 242, 1);
      border-left: 1px solid rgba(204, 204, 204, 1);
      border-radius: 2px;
      cursor: pointer;
      text-align: center;
      top: 0px;
      right: 0px;
    }
    .no-click {
      cursor: not-allowed;
      background-color: #f2f2f2;
      color: #ccc;
    }
    .buttons {
      background-color: #f2f2f2;
      color: #333;
    }
    .seconds {
      cursor: not-allowed;
    }
    input {
      width: ~'calc(100% - 175px)' !important;
    }
  }
  .form-input {
    width: 470px;
    height: 48px;
    line-height: 48px;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 2px;
    padding: 0 11px 0 17px;
    input {
      width: ~'calc(100% - 30px)';
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #d5d4d4;
      /* placeholder字体大小  */
      font-size: 14px;
    }
    .see-pas {
      cursor: pointer;
    }
  }
  .tips {
    margin: 9px 0 19px 0;
    height: 12px;
    line-height: 12px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(215, 24, 24, 1);
  }
  .surplusTips {
    color: #333 !important;
  }
  .agreement-content {
    font-size: 14px;
    p {
      float: left;
      margin-right: 12px;
      height: 14px;
      line-height: 14px;
      margin-top: 2px;
      img {
        cursor: pointer;
      }
    }
  }
  .agreetips {
    color: #fa5555;
    font-size: 12px;
    padding-top: 4px;
    height: 16px;
    line-height: 16px;
  }
  .register-btn {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
  .register-btn span:hover {
    color: #24b892;
  }
  .green {
    color: #03b189;
    cursor: pointer;
  }
  .btn-width {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
    background: #03b189;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
  }
  .btn-width:hover {
    background: #21a57e;
  }
}
</style>
