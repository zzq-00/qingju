<template>
  <div class="Pro-content">
    <div class="title">
      <p>我的青豆</p>
      <div>
      </div>

    </div>
    <div class="header">
      <div class="header-left">
        <p>我的青豆</p>
        <img src="../../assets/img/qingdou_icon.png" alt="">
        <p>{{myQingdouCount}}</p>
        <div class="but">
          <div @click="go2Created">发布项目</div>
          <div @click="go2Exchange">兑换礼品</div>
        </div>

      </div>
      <div class="header-right">
        <div class="title">
          <p>青豆统计</p>
        </div>
        <div class="lists">
          <div class="list">
            <span>青豆收入</span>
            <span>+{{beanDetail.totalRevenue}}</span>
          </div>
          <div class="list">
            <span>青豆支出</span>
            <span>-{{beanDetail.totalExpenditure}}</span>
          </div>
          <div class="list">
            <span>近一个月即将失效</span>
            <span>{{beanDetail.almostExpired}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane style="font-size:14px;" label="青豆记录" name="first">
          <beanManageBean></beanManageBean>
        </el-tab-pane>
        <el-tab-pane style="font-size:14px;" label="兑换记录" name="second">
          <beanManageExchange></beanManageExchange>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import api from "@/fetch/api";
import beanManageBean from "./beanManageCom/beanManageBean";
import beanManageExchange from "./beanManageCom/beanManageExchange";
export default {
  components: {
    beanManageBean,
    beanManageExchange
  },
  data () {
    return {
      activeName: "first",
      multipleSelection: [],
      beanManageType: window.localStorage.beanManageType,
      userId: window.localStorage.QingjuuserId,
      beanDetail: [],
      myQingdouCount: 0,    //我的青豆
    };
  },
  created () {
    if (this.beanManageType) {
      this.activeName = JSON.parse(this.beanManageType);
    } else {
      this.activeName = "first";
    }
    if (this.userId) {
      this.userId = JSON.parse(this.userId);
      this.getMyBean();
    }
  },
  methods: {
    //发布项目页面
    go2Created () {
      this.$store.commit('changeReleaseWindow', true)
    },
    //对换页面页面
    go2Exchange () {
      this.$router.push("/benefits");
    },
    // 我的青豆
    getMyBean () {
      // 参数为userId
      api.getMyBean(this.userId).then(res => {
        this.myQingdouCount = res.dataList[0].myBean;
        this.beanDetail = res.dataList[0];
      });
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    tableHeaderClassName ({ row, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
      } else {
        return "table-header-color";
      }
    }
  }
};
</script>
<style lang='less' scoped>
.Pro-content {
  padding: 20px;
  > .title {
    border-bottom: 1px solid #bcbcbc;
    padding-bottom: 20px;
    overflow: hidden;
    > p {
      color: #333333;
      font-size: 18px;
      font-weight: 700;
      float: left;
    }
    > div {
      float: right;
      > img {
        height: 12px;
        width: 12px;
      }
      > img:hover {
        cursor: pointer;
      }
      > span {
        font-weight: 400;
        font-size: 14px;
        color: #aeaeae;
      }
      > span:hover {
        cursor: pointer;
      }
    }
  }
  .header {
    margin-bottom: 70px;
    overflow: hidden;
    .header-left {
      float: left;
      width: 260px;
      margin-left: 25px;
      text-align: center;
      > p:nth-child(1) {
        margin-top: 50px;
        font-weight: 400;
        font-size: 18px;
      }
      > img {
        margin-top: 40px;
        width: 77px;
        height: 72px;
      }
      > p:nth-child(3) {
        margin-top: 30px;
        font-weight: 700;
        font-size: 24px;
        color: #333333;
      }
      .but {
        margin-top: 20px;
        div {
          width: 120px;
          height: 35px;
          border: 1px solid #333333;
          line-height: 35px;
          text-align: center;
          font-size: 13px;
          color: #333333;
          display: inline-block;
        }
        div:nth-child(2) {
          margin-left: 10px;
        }
        div:hover {
          background-color: #333333;
          color: white;
          cursor: pointer;
        }
      }
    }
    .header-right {
      margin-left: 85px;
      float: left;
      width: 420px;
      > .title {
        margin-top: 53px;
        font-weight: 700;
        font-style: normal;
        font-size: 16px;
        color: #333333;
      }
      .lists {
        overflow: hidden;
        .list {
          margin-right: 55px;
          margin-top: 60px;
          display: flex;
          justify-content: space-between;
          line-height: 37px;
          > span:nth-child(1) {
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: #333333;
          }
          > span:nth-child(2) {
            font-style: normal;
            font-size: 28px;
            color: #333333;
          }
        }
        // .list:last-child {
        //   font-weight: 700;
        //   font-size: 18px;
        //   color: #333333;
        // }
      }
    }
  }
}
</style>




