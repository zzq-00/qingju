import { get, post } from 'axios'
/**
 * 发票管理
 */
export default {
  // 申请开票下的项目列表
  myProjectList(params) {
    return post(`invoice/myProjectList`, params)
  },
  // 发票抬头列表
  getInvoiceTitle() {
    return get(`invoice/getInvoiceTitle`)
  },
  // 我的资质列表
  getMyInvoiceVerificationList(params) {
    return post(`invoice/getMyInvoiceVerificationList`, params)
  },
  // 查看资质详情
  getInvoiceVerificationInfo(invoiceVerificationId) {
    return get(`invoice/getInvoiceVerificationInfo/${invoiceVerificationId}`)
  },
  // 申请开票
  applyInvoice(params) {
    return post('invoice/applyInvoice', params)
  },
  // 新增发票资质
  auth(params) {
    return post('invoice/auth', params)
  },
  // 删除发票资质
  deleteInvoice(invoiceId) {
    return get(`invoice/deleteInvoice/${invoiceId}`)
  },
  // 设置默认发票资质
  setInvoiceVerificationDefault(invoiceVerificationId) {
    return get(`invoice/setInvoiceVerificationDefault/${invoiceVerificationId}`)
  },
  // 已开发票
  HaveInvoiceList(params) {
    return post('invoice/HaveInvoiceList', params)
  },
  // 当前发票详情
  invoiceInfoDetail(invoiceId) {
    return get(`invoice/invoiceInfoDetail/${invoiceId}`)
  },
  // 企业发票认证上传附件
  uploadInvoicVerificationFile(params) {
    return post('file/uploadInvoicVerificationFile', params)
  },
  // 根据公司名判断发票资质是否存在
  getIVByCompanyName(companyName) {
    return get(`invoice/getIVByCompanyName/${companyName}`)
  },
  //修改发票资质
  updateInvoiceVerification(params) {
    return post('invoice/updateInvoiceVerification', params)
  },
  //发票列表导出
  invoiceExport(params) {
    return post('invoice/invoiceExport', params, { responseType: 'blob' })
  },
  //发票资质导出
  invoiceQualificationExport(params) {
    return post('invoice/invoiceQualificationExport', params, { responseType: 'blob' })
  },
}
