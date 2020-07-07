<template>
  <div class="friend-container">
    <div class="top-banner">
      <!--  -->
      <div class="container">
        <div v-if="$store.state.userInfo.isFriend">
          <!-- 未开通页面 authType 1：个人注册 2：企业注册 -->
          <p class="invitation-title">恭喜您成为青友，您的邀请码为【{{invitationCode}}】</p>
          <p class="invitation-link-title" id="invitation-link">邀请链接为:{{locationUrl}}register/person?code={{invitationCode}}</p>
          <input type="text" style="opacity: 0;" ref="linkHref" :value="locationUrl+'register/person?code='+invitationCode">
          <div class="copy-btn" @click="copyClick">点击复制邀请链接</div>
        </div><!-- userCategoryCode 个人账号 -->
        <!-- 限制条件： 普通用户的个人注册 -->
        <div v-else>
          <p class="look-for-person"></p>
          <p class="top-banner-title">申请准入零门槛 百万佣金轻松拿</p>
          <div class="top-btn" @click="joinClick">立即加入</div>
          <span class="arrow-icons"></span>
        </div>
      </div>
    </div>
    <div class="what-qy">
      <div class="container what-inner">
        <p class="intro-title">工程咨询领先企业“天职咨询”鼎力支持<br />行业内30多家企业及个人股东强烈推荐</p>
        <div class="block block-01">
          <p class="qy-question">青友是什么？</p>
          <p class="qy-answer">“青友”是指青矩用户在青矩平台进行一键申请后，拥有系统自动发送的唯一【邀请码】的青矩代理商</p>
        </div>
        <div class="block">
          <p class="qy-question">青友招募计划是什么？</p>
          <p class="qy-answer">“青友招募计划”是“青友”凭借【邀请码】邀请新用户注册及在青矩平台发布项目，享受平台高额奖励金的用户激励计划</p>
        </div>
        <p class="phone-number">服务热线电话：400-697-5677</p>
      </div>
      <div class="scroll-container">
        <div class="container row-scroll">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in swiperInfo" :key="index" class="row-item">
              <span class="col-item">{{item.text1}}</span>
              <span class="col-item">{{item.text2}}</span>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <p class="tip">*以上均为青矩智享合作股东单位，排名不分先后</p>
    </div>
    <div class="why-qj">
      <div class="container">
        <p class="why-qj-title">为什么选择青矩</p>
        <ul class="block">
          <li class="item">
            <i class="icon icons-01"></i>
            <p class="item-title">行业领先品牌</p>
            <p class="details">国内首家互联互通的工程咨询服务平台，工程咨<br />询+互联网模式的探索者和引领者。</p>
          </li>
          <li class="item">
            <i class="icon icons-02"></i>
            <p class="item-title">遍布全国的合作商及服务商</p>
            <p class="details">青矩互联目前在全国拥有30多家作业中心，<br />近千名造价员与百余名造价师人员储备丰富。
            </p>
          </li>
          <li class="item">
            <i class="icon icons-03"></i>
            <p class="item-title">青矩1.0标准化模式</p>
            <p class="details">以工厂化、模块化为主要运作思路，采用标准流<br />水线模式，通过专业化标准化的协同作业、工序<br />核验，实现构件级的质量精度保障。</p>
          </li>
          <li class="item">
            <i class="icon icons-04"></i>
            <p class="item-title">青矩2.0智能建模模式</p>
            <p class="details">自主研发国内首款智慧造价建模机器人，开创了<br />“机器人自动建模图形算量”的新时代。</p>
          </li>
          <li class="item">
            <i class="icon icons-05"></i>
            <p class="item-title">业务全覆盖，专业全包含</p>
            <p class="details">工程计量、BIM、设计项目均可支持。</p>
          </li>
          <li class="item">
            <i class="icon icons-06"></i>
            <p class="item-title">模式简单，轻松获得项目奖励</p>
            <p class="details">一键申请，完成认证，佣金随时提现。奖励金实<br />现累积制，邀请的越多，获得奖励金越多。</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="become-qy">
      <p class="become-title">成为青友，邀请就送3重奖励金</p>
      <p class="flow-title">第<i class="number-icons number-icons-01"></i>重：注册奖励金</p>
      <p class="flow-details">受邀用户注册青矩平台时，填写有效青友的【邀请码】，在一年内发布任意项目成功后，青友均可享受项目实际金额的3%奖励。</p>
      <img class="flow-bg flow-bg01" :src="require('@/assets/img/qy-flow-01.png')" />
      <p class="flow-title">第<i class="number-icons number-icons-02"></i>重：首单奖励金</p>
      <p class="flow-details">青友邀请用户注册，受邀用户发布第一单项目成功后，青友将额外获得100元注册奖励金。</p>
      <img class="flow-bg flow-bg02" :src="require('@/assets/img/qy-flow-02.png')" />
      <p class="flow-title">第<i class="number-icons number-icons-03"></i>重：项目奖励金</p>
      <p class="flow-details">受邀用户在一年内发布任意项目，并填写有效青友的【邀请码】，项目完成7天后，系统把项目1%-5%奖励金按照差额累计规则返入该“青友”的奖励金账户。</p>
      <img class="flow-bg flow-bg03" :src="require('@/assets/img/qy-flow-03.png')" />
      <img :src="require('@/assets/img/qy-flow-05.png')" alt="" class="rules-img">
      <p class="become-title">躺赚奖励金……</p>
      <div class="container">
        <b class="eg-title">eg：</b>
        <div class="eg-details">
          <p class="rules">某青友全年累计在青矩平台邀请客户发布了100万元项目（客户发布项目时填写了该青友的邀请码），那么他将获得：10万元项目的1%提成奖励金，10万元项目的2%提成奖励金，15万元项目的3%提成奖励金，
            15万元项目的4%提成奖励金，以及50万元的5%提成奖励金。</p>
          <p class="calc-formula">共计1000元+2000元+4500元+6000元+25000元=<span class="result-number">38500</span>元项目奖励金。</p>
          <p class="rules row-top">另外，该青友邀请10名用户注册，其中7名用户在青矩平台发布了60万元的项目（客户注册青矩时填写了该青友的邀请码）。那么该青友又将获得60万元的3%注册奖励金。</p>
          <p class="calc-formula">600000×0.03=<span class="result-number">18000</span>元注册奖励金。</p>
          <p class="rules row-top">由于7名用户是首次在青矩平台发布项目，那么该青友又可获得<span class="calc-formula">700元首单奖励金</span>。</p>
          <p class="calc-formula">
            <span>该青友获得奖励金总额为：</span>
            38500元+18000元+700元=<span class="result-number">57200</span>元。</p>
        </div>
        <div class="join-block">
          <span class="fire-icon"></span>
          <span class="join-title">假如您拥有自己的渠道、项目或客户群体。那么，您的回报率将成指数级增长</span>
          <span class="join-btn" @click="joinClick" v-if="$store.state.userInfo.authType != '2' && !$store.state.userInfo.isFriend">火速加入</span>
        </div>
      </div>
    </div>
    <div class="protect-qy">
      <p class="gray-title">权益保障，青友利益即是我们利益</p>
      <div class="protect-block">
        <img class="protect-img" :src="require('@/assets/img/qy-icon-01.png')" />
        <div class="protect-item protect-item-01">
          <i class="protect-icons icons-01"></i>
          <div class="item-inline">
            <p class="item-title">零门槛成为青友</p>
            <p class="item-details">无需任何条件，登录平台一键申请即可成为青友</p>
          </div>
        </div>
        <div class="protect-item protect-item-02">
          <i class="protect-icons icons-02"></i>
          <div class="item-inline">
            <p class="item-title">首次邀请额外奖励金</p>
            <p class="item-details">受邀用户发布第一单项目成功后，青友将额外获得100元注册奖励金</p>
          </div>
        </div>
        <div class="protect-item  protect-item-03">
          <div class="item-inline">
            <p class="item-title">累积奖励金制度</p>
            <p class="item-details">阶梯制奖励规则，邀请的越多奖励金越多</p>
          </div>
          <i class="protect-icons icons-03"></i>
        </div>
        <div class="protect-item  protect-item-04">
          <div class="item-inline">
            <p class="item-title">提现便捷 审核高效</p>
            <p class="item-details">奖励金提现便捷，提高青友资金流转效率</p>
          </div>
          <i class="protect-icons icons-04"></i>
        </div>
      </div>
    </div>
    <div class="honor-qj" id="section-one">
      <p class="gray-title">青矩的荣誉</p>
      <ul class="honor-block">
        <li class="honor-item">
          <div class="item-img">
            <img :src="require('@/assets/img/honor-01.png')" alt="">
          </div>
          <p class="honor-details">“互联网+标准化工程造价模式的创新<br />与实践”项目荣获2017年第三十二届<br />北京市管理现代化创新成果一等奖</p>
        </li>
        <li class="honor-item">
          <div class="item-img">
            <img :src="require('@/assets/img/honor-02.png')" alt="">
          </div>
          <p class="honor-details">青矩互联入围2018中国美好生活首批<br />候选独角兽企业</p>
        </li>
        <li class="honor-item">
          <div class="item-img">
            <img :src="require('@/assets/img/honor-03.png')" alt="">
          </div>
          <p class="honor-details">青矩计量服务团队荣获2019年第三届<br />RICS Awards中国年度大奖“年度专<br />业咨询服务团队”优胜奖</p>
        </li>
      </ul>
      <!-- {{flagScroll}} -->
      <!-- <div class="section-bg-mask ani-show" :class="{'ani-none':flagScroll}" id="ani-ar-1-1"></div> -->
      <!-- :class="{'ani-show': flag}" -->
      <!-- <img src="../../assets/img/cir.png" alt="" class="section-bg ani-none" id="ani-ar-1"> -->
    </div>
    <div class="apply-qy" id="section-two" ref="applyRef">
      <p class="apply-title">青友申请流程</p>
      <p class="apply-details">登录青矩平台，注册成为用户，一键触发无需等待，系统自动发放邀请码， <br> 青友持该邀请码可邀请用户进行“平台注册”及“项目发布”</p>
      <ul class="apply-ul container">
        <li class="apply-item">
          <div class="iconbg">
            <img :src="require('@/assets/img/qy-apply-icon01.png')" alt="">
          </div>
          <p class="apply-tip">平台注册<br />成为青矩用户</p>
        </li>
        <li class="apply-item">
          <div class="iconbg">
            <img :src="require('@/assets/img/qy-apply-icon02.png')" alt="">
          </div>
          <p class="apply-tip">一键触发<br />成功无需等待</p>
        </li>
        <li class="apply-item">
          <div class="iconbg">
            <img :src="require('@/assets/img/qy-apply-icon04.png')" alt="">
          </div>
          <p class="apply-tip">成为青友<br />系统发放邀请码</p>
        </li>
      </ul>
      <div class="apply-btn" @click="joinClick" v-if="$store.state.userInfo.authType != '2' && !$store.state.userInfo.isFriend">立即加入</div>
      <div class="apply-bg"></div>
    </div>
    <div class="precautions-qy">
      <div class="container">
        <p class="precautions-title">注意事项</p>
        <ul class="precautions-ul">
          <li>1.成为“青友”后，需积极配合青矩互联平台品牌宣传工作，邀请尽可能多的用户成功发布项目，这样才能获得平台奖励金；</li>
          <li>2.“青友”在进行品牌宣传工作时，不得违反国家法律法规及平台规定，否则青矩有权注销其青友的身份；</li>
          <li>3.“青友”可向青矩互联平台申请宣传物料，包括青矩宣传册、青矩ppt、宣传视频等；</li>
          <li>4.青矩互联保障“青友”在青矩互联平台的一切正当收益，并且“青友”每个月25号以后可以申请奖励金提现；</li>
          <li>5.“青友”奖励金账户余额一经提现，“青友”项目奖励金将根据提现后的金额重新累计计算；</li>
          <li>6.“青友”账户按自然年进行结算，年度结算日为12.25-12.31。在结算日前7天，系统将提醒“青友”及时提现，如超过结算日仍未申请提现，系统将自动清零奖励金账户余额，
            并将未提现奖励金账户余额转移至结算账户金额，结算账户金额依旧可以线下提现，但“青友”奖励金返还比例将重新累计；</li>
          <li>7.2019年9月1日前已注册的用户在青矩平台用户发布项目不可填入【邀请码】；</li>
          <li>8.新用户注册申请成为“青友”后，又成为青矩智享股东的用户，不能作为被邀用户发布项目；</li>
          <li>9.“青友”使用邀请码邀请用户注册及发布项目，在一个周期年内，“青友”将按【规则比例】获得受邀用户成功发布项目金额的一部分作为注册奖励金及项目奖励金。一个周期年后，“青友”不再享受受邀用户发布项目的注册奖励金及项目奖励金；</li>
          <li>10.青友惠计划最终解释权归青矩互联。</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '@/fetch/api'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    // speed: 1000,
    // direction : 'vertical',
    // height: 60,
    // slidesPerView: 2,
    // slidesPerColumn: 1,
    return {
      swiperInfo: [
        {
          text1: '北京赋佳慧祥工程造价咨询有限公司',
          text2: '宁波中成工程造价咨询有限公司'
        },
        {
          text1: '河北中企华工程造价咨询有限公司',
          text2: '新疆驰远天合工程造价咨询有限公司'
        },
        {
          text1: '山西嘉盛工程造价咨询有限公司',
          text2: '河北丰信工程咨询有限公司'
        },
        {
          text1: '中德华建（北京）国际工程技术有限公司',
          text2: '陕西万隆金剑工程管理咨询有限公司'
        },
        {
          text1: '北京佳益工程咨询有限公司',
          text2: '浙江印相工程咨询有限公司'
        },
        {
          text1: '湖南永信工程项目管理有限公司',
          text2: '上海宗明企业管理合伙企业（有限合伙）'
        },
        {
          text1: '山东公平工程咨询有限责任公司',
          text2: '浙江中合管理有限公司'
        },
        {
          text1: '新疆中奕工程管理咨询有限公司',
          text2: '北京佳益工程咨询有限公司',
        }
      ],
      swiperOption: {
        loop: true,
        slidesPerView: 4, //一行显示4个
        // slidesPerColumn: 2,//显示2行
        speed: 2000,
        autoplay: true
      },
      currentUserInfo: '', // 当前用户的状态
      invitationCode: '',
      locationUrl: process.env.siteUrl,
      flagScroll: false
    }
  },
  methods: {
    copyClick() {
      this.$refs.linkHref.select()
      document.execCommand('Copy') // 执行浏览器复制命令
    },
    joinClick() {
      if (!window.localStorage.QingjuuserId) {
        this.$router.push('/login')
        return this.$message.error('您当前未登录，请先登录')
      }
      if (this.$store.state.userInfo.userCategoryCode === '1' || this.$store.state.userInfo.userCategoryCode === '0') {
        return this.$message.error('您是企业用户，不能申请青友')
      }

      if (this.currentUserInfo) {
        // 判断字段有点问题，没有按照流程判断-需要接口的验证
        if (this.currentUserInfo.dataList[0] == 1 && this.currentUserInfo.status == 'Auth_Pass') {
          this.$message.error('您已经注册企业认证，不能申请青友')
        } else if (this.currentUserInfo.dataList[0] == 1 && this.currentUserInfo.status != 'Auth_Pass') {
          this.$message.error('您申请了企业认证，不能申请青友')
        } else {
          this.joinTheYouth()
        }
      } else {
        api.judgeAuth().then(res => {
          this.currentUserInfo = res
          // 判断字段有点问题，没有按照流程判断-需要接口的验证
          if (res.dataList[0] == 1 && res.status == 'Auth_Pass') {
            this.$message.error('您已经注册企业认证，不能申请青友')
          } else if (res.dataList[0] == 1 && res.status != 'Auth_Pass') {
            this.$message.error('您申请了企业认证，不能申请青友')
          } else {
            this.joinTheYouth()
          }
        })
      }
    },
    joinTheYouth() {
      api.joinTheYouth(JSON.parse(window.localStorage.QingjuuserId)).then(res => {
        this.$message.success('已成为青友用户')
        api.getUserInfo().then(res => {
          this.$store.commit('setUserInfo', res.dataList[0])
        })
        api.getIvCodeAndIvlist().then(res => {
          this.invitationCode = res.invitationCode
        })
      })
    }
  },
  mounted() {
    // 获得邀请码
    api.getIvCodeAndIvlist().then(res => {
      this.invitationCode = res.invitationCode
    })
    // this.$nextTick(function () {
    //   /* 根据用户滚动的高度去改变 */
    //   window.addEventListener('scroll', function(e) {
    //     let scrollTop = document.documentElement.scrollTop
    //     console.log(scrollTop, 'df')
    //     if (scrollTop > 6500) {
    //       this.flagScroll = true
    //     } else {
    //       this.flagScroll = false
    //     }
    //     console.log(this.flagScroll, 'flag')
    //   })
    // })
  }
}
</script>
<style lang="less" scoped>
.friend-container {
  overflow: hidden;
}
.top-banner {
  width: 100%;
  height: 900px;
  background: url('../../assets/img/qy-top.jpg') no-repeat;
  background-size: cover;
  position: relative;
  margin-top: 130px;
}
.look-for-person {
  background: url('../../assets/img/friend03.png') no-repeat;
  text-align: center;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 1140px;
  height: 247px;
}
.top-banner-title {
  min-width: 850px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 26px;
  position: absolute;
  top: 506px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
.invitation-title {
  min-width: 1200px;
  font-size: 60px;
  color: #fff;
  font-weight: bold;
  // letter-spacing: 5px;
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
.invitation-link-title {
  min-width: 1500px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 5px;
  position: absolute;
  top: 500px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
.copy-btn {
  width: 444px;
  height: 72px;
  border: 1px solid rgba(245, 244, 250, 1);
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  line-height: 72px;
  position: absolute;
  top: 600px;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: pointer;
  &:hover {
    color: #0afa6d;
    border-color: #0afa6d;
  }
}
.why-qj-title {
  color: hsla(0, 0%, 51%, 1);
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 80px;
  text-align: center;
}
.top-btn {
  width: 444px;
  height: 72px;
  line-height: 72px;
  background: rgba(69, 191, 153, 1);
  border-radius: 5px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  letter-spacing: 3px;
  position: absolute;
  top: 615px;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: pointer;
  text-align: center;
  &:hover {
    background: rgba(69, 200, 153, 1);
  }
}
.arrow-icons {
  text-align: center;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url('../../assets/img/arrow-qyh.png') no-repeat center;
  position: absolute;
  top: 800px;
  left: 50%;
  transform: translate(-50%, 0);
}
.container {
  overflow: hidden;
}
.what-qy {
  background-color: #f5f4fa;
  color: #262936;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 234px;
    height: 100%;
    background: url('../../assets/img/what-qy.png') no-repeat center;
  }
  .what-inner {
    padding: 0 60px;
    box-sizing: border-box;
  }
  .intro-title {
    font-size: 60px;
    color: #262936;
    margin: 0 auto;
    margin-top: 90px;
    margin-bottom: 60px;
    font-weight: bold;
    text-align-last: justify;
  }
  .block-01 {
    margin-bottom: 50px;
  }
  .qy-question {
    font-size: 30px;
    &:after {
      content: '';
      display: inline-block;
      width: 136px;
      height: 25px;
      background: url('../../assets/img/arrow-qy01.png') no-repeat center;
      position: relative;
      top: 3px;
      left: 5px;
    }
  }
  .phone-number {
    font-size: 30px;
    text-align: center;
    margin-top: 60px;
    margin-bottom: 60px;
    font-weight: bold;
  }
  .qy-answer {
    font-size: 14px;
    margin-top: 10px;
  }
  .scroll-container {
    height: 80px;
    background-color: #fff;
    overflow: hidden;
  }
  .row-scroll {
    background-color: #f8f8fa;
    margin-top: 10px;
    height: 60px;
    overflow: hidden;
    cursor: pointer;
  }
  .col-item {
    font-size: 14px;
    display: inline-block;
    min-width: 280px;
    height: 30px;
    line-height: 30px;
    color: hsla(0, 0%, 48%, 1);
  }
  .row-item {
    min-width: 280px;
    // height: 30px;
    // line-height: 30px;
  }
  .tip {
    font-size: 12px;
    text-align: center;
    padding: 10px;
  }
}
.why-qj {
  background-color: #fff;
  padding: 70px 0 70px 0;
  .title {
    color: #818181;
    font-size: 60px;
    text-align: center;
  }
  .block {
    display: flex;
    flex: 1;
    justify-content: space-around;
    flex-wrap: wrap;
    .item {
      width: 380px;
      background-color: #f2f2f2;
      margin-bottom: 30px;
      transition: 0.4s;
      border-radius: 5px;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 10px 0 #ccc;
        transform: scale(1.02);
      }
      .icon {
        display: inline-block;
        width: 380px;
        height: 200px;
      }
      .icons-01 {
        background: url('../../assets/img/why-qy-01.png') no-repeat center;
      }
      .icons-02 {
        background: url('../../assets/img/why-qy-02.png') no-repeat center;
      }
      .icons-03 {
        background: url('../../assets/img/why-qy-03.png') no-repeat center;
      }
      .icons-04 {
        background: url('../../assets/img/why-qy-04.png') no-repeat center;
      }
      .icons-05 {
        background: url('../../assets/img/why-qy-05.png') no-repeat center;
      }
      .icons-06 {
        background: url('../../assets/img/why-qy-06.png') no-repeat center;
      }
      .item-title {
        font-size: 24px;
        color: #515369;
        text-align: center;
        margin-top: 10px;
      }
      .details {
        font-size: 14px;
        color: #7b7b7b;
        margin-bottom: 15px;
        margin-top: 10px;
        text-align: center;
      }
    }
  }
}
.become-title {
  font-size: 60px;
  text-align: center;
  font-weight: bold;
  color: #fff;
}
.become-qy {
  background-color: rgba(32, 31, 69, 1);
  color: #ebeaea;
  padding-top: 110px;
  padding-bottom: 30px;
  .become-title-02 {
    margin-top: 65px;
  }
  .rules-img {
    width: 977px;
    height: 375px;
    margin: 55px auto 120px;
    display: block;
  }
  .flow-title {
    text-align: center;
    margin-top: 70px;
    font-size: 36px;
    color: #fff;
    .number-icons {
      display: inline-block;
    }
    .number-icons-01 {
      width: 35px;
      height: 75px;
      background: url('../../assets/img/1.png') no-repeat center;
    }
    .number-icons-02 {
      width: 54px;
      height: 75px;
      background: url('../../assets/img/2.png') no-repeat center;
    }
    .number-icons-03 {
      width: 54px;
      height: 75px;
      background: url('../../assets/img/3.png') no-repeat center;
    }
  }
  .flow-details {
    font-size: 18px;
    margin: 30px 0;
    text-align: center;
  }
  .flow-bg {
    display: block;
    margin: auto;
  }
  .flow-bg01 {
    width: 1171px;
  }
  .flow-bg02 {
    width: 192px;
  }
  .flow-bg03 {
    width: 1212px;
  }
  .eg-title {
    font-size: 30px;
    margin-top: 60px;
  }
  .rules {
    font-size: 14px;
    line-height: 24px;
  }
  .row-top {
    margin-top: 20px;
  }
  .result-number {
    color: #00f0ff;
  }
  .calc-formula {
    font-size: 18px;
  }
  .fire-icon {
    .fire {
      content: '';
      position: absolute;
      top: -80px;
      left: 160px;
      z-index: 2;
      width: 282px;
      height: 105px;
      background: url('../../assets/img/fire-01.png') no-repeat center;
    }
    &:before {
      .fire();
    }
    &:after {
      .fire();
      top: -68px;
      left: 400px;
      z-index: 1;
    }
  }
  .join-block {
    font-size: 24px;
    padding: 0 20px;
    line-height: 36px;
    position: relative;
    width: 85%;
    max-width: 1093px;
    background-color: #f7931e;
    border-radius: 50px;
    height: 36px;
    margin-top: 90px;
  }
  .join-title {
    position: absolute;
    z-index: 3;
    color: #fff;
  }
  .join-btn {
    padding: 0 20px;
    line-height: 30px;
    background-color: #fff;
    font-size: 22px;
    color: hsla(32, 93%, 54%, 1);
    border-radius: 50px;
    position: absolute;
    right: 4px;
    top: 3px;
    cursor: pointer;
    &:after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid hsla(32, 93%, 54%, 1);
      position: relative;
      left: 5px;
    }
  }
}
.gray-title {
  color: hsla(0, 0%, 51%, 1);
  font-size: 60px;
  font-weight: bold;
  text-align: center;
}
.protect-qy {
  padding: 100px 0;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background: url('../../assets/img/qy-benefit.png') no-repeat center;
    background-size: cover;
    width: 100%;
    height: 867px;
    z-index: -1;
  }
  .protect-img {
    display: block;
    margin-top: 115px;
    width: 606px;
    height: 608px;
    margin: auto;
  }
  .protect-block {
    position: relative;
    width: 606px;
    height: 608px;
    margin: auto;
    margin-top: 120px;
  }
  .protect-item {
    position: absolute;
  }
  .protect-item-01 {
    right: -300px;
    top: 60px;
  }
  .protect-item-02 {
    right: -520px;
    top: 300px;
  }
  .protect-item-03 {
    left: -355px;
    top: 300px;
  }
  .protect-item-04 {
    left: -250px;
    bottom: 0;
  }
  .protect-icons {
    display: inline-block;
    width: 70px;
    height: 70px;
  }
  .item-inline {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .item-title {
      font-size: 24px;
      color: hsla(235, 13%, 36%, 1);
    }
    .item-details {
      font-size: 14px;
      color: hsla(0, 0%, 48%, 1);
      margin-top: 10px;
    }
  }
  .icons-01 {
    background: url('../../assets/img/qy-protect-01.png') no-repeat center;
  }
  .icons-02 {
    background: url('../../assets/img/qy-protect-02.png') no-repeat center;
  }
  .icons-03 {
    background: url('../../assets/img/qy-protect-03.png') no-repeat center;
  }
  .icons-04 {
    background: url('../../assets/img/qy-protect-04.png') no-repeat center;
  }
}
.honor-qj {
  background-color: #fff;
  // background-color: hsla(0, 0%, 97%, 1);
  padding: 100px 0;
  // padding-bottom: 200px;
}
.honor-block {
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding-top: 110px;
}
@media screen and (min-width: 1400px) {
  .honor-block {
    padding-left: 200px;
    padding-right: 200px;
  }
}
.honor-item {
  width: 410px;
  .item-img {
    height: 471px;
  }
}

