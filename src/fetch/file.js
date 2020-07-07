import { get, post } from 'axios'
/**
 * 文件管理（认证、发票资质文件上传、删除）
 */
export default {
  // 轻松付认证认证上传附件(个人/企业)
  quickPayUploadAuthFile(params) {
    return post('file/quickPayUploadAuthFile', params)
  },
  // 实名认证
  uploadAuthFile(params) {
    return post('file/uploadAuthFile', params)
  },
  // 普通文件通用上传
  uploadFile(params) {
    return post('file/uploadFile', params)
  },
}
