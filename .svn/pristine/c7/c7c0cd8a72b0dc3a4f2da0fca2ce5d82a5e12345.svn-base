<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color: #F8F9FA;"></breadcrumb>
    <div class="content" v-if="operate">
      <div class="container clearfix">
        <div>
          <h5>发布项目</h5>
          <div id="release">
            <div>
              <label class="require">项目名称</label>
              <div>
                <input type="text" v-model.trim="params.name" @blur="checkForm($event, params.name)">
                <p class="tips">请填写您的项目名称</p>
              </div>
            </div>
            <div>
              <label class="require">项目类型</label>
              <div>
                <label v-for="(item,index) in DesignProjectType" :key="index">
                  <input type="radio" :value="item.id" v-model="params.projectType" @change="typeSel(item.id)">
                  <span>{{item.name}}</span>
                </label>
                <p class="tips">请选择项目类型</p>
              </div>
            </div>
            <div v-if="params.projectType == 4 || params.projectType == 5">
              <label class="require">服务内容</label>
              <div>
                <label v-for="(item,index) in DesignServiceContent" :key="index">
                  <input type="checkbox" v-model="params.serviceItem" :value="item.id" @change="checkForm($event, params.serviceItem)">
                  <span>{{item.name}}</span>
                </label>
                <p class="tips">请选择服务内容</p>
              </div>
            </div>
            <div>
              <label class="require">{{params.projectType==5?'设计面积':'建筑面积'}}</label>
              <div>
                <input type="text" v-model.trim="params.buildingArea" @blur="checkForm($event, params.buildingArea)"> ㎡
                <p class="tips">请填写{{params.projectType==5?'设计面积':'建筑面积'}}</p>
              </div>
            </div>
            <div>
              <label class="require">投资额</label>
              <div>
                <input type="text" v-model.trim="params.entrustTheSum" @blur="checkForm($event, params.entrustTheSum)"> 元
                <p class="tips">请填写投资额</p>
              </div>
            </div>
            <div v-if="params.projectType == 1 || params.projectType == 4">
              <label class="require">项目分类</label>
              <div>
                <select v-model="params.designStyle" @change="checkForm($event, params.designStyle)">
                  <option v-for="(item,index) in DesignProjectClassification" :key="index" :value="item.id">{{item.name}}</option>
                </select>
                <p class="tips">请选择项目分类</p>
              </div>
            </div>
            <div v-if="params.projectType == 5">
              <label class="require">设计风格</label>
              <div>
                <select v-model="params.designStyle" @change="checkForm($event, params.designStyle)">
                  <option v-for="(item,index) in DesignStyle" :key="index" :value="item.id">{{item.name}}</option>
                </select>
                <p class="tips">请选择设计风格</p>
              </div>
            </div>
            <div v-if="params.projectType == 5">
              <label class="require">项目类别</label>
              <div>
                <select style="width:150px;" v-model="itemClassification" @change="checkForm($event, itemClassification)">
                  <option v-for="(item,index) in DesignItemClassification" :key="index" :value="item.id">{{item.name}}</option>
                </select>
                <select style="width:250px;" v-model="itemClassificationSon" @change="checkForm($event, itemClassificationSon)">
                  <option v-for="(item,index) in DesignItemClassificationSon" :key="index" :value="item.id">{{item.name}}</option>
                </select>
                <p class="tips">请选择项目类别</p>
              </div>
            </div>
            <div v-if="params.projectType == 4 || params.projectType == 5">
              <label class="require">建设性质</label>
              <div>
                <label v-for="(item,index) in DesignProjectNature" :key="index">
                  <input type="radio" :value="item.id" v-model="params.buildingProperty" :disabled="params.projectType==4 && item.id==1">
                  <span>{{item.name}}</span>
                </label>
                <p class="tips">请选择建设性质</p>
              </div>
            </div>
            <div v-if="params.projectType == 4">
              <label>驻场服务</label>
              <div>
                <input type="text" v-model.trim="params.onSiteService"> 人日
              </div>
            </div>
            <div>
              <label class="require">联系方式</label>
              <div>
                <input type="text" v-model.trim="params.contactWay" @blur="checkForm($event, params.contactWay)">
                <p class="tips">请填写您的联系方式</p>
              </div>
            </div>
            <div>
              <label class="require">项目地址</label>
              <div>
                <select style="width: 131px" v-model="provinceSel" @change="checkForm($event, provinceSel)">
                  <option v-for="(item,index) in provinceList" :key="index" :value="item.code">{{item.name}}</option>
                </select>
                <select style="width: 131px" v-model="citySel" @change="checkForm($event, citySel)">
                  <option v-for="(item,index) in cityList" :key="index" :value="item.code">{{item.name}}</option>
                </select>
                <select style="width: 131px" v-model="districtSel" @change="checkForm($event, districtSel)">
                  <option v-for="(item,index) in districtList" :key="index" :value="item.code">{{item.name}}</option>
                </select>
                <p class="tips">请选择所在省份</p>
              </div>
            </div>
            <div v-if="params.projectType == 4 || params.projectType == 5">
              <label>附件</label>
              <el-upload name="file" :file-list="fileArray" with-credentials multiple :action="httpHead+'FastDFS/fastDFSupload'" :on-success="handleaccessoryFilesSuccess" :on-error="handleaccessoryFilesError" :on-remove="handleaccessoryFilesRemove">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">提示：您需要上传政府批文、设计条件图、现场照片、设计任务书等文档</div>
              </el-upload>
            </div>
            <div>
              <label>项目概况</label>
              <div>
                <textarea v-model.trim="params.projectOverview" maxlength="200" cols="70" rows="7"></textarea>
              </div>
            </div>
            <div>
              <label></label>
              <div>
                <el-button type="primary" size="small" style="padding: 9px 25px;" @click="publishDesign">发布项目</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h4>免费发布项目</h4>
            <p>您可以在青矩互联平台免费发布项目，经平台审批通过后，再由作业中心确认项目报价并承接项目。项目工作过程中可查看项目账单、费用明细以及交付成果等信息。</p>
          </div>
          <div>
            <h4>如何快速有效的通过审核？</h4>
            <p>填写准确无误的项目信息<br> 合理的误差率和交付截止日期
              <br> 上传与项目相关的电子图纸等资料
              <br> 提交前请确保所在地、联系方式等信息的有效性
              <br></p>
          </div>
        </div>
      </div>
    </div>
    <no-auth v-else></no-auth>
    <span class="J-operate" v-has="['n9Ervx']"></span>
  </div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
