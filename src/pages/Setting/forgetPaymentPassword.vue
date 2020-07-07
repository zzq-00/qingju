<template>
  <div class="fp-container">
    <h3 class="code-title">账户安全</h3>
    <ul class="step-ul">
      <li class="step-li" :class="{'pass-li':activeStep>0}">
        <div class="title">验证身份</div>
      </li>
      <li class="step-li" :class="{'pass-li':activeStep>1}">
        <div class="title">找回支付密码</div>
      </li>
      <li class="step-li" :class="{'pass-li':activeStep>2}">
        <div class="title">完成</div>
      </li>
    </ul>
    <div class="forget-payment-box">
      <!-- 验证身份 -->
      <div class="box-part-01" v-if="activeStep===1">
        <ul class="part-01-form-ul">
          <!-- <li class="form-li">
            <span class="text">请选择验证身份方式:</span>
            <el-select v-model="form01.idType" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </li>
          <li class="form-li">
            <span class="text">选择验证卡:</span>
            <el-select v-model="form01.cardKinds" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </li>
          <li class="form-li">
            <span class="text">银行卡号:</span>
            <el-input type="text" v-model="form01.bankCardCode"></el-input>
          </li>
          <li class="form-li">
            <span class="text">持卡人身份证号:</span>
            <el-input type="text" v-model="form01.idCardCode"></el-input>
          </li> -->
          <li class="form-li">
            <span class="text">已验证手机:</span>
            <span class="mobile">{{QingjuTelePhone}}</span>
          </li>
          <li class="form-li">
            <span class="text">请输入验证码:</span>
            <div class="short-input">
              <el-input type="text" v-model="imgVerifyCode"></el-input>
            </div>
            <div class="code-verifiy">
              <img :src="verifyImg" alt="" @click="getVerifyCode" width="100%" height="100%">
            </div>
            <span class="blur-text">看不清，
              <span class="next" @click="getVerifyCode">换一张</span>
            </span>
          </li>
          <li class="form-li">
            <span class="text">请填写手机校验码:</span>
            <div class="short-input">
              <el-input type="text" v-model="SMSVerifyReq.verityCode"></el-input>
            </div>
            <div class="msg-verifiy" v-show="show" @click="sendVerifyCode">
              <!-- <span v-if="countdown===0">获取验证码</span>
              <span v-else class="times-color">剩余{{countdown}}s</span> -->
              {{yzCode}}
            </div>
            <div class="msg-verifiy times-color" v-show="!show">{{count}} S后重新发送</div>
          </li>
        </ul>
        <div class="submit-btn" @click="validatePhoneVerifyCode">提交</div>
      </div>
      <!-- 找回支付密码 -->
      <div class="box-part-02" v-if="activeStep===2">
        <ul class="part-02-form-ul">
          <li class="form-li">
            <span class="text">设置6位数字密码</span>
            <div class="short-input">
              <el-input type="password" v-model="form.password"></el-input>
            </div>
            <p class="detail">由6位纯数字组成</p>
          </li>
          <li class="form-li">
            <span class="text">确认6位数字密码</span>
            <div class="short-input">
              <el-input type="password" v-model="form.repassword"></el-input>
            </div>
          </li>
          <!-- <li class="form-li">
            <span class="text">验证码:</span>
            <div class="short-input">
              <el-input type="text" v-model="form.verifyCode"></el-input>
            </div>
            <div class="code-verifiy">
              <img :src="verifyImg" alt="" @click="getVerifyCode" width="100%" height="100%">
            </div>
            <span class="blur-text">看不清，
              <span class="next" @click="getVerifyCode">换一张</span>
            </span>
          </li> -->
        </ul>
        <div class="submit-btn" @click="findPassword">确认</div>
      </div>
      <!-- 完成 -->
      <div class="box-part-03" v-if="activeStep===3">
        <i class="icon"></i>
        <p class="success-text">恭喜您，修改支付密码成功！</p>
        <span class="return-btn el-icon-back" @click="goback">返回</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";

