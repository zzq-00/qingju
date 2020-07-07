<template>
  <div  class="details">
    <!-- <headerInfoComponent :userInfoData="userInfoData"></headerInfoComponent> -->
    <div class="info-items">
      <ul class="info-nav">
        <!--  v-has='[item.has]' -->
        <li class="info-item" v-for="(item) in infonavData"
          :key="item.title" v-bind:class="{'active-item': selectedUrl == item.url}"
          @click="itemClick(item)">
          {{item.title}}
        </li>
      </ul>
    </div>
    <div class="info-container demo01">
      <!-- 权限要变 更好传值 ，有隐藏 -->
      <div v-show="selectedUrl == 'projectDetail'">
        <project></project>
      </div>
      <div v-show="selectedUrl == 'accountDetail'">
        <account></account>
      </div>
      <div v-show="selectedUrl == 'qingsongfu'">
        <qingsongfu></qingsongfu>
      </div>
      <div v-show="selectedUrl == 'billList'">
        <bill-list></bill-list>
      </div>
    </div>
  </div>
</template>
<script>
import project from './projectDetail' // 项目明细
import account from './accountDetail' // 账户明细
import qingsongfu from './qingsongfu' // 轻松付账户
import billList from './billList' // 轻松付账户
import api from "@/fetch/api";
export default {
  components: {
    project,account,qingsongfu,billList
    },
  data () {
    return {
      userInfoData: {},
      breadcrumbData: [
        { name: '用户管理', path: '/welfareArea/index' },
        { name: '全站用户', path: this.$route.fullPath },
        { name: 'Ta的主页', path: this.$route.fullPath }
      ],
      selectedUrl: 'projectDetail', // 选中的选项卡位置
      infonavData: [
        {title: '项目明细',url: 'projectDetail', has: 's5fd7f'},
        {title: '账户明细',url: 'accountDetail', has: '8d4fkd'},
        {title: '轻松付账户',url: 'qingsongfu',has: '2d545f'},
        {title: '开票明细',url: 'billList', has: 'GOaZ6K'},
      ],
    }
  },
  methods: {
    getUserInfo () {
      api.getUserInfouser(this.$route.query.userId).then(res => {
        this.userInfoData = res.dataList[0]
      })
    },
    itemClick (item) {
      this.selectedUrl = item.url
      // this.$router.replace({path:item.url, query:{userId: this.$route.query.userId}})
    }
  }
}
</script>
<style lang="less" scoped>
.details{
  background-color: #fff;
  padding: 20px;
}
.info-items{
  border-bottom: 1px solid rgba(201, 201, 201, 1);
  margin: 20px 0;
}
.info-nav{
  margin-bottom: -2px;
  .info-item{
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #333;
    font-size: 14px;
    border-bottom: 1px solid transparent;
    box-sizing: border-box;
    cursor: pointer;
    &:hover{
      background-color: #e4e4e4;
    }
  }
  .active-item{
    border: 1px solid rgba(201, 201, 201, 1);
    border-bottom: 1px solid #fff;
  }
  .gray-color{
    background-color: #e4e4e4;
    color: #fff;
    cursor: pointer;
  }
  .info-item + .info-item{
    margin-left: 10px;
  }
}
</style>
