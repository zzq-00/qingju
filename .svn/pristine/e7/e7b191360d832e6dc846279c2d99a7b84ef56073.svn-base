<template>
  <div class="Pro_content">
    <div class="header" v-if='ifHeader'>
      <span>上次登录时间：{{user.loginTime}}</span>
      <span>地点：{{user.address}}</span>
      <span>查看最近的登录记录</span>
      <i @click='ifHeader = false' class="el-icon-close"></i>
    </div>
    <div class="title">
      <p>个人信息</p>
    </div>
    <div class="basic_information">
      <p>基本信息</p>
      <div class="basic_information_icon">
        <div class="header-icon">
          <img :src="$store.state.userInfo.headPortraits" :onerror="errIcon" class="header-icon">
        </div>
        <p class="imgUpload red"  v-has="['iv969W']">
          <label class="btn btn-orange" for="uploads" style="display:inline-block;padding: 0;text-align: center;line-height: 28px;">上传图片</label>
          <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        </p>
      </div>
    </div>
    <div class="spreadsheet">
      <div class="real_name">
        <div class="real_name_left">
          <p>真实姓名</p>
          <!--authType 1是个人用户 2是企业用户-->
          <span v-if="butFlag==false" class="list"> {{value.authType==0 ? value.userName : value.realName}} </span>
          <el-form :model="value" :rules="rules" v-if="butFlag==true" :inline="true" ref="value" label-width="0px">
            <el-form-item prop="userName">
              <el-input v-model.trim="value.userName"></el-input>
            </el-form-item>
            <el-button v-if="butFlag==true" @click='realClick("value")'>确定</el-button>
          </el-form>
        </div>
        <p class="real_name_right">
          <span v-if='!ifRealname'>修改真实姓名请通知企业管理员</span>
          <!-- <em v-if='value.authType!=1 && ifRealname' @click='realFlag'>{{butFlag ? '取消' : "编辑"}}</em> -->
          <em @click='realFlag' v-has="['sfPf0k']" v-if='value.authType!=1 && ifRealname'>{{butFlag ? '取消' : "编辑"}}</em>
        </p>
      </div>
      <div class="real_name">
        <div class="real_name_left">
          <p>账号</p>
          <!-- accountModificationTimes修改账号 0可以修改 1不可以 -->
          <span v-if="realNum==false" class="list">{{value.code}}</span>
          <el-form :model="value" :rules="rules" v-if="realNum==true" :inline="true" ref="value" label-width="0px">
            <el-form-item prop="code">
              <el-input v-model.trim="value.code"></el-input>
            </el-form-item>
            <el-button v-if="realNum==true" @click='codeClick("value")'>确定</el-button>
          </el-form>
        </div>
        <p class="real_name_right">
          <span v-if='value.accountModificationTimes===0 ? false : true'>设置账号只可以修改一次</span>
          <em v-if='value.accountModificationTimes===0 ? true : false' @click='accountFn' v-has="['1jgxbm']">{{realNum ? '取消' : "编辑"}}</em>
        </p>
      </div>
      <div class="real_name real-tel">
        <div class="real_name_left">
          <p>手机号码</p>
          <span class="list">{{value.telephone}}</span>
        </div>
        <p class="real_name_right"  v-has="['Erbm4Q']">
          <em @click='jump_router(1,value.telephone)'>编辑</em>
          <em id='tel_bind' @click='jump_router(2,value.telephone)'>解绑</em>
        </p>
      </div>
      <div class="real_name real_name real-tel">
        <div class="real_name_left">
          <p>邮箱</p>
          <span class="list">{{value.email}}</span>
        </div>
        <p class="real_name_right" v-has="['AUCsSH']">
           <em @click='jump_routerEmail(1,value.email)'>编辑</em>
           <em id='emial_bind' @click='jump_routerEmail(2,value.email)'>解绑</em>
        </p>
      </div>
    </div>
    <el-dialog title="编辑缩略图" :visible.sync="dialogTableVisible">
      <div class="cropper-img">
        <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :fixedBox="option.fixedBox" :autoCropWidth="option.autoCropWidth" :autoCropHeight='option.autoCropHeight' :maxImgSize="option.maxImgSize" @realTime="realTime"></vueCropper>
      </div>
      <div class="info-item">
        <p class="img-scale">
          <span @click="changeScale(-1)">-</span>
          <i class="el-icon-search"></i>
          <span @click="changeScale(1)">+</span>
        </p>
        <p class="upload-img">
          <label class="btn btn-orange" for="uploads" style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">上传头像</label>
          <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        </p>
        <p class="submit-img">
          <span>你当前显示的头像信息将会是公开信息</span>
          <input type="button" class="btn btn-blue" value="确认" @click="finish('blob')">
        </p>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { VueCropper } from "vue-cropper";
