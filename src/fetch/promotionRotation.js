import { get, post } from 'axios'
/**
 * 活动轮播图
 */
export default {
  // 获取推广活动轮播图
  proGetAllImg() {
    return get('/promotionRotation/getAllImg')
  },
}
