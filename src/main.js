// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
if (process.env.NODE_ENV === 'production') {
  // 百度统计
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?44f3ea18ad44e0bb13cbfbdeaced2043";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import api from './fetch/api'
import api from './fetch/api'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/theme/index.css'
import ElementUI from 'element-ui'
import '@/assets/css/base.css'
import '@/assets/css/myqingjucommon.css'
import '@/assets/css/font-family.css'

import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换

import './permission.js'
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false

Vue.use(vueEventCalendar, {
  locale: 'en'
}) //可以设置语言，支持中文和英文
Vue.use(ElementUI)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key
  ak: 'fKU9vX6h1mmAiuiopj7aLSx14VK4ZELq'
})
/* 单点登录 */
router.beforeEach((to, from, next) => {
  // console.log(to, 'to')
  /*
    学习平台和青矩其中一个登录，通过接口 登录对应的平台，并返回信息
    这里 学习平台都没登录，就正常显示
  */
  // 每个页面都调用，存在QingjuDoubleExist后不调用
  /* !window.localStorage.QingjuDoubleExist &&  之前判断条件 */
  /*     */
  if (!window.localStorage.QingjuuserId && process.env.NODE_ENV !== 'testing' && process.env.NODE_ENV !== 'development') {
    // 判断学习平台有不有登录
    let hasRedirect = localStorage.getItem('hasRedirect')
    if (hasRedirect && JSON.parse(hasRedirect) === true) {
      let token = to.query.token
      // 根据重定向返回的token请求数据
      api.callBackLocal({ 'token': token }).then(res => {
        // 返回用户信息
        // 按照publishPeopleLogin返回值判断
        if (res.dataList && res.dataList.length) {
          // 返回用户信息
          // 存储
          api.getUserInfo().then(resUser => { // 目的： 防止上个接口没有公司id
            if (!resUser.dataList[0].userName) resUser.dataList[0].userName = resUser.dataList[0].code || '青矩用户'
            // this.$store.commit('setUserInfo', resUser.dataList[0])
            store.commit('setUserInfo', resUser.dataList[0])
            window.localStorage.firmId = JSON.stringify(resUser.dataList[0].firmId) || JSON.stringify(resUser.dataList[0].id)
          })
          window.localStorage.QingjuuserId = JSON.stringify(res.dataList[0].id)
          window.localStorage.QingjuAccount = JSON.stringify(res.dataList[0].userName || '青矩用户')
          window.localStorage.QingjuTelePhone = res.dataList[0].telephone ? JSON.stringify(res.dataList[0].telephone) : ''
          window.localStorage.isTzecc = res.dataList[0].isTzecc ? JSON.stringify(res.dataList[0].isTzecc) : ''
          localStorage.firmCurrentUserInfo = JSON.stringify(res.dataList[0].firmCurrentUserInfo) // 权限
          // setCookie('QingjuLoginAddress', res.dataList[0].address ? JSON.stringify(res.dataList[0].address) : '')
          // setCookie('QingjuLoginTime', res.dataList[0].lastLoginTime ? JSON.stringify(res.dataList[0].lastLoginTime) : '')
          // 无刷新加载 -- 合为一个函数 有bug
          window.localStorage.removeItem("hasRedirect")
          let index = location.href.indexOf('token')
          if (index > -1) {
            let url = location.href.slice(0, index - 1)
            history.replaceState({ title: url }, '', url);
            // pathURL = url
          }
          // 不能是登录页,注册页
          if (to.path === '/login' || to.path.includes('register')) {
            router.replace('/')
          }
        } else {
          // 无刷新加载 -- 合为一个函数 有bug
          window.localStorage.removeItem("hasRedirect")
          let index = location.href.indexOf('token')
          if (index > -1) {
            let url = location.href.slice(0, index - 1)
            history.replaceState({ title: url }, '', url);
          }
        }
      }).catch(err => {
        // 无刷新加载 -- 合为一个函数 有bug
        window.localStorage.removeItem("hasRedirect")
        let index = location.href.indexOf('token')
        if (index > -1) {
          let url = location.href.slice(0, index - 1)
          history.replaceState({ title: url }, '', url);
        }
      })
    } else if (to.path.includes('register')) {
      // 注册是参数有问题，添加一个判断条件解决
      next()
    } else {
      // 重定向 --- 青矩online到后台重定向
      let origin = window.location.origin || window.location.protocol + "//" + window.location.host
      // 截取
      let path = origin + to.fullPath
      let index = path.indexOf('token')
      if (index > -1) {
        path = path.slice(0, index - 1)
      }
      localStorage.setItem('hasRedirect', JSON.stringify(true))
      window.location.href = 'http://user.online.qingju.cn/sso/isLogin?url=' + path
    }
  } else {
    // 不能是登录页,注册页
    if (window.localStorage.QingjuuserId && (to.path === '/login' || to.path.includes('register'))) {
      router.replace('/')
    }
  }
  next()
})
// 金额格式化过滤器
Vue.filter('formatMoney', function addCommas(num = 0) {
  if (num == null) return '0.00'
  let isNegative // 判断是否为负数
  if (num < 0) {
    isNegative = true
    num = -num
  }
  let string = num + '',
    re = /\d{3}$/,
    result = '' // 将数字转换成字符串形式
  let arr = string.split('.')
  let num1 = arr[0]
  let num2 = arr[1] ? '.' + arr[1] : '.00' // 若有小数则添加逗号，若没有则设置为成两位小数；
  while (re.test(num1)) {
    result = RegExp.lastMatch + result
    if (num1 !== RegExp.lastMatch) {
      result = ',' + result
      num1 = RegExp.leftContext
    } else {
      num1 = ''
      break
    }
  }
  if (num1) {
    result = num1 + result
  }
  return isNegative ? '-' + (result + num2) : result + num2
})
/* 颗粒权限 */
Vue.directive('has', {
  inserted(el, binding) {
    let list = localStorage.firmCurrentUserInfo && JSON.parse(localStorage.firmCurrentUserInfo).baseFunctionList
    if (list) {
      let hasPermission = list.some((role, index) => {
        if (role) {
          return binding.value.includes(role.functionEnum)
        }
      })
      if (!hasPermission) { // 为什么父元素为null
        el.parentNode && el.parentNode.removeChild(el)
        el.style.display = 'none'
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})

/*
  学习平台和青矩其中一个登录，通过接口 登录对应的平台，并返回信息
  这里 学习平台都没登录，就正常显示  --- 异步登录方案
*/
// 每个页面都调用，存在QingjuDoubleExist后不调用
// if (!window.localStorage.QingjuDoubleExist && !window.localStorage.QingjuuserId) {
//   // 判断学习平台有不有登录
//   api.isLogin('http://user.online.qingju.cn/sso/isLogin', 'ssoUserIsLogin', (result) => {
//     // 返回token
//     api.callBackLocal({ 'token': result.token }).then(res => {
//       // 返回用户信息
//       // 按照publishPeopleLogin返回值判断
//       if (res.dataList[0]) {
//         // 返回用户信息
//         // 存储
//         api.getUserInfo().then(res => { // 目的： 防止上个接口没有公司id
//           window.localStorage.firmId = JSON.stringify(res.dataList[0].firmId) || JSON.stringify(res.dataList[0].id)
//         })
//         window.localStorage.QingjuuserId = JSON.stringify(res.dataList[0].id)
//         window.localStorage.QingjuAccount = JSON.stringify(res.dataList[0].userName || '青矩用户')
//         window.localStorage.QingjuTelePhone = res.dataList[0].telephone ? JSON.stringify(res.dataList[0].telephone) : ''
//         window.localStorage.isTzecc = res.dataList[0].isTzecc ? JSON.stringify(res.dataList[0].isTzecc) : ''
//         window.localStorage.QingjuDoubleExist = JSON.stringify(true)// 两个平台都登录
//         setCookie('QingjuLoginAddress', res.dataList[0].address ? JSON.stringify(res.dataList[0].address) : '')
//         setCookie('QingjuLoginTime', res.dataList[0].lastLoginTime ? JSON.stringify(res.dataList[0].lastLoginTime) : '')
//         // 考虑企业下用户
//         res.dataList[0].id = res.dataList[0].id
//         store.commit('setUserInfo', res.dataList[0])
//         window.location.reload();
//       } else {
//         // 回到登录
//         // 这里可能没用
//         router.push('/login')
//       }
//     }).catch(err => {
//       // this.$message.error(err.errorMsg)
//     })
//   })
// }
