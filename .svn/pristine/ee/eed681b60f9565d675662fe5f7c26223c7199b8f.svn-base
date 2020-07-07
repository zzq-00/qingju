<template>
  <div class="activity">
    <div class="header">
      <img src="@/assets/img/1111-logo.png" alt="" width="123px" height="53px">
      <div>
        <router-link to="/">青矩互联官网</router-link>
        <a href="javascript:;" @click="scrollTo">活动规则</a>
      </div>
    </div>
    <img src="@/assets/img/1111-banner.png" alt="" width="100%">
    <div class="content">
      <h2>
        <img src="@/assets/img/1111-title1.png" alt="">
        <span>第一重好礼：预存返现</span>
        <img src="@/assets/img/1111-title2.png" alt="">
      </h2>
      <div class="list">
        <img class="can-click" @click="gotoRecharge(10000)" src="@/assets/img/1111-1000.png" alt="">
        <img class="can-click" @click="gotoRecharge(30000)" src="@/assets/img/1111-3000.png" alt="">
        <img class="can-click" @click="gotoRecharge(50000)" src="@/assets/img/1111-5000.png" alt="">
        <img class="can-click" @click="gotoRecharge(100000)" src="@/assets/img/1111-10000.png" alt="">
      </div>
      <p>充值时，选择【充值即送双十一活动】，即可享受充值赠送</p>
      <img src="@/assets/img/1111-Screenshot.png" alt="">
      <h2>
        <img src="@/assets/img/1111-title1.png" alt="">
        <span>第二重好礼：新注册送青豆</span>
        <img src="@/assets/img/1111-title2.png" alt="">
      </h2>
      <img v-if="received" src="@/assets/img/1111-qd2.png" alt="">
      <img v-else class="can-click" @click="newUsersAddGreenBeans" src="@/assets/img/1111-qd1.png" alt="">
      <div class="gifts">
        <div v-for="(item,index) in giftList" :key="index">
          <img :src="item.giftImage" :alt="item.giftName" height="270px">
          <p>{{item.giftName}}</p>
          <p><span style="color: #F60505;">{{item.giftBean}}</span> 青豆</p>
          <div class="exchange-btn can-click" @click="$router.push('/exchangePaly/exchangeDetail?id='+item.id)">立即兑换</div>
        </div>
      </div>
      <div class="rule">
        <h4>双十一活动规则</h4>
        <p>1、本次双十一活动时间为11月8日——12月12日；</p>
        <p>2、本次活动对象为青矩互联平台的所有用户。青矩智享股东可选择股东充值优惠，也可选择双十一充值优惠，但两者充值奖励不叠加，双十一预存金额不占用股东当年预存限定额度；</p>
        <p>3、参与本次活动，登陆青矩互联网站www.qingju.cn，选择双十一预存款充值，充值金额无上限；</p>
        <p>4、本次双十一预存款的金额仅可用于青矩互联平台发布项目所用，不可提现，不可转让，不可用于还轻松付；</p>
        <p>5、青矩互联平台预存款赠送的金额将直接发放至用户账户，在【我的账户】中即可查看；赠送青豆将直接发放至用户账户，在【福利商城】中即可查看；</p>
        <p>6、预存款金额仅可用于计量项目发布，不可用于BIM及设计项目，青豆仅可在青矩互联福利商城使用；</p>
        <p>7、用户攒够60枚青豆可任意兑换小青手办、小青书签或抱枕一个，每个账号限兑换一次，不可重复兑换；</p>
        <p>8、本次活动最终解释权归青矩互联所有。</p>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="success" width="600px">
      <p style="color:#555555;font-size:18px;font-weight:bold;">恭喜您，已经成功领取30青豆！</p>
      <p style="color:#888888;">您可以通过平台其他任务赚取更多的青豆，发布项目可快速的获取青豆哦！</p>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" style="width: 100px;" size="small" @click="$router.push('/doTasks')">去做任务</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="oldUser" width="600px">
      <p style="color:#555555;font-size:18px;font-weight:bold;">很抱歉，本次活动只针对新用户开放！</p>
      <p style="color:#888888;">您可以通过平台其他任务赚取更多的青豆，发布项目可快速的获取青豆哦！</p>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" style="width: 100px;" size="small" @click="oldUser=false">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="repeat" width="600px">
      <p style="color:#555555;font-size:18px;font-weight:bold;">您已经领取成功，不可重复参加！</p>
      <p style="color:#888888;">您可以通过平台其他任务赚取更多的青豆，发布项目可快速的获取青豆哦！</p>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" style="width: 100px;" size="small" @click="$router.push('/doTasks')">去做任务</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import headerComponents from '@/components/headerComponents'
