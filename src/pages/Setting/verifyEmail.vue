<template>
  <div class="authentication">
    <!-- 验证身份 -->
    <h2>验证身份</h2>
    <div class="authentication_message">
      <p class="tips">
        邮箱号可作为登录账号使用，为保障安全，我们需要验证是你本人在操作
      </p>
      <div v-if='flag==1'>
        <el-form v-if='ifNewEmail && ruleForm.email' label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原电子邮箱" prop="originalEmail" class="email_tel">
            <el-input v-model="ruleForm.originalEmail"></el-input>
          </el-form-item>
          <el-form-item v-if='ifNewEmail' label="新电子邮箱" prop="newEmail" class="email_tel">
            <el-input v-model="ruleForm.newEmail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit" v-if='flag==1' @click='submittel("ruleForm")'>确 定</el-button>
            <!-- <el-button class="submit" v-if='flag==2' @click='writeFn("ruleForm")'>确定解绑</el-button> -->
          </el-form-item>
        </el-form>
        <div class="unbundleEmail" v-if='!ifNewEmail'>
          <h3>添加邮箱链接邮件已经发送，从链接进入即可</h3>
          <p>已发送至
            <span>{{ruleForm.newEmail}}</span>
          </p>
          <el-button class="submit" @click="unbindEmialFn">确 定</el-button>
        </div>
        <el-form label-position="top" v-if='!ruleForm.email' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item v-if='verify' label="输入您的邮箱" prop="addEmail" class="email_tel">
            <el-input v-model="ruleForm.addEmail"></el-input>
          </el-form-item>
          <div class="unbundleEmail" v-if='!verify'>
            <h3>添加邮箱链接邮件已经发送，从链接进入即可</h3>
            <p>已发送至
              <span>{{ruleForm.addEmail}}</span>
            </p>
          </div>
          <el-form-item>
            <el-button class="submit" @click='noteSubmit("ruleForm")'>确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="unbundleEmail" v-if='flag==2'>
        <h3>解绑邮箱链接邮件已经发送，从链接进入即可</h3>
        <p>已发送至
          <span>{{ruleForm.email}}</span>
        </p>
        <button class="submit" @click="unbindEmialFn">确 认</button>
      </div>
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
    //验证邮箱 { validator: checkEmail, trigger: 'blur' }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("请输入邮箱"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      HttpHead: process.env.siteUrl,
      elError: false,
      ruleForm: {
        email: "",
        addEmail: "", //没有邮箱时输入的邮箱
        originalEmail: "", //原邮箱
        newEmail: "" //新邮箱
      },
      timer: null,
      show: true,
      verify: true,
      ifNewEmail: true,
      count: 120,
      flag: "",
      yzCode: "获取验证码",
      userId: "",
      rules: {
        originalEmail: [
          //原电子邮箱
          { validator: checkEmail, trigger: "blur" }
        ],
        newEmail: [
          //新电子邮箱
          { validator: checkEmail, trigger: "blur" }
        ],
        nowTel: [
          //手机号
          { validator: checkPhone, trigger: "blur" }
        ],
        addEmail: [
          //新添加的邮箱
          { validator: checkEmail, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.flag = this.$route.query.flag;
    this.ruleForm.email = this.$route.query.val;
    this.ruleForm.originalEmail = this.$route.query.val;
    if (this.flag == 2 && this.ruleForm.email) {
      this.unbindEmial();
    }
    api.getUserInfo().then(res => {
      this.userId = res.dataList[0].id;
    });
  },
  methods: {
    unbindEmial() {
      let data = {
        mailContent: `${this.HttpHead}?emial=${
          this.ruleForm.email
        }&untie=untieEmail`, //邮件内容
        mailTitle: "解绑邮箱", //邮件标题
        receiverUsername: this.ruleForm.email //收件人账号
      };
      api
        .sendMail(data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    unbindEmialFn() {
      //解绑邮箱
      this.$router.push({ path: "/Setting/personInfo" });
    },
    //没有邮箱的点击事件
    noteSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.verify) {
            api //判断账号是否是唯一的
              .dataSetting({ email: this.ruleForm.addEmail })
              .then(resd => {
                let data = {
                  mailContent: `${this.HttpHead}?emial=${
                    this.ruleForm.addEmail
                  }&userId=${this.userId}`, //邮件内容
                  mailTitle: "编辑邮箱", //邮件标题
                  receiverUsername: this.ruleForm.addEmail //收件人账号
                };
                this.verify = false;
                api
                  .sendMail(data)
                  .then(res => {
                    // this.verify = false;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                this.$message({
                  message: err.errorMsg,
                  type: "error"
                });
              });
          } else {
            this.$router.push({ path: "/Setting/personInfo" });
          }
        }
      });
    },
    //提交按钮 有邮箱的情况下
    submittel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api //判断账号是否是唯一的
            .dataSetting({ email: this.ruleForm.newEmail })
            .then(resd => {
              let data = {
                mailContent: `${this.HttpHead}?emial=${
                  this.ruleForm.newEmail
                }&userId=${this.userId}`, //邮件内容
                mailTitle: "编辑邮箱", //邮件标题
                receiverUsername: this.ruleForm.newEmail //收件人账号
              };
              this.ifNewEmail = false;
              api
                .sendMail(data)
                .then(res => {})
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              this.$message({
                message: err.errorMsg,
                type: "error"
              });
            });
        } else {
          return false;
        }
      });
    },
    //解绑邮箱的验证
    jumpEmial() {
      let data = {
        mailContent: "", //邮件内容
        mailTitle: "", //邮件标题
        receiverUsername: this.ruleForm.email //收件人账号
      };
      api
        .sendMail(data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
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
.submitEmail {
  width: 382px;
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
.unbundleEmail {
  > h3 {
    // width: 400px;
    font-size: 20px;
    color: #666666;
    // text-align: center;
    line-height: 28px;
    padding-top: 20px;
  }
  > p {
    padding-top: 20px;
    width: 400px;
    text-align: center;
    font-size: 14px;
    color: #666666;
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
    left: 380px;
    top: -50px;
    color: #269dfa;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
