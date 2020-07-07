import { get, post } from 'axios'
/**
 * 我的消息
 */
export default {
  // 获取系统消息
  getMsgList () {
    return get(`msg/getMsgList`)
  },
  getNewMsgList () {
    return get(`msg/getNewMsgList`)
  },
  // 修改为已读
  modifyRead (params) {
    return post('msg/modifyRead',params)
  }
}
