import { get, post } from 'axios'
/**
 * 项目申诉
 */
export default {
  // 计算申诉押金金额
  appealDeposit(params) {
    return post('appeal/appealDeposit', params)
  },
  // 添加申诉订单
  addBillAndOrderForm(params) {
    return post('appeal/addBillAndOrderForm', params)
  },
  // 撤销申诉
  appealCancel(appealId) {
    return get('appeal/cancel/' + appealId)
  },
}
