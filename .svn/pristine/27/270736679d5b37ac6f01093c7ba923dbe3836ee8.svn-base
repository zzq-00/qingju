<template>
  <div style="background:#fff;bottom:0;left:0;top:0;right:0">
    <headerComponent></headerComponent>
    <breadcrumb :breadcrumbs="breadcrumbs" style="margin-top:0;padding-top:80px;"></breadcrumb>
    <div class="contents">
      <div>
        <h4>发票详情</h4>
        <ul>
          <li>
            <span>开票项目：</span>
            <span>{{infoDetails.projectName}}</span>
          </li>
          <li>
            <span>开票金额：</span>
            <span>{{infoDetails.amount}}</span>
          </li>
          <li>
            <span>开票类型：</span>
            <span>{{infoDetails.invoiceType}}</span>
          </li>
          <li>
            <span>发票抬头：</span>
            <span>{{infoDetails.title}}</span>
          </li>
          <li>
            <span>发票内容：</span>
            <span>{{infoDetails.invoiceInformation}}</span>
          </li>
          <li>
            <span>提交日期：</span>
            <span>{{infoDetails.createAt}}</span>
          </li>
          <li>
            <span>开票单位：</span>
            <span>{{infoDetails.workstationName}}</span>
          </li>
          <li>
            <span>发票备注：</span>
            <span>{{infoDetails.remark}}</span>
          </li>
        </ul>
      </div>
      <div>
        <h4>地址详情</h4>
        <ul>
          <li>
            <span>联系人名称：</span>
            <span>{{infoDetails.addressUserName}}</span>
          </li>
          <li>
            <span>联系人电话：</span>
            <span>{{infoDetails.addressUserPhone}}</span>
          </li>
          <li>
            <span>邮寄地址：</span>
            <span>{{infoDetails.address}}</span>
          </li>
        </ul>
      </div>
      <div>
        <h4>邮寄信息</h4>
        <ul>
          <li>
            <span>发票编号：</span>
            <span>{{infoDetails.invoiceNumber}}</span>
          </li>
          <li>
            <span>快递公司：</span>
            <span>{{infoDetails.expressSupplier}}</span>
          </li>
          <li>
            <span>快递编号：</span>
            <span>{{infoDetails.expressNumber}}</span>
          </li>
          <li>
            <span>备注：</span>
            <span>{{infoDetails.expressRemark}}</span>
          </li>
        </ul>
      </div>
      <el-button type="primary" plain @click='returnClick' style="width:150px;">返回</el-button>
    </div>
  </div>
</template>

<script>
import headerComponent from '@/components/qingjuHeader'
import breadcrumb from '@/components/breadcrumb'
import tool from '@/assets/js/useMoreTool'
import api from '@/fetch/api'

export default {
  components: {
    headerComponent,
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '个人中心', path: '/myqingju/project' }, { name: '发票管理', path: '/myqingju/billManage' }, { name: '票据列表', path: '/myqingju/billManage' }, { name: '详情', path: this.$route.fullPath }],
      infoDetails: '' //详情
    }
  },
  methods: {
    invoiceInfoDetail() {
      api.invoiceInfoDetail(this.$route.query.id).then(res => {
        this.infoDetails = res.dataList[0]
      })
    },
    // 返回上一页
    returnClick() {
      this.$router.push({ path: '/myqingju/billManage', query: { name: '开票历史' } })
    }
  },
  mounted() {
    this.invoiceInfoDetail() //发票详情
  }
}
</script>

<style lang='less' scoped>
.contents {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;
  div {
    ul {
      margin: 20px 0;
      li {
        span:nth-child(1) {
          font-weight: 400;
          font-style: normal;
          color: #666666;
          line-height: 36px;
          font-size: 14px;
          text-align: left;
          display: inline-block;
          width: 150px;
        }
        span:nth-child(2) {
          font-weight: 400;
          font-style: normal;
          line-height: 36px;
          font-size: 14px;
          text-align: left;
          color: #333333;
        }
      }
    }
  }
  div:nth-child(2) {
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
    padding: 20px 0;
    margin: 20px 0;
  }
}
</style>
