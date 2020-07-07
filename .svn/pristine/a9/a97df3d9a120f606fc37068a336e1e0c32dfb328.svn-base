<template>
  <div class="authentication">
    <!-- 验证身份 -->
    <h2>{{flag==1 || flag == 2? "验证身份" : "重新验证"}}</h2>
    <div class="authentication_message">
      <p class="tips">
        手机号可作为登录账号使用，为保障安全，我们需要验证是你本人在操作
      </p>
      <el-form v-if='!verification' label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="您当前的手机号" prop="name" class="email_tel">
          <el-input v-model.trim="ruleForm.name" id='ipt'></el-input>
          <el-button v-show="show" @click="getCode('ruleForm')">{{yzCode}}</el-button>
          <el-button v-show="!show" class="count">{{count}} S后重新发送</el-button>
          <!-- <br/><span class="el-form-item__error" v-if='ruleForm.name'>{{tipsInfo}}</span> -->
        </el-form-item>
        <el-form-item label="请输入验证码" class="yz_num">
          <!-- <el-input v-model="ruleForm.yz_num1"></el-input> -->
          <div class="input-box">
            <div class="input-content">
              <input v-model="input0" ref="input0" maxlength="1" pattern="[0-9]*" @keydown.8="deleteValue('input0','input0')" @keyup="changeValue($event,'input0','input1',input0)" type="number" placeholder="">
              <input v-model="input1" ref="input1" maxlength="1" pattern="[0-9]*" @keydown.8="deleteValue('input1','input0')" @keyup="changeValue($event,'input1','input2',input1)" type="number" placeholder="">
              <input v-model="input2" ref="input2" maxlength="1" pattern="[0-9]*" @keydown.8="deleteValue('input2','input1')" @keyup="changeValue($event,'input2','input3',input2)" type="number" placeholder="">
              <input v-model="input3" ref="input3" maxlength="1" pattern="[0-9]*" @keydown.8="deleteValue('input3','input2')" @keyup="changeValue($event,'input3','input4',input3)" type="number" placeholder="">
              <input v-model="input4" ref="input4" maxlength="1" pattern="[0-9]*" @keydown.8="deleteValue('input4','input3')" @keyup="changeValue($event,'input4','input5',input4)" type="number" placeholder="">
              <input v-model="input5" ref="input5" maxlength="1" pattern="[0-9]*" @keydown.8="deleteValue('input5','input4')" @keyup="changeValue($event,'input5','input5',input5)" type="number" placeholder="">
            </div>
          </div>
          <div class="el-form-item__error" v-if='elError'>您输入的验证码不正确，请重新输入</div>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" v-if='flag==1' @click='submittel("ruleForm")'>确 定</el-button>
          <el-button class="submit" v-if='flag==2' @click='writeFn("ruleForm")'>确定解绑</el-button>
        </el-form-item>
      </el-form>

      <el-form label-position="top" v-if='verification' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请输入您新的手机号" prop="newTel" class="email_tel">
          <span v-show="note_code" class="yanzTel" @click='noteCode("ruleForm")'>发送</span>
          <span v-show="!note_code" class="yanzTel" @click="noteCode">{{note}} S后重新发送</span>
          <el-input v-model.trim="ruleForm.newTel"></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码" class="yz_num">
          <div class="input-box">
            <div class="input-content">
              <input v-model="val0" ref="val0" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val0','val0')" @keyup="changeNumber($event,'val0','val1',val0)" type="number" placeholder="">
              <input v-model="val1" ref="val1" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val1','val0')" @keyup="changeNumber($event,'val1','val2',val0)" type="number" placeholder="">
              <input v-model="val2" ref="val2" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val2','val1')" @keyup="changeNumber($event,'val2','val3',val0)" type="number" placeholder="">
              <input v-model="val3" ref="val3" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val3','val2')" @keyup="changeNumber($event,'val3','val4',val0)" type="number" placeholder="">
              <input v-model="val4" ref="val4" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val4','val3')" @keyup="changeNumber($event,'val4','val5',val0)" type="number" placeholder="">
              <input v-model="val5" ref="val5" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val5','val4')" @keyup="changeNumber($event,'val5','val5',val0)" type="number" placeholder="">
            </div>
          </div>
          <div class="el-form-item__error" v-if='elError'>您输入的验证码不正确，请重新输入</div>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" @click='noteSubmit("ruleForm")'>确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";
