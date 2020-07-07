<template>
  <div class="counter-container">
    <div class="counter-header">
      <div class="main">
        <img :src="require('@/assets/logo.png')" alt="" class="counter-img">
        <span class="counterier-text">| 收银台</span>
        <!-- <div class="right-header">
          <span class="name">用户名</span>
          <span class="exit">退出</span>
        </div> -->
      </div>
    </div>
    <div class="part-01">
      <span class="text-01">请您尽快付款！</span>
    </div>
    <div class="main">
      <div class="counter-box">
        <ul class="payment-type">
          <!-- 账户余额 -->
          <li class="kind-type" @click="params.payType = 1" v-bind:class="{'kind-type-click':params.payType == 1}">
            <i class="selected"></i>
            <div class="kind-type-title">
              <img :src="require('@/assets/img/u2320.png')" class="icon" width="28px" height="28px">
              <span class="text">账户余额</span>
            </div>
            <div class="have-qsf-li">
              <span class="balance">可用余额 {{infoData.finanaceAmount}} 元</span>
              <!-- 选中时显示 -->
              <p class="price" v-if="params.payType == 1">
                <span class="text">支付</span>
                <span class="red">{{infoData.amount}}</span>
                元
              </p>
            </div>
          </li>
        </ul>
        <!-- <div class="btn">
          <div class="type-btn" @click="morePayClick" v-if="show.morePayBtn">更多支付方式</div>
          <div class="type-btn" @click="addOtherPayClick">增加快捷/网银付款</div>
        </div> -->
        <p class="payment-password-text">
          <span class="text" v-if="infoData.hasPassword">请输入6位支付密码</span>
          <router-link v-has="['lCVNOD']" to="/Setting/accountsecurity/paymentpassword" class="set-password" v-else>请设置密码</router-link>
        </p>
        <div class="password-div">
          <div class="password-lattice J-lattice" @click="pawClick">
            <input type="password" :disabled='!infoData.hasPassword' class="single-01" maxlength="1" v-model="pwd1" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single-02" maxlength="1" v-model="pwd2" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single-03" maxlength="1" v-model="pwd3" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single-04" maxlength="1" v-model="pwd4" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single-05" maxlength="1" v-model="pwd5" autocomplete="off">
            <input type="password" :disabled='!infoData.hasPassword' class="single-06" maxlength="1" v-model="pwd6" autocomplete="off">
            <i class="doted" v-for="(item, index) in 5" :key="index" :class="'single-0'+(index+2)"></i>
          </div>
          <router-link v-has="['lCVNOD']" v-if="infoData.hasPassword" to="/Setting/accountsecurity/forgetpaymentpassword" class="forget-password">忘记密码</router-link>
          <div class="payment-btn">
            <el-button type="info" @click="submitPayment">确定</el-button>
            <el-button type="info" plain @click="windowClose">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="main">
      <ul class="type-show">
        <li class="type-show-li border">
          <img :src="require('@/assets/img/u2338.png')" alt="" class="icon" width="30px" height="30px"> 微信支付
        </li>
        <li class="type-show-li border">
          <img :src="require('@/assets/img/u2341.jpg')" alt="" class="icon" width="30px" height="30px"> 支付宝付
        </li>
        <li class="type-show-li">
          <img :src="require('@/assets/img/u2344.png')" alt="" class="icon" width="30px" height="30px"> 银行汇款
        </li>
      </ul>
    </div> -->
    <payment-box v-if="otherPay" @closeClick='closeClick'></payment-box>
  </div>
</template>
<script>
import api from "@/fetch/api";

