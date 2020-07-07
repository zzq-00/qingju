<template>
  <div class="exchangePaly">
    <headerComponents></headerComponents>
    <div class="exchangePaly-main container">
      <div class="tit">
        <div></div>
        <router-link to='/'>
          <div>
            <span>网站首页</span>
            <span>></span>
          </div>
        </router-link>
        <router-link to='/benefits'>
          <div>
            <span>福利专区</span>
            <span>></span>
          </div>
        </router-link>
        <router-link to='/'>
          <div>
            <span>兑换礼品</span>
          </div>
        </router-link>
      </div>
      <div class="exchangePaly-content container">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import headerComponents from "../../components/headerComponents";
export default {
  data () {
    return {};
  },
  components: {
    headerComponents
  }
};
</script>


<style lang="less" scoped>
body {
  background-color: #fff !important;
}
.exchangePaly {
  background-color: #fff;
  height: 100%;
  padding-bottom: 50 px;
}
.exchangePaly-main {
  margin-top: 130px;
  > .tit {
    display: flex;
    padding: 20px 0 40px 0;
    font-size: 14px;
    div {
      margin-right: 10px;
    }
    > div {
      &:nth-child(1) {
        border-left: 3px solid green;
      }
    }
  }
}
.exchangePaly-content {
  width: 100%;
}
</style>


