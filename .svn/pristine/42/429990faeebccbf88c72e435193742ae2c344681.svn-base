<template>
  <div class="finance_center">

      <div class="header">
        <div class="header-left">
          <p>奖励金余额</p>
          <p><span>{{infoData.rewardUserHaveAmount | formatMoney}}</span> 元</p>
        </div>
        <div class="header-center">
          <div class="list">
            <img src="@/assets/img/mMDetais_icon1.png" alt="">
            <span>已获得奖励金：</span>
            <span>{{infoData.rewardTotalAmount | formatMoney}} 元</span>
          </div>
          <div class="list">
            <img src="@/assets/img/mMDetais_icon2.png" alt="">
            <span>已结算奖励金：</span>
            <span>{{infoData.rewardBalanceAmount | formatMoney}} 元</span>
          </div>
          <div class="list">
            <img src="@/assets/img/mMDetais_icon3.png" alt="">
            <span>待审核奖励金：</span>
            <span>{{infoData.rewardAuditingAmount | formatMoney}} 元</span>
          </div>
        </div>
        <div class="header-right">
          <el-button type="info" plain @click="applySettle">申请结算</el-button>
        </div>
        <div class="right">
          <p>我的邀请码</p>
          <div>{{infoData.myInvitationCode}}</div>
          <div>已邀请注册人数：{{infoData.invitationNum }}
            <router-link to="/Setting/code" style="color:#00B38A;cursor: pointer;">查看</router-link>
          </div>
        </div>
        <p class="tip">注：每月25至最后一天可申请结算，最晚请于{{years}}-12-31日全部结算</p>
      </div>

      <bonus-record></bonus-record>

  </div>
</template>
<script>
import api from "@/fetch/api";
import bonusRecord from './bonusRecord'

export default {
  components: {
    bonusRecord
  },
  data() {
    return {
      infoData: {},
      years: ''
    }
  },
  methods: {
    applySettle () {
      api.canVisitRewardBalance().then(res => {
        if (res.dataList[0]) {
          this.$router.push('/myqingju/bonusSettlement')
        } else {
          this.$message.error('（每个月25号以后）才能申请结算')
        }
      })
    },
    getCurrentUserRewardInfo() {
      api.getCurrentUserRewardInfo().then(res => {
        this.infoData = res.dataList[0]
      })
    },
  },
  mounted() {
    this.getCurrentUserRewardInfo()
    this.years = new Date().getFullYear()
  }
}

</script>

<style lang="less" scoped>
.finance_center {
  width: 100%;
  background-color: #f8f9fa;
  .header {
    background-color: #fff;
    box-sizing: border-box;
    height: 230px;
    padding-left: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    position: relative;
    .header-left {
      min-width: 320px;
      p:nth-child(1) {
        font-size: 24px;
        font-weight: 700;
        color: #666;
      }
      p:nth-child(2) {
        font-size: 18px;
        color: #666666;
        margin-top: 20px;
        span {
          font-weight: 700;
          font-size: 36px;
          color: #e14d4d;
        }
      }
    }
    .header-center {
      min-width: 280px;
      margin-right: 10px;
      .list {
        & + .list {
          margin-top: 13px;
        }
        overflow: hidden;
        img {
          float: left;
          width: 15px;
          height: 14px;
          margin-right: 9px;
          margin-top: 2px;
        }
        span:nth-child(2) {
          float: left;
          color: #666;
        }
        span:nth-child(3) {
          float: right;
          color: #666;
          // min-width: 160px;
          text-align: right;
        }
      }
    }
    .header-right {
      text-align: right;
      > button {
        width: 200px;
        height: 45px;
        &:hover{
          color: #fff;
          background-color: rgba(51, 51, 51, 1);
        }
        & + button {
          margin-top: 10px;
        }
      }
    }
  }
  .right {
    border-left: 1px dashed #bcbcbc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #fff;

    > div {
      &:nth-child(2) {
        padding: 0 40px;
        height: 60px;
        line-height: 60px;
        margin: 28px 0 56px;
        background: url(~@/assets/img/amount-bg.png) center;
        text-align: center;
        font-size: 40px;
        color: #666666;
        position: relative;
        > i {
          position: absolute;
          font-size: 18px;
          line-height: 1;
          top: 14px;
          left: 10px;
        }
      }
    }
  }
  .tip{
    position: absolute;
    bottom: 20px;
    left: 50px;
    color: #666;
  }
}
@media screen and (max-width: 1730px) {
  .header-right{
    position: absolute;
    top: 10px;
    right: 380px;
  }
}
</style>
