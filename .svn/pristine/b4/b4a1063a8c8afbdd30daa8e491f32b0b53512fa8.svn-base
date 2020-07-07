<template>
  <div class="goodsInfo">
    <div class="tit1">订单详情</div>
    <steps :stepActive="stepActive"></steps>

    <div class="info">
      <div><img src="../../assets/img/u4685.png" alt=""></div>
      <div>兑换完成！</div>
      <div>
        <span>您已经兑换成功，请可以：</span>
        <span @click="go2back">继续逛逛</span>
      </div>
    </div>
  </div>
</template>
<script>
import steps from "./steps";
export default {
  data() {
    return {
      count: 10, //兑换数量
      unitprice: 2500, // 单个商品所需数量
      amountprice: 0, // 总计数量
      stepActive: 3
    };
  },
  components: {
    steps
  },
  methods: {
    go2back() {
      this.$router.push("/benefits");
    }
  }
};
</script>

<style lang="less" scoped>
.goodsInfo {
  width: 100%;
  > .tit1 {
    font-size: 18px;
  }
  > .info {
    padding: 80px;
    box-sizing: border-box;
    > div {
      &:nth-child(1) {
        margin-bottom: 55px;
        text-align: center;
        > img {
          width: 100px;
          height: 100px;
        }
      }
      &:nth-child(2) {
        margin-bottom: 40PX;
        font-weight: 700;
        font-size: 18px;
        text-align: center;
        line-height: 36px;
      }
      &:nth-child(3) {
        text-align: center;
        font-size: 14px;
        >span{
          &:nth-child(2) {
            color: #2E82FF;
          }
          &:nth-child(2):hover {
           cursor: pointer;
           text-decoration:underline;
          }
        }
      }
    }
  }
}
</style>
