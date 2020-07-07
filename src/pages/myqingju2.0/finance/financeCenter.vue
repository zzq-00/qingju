<template>
  <div class="finance_center">
    <div class="header">
      <div class="header-left">
        <p>账户总额</p>
        <p><span>{{infoData.total | formatMoney}}</span> 元</p>
      </div>
      <div class="header-center">
        <div class="list">
          <img src="@/assets/img/mMDetais_icon1.png" alt="">
          <span>托管额：</span>
          <span>{{infoData.trusteeship | formatMoney}} 元</span>
        </div>
        <div class="list">
          <img src="@/assets/img/mMDetais_icon2.png" alt="">
          <span>冻结额：</span>
          <span>{{infoData.freeze | formatMoney}} 元</span>
        </div>
        <div class="list">
          <img src="@/assets/img/mMDetais_icon3.png" alt="">
          <span>账户余额：</span>
          <span>{{infoData.financeAccountTotal | formatMoney}} 元</span>
        </div>
        <div class="list">
          <img src="@/assets/img/mMDetais_icon3.png" alt="">
          <span>预付款余额：</span>
          <span>{{infoData.principalTotal | formatMoney}} 元</span>
        </div>
      </div>
      <div class="header-right">
        <el-button type="danger" @click="$router.push('/myqingju/recharge')" v-has="['IUjZpQ']">去充值</el-button>
        <el-button type="info" plain @click="$router.push('/myqingju/withdraw')" v-has="['ywdp61']">去提现</el-button>
      </div>
    </div>

    <div class="quick-operation">
      <dl>
        <dt>快捷操作：</dt>
        <dd v-has="['IUjZpQ']">
          <router-link to="/myqingju/recharge">我要充值</router-link>
        </dd>
        <dd v-has="['ywdp61']">
          <router-link to="/myqingju/withdraw">我要提现</router-link>
        </dd>
        <dd v-has="['sIJDVp']">
          <router-link to="/myqingju/financialRecord?BussinessType=1">充值记录</router-link>
        </dd>
        <dd v-has="['sIJDVp']">
          <router-link to="/myqingju/financialRecord?BussinessType=4">提现记录</router-link>
        </dd>
        <dd v-has="['sIJDVp']">
          <router-link to="/myqingju/financialRecord">查看所有交易记录</router-link>
        </dd>
      </dl>
    </div>

  </div>
</template>
<script>
import api from "@/fetch/api";

export default {
  data() {
    return {
      infoData: {},
    }
  },
  methods: {
    FinanceInformation() {
      api.FinanceInformation(JSON.parse(window.localStorage.QingjuuserId)).then(res => {
        this.$store.commit('setFinanceData', res.data)
        this.infoData = res.data
      })
    }
  },
  mounted() {
    if (Object.keys(this.$store.state.financeData).length === 0) {
      this.FinanceInformation()
    } else {
      this.infoData = this.$store.state.financeData
    }
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
    padding: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
          min-width: 160px;
          text-align: right;
        }
      }
    }
    .header-right {
      text-align: right;
      > button {
        width: 150px;
        & + button {
          margin-top: 10px;
        }
      }
    }
  }

  .quick-operation {
    > dl {
      display: flex;
      background-color: #fff;
      height: 80px;
      margin-top: 40px;
      padding-left: 16px;
      align-items: center;
      line-height: 1;
      > dd {
        padding: 0 20px;
        > a {
          color: #00b38a;
        }
        & + dd {
          border-left: 1px solid #333;
        }
      }
    }
  }
}
</style>