import noAuth from '@/components/noAuth'

export default {
  components: {
    breadcrumb,
    noAuth
  },
  data() {
    return {
      operate: false,
      breadcrumbs: [{ name: '发布项目', path: this.$route.fullPath }],
      httpHead: process.env.API_ROOT,
      DesignProjectType: [],
      DesignServiceContent: [],
      DesignProjectClassification: [],
      DesignProjectNature: [],
      DesignStyle: [],
      DesignItemClassification: [],
      DesignItemClassificationSon: [],
      provinceList: [],
      provinceSel: '',
      cityList: [],
      citySel: '',
      districtList: [],
      districtSel: '',
      fileArray: [],
      itemClassification: '',
      itemClassificationSon: '',
      params: {
        accessoryFiles: [],
        buildingArea: '',
        buildingProperty: '2',
        city: '',
        contactWay: '',
        designStyle: '1',
        district: '',
        entrustTheSum: '',
        itemClassification: [],
        name: '',
        onSiteService: '',
        projectOverview: '',
        projectType: '1',
        province: '',
        serviceItem: []
      },
      locked: false
    }
  },
  watch: {
    provinceSel: function() {
      this.city()
    },
    citySel: function() {
      this.district()
    },
    itemClassification: function() {
      this.getDesignItemClassificationSon()
    }
  },
  methods: {
    // 获取省份
    province() {
      api.province().then(res => {
        this.provinceList = res.dataList
        this.provinceSel = res.dataList[0].code
      })
    },
    // 获取城市
    city() {
      api.city(this.provinceSel).then(res => {
        this.cityList = res.dataList
        this.citySel = res.dataList[0].code
      })
    },
    // 获取区县
    district() {
      api.district(this.citySel).then(res => {
        this.districtList = res.dataList
        this.districtSel = res.dataList[0].code
      })
    },
    // 上传附件
    handleaccessoryFilesSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.params.accessoryFiles.push(res.dataList[0].id)
      } else {
        this.$message.error({ message: res.errorMsg })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleaccessoryFilesError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleaccessoryFilesRemove(file, fileList) {
      let id = file.response ? file.response.dataList[0].id : file.id
      let index = this.params.accessoryFiles.indexOf(id)
      if (index > -1) this.params.accessoryFiles.splice(index, 1)
    },
    checkForm(event, value) {
      // 非空提示的显示与隐藏
      const eventTarget = event.target || event.srcElement
      if (eventTarget.parentNode.tagName === 'DIV') {
        eventTarget.parentNode.lastChild.style.display = value ? 'none' : 'block'
      } else if (eventTarget.parentNode.tagName === 'LABEL') {
        eventTarget.parentNode.parentNode.lastChild.style.display = value.length > 0 ? 'none' : 'block'
      }
    },
    // 发布项目
    publishDesign() {
      // 防止重复点击
      if (this.locked) return false

      if (!this.params.name) return this.$message('请填写您的项目名称')
      if (!this.params.buildingArea) return this.$message('请填写建筑面积')
      if (!this.params.entrustTheSum) return this.$message('请填写投资额')
      if (!/^1[345678]\d{9}$/.test(this.params.contactWay)) return this.$message('请正确填写联系方式')
      if (this.params.projectOverview.length > 2500) return this.$message('项目概况不超2500字')
      if (this.params.projectType == 4 || this.params.projectType == 5) {
        if (this.params.serviceItem.length == 0) return this.$message('请选择服务内容')
      }

      if (this.params.projectType == 1 || this.params.projectType == 2 || this.params.projectType == 3) {
        delete this.params.serviceItem
        delete this.params.buildingProperty
        delete this.params.onSiteService
        delete this.params.accessoryFiles
        delete this.params.itemClassification
      }
      if (this.params.projectType == 2 || this.params.projectType == 3) {
        delete this.params.designStyle
      }
      if (this.params.projectType == 5) {
        this.params.itemClassification = [this.itemClassification, this.itemClassificationSon]
        delete this.params.onSiteService
      }

      this.params.province = this.provinceSel
      this.params.city = this.citySel
      this.params.district = this.districtSel

      this.locked = true
      if (this.$route.query.flag === 'reuse') {
        this.params.projectBaseId = ''
      }
      api
        .publishDesign(this.params)
        .then(res => {
          this.$message.success('发布成功')
          setTimeout(() => {
            this.$router.push('/myqingju/project')
          }, 2000)
        })
        .catch(res => {
          this.locked = false
          this.$message.error({ message: res.errorMsg })
        })
    },
    typeSel(id) {
      if (id == 4) {
        this.getDesignProjectClassification()
      } else if (id == 1) {
        this.getDesignClassificationOfBuildingProjects()
      }
    },
    // 获取项目类型
    getDesignProjectType() {
      api.getDesignProjectType().then(res => {
        this.DesignProjectType = res.dataList
      })
    },
    // 获取服务内容
    getDesignServiceContent() {
      api.getDesignServiceContent().then(res => {
        this.DesignServiceContent = res.dataList
      })
    },
    // 获取园林景观项目分类
    getDesignProjectClassification() {
      api.getDesignProjectClassification().then(res => {
        this.DesignProjectClassification = res.dataList
      })
    },
    // 获取建筑设计项目分类
    getDesignClassificationOfBuildingProjects() {
      api.getDesignClassificationOfBuildingProjects().then(res => {
        this.DesignProjectClassification = res.dataList
      })
    },
    // 获取项目性质
    getDesignProjectNature() {
      api.getDesignProjectNature().then(res => {
        this.DesignProjectNature = res.dataList
      })
    },
    // 获取设计风格
    getDesignStyle() {
      api.getDesignStyle().then(res => {
        this.DesignStyle = res.dataList
      })
    },
    // 获取项目类别
    getDesignItemClassification() {
      api.getDesignItemClassification().then(res => {
        this.DesignItemClassification = res.dataList
        this.itemClassification = res.dataList[0].id
      })
    },
    // 获取项目类别(二级)
    getDesignItemClassificationSon() {
      api.getDesignItemClassificationSon(this.itemClassification).then(res => {
        this.DesignItemClassificationSon = res.dataList
        this.itemClassificationSon = res.dataList[0].id
      })
    }
  },
  mounted() {
    setTimeout(() => {
      if (!window.localStorage.QingjuAccount) return this.$router.push('/login')
    }, 0)
    // hack 操作的显示
    let dNoneoperate = document.getElementsByClassName('J-operate')[0]
    if (dNoneoperate && !dNoneoperate.style.display) {
      this.operate = true
    }
    this.province()
    this.getDesignProjectType()
    this.getDesignServiceContent()
    this.getDesignProjectNature()
    this.getDesignStyle()
    this.getDesignItemClassification()
    this.getDesignClassificationOfBuildingProjects()
    if (window.sessionStorage.designContents) {
      this.params.projectType = window.sessionStorage.designContents
    }
    // 重新编辑
    if (this.$route.query.reEditId) {
      api
        .getInformationAboutRejectedDesignItems(this.$route.query.reEditId)
        .then(res => {
          // if (res.status === '9') {
          this.params = res.dataList[0]
          this.fileArray = res.dataList[0].accessoryFiles
          this.params.accessoryFiles = res.dataList[0].accessoryFiles.map(item => item.id)
          this.provinceSel = this.params.province
          this.citySel = this.params.city
          this.districtSel = this.params.district
          // }
        })
        .catch(err => {})
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  .container {
    margin-bottom: 20px;
    > div {
      &:first-child {
        float: left;
        box-sizing: border-box;
        width: 800px;
        padding: 15px 15px 60px;
        background-color: #fff;
        > h5 {
          text-align: center;
        }
        #release {
          margin-top: 60px;
          > div {
            margin-bottom: 30px;
            min-height: 35px;
            > label {
              float: left;
              font-size: 14px;
              width: 140px;
              text-align: right;
              margin-top: 5px;
            }
            > label + div {
              font-size: 13px;
              margin-left: 170px;
              > label {
                line-height: 30px;
                margin-right: 18px;
              }
              > p {
                font-size: 12px;
                &.tips {
                  display: none;
                  margin-top: 3px;
                  position: absolute;
                  color: #ff0000;
                }
              }
            }
          }
        }
      }
      &:last-child {
        float: right;
        width: 380px;
        > div {
          background-color: #fff;
          margin-bottom: 20px;
          > h4 {
            color: #666;
            font-size: 18px;
            padding: 10px 30px;
            border-bottom: 1px dashed #d7d7d7;
          }
          > p {
            padding: 10px 30px;
            line-height: 28px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
input[type='text'],
input[type='number'],
select,
textarea {
  border: 1px solid #aaa;
}
input[type='text'],
input[type='number'],
select {
  box-sizing: border-box;
  width: 400px;
  height: 35px;
  padding-left: 10px;
}
input[type='text'].short,
input[type='number'].short {
  width: 200px;
}
.sel-file {
  cursor: pointer;
  color: #fff;
  background-color: #33add3;
  padding: 8px 20px;
  border-radius: 4px;
}
.upload-img {
  cursor: pointer;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  border: 1px solid rgb(188, 188, 188);
  text-align: center;
  margin-top: 10px;
  &:hover {
    border-color: rgb(0, 153, 102);
  }
  p {
    font-size: 12px;
    color: rgb(204, 204, 204);
    margin-top: 3px;
  }
}
input[type='checkbox']:disabled + span {
  color: #adabab;
}
input[type='radio']:disabled + span {
  color: #adabab;
}
</style>
