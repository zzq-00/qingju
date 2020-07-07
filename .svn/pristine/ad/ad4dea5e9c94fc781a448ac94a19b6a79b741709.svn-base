<template>
  <div>
    <div class="nav">
      <div class="container clearfix">
        <router-link to="/" class="logo">青矩</router-link>
        <h2>找回密码</h2>
        <router-link to="/index">青矩首页</router-link>
      </div>
    </div>
    <div class="content">
      <div class="container clearfix">
        <div class="color">
          <div class="validate-flow">
            <ul class="flow-ul">
              <li class="flow-one li-active">1.确认账号</li>
              <li class="flow-two" v-bind:class="{'li-active':twoActive}">2.安全验证</li>
              <li class="flow-three" v-bind:class="{'li-active':threeActive}">3.重置密码</li>
            </ul>
            <div class="validate-one-pane" v-show="oneNone">
              <el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="账号：" prop="usermobile">
                  <el-input class="el-input-reload" type="text" v-model="ruleForm.usermobile" placeholder="请填写账号"></el-input>
                </el-form-item>
                <el-form-item label="图片验证码：" prop="imgcapchar">
                  <el-input class="el-input-reload" v-model="ruleForm.imgcapchar" placeholder="请填写右侧验证码"></el-input>
                  <img src="" alt="" class="validateImg" ref="imgChar" @click="getImg">
                </el-form-item>

                <el-form-item class="submit-item">
                  <el-button type="primary" class="btn-last" @click="submitOneForm('ruleForm')">下一步</el-button>
                  <el-button class="btn-last" @click="goFacilitator">取 消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="validate-two-pane" v-show="twoNone">
              <el-form label-width="120px" :model="rulesCompanyForm" :rules="rulesCompanys" ref="rulesCompanyForm">
                <el-form-item label="验证方式：" required>
                  <el-input class="el-input-reload" v-model="rulesCompanyForm.number" placeholder="请填写手机号码" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码：" prop="messagecapchar">
                  <el-input class="el-input-reload" v-model="rulesCompanyForm.messagecapchar" placeholder="请填写短信验证码"></el-input>
                  <el-button type="primary" class="validateBtn" @click="getCapchar" id="messageClick" v-bind:class="{'is-disabled':disabled}">获取短信验证码</el-button>
                  <span v-if="disabled" v-bind:class="{'ms':disabled}">{{time}}S</span>
                </el-form-item>
                <el-form-item class="submit-item">
                  <el-button class="btn-last" @click="goprev">上一步</el-button>
                  <el-button type="primary" class="btn-last" @click="submitTwoForm('rulesCompanyForm')">下一步</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="validate-three-pane" v-show="threeNone">
              <el-form label-width="120px" :model="rulesPass" :rules="rulesThree" ref="rulesPass">
                <el-form-item label="新密码：" prop="pass">
                  <el-input class="el-input-reload" auto-complete="off" type="password" v-model="rulesPass.pass" placeholder="请填写新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="secondPassWord">
                  <el-input class="el-input-reload" auto-complete="off" type="password" v-model="rulesPass.secondPassWord" placeholder="请再次填写新密码"></el-input>
                </el-form-item>
                <el-form-item class="submit-item">
                  <el-button type="primary" class="btn-last" @click="submitThreeForm('rulesPass')">确认</el-button>
                  <el-button class="btn-last" @click="againGoprev">上一步</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerComponents />
  </div>
