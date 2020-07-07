import { get, post } from 'axios'
/**
 * 导出Excel
 */
export default {
  // 下载轻松付账户明细数据
  downloadMyQuickPayLogList(params) {
    return post('export/downloadMyQuickPayLogList', params, { responseType: 'blob' })
  },
  // 下载账户明细数据
  downloadMyFinanceLogList(params) {
    return post('export/downloadMyFinanceLogList', params, { responseType: 'blob' })
  },
  // 下载轻松付账单
  downLoadUserQuickPayBillList(params) {
    return post('export/downLoadUserQuickPayBillList', params, { responseType: 'blob' })
  },
  // 下载 - 奖励金明细表
  userDownloadRewardLogList(params) {
    return post('export/userDownloadRewardLogList', params, { responseType: 'blob' })
  },
}
