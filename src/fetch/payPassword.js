import { get, post } from 'axios'
/**
 * 账户密码相关
 */
export default {
  // 验证密码是否存在
  hasPassword() {
    return post('PayPassword/hasPassword')
  },
  // 用户设置密码
  savePayPassword(params) {
    return post('PayPassword/savePayPassword', params)
  },
  // 用户找回密码
  findPassword(params) {
    return post('PayPassword/findPassword', params)
  },
  // 修改支付密码
  updatePayPassword(params) {
    return post('PayPassword/updatePayPassword', params)
  }
}
