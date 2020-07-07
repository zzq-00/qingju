<template>
  <div>
    <ul class="float-icon">
      <li v-show="$route.path==='/businessService/estimate'" @mouseenter="activeAsk=true" @mouseleave="activeAsk=false" 
        :style="{backgroundImage: 'url(' + [this.activeAsk ? require('@/assets/img/h-yjxj.png') : require('@/assets/img/f-yijianxunjia.png')] + ')'}" >
        <span @click="jumpRouter('/businessService/inquiryPrice')">一键询价</span>
      </li>
      <li class="imgChange" v-for="(item,index) in floatContent" :key="index" @mouseenter="item.active=true" @mouseleave="item.active=false" 
        :style="{backgroundImage:' url('+ [item.active ? item.imgh : item.img] +')'}">
        <span @click='jumpRouter(item.url)'>{{item.text}}</span>
      </li>
      <!-- 需优化 -->
      <li v-show="showData" @mouseenter="activeTop=true" @mouseleave="activeTop=false" 
        :style="{backgroundImage: 'url(' + [this.activeTop ? require('@/assets/img/h-fhdb.png') : require('@/assets/img/gotop.png')] + ')'}" 
        @click="goTop">
        <span>返回顶部</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTop: false,
      activeAsk: false,
      floatContent: [
        {
          text: '问题反馈',
          active: false,
          img: require('@/assets/img/f-wentifankui.png'),
          imgh: require('@/assets/img/h-wtfk.png'),
          url: '/problems/feedback'
        },
        {
          text: '常见问题',
          active: false,
          img: require('@/assets/img/f-changjianwenti.png'),
          imgh: require('@/assets/img/h-cjwt.png'),
          url: '/problems/common'
        },
        {
          text: '在线咨询',
          active: false,
          img: require('@/assets/img/f-zaixianzixun.png'),
          imgh: require('@/assets/img/h-zxzx.png'),
          url: ''
        }
      ],
      showData: false
    }
  },
  methods: {
    jumpRouter(href) {
      if (href === '') {
        var y = window.screen.availHeight - 700
        var x = window.screen.availWidth - 760
        let mywindow = window.open(
          'http://p.qiao.baidu.com/cps/chat?siteId=11872623&userId=25427863',
          '在线客服',
          'height=700, width=760, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no'
        )
        mywindow.moveTo(x / 2, y / 2)
      } else {
        this.$router.push(href)
      }
    },
    goTop() {
      if (typeof window.getComputedStyle(document.body).scrollBehavior === 'undefined') {
        // 传统的JS平滑滚动处理代码...
        let scrollToptimer = setInterval(function() {
          var top = document.body.scrollTop || document.documentElement.scrollTop
          var speed = top / 4
          if (document.body.scrollTop != 0) {
            document.body.scrollTop -= speed
          } else {
            document.documentElement.scrollTop -= speed
          }
          if (top == 0) {
            clearInterval(scrollToptimer)
          }
        }, 30)
      } else {
        window.scrollTo(0, 0)
      }
    },
    scrollRight() {
      // 检测鼠标的位置 -- 有点占性能
      let top = document.documentElement.scrollTop || document.body.scrollTop
      if (top > 500) {
        // sessionStorage.setItem('scrollRightShow',true)
        this.showData = true
      } else {
        // sessionStorage.setItem('scrollRightShow',false)
        this.showData = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollRight)
  }
}
</script>

<style lang='less' scoped>
.float-icon {
  position: fixed;
  top: 45%;
  right: 0;
  z-index: 999;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  > li {
    cursor: pointer;
    position: relative;
    width: 50px;
    height: 80px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position-x: 50%;
    background-position-y: 10px;
    background-size: 20px 20px;
    &:not(:last-child) {
      border-bottom: 1px solid #e4e4e4;
    }
    &:hover {
      > span {
        color: #009671;
      }
    }
    > span {
      position: absolute;
      display: block;
      width: 100%;
      color: #656565;
      font-size: 13px;
      top: 35px;
      box-sizing: border-box;
      padding: 0 12px;
    }
  }
}
</style>
