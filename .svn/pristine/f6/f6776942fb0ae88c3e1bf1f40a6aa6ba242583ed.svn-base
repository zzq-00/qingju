<template>
  <div class="two-form">
    <div class="form-input">
      <input type="text" placeholder="请输入您的企业名称" v-model="twoform.name" @blur="blurName">
      <img src="@/assets/img/ok.png" alt="" v-if="nameOK">
    </div>
    <p class="tips">{{nameTips}}</p>
    <div class="form-input">
      <input type="text" placeholder="请输入纳税人识别号" v-model="twoform.identificationCode" @blur="blurIdentificationCode" @keyup="Verification()">
      <img src="@/assets/img/ok.png" alt="" v-if="identificationCodeOK">
    </div>
    <p class="tips">{{identificationCodeTips}}</p>
    <div class="form-input">
      <input type="text" placeholder="请输入注册地址" v-model="twoform.address" @blur="blurAddress">
      <img src="@/assets/img/ok.png" alt="" v-if="addressOK">
    </div>
    <p class="tips">{{addressTips}}</p>
    <div class="form-input">
      <input type="text" placeholder="请输入注册电话" v-model="twoform.phone" @blur="blurPhone">
      <img src="@/assets/img/ok.png" alt="" v-if="phoneOK">
    </div>
    <p class="tips">{{phoneTips}}</p>
    <div class="form-input">
      <input type="text" placeholder="请输入开户银行" v-model="twoform.bank" @blur="blurBank" @keyup="bankEnter">
      <img src="@/assets/img/ok.png" alt="" v-if="bankOK">
    </div>
    <p class="tips">{{bankTips}}</p>
    <div class="form-input">
      <input type="text" placeholder="请输入银行账号" v-model="twoform.bankAccount" @blur="blurBankAccount" @keyup="bankAccountEnter">
      <img src="@/assets/img/ok.png" alt="" v-if="bankAccountOK">
    </div>
    <p class="tips">{{bankAccountTips}}</p>
    <span class="upload-span">上传营业执照</span>
    <div class="upload-btn" style="display:inline-block">
      <el-upload name="files" :file-list="fileList" with-credentials multiple :action="httpHead+'file/addUploadAuthFile'" :on-success="handleSuccess" :on-error="handleError" :on-remove="handleRemove">
        <el-button size="small" type="primary">选择文件</el-button>
      </el-upload>
    </div>
    <p class="tips">{{fileTips}}</p>
    <button class="register-btn" @click="registration">立 即 注 册</button>
  </div>
