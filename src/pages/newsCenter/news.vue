<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <div class="content">
      <div class="container clearfix">
        <div class="left">
          <div>新闻筛选：
            <el-button round size="small" @click="changeType('all')">全部</el-button>
            <el-button round size="small" v-for="(item,index) in newOptions" :key="index" @click="changeType(item.id)">{{item.value}}</el-button>
          </div>
          <div class="search">
            <input type="text" placeholder="搜索" v-model="title" @keypress="searchNews">
          </div>
          <div class="news" v-for="(item,index) in newList" :key="index">
            <h6 @click="gotoDetail(item.id)">{{item.title}}
              <img src="../../assets/img/new.png" alt="" v-if="item.img">
            </h6>
            <div>{{item.preview}}</div>
            <div>
              <span>{{item.createDate}}</span>
              <span>分享至：
                <a href="javascript:;" @click="wxShare(item.id)">
                </a>
                <a href="javascript:;" @click="wbShare(item)">
                </a>
              </span>
            </div>
          </div>
          <div class="more" v-if="noData">
            <el-button type="primary" plain @click="seeMore">浏览更多</el-button>
          </div>
        </div>
        <div class="right">
          <h5>热门文章</h5>
          <ul>
            <li v-for="(item,index) in hotNews" :key="index" :class="[index<2?'top':'other']" @click="gotoDetail(item.id)">
              <div v-if="index<2">
                <span class="top1">Top {{index+1}}</span>
                <img :src="item.accessURL" alt="" width="100%" height="100%">
                <h6>{{item.title}}</h6>
              </div>
              <div v-else>
                <div>
                  <span>{{index+1}}</span>
                  <img :src="item.accessURL" alt="" width="100px" height="100%">
                </div>
                <div>
                  <h6>{{item.title}}</h6>
                  <span>{{item.createDate}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
import breadcrumb from "@/components/breadcrumb";
import api from "@/fetch/api";
import QRCode from 'qrcode'
export default {
  components: {
    breadcrumb,
  },
  data () {
    return {
      centerDialogVisible: false,
      breadcrumbs: [{ name: "新闻中心", path: this.$route.fullPath }],
      newList: [],
      params: {
        page: 0,
        size: 10,
        status: true,
        title: "",
        type: ""
      },
      title: '',   //搜索关键字
      newOptions: [
        { "id": "9212446714b2440b903fb3b522bd97f7", "value": "公司动态" },
        { "id": "9447194ae417418985b2b581eb5368bc", "value": "行业资讯" },
        { "id": "9eb5125ddd6a4340aa8789c2bfe42e4a", "value": "专业论坛" },
        { "id": "834bae9db58b4cedb9ac507082381fdd", "value": "政策法规" },
        { "id": "6c2d00ddaa774eac82935109ad8e1492", "value": "活动" }
      ],    //新闻类型
      hotNews: [],       //获取侧边热门新闻
      noData: false,      //暂无数据
    };
  },
  methods: {
    // 获取全部新闻
    getAllNews () {
      api.getAllNews(this.params).then(res => {
        this.newList = [...this.newList, ...res.page.content]
        this.noData = this.newList.length < res.page.totalElements
        // 判断新闻距离创建时间是否在15天以内 如果在 显示new
        let nowTime = Date.parse(new Date());
        for (let index = 0; index < this.newList.length; index++) {
          let creatTime = Date.parse(this.newList[index].createDate);
          let difference = nowTime - creatTime;
          var days = Math.floor(difference / (24 * 3600 * 1000));
          if (days < 10) {
            // 计算时差小于10天的话直接给true img是创建的参数
            this.newList[index].img = true
          }
        }
      })
    },
    // 获取侧边热门新闻
    getHotNews () {
      api.getHotNews().then(res => {
        this.hotNews = res.dataList
      })
    },
    // 获取新闻类型
    // getNewsTypeValue () {
    //   api.getNewsTypeValue().then(res => {
    //     this.newOptions = res.dataList
    //   })
    // },
    // 选择新闻类型
    changeType (val) {
      this.params.page = 0
      this.newList = []
      // 点击全部获取所有
      if (val == 'all') {
        this.params.typeList = []
      } else {
        // 根据id 获取不同类型的新闻
        this.params.typeList = [val]
      }
      this.getAllNews()
    },
    // 搜索新闻
    searchNews () {
      this.params.page = 0
      this.newList = []
      this.params.title = this.title
      this.getAllNews()
    },
    seeMore () {
      this.params.page += 1
      this.getAllNews()
    },
    gotoDetail (id) {
      this.$router.push('/newsCenter/newsDetail/' + id)
    },
    wxShare (id) {
      this.centerDialogVisible = true
      setTimeout(() => {
        QRCode.toCanvas(document.getElementById('canvas'), `${window.location.origin}/newsCenter/newsDetail/${id}`, (error) => {
          if (error) console.error(error)
        })
      }, 0);
    },
    wbShare (item) {
      var wb_url = `${window.location.origin}/newsCenter/newsDetail/${item.id}`, // 当前页面地址
        wb_title = item.title,
        wb_appkey = "",
        wb_ralateUid = "5948273663",
        wb_pic = 'https://www.qingju.cn/static/img/logo.png',
        wb_language = "zh_cn";
      window.open("http://service.weibo.com/share/share.php?url=" + wb_url + "&appkey=" + wb_appkey + "&title=" + wb_title + "&pic=" + wb_pic + "&ralateUid=" + wb_ralateUid + "&language=" + wb_language + "")
    }
  },
  mounted () {
    this.getAllNews()
    // this.getNewsTypeValue()   //所有新闻类型
    this.getHotNews()         //获取侧边热门新闻
  }
};
</script>

<style lang='less' scoped>
.content {
  background-color: #fff;
  .container {
    padding-bottom: 100px;
    .left {
      float: left;
      width: 900px;
      .search {
        height: 30px;
        width: 300px;
        margin: 20px 0;
        > input {
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #b5b5b5;
          padding-left: 35px;
          border-radius: 15px;
          background: url(../../assets/img/search.png) no-repeat 12px;
          background-size: 15px;
        }
      }
      .news {
        padding: 20px 0 15px;
        border-bottom: 1px dashed #d7d7d7;
        > h6 {
          font-size: 18px;
          font-weight: normal;
          cursor: pointer;
          margin-bottom: 20px;
          position: relative;
          img {
            position: absolute;
            top: 4px;
            margin-left: 3px;
          }
        }
        > div:nth-child(2) {
          color: #666;
          font-size: 12px;
          text-indent: 24px;
          max-height: 60px;
          line-height: 20px;
          margin-bottom: 20px;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        > div {
          font-size: 14px;
          &:last-child {
            position: relative;
            > span {
              margin-right: 20px;
              > a {
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: bottom;
                &:first-child {
                  background: url(../../assets/img/wxh.png) no-repeat center;
                  margin-right: 15px;
                  &:hover {
                    background: url(../../assets/img/wx.png) no-repeat center;
                  }
                }
                &:last-child {
                  background: url(../../assets/img/wbh.png) no-repeat center;
                  &:hover {
                    background: url(../../assets/img/wb.png) no-repeat center;
                  }
                }
              }
            }
          }
        }
      }
      .more {
        text-align: center;
        margin: 42px 0 100px;
      }
    }
    .right {
      float: right;
      width: 280px;
      > h5 {
        font-size: 18px;
        font-weight: normal;
        text-align: center;
        height: 30px;
        border-bottom: 1px dashed #d7d7d7;
      }
      > ul {
        > li {
          cursor: pointer;
          &.top:nth-child(1) {
            .top1 {
              background: url(../../assets/img/top1.png) no-repeat center;
              background-size: contain;
            }
          }
          &.top:nth-child(2) {
            .top1 {
              background: url(../../assets/img/top2.png) no-repeat center;
              background-size: contain;
            }
          }
          h6 {
            font-size: 14px;
            font-weight: normal;
          }
          &.top {
            width: 280px;
            height: 160px;
            border-radius: 5px;
            margin-top: 30px;
            overflow: hidden;
            position: relative;
            > div {
              > span {
                display: inline-block;
                width: 55px;
                height: 27px;
                text-align: center;
                line-height: 25px;
                color: #fff;
                font-size: 12px;
                font-weight: bold;
                position: absolute;
                top: -1px;
                left: 14px;
              }
              > h6 {
                color: #fff;
                padding: 15px 10px;
                position: absolute;
                bottom: 0;
              }
            }
          }

          &.other {
            margin-top: 20px;
            > div {
              display: flex;
              justify-content: space-between;
              > div {
                &:first-child {
                  font-size: 12px;
                  width: 100px;
                  height: 65px;
                  border-radius: 5px;
                  overflow: hidden;
                  position: relative;
                  > span {
                    display: inline-block;
                    width: 26px;
                    height: 18px;
                    padding-left: 3px;
                    color: #fff;
                    font-weight: bold;
                    background: url(../../assets/img/top3.png) no-repeat left;
                    position: absolute;
                    top: 0;
                    left: 0;
                  }
                }
                &:nth-child(2) {
                  font-size: 14px;
                  flex: 1;
                  margin-left: 10px;
                  > h6 {
                    height: 38px;
                    margin-bottom: 8px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-wrap: break-word;
                    width: 170px;
                    position: relative;
                    line-height: 19px;
                    max-height: 38px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
