<template>
  <div style="padding: 40px 40px 80px;">
    <div v-if="!offlineVoucher">
      <!-- 支付类型 -->
      <div class="pro-img">
        <label v-for="(item,index) in rechargeOptions" :key="index">
          <input type="radio" name="options" :value="item.value" style="display: none;" v-model="rechargeReq.rechargeWay">
          <div class="imglist">
            <img :src="item.imgUrl" :alt="item.name">
          </div>
        </label>
      </div>
      <!-- 在线支付 -->
      <div v-show="rechargeReq.rechargeWay !== 4">
        <div class="pro-radio">
          <span>充值类型</span>
          <el-radio v-model="radio" label="1">普通充值</el-radio>
          <el-popover placement="bottom-start" title="温馨提示" width="590" trigger="hover" v-if="infoData.canUsePreRecharge">
            <p style="font-size: 12px;line-height: 20px;">1.预存金额作为账户余额仅可用于消费，不可提现，不可享受活动优惠，不可转让，不可还轻松付；</p>
            <p style="font-size: 12px;line-height: 20px;">2.股东预存款仅可用于青矩互联平台发布计量项目使用，不可用于BIM及设计项目；</p>
            <p style="font-size: 12px;line-height: 20px;">3.青矩智享股东选择股东预付款充值，仅享受股东优惠，不享受中秋/双十一优惠，充值金额累计到股东当年预存限定额度。</p>
            <el-radio v-model="radio" label="2" slot="reference" style="margin-left: 40px;">股东预付款充值</el-radio>
          </el-popover>
          <el-popover placement="bottom-start" title="温馨提示" width="590" trigger="hover">
            <p style="font-size: 12px;line-height: 20px;">1、本次双十一活动时间为11月8日——12月12日；</p>
            <p style="font-size: 12px;line-height: 20px;">2、双十一预存金额作为账户余额仅可用于消费，不可提现，不可享受活动优惠，不可转让，不可还轻松付；</p>
            <p style="font-size: 12px;line-height: 20px;">3、双十一付款仅可用于青矩互联平台发布计量项目使用，不可用于BIM及设计项目；</p>
            <p style="font-size: 12px;line-height: 20px;">4、青矩智享股东选择充值即送双十一活动，仅享受双十一优惠，不享受股东优惠，充值金额不占用股东当年预存限定额度。</p>
            <!-- <el-radio v-model="radio" label="3" slot="reference" style="margin-left: 40px;">中秋预付款充值</el-radio> -->
            <!-- <el-radio v-model="radio" label="4" slot="reference" style="margin-left: 40px;">充值即送双十一活动</el-radio> -->
          </el-popover>
        </div>

        <div class="pro-inp" v-if="radio==='1'">
          <span>预付金额</span>
          <el-input style="width:450px;" v-model="rechargeReq.rechargeAmount" type="number" min="0"></el-input>
          <span>元</span>
        </div>
        <div class="pro-inp" v-else-if="radio==='2'">
          <div class="clearfix" style="height: 40px;line-height: 40px;">
            <span class="fl">预付金额</span>
            <div class="prepaid-options fl clearfix">
              <label v-for="(item,index) in infoData.preList" :key="index" class="fl">
                <input type="radio" name="prepaidOptions" :value="item.id" style="display: none;" v-model="prepaymentAmount">
                <span>充{{item.rechargeAmount}}万送{{item.giftAmount}}万</span>
              </label>
            </div>
          </div>
        </div>
        <div class="pro-inp" v-else-if="radio==='4'">
          <div class="clearfix" style="height: 40px;line-height: 40px;">
            <span class="fl">预付金额</span>
            <div class="prepaid-options fl clearfix">
              <label v-for="(item,index) in activityRechargeList" :key="index" class="fl">
                <input type="radio" :value="item.value" style="display: none;" v-model="activityRechargeSel">
                <span>{{item.name}}</span>
              </label>
            </div>
          </div>
        </div>

        <div style="margin: 50px 90px 0;">
          <el-button type="danger" @click="recharge" :disabled="radio==='2'&&!infoData.preRechargeLimit" style="width: 450px;">预付款</el-button>
          <div v-show="radio==='2'" style="color: rgb(228, 57, 60);font-size: 14px;margin-top: 5px;">（本年度您还有{{infoData.preRechargeLimit || 0}}万元预付款充值返现福利）</div>
        </div>

      </div>
      <!-- 线下转账 -->
      <div v-show="rechargeReq.rechargeWay === 4" class="offline">
        <p>请将您要充值的金额在银行柜台、网银、手机银行转账至：</p>
        <p>( 该账户为公司账户，仅支持对公转账，如您银行转账遇到相关问题，请联系400-697-5677 )</p>
        <ul>
          <li>
            <span>银行开户名</span>
            <span>上海青矩互联网科技有限公司</span>
          </li>
          <li>
            <span>银行账号</span>
            <span>0200 0493 0920 1247 903</span>
          </li>
          <li>
            <span>开户银行</span>
            <span>中国工商银行股份有限公司北京四道口支行</span>
          </li>
        </ul>
        <p>本次预付款备注码 : {{code}}</p>
        <p>
          请将本页的
          <b>预付款备注码</b>附在转账备注上，您在转账成功后，通过本页面向我们
          <b>提交您的转账凭证</b>，以便我们核对处理您的转账。
          <b>同一次转账分多笔的话，预存款备注码写同一个</b>。
        </p>
        <div class="transfer-bg"></div>
        <div>
          <el-button type="danger" @click="offlineVoucher=true">我已汇款，提交转账凭证</el-button>
        </div>
      </div>
    </div>
    <transferVoucher v-else @back="offlineVoucher=false" :infoData="infoData" :params="editParams"></transferVoucher>
  </div>
