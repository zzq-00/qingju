<template>
  <div class="goodslist-container">
    <div class="goodslist-image">
      <!-- ../../assets/img/u3985.jpg -->
      <img :src="dataList.couponImage" alt="">
    </div>
    <div class="des">
      <!-- 满200000元减20000元优惠券
      有效期：领取后6个月内使用有效 -->
      {{dataList.couponName}}
    </div>
    <div class="footer">
      <div class="list">
        <span>{{dataList.couponBean}}</span>
        <span>青豆</span>
      </div>
      <div class="but" @click="go2next(dataList.id)">立即兑换</div>
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
  props: ["dataList", "user"],
  mounted () {
    if (this.userId || this.user) {
      this.userId = JSON.parse(this.userId);
    }
    if (this.dataList.couponName.length > 47) {
      this.dataList.couponName = this.dataList.couponName.substring(0, 47) + '...'
    }
  },
  methods: {
    go2next (id) {
      //进入兑换页面
      if (this.userId) {  //判断是否登陆
        if (JSON.parse(window.localStorage.isTzecc) == '1') {
          this.$message('内部员工禁止操作');
        } else {
          this.$router.push({ path: "/ticketexchangePaly/ticketexchangeDetail", query: { id: id } });
        }
      }
      else {
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
    height: 180px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .des {
    min-height: 38px;
    padding: 0 15px;
    font-size: 14px;
    margin-top: 10px;
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

