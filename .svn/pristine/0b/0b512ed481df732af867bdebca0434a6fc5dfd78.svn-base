<template>
  <div>
    <div class="apply-withdraw" v-show="!showNext">
      <dl class="withdraw-data clearfix">
        <dt>可结算金额</dt>
        <dd><span style="font-size: 20px;color:#E4393C;">{{(infoData.rewardUserHaveAmount - Number(applyAmountData)) | formatMoney}}</span> 元</dd>
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
          <router-link class="el-icon-plus" to="/myqingju/addBankCard">添加银行卡</router-link>
        </dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 8px;">
        <dt>结算类型</dt>
        <dd>
          <el-radio-group v-model="FinanceCash.balanceType">
            <el-radio label="1">提供发票</el-radio>
            <el-radio label="2">代扣税点</el-radio>
          </el-radio-group>
          <div class="bill-addr" ref="billTxt" v-if="FinanceCash.balanceType == 1">
            <p class="tip-text">
              <img src="../../../assets/img/sprite-tip.png" alt="" style="margin-right: 10px;">注意事项</p>
            <p>请在邮寄发票时，快递单上备注您的结算编号：<b style="color: #f00;font-size: 18px;">{{FinanceCash.banlanceNum}}</b></p>
            <p><b class="tip-bill-title">发票寄地地址：</b>北京市海淀区 三环以内 外文文化创意园12号楼A区3层    青矩运营部    18612689969  </p>
            <span class="bill-btn" @click="downBillClick">点击下载邮寄信息</span>
          </div>
        </dd>
      </dl>
      <!-- <dl class="withdraw-data clearfix" style="margin-top: 8px;">
        <dt>结算编号</dt>
        <dd>
          {{FinanceCash.banlanceNum}}
        </dd>
      </dl> -->
      <dl class="withdraw-data clearfix" style="margin-top: 16px;">
        <dt>结算金额</dt>
        <dd>
          <div class="input-data">
            <el-input style="width: 450px;" type="number" v-model="FinanceCash.applyAmount"></el-input> 元
            <!-- <p v-show="FinanceCash.applyAmount < 100">结算金额至少100元</p> -->
          </div>
          <p class="tip" v-if="FinanceCash.balanceType == 1">当收到您提供的发票后，预计5个工作日内到账。</p>
          <p class="tip" v-else>预计5个工作日内到账，代扣税点¥{{(FinanceCash.applyAmount * holdTaxPercentInfo | formatMoney).toFixed(2)}}元。</p>
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
        <dt>结算类型</dt>
        <dd>{{FinanceCash.balanceType == '1' ? '提供发票' : '代扣税点'}}</dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 30px;" v-if="FinanceCash.balanceType == 1">
        <dt>结算编号</dt>
        <dd>{{FinanceCash.banlanceNum}}</dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 30px;" v-else>
        <dt>代扣税点</dt>
        <dd>{{FinanceCash.applyAmount * 0.06 | formatMoney}}</dd>
      </dl>
      <dl class="withdraw-data clearfix" style="margin-top: 30px;">
        <dt>结算金额</dt>
        <dd><span style="font-size: 20px;color:#E4393C;">{{FinanceCash.applyAmount | formatMoney}}</span> 元</dd>
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
          <el-button type="danger" style="width: 242px;" @click="saveCash">确认结算</el-button>
        </dd>
      </dl>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="600px" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
      <p style="color:#555555;font-size:18px;font-weight:bold;">结算申请已经提交，等待处理。</p>
      <p style="color:#888888;">如果银行信息填写错误，导致结算失败，资金会自动退还到您的账户。</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$router.replace('/myqingju/bonus')">我知道了</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import api from "@/fetch/api";

