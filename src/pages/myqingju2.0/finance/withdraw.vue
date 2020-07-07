<template>
  <div>
    <div class="apply-withdraw" v-show="!showNext">
      <dl class="withdraw-data clearfix">
        <dt>可提现余额</dt>
        <dd><span style="font-size: 20px;color:#E4393C;">{{canWithdrawMoney | formatMoney}}</span> 元</dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 45px">
        <dt>选择银行卡</dt>
        <dd v-for="(item,index) in userBankCarList" :key="index">
          <label class="cards">
            <input type="radio" style="display: none;" :value="item.id" v-model="userBankCarSel">
            <div>
              <i></i>
              <span class="card-info">
                <!-- <img src="" alt=""> -->{{item.bankName}}</span>
              <span class="card-info">尾号{{item.accNo.substr(-4)}}</span>
              <span class="card-info">持卡人姓名：{{item.userName}}</span>
              <dl class="card-manage">
                <dt>管理<i class="el-icon-arrow-down" style="margin-left: 10px;"></i></dt>
                <dd @click.prevent="updateBankCarDefultStatus(item.id,2)">设为默认</dd>
                <dd @click.prevent="updateBankCarDefultStatus(item.id,0)">删除</dd>
              </dl>
            </div>
          </label>
        </dd>
        <dd style="margin-top: 0;">
          <a class="el-icon-plus" href="javascript:;" @click="gotoAdd">添加银行卡</a>
        </dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 8px;">
        <dt>提现金额</dt>
        <dd>
          <div class="input-data">
            <el-input style="width: 450px;" type="number" v-model="FinanceCash.txnAmt"></el-input> 元
            <p v-show="FinanceCash.txnAmt < 100">提现金额至少100元</p>
          </div>
        </dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 38px;">
        <dt></dt>
        <dd>
          <el-button type="danger" style="width: 450px;" @click="choseData">提交</el-button>
        </dd>
      </dl>
    </div>

    <div class="confirm-withdrawal" v-show="showNext">
      <dl class="withdraw-data clearfix">
        <dt>银行卡信息</dt>
        <dd style="font-size: 24px;">{{FinanceCash.customerNm}}</dd>
        <dd style="line-height: 1;">{{FinanceCash.accBank}}（ {{FinanceCash.accNo.replace(/\d+(\d{4})/, "**** **** **** $1")}} ）</dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 30px;">
        <dt>提现金额</dt>
        <dd><span style="font-size: 20px;color:#E4393C;">{{FinanceCash.txnAmt | formatMoney}}</span> 元</dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 35px;">
        <dt>支付密码</dt>
        <dd>
          <div class="password-div">
            <div class="password-lattice" @click="pawClick">
              <input type="password" class="single single-01" maxlength="1" v-model="pwd1" autocomplete="off">
              <input type="password" class="single single-02" maxlength="1" v-model="pwd2" autocomplete="off">
              <input type="password" class="single single-03" maxlength="1" v-model="pwd3" autocomplete="off">
              <input type="password" class="single single-04" maxlength="1" v-model="pwd4" autocomplete="off">
              <input type="password" class="single single-05" maxlength="1" v-model="pwd5" autocomplete="off">
              <input type="password" class="single single-06" maxlength="1" v-model="pwd6" autocomplete="off">
              <i class="doted" v-for="(item, index) in 5" :key="index" :class="'single-0'+(index+2)"></i>
            </div>
            <router-link v-if="hasPwd" v-has="['lCVNOD']" to="/Setting/accountsecurity/forgetpaymentpassword" class="forget-password">忘记密码</router-link>
            <router-link v-else v-has="['lCVNOD']" to="/Setting/accountsecurity/paymentpassword" class="forget-password">设置密码</router-link>
          </div>
        </dd>
        <dd>
          <el-button type="danger" style="width: 242px;" @click="saveCash">确认提现</el-button>
        </dd>
      </dl>
    </div>

    <el-dialog title="提示" :visible.sync="saveCashDialogVisible" width="600px" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
      <p style="color:#555555;font-size:18px;font-weight:bold;">提现申请已经提交，等待处理。</p>
      <p style="color:#888888;">如果银行信息填写错误，导致提现失败，资金会自动退还到您的账户。</p>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" style="width: 100px;" size="small" @click="saveCashDialogVisible = false">我知道了</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="addBankCardDialogVisible" width="600px">
      <p style="color:#555555;font-size:18px;font-weight:bold;">申请提款必须完成实名认证。</p>
      <p style="color:#888888;">实名认证后不可更改，不可解除！且持卡人姓名需与实名认证姓名一致！</p>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" style="width: 100px;" size="small" @click="$router.push('/Setting/userAttestation/personage')">去认证</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import api from '@/fetch/api'

