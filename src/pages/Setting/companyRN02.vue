<template>
  <div>
    <ul class="list-ul">
      <li class="list-li">
        <span class="title">类型：</span>
        <span>企业认证</span>
      </li>
      <li class="list-li">
        <span class="title">认证状态：</span>
        <span>{{dataList.statusStr}}</span>
      </li>
      <!-- <li class="list-li" v-if="dataList.auditorName">
        <span class="title">审核人姓名：</span>
        <span>{{dataList.auditorName}}</span>
      </li> -->
      <li class="list-li" v-if="dataList.auditTime">
        <span class="title">审核时间：</span>
        <span>{{dataList.auditTime}}</span>
      </li>
      <li class="list-li">
        <span class="title">企业名称：</span>
        <span>{{dataList.companyName}}</span>
      </li>
      <li class="list-li">
        <span class="title">纳税人识别码：</span>
        <span>{{dataList.taxNumber}}</span>
      </li>
      <li class="list-li">
        <span class="title">注册地址：</span>
        <span>{{dataList.registeredAddress}}</span>
      </li>
      <li class="list-li">
        <span class="title">注册电话：</span>
        <span>{{dataList.registeredTelephone}}</span>
      </li>
      <li class="list-li">
        <span class="title">开户银行：</span>
        <span>{{dataList.bank}}</span>
      </li>
      <li class="list-li">
        <span class="title">法人姓名：</span>
        <span>{{dataList.legalPersonName}}</span>
      </li>
      <li class="list-li">
        <span class="title">法人身份证号：</span>
        <span>{{dataList.legalPersonNumber}}</span>
      </li>
      <li class="list-li">
        <span class="title">提交日期：</span>
        <span>{{dataList.updateAt}}</span>
      </li>
    </ul>
    <div class="image_list">
      <span class="title">证件照片：</span>
      <img :src="dataList.legalFrontFileUrl" class="firstChild" alt="" title="身份证件正面照" v-if="dataList.legalFrontFileUrl">
      <img :src="dataList.legalVersoFileUrl" alt="" title="身份证件反面照" v-if='dataList.legalVersoFileUrl'>
      <img :src="dataList.businessFileUrl" alt="" title="营业执照" v-if="dataList.businessFileUrl">
      <img :src="dataList.taxRegistFileUrl" alt="" title="税务登记" v-if="dataList.taxRegistFileUrl">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {}
  }
};
</script>

<style lang="less" scoped>
.list-ul {
  margin-left: 80px;
  width: 700px;
  .list-li {
    font-size: 14px;
    line-height: 56px;
    display: flex;
    .title {
       &:nth-child(1) {
        width: 120px;
      }
      &:nth-child(2) {
        margin-left:10px;
        color: #333;
        font-weight: 500;
        display: inline-block;
      }
    }
    img + img {
      margin-left: 20px;
    }
  }
}
.image_list{
  display: flex;
  font-size: 14px;
  line-height: 56px;
  margin-left: 80px;
  .title {
    width: 120px;
  }
  img{
     width:150px;
     height: 120px;
     margin-left: 10px;
  }
  .firstChild{
    margin-left: 0px;
  }
}
</style>
