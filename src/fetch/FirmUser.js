import { get, post} from 'axios'
/**
 * 企业及人员管理
 */
export default {
  getFirmRoles (firmId) {
    return get(`FirmUser/getFirmRoles/${firmId}`)
  },
  addUser (params) {
    return post('FirmUser/addUser', params)
  },
  editFirmUser (params) {
    return post('FirmUser/editFirmUser', params)
  },
  changePassword (params) {
    return post('FirmUser/changePassword', params)
  }
}
