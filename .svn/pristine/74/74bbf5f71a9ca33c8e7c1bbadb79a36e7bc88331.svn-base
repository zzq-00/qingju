<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <div class="color">
      <div class="validate-flow">
        <ul class="flow-ul">
          <li class="flow-one li-active">1.填写手机号</li>
          <li class="flow-two" v-bind:class="{'li-active':twoActive}">2.完善消息</li>
          <li class="flow-three" v-bind:class="{'li-active':threeActive}">3.填写成功</li>
        </ul>

        <div class="validate-one-pane" v-show="oneNone">
          <el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="手机号码：" prop="usermobile">
              <el-input class="el-input-reload" type="text" v-model="ruleForm.usermobile" placeholder="请填写手机号码"></el-input>
            </el-form-item>
            <el-form-item label="图片验证码：" prop="imgcapchar">
              <el-input class="el-input-reload" v-model="ruleForm.imgcapchar" placeholder="请填写右侧验证码"></el-input>
              <img src="" alt="" class="validateImg" ref="imgChar" @click="getImg">
            </el-form-item>
            <el-form-item label="短信验证码：" prop="messagecapchar">
              <el-input class="el-input-reload" v-model="ruleForm.messagecapchar" placeholder="请填写短信验证码"></el-input>
              <el-button type="primary" class="validateBtn" @click="getCapchar" id="messageClick" v-bind:class="{'is-disabled':disabled}">获取短信验证码</el-button>
              <span v-if="disabled" v-bind:class="{'ms':disabled}">{{time}}S</span>
            </el-form-item>
            <el-form-item class="submit-item">
              <el-button type="primary" class="btn-last" @click="submitOneForm('ruleForm')">下一步</el-button>
              <el-button class="btn-last" @click="goFacilitator">取 消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="validate-two-pane" v-if="twoNone">
          <el-form label-width="120px" :model="rulesCompanyForm" :rules="rulesCompanys" ref="rulesCompanyForm">
            <el-form-item label="公司名称：" prop="usercompany">
              <el-input class="el-input-reload" v-model="rulesCompanyForm.usercompany"></el-input>
            </el-form-item>
            <el-form-item label="所属地区：" required>
              <el-col :span="8">
                <el-form-item prop="proviceValue">
                  <el-select v-model="rulesCompanyForm.proviceValue" placeholder="请选择省份" id="provice" @change="getValue(rulesCompanyForm.proviceValue)">
                    <el-option v-for="item in proviceOptions" :key="item.id" :label="item.name" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="cityValue">
                  <el-select v-model="rulesCompanyForm.cityValue" placeholder="请选择城市">
                    <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="行业类型：" required>
              <el-col :span="8">
                <el-form-item prop="professionValue">
                  <el-select v-model="rulesCompanyForm.professionValue" placeholder="请选择行业大类" @change="changeValue(rulesCompanyForm.professionValue)">
                    <el-option v-for="item in professionOptions" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="smallValue">
                  <el-select v-model="rulesCompanyForm.smallValue" placeholder="请选择行业">
                    <el-option v-for="item in smallType" :key="item.id" :label="item.secondLevelName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="联系人姓名：">
              <el-input class="el-input-reload" v-model="rulesCompanyForm.contactsName"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" :rows="3" class="el-input-textarea" v-model="rulesCompanyForm.remark"></el-input>
            </el-form-item>
            <el-form-item class="submit-item">
              <el-button type="primary" class="btn-last" @click="submitTwoForm('rulesCompanyForm')">下一步</el-button>
              <el-button class="btn-last" @click="goprev">上一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="validate-three-pane" v-if="!threeNone">
          <i class="validate-success-icon">
            <i class="el-icon-check"></i>
          </i>
          <p class="validate-success-text">感谢您的信赖，您的联系方式我们已经收到！</p>
          <p class="validate-success-more">我们会尽快联系您</p>
          <div class="success-btn">
            <el-button type="primary" class="btn-last" @click="goFacilitator">完成</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb";
import axios from "axios";
import api from "../../fetch/api";

