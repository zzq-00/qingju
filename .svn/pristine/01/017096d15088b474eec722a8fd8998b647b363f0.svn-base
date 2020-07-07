<template>
  <div>
    <div class="add_content" id="add" v-if="!$store.state.addZizhi">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="124px" class="demo-ruleForm" label-position="left" validate-on-rule-change>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入企业名称" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别码" prop="num">
          <el-input v-model="ruleForm.num" placeholder="请输入纳税人识别码" @keyup.native="taxNumberEnter" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="注册地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入注册地址" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="注册电话" prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="请输入注册电话" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName">
          <el-input v-model="ruleForm.bankName" placeholder="请输入开户银行" style="width:500px;"></el-input>
        </el-form-item>
        <el-form-item label="银行账户" prop="bankNum">
          <el-input v-model="ruleForm.bankNum" placeholder="请输入开户行的银行账户" style="width:500px;" @keyup.native="bankAccountEnter"></el-input>
        </el-form-item>
        <div style="clear:both"></div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
import api from '@/fetch/api'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入企业名称'))
      } else {
        api
          .getIVByCompanyName(value)
          .then(res => {
            if (res.errorCode == '200') {
              callback()
            } else {
            }
          })
          .catch(res => {
            callback(new Error('企业信息已存在'))
          })
      }
    }
    var validateLegalpersonNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入法人身份证号码'))
      } else if (!/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value)) {
        return callback(new Error('身份证号码错误！'))
      } else {
        callback()
      }
    }
    var validatebankNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入银行账号'))
      } else {
        let reg = /\d+/g
        let str = value.replace(/\s*/g, '').replace(reg, '')
        if (!str) {
          let arr = value.split('')
          if (arr.length < 8) {
            return callback(new Error('您输入位数不正确，请重新输入！'))
          } else {
            callback()
          }
        } else {
          return callback(new Error('您输入的有误，请重新输入'))
        }
      }
    }
    return {
      showIndex: -1,
      userId: JSON.parse(window.localStorage.QingjuuserId),
      qualificationsList: [], //我的资质列表
      isAdd: true,
      ruleForm: {
        name: '', //企业名称
        num: '', //纳税人识别码
        address: '', //注册地址
        tel: '', //注册电话
        bankName: '', //开户银行
        bankNum: '', //开户账号
        legalperson: '', //法人姓名
        legalpersonNum: '', //法人身份证号码
        positiveUrl: '', //身份证正面
        negativeUrl: '', //身份证背面
        licenseUrl: '', //营业执照
        scansUrl: '' //税务登记扫描件
      },
      card: {
        positiveUrl: '', //身份证正面
        negativeUrl: '', //身份证背面
        licenseUrl: '', //营业执照
        scansUrl: '' //税务登记扫描件
      },
      formImgInfo: new FormData(),
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validatePass }],
        num: [{ required: true, message: '请输入纳税人识别码', trigger: 'blur' }],
        address: [{ required: true, message: '请输入注册地址', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入注册电话', trigger: 'blur' }],
        bankName: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        // bankNum: [{ required: true, message: '请输入开户行的银行账户', trigger: 'blur' }],
        bankNum: [{ required: true, trigger: 'blur', validator: validatebankNum }],
        legalperson: [{ required: true, message: '请输入法人身份证上的姓名', trigger: 'blur' }],
        legalpersonNum: [{ required: true, trigger: 'blur', validator: validateLegalpersonNum }],
        licenseUrl: [{ required: true, message: '请上传营业执照扫描件', trigger: 'blur,change' }],
        scansUrl: [{ required: true, message: '请上传税务登记扫描件', trigger: 'change' }],
        positiveUrl: [{ required: true, message: '请上传证件照片正面', trigger: 'change' }],
        negativeUrl: [{ required: true, message: '请上传证件照片背面', trigger: 'change' }]
      }
    }
  },
  mounted() {
    // this.getMyInvoiceVerificationList() //我的资质列表
  },
  methods: {
    //我的资质列表
    getMyInvoiceVerificationList() {
      api.getMyInvoiceVerificationList().then(res => {
        if (res.dataList) {
          this.qualificationsList = res.dataList
          this.qualificationsList.map(item => {
            if (item.bank.length > 25) {
              item.bank = item.bank.substring(0, 23) + '...'
            }
          })
        }
      })
    },
    // 删除发票资质
    deleteInvoice(id) {
      api.deleteInvoice(id).then(res => {
        if (res.errorCode == '200') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getMyInvoiceVerificationList() //重新获取我的资质
        }
      })
    },
    //设为默认发票抬头
    settingDefault(id) {
      api.setInvoiceVerificationDefault(id).then(res => {
        if (res.errorCode == '200') {
          this.$message({
            message: '设置成功',
            type: 'success'
          })
          this.getMyInvoiceVerificationList() //重新获取我的资质
        }
      })
    },
    taxNumberEnter() {
      if (this.ruleForm.num) {
        this.ruleForm.num = this.ruleForm.num.toUpperCase()
      }
    },
    // 银行账号输入
    bankAccountEnter(e) {
      if (this.ruleForm.bankNum) {
        //
        var Account = this.ruleForm.bankNum.trim()
        //如果是删除按键，则什么都不做
        if (e.keyCode === 8) {
          this.ruleForm.bankNum = Account
          return
        }
        var len = Account.length
        if (len === 4 || len === 9 || len === 14 || len === 19 || len === 24) {
          Account += ' '
          this.ruleForm.bankNum = Account
        }
        //
        let arr = this.ruleForm.bankNum.split('')
        if (arr.length > 30) {
          this.ruleForm.bankNum = this.ruleForm.bankNum.substring(0, 30)
        }
      }
    },
    // 添加发票资质
    // addInvoice() {
    //   this.isAdd = false
    //   this.$store.commit('addWindow', false)
    // },
    enter(i, index) {
      this.showIndex = index
    },
    leave(index) {
      this.showIndex = -1
    },
    // 查看资质详情
    viewDetails(id) {
      this.$router.push({ path: '/myqingju/qualificationDetails', query: { id: id } })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            companyName: this.ruleForm.name, //企业名称
            taxNumber: this.ruleForm.num.toUpperCase(), //纳税人识别码
            registeredAddress: this.ruleForm.address, //注册地址
            registeredTelephone: this.ruleForm.tel, //注册电话
            bank: this.ruleForm.bankName, //开户银行
            bankAccount: this.ruleForm.bankNum.replace(/\s/g, ''), //开户账号
            legalPerson: this.ruleForm.legalperson, //法人姓名
            legalIdCard: this.ruleForm.legalpersonNum, //法人id
            invoiceBusinessFileId: this.ruleForm.licenseUrl, //营业执照扫描件
            invoiceTaxRegistFileId: this.ruleForm.scansUrl, //税务登记扫描件
            personLegalFrontFileId: this.ruleForm.positiveUrl, //身份证正面
            personLegalVersoFileId: this.ruleForm.negativeUrl, //身份证背面
            userId: this.userId
          }
          api
            .auth(data)
            .then(res => {
              if (res.errorCode == '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$store.commit('addWindow', true)
                this.$emit('addzizhi', 'ok')
              } else {
                this.$message.error(res.errorMsg)
              }
            })
            .catch(res => {
              this.$message({
                message: res.errorMsg,
                type: 'error'
              })
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$store.commit('addWindow', true)
      window.location.hash = ''
    }
  }
}
</script>

