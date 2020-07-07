
import { get, post } from 'axios'
/**
 * 认证管理
 */
export default {
  // 查看当前人是否需要认证
  judgeAuth() {
    return get('authentication/judgeAuth')
  },
  // 实名认证-个人
  authPersonInfo(params) {
    return post('/authentication/personInfo', params)
  },
  // 实名认证-企业
  authCompanyInfo(params) {
    return post('/authentication/companyInfo', params)
  },
  // 实名注册详情
  getAuthInfo() {
    return get('/authentication/getAuthInfo')
  },
}
