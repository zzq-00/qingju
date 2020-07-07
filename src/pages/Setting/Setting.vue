<template>
  <div class="container" id="setting">
    <!-- <projectListheader @send2parentPath='clickTabsLPJ'></projectListheader> -->
    <headerComponent></headerComponent>
    <div class="pro-content center">
      <div class="content-left">
        <div class="content-left-icon">
          <div class="header-icon">
            <img :src="$store.state.userInfo.headPortraits" :onerror="errIcon" class="header-icon" />
            <span id="ifToux">更换头像</span>
            <p class="red">{{tipText.errorHeaderText}}</p>
          </div>
          <p class="imgUpload" v-has="['iv969W']">
            <label
              class="btn btn-orange"
              for="uploads"
              style="display:inline-block;padding: 0;text-align: center;line-height: 28px;"
            ></label>
            <input
              type="file"
              id="uploads"
              :value="imgFile"
              style="position:absolute; clip:rect(0 0 0 0);"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadImg($event, 1)"
            />
          </p>
        </div>

        <div class="content-left-title">
          <div class="content-left-icon-name">
            <p
              class="nickName"
            >{{$store.state.userInfo.userName ? $store.state.userInfo.userName : ''}}</p>
          </div>
          <p class="my-qingju-title">资料设置</p>
        </div>
        <div class="content-list">
          <ul>
            <li
              v-for="(item,index) in leftTabs"
              :key="index"
              @click="clickTabsLPJ(item.activeUrl)"
              :class="[$route.path.indexOf(item.activeUrl) == 0 ? 'li-click' : 'tab-list']"
            >{{item.name}}</li>
          </ul>
        </div>
        <!-- <div class="content-left-image">
              <p>申请实名认证</p>
          </div>
          <div class="content-foot-list1">
              <p>代缴社会保险服务</p>
          </div>
          <div class="content-foot-list2">
              <p>企业登记代理业务</p>
        </div>-->
      </div>
      <div class="content-right">
        <router-view></router-view>
      </div>
    </div>
    <div id="set-mask">
      <el-dialog title="编辑缩略图" :visible.sync="dialogTableVisible">
        <div class="cropper-img">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :maxImgSize="option.maxImgSize"
            @realTime="realTime"
          ></vueCropper>
        </div>
        <div class="info-item">
          <p class="img-scale">
            <span @click="changeScale(-1)">-</span>
            <i class="el-icon-search"></i>
            <span @click="changeScale(1)">+</span>
          </p>
          <p class="upload-img">
            <label
              class="btn btn-orange"
              for="uploads"
              style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;"
            >上传头像</label>
            <input
              type="file"
              id="uploads"
              :value="imgFile"
              style="position:absolute; clip:rect(0 0 0 0);"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadImg($event, 1)"
            />
          </p>
          <p class="submit-img">
            <span>你当前显示的头像信息将会是公开信息</span>
            <input type="button" class="btn btn-blue" value="确认" @click="finish('blob')" />
          </p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
