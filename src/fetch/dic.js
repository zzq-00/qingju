import { get, post } from 'axios'
/**
 * 枚举字典
 */
export default {
  // 获取所有问题类型
  getProblemTypeValue() {
    return get(`dic/getProblemTypeValue`)
  },
  // 获取所有新闻类型
  getNewsTypeValue() {
    return get('dic/getNewsTypeValue')
  },
  // 获取所有项目类型
  getProjectTypeValue() {
    return get('dic/getProjectTypeValue')
  },
  // 获取所有活动类型
  getPromotionTypeValue() {
    return get('dic/getPromotionTypeValue')
  },
  // 获取发布项目列表系数
  getAllCoefficient() {
    return get('dic/getAllCoefficient')
  },
  // 获取发布项目专业类型
  getAllProj() {
    return get('dic/getAllProj')
  },
  // 获取室内安装/装饰装修子目录
  getAllSubProj() {
    return get('dic/getAllSubProj')
  },
  // 获取变更套餐
  getChangePackage() {
    return get('dic/getChangePackage')
  },
  // 获取结构类型
  getAllStructType() {
    return get('dic/getAllStructType')
  },
  // 获取BIM项目类型
  getAllProjectType() {
    return get('dic/getAllProjectType')
  },
  // 获取BIM专业类型
  getProfessionalTypes() {
    return get('dic/getProfessionalTypes')
  },
  // 获取BIM服务内容
  getServiceContent() {
    return get('dic/getServiceContent')
  },
  // 获取BIM软件内容
  getSoftwareSelection() {
    return get('dic/getSoftwareSelection')
  },
  // 获取设计项目类型
  getDesignProjectType() {
    return get('dic/getDesignProjectType')
  },
  // 获取设计服务内容
  getDesignServiceContent() {
    return get('dic/getDesignServiceContent')
  },
  // 获取园林景观项目分类
  getDesignProjectClassification() {
    return get('dic/getDesignProjectClassification')
  },
  // 获取建筑设计项目分类
  getDesignClassificationOfBuildingProjects() {
    return get('dic/getDesignClassificationOfBuildingProjects')
  },
  // 获取设计项目性质
  getDesignProjectNature() {
    return get('dic/getDesignProjectNature')
  },
  // 获取设计风格
  getDesignStyle() {
    return get('dic/getDesignStyle')
  },
  // 获取设计项目类别
  getDesignItemClassification() {
    return get('dic/getDesignItemClassification')
  },
  // 获取设计项目类别（二级）
  getDesignItemClassificationSon(parentId) {
    return get(`dic/getDesignItemClassificationSon/${parentId}`)
  },
  // 获取机器人建模服务内容
  getRobotService() {
    return get('dic/getRobotService')
  },
  // 获取机器人委托范围
  getTheScopeOfTheCommission() {
    return get('dic/getTheScopeOfTheCommission')
  },
  // 获取编制业务专业类型
  getAllProjPlait() {
    return get('dic/getAllProjPlait')
  },
   // 获取编制项目类型
   getPlaitProjectType() {
    return get('dic/getPlaitProjectType')
  },
}