export default {
  data() {
    return {
      active: 0,
      inputBtn: '',
      show: {
        morePayBtn: true
      },
      otherPay: false, // 增加其他付款方式
      pwd1: '',
      pwd2: '',
      pwd3: '',
      pwd4: '',
      pwd5: '',
      pwd6: '',
      // 付款参数
      params: {
        deskId: '',
        payPassword: '',
        payType: 1,
      },
      infoData: {},
      locked: false
    }
  },
  methods: {
    windowClose() {
      window.close()
    },
    addOtherPayClick() {
      this.otherPay = true
    },
    closeClick() {
      this.otherPay = false
    },
    morePayClick() {
      this.show.morePayBtn = false
    },
    // 支付格子的优化
    pawClick() {
      let _this = this
      _this.inputBtn = document.querySelectorAll('input')
      // 初始化 最后一个有误
      if (this.active === 0) {
        _this.inputBtn[0].focus();
      }
      for (let i = 0, len = _this.inputBtn.length; i < len; i++) {
        _this.inputBtn[i].addEventListener('click', function () {
          _this.inputBtn[_this.active].focus();
        }, false)
        _this.inputBtn[i].addEventListener('keyup', this.listenKeyUp, false)
        _this.inputBtn[i].addEventListener('blur', function () { this.removeEventListener('keyup', this.listenKeyUp, false); }, false)
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
      // for (let i = 0, len = this.inputBtn.length; i < len; i++) {
      //   if (this.inputBtn[i].value) {
      //     this.params.payPassword += this.inputBtn[i].value
      //   } else {
      //     this.$message.error('请输入六位密码')
      //     this.params.payPassword = ''
      //     return false
      //   }
      // }
      if (this.locked) return
      this.locked = true
      this.params.payPassword = this.pwd1 + this.pwd2 + this.pwd3 + this.pwd4 + this.pwd5 + this.pwd6
      if (this.params.payPassword.length < 6) return this.$message.error('请输入六位密码')
      api.repayment(this.params).then(res => {
        this.locked = false
        this.$message.success('付款成功', )
        window.opener.location.reload();
        setTimeout(window.close, 1500)
      }).catch(err => {
        this.locked = false
        this.$message.error(err.errorMsg)
      })
    },
    Information() {
      api.Information({ orderIds: [this.params.deskId] }).then(res => this.infoData = res.data)
    }
  },
  mounted() {
    this.params.deskId = this.$route.params.id
    this.Information()
  }
}
</script>
<style lang="less" scoped>
.counter-header {
  box-shadow: 0 4px 5px #ccc;
  line-height: 42px;
  background-color: #fff;
  .main-header {
    width: 1210px;
    margin: 0 auto;
  }
  .counter-img {
    width: 95px;
    height: 40px;
  }
  .counterier-text {
    font-size: 18px;
    color: #333;
  }
  .right-header {
    float: right;
    font-size: 14px;
    .name {
      color: #666;
    }
    .exit {
      color: #0066cc;
      margin-left: 20px;
    }
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
      right: 0;
      top: -20px;
      width: 200px;
      .li {
        font-size: 14px;
        color: #333;
        height: 30px;
        line-height: 30px;
        .right-detail-number {
          display: inline-block;
          width: 100px;
          text-align: right;
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
    padding: 30px 10px 150px;
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
        .selected {
          display: inline-block;
          width: 10px;
          height: 10px;
          line-height: 10px;
          text-align: center;
          border-radius: 50%;
          background-color: #f0f0f0;
          border: 1px solid #b3b3b3;
          padding: 2px;
          position: relative;
          top: 2px;
        }
        .kind-type-title {
          display: inline-block;
          margin-left: 30px;
          width: 250px;
          .icon {
            display: inline-block;
            margin-right: 5px;
          }
          .text {
            font-size: 16px;
            color: #333;
            font-weight: bold;
          }
        }
        .balance {
          font-size: 14px;
          color: #333;
          width: 200px;
          display: inline-block;
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
        }
        .price {
          position: absolute;
          right: 50px;
          top: 10px;
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
      .kind-type-click {
        box-shadow: 0 0 3px #b0c2e1;
        .selected {
          &:after {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            background-color: #a7a7a7;
            border-radius: 50%;
          }
        }
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
        background: url('../../../assets/img/payment-line.png') no-repeat;
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
  }
}
</style>
