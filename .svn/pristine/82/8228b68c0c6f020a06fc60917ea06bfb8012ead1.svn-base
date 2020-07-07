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
                <select v-model="params.projectType" @change="checkForm($event, params.projectType)">
                  <option v-for="(item,index) in allProjectType" :key="index" :value="item.id">{{item.typeName}}</option>
                </select>
                <p class="tips">请选择项目类型</p>
              </div>
            </div>
            <div>
              <label class="require">专业类型</label>
              <div>
                <label v-for="(item,index) in allProfessionalTypesFilter" :key="index">
                  <input type="checkbox" v-model="params.professionalTypes" :value="item.id" @change="checkForm($event, params.professionalTypes)">
                  <span>{{item.professionalTypeName}}</span>
                </label>
                <p class="tips">请选择专业类型</p>
              </div>
            </div>
            <div>
              <label class="require">建筑规模</label>
              <div>
                <select style="width:105px;" v-model="params.buildingAreaAndRest" @change="checkForm($event, params.buildingArea)">
                  <!-- <option v-for="(item,index) in allProjectType" :key="index" :value="item.id">{{item.typeName}}</option> -->
                  <option value="1">建筑面积</option>
                  <option value="2">其他</option>
                </select>
                <input type="number" min="0" v-model.trim="params.buildingArea" @blur="checkForm($event, params.buildingArea)">
                <p class="tips">请填写建筑面积</p>
              </div>
            </div>
            <div>
              <label>项目概况</label>
              <div>
                <textarea v-model.trim="params.projectOverview" cols="70" rows="5"></textarea>
                <el-upload name="file" :file-list="projectOverviewFiles" with-credentials :action="httpHead+'FastDFS/fastDFSupload'" list-type="picture-card" :on-success="handleProjectOverviewFilesSuccess" :on-error="handleProjectOverviewFilesError" :on-preview="handleProjectOverviewFilesPreview" :on-remove="handleProjectOverviewFilesRemove">
                  <i class="el-icon-picture-outline" style="margin-top:10px;color:#ccc;"></i>
                  <p style="font-size: 12px;color:#ccc;">上传图片</p>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </div>
            <div>
              <label class="require">服务内容</label>
              <div>
                <label v-for="(item,index) in allServiceContent" :key="index">
                  <input type="checkbox" :value="item.id" v-model="params.serviceItem" @change="checkForm($event, params.serviceItem)">
                  <span>{{item.serviceContentName}}</span>
                </label>
                <p class="tips">请选择服务内容</p>
              </div>
            </div>
            <div>
              <label>服务内容描述</label>
              <div>
                <textarea v-model.trim="params.serviceItemDescribe" cols="70" rows="5"></textarea>
              </div>
            </div>
            <div>
              <label class="require">软件选择</label>
              <div>
                <label v-for="(item,index) in softwareSelectionList" :key="index">
                  <input type="checkbox" :value="item.id" v-model="params.softwareSelection" @change="checkForm($event, params.softwareSelection)">
                  <span>{{item.softwareSelectionName}}</span>
                </label>
                <p class="tips">请选择软件</p>
              </div>
            </div>
            <div>
              <label class="require">委托金额</label>
              <div>
                <input type="number" min="0" class="short" v-model.trim="params.entrustTheSum" @blur="checkForm($event, params.entrustTheSum)"> 元
                <p class="tips">请输入委托金额</p>
              </div>
            </div>
            <div>
              <label class="require">交付截止日期</label>
              <div>
                <el-date-picker v-model="params.deliveryDeadline" type="date" :editable=false :picker-options="pickerOptions">
                </el-date-picker>
                <p class="tips">请选择交付截止日期</p>
              </div>
            </div>
            <div>
              <label>是否需要现场工作(天)</label>
              <div class="spot clearfix">
                <label>
                  <input type="checkbox" v-model="params.localeWork">
                </label>
                <input type="number" min="0" :disabled="!params.localeWork" placeholder="全体人员现场工作天数之和" v-model.trim="params.expectWorkDays">
              </div>
            </div>
            <div>
              <label class="require">所在省份</label>
              <div>
                <select v-model="provinceSel" @change="checkForm($event, provinceSel)">
                  <option v-for="(item,index) in provinceList" :key="index" :value="item.code">{{item.name}}</option>
                </select>
                <p class="tips">请选择所在省份</p>
              </div>
            </div>
            <div>
              <label class="require">所在城市</label>
              <div>
                <select v-model="citySel" @change="checkForm($event, citySel)">
                  <option v-for="(item,index) in cityList" :key="index" :value="item.code">{{item.name}}</option>
                </select>
                <p class="tips">请选择所在城市</p>
              </div>
            </div>
            <div>
              <label class="require">所在区县</label>
              <div>
                <select v-model="districtSel" @change="checkForm($event, districtSel)">
                  <option v-for="(item,index) in districtList" :key="index" :value="item.code">{{item.name}}</option>
                </select>
                <p class="tips">请选择所在区县</p>
              </div>
            </div>
            <div>
              <label class="require">联系电话</label>
              <div>
                <input type="text" v-model.trim="params.contactNumber" @blur="checkForm($event, params.contactNumber)">
                <p class="tips">请填写您的联系电话</p>
              </div>
            </div>
            <div>
              <label class="require">上传图纸</label>
              <el-upload name="file" :file-list="drawingFiles" with-credentials multiple :action="httpHead+'FastDFS/fastDFSupload'" :on-success="handleDrawingFilesSuccess" :on-error="handleDrawingFilesError" :on-remove="handleDrawingFilesRemove">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">提示：确认上传的图纸为最终版本，若修改图纸版本会导致产生额外费用</div>
              </el-upload>
            </div>
            <div>
              <label>上传标准</label>
              <el-upload name="file" :file-list="standardFiles" with-credentials multiple :action="httpHead+'FastDFS/fastDFSupload'" :on-success="handleStandardFilesSuccess" :on-error="handleStandardFilesError" :on-remove="handleStandardFilesRemove">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">提示：您可以上传建模标准、相关参考规范、报告模板，工程量统计模板等要求，如无要求，则接活人自行决定</div>
              </el-upload>
            </div>
            <div>
              <label>备注</label>
              <div>
                <textarea v-model.trim="params.remark" maxlength="200" cols="70" rows="7"></textarea>
              </div>
            </div>
            <div>
              <label></label>
              <div>
                <el-button type="primary" size="small" style="padding: 9px 25px;" @click="publishBim">发布项目</el-button>
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
    <span class="J-operate" v-has="['bpoE9x']"></span>
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
      dialogImageUrl: '',
      dialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date()
        }
      },
      provinceList: [],
      provinceSel: '',
      cityList: [],
      citySel: '',
      districtList: [],
      districtSel: '',
      allProfessionalTypes: [],
      allServiceContent: [],
      allProjectType: [],
      softwareSelectionList: [],
      qiaoliangId: 'f0c36ca3-4903-11e8-83e7-20040ffbdbb6',
      suidaoId: 'f25b21fe-4903-11e8-83e7-20040ffbdbb6',
      daoluId: 'ef48fbd8-4903-11e8-83e7-20040ffbdbb6',
      projectOverviewFiles: [],
      drawingFiles: [],
      standardFiles: [],
      params: {
        addressId: '',
        bimId: '',
        buildingArea: '',
        buildingAreaAndRest: '1',
        city: '',
        contactNumber: '',
        deliveryDeadline: '',
        discount: '',
        dismissTheReason: '',
        district: '',
        drawingFiles: [],
        entrustTheSum: '',
        expectWorkDays: '',
        localeWork: false,
        name: '',
        note: '',
        productType: '',
        professionalTypes: [],
        projectOverview: '',
        projectOverviewFiles: [],
        projectType: '',
        province: '',
        remark: '',
        serviceItem: [],
        serviceItemDescribe: '',
        softwareSelection: [],
        standardFiles: [],
        workStationIndex: '',
        workstationId: ''
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
    }
  },
  computed: {
    allProfessionalTypesFilter: function() {
      this.professionalTypesSel = []
      if (this.params.projectType === this.qiaoliangId || this.params.projectType === this.suidaoId) {
        return this.allProfessionalTypes.filter(item => {
          return item.professionalTypeName === '土建' || item.professionalTypeName === '钢筋' || item.professionalTypeName === '附属' || item.professionalTypeName === '其他'
        })
      } else if (this.params.projectType === this.daoluId) {
        return this.allProfessionalTypes.filter(item => {
          return item.professionalTypeName === '路基' || item.professionalTypeName === '附属' || item.professionalTypeName === '其他'
        })
      } else {
        return this.allProfessionalTypes.filter(item => {
          return item.professionalTypeName !== '路基' && item.professionalTypeName !== '附属'
        })
      }
    }
  },
  methods: {
    // 获取项目类型
    getAllProjectType() {
      api.getAllProjectType().then(res => {
        this.allProjectType = res.dataList
      })
    },
    // 获取专业类型
    getProfessionalTypes() {
      api.getProfessionalTypes().then(res => {
        this.allProfessionalTypes = res.dataList
      })
    },
    // 获取服务内容
    getServiceContent() {
      api.getServiceContent().then(res => {
        this.allServiceContent = res.dataList
      })
    },
    // 获取软件选择
    getSoftwareSelection() {
      api.getSoftwareSelection().then(res => {
        this.softwareSelectionList = res.dataList
      })
    },
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
    // 上传项目概况图片
    handleProjectOverviewFilesSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.params.projectOverviewFiles.push(res.dataList[0].id)
      } else {
        this.$message.error({ message: res.errorMsg })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleProjectOverviewFilesError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleProjectOverviewFilesRemove(file, fileList) {
      let id = file.response ? file.response.dataList[0].id : file.id
      let index = this.params.projectOverviewFiles.indexOf(id)
      if (index > -1) this.params.projectOverviewFiles.splice(index, 1)
    },
    handleProjectOverviewFilesPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传图纸
    handleDrawingFilesSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.params.drawingFiles.push(res.dataList[0].id)
      } else {
        this.$message.error({ message: res.errorMsg })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleDrawingFilesError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleDrawingFilesRemove(file, fileList) {
      let id = file.response ? file.response.dataList[0].id : file.id
      let index = this.params.drawingFiles.indexOf(id)
      if (index > -1) this.params.drawingFiles.splice(index, 1)
    },
    // 上传标准
    handleStandardFilesSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.params.standardFiles.push(res.dataList[0].id)
      } else {
        this.$message.error({ message: res.errorMsg })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleStandardFilesError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleStandardFilesRemove(file, fileList) {
      let id = file.response ? file.response.dataList[0].id : file.id
      let index = this.params.standardFiles.indexOf(id)
      if (index > -1) this.params.standardFiles.splice(index, 1)
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
    publishBim() {
      // 防止重复点击
      if (this.locked) return false

      if (!this.params.name) return this.$message('请填写您的项目名称')
      if (!this.params.projectType) return this.$message('请选择项目类型')
      if (this.params.professionalTypes.length === 0) return this.$message('请选择专业类型')
      if (!this.params.buildingArea) return this.$message('请填写建筑规模')
      if (this.params.serviceItem.length === 0) return this.$message('请选择服务内容')
      if (this.params.softwareSelection.length === 0) return this.$message('请选择软件')
      if (!this.params.entrustTheSum) return this.$message('请填写委托金额')
      if (!this.params.deliveryDeadline) return this.$message('请选择交付截至日期')
      if (!/^1[345678]\d{9}$/.test(this.params.contactNumber)) return this.$message('请正确填写联系电话')
      if (this.params.drawingFiles.length === 0) return this.$message('请上传图纸')
      if (this.params.remark.length > 2500) return this.$message('项目备注不超2500字')

      // 现场工作为否时，天数赋值0
      if (!this.params.localeWork) {
        this.params.expectWorkDays = 0
      }

      this.params.province = this.provinceSel
      this.params.city = this.citySel
      this.params.district = this.districtSel

      this.locked = true
      if (this.$route.query.flag === 'reuse') {
        this.params.projectBaseId = ''
      }
      api
        .publishBim(this.params)
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
    this.getAllProjectType()
    this.getProfessionalTypes()
    this.getServiceContent()
    this.getSoftwareSelection()
    this.province()
    if (window.sessionStorage.BIMContents) {
      this.params.serviceItem = window.sessionStorage.BIMContents.split(',')
    }
    // 重新编辑
    if (this.$route.query.reEditId) {
      api
        .getInformationAboutRejectedBIMItems(this.$route.query.reEditId)
        .then(res => {
          // if (res.status === '9') {
          this.params = res.dataList[0]
          if (res.dataList[0].projectOverviewFiles.length > 0) {
            res.dataList[0].projectOverviewFiles.forEach(item => (item.url = item.path))
          }
          this.projectOverviewFiles = res.dataList[0].projectOverviewFiles
          this.drawingFiles = res.dataList[0].drawingFiles
          this.standardFiles = res.dataList[0].standardFiles
          this.params.drawingFiles = res.dataList[0].drawingFiles.map(item => item.id)
          this.params.standardFiles = res.dataList[0].standardFiles.map(item => item.id)
          this.params.projectOverviewFiles = res.dataList[0].projectOverviewFiles.map(item => item.id)
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
.spot {
  > label {
    float: left;
    width: 33px;
    height: 33px;
    text-align: center;
    margin-right: 0 !important;
    border: 1px solid #aaa;
  }
  > input {
    float: left;
    width: 366px !important;
    margin-left: -1px;
  }
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
</style>
<style scoped>
#release >>> .el-upload-list--picture-card .el-upload-list__item {
  width: 60px;
  height: 60px;
  border-radius: unset;
}
#release >>> .el-upload--picture-card {
  width: 60px;
  height: 60px;
  line-height: inherit;
  border-radius: inherit;
  border-color: #aaa;
}
#release >>> .el-input__inner {
  border-radius: unset;
  height: 35px;
  border: 1px solid #aaa;
}
</style>
