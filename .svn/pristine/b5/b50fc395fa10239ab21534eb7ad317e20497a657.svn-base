<template>
  <div class="coupon-page">
    <p class="page-title">优惠券</p>
    <div class="coupon-filter">
      <div class="time-filter">
        <span class="time">时间:</span>
        <el-date-picker @change="changeDate" class="date-style" prefix-icon="icon-style" clear-icon="icon-style" v-model="dateTime" type="daterange" range-separator="~" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="type-filter">
        <span>类型:</span>
        <ul>
          <li :class="{clickStatus:notUsed==1}" @click="clickChange('1')">未使用</li>
          <li :class="{clickStatus:notUsed==2}" @click="clickChange('2')">已使用</li>
          <li :class="{clickStatus:notUsed==3}" @click="clickChange('3')">已作废</li>
          <div style="clear:both"></div>
        </ul>
        <div style="clear:both"></div>
      </div>
    </div>
    <div class="coupon-box">
      <ul>
        <li v-for="(item,index) in couponList" :key="index">
          <div class="title">
            <!-- 优惠券 -->
            <div class="info" :class="{ info2s: item.status!='未使用', }" v-if="item.couponType!=2">
              <img :src="item.couponImage" alt="优惠券">
              <!-- <div>￥{{item.subtractLimit}}</div>
            <div>【满{{item.fullLimit}}可用】</div> -->
              <div>{{item.beginDate}}--{{item.endDate}}</div>
            </div>
            <!-- 代金券 -->
            <div class="info2" :class="{ info2s: item.status!='未使用', }" v-if="item.couponType==2">
              <img :src="item.couponImage" alt="满减券">
              <!-- <div>￥{{item.subtractLimit}}</div> -->
              <div>{{item.beginDate}}--{{item.endDate}}</div>
            </div>
            <div class="info_name">{{item.couponName}}</div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  data() {
    return {
      notUsed: true,
      couponList: [], //优惠券列表
      userId: JSON.parse(window.localStorage.QingjuuserId),
      activeName: '1',
      dateTime: '',
      value1: '',
      value2: ''
    }
  },

  components: {},

  computed: {},

  mounted() {
    this.getMyCoupon()
  },

  methods: {
    changeDate() {
      this.value1 = this.dateTime[0]
      this.value2 = this.dateTime[1]
      this.getMyCoupon()
    },
    //我的优惠券
    getMyCoupon() {
      api
        .getMyCoupon({
          userId: this.userId,
          status: this.activeName,
          beginDate: this.value1,
          endDate: this.value2
        })
        .then(res => {
          this.couponList = res.dataList
        })
        .catch(res => {})
    },
    change() {
      this.getMyCoupon()
    },
    clickChange(val) {
      this.notUsed = val
      this.activeName = val
      this.getMyCoupon()
    }
  }
}
</script>
<style lang='less' scoped>
.coupon-page {
  padding: 20px;
  .coupon-title {
    span {
      font-size: 18px;
    }
    p:nth-child(1) {
      height: 18px;
      line-height: 18px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    p:nth-child(2) {
      margin-top: 15px;
      height: 1px;
      background: rgba(215, 215, 215, 1);
      width: 100%;
    }
  }
  .coupon-filter {
    margin-top: 21px;
    display: flex;
    margin-bottom: 20px;
    .time-filter {
      .time {
        float: left;
        width: 38px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .type-filter {
      margin-left: 20px;
      span {
        margin-right: 10px;
        float: left;
        width: 38px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      ul {
        padding: 5px 0;
        float: left;
        li {
          float: left;
          width: 65px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          color: #666666;
          font-size: 14px;
          margin-right: 40px;
        }
        li:last-child {
          margin-right: 0;
        }
        .clickStatus {
          background: rgba(153, 153, 153, 1);
          color: #ffffff;
          border-radius: 2px;
        }
      }
    }
  }
  .coupon-box {
    ul {
      width: ~'calc(100% + 31.25px)';
      li {
        margin-right: 31.25px;
        float: left;
        width: 237px;
        height: 292px;
        margin-top: 29px;
        position: relative;
        img {
          position: absolute;
        }
        .title {
          color: #333333;
          font-weight: 700;
          font-size: 14px;
          width: 237px;
          height: 147px;
          img {
            width: 237px;
            height: 147px;
          }
          .info {
            height: 147px;
            color: #6e848e;
            background: url(../../../assets/img/discount.png) no-repeat;
            background-size: 237px 147px;
            position: relative;
            div {
              text-align: center;
              color: #fff;
            }
            div:nth-child(1) {
              padding-top: 38px;
              font-size: 43px;
            }
            div:nth-child(2) {
              position: absolute;
              width: 100%;
              bottom: 10px;
              font-size: 13px;
            }
          }
          .info2 {
            height: 147px;
            color: #6e848e;
            background: url(../../../assets/img/cash.png) no-repeat;
            background-size: 237px 147px;
            position: relative;
            div {
              text-align: center;
              color: #fff;
            }
            div:nth-child(1) {
              padding-top: 38px;
              font-size: 43px;
            }
            div:nth-child(2) {
              position: absolute;
              width: 100%;
              bottom: 10px;
              font-size: 13px;
            }
          }
          .info2s {
            height: 147px;
            color: #6e848e;
            background: url(../../../assets/img/Already.png) no-repeat;
            background-size: 237px 147px;
            div {
              text-align: center;
              color: #fff;
            }
            div:nth-child(1) {
              padding-top: 38px;
              font-size: 43px;
            }
            div:nth-child(2) {
              text-align: center;
              font-size: 13px;
            }
          }
          .info_name {
            padding: 11px 10px;
            color: gray;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.coupon-filter >>> .el-input__inner {
  border-top: 0 none;
  border-left: 0 none;
  border-right: 0 none;
}
</style>
