<template>
  <div>
    <headerComponent />
    <div class="qsf-container">
      <div class="apply-main">
        <h1 class="apply-title">“轻松付”申请</h1>
        <div class="apply-container">
          <div class="base-info">
            <h2 class="common-title">基本信息
              <i class="dotted"></i>
            </h2>
            <div class="user-type">
              <!-- <div v-if="personType">
              <div class="user-type-label">轻松付信息</div>
              <el-checkbox label="用实名认证信息自动填写(如实名认证与轻松付信息不符，请您仔细核对并修改)" v-model="link"></el-checkbox>
            </div> -->
              <div>
                <div class="user-type-label require">申请类型</div>
                <el-radio-group v-model="usertype">
                  <el-radio label="个人额度" @change="typeClick('person')"></el-radio>
                  <el-radio label="企业额度" @change="typeClick('company')" v-if="$store.state.userInfo.userCategoryCode === '1' || $store.state.userInfo.userCategoryCode === '0'"></el-radio>
                </el-radio-group>
              </div>
            </div>
            <apply-person v-if="personType"></apply-person>
            <apply-company v-if="companyType"></apply-company>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";
import applyPerson from './applypersonQSF';
import applyCompany from './applycompanyQSF';
import headerComponent from '@/components/qingjuHeader'

export default {
  components: {
    applyPerson,
    applyCompany,
    headerComponent
  },
  data() {
    return {
      link: '', // 相互关联 --- 默认初始值
      usertype: '个人额度', // 用户类型
      personType: true, // 个人用户
      companyType: false, // 企业用户
    }
  },
  methods: {
    typeClick(type) {
      if (type == 'person') {
        this.personType = true;
        this.companyType = false;
      } else if (type == 'company') {
        this.personType = false;
        this.companyType = true;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.qsf-container {
  background-color: #fff;
  font-size: 14px;
  width: 1200px;
  margin: 60px auto;
}
.apply-main {
  &::before {
    content: '';
    display: block;
  }
  .breadcrumb {
    position: relative;
    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      top: -2px;
      left: 0;
      width: 3px;
      height: 20px;
      background-color: #008000;
    }
  }
  .apply-title {
    height: 40px;
    line-height: 40px;
    background-color: #d7d7d7;
    padding-left: 10px;
  }
  .apply-container {
    .base-info {
      padding: 50px;
    }
    .common-title {
      font-size: 16px;
      color: #666;
      .dotted {
        display: inline-block;
        width: 995px;
        height: 10px;
        margin-left: 20px;
        border-top: 1px dotted #ccc;
        border-bottom: 1px dotted #ccc;
      }
    }
    .user-type {
      width: 995px;
      margin: 0 auto;
      margin-top: 50px;
      .user-type-label {
        display: inline-block;
        width: 175px;
        margin-right: 30px;
        padding-right: 12px;
        text-align: right;
        box-sizing: border-box;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
