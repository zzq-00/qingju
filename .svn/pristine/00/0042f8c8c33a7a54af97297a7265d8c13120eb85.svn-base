<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color: #F8F9FA;"></breadcrumb>
    <div class="content" v-if="operate">
      <div class="container clearfix">
        <div>
          <h5>编制业务</h5>
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
                <label v-for="(item,index) in serviceContent" :key="index">
                  <input type="radio" :value="item.id" v-model="params.serviceContents" @change="checkForm($event, params.serviceContents)">
                  <span>{{item.name}}</span>
                </label>
                <p class="tips">请选择服务内容</p>
              </div>
            </div>
            <div>
              <label class="require">建筑面积</label>
              <div>
                <input type="number" min="0" v-model.trim="params.buildingArea" @change="checkForm($event, params.buildingArea)"> ㎡
                <p class="tips">请填写建筑面积</p>
              </div>
            </div>
            <div>
              <label class="require">专业类型</label>
              <div>
                <label v-for="(item,index) in allProjListFilter" :key="index">
                  <input type="checkbox" v-model="params.professionalTypes" :value="item.pid" @change="checkForm($event, params.professionalTypes)">
                  <span>{{item.projName}}</span>
                </label>
                <p class="tips">请选择专业类型</p>
              </div>
            </div>
            <div>
              <label class="require">是否提供CAD图纸</label>
              <div>
                <label v-for="(item,index) in cadList" :key="index">
                  <input type="radio" :value="item.cid" v-model="params.provideCad" @change="checkForm($event, params.provideCad)">
                  <span>{{item.content}}</span>
                </label>
                <p class="tips">请选择是否提供CAD图纸</p>
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
              <label>是否需要现场办公</label>
              <div class="spot clearfix">
                <label>
                  <input type="checkbox" v-model="params.isOffice">
                </label>
                <input type="text" :disabled="!params.isOffice" placeholder="现场办公地址" v-model.trim="params.officeAddress">
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
              <el-upload name="file" :file-list="fileArray" with-credentials multiple :action="httpHead+'FastDFS/fastDFSupload'" :on-success="handleSuccess" :on-error="handleError" :on-remove="handleRemove">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">提示：确认上传的图纸为最终版本，若修改图纸版本会导致产生额外费用</div>
              </el-upload>
            </div>
            <div>
              <label>备注信息</label>
              <div>
                <textarea v-model.trim="params.description" maxlength="200" rows="7" placeholder="关键要求要明确，针对项目的特殊要求、图纸注意事项、变更说明、软件选择、业务类型、计算模式、规则选用、计算范围、划分要求、软件选择等，可逐条列出"></textarea>
              </div>
            </div>
            <!-- 1:企业下用户 0：企业用户  2：普通用户 '': 老用户-普通普通-->
            <div v-if="!$store.state.userInfo.userCategoryCode || $store.state.userInfo.userCategoryCode === '2'">
              <label>邀请码</label>
              <div>
                <input type="text" v-model.trim="params.friendInvitationCode" ref="friendCodeRef" @input="friendInvitationCodeInput" placeholder="请填写“青友”的邀请码，没有可不填">
              </div>
            </div>
            <div>
              <label></label>
              <div>
                <el-button type="primary" size="small" style="padding: 9px 25px;" @click="publish">发布项目</el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-show="showPrice">
          <dl>
            <dt>
              <span v-if="params.serviceContents == '10'">概算编制</span>
              <span v-else>预算编制</span>
            </dt>
            <dd>
              <span>服务费：</span>
              <span>{{priceObj.originalServiceCharge | formatMoney}}元</span>
            </dd>
            <dd>
              <span>青矩指数：</span>
              <span>{{$store.state.indexNumber}}</span>
            </dd>
            <dd>
              <span>费用小计：</span>
              <span>{{priceObj.countAmount | formatMoney}}元</span>
            </dd>
          </dl>
          <!-- <dl>
            <dd>
              <span>现场工作费：</span>
              <span>{{baseFee.baseMoneyFormat | formatMoney}}元</span>
            </dd>
          </dl> -->
          <dl>
            <dd>
              <span>
                <b>费用预计：</b>
              </span>
              <span>
                <b style="font-size:24px;color:#FF4E33;">{{priceObj.countAmount | formatMoney}}</b> 元
              </span>
            </dd>
            <dd>
              <p>注：此金额含税费，最终以发票金额为准</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <no-auth v-else></no-auth>
    <span class="J-operate" v-has="['n9Erv0']"></span>
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
      serviceContent: [],
      codeLength: 6,
      operate: false,
      breadcrumbs: [{ name: '发布项目', path: this.$route.fullPath }],
      httpHead: process.env.API_ROOT,
      pickerOptions: {
        disabledDate: time => {
          let date = new Date()
          if (date.getDay() == 0) {
            return time.getTime() < new Date(date.setTime(date.getTime() + 24 * 60 * 60 * 1000))
          } else if (date.getDay() == 6) {
            return time.getTime() < new Date(date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * 2))
          } else {
            return time.getTime() < new Date()
          }
        }
      },
      addressOptions: [],
      addressProps: {
        value: 'code',
        label: 'name',
        children: 'cities'
      },
      selectedAddressOptions: [],
      allProjListFilter: [],
      cadList: [],
      fileArray: [],
      friendInvite: false, // 是否有效
      friendLoading: false, //  正在被校验
      params: {
        serviceContentFlag: '',
        buildingArea: '',
        cad: true,
        city: '',
        deliveryDeadline: '',
        description: '',
        district: '',
        fileIds: [],
        friendInvitationCode: '',
        mobile: '',
        name: '',
        isOffice: false,
        officeAddress: '',
        professionalTypes: [],
        provideCad: '340ecfb90d3d4c4fa2267391ddd51fcb',
        province: '',
        serviceContents: '10',
        type: '' // 和serviceContents一样
      },
      computedPrice: {
        area: '', // 面积
        businessTypeId: '', // 业务类型ID
        day: 0, // 现场天数
        index: '', // 青矩指数
        specialtyTypeId: '', // 专业类型ID
        flag: 1 // 区分前后台
      },
      priceObj: {},
      baseFee: '',
      locked: false
    }
  },
  computed: {
    showPrice() {
      return !!this.params.buildingArea && !!this.params.professionalTypes.length
    }
  },
  methods: {
    // 价格计算
    calPlaitFee() {
      this.computedPrice.index = this.$store.state.indexNumber
      api.calPlaitFee(this.computedPrice).then(res => {
        this.priceObj = res.data
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
        } else if (valArray.length === 2) {
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
    // 获取专业类型
    getAllProjPlait() {
      api.getAllProjPlait().then(res => (this.allProjListFilter = res.dataList))
    },
    // 获取编制项目类型
    getPlaitProjectType() {
      api.getPlaitProjectType().then(res => (this.serviceContent = res.dataList))
    },
    // 获取发布项目列表系数 =》 CAD图纸
    getAllCoefficient() {
      api.getAllCoefficient().then(res => {
        this.cadList = res.dataList.filter(item => item.type === '2')
      })
    },
    handleSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.params.fileIds.push(res.dataList[0].id)
      } else {
        this.$message.error({ message: res.errorMsg })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleRemove(file, fileList) {
      let id = file.response ? file.response.dataList[0].id : file.id
      let index = this.params.fileIds.indexOf(id)
      if (index > -1) this.params.fileIds.splice(index, 1)
    },
    checkForm(event, value) {
      // 非空提示的显示与隐藏
      const eventTarget = event.target || event.srcElement
      if (eventTarget.parentNode.tagName === 'DIV') {
        eventTarget.parentNode.lastChild.style.display = value !== '' ? 'none' : 'block'
      } else if (eventTarget.parentNode.tagName === 'LABEL') {
        eventTarget.parentNode.parentNode.lastChild.style.display = value.length > 0 ? 'none' : 'block'
      }

      if (this.showPrice) {
        if (!/^\d+(\.\d{0,2})?$/.test(this.params.buildingArea)) return this.$message('建筑面积最多包含两位小数')
        this.computedPrice.area = this.params.buildingArea
        this.computedPrice.businessTypeId = this.params.serviceContents
        this.computedPrice.specialtyTypeId = this.params.professionalTypes
        this.calPlaitFee()
      }
    },
    // 发布项目
    publish() {
      // 防止重复点击
      if (this.locked) return false
      // 表单验证
      if (!this.params.name) return this.$message('请填写您的项目名称')
      if (!this.params.serviceContents) return this.$message('请选择服务内容')
      if (!/^\d+(\.\d{0,2})?$/.test(this.params.buildingArea)) return this.$message('请填写建筑面积，且最多包含两位小数')
      if (this.params.buildingArea <= 0) return this.$message('建筑面积不得小于0')
      if (this.params.professionalTypes.length === 0) return this.$message('请选择专业类型')
      if (!this.params.provideCad) return this.$message('请选择是否有CAD图纸')
      if (!this.params.deliveryDeadline) return this.$message('请选择交付截止日期')
      if (this.params.isOffice && !this.params.officeAddress) return this.$message('请输入现场办公地址')
      if (this.selectedAddressOptions.length < 3) return this.$message('请选择项目地址')
      if (!/^1[345678]\d{9}$/.test(this.params.mobile)) return this.$message('请正确填写联系电话')
      if (this.params.fileIds.length === 0) return this.$message('请上传附件')
      if (this.params.description.length > 2500) return this.$message('项目描述不超2500字')
      if (this.params.friendInvitationCode && this.params.friendInvitationCode.length && this.params.friendInvitationCode.length < this.codeLength) {
        return this.$message('请输入正确的邀请码')
      }
      if (this.params.friendInvitationCode && this.friendLoading) {
        return this.$message('邀请码校验中...')
      }
      if (!this.friendLoading && this.params.friendInvitationCode && this.params.friendInvitationCode.length && !this.friendInvite) {
        return '请输入正确的邀请码'
      }

      this.locked = true

      // 现场工作为否时，清空地址
      if (!this.params.isOffice) this.params.officeAddress = ''

      // 是否提供CAD图纸
      if (this.params.provideCad === '340ecfb90d3d4c4fa2267391ddd51fcb') {
        this.params.cad = true
      } else if (this.params.provideCad === '8a2aede8f973428bab5298d94d8d62c2') {
        this.params.cad = false
      }

      // 省市区的选择
      this.params.province = this.selectedAddressOptions[0]
      this.params.city = this.selectedAddressOptions[1]
      this.params.district = this.selectedAddressOptions[2]
      this.params.type = this.params.serviceContents
      if (this.$route.query.flag === 'reuse') this.params.projectBaseId = ''
      api
        .publishEstablishment(this.params)
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
    friendInvitationCodeInput() {
      let code = this.params.friendInvitationCode
      this.friendLoading = true
      if (code.length == this.codeLength) {
        api
          .invitationCodeAndIsFriend(code)
          .then(res => {
            this.friendInvite = true
            this.$message.success('邀请码正确')
          })
          .catch(err => {
            this.friendInvite = false
            this.params.friendInvitationCode = ''
            this.$message.error(err.errorMsg)
          })
          .finally(() => {
            // 校验完成
            this.friendLoading = false
          })
      } else {
        this.friendLoading = false
      }
    }
  },
  mounted() {
    // 当天指数
    if (!this.$store.state.indexNumber) {
      this.$store.dispatch('getIndexNumber', 1)
    }
    setTimeout(() => {
      if (!window.localStorage.QingjuAccount) return this.$router.push('/login')
    }, 0)
    if (window.localStorage.QingjuTelePhone) this.params.mobile = JSON.parse(window.localStorage.QingjuTelePhone)
    this.province()
    this.getAllProjPlait()
    this.getPlaitProjectType()
    this.getAllCoefficient()
    // hack 操作的显示
    let dNoneoperate = document.getElementsByClassName('J-operate')[0]
    if (dNoneoperate && !dNoneoperate.style.display) {
      this.operate = true
    }
    if (window.sessionStorage.establishmentContents) {
      this.params.serviceContents = window.sessionStorage.establishmentContents
    }
    // 重新编辑
    if (this.$route.query.reEditId) {
      api.getInformationAboutRejectedItems(this.$route.query.reEditId).then(res => {
        this.params = res.dataList[0]
        this.params.serviceContents = res.dataList[0].type
        this.params.isOffice = res.dataList[0].localeWork
        // 邀请码
        if (this.params.friendInvitationCode) this.friendInvitationCodeInput()
        // 附件
        this.fileArray = res.dataList[0].file
        // 计算价格
        this.computedPrice.area = res.dataList[0].buildingArea
        this.computedPrice.businessTypeId = res.dataList[0].type
        this.computedPrice.specialtyTypeId = res.dataList[0].professionalTypes
        this.calPlaitFee()
        // 省市区
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
                  } else {
                    ele.cities = []
                  }
                })
                item.cities = res.dataList
              })
            }
          })
      })
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
                margin-right: 20px;
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
        background-color: #fff;
        font-size: 14px;
        box-shadow: 1px 1px 4px 0px #ddd;
        position: sticky;
        top: 181px;
        > dl {
          padding: 15px 25px;
          line-height: 30px;
          dt {
            margin-left: -10px;
            > span {
              color: #fff;
              padding: 3px 9px;
              border-radius: 3px;
            }
          }
          dd {
            display: flex;
            justify-content: space-between;
            > p {
              color: #666;
              font-style: italic;
              font-size: 12px;
            }
          }
          & + dl {
            border-top: 1px dashed #ddd;
          }
          &:nth-child(1) {
            > dt {
              > span {
                background-color: #e0972a;
              }
            }
          }
          &:nth-child(2) {
            > dt {
              > span {
                background-color: #e92634;
              }
            }
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
.project-type {
  input[type='radio'] + span {
    display: inline-block;
    height: 30px;
    padding: 0 10px;
    margin-bottom: 10px;
  }
  input[type='radio']:checked + span {
    background-color: #cacaca;
  }
  .other-type {
    width: 90px;
    height: 20px;
    border-top: 0 none;
    border-left: 0 none;
    border-right: 0 none;
  }
}
</style>
<style scoped>
#release >>> .el-input__inner {
  border-radius: unset;
  height: 35px;
  border: 1px solid #aaa;
}
</style>
