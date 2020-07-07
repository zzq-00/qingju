import { get, post } from 'axios'
/**
 * 推广活动
 */
export default {
  // (条件)查询所有推广活动
  getAllPromotion(params) {
    return post('promotion/getAllPromotion', params)
  },
  // 获取推广活动详情
  getPromotionDetail(promotionId) {
    return get(`promotion/getPromotionDetail/${promotionId}`)
  },
  hasNewTag() {
    return get('promotion/hasNewTag')
  },
}
