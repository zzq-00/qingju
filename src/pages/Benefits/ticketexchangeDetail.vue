<template>
  <div class="exchangeDetail">
    <goodsInfo v-if="pageTagIndex===1" @send2Parent="getChildData" :dataList="detailData"></goodsInfo>
    <benefitBillDetail v-if="pageTagIndex===2" @send2Parent="getChildData" :dataList="detailData"></benefitBillDetail>
    <goodsComplete v-if="pageTagIndex===3" @send2Parent="getChildData"></goodsComplete>
  </div>
</template>


<script>
import api from "@/fetch/api";
import goodsInfo from "./goodsInfo";
import benefitBillDetail from "./benefitBillDetail";
import goodsComplete from "./goodsComplete";
export default {
  data() {
    return {
      pageTagIndex: 1,
      giftId:'',
      detailData:{}
    };
  },
  components: {
    goodsInfo,
    benefitBillDetail,
    goodsComplete
  },
  mounted() {
    this.giftId = this.$route.query.id;
    this.getWelfareDetail();
  },
  methods: {
    //获取详情
    getWelfareDetail() {
      let data = {
        exchangeType: "2",
        giftId: this.giftId
      };
      api.getWelfareDetail(data).then(res => {
        this.detailData = res.dataList[0];
      });
    },
    getChildData(data) {
      this.pageTagIndex = data;
    }
  }
};
</script>


<style lang="less" scoped>
.exchangeDetail {
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 22px 25px 47px 25px;
  box-sizing: border-box;
  > .tit {
    font-size: 18px;
  }
}
</style>




