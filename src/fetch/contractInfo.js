import { get, post } from 'axios'
/**
 * 合同管理
 */
export default {
  // 合同列表
  getContractInfoList(params) {
    return post('contractInfo/getContractInfoList', params)
  },
  // 下载打印合同
  contractInfoDownload(id) {
    return get(`contractInfo/download/${id}`)
  },
  // 预览合同
  preview(id) {
    return get(`contractInfo/preview/${id}`)
  },
  // 申请签约
  contractSign(params) {
    return post('contractInfo/sign', params)
  },
  // 发起合同废除
  saveAbolish(params) {
    return post('contractInfo/saveAbolish', params)
  },
  // 下载打印合同模板
  downloadTemplate(params) {
    return post('contractInfo/downloadTemplate', params)
  },
  contractListExport(params) {
    return post('contractInfo/contractListExport', params)
  }
}