export default {
  data() {
    return {
      activeStep: 1,
      httpHead: process.env.API_ROOT,
      countdown: 0,
      verifyImg: "",
      imgVerifyCode: "",
      QingjuTelePhone: JSON.parse(window.localStorage.QingjuTelePhone),
      SMSVerifyReq: {
        phone: JSON.parse(window.localStorage.QingjuTelePhone),
        verityCode: ""
      },
      form: {
        password: "",
        repassword: "",
        verifyCode: ""
      },
      count: 120,
      timer: null,
      show: true,
      yzCode: "获取验证码"
    };
  },
  methods: {
    // 获取图片验证码
    getVerifyCode() {
      this.verifyImg = this.httpHead + "home/getVerifyCode?" + Math.random();
    },
    timeDifference() {
      if (window.localStorage.accountSecurity) {
        let stime = JSON.parse(window.localStorage.accountSecurity).sendTime;
        let etime = new Date().getTime();
        let usedTime = etime - stime; //两个时间戳相差的毫秒数
        let days = Math.floor(usedTime / (24 * 3600 * 1000));
        //计算出小时数
        let leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000));
        this.times = minutes;
        let time = days + "天" + hours + "时" + minutes + "分";
        if (days >= 0 && hours >= 0 && minutes >= 2) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    // 获取手机验证码
    sendVerifyCode() {
      // if (this.countdown != 0) {
      //   this.$message({
      //     message: "60秒内不得重复获取",
      //     type: "warning"
      //   });
      //   return false;
      // }
      // if (!this.imgVerifyCode) {
      //   this.$message("请输入图片验证码");
      //   return false;
      // }
      // api
      //   .validateVerifyCode(this.imgVerifyCode)
      //   .then(res => {
      //     api
      //       .sendVerifyCode({ phone: this.QingjuTelePhone })
      //       .then(res => {
      //         this.$message({
      //           message: "发送成功",
      //           type: "success"
      //         });
      //         this.countdown = 60;
      //         this.timedCount();
      //       })
      //       .catch(res => {
      //         this.$message.error(res.errorMsg);
      //       });
      //   })
      //   .catch(res => {
      //     this.$message.error(res.errorMsg);
      //   });
      if (!this.imgVerifyCode) {
        this.$message("请输入图片验证码");
        return false;
      }
      api
        .validateVerifyCode(this.imgVerifyCode)
        .then(res => {
          if (window.localStorage.accountSecurity) {
            let beforePhone = JSON.parse(window.localStorage.accountSecurity)
              .phone;
            if (this.QingjuTelePhone == beforePhone) {
              if (!this.timeDifference()) {
                this.$message({
                  message: "操作过于频繁，请稍后再试",
                  type: "error"
                });
                return false;
              }
            }
          }
          api
            .sendVerifyCode({ phone: this.QingjuTelePhone })
            .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });
          window.localStorage.accountSecurity = JSON.stringify({
            phone: this.QingjuTelePhone,
            sendTime: new Date().getTime()
          });
          const TIME_COUNT = 120;
          let that = this;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
          }
        })
        .catch(err => {
           this.$message.error(res.errorMsg);
        });
        })
        .catch(res => {
          this.$message.error(res.errorMsg);
        });
    },
    // 倒计时
    // timedCount() {
    //   let s = setInterval(() => {
    //     this.countdown--;
    //     if (this.countdown === 0) {
    //       clearTimeout(s);
    //     }
    //   }, 1000);
    // },
    // 校验短信验证码
    validatePhoneVerifyCode() {
      api
        .validatePhoneVerifyCode(this.SMSVerifyReq)
        .then(res => {
          this.activeStep = 2;
        })
        .catch(res => {
          this.$message.error(res.errorMsg);
        });
    },
    // 找回密码
    findPassword() {
      if (!/^\d{6}$/.test(this.form.password)) {
        this.$message("密码为6位纯数字");
        return false;
      }
      if (this.form.password !== this.form.repassword) {
        this.$message("两次密码输入不一致");
        return false;
      }
      // if (!this.form.verifyCode) {
      //   this.$message('请输入图片验证码')
      //   return false
      // }
      // api.validateVerifyCode(this.form.verifyCode).then(res => {
      api
        .findPassword({ newPassword: this.form.password })
        .then(res => {
          this.activeStep = 3;
        })
        .catch(res => {
          this.$message.error(res.errorMsg);
        });
      // }).catch(res => {
      //   this.$message.error(res.errorMsg)
      // })
    },
    goback() {
      this.$router.push("/Setting/personInfo");
    }
  },
  mounted() {
    this.getVerifyCode();
  }
};
</script>

