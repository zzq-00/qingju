<template>
  <div class="my-qingju-container">
    <headerComponent></headerComponent>
    <top-info-component></top-info-component>
    <transition name="fade">
      <main class="my-qingju-main qingju-index" v-if="!$store.state.showDeginPage">
        <Nav class="menu-nav">
          <navComponent ref="navComponent"
          :propData="navData" @putDataChange='putDataChange'
          :activeclass="activeclass" righticon="open-icon"></navComponent>
          <!-- <p class="shrink-nav" :class="{'open-nav' : !toggleAll}" @click="handleShrink">{{toggleAll? '全部展开':'收起样式'}}</p> -->
        </Nav>
        <div class="view-container">
            <router-view></router-view>
        </div>
      </main>
      <design-page v-else></design-page>
    </transition>
  </div>
</template>
<script>
import navComponent from '@/components/leftNavComponent'
import headerComponent from '@/components/qingjuHeader'
import topInfoComponent from '@/components/qingjuTopInfo'
import designPage from './designpage'
import { hasClass, addClass, removeClass } from '@/assets/js/classname'

export default {
  components: { navComponent, headerComponent, topInfoComponent, designPage },
  data() {
    return {
      activeclass: 'left-active-prop',
      toggleAll: false,
      showDeginPage: false,
      navData: [
        // {
        //   name: '个人中心',
        //   url: '/myqingju/center',
        //   id: '1'
        // },
        {
          name: '项目管理',
          url: '/myqingju/projectManage',
          id: '1',
          roles: 'Vuv1',
          children: [
            {
              name: '所有项目',
              url: '/myqingju/project',
              id: '2',
              roles: 'eDJl'
            },
            {
              name: '合同管理',
              url: '/myqingju/contract',
              id: '2',
              roles: 'JYr0'
            }
          ]
        },
        {
          name: '财务管理',
          url: '/myqingju/finance',
          id: '1',
          roles: 'qx53',
          children: [
            {
              name: '财务中心',
              url: '/myqingju/financeCenter',
              id: '2',
              roles: 'SnMa'
            },
            {
              name: '充值',
              url: '/myqingju/recharge',
              id: '2',
              roles: 'soFa'
            },
            {
              name: '提现',
              url: '/myqingju/withdraw',
              id: '2',
              roles: 'Ps3Y'
            },
            {
              name: '财务记录',
              url: '/myqingju/financialRecord',
              id: '2',
              roles: 'lYvV'
            },
            {
              name: '发票管理',
              url: '/myqingju/billManage',
              id: '2',
              roles: 'RP7V'
            },
            {
              name: '优惠券',
              url: '/myqingju/coupon',
              id: '2',
              roles: 'RP7K'
            },
            {
              name: '奖励金',
              url: '/myqingju/bonus',
              id: '2',
              roles: ''
            }
          ]
        },
        {
          name: '轻松付管理',
          url: '/myqingju/quickPay',
          id: '1',
          roles: '0CT2',
          children: [
            {
              name: '我的账单',
              url: '/myqingju/quickPayBill',
              id: '2',
              roles: 'zcKZ'
            },
            {
              name: '消费明细',
              url: '/myqingju/quickPayConsumerDetails',
              id: '2',
              roles: '5l1d'
            }
          ]
        },
        {
          name: '会员管理',
          url: '/myqingju/memberVIP',
          id: '1',
          roles: 'Vz88',
          children: [
            // {
            //   name: '青矩会员',
            //   url: '/myqingju/memberVIP',
            //   id: '2',
            //   roles: 'CLKO'
            // },
            {
              name: '青豆管理',
              url: '/myqingju/beanManage',
              id: '2',
              roles: '8MG7'
            }
          ]
        },
        {
          name: '账号管理',
          url: '/myqingju/account',
          id: '1',
          roles: 'Vz65',
          children: [
            {
              name: '用户管理',
              url: '/myqingju/userInfo',
              id: '2',
              roles: 'GFix'
            },
            {
              name: '用户权限',
              url: '/myqingju/rolesList',
              id: '2',
              roles: 'VpTK'
            },
            {
              name: '组织架构',
              url: '/myqingju/frameManage',
              id: '2',
              roles: '3eFV'
            }
          ]
        }
      ]
    }
  },
  watch: {
    navData: function(val) {
      console.log(val, 'sss')
      this.toggleAll = val.every(item => {
        if (item.hasOwnProperty('visible')) {
          return item.visible
        } else {
          return true
        }
      })
    }
  },
  methods: {
    // 全部隐藏
    handleShrink() {
      this.toggleAll = !this.toggleAll
      this.dataForEach(this.navData, this.toggleAll)
    },
    dataForEach(data, boolean) {
      data.forEach((item, index) => {
        if (Array.isArray(item.children)) {
          item.visible = boolean
          // 只有两层， 为了全部隐藏或展开
          this.putDataChange(index, item)
          this.dataForEach(item.children, boolean)
        }
      })
    },
    // 子组件点击展开/隐藏
    putDataChange(index, val) {
      this.$set(this.navData, index, val)
      localStorage.setItem('navData', JSON.stringify(this.navData))
    }
  },
  mounted() {
    // if (localStorage.getItem('navData')) {
    //   this.navData = JSON.parse(localStorage.getItem('navData'))
    // } else {
      this.dataForEach(this.navData, false)
    // }
    localStorage.setItem('navData', JSON.stringify(this.navData))
  }
}
</script>
<style lang="less" scoped>
.my-qingju-container {
  font-size: 14px;
  background-color: #F8F9FA; // #F8F9FA 为了和body - 之前内容重合
}
.menu-nav {
  // width: 210px;
  margin-right: 40px;
  font-size: 14px;
  margin-bottom: 50px;
}
.view-container {
  flex: auto;
  // flex-basis: auto;
  background-color: #fff;
  overflow: hidden;
}
.shrink-style {
  &:before {
    border: 1px solid;
  }
  &:after {
    border-top: 5px solid;
    transform: rotate(180deg);
  }
}
.shrink-nav {
  width: 210px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
  cursor: pointer;
  margin-top: 10px;
  background-color: #fff;
  // animation: all 3s;
  &::before {
    content: '';
    position: absolute;
    right: 20px;
    top: 12px;
    width: 13px;
    height: 12px;
    border-right: 2px solid #a5a5a5;
    border-left: 2px solid #a5a5a5;
    border-top: 1px solid #a5a5a5;
    border-bottom: 1px solid #a5a5a5;
    transition: transform 0.5s ease-in-out, -webkit-transform 0.3s ease-in-out;
  }
  &::after {
    content: '';
    position: absolute;
    right: 24px;
    top: 17px;
    width: 0;
    height: 0;
    border-top: 4px solid #a5a5a5;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    transition: transform 0.5s ease-in-out, -webkit-transform 0.3s ease-in-out;
  }
  &:hover {
    color: #00b38a;
    &:before {
      border-color: #00b38a;
    }
    &:after {
      border-top-color: #00b38a;
      // transform: rotate(180deg);
    }
  }
}
.open-nav {
  &:before {
    transform: rotate(180deg);
  }
  &:after {
    transform: rotate(180deg);
  }
  &:hover {
    color: #00b38a;
    &:before {
      border-color: #00b38a;
    }
    &:after {
      border-top-color: #00b38a;
      // transform: rotate(180deg);
    }
  }
}
.qingju-index {
  margin-top: 40px;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(100px);
}
</style>

