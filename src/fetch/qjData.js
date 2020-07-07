import { get, post } from 'axios'
/**
 * 青矩日活动开抢优惠券
 */
export default {
  // 青矩日活动开抢优惠券
  qjDataGet() {
    return get('qjData/get')
  },
}
