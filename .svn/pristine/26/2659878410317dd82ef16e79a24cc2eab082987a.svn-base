<template>
  <div class="authentication">
    <div class="qsf-again" v-if="user.realNameStatus >= 0">
      <h1 class="again-title">用户实名认证</h1>
      <ul class="qsf-step-ul">
        <li class="qsf-step-li" :class="{'pass-li':user.realNameStatus >= 0}">
          <div class="title">提交资料</div>
        </li>
        <li class="qsf-step-li" :class="{'pass-li':user.realNameStatus >= 1}">
          <div class="title">审核中</div>
        </li>
        <li class="qsf-step-li" :class="{'pass-li':user.realNameStatus >= 2}">
          <div class="title">审核结果</div>
        </li>
      </ul>
      <!-- <div class="step-container">
        <div v-show="Number(user.realNameStatus) == 1 || Number(user.realNameStatus) == 2 || Number(user.realNameStatus) === 3">
          <person-r-n v-if="Object.keys(personList).length && data.personalStatus!=0" :dataList='personList'></person-r-n>
          <company-r-n v-if="Object.keys(companyList).length && data.companyStatus!=0" :dataList='companyList'></company-r-n>
        </div>
        <el-button type="primary" v-if="Number(user.realNameStatus) === 3" style="margin-left: 80px; margin-top:50px" @click="reClick">重新申请</el-button>
      </div> -->
      <!-- <el-button type="primary" v-if="Number(user.realNameStatus) === 3" style="margin-left: 80px; margin-top:50px" @click="reClick">重新申请</el-button> -->
    </div>
    <!-- 认证表单 -->
    <div>
      <div class="user-type-label require">申请类型</div>
      <el-radio-group v-model="user.type">
        <!-- <el-radio v-for="(item, index) in rdoLabel" :key="index" :label="item.title" @change="fn(index)"></el-radio> -->
        <el-radio label="个人认证" @change="changeFn()"></el-radio>
        <!-- <el-radio v-if='userCategory!="企业下用户"' label="企业认证" @change="fn(1)"></el-radio> -->
        <el-radio label="企业认证" v-if='userCategory!="企业下用户"' @change="changeFn()"></el-radio>
      </el-radio-group>
      <router-view></router-view>
      <!-- <person-real-name v-if="select === 0" @successClick='submitPersonClick'></person-real-name>
      <company-real-name v-if="select === 1" @successClick='submitCompanyClick'></company-real-name> -->
    </div>
  </div>
</template>
<script>
// import personRealName from "./personRealName";
// import companyRealName from "./companyRealName";
// import personRN from "./personRN02";
// import companyRN from "./companyRN02";
import api from "@/fetch/api";
import Bus from "@/assets/js/bus.js";
export default {
  // components: {
  //   personRealName,
  //   companyRealName,
  //   personRN,
  //   companyRN
  // },
  data() {
    return {
      // select: 0,
      user: {
        type: "个人认证",
        realNameStatus: 0
      },
      rdoLabel: [
        {
          title: "个人认证"
        },
        {
          title: "企业认证"
        }
      ],
      // personList: {},
      // companyList: {},
      data: null,
      userCategory: null
    };
  },
  created() {
    //获取是什么用户
    api.getUserInfo().then(res => {
      this.userCategory = res.dataList[0].userCategory;
    });
    api.getAuthInfo().then(res => {
      this.data = res;
    });
    this.commonFn();
  },
  methods: {
    commonFn() {
      if (this.$route.path == "/Setting/userAttestation/enterprise") {
        this.user.type = "企业认证";
        api.getAuthInfo().then(res => {
          this.user.realNameStatus = res.companyStatus;
        });
      }else{
         this.user.type = "个人认证";
         api.getAuthInfo().then(res => {
          this.user.realNameStatus = res.personalStatus;
        });
      }
    },
    changeFn() {
      if (this.user.type == "个人认证") {
        this.user.realNameStatus = this.data.personalStatus;
        this.$router.push({ path: "/Setting/userAttestation/personage" });
      } else {
        this.user.realNameStatus = this.data.companyStatus;
        this.$router.push({ path: "/Setting/userAttestation/enterprise" });
      }
    }
    // reClick() {
    //   this.user.realNameStatus = 0;
    //   this.$router.push('/Setting/userAttestation/personage')
    // },
    // submitPersonClick() {
    //   this.authResult();
    // },
    // submitCompanyClick() {
    //   this.authResult();
    // },
    // authResult() {
    //   // 实名注册详情
    //   api.getAuthInfo().then(res => {
    //     this.data = res;
    //     this.user.realNameStatus = 0;
    //     if(res.companyStatusStr=='审核通过' && res.personalStatusStr=='审核通过'){
    //        this.companyList = res.authCompany;
    //        this.user.realNameStatus = res.companyStatus;
    //     }else if(res.companyStatusStr=='审核驳回' && res.personalStatusStr=='审核通过' || res.personalStatusStr=='待审核'){
    //       this.personList = res.authPersonal;
    //       this.user.realNameStatus = res.personalStatus;
    //     }else if(res.companyStatusStr=='审核通过' && res.personalStatusStr=='审核驳回' || res.personalStatusStr=='待审核'){
    //        this.companyList = res.authCompany;
    //        this.user.realNameStatus = res.companyStatus;
    //     }else if (res.authCompany && res.companyStatus) {
    //       this.companyList = res.authCompany;
    //       this.user.realNameStatus = res.companyStatus;
    //     }else if (res.authPersonal && res.authPersonal) {
    //       this.personList = res.authPersonal;
    //       this.user.realNameStatus = res.personalStatus;
    //     }
    //   });
    //}
  },
  mounted() {
    // this.authResult();
    // Bus.$on("enterpriseName", e => {
    //   this.user.realNameStatus = e.realNameStatus;
    //   this.select = e.select;
    //   this.user.type = e.type;
    // });
    Bus.$on('realNum',e=>{
       this.user.realNameStatus = e;
    })
  }
};
</script>
<style lang="less" scoped>
.authentication {
  margin-bottom: 100px;
  overflow-x: hidden;
}
.qsf-again {
  margin: 0 20px;
  .again-title {
    line-height: 60px;
    border-bottom: 1px solid #d7d7d7;
    color: #666666;
    font-size: 18px;
    font-weight: normal;
    position: relative;
  }
  .qsf-step-ul {
    overflow: hidden;
    padding: 20px 39px;
    counter-reset: section 0 subsec 1;
    font-size: 14px;
    .qsf-step-li {
      float: left;
      width: 230px;
      border-bottom: 5px solid #e7e9eb;
      padding: 20px 0 50px 0;
      text-align: center;
      position: relative;
      .title {
        color: #333;
        font-weight: 400;
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
      margin-left: 20px;
    }
    .pass-li {
      border-bottom: 5px solid #0eaf63;
      &:after {
        background-color: #0eaf63;
      }
    }
  }
  .step-container {
    width: 100%;
    .pass,
    .fail {
      text-align: center;
      .icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("../../assets/img/qsf-success.png") no-repeat;
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
.user-type-label {
  display: inline-block;
  font-size: 14px;
  width: 140px;
  margin-top: 20px;
  padding-right: 12px;
  text-align: right;
  box-sizing: border-box;
  margin-bottom: 20px;
}
</style>
<style lang="less">
@media screen and (min-width: 600px) and (max-width: 1250px) {
  .qsf-step-li {
    width: 230px !important;
  }
  .authentication {
    overflow: hidden;
  }
}
@media screen and (min-width: 1500px) {
  .qsf-step-li {
    width: 280px !important;
  }
}
</style>
