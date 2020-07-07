import { get, post } from 'axios'
/**
 * 服务商合作
 */
export default {
  // 发送短信验证码
  sendVerifyCode(params) {
    return post('facilitator/sendVerifyCode', params)
  },
  // 校验短信验证码
  validatePhoneVerifyCode(params) {
    return post('facilitator/validatePhoneVerifyCode', params)
  },
  // 获取图形验证码
  getVerifyCode() {
    return get(`facilitator/getVerifyCode`)
  },
  // 校验图形验证码
  validateVerifyCode(parentCode) {
    return get(`facilitator/validateVerifyCode/${parentCode}`)
  },
  // 获取省份
  province() {
    return get(`facilitator/province`)
  },
  // 获取城市列表
  getcity(parentCode) {
    return get(`facilitator/city/${parentCode}`)
  },
  // 获取行业
  getProfessionType() {
    return get(`facilitator/getProfessionType`)
  },
  // 完善服务信息
  addFacilitator(params) {
    return post('facilitator/addFacilitator', params)
  },
}
