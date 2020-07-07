import { get, post } from 'axios'
/**
 * 角色管理
 */
export default {
  getAllFunction() {
    return get('FirmRole/getAllFunction')
  },
  setRole(params) {
    return post('FirmRole/setRole', params)
  },
  saveRole(params) {
    return post('FirmRole/save', params)
  },
  updateRole(params) {
    return post('FirmRole/update', params)
  },
  getRoleList(firmId) {
    return get(`FirmRole/getRoleList/${firmId}`)
  },
  getFirmIdUser(firmId) {
    return get(`FirmRole/getFirmIdUser/${firmId}`)
  },
  firmUserDisabled(firmId) {
    return get(`FirmRole/firmUserDisabled/${firmId}`)
  },
  getUserRoles(params) {
    return post('FirmRole/getRole', params)
  },
  deleteRole(id) {
    return get(`FirmRole/deleteRole/${id}`)
  },
  personnelInformation(id) {
    return get(`FirmRole/personnelInformation/${id}`)
  },
  setUpAnAccount(params) {
    return post('FirmRole/setUpAnAccount', params)
  },
  deleteRoleUser(params) {
    return post('FirmRole/deleteRoleUser', params)
  },
  getUserList(params) {
    return post('FirmRole/getUserList', params)
  },
}
