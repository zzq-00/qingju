import { get, post } from 'axios'
/**
 * 经典案例
 */
export default {
  // (条件)查询所有经典案例
  getAllClassicCase(params) {
    return post('classicCase/getAllClassicCase', params)
  },
  // 经典案例详情
  getClassicCaseDetail(classicCaseId) {
    return get(`classicCase/getClassicCaseDetail/${classicCaseId}`)
  }
}
