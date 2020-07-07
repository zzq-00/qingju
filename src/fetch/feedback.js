
import { get, post } from 'axios'
/**
 * 意见反馈
 */
export default {
  // 反馈问题类型
  getAuthTypeMap() {
    return get(`feedback/getAuthTypeMap`)
  },
  // 意见反馈提交
  addFeedback(params) {
    return post('feedback/addFeedback', params)
  },
  // 意见反馈列表
  getFeedbackList() {
    return get('feedback/getMyFeedbackList')
  },
  // 英文版咨询
  addBusinessConsulting(params) {
    return post('feedback/addBusinessConsulting', params)
  }
}
