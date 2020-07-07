<template>
  <div>
    <div class="banner" style="margin-top:130px;">
      <p class="see-media" @click="video = true">点击查看 视频介绍</p>
      <a href="javascript:;">
        <el-button round type="primary" class="btn-common" @click="publish">发布项目</el-button>
      </a>
    </div>
    <div class="information">
      <div>
        <div class="container">
          <h3>欢迎使用青矩计量产品</h3>
          <ul>
            <li v-for="(item,index) in firstContent" :key="index">
              <router-link :to="item.url">
                <img :src="item.imgUrl" width="85px" height="85px" :alt="item.text">
                <span>{{item.text}}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div class="container">
          <h3>青矩计量模式，快、准、省</h3>
          <img :src="require('@/assets/img/duibi.jpg')" alt="对比">
        </div>
      </div>

      <div>
        <div class="container">
          <h3>青矩计量服务商，一体化协同作业</h3>
          <img :src="require('@/assets/img/ditu.png')" alt="地图">
        </div>
      </div>

      <div>
        <div class="container">
          <h3>有工程的地方就有青矩，本土计量第一品牌</h3>
          <ul>
            <li v-for="(item,index) in fourthContent" :key="index" :style="{backgroundImage: 'url(' + item.img + ')'}">
              <h5>{{item.title}}</h5>
              <div>
                <h5>{{item.title}}</h5>
                <p v-html="item.content"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div class="container">
          <h3>我们做的每一件有意义的事情都将成为经典</h3>
          <ul>
            <li>
              <img :src="require('@/assets/img/changfang.jpg')" alt="" width="310px" height="310px">
              <div>
                <h5>某厂房项目</h5>
                <ul>
                  <li>建设地点：西南地区</li>
                  <li>建设规模：建筑面积39万平方米</li>
                  <li>服务内容：工程量计算+清单编制</li>
                  <li>完成时间：4天</li>
                </ul>
              </div>
              <p>误差率小于1%</p>
            </li>
            <li>
              <img :src="require('@/assets/img/shangye.jpg')" alt="" width="310px" height="310px">
              <div>
                <h5>某商业综合体</h5>
                <ul>
                  <li>建设地点：华东地区</li>
                  <li>建设规模：建筑面积176758.79平方米</li>
                  <li>服务内容：工程量计算+清单编制</li>
                  <li>服务内容：5.5天</li>
                </ul>
              </div>
              <p>误差率小于1%</p>
            </li>
            <li>
              <img :src="require('@/assets/img/leyuan.jpg')" alt="" width="310px" height="310px">
              <div>
                <h5>某乐园项目</h5>
                <ul>
                  <li>建设地点：华东地区</li>
                  <li>建设规模：建筑面积16232.8平方米</li>
                  <li>服务内容：工程量计算+清单编制</li>
                  <li>服务内容：5天</li>
                </ul>
              </div>
              <p>误差率小于1%</p>
            </li>
            <li>
              <img :src="require('@/assets/img/jichang.jpg')" alt="" width="310px" height="310px">
              <div>
                <h5>某机场航站楼</h5>
                <ul>
                  <li>建设地点：西北地区</li>
                  <li>建设规模：建筑面36.72万平方米</li>
                  <li>服务内容：工程量计算</li>
                  <li>服务内容：3.5天</li>
                </ul>
              </div>
              <p>误差率小于1%</p>
            </li>
          </ul>
          <router-link to="/businessService/classicCaseList">查看更多详情 ></router-link>
        </div>
      </div>
    </div>
    <div class="mask" v-if="video">
      <div class="box">
        <span class="close" @click="video = false">&times;</span>
        <video id="myVideo" :src="VIDEO_PATH+'qj-video.mp4'" autoplay controls="controls" width="auto" @click="videoClick">
          <source :src="VIDEO_PATH+'qj-video.mp4'"> 您的浏览器不支持视频的播放
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  data () {
    return {
      firstContent: [
        {
          imgUrl: require("@/assets/img/gangjin.png"),
          text: "钢筋算量",
          url: "/businessService/productPresentation#first"
        },
        {
          imgUrl: require("@/assets/img/tujian.png"),
          text: "土建算量",
          url: "/businessService/productPresentation#second"
        },
        {
          imgUrl: require("@/assets/img/anzhuang.png"),
          text: "安装算量",
          url: "/businessService/productPresentation#third"
        },
        {
          imgUrl: require("@/assets/img/qingdan.png"),
          text: "清单编制",
          url: "/businessService/productPresentation#fourth"
        },
        {
          imgUrl: require("@/assets/img/zhaobiao.png"),
          text: "招标控制价",
          url: "/businessService/productPresentation#fifth"
        }
      ],
      fourthContent: [
        {
          title: "设计企业",
          content:
            "凭借青矩互联平台成本数据积累及快速建模技术，建立细化至全业态构件级的指标库，保证工程量测算高度准确。<br>*限额设计评价服务<br>*设计方案优选服务<br>*结构指标分析服务",
          img: require("@/assets/img/sheji.jpg")
        },
        {
          title: "房地产企业",
          content:
            "依托标准化、信息化技术，通过标准化、流程核验机制大幅提高咨询服务的精度和速度，确保了产品的可靠性、及时性、经济性。<br>*建模算量服务<br>*工程量清单、控制价编制服务<br>*预转固、重计量服务<br>*闭口合同价款验证服务",
          img: require("@/assets/img/fangdichan.jpg")
        },
        {
          title: "施工企业",
          content:
            "研究规范、图集等政策性文件，持续沉淀提炼工程实施过程中降本增效的关键节点,辅之以标准化模式，快速、精准、完备的形成咨询成果，助力客户提高利润水平。<br>*投标报价服务<br>*工程结算编制服务<br>*设计变更商务评价服务<br>*预转固、重计量服务",
          img: require("@/assets/img/shigong.jpg")
        },
        {
          title: "咨询企业及其他",
          content:
            "采用标准化作业模式，以统一的标准、统一的命名、统一的计算规则，为咨询单位及其他单位提供透明、高效、可靠、经济的建模、算量、清单、控制价服务。",
          img: require("@/assets/img/zixun.jpg")
        }
      ],
      VIDEO_PATH: process.env.VIDEO_PATH,
      video: false
    };
  },
  methods: {
    publish () {
      this.$router.push("/businessService/releaseEstimate")
    },
    videoClick () {
      let dom = document.getElementById('myVideo')
      if (dom.paused) {
        dom.play()
      } else {
        dom.pause()
      }
    }
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
.banner {
  height: 600px;
  background: url(../../assets/img/estimate-bg.jpg) center no-repeat;
  position: relative;
  button {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.information {
  > div {
    box-sizing: border-box;
    text-align: center;
    &:nth-child(2n) {
      background-color: #fff;
    }
    &:nth-child(1) {
      height: 600px;
      padding-top: 130px;
      .container {
        > ul {
          margin-top: 120px;
          display: flex;
          justify-content: space-around;
          > li > a {
            display: flex;
            height: 180px;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            font-size: 24px;
            color: #5e5e5e;
            transition: all 0.3s;
            &:hover {
              transform: scale(1.1);
              text-decoration: underline;
            }
          }
        }
      }
    }
    &:nth-child(2) {
      height: 950px;
      .container {
        padding-top: 120px;
        > h3 {
          margin-bottom: 108px;
        }
      }
    }
    &:nth-child(3) {
      height: 940px;
      .container {
        padding-top: 110px;
        > h3 {
          margin-bottom: 30px;
        }
      }
    }
    &:nth-child(4) {
      height: 700px;
      padding-top: 80px;
      .container {
        > ul {
          display: flex;
          margin-top: 110px;
          justify-content: space-around;
          > li {
            flex: 0 0 250px;
            height: 350px;
            background-repeat: no-repeat;
            background-size: contain;
            transition: all 0.2s;
            > h5 {
              text-align: center;
              line-height: 350px;
            }
            > div {
              display: none;
            }
            &:hover {
              transform: scale(1.01);
              background-color: #f2f2f2;
              background-image: none !important;
              box-shadow: 3px 3px 10px 1px #aaa;
              > h5 {
                display: none;
              }
              > div {
                display: block;
                text-align: left;
                padding: 20px;
                > h5 {
                  color: #00cc99;
                  margin-bottom: 15px;
                }
                > p {
                  font-size: 14px;
                  line-height: 28px;
                }
              }
            }
          }
        }
      }
    }
    &:nth-child(5) {
      height: 1050px;
      .container {
        padding-top: 80px;
        width: 1315px;
        > ul {
          margin-top: 80px;
          margin-bottom: 70px;
          display: flex;
          justify-content: space-between;
          > li {
            flex: 0 0 310px;
            height: 680px;
            background-color: #fff;
            transition: all 0.2s;
            > div {
              padding: 30px;
              border-bottom: 1px solid #e4e4e4;
              > ul {
                font-size: 14px;
                margin-top: 21px;
                text-align: left;
                line-height: 28px;
              }
            }
            > p {
              text-align: left;
              line-height: 25px;
              font-size: 14px;
              padding: 35px 15px;
            }
            &:hover {
              transform: scale(1.01);
              box-shadow: 3px 3px 10px 1px #aaa;
            }
          }
        }
        > a {
          font-size: 24px;
          color: #009966;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
h3 {
  font-size: 36px;
}
h5 {
  font-size: 24px;
}
// 弹出的视频
.see-media {
  font-size: 24px;
  color: #fff;
  position: absolute;
  bottom: 220px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:after {
    content: '';
    margin-left: 8px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('../../assets/img/qj-estimate.jpg') no-repeat;
    vertical-align: top;
    margin-top: 2px;
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
