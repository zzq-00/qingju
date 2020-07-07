<template>
  <div class="add-bank-card">
    <div class="title">添加银行卡</div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width: 560px;">
        <el-form-item label="选择银行" prop="bankId">
          <el-select filterable v-model="ruleForm.bankId" placeholder="请选择银行" style="width: 100%;">
            <el-option-group v-for="group in options" :key="group.firstAlphabet" :label="group.firstAlphabet">
              <el-option v-for="item in group.bankList" :key="item.id" :label="item.bankName" :value="item.id">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="开户支行" prop="carName">
          <el-input v-model="ruleForm.carName" placeholder="请输入完整的开户支行名称"></el-input>
        </el-form-item>
        <el-form-item label="持卡姓名" prop="userName">
          <el-input v-model="ruleForm.userName" :disabled='Auth_Pass' :class="{'disabled-color': Auth_Pass}" placeholder="请填写持卡姓名"></el-input>
          <!-- <el-input v-model="ruleForm.userName" placeholder="请填写持卡姓名"></el-input> -->
        </el-form-item>
        <el-form-item label="储蓄卡号" prop="carNum">
          <el-input type="number" placeholder="请填写储蓄卡号" v-model="ruleForm.carNum"></el-input>
        </el-form-item>
        <el-form-item label="银行卡类型" prop="cardType">
          <el-select v-model="ruleForm.cardType" placeholder="请选择银行卡类型" style="width: 100%;">
            <el-option v-for="(item,index) in bankTypeList" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain @click="submitForm('ruleForm')" style="width:150px;">确定</el-button>
          <el-button type="info" plain style="width:150px;" @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  data() {
    return {
      Auth_Pass: false,
      options: [],
      bankTypeList: [],
      ruleForm: {
        bankId: '',
        carName: '',
        carNum: '',
        cardType: '',
        userName: ''
      },
      rules: {
        bankId: [{ required: true, message: '请选择银行', trigger: 'change' }],
        carName: [{ required: true, message: '请输入完整的开户支行名称', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入持卡姓名', trigger: 'blur' }],
        carNum: [{ required: true, message: '请填写储蓄卡号', trigger: 'blur' }, { min: 14, max: 19, message: '储蓄卡号不正确', trigger: 'blur' }],
        cardType: [{ required: true, message: '请选择银行类型', trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.saveBankCarData(this.ruleForm).then(res => {
            this.$message.success('添加成功')
            this.$router.go(-1)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {
    // 获取银行
    api.getBankList().then(res => (this.options = res.dataList))
    // 获取银行卡类型
    api.getBankTypeList().then(res => (this.bankTypeList = res.dataList))
    // 如果已完成企业认证或者企业下用户，则自动填写持卡姓名
    console.log(this.$store.state.userInfo)
    if (this.$store.state.userInfo) {
      this.Auth_Pass = this.$store.state.userInfo.authType == '1' || this.$store.state.userInfo.authType == '2'
      this.ruleForm.userName = this.$store.state.userInfo.realName || this.$store.state.userInfo.companyName
    }
  }
}
</script>

<style lang="less" scoped>
.add-bank-card {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .title {
    font-size: 18px;
    color: #666666;
  }
  .content {
    border-top: 1px solid #d7d7d7;
    margin-top: 15px;
    padding-top: 39px;
  }
}
</style>
<style scoped>
.disabled-color >>> .el-input__inner {
  color: #333;
  background: url(~@/assets/img/lock.png) no-repeat 435px rgba(242, 242, 242, 1);
}
</style>
