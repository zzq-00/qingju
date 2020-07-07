<template>
  <div class="counter-container">
    <div class="counter-header">
      <div class="main">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="" width="95px" height="40px">
        </router-link>
        <span class="counterier-text">收银台</span>
      </div>
    </div>
    <div class="part-01">
      <span class="text-01">请尽快付款</span>
      <div class="project-box">
        <p class="project-name">
          <span class="title">项目名称：</span>
          <span class="name">{{infoData.proName}}</span>
        </p>
        <ul class="right-detail">
          <li class="li">
            <span class="right-detail-title">实际需付</span>
            <span class="right-detail-number red">{{infoData.amount | formatMoney}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="counter-box">
        <ul class="payment-type">
          <!-- 账户余额。 项目申诉只能使用账户余额付款 -->
          <li class="kind-type" v-bind:class="{'kind-type-click':trusteeshipParams.financeAccount}">
            <el-checkbox :value="trusteeshipParams.financeAccount" :disabled="!infoData.financeCanUse">
              <div class="kind-type-title">
                <img :src="require('@/assets/img/u2320.png')" width="28px" height="28px">
                <span class="text">账户余额</span>
              </div>
              <div class="have-qsf-li clearfix">
                <span class="balance">可用余额 {{infoData.finanaceAmount | formatMoney}} 元</span>
                <!-- 选中时显示 -->
                <p class="price" v-if="infoData.financeCanUse">
                  <span class="text">支付</span>
                  <!-- 账户余额的钱够时，优先花费账户余额中的钱 -->
                  <span class="red">{{(infoData.finanaceAmount>infoData.amount)?infoData.amount:infoData.finanaceAmount | formatMoney}}</span>
                  <span>元</span>
                </p>
              </div>
            </el-checkbox>
          </li>
          <template v-if="!$route.query.appealOrderId">
            <!-- 预付款余额 -->
            <li class="kind-type" v-bind:class="{'kind-type-click':trusteeshipParams.financePreAccount}">
              <el-checkbox :value="trusteeshipParams.financePreAccount" :disabled="!infoData.financePreCanUse">
                <div class="kind-type-title">
                  <img :src="require('@/assets/img/u585.jpg')" width="28px" height="28px">
                  <span class="text">预付款余额</span>
                </div>
                <div class="have-qsf-li clearfix">
                  <span class="balance">可用余额 {{infoData.finanacePreAmount | formatMoney}} 元</span>
                  <!-- 选中时显示 -->
                  <p class="price" v-if="infoData.financePreCanUse">
                    <span class="text">支付</span>
                    <!-- 账户余额的钱不够时，花光账户余额的钱，预付款中的钱补剩余钱款 -->
                    <span class="red">{{(infoData.finanaceAmount>infoData.amount)?0:(infoData.amount-infoData.finanaceAmount).toFixed(2) | formatMoney}}</span>
                    <span>元</span>
                  </p>
                </div>
              </el-checkbox>
            </li>
            <!-- 如果开通了轻松付 -->
            <li class="kind-type" v-if="infoData.hasQuickPay === 1" v-bind:class="{'kind-type-click':trusteeshipParams.easypay}">
              <el-checkbox :value="trusteeshipParams.easypay" :disabled="!infoData.quickPayCanUse">
                <div class="kind-type-title">
                  <img :src="require('@/assets/img/u2336.png')" width="28px" height="28px">
                  <span class="text">轻松付</span>
                </div>
                <div class="have-qsf-li clearfix">
                  <span class="balance">可用余额 {{infoData.quickPayAmount | formatMoney}} 元</span>
                  <!-- 选中时显示 -->
                  <p class="price" v-if="infoData.quickPayCanUse">
                    <span class="text">支付</span>
                    <span class="red">{{infoData.amount | formatMoney}}</span>
                    <span>元</span>
                  </p>
                </div>
              </el-checkbox>
            </li>
            <!-- 如果没开通轻松付 -->
            <li class="kind-type" v-else>
              <el-checkbox disabled>
                <div class="kind-type-title">
                  <img :src="require('@/assets/img/u2336.png')" width="28px" height="28px">
                  <span class="text">轻松付</span>
                </div>
                <span class="no-qsf-li">资金不方便，可以开通“轻松付”哟~
                  <router-link class="blue" to="/myqingju/qsfapply">立即申请</router-link>
                </span>
              </el-checkbox>
            </li>
          </template>
        </ul>
        <el-popover placement="bottom-start" title="支付顺序" width="700" trigger="click">
          <ul class="rules">
            <li>1、如果账户余额不小于支付的金额，则必须使用账户余额付款；</li>
            <li>2、如果账户余额小于支付金额，预存款账户金额足够支付，必须使用账户余额+预存款账户组合方式付款；</li>
            <li>3、如果账户余额为0，预存款账户金额大于支付金额，则必须使用预存款账户付款；</li>
            <li>4、如果账户余额加预存款账户小于支付金额，则或充值或使用轻松付；</li>
            <li>5、如果账户余额为0，预存款金额小于支付金额，轻松付额度不够，则或提额或充值；</li>
          </ul>
          <a href="javascript:;" slot="reference" class="tips">提示：请按照支付顺序支付,
            <i>点击查看</i>
          </a>
        </el-popover>
        <!-- <div class="btn">
          <div class="type-btn">更多支付方式</div>
          <div class="type-btn">增加快捷/网银付款</div>
        </div> -->
        <p class="payment-password-text">
          <span class="text" v-if="infoData.hasPassword">请输入6位支付密码</span>
          <router-link v-has="['lCVNOD']" to="/Setting/accountsecurity/paymentpassword" class="set-password" v-else>请设置密码</router-link>
        </p>
        <div class="password-div">
          <div class="password-lattice J-lattice" @click="pawClick">
            <input type="password" :disabled='!infoData.hasPassword' class="single single-01" maxlength="1" v-model="pwd1" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single single-02" maxlength="1" v-model="pwd2" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single single-03" maxlength="1" v-model="pwd3" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single single-04" maxlength="1" v-model="pwd4" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single single-05" maxlength="1" v-model="pwd5" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single single-06" maxlength="1" v-model="pwd6" autocomplete="off">
            <i class="doted" v-for="(item, index) in 5" :key="index" :class="'single-0'+(index+2)"></i>
          </div>
          <router-link v-has="['lCVNOD']" v-if="infoData.hasPassword" to="/Setting/accountsecurity/forgetpaymentpassword" class="forget-password">忘记密码</router-link>
          <div class="payment-btn">
            <button @click="submitPayment">立即支付</button>
            <span v-if="infoData.amount-(infoData.finanacePreAmount+infoData.finanaceAmount)>0">您还差{{(infoData.amount-(infoData.finanacePreAmount+infoData.finanaceAmount)).toFixed(2) | formatMoney}}元，请先去充值后继续选择支付方式
              <a href="/myqingju/recharge">去充值</a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="main">
      <ul class="type-show">
        <li class="type-show-li border">
          <img src="../../assets/img/u2338.png" alt="" class="icon" width="30px" height="30px"> 微信支付
        </li>
        <li class="type-show-li border">
          <img src="../../assets/img/u2341.jpg" alt="" class="icon" width="30px" height="30px"> 支付宝付
        </li>
        <li class="type-show-li">
          <img src="../../assets/img/u2344.png" alt="" class="icon" width="30px" height="30px"> 银行汇款
        </li>
      </ul>
    </div> -->
    <div class="nopen-div" v-if="infoData.hasQuickPay != 1">
      <img src="@/assets/img/payment-img.jpg" alt="">
      <router-link class="open-btn" to="/myqingju/qsfapply">立即开通申请</router-link>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  data() {
    return {
      active: 0,
      inputBtn: '',
      pwd1: '',
      pwd2: '',
      pwd3: '',
      pwd4: '',
      pwd5: '',
      pwd6: '',
      // 托管参数
      trusteeshipParams: {
        easypay: false,
        financeAccount: false,
        financePreAccount: false,
        orderIds: [],
        payPassword: '',
        payType: 1, // 1代表第一次托管的费用  2代表之后付的每笔费用
        paymentMethod: '', // 支付方式
        projectBaseId: ''
      },
      // 质量申诉付款参数
      ComplaintParams: {
        amount: 0,
        appealKind: '',
        appealType: '',
        cashierDeskId: '',
        content: '',
        files: [],
        payPassword: '',
        projectbaseId: '',
        type: []
      },
      infoData: {},
      locked: false
    }
  },
  methods: {
    // 支付格子的优化
    pawClick() {
      let _this = this
      _this.inputBtn = document.querySelectorAll('.single')
      // 初始化 最后一个有误
      if (this.active === 0) {
        _this.inputBtn[0].focus()
      }
      for (let i = 0, len = _this.inputBtn.length; i < len; i++) {
        _this.inputBtn[i].addEventListener(
          'click',
          function() {
            _this.inputBtn[_this.active].focus()
          },
          false
        )
        _this.inputBtn[i].addEventListener('keyup', this.listenKeyUp, false)
        _this.inputBtn[i].addEventListener(
          'blur',
          function() {
            this.removeEventListener('keyup', this.listenKeyUp, false)
          },
          false
        )
      }
    },
    listenKeyUp(event) {
      if (this.active > 0 && event.keyCode === 8) {
        --this.active
        this.inputBtn[this.active].focus()
      } else if (this.active < 6 && this.inputBtn[this.active].value) {
        ++this.active
        if (this.active < 6) {
          this.inputBtn[this.active].focus()
        }
        // else if (this.active === 6) {
        //   this.submitPayment()
        // }
      } else {
        console.log('error')
      }
    },
    // 提交数据
    submitPayment() {
      if (this.locked) return
      if (!this.trusteeshipParams.easypay && !this.trusteeshipParams.financeAccount && !this.trusteeshipParams.financePreAccount)
        return this.$message.error('请选择支付方式')
      if (this.trusteeshipParams.easypay && this.infoData.quickPayAmount < this.infoData.amount) return this.$message.error('轻松付余额不足')
      this.trusteeshipParams.payPassword = this.pwd1 + this.pwd2 + this.pwd3 + this.pwd4 + this.pwd5 + this.pwd6
      if (this.trusteeshipParams.payPassword.length < 6) return this.$message.error('请输入六位密码')
      // 项目托管的付款方式参数
      let arr = []
      if (this.trusteeshipParams.easypay) arr.push(1)
      if (this.trusteeshipParams.financeAccount) arr.push(2)
      if (this.trusteeshipParams.financePreAccount) arr.push(3)
      this.trusteeshipParams.paymentMethod = arr.join(',')
      this.locked = true
      if (this.$route.query.appealOrderId) {
        // 项目质量申诉金额托管
        this.ComplaintParams.payPassword = this.trusteeshipParams.payPassword
        api
          .projectComplaint(this.ComplaintParams)
          .then(res => {
            this.locked = false
            this.$message.success('付款成功')
            window.opener.location.reload()
            setTimeout(window.close, 1500)
          })
          .catch(err => {
            this.locked = false
            this.$message.error(err.errorMsg)
          })
      } else {
        // 托管项目
        api
          .trusteeship(this.trusteeshipParams)
          .then(res => {
            this.locked = false
            this.$message.success('付款成功')
            window.opener.location.reload()
            setTimeout(window.close, 1500)
          })
          .catch(err => {
            this.locked = false
            this.$message.error(err.errorMsg)
          })
      }
    },
    // 获取账单ID
    GetDeskIdByProejectId() {
      api
        .GetDeskIdByProejectId(this.$route.params.id)
        .then(res => {
          this.trusteeshipParams.orderIds = res.orderIds
          this.trusteeshipParams.payType = res.payType
          // 获取账单信息
          api.Information({ orderIds: res.orderIds }).then(res => {
            this.infoData = res.data
            this.trusteeshipParams.easypay = res.data.quickPayCanUse
            this.trusteeshipParams.financeAccount = res.data.financeCanUse
            this.trusteeshipParams.financePreAccount = res.data.financePreCanUse
          })
        })
        .catch(err => {
          this.$message.error(err.errorMsg)
        })
    }
  },
  mounted() {
    if (this.$route.query.appealOrderId) {
      // 获取申诉账单信息
      api.Information({ orderIds: [this.$route.query.appealOrderId] }).then(res => {
        this.infoData = res.data
        this.trusteeshipParams.financeAccount = true
        this.ComplaintParams = {...this.ComplaintParams,...JSON.parse(sessionStorage.qualityAppealParams)}
        this.ComplaintParams.cashierDeskId = this.$route.query.appealOrderId
        this.ComplaintParams.amount = res.data.amount
      })
    } else {
      this.GetDeskIdByProejectId()
    }
    this.trusteeshipParams.projectBaseId = this.$route.params.id
  }
}
</script>
<style lang="less" scoped>
.counter-header {
  box-shadow: 0 4px 5px #ccc;
  line-height: 42px;
  background-color: #fff;
  .counterier-text {
    color: #333;
    font-size: 18px;
    border-left: 1px solid #333;
    margin-left: 10px;
    padding-left: 10px;
    vertical-align: middle;
  }
}
.part-01 {
  width: 1210px;
  margin: 0 auto;
  .text-01 {
    font-size: 18px;
    color: #333;
    margin-top: 30px;
    margin-bottom: 25px;
    display: inline-block;
  }
  .project-box {
    position: relative;
    .project-name {
      height: 30px;
      .title {
        font-size: 14px;
        color: #666;
        margin-right: 10px;
      }
      .name {
        font-size: 14px;
        color: #333;
      }
    }
    .right-detail {
      position: absolute;
      top: -20px;
      right: 0;
      .li {
        font-size: 14px;
        color: #333;
        height: 30px;
        line-height: 30px;
        .right-detail-number {
          display: inline-block;
          padding-left: 20px;
        }
        .red {
          color: #ff5d5b;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
}
.main {
  width: 1210px;
  margin: 0 auto;
  background-color: #fff;
  .counter-box {
    box-shadow: 0 0 5px #ccc;
    padding: 30px 10px 20px;
    margin-top: 20px;
    .payment-type {
      .kind-type {
        height: 32px;
        line-height: 32px;
        padding: 10px 30px;
        position: relative;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        &:hover {
          box-shadow: 0 0 3px #ccc;
        }
        .kind-type-title {
          display: inline-block;
          margin-left: 20px;
          width: 250px;
          .text {
            font-size: 16px;
            color: #333;
            font-weight: bold;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
        .no-qsf-li {
          display: inline-block;
          font-size: 14px;
          color: #333;
          width: 500px;
          .blue {
            color: #0066cc;
            cursor: pointer;
            &:hover {
              color: #0066ff;
              text-decoration: underline;
            }
          }
        }
        .have-qsf-li {
          display: inline-block;
          width: 830px;
          .balance {
            font-size: 14px;
            color: #333;
            width: 200px;
            display: inline-block;
          }
          .price {
            float: right;
            font-size: 14px;
            color: #333;
            .text {
              margin-right: 10px;
            }
            .red {
              font-size: 18px;
              color: #ff5d5b;
              font-weight: bold;
            }
          }
        }
      }
      .kind-type-click {
        box-shadow: 0 0 3px #b0c2e1;
      }
    }
    .btn {
      margin-top: 20px;
      margin-left: 70px;
      .type-btn {
        display: inline-block;
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #ccc;
        color: #333;
        font-size: 13px;
        background-color: #fff;
        cursor: pointer;
        &:hover {
          color: #0066cc;
          border: 1px solid #0066cc;
        }
      }
      .type-btn + .type-btn {
        margin-left: 20px;
      }
    }
    .payment-password-text {
      font-size: 14px;
      margin-left: 70px;
      margin-top: 50px;
      .text {
        color: #333;
      }
      .set-password {
        color: #0066cc;
      }
    }
  }
  .type-show {
    margin-top: 20px;
    overflow: hidden;
    padding: 30px 0;
    .type-show-li {
      float: left;
      width: 150px;
      position: relative;
      .icon {
        display: inline-block;
        margin-right: 15px;
        margin-left: 20px;
      }
    }
    .border {
      &:after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 20px;
        position: absolute;
        top: 6px;
        right: 0;
        background: url('~@/assets/img/payment-line.png') no-repeat;
      }
    }
  }
}
.nopen-div {
  width: 1210px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 200px;
  position: relative;
  img {
    width: 1210px;
    height: 300px;
  }
  .open-btn {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    letter-spacing: 4px;
    color: #fff;
    background-color: #d8ae64;
    border-radius: 30px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    cursor: pointer;
  }
}
/* 支付格子 */
.password-div {
  margin-top: 10px;
  margin-left: 70px;
  .password-lattice {
    height: 40px;
    border: 1px solid #bcbcbc;
    border-radius: 5px;
    width: 240px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    .doted {
      display: inline-block;
      width: 1px;
      height: 30px;
      background-color: #bcbcbc;
      position: absolute;
      top: 5px;
    }
    input {
      width: 40px;
      height: 38px;
      line-height: 38px;
      float: left;
      text-align: center;
      position: absolute;
      top: 0;
    }
    input:first-child {
      border-top-left-radius: 5px;
    }
    input:nth-of-type(6) {
      border-top-right-radius: 5px;
    }
    .single-01 {
      left: 0;
    }
    .single-02 {
      left: 40px;
    }
    .single-03 {
      left: 80px;
    }
    .single-04 {
      left: 120px;
    }
    .single-05 {
      left: 160px;
    }
    .single-06 {
      left: 200px;
    }
    input:focus {
      border: 1px solid rgba(82, 168, 236, 0.8);
      box-shadow: 0 0 3px rgba(82, 168, 236, 0.8);
      z-index: 1;
    }
  }
  .forget-password {
    font-size: 14px;
    color: #0066cc;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
  }
  .payment-btn {
    margin-top: 20px;
    > button {
      cursor: pointer;
      width: 240px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      background-color: #fc6d6b;
      border-radius: 5px;
    }
    > span {
      font-size: 14px;
      color: #ff5d5b;
      margin-left: 12px;
      > a {
        color: #0066cc;
        margin-left: 5px;
      }
    }
  }
}
.rules {
  > li {
    font-size: 12px;
    line-height: 24px;
  }
}
.tips {
  display: inline-block;
  font-size: 14px;
  margin: 20px 70px 0;
  > i {
    color: #108cee;
  }
}
</style>
