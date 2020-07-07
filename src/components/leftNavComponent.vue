<template>
  <div class="nav-container">
    <ul class="menu-nav-ul">
      <li class="menu-nav-li"
        v-for="(item, index) in items"
        v-if="item && ((item.roles === 'true') || ((item.url === '/myqingju/bonus' && $store.state.userInfo.isFriend)) ||  (item.roles && ROLES.includes(item.roles)))"
        :key="item.name+index"
        :class="['menu-nav-li-'+item.id, {'active-prop': item.url === activeIndex && Number(item.id) !== 1},]"
        @click.stop="handleToggle($event, item,index)">
          <span class="name">{{item.name}}</span>
          <span :class="[righticon, {'shrink-icon': item.visible}]"  v-if="item.children"></span>
          <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-on:before-leave="beforeLeave"
            v-on:leave="leave">
              <nav-list v-if="item.children"
              v-show="!item.visible"
              :propData="item.children" :activeclass="activeclass" ></nav-list>
          </transition>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'navList',
  props: ['propData', 'activeclass', 'righticon'], // hasStyleHeight 记录是否用高度
  data () {
    return {
      activeIndex: '',
      items: [],
      ROLES: JSON.parse(localStorage.getItem('ROLES-qingju'))
    }
  },
  computed: {
    templateActive: function () {
      return this.activeclass
    }
  },
  watch: {
    '$route' (to, from) {
      let res = this.dataForEach(this.items, to.path)
      if (res) {
        this.activeIndex = to.path
        sessionStorage.setItem('navURL',this.$route.path)
      } else {
        this.activeIndex = sessionStorage.navURL
      }
    },
    // 监听父组件变动数据
    'propData': function (newVal) {
      this.items = newVal
    }
  },
  mounted () {
    if (this.propData.length) {
      this.items = this.propData
      // 确定导航
      let res =this.dataForEach(this.items, this.$route.path)
      if (res) {
        this.activeIndex = this.$route.fullPath
        sessionStorage.setItem('navURL',this.$route.fullPath)
      } else {
        this.activeIndex = sessionStorage.navURL
      }
      // 我的青矩判断权限后的进入
      if (!this.activeIndex) {
        this.items = this.items.filter(data => {
          if ((this.ROLES.includes(data.roles)  || data.roles === 'true') && Number(data.id) !== 1) {
            return data
          }
        })
        if (this.items[0]) {
          this.activeIndex = this.items[0].url
          sessionStorage.setItem('navURL',this.activeIndex)
        }
      }
      if (this.activeIndex) {
        this.$router.push(this.activeIndex)
      }
    }
  },
  methods: {
    // 找出是否菜单栏中与当前路径相同
    dataForEach (data, URL) {
      let resURL = ''
      data.forEach(item => {
        if (item.children && item.children.length) {
          item.children.forEach(itemChild => {
            if (itemChild.url === URL) {
              resURL = itemChild.url
            }
          })
        } else {
          if (item.url === URL) {
            resURL = item.url
          }
        }
      })
      return resURL
    },
    handleToggle (event, prop,index) {
      if (prop.hasOwnProperty('visible')) {
        prop.visible = !prop.visible
        this.$emit('putDataChange', index, prop)
      } else {
        this.$router.push(prop.url)
        sessionStorage.setItem('navURL', prop.url)
      }
    },
    beforeEnter (el) {
      el.style.height = '0';
    },
    enter (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      } else {
        el.style.height = '';
      }
      el.style.overflow = 'hidden';
    },
    afterEnter (el) {
      el.style.height = ''
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden';
    },
    leave (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-container{
  width: 210px;
  background-color: #fff;
  overflow: hidden;
  transition: all .5s;
}
.menu-nav-li{
  color: #666;
  position: relative;
  cursor: pointer;
}
.name{
  display: inline-block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
}
// @keyframes moveBlock {
//   0%{}
// }
.open-icon{
  cursor: pointer;
  background: url('../assets/img/arrow.png') no-repeat center;
  position: absolute;
  right: 20px;
  top: 12px;
  width: 17px;
  height: 14px;
  transition:transform .5s ease-in-out,-webkit-transform .3s ease-in-out;
}
// 函数
.menu-nav-li-1 > .name{
    border-bottom: 1px solid #f2f2f2;
    padding-left: 40px;
  }
.menu-nav-li-2{
  &:last-child{
    border-bottom: 1px solid #f2f2f2;
  }
  .name{
    padding-left: 60px;
  }
}
.menu-nav-li-3{
  &:last-child{
    border-bottom: 1px solid #f2f2f2;
  }
  .name{
    padding-left: 80px;
  }
}
.menu-nav{
  .active-prop{
    color: #00B38A;
    background-color: #F2F2F2;
  }
  .shrink-icon{
    transform: rotate(-180deg);
  }
}
</style>
