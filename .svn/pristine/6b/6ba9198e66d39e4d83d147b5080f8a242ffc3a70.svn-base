<template>
  <div>
    <div class="qsf-bg" v-if="quickPayStatus === '0'">
      <img src="@/assets/img/qsf-bg.png" alt="" width="100%">
      <span class="open-btn" @click="JfisrtClick">立即申请开通</span>
    </div>
    <div class="qsf-again" v-if="quickPayStatus > 0 && !hasPwd">
      <h1 class="again-title">轻松付管理</h1>
      <ul class="qsf-step-ul">
        <li class="qsf-step-li" :class="{'pass-li':quickPayStatus >= 1}">
          <div class="title">提交资料</div>
        </li>
        <li class="qsf-step-li" :class="{'pass-li':quickPayStatus >= 1}">
          <div class="title">等待审核</div>
        </li>
        <li class="qsf-step-li" :class="{'pass-li':quickPayStatus >= 2}">
          <div class="title">审核结果</div>
        </li>
      </ul>
      <div class="step-container">
        <div class="pass" v-if="quickPayStatus == 1">
          <i class="icon"></i>
          <h3 class="title">资料提交成功</h3>
          <p class="detail">您已经成功提交资料等信息，1~7个工作日内予以审核，请耐心等待</p>
        </div>
        <div class="pass" v-if="quickPayStatus == 2 && !hasPwd">
          <i class="icon"></i>
          <h3 class="title">恭喜你申请成功</h3>
          <p class="detail" v-has="['lCVNOD']">请您尽快设置您的支付密码，立即去
            <router-link class="set" to="/Setting/accountsecurity/paymentpassword">设置</router-link>
          </p>
        </div>
        <div class="fail" v-if="quickPayStatus == 3">
          <span class="fail-icon">×</span>
          <h3 class="title">资料审核失败</h3>
          <p class="detail">{{auditReason}}
            <a href="javascript:;" class="set" @click="JfisrtClick">重新申请</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";

export default {
  data() {
    return {
      quickPayStatus: '0',
      quickPayHas: '0',
      auditReason: '',
      hasPwd: false,
      personalStatus: '',  // 1.待审核  2.审核通过  3.审核驳回
      companyStatus: '',  // 1.待审核  2.审核通过  3.审核驳回
    }
  },
  methods: {
    JfisrtClick() {
      if (this.$store.state.userInfo.userCategoryCode === '1') return this.$message.error('您无权限申请，请通知企业超级管理员申请')
      // 根据status判断用户是否已实名认证
      if (!this.companyStatus && !this.personalStatus) {  // 未认证
        this.$router.push('/myqingju/qsfapply')
      } else if (this.companyStatus === '1' || this.personalStatus === '1') {  // 审核中
        this.$message.warning('请等待实名认证信息审核完成')
      } else if (this.companyStatus === '2') {  // 审核通过
        this.$router.push('/myqingju/authCompanyApplyQSF')
      } else if (this.personalStatus === '2') {
        this.$router.push('/myqingju/authPersonalApplyQSF')
      } else if (this.companyStatus === '3' || this.personalStatus === '3') {  // 审核驳回
        this.$router.push('/myqingju/qsfapply')
      }
    },
    // 是否开通轻松付
    hasQuickPay() {
      api.hasQuickPay().then(res => {
        this.quickPayStatus = res.quickPayStatus === null ? '0' : res.quickPayStatus
        this.quickPayHas = res.hasQuickPay
        this.auditReason = res.auditReason
        if (res.quickPayStatus === '2' && res.hasQuickPay === '1') {
          this.hasPassword()
        }
      })
    },
    // 是否已设置支付密码
    hasPassword() {
      api.hasPassword().then(res => {
        this.hasPwd = res.hasPassword
      })
    },
    // 实名认证的相关信息
    getAuthInfo() {
      api.getAuthInfo().then(res => {
        this.personalStatus = res.personalStatus
        this.companyStatus = res.companyStatus
      })
    }
  },
  mounted() {
    this.hasQuickPay()
    this.getAuthInfo()
  },
}
</script>

<style lang="less" scoped>
.qsf-bg {
  position: relative;
  .open-btn {
    position: absolute;
    bottom: 28%;
    right: 26%;
    background-color: #d7ae63;
    color: #fff;
    font-size: 18px;
    width: 16%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #d7ae63;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      color: #d7ae63;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
.qsf-again {
  padding: 20px;
  .again-title {
    font-weight: normal;
    font-size: 18px;
    color: #333;
    padding-bottom: 20px;
    border-bottom: 1px solid #bcbcbc;
    position: relative;
    // &:after {
    //   content: "";
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   width: 100px;
    //   height: 3px;
    //   background-color: #21a57e;
    // }
  }
  .qsf-step-ul {
    overflow: hidden;
    padding: 20px 10px;
    counter-reset: section 0 subsec 1;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    .qsf-step-li {
      width: 280px;
      border-bottom: 5px solid #e7e9eb;
      padding: 20px 0 50px 0;
      text-align: center;
      position: relative;
      .title {
        color: #797979;
      }
      &:after {
        content: counter(section); //获取计数器
        counter-increment: section; //对计数器进行累加
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        background-color: #e7e9eb;
        position: absolute;
        bottom: -16px;
        left: 45%;
        color: #fff;
      }
    }
    .qsf-step-li + .qsf-step-li {
      margin-left: 5px;
    }
    .pass-li {
      border-bottom: 4px solid #009966;
      &:after {
        background-color: #009966;
      }
    }
  }
  .step-container {
    .pass,
    .fail {
      text-align: center;
      .icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../../assets/img/qsf-success.png') no-repeat;
        margin-top: 50px;
      }
      .fail-icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 35px;
        text-align: center;
        margin-top: 50px;
        border: 2px solid #ea554c;
        color: #ea554c;
        border-radius: 50%;
        font-size: 40px;
      }
      .title {
        font-size: 24px;
        color: #37454e;
        margin-top: 30px;
      }
      .detail {
        font-size: 14px;
        color: #bcbcbc;
        margin-top: 10px;
        .set {
          color: #0066cc;
        }
      }
    }
  }
}
</style>

