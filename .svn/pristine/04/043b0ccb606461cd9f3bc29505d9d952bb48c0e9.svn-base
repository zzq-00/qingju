import { get, post } from 'axios'
/**
 * 轻松付相关：轻松付管理
 */
export default {
  // 已出账单
  getHaveTheBillList(userId) {
    return get(`quickPayManage/getHaveTheBillList/${userId}`)
  },
  // 还款流水
  getReimbursementList(params) {
    return post('quickPayManage/getReimbursementList', params)
  },
  // 消费明细
  getConsumeList(params) {
    return post('quickPayManage/getConsumeList', params)
  }
}
