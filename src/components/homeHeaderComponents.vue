<template>
  <div id="header-com">
    <loginHeaderBar />

    <div class="header-info">
      <div class="container clearfix">
        <router-link to="/" class="logo fl">青矩</router-link>
        <div class="fr">
          <a href="javascript:;" class="pushPro" @click="publish">
            发布项目
          </a>
          <div class="exponent">
            <h5>青矩综指</h5>
            <div>
              <i>●</i>
              <span>{{$store.state.indexNumber}}</span>
              <router-link to="/benefits">&nbsp;[签到]</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nav">
      <div class="container">
        <div class="classify-nav" @mouseleave="activeErList = -1">
          <h3>服务分类</h3>
          <div class="classify-hot">
            <!-- 第一列 -->
            <ul class="first">
              <li v-for="(item,index) in classifyNav" :key="index" @mouseenter="activeErList=item.name" :class="{active: activeErList===item.name}">
                <a :href="item.link" target="_blank">{{item.name}}</a>
                <div>{{item.description}}</div>
              </li>
            </ul>
            <!-- 第二列 -->
            <!-- 青矩计量 -->
            <div class="second" v-show='activeErList==="青矩计量"'>
              <div class="clearfix profession-title">
                <span class="fl">计量业务</span>
                <router-link to="/info/feeScale#first" class="fr">收费标准 ></router-link>
              </div>
              <div class="clearfix">
                <label v-for="(item,index) in jiliangList" :key="index" class="fl">
                  <!-- <input type="checkbox" :value="item.cid" v-model="estimateContents" style="display: none;"> -->
                  <span @click.stop="release('jiliang', item.cid)">{{item.name}}</span>
                </label>
              </div>
              <div class="clearfix profession-title">
                <span class="fl">编制业务</span>
                <router-link to="/info/feeScale#second" class="fr">收费标准 ></router-link>
              </div>
              <div class="clearfix">
                <label v-for="(item,index) in bianzhiList" :key="index" class="fl">
                  <!-- <input type="checkbox" :value="item.cid" v-model="establishmentContents" style="display: none;"> -->
                  <span @click.stop="release('bianzhi', item.cid)">{{item.name}}</span>
                </label>
              </div>
            </div>
            <!-- 青矩BIM -->
            <div class="second" v-show='activeErList==="青矩BIM"'>
              <div class="clearfix">
                <label v-for="(item,index) in BIMList" :key="index" class="fl">
                  <input type="checkbox" :value="item.id" v-model="BIMContents" style="display: none;">
                  <span>{{item.name}}</span>
                </label>
              </div>
              <div class="submit">
                <el-button type="primary" size="small" @click="release('BIM')">发布项目</el-button>
                <span>（可多选）</span>
              </div>
            </div>
            <!-- 青矩设计 -->
            <div class="second" v-show='activeErList==="青矩设计"'>
              <div class="clearfix">
                <label v-for="(item,index) in shejiList" :key="index" class="fl">
                  <input type="radio" name="sheji" :value="item.id" v-model="designContents" style="display: none;">
                  <span>{{item.name}}</span>
                </label>
              </div>
              <div class="submit">
                <el-button type="primary" size="small" @click="release('sheji')">发布项目</el-button>
              </div>
            </div>
            <!-- 青矩工具 -->
            <div class="second" v-show='activeErList==="青矩工具"'>
              <div class="clearfix">
                <label v-for="(item,index) in gongjuList" :key="index" class="fl">
                  <span>
                    <a :href="item.link" target="_blank">{{item.name}}</a>
                  </span>
                </label>
              </div>
            </div>

          </div>
        </div>
        <!-- 产品介绍相关链接 -->
        <ul class="nav-item clearfix" @mouseleave="nowHover=-1">
          <li v-for="(item,index) in navs" :key="index" @mouseenter="nowHover=index" :class="{isActive:nowActive===index}">
            <router-link v-if="item.url" :to="item.url" target="_blank">{{item.name}}<img src="@/assets/img/new.png" alt="" class="new-icon" v-if="item.name==='最新活动'&&$store.state.hasNewTag"></router-link>
            <a href="http://online.qingju.cn/" target="_blank" v-else-if="item.onlineURL" class="online-url">{{item.name}}</a>
            <a v-else href="javascript:;">
              {{item.name}}
              <span class="img-triangle"></span>
              <div class="secondNav" v-if="nowHover===index && item.secondNav">
                <ul class="clearfix">
                  <li class="fl" v-for="i in item.secondNav" :key="i.name">
                    <router-link :to="i.url">{{i.text}}</router-link>
                    <ul class="thirdNav">
                      <li v-for="n in i.thirdNav" :key="n.name">
                        <router-link :to="n.url">{{n.name}}</router-link>
                      </li>
                    </ul>
                    <template v-if="i.text2">
                      <a :href="i.url2">{{i.text2}}</a>
                      <ul class="thirdNav">
                        <li v-for="n in i.thirdNav2" :key="n.name">
                          <a :href="n.url">{{n.name}}</a>
                        </li>
                      </ul>
                    </template>
                  </li>
                </ul>
              </div>
              <ul class="second-simple-nav" v-else-if="nowHover===index && item.secondSimpleNav">
                <li v-for="itemSecond in item.secondSimpleNav" :key="itemSecond.text">
                  <router-link :to="itemSecond.url">{{itemSecond.text}}</router-link>
                </li>
              </ul>
            </a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/fetch/api'
