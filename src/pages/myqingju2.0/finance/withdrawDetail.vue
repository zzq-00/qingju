<template>
  <div class="withdrawal-detail">
    <div class="title">提现详情</div>
    <div class="content">
      <dl>
        <dt>申请人：</dt>
        <dd>{{info.userName}}</dd>
      </dl>
      <dl>
        <dt>创建时间：</dt>
        <dd>{{info.date}}</dd>
      </dl>
      <dl>
        <dt>提现金额：</dt>
        <dd>{{info.txnAmt}}</dd>
      </dl>
      <dl>
        <dt>选择银行：</dt>
        <dd>{{info.accBank}}</dd>
      </dl>
      <dl>
        <dt>银行卡号：</dt>
        <dd>{{info.accNo}}</dd>
      </dl>
      <dl>
        <dt>持有姓名：</dt>
        <dd>{{info.customerNm}}</dd>
      </dl>
      <dl>
        <dt>申请状态：</dt>
        <dd>{{info.status}}</dd>
      </dl>
      <dl>
        <dt>备注信息：</dt>
        <dd>{{info.remark}}</dd>
      </dl>
      <dl>
        <dt>审核时间：</dt>
        <dd>{{info.settleTime}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";

export default {
  data() {
    return {
      info: {}
    }
  },
  methods: {

  },
  mounted() {
    api.withdrawAuditInfo(this.$route.params.id).then(res => {
      this.info = res.dataList[0]
    })
  }
}

</script>

<style lang="less" scoped>
.withdrawal-detail {
  width: 100%;
  padding: 18px 18px 80px;
  box-sizing: border-box;
  .title {
    font-size: 18px;
    line-height: 1;
    color: #666666;
  }
  .content {
    border-top: 1px solid #D7D7D7;
    margin-top: 18px;
    padding-left: 20px;
    > dl {
      display: flex;
      line-height: 1;
      margin-top: 65px;
      > dt {
        width: 100px;
      }
    }
  }
}
</style>
