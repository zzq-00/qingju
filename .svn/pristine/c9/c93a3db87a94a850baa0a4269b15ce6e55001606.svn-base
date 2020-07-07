<template>
  <div>
    <com v-if='dataList.companyStatus == 0 || dataList.companyStatus==null'></com>
    <company-r-n v-if="dataList.authCompany && dataList.companyStatus!=0" :dataList='dataList.authCompany'></company-r-n>
    <el-button type="primary" v-if="Number(dataList.companyStatus) === 3" style="margin-left: 80px; margin-top:50px" @click="reClick">重新申请</el-button>
  </div>
</template>
<script>
import api from "@/fetch/api";
import com from './com'
import companyRN from "./companyRN02";
import Bus from "@/assets/js/bus.js";
export default {
  components: {
    com,
    companyRN
  },
  data() {
    return {
      dataList:[]
    }
  },
  methods: {
    reClick () {
      this.dataList.companyStatus = 0;
      Bus.$emit('realNum',0)
    }
  
  },
  created() {
     api.getAuthInfo().then(res => {
      this.dataList = res;
    })
  },
};
</script>
<style lang="less" scoped>

</style>