import loginHeaderBar from '@/components/loginHeaderBar'

export default {
  components: {
    loginHeaderBar
  },
  props: {
    classifyNav: {
      type: Array,
      default: function() {
        return [
          {
            name: '青矩计量',
            link: 'javascript:;',
            description: '计量业务 编制业务'
          },
          {
            name: '青矩BIM',
            link: 'javascript:;',
            description: '建模 碰撞检查 机电 更多'
          },
          {
            name: '青矩设计',
            link: 'javascript:;',
            description: '建筑 规划 市政 更多'
          },
          { name: '青矩工具', link: 'javascript:;', description: '百工驿  更多' }
        ]
      }
    },
    jiliangList: {
      type: Array,
      required: true
    },
    bianzhiList: {
      type: Array,
      required: true
    },
    BIMList: {
      type: Array,
      required: true
    },
    shejiList: {
      type: Array,
      required: true
    },
    gongjuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      userInfo: {},
      centerDialogVisible: false,
      activeErList: -1,
      nowActive: '', // 第一级的显示
      nowHover: -1,
      estimateContents: [],
      establishmentContents: [],
      BIMContents: [],
      designContents: '',
      navs: [
        { name: '最新活动', url: '/newsCenter/activity' },
        {
          name: '产品服务',
          secondNav: [
            {
              text: '计量业务',
              url: '/businessService/estimate',
              thirdNav: [
                { name: '钢筋算量', url: '/businessService/productPresentation#first' },
                { name: '土建算量', url: '/businessService/productPresentation#second' },
                { name: '安装算量', url: '/businessService/productPresentation#third' },
                { name: '清单编制', url: '/businessService/productPresentation#fourth' },
                { name: '招标控制价', url: '/businessService/productPresentation#fifth' }
              ],
              text2: '编制业务',
              url2: 'javascript:;',
              thirdNav2: [
                { name: '概算编制', url: 'javascript:;' },
                { name: '预算编制', url: 'javascript:;' },
              ]
            },
            {
              text: '智能建模',
              url: '/businessService/intelligentModeling',
              thirdNav: [{ name: '智能建模', url: '/businessService/intelligentModeling' }]
            },
            {
              text: 'BIM建模',
              url: '/businessService/BIM',
              thirdNav: [
                { name: 'BIM建模', url: '/businessService/BIM#first' },
                { name: '碰撞检查', url: '/businessService/BIM#second' },
                { name: '机电管线综合', url: '/businessService/BIM#third' },
                { name: '预留孔洞优化', url: '/businessService/BIM#fourth' },
                { name: '模型渲染', url: '/businessService/BIM#fifth' },
                { name: '施工模拟', url: '/businessService/BIM#sixth' },
                { name: 'BIM算量', url: '/businessService/BIM#seventh' }
              ]
            },
            {
              text: '青矩设计',
              url: '/businessService/design',
              thirdNav: [
                { name: '园林景观', url: '/businessService/design#first' },
                { name: '建筑设计', url: '/businessService/design#second' },
                { name: '规划设计', url: '/businessService/design#third' },
                { name: '市政道路', url: '/businessService/design#fourth' },
                { name: '建筑装饰', url: '/businessService/design#fifth' }
              ]
            }
          ]
        },
        { name: '福利专区', url: '/benefits' },
        {
          name: '我要合作',
          secondSimpleNav: [
            {
              text: '标准化培训',
              url: '/collaborationService/facilitator'
            },
            {
              text: '青友惠',
              url: '/collaborationService/friendBenefit'
            }
          ]
        },
        { name: '青矩online', onlineURL: 'http://online.qingju.cn/' },
        { name: '收费标准', url: '/info/feeScale#first' }
      ]
    }
  },
  created() {
    if (this.$route.path.indexOf('/newsCenter') !== -1) {
      this.nowActive = 1
    } else if (this.$route.path.indexOf('/businessService') === 0) {
      this.nowActive = 2
    } else if (this.$route.path.indexOf('/benefits') === 0) {
      this.nowActive = 3
    } else if (this.$route.path.indexOf('/collaborationService') === 0) {
      this.nowActive = 4
    }
  },
  methods: {
    publish() {
      this.$store.commit('changeReleaseWindow', true)
    },
    release(param, id) {
      if (param === 'jiliang') {
        window.sessionStorage.estimateContents = id
        this.$router.push('/businessService/releaseEstimate')
      } else if (param === 'bianzhi') {
        window.sessionStorage.establishmentContents = id
        this.$router.push('/businessService/releaseEstablishment')
      } else if (param === 'BIM') {
        window.sessionStorage.BIMContents = this.BIMContents
        this.$router.push('/businessService/releaseBIM')
      } else if (param === 'sheji') {
        window.sessionStorage.designContents = this.designContents
        this.$router.push('/businessService/releaseDesign')
      }
    },
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo
    // 当天指数
    if (!this.$store.state.indexNumber) {
      this.$store.dispatch('getIndexNumber', 1)
    }
    if (!this.$store.state.hasNewTag) {
      api.hasNewTag().then(res => this.$store.commit('setNewTag', res.data))
    }
  },
  watch: {
    '$store.state.userInfo'(val) {
      if (val) {
        this.userInfo = val
      }
    }
  }
}
</script>

