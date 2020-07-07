<template>
  <div style="background-color:#fff">
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <div class="contents">
      <div class="leftBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
          <el-form-item label="" prop="">
            <el-radio-group v-model="ruleForm.radio2">
              <el-radio v-for="(item,index) in feedbackList" :key="index" :label="item.value">{{item.key}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="textarea">
            <textarea v-model="ruleForm.textarea" placeholder="请描述您的问题" style="height:120px;" class="real_tel"></textarea>
          </el-form-item>
          <el-form-item>
            <div class="block">
              <div class="img-box" v-for="(item,index) in arrPic">
                <img :src="item.url" alt="" class="img-size">
                <p>
                  <span class="blue" @click="deleteImgClick(index)">删除</span>
                </p>
              </div>
              <div class="add-img-block">
                <div class="add-img">
                  <input type="file" @change='changeImgClick' class="img-btn">
                </div>
                <p class="block-text">每张图片大小不能超过
                  <span style="color:red">2M</span>
                </p>
                <p style="font-size:12px;line-height:0px;">请勿传入相同图片</p>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="" prop="contact">
            <textarea v-model="ruleForm.contact" placeholder="请留下真实的联系方式（电话、邮箱、QQ），方便我们答疑解惑！" style="line-height:30px;" class="real_tel"></textarea>
          </el-form-item>
          <el-form-item label="" prop="">
            <textarea v-model="ruleForm.pageUrl" placeholder="页面相关地址" style="line-height:30px;" class="real_tel"></textarea>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
        <div class="problem">
          <h4>问题反馈</h4>
          <ul>
            <li v-for="(item,index) in options" :key="index">
              <p>{{item.problemContent}}</p>
              <img :src="i" alt="" v-for="i in item.problemFileId">
              <div class="time">
                <span>{{item.submitAt}}</span>
                <span>{{item.problemType}}</span>
                <div style="clear:both"></div>
              </div>
              <div class="reply_problem" v-if="item.problemStatus=='1'">
                <span>青矩管理员：</span>
                <span>{{item.replyOpinion}}</span>
              </div>
              <ul v-if='item.replyFileUrls'>
                <p v-if='item.replyFileUrls!=""'>回复附件：</p>
                <li v-for="(items,index) in item.replyFileUrls" :key="index">
                  <a :href="items" :title="items" class="green">{{(((items.split('_')[1]).replace(/\\/g,"\\")).replace(/\\/g,"/")).substring((((items.split('_')[1]).replace(/\\/g,"\\")).replace(/\\/g,"/")).lastIndexOf("/")+1)}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="rightBox">
        <h5>联系我们</h5>
        <ul>
          <li>1、页面直接点击客服咨询</li>
          <li>2、400-697-5677电话咨询</li>
          <li>3、关注微信咨询</li>
        </ul>
        <img src="../../assets/img/wechat.jpg" alt="">
      </div>
      <div style="clear:both"></div>
    </div>

  </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb";
import imgTool from '@/assets/js/imgUpload'
import tool from '@/assets/js/useMoreTool'
import api from "@/fetch/api";

export default {
  components: {
    breadcrumb
  },
  data () {
    return {
      breadcrumbs: [
        { name: "问题反馈", path: this.$route.fullPath }
      ],
      feedbackList: [],      //反馈问题类型
      imgUpload: {},
      modify: false,
      options: [],            //意见反馈列表
      formImgInfo: new FormData(),
      arrPic: [],
      ruleForm: {
        radio2: '',      //问题类型
        textarea: '',            //内容
        pageUrl: '',         //页面地址
        contact: '',         //联系方式
      },
      arrPicId: [],
      rules: {
        textarea: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请填写真实的联系方式（电话、邮箱、QQ）', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //反馈问题类型
    getAuthTypeMap () {
      api.getAuthTypeMap().then(res => {
        this.feedbackList = res.dataList
        this.ruleForm.radio2 = this.feedbackList[0].value
      })
    },
    // 添加图片
    changeImgClick (e) {
      this.modify = false
      let files = e.target.files || e.dataTransfer.files
      this.formData = new FormData()
      this.formData.append('file', files[0])
      api.uploadFile(this.formData).then(res => {
        if (res.errorCode == "200") {
          let pic = new Object()
          pic.url = res.dataList[0].accessPath
          this.arrPic.push(pic)
          this.arrPicId.push(res.dataList[0].id)
        }
      })
    },
    // 删除图片
    deleteImgClick (index) {
      this.arrPic.splice(index, 1)
    },
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            "problemContact": this.ruleForm.contact,             //联系方式
            "problemContent": this.ruleForm.textarea,             //问题内容
            "problemFileId": this.arrPicId,
            "problemTheUrl": this.ruleForm.pageUrl,              //页面相关地址
            "problemType": this.ruleForm.radio2,                //问题类型
          }
          api.addFeedback(data).then(res => {
            if (res.errorCode == '200') {
              location.reload()
            }
          })
        } else {
          return false;
        }
      });
    },
    // 意见反馈列表
    getFeedbackList () {
      api.getFeedbackList().then(res => {
        this.options = res.dataList
      })
    },
  },
  mounted () {
    this.getAuthTypeMap()     //反馈问题类型
    this.getFeedbackList()    //意见反馈列表
  }
};
</script>