<style lang="less" scoped>
.fp-container {
  margin: 0 20px;
  .code-title {
    line-height: 60px;
    border-bottom: 1px solid #d7d7d7;
    color: #666666;
    font-size: 18px;
    font-weight: normal;
  }
  .step-ul {
    overflow: hidden;
    padding: 20px 39px;
    counter-reset: section 0 subsec 1;
    font-size: 14px;
    .step-li {
      float: left;
      width: 230px;
      border-bottom: 5px solid #e7e9eb;
      padding: 20px 0 50px 0;
      text-align: center;
      position: relative;
      margin-right: 10px;
      .title {
        color: #797979;
      }
      &:after {
        content: counter(section); //获取计数器
        counter-increment: section; //对计数器进行累加
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        background-color: #e7e9eb;
        position: absolute;
        bottom: -16px;
        left: 45%;
        color: #fff;
      }
    }
    .step-li + .step-li {
      margin-left: 5px;
    }
    .pass-li {
      border-bottom: 4px solid #0eaf63;
      &:after {
        background-color: #0eaf63;
      }
    }
  }
  .forget-payment-box {
    padding: 20px 10px;
    margin-top: 30px;
    .form-li {
      color: #ccc;
      font-size: 14px;
      margin-top: 20px;
      .text {
        display: inline-block;
        width: 150px;
        margin-right: 30px;
        text-align: right;
      }
      .detail {
        font-size: 12px;
        margin-left: 185px;
        margin-top: 10px;
      }
      .mobile {
        color: #333;
      }
      .short-input {
        display: inline-block;
      }
      .msg-verifiy {
        color: #333;
        display: inline-block;
        margin-left: 20px;
        width: 150px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background-color: #f6f5f5;
        border: 1px solid #ccc;
        border-radius: 2px;
        cursor: pointer;
      }
      .times-color {
        color: #0eaf63;
      }
      .code-verifiy {
        display: inline-block;
        width: 110px;
        height: 40px;
        text-align: center;
        margin-left: 20px;
      }
      .next {
        color: #005ea7;
        cursor: pointer;
      }
      .blur-text {
        font-size: 13px;
        color: #333;
      }
    }
    .submit-btn {
      cursor: pointer;
      width: 110px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      font-size: 13px;
      color: #fff;
      margin-top: 50px;
      background-color: #0eaf63;
      border-radius: 5px;
      margin-left: 185px;
    }
    .box-part-01 {
      .part-01-form-ul {
        overflow: hidden;
      }
    }
  }
  .box-part-03 {
    text-align: center;
    .icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: url("../../assets/img/qsf-success.png") no-repeat;
      margin-top: 40px;
    }
    .success-text {
      font-size: 18px;
      color: #009966;
      text-align: center;
      margin-top: 20px;
    }
    .return-btn {
      display: inline-block;
      width: 50px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #333;
      font-size: 12px;
      border: 1px solid #ccc;
      margin-top: 30px;
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.form-li .el-input {
  width: 380px;
}
.form-li .short-input .el-input {
  width: 180px;
}
@media screen and (min-width: 600px) and (max-width: 1250px) {
  .step-li {
    width: 230px !important;
  }
  .authentication {
    overflow: hidden;
  }
}
@media screen and (min-width: 1500px) {
  .step-li {
    width: 280px !important;
  }
}
</style>
