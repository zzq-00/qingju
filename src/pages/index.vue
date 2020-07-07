<template>
  <div class="outer-container">
    <div v-if="hasActive" class="active-img-block">
      <div v-if="hasTwoS" @click="gotoQY" class="big-img"></div>
      <div class="small-icon" v-else>
        <div class="small-img" @click="gotoQY"></div>
        <b class="close-icon" @click="closeClick">×</b>
      </div>
    </div>
    <div class="main-container" ref="mainContainerRef">
      <transition name="fade">
        <headerComponents v-if="showNewHead"></headerComponents>
      </transition>
      <homeHeaderComponents :jiliangList='jiliangList' :bianzhiList='bianzhiList' :BIMList='BIMList' :shejiList='shejiList' :gongjuList='gongjuList'></homeHeaderComponents>
      <swiperComponents class="container"></swiperComponents>
      <div class="statistics container">
        <div>
          <img src="../assets/img/shouye-dengluzhuce.png" alt="">
          <div>
            <h5>发布项目</h5>
            <p>您只需轻点鼠标即可发布项目</p>
          </div>
          <img src="../assets/img/sj.png" alt="">
        </div>
        <div>
          <img src="../assets/img/shouye-tuoguanzijin.png" alt="">
          <div>
            <h5>托管资金</h5>
            <p>与承做中心确认需求及价款</p>
          </div>
          <img src="../assets/img/sj.png" alt="">
        </div>
        <div>
          <img src="../assets/img/shouye-wanchengxiangmu.png" alt="">
          <div>
            <h5>验收成果</h5>
            <p>完成验收，发布评价</p>
          </div>
        </div>
        <div>
          <div>
            <span>注册人数</span>
            <span>
              <b style="color: #FF9035;">{{IndexData.num}}</b>&nbsp;人</span>
          </div>
          <div>
            <span>成交金额</span>
            <span>
              <b style="color: #009966;">{{IndexData.money | formatMoney}}</b>&nbsp;元</span>
          </div>
        </div>
      </div>
      <div class="home-content container">
        <!-- 新闻资讯 青矩指数 -->
        <div>
          <div>
            <h4>新闻资讯</h4>
            <div class="introduce">
              <span>公司动态 / 行业动态 / 专业论坛 / 政策法规 </span>
              <router-link to="/newsCenter/news">更多</router-link>
            </div>
            <div class="content" style="height: 330px;">
              <ul class="newsList">
                <li v-for="(item, index) in newsList" :key="index">
                  <div>
                    <router-link :to="`/newsCenter/newsDetail/${item.id}`" target="_blank">
                      {{item.title}}
                    </router-link>
                    <img src="../assets/img/new.png" alt="" v-if="item.img">
                  </div>
                  <div>
                    <span>{{item.typeDesc}}</span>&nbsp;&nbsp;&nbsp;
                    <span>{{item.createDate}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4>青矩指数</h4>
            <div class="introduce">
              <span>让收费更标准、优惠更给力</span>
              <router-link to="/info/controlIndex">更多详情</router-link>
            </div>
            <div class="content" style="height: 330px;">
              <div class="exponent">
                <span>青矩综指：
                  <i style="color: #2B8F19;">{{indexNumber}}</i>
                </span>
                <a style="color:#009965;" href="/benefits">我要签到</a>
              </div>
              <div id="qingjuECharts"></div>
            </div>
          </div>
        </div>

        <!-- 企业合作 -->
        <div style="margin-top: 30px;">
          <router-link to="/businessService/intelligentModeling">
            <img :src="require('@/assets/img/promotion.png')" alt="" width="1200px" height="200px">
          </router-link>
        </div>

        <!-- 青矩计量 -->
        <div>
          <div>
            <h3>青矩计量</h3>
            <div class="introduce">
              <span>土建 / 钢筋 / 室内安装 / 装饰装修 / 钢结构 / 室外配套 / 土方及地基工程 </span>
            </div>
            <div class="content clearfix" style="height: 300px;">
              <div class="left jiliang fl">
                <h3>青矩计量<br>快\准\省</h3>
                <router-link to="/businessService/estimate" style="margin-top: 20px;">
                  <el-button type="primary" round style="padding: 7px 35px;">
                    查看详情
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </router-link>
              </div>
              <div class="right fl clearfix">
                <label v-for="(item,index) in jiliangList" :key="index" class="fl">
                  <input type="checkbox" style="display:none;" :value="item.cid" v-model="estimateContents">
                  <div>
                    <img :src="item.imgUrl" alt="" width="128px" height="128px">
                    <div>
                      <h5>{{item.name}}</h5>
                      <span>订购此服务</span>
                    </div>
                  </div>
                </label>
                <div class="fl circle">
                  <a href="javascript:;" @click="release('jiliang')">发布计量项目</a>
                  <router-link to='/businessService/inquiryPrice' target="_blank" class="other-link">一键询价</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 青矩BIM -->
        <div>
          <div>
            <h3>青矩BIM</h3>
            <div class="introduce">
              <span>计量 / 计价 / 审核 / 变更 / 进度管理 / 支付 / 结算</span>
            </div>
            <div class="content clearfix" style="height: 600px;">
              <div class="left bim fl">
                <h3>所到之处<br>避无可避</h3>
                <router-link to="/businessService/BIM" style="margin-top: 20px;">
                  <el-button type="primary" round style="padding: 7px 35px;">
                    查看详情
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </router-link>
              </div>
              <div class="right fl clearfix">
                <label v-for="(item,index) in BIMList" :key="index" class="fl">
                  <input type="checkbox" style="display:none;" :value="item.id" v-model="BIMContents">
                  <div>
                    <img :src="item.imgUrl" alt="" width="128px" height="128px">
                    <div>
                      <h5>{{item.name}}</h5>
                      <span>订购此服务</span>
                    </div>
                  </div>
                </label>
                <div class="fl circle">
                  <a href="javascript:;" @click="release('BIM')">发布BIM项目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 青矩设计 -->
        <div>
          <div>
            <h3>青矩设计</h3>
            <div class="introduce">
              <span>概念设计 / 方案设计 / 初步设计 / 施工图设计 </span>
            </div>
            <div class="content clearfix" style="height: 300px;">
              <div class="left sheji fl">
                <h3>青矩设计<br>纵横你我</h3>
                <router-link to="/businessService/design" style="margin-top: 20px;">
                  <el-button type="primary" round style="padding: 7px 35px;">
                    查看详情
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </router-link>
              </div>
              <div class="right fl clearfix">
                <label v-for="(item,index) in shejiList2" :key="index" class="fl">
                  <div @click="release('sheji', item.id)">
                    <img :src="item.imgUrl" alt="" width="128px" height="128px">
                    <div>
                      <h5>{{item.name}}</h5>
                      <span>订购此服务</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 我们的客户 -->
        <!-- <div>
        <div>
          <h3>我们的客户</h3>
          <div class="introduce">
            <span>百家战略合作伙伴的共同选择</span>
          </div>
          <div class="content">
            <div class="imgs">
              <img v-for="(item,index) in images" :src="item.url" alt="" :key="index" width="220px" height="100px">
            </div>
          </div>
        </div>
      </div> -->
        <!-- 经典案例 -->
        <div>
          <div>
            <h3>经典案例</h3>
            <div class="introduce">
              <span>设计企业 / 房地产企业 / 施工企业 / 咨询企业 / 其他 </span>
              <router-link to="/businessService/classicCaseList">更多详情</router-link>
            </div>
            <div class="content">
              <el-carousel height="312px" class="self-carousel" arrow="never">
                <el-carousel-item>
                  <div class="card">
                    <img :src="require('@/assets/img/u213.png')" alt="" width="750px" height="345px">
                    <div class="card-content">
                      <div>
                        <h5>马来西亚某项目</h5>
                        <div>
                          <span>建设地点：</span>
                          <span>马来西亚</span>
                        </div>
                      </div>
                      <div>
                        <ul>
                          <li>
                            <span>建设规模：</span>
                            <span>建筑面积：335.9万平方米</span>
                          </li>
                          <li>
                            <span>服务内容：</span>
                            <span>工程量计算</span>
                          </li>
                          <li>
                            <span>完成时间：</span>
                            <span>15天/批</span>
                          </li>
                          <li>
                            <span>误差率：</span>
                            <span> &lt;1% </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </el-carousel-item>
                <el-carousel-item>
                  <div class="card">
                    <img :src="require('@/assets/img/an2.png')" alt="" width="750px" height="345px">
                    <div class="card-content">
                      <div>
                        <h5>某机场航站项目</h5>
                        <div>
                          <span>建设地点：</span>
                          <span>华北地区</span>
                        </div>
                      </div>
                      <div>
                        <ul>
                          <li>
                            <span>建设规模：</span>
                            <span>建筑面积：72万平方米</span>
                          </li>
                          <li>
                            <span>服务内容：</span>
                            <span>工程量计算+清单编制+控制价</span>
                          </li>
                          <li>
                            <span>完成时间：</span>
                            <span>10天/批</span>
                          </li>
                          <li>
                            <span>误差率：</span>
                            <span> &lt;1% </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>

      <footerComponents class="footer-index" />
    </div>
  </div>
</template>

<script>
var echarts = require('echarts')
import headerComponents from '@/components/headerComponents'
import homeHeaderComponents from '@/components/homeHeaderComponents'
import swiperComponents from '@/components/swiperComponents'
import footerComponents from '@/components/footerComponents'

import api from '@/fetch/api'
export default {
  components: {
    headerComponents,
    homeHeaderComponents,
    swiperComponents,
    footerComponents
  },
  data() {
    return {
      hasTwoS: true,
      hasActive: true,
      showNewHead: false,
      newsParams: {
        page: 0,
        size: 5,
        status: true
      },
      newsList: [],
      estimateContents: [],
      BIMContents: [],
      images: [
        { url: require('@/assets/img/u150.png') },
        { url: require('@/assets/img/u152.jpg') },
        { url: require('@/assets/img/u154.jpg') },
        { url: require('@/assets/img/u156.jpg') },
        { url: require('@/assets/img/u158.jpg') },
        { url: require('@/assets/img/u160.jpg') },
        { url: require('@/assets/img/u162.jpg') },
        { url: require('@/assets/img/u164.jpg') },
        { url: require('@/assets/img/u166.jpg') },
        { url: require('@/assets/img/u168.jpg') },
        { url: require('@/assets/img/u170.png') },
        { url: require('@/assets/img/u172.png') },
        { url: require('@/assets/img/u174.png') },
        { url: require('@/assets/img/u176.png') },
        { url: require('@/assets/img/u178.png') },
        { url: require('@/assets/img/u180.png') },
        { url: require('@/assets/img/u182.png') },
        { url: require('@/assets/img/u184.png') },
        { url: require('@/assets/img/u186.png') },
        { url: require('@/assets/img/u188.png') }
      ],
      echartsData: [],
      indexNumber: '',
      IndexData: {},
      bianzhiList: [
        {
          name: '概算编制',
          cid: '10',
          imgUrl: require('@/assets/img/S01.png')
        },
        {
          name: '预算编制',
          cid: '9',
          imgUrl: require('@/assets/img/S02.png')
        }
      ],
      jiliangList: [
        {
          name: '工程量计算',
          cid: '4df0530c784e4a7ebeb34c41c059fb87',
          imgUrl: require('@/assets/img/S01.png')
        },
        {
          name: '清单编制',
          cid: '843794e4ba9e438985670370520eb2bc',
          imgUrl: require('@/assets/img/S02.png')
        },
        {
          name: '招标控制价',
          cid: 'a478806d57dd4066bde1ad21c84af1e2',
          imgUrl: require('@/assets/img/S03.png')
        }
      ],
      BIMList: [
        {
          id: '91bc7086-4905-11e8-83e7-20040ffbdbb6',
          name: 'BIM建模',
          imgUrl: require('@/assets/img/S04.png')
        },
        {
          id: '91bf085a-4905-11e8-83e7-20040ffbdbb6',
          name: '碰撞检查',
          imgUrl: require('@/assets/img/S05.png')
        },
        {
          id: '91c1fae7-4905-11e8-83e7-20040ffbdbb6',
          name: '机电管线综合',
          imgUrl: require('@/assets/img/S06.png')
        },
        {
          id: '91c5ea28-4905-11e8-83e7-20040ffbdbb6',
          name: '预留孔洞优化',
          imgUrl: require('@/assets/img/S07.png')
        },
        {
          id: '91cb535e-4905-11e8-83e7-20040ffbdbb6',
          name: '模型渲染',
          imgUrl: require('@/assets/img/S08.png')
        },
        {
          id: '91d122a1-4905-11e8-83e7-20040ffbdbb6',
          name: '施工模拟',
          imgUrl: require('@/assets/img/S09.png')
        },
        {
          id: '91d88a31-4905-11e8-83e7-20040ffbdbb6',
          name: '算量',
          imgUrl: require('@/assets/img/S01.png')
        }
      ],
      shejiList: [
        { name: '建筑设计', id: '1' },
        { name: '规划设计', id: '2' },
        { name: '市政道路', id: '3' },
        { name: '园林景观', id: '4' },
        { name: '装饰装修', id: '5' }
      ],
      shejiList2: [
        {
          name: '建筑、市政',
          id: '1',
          imgUrl: require('@/assets/img/S10.png')
        },
        { name: '园林景观', id: '4', imgUrl: require('@/assets/img/S11.png') },
        {
          name: '城市规划编制',
          id: '2',
          imgUrl: require('@/assets/img/S12.png')
        },
        { name: '建筑装饰', id: '5', imgUrl: require('@/assets/img/S13.png') }
      ],

      gongjuList: [
        { name: '百工驿', link: 'http://www.baigongyi.com' },
        //{ name: 'BIMGhost', link: 'http://bim.tztech.net/' },
        { name: '成本云', link: 'https://www.icostcloud.com/CostManagement/' },
        // { name: 'CAD机器人', link: 'http://www.tztech.net/bimghost' },
        { name: '运管系统', link: 'http://www.tztech.net/product/2' }
      ],
      maxN: '',
      minN: ''
    }
  },
  methods: {
    gotoQY() {
      this.$router.push({
        path: '/collaborationService/friendBenefit'
      })
    },
    closeClick() {
      this.hasActive = false
      this.$refs.mainContainerRef.style.top = 0
    },
    // 新闻列表获取
    getAllNews() {
      api.getAllNews(this.newsParams).then(res => {
        this.newsList = res.page.content
        // 判断新闻距离创建时间是否在15天以内 如果在 显示new
        let nowTime = Date.parse(new Date())
        for (let index = 0; index < this.newsList.length; index++) {
          let creatTime = Date.parse(this.newsList[index].createDate)
          let difference = nowTime - creatTime
          var days = Math.floor(difference / (24 * 3600 * 1000))
          if (days <= 15) {
            // 计算时差小于15天的话直接给true img是创建的参数
            this.newsList[index].img = true
          }
        }
      })
    },
    drawchart(dataList) {
      var myChart = echarts.init(document.getElementById('qingjuECharts'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        grid: {
          top: '12%',
          left: '1%',
          right: '3%',
          bottom: '0',
          containLabel: true
        },
        xAxis: {
          axisLine: { onZero: true },
          data: dataList.map(item => item.date.substring(5, 10)),
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          scale: true,
          min: this.minN,
          max: this.maxN,
          axisLine: { onZero: false },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            type: 'line',
            smooth: false,
            itemStyle: {
              normal: {
                color: '#17FA94'
              }
            },
            symbolSize: 5,
            data: dataList.map(item => item.complexExponentFormat)
          }
        ]
      })
    },
    // 指数
    getExponentByNum() {
      api.getExponentByNum(7).then(res => {
        this.indexNumber = res.data.complexExponents[0].complexExponentFormat
        var arr = []
        res.data.complexExponents.map(item => {
          arr.push(item.complexExponentFormat)
        })
        var maxN = eval('Math.max(' + arr.toString() + ')')
        var minN = eval('Math.min(' + arr.toString() + ')')
        this.maxN = Math.ceil(maxN * 1.2)
        this.minN = Math.ceil(minN * 0.8)
        this.drawchart(res.data.complexExponents.reverse())
      })
    },
    // 注册人数 成交金额
    showIndexData() {
      api.showIndexData().then(res => {
        this.IndexData = res.data
      })
    },
    release(param, value) {
      if (param === 'jiliang') {
        window.sessionStorage.estimateContents = this.estimateContents
        this.$router.push('/businessService/releaseEstimate')
      } else if (param === 'BIM') {
        window.sessionStorage.BIMContents = this.BIMContents
        this.$router.push('/businessService/releaseBIM')
      } else if (param === 'sheji') {
        window.sessionStorage.designContents = value
        this.$router.push('/businessService/releaseDesign')
      }
    }
  },
  mounted() {
    if (window.sessionStorage.hasShowAd) {
      this.hasTwoS = false
      this.$refs.mainContainerRef.style.top = '80px'
    } else {
      window.sessionStorage.hasShowAd = true
      setTimeout(() => {
        this.hasTwoS = false
      }, 5000)
      setTimeout(() => {
        if (this.$refs.mainContainerRef) {
          this.$refs.mainContainerRef.style.top = '80px'
          this.$refs.mainContainerRef.style.transition = 'top 2s'
        }
      }, 3000)
    }

    this.getAllNews()
    this.showIndexData()
    this.getExponentByNum()
    document.onscroll = () => {
      var st = document.body.scrollTop || document.documentElement.scrollTop
      this.showNewHead = st > 1100
    }
    let untie = this.$route.query.untie
    let userId = this.$route.query.userId
    if (untie == 'untieEmail') {
      //获取地址栏参数 解绑邮箱
      let data = {
        email: this.$route.query.emial
      }
      api
        .untiedMobile(data)
        .then(res => {
          if (res.errorCode == 200) {
            this.$message({
              message: '邮箱解绑成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: err.errorMsg,
            type: 'error'
          })
        })
    }
    if (userId) {
      //绑定邮箱
      api
        .saveEmail({
          email: this.$route.query.emial,
          userId: userId
        })
        .then(res => {
          if (res.errorCode == 200) {
            this.$message({
              message: '编辑邮箱成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: err.errorMsg,
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang='less' scoped>
.footer-index {
  margin-bottom: 80px;
}
.outer-container {
  position: relative;
  overflow: hidden;
}
.active-img-block {
  cursor: pointer;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
  background-color: #aa0b22;
  left: 50%;
  transform: translate(-50%, 0);
  // animation: opacityEle 2.5s;
}
@keyframes opacityEle {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.big-img {
  max-width: 1900px;
  height: 408px;
  background: url('../assets/img/top-index-big.png') no-repeat center;
  background-size: cover;
  margin: auto;
}
.small-img {
  max-width: 1900px;
  height: 80px;
  background: url('../assets/img/top-index-small.jpg') no-repeat center;
  background-size: cover;
  animation: opacityEle 2.5s;
}
.main-container {
  position: relative;
  top: 408px;
  // top: 80px;
  background: #f1f1f1;
  // transition: top 5s;
  // animation: moveToTop 2s;
}
@keyframes moveToTop {
  0% {
    top: 408px;
  }
  100% {
    top: 80px;
  }
}
.small-icon {
  position: relative;
  cursor: pointer;
  max-width: 1900px;
  margin: auto;
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 300px;
  display: inline-block;
  font-size: 12px;
  padding: 3px 8px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.blank-div {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: height 2s;
}
.btn-common {
  width: 205px;
  height: 55px;
  line-height: 1px;
  border-radius: 50px;
  font-size: 18px;
  letter-spacing: 2px;
  padding: 12px 23px;
}
.statistics {
  display: flex;
  box-sizing: border-box;
  height: 100px;
  padding: 11px;
  background-color: #f9f9f9;
  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    > div {
      width: 100%;
      padding-left: 15px;
      > h5 {
        font-size: 18px;
        margin-bottom: 5px;
      }
      > p {
        font-size: 14px;
      }
    }
    &:last-child {
      flex-direction: column;
      justify-content: center;
      border-left: 1px solid #a1a1a1;
      > div {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.home-content {
  margin-bottom: 42px;
  > div {
    display: flex;
    margin-top: 48px;
    > div {
      flex: 1;
      text-align: center;
      & + div {
        margin-left: 17px;
      }
      .introduce {
        font-size: 14px;
        margin: 8px 0 19px;
        position: relative;
        > a {
          color: #bbbbbb;
          padding-right: 18px;
          background: url(../assets/img/gengduo.png) no-repeat right;
          position: absolute;
          right: 0;
          &:hover {
            color: #2d9769;
            background: url(../assets/img/gengduo1.png) no-repeat right;
          }
        }
      }
      .content {
        font-size: 14px;
        background-color: #fff;
        > ul.newsList {
          padding: 0 25px;
          text-align: left;
          > li {
            &:not(:last-child) {
              border-bottom: 1px solid #f1f1f1;
            }
            padding: 10px 0;
            > div {
              height: 20px;
              &:first-child {
                margin-bottom: 5px;
                position: relative;
              }
              > a {
                display: inline-block;
                max-width: 520px;
                height: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                vertical-align: middle;
                &:hover {
                  color: #2d9769;
                  text-decoration: underline;
                }
              }
              > img {
                position: absolute;
                margin-left: 3px;
              }
              > span {
                color: #999999;
              }
            }
          }
        }
        .exponent {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          padding: 14px 25px 0 25px;
        }
        .left {
          display: flex;
          box-sizing: border-box;
          width: 280px;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #f1f1f1;
          &.jiliang {
            background: url(../assets/img/jiliang-bg.png) no-repeat center;
          }
          &.bim {
            background: url(../assets/img/bim-bg.png) no-repeat center;
          }
          &.sheji {
            background: url(../assets/img/sheji-bg.png) no-repeat center;
          }
        }
        .right {
          width: 920px;
          > label {
            display: block;
            height: 300px;
            width: 230px;
            > div {
              height: 100%;
              transition: box-shadow 0.2s;
              box-sizing: border-box;
              border-right: 1px solid #f1f1f1;
              border-bottom: 1px solid #f1f1f1;
              &:hover {
                transform: scale(1.01);
                box-shadow: 0px 0px 25px 0px #aaa;
              }
              > img {
                margin: 36px auto 59px;
              }
              > div {
                > h5 {
                  font-weight: normal;
                  font-size: 18px;
                  margin-bottom: 10px;
                }
                > span {
                  font-size: 12px;
                  color: #00986a;
                }
              }
            }
            > input[type='checkbox']:checked + div {
              border: 1px solid #009769;
              background: url(../assets/img/duigou.png) no-repeat right bottom;
            }
          }
          > .circle {
            box-sizing: border-box;
            width: 230px;
            height: 300px;
            border-bottom: 1px solid #f1f1f1;
            border-right: 1px solid #f1f1f1;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            > a {
              font-size: 18px;
              &:first-child {
                display: block;
                width: 125px;
                height: 125px;
                line-height: 125px;
                color: #fff;
                background-color: #009769;
                border-radius: 50%;
                border: 2px solid #fff;
                transition: all 0.2s;
                &:hover {
                  transform: scale(1.05);
                  box-shadow: 0px 0px 0px 11px #74cab6;
                }
              }
              &.other-link {
                width: 90px;
                font-weight: 700;
                color: #009769;
              }
            }
          }
        }
        .imgs {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          > img:nth-child(-n + 15) {
            margin-bottom: 20px;
          }
        }
        .card {
          display: flex;
          height: 345px;
          background-color: #fff;
          box-shadow: 0px 0px 14px #aaa;
          .card-content {
            flex: 1;
            padding: 52px;
            > div {
              line-height: 30px;
              font-size: 14px;
              color: #656565;
              &:first-child {
                h5 {
                  font-size: 18px;
                  color: #00915f;
                  margin-bottom: 10px;
                }
                border-bottom: 1px solid #d7d7d7;
                padding-bottom: 20px;
              }
              &:last-child {
                padding-top: 30px;
                li {
                  display: flex;
                  justify-content: space-between;
                }
              }
            }
          }
        }
      }
    }
  }
}

#qingjuECharts {
  width: 480px;
  height: 270px;
  margin: 0 auto;
}
h3 {
  font-size: 36px;
}
h4 {
  font-size: 24px;
}
</style>
