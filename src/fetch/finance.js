import { get, post } from 'axios'
/**
 * 账户余额相关：流程金额相关
 */
export default {
  // 当前用户账户信息
  GetDeskIdByProejectId(params) {
    return post('finance/GetDeskIdByProejectId/' + params)
  },
  // 当前用户账户信息
  Information(params) {
    return post('finance/Information', params)
  },
  // 托管项目金额
  TrusteeshipAmount(params) {
    return post('finance/TrusteeshipAmount', params)
  },
  // 托管附加金额
  TrusteeshipAmountAdditional(params) {
    return post('finance/TrusteeshipAmountAdditional', params)
  },
  // 确认验收项目
  confirmAmount(params) {
    return post('finance/confirmAmount', params)
  },
  // 获取当前用户账户信息
  FinanceInformation(params) {
    return post(`finance/FinanceInformation/${params}`)
  },
  // 获取当前用户充值列表
  getFinanceRecharge(params) {
    return post('finance/getFinanceRecharge', params)
  },
  // 账户充值
  recharge(params) {
    return post('finance/recharge', params)
  },
  // 提交提现数据
  saveCash(params) {
    return post('finance/saveCash', params)
  },
  // 获取开户行
  getBankList(params) {
    return post('finance/getBankList', params)
  },
  // 获取银行类型列表
  getBankTypeList(params) {
    return post('finance/getBankTypeList', params)
  },
  // 获取全部银行列表
  getBankList(params) {
    return post('finance/getBankList', params)
  },
  // 保存银行卡数据
  saveBankCarData(params) {
    return post('finance/saveBankCarData', params)
  },
  // 获取用户银行卡列表
  getUserBankCarList(params) {
    return post('finance/getUserBankCarList', params)
  },
  // 设置银行卡状态
  updateBankCarDefultStatus(params) {
    return post('finance/updateBankCarDefultStatus', params)
  },
  // 前台获取自己的提现数据
  getCashListByUserId(params) {
    return post('finance/getCashListByUserId', params)
  },
  // 我的账单（明细）  总账单
  getMyFinanceLog(params) {
    return post('finance/getMyFinanceLog', params)
  },
  // 提现详情
  withdrawAuditInfo(id) {
    return post('finance/withdrawAuditInfo/' + id)
  },
  // 根据用户Id账户查询明细列表 -- myqingju2.0
  getFinanceLogByUserId(params) {
    return post('finance/getFinanceLogByUserId', params)
  },
}