</template>
<script>
import api from '@/fetch/api'
import transferVoucher from './transferVoucher'

export default {
  components: {
    transferVoucher
  },
  watch: {
    infoData: {
      handler: function(val) {
        this.prepaymentAmount = val.preList && val.preList[0].id
      },
      deep: true
    }
  },
  data() {
    return {
      httpHead: process.env.API_ROOT,
      prepaymentAmount: '',
      offlineVoucher: false,
      rechargeOptions: [
        // { name: '支付宝', imgUrl: require('@/assets/img/zhifubao_icon.png'), value: 1 },
        // { name: '微信', imgUrl: require('@/assets/img/weixin_icon.png'), value: 2 },
        { name: '银联', imgUrl: require('@/assets/img/yinlian_icon.gif'), value: 3 },
        // { name: '银联企业', imgUrl: require('@/assets/img/u83.png'), value: 2 },
        { name: '线下转账', imgUrl: require('@/assets/img/u1178.jpg'), value: 4 }
      ],
      radio: '1', // 1.普通充值  2.预付款充值
      code: '', // 预付款备注码
      infoData: {},
      params: {
        page: 1,
        pageSize: 10,
        userId: JSON.parse(window.localStorage.QingjuuserId)
      },
      rechargeReq: {
        rechargeAmount: '',
        rechargeWay: 3
      },
      editParams: {}, // 该条历史纪录详情
      activityRechargeList: [
        // 中秋活动充值列表
        { name: '充1万送1千', value: 10000 },
        { name: '充3万送3千', value: 30000 },
        { name: '充5万送5千', value: 50000 },
        { name: '充10万送1万', value: 100000 }
      ],
      activityRechargeSel: 10000
    }
  },
  methods: {
    async findMatch() {
      let Obj = this.infoData.preList.find(item => item.id === this.prepaymentAmount)
      this.rechargeReq.rechargeAmount = Obj.rechargeAmount * 10000
    },
    async recharge() {
      if (this.radio === '2') await this.findMatch()
      if (this.radio === '4') {
        if (!this.activityRechargeSel) return this.$message('请选择充值金额')
        this.rechargeReq.rechargeAmount = +this.activityRechargeSel
      }
      if (this.rechargeReq.rechargeAmount <= 0) return this.$message('请输入充值金额')
      if (this.rechargeReq.rechargeAmount > 100000) return this.$message('预付金额大于10万，请选择线下转账')
      // 1.普通充值  2.预付款充值
      if (this.radio === '1') {
        window.location.href = `${this.httpHead}finance/recharge?rechargeWay=${this.rechargeReq.rechargeWay}&rechargeAmount=${this.rechargeReq.rechargeAmount}&extraType=`
      } else if (this.radio === '2') {
        window.location.href = `${this.httpHead}finance/preRecharge?rechargeWay=${this.rechargeReq.rechargeWay}&rechargeAmount=${this.rechargeReq.rechargeAmount}&extraType=2`
      } else if (this.radio === '4') {
        window.location.href = `${this.httpHead}finance/preRecharge?rechargeWay=${this.rechargeReq.rechargeWay}&rechargeAmount=${this.rechargeReq.rechargeAmount}&extraType=4`
      }
    },
    // 查看该条历史详情
    viewAddCredential(id, activeStep = 1) {
      api.viewAddCredential(id).then(res => {
        this.editParams = res
        this.editParams.activeStep = activeStep
        this.offlineVoucher = true
      })
    },
    FinanceInformation() {
      api.FinanceInformation(JSON.parse(window.localStorage.QingjuuserId)).then(res => {
        this.$store.commit('setFinanceData', res.data)
        this.infoData = res.data
      })
    }
  },
  mounted() {
    if (this.$route.query.reEdit) this.viewAddCredential(this.$route.query.id)
    if (this.$route.query.seeReason) this.viewAddCredential(this.$route.query.id, 3)
    if (this.$route.query.type) this.radio = this.$route.query.type
    if (this.$route.query.money) this.rechargeReq.rechargeAmount = this.$route.query.money
    if (Object.keys(this.$store.state.financeData).length === 0) {
      this.FinanceInformation()
    } else {
      this.infoData = this.$store.state.financeData
    }
    api.genarateCode().then(res => (this.code = window.sessionStorage.prefinanceCode = res.code))
    // 中秋/双十一充值活动
    if (this.$route.query.activityRechargeMoney && (this.$route.query.activityRechargeMoney == '10000' || this.$route.query.activityRechargeMoney == '30000' || this.$route.query.activityRechargeMoney == '50000' || this.$route.query.activityRechargeMoney == '100000')) {
      this.radio = '4'
      this.activityRechargeSel = +this.$route.query.activityRechargeMoney
    }
  }
}
</script>