</template>
<script>
import api from '@/fetch/api'
import jsons from '@/assets/SensitiveWords'
export default {
  data() {
    return {
      httpHead: process.env.API_ROOT,
      twoform: {
        name: '', //企业名称
        identificationCode: '', //纳税人识别码
        address: '', //注册地址
        phone: '', //注册电话
        bank: '', //开户银行
        bankAccount: '', //银行账号
        businessFileId: [] //营业执照附件信息
      },
      nameTips: '', //企业名称下的提示
      identificationCodeTips: '',
      addressTips: '',
      phoneTips: '',
      bankTips: '',
      bankAccountTips: '',
      fileTips: '', //上传文件提示
      nameOK: false, //企业名称输入完成
      identificationCodeOK: false,
      addressOK: false,
      phoneOK: false,
      bankOK: false,
      bankAccountOK: false,
      fileList: []
    }
  },
  watch: {
    name(val, oldVal) {
      if (val) {
        this.nameTips = ''
        this.nameOK = false
      }
    },
    identificationCode(val, oldVal) {
      if (val) {
        this.identificationCodeTips = ''
        this.identificationCodeOK = false
      }
    },
    address(val, oldVal) {
      if (val) {
        this.addressTips = ''
        this.addressOK = false
      }
    },
    phone(val, oldVal) {
      if (val) {
        this.phoneTips = ''
        this.phoneOK = false
      }
    },
    bank(val, oldVal) {
      if (val) {
        this.bankTips = ''
        this.bankOK = false
      }
    },
    bankAccount(val, oldVal) {
      if (val) {
        this.bankAccountTips = ''
        this.bankAccountOK = false
      }
    },
    businessFileId(val, oldVal) {
      if (val) {
        this.fileTips = ''
      }
    }
  },
  computed: {
    name() {
      return this.twoform.name
    },
    identificationCode() {
      return this.twoform.identificationCode
    },
    address() {
      return this.twoform.address
    },
    phone() {
      return this.twoform.phone
    },
    bank() {
      return this.twoform.bank
    },
    bankAccount() {
      return this.twoform.bankAccount
    },
    businessFileId() {
      return this.twoform.businessFileId
    }
  },
  methods: {
    // 敏感词判断
    SensitiveWords(str, val) {
      let isPass = false
      jsons.dataList.map(item => {
        if (str.indexOf(item) != -1) {
          if (val == 'name') {
            this.nameTips = '名称包含敏感词,请重新输入'
          }
          if (val == 'address') {
            this.addressTips = '地址包含敏感词,请重新输入'
          }
          isPass = true
        }
      })
      return isPass
    },
    // 税号输入判断
    Verification() {
      let reg = /[^a-zA-Z0-9]/g //匹配所有非数字非字母的字符
      this.twoform.identificationCode = this.twoform.identificationCode.replace(reg, '')
      this.twoform.identificationCode = this.twoform.identificationCode.toUpperCase() //将所有小写字母转换为大写
    },
    // 银行名称输入
    bankEnter() {
      if (this.twoform.bank) {
        let arr = this.twoform.bank.split('')
        if (arr.length > 25) {
          this.twoform.bank = this.twoform.bank.substring(0, 25)
        }
      }
    },
    // 银行账号输入
    bankAccountEnter(e) {
      if (this.twoform.bankAccount) {
        //
        var Account = this.twoform.bankAccount.trim()
        //如果是删除按键，则什么都不做
        if (e.keyCode === 8) {
          this.twoform.bankAccount = Account
          return
        }
        var len = Account.length
        if (len === 4 || len === 9 || len === 14 || len === 19 || len === 24) {
          Account += ' '
          this.twoform.bankAccount = Account
        }
        //
        let arr = this.twoform.bankAccount.split('')
        if (arr.length > 30) {
          this.twoform.bankAccount = this.twoform.bankAccount.substring(0, 30)
        }
      }
    },
    blurName() {
      if (this.twoform.name) {
        let arr = this.twoform.name.split('')
        if (arr.length <= 30) {
          if (this.SensitiveWords(this.twoform.name, 'name')) return
          api
            .verifyMessage({
              company: this.twoform.name,
              callMethod: ''
            })
            .then(res => {
              this.nameTips = ''
              this.nameOK = true
            })
            .catch(res => {
              this.nameTips = res.errorMsg
              this.nameOK = false
            })
        } else {
          this.nameTips = '公司名称不可超过30字,请重新输入'
          this.nameOK = false
        }
      } else {
        this.nameTips = '请输入公司名称'
        this.nameOK = false
      }
    },
    blurIdentificationCode() {
      if (this.twoform.identificationCode) {
        let arr = this.twoform.identificationCode.split('')
        if (arr.length != 15 && arr.length != 17 && arr.length != 18 && arr.length != 20) {
          this.identificationCodeTips = '您输入的位数不正确，请重新输入'
          this.identificationCodeOK = false
        }
        if (arr.length == 15 || arr.length == 17 || arr.length == 18 || arr.length == 20) {
          api
            .verifyMessage({
              taxNumber: this.twoform.identificationCode,
              callMethod: ''
            })
            .then(res => {
              this.identificationCodeTips = ''
              this.identificationCodeOK = true
            })
            .catch(res => {
              this.identificationCodeTips = res.errorMsg
              this.identificationCodeOK = false
            })
        }
      } else {
        this.identificationCodeTips = '请输入纳税人识别号'
        this.identificationCodeOK = false
      }
    },
    blurAddress() {
      if (this.twoform.address) {
        let arr = this.twoform.address.split('')
        if (arr.length <= 80) {
          if (this.SensitiveWords(this.twoform.address, 'address')) return
          this.addressTips = ''
          this.addressOK = true
        } else {
          this.addressTips = '注册地址不能超过80字,请重新输入'
          this.addressOK = false
        }
      } else {
        this.addressTips = '请输入注册地址'
        this.addressOK = false
      }
    },
    blurPhone() {
      if (this.twoform.phone) {
        this.phoneTips = ''
        this.phoneOK = true
      } else {
        this.phoneTips = '请输入注册电话'
        this.phoneOK = false
      }
    },
    blurBank() {
      if (this.twoform.bank) {
        let regs = /[\u4e00-\u9fa5]/g
        let str = this.twoform.bank.replace(regs, '')
        if (!str) {
          this.bankTips = ''
          this.bankOK = true
        } else {
          this.bankTips = '您输入的有误,请勿输入非汉字,请重新输入'
          this.bankOK = false
        }
      } else {
        this.bankTips = '请输入开户银行'
        this.bankOK = false
      }
    },
    blurBankAccount() {
      if (this.twoform.bankAccount) {
        let reg = /\d+/g
        let str = this.twoform.bankAccount.replace(/\s*/g, '').replace(reg, '')
        if (!str) {
          let arr = this.twoform.bankAccount.split('')
          if (arr.length < 8) {
            this.bankAccountTips = '您输入位数不正确，请重新输入'
            this.bankAccountOK = false
          } else {
            this.bankAccountTips = ''
            this.bankAccountOK = true
          }
        } else {
          this.bankAccountTips = '您输入的有误，请重新输入'
          this.bankAccountOK = false
        }
      } else {
        this.bankAccountTips = '请输入银行账号'
        this.bankAccountOK = false
      }
    },
    handleSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.twoform.businessFileId.push(res.dataList[0].id)
      } else {
        fileList.splice(fileList.length - 1, 1)
        this.$message.error({ message: res.errorMsg })
      }
    },
    handleError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleRemove(file, fileList) {
      let id = file.response ? file.response.dataList[0].id : file.id
      let index = this.twoform.businessFileId.indexOf(id)
      if (index > -1) this.twoform.businessFileId.splice(index, 1)
    },
    // 立即注册
    registration() {
      if (this.nameOK && this.identificationCodeOK && this.addressOK && this.phoneOK && this.bankOK && this.bankAccountOK && this.twoform.businessFileId.length != 0) {
        this.$emit('twoData', this.twoform)
      } else {
        this.blurName()
        this.blurIdentificationCode()
        this.blurAddress()
        this.blurPhone()
        this.blurBank()
        this.blurBankAccount()
        if (this.twoform.businessFileId.length == 0) {
          this.fileTips = '请上传文件'
        }
      }
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.two-form {
  .form-input {
    width: 470px;
    height: 48px;
    line-height: 48px;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 2px;
    padding: 0 11px 0 17px;
    input {
      width: ~'calc(100% - 30px)';
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #d5d4d4;
      /* placeholder字体大小  */
      font-size: 14px;
    }
  }
  .tips {
    margin: 9px 0 19px 0;
    height: 12px;
    line-height: 12px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(215, 24, 24, 1);
  }
  .upload-span {
    float: left;
    width: 85px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-right: 23px;
  }
  .upload-btn {
    display: inline-block;
    .el-button--primary {
      background-color: #eaf6fe;
      border-color: #03b189;
      color: #03b189;
      font-size: 14px;
      padding: 6px 23px;
    }
  }
  .register-btn {
    width: 500px;
    height: 50px;
    line-height: 50px;
    background: #03b189;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    margin: 0px 0 20px 0;
  }
  .register-btn:hover {
    background: #21a57e;
  }
}
</style>
<style scoped>
.upload-btn >>> .el-upload-list .el-upload-list--text {
  width: 370px !important;
  overflow: hidden !important;
}
.upload-btn >>> .el-upload-list__item {
  width: 370px !important;
  overflow: hidden !important;
}
</style>