.honor-details {
  margin-top: 50px;
  color: hsla(235, 13%, 36%, 1);
  font-size: 18px;
  text-align: center;
}
#section-one {
  position: relative;
  z-index: 10;
}
.section-bg {
  &.ani-none {
    transform: translateX(-50%) scaleY(1);
    transition: 0.8s all cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  &.ani-show {
    transform: translate(-50%, 80px) scaleY(0);
    transition: 0.8s all cubic-bezier(0.215, 0.61, 0.355, 1);
  }
}
#section-one .section-bg-mask {
  width: 100%;
  position: absolute;
  bottom: -30px;
  left: 0;
  height: 80px;
  z-index: -1;
  background-color: #fff;
  &.ani-show {
    transform: translateY(80px);
    transition: 0.8s all cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &.ani-none {
    transform: translateY(0px);
    transition: 0.8s all cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
}
.section-bg {
  min-width: 1920px;
  width: 100%;
  position: absolute;
  left: 50%;
  // bottom: 0;
  z-index: -1;
  transform: translateX(-50%);
}
#section-two {
  position: relative;
  z-index: 9;
}
.apply-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: -100px;
  bottom: 0;
  background-image: linear-gradient(45deg, #0afa6d 5%, #56cb63 70%, #3eae8b);
  z-index: -1;
}
.apply-qy {
  padding: 200px 0 100px 0;
  .apply-title {
    font-size: 60px;
    color: #fff;
    text-align: center;
  }
  .apply-details {
    font-size: 18px;
    color: hsla(0, 0%, 97%, 1);
    margin: 50px;
    text-align: center;
    line-height: 24px;
  }

  .apply-ul {
    display: flex;
    justify-content: space-between;
  }
  .iconbg {
    width: 120px;
    height: 120px;
    background-color: #fff;
    border-radius: 50%;
    margin: auto;
    > img {
      width: 60px;
      height: 60px;
      margin: 30px;
    }
  }
  .apply-item {
    width: 200px;
    position: relative;
    display: inline-block;
    &:after {
      content: '';
      position: absolute;
      top: 50px;
      right: -62px;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid #eafbff;
    }
  }
  .apply-btn {
    border: 1px solid hsla(0, 0%, 100%, 1);
    padding: 25px 100px;
    font-size: 24px;
    width: 312px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 50px;
    color: #fff;
    margin: 150px auto 0;
    cursor: pointer;
    &:hover {
      color: rgba(69, 191, 153, 1);
      background-color: #fff;
    }
  }
  .apply-tip {
    margin-top: 50px;
    color: #fff;
    text-align: center;
  }
}
.precautions-qy {
  padding: 80px 0 160px 0;
  background-color: #fff;
  .precautions-title {
    color: hsla(0, 0%, 0%, 1);
    font-size: 36px;
    margin-bottom: 60px;
    font-weight: bold;
  }
  .precautions-ul {
    font-size: 18px;
    color: hsla(0, 0%, 20%, 1);
    > li {
      line-height: 32px;
    }
  }
}
</style>
