<template>
  <div>
    <div class="header-img" style="margin-top:130px;">
      <el-carousel height="500px">
        <el-carousel-item v-for="(item,index) in swiperImg" :key="index">
          <a :href="item.attachURL.includes('http') ? item.attachURL : `http://${item.attachURL}`" v-if="item.attachURL">
            <img :src="item.imgURL" alt="" height="100%" width="100%">
          </a>
          <router-link to="" v-else>
            <img :src="item.imgURL" alt="" height="100%" width="100%">
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <ul class="tabs-ul">
        <li class="tab-li" v-for="(item, index) of activityList" :key="index" :class="{active:selected==index}" @click="change(item,index)">{{item.value}}</li>
      </ul>
      <!-- 活动详情页 -->
      <ul class="tab-newActivity">
        <li class="newActivity-li" v-for="(item,index) of newList" :key="index" @click="goNewsDetail(item.id)" v-if="item.activityStatus != 1">
          <img :src="item.accessURL" alt="新闻活动页图片" class="li-img">
          <div class="li-block">
            <p class="li-title">{{item.title}}</p>
            <span class="activeBlock1" v-if="item.activityStatus == 2">未开始</span>
            <span class="activeBlock2" v-if="item.activityStatus == 3">活动中</span>
            <span class="activeBlock3" v-if="item.activityStatus == 4">已结束</span>
            <p class="li-detail">{{item.introduction}}</p>
            <span class="position">{{item.city}}</span>
            <span class="time">{{item.startTime}}</span>
          </div>
        </li>
      </ul>
      <div class="moreBtn" @click="loadMore" v-if="showMore">加载更多</div>
    </div>
    <!-- 文章页面 -->
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  components: {
  },
  data () {
    return {
      activityList: [],    //活动类型
      newsdata: {
        "page": 0,
        "size": 9,
        "status": "",     //是否发布
        "title": "",      //标题
        "typeList": [],   //活动类型
        "asList": ["2", "3", "4"]       //活动状态
      },
      showMore: true,          //查看更多
      selected: 0,//选中的tab标签位置
      newList: [],
      timeList: [],    //活动时间集合
      newObj: {},
      swiperImg: [],     //轮播图列表
    };
  },
  mounted () {
    this.getPromotionTypeValue()      //所有活动类型
    this.getAllPromotion()            //获取所有活动
    this.getData()                    //所有活动日期
    this.proGetAllImg()              //轮播图列表
  },
  methods: {
    //轮播图
    proGetAllImg () {
      api.proGetAllImg().then(res => {
        this.swiperImg = res.dataList
      })
    },
    //获取所有活动类型
    getPromotionTypeValue () {
      api.getPromotionTypeValue().then(res => {
        this.activityList = res.dataList
        this.activityList.unshift({ id: '', value: '全部' })
      })
    },
    // 获取所有活动
    getAllPromotion () {
      api.getAllPromotion(this.newsdata).then(res => {
        this.newList = [...this.newList, ...res.page.content]
        this.showMore = this.newList.length < res.page.totalElements
      })
    },
    // 获取所有活动日期
    getData () {
      let data = {
        "page": 0,
        "size": 1000,
        "status": "",     //是否发布
        "title": "",      //标题
        "typeList": [],   //活动类型
        "asList": ["2", "3", "4"]       //活动状态
      }
      api.getAllPromotion(data).then(res => {
        res.page.content.map(item => {
          item.startTime = item.startTime.replace(/-/g, "/")
          this.newObj.date = item.startTime
          this.newObj.title = 'activity'
          this.timeList.push(this.newObj)
          window.localStorage.timeList = JSON.stringify(this.timeList)
        })
      })
    },
    //tab标签的改变
    change (item, index) {
      this.selected = index;
      this.newsdata.typeList = [item.id]
      if (item.value == '全部') {
        this.newsdata.typeList = []
      }
      this.newsdata.page = 0
      this.newList = []
      this.getAllPromotion()
    },
    //加载更多按钮
    loadMore () {
      this.newsdata.page += 1
      this.getAllPromotion()
    },
    goNewsDetail (id) {
      this.$router.push({ path: '/newsCenter/activeNewsDetail/', query: { id: id } })
    }
  }
};
</script>

