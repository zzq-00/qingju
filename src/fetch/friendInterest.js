import { get, post } from 'axios'
/**
 * 青友惠
 */
export default {
  // 判断邀请码是否正确，邀请码拥有这是否为青友
  invitationCodeAndIsFriend(invitationCode) {
    return get(`friendInterest/invitationCodeAndIsFriend/${invitationCode}`)
  },
  // 旧的个人认证加入青友
  joinTheYouth(uid) {
    return get(`friendInterest/joinTheYouth/${uid}`)
  },
}