// import projectListheader from "@/components/projectListheader";
import headerComponent from "@/components/qingjuHeader";
import api from "@/fetch/api";
export default {
  components: {
    headerComponent,
    VueCropper
  },
  data() {
    return {
      value: "",
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
      tipText: {
        errorHeaderText: ""
      },
      activeName2: "first",
      tabPosition: "left",
      Index: 0,
      leftTabs: [
        {
          name: "个人信息",
          activeUrl: "/Setting/personInfo",
          has: "q33u" // 判断路由
          // roles: ['iv969W', 'sfPf0k', '1jgxbm', 'Erbm4Q', 'AUCsSH'] // 判断左侧列表
        },
        {
          name: "账户安全",
          activeUrl: "/Setting/accountsecurity",
          has: "D3OE"
          // roles: ['lCVNOD', 'G81qMI']
        },
        /* {
          name: "操作日志",
          activeUrl: '/Setting/operateRecord'
        }, */
        {
          name: "用户认证",
          activeUrl: "/Setting/userAttestation",
          has: "8MG5"
          // roles: ['eKSxYW']
        },
        {
          name: "收货地址",
          activeUrl: "/Setting/address",
          has: "3kCm"
          //  roles: ['7lZ0yi']
        },
        {
          name: "邀请码",
          activeUrl: "/Setting/code",
          has: "B8YO"
          //  roles: ['VycguX']
        }
      ],
      HTTP: "http://10.10.10.119/",
      imageUrl: "",
      imageFile: "",
      imgUrl: "",
      errIcon:'this.src = "' + require("@/assets/img/err-header-icon01.png") + '"',
      ROLES: JSON.parse(localStorage.getItem("ROLES-qingju"))
    };
  },
  created() {
    api
      .getUserInfo()
      .then(res => {
        this.value = res.dataList[0];
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
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
              this.$message({
                message: "更换成功",
                type: "success"
              });
              this.dialogTableVisible = false;
              this.option.img = "";
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
    // changeImgClick (e) {
    //   this.modify = false
    //   let files = e.target.files || e.dataTransfer.files
    //   if (files[0].size / 1024 > 2000) {
    //     this.tipText.errorHeaderText = '图片不能大于2M'
    //   } else if (!/\/(?:jpeg|jpg|png)/i.test(files[0].type)) {
    //     this.tipText.errorHeaderText = '格式仅支持jpg、png'
    //   } else {
    //     let data = new FormData()
    //     data.append('headImage', files[0])
    //     // api.updateHeadPortraits(this.oldName, data).then(res => {
    //     //   let iconUrl = res.imageUrl
    //     //   this.oldName = res.imageName
    //     //   this.$store.state.userInfo.headPortraits = res.imageUrl
    //     // })
    //   }
    // },
    clickTabsLPJ(url) {
      this.$router.push(url);
    }
  },
  mounted() {
    let left = document.getElementsByClassName("content-left")[0];
    window.onscroll = () => {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (left && scrollTop > 100) {
        left.style.top = scrollTop + "px";
      } else if (left) {
        left.style.top = "0px";
      }
    };
    let imgUpload = document.getElementsByClassName("imgUpload")[0];
    let ifToux = document.getElementById("ifToux");
    if (imgUpload) {
      imgUpload.onmouseover = function() {
        ifToux.style.display = "block";
      };
      imgUpload.onmouseleave = function() {
        ifToux.style.display = "none";
      };
    }

    this.leftTabs = this.leftTabs.filter(data => {
      if (this.ROLES.includes(data.has) || data.has === "true") {
        return data;
      }
    });
    if (this.leftTabs.length) {
      let activeIndex = this.leftTabs[0].activeUrl;
      let path = this.$route.fullPath;
      // this.leftTabs.length && sessionStorage.setItem('setTab', JSON.stringify(activeIndex))
      if (activeIndex && path === "/Setting") {
        this.$router.push(activeIndex);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.nickName {
  font-size: 16px;
  text-align: center;
  color: #666;
}
.container {
  width: 100%;
  min-height: ~"calc(100vh)";
  overflow: hidden;
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
    display: inline-block;
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
.imgUpload {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  > label {
    width: 100px;
    height: 100px;
    &:hover {
      cursor: pointer;
    }
  }
}
.container {
  .center {
    display: flex;
    justify-content: center;
  }
  .pro-content {
    box-sizing: border-box;
    min-height: ~"calc(100vh)";
    .content-left {
      width: 300px;
      margin-top: 100px;
      height: 700px;
      transition: top 0.3s;
      position: relative;
      background: #fff;
      .content-left-icon {
        // height: 100px;
        position: absolute;
        top: 20px;
        left: 95px;
        .header-icon {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          > span {
            font-size: 12px;
            position: absolute;
            bottom: 0;
            left: 0px;
            width: 100px;
            line-height: 25px;
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
            text-align: center;
            display: none;
          }
        }
      }

      .content-left-title {
        padding-top: 140px;
        .my-qingju-title {
          color: #666;
          font-weight: 700;
          font-size: 18px;
          margin-top: 46px;
          margin-left: 50px;
        }
        // background-color: #f3f5f7;
        box-sizing: border-box;
      }
      .content-list {
        padding-top: 20px;
        padding-left: 36px;
        padding-right: 36px;
        box-sizing: border-box;
        // background-color: #f3f5f7;
        padding-bottom: 160px;
        .li-click {
          background: url("../../assets/img/jiaotou-icon1.png") no-repeat;
          background-size: 13px 15px;
          background-position: 180px 17px;
          color: #00b38a;
          background-color: #f2f2f2;
        }
        .tab-list {
          background: url("../../assets/img/jiaotou-icon.png") no-repeat;
          background-size: 13px 15px;
          background-position: 180px 17px;
          color: #666;
          border-bottom: 1px solid #f2f2f2;
          // background-color: #f3f5f7;
        }
        .tab-list1 {
          background: url("../../assets/img/jiaotou-icon1.png") no-repeat;
          background-size: 13px 15px;
          background-position: 180px 17px;
          color: #009966;
          // background-color: #f3f5f7;
        }
        ul {
          li {
            width: 218px;
            height: 48px;
            line-height: 48px;
            padding-left: 30px;
            // background-color: #f3f5f7;
            box-sizing: border-box;
            cursor: pointer;
          }
        }
      }
    }
    .content-right {
      background-color: #fff;
      margin-left: 40px;
      margin-top: 100px;
      flex: 1;
    }
  }
}
</style>

<style lang='less'>
.avatar-uploader > .el-upload {
  width: 166px;
  height: 66px;
  /* border-bottom-left-radius:83px;
   border-bottom-right-radius:83px; */
}
.avatar-uploader > .el-upload.el-upload--text {
  width: 166px;
  height: 66px;
  color: red;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
#set-mask {
  .el-dialog {
    width: 600px !important;
  }
}
.cropper-view-box {
  border-radius: 50%;
}
@media screen and (min-width: 1250px) {
  #setting {
    width: 1200px !important;
  }
}
@media screen and (min-width: 1500px) {
  #setting {
    width: 1400px !important;
  }
}
</style>


