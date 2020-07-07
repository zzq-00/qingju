import { get, post } from 'axios'
/**
 * Design
 */
export default {
  // 发布设计项目
  publishDesign (params) {
    return post('Design/publishDesign', params)
  },
  // 前台基础信息
  backDesignProjectBaseInfo (projectBaseId) {
    return get(`Design/backDesignProjectBaseInfo/${projectBaseId}`)
  },
  // 获取驳回项目的信息
  getInformationAboutRejectedDesignItems(projectBaseId) {
    return get(`Design/getInformationAboutRejectedItems/${projectBaseId}`)
  },
}
