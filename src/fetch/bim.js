import { get, post } from 'axios'
/**
 * BIM
 */
export default {
  // 发布BIM
  publishBim(params) {
    return post('bim/publishBim', params)
  },
  // 发布BIM项目上传项目概况文件
  // uploadPublishProjectOverviewFile (params) {
  //   return post('bim/uploadPublishProjectOverviewFile', params)
  // },
  // 发布项目上传图纸文件
  // uploadPublishDrawingFile (params) {
  //   return post('bim/uploadPublishDrawingFile', params)
  // },
  // 发布BIM上传标准文件
  // uploadPublishStandardFile (params) {
  //   return post('bim/uploadPublishStandardFile', params)
  // },
  // BIM详情
  backProjectBaseInfo(projectBaseId) {
    return get(`bim/backProjectBaseInfo/${projectBaseId}`)
  },
  // 留言发表评论
  bimMessage(params) {
    return post('bim/message', params)
  },
  // BIM托管
  bimTrusteeship(params) {
    return post('bim/trusteeship', params)
  },
  // 验收
  BIMcheck(params) {
    return post('bim/check', params)
  },
  // 获取驳回的项目信息
  getInformationAboutRejectedBIMItems(projectBaseId) {
    return get(`bim/getInformationAboutRejectedItems/${projectBaseId}`)
  },
}
