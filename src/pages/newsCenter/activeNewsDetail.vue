<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <div class="main">
      <div class="detail-header">
        <img :src="infoDetails.accessURL" alt="" class="header-img">
        <div class="header-right">
          <p class="header-title">{{infoDetails.title}}</p>
          <p class="header-time">{{infoDetails.startTime}}</p>
          <p class="header-position">{{infoDetails.address}}</p>
          <p class="header-company">{{infoDetails.host}}</p>
          <p class="header-read">导读：{{infoDetails.introduction}}</p>
          <el-button type="success" @click="showPop" v-if="infoDetails.signUp&&infoDetails.activityStatus!=4&&infoDetails.activityStatus!=1">我要报名</el-button>
          <div class="share">
            <span>分享:</span>
            <div class="bdsharebuttonbox" style="float:left">
              <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
              <a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a>
              <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
              <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-body">
        <div class="activity-container">
          <p class="activity-title">活动内容</p>
          <div class="activity-date" v-html="infoDetails.body"></div>
          <div class="weixinBtn" @click="wxShare">分享到微信</div>
        </div>
        <div class="activity-right">
          <p class="activity-position">活动地点</p>
          <div id="map">
            <baidu-map class="bm-view" ak="fKU9vX6h1mmAiuiopj7aLSx14VK4ZELq" id="allmap" :center="center" :zoom="zoom" @ready="handler">
            </baidu-map>
          </div>
          <div style="width:280px;">
            <p class="activity-position">活动日历</p>
            <vue-event-calendar :events="demoEvents" @monthChanged="monthChange(month)" @dayChanged="dayChange()">
            </vue-event-calendar>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗 想办法用组件（问题：组件的显示和隐藏的状态有问题 popSign） -->
    <div :class="{noshow:noSHOW}">
      <div class="mask"></div>
      <div class="form">
        <p class="sign-title">我要报名</p>
        <el-form label-width="50px" :rules="rules" ref="params" :model="params">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="params.tel"></el-input>
          </el-form-item>
          <el-form-item label="公司" prop="company">
            <el-input v-model="params.company"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="params.position"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="params.address" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="signBtn popBtn" @click="addOrModifySignUp('params')">我要报名</div>
            <div class="cancelBtn popBtn" @click="showPop">取消</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="分享到微信" :visible.sync="centerDialogVisible" width="300px" center>
      <div style="text-align: center;">
        <canvas id="canvas"></canvas>
        <h5>
          <span>微信扫描二维码，点击右上角按钮</span>
          <img :src="require('@/assets/img/share_wechat_btn.png')" alt=""><br>
          <span>分享给好友或朋友圈</span>
        </h5>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { BaiduMap } from 'vue-baidu-map'
import breadcrumb from "@/components/breadcrumb";
import api from '@/fetch/api'
import QRCode from 'qrcode'
export default {
  components: {
    breadcrumb,
    BaiduMap,
    // Calendar,
  },
  data () {
    var validMobile = (rule, value, callback) => {
      let reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
      if (!value) {
        callback(new Error('请输入你的手机号'))
      } else {
        if (isNaN(value)) {
          callback(new Error('手机号必须为数字'))
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
    };
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        tel: [
          { required: true, validator: validMobile, trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请填写公司名称', trigger: 'blur' }
        ]
      },
      centerDialogVisible: false,
      demoEvents: [],
      center: { lng: 0, lat: 0 },
      zoom: 3,
      noSHOW: true,  // 是否显示弹窗
      //面包屑
      breadcrumbs: [
        { name: "活动近期", path: "/newsCenter/activity" },
        { name: "活动详细", path: this.$route.fullPath }
      ],
      infoDetails: '',  // 活动详情
      params: {
        address: "",
        company: "",
        name: "",
        position: "",
        promotionId: "",
        tel: ""
      },
      defaultDate: '',     //默认日期
      placeActivity: '',   //活动地点
    };
  },
  beforeCreate () {
    window._bd_share_main = ""
  },
  methods: {
    monthChange (month) {
    },
    dayChange (day) {
    },
    // 分享到微信
    wxShare () {
      this.centerDialogVisible = true
      setTimeout(() => {
        QRCode.toCanvas(document.getElementById('canvas'), window.location.href, (error) => {
          if (error) console.error(error)
        })
      }, 0);
    },
    // 推广活动详情
    getPromotionDetail () {
      // return new Promise((resolve, reject) => {
      api.getPromotionDetail(this.$route.query.id).then(res => {
        this.infoDetails = res.data
        this.defaultDate = this.infoDetails.startTime
        this.placeActivity = this.infoDetails.city
        this.center = this.infoDetails.address
        window._bd_share_config = {
          // 通用设置
          "common": {
            "bdSnsKey": {},
            "bdText": this.infoDetails.title,
            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": "https://www.qingju.cn/static/img/logo.png",
            "bdStyle": "0",
            "bdSize": "16"
          },
          //分享按钮设置
          "share": {}
        }
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = '/static/share.js'
        document.head.appendChild(s);
        // resolve(this.infoDetails)
      })
      // })
    },
    handler ({ BMap, map }) {
      setTimeout(() => {
        map = new BMap.Map("allmap")
        // var point = new BMap.Point(116.331398, 39.897445)
        // map.centerAndZoom(point, 12);
        var local = new BMap.LocalSearch(map, {
          renderOptions: { map: map }
        });
        local.search(this.infoDetails.city);
      }, 260);
    },
    //是否显示弹窗
    showPop () {
      this.params = {}
      if (localStorage.QingjuuserId) {
        this.noSHOW = !this.noSHOW;
      } else {
        this.$router.push('/login')
      }

    },
    // 活动报名
    addOrModifySignUp (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.params.userId = JSON.parse(localStorage.QingjuuserId)
          this.params.promotionId = this.$route.query.id
          api.addOrModifySignUp(this.params).then(res => {
            this.noSHOW = true
            this.$alert('您已经报名成功，待工作人员确定后，将寄送邀请函。感谢您的支持！', '报名成功', {
              confirmButtonText: '确定',
              callback: action => {                ;
              }
            });
          }).catch(res => {
            this.$message.error(res.errorMsg)
          })
        } else {
          return false;
        }
      });
    }
  },
  beforeMount () {
    this.getPromotionDetail()     //活动详情
    this.params.promotionId = this.$route.query.id
    this.demoEvents = Array.prototype.slice.call(JSON.parse(window.localStorage.timeList))
  }
};
</script>

