import { get, post } from 'axios'
/**
 * 项目
 */
export default {
  // 发布项目
  publish(params) {
    return post('project/publish', params)
  },
  // 发布项目上传文件
  // uploadPublishFile (params) {
  //   return post('project/uploadPublishFile', params)
  // },
  // 发活人项目列表
  selfProjectList(params) {
    return post('project/selfProjectList', params)
  },
  // 发活人查看项目
  viewProject(params) {
    return get(`project/viewProject/${params}`)
  },
  // 补充文件
  supplementFile(params) {
    return post('project/supplementFile', params)
  },
  // 留言发表评论
  message(params) {
    return post('project/message', params)
  },
  // 放弃项目
  giveUp(projectBaseId) {
    return get(`project/giveUp/${projectBaseId}`)
  },
  // 付款完成后调用该托管接口，改变项目状态
  trusteeship(params) {
    return post('project/trusteeship', params)
  },
  // 项目申诉
  projectComplaint(params) {
    return post('project/projectComplaint', params)
  },
  // 验收
  check(params) {
    return post('project/check', params)
  },
  // 发活人评价
  evaluation(params) {
    return post('project/evaluation', params)
  },
  // 查看项目评论信息
  backProjectConsultation(params) {
    return get(`project/backProjectConsultation/${params}`)
  },
  // 发活人评价获取项目名称和头像
  getProjectNameAndHeadPortrait(projectBaseId) {
    return get(`project/getProjectNameAndHeadPortrait/${projectBaseId}`)
  },
  // 获取需要付款的项目
  getNonPaymentProject(userId) {
    return get(`project/getNonPaymentProject/${userId}`)
  },
  // 获取驳回项目的信息
  getInformationAboutRejectedItems(projectBaseId) {
    return get(`project/getInformationAboutRejectedItems/${projectBaseId}`)
  },
  // 获取驳回原因
  getTheReasonForTheRejection(projectBaseId) {
    return get(`project/getTheReasonForTheRejection/${projectBaseId}`)
  },
  // 状态列表
  listFilterStatus() {
    return get('project/listFilterStatus')
  },
  // 项目下载
  frontItemListExport(params) {
    return post('project/frontItemListExport', params, { responseType: 'blob' })
  }
}