export default {
  data() {
    return {
      holdTaxPercentInfo: 0,
      showNext: false,
      dialogVisible: false,
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
        accBank: "",  // 开户行
        accNo: "",  // 卡号
        // cardType: "", // 银行卡类型
        customerNm: "",  // 持卡人姓名
        applyAmount: '',  // 金额
        balanceType: '1', // 默认提供发票为1,代扣税点为2 ,
        bankName: '', // 选择银行 ,
        password: '',  // 支付密码
        banlanceNum: ''
      },
      hasPwd: false,
      applyAmountData: 0
    }
  },
  watch: {
    'FinanceCash.applyAmount': function (val) {
      if (!val) {
        this.$message.error('结算金额不能为空')
        this.applyAmountData = 0
      } else if (isNaN(val) || val <= 0) {
        this.$message.error('结算金额为数字且大于0')
        this.applyAmountData = 0
      } else if (val > this.infoData.rewardUserHaveAmount) {
        this.$message.error('结算金额不能大于余额')
        this.applyAmountData = 0
      } else {
        return val;
      }
    }
  },
  // computed: {
  //   'applyAmountData': function () {
  //     if (!this.FinanceCash.applyAmount) {
  //       this.$message.error('结算金额不能为空')
  //       return 0;
  //     } else if (isNaN(this.FinanceCash.applyAmount) || this.FinanceCash.applyAmount <= 0) {
  //       this.$message.error('结算金额为数字且大于0')
  //       return 0;
  //     } else if (this.FinanceCash.applyAmount > this.infoData.rewardUserHaveAmount) {
  //       this.$message.error('结算金额不能大于余额')
  //       return 0;
  //     } else {
  //       return this.FinanceCash.applyAmount;
  //     }
  //   }
  // },
  methods: {
    downBillClick () {
      let content = `请在邮寄发票时，快递单上备注您的结算编号${this.FinanceCash.banlanceNum}
      发票寄地地址：北京市海淀区 三环以内 外文文化创意园12号楼A区3层    青矩运营部    18612689969
      `
      // 创建隐藏的可下载链接
      var eleLink = document.createElement('a');
      eleLink.download = '公司发票信息.txt';
      eleLink.style.display = 'none';
      // 字符内容转变成blob地址
      var blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    // 获取可结算余额
    getCurrentUserRewardInfo() {
      api.getCurrentUserRewardInfo().then(res => {
        this.infoData = res.dataList[0]
      })
    },
    // 选择银行卡并输入金额提交
    choseData() {
      if (!this.userBankCarSel) return this.$message('请添加并选择银行卡')
      if (!this.FinanceCash.balanceType) return this.$message('请选择结算类型')
      if (!this.FinanceCash.applyAmount) return this.$message('请输入结算金额')
      if (isNaN(this.FinanceCash.applyAmount) || Number(this.FinanceCash.applyAmount) <= 0) return this.$message('结算金额为数字且大于0')
      if (this.FinanceCash.applyAmount > this.infoData.rewardUserHaveAmount) return this.$message('结算金额不能大于余额')
      let bankSel = this.userBankCarList.find(item => item.id === this.userBankCarSel)
      this.FinanceCash.accBank = bankSel.bankName + bankSel.accBank
      this.FinanceCash.bankName = bankSel.bankName
      this.FinanceCash.accNo = bankSel.accNo
      this.FinanceCash.customerNm = bankSel.userName
      // this.FinanceCash.cardType = bankSel.cardType
      this.showNext = true
    },
    // 支付格子的优化
    pawClick() {
      let _this = this
      _this.inputBtn = document.querySelectorAll('.single')
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
      } else {
        console.log('error')
      }
    },
    // 确认结算
    saveCash() {
      this.FinanceCash.password = this.pwd1 + this.pwd2 + this.pwd3 + this.pwd4 + this.pwd5 + this.pwd6
      if (this.FinanceCash.password.length < 6) return this.$message.error('请输入六位密码')
      api.rewardBalanceApplySubmit(this.FinanceCash).then(res => {
        // this.showNext = false
        this.dialogVisible = true
        // this.pwd1 = this.pwd2 = this.pwd3 = this.pwd4 = this.pwd5 = this.pwd6 = ''
        // this.FinanceCash.applyAmount = ''
        this.getCurrentUserRewardInfo()
      }).catch(err => {
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
    },
    addBalanceNumber () {
      api.addBalanceNumber().then(res => {
        this.FinanceCash.banlanceNum = res.dataList[0]
      })
    }
  },
  mounted() {
    this.getCurrentUserRewardInfo()
    this.addBalanceNumber()
    this.getUserBankCarList()
    api.hasPassword().then(res => this.hasPwd = res.hasPassword)
    api.getWithHoldTaxPercentInfo().then(res => {
      this.holdTaxPercentInfo = res.dataList[0]
    })
  }
}

</script>

<style lang="less" scoped>
.bill-addr{
  background-color: rgba(242, 242, 242, 1);
  font-size: 14px;
  line-height: 32px;
  padding: 10px 20px;
  color: #666666;
  position: relative;
  width: 80%;
  min-width: 800px;
  .tip-text{
    color: #FF6633;
    margin-bottom: 10px;
  }
  .tip-bill-title{
    color: #000;
    font-size: 16px;
  }
  .bill-btn{
    color: #fff;
    display: inline-block;
    padding: 0 10px;
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: #333;
    cursor: pointer;
  }
}
.apply-withdraw,
.confirm-withdrawal {
  width: 100%;
  padding: 40px 38px;
  box-sizing: border-box;
  .withdraw-data {
    line-height: 40px;
    > dt {
      width: 100px;
      float: left;
    }
    > dd {
      margin-left: 100px;
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
      .tip{
        font-size: 12px;
        color: #999;
        line-height: 1;
        margin-top: 9px;
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
.info-block{}
</style>
