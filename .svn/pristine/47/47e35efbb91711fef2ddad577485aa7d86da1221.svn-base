import { get, post } from 'axios'
/**
 * 组织架构管理
 */
export default {
  addJuniorDepartment(params) {
    return post('OrganizeStructure/addJuniorDepartment', params)
  },
  getDepartmentById(deptId) {
    return get(`OrganizeStructure/getDepartmentById/${deptId}`)
  },
  deleteDeptById(deptId) {
    return get(`OrganizeStructure/deleteDeptById/${deptId}`)
  },
  updateDepartment(params) {
    return post('OrganizeStructure/updateDepartment', params)
  },
  getOrganizeStructureList(firmId) {
    return get(`OrganizeStructure/getOrganizeStructureList/${firmId}`)
  },
  OrganizeStructureMove(params) {
    return post('OrganizeStructure/mobile', params)
  }
}