export default {
  data() {
    //验证手机号
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("手机号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      tel: "",
      elError: false,
      verification: false,
      ruleForm: {
        name: "",
        email: "",
        newTel: ""
      },
      input0: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      val0: "",
      val1: "",
      val2: "",
      val3: "",
      val4: "",
      val5: "",
      timer: null,
      timers: null,
      show: true,
      note_code: true,
      note: 120,
      count: 120,
      flag: "",
      yzCode: "获取验证码",
      rules: {
        name: [
          //手机号
          { validator: checkPhone, trigger: "blur" }
        ],
        newTel: [
          //手机号
          { validator: checkPhone, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.flag = this.$route.query.flag;
    this.ruleForm.name = this.$route.query.val;
    if (this.$route.query.val.length == 11 && this.flag == 1) {
      this.getCode();
    }
     if (this.$route.query.val.length == 11 && this.flag == 2) {
       document.getElementById('ipt').setAttribute('readonly','readonly')
    }

  },
  methods: {
    //验证码
    getCode(formName) {
      //编辑有手机号的验证码
      if (this.flag == 1 && this.$route.query.val.length == 11) {
        this.verifyfn();
      } else if (this.flag == 2) {
        //解绑的验证码
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.verifyfn2();
          }
        });
        //编辑没有手机号的验证码
      } else if (this.flag == 1 && this.$route.query.val.length == 0) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.verifyfn3();
          }
        });
      }
    },
    timeDifference() {
      let data = window.localStorage.verifyCode || window.localStorage.verifyCode4
      if (data) {
        let stime = JSON.parse(data).sendTime;
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
    timeDifference2() {
      if (window.localStorage.verifyCode2) {
        let stime = JSON.parse(window.localStorage.verifyCode2).sendTime;
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
    timeDifference3() {
      if (window.localStorage.verifyCode3) {
        let stime = JSON.parse(window.localStorage.verifyCode3).sendTime;
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
    verifyfn() {
      if (window.localStorage.verifyCode) {
        let beforePhone = JSON.parse(window.localStorage.verifyCode).phone;
        if (this.ruleForm.name == beforePhone) {
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
        .companySendVerifyCode({ phone: this.ruleForm.name })
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });
          window.localStorage.verifyCode = JSON.stringify({
            phone: this.ruleForm.name,
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
          this.$message({
            message: err.errorMsg,
            type: "error"
          });
        });
    },
    verifyfn2() {
      if (window.localStorage.verifyCode2) {
        let beforePhone = JSON.parse(window.localStorage.verifyCode2).phone;
        if (this.ruleForm.name == beforePhone) {
          if (!this.timeDifference2()) {
            this.$message({
              message: "操作过于频繁，请稍后再试",
              type: "error"
            });
            return false;
          }
        }
      }
      api
        .sendVerifyCodeLogin({ phone: this.ruleForm.name })
        .then(res => {
          this.$message({
            message: "发送成功",
            type: "success"
          });
          window.localStorage.verifyCode2 = JSON.stringify({
            phone: this.ruleForm.name,
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
          this.$message({
            message: err.errorMsg,
            type: "error"
          });
        });
    },
    verifyfn3() {
      if (window.localStorage.verifyCode4) {
        let beforePhone = JSON.parse(window.localStorage.verifyCode4).phone;
        if (this.ruleForm.name == beforePhone) {
          if (!this.timeDifference()) {
            this.$message({
              message: "操作过于频繁，请稍后再试",
              type: "error"
            });
            return false;
          }
        }
      }
      api //判断账号是否是唯一的
        .dataSetting({ phone: this.ruleForm.name })
        .then(resd => {
          api
            .companySendVerifyCode({ phone: this.ruleForm.name })
            .then(res => {
              this.$message({
                message: "发送成功",
                type: "success"
              });
              window.localStorage.verifyCode4 = JSON.stringify({
                phone: this.ruleForm.name,
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
              this.$message({
                message: err.errorMsg,
                type: "error"
              });
            });
        })
        .catch(err => {
          this.$message({
            message: err.errorMsg,
            type: "error"
          });
        });
    },
    //有手机号得第二步 发送验证码
    noteCode(formName) {
      const COUNT = 120;
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (window.localStorage.verifyCode3) {
            let beforePhone = JSON.parse(window.localStorage.verifyCode3).phone;
            if (this.ruleForm.name == beforePhone) {
              if (!this.timeDifference3()) {
                this.$message({
                  message: "操作过于频繁，请稍后再试",
                  type: "error"
                });
                return false;
              }
            }
          }
          api //判断账号是否是唯一的
            .dataSetting({ phone: this.ruleForm.newTel })
            .then(resd => {
              api
                .companySendVerifyCode({ phone: this.ruleForm.newTel })
                .then(res => {
                  this.$message({
                    message: "发送成功",
                    type: "success"
                  });
                  window.localStorage.verifyCode3 = JSON.stringify({
                    phone: this.ruleForm.newTel,
                    sendTime: new Date().getTime()
                  });
                  const TIME_COUNT = 120;
                  let that = this;
                  if (!this.timers) {
                    this.note = COUNT;
                    this.note_code = false;
                    this.timers = setInterval(() => {
                      if (this.note > 0 && this.note <= COUNT) {
                        this.note--;
                      } else {
                        this.note_code = true;
                        clearInterval(this.timers);
                        this.timers = null;
                      }
                    }, 1000);
                  }
                })
                .catch(err => {
                  this.$message({
                    message: err.errorMsg,
                    type: "error"
                  });
                });
            })
            .catch(err => {
              this.$message({
                message: err.errorMsg,
                type: "error"
              });
            });
        }
      });
    },
    noteSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.val0 &&
            this.val1 &&
            this.val2 &&
            this.val3 &&
            this.val4 &&
            this.val5
          ) {
            this.elError = false;
            let data = {
              phone: this.ruleForm.newTel,
              verificationCode:
                this.val0 +
                this.val1 +
                this.val2 +
                this.val3 +
                this.val4 +
                this.val5
            };
            api
              .updateTelephone(data)
              .then(res => {
                this.$router.push({ path: "/Setting/personInfo" });
              })
              .catch(err => {
                this.$message({
                  message: err.errorMsg,
                  type: "error"
                });
              });
          } else {
            this.elError = true;
          }
        }
      });
    },
    //注销手机号
    writeFn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.input0 &&
            this.input1 &&
            this.input2 &&
            this.input3 &&
            this.input4 &&
            this.input5
          ) {
            this.elError = false;
            let data = {
              phone: this.ruleForm.name,
              verityCode:
                this.input0 +
                this.input1 +
                this.input2 +
                this.input3 +
                this.input4 +
                this.input5
            };
            api
              .untiedMobile(data)
              .then(res => {
                this.$message({
                  message: "解绑成功",
                  type: "success"
                });
                this.$router.push({ path: "/Setting/personInfo" });
              })
              .catch(err => {
                this.$message({
                  message: err.errorMsg,
                  type: "error"
                });
              });
          } else {
            this.elError = true;
          }
        } else {
          return false;
        }
      });
    },
    //提交按钮
    submittel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证码提示
          if (
            this.input0 &&
            this.input1 &&
            this.input2 &&
            this.input3 &&
            this.input4 &&
            this.input5
          ) {
            this.elError = false;
            if (this.flag == 1 && this.$route.query.val.length == 11) {
              //有手机号的情况下
              let data = {
                phone: this.ruleForm.name,
                verityCode:
                  this.input0 +
                  this.input1 +
                  this.input2 +
                  this.input3 +
                  this.input4 +
                  this.input5
              };
              api
                .validatePhoneVerifyCode(data)
                .then(res => {
                  if (res.errorCode == "200") {
                    // this.show = true;
                    this.verification = true;
                    this.flag = 0;
                  }
                })
                .catch(err => {
                  this.$message({
                    message: err.errorMsg,
                    type: "error"
                  });
                });
            } else if (this.flag == 1 && this.$route.query.val.length == 0) {
              //没手机号得情况下
              let data = {
                phone: this.ruleForm.name,
                verificationCode:
                  this.input0 +
                  this.input1 +
                  this.input2 +
                  this.input3 +
                  this.input4 +
                  this.input5
              };
              api
                .updateTelephone(data)
                .then(res => {
                   this.$message({
                    message: '绑定成功',
                    type: "success"
                  });
                  this.$router.push({ path: "/Setting/personInfo" });
                })
                .catch(err => {
                  this.$message({
                    message: err.errorMsg,
                    type: "error"
                  });
                });
            }
          } else {
            this.elError = true;
          }
        } else {
          return false;
        }
      });
    },
    submitMail(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ifText = true;
          this.flag = "";
        } else {
          return false;
        }
      });
    },
    //验证码删除事件
    deleteValue(inputValue, previousItem) {
      // 键盘按下时$event，当前input，上一个input
      if (this[inputValue].length > 0) {
        // 当前有值，清空之
        this[inputValue] = "";
      } else {
        // 当前没有值，光标跳转到上一个input，并清空该input值
        this.$nextTick(() => {
          this.$refs[previousItem].focus();
          this[previousItem] = "";
          this[inputValue] = "";
        });
      }
      //验证码提示
      if (
        this.input0 &&
        this.input1 &&
        this.input2 &&
        this.input3 &&
        this.input4 &&
        this.input5
      ) {
        this.elError = false;
      } else {
        this.elError = true;
      }
    },
    deleteNumber(inputValue, previousItem) {
      // 键盘按下时$event，当前input，上一个input
      if (this[inputValue].length > 0) {
        // 当前有值，清空之
        this[inputValue] = "";
      } else {
        // 当前没有值，光标跳转到上一个input，并清空该input值
        this.$nextTick(() => {
          this.$refs[previousItem].focus();
          this[previousItem] = "";
          this[inputValue] = "";
        });
      }
      //验证码提示
      if (
        this.val0 &&
        this.val1 &&
        this.val2 &&
        this.val3 &&
        this.val4 &&
        this.val5
      ) {
        this.elError = false;
      } else {
        this.elError = true;
      }
    },
    //验证码输入事件
    changeValue(e, inputValue, nextItem, code) {
      // 键盘抬起时$event，当前input，下一个input
      if (e.keyCode !== 8 && (code || code == "0")) {
        this.$nextTick(() => {
          this.$refs[nextItem].focus(); // 截取当前值最后一位，跳到下一个input
          this[inputValue] = this[inputValue].toString().slice(-1);
        });
        //验证码提示
        if (
          this.input0 &&
          this.input1 &&
          this.input2 &&
          this.input3 &&
          this.input4 &&
          this.input5
        ) {
          this.elError = false;
        } else {
          this.elError = true;
        }
      }
    },
    changeNumber(e, inputValue, nextItem, code) {
      // 键盘抬起时$event，当前input，下一个input
      if (e.keyCode !== 8 && (code || code == "0")) {
        this.$nextTick(() => {
          this.$refs[nextItem].focus(); // 截取当前值最后一位，跳到下一个input
          this[inputValue] = this[inputValue].toString().slice(-1);
        });
        //验证码提示
        if (
          this.val0 &&
          this.val1 &&
          this.val2 &&
          this.val3 &&
          this.val4 &&
          this.val5
        ) {
          this.elError = false;
        } else {
          this.elError = true;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.authentication {
  margin: 0 20px;
  > h2 {
    line-height: 60px;
    border-bottom: 1px solid #d7d7d7;
    color: #666666;
    font-size: 18px;
    font-weight: normal;
  }
}
.authentication_message {
  padding: 0 20px;
  padding-bottom: 50px;
  border-bottom: 1px solid #d7d7d7;
}
.tips {
  padding: 20px 0 20px;
  color: #d5d4d4;
}
.email_tel {
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .el-form-item__label::before {
    content: "";
    margin: 0;
  }
  .el-input {
    width: 450px;
  }
  .el-button {
    background: #101920;
    color: #fff;
    padding: 0 20px;
    height: 40px;
  }
  > div {
    padding-top: 9px;
    font-size: 12px;
    color: #d71818;
  }
}
.yz_num {
  margin-top: 20px;
  .el-input {
    width: 450px;
    margin-right: 30px;
  }
}
.input-content {
  > input {
    height: 40px;
    width: 50px;
    border: 1px solid #cccccc;
    margin-right: 30px;
    text-align: center;
    box-sizing: border-box;
  }
}
.submit {
  width: 450px;
  height: 40px;
  color: #fff;
  background: #03b189;
  margin-top: 35px;
  font-size: 14px;
}
.text {
  margin: 20px 0;
  > h4 {
    color: #666666;
    font-size: 14px;
  }
  p {
    padding-top: 20px;
    width: 300px;
    text-align: center;
    color: #666;
  }
  .subsure {
    width: 380px;
  }
}
</style>
<style lang="less">
.email_tel,
.yz_num {
  .el-form-item__label::before {
    content: "" !important;
    color: none !important;
    margin: 0px !important;
  }
}
.email_tel {
  position: relative;
  .yanzTel {
    position: absolute;
    left: 420px;
    top: -50px;
    color: #269dfa;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