import api from '@/fetch/api'
export default {
  components: {
    headerComponents
  },
  data() {
    return {
      received: false,
      success: false,
      oldUser: false,
      repeat: false,
      giftList: []
    }
  },
  methods: {
    scrollTo() {
      window.scrollTo(0, document.body.scrollHeight)
    },
    gotoRecharge(num) {
      if (!window.localStorage.QingjuuserId) return this.$router.push('/login')
      this.$router.push('/myqingju/recharge?activityRechargeMoney=' + num)
    },
    newUsersAddGreenBeans() {
      if (!window.localStorage.QingjuuserId) return this.$router.push('/login')
      api
        .newUsersAddGreenBeans(JSON.parse(window.localStorage.QingjuuserId))
        .then(res => (this.received = this.success = true))
        .catch(err => {
          if (err.errorCode && err.errorCode === '100009') return (this.oldUser = true)
          if (err.errorCode && err.errorCode === '100010') return (this.repeat = true)
          this.$message.error(err.errorMsg)
        })
    }
  },
  mounted() {
    api.getWelfareGiftList({ page: 0, size: 3 }).then(res => (this.giftList = res.dataList))
    if (window.localStorage.QingjuuserId) {
      api.getReceivingStatus(JSON.parse(window.localStorage.QingjuuserId)).then(res => (this.received = !!res.dataList))
    }
  }
}
</script>
<style lang="less" scoped>
.activity {
  position: relative;
  .header {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 17px;
    left: 50%;
    transform: translateX(-50%);
    a {
      color: #fff;
      padding: 0 18px;
      & + a {
        border-left: 2px solid #fff;
      }
    }
  }
  .content {
    padding-bottom: 100px;
    background: url(~@/assets/img/1111-bg.png) #010123 repeat-y center top;
    text-align: center;
    > h2 {
      font-size: 70px;
      color: #fff;
      padding: 70px 0 40px;
      > span {
        margin: 0 10px;
        vertical-align: middle;
      }
    }
    .list {
      width: 1300px;
      margin: 0 auto;
      > img {
        margin: 12px 10px;
      }
      & + p {
        font-size: 20px;
        color: #fff;
        margin: 40px 0;
      }
    }
    .gifts {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 1200px;
      margin: 30px auto 100px;
      flex-wrap: wrap;
      font-size: 18px;
      > div {
        flex: 0 0 390px;
        background-color: #fff;
        border-radius: 10px;
        margin: 8px 0;
        padding: 20px 18px;
        box-sizing: border-box;
        > p {
          text-align: left;
          margin: 10px 0;
          &:nth-child(2) {
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .exchange-btn {
          cursor: pointer;
          color: #fff;
          background-color: #fab80a;
          height: 54px;
          line-height: 54px;
          border-radius: 5px;
        }
      }
    }
    .rule {
      color: #666;
      background-color: #fff;
      width: 1200px;
      border-radius: 5px;
      margin: 0 auto;
      padding: 22px;
      box-sizing: border-box;
      > h4 {
        font-size: 36px;
        margin-bottom: 15px;
      }
      > p {
        font-size: 14px;
        text-align: left;
        line-height: 30px;
      }
    }
  }
  .can-click {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      transform: scale(1.01);
    }
  }
}
</style>