<style lang='less' scoped>
.contents {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;
}
.leftBox {
  width: 915px;
  float: left;
  .block {
    font-size: 14px;
    .block-label {
      display: inline-block;
      width: 110px;
      color: #666;
      margin-right: 10px;
    }
    .img-box {
      float: left;
      display: inline-block;
      margin-right: 15px;
    }
    .img-size {
      display: inline-block;
      width: 58px;
      height: 58px;
    }
    .blue {
      color: #0066cc;
      cursor: pointer;
      font-size: 14px;
    }
    .blue:hover {
      text-decoration: underline;
      color: #0066ff;
    }
    .add-img-block {
      float: left;
      display: inline-block;
      font-size: 12px;
      margin-bottom: 25px;
      .add-img {
        display: inline-block;
        width: 58px;
        height: 58px;
        border: 1px dashed #c7c7c7;
        vertical-align: top;
        position: relative;
        cursor: pointer;
        .img-btn {
          position: absolute;
          top: 0;
          left: 0;
          outline: none;
          opacity: 0;
          width: 58px;
          height: 58px;
          line-height: 58px;
          cursor: pointer;
        }
      }
      .add-img:hover {
        border-color: rgb(21, 148, 243);
      }
      .add-img:hover:after {
        color: rgb(21, 148, 243);
      }
      .add-img:before {
        content: "+";
        display: block;
        font-size: 36px;
        color: #999;
        width: 58px;
        height: 58px;
        line-height: 58px;
        text-align: center;
      }
    }
    .img-warn,
    .img-warn {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      vertical-align: top;
    }
    .block-text {
      font-size: 12px;
      color: #999;
    }
  }
}
.rightBox {
  width: 230px;
  height: 569px;
  background-color: rgba(248, 250, 252, 1);
  float: right;
  h5 {
    margin: 15px;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    text-align: left;
    color: #333333;
  }
  ul {
    margin-bottom: 15px;
    li {
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #666666;
      padding-left: 15px;
      height: 30px;
      line-height: 30px;
    }
  }
  img {
    width: 120px;
    height: 122px;
    margin: 0 auto;
    display: block;
  }
}
.problem {
  h4 {
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
  }
  ul {
    li {
      border-bottom: 1px solid #ccc;
      padding: 20px 20px 15px 20px;
      p {
        margin-bottom: 15px;
      }
      img {
        width: 100px;
        height: 100px;
        display: inline-block;
        margin-right: 20px;
      }
      .time {
        margin-top: 15px;
        span {
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          color: #999999;
        }
        span:nth-child(1) {
          float: left;
        }
        span:nth-child(2) {
          float: right;
        }
      }
      .reply_problem {
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
        background-color: rgba(248, 250, 252, 1);
        margin: 20px 0;
        span:nth-child(1) {
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          color: #ff0000;
        }
        span:nth-child(2) {
          font-weight: 400;
          font-style: normal;
          color: #333333;
        }
      }
    }
  }
}
.real_tel {
  height: 30px;
  border: 1px solid #d8dce5;
  width: 883px;
  border-radius: 4px;
  padding: 5px 15px;
}
.green {
  color: green;
  font-size: 12px;
}
</style>
