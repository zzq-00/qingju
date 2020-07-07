<template>
  <div class="bill-pro-content">
    <div class="title">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick()">
          <el-tab-pane style="font-size:18px;" label="开票历史" name="first" v-has="['QEd0Rr', 'QIeIxf']"></el-tab-pane>
          <el-tab-pane style="font-size:18px;" label="发票信息" name="second"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-show="activeName==='second'&&$store.state.addZizhi" @click="changeFlag" v-has="['TGcyHs']">增加资质
      </div>
    </div>
    <div class="careful" v-if="activeName=='first'">
      <div>
        <img src="../../assets/img/sprite-tip.png" alt="">
        <span>注意事项</span>
      </div>
      <ul>
        <li>1、项目完成7天后至1年内可支持换开发票一次，开票时间结束，青矩互联不再支持开具发票；</li>
        <li>2、开票金额为用户实际支付的金额，优惠券，折扣金额，预付款赠送部分不支持开票；</li>
        <li>3、不支持已开发票“企业抬头”变更、不支持补开、换开发票类型。</li>
      </ul>
    </div>
    <billManageApply v-show="activeName==='first'"></billManageApply>
    <billManageSolve v-show="activeName==='second'" v-has="['kOOfV0']"></billManageSolve> <!-- 发票信息列表权限 -->
  </div>
</template>
<script>
import billManageApply from './billManageCom/billManageApply'
import billManageSolve from './billManageCom/billManageSolve'

export default {
  components: {
    billManageApply,
    billManageSolve
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    changeFlag() {
      this.$store.commit('addWindow', false)
      setTimeout(() => {
        var ele = document.getElementsByClassName('add_content')[0]
        window.scrollTo(0, ele.offsetTop)
      }, 200)
    },
    handleClick() {
      this.$store.commit('addWindow', true)
    }
  },
  mounted() {
    if (this.$route.query.name == '跳转') {
      this.activeName = 'second'
      this.$store.commit('addWindow', true)
    }
    if (this.$route.query.name == 'zizhi') {
      this.activeName = 'second'
    }
    // 从开票历史详情跳过来的
    if (this.$route.query.name == '开票历史') {
      this.activeName = 'first'
    }
    // 从发票资质详情跳过来的
    if (this.$route.query.name == '发票资质') {
      this.activeName = 'three'
    }
  }
}
</script>
<style lang='less' scoped>
.bill-pro-content {
  padding: 20px;
  .title {
    position: relative;
    div:nth-child(2) {
      position: absolute;
      top: 0px;
      right: 0;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(3, 177, 137, 1);
      color: rgba(255, 255, 255, 1);
      font-weight: 400;
      font-size: 14px;
      border-radius: 2px;
      cursor: pointer;
    }
    div:nth-child(3) {
      position: absolute;
      right: 0;
      bottom: 10px;
    }
  }
  .careful {
    margin-top: 10px;
    height: 133px;
    background-color: #fffdee;
    padding-top: 13px;
    div {
      margin-left: 50px;
      span {
        margin-left: 10px;
        font-weight: 400;
        font-size: 15px;
        color: #ff6633;
      }
    }
    ul {
      margin-top: 10px;
      margin-left: 80px;
      li {
        margin-bottom: 4px;
        font-weight: 400;
        font-size: 12px;
        color: #ff6633;
        line-height: 20px;
      }
    }
  }
}
</style>
<style lang="less">
.bill-pro-content {
  .el-table .table-header-color {
    font-size: 14px;
    color: #333333;
    font-weight: 400;
    background-color: #f3f5f7;
    border-radius: 4px;
  }
  .el-tabs__header {
    margin: 0 0 0;
  }
  .el-tabs__item {
    font-size: 18px;
    line-height: 24px;
  }
  .el-tabs__item:hover {
    color: #009966;
    cursor: pointer;
  }
  .el-tabs__item.is-active {
    color: #666666;
  }
  .el-tabs__item{
    color: #666666;
    font-weight: normal;
    padding-bottom: 45px;
  }
  .el-tabs__nav-wrap::after{
    height: 1px;
  }
}
</style>
