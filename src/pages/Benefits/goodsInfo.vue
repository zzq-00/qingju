<template>
  <div class="goodsInfo">
    <div class="tit1">兑换详情</div>
    <steps :stepActive="stepActive"></steps>
    <!-- <div class="InfoBox">
      <goodsInfo></goodsInfo>
    </div> -->
    <div class="tit">
      <div>商品名称</div>
      <div>兑换数量</div>
      <div>商品单价</div>
      <div>小计</div>
    </div>
    <div class="info">
      <div>
        <div><img :src="dataList.giftImage" alt=""></div>
        <div>
          <p>{{dataList.giftName}}</p>
        </div>
      </div>
      <div>
        <div class="changeinp" @click="minusCount">-</div>
        <div><input class="inp" type="text" v-model="count" :disabled='dataList.exchangeType==3' onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"></div>
        <div class="changeinp" @click="addCount">+</div>
      </div>
      <div>
        <!-- 单价 -->
        <span style="color:red;margin-right:4px;">{{dataList.giftBean}}</span>
        <span>青豆</span>
      </div>
      <div>
        <!-- 小计数量 -->
        <span style="color:red;margin-right:4px;">{{dataList.giftBean*count}}</span>
        <span>青豆</span>
      </div>
    </div>
    <div class="qingdoucount">
      <div>
        <div>当前可使用：</div>
        <div>
          <span style="color:red">{{myQingdouCount}}</span>
          <span> 青豆</span>
        </div>
      </div>
      <div>
        <div>总计：</div>
        <div>
          <span style="color:red">{{dataList.giftBean*count}}</span>
          <span> 青豆</span>
        </div>
      </div>

    </div>
    <div class="qingdouPlay">
      <div>应付：</div>
      <div>
        <span style="color:red;font-weight:700;font-size: 20px;">{{dataList.giftBean*count}}</span>
        <span> 青豆</span>
      </div>
    </div>

    <div class="submit">
      <!-- <p @click="goodsinfoSubmit">提交订单</p> -->
      <el-button class="but" @click="goodsinfoSubmit" size='medium' :disabled="Number(myQingdouCount) < Number(dataList.giftBean*count)">提交订单</el-button>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import steps from './steps'
export default {
  data() {
    return {
      butDisable: false,
      count: 1, //兑换数量
      amountprice: 0, // 总计数量
      singlePrice: 0,
      stepActive: 1,
      myQingdouCount: 0,
      userId: window.localStorage.QingjuuserId
    }
  },
  props: ['dataList'],
  components: {
    steps
  },
  mounted() {
    if (this.userId) {
      this.userId = JSON.parse(this.userId)
      this.getMyBean()
    }
  },
  methods: {
    // 我的青豆
    getMyBean() {
      // 参数为userId
      if (this.userId) {
        api.getMyBean(this.userId).then(res => {
          this.myQingdouCount = res.dataList[0].myBean
        })
      } else {
        this.$message('请重新登录')
      }
    },
    minusCount() {
      if (this.count > 1) {
        this.count--
      }
    },
    addCount() {
      if (this.dataList.exchangeType != 3) {
        this.count++
      }
    },
    goodsinfoSubmit() {
      if (this.count) {
        this.$emit('send2Parent', 2)
        window.localStorage.totalBean = JSON.stringify(this.dataList.giftBean * this.count)
        window.localStorage.PriceNum = JSON.stringify(this.count)
      } else {
        this.$message({
          message: '兑换数量不能为空',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goodsInfo {
  width: 100%;
  padding-bottom: 100px;
  > .tit1 {
    font-size: 18px;
  }
  // padding-bottom: 47px;
  > .tit {
    display: flex;
    padding: 55px 22px 15px 22px;
    box-sizing: border-box;
    justify-content: space-between;
    > div {
      &:nth-child(1) {
        flex: 2;
      }
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        flex: 1;
        text-align: center;
      }
    }
  }
  > .info {
    height: 190px;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    padding: 22px;
    box-sizing: border-box;
    > div {
      display: flex;
      align-items: center;
      .inp {
        display: block;
        width: 45px;
        height: 20px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        text-align: center;
      }
      .changeinp {
        width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        border: 1px solid #ccc;
      }
      .changeinp:hover {
        cursor: pointer;
      }
      &:nth-child(1) {
        flex: 2;
        > div {
          &:nth-child(2) {
            padding: 0 20px;
            box-sizing: border-box;
            p {
              word-wrap: break-word;
              font-size: 14px;
              word-break: normal;
            }
          }
        }
        img {
          width: 164px;
          height: 147px;
        }
      }
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        flex: 1;
        text-align: center;
        justify-content: center;
      }
    }
  }
  > .qingdoucount {
    display: flex;
    justify-content: space-between;
    padding: 25px 0 45px 0;
    > div {
      display: flex;
      font-size: 14px;
    }
  }
  > .qingdouPlay {
    display: flex;
    justify-content: flex-end;
  }
  > .submit {
    overflow: hidden;
    margin-top: 70px;
    > .but {
      float: right;
      background-color: rgba(240, 70, 70, 1);
      text-align: center;
      font-size: 14px;
      color: #ffffff;
    }
  }
  > .submit:hover {
    cursor: pointer;
  }
}
</style>
