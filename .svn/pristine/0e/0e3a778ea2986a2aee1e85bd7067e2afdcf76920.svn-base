import { get, post } from 'axios'
/**
 * 机器人
 */
export default {
  // 发布建模项目
  publishRobot(params) {
    return post('robot/publishRobot', params)
  },
  // 发活人查看项目
  viewRobotProject(id) {
    return get('robot/viewRobotProject/' + id)
  },
  // 获取机器人建模专业类型
  getRobotProjectType() {
    return get('robot/getRobotProjectType')
  },
  // 获取驳回项目的信息
  rejectRobotEditor(projectBaseId) {
    return get('robot/rejectRobotEditor/' + projectBaseId)
  }
}