<style lang='less' scoped>
#header-com {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #f3f3f3;
  transform: translateZ(0);
  border-bottom: 1px solid #2d9769;
}

.header-info {
  background-color: #fff;
  padding: 20px 0px 18px;
  .container {
    height: 59px;
    .logo {
      display: inline-block;
      text-indent: -200000px;
      width: 143px;
      height: 100%;
      background: url(../assets/logo.png) no-repeat center;
      background-size: contain;
    }
    > div {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14px;
      > a {
        margin-right: 34px;
      }
      .exponent {
        height: 100%;
        padding: 0 14px;
        border-radius: 3px;
        text-align: center;
        background: url(../assets/img/exponent-bg.png) no-repeat center;
        background-size: cover;
        position: relative;
        &::before,
        &::after {
          content: '';
          display: block;
          width: 1px;
          height: 35px;
          background-color: #009769;
          position: absolute;
          top: -34px;
        }
        &::before {
          left: 13px;
        }
        &::after {
          right: 13px;
        }
        > h5 {
          color: #fff;
          font-weight: 400;
          font-size: 14px;
          height: 29px;
          line-height: 29px;
        }
        > div {
          margin-top: 3px;
          > i {
            color: #009769;
            font-size: 12px;
            position: relative;
            top: -3px;
          }
          > span {
            color: #009769;
            font-size: 20px;
          }
          > a {
            font-size: 12px;
          }
        }
      }
    }
  }
}
.nav {
  height: 50px;
  background-color: #fff;
  position: relative;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    position: relative;
    .classify-nav {
      width: 216px;
      font-size: 14px;
      position: absolute;
      bottom: 0;
      left: 0;
      > h3 {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: normal;
        color: #fff;
        line-height: 50px;
        padding-left: 40px;
        background: url(~@/assets/img/fenlei.png) 15px center no-repeat;
        background-color: #2d9769;
      }
      .classify-hot {
        width: 100%;
        position: absolute;
        top: 51px;
        > .first {
          > li {
            height: 100px;
            padding-left: 15px;
            background: url(~@/assets/img/right1.png) 185px center no-repeat;
            background-color: rgba(126, 125, 125, 0.9);
            background-size: 15px;
            > a {
              display: inline-block;
              color: #fff;
              margin: 20px 0;
            }
            > div {
              color: #e6e6e6;
              font-size: 12px;
            }
            &.active {
              background-image: url(../assets/img/right.png);
              background-color: #f2f2f2;
              > a {
                color: #2d9769;
              }
              > div {
                color: #afafac;
              }
            }
          }
        }
        > .second {
          box-sizing: border-box;
          width: 384px;
          height: 400px;
          background-color: #fbfafa;
          padding: 20px 12px;
          position: absolute;
          top: 0;
          left: 216px;
          > .clearfix {
            &.profession-title {
              border-bottom: 1px solid #ccc;
              padding: 10px 0;
              &:nth-child(3) {
                margin-top: 35px;
              }
              > span {
                font-size: 16px;
              }
              > a {
                font-size: 12px;
                color: #7f7f7f;
                &:hover {
                  color: #2d9769;
                }
              }
            }
            > label {
              cursor: pointer;
              margin: 8px;
              > span {
                display: inline-block;
                color: #999999;
                background-color: #f3f3f3;
                height: 27px;
                line-height: 27px;
                text-align: center;
                padding: 0 15px;
                border: 1px solid #f3f3f3;
                > a {
                  color: #999999;
                }
                &:hover {
                  border-color: #ccc;
                }
              }
              > input[type='checkbox']:checked + span {
                color: #2d9769;
                border-color: #2d9769;
                background: url(../assets/img/duigou.png) no-repeat right bottom;
                background-color: #fff;
              }
              > input[type='radio']:checked + span {
                color: #2d9769;
                border-color: #2d9769;
                background: url(../assets/img/duigou.png) no-repeat right bottom;
                background-color: #fff;
              }
            }
          }
          .submit {
            text-align: center;
            margin-top: 20px;
            > button {
              padding-left: 25px;
              padding-right: 25px;
            }
            > span {
              color: #999999;
              font-size: 12px;
            }
          }
          .standard {
            font-size: 12px;
            color: #333;
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            &:hover {
              text-decoration: underline;
              color: #2d9769;
            }
          }
        }
      }
    }
    .nav-item {
      flex: 1;
      margin-left: 190px;
      > li {
        float: left;
        margin-left: 50px;
        .online-url {
          &:hover {
            color: #00cc99;
            cursor: pointer;
          }
        }
        > a {
          padding-top: 18px;
          padding-bottom: 18px;
          &:hover {
            color: #00cc99;
          }
          .new-icon {
            position: absolute;
            top: 3px;
          }
          > .secondNav {
            cursor: auto;
            width: 984px;
            height: 400px;
            background-color: rgba(18, 23, 25, 0.8);
            position: absolute;
            top: 51px;
            right: 0;
            z-index: 3;
            > ul {
              width: 100%;
              height: 100%;
              > li {
                width: 200px;
                margin-left: 38px;
                > a {
                  display: inline-block;
                  color: #fff;
                  width: 100%;
                  height: 57px;
                  line-height: 57px;
                  border-bottom: 1px solid #fff;
                  &:hover {
                    text-decoration: underline;
                    color: #00cc99;
                  }
                }
                > .thirdNav {
                  font-size: 12px;
                  padding-top: 8px;
                  > li {
                    height: 30px;
                    line-height: 30px;
                    > a {
                      color: #fff;
                      &:hover {
                        text-decoration: underline;
                        color: #00cc99;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.isActive {
  > a:first-child {
    color: #00cc99;
  }
  .img-triangle {
    background: url('../assets/img/up.png');
    background-size: cover;
  }
}
.pushPro {
  display: block;
  margin-right: 17px;
  font-size: 12px;
  font-weight: 700;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #00986a;
  background-color: #f5f5f5;
  border-radius: 3px;
  &:hover {
    color: #fff;
    background-color: #00986a;
  }
}

.img-triangle {
  display: inline-block;
  width: 11px;
  height: 6px;
  background: url('../assets/img/down.png');
  background-size: cover;
  transition: all 0.4s;
  vertical-align: middle;
}
.nav-item li {
  &:hover {
    .img-triangle {
      transform: rotate(-180deg);
      background: url('../assets/img/down2.png');
      background-size: cover;
    }
  }
}
.second-simple-nav {
  background-color: rgba(18, 23, 25, 0.8);
  position: absolute;
  top: 50px;
  margin-left: -110px;
  li {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 5px 30px;
    margin: 0 10px;
    &:first-child {
      border-right: 1px solid #fff;
    }
    a {
      color: #fff;
    }
  }
}
</style>