<style lang='less' scoped>
.title {
  color: #333333;
  font-weight: 700;
  font-size: 14px;
}
.Pro-content1 {
  overflow: hidden;
  .box {
    margin-top: 16px;
    width: 275px;
    height: 225px;
    border: 1px solid #cccccc;
    margin-right: 16px;
    > div:nth-child(1) {
      margin: 0 auto;
      margin-top: 82px;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
    > div:nth-child(2) {
      padding-top: 55px;
      text-align: center;
      p {
        cursor: pointer;
      }
    }
    float: left;
  }
  .list {
    margin-top: 16px;
    float: left;
    width: 276px;
    height: 227px;
    padding: 20px 30px 0 30px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    margin-right: 16px;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      top: 0;
      right: 0;
    }
    //  flex: 1;
    .title {
      color: #333333;
      font-weight: 700;
      font-size: 14px;
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .list-content {
      line-height: 24px;
      margin-top: 15px;
      p {
        font-size: 14px;
      }
      p:nth-child(1),
      p:nth-child(2) {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      p:nth-child(4) {
        color: #ff9966;
        font-weight: 700;
      }
    }

    .footer {
      position: absolute;
      bottom: 7px;
      color: #2fc182;
      font-size: 14px;
      span {
        float: left;
        font-size: 14px;
        margin-right: 10px;
      }
      span:nth-child(1) {
        float: left;
      }
      span:hover {
        cursor: pointer;
      }
    }
  }
  .list:nth-child(3n) {
    margin-right: 0;
  }
}
/* 默认的三个角 */
.icon {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  .title-icon {
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: 15px;
    left: 20px;
    transform: rotate(45deg);
    letter-spacing: 5px;
  }
  &:before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border: 30px solid transparent;
    border-top: 30px solid #00b133;
    border-right: 30px solid #00b133;
  }
}
.add_content {
  margin-top: 30px;
}
</style>


