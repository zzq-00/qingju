<template>
  <div>
     <per v-if='dataList.personalStatus==0 || dataList.personalStatus==null'></per>
     <person-r-n v-if="dataList.authPersonal && dataList.personalStatus!=0" :dataList='dataList.authPersonal'></person-r-n>
     <el-button type="primary" v-if="Number(dataList.personalStatus) === 3" style="margin-left: 80px; margin-top:50px" @click="reClick">重新申请</el-button>
  </div>
</template>
<script>
import api from '@/fetch/api'
import per from './per'
import personRN from "./personRN02"; 
export default {
  components: {
    per,
    personRN
  },
  data () {
    return {
      dataList:[]
    }
  },
  created () {
    api.getAuthInfo().then(res => {
      this.dataList = res;
      console.log(this.dataList, 'data')
    })
  },
  mounted () {
  },
  methods: {
    reClick(){
      this.dataList.personalStatus = 0;
      Bus.$emit('realNum',0)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
<style lang='less'>

</style>
