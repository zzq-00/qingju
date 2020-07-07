<template>
  <div>
    <headerComponents />
    <div class="context">
      <router-link to="/myqingju/recharge?activityRechargeMoney=10000" class="button">立即充值</router-link>
      <router-link to="/myqingju/recharge?activityRechargeMoney=30000" class="button">立即充值</router-link>
      <router-link to="/myqingju/recharge?activityRechargeMoney=50000" class="button">立即充值</router-link>
      <router-link to="/myqingju/recharge?activityRechargeMoney=100000" class="button">立即充值</router-link>
      <img src="@/assets/img/MidAutumnImg.jpg" alt="" width="100%">
    </div>
  </div>
</template>
<script>
import headerComponents from '@/components/headerComponents'
export default {
  components: {
    headerComponents
  },
  mounted() {
    document.getElementById('header-com').style.position = 'relative'
  }
}
</script>
<style lang="less" scoped>
.context {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  .button {
    opacity: 0;
    position: absolute;

    &:nth-child(1) {
      top: 33.7%;
      left: 26.2%;
      width: 15%;
      height: 2%;
    }
    &:nth-child(2) {
      top: 33.7%;
      left: 58.2%;
      width: 15%;
      height: 2%;
    }
    &:nth-child(3) {
      top: 44.5%;
      left: 26.2%;
      width: 15%;
      height: 2%;
    }
    &:nth-child(4) {
      top: 44.5%;
      left: 58.2%;
      width: 15%;
      height: 2%;
    }
  }
}
</style>
