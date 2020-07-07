<template>
  <div class="mforget-page">
    <header-register></header-register>
    <div class="forget-main">
      <p class="main-title">手机验证</p>
      <div class="main-center">
        <div class="minput">
          <input type="text" :disabled='!isModify' v-model="mobile" :placeholder="placeholderMoile">
          <span @click="modifyMobile">修改</span>
          <div style="clear:both"></div>
        </div>
        <p class="minput-tips">{{tipsMoile}}</p>
        <div class="code-box">
          <div class="titles">
            <span>请输入验证码</span>
            <span v-if="countdown==0" class="code-btn" @click="sendCode">发送</span>
            <span v-if="countdown!=0" class="code-btn">{{countdown+'s'}}后重新获取</span>
            <div style="clear:both"></div>
          </div>
          <div class="code-boxs">
            <input v-model.trim.number="code1" max="1" ref="code1" @keydown.8="deleteValue('code1','code1')" @keyup="changeValue($event,'code1','code2',code1)" type="number" placeholder="">
            <input v-model.trim.number="code2" max="1" ref="code2" @keydown.8="deleteValue('code2','code1')" @keyup="changeValue($event,'code2','code3',code2)" type="number" placeholder="">
            <input v-model.trim.number="code3" max="1" ref="code3" @keydown.8="deleteValue('code3','code2')" @keyup="changeValue($event,'code3','code4',code3)" type="number" placeholder="">
            <input v-model.trim.number="code4" max="1" ref="code4" @keydown.8="deleteValue('code4','code3')" @keyup="changeValue($event,'code4','code5',code4)" type="number" placeholder="">
            <input v-model.trim.number="code5" max="1" ref="code5" @keydown.8="deleteValue('code5','code4')" @keyup="changeValue($event,'code5','code6',code5)" type="number" placeholder="">
            <input v-model.trim.number="code6" max="1" ref="code6" @keydown.8="deleteValue('code6','code5')" @keyup="changeValue($event,'code6','code6',code6)" type="number" placeholder="">
            <div style="clear:both"></div>
            <p class="code-tips">{{codeTips}}</p>
          </div>
          <button class="next-btn" @click="gotoNext">下一步</button>
          <p class="remind">手机号码换了？请使用其他方式找回密码！</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import headerRegister from '@/components/forgetHeaderComponent'
export default {
  components: {
    headerRegister
  },
  data() {
    return {
      mobile: '', //手机号码
      isModify: false, //是否修改
      placeholderMoile: this.$route.params.id,
      mobile: this.$route.params.id,
      tipsMoile: '',
      countdown: 0,
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
      codeTips: '' //验证码提示
    }
  },
  methods: {
    modifyMobile() {
      this.isModify = true
      this.mobile = ''
      this.placeholderMoile = ''
    },
    // 发送验证码
    sendCode() {
      if (this.mobile) {
        if (/1[345678]\d{9}/.test(this.mobile.trim())) {
          if (window.localStorage.forgetM) {
            let beforePhone = JSON.parse(window.localStorage.forgetM).phone
            if (this.mobile == beforePhone) {
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
            .sendVerifyCodeLogin({ phone: this.mobile })
            .then(res => {
              this.$message({
                message: '发送成功',
                type: 'success'
              })
              this.isNewOld = false
              this.timedCount()
              window.localStorage.forgetM = JSON.stringify({ phone: this.mobile, sendTime: new Date().getTime() })
            })
            .catch(res => {
              this.tipsMoile = res.errorMsg
            })
        } else {
          this.tipsMoile = '请输入正确的手机号码'
        }
      } else {
        this.tipsMoile = '请输入手机号码'
      }
    },
    timeDifference() {
      if (window.localStorage.forgetM) {
        let stime = JSON.parse(window.localStorage.forgetM).sendTime
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
    //验证码输入事件
    changeValue(e, inputValue, nextItem, code) {
      // 键盘抬起时$event，当前input，下一个input
      if (e.keyCode !== 8 && (code || code == '0')) {
        this.$nextTick(() => {
          this.$refs[nextItem].focus() // 截取当前值最后一位，跳到下一个input
          this[inputValue] = this[inputValue].toString().slice(-1)
        })
      }
    },
    //验证码删除事件
    deleteValue(inputValue, previousItem) {
      // 键盘按下时$event，当前input，上一个input
      if (this[inputValue].length > 0) {
        // 当前有值，清空之
        this[inputValue] = ''
      } else {
        // 当前没有值，光标跳转到上一个input，并清空该input值
        this.$nextTick(() => {
          this.$refs[previousItem].focus()
          this[previousItem] = ''
          this[inputValue] = ''
        })
      }
    },
    gotoNext() {
      if (this.mobile) {
        if (this.code1 && this.code2 && this.code3 && this.code4 && this.code5 && this.code6) {
          let data = {
            phone: this.mobile,
            verityCode: this.code1 + this.code2 + this.code3 + this.code4 + this.code5 + this.code6
          }
          api
            .validatePhoneVerifyCodeLogin(data)
            .then(res => {
              this.$router.push({
                path: '/reset/' + this.mobile,
              })
            })
            .catch(res => {
              if (res.errorCode == 9020) {
                this.tipsMoile = res.errorMsg
              } else {
                this.codeTips = res.errorMsg
              }
            })
        } else {
          this.codeTips = '请输入短信验证码'
        }
      } else {
        this.tipsMoile = '请输入手机号码'
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.mforget-page {
  .forget-main {
    height: ~'calc(100vh - 60px)';
    background-color: #fff;
    .main-title {
      height: 28px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin: 0px 0 40px 0;
      padding-top: 82px;
    }
    .main-center {
      margin: 0 auto;
      width: 500px;
      .minput {
        padding: 17px 19px 17px 15px;
        width: 464px;
        height: 100%;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 2px;
        textarea:disabled,
        input:disabled {
          cursor: not-allowed;
          background-color: #fff;
        }
        input {
          width: ~'calc(100% - 57px)';
          float: left;
          height: 16px;
          vertical-align: middle;
        }
        span {
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(3, 177, 137, 1);
          cursor: pointer;
          float: right;
        }
      }
      .minput-tips {
        height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: #d71818;
        margin-top: 5px;
      }
      .code-box {
        margin-top: 10px;
        .titles {
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          font-weight: 400;
          span:nth-child(1) {
            float: left;
            color: rgba(51, 51, 51, 1);
          }
          .code-btn {
            float: right;
            color: rgba(3, 177, 137, 1);
            cursor: pointer;
            // margin-right: 19px;
          }
        }
        .code-boxs {
          margin-top: 17px;
          input {
            width: 38px;
            height: 50px;
            border: 1px solid rgba(204, 204, 204, 1);
            border-radius: 2px;
            float: left;
            margin-right: 52px;
            text-align: center;
          }
          input:nth-child(6) {
            margin-right: 0;
          }
          .code-tips {
            margin-top: 10px;
            height: 12px;
            line-height: 12px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(215, 24, 24, 1);
          }
        }
      }
      .next-btn {
        margin-top: 49px;
        width: 500px;
        height: 50px;
        background: rgba(3, 177, 137, 1);
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
      }
      .next-btn:hover {
        background: #21a57e;
      }
      .remind {
        margin-top: 19px;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