<style lang='less' scoped>
.bm-view {
  width: 100%;
  height: 100%;
}
/* 弹窗是否出现 v-if*/
.noshow {
  display: none;
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.2);
}
.form {
  padding-top: 35px;
  .sign-title {
    font-size: 24px;
    color: #333;
    text-align: center;
    margin-bottom: 35px;
    font-weight: bold;
  }
  .el-form {
    padding: 0 100px 50px 100px;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
  background-color: #fff;
  .el-input {
    width: 400px;
  }
  .el-textarea {
    width: 470px;
  }
  .popBtn {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    float: left;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  .signBtn {
    background-color: #00cc66;
    color: #fff;
    margin-left: 50px;
  }
  .cancelBtn {
    color: #ff9900;
    border: 1px solid #d7d7d7;
    margin-left: 50px;
  }
}
/* 布局样式 */
.main {
  background-color: #fff;
}
.detail-header {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #fff;
  .header-img {
    float: left;
    width: 440px;
    height: 260px;
  }
  .common-icon(@url) {
    content: "";
    display: inline-block;
    width: 13px;
    height: 17px;
    background: url(@url) no-repeat;
    margin-right: 5px;
    position: relative;
    top: 4px;
    margin-right: 15px;
  }
  .header-right {
    float: left;
    width: 715px;
    height: 260px;
    margin-left: 37px;
    position: relative;
    .header-position {
      &:before {
        .common-icon("../../assets/img/position.png");
      }
    }
    .header-time {
      &:before {
        .common-icon("../../assets/img/time.png");
      }
    }
    .header-company {
      &:before {
        .common-icon("../../assets/img/company.png");
      }
    }
    p {
      color: #333;
      font-size: 14px;
      line-height: 24px;
      margin: 5px 0;
    }
    .header-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
      margin-top: 5px;
    }
    .header-read {
      color: #666;
      margin-top: 20px;
    }
    .el-button {
      position: absolute;
      bottom: 0;
    }
    .share {
      position: absolute;
      bottom: 0;
      right: 0;
      margin-right: 20px;
      span {
        float: left;
        margin-right: 10px;
        font-size: 14px;
        color: #333;
        height: 28px;
        line-height: 28px;
      }
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      .xinlang {
        background: url("../../assets/img/xinlang.jpg") no-repeat;
      }
      .douban {
        background: url("../../assets/img/douban.jpg") no-repeat;
      }
      .renren {
        background: url("../../assets/img/renren.jpg") no-repeat;
      }
      .qq {
        background: url("../../assets/img/qq.jpg") no-repeat;
      }
      .weixin {
        background: url("../../assets/img/weixin.jpg") no-repeat;
      }
    }
  }
}
.detail-body {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.activity-container {
  width: 900px;
  margin-top: 20px;
  float: left;
  .activity-title {
    color: #333;
    font-size: 18px;
    padding-bottom: 15px;
    border-bottom: 1px solid #bdbdbd;
  }
  .activity-date {
    padding-top: 35px;
    line-height: 28px;
    font-size: 14px;
    color: #333;
  }
  .weixinBtn {
    cursor: pointer;
    margin: 0 auto;
    margin-top: 100px;
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #009900;
    border-radius: 10px;
    color: #fff;
  }
}
.activity-right {
  float: left;
  margin-left: 20px;
  .right-img {
    width: 280px;
    height: 160px;
    margin-top: 10px;
  }
  .activity-position {
    font-size: 18px;
    color: #333;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  #map {
    width: 280px;
    height: 160px;
    margin-bottom: 44px;
  }
  #allmap {
    width: 280px;
    height: 160px;
  }
  .wx {
    padding: 5px;
    margin-bottom: 40px;
    overflow: hidden;
    .wx-saosao {
      padding: 5px 30px 0 10px;
      float: left;
      .wx-t1 {
        color: #bbb;
        font-size: 12px;
        margin-bottom: 20px;
        span {
          font-size: 18px;
          color: #666;
          margin-left: 30px;
        }
      }
      .wx-t2 {
        font-size: 16px;
        color: #333;
      }
      .wx-t3 {
        font-size: 20px;
        color: #62b651;
      }
    }
    .wx-icon {
      width: 116px;
      height: 115px;
      float: left;
    }
  }
}
</style>
<style>
.kl-calendar_body-week-title-item {
  font-size: 12px !important;
}
.kl-calendar_day-box {
  padding: 1px !important;
}
.__vev_calendar-wrapper .events-wrapper {
  display: none;
}
.__vev_calendar-wrapper .cal-wrapper {
  width: 93%;
  padding: 0;
  /* padding: 100px 50px; */
}
</style>
