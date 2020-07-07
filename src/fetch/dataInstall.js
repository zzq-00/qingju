import { get, post } from 'axios'
/**
 * 资料设置
 */
export default {
  // 获取个人信息
  getUserInfo() {
    return get('dataInstall/getUserInfo')
  },
  compileDataInstall(params) {
    return post('dataInstall/compileDataInstall', params)
  },
  // 修改登录密码
  resetPassword(params) {
    return post('dataInstall/resetPassword', params)
  },
  // 修改头像
  updateHeadPortraits(oldName, params) {
    return post(`dataInstall/updateHeadPortraits?oldName=${oldName}`, params)
  },
  //修改用户名
  updateUserName(newUserName) {
    return get('dataInstall/updateUserName/' + newUserName)
  },
  //修改账号updateAccountNumber
  updateAccountNumber(accountNumber) {
    return get('dataInstall/updateAccountNumber/' + accountNumber)
  },
  //更改手机号
  updateTelephone(params) {
    return post('dataInstall/updateTelephone', params)
  },
  //获取当前用户的头像
  getHeadPortraits() {
    return get('dataInstall/getHeadPortraits')
  },
  //修改邮箱
  updateMailing(params) {
    return post('dataInstall/updateMailing', params)
  },
  //添加邮箱
  saveEmail(params) {
    return post('dataInstall/saveEmail/', params)
  },
}