export default {
  data() {
    return {
      showNext: false,
      saveCashDialogVisible: false,
      addBankCardDialogVisible: false,
      active: 0,
      userBankCarList: [],
      userBankCarSel: '',
      inputBtn: '',
      pwd1: '',
      pwd2: '',
      pwd3: '',
      pwd4: '',
      pwd5: '',
      pwd6: '',
      infoData: {},
      locked: false,
      FinanceCash: {
        accBank: '', // 开户行
        accNo: '', // 卡号
        cardType: '', // 银行卡类型
        customerNm: '', // 持卡人姓名
        txnAmt: '', // 金额
        payPassword: '' // 支付密码
      },
      hasPwd: false
    }
  },
  computed: {
    canWithdrawMoney: function() {
      return (this.infoData.financeAccountTotal - this.infoData.financePaidAmount).toFixed(2)
    }
  },
  methods: {
    gotoAdd() {
      if (this.$store.state.userInfo.authType == '0') return (this.addBankCardDialogVisible = true)
      this.$router.push('/myqingju/addBankCard')
    },
    // 获取可提现余额
    FinanceInformation() {
      api.FinanceInformation(JSON.parse(window.localStorage.QingjuuserId)).then(res => {
        this.$store.commit('setFinanceData', res.data)
        this.infoData = res.data
      })
    },
    // 选择银行卡并输入金额提交
    choseData() {
      if (!this.userBankCarSel) return this.$message('请添加并选择银行卡')
      if (this.FinanceCash.txnAmt < 100) return this.$message('提现金额至少100元')
      if (this.FinanceCash.txnAmt > this.canWithdrawMoney - 0) return this.$message('提现金额不能大于余额')
      let bankSel = this.userBankCarList.find(item => item.id === this.userBankCarSel)
      this.FinanceCash.accBank = bankSel.bankName + bankSel.accBank
      this.FinanceCash.accNo = bankSel.accNo
      this.FinanceCash.customerNm = bankSel.userName
      this.FinanceCash.cardType = bankSel.cardType
      this.showNext = true
    },
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
      } else {
        console.log('error')
      }
    },
    // 确认提现
    saveCash() {
      this.FinanceCash.payPassword = this.pwd1 + this.pwd2 + this.pwd3 + this.pwd4 + this.pwd5 + this.pwd6
      if (this.FinanceCash.payPassword.length < 6) return this.$message.error('请输入六位密码')
      api
        .saveCash(this.FinanceCash)
        .then(res => {
          this.showNext = false
          this.saveCashDialogVisible = true
          this.pwd1 = this.pwd2 = this.pwd3 = this.pwd4 = this.pwd5 = this.pwd6 = ''
          this.FinanceCash.txnAmt = ''
          this.FinanceInformation()
        })
        .catch(err => {
          this.$message.error(err.errorMsg)
        })
    },
    // 设为默认或删除
    updateBankCarDefultStatus(id, status) {
      api.updateBankCarDefultStatus({ id, status }).then(res => {
        this.$message.success(res.errorMsg)
        this.getUserBankCarList()
      })
    },
    // 获取用户银行卡列表
    getUserBankCarList() {
      api.getUserBankCarList().then(res => {
        this.userBankCarList = res.dataList
        if (res.dataList.length) this.userBankCarSel = res.dataList[0].id
      })
    }
  },
  mounted() {
    if (Object.keys(this.$store.state.financeData).length === 0) {
      this.FinanceInformation()
    } else {
      this.infoData = this.$store.state.financeData
    }
    this.getUserBankCarList()
    api.hasPassword().then(res => (this.hasPwd = res.hasPassword))
  }
}
</script>

<style lang="less" scoped>
.apply-withdraw,
.confirm-withdrawal {
  width: 100%;
  padding: 40px 38px;
  box-sizing: border-box;
  .withdraw-data {
    line-height: 40px;
    > dt {
      width: 70px;
      float: left;
    }
    > dd {
      margin-left: 88px;
      & + dd {
        margin-top: 20px;
      }
      .cards {
        > input[type='radio']:checked + div {
          background-color: rgba(242, 242, 242, 1);
          > i {
            border: 0 none;
            background: rgba(0, 153, 102, 1);
          }
        }
        > div {
          padding: 0 16px;
          display: flex;
          align-items: center;
          border: 1px solid rgba(232, 236, 240, 1);
          border-radius: 2px;
          position: relative;
          > i {
            display: block;
            box-sizing: border-box;
            width: 14px;
            height: 14px;
            border: 1px solid rgba(139, 139, 139, 1);
            border-radius: 50%;
            position: relative;
            &::before {
              content: '';
              display: block;
              width: 4px;
              height: 4px;
              background-color: rgba(255, 255, 255, 1);
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }

          .card-info {
            margin: 0 20px;
            vertical-align: middle;
            > img {
              display: inline-block;
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
        }
        .card-manage {
          width: 80px;
          position: absolute;
          right: 16px;
          top: 8px;
          line-height: 25px;
          color: #03b189;
          &:hover {
            z-index: 1;
            background-color: #fff;
            border: 1px solid rgba(204, 204, 204, 1);
            box-shadow: 0px 1px 5px 0px rgba(129, 130, 130, 0.35);
            border-radius: 2px;
            > dd {
              display: block;
            }
          }
          > dt,
          > dd {
            padding-left: 11px;
            &:hover {
              color: #fff;
              background-color: #03b189;
            }
          }
          > dd {
            display: none;
            cursor: pointer;
          }
        }
      }
      .input-data {
        > p {
          font-size: 12px;
          color: #d71818;
          line-height: 1;
          margin-top: 9px;
        }
      }
    }
  }
}
.password-div {
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
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
  }
}
</style>
