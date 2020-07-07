<template>
  <div class="goodslist-container">
    <div class="goodslist-image">
      <img :src="datalist.giftImage" alt="">
    </div>
    <div class="des">
      {{datalist.giftName}}
    </div>
    <div class="footer">
      <div class="list">
        <span>{{datalist.giftBean}}</span>
        <span>青豆</span>
      </div>
      <div class="but" @click="go2exchangePaly(datalist.id)">立即兑换</div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      userId: window.localStorage.QingjuuserId
    };
  },
  mounted () {
    if (this.userId) {
      this.userId = JSON.parse(this.userId);
    }
    if (this.datalist.giftName.length > 47) {
      this.datalist.giftName = this.datalist.giftName.substring(0, 47) + '...'
    }
  },
  props: ["datalist", "user"],
  methods: {
    go2exchangePaly (id) {
      // 先判断是不是登陆状态
      if (this.userId) {
        if (JSON.parse(window.localStorage.isTzecc) == '1') {
          this.$message('内部员工禁止操作');
        } else {
          this.$router.push({ path: "/exchangePaly/exchangeDetail", query: { id: id } });
        }

      } else {
        this.$emit("send2ParentLogin", true);
      }
    }
  }
};
</script>



<style lang="less" scoped>
.goodslist-container {
  padding-bottom: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 285px;
  background-color: rgba(255, 255, 255, 1);
  .goodslist-image {
    width: 285px;
    height: 200px;
    margin: 0 auto;
    > img {
      width: 100%;
      height: 200px;
    }
  }
  .des {
    min-height: 38px;
    font-size: 14px;
    margin-top: 10px;
    padding: 0 15px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 15px;
    .list {
      span:nth-child(1) {
        font-size: 18px;
        color: #d7000f;
        font-weight: 400;
      }
    }
    .but {
      width: 98px;
      height: 28px;
      border: 1px solid red;
      line-height: 28px;
      text-align: center;
      border-radius: 3px;
      font-size: 12px;
    }
    .but:hover {
      background-color: red;
      color: #fff;
      cursor: pointer;
    }
  }
}
.goodslist-container:hover {
  box-shadow: 2px 2px 10px #ccc;
}
</style>

