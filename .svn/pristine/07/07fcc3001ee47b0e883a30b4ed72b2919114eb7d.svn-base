<template>
  <div>
    <headerComponents/>
    <div class="context">
      <img src="@/assets/img/fuliri-banner.jpg" alt="" width="100%">
      <div class="first">
        <h3>预存送好礼</h3>
        <ul class="content">
          <li class="clearfix" v-for="(item,index) in inputValue" :key="index">
            <div class="fl">
              <i>￥</i>
              <span>{{item.gift}}</span>
            </div>
            <div class="fl">
              <span>{{item.desc}}</span>
              <a href="javascript:;" class="button" @click="gotoRecharge(item.value)">立即充值</a>
            </div>
          </li>
        </ul>
        <p class="tips">注：该金额仅限青矩平台发布计量项目所用，<b>不可转让，不可提现，不可还轻松付</b>。</p>
      </div>

      <div class="second">
        <h3>五折限时限量购</h3>
        <ul class="date">
          <li v-for="(item,index) in date" :key="index" :class="{active: item.status===timer.countDay}">
            <div>
              <p>{{item.date}}</p>
              <!-- 今天没开始 或者 倒计时明天 -->
              <!-- <p v-if="item.status===weekday && item.status === timer.countDay && timer.beginNow && !timer.lootAll">正在抢</p>
              <p v-else-if="(item.status === timer.countDay && !timer.beginNow) || (item.status === timer.countDay)">距离开始还有</p>
              <p v-if="item.status===weekday && item.status < timer.countDay && timer.beginNow && timer.lootAll">已抢光</p>
              <p v-else-if="item.status<timer.countDay">已结束</p>
              <p v-if="item.status>timer.countDay">未开始</p> -->
              <p>{{timerText(item)}}</p>
            </div>
            <div>
              <p v-if="item.status===weekday && timer.beginNow && !timer.lootAll && !timer.notRab">
                <a href="javascript:;" class="button" @click="qjDataGet">点击抢购</a>
              </p>
              <p v-else>
                <i>{{item.hours}}</i>&nbsp;:&nbsp;
                <i>{{item.minutes}}</i>&nbsp;:&nbsp;
                <i>{{item.seconds}}</i>
              </p>
            </div>
          </li>
        </ul>
        <p class="tips">注：该五折券的有效期为72小时，为了使您的优惠券可以正常被使用，请验收项目前来抢购。</p>
      </div>

      <div class="attention">
        <h4>规则说明</h4>
        <ul>
          <li>1. 青矩平台预存款项，只能用于平台消费，不可提现，不可还轻松付；</li>
          <li>2. 青矩平台预存款项后，赠送的金额将直接发放至用户账户，在我的账户中即可查看；</li>
          <li>3. 青矩平台五折优惠活动时间为2018.10.20 00:00:00——2018.12.31 23:59:59；</li>
          <li>4. 五折优惠券每天限量发放2份，抢完结束；</li>
          <li>5. 五折优惠券每人每天限领1份，每个项目限用1次，不可与其他优惠券叠加使用；</li>
          <li>6. 周一至周五为福利日，预存10万元以上用户方可参与，周二为大放送日，预存1万元用户即可参与；</li>
          <li>7. 五折券优惠金额最高2.5万元，即5万元以内的项目享有5折优惠，超过5万元的项目5万元以内享有5折优惠,只能用于计量项目；</li>
          <li>8. 本次活动不包含设计项目及BIM项目；</li>
          <li>9. 本次活动最终解释权归青矩所有。</li>
        </ul>
      </div>
    </div>

    <el-dialog title="抢购结果" :visible.sync="centerDialogVisible" width="800px" center>
      <div class="result">
        <div v-if="result.code==='200'"><img src="@/assets/img/u60.gif" alt=""></div>
        <div v-else-if="result.code==='8102'"><img src="@/assets/img/u45.png" alt="" height="300px"></div>
        <div v-else><img src="@/assets/img/u40.png" alt=""></div>
        <p>{{result.desc}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">返 回</el-button>
        <el-button type="primary" @click="$router.push('/myqingju/recharge')">去充值</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import headerComponents from "@/components/headerComponents";
import api from "@/fetch/api";
import { countDown } from '@/assets/js/utils.js';

export default {
  components: {
    headerComponents
  },
  data () {
    return {
      weekday: 1,
      centerDialogVisible: false,
      inputValue: [
        { desc: '充100万预存款赠送', gift: '50万', value: 1000000 },
        { desc: '充50万预存款赠送', gift: '20万', value: 500000 },
        { desc: '充10万预存款赠送', gift: '3万', value: 100000 },
        { desc: '充1万预存款赠送', gift: '2千', value: 10000 }
      ],
      date: [
        { date: '星期一场', status: 1, hours: '00', minutes: '00', seconds: '00' },
        { date: '星期二场', status: 2, hours: '00', minutes: '00', seconds: '00' },
        { date: '星期三场', status: 3, hours: '00', minutes: '00', seconds: '00' },
        { date: '星期四场', status: 4, hours: '00', minutes: '00', seconds: '00' },
        { date: '星期五场', status: 5, hours: '00', minutes: '00', seconds: '00' },
      ],
      picked: 10000,
      locked: false,
      result: {
        code: '',
        desc: ''
      },
      timer: {
        serviceTime: '', // 服务器时间
        deviceTime: '', // 设备时间
        endTime: '',
        countDay: 0, // 需要显示倒计时的星期
        beginNow: false, // 现在开始抢购 00:00:00 - 10:00:00
        lootAll: false, // 已抢光
      }
    }
  },
  methods: {
    timerText (item) {
      // 当前显示不可抢
      if (item.status === this.weekday) {
        if (item.status === this.timer.countDay && this.timer.beginNow && !this.timer.lootAll) {
          return '正在抢'
        } else if (item.status === this.timer.countDay) {
          if (!this.timer.beginNow) {
            return '距离开始还有'
          }
        } else {
          return '已结束'
        }
      } else {
        if (item.status === this.timer.countDay) {
            return '距离开始还有'
        } else if (item.status > this.timer.countDay) {
          return '未开始'
        } else {
          return '已结束'
        }
      }
    },
    // 倒计时
    getCountTime () {
      let nowDate = new Date().getTime();
      let serviceTimeStamp = new Date(this.timer.serviceTime).getTime()
      let deviceTimeStamp = new Date(this.timer.deviceTime).getTime()
      let endTimeStamp = new Date(this.timer.endTime).getTime()
      let distanceTime = Math.abs(deviceTimeStamp - serviceTimeStamp);
      let standardTime
      if (deviceTimeStamp > serviceTimeStamp) {
        standardTime = nowDate - distanceTime
      } else {
        standardTime = nowDate + distanceTime
      }
      let timer = setTimeout(() => {
        let countDownTime = countDown(endTimeStamp, standardTime)
        // 只判断天
        if (Number(countDownTime.day) <= 0 && Number(countDownTime.hours) <= 0 && Number(countDownTime.minutes) <= 0 && Number(countDownTime.seconds) <= 0) {
          clearTimeout(timer)
          countDownTime = {
            hours: '00',
            minutes: '00',
            seconds: '00'
          }
          // 改变状态
          this.timer.beginNow = true
        } else {
          this.getCountTime();
        }
        this.refreshTime(countDownTime);
      }, 900);
    },
    // 更新到dom
    refreshTime (timer) {
      this.date.forEach((item, index) => {
        // 只判断了天
        let addHours = 0
        if (timer.day > 0) {
          addHours = timer.day * 24
        }
        addHours = Number(timer.hours) + Number(addHours)
        if (addHours < 9) {
          addHours = '0' + addHours
        }
        if (index + 1 === this.timer.countDay) {
          item.hours = addHours
          item.minutes = timer.minutes
          item.seconds = timer.seconds
        }
        this.$set(this.date, index, item)
      })
    },
    gotoRecharge (value) {
      if (!window.localStorage.QingjuuserId) return this.$router.push("/login")
      this.$router.push('/myqingju/recharge?type=2&money=' + value)
    },
    qjDataGet () {
      if (!window.localStorage.QingjuuserId) return this.$router.push("/login")
      if (this.locked) return
      this.locked = true
      api.qjDataGet().then(res => {
        this.result.code = res.errorCode
        this.result.desc = '恭喜您，成功抢到5折优惠'
        this.locked = false
        this.centerDialogVisible = true
      }).catch(err => {
        let code = this.result.code = err.errorCode
        // 记录用户抢劵后的状态
        localStorage.setItem('couponState', code)
        if (code === '8100') {
          this.result.desc = '青矩活动日已结束'
        } else if (code === '8102') {
          this.result.desc = '不在活动时间段内'
        } else if (code === '8103') {
          this.result.desc = '对不起，该活动仅对预充值10万元以上用户开放'
        } else if (code === '8104') {
          this.result.desc = '超出用户可领数量'
        } else if (code === '8105') {
          this.result.desc = '今日优惠券已抢光'
          // 更新到当前天数的下一天
          localStorage.setItem('endTime', this.timer.endTime)
          this.timer.lootAll = true
          this.isCheatDays()
        } else if (code === '8106') {
          this.result.desc = '今日秒杀活动尚未开始，请耐心等待'
        } else if (code === '8107') {
          this.result.desc = '今日活动已结束，请明天继续加油'
        } else {
          this.$message.error(err.errorMsg)
        }
        this.locked = false
        this.centerDialogVisible = true
      })
    },
    isCheatDays () {
      if (this.weekday === 5) {
        // 通过验证
        this.weekday = 6
        this.endTime(3)
      } else {
        this.endTime(1)
      }
    },
    // 初始化上次的状态
    initReState () {
      let state = localStorage.getItem('couponState');
      switch (state) {
        case '8105':
          this.timer.lootAll = true
          this.isCheatDays()
        default:
          break;
      }
    },
    endTime (addDay) {
      let serviceNow = new Date(new Date(this.timer.serviceTime).getTime())
      let dates = serviceNow.getDate() + addDay
      if (this.weekday === 6 || this.weekday === 0) {
        // 星期六、日开始星期一
        this.timer.countDay = 1
      } else {
        this.timer.countDay = serviceNow.getDay()
        this.timer.countDay += addDay
      }
      // 只能+1 倒计时的时间
      // 结束倒计时 10:00:00 当天或者下一天
      this.timer.endTime = serviceNow.getFullYear() + '/' + (serviceNow.getMonth() + 1) + "/" + dates + ' ' + "10:00:00"
      let overTime = serviceNow.getFullYear() + '/' + (serviceNow.getMonth() + 1) + "/" + dates + ' ' + "18:00:00"
      let endTimeNow = new Date(new Date(this.timer.endTime).getTime())
      // 当前的时间大于了结束时间
      if (serviceNow.getTime() > endTimeNow.getTime() && serviceNow.getMonth() === endTimeNow.getMonth() && serviceNow.getDay() === endTimeNow.getDay()) {
        this.timer.beginNow = true
        if (serviceNow.getTime() > Date.parse(overTime)) {
          this.timer.lootAll = true
          this.isCheatDays()
        }
      } else {
        this.timer.beginNow = false
      }

      this.getCountTime()
    },
    isNowDay (endTime, nowTime) {
      let endTimeYear = endTime.getFullYear()
      let nowTimeYear = nowTime.getFullYear()
      let endTimeMonth = endTime.getMonth()
      let nowTimeMonth = nowTime.getMonth()
      let endTimeDay = endTime.getDay()
      let nowTimeDay = nowTime.getDay()
      if (endTimeYear === nowTimeYear && endTimeMonth === nowTimeMonth && endTimeDay === nowTimeDay) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    document.getElementById('header-com').style.position = 'relative';
    this.timer.serviceTime = this.timer.serviceTime || new Date().getTime()
    // 不足
    let serviceNow = new Date(new Date(this.timer.serviceTime).getTime())
    let localTime
    if (localStorage.getItem('endTime')) {
      localTime = new Date(new Date(localStorage.getItem('endTime')).getTime())
    }
    this.weekday = serviceNow.getDay()
    this.timer.countDay = this.weekday
    // 当前设备的时间
    this.timer.deviceTime = new Date()
    if (localStorage.getItem('couponState') === '8105' && localTime &&this.isNowDay(serviceNow, localTime)) {
      this.initReState()
    } else {
      // 到当前的下一天10:00:00
      if (this.weekday > 0 && this.weekday < 6) {
        this.endTime(0)
      } else if (this.weekday === 0) {
        this.endTime(1)
      } else if (this.weekday === 6) {
        this.endTime(2)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.context {
  margin: 0 auto;
  background-color: #a22137;
  overflow: hidden;
  > div {
    width: 1199px;
    margin: 105px auto 0;
  }
  .first {
    height: 597px;
    background-color: #fff;
    > h3 {
      color: #6f051b;
      padding: 70px 0 40px;
    }
    > .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      color: #b8002f;
      > li {
        flex: 0 0 560px;
        width: 560px;
        height: 140px;
        border-radius: 8px;
        background-color: #fde3c7;
        margin: 10px;
        > div {
          margin-left: 15px;
          &:first-child {
            width: 255px;
            height: 100%;
            i {
              font-size: 29px;
              & + span {
                font-size: 100px;
                font-weight: 700;
              }
            }
          }
          &:last-child {
            height: 100%;
            > span {
              display: block;
              font-size: 30px;
              font-weight: 700;
              margin: 22px 0;
            }
            > a.button {
              font-size: 20px;
              width: 161px;
              height: 34px;
              line-height: 34px;
              border-radius: 20px;
            }
          }
        }
      }
    }
    .tips {
      font-size: 28px;
      margin-left: 35px;
      margin-top: 15px;
    }
  }
  .second {
    > h3 {
      color: #f5eecb;
    }
    .date {
      display: flex;
      padding-top: 76px;
      justify-content: space-around;
      > li {
        flex: 0 0 214px;
        width: 214px;
        height: 240px;
        border-radius: 5px;
        background-color: #fff;
        > div {
          text-align: center;
          &:first-child {
            color: #656565;
            height: 172px;
            background: url(~@/assets/img/light.png) no-repeat center;
            border-bottom: 1px dashed #000;
            > p {
              &:first-child {
                font-size: 24px;
                margin-top: 20px;
              }
              &:last-child {
                font-size: 14px;
                margin-top: 100px;
              }
            }
          }
          &:last-child {
            position: relative;
            &::before,
            &::after {
              content: '';
              display: block;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              position: absolute;
              top: 0;
              background-color: #a22137;
            }
            &::before {
              left: 0;
              transform: translateY(-50%) translateX(-50%);
            }
            &::after {
              right: 0;
              transform: translateY(-50%) translateX(50%);
            }
            > p {
              display: flex;
              height: 46px;
              align-items: center;
              justify-content: center;
              > i {
                width: 30px;
                height: 30px;
                line-height: 30px;
                background-color: #5f5751;
                color: #fff;
              }
              > a.button {
                font-size: 16px;
                width: 127px;
                height: 27px;
                line-height: 27px;
                border-radius: 14px;
              }
            }
          }
        }
        &.active {
          > div {
            &:first-child {
              background-image: url(~@/assets/img/light-02.png);
            }
          }
        }
      }
    }
    .tips {
      font-size: 28px;
      color: #fff;
      padding: 30px 0 75px 35px;
    }
  }
  .attention {
    box-sizing: border-box;
    padding: 40px;
    color: #fff;
    background-color: #730105;
    margin-bottom: 150px;
    > h4 {
      text-align: center;
      font-size: 16px;
      margin-bottom: 30px;
    }
    > ul {
      font-size: 14px;
      > li {
        line-height: 40px;
      }
    }
  }
  h3 {
    font-size: 60px;
    text-align: center;
  }
  a.button {
    display: block;
    text-align: center;
    color: #fff;
    background-color: #b5002f;
  }
}
.result {
  text-align: center;
  > p {
    margin-top: 10px;
    font-size: 24px;
  }
}
</style>
