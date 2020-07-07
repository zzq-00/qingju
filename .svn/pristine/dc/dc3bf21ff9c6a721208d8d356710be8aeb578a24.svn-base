<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color: #F8F9FA;"></breadcrumb>
    <div class="content" v-if="operate">
      <div class="container clearfix">
        <div>
          <h5>召唤小青</h5>
          <div id="release">
            <div>
              <label class="require">项目名称</label>
              <div>
                <input type="text" v-model.trim="params.name" @blur="checkForm($event, params.name)">
                <p class="tips">请填写您的项目名称</p>
              </div>
            </div>
            <div>
              <label class="require">服务内容</label>
              <div>
                <label v-for="(item,index) in RobotService" :key="index">
                  <input type="checkbox" :value="item.id" v-model="params.serviceContents" @change="checkForm($event, params.serviceContents)">
                  <span>{{item.robotService}}</span>
                </label>
                <p class="tips">请选择服务内容</p>
              </div>
            </div>
            <div class="project-type">
              <label class="require">项目类型</label>
              <div class="clearfix">
                <label v-for="(item,index) in allStructTypeList" :key="index" class="fl clearfix">
                  <input style="display: none;" type="radio" :value="item.id" v-model="params.type" @change="checkForm($event, params.type)">
                  <span>{{item.typeName}}</span>
                </label>
                <label class="fl clearfix">
                  <span>其他：</span>
                  <input type="text" class="other-type" v-model.trim="params.typeOther" @focus="params.type=''">
                </label>
                <p class="tips">请选择项目类型</p>
              </div>
            </div>
            <div>
              <label class="require">建筑面积</label>
              <div>
                <input type="number" min="0" v-model.trim="params.buildingArea" @blur="lessThan5000($event, params.buildingArea)"> ㎡
                <p class="tips">请填写建筑面积</p>
              </div>
            </div>
            <div>
              <label class="require">单体个数</label>
              <div>
                <input type="number" min="0" v-model="params.monomerNumber" @blur="checkForm($event, params.monomerNumber)">
                <p class="tips">请填写单体个数</p>
              </div>
            </div>
            <div>
              <label class="require">专业类型</label>
              <div>
                <label v-for="(item, index) in allProjList" :key="index">
                  <input type="checkbox" :disabled="item.disabled" :value="item.pid" v-model="params.professionalTypes" @change="checkForm($event, params.professionalTypes)">
                  <span>{{item.projName}}</span>
                </label>
                <p class="tips">请选择专业类型</p>
              </div>
            </div>
            <!-- <div>
              <label class="require">软件选择</label>
              <div>
                <label>
                  <input type="radio" checked>
                  <span>广联达2013版</span>
                </label>
                <label>
                  <input type="radio" disabled>
                  <span>广联达2018版（即将上线）</span>
                </label>
              </div>
            </div> -->
            <div>
              <label class="require">委托范围</label>
              <div>
                <select v-model="params.commissionScope" @change="checkForm($event, params.commissionScope)">
                  <option v-for="(item,index) in TheScopeOfTheCommission" :key="index" :value="item.id">{{item.name}}</option>
                </select>
                <p class="tips">请选择委托范围</p>
              </div>
            </div>
            <div>
              <label class="require">交付截止日期</label>
              <div>
                <el-date-picker style="width:400px;" v-model="params.deliveryDeadline" type="date" :editable=false :picker-options="pickerOptions">
                </el-date-picker>
                <p class="tips">请选择交付截止日期</p>
              </div>
            </div>
            <div>
              <label class="require">项目地址</label>
              <div>
                <el-cascader v-model="selectedAddressOptions" expand-trigger="hover" :options="addressOptions" :props="addressProps" @active-item-change="handleItemChange" style="line-height: 35px;width: 400px;"></el-cascader>
              </div>
            </div>
            <div>
              <label class="require">联系电话</label>
              <div>
                <input type="text" v-model.trim="params.mobile" @blur="checkForm($event, params.mobile)">
                <p class="tips">请填写您的联系电话</p>
              </div>
            </div>
            <div>
              <label class="require">附件</label>
              <el-upload name="file" :file-list="fileArray" with-credentials multiple :action="httpHead+'FastDFS/fastDFSupload'" :on-success="handleFilesSuccess" :on-error="handleFilesError" :on-remove="handleFilesRemove">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">提示：确认上传的图纸为最终版本，包含CAD图纸、其他与项目相关的资料。</div>
              </el-upload>
            </div>
            <div>
              <label>备注</label>
              <div>
                <textarea v-model.trim="params.remark" rows="7" placeholder="关键要求要明确，针对项目的特殊要求、图纸注意事项、变更说明、软件选择、业务类型、计算模式、规则选用、计算范围、划分要求、软件选择等，可逐条列出"></textarea>
              </div>
            </div>
            <div>
              <label></label>
              <div>
                <el-button type="primary" size="small" style="padding: 9px 25px;" @click="verification">完成召唤</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h4>项目发布说明</h4>
            <p>一、适用范围：
              <br>1、建筑类型：仅限住宅、宿舍、公寓等居住建筑及办公、商业、学校、医院、酒店等公共建筑，暂不支持错层结构及单独地库。
              <br>2、结构形式：框架或剪力墙结构，不支持算量软件不能建模的异型结构造型。
              <br>3、只接受单体建筑整体委托。
              <br>二、图纸标准：
              <br>1、图纸格式：CAD电子版。
              <br>2、图纸深度：不缺张少页，节点详图完整，结构边线、尺寸标注清晰明了。
              <br>3、图纸版本：不支持多版本局部混搭及未体现在图纸中的设计变更。
              <br>三、收费标准
              <br>1、小青结构智能建模收费严格按照平台收费标准执行。活动期间，将按照平台优惠活动价为准。
              <br>2、建筑面积计算规则执行《建筑工程建筑面积计算规范 GB/T 50353-2013》。
              <br>3、考虑委托范围系数、工期调整系数及青矩指数。
              <br>4、单体建筑小于5000㎡的按5000㎡计费。
              <br>四、成果交付标准：
              <br>1、成果文件包括编制说明、工程量汇总表、广联达算量模型。
              <br>2、工程量范围包括主体结构和二次结构，含钢筋、钢筋混凝土、砌体及门窗。
              <br>五、其他说明
              <br>1、结构智能建模不享受平台轻松付功能。
              <br>2、不适用结构智能建模的建筑类型，我们仍采用标准化算量模式实施，执行平台收费标准。
              <br>3、具体适用范围及图纸标准由平台管理员判别。
              <br>4、最终解释权归青矩互联。
            </p>
          </div>
        </div>
      </div>
    </div>
    <no-auth v-else></no-auth>
    <span class="J-operate" v-has="['xY6gn3']"></span>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="540px">
      <span><img src="@/assets/img/warning.png" alt=""> 请确保建筑类型属于常规的剪力墙或框架结构； 请确保提供的CAD图纸尽量规范；若不符合则可能导致订单被驳回。</span>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" @click="publishDesign">确 定</el-button>
        <el-button @click="dialogVisible = false">返回</el-button>
      </div>
    </el-dialog>

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
      gongchengliangCid: 1,
      bieshuId: '31c68e1f6c764f2195527a0b947d5299',
      xiaoxingId: '6a07944aea0a4580bf789b0ff0c99eb6',
      danduId: 'e3a721c315d84d208bfa387f5518b8ac',
      jiegouPid: 'f5dbb1c1ce8a4c5fa6085b73666a721e',
      jianzhuPid: '524fec0555c34e6e9f0b168ee0da5ec0',
      tufangdijiPid: '46dca9ee825043a1a068f856ee537c4b',
      dialogVisible: false,
      RobotService: [],
      allStructTypeList: [],
      TheScopeOfTheCommission: [],
      allProjList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date()
        }
      },
      addressOptions: [],
      addressProps: {
        value: 'code',
        label: 'name',
        children: 'cities'
      },
      selectedAddressOptions: [],
      fileArray: [],
      params: {
        buildingArea: '',
        city: '',
        commissionScope: '', // 委托范围
        dataModel: false,
        deliveryDeadline: '',
        district: '',
        fileIds: [],
        mobile: '',
        monomerNumber: '',
        name: '',
        professionalTypes: [],
        province: '',
        remark: '',
        serviceContents: [],
        type: '',
        typeOther: '' // 其他项目类型
      },
      locked: false
    }
  },
  computed: {
    jianzhumianji: function() {
      return !(this.params.type === this.bieshuId || this.params.type === this.xiaoxingId)
    },
    jianzhuloushu: function() {
      return this.params.type === this.bieshuId || this.params.type === this.xiaoxingId
    }
  },
  methods: {
    GetDateStr(AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1 // 获取当前月份的日期
      var d = dd.getDate()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    },
    // 获取标准工期
    getFs() {
      let date = new Date()
      date = this.GetDateStr(1)
      let timeparams = {
        startDate: new Date(),
        buildNum: 0,
        cad: true,
        date: date,
        itemOrControl: false,
        s: 0
      }
      if (this.params.serviceContents.length === 1 && !this.params.serviceContents.includes(this.gongchengliangCid)) {
        timeparams.itemOrControl = true
      }
      if (this.jianzhumianji) {
        delete timeparams.buildNum
        timeparams.s = this.params.buildingArea || 0
      }
      if (this.jianzhuloushu) {
        delete timeparams.s
        timeparams.buildNum = this.params.buildingFloorNumber || 0
      }
      api.getFs(timeparams).then(res => {
        // 预期天数
        let expectedDays = res.data / 1
        this.Fs = new Date(this.GetDateStr(Math.ceil(expectedDays / 3)))
        this.params.deliveryDeadline = new Date(this.GetDateStr(Number(res.data)))
      })
    },
    // 省市区联动懒加载
    handleItemChange(valArray) {
      this.addressOptions.forEach(item => {
        if (valArray.length === 1 && item.code === valArray[0] && !item.cities.length) {
          api.city(valArray[0]).then(res => {
            res.dataList.forEach(ele => (ele.cities = []))
            item.cities = res.dataList
          })
        } else if (valArray.length === 2 && item.code === valArray[0]) {
          item.cities.forEach(ele => {
            if (ele.code === valArray[1] && !ele.cities.length) {
              api.district(valArray[1]).then(res => (ele.cities = res.dataList))
            }
          })
        }
      })
    },
    // 省份
    province() {
      api.province().then(res => {
        res.dataList.forEach(item => (item.cities = []))
        this.addressOptions = res.dataList
      })
    },
    // 上传附件
    handleFilesSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.params.fileIds.push(res.dataList[0].id)
      } else {
        this.$message.error(res.errorMsg)
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleFilesError(err, file, fileList) {
      this.$message.error(err.errorMsg)
    },
    handleFilesRemove(file, fileList) {
      let id = file.response ? file.response.dataList[0].id : file.id
      let index = this.params.fileIds.indexOf(id)
      if (index > -1) this.params.fileIds.splice(index, 1)
    },
    checkForm(event, value) {
      // 非空提示的显示与隐藏
      const eventTarget = event.target || event.srcElement
      if (eventTarget.parentNode.tagName === 'DIV') {
        eventTarget.parentNode.lastChild.style.display = value ? 'none' : 'block'
      } else if (eventTarget.parentNode.tagName === 'LABEL') {
        eventTarget.parentNode.parentNode.lastChild.style.display = value.length > 0 ? 'none' : 'block'
      }

      this.getFs()
    },
    // 建筑面积小于5000㎡的提示
    lessThan5000(event, value) {
      const eventTarget = event.target || event.srcElement
      if (!value) {
        eventTarget.parentNode.lastChild.innerText = '请填写建筑面积'
        eventTarget.parentNode.lastChild.style.display = 'block'
      } else if (value < 5000 && value > 0) {
        eventTarget.parentNode.lastChild.innerText = '建筑面积不小于5000㎡'
        eventTarget.parentNode.lastChild.style.display = 'block'
      } else {
        eventTarget.parentNode.lastChild.style.display = 'none'
      }
    },
    // 发布前验证
    verification() {
      if (!this.params.name) return this.$message('请填写您的项目名称')
      if (this.params.serviceContents.length == 0) return this.$message('请选择服务内容')
      if (!this.params.type && !this.params.typeOther) return this.$message('请选择或填写项目类型')
      if (!/^\d+(\.\d{0,2})?$/.test(this.params.buildingArea)) return this.$message('请填写建筑面积，且最多包含两位小数')
      if (this.params.buildingArea < 5000) return this.$message('建筑面积不小于5000㎡')
      if (!/^[0-9]+$/.test(this.params.monomerNumber)) return this.$message('请填写单体个数（正整数）')
      if (this.params.professionalTypes.length == 0) return this.$message('请选择专业类型')
      if (!this.params.deliveryDeadline) return this.$message('请选择交付截止日期')
      if (this.selectedAddressOptions.length < 3) return this.$message('请选择项目地址')
      if (!/^1[345678]\d{9}$/.test(this.params.mobile)) return this.$message('请正确填写联系电话')
      if (this.params.fileIds.length === 0) return this.$message('请上传附件')
      if (this.params.remark.length > 2500) return this.$message('项目备注不超2500字')
      this.dialogVisible = true
    },
    // 发布项目
    publishDesign() {
      // 防止重复点击
      if (this.locked) return false
      this.locked = true
      if (this.$route.query.flag === 'reuse') this.params.projectBaseId = ''
      if (this.params.typeOther) this.params.type = ''
      this.params.province = this.selectedAddressOptions[0]
      this.params.city = this.selectedAddressOptions[1]
      this.params.district = this.selectedAddressOptions[2]
      api
        .publishRobot(this.params)
        .then(res => {
          this.$message.success('发布成功')
          setTimeout(() => {
            this.$router.push('/myqingju/project')
          }, 2000)
        })
        .catch(res => {
          this.locked = false
          this.$message.error(res.errorMsg)
        })
    },
    // 获取服务内容
    getRobotService() {
      api.getRobotService().then(res => {
        this.RobotService = res.dataList
        this.params.serviceContents = res.dataList.map(item => item.id)
      })
    },
    // 获取项目类型
    getAllStructType() {
      api.getAllStructType().then(res => {
        this.allStructTypeList = res.dataList.filter(element => {
          return element.id != this.bieshuId && element.id != this.xiaoxingId && element.id != this.danduId
        })
        this.params.type = this.allStructTypeList[0].id
      })
    },
    // 获取专业类型
    getAllProj() {
      api.getAllProj().then(res => {
        res.dataList.forEach(element => {
          element.disabled = !(element.pid === this.jiegouPid || element.pid === this.jianzhuPid)
        })
        // 隐藏"土方及地基工程"
        this.allProjList = res.dataList.filter(item => item.pid !== this.tufangdijiPid)
      })
    },
    // getRobotProjectType() {
    //   api.getRobotProjectType().then(res => {
    //     res.dataList.forEach(element => {
    //       element.type === '钢筋' ? (element.disabled = false) : (element.disabled = true)
    //     })
    //     this.allProjList = res.dataList
    //     this.params.professionalTypes = [res.dataList.find(item => item.type === '钢筋').id]
    //   })
    // },
    // 获取委托范围
    getTheScopeOfTheCommission() {
      api.getTheScopeOfTheCommission().then(res => {
        this.TheScopeOfTheCommission = res.dataList
        this.params.commissionScope = res.dataList[0].id
      })
    }
  },
  mounted() {
    setTimeout(() => {
      if (!window.localStorage.QingjuAccount) return this.$router.push('/login')
    }, 0)
    if (window.localStorage.QingjuTelePhone) this.params.mobile = JSON.parse(window.localStorage.QingjuTelePhone)
    this.province()
    this.getRobotService()
    this.getAllStructType()
    this.getAllProj()
    this.getTheScopeOfTheCommission()
    // 重新编辑
    if (this.$route.query.reEditId) {
      api.rejectRobotEditor(this.$route.query.reEditId).then(res => {
        // if (res.status === '9') {
        this.params = res.dataList[0]
        this.fileArray = res.dataList[0].file
        this.addressOptions.length &&
          this.addressOptions.forEach(item => {
            if (item.code === this.params.province) {
              api.city(this.params.province).then(res => {
                res.dataList.forEach(ele => {
                  if (ele.code === this.params.city) {
                    api.district(this.params.city).then(res => {
                      ele.cities = res.dataList
                      this.selectedAddressOptions = [this.params.province, this.params.city, this.params.district]
                    })
                  }
                })
                item.cities = res.dataList
              })
            }
          })
        // }
      })
    }
    // hack 操作的显示
    let dNoneoperate = document.getElementsByClassName('J-operate')[0]
    if (dNoneoperate && !dNoneoperate.style.display) {
      this.operate = true
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
              width: 150px;
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
textarea {
  width: 530px;
  padding: 5px 10px;
  &::placeholder {
    color: #c0c4cd;
    font-size: 14px;
  }
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
input[type='checkbox']:disabled + span {
  color: #adabab;
}
input[type='radio']:disabled + span {
  color: #adabab;
}
.project-type {
  input[type='radio'] + span {
    float: left;
    height: 30px;
    padding: 0 10px;
    margin-bottom: 10px;
  }
  input[type='radio']:checked + span {
    background-color: #cacaca;
  }
  .other-type {
    border: 0 none;
    border-bottom: 1px solid #aaa;
    width: 90px;
    height: 20px;
  }
}
</style>
<style>
.el-upload-list--picture-card .el-upload-list__item {
  width: 60px;
  height: 60px;
  border-radius: unset;
}
.el-upload--picture-card {
  width: 60px;
  height: 60px;
  line-height: inherit;
  border-radius: inherit;
  border-color: #aaa;
}
.el-input__inner {
  border-radius: unset;
  height: 35px;
  border: 1px solid #aaa;
}
</style>