var xmlHttp;
export default {
  components: {
    breadcrumb,
  },
  data () {
    //检测手机号
    let checkMobile = function (rule, value, callback) {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!/^[0-9]{11}$/.test(value)) {
        return callback(new Error("手机号错误！"));
      } else {
        window.localStorage.mobile = value
        callback()
      }

    };
    // 图形验证码
    let checkImg = function (rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入右侧验证码"));
      }
      else {
        api.validateVerifyCode(value).then(res => {
          if (res.errorCode == '200') {
            callback()
          }
        }).catch(res => {
          return callback(new Error("验证码错误"));
        })
      }
    };
    // 短信验证码
    let checkCode = function (rule, value, callback) {
      if (!value) {
        return callback(new Error("请填写短信验证码"));
      }
      // callback()
      else {
        let data = {
          "phone": window.localStorage.mobile,
          "userId": this.userId,
          "verityCode": value
        }
        api.validatePhoneVerifyCode(data).then(res => {
          if (res.errorCode == '200') {
            callback()
          }
        }).catch(res => {
          return callback(new Error("短信验证码错误"));
        })
      }
    };
    // 检测省份
    let checkProvince = function (rule, value, callback) {
      if (!value) {
        return callback(new Error("请选择省份"));
      }
      callback()
    };
    return {
      userId: window.localStorage.QingjuuserId,    //用户id
      oneNone: true,      //第一个模块是否显示
      twoNone: false,     //第二个模块是否显示
      threeNone: true,    //第三个模块是否显示
      twoActive: false,   //导航二是否激活
      threeActive: false, //导航三是否激活
      time: 60,           //验证码的时间
      disabled: false,    //短信验证码是否发送
      //第一页的变量
      ruleForm: {
        usermobile: "",     //手机号码
        imgcapchar: "",     //图形验证
        messagecapchar: "", //短信验证码
      },
      //第二页的变量
      rulesCompanyForm: {
        usercompany: "",    //公司名称
        proviceValue: '',    //省
        cityValue: "",       //市
        professionValue: "", //行业大类
        smallValue: "",      //具体行业
        contactsName: '',    //联系人姓名  //不是必填
        remark: '',          //备注    不是必填
      },
      //第一页的表单规则
      rules: {
        // 手机号码
        usermobile: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: "blur" }
        ],
        // 图形验证
        imgcapchar: [
          { required: true, message: '请输入右侧验证码', min: 4, max: 4, trigger: 'blur' },
          { validator: checkImg, min: 4, max: 4, trigger: "blur" }
        ],
        // 短信验证码
        messagecapchar: [
          { required: true, message: '请填写短信验证码', min: 6, max: 6, trigger: 'click' },
          { validator: checkCode, min: 6, max: 6, trigger: 'click' }
        ]
      },
      //第二页的表单规则
      rulesCompanys: {
        // 公司名称
        usercompany: [
          { required: true, message: '请填写公司名称', trigger: 'blur' }
        ],
        // 所属地区
        proviceValue: [
          { required: true, message: '请选择省份', trigger: 'change' }
          // { validator: checkProvince, trigger: "change" }
        ],
        cityValue: [
          { required: true, message: '请选择市区', trigger: 'change' }
        ],
        // 行业
        professionValue: [
          { required: true, message: '请选择行业大类', trigger: 'change' }
        ],
        smallValue: [
          { required: true, message: '请选择行业', trigger: 'change' }
        ],
      },
      breadcrumbs: [
        { name: "服务商", path: "/collaborationService/facilitator" },
        { name: "服务商合作", path: this.$route.fullPath }
      ],
      proviceOptions: [],    //省份列表
      cityOptions: [],       //城市列表
      professionOptions: [], //行业列表
      smallType: [],         //行业大类下的具体行业
      value: "",
      verifyImg: '',         //图片验证码
    };
  },
  mounted () {
    if (!this.userId) {
      this.$router.push('/login')
    }
    this.getImg();
    this.province()         //获取省份
    this.getProfessionType()  //获取行业
  },
  methods: {
    // 获取省份
    province () {
      api.province().then(res => {
        this.proviceOptions = res.dataList
      })
    },
    // 获取行业
    getProfessionType () {
      api.getProfessionType().then(res => {
        this.professionOptions = res.dataList
      })
    },
    // 获取行业大类下的具体分类
    changeValue (professionValue) {
      this.smallType = []
      this.rulesCompanyForm.smallValue = ''
      this.smallType = this.professionOptions[professionValue - 1].professionSecondTypes
    },
    //页面跳转
    goFacilitator () {
      this.$router.push("/collaborationService/facilitator");
    },
    //第二页的上一步
    goprev () {
      //这里的上一步没有刷新页面，只是将第一页和第二页显示隐藏
      this.oneNone = true;
      this.twoNone = false;
      this.twoActive = false;
    },
    //第一页的下一步
    nextTwo () {
      this.oneNone = false;
      this.twoNone = true;
      this.twoActive = true;
    },
    //第二页的下一步
    nextThree () {
      this.twoNone = false;
      this.threeNone = false;
      this.threeActive = true;
    },
    //获得图片验证
    getImg () {
      // this.verifyImg = this.httpHead + 'facilitator/getVerifyCode?' + Math.random()
      let self = this;
      // 实例化XMLHttpRequest对象
      if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlHttp.withCredentials = true;
      if (xmlHttp != null) {
        // xmlHttp.onreadystatechange = this.callBack;
        xmlHttp.open(
          "get",
          axios.defaults.baseURL + "facilitator/getVerifyCode", //图片验证接口地址
          true
        );
        xmlHttp.responseType = "blob";
        xmlHttp.onload = function () {
          if (this.status == 200) {
            var blob = this.response;
            self.$refs["imgChar"].src = window.URL.createObjectURL(
              xmlHttp.response
            );
          }
        };
        xmlHttp.send(null);
      }
    },
    //获得短信验证
    getCapchar () {
      if (/^[0-9]{11}$/.test(this.ruleForm.usermobile)) {
        let data = {
          "phone": this.ruleForm.usermobile,
          "userId": this.userId,
          "verityCode": ""
        }
        api.sendVerifyCode(data).then(res => {
          if (res.errorCode == '200') {
            this.$message("发送成功！");
            //定时器的秒数
            var disabled = document.getElementById("messageClick");
            var timeVal = setInterval(() => {
              this.time--;
              if (this.time === 0) {
                disabled.removeAttribute("disabled");
                clearInterval(timeVal);
                this.time = 60;
                this.disabled = false;
              } else {
                //添加的属性 disabled
                disabled.setAttribute("disabled", "disabled");
                this.disabled = true;
              }
            }, 1000);
          } else {

          }
        }).catch(res => {
          this.$message(res.errorMsg);
        });
      } else {

      }
    },
    //联动改变
    getValue (proviceValue) {
      this.rulesCompanyForm.cityValue = ''
      api.getcity(proviceValue).then(res => {
        this.cityOptions = res.dataList
      })
    },
    // 第一步提交
    submitOneForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.nextTwo(); //成功保存后到第二页
        } else {
          return false;
        }
      });
    },
    // 第二步提交
    submitTwoForm (rulesCompanyForm) {
      this.$refs[rulesCompanyForm].validate((valid) => {
        if (valid) {
          let data = {
            "city": this.rulesCompanyForm.cityValue,              //市
            "companyName": this.rulesCompanyForm.usercompany,    //公司名称
            "contactsName": this.rulesCompanyForm.contactsName,   //联系人姓名
            "dir": "",
            "industryType": this.rulesCompanyForm.smallValue,
            "keyword": "",
            "orderField": "",
            "page": 0,
            "province": this.rulesCompanyForm.proviceValue,     //省份
            "remark": this.rulesCompanyForm.remark, //备注
            "size": 0,
            "telephone": this.ruleForm.usermobile,    //手机号码
            "type": 0
          }
          api.addFacilitator(data).then(res => {
            if (res.errorCode == '200') {
              this.nextThree()
            } else {
              this.$message.error('信息提交失败，请重新填写');
            }
          })
        } else {
          return false;
        }
      });
    },
  }
};
</script>

<style lang='less' scoped>
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
        content: "";
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
        content: "";
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
        content: "";
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
        content: "";
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
/* 公共的样式 */
.noneStyle {
  display: none;
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
/* 按钮的公共样式 */
.btn-last {
  width: 110px;
  height: 33px;
  /* 有问题 */
  line-height: 1px;
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
  .el-input-textarea {
    width: 480px;
    margin-left: 20px;
  }
  .submit-item {
    margin-top: 100px;
  }
}
/* 第三步 */
.validate-three-pane {
  .validate-success-icon {
    display: block;
    width: 130px;
    height: 130px;
    background-color: #5cca37;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 50px;
    position: relative;
    .el-icon-check {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 100px;
      color: #fff;
    }
  }
  .validate-success-text {
    color: #666;
    font-size: 28px;
    margin-top: 30px;
    text-align: center;
  }
  .validate-success-more {
    font-size: 18px;
    color: #666;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .success-btn {
    text-align: center;
    margin-bottom: 50px;
  }
}
</style>

<style>
/* 修改的是输入框错误后的内容 */
.el-form-item__error {
  left: 20px;
}
</style>


