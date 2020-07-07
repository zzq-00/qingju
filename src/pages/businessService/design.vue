<template>
  <div>
    <div class="swiper" style="margin-top:130px;">
      <el-carousel height="700px" class="self-carousel" arrow="never">
        <el-carousel-item v-for="(item,index) in swiperImages" :key="index">
          <router-link :to="item.url" class="top-banner" :style="{backgroundImage: 'url('+item.imgUrl+')'}"></router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="information">
      <div>
        <div class="container">
          <div>
            <div>
              <h3>About US</h3>
              <span>关于我们</span>
            </div>
            <p class="introduce"> 持有建筑行业（建筑工程）甲级资质、风景园林工程设计专项甲级资质、城乡规划编制乙级资质和市政行业（道路工程）专项乙级资质，是民营工程设计企业中为数不多的具有“双甲”和“双乙”资质的优质企业。可为客户提供从项目前期策划到规划设计、建筑设计、景观设计、市政道路设计和后期施工指导等全方位的服务。</p>
          </div>
          <div id="first">
            <div>
              <h5>建筑工程、风景园林工程设计甲级</h5>
              <img :src="require('@/assets/img/u6861.jpg')" alt="" width="341px" height="259px">
            </div>
            <div>
              <h5>城乡规划编制乙级资质</h5>
              <img :src="require('@/assets/img/u6862.jpg')" alt="" width="341px" height="259px">
            </div>
            <div>
              <h5>市政工程设计乙级资质</h5>
              <img :src="require('@/assets/img/u6863.jpg')" alt="" width="341px" height="259px">
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="container">
          <h3>园林景观</h3>
          <p class="introduce">我们以环境友好为目标，致力于营造以人为本的美好环境，遵循生态设计原理，紧跟海绵城市理念步伐，以公共空间景观设计、居住区景观设计、旅游度假区与风景名胜去景观设计、城市建设项目园林景观策划与咨询的为拓展方向，提供风景园林工程设计全领域的专业服务。</p>
        </div>
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in swiperInfo" :key="index">
            <div class="masks">
              <h4>{{item.title}}</h4>
              <p>{{item.text1}}</p>
              <p>{{item.text2}}</p>
              <p>{{item.text3}}</p>
            </div>
            <img :src="item.url" alt="" width="450px" height="528px">
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-button-prev swiper-button-prev-self" slot="button-prev" @click="prevFive" v-if="swiperInfo.length > 5"></div>
          <div class="swiper-button-next swiper-button-next-self" slot="button-next" @click="nextFive" v-if="swiperInfo.length > 5"></div>
        </swiper>
        <div class="order" id="second">
          <a href="javascript:;" @click="release(4)">+订购园林景观服务</a>
        </div>
      </div>

      <div>
        <div class="container">
          <h3>建筑设计</h3>
          <div class="building">
            <div>
              <div class="masks">
                <p>长沙湘域中央二期</p>
                <p>用地面积 16525.94 平方米</p>
                <p>建筑面积 13 万平方米</p>
              </div>
              <img :src="require('@/assets/img/u6850.png')" alt="">
            </div>
            <div>
              <div class="masks">
                <p>爱尔总部大厦</p>
                <p>用地面积 3.15 万平方米</p>
                <p>建筑面积 15.41 万平方米</p>
              </div>
              <img :src="require('@/assets/img/u6822.jpg')" alt="">
            </div>
            <div>
              <div>
                <div class="masks">
                  <p>珠海横琴国际商务综合体</p>
                  <p>用地面积 1.7 万平方米</p>
                  <p>建筑面积 14.7 万平方米</p>
                </div>
                <img :src="require('@/assets/img/u6905.jpg')" alt="">
              </div>
              <div>
                <div class="masks">
                  <p>湖南电将军新能源</p>
                  <p>建筑面积 14 万平方米</p>
                </div>
                <img :src="require('@/assets/img/u6906.png')" alt="" width="524px">
              </div>
            </div>
          </div>
          <div class="order" id="third">
            <a href="javascript:;" @click="release(1)">+订购建筑设计服务</a>
          </div>
        </div>
      </div>

      <div>
        <div class="container">
          <h3>规划设计</h3>
          <p class="introduce">我们帮助客户洞察城乡未来发展价值，综合考虑政治、经济、文化、生态等多项因素，为客户提出规划预期、愿景及发展方式、发展方向、技术方案及实施策略等规划理念，可提供从城市到乡镇，从总体规划到详细规划、专项规划、城市设计等多类型的城乡规划专业服务，我们将以独到的创新创意设计理念为客户实现价值。</p>
          <ul>
            <li v-for="(item,index) in fourthContent" :key="index">
              <img :src="item.img" alt="">
              <div>
                <h6>{{item.title}}</h6>
                <p>{{item.content}}</p>
              </div>
            </li>
          </ul>
          <div class="order" id="fourth">
            <a href="javascript:;" @click="release(2)">+订购规划设计服务</a>
          </div>
        </div>
      </div>

      <div>
        <div class="container">
          <div>
            <h3>市政道路</h3>
            <ul>
              <li>武岗市武强路道路提质改造工程设计</li>
              <li>邵东县昭阳大道提质改造项目设计</li>
              <li>武冈市资南路改造工程</li>
            </ul>
            <a href="javascript:;" class="btn" id="fifth" @click="release(3)">订购市政服务</a>
          </div>
          <img :src="require('@/assets/img/u6884.png')" alt="" width="1034px" height="797px">
        </div>
      </div>

      <div>
        <div class="container">
          <div>
            <h3>建筑装饰</h3>
            <ul>
              <li v-for="(item, index) in sixthContent" :key="index" :class="{active:activeIndex === index}" @click="activeIndex = index">
                {{item.name}}
              </li>
            </ul>
            <div v-for="(item, index) in sixthContent" :key="index" class="imgsContainer" v-if="activeIndex === index">
              <img v-for="(it,inx) in item.imgs" :key="inx" :src="it.url" alt="">
            </div>
            <a href="javascript:;" class="btn" @click="release(5)">订购装饰服务</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      activeIndex: 0,
      swiperImages: [
        { imgUrl: require("@/assets/img/u6628.jpg"), url: '/businessService/releaseDesign' },
        { imgUrl: require("@/assets/img/u6643.jpg"), url: '/businessService/releaseDesign' }
      ],
      swiperOption: {
        notNextTick: true,
        autoplay: 3000,
        speed: 2000,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4,
      },
      swiperInfo: [
        {
          url: require("@/assets/img/u6674.jpg"),
          title: "洞口 · 平溪江景观",
          text1: "设计时间：2017 年",
          text2: "项目地址：湖南 洞口",
          text3: "项目规模：240232 ㎡"
        },
        {
          url: require("@/assets/img/u6680.jpg"),
          title: "安仁风光带景观方案设计",
          text1: "设计时间：2013 年",
          text2: "项目地址：湖南 安仁",
          text3: "项目规模：北岸 3km，南岸 1.5km"
        },
        {
          url: require("@/assets/img/u6668.jpg"),
          title: "麓谷中心区环境设计",
          text1: "设计时间：2003 年",
          text2: "项目地址：湖南 长沙",
          text3: "项目规模：20.58 万㎡"
        },
        {
          url: require("@/assets/img/u6662.jpg"),
          title: "株洲市炎帝广场、天台公园",
          text1: "设计时间：2009 年",
          text2: "项目地址：湖南 株洲",
          text3: "项目规模：炎帝广场面积为 18ha 天台公园面积为 65ha"
        },
        {
          url: require("@/assets/img/u6698.jpg"),
          title: "娄底孙水河南岸",
          text1: "设计时间：2016 年",
          text2: "项目地址：湖南 娄底",
          text3: "项目规模：547811.31 ㎡"
        },
        {
          url: require("@/assets/img/u6704.jpg"),
          title: "郴州市仙岭湖公园景观",
          text1: "设计时间：2015 年",
          text2: "项目地址：湖南 郴州",
          text3: "项目规模：177.63ha"
        },
        {
          url: require("@/assets/img/u6692.jpg"),
          title: "长沙松雅湖南部园林景观",
          text1: "设计时间：2013 年 （与同济合作项目）",
          text2: "项目地址：湖南 长沙",
          text3: "项目规模：524039 ㎡"
        },
        {
          url: require("@/assets/img/u6686.jpg"),
          title: "岳麓山风景名胜区咸嘉湖",
          text1: "设计时间：2011 年",
          text2: "项目地址：湖南 长沙",
          text3: "项目规模：50.35ha"
        }
      ],
      fourthContent: [
        {
          title: "麓谷中心区控规暨公共环境设计",
          content: "省优秀城乡规划设计一等奖",
          img: require("@/assets/img/u6879.jpg")
        },
        {
          title: "资兴市东江湾地区控制性详细规划",
          content: "省优秀城市规划设计一等奖",
          img: require("@/assets/img/u6865.jpg")
        },
        {
          title: "长沙市三角洲地区城市设计",
          content: "省优一等奖 / 全国表扬奖",
          img: require("@/assets/img/u6849.png")
        },
        {
          title: "武冈古城-云山风景名胜区同保山-狮子湖景区详细规划",
          content: "",
          img: require("@/assets/img/u6875.jpg")
        },
        {
          title: "岳麓山风景名胜区咸嘉湖景区",
          content: "2012年长沙市优秀风景园林规划设计金奖",
          img: require("@/assets/img/u6870.png")
        }
      ],
      sixthContent: [
        {
          name: '住宅',
          imgs: [
            { url: require('@/assets/img/jiaju1.jpg') },
            { url: require('@/assets/img/jiaju2.jpg') },
            { url: require('@/assets/img/jiaju3.jpg') },
            { url: require('@/assets/img/jiaju4.jpg') },
            { url: require('@/assets/img/jiaju5.jpg') },
            { url: require('@/assets/img/jiaju6.jpg') },
          ]
        },
        {
          name: '办公',
          imgs: [
            { url: require('@/assets/img/bangong1.jpg') },
            { url: require('@/assets/img/bangong2.jpg') },
            { url: require('@/assets/img/bangong3.jpg') },
            { url: require('@/assets/img/bangong4.jpg') },
            { url: require('@/assets/img/bangong5.jpg') },
            { url: require('@/assets/img/bangong6.jpg') },
          ]
        }
      ]
    };
  },
  methods: {
    publish () {
      this.$router.push("/businessService/releaseEstimate")
    },
    prevFive () {
      let index = this.$refs.mySwiper.swiper.activeIndex;
      this.$refs.mySwiper.swiper.slideTo(index - 5, 1000, false)
    },
    nextFive () {
      let index = this.$refs.mySwiper.swiper.activeIndex;
      this.$refs.mySwiper.swiper.slideTo(index + 5, 1000, false)
    },
    release (value) {
      window.sessionStorage.designContents = value
      this.$router.push("/businessService/releaseDesign")
    }
  },
  mounted () {
  }
};
</script>

