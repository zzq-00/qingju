<template>
  <div class="transferVoucher">
    <ul class="steps">
      <li :class="{active: activeStep>=1}">
        <span>提交转账凭证</span>
        <i>1</i>
      </li>
      <li :class="{active: activeStep>=2}">
        <span>审核中</span>
        <i>2</i>
      </li>
      <li :class="{active: activeStep>=3}">
        <span>审核结果</span>
        <i>3</i>
      </li>
    </ul>
    <div class="input-width">
      <el-form v-show="activeStep===1" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" label-position="left">
        <el-form-item label="充值类型：" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="1">普通充值</el-radio>
            <el-popover placement="bottom-start" title="温馨提示" width="590" trigger="hover" v-if="infoData.canUsePreRecharge">
              <p style="font-size: 12px;line-height: 20px;">1.预存金额作为账户余额仅可用于消费，不可提现，不可享受活动优惠，不可转让，不可还轻松付；</p>
              <p style="font-size: 12px;line-height: 20px;">2.股东预存款仅可用于青矩互联平台发布计量项目使用，不可用于BIM及设计项目；</p>
              <p style="font-size: 12px;line-height: 20px;">3.青矩智享股东选择股东预付款充值，仅享受股东优惠，不享受中秋/双十一优惠，充值金额累计到股东当年预存限定额度。</p>
              <el-radio label="2" slot="reference" style="margin-left: 40px;">股东预付款充值</el-radio>
            </el-popover>
            <el-popover placement="bottom-start" title="温馨提示" width="590" trigger="hover">
              <p style="font-size: 12px;line-height: 20px;">1、本次双十一活动时间为11月8日——12月12日；</p>
              <p style="font-size: 12px;line-height: 20px;">2、双十一预存金额作为账户余额仅可用于消费，不可提现，不可享受活动优惠，不可转让，不可还轻松付；</p>
              <p style="font-size: 12px;line-height: 20px;">3、双十一付款仅可用于青矩互联平台发布计量项目使用，不可用于BIM及设计项目；</p>
              <p style="font-size: 12px;line-height: 20px;">4、青矩智享股东选择充值即送双十一活动，仅享受双十一优惠，不享受股东优惠，充值金额不占用股东当年预存限定额度。</p>
              <!-- <el-radio label="3" slot="reference" style="margin-left: 40px;">中秋预付款充值</el-radio> -->
              <!-- <el-radio label="4" slot="reference" style="margin-left: 40px;">充值即送双十一活动</el-radio> -->
            </el-popover>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="充值金额：" prop="principal" v-if="ruleForm.type === '1'">
          <el-input type="number" min="0" v-model="ruleForm.principal"></el-input>
        </el-form-item>
        <el-form-item label="充值金额：" prop="principal" v-else-if="ruleForm.type==='2'" style="margin-bottom: 0px;">
          <div class="prepaid-options clearfix">
            <label v-for="(item,index) in infoData.preList" :key="index" class="fl">
              <input type="radio" name="prepaidOptions" :value="item.id" style="display: none;" v-model="prepaymentAmount">
              <span>充{{item.rechargeAmount}}万送{{item.giftAmount}}万</span>
            </label>
          </div>
          <span style="color: rgb(228, 57, 60);font-size: 14px;">（本年度您还有{{infoData.preRechargeLimit || 0}}万元预付款充值返现福利）</span>
        </el-form-item>
        <el-form-item label="充值金额：" prop="principal" v-else-if="ruleForm.type==='4'">
          <div class="prepaid-options clearfix">
            <label v-for="(item,index) in activityRechargeList" :key="index" class="fl">
              <input type="radio" :value="item.value" style="display: none;" v-model="activityRechargeSel">
              <span>{{item.name}}</span>
            </label>
          </div>
        </el-form-item>

        <el-form-item label="付款人名称：" prop="payUserName">
          <el-input v-model="ruleForm.payUserName"></el-input>
        </el-form-item>
        <el-form-item label="开户银行：" prop="payUserBank">
          <el-input v-model="ruleForm.payUserBank"></el-input>
        </el-form-item>
        <el-form-item label="付款人账号：" prop="payUserBankCode">
          <el-input type="number" v-model="ruleForm.payUserBankCode"></el-input>
        </el-form-item>
        <el-form-item label="上传回执单：" prop="fileIdArray">
          <el-upload name="file" :file-list="ruleForm.fileIdArray" with-credentials multiple :action="httpHead+'prefinance/uploadSingleFile'" :on-success="handleSuccess" :on-error="handleError" :on-remove="handleRemove" accept="image/jpg,image/png,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
            <el-button size="small" type="primary" plain>上传转账凭证</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :disabled="ruleForm.type === '2' && !infoData.preRechargeLimit">提交凭证</el-button>
          <el-button @click="$emit('back')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-show="activeStep===2" class="examine-info">
      <ul>
        <li class="clearfix">
          <span class="fl">充值类型：</span>
          <div class="fl">
            <p v-if="ruleForm.type==='1'">普通充值</p>
            <p v-else-if="ruleForm.type==='2'">股东预付款充值</p>
            <p v-else-if="ruleForm.type==='3'">中秋预付款充值</p>
            <p v-else-if="ruleForm.type==='4'">充值即送双十一活动</p>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl">充值金额：</span>
          <div class="fl">
            <p>{{ruleForm.principal}}元</p>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl">付款人名称：</span>
          <div class="fl">
            <p>{{ruleForm.payUserName}}</p>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl">开户银行：</span>
          <div class="fl">
            <p>{{ruleForm.payUserBank}}</p>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl">付款人账号：</span>
          <div class="fl">
            <p>{{ruleForm.payUserBankCode}}</p>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl">预付款交易码：</span>
          <div class="fl">
            <p>{{ruleForm.code}}</p>
          </div>
        </li>
        <li class="clearfix">
          <span class="fl">上传回执单：</span>
          <div class="fl">
            <p v-for="(item,index) in ruleForm.fileIdArray" :key="index">
              <a :href="item.accessPath" target="_blank">{{item.name}}</a>
            </p>
          </div>
        </li>
      </ul>
      <el-button style="margin-left: 130px;" type="primary" @click="Cancel">撤销，重新提交</el-button>
    </div>

    <div v-show="activeStep===3" class="examine-result">
      <div v-if="false">
        <img src="@/assets/img/qsf-success.png">
        <p>恭喜您，申请成功</p>
      </div>
      <div v-else>
        <img src="@/assets/img/error.png">
        <p>资料审核失败</p>
        <p class="reason">您提交的转账凭证没有办法通过审核，无法给您的账户增加金额，请重新提交。
          <a href="javascript:;" @click="activeStep=1">重新提交转账凭证</a>
        </p>
        <p class="reason">原因：{{reason}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  props: {
    infoData: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {
          total: 0,
          trusteeship: 0,
          freeze: 0,
          canUseAmount: 0
        }
      }
    },
    params: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      httpHead: process.env.API_ROOT,
      activeStep: 1,
      prepaymentAmount: '',
      reason: '',
      ruleForm: {
        code: sessionStorage.prefinanceCode, // 预付款备注码
        fileIdArray: [],
        payUserBank: '',
        payUserBankCode: '',
        payUserName: '',
        principal: '',
        type: '1'
      },
      rules: {
        type: [{ required: true, message: '请选择充值类型', trigger: 'change' }],
        principal: [{ required: true, message: '请输入充值金额', trigger: 'blur' }],
        payUserName: [{ required: true, message: '请输入付款人名称', trigger: 'blur' }],
        payUserBank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        payUserBankCode: [{ required: true, message: '请输入付款人账号', trigger: 'blur' }],
        fileIdArray: [{ required: true, message: '请选择上传回执单', trigger: 'change' }]
      },
      activityRechargeList: [
        // 中秋活动充值列表
        { name: '充1万送1千', value: 10000 },
        { name: '充3万送3千', value: 30000 },
        { name: '充5万送5千', value: 50000 },
        { name: '充10万送1万', value: 100000 }
      ],
      activityRechargeSel: 10000
    }
  },
  methods: {
    handleSuccess(res) {
      if (res.errorCode === '200') {
        let file = res.dataList[0]
        file.name = file.originalName
        this.ruleForm.fileIdArray.push(file)
      } else {
        this.ruleForm.fileIdArray = []
        this.$message.error({ message: res.errorMsg })
      }
    },
    handleError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleRemove(file, fileList) {
      let index = this.ruleForm.fileIdArray.indexOf(file)
      if (index > -1) {
        this.ruleForm.fileIdArray.splice(index, 1)
      }
    },
    async findMatch() {
      let Obj = this.infoData.preList.find(item => item.id === this.prepaymentAmount)
      this.ruleForm.principal = Obj.rechargeAmount * 10000
    },
    async submitForm(formName) {
      if (this.ruleForm.type === '2') await this.findMatch()
      if (this.ruleForm.type === '4') {
        if (!this.activityRechargeSel) return this.$message('请选择充值金额')
        this.ruleForm.principal = +this.activityRechargeSel
      }
      if (this.ruleForm.principal <= 0) return this.$message('请输入充值金额')
      if (this.ruleForm.type === '2' && this.ruleForm.principal < 10000) return this.$message('活动预付款金额需大于1万元')
      this.$refs[formName].validate(valid => {
        if (!valid) return console.log('error submit!!')

        // 传参时，fileIdArray转换为字符串，多个文件id用;分割开
        let data = Object.assign({}, this.ruleForm)
        data.fileIdArray = data.fileIdArray.map(item => item.id).join(';')
        // 有id为编辑，没有为添加
        if (data.id) {
          api
            .editCredential(data)
            .then(res => {
              this.$message.success(res.errorMsg)
              this.activeStep = 2
            })
            .catch(err => this.$message.error(err.errorMsg))
        } else {
          api
            .addCredential(data)
            .then(res => {
              this.$message.success(res.errorMsg)
              this.activeStep = 2
              this.ruleForm.id = res.transferPrePayApply.id
            })
            .catch(err => this.$message.error(err.errorMsg))
        }
      })
    },
    Cancel() {
      // 撤销提交的转账凭证
      this.$prompt('备注信息', '撤销提交', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '请输入描述信息'
      })
        .then(({ value }) => {
          api
            .cancelAddCredential(this.ruleForm.id, value)
            .then(res => {
              this.$message.success('撤销成功')
              this.activeStep = 1
            })
            .catch(err => this.$message.error(err.errorMsg))
        })
        .catch(() => {})
    }
  },
  mounted() {
    if (this.params.transferPrePayApply) {
      if (this.params.transferPrePayApply.fileIdArray && this.params.transferPrePayApply.fileIdArray.length > 0) {
        this.params.transferPrePayApply.fileIdArray.forEach(item => (item.name = item.originalName))
      }
      this.ruleForm = this.params.transferPrePayApply
      this.activeStep = this.params.activeStep
      this.reason = this.params.transferPrePayApplyAuditHistory.reason || ''
    }
    this.prepaymentAmount = this.infoData.preList && this.infoData.preList[0].id
  }
}
</script>
<style lang="less" scoped>
.transferVoucher {
  .steps {
    display: flex;
    margin-bottom: 60px;
    > li {
      flex: 1;
      padding: 35px 0;
      border-bottom: 4px solid #e7e9eb;
      margin: 0 5px;
      text-align: center;
      position: relative;
      > span {
        font-size: 14px;
        color: #797979;
        font-weight: 700;
      }
      > i {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        color: #666;
        background-color: #e7e9eb;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) translateY(50%);
      }
      &.active {
        border-bottom-color: #309866;
        > i {
          background-color: #309866;
          color: #fff;
        }
      }
    }
  }
  .examine-info {
    font-size: 14px;
    > ul {
      > li {
        margin-bottom: 40px;
        line-height: 25px;
        > span {
          width: 110px;
          text-align: right;
          margin-right: 20px;
        }
      }
    }
  }
  .examine-result {
    text-align: center;
    > div {
      > img {
        & + p {
          font-size: 24px;
          margin-top: 30px;
        }
      }
      .reason {
        font-size: 14px;
        margin-top: 10px;
        > a {
          color: #0066cc;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
}
.prepaid-options {
  > label {
    cursor: pointer;
    margin-right: 15px;
    > span {
      display: inline-block;
      width: 164px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border: 1px solid rgba(204, 204, 204, 1);
    }
    > input[type='radio']:checked + span {
      border-color: #e4393c;
      background: url(~@/assets/img/u6217.png) no-repeat right bottom;
    }
  }
}
</style>
<style scoped>
.input-width >>> .el-input {
  width: 528px;
}
</style>
