import { get, post } from 'axios'
/**
 * 系统管理
 */
export default {
  callBackLocal(params) {
    return post('home/callBackLocal', params)
  },
  //解绑手机号邮箱
  untiedMobile(params) {
    return post('home/untiedMobile', params)
  },
  //邀请码
  addInvitationCode(invitationCode) {
    return get('home/addInvitationCode/' + invitationCode)
  },
  //发送邮件
  sendMail(params) {
    return post('home/sendMail', params)
  },
  //个人设置校验
  dataSetting(params) {
    return post('home/dataSetting', params)
  },
  // 获取所有新闻类型
  publishPeopleLogin(params) {
    return post('home/publishPeopleLogin', params)
  },
  // 注册
  registered(params) {
    return post('home/registered', params)
  },
  // 新版免费注册
  registeredNew(params) {
    return post('home/registeredNew', params)
  },
  // 校验图片验证码
  validateVerifyCode(params) {
    return get(`home/validateVerifyCode/${params}`)
  },
  //注销
  logout() {
    return get('home/logout')
  },
  //获取短信验证码
  sendVerifyCodeLogin(params) {
    return post('home/sendVerifyCode', params)
  },
  //校验短信验证码
  validatePhoneVerifyCodeLogin(params) {
    return post('home/validatePhoneVerifyCode', params)
  },
  //前台验证码登录
  frontDeskVerificationCodeLogin(params) {
    return post('home/frontDeskVerificationCodeLogin', params)
  },
  // 邀请码
  getIvCodeAndIvlist() {
    return get('home/getIvCodeAndIvlist')
  },
  //找回密码校验
  retrieveDverifyMessage(params) {
    return post('home/retrieveDverifyMessage', params)
  },
  // 找回密码校验 判断是是否绑定邮箱 手机号
  retrievePasswordCheck(params) {
    return post(`home/retrievePasswordCheck`, params)
  },
  //忘记密码
  forgetPassword(params) {
    return post('home/forgetPassword', params)
  },
  // 根据账号匹配用户
  getInfoByCode(code) {
    return get(`home/getInfoByCode/${code}`)
  },
  // 校验邮箱手机号是否存在
  verifyMessage(params) {
    return post('home/verifyMessage', params)
  },
  // 我的青矩新增接口
  firmVerifyMessage(params) {
    return post('home/firmVerifyMessage', params)
  },
  // 企业注册发送手机验证码
  companySendVerifyCode(params) {
    return post('home/companySendVerifyCode', params)
  },
  // 企业注册
  authcompanyRegistration(params) {
    return post('home/authcompanyRegistration', params)
  },
  // 校验设置登录账号
  acountVerifyMessage(acount) {
    return get(`home/acountVerifyMessage/${acount}`)
  },
  // 获取当前手机号下发送验证码剩余次数
  getVerificationCodeNumber(tel) {
    return get(`home/getVerificationCodeNumber/${tel}`)
  },
}
