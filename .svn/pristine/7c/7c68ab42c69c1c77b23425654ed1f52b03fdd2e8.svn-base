<template>
  <div style="background:#fff;position:absolute;bottom:0;left:0;top:0;right:0">
    <headerComponent></headerComponent>
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color:#fff;margin-top: 70px;padding:23px 30px" />
    <div class="container">
      <div class="leftBox">
        <div class="start">
          <span>开票项目</span>
          <span @click="selection">重选开票项目</span>
          <div style="clear:both"></div>
        </div>
        <ul>
          <li v-for="(i,index) in ticketPro" :key="index">
            <span>{{i.name}}</span>
            <span>{{i.actualProjectCost}}元</span>
            <span @click="clickDel(index)">删除</span>
            <div style="clear:both"></div>
          </li>
        </ul>
        <div class="tick_info">
          <p>发票信息</p>
          <div>
            <span>{{ruleFormType}}</span>
            <span>{{invoiceCompany}}</span>
            <span>咨询费</span>
          </div>

          <span class='info_modify' @click="modify">修改</span>
        </div>
        <div class="adressInfo">
          <div class="tit">
            <div>邮寄地址</div>
            <div @click="addNewadress">添加收货地址</div>
          </div>
          <div class="addressList">
            <div :style="{height: activeHight + 'px' }">
              <div v-for="(item,index) in addressList" :key="index" style="display:flex;">
                <div>
                  <el-radio @change='setDefaultAddress(item.id)' v-model="radio" :label="index+1">姓名&nbsp;&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;&nbsp;电话&nbsp;&nbsp;&nbsp;{{item.phone}}&nbsp;&nbsp;&nbsp;{{item.chineseAddress}}&nbsp;&nbsp;{{item.detailAddress}}</el-radio>
                </div>
                <p v-if="item.isDefault==='1'">默认地址</p>
              </div>
            </div>
            <div>
              <span @click="getmoreAddress">更多地址</span><img @click="getmoreAddress" src="../../assets/img/u4672.png" alt="">
            </div>
          </div>
        </div>
        <div class="tick_remark">
          <p>开票备注</p>
          <el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="textarea">
          </el-input>
        </div>
        <div class="leftFooter">
          <el-button type="primary" @click='submission'>提交申请</el-button>
        </div>
      </div>
      <div class="rightBox">
        <div class="title">
          <img src="../../assets/img/ticket.png" alt="">
          <span>开票注意事项</span>
        </div>
        <ul>
          <li>1.项目完成后才能申请该项目发票</li>
          <li>2.申请开票时，请填写准确无误的信息</li>
          <li>3.一个项目只能开一次发票，且发票金额是实际交易金额</li>
          <li>4.申请普通发票，请填写发票抬头；申请增值税发票，请先申请认证开票资质</li>
          <li>5.提交发票审核前，请确认发票邮寄信息准确无误。一旦提交申请，不能修改</li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="800px">
      <div class="dialog-list">
        <span>*</span>
        <span>姓名</span>
        <el-input class="inp" v-model="form.name" placeholder="请输入联系人姓名"></el-input>
      </div>
      <div class="dialog-list">
        <span>*</span>
        <span>电话</span>
        <el-input class="inp" v-model="form.telephone" placeholder="请输入联系人电话"></el-input>
      </div>
      <div class="dialog-list">
        <span>*</span>
        <span>收货地址</span>
        <el-select v-model="provinceSel" style="width:160px">
          <el-option v-for="(item,index) in provinceList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select v-model="citySel" style="width:160px">
          <el-option v-for="(item,index) in cityList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select v-model="districtSel" style="width:160px">
          <el-option v-for="(item,index) in districtList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </div>
      <div class="dialog-list">
        <span style="float:left">*</span>
        <span style="float:left;margin-left:5px;">详细地址</span>
        <textarea type="textarea" style="" v-model="form.address" clearable :maxlength='60' placeholder="请输入详细地址，字数勿超过60" class="text_area"></textarea>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="addReceiveAddress">确 定</el-button>
        <el-button style="margin-left:30px;" @click="dialogFormVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogVisible" width="500px">
      <h4 class='info_title'>发票信息</h4>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="发票类型" prop="type" style="text-align:left">
          <el-radio-group v-model="ruleForm.type" style="width:100%">
            <el-radio label="1">增值税普通发票</el-radio>
            <el-radio label="2">增值税专用发票</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头" prop="rise" style="margin-bottom:0px;">
          <el-select v-model="ruleForm.rise" placeholder="请选择发票抬头" @change="changeInfo(ruleForm.rise)">
            <el-option :label="item.companyName" :value="item.invoiceVerificationId" v-for="(item,index) in riseList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <span @click='addQualifications' style="font-size: 12px;color: #0066CC;" class="add_tick">添加开票资质</span>
        <el-form-item label="纳税人识别号" prop="taxNumber">
          <el-input v-model="qualifications.taxNumber" placeholder="自动匹配纳税人识别号" :disabled="true"></el-input>
        </el-form-item>
        <div v-if="ruleForm.type=='1'">
          <el-form-item label="发票信息" prop="info">
            <el-input v-model="ruleForm.info" placeholder="咨询费" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">确定</el-button>
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </div>
        <div v-if="ruleForm.type=='2'">
          <el-form-item label="注册地址" prop="registeredAddress">
            <el-input v-model="qualifications.registeredAddress" placeholder="请输入注册地址" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="注册电话" prop="registeredTelephone">
            <el-input v-model="qualifications.registeredTelephone" placeholder="请输入注册电话" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="bank">
            <el-input v-model="qualifications.bank" placeholder="请输入开户银行" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="银行账户" prop="bankAccount">
            <el-input v-model="qualifications.bankAccount" placeholder="请输入银行账户" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="发票信息" prop="info">
            <el-input v-model="ruleForm.info" placeholder="咨询费" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">确定</el-button>
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import headerComponent from '@/components/qingjuHeader'
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'