<style lang='less' scoped>
.main {
  padding-top: 20px;
  padding-bottom: 50px;
  background-color: #f3f3f3;
}
.header-img {
  height: 500px;
}
/* 标签头的样式 */
.tabs-ul {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .tab-li {
    float: left;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    color: #009966;
    cursor: pointer;
    &:hover {
      background-color: #009966;
      color: #fff;
      position: relative;
      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translate(-50%);
        width: 0;
        height: 0;
        border-top: 10px solid #009966;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
    }
  }
  .active {
    background-color: #009966;
    color: #fff;
    position: relative;
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translate(-50%);
      width: 0;
      height: 0;
      border-top: 10px solid #009966;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
    }
  }
}
/* 活动 内容样式 */
.tab-newActivity {
  width: 1200px;
  margin: 0 auto;
  /* display: -webkit-box; */
  display: -ms-flexbox;
  /* display: flex; */
  /* -webkit-box-pack: justify; */
  -ms-flex-pack: justify;
  /* justify-content: space-between; */
  -ms-flex-wrap: wrap;
  /* flex-wrap: wrap; */
  margin-top: 50px;
  overflow: hidden;
  .newActivity-li {
    background: #fff;
    width: 374px;
    height: 356px;
    margin-bottom: 50px;
    cursor: pointer;
    margin-right: 39px;
    float: left;
    &:hover {
      transition: all 0.3s;
      transform: scale(1.01);
      box-shadow: 3px 3px 10px 1px #aaa;
    }
    .li-img {
      display: block;
      width: 374px;
      height: 216px;
    }
    .li-block {
      padding: 20px;
      position: relative;
      &:after {
        content: "";
        display: table;
        clear: both;
      }
      .li-title {
        color: #333;
        font-size: 18px;
        padding-right: 14%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .state-flag {
        display: inline-block;
        width: 45px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        color: #fff;
        font-size: 12px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .activeBlock1 {
        background-color: #008af5;
        display: inline-block;
        width: 45px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        color: #fff;
        font-size: 12px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .activeBlock2 {
        background-color: rgba(249, 160, 6, 1);
        display: inline-block;
        width: 45px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        color: #fff;
        font-size: 12px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .activeBlock3 {
        background-color: rgba(204, 204, 204, 1);
        display: inline-block;
        width: 45px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        color: #fff;
        font-size: 12px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .startBlock {
        background-color: #f9a006;
      }
      .li-detail {
        color: #aeaeae;
        font-size: 14px;
        margin: 20px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .position {
        float: left;
        &:before {
          content: "";
          display: inline-block;
          width: 13px;
          height: 17px;
          background: url("../../assets/img/position.png") no-repeat;
          margin-right: 5px;
        }
      }
      .time {
        float: right;
        &:before {
          content: "";
          display: inline-block;
          width: 13px;
          height: 17px;
          background: url("../../assets/img/time.png") no-repeat;
          margin-right: 5px;
        }
      }
    }
  }
  .newActivity-li:nth-child(3n) {
    margin-right: 0;
  }
}
.moreBtn {
  width: 1200px;
  height: 40px;
  margin: 0 auto;
  line-height: 40px;
  text-align: center;
  background-color: #c9c9c9;
  font-size: 14px;
  color: #333;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 5px rgb(126, 125, 125);
  }
}
</style>
<style type="text/css">
/*改变的公共饿了么的轮播样式*/
.self-carousel .el-carousel__arrow--right {
  background: url("../../assets/img/index-right-icon.png") no-repeat;
  width: 34px;
  height: 70px;
}
.self-carousel .el-carousel__arrow--right:hover {
  background-color: transparent;
}
.self-carousel .el-icon-arrow-right:before {
  content: "";
}
.self-carousel .el-carousel__arrow--left {
  background: url("../../assets/img/index-left-icon.png") no-repeat;
  width: 34px;
  height: 70px;
}
.self-carousel .el-carousel__arrow--left:hover {
  background-color: transparent;
}
.self-carousel .el-icon-arrow-left:before {
  content: "";
}
.self-carousel .el-carousel__button {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #009966;
}
.self-carousel .el-carousel__indicator + .el-carousel__indicator {
  margin-left: 30px;
  width: 10px;
}
.self-carousel .el-carousel__indicators {
  bottom: 10px;
}
</style>