</template>
<script>
import axios from 'axios'
import api from '@/fetch/api'
import footerComponents from '@/components/footerComponents'
var xmlHttp
export default {
  components: {
    footerComponents
  },
  data() {
    //检测手机号
    let checkMobile = function(rule, value, callback) {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        api
          .getInfoByCode(value)
          .then(res => {
            if (res.errorCode == '200') {
              window.localStorage.number = res.dataList[0]
              callback()
            } else {
            }
          })
          .catch(res => {
            return callback(new Error(res.errorMsg))
          })
      }
    }
    // 图形验证码
    let checkImg = function(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入右侧验证码'))
      } else {
        api
          .validateVerifyCode(value)
          .then(res => {
            if (res.errorCode == '200') {
              callback()
            }
          })
          .catch(res => {
            return callback(new Error('验证码错误'))
          })
      }
    }
    // 短信验证码
    let checkCode = function(rule, value, callback) {
      if (!value) {
        return callback(new Error('请填写短信验证码'))
      } else {
        let data = {
          phone: window.localStorage.number,
          userId: this.userId,
          verityCode: value
        }
        api
          .validatePhoneVerifyCode(data)
          .then(res => {
            if (res.errorCode == '200') {
              callback()
            }
          })
          .catch(res => {
            return callback(new Error('短信验证码错误'))
          })
      }
    }
    // 验证密码
    let checkpass = function(rule, value, callback) {
      if (!value) {
        return callback(new Error('请填写新密码'))
      } else if (value.indexOf(' ') !== -1) {
        return callback(new Error('密码内请勿包含空格'))
      } else {
        window.localStorage.newpass = value
        callback()
      }
    }
    // 再次验证密码
    let checkTwo = function(rule, value, callback) {
      if (!value) {
        return callback(new Error('请再次填写密码'))
      } else if (value !== window.localStorage.newpass) {
        return callback(new Error('两次输入密码不同'))
      } else {
        callback()
      }
    }
    return {
      userId: window.localStorage.QingjuuserId, //用户id
      oneNone: true, //第一个模块是否显示
      twoNone: false, //第二个模块是否显示
      threeNone: false, //第三个模块是否显示
      twoActive: false, //导航二是否激活
      threeActive: false, //导航三是否激活
      time: 60, //验证码的时间
      disabled: false, //短信验证码是否发送
      //第一页的变量
      ruleForm: {
        usermobile: '', //手机号码
        imgcapchar: '' //图形验证
      },
      //第二页的变量
      rulesCompanyForm: {
        number: '', //手机号码
        messagecapchar: '' //短信验证码
      },
      //第三页的变量
      rulesPass: {
        pass: '', //新密码
        secondPassWord: '' //再次输入密码
      },
      value: '',
      verifyImg: '', //图片验证码
      //第一页的表单规则
      rules: {
        // 手机号码
        usermobile: [{ required: true, message: '请填写账号', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }],
        // 图形验证
        imgcapchar: [{ required: true, message: '请输入右侧验证码', min: 4, max: 4, trigger: 'blur' }, { validator: checkImg, min: 4, max: 4, trigger: 'blur' }]
      },
      //第二页的表单规则
      rulesCompanys: {
        // 短信验证码
        messagecapchar: [{ required: true, message: '请填写短信验证码', min: 6, max: 6, trigger: 'click' }, { validator: checkCode, min: 6, max: 6, trigger: 'click' }]
      },
      ruleForm2: {
        pass: '',
        checkPass: '',
        age: ''
      },
      //第三页的表单规则
      rulesThree: {
        // 新密码
        pass: [{ required: true, message: '请填写6-14位新密码', min: 6, max: 14, trigger: 'blur' }, { validator: checkpass, min: 6, max: 14, trigger: 'blur' }],
        secondPassWord: [{ required: true, message: '请再次填写6-14位新密码', min: 6, max: 14, trigger: 'blur' }, { validator: checkTwo, min: 6, max: 14, trigger: 'blur' }]
      }
    }
  },
  methods: {
    //获得图片验证
    getImg() {
      // this.verifyImg = this.httpHead + 'facilitator/getVerifyCode?' + Math.random()
      let self = this
      // 实例化XMLHttpRequest对象
      if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
      xmlHttp.withCredentials = true
      if (xmlHttp != null) {
        // xmlHttp.onreadystatechange = this.callBack;
        xmlHttp.open(
          'get',
          axios.defaults.baseURL + 'facilitator/getVerifyCode', //图片验证接口地址
          true
        )
        xmlHttp.responseType = 'blob'
        xmlHttp.onload = function() {
          if (this.status == 200) {
            var blob = this.response
            self.$refs['imgChar'].src = window.URL.createObjectURL(xmlHttp.response)
          }
        }
        xmlHttp.send(null)
      }
    },
    //获得短信验证
    getCapchar() {
      this.rulesCompanyForm.number = window.localStorage.number
      if (/^[0-9]{11}$/.test(this.rulesCompanyForm.number)) {
        let data = {
          phone: this.rulesCompanyForm.number,
          userId: '',
          verityCode: ''
        }
        api
          .sendVerifyCode(data)
          .then(res => {
            if (res.errorCode == '200') {
              this.$message('发送成功！')
              //定时器的秒数
              var disabled = document.getElementById('messageClick')
              var timeVal = setInterval(() => {
                this.time--
                if (this.time === 0) {
                  disabled.removeAttribute('disabled')
                  clearInterval(timeVal)
                  this.time = 60
                  this.disabled = false
                } else {
                  //添加的属性 disabled
                  disabled.setAttribute('disabled', 'disabled')
                  this.disabled = true
                }
              }, 1000)
            } else {
            }
          })
          .catch(res => {
            this.$message(res.errorMsg)
          })
      } else {
      }
    },
    //第一页的下一步
    nextTwo() {
      this.oneNone = false
      this.twoNone = true
      this.twoActive = true
      this.threeActive = false
      this.rulesCompanyForm.number = window.localStorage.number
    },
    //第二页的下一步
    nextThree() {
      this.oneNone = false
      this.twoNone = false
      this.threeNone = true
      this.twoActive = true
      this.threeActive = true
    },
    //第二页的上一步
    goprev() {
      //这里的上一步没有刷新页面，只是将第一页和第二页显示隐藏
      this.oneNone = true
      this.twoNone = false
      this.twoActive = false
    },
    //第三页的上一部
    againGoprev() {
      this.oneNone = false
      this.twoNone = true
      this.threeNone = false
      this.twoActive = true
      this.threeActive = false
    },
    // 第一步提交
    submitOneForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.nextTwo() //成功保存后到第二页
        } else {
          return false
        }
      })
    },
    // 第二步提交
    submitTwoForm(rulesCompanyForm) {
      this.$refs[rulesCompanyForm].validate(valid => {
        if (valid) {
          this.nextThree() //成功保存后到第三页
        } else {
          return false
        }
      })
    },

    //第三步提交
    submitThreeForm(rulesPass) {
      this.$refs[rulesPass].validate(valid => {
        if (valid) {
          let data = {
            code: this.ruleForm.usermobile,
            newPassword: this.rulesPass.pass,
            telephone: this.rulesCompanyForm.number
          }
          api.forgetPassword(data).then(res => {
            if (res.errorCode == '200') {
              this.$message({
                message: '设置成功',
                type: 'success'
              })
              localStorage.removeItem('number')
              this.$router.push('/login')
            } else {
              this.$message.error(res.errorMsg)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //取消 / 跳转
    goFacilitator() {
      this.$router.push('/login')
    }
  },
  mounted() {
    this.getImg() //获得图片验证
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
  .container {
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
    > a:last-child {
      font-size: 14px;
      float: right;
    }
  }
}
.content {
  background-color: #fff;
  padding: 100px 0;
  color: #666;
  font-size: 14px;
  .container {
    position: relative;
  }
}
.footer {
  background-color: #fff;
  font-size: 14px;
  text-align: center;
  .container {
    padding: 40px 0;
    border-top: 1px solid #d9d9d9;
    > ul {
      margin-bottom: 10px;
      > li {
        display: inline-block;
        padding: 0 10px;
        + li {
          border-left: 1px solid #333;
        }
      }
    }
  }
}
.color {
  background-color: #fff;
}
.validate-flow {
  width: 1200px;
  margin: 0 auto;
  border: 1px solid #e4e4e4;
  padding-bottom: 80px;
  .flow-ul {
    width: 940px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 100px;
    overflow: hidden;
    li + li {
      margin-left: 5px;
    }
    li {
      float: left;
      height: 50px;
      line-height: 50px;
      position: relative;
      text-align: center;
      color: #000;
      font-size: 18px;
      background-color: #e7e8eb;
    }
    .flow-one {
      width: 310px;
      z-index: 10;
      &:after {
        content: '';
        position: absolute;
        //z-index: 10;
        top: 0;
        right: -25px;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-bottom: 25px solid transparent;
        border-left: 25px solid #e7e8eb;
      }
    }
    .flow-two {
      width: 310px;
      z-index: 5;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-bottom: 25px solid transparent;
        border-left: 25px solid #fff;
      }
      &:after {
        content: '';
        position: absolute;
        z-index: 10;
        top: 0;
        right: -25px;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-bottom: 25px solid transparent;
        border-left: 25px solid #e7e8eb;
      }
    }
    .flow-three {
      width: 310px;
      z-index: 0;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-bottom: 25px solid transparent;
        border-left: 25px solid #fff;
      }
    }
    .li-active {
      color: #fff;
      background-color: #00cc99;
      &:after {
        border-left-color: #00cc99;
      }
    }
  }
}
/* 按钮的公共样式 */
.btn-last {
  width: 110px;
  height: 33px;
  /* 有问题 */
  line-height: 1px;
}
/* 第一步 */
.validate-one-pane {
  padding-left: 300px;
  /* 输入框的宽度 */
  .el-input-reload {
    width: 350px;
    margin-left: 20px;
    margin-right: 20px;
    color: #666666;
    font-size: 14px;
  }
  .validateBtn {
    height: 33px;
    line-height: 1px;
  }
  .ms {
    display: inline-block;
    width: 35px;
    height: 35px;
    line-height: 35px;
    color: #666;
    font-size: 14px;
    border: 1px solid #666;
    text-align: center;
    margin-left: 10px;
  }
  .validateImg {
    display: inline-block;
    width: 100px;
    height: 30px;
    background-color: #00cc99;
  }
  .submit-item {
    margin-top: 100px;
  }
}
/* 第二步 */
.validate-two-pane {
  padding-left: 300px;
  .el-input-reload {
    width: 350px;
    margin-left: 20px;
    margin-right: 20px;
    color: #666666;
    font-size: 14px;
  }
  .el-select {
    margin-left: 20px;
  }
  .submit-item {
    margin-top: 100px;
  }
}
/* 第三步 */
.validate-three-pane {
  padding-left: 300px;
  .el-input-reload {
    width: 350px;
    margin-left: 20px;
    margin-right: 20px;
    color: #666666;
    font-size: 14px;
  }
  .el-select {
    margin-left: 20px;
  }
  .submit-item {
    margin-top: 100px;
  }
}
</style>
<style>
/* 修改的是输入框错误后的内容 */
.el-form-item__error {
  left: 20px;
}
</style>
