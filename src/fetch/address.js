import { get, post } from 'axios'
/**
 * 地址
 */
export default {
  // 获取省份
  province() {
    return get('address/province')
  },
  // 获取城市
  city(id) {
    return get(`address/city/${id}`)
  },
  // 获取区/县列表
  district(id) {
    return get(`address/district/${id}`)
  },
  // 保存收货地址
  saveReceiptInfo(params) {
    return post('address/saveReceiptInfo', params)
  },
  // 收货列表
  getReceiptList() {
    return get('address/getReceiptList')
  },
  // 设为默认地址
  setDefaultReceiptInfo(id) {
    return get(`address/setDefaultReceiptInfo/${id}`)
  },
  // 删除地址
  deleteReceiptInfo(id) {
    return get(`address/deleteReceiptInfo/${id}`)
  },
}
