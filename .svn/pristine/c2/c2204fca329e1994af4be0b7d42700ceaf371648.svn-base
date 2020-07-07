<template>
  <div class="facilitator-container">
    <div class="header-img" style="margin-top: 130px;" @click="clickTo">
      <!-- <div class="button">服务商合作</div> -->
      <!-- <router-link to="/collaborationService/validate" class="button">服务商合作</router-link> -->
      <!-- <button @click="clickTo" class="button">服务商合作</button> -->
    </div>
    <div class="partner-good">
      <h2 class="title">合作优势</h2>
      <ul class="good-ul">
        <li>
          <i class="icons icons-01"></i>
          <p class="li-title">标准化体系</p>
          <p class="li-detail">
            青矩对合作伙伴进行统一的标准化造价培训，保证合作伙伴在原有的作业基础上提升作业速度，保证作业质量，实现人力资源的高效、精准打造。标准作业模式下实现统一收费，规范行业收费标准。
          </p>
        </li>
        <li>
          <i class="icons icons-02"></i>
          <p class="li-title">技术支持</p>
          <p class="li-detail">
            享受两大系统支持：作业系统与项目管理系统作业系统实现在线拆解、分配、组合项目，责任到人。同时实时在线查询项目进度，检查项目质量，保证项目可视化、可控化。项目管理系统实现人力资源管理、项目管理、财务管理等多项公司内部管理，协助合作伙伴的便捷化管理，实现智能办公。
          </p>
        </li>
        <li>
          <i class="icons icons-03"></i>
          <p class="li-title">降低风险</p>
          <p class="li-detail">
            依托青矩体系并在标准化协同的基础上实现业务均衡承做，降低企业经营风险，顺利实现企业运营模式转型。
          </p>
        </li>
        <li>
          <i class="icons icons-04"></i>
          <p class="li-title">业务量增加</p>
          <p class="li-detail">
            依托青矩互联平台共同流量的打造，提高团队业务饱满度，实现盈亏平衡，达到团队建设与经营效果相得益彰。
          </p>
        </li>
      </ul>
    </div>
    <div class="partner-modal">
      <h2 class="title">合作模式</h2>
      <ul class="modal-ul">
        <li class="img01">直营模式</li>
        <li class="img02">特许经营</li>
      </ul>
    </div>
    <div class="work-center">
      <h2 class="title">作业中心</h2>
      <ul class="work-choice" v-if='false'>
        <li @click="flagFun('price')">交易额</li>
        <li @click="flagFun('score')">评分</li>
        <li @click="flagFun('area')">规模</li>
        <li @click="flagFun('index')">指数</li>
      </ul>
      <!-- vue-awesome-swiper -->
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in swiperInfo" :key="index">
          <div>
            <div class="mask">{{item.text}}</div>
            <img class="swiper-img" :src="item.url" alt="">
          </div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-button-prev swiper-button-prev-self" slot="button-prev" @click="prevFive" v-if="swiperInfo.length > 5"></div>
        <div class="swiper-button-next swiper-button-next-self" slot="button-next" @click="nextFive" v-if="swiperInfo.length > 5"></div>
      </swiper>
    </div>
    <div class="standard-learn">
      <div class="title">标准化培训</div>
      <ul class="learn-ul">
        <li>
          <img src="../../assets/img/fws-learn-img1.jpg" alt="">
          <p class="li-title">工作平台培训</p>
          <p class="li-detail">工作平台、工作拆解平台使用培训，对项目线上下载、拆解、流转进行系统化培训。</p>
        </li>
        <li>
          <img src="../../assets/img/fws-learn-img2.jpg" alt="">
          <p class="li-title">作业标准培训</p>
          <p class="li-detail">对标准化作业体系进行系统化、标准化的专业技能培训，持证上岗。在极短时间内满足岗位要求，缩短培训周期成本。</p>
        </li>
        <li>
          <img src="../../assets/img/fws-learn-img3.jpg" alt="">
          <p class="li-title">核验机制培训</p>
          <p class="li-detail">对青矩标准化模式中的自检、复检、三级复核机制进行培训，使成果达到过程中复核，保证成果质量。</p>
        </li>
        <li>
          <img src="../../assets/img/fws-learn-img4.jpg" alt="">
          <p class="li-title">团队管理培训</p>
          <p class="li-detail">对作业中心进行团队孵化培训，从技能、管理、平台使用等方面协助各作业中心进行团队建设，快速形成产能。</p>
        </li>
      </ul>
    </div>
    <p class="partern-footer">如果您有意向和我们合作，请拨打热线电话</p>
    <p class="partern-footer">400-697-5677</p>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "carrousel",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      userId:window.localStorage.QingjuuserId,
      swiperOption: {
        notNextTick: true,
        /*navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },*/
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 5,
        loop: true
      },
      swiperInfo: [
        {
          url: require("@/assets/img/fws-work-img01 (1).jpg"),
          text: "成都"
        },
        {
          url: require("@/assets/img/fws-work-img01 (2).jpg"),
          text: "杭州"
        },
        {
          url: require("@/assets/img/fws-work-img01 (3).jpg"),
          text: "上海"
        },
        {
          url: require("@/assets/img/fws-work-img01 (4).jpg"),
          text: "深圳"
        },
        {
          url: require("@/assets/img/fws-work-img01 (5).jpg"),
          text: "石家庄"
        },
        {
          url: require("@/assets/img/fws-work-img01 (6).jpg"),
          text: "苏州"
        },
        {
          url: require("@/assets/img/fws-work-img01 (7).jpg"),
          text: "太原"
        },
        {
          url: require("@/assets/img/fws-work-img01 (8).jpg"),
          text: "西安"
        },
        {
          url: require("@/assets/img/fws-work-img01 (9).jpg"),
          text: "新疆"
        },
        {
          url: require("@/assets/img/fws-work-img01 (10).jpg"),
          text: "长沙"
        },
        {
          url: require("@/assets/img/fws-work-img01 (11).jpg"),
          text: "浙江"
        },
        {
          url: require("@/assets/img/fws-work-img01 (12).jpg"),
          text: "郑州"
        },
        {
          url: require("@/assets/img/fws-work-img01 (13).jpg"),
          text: "重庆"
        },
        {
          url: require("@/assets/img/fws-work-img01 (14).jpg"),
          text: "北京"
        },
        {
          url: require("@/assets/img/fws-work-img01 (15).jpg"),
          text: "沧州"
        },
        {
          url: require("@/assets/img/fws-work-img01 (16).jpg"),
          text: "四川"
        }
      ]
    };
  },
  methods: {
    flagFun(liFlag) {
      this.swiperInfo = this.swiperInfo.filter(item => {
        return item[liFlag] == 1;
      });
    },
    prevFive(){
      let index = this.$refs.mySwiper.swiper.activeIndex;
      this.$refs.mySwiper.swiper.slideTo(index-5,1000,false)
    },
    nextFive(){
      let index = this.$refs.mySwiper.swiper.activeIndex;
      this.$refs.mySwiper.swiper.slideTo(index+5,1000,false)
    },
    clickTo(){
      if(this.userId){
        this.$router.push('/collaborationService/validate')
      }else{
        this.$router.push('/login')
      }
    },
  },
  mounted: function() {
    // console.log(this.swiperOption);
  }
};
</script>
<style lang='less' scoped>
.facilitator-container{
  padding-bottom: 100px;
  background-color: #fff;
}
.header-img {
  height: 500px;
  background: url(~@/assets/img/u2.jpg) center no-repeat;
  position: relative;
  .button {
    position: absolute;
    top: 60%;
    left: 70%;
    width: 206px;
    height: 55px;
    line-height: 55px;
    border-radius: 50px;
    box-shadow: 2px 2px 2px #c4c4c4;
    background: #fff;
    font-size: 18px;
    text-align: center;
    color: #000000;
    cursor: pointer;
  }
}
// 标题
.title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  padding-top: 80px;
  margin-bottom: 60px;
}
/* 合作优势 */
.partner-good {
  padding-bottom: 80px;
  .good-ul {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    li {
      width: 285px;
    }
    li + li {
      margin-left: 15px;
    }
    .icons {
      display: block;
      width: 30px;
      height: 30px;
      margin: auto;
      margin-bottom: 30px;
    }
    .icons-01 {
      background: url("../../assets/img/fws-icon-01.png");
    }
    .icons-02 {
      background: url("../../assets/img/fws-icon-02.png");
    }
    .icons-03 {
      background: url("../../assets/img/fws-icon-03.png");
    }
    .icons-04 {
      background: url("../../assets/img/fws-icon-04.png");
    }
    .li-title {
      font-size: 18px;
      text-align: center;
      margin-bottom: 30px;
      font-weight: bold;
      color: #333;
    }
    .li-detail {
      font-size: 14px;
      line-height: 28px;
      color: #666;
    }
  }
}
/* 合作模式 */
.partner-modal {
  padding-bottom: 80px;
  background-color: #f3f3f3;
  .modal-ul {
    display: flex;
    justify-content: center;
    li + li {
      margin-left: 50px;
    }
    .img01 {
      background: url("../../assets/img/fws-modal-img01.png") center no-repeat;
      background-size: cover;
    }
    .img02 {
      background: url("../../assets/img/fws-modal-img02.jpg") center no-repeat;
    }
    li {
      width: 530px;
      height: 350px;
      line-height: 350px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
/* 作业中心 */
.work-center {
  .work-choice {
    display: flex;
    justify-content: center;
    li {
      width: 130px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #0c9;
      border: 1px solid #d9d9d9;
      cursor: pointer;
      border-radius: 10px;
    }
    li:hover {
      background-color: #0c9;
      color: #fff;
    }
    li + li {
      margin-left: 20px;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    line-height: 350px;
    text-align: center;
    color: transparent;
    font-size: 28px;
  }
  .swiper-slide {
    .mask:hover {
      z-index: 10;
      color: #333;
      animation: color 1s;
      background: rgba(255, 255, 255, 0.4);
    }
    @keyframes color {
      0% {
        background: transparent;
      }
      100% {
        background: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .swiper-container {
    margin-top: 30px;
    margin-bottom: 100px;
  }
  .swiper-button-prev-self {
    background-image: url("../../assets/img/prev-active.png");
  }
  .swiper-button-next-self {
    background-image: url("../../assets/img/next-active.png");
  }
}
/* 标准培训 */
.standard-learn {
  margin-bottom: 100px;
  background-color: #f3f3f3;
  padding-bottom: 100px;
  .learn-ul {
    display: flex;
    justify-content: center;
    li {
      width: 300px;
      img {
        border: 1px solid #bcbcbc;
        padding: 1px;
        width: 296px;
        height: 196px;
        background-size: cover;
        display: block;
        text-align: center;
      }
      .li-title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: #333;
        margin-top: 50px;
      }
      .li-detail {
        font-size: 16px;
        line-height: 28px;
        color: #666;
        margin-top: 30px;
        padding: 0 10px;
      }
    }
    li + li {
      margin-left: 10px;
    }
  }
}
.partern-footer {
  margin-top: 30px;
  font-size: 32px;
  color: #333;
  text-align: center;
  font-weight: bold;
}
.swiper-img{
  width: 380px;
  height: 380px;
}
</style>
