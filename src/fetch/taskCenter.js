
import { get, post } from 'axios'
/**
 * 任务专区
 */
export default {
  //首页大家都在做列表
  getEverybodyTaskList(userId) {
    return get(`taskCenter/getEverybodyTaskList/${userId}`)
  },
  //签到
  signIn(params) {
    return get(`taskCenter/signIn/${params}`)
  },
  //今日青豆完成情况
  getBeansComplete(params) {
    return get(`taskCenter/getBeansComplete/${params}`)
  },
  //获取任务列表
  getTaskCenterList(params) {
    return get(`taskCenter/getTaskCenterList/${params}`)
  },
  //新注册用户添加青豆
  newUsersAddGreenBeans(params) {
    return get(`taskCenter/newUsersAddGreenBeans/${params}`)
  },
  //新注册用户是否已添加过青豆
  getReceivingStatus(params) {
    return get(`taskCenter/getReceivingStatus/${params}`)
  },
}
