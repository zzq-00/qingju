<template>
  <div id="header-com">
    <loginHeaderBar />
    <div class="nav" @mouseleave="nowHover=-1">
      <div class="container">
        <router-link to="/" class="logo">青矩</router-link>
        <ul class="nav-item clearfix">
          <li v-for="(item,index) in navs" :key="index" @mouseenter="nowHover=index" :class="{isActive:nowActive===index}">
            <router-link v-if="item.url" :to="item.url" target="_blank">{{item.name}}<img src="@/assets/img/new.png" alt="" class="new-icon" v-if="item.name==='最新活动'&&$store.state.hasNewTag"></router-link>
            <a v-else href="javascript:;">
              {{item.name}}
              <span class="img-triangle"></span>
              <div class="secondNav" v-if="nowHover===index && item.secondNav" @mouseleave="nowHover=-1">
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
              <ul class="second-simple-nav" @mouseleave="nowHover=-1" v-else-if="nowHover===index && item.secondSimpleNav">
                <li v-for="itemSecond in item.secondSimpleNav" :key="itemSecond.text">
                  <router-link :to="itemSecond.url">{{itemSecond.text}}</router-link>
                </li>
              </ul>
            </a>
          </li>
        </ul>
        <div class="right-pendant">
          <a class="pushPro" href="javascript:;" @click="publish">
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
  </div>
</template>

<script>
import api from '@/fetch/api'
import loginHeaderBar from '@/components/loginHeaderBar'

export default {
  components: {
    loginHeaderBar
  },
  data() {
    return {
      nowActive: '', // 第一级的显示
      nowHover: -1,
      navs: [
        { name: '首页', url: '/' },
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
              thirdNav: [
                { name: '智能建模', url: '/businessService/intelligentModeling' }
                // { name: "土建建模", url: "/businessService/intelligentModeling" },
                // { name: "智能清单", url: "/businessService/intelligentModeling" },
              ]
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
        }
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
    }
  },
  mounted() {
    // 当天指数
    if (!this.$store.state.indexNumber) {
      this.$store.dispatch('getIndexNumber', 1)
    }
    if (!this.$store.state.hasNewTag) {
      api.hasNewTag().then(res => this.$store.commit('setNewTag', res.data))
    }
  }
}
</script>

<style lang='less' scoped>
.second-simple-nav {
  background-color: rgba(18, 23, 25, 0.8);
  position: absolute;
  top: 100px;
  margin-left: -110px;
  li {
    height: 40px;
    line-height: 40px;
    padding: 5px 30px;
    margin: 0 10px;
    display: inline-block;
    &:first-child {
      border-right: 1px solid #fff;
    }
    a {
      color: #fff;
    }
  }
}
#header-com {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #f3f3f3;
  transform: translateZ(0);
}

.nav {
  height: 99px;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  position: relative;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    position: relative;
    .logo {
      display: inline-block;
      text-indent: -200000px;
      width: 143px;
      height: 60px;
      background: url(../assets/logo.png) no-repeat center;
      background-size: contain;
    }
    .nav-item {
      flex: 1;
      margin-left: 20px;
      > li {
        float: left;
        margin-left: 50px;
        > a {
          padding-top: 29px;
          padding-bottom: 29px;
          &:hover {
            color: #00cc99;
          }
          .new-icon {
            position: absolute;
            top: 26px;
          }
          > .secondNav {
            cursor: auto;
            width: 100%;
            height: 355px;
            background-color: rgba(18, 23, 25, 0.8);
            position: absolute;
            left: 0;
            right: 0;
            top: 100px;
            z-index: 3;
            > ul {
              width: 1200px;
              margin: 0 auto;
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
.right-pendant {
  height: 59px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      height: 20px;
      background-color: #009769;
      position: absolute;
      top: -20px;
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
.isActive {
  > a:first-child {
    color: #00cc99;
  }
  .img-triangle {
    background: url('../assets/img/up.png') no-repeat;
    background-size: cover;
  }
}

.img-triangle {
  display: inline-block;
  width: 14px; // 太小会缺一块
  height: 7.5px;
  background: url('../assets/img/down.png') no-repeat;
  background-size: cover;
  transition: all 0.4s;
  vertical-align: middle;
}
.nav-item li {
  &:hover {
    .img-triangle {
      transform: rotate(-180deg);
      background: url('../assets/img/down2.png') no-repeat;
      background-size: cover;
    }
  }
}
</style>
