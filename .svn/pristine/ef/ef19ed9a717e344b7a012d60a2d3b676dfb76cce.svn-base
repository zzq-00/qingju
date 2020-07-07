<template>
  <div class="company-page">
    <header-register :names='pageName' name2='个人注册'></header-register>
    <div class="company-main">
      <div class="company-conter">
        <div class="step-bar">
          <div class="one-line clearfix">
            <span :class="{current:step==1}" style="margin-left:50px">1</span>
            <img src="@/assets/img/process.png" alt="" style="margin:20px 39px 0 40px">
            <span :class="{current:step==2}">2</span>
            <img src="@/assets/img/process.png" alt="" style="margin:20px 29px 0 40px">
            <span :class="{current:step==3}">3</span>
          </div>
          <div class="two-line">
            <span>验证手机号</span>
            <span>填写公司信息</span>
            <span>注册完成</span>
            <div style="clear:both"></div>
          </div>
        </div>
        <companyRegisterOne @oneData="oneData" v-if="step==1"></companyRegisterOne>
        <companyRegisterTwo @twoData="twoData" v-if="step==2"></companyRegisterTwo>
        <div class="step-four" v-if="step==4">
          <div class="box" v-if="auditStatus==1">
            <img src="@/assets/img/successR.png" alt="">
            <p class="box-p-one">资料提交成功</p>
            <p class="box-p-two">您已经成功提交资料等信息，1~7个工作日内予以审核，请耐心等待
              <span @click="goBack">返回首页</span>
            </p>
          </div>
          <div class="box" v-if="auditStatus==2">
            <img src="@/assets/img/errorR.png" alt="">
            <p class="box-p-one">资料审核失败</p>
            <p class="box-p-two">您因{{reasonForRejection}}没有办法通过审核,请重新提交.
              <span @click="reapply">重新申请</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <companyRegisterThree @emitStep="emitStep" v-if="step==3"></companyRegisterThree>

  </div>
</template>
<script>
import headerRegister from '@/components/registerHeaderComponent'
import companyRegisterOne from './companyRegisterOne'
import companyRegisterTwo from './companyRegisterTwo'
import companyRegisterThree from './companyRegisterThree'
import api from '@/fetch/api'

export default {
  components: {
    headerRegister,
    companyRegisterOne,
    companyRegisterTwo,
    companyRegisterThree
  },
  data() {
    return {
      pageName: '企业注册',
      step: this.$route.query.step,
      // step: 4,
      registerData: {
        phone: '', //手机号
        verificationCode: '', //验证码
        email: '', //注册邮箱
        password: '', //密码
        companyName: '', //企业名称
        taxNumber: '', //纳税人识别号 ,
        registeredAddress: '', //注册地址 ,
        registrationCall: '', //注册电话 ,
        bank: '', //开户银行 ,
        bankAccount: '', //银行账号 ,
        businessFileId: [] //营业执照附件信息 ,
      },
      auditStatus: '', //审核中
      reasonForRejection: '' //驳回原因
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.step = val.query.step
        if (val.query.auditStatus) {
          this.auditStatus = val.query.auditStatus
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    goBack() {
      this.$router.push('/login')
    },
    reapply() {
      this.$router.push({ path: '/register/company', query: { step: 1 } })
      this.$route.query.step = 1
    },
    oneData(data) {
      this.registerData.account = data.account
      this.registerData.phone = data.mobile
      this.registerData.verificationCode = data.code
      this.registerData.email = data.email
      this.registerData.password = data.password
      this.$router.push({ path: '/register/company', query: { step: 2 } })
    },
    twoData(data) {
      this.registerData.companyName = data.name
      this.registerData.taxNumber = data.identificationCode
      this.registerData.registeredAddress = data.address
      this.registerData.registrationCall = data.phone
      this.registerData.bank = data.bank
      this.registerData.bankAccount = data.bankAccount.replace(/\s*/g, '')
      this.registerData.businessFileId = data.businessFileId
      if (this.registerData.phone == '') {
        let oneData = JSON.parse(window.localStorage.oneData)
        this.registerData.phone = oneData.mobile
        this.registerData.verificationCode = oneData.code
        this.registerData.email = oneData.email83
        this.registerData.password = oneData.password
      }
      api
        .authcompanyRegistration(this.registerData)
        .then(res => {
          this.$router.push({ path: '/register/company', query: { step: 3 } })
        })
        .catch(res => {
          this.$message.error({ message: res.errorMsg })
        })
    },
    emitStep(data) {
      this.$router.push({ path: '/register/company', query: { step: 4, auditStatus: 1 } })
    }
  },
  mounted() {
    if (this.$route.query.auditStatus) {
      this.auditStatus = this.$route.query.auditStatus
    }
    if (this.$route.query.auditStatus == 2) {
      this.reasonForRejection = this.$route.query.reasonForRejection
    }
  }
}
</script>
<style lang="less" scoped>
.company-page {
  background-color: #fff;
  position: relative;
  .company-main {
    min-height: ~'calc(100vh - 60px)';
    .company-conter {
      width: 500px;
      padding-top: 62px;
      margin: 0 auto;
      .step-bar {
        margin-bottom: 57px;
        .one-line {
          span {
            box-sizing: border-box;
            float: left;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: rgba(3, 177, 137, 1);
            border-radius: 50%;
            color: #fff;
            font-size: 18px;
            font-weight: 400;
          }
          img {
            float: left;
          }
          .current {
            background: #fff;
            border: 1px solid rgba(204, 204, 204, 1);
            color: #333333;
          }
        }
        .two-line {
          margin-top: 22px;
          span {
            float: left;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          span:nth-child(1) {
            margin-left: 38px;
            margin-right: 102px;
            width: 70px;
          }
          span:nth-child(2) {
            width: 84px;
            margin-right: 101px;
          }
        }
      }
      .step-four {
        text-align: center;
        .box {
          img {
            width: 50px;
            height: 50px;
            margin-bottom: 34px;
          }
          .box-p-one {
            height: 24px;
            font-size: 24px;
            font-weight: bold;
            color: rgba(112, 112, 112, 1);
            line-height: 24px;
            margin-bottom: 69px;
          }
          .box-p-two {
            font-size: 14px;
            font-weight: 400;
            color: rgba(136, 136, 136, 1);
            line-height: 28px;
            span {
              display: inline-block;
              cursor: pointer;
              margin-left: 17px;
              width: 56px;
              height: 14px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(0, 179, 138, 1);
            }
          }
        }
      }
    }
  }
}
</style>
