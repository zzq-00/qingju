<template>
  <div class="goodslist-container">
    <div class="goodslist-image">
      <img :src="dataList.courseImage" alt="" v-if="!dataList.courseUrl">
      <img :src="dataList.courseImage" v-if="dataList.courseUrl"></video>
      <div class="mask" v-if="dataList.courseUrl" @click="openBig()"></div>
    </div>
    <div class="des">
      <div class="courseTit">
        {{dataList.courseName}}
      </div>
    </div>
    <div class="footer">
      <div class="list" v-if="!dataList.courseUrl&&dataList.courseBean!=0">
        <span>{{dataList.courseBean}}</span>
        <span>青豆</span>
      </div>
      <div class="list" v-if="(!dataList.courseUrl)&&dataList.courseBean==0">
        <span>免费</span>
      </div>
      <div class="list" v-if="dataList.courseUrl&&dataList.courseBean==0">
        <span>免费</span>
      </div>
      <div class="list" v-if="dataList.courseUrl&&dataList.courseBean!=0">
        <span>已兑换</span>
      </div>
      <div class="but" @click="go2next(dataList.id)" v-if="!dataList.courseUrl">立即兑换</div>
      <div class="but" v-if="dataList.courseUrl" style="cursor:default">可观看</div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      userId: window.localStorage.QingjuuserId,
    };
  },
  mounted () {
    if (this.userId) {
      this.userId = JSON.parse(this.userId);
    }
    if (this.dataList.courseName.replace(/[^\x00-\xff]/g, "01").length > 20) {
      this.dataList.courseName = this.dataList.courseName.substring(0, 20) + '...'
    }
  },
  props: ['dataList', "user"],
  methods: {
    go2next (id) {
      if (this.userId || this.user) {
        if (JSON.parse(window.localStorage.isTzecc) == '1') {
          this.$message('内部员工禁止操作');
        } else {
          this.$router.push({ path: '/coursechangePaly/coursechangeDetail', query: { id: id } });
        }
      }
      else {
        this.$emit("send2ParentLogin", true);
      }
    },
    openBig () {
      this.$emit("videoURL", this.dataList.courseUrl)
    },
  }
};
</script>



<style lang="less" scoped>
.goodslist-container {
  box-sizing: border-box;
  width: 285px;
  padding-bottom: 10px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 1);
  .goodslist-image {
    width: 285px;
    height: 180px;
    margin: 0 auto;
    border-radius: 6px;
    background-color: yellowgreen;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    video {
      width: 285px;
      height: 180px;
    }
  }
  .goodslist-image:hover {
    cursor: pointer;
    .mask {
      position: absolute;
      display: block;
      background: #333 url(../../assets/img/play.png) no-repeat center;
      background-size: 50px 50px;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      opacity: 0.5;
      border-radius: 6px;
      transition: all 0.6s;
    }
  }
  .des {
    font-size: 14px;
    margin-top: 10px;
    .courseTit {
      font-style: normal;
      font-size: 14px;
      padding: 0 13px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
    }
    .courseTit:hover {
      cursor: pointer;
      color: green;
    }
    .courseInfo {
      display: flex;
      margin-top: 5px;
      padding: 0 13px;
      box-sizing: border-box;
      div {
        // padding-right: 12px;
        height: 28px;
        span {
          display: inline-block;
          font-size: 12px;
          color: #666666;
          line-height: 28px;
        }
      }
    }
  }
  .footer {
    display: flex;
    padding: 0 13px;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 20px;
    .list {
      span:nth-child(1) {
        font-size: 18px;
        color: #d7000f;
        font-weight: 400;
      }
    }
    .but {
      width: 98px;
      height: 28px;
      border: 1px solid red;
      line-height: 28px;
      text-align: center;
      border-radius: 3px;
      font-size: 12px;
    }
    .but:hover {
      background-color: red;
      color: #fff;
      cursor: pointer;
    }
  }
  .masks {
    position: fixed;
    top: 0;
    z-index: 2;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
.goodslist-container:hover {
  box-shadow: 2px 2px 10px #ccc;
}
</style>

