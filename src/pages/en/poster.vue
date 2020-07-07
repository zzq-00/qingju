<template>
  <div class="en-poster">
    <header class="en-header">
      <div class="container">
        <a href="/">青矩互联</a>
        <ul>
          <li>
            <a href="javascript:;" @click="scrollTo">Contact US</a>
          </li>
          <li>
            <router-link to="/">Chinese</router-link>
          </li>
        </ul>
      </div>
    </header>
    <div class="en-banner">
      <!-- <p>Making consultant more easy</p>
      <p>Repay your time, getting a better life</p> -->
    </div>
    <div class="en-content">
      <div class="what-we-do">
        <div class="container">
          <div>
            <h3>WHAT WE DO</h3>
            <div>
              <p>Greetec(Shanghai) Internet Technology Co., Ltd. (hereinafter referred to as Greetec Internet), a large online platform operator, affiliated with Greetec Technology Co., Ltd., commits to Internet services in the construction field. As an explorer and leader of the model on engineering consulting + Internet, Greetec Internet has developed the first interconnected consulting platform (website: www.qingju.cn) for construction works based on industry resources integrated with information technology and big data in China.</p>
              <p>With the standardized thinking mode and core AI technology, Greetec Internet independently develops and launches the leading “Greetec 1.0 – Standard Construction Cost Consultants Model” and Greetec 2.0 – Greetec Smart Cost Consultants Robot（QinQute）, which make the construction consulting services convenient, efficient, reliable and economical.</p>
            </div>
          </div>
          <ul>
            <li>
              <h4>
                <img src="@/assets/img/en-measurement.png" alt="">
                Greetec Works Measurement</h4>
              <p>Calculation of work quantities (reinforcing steel bars, civil construction works, installation works), bill compilation, tender control price</p>
            </li>
            <li>
              <h4>
                <img src="@/assets/img/en-BIM.png" alt="">
                Greetec BIM Application Consultant
              </h4>
              <p>BIM modeling, collision check, electromechanical pipeline layout, reserved holes optimization, model rendering, construction simulation, quantity computation</p>
            </li>
            <li>
              <h4>
                <img src="@/assets/img/en-Design.png" alt="">
                Greetec Design</h4>
              <p>Design on Garden landscape, architectural engineering, Urban and Rural planning, municipal roads, and architectural decoration.</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="greetec-works-measurement">
        <div class="container">
          <h2 class="greetec-title">Greetec Works <br> Measurement</h2>
          <div class="advantage-1">
            <img src="@/assets/img/en-advantage1.png" alt="">
            <div>
              <h3>Advantage Ⅰ - Standard Construction Cost Consultants Model</h3>
              <p>Greetec 1.0, a standard construction cost consultants model, bases on the Internet information platform to achieve the component-level quality assurance by adopting workshop fabrication and modularization as a core operation idea， with the standard assembly line working, under the control of specialized and standardized on co-operation and process supervision, as well as process verification, greatly improve quality accuracy and operation speed of construction cost, ensure the timeliness and reliability of the customer services.</p>
            </div>
          </div>
          <div class="advantage-2">
            <h3>Advantage Ⅱ - Standard construction cost model</h3>
            <p>Greetec 2.0 - Greetec Smart Cost Consultants Robot (referred to as “QinQute”), a product under the new model of “Robot Automated Graph Calculation” developed by Greetec Internet, serves the construction consulting field and can simulate human-computer interaction to render a smart solution for workflow automation. The birth of “QinQute” liberates the vast number of construction cost consultants from repetitive and inefficient modeling calculation works, and turn to focus more on those areas with higher technical content and professional judgment, which, thereby, advances this industry to head into a new era of smart construction cost.</p>
            <ul class="more-list">
              <li>
                <img src="@/assets/img/en-more-faster.png" alt="">
                <h5>More Faster</h5>
                <p>7×24 all-weather operation, more than 70% efficiency increased</p>
              </li>
              <li>
                <img src="@/assets/img/en-more-accurate.png" alt="">
                <h5>More accurate</h5>
                <p>automated graph modeling calculation, human errors within 3%</p>
              </li>
              <li>
                <img src="@/assets/img/en-more-economi.png" alt="">
                <h5>More economic</h5>
                <p>lower cost</p>
              </li>
            </ul>
            <div class="minimize-manual-intervention">
              <div>
                <h3>Minimize manual intervention</h3>
                <p>the efficiency will be increased at least 70%, equivalent to 3-5 times or above the labor efficiency</p>
              </div>
              <img src="@/assets/img/en+70%.png" alt="">
              <button @click="scrollTo">CONTSCT US</button>
            </div>
            <ul class="praise-list">
              <li>
                <img src="@/assets/img/en-Personification.png" alt="">
                <h5>Personification</h5>
                <p>not a physical robot, but a software that simulates the operations of human on a computer</p>
              </li>
              <li>
                <img src="@/assets/img/en-Efficient-operation.png" alt="">
                <h5>Efficient operation</h5>
                <p> all-weather work for 24 hours, equivalent to 3-5 times or above the labor efficiency</p>
              </li>
              <li>
                <img src="@/assets/img/en-Standardization.png" alt="">
                <h5>Standardization</h5>
                <p>upgraded and rebuilt based on Greetec 1.0, Standard Split System</p>
              </li>
              <li>
                <img src="@/assets/img/en-Specialization.png" alt="">
                <h5>Specialization</h5>
                <p>mplement services by well-established rules, and jobs have a self-examination and verification mechanism</p>
              </li>
              <li>
                <img src="@/assets/img/en-verification-mechanism.png" alt="">
                <h5>verification mechanism</h5>
                <p>enable a flexibly scalability for multi-threaded parallel jobs based on service traffic</p>
              </li>
            </ul>
            <div class="model-comparison">
              <h3>Model comparison</h3>
              <img src="@/assets/img/en-Model-comparison.png" alt="">
            </div>
          </div>
        </div>
        <div class="model-vs">
          <p>QinQute models vs. traditional model</p>
          <img src="@/assets/img/en-play.png" alt="" @click="myVideo2=true">
        </div>
      </div>
      <div class="greetec-BIM-application-consultant">
        <div class="container">
          <h2 class="greetec-title">Greetec BIM <br> Application Consultant</h2>
          <div class="greetec-features">
            <img src="@/assets/img/en-Greetec-BIM.png" alt="">
            <div>
              <h3>Features</h3>
              <p>• BIM-based cost management and control platform, intelligent investment control</p>
              <p>• Eliminate 100% design errors and improve the overall design;</p>
              <p>• Upgraded technologies across construction and management to support the fine construction;</p>
              <p>• New cost management experience, efficient and accurate, just WYSIWYG;</p>
              <p>• 7%-shortened project duration to achieve early return on investment;</p>
              <p>• Professionally customized BIM information management platform to lead the industry trend.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="greetec-design">
        <div class="container">
          <h2 class="greetec-title">Greetec Design</h2>
          <div class="greetec-features">
            <div>
              <h3>Features</h3>
              <p>With the strong technical background， Grade A certificate on architectural engineering design, Grade A certificate Garden landscape design,, Grade B certificate on urban and rural planning, and Grade B certificate on municipal roads design.</p>
              <p>All-round services from pre-project preparation to the design for planning, architectures, landscapes, municipal roads, and further for post-construction supervision will be provided, with the team of professional and experienced experts who won lots of national and provincial excellence design awards.</p>
            </div>
            <img src="@/assets/img/en-Greetec-Design.png" alt="">
          </div>
        </div>
      </div>
      <div class="classic-case">
        <div class="container">
          <h3>Classic Case</h3>
          <div style="position: relative;">
            <swiper :options="swiperOption" ref="mySwiper" style="width: 1150px">
              <!-- slides -->
              <swiper-slide v-for="(item,index) in swiperInfo" :key="index">
                <div style="text-align: center;">
                  <img :src="item.url" alt="" width="324px" height="420px">
                </div>
              </swiper-slide>
            </swiper>
            <!-- Optional controls -->
            <div class="swiper-button-prev" @click="prevFive"></div>
            <div class="swiper-button-next" @click="nextFive"></div>
          </div>
        </div>
      </div>
      <div class="contact-us">
        <div class="container">
          <img src="@/assets/img/en-xiaoqing.png" alt="">
          <div>
            <H4>Please feel free and tell us your questions or doubts.</H4>
            <p>If you are interested in our products and services, or would appreciate more information, <br> please contact us by completing the attached form without any hesitate.</p>
            <div>
              <input type="text" class="name" v-model="params.userName" placeholder="Your Name">
            </div>
            <div>
              <input type="email" class="email" v-model="params.email" placeholder="Your Email">
              <input type="number" class="phone" v-model="params.telNum" placeholder="Phone number">
            </div>
            <div>
              <el-checkbox-group v-model="params.consulting">
                <el-checkbox label="1" style="width: 29.3%;margin: 10px 30px 10px 0;color: #999999;">Calculation of work quantities </el-checkbox>
                <el-checkbox label="2" style="width: 29.3%;margin: 10px 30px 10px 0;color: #999999;">Bill compilation</el-checkbox>
                <el-checkbox label="3" style="width: 29.3%;margin: 10px 30px 10px 0;color: #999999;">Tender control price</el-checkbox>
                <el-checkbox label="4" style="width: 29.3%;margin: 10px 30px 10px 0;color: #999999;">BIM Application Consultant</el-checkbox>
                <el-checkbox label="5" style="width: 29.3%;margin: 10px 30px 10px 0;color: #999999;">Design Consultant </el-checkbox>
              </el-checkbox-group>
            </div>
            <div>
              <textarea maxlength="600" placeholder="Please tell us how we can help you" v-model="params.consultingRemarks"></textarea>
            </div>
            <div>
              <button @click="addBusinessConsulting">Submit Request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="en-footer">
      <div class="container">
        <img src="@/assets/img/en-logo.png" alt="">
        <div>
          <p>中国·北京市海淀区车公庄西路19号外文文化创意园12A</p>
          <p>Copyright(©)2017上海青矩互联网科技有限公司 版权所有 沪ICP备16015426号-1</p>
        </div>
      </div>
    </footer>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="600px">
      <p style="color:#555555;font-size:18px;font-weight:bold;">Congratulations, submitted successfully</p>
      <p style="color:#888888;">We will contact you as soon as possible, Please be patient</p>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" style="width: 100px;" size="small" @click="resetData">I see</el-button>
      </div>
    </el-dialog>
    <div class="mask" v-show="myVideo2">
      <div class="box">
        <span class="close" @click="videoClick('myVideo2', 'close')">&times;</span>
        <video id="myVideo2" :src="VIDEO_PATH+'xiaoqing1s-Eng.mp4'" controls="controls" width="auto">
          <source :src="VIDEO_PATH+'xiaoqing1s-Eng.mp4'"> 您的浏览器不支持视频的播放
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      dialogVisible: false,
      swiperOption: {
        autoplay: 3000,
        slidesPerView: 3,
        spaceBetween: 1,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperInfo: [
        {
          url: require('@/assets/img/en-s-01.png')
        },
        {
          url: require('@/assets/img/en-s-02.png')
        },
        {
          url: require('@/assets/img/en-s-03.png')
        },
        {
          url: require('@/assets/img/en-s-04.png')
        },
        {
          url: require('@/assets/img/en-s-05.png')
        },
        {
          url: require('@/assets/img/en-s-06.png')
        },
        {
          url: require('@/assets/img/en-s-07.png')
        },
        {
          url: require('@/assets/img/en-s-08.png')
        },
        {
          url: require('@/assets/img/en-s-04.png')
        },
      ],
      params: {
        consulting: [],
        consultingRemarks: '',
        email: '',
        telNum: '',
        userName: ''
      },
      myVideo2: false,
      VIDEO_PATH: process.env.VIDEO_PATH
    }
  },
  methods: {
    scrollTo() {
      var top = document.body.clientHeight
      window.scrollTo(0, top)
    },
    videoClick(param, action) {
      let dom = document.getElementById(param)
      if (action && action === 'close') {
        this[param] = false
        dom.pause()
        return
      }
    },
    prevFive() {
      let index = this.$refs.mySwiper.swiper.activeIndex
      this.$refs.mySwiper.swiper.slideTo(index - 3, 1000, false)
    },
    nextFive() {
      let index = this.$refs.mySwiper.swiper.activeIndex
      this.$refs.mySwiper.swiper.slideTo(index + 3, 1000, false)
    },
    addBusinessConsulting() {
      if (!this.params.userName) return this.$message.warning('Please enter your name')
      if (!this.params.email) return this.$message.warning('Please enter your email')
      if (!this.params.telNum) return this.$message.warning('Please enter your phone number')
      if (!this.params.consulting.length) return this.$message.warning('Please check a service')
      if (!this.params.consultingRemarks) return this.$message.warning('Please tell us how we can help you')
      api
        .addBusinessConsulting(this.params)
        .then(res => (this.dialogVisible = true))
        .catch(err => {
          this.$message.error('Sorry, something error')
        })
    },
    resetData() {
      this.dialogVisible = false
      this.params = {
        consulting: [],
        consultingRemarks: '',
        email: '',
        telNum: '',
        userName: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.en-poster {
  min-width: 1300px;
}
p {
  color: #7f7f7f;
  text-align: justify;
}
h3 {
  font-size: 36px;
}
.container {
  width: 1290px;
}
.en-header {
  background-color: #051d26;
  .container {
    height: 60px;
    color: #fff;
    display: flex;
    align-items: center;
    > a {
      width: 122px;
      height: 28px;
      text-indent: -9999999px;
      background: url(~@/assets/img/en-logo.png) center/contain no-repeat;
    }
    > ul {
      margin-left: auto;
      display: flex;
      align-items: center;
      li {
        font-size: 14px;
        height: 15px;
        line-height: 15px;
        padding: 0 19px;
        & + li {
          border-left: 1px solid #fff;
        }
      }
    }
  }
}
.en-banner {
  height: 550px;
  background: url(~@/assets/img/en-banner.jpg) center/100% 550px  no-repeat;
  > p {
    color: #fff;
    text-align: center;
    text-shadow: 0px 6px 8px rgba(47, 47, 47, 0.68);
    &:first-child {
      font-size: 81px;
      padding: 156px 0 52px;
    }
    &:last-child {
      font-size: 56px;
    }
  }
}
.what-we-do {
  background-color: #fff;
  padding: 70px 0;
  .container {
    > div {
      display: flex;
      align-items: center;
      > h3 {
        font-size: 36px;
        text-align: justify;
        text-align-last: justify;
        flex: 0 0 294px;
        height: 196px;
        line-height: 196px;
        margin-right: 60px;
        background: url(~@/assets/img/en-W.png) center/cover no-repeat;
        & + div {
          flex: 1;
          line-height: 32px;
          > p + p {
            margin-top: 30px;
          }
        }
      }
    }
    > ul {
      display: flex;
      margin-top: 80px;
      justify-content: space-between;
      > li {
        flex: 0 0 345px;
        > h4 {
          font-size: 20px;
          margin-left: -60px;
          > img {
            margin-right: 7px;
          }
          & + p {
            font-size: 14px;
            line-height: 32px;
          }
        }
      }
    }
  }
}
.greetec-works-measurement {
  padding-top: 80px;
  background-color: #f6f6f6;
  .container {
    > h2 {
      background: url(~@/assets/img/en-01.png) no-repeat center;
    }
    .advantage-1 {
      display: flex;
      align-items: center;
      margin-top: 60px;
      > img {
        margin-right: 90px;
      }
      > div {
        > p {
          line-height: 32px;
          margin-top: 33px;
        }
      }
    }
    .advantage-2 {
      margin-top: 110px;
      > h3 {
        text-align: center;
        & + p {
          line-height: 32px;
          margin-top: 30px;
        }
      }
      .more-list {
        display: flex;
        justify-content: space-between;
        margin-top: 65px;
        > li {
          flex: 0 0 360px;
          background-color: #fff;
          border-bottom: 8px solid #06cf99;
          > h5 {
            font-size: 20px;
            padding: 24px 24px 18px;
          }
          > p {
            font-size: 14px;
            line-height: 32px;
            padding: 0 22px 39px;
          }
        }
      }
      .minimize-manual-intervention {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 0 23px;
        height: 160px;
        margin-top: 80px;
        > div:first-child {
          width: 520px;
          height: 100%;
          background: url(~@/assets/img/en-intervention.png) no-repeat right/contain;
          padding-right: 55px;
          > h3 {
            margin: 20px 0;
            white-space: nowrap;
          }
          > p {
            font-size: 14px;
          }
        }
        > img {
          margin: 0 90px 0 56px;
        }
        > button {
          cursor: pointer;
          color: #fff;
          background-color: #06cf99;
          width: 160px;
          height: 45px;
          &:hover {
            background-color: #4bc66d;
          }
        }
      }
      .praise-list {
        display: flex;
        align-items: center;
        margin-top: 125px;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
        > li {
          flex: 1;
          height: 335px;
          background-color: #fff;
          text-align: center;
          padding: 0 19px;
          position: relative;
          & + li {
            border-left: 1px solid #e6e6e6;
          }
          > img {
            transform: translateY(-50%);
          }
          > h5 {
            font-size: 30px;
            color: #06cf99;
            line-height: 25px;
            position: absolute;
            left: 20px;
            right: 20px;
          }
          > p {
            font-size: 14px;
            margin-top: 92px;
          }
        }
      }
      .model-comparison {
        text-align: center;
        > h3 {
          margin: 45px 0 60px;
        }
      }
    }
  }
  .model-vs {
    height: 550px;
    background: url(~@/assets/img/en-model-vs.png) no-repeat center/cover;
    position: relative;
    margin-top: 127px;
    > p {
      font-size: 65px;
      text-align: center;
      color: #fff;
      padding-top: 225px;
      text-shadow: 0px 2px 8px rgba(47, 47, 47, 0.68);
    }
    > img {
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      transition: all 0.3s;
      &:hover {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
  }
}
.greetec-BIM-application-consultant {
  padding: 80px 0;
  background-color: #fff;
  .container {
    > h2 {
      background: url(~@/assets/img/en-02.png) no-repeat center;
    }
    .greetec-features {
      > img {
        margin-right: 66px;
      }
      h3 {
        margin-bottom: 66px;
      }
    }
  }
}
.greetec-design {
  padding: 80px 0;
  background-color: #f6f6f6;
  .container {
    > h2 {
      background: url(~@/assets/img/en-03.png) no-repeat center;
      line-height: 182px;
    }
    .greetec-features {
      h3 {
        margin-bottom: 36px;
      }
      > img {
        margin-left: 83px;
      }
    }
  }
}
.classic-case {
  background-color: #fff;
  .container {
    padding: 70px 0;
    > h3 {
      text-align: center;
      margin-bottom: 40px;
    }
  }
  /deep/ .swiper-button-prev,
  .swiper-button-next {
    width: 50px;
    height: 50px;
    background-size: contain;
  }
  /deep/ .swiper-button-prev {
    background-image: url(~@/assets/img/en-s-l.png);
    &:hover {
      background-image: url(~@/assets/img/en-s-lh.png);
    }
  }
  /deep/ .swiper-button-next {
    background-image: url(~@/assets/img/en-s-r.png);
    &:hover {
      background-image: url(~@/assets/img/en-s-rh.png);
    }
  }
}
.greetec-features {
  display: flex;
  align-items: center;
  margin-top: 70px;
  > div {
    flex: 1;
    > p {
      line-height: 32px;
    }
  }
}
.greetec-title {
  line-height: 100px;
  font-size: 100px;
  color: #06cf99;
  text-align: center;
}
.contact-us {
  background: url(~@/assets/img/en-contact.png) #f6f6f6 101px 44px no-repeat/677px 554px;
  > .container {
    height: 933px;
    position: relative;
    > img {
      position: absolute;
      bottom: -13px;
      left: -30px;
    }
    > div {
      width: 750px;
      position: absolute;
      right: 0;
      top: 92px;
      > h4 {
        font-size: 30px;
      }
      > p {
        color: #7f7f7f;
        text-align: center;
        margin: 50px 0 40px;
        line-height: 32px;
      }
      > div {
        display: flex;
        & + div {
          margin-top: 40px;
        }
        > input,
        > textarea {
          color: #999999;
          border: 1px solid #dfdfdf;
          &::placeholder {
            color: #e2e2e2;
          }
        }
        > input {
          flex: 1;
          height: 53px;
          padding: 0 19px;
          box-sizing: border-box;
          &.name {
            width: 100%;
            background: url(~@/assets/img/en-name.png) #fff 710px no-repeat/auto;
          }
          &.email {
            background: url(~@/assets/img/en-email.png) #fff 330px no-repeat/auto;
          }
          &.phone {
            margin-left: 20px;
            background: url(~@/assets/img/en-phone.png) #fff 330px no-repeat/auto;
          }
        }
        > textarea {
          width: 100%;
          height: 120px;
          box-sizing: border-box;
          padding: 18px;
        }
        > button {
          cursor: pointer;
          width: 100%;
          color: #fff;
          background-color: #06cf99;
          height: 50px;
        }
      }
    }
  }
}
.en-footer {
  background-color: #2f2f2f;
  .container {
    height: 147px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 14px;
      color: #fff;
    }
  }
}
.mask {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    video {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-height: 100px;
      max-height: 720px;
      height: 100vh;
    }
    video::-webkit-media-controls-enclosure {
      overflow: hidden;
    }
    video::-webkit-media-controls-panel {
      width: ~'calc(100% + 30px)';
    }
    .close {
      font-size: 54px;
      color: #666;
      position: absolute;
      top: 20px;
      left: 50px;
      cursor: pointer;
      &:hover {
        color: #333;
      }
      &:before {
        content: '';
      }
    }
  }
}
</style>
