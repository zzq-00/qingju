<template>
  <div class="forget-page">
    <header-register></header-register>
    <div class="forget-main">
      <p class="main-title">确认账号</p>
      <div class="main-center">
        <input type="text" placeholder="请输入账号/手机号/邮箱" v-model="account">
        <p class="inputtips">{{tips}}</p>
        <div class="ways">
          <span class="ways-spans">找回方式:</span>
          <span @click="mobileRetrieve" v-if="isTel"><img src="../../assets/img/check.png" alt="" v-if="isM"><img src="../../assets/img/nocheck.png" alt="" v-else>手机找回</span>
          <span @click="emailRetrieve" v-if="isEmail"><img src="../../assets/img/check.png" alt="" v-if="!isM"><img src="../../assets/img/nocheck.png" alt="" v-else>邮箱找回</span>
          <span v-if="!isTel&&!isEmail" style="color:red">没有绑定手机和邮箱的账号不能进行密码找回，请联系平台管理员</span>
        </div>
        <button class="next-btn" @click="gotoNext">下 一 步</button>
        <p class="small-tips">无法认证？请<span @click="gotoContact">联系平台客服</span>重置密码</p>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{changeTips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="retrieve">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/fetch/api'
import headerRegister from '@/components/forgetHeaderComponent'
export default {
  components: {
    headerRegister
  },
  data() {
    return {
      tips: '', //输入框提示
      isM: true, //是否是手机找回,默认是
      account: '',
      http: process.env.API_ROOT,
      isTel: true, //手机找回方式是否存在
      isEmail: true, //邮箱找回方式是否存在
      sendMail: '', //邮箱找回方式的邮箱账号
      sendPhone: '', //手机找回方式的手机账号
      dialogVisible: false,
      changeTips: ''
    }
  },
  watch: {
    account(val, oldVal) {
      if (val) {
        this.tips = ''
        this.isTel = true
        this.isEmail = true
      }
    }
  },
  methods: {
    judgeAccount() {
      if (this.account) {
        api
          .retrievePasswordCheck({ accountNumber: this.account })
          .then(res => {
            if (res.dataList[0].email) {
              this.isEmail = true
              this.sendMail = res.dataList[0].email
            } else {
              this.isEmail = false
            }
            if (res.dataList[0].phone) {
              this.isTel = true
              this.isM = true
            } else {
              this.isTel = false
              this.isM = false
            }
          })
          .catch(res => {
            this.tips = res.errorMsg
          })
      }
    },
    gotoContact() {
      this.$router.push('/info/Contact')
    },
    gotoNext() {
      if (!this.account) {
        this.tips = '请输入账号/手机号/邮箱'
      } else {
        api
          .retrievePasswordCheck({ accountNumber: this.account })
          .then(res => {
            if (res.dataList[0].email) {
              this.isEmail = true
              this.sendMail = res.dataList[0].email
            } else {
              this.isEmail = false
            }
            if (res.dataList[0].phone) {
              this.isTel = true
              this.sendPhone = res.dataList[0].phone
            } else {
              this.isTel = false
            }
            if (this.isTel && !this.isEmail) {
              this.changeTips = '该账号只绑定手机号码，请通过手机找回'
              this.dialogVisible = true
              this.isM = true
            }
            if (!this.isTel && this.isEmail) {
              this.changeTips = '该账号只绑定邮箱，请通过邮箱找回'
              this.dialogVisible = true
              this.isM = false
            }
            if (this.isTel && this.isEmail) {
              this.changeTips = ''
              this.retrieve()
            }
          })
          .catch(res => {
            this.tips = res.errorMsg
          })
      }
    },
    retrieve() {
      this.dialogVisible = false
      let data = {
        account: this.account,
        mode: ''
      }
      if (this.isM) {
        data.mode = '1'
      } else {
        data.mode = '2'
      }
      api
        .retrieveDverifyMessage(data)
        .then(res => {
          if (res.errorCode == '200') {
            if (this.isM) {/* , query: { mobile: this.sendPhone } */
              this.$router.push({ path: '/mobileForget/'+this.sendPhone })
            } else {
              let datas = {
                receiverUsername: this.sendMail,
                mailContent: (this.http.indexOf('/api') != -1 ? this.http.replace('/api', '') : this.http) + 'reset?email=' + this.sendMail,
                mailTitle: '找回密码'
              }
              api.sendMail(datas).then(res => {})/* , query: { email: this.sendMail }  */
              this.$router.push({ path: '/emailForget/' + this.sendMail})
            }
          }
        })
        .catch(res => {
          this.tips = res.errorMsg
        })
    },
    judge() {
      if (this.isTel && this.isEmail) {
        this.isM = !this.isM
      }
    },
    mobileRetrieve() {
      this.judge()
    },
    emailRetrieve() {
      this.judge()
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.forget-page {
  .forget-main {
    height: ~'calc(100vh - 60px)';
    background-color: #fff;
    .main-title {
      height: 28px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin: 0px 0 40px 0;
      padding-top: 82px;
    }
    .main-center {
      margin: 0 auto;
      width: 500px;
      input {
        width: 472px;
        height: 16px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 2px;
        padding: 17px 11px 17px 17px;
      }
      .inputtips {
        height: 12px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(215, 24, 24, 1);
        margin: 9px 0 36px 0;
      }
      .ways {
        font-size: 14px;
        height: 16px;
        line-height: 16px;
        vertical-align: middle;
        margin-bottom: 59px;
        .ways-spans {
          margin-right: 21px;
        }
        span:nth-child(2) {
          margin-right: 43px;
        }
        img {
          width: 16px;
          height: 16px;
          vertical-align: middle;
          cursor: pointer;
          margin-right: 8px;
        }
      }
      .next-btn {
        width: 500px;
        height: 50px;
        background: rgba(3, 177, 137, 1);
        border-radius: 2px;
        color: #ffffff;
        cursor: pointer;
      }
      .next-btn:hover {
        background: #21a57e;
      }
      .small-tips {
        height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 19px;
        span {
          color: #03b189;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