<style lang="less" scoped>
.pro-img {
  .imglist {
    cursor: pointer;
    display: inline-block;
    margin-right: 45px;
    width: 200px;
    height: 76px;
    border: 1px solid #f8fafc;
    background-color: #f8fafc;
    > img {
      width: 127px;
      height: 40px;
      margin-left: 36px;
      margin-top: 18px;
    }
  }
  input[type='radio']:checked + div {
    border: 1px solid rgb(228, 57, 60);
    position: relative;
    &:before {
      content: '\2714';
      position: absolute;
      bottom: -2px;
      right: -1px;
      color: #fff;
      font-size: 16px;
      z-index: 1;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      border-bottom: 10px solid rgb(228, 57, 60);
      border-right: 10px solid rgb(228, 57, 60);
      border-top: 10px solid transparent;
      border-left: 10px solid transparent;
    }
  }
}
.pro-inp,
.pro-radio {
  margin-top: 40px;
  height: 40px;
  line-height: 40px;
  span {
    font-size: 14px;
    color: #474e5d;
    margin-right: 30px;
  }
}
.prepaid-options {
  margin-left: 5px;
  > label {
    cursor: pointer;
    margin-right: 15px;
    > span {
      display: inline-block;
      width: 164px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid rgba(204, 204, 204, 1);
    }
    > input[type='radio']:checked + span {
      border-color: #e4393c;
      background: url(~@/assets/img/u6217.png) no-repeat right bottom;
    }
  }
}
.history-list {
  margin-top: 40px;
  .history-title {
    border-bottom: 2px solid #bcbcbc;
    p {
      font-size: 14px;
      color: #666666;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
  .tableList {
    margin-top: 10px;
  }
}
.offline {
  font-size: 14px;
  margin-top: 36px;
  > p {
    line-height: 25px;
    &:nth-child(1) {
      color: #666;
      font-weight: 700;
    }
    &:nth-child(2) {
      color: #e4393c;
    }
    &:nth-child(4) {
      color: #ff0000;
      font-size: 28px;
      text-align: center;
      margin: 25px;
    }
  }
  > ul {
    margin-top: 25px;
    border-top: 1px solid #999;
    > li {
      border-bottom: 1px solid #999;
      > span {
        display: inline-block;
        width: 40%;
        box-sizing: border-box;
        padding: 15px;
        &:first-child {
          border-right: 1px solid #999;
          text-align: right;
        }
      }
    }
  }
  .transfer-bg {
    margin: 20px 0 40px;
    height: 545px;
    background: url(~@/assets/img/yufukuan.jpg) no-repeat center;
    background-size: contain;
    & + div {
      text-align: center;
    }
  }
}
</style>
