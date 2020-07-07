import { get, post } from 'axios'
/**
 * 账户余额相关：财务管理
 */
export default {
  // 提交转账数据
  translationMoney (params) {
    return post('FinanceManager/translationMoney', params)
  },
  // 转账历史列表(前台)
  getFinanceTranslationListByUserId (params) {
    return post('FinanceManager/getFinanceTranslationListByUserId', params)
  },
  // 根据用户Id账户查询明细列表
  getFinanceLogListByUserId (params) {
    return post('FinanceManager/getFinanceLogListByUserId', params)
  },
  // 业务选项
  getFinanceBussinessSelect(params) {
    return post('FinanceManager/getFinanceBussinessSelect', params)
  },
  // 轻松付业务选项
  getQuickPayBussinessSelect(params) {
    return post('FinanceManager/getQuickPayBussinessSelect', params)
  },
  // 账户明细日志状态选项
  getFinanceStatusSelect(params) {
    return post('FinanceManager/getFinanceStatusSelect', params)
  },
  // 金额数据处理方式下拉列表
  getFinanceMethodSelect(params) {
    return post('FinanceManager/getFinanceMethodSelect', params)
  }
}
