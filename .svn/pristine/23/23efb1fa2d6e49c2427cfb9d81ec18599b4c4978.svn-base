import { get, post } from 'axios'
/**
 * 指数
 */
export default {
  // 获取day天的综合指数
  getExponentByDay (day) {
    return get(`exponent/getExponentByDay/${day}`)
  },
  // 获取num个综合指数.从当前时间每隔7天查询一个
  getExponentByNum (num) {
    return get(`exponent/getExponentByNum/${ num }`)
  },
}
