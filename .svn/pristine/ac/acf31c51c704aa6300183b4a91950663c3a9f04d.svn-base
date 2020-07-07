<template>
  <div>
    <div class="banner" style="margin-top:130px;"></div>
    <div class="choice" id="first">
      <div class="container">
        <h2>BIM</h2>
        <label v-for="(item, index) of allServiceContent" :key="index">
          <input type="checkbox" style="display: none;" v-model="BIMContents" :value="item.id">
          <span>{{item.serviceContentName}}</span>
        </label>
        <button @click="releaseBIM">发布项目</button>
      </div>
    </div>
    <div class="BIM-content">

      <div>
        <div class="container">
          <div class="image">
            <img :src="require('@/assets/img/jianmo.png')" alt="">
          </div>
          <div class="description">
            <h3>BIM建模</h3>
            <p>以工程设计图纸、施工组织设计文件等为依据，根据使用需求及精度等 级要求，采用通用或定制化建模标准，建立几何尺寸、空间位置、信息、 外观等精准可靠的BIM模型。包括工民建、公路/铁路、桥梁、隧道等专 业领域。</p>
            <div>
              <span><img :src="require('@/assets/img/gongminjian.png')" alt="">工民建</span>
              <span><img :src="require('@/assets/img/gonglu.png')" alt="">公路/铁路</span>
              <span><img :src="require('@/assets/img/qiaoliang.png')" alt="">桥梁</span>
              <span><img :src="require('@/assets/img/suidao.png')" alt="">隧道</span>
              <span><img :src="require('@/assets/img/qita.png')" alt="">其它</span>
            </div>
            <label>
              <input type="checkbox" style="display: none;" v-model="BIMContents" value="91bc7086-4905-11e8-83e7-20040ffbdbb6">
              <span id="second">订购此服务</span>
            </label>
          </div>
        </div>
      </div>
      <div>
        <div class="container">
          <div class="description">
            <h3>碰撞检查</h3>
            <p>根据BIM三维可视化特点，根据实际需求对项目土建、机电、装修等全专业 进行碰撞检查，直观发现设计图纸碰撞问题，并将问题整理为碰撞检查报告， 为设计优化、管线综合排布提供依据。</p>
            <div>
              <span><img :src="require('@/assets/img/quanzhuanye.png')" alt="">全专业</span>
              <span><img :src="require('@/assets/img/jiancha.png')" alt="">检查</span>
              <span><img :src="require('@/assets/img/zhiguan.png')" alt="">直观</span>
            </div>
            <label>
              <input type="checkbox" style="display: none;" v-model="BIMContents" value="91bf085a-4905-11e8-83e7-20040ffbdbb6">
              <span id="third">订购此服务</span>
            </label>
          </div>
          <div class="image">
            <img :src="require('@/assets/img/pengzhuang.png')" alt="">
          </div>
        </div>
      </div>

      <div>
        <div class="container">
          <div class="image">
            <img :src="require('@/assets/img/jidian.png')" alt="">
          </div>
          <div class="description">
            <h3>机电管线综合</h3>
            <p>根据实际需求，以机电设计规范、发包人要求等为依据，对项目BIM模型 的机电部分进行管线的综合排布，解决碰撞问题、优化净空，另管线排布 规则整齐。最后按照优化后的机电模型，输出机电综合排布后的平面图、 剖面图等。</p>
            <div>
              <span><img :src="require('@/assets/img/jiejue.png')" alt="">解决</span>
              <span><img :src="require('@/assets/img/youhua.png')" alt="">优化</span>
              <span><img :src="require('@/assets/img/shuchu.png')" alt="">输出</span>
            </div>
            <label>
              <input type="checkbox" style="display: none;" v-model="BIMContents" value="91c1fae7-4905-11e8-83e7-20040ffbdbb6">
              <span id="fourth">订购此服务</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div class="container">
          <div class="description">
            <h3>预留孔洞优化</h3>
            <p>根据土建模型与机电模型的碰撞结果，根据设计规范、发包人要求等为依据， 优化土建墙体洞口，修正洞口位置错误或洞口缺失问题，优化设计。最后按 照优化后的土建模型，输出预留孔洞平面图、剖面图等。</p>
            <div>
              <span><img :src="require('@/assets/img/youhua.png')" alt="">优化</span>
              <span><img :src="require('@/assets/img/xiuzheng.png')" alt="">修正</span>
            </div>
            <label>
              <input type="checkbox" style="display: none;" v-model="BIMContents" value="91c5ea28-4905-11e8-83e7-20040ffbdbb6">
              <span id="fifth">订购此服务</span>
            </label>
          </div>
          <div class="image">
            <img :src="require('@/assets/img/yuliu.png')" alt="">
          </div>
        </div>
      </div>

      <div>
        <div class="container">
          <div class="image">
            <img :src="require('@/assets/img/moxing.png')" alt="">
          </div>
          <div class="description">
            <h3>模型渲染</h3>
            <p>根据发包人要求，将BIM模型的材质、周边环境、光照等进行优化，并进行 渲染，输出高精度效果图或漫游动画，供效果展示、投标使用。</p>
            <div>
              <span><img :src="require('@/assets/img/duochangjing.png')" alt="">多场景</span>
              <span><img :src="require('@/assets/img/xuanran.png')" alt="">渲染</span>
            </div>
            <label>
              <input type="checkbox" style="display: none;" v-model="BIMContents" value="91cb535e-4905-11e8-83e7-20040ffbdbb6">
              <span id="sixth">订购此服务</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div class="container">
          <div class="description">
            <h3>施工模拟</h3>
            <p>以设计图纸、施工组织设计、专项技术方案等为依据，建立满足施工精度 的BIM模型，并对施工进度、施工工艺进行模拟，并剪辑为动画。动画策 划方案需要双方协商。</p>
            <div>
              <span><img :src="require('@/assets/img/moxing2.png')" alt="">模型</span>
              <span><img :src="require('@/assets/img/moni.png')" alt="">模拟</span>
              <span><img :src="require('@/assets/img/donghua.png')" alt="">动画</span>
            </div>
            <label>
              <input type="checkbox" style="display: none;" v-model="BIMContents" value="91d122a1-4905-11e8-83e7-20040ffbdbb6">
              <span id="seventh">订购此服务</span>
            </label>
          </div>
          <div class="image">
            <img :src="require('@/assets/img/shigong.png')" alt="">
          </div>
        </div>
      </div>

      <div>
        <div class="container">
          <div class="image">
            <img :src="require('@/assets/img/suanliang.png')" alt="">
          </div>
          <div class="description">
            <h3>BIM算量</h3>
            <p>以BIM模型作为工程计量数据基础，从模型中提取各专业工程量，根据实际 需求可提取实物工程量或符合国标清单计量规则的清单工程量。</p>
            <div>
              <span><img :src="require('@/assets/img/moxing2.png')" alt="">工程量</span>
              <span><img :src="require('@/assets/img/moni.png')" alt="">清单</span>
            </div>
            <label>
              <input type="checkbox" style="display: none;" v-model="BIMContents" value="91d88a31-4905-11e8-83e7-20040ffbdbb6">
              <span>订购此服务</span>
            </label>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";

