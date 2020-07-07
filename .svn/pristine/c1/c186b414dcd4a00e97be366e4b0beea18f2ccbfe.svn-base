import router from './router'
// import { asyncRouterMap, constantRouterMap } from '@/router'
import { asyncRouterMap } from '@/router'
// 变量 防止死循环
let bool = true
let loginBool = true
router.beforeEach((to, from, next) => {
  let firmCurrentUserInfo = localStorage.firmCurrentUserInfo && JSON.parse(localStorage.firmCurrentUserInfo)
  // console.log(firmCurrentUserInfo, 'firmCurrentUserInfo')
  if ( bool && firmCurrentUserInfo ) {
    bool = false // ?
    let accessedRouters = []
    let map = deepCopy(asyncRouterMap)
    let firstroles = firmCurrentUserInfo.baseFirstFunctionList.map(item => item.functionEnum)
    let secondroles = firmCurrentUserInfo.baseSecondFunctionList.map(item => item.functionEnum)
    let thirdroles = firmCurrentUserInfo.baseFunctionList.map(item => item.functionEnum)
    let ROLES = []
    ROLES = ROLES.concat(firstroles, secondroles, thirdroles)
    localStorage.setItem('ROLES-qingju', JSON.stringify(ROLES))
    // console.log(ROLES, 'ROLES')
    accessedRouters = filterAsyncRouter(map, ROLES)
    // 动态添加路由
    // let allRouters = constantRouterMap.concat(accessedRouters)
    // console.log(allRouters, 'allRouters')
    router.addRoutes(accessedRouters)
    next({ ...to }) // ?
  } else {
    // 未登录的情况 -- 都会跳转 导致不需要登录的页面不能够展示
    // if (!firmCurrentUserInfo && loginBool ) {
    //   loginBool = false
    //   next({
    //     path: '/login'
    //   })
    // }
  }
  next()
})


function deepCopy(obj) {
  if (typeof obj === 'object' && obj !== null) {
    let objKeys = Object.keys(obj)
    let result
    if (Array.isArray(obj)) {
      result = []
    } else {
      if (obj.constructor === Object) {
        result = {}
      } else {
        return obj
      }
    }
    objKeys.forEach((item) => {
      if (typeof obj[item] === 'object' && obj[item] !== null) {
        switch (obj[item].constructor) {
          case Array:
            result[item] = deepCopy(obj[item])
            break
          case Object:
            result[item] = deepCopy(obj[item])
            break
          case Date:
            result[item] = new Date(obj[item])
            break
          case RegExp:
            let attributes = ''
            attributes += obj[item].global ? 'g' : ''
            attributes += obj[item].ignoreCase ? 'g' : ''
            attributes += obj[item].multiline ? 'g' : ''
            result[item] = new RegExp(obj[item].source, attributes)
            break
          default:
            result[item] = obj[item]
            break
        }
      } else {
        result[item] = obj[item]
      }
    })
    return result
  } else {
    return obj
  }
}
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // console.log(route.meta.roles, ' route.meta.roles')
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(map, roles) {
  const accessedRouters = map.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      // 子导航的子导航
      if (route.meta && route.meta.children && route.meta.children.length) {
        route.meta.children = filterAsyncRouter(route.meta.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