export default {
  components: {
    headerComponent,
    breadcrumb
  },
  data() {
    return {
      provinceList: [], //省份列表
      provinceSel: '',
      cityList: [], //城市列表
      citySel: '',
      districtList: [], //区县列表
      districtSel: '',
      ticketPro: JSON.parse(window.localStorage.proArr),
      userId: JSON.parse(window.localStorage.QingjuuserId),
      breadcrumbs: [{ name: '发票管理', path: '/myqingju/billManage' }, { name: '申请开票', path: this.$route.fullPath }],
      activeHightFlag: false,
      addressList: [],
      activeHight: 32,
      formLabelWidth: '120px',
      radio: '',
      dialogFormVisible: false,
      form: {
        name: '', //姓名
        telephone: '', //电话
        provinceSel: '', //省
        citySel: '', //市
        districtSel: '', //区
        address: '' //详细地址
      },
      sendData: {
        addressId: ''
      },
      textarea: '', //开票备注
      dialogVisible: false, //修改发票信息
      ruleFormType: '增值税普通发票', //默认发票类型
      invoiceCompany: '', //默认发票抬头
      ruleForm: {
        type: '1', //默认发票类型
        rise: '', //发票抬头
        taxNumber: '', //纳税人识别号
        registeredAddress: '', //注册地址
        registeredTelephone: '', //注册电话
        bank: '', //开户银行
        bankAccount: '', //银行账户
        info: '咨询费' //发票信息
      },
      riseList: [], //发票抬头列表
      qualifications: '', //资质信息
      rules: {
        type: [{ required: true, message: '请选择发票类型', trigger: 'change' }],
        rise: [{ required: true, message: '请选择发票抬头', trigger: 'change' }],
        registeredAddress: [{ required: true, message: '请输入注册地址', trigger: 'blur' }],
        registeredTelephone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        taxNumber: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }],
        info: [{ required: true, message: '请选择发票信息', trigger: 'change' }],
        bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入银行账户', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //   删除开票项目
    clickDel(index) {
      this.ticketPro.splice(index, 1)
    },
    //   取消
    resetForm() {
      this.dialogVisible = false
    },
    //   重新选择抬头
    changeInfo(rise) {
      api.getInvoiceVerificationInfo(rise).then(res => {
        this.qualifications = res.dataList[0]
      })
    },
    //   重新选择开票项目
    selection() {
      this.$router.push('/myqingju/billManage')
    },
    //展开地址列表 //  30为 单个列表高度
    getmoreAddress() {
      this.activeHightFlag = ~this.activeHightFlag
      if (!this.activeHightFlag) {
        this.activeHight = 32
      } else {
        this.activeHight = 30 * this.addressList.length
      }
    },
    //设置默认地址
    setDefaultAddress(id) {
      // api.setDefaultAddress(id).then(res => {
      //   this.sendData.addressId = id // 获取默认地址 ID
      //   setTimeout(() => {
      //     this.getAddressList()
      //     this.radio = 1
      //   }, 500)
      // })
      this.sendData.addressId = id
    },
    // 地址列表
    getAddressList() {
      if (this.userId) {
        api.getAddressList(this.userId).then(res => {
          this.addressList = res.dataList
          if (this.addressList.length > 0) {
            this.radio = 1
          }
          this.addressList.map(item => {
            if (item.isDefault == '1') {
              this.sendData.addressId = item.id // 获取默认地址 ID
              return
            } else {
              this.sendData.addressId = this.addressList[0].id // 获取默认地址 ID
            }
          })
        })
      } else {
        this.$message('请重新登录')
      }
    },
    //修改发票信息
    modify() {
      this.dialogVisible = true
    },
    //添加收货地址
    addNewadress() {
      this.form = new Object()
      this.dialogFormVisible = true
      this.provinceSel = ''
      this.citySel = ''
      this.districtSel = ''
    },
    // 添加收货地址
    addReceiveAddress() {
      this.form.provinceSel = this.provinceSel
      this.form.citySel = this.citySel
      this.form.districtSel = this.districtSel
      if (!this.form.name) {
        this.$message.error('请输入收货人姓名')
      } else if (!this.form.telephone) {
        this.$message.error('请输入收货人电话')
      } else if (!this.form.provinceSel) {
        this.$message.error('请选择省份')
      } else if (!this.form.citySel) {
        this.$message.error('请选择城市')
      } else if (!this.form.districtSel) {
        this.$message.error('请选择区县')
      } else if (!this.form.address) {
        this.$message.error('请输入具体地址')
      } else {
        let data = {
          detailAddress: this.form.address,
          name: this.form.name,
          phone: this.form.telephone,
          userId: this.userId,
          city: this.form.citySel,
          district: this.form.districtSel,
          province: this.form.provinceSel,
          
        }
        api.addReceiveAddress(data).then(res => {
          this.dialogFormVisible = false
          this.activeHight = 32
          this.getAddressList()
        })
      }
    },
    // 发票抬头列表
    getInvoiceTitle() {
      api.getInvoiceTitle().then(res => {
        this.riseList = res.dataList
        for (let index = 0; index < this.riseList.length; index++) {
          if (this.riseList[index].defaultOption == 'true') {
            this.ruleForm.rise = this.riseList[index].invoiceVerificationId
            this.invoiceCompany = this.riseList[index].companyName
          }
          if (this.riseList[index].defaultOption != 'true') {
            this.ruleForm.rise = res.dataList[0].invoiceVerificationId
            this.invoiceCompany = res.dataList[0].companyName
          }
        }
        // 资质详情
        if (this.ruleForm.rise) {
          api.getInvoiceVerificationInfo(this.ruleForm.rise).then(res => {
            this.qualifications = res.dataList[0]
          })
        }
      })
    },
    // 提交申请
    submission() {
      if (this.ticketPro.length == 0) {
        this.$message({
          message: '开票项目不能为空',
          type: 'warning'
        })
        return false
      }
      if (!this.ruleFormType || !this.invoiceCompany) {
        this.$message({
          message: '请补全发票信息',
          type: 'warning'
        })
        return false
      }
      if (!this.radio) {
        this.$message({
          message: '邮寄地址不能为空',
          type: 'warning'
        })
        return false
      }
      let data = {
        addressId: this.sendData.addressId, //地址id
        invoiceInfo: '咨询费', //发票信息
        invoiceType: this.ruleForm.type, //发票类型
        invoiceVerificationId: this.ruleForm.rise,
        remark: this.textarea, //备注
        simpleProjectInfos: this.ticketPro, //开票项目
        title: this.invoiceCompany
      }
      api
        .applyInvoice(data)
        .then(res => {
          if (res.errorCode == '200') {
            this.$router.push('/myqingju/billManage')
          }
        })
        .catch(res => {
          this.$message.error('申请开票失败，请重新操作')
        })
    },
    // 添加开票资质
    addQualifications() {
      this.$router.push({ path: '/myqingju/billManage', query: { name: '跳转' } })
    },
    // 发票信息确认
    submitForm() {
      this.riseList.map(item => {
        if (this.ruleForm.rise == item.invoiceVerificationId) {
          window.localStorage.invoiceCompany = item.companyName
          this.invoiceCompany = item.companyName
        }
      })
      window.localStorage.invoiceType = this.ruleForm.type
      if (this.ruleForm.type == 1) {
        this.ruleFormType = '增值税普通发票'
      }
      if (this.ruleForm.type == 2) {
        this.ruleFormType = '增值税专用发票'
      }
      this.dialogVisible = false
    },
    // 获取省份
    province() {
      api.province().then(res => {
        this.provinceList = res.dataList
        this.provinceSel = res.dataList[0].code
        this.form.provinceSel = res.dataList[0].code
      })
    },
    // 获取城市
    city() {
      api.city(this.provinceSel).then(res => {
        this.cityList = res.dataList
        this.citySel = res.dataList[0].code
        this.form.citySel = res.dataList[0].code
      })
    },
    // 获取区县
    district() {
      api.district(this.citySel).then(res => {
        this.districtList = res.dataList
        this.districtSel = res.dataList[0].code
        this.form.districtSel = res.dataList[0].code
      })
    }
  },
  mounted() {
    this.getAddressList() //地址列表
    this.getInvoiceTitle() //发票抬头列表
    this.province() //省份列表
  },
  watch: {
    provinceSel: function(newVal, oldVal) {
      if (newVal != '') {
        this.city()
      }
    },
    citySel: function(newVal, oldVal) {
      if (newVal != '') {
        this.district()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto 100px;
  padding: 0 30px;
}
.leftBox {
  float: left;
  width: 850px;
  .start {
    margin-top: 30px;
    span {
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
    }
    span:nth-child(1) {
      float: left;
      color: #333333;
    }
    span:nth-child(2) {
      float: right;
      font-style: normal;
      font-size: 12px;
      color: #0066cc;
      cursor: pointer;
    }
  }
  ul {
    margin-top: 15px;
    background: rgba(243, 243, 243, 1);
    padding: 15px;
    li {
      margin-bottom: 15px;
      span:nth-child(1) {
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
        float: left;
        display: inline-block;
        width: 55%;
      }
      span:nth-child(2) {
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        float: left;
      }
      span:nth-child(3) {
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        color: #666666;
        float: right;
        cursor: pointer;
      }
    }
  }
  .tick_info {
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
    p {
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      color: #333333;
      margin: 20px 0;
    }
    div {
      display: inline-block;
      span {
        font-style: normal;
        font-size: 14px;
        color: #666666;
        line-height: 30px;
        font-weight: bold;
        margin-right: 15px;
      }
    }
    .info_modify {
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #0066cc;
      text-align: right;
      cursor: pointer;
    }
  }
  > .adressInfo {
    > .tit {
      display: flex;
      justify-content: space-between;
      padding: 18px 0;
      box-sizing: border-box;
      div {
        &:nth-child(1) {
          font-size: 14px;
          color: #333333;
          font-weight: bold;
        }
        &:nth-child(2) {
          font-size: 12px;
          color: #0066cc;
          font-weight: bold;
        }
        &:nth-child(2):hover {
          cursor: pointer;
        }
      }
    }
    > .addressList {
      > div {
        &:nth-child(1) {
          overflow: hidden;
          transition: height 0.5s;
          p {
            margin-top: 4px;
            margin-left: 10px;
            font-size: 12px;
            color: #ffffff;
            width: 60px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: rgba(153, 153, 153, 1);
          }
          > div {
            line-height: 30px;
            height: 30px;
          }
        }
        &:nth-child(2) {
          font-size: 12px;
          font-weight: 700;
          span:hover {
            cursor: pointer;
          }
          img:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  .tick_remark {
    p {
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      color: #333333;
      margin: 20px 0;
    }
  }
  .leftFooter {
    margin-top: 25px;
    text-align: right;
  }
}
.rightBox {
  float: right;
  width: 320px;
  .title {
    margin-bottom: 15px;
    img {
      margin-left: 10px;
    }
    span {
      font-weight: bold;
      font-style: normal;
      font-size: 18px;
      color: #333333;
      margin-left: 15px;
    }
  }
  ul {
    li {
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #666666;
      line-height: 30px;
      font-weight: bold;
    }
  }
}
.info_title {
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
}
.add_tick {
  display: block;
  text-align: center;
  font-size: 12px;
  color: rgb(0, 102, 204);
  cursor: pointer;
}
.dialog-list {
  margin-bottom: 15px;
  span:nth-child(1) {
    color: red;
  }
  span:nth-child(2) {
    width: 100px;
    display: inline-block;
  }
  .inp {
    width: 360px;
  }
  .text_area {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: 0;
    padding: 10px 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 489px;
    height: 80px;
    font-weight: 400;
    margin-left: 3px;
  }
  textarea::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 14px;
    font-weight: 400;
  }
  textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #aab2bd;
    font-size: 14px;
    font-weight: 400;
  }
  textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #aab2bd;
    font-size: 14px;
    font-weight: 400;
  }
  textarea:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #aab2bd;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