import { ceiling } from '@/assets/js/utils.js';
export default {
  data () {
    return {
      BIMContents: [],
      allServiceContent: []
    }
  },
  methods: {
    releaseBIM () {
      window.sessionStorage.BIMContents = this.BIMContents
      this.$router.push("/businessService/releaseBIM")
    },
    // 获取服务内容
    getServiceContent () {
      api.getServiceContent().then(res => {
        this.allServiceContent = res.dataList
      })
    }
  },
  mounted () {
    document.querySelector('#header-com').style.position = 'absolute'

    let wrap = document.querySelector(".choice")
    ceiling(wrap)

    this.getServiceContent()
  }
}
</script>
<style lang="less" scoped>
.banner {
  height: 600px;
  background: url(../../assets/img/u0.png) center no-repeat;
}
.choice {
  height: 80px;
  line-height: 80px;
  background-color: #f7f7f7;
  position: absolute;
  left: 0;
  right: 0;
  &[data-fixed="fixed"] {
    position: fixed;
    top: 0;
    margin: 0;
  }
  .container {
    > label,
    > button {
      cursor: pointer;
    }
    > h2 {
      float: left;
      color: #00986a;
      font-size: 36px;
      margin-right: 48px;
    }
    > label {
      > span {
        display: inline-block;
        font-size: 14px;
        color: #aaaaaa;
        background-color: #f3f3f3;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 0 5px;
      }
      > input[type="checkbox"]:checked + span {
        color: #00986a;
        background: url(../../assets/img/duigou.png) no-repeat right bottom;
        background-color: #fff;
      }
    }
    > button {
      font-size: 18px;
      font-weight: 700;
      width: 222px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background-color: #009769;
      margin-left: 50px;
    }
  }
}
.BIM-content {
  margin-top: 80px;
  > div {
    height: 500px;
    &:nth-child(2n) {
      background-color: #f7f7f7;
    }
    &:nth-child(2n + 1) {
      background-color: #fff;
    }
    .container {
      display: flex;
      > div {
        flex: 1;
        &.image {
          margin-top: 110px;
        }
        &.description {
          margin-top: 58px;
          > h3 {
            font-size: 34px;
            color: #333;
          }
          > p {
            width: 580px;
            height: 160px;
            font-size: 18px;
            color: #333;
            line-height: 40px;
            margin-top: 30px;
          }
          > div {
            > span {
              display: inline-block;
              text-align: center;
              font-size: 14px;
              color: #656565;
              margin-right: 33px;
              > img {
                display: block;
                margin: 10px auto;
              }
            }
          }
          > label {
            cursor: pointer;
            > span {
              display: inline-block;
              font-size: 14px;
              color: #333333;
              width: 222px;
              height: 43px;
              line-height: 43px;
              text-align: center;
              margin-top: 40px;
              border: 1px solid #e0e0e0;
            }
            > input[type="checkbox"]:checked + span {
              color: #00986a;
              border: 1px solid #00986a;
              background: url(../../assets/img/duigou.png) no-repeat right
                bottom;
            }
          }
        }
      }
    }
  }
}
</style>

