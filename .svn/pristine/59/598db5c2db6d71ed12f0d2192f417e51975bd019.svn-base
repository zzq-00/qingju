import { get, post } from 'axios'
/**
 * 收费标准
 */
export default {
  // 一键询价
  calcTotalFeeAsk(params) {
    return post('feeStd/calcTotalFeeAsk', params)
  },
  // 展示首页2条数据
  showIndexData(params) {
    return get('feeStd/showIndexData', params)
  },
  // 获取标准工期
  getFs(params) {
    return post('feeStd/getFs', params)
  },
  // 获取机器人建模项目类型
  getAllRobotProjectType() {
    return get('feeStd/getAllRobotProjectType')
  },
  // 编制类价格计算
  calPlaitFee(params) {
    return post('feeStd/calPlaitFee', params)
  }

}
