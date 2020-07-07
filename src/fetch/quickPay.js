import { get, post } from 'axios'
/**
 * 轻松付相关：流程审核相关
 */
export default {
  // 根据用户Id查询轻松付账户列表
  getQuickPayLogListByUserId(params) {
    return post('QuickPay/getQuickPayLogListByUserId', params)
  },
  // 是否开通轻松付
  hasQuickPay(params) {
    return post('QuickPay/hasQuickPay', params)
  },
  // 保存个人认证
  personInfo(params) {
    return post('QuickPay/personInfo', params)
  },
  // 保存企业认证
  companyInfo(params) {
    return post('QuickPay/companyInfo', params)
  },
  // 用户轻松付提额申请
  QuickPayAddCredit(params) {
    return post('QuickPay/QuickPayAddCredit', params)
  },
  // 提交还款金额-单笔还款
  submitQuickRepaymentAmount(params) {
    return post('QuickPay/submitQuickRepaymentAmount', params)
  },
  // 提交还款金额-批量还款
  submitRepaymentAmountPayAll(params) {
    return post('QuickPay/submitRepaymentAmountPayAll', params)
  },
  // 收银台还款支付
  repayment(params) {
    return post('QuickPay/repayment', params)
  },
  // 获取还款页面信息
  GetQuickPayInfomationByUserId(userId) {
    return post(`QuickPay/GetQuickPayInfomationByUserId/${userId}`)
  },
  // 轻松付延期申请
  QuickPayDelayCredit(params) {
    return post('QuickPay/QuickPayDelayCredit', params)
  },
  // 该用户是否还过该项目的轻松付账单，已还将不能申诉
  HasRepayQuickPayBill(projectInfoId) {
    return post(`QuickPay/HasRepayQuickPayBill/${projectInfoId}`)
  },
  // 该用户是否还过该项目的轻松付账单，已还将不能申诉
  userQuickPayBillList(params) {
    return post('QuickPay/userQuickPayBillList', params)
  },
  // 轻松付消费明细
  getMyQuickPayLogList(params) {
    return post('QuickPay/getMyQuickPayLogList', params)
  },
  // 提交还款金额-根据轻松付账单Id列表
  submitRepaymentAmountByBillIds(params) {
    return post('QuickPay/submitRepaymentAmountByBillIds', params)
  },
  // 根据轻松付账单Id查询账单信息（包括项目还款情况[列表]）
  getQuickPayBillInfoById(id) {
    return post('QuickPay/getQuickPayBillInfoById/' + id)
  },
}