<style lang='less' scoped>
.btn-common {
  width: 205px;
  height: 55px;
  line-height: 1px;
  border-radius: 50px;
  font-size: 18px;
  letter-spacing: 2px;
}
.top-banner {
  display: block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.information {
  div.order {
    text-align: center;
    padding: 20px 0;
    > a {
      font-size: 12px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  p.introduce {
    color: #999;
    font-size: 14px;
    line-height: 28px;
    text-indent: 28px;
  }
  a.btn {
    display: block;
    width: 175px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #2e986a;
    background-color: #fff;
    text-align: center;
    border: 2px solid #2e986a;
    border-radius: 25px;
  }
  > div {
    box-sizing: border-box;

    &:nth-child(2n) {
      background-color: rgb(244, 245, 250);
    }
    &:nth-child(2n-1) {
      background-color: #fff;
    }
    &:nth-child(1) {
      height: 600px;
      .container {
        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          &:first-child {
            padding: 90px 0 70px;
            h3 + span {
              font-size: 14px;
              color: #21a57e;
            }
            > p {
              flex: 0 0 845px;
            }
          }
          &:last-child {
            text-align: center;
            h5 {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    &:nth-child(2) {
      padding: 50px 25px 0;
      box-sizing: border-box;
      h3 {
        & + p {
          width: 930px;
          margin: 30px auto;
        }
      }
      .masks {
        width: 100%;
        height: 100%;
        max-width: 450px;
        max-height: 528px;
        position: absolute;
        color: transparent;
        transition: all 1s ease;
        text-align: center;
        h4 {
          margin-top: 150px;
          margin-bottom: 90px;
        }
        p {
          font-size: 14px;
          line-height: 28px;
        }
      }
      .swiper-slide {
        width: 1870px;
        .masks:hover {
          z-index: 10;
          color: #fff;
          background-color: rgba(40, 40, 40, 0.517647058823529);
        }
      }
      .swiper-button-prev-self {
        background-image: url("../../assets/img/prev-active.png");
      }
      .swiper-button-next-self {
        background-image: url("../../assets/img/next-active.png");
      }
    }
    &:nth-child(3) {
      .container {
        width: 1500px;
        padding-top: 50px;
        > h3 {
          margin-bottom: 30px;
        }
        .building {
          display: flex;
          justify-content: space-between;
          > div {
            position: relative;
            &:last-child {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              > div {
                position: relative;
              }
            }
            .masks {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              color: #fff;
              position: absolute;
              z-index: 10;
              > p {
                text-align: center;
                font-size: 13px;
                min-width: 200px;
                line-height: 20px;
                &:first-child {
                  font-size: 20px;
                  border-bottom: 1px solid #fff;
                  padding-bottom: 18px;
                  margin-bottom: 15px;
                }
              }
            }
          }
        }
      }
    }
    &:nth-child(4) {
      padding-top: 50px;
      .container {
        width: 1500px;
        > h3 {
          & + p {
            width: 930px;
            margin: 30px auto 80px;
          }
        }
        > ul {
          display: flex;
          justify-content: space-between;
          > li {
            flex: 0 0 285px;
            width: 285px;
            height: 370px;
            text-align: center;
            > img {
              width: 100%;
              height: 100%;
              transition: all 0.8s;
            }
            > div {
              height: 0px;
              color: #fff;
              background-color: rgba(54, 54, 54, 1);
              overflow: hidden;
              transition: all 0.5s;
              > h6 {
                font-weight: 400;
                font-size: 18px;
                margin: 3px 3px 7px;
              }
              > p {
                font-size: 14px;
              }
            }
            &:hover {
              > img {
                transform: translateY(-60px);
              }
              > div {
                height: 60px;
                transform: translateY(-60px);
              }
            }
          }
        }
      }
    }
    &:nth-child(5) {
      background-color: rgba(37, 36, 41, 1);
      .container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 1900px;
        color: #fff;
        background-color: rgba(37, 36, 41, 1);
        > div {
          margin-right: 200px;
          > h3 {
            text-align: left;
            color: #fff;
          }
          > ul {
            font-size: 20px;
            margin: 60px 0;
            > li {
              list-style-type: disc;
              font-weight: 700;
              line-height: 60px;
            }
          }
        }
      }
    }
    &:nth-child(6) {
      padding: 50px 0;
      ul {
        margin: 30px 0;
        display: flex;
        justify-content: center;
        li {
          cursor: pointer;
          width: 70px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid rgba(102, 102, 102, 1);
          & + li {
            margin-left: 14px;
          }
          &:hover {
            color: #fff;
            background-color: rgba(33, 165, 126, 1);
            border-color: rgba(33, 165, 126, 1);
          }
          &.active {
            color: #fff;
            background-color: rgba(33, 165, 126, 1);
            border-color: rgba(33, 165, 126, 1);
          }
        }
      }
      .imgsContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        > img {
          margin-bottom: 30px;
        }
        & + a {
          margin: 0 auto;
        }
      }
    }
  }
}
h3 {
  font-size: 48px;
  color: #5e5e5e;
  text-align: center;
}
h4 {
  font-size: 36px;
}
h5 {
  font-size: 20px;
  color: #323232;
}
</style>
