import { get, post } from 'axios'
/**
 * 奖励金业务
 */
export default {
  // 当前用户的奖励金
  getCurrentUserRewardInfo() {
    return post('reward/getCurrentUserRewardInfo')
  },
  // 奖励金日志业务枚举集合
  getUserRewardAccountLogBussinessList() {
    return post('reward/getUserRewardAccountLogBussinessList')
  },
  // 奖励金日志金额处理方式枚举集合
  getRewardAccountLogMethodsList() {
    return post('reward/getRewardAccountLogMethodsList')
  },
  // 奖励金明细列表（当前用户）
  getRewardAccountLogListForSelf(params) {
    return post('reward/getRewardAccountLogListForSelf', params)
  },
  // 用户提交
  rewardBalanceApplySubmit(params) {
    return post('reward/rewardBalanceApplySubmit', params)
  },
  // 结算编号
  addBalanceNumber() {
    return post('reward/addBalanceNumber')
  },
  // 管理员与当前用户获取体现审核信息
  getRewardBalanceAuditInfo(id) {
    return get(`reward/getRewardBalanceAuditInfo/${id}`)
  },
  // 获取配置的代扣税点百分比
  getWithHoldTaxPercentInfo() {
    return post(`reward/getWithHoldTaxPercentInfo`)
  },
  // 判断是否可以访问结算奖励金的相关接口（每个月25号以后）
  canVisitRewardBalance() {
    return post('reward/canVisitRewardBalance')
  },
}
