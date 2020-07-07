import Vue from 'vue'
import Router from 'vue-router'
import { setCookie } from '@/assets/js/utils'
import index from '@/pages/index'  // 首页

import businessService from './businessService';
import myqingju from './myqingju2.0';
import collaborationService from './collaborationService';
import newsCenter from './newsCenter';
import college from './college';
import info from './info';
import ActivePoster from './ActivePoster';
import benefits from './benefits'  // 福利专区
import problems from './problems'  // 常见问题 问题反馈
import setting from './setting'  // 常见问题 问题反馈
import forget from './forget'  // 忘记密码

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/en/poster',
    component: () => import('@/pages/en/poster')
  },
  {
    path: '/login',
    component: () => import('@/pages/login')
  },
  {
    path: '/register/person',
    component: () => import('@/pages/register/personRegister')         //个人注册
  },
  {
    path: '/register/company',
    component: () => import('@/pages/register/companyRegister')         //公司注册
  },
  {
    path: '/contractPreview/:method/:projectBaseId/:invoiceVerificationId',
    component: () => import('@/components/contractPreview')
  },
  ...forget,
  ...collaborationService,
  ...newsCenter,
  ...college,
  ...info,
  ...benefits,
  ...problems,
  ...ActivePoster,
  ...businessService,
  ...setting,
  {
    path: '*',
    component: () => import('@/pages/login'),
  },
]

export const asyncRouterMap = [
  ...myqingju
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap,
  scrollBehavior(to, from, savedPosition) {
    setCookie('oldPath', from.fullPath)
    if (to.hash) return { selector: to.hash }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
