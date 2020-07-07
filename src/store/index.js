import Vue from 'vue'
import Vuex from 'vuex'
import struct from './struct' // 组织架构
import rolesList from './rolesList' // 组织架构
import { get } from "axios";

Vue.use(Vuex)

const state = {
  hasNewTag: false,
  showReleaseWindow: false,
  showAppealAgreement: false,
  addZizhi: true,
  showCertificate: false,
  showWXQRCode: false,
  indexNumber: '',
  userInfo: {},
  noPayListData: {},
  financeData: {},
  headerIcon: '',
  showDeginPage: false // 装饰封面的显隐
}

const getters = {}

const mutations = {
  // 最新活动new标签的显隐
  setNewTag(state, param) {
    state.hasNewTag = param
  },
  // 改变发布项目弹窗的显隐
  changeReleaseWindow(state, param) {
    state.showReleaseWindow = param
  },
  // 改变发布申诉协议弹窗的显隐
  changeAppealAgreement(state, param) {
    state.showAppealAgreement = param
  },
  // 改变微信二维码的显隐
  changeWXQRCode(state, param) {
    state.showWXQRCode = param
  },
  // 改变证书查询弹窗的显隐
  changeCertificate(state, param) {
    state.showCertificate = param
  },
  // 添加发票资质的显隐
  addWindow(state, param) {
    state.addZizhi = param
  },
  // 青矩指数数据
  setIndexNumber(state, param) {
    state.indexNumber = param
  },
  // 用户个人信息
  setUserInfo(state, param) {
    state.userInfo = param
  },
  // 未支付的订单
  setNoPayListData(state, param) {
    state.noPayListData = param
  },
  // 账户金额相关
  setFinanceData(state, param) {
    state.financeData = param
  },
  // 封面
  setHeaderIcon(state, param) {
    state.headerIcon = param
  },
  // 跳转装饰封面
  changeHeaderIcon(state, param) {
    state.showDeginPage = param
  }
}

const actions = {
  getIndexNumber({ commit }, day) {
    get("exponent/getExponentByDay/" + day)
      .then(res => {
        let indexNumber = res.data.complexExponents[res.data.complexExponents.length - 1].complexExponentFormat
        commit("setIndexNumber", indexNumber);
      })
      .catch(err => {
        commit("setIndexNumber", '');
      });
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    struct,
    rolesList
  },
})
