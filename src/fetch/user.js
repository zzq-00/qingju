
import { get, post } from 'axios'
/**
 * 人员管理
 */
export default {
  // 被弃用
  updateUserStatus(params) {
    return post('user/updateUserStatus', params)
  },
  getFrontDeskUserInfo(id) {
    return get(`user/getFrontDeskUserInfo/${id}`)
  },
  // 用户的详细信息 -- 有个getinstall接口重名
  getDiffUserInfo(id) {
    return get(`user/getUserInfo/${id}`)
  },
}
