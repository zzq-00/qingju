import { get, post } from 'axios'
/**
 * 预付款相关接口
 */
export default {
  // 生成随机预付款转账备注码
  genarateCode() {
    return get('prefinance/genarateCode')
  },
  // 前台提交转账凭证
  addCredential(params) {
    return post('prefinance/addCredential', params)
  },
  // 用户提交的转账凭证列表
  commitCredentialHistoryList(params) {
    return post('prefinance/commitCredentialHistoryList', params)
  },
  // 撤销转账凭证
  cancelAddCredential(id, reason) {
    return get(`prefinance/cancelAddCredential?addCredentialId=${id}&reason=${reason}`)
  },
  // 重新编辑转账凭证
  editCredential(params) {
    return post('prefinance/editCredential', params)
  },
  // 预览单个提交的转账凭证
  viewAddCredential(id) {
    return get(`prefinance/viewAddCredential?addCredentialId=${id}`)
  },
}