import api from "@/fetch/api";
import { getCookie } from "@/assets/js/utils";
export default {
  components: {
    VueCropper
  },
  data() {
    var validMsg = (rule, value, callback) => {
      let data = {
        phone: this.modeForm.mode,
        verityCode: this.modeForm.verification,
        userId: JSON.parse(localStorage.QingjuuserId)
      };
      api
        .validatePhoneVerifyCode(data)
        .then(res => {
          callback();
        })
        .catch(res => {
          callback(res.errorMsg);
        });
    };
    return {
      ifHeader: true,
      value: {},
      modeForm: {
        mode: "",
        verification: "",
        waitTime: 60
      },
      showhistoryListFlag: false,
      butFlag: false, // 编辑 or 保存
      realNum: false,
      user: {
        // 展示登录地方和时间
        address: "",
        loginTime: ""
      },
      valid: {
        // 验证原始手机号
        disabledMsg: false,
        click: false,
        changeMobile: false
      },
      errorPhone: false,
      option: {
        img: "",
        outputSize: 0.8, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        outputType: "jpeg", // 裁剪生成图片的格式
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 300,
        autoCropHeight: 300,
        centerBox: true,
        maxImgSize: 3000
      },
      oldName: "", // 之前的图片名
      imageUrl: "",
      imageFile: "",
      fileName: "", //本机文件地址
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
      dialogTableVisible: false,
      imgUrl: "",
      realNames: "",
      accountNum: "",
      rules: {
        userName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5a-zA-Z0-9_-]{2,16}$/,
            message: "请输入正确的格式"
          }
        ],
        code: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{3,25}$/,
            message: "请输入3-25位字母或数字,暂不支持特殊标点符号和中文"
          }
        ]
      },
      errIcon:
        'this.src = "' + require("@/assets/img/err-header-icon01.png") + '"',
      ifRealname:false
    };
  },
  created() {
    // api.getHeadPortraits().then((res)=>{
    //   let img  = res.dataList[0];
    //   //获取头像字符串 通过admin来截取 在config->index.js中加了跨域 用VueCropper会有跨域问题
    //    if (process.env.NODE_ENV === "development"){//开发环境
    //        this.option.img = '/api'+img.split("admin")[1];
    //        this.imgUrl = '/api'+img.split("admin")[1];
    //     }else{
    //         this.option.img = img
    //         this.imgUrl = img
    //     }
    // }).catch((err)=>{
    //   console.log(err);
    // });
  },
  mounted() {
    this.getUserInfo();
    // this. clickimg(1);
    this.user.loginTime = JSON.parse(getCookie("QingjuLoginTime"));
    this.user.address = JSON.parse(getCookie("QingjuLoginAddress"));
  },
  methods: {
    accountFn() {
      this.realNum ? (this.realNum = false) : (this.realNum = true);
      if (!this.realNum) {
        this.value.code = this.accountNum;
      }
    },
    realFlag() {
      this.butFlag ? (this.butFlag = false) : (this.butFlag = true);
      if (!this.butFlag) {
        this.value.userName = this.realNames;
      }
    },
    //上传图片（点击上传按钮）
    finish(type) {
      let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          let files = new FormData();
          files.append("headImage", data);
          api
            .updateHeadPortraits(this.oldName, files)
            .then(res => {
              let iconUrl = res.imageUrl;
              this.oldName = res.imageName;
              this.$store.state.userInfo.headPortraits = res.imageUrl;
              this.imgFile = "";
              this.$message({
                message: "更换成功",
                type: "success"
              });
              this.dialogTableVisible = false;
              this.uploadImgRelaPath = res.imageName;
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    //放大/缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //选择本地图片
    uploadImg(e, num) {
      this.dialogTableVisible = true;
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        // alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        this.$message({
          message: "图片类型必须是.gif,jpeg,jpg,png,bmp中的一种",
          type: "error"
        });
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    //编辑账号确认按钮
    codeClick(formName) {
      //value.accountModificationTimes===0可以修改 为1不可修改
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          api //判断账号是否是唯一的
            .dataSetting({ code: this.value.code })
            .then(res => {
              api
                .updateAccountNumber(this.value.code)
                .then(res => {
                  that.$message({ type: "success", message: "修改成功" });
                  that.getUserInfo();
                  that.realNum = false;
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
        }
      });
    },
    //真实姓名的编辑确认按钮
    realClick(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .updateUserName(this.value.userName)
            .then(res => {
              that.$message({ type: "success", message: "修改成功" });
              that.getUserInfo();
              that.butFlag = false;
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    //手机号跳转路由
    jump_router(flag, value) {
      let routeData = this.$router.resolve({
        path: "/Setting/authentication",
        query: { flag: flag, val: value }
      });
      window.open(routeData.href, "_blank");
    },
    //邮箱跳转路由
    jump_routerEmail(flag, value) {
      let routeData = this.$router.resolve({
        path: "/Setting/verifyEmail",
        query: { flag: flag, val: value }
      });
      window.open(routeData.href, "_blank");
    },
    // 更改后的手机号
    validMobileClick() {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(this.value.mobile)) {
        this.errorPhone = true;
        this.$message({ type: "error", message: "请填写正确的手机号" });
      } else {
        this.errorPhone = false;
      }
    },
    // 原始手机号
    validCodeBlur() {
      let data = {
        phone: this.modeForm.mode,
        verityCode: this.modeForm.verification,
        userId: JSON.parse(localStorage.QingjuuserId)
      };
      api
        .validatePhoneVerifyCode(data)
        .then(() => {
          this.valid.changeMobile = true;
          this.valid.click = false;
          if (!this.value.mobile) {
            let data = {
              id: this.value.id,
              userName: this.value.userName,
              realName: this.value.realName, // 实名认证
              telephone: this.modeForm.mode,
              email: this.value.eamil,
              code: this.value.code
            };
            api.compileDataInstall(data).then(res => {
              this.$message({ type: "success", message: "保存成功" });
              this.getUserInfo();
              this.valid.changeMobile = false;
              // 更新操作
              // location.reload()
            });
          }
        })
        .catch(res => {
          this.$message({ type: "error", message: res.errorMsg });
        });
    },
    showhistoryList() {
      this.showhistoryListFlag = true;
    },
    // 个人信息
    getUserInfo() {
      api.getUserInfo().then(res => {
        if (!res.dataList[0].userName)
        res.dataList[0].userName = res.dataList[0].code || "青矩用户";
        // 考虑企业下用户
        res.dataList[0].id = res.dataList[0].id;
        this.$store.commit("setUserInfo", res.dataList[0]);
        let data = res.dataList[0];
        this.value = data;
        this.realNames = data.userName;
        this.accountNum = data.code;
        let tel_bind = document.getElementById("tel_bind");
        let emial_bind = document.getElementById("emial_bind");
        if (data.telephone && data.code) {//手机号的编辑隐藏
          tel_bind.style.display = "block";
        } else if (data.telephone && data.email) {
          tel_bind.style.display = "block";
        }
        if (data.email && data.code) {//邮箱的编辑隐藏
          emial_bind.style.display = "block";
        } else if (data.telephone && data.email) {
          emial_bind.style.display = "block";
        }
        data.baseRole.forEach((item,value)=>{
          if(item.name=='超级管理员' || item.name=='发活人'){
             this.ifRealname = true
          }
        })
        // 手机号
        this.modeForm.mode = this.value.mobile;
      });
    },
    validMsgClick(obj) {
      let data = {
        phone: this.value.mobile || this.modeForm.mode
      };
      api
        .sendVerifyCode(data)
        .then(res => {
          this.$message({ type: "success", message: "发送成功！" });
          this.waitTime(obj);
        })
        .catch(res => {
          this.$message({ type: "error", message: res.errorMsg });
        });
    },
    waitTime(obj) {
      if (this.modeForm.waitTime === 1) {
        this.modeForm.waitTime = 60;
        this.valid.disabledMsg = false;
        return false;
      } else {
        this.valid.disabledMsg = true;
        this.modeForm.waitTime--;
      }
      setTimeout(() => {
        this.waitTime(obj);
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.green {
  color: #009966;
  font-size: 14px;
  margin-left: 60px;
  cursor: pointer;
}
.Pro_content {
  .title {
    border-bottom: 1px solid #d7d7d7;
    overflow: hidden;
    margin: 0 20px;
    height: 60px;
    line-height: 60px;
    p {
      color: #666666;
      font-size: 18px;
      float: left;
    }
    > div {
      float: right;
      > span {
        font-weight: 400;
        font-size: 14px;
        color: #aeaeae;
      }
      > img {
        height: 12px;
        width: 12px;
      }
      > img:hover {
        cursor: pointer;
      }
      > span:hover {
        cursor: pointer;
      }
    }
  }
  .header {
    overflow: hidden;
    height: 37px;
    width: 100%;
    background-color: #f3f5f7;
    border-radius: 2px;
    line-height: 37px;
    padding-left: 20px;
    box-sizing: border-box;
    span {
      font-weight: 400;
      font-size: 12px;
      color: #999999;
    }
    span:nth-child(3) {
      font-weight: 400;
      font-size: 12px;
      color: #00cc99;
    }
    span:nth-child(3):hover {
      cursor: pointer;
    }
    i {
      float: right;
      // padding-right: 10px;
      line-height: 37px;
    }
    i:hover {
      cursor: pointer;
    }
  }
  .spreadsheet {
    border-bottom: 1px solid #d7d7d7;
    margin: 0 20px;
  }
  .imgUpload {
    > label {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .input-lists {
    margin-top: 30px;
    margin-left: 10px;
    .lists {
      margin-bottom: 56px;
      /* span:nth-child(1) {
        color: red;
      } */
      span:nth-child(2) {
        font-size: 14px;
        color: #666666;
        font-weight: 700;
        width: 75px;
        display: inline-block;
      }
      .list {
        width: 396px;
        height: 40px;
        margin-left: 60px;
      }
      .list1 {
        width: 400px;
        height: 40px;
        line-height: 40px;
        margin-left: 60px;
      }
    }
  }
  .but-list {
    margin-top: 35px;
    margin-left: 15px;
  }
  .history_but {
    margin-left: 20px;
    font-size: 14px;
    color: #666666;
    font-weight: 700;
  }
  .history-lists {
    margin-top: 40px;
    .history-title {
      // border-bottom: 2px solid #bcbcbc;
      p {
        font-size: 14px;
        color: #666666;
        font-weight: 700;
        margin-bottom: 10px;
      }
    }

    .tableList {
      margin-top: 10px;
    }
  }
}
.basic_information {
  margin: 19px 40px 0;
  position: relative;
  p {
    font-size: 14px;
    color: #333;
  }
  // border-bottom: 1px solid #d7d7d7;
}
.basic_information_icon {
  padding-top: 25px;
  padding-bottom: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50px;
  left: 105px;
  .header-icon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
    position: relative;
    overflow: hidden;
  }
  .header-icon {
    position: relative;
    .img-btn {
      width: 100%;
      height: 100%;
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }
  &:hover {
    .red {
      cursor: pointer;
    }
  }
  .red {
    position: absolute;
    top: 170px;
    //padding-right: 10px;
    color: #03b189;
    left:50%;
    margin-left:-30px;
  }
}
.btn-list {
  .save-btn {
    background-color: #009966;
    color: white;
    width: 108px;
    border: 1px solid #009966;
  }
}
.footer-btn {
  text-align: right;
  margin-right: 100px;
}
.real_name {
  // margin: 19px 40px;
  padding: 0 0 19px;
  margin: 0 40px;
  border-top: 1px solid #d7d7d7;
  display: flex;
  justify-content: space-between;
}
.real_name_left {
  > p {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
    line-height: 50px;
  }
  > .list {
    height: 40px;
    line-height: 40px;
    display: block;
  }
  .el-input {
    width: 450px;
  }
  .el-button {
    background: #101920;
    color: #fff;
    width: 119px;
  }
}
.real_name_right {
  margin-top: 60px;
  > span {
    color: #d5d4d4;
  }
  > em {
    color: #03b189;
    padding-left: 18px;
    &:hover {
      cursor: pointer;
    }
  }
}
.real-tel {
  .real_name_right {
    margin-top: 50px;
    em {
      display: block;
    }
  }
}
.info-item {
  position: relative;
}
.cropper-img {
  height: 380px;
}
.img-scale {
  position: absolute;
  right: 0;
  padding-top: 10px;
  > span {
    border: 1px solid #ccc;
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    color: #000;
    margin: 0 5px;
    &:hover {
      cursor: pointer;
    }
  }
}
.submit-img {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  > span {
    color: #666;
    padding-top: 10px;
  }
  > input {
    width: 200px;
    height: 40px;
    background: rgba(14, 175, 99, 1);
    color: #fff;
  }
}
.upload-img {
  padding-top: 40px;
  > label {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #0099cc;
  }
  > label:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
#tel_bind {
  display: none;
}
#emial_bind {
  display: none;
}
</style>

<style lang='less'>
.real_name {
  .el-form-item {
    margin-bottom: 0;
  }
}
.el-tabs__header {
  margin: 0 0 0;
}
.el-tabs__item {
  font-size: 18px;
  line-height: 18px;
}
.el-tabs__item:hover {
  color: #009966;
  cursor: pointer;
}
.el-tabs__item.is-active {
  color: #333333;
  font-weight: 700;
}
.Pro_content {
  .el-dialog {
    width: 600px!important;
  }
}
</style>


