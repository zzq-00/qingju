<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <div class="news">
      <div class="container">
        <h3>{{data.title}}</h3>
        <div class="clearfix">
          <span class="fl">{{data.createDate}}</span>
          <span class="fr share">分享至：
            <a href="javascript:;" @click="wxShare">
            </a>
            <a href="javascript:;" @click="wbShare">
            </a>
          </span>
        </div>
        <div class="ql-container ql-snow" style="border:none">
          <div class="ql-editor" v-html="data.body">
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="分享到微信" :visible.sync="centerDialogVisible" width="300px" center>
      <div style="text-align: center;">
        <canvas id="canvas" style="max-width:254px;max-height:254px;"></canvas>
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
import breadcrumb from "@/components/breadcrumb";
import api from "@/fetch/api";
import QRCode from 'qrcode'

export default {
  components: {
    breadcrumb
  },
  data () {
    return {
      centerDialogVisible: false,
      breadcrumbs: [
        { name: "新闻中心", path: "/newsCenter/news" },
        { name: "新闻正文", path: this.$route.fullPath }
      ],
      data: ''
    };
  },
  methods: {
    getNewsDetail (id) {
      api.getNewsDetail(id).then(res => {
        this.data = res.data;
      });
    },
    wxShare () {
      this.centerDialogVisible = true
      setTimeout(() => {
        QRCode.toCanvas(document.getElementById('canvas'), window.location.href, (error) => {
          if (error) console.error(error)
        })
      }, 0);
    },
    wbShare () {
      var imgUrl = require('@/assets/logo.png')
      var wb_url = window.location.href, // 当前页面地址
        wb_title = this.data.title,
        wb_appkey = "",
        wb_ralateUid = "5948273663",
        wb_pic = window.location.origin + imgUrl,
        wb_language = "zh_cn";
      window.open("http://service.weibo.com/share/share.php?url=" + wb_url + "&appkey=" + wb_appkey + "&title=" + wb_title + "&pic=" + wb_pic + "&ralateUid=" + wb_ralateUid + "&language=" + wb_language + "")
    }
  },
  mounted () {
    this.getNewsDetail(this.$route.params.id);
  }
};
</script>

<style lang='less' scoped>
.news {
  background-color: #fff;
  .container {
    padding: 20px 0 100px;
    > h3 {
      font-size: 26px;
      margin-bottom: 30px;
      text-align: center;
      color: #333;
      font-weight: bold;
    }
    > div:nth-child(2) {
      font-size: 14px;
      color: #666;
      padding-bottom: 15px;
    }
  }
}
.share {
  > a {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    &:first-child {
      background: url(../../assets/img/wx.png) no-repeat center;
      margin-right: 15px;
    }
    &:last-child {
      background: url(../../assets/img/wb.png) no-repeat center;
    }
  }
}
</style>
