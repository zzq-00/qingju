<template>
  <div>
    <projectListheader />
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color:#f1f1f1;margin-top: 0;" />
    <div class="container">
      <!-- 项目状态 -->
      <div class="status clearfix">
        <div class="left fl">
          <span class="font12">项目编号:{{bimDto.projectNumber}}</span>
          <p>{{bimDto.statusName}}</p>
          <p v-if="bimDto.status==3">¥ {{bimDto.bargain?bimDto.bargain:bimDto.entrustTheSum | formatMoney}}</p>
          <button @click="payAmount" v-if="bimDto.status==3">托管资金</button>
          <button @click="BIMcheck" v-if="bimDto.status==6">确认验收</button>
          <button @click="evaluation" v-if="bimDto.status==7">{{evaluationOfState?'已评价':'评价'}}</button>
          <div>
            <span class="confirm" v-if="bimDto.status>=3&&bimDto.status<8" @click="dialogVisibleTrue('view')">{{ifSign?'查看合同':'签约合同'}}</span>
            <span class="download" v-if="bimDto.status>=3&&bimDto.status<8" @click="dialogVisibleTrue('download')" title="下载后，请盖章后寄送给我们">下载合同模板</span>
          </div>
        </div>
        <div class="right fl" v-if="bimDto.status<8">
          <div>
            <span class="font12" v-if="bimDto.status==1">感谢您使用青矩互联平台，我们会尽快审批该项目，请您耐心等候！</span>
            <span class="font12" v-if="bimDto.status==2">感谢您使用青矩互联平台，该项目已经审批通过，正在等待确认，请您耐心等候！</span>
            <span class="font12" v-if="bimDto.status==3">该项目会为您保留30个工作日，请尽快托管资金，感谢您使用青矩互联平台！</span>
            <span class="font12" v-if="bimDto.status==4">您已经付款成功，项目承接部门会马上开始工作，请您耐心等候！</span>
            <span class="font12" v-if="bimDto.status==5">您的项目已经开始工作，请您耐心等候！</span>
            <span class="font12" v-if="bimDto.status==6">您项目的成果文件已经提交，请您尽快验收！</span>
            <span class="font12" v-if="bimDto.status==7">恭喜您，您的项目已经完成交付。</span>
            <!-- <span class="font12" v-if="bimDto.status==3"><img src="../../assets/img/u774.png" alt="" style="vertical-align: bottom;"> 剩余时间：{{bimDto.paymentCountdown}}</span> -->
            <!-- <span class="fr font12">日志</span> -->
          </div>
          <div class="step">
            <div style="color: #333;">
              <img src="../../assets/img/u262.png" alt="">
              <span>已发布</span>
              <span>{{bimDto.publishTime}}</span>
            </div>

            <img v-if="bimDto.status>1" src="../../assets/img/u667.png" alt="">
            <img v-else src="../../assets/img/u378.png" alt="">

            <div v-if="bimDto.status>=2" style="color: #333;">
              <img src="../../assets/img/u1996.png" alt="">
              <span>已审批</span>
              <span>{{bimDto.pendingTime}}</span>
            </div>
            <div v-else>
              <img src="../../assets/img/u263.png" alt="">
              <span>待审批</span>
            </div>

            <img v-if="bimDto.status>2" src="../../assets/img/u667.png" alt="">
            <img v-else-if="bimDto.status==2" src="../../assets/img/u378.png" alt="">
            <img v-else src="../../assets/img/u379.png" alt="">

            <div v-if="bimDto.status>=3" style="color: #333;">
              <img src="../../assets/img/u1997.png" alt="">
              <span>已确认</span>
              <span>{{bimDto.confirmTime}}</span>
            </div>
            <div v-else>
              <img src="../../assets/img/u264.png" alt="">
              <span>待确认</span>
            </div>

            <img v-if="bimDto.status>3" src="../../assets/img/u667.png" alt="">
            <img v-else-if="bimDto.status==3" src="../../assets/img/u378.png" alt="">
            <img v-else src="../../assets/img/u379.png" alt="">

            <div v-if="bimDto.status>=4" style="color: #333;">
              <img src="../../assets/img/u2131.png" alt="">
              <span>已托管</span>
              <span>{{bimDto.trusteeshipTime}}</span>
            </div>
            <div v-else>
              <img src="../../assets/img/u265.png" alt="">
              <span>待托管</span>
            </div>

            <img v-if="bimDto.status>5" src="../../assets/img/u667.png" alt="">
            <img v-else-if="bimDto.status==4 || bimDto.status==5" src="../../assets/img/u378.png" alt="">
            <img v-else src="../../assets/img/u379.png" alt="">

            <div v-if="bimDto.status>=6" style="color: #333;">
              <img src="../../assets/img/u2831.png" alt="">
              <span>已交付</span>
              <span>{{bimDto.deliveryTime}}</span>
            </div>
            <div v-else>
              <img src="../../assets/img/u383.png" alt="">
              <span>待交付</span>
            </div>

            <img v-if="bimDto.status>6" src="../../assets/img/u667.png" alt="">
            <img v-else-if="bimDto.status==6" src="../../assets/img/u378.png" alt="">
            <img v-else src="../../assets/img/u379.png" alt="">

            <div v-if="bimDto.status>=7" style="color: #333;">
              <img src="../../assets/img/u3073.png" alt="">
              <span>已完成</span>
              <span>{{bimDto.checkedTime}}</span>
            </div>
            <div v-else>
              <img src="../../assets/img/u384.png" alt="">
              <span>待完成</span>
            </div>
          </div>
        </div>
        <!-- 项目关闭的流程 -->
        <div class="right fl" v-else>
          <div>
            <span class="font12" v-if="bimDto.activeClose">您取消了项目，感谢您使用青矩互联平台！</span>
            <span class="font12" v-else-if="bimDto.status==='8'">您的项目已被关闭，感谢您使用青矩互联！</span>
            <span class="font12" v-else-if="bimDto.status==='9'">您的项目暂时被驳回了，感谢您使用青矩互联！</span>
          </div>
          <div class="step" v-if="bimDto.activeClose">
            <div>
              <img src="../../assets/img/u261.png" alt="">
              <span>提交申请</span>
              <span>{{bimDto.publishTime}}</span>
            </div>
            <img src="../../assets/img/u379.png" alt="">
            <div>
              <img src="../../assets/img/u263.png" alt="">
              <span>已审批</span>
              <span>{{bimDto.pendingTime}}</span>
            </div>
            <img src="../../assets/img/u379.png" alt="">
            <div>
              <img src="../../assets/img/u264.png" alt="">
              <span>已确认</span>
              <span>{{bimDto.confirmTime}}</span>
            </div>
            <img src="../../assets/img/u379.png" alt="">
            <div>
              <img src="../../assets/img/u3358.png" alt="">
              <span>取消支付</span>
              <span>{{bimDto.closeTime}}</span>
            </div>
            <img src="../../assets/img/u379.png" alt="">
            <div>
              <img src="../../assets/img/u3351.png" alt="">
              <span>已关闭</span>
              <span>{{bimDto.closeTime}}</span>
            </div>
          </div>
          <div class="step" v-else>
            <div>
              <img src="../../assets/img/u261.png" alt="">
              <span>提交申请</span>
              <span>{{bimDto.publishTime}}</span>
            </div>
            <template v-if="bimDto.status === '9'">
              <img src="@/assets/img/u379.png" alt="">
              <div>
                <img src="@/assets/img/u3358.png" alt="">
                <span>已驳回</span>
                <span>{{bimDto.closeTime}}</span>
              </div>
            </template>
            <template v-else>
              <img src="@/assets/img/u379.png" alt="">
              <div>
                <img src="@/assets/img/u3351.png" alt="">
                <span>已关闭</span>
                <span>{{bimDto.closeTime}}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 成果文件 -->
      <div class="project-info" v-if="bimDto.status>=6&&bimDto.status<8">
        <div>成果文件</div>
        <el-table :data="projectProcesses" style="width: 100%">
          <el-table-column prop="deliveryTime" label="交付时间" width="180">
          </el-table-column>
          <el-table-column label="交付文件">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.fileInfos" :key="index">
                <a :href="item.path" target="_blank">{{item.name}}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
        </el-table>
        <div class="exponent-price">
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="project-info">
        <div>基本信息</div>
        <div class="info">
          <ul class="info-list">
            <li>
              <span>项目名称：</span>
              <span>{{bimDto.projectName}}</span>
            </li>
            <li>
              <span>专业类型：</span>
              <span>{{bimDto.professionalTypes}}</span>
            </li>
            <li>
              <span>建筑规模：</span>
              <span>{{bimDto.buildingArea}} ㎡</span>
            </li>
            <li>
              <span>项目概况：</span>
              <span>{{bimDto.projectOverview}}
                <div v-for="(item,index) in bimDto.projectOverviewFile" :key="index">
                  <a style="text-decoration: underline;color: #7BBC52;" :href="item.path" target="_blank">{{item.name}}</a>
                </div>
              </span>
            </li>
            <li>
              <span>服务内容：</span>
              <span>{{bimDto.serviceItem}}</span>
            </li>
            <li>
              <span>服务内容描述：</span>
              <span>{{bimDto.serviceItemDescribe}}</span>
            </li>
            <li>
              <span>软件选择：</span>
              <span>{{bimDto.softwareSelection}}</span>
            </li>
            <li>
              <span>委托金额：</span>
              <span>{{bimDto.entrustTheSum | formatMoney}} 元</span>
            </li>
            <li v-if="bimDto.bargain">
              <span>议价金额：</span>
              <span>{{bimDto.bargain | formatMoney}} 元</span>
            </li>
            <li>
              <span>交付截止日期：</span>
              <span>{{bimDto.deliveryDeadline}}</span>
            </li>
            <li>
              <span>是否需要现场工作：</span>
              <span>{{bimDto.expectWorkDays}} 日</span>
            </li>
            <li>
              <span>联系方式：</span>
              <span>{{bimDto.mobile}}</span>
            </li>
            <li>
              <span>项目地址：</span>
              <span>{{bimDto.location}}</span>
            </li>
            <li>
              <span>图纸附件：</span>
              <span>
                <div v-for="(item,index) in bimDto.file" :key="index">
                  <a style="text-decoration: underline;color: #7BBC52;" :href="item.path" target="_blank">{{item.name}}</a>
                </div>
              </span>
            </li>
            <li>
              <span>标准附件：</span>
              <span>
                <div v-for="(item,index) in bimDto.standardFile" :key="index">
                  <a style="text-decoration: underline;color: #7BBC52;" :href="item.path" target="_blank">{{item.name}}</a>
                </div>
              </span>
            </li>
            <li>
              <span>备注：</span>
              <span>{{bimDto.remark}}</span>
            </li>
          </ul>
          <ul class="price-info" v-if="bimDto.status >= 2&&bimDto.status <8">
            <!-- <li>
              <span>项目总额：</span>
              <span>￥ 20000</span>
            </li>
            <li>
              <span>青矩指数：</span>
              <span>￥ 20000</span>
            </li>
            <li>
              <span>优惠：</span>
              <span>￥ 20000</span>
            </li> -->
            <li>
              <span>{{bimDto.status==3?'应付总额':'已付金额'}}：</span>
              <span>￥ {{bimDto.bargain?bimDto.bargain:bimDto.entrustTheSum | formatMoney}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 留言，问题描述 -->
      <div class="question" v-if="bimDto.status<8">
        <textarea cols="160" rows="5" placeholder="如果您遇到任何问题，请留言给我们！" v-model="messageParams.message"></textarea>
        <div>
          <el-button type="primary" size="small" @click="bimMessage">&nbsp;&nbsp;留&nbsp;&nbsp;&nbsp;&nbsp;言&nbsp;&nbsp;</el-button>
        </div>
        <div class="history clearfix" v-if="messageData.length>0" v-for="(item,index) in messageData" :key="index">
          <div class="left fl">
            <img :src="item.headPortraits" alt="" width="50px" height="50px">
            <div>{{item.userName}}</div>
          </div>
          <div class="right fl">
            <p>{{item.message}}</p>
            <span>{{item.createTime}}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="doWhat==='download'?'下载合同模板':'合同签约'" :visible.sync="dialogVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="发票抬头" prop="invoiceTitle">
          <el-select v-model="ruleForm.invoiceTitle" placeholder="请选择发票抬头" @change="selInvoiceTitle('ruleForm')">
            <el-option :label="item.companyName" :value="item.invoiceVerificationId" v-for="(item,index) in options" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" :disabled="!sign_url">确认</el-button>
          <span v-if="prompt" style="margin-left:10px;"> {{promptMes}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import projectListheader from '@/components/projectListheader'
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'

export default {
  components: {
    projectListheader,
    breadcrumb
  },
  data() {
    return {
      dialogVisible: false, //发票弹框
      // 选择发票抬头
      ruleForm: {
        invoiceTitle: '' //发票抬头
      },
      // 验证
      rules: {
        invoiceTitle: [{ required: true, message: '请选择发票抬头', trigger: 'change' }]
      },
      breadcrumbs: [{ name: '我的项目', path: '/myqingju/project' }, { name: '项目详情', path: this.$route.fullPath }],
      evaluationOfState: false,
      projectProcesses: [],
      bimDto: {},
      amount: '',
      actuallyPayAmount: '',
      engineers: [],
      projectAuthorities: [],
      havePayBills: [],
      notPayServiceBills: [],
      notPaySurcharges: [],
      projectConsultations: [],
      formData: new FormData(),
      filesName: [],
      projectBaseId: '',
      messageParams: {
        message: ''
      },
      messageData: [],
      options: [], //发票列表
      prompt: false, //跳转提示
      promptMes: '',
      ifSign: false, //是否已签约
      ContractAddress: '', //签约合同地址
      doWhat: '',
      sign_url: ''
    }
  },
  methods: {
    // 签约合同或 查看合同
    dialogVisibleTrue(param) {
      this.sign_url = ''
      this.ruleForm.invoiceTitle = ''
      this.doWhat = param
      if (this.doWhat === 'download' || !this.ifSign) return (this.dialogVisible = true)
      window.open(this.ContractAddress)
    },
    selInvoiceTitle(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false
        let data = {
          invoiceVerificationId: this.ruleForm.invoiceTitle,
          projectBaseId: this.projectBaseId
        }
        if (this.doWhat === 'download') {
          api
            .downloadTemplate(data)
            .then(res => {
              this.sign_url = res.dataList[0]
            })
            .catch(res => this.$message.error(res.errorMsg))
        } else {
          api
            .contractSign(data)
            .then(res => {
              if (res.errorCode !== '200') return this.$message.error(res.errorMsg)
              this.sign_url = res.sign_url
            })
            .catch(res => {
              if (res.errorCode === '4003') {
                this.verify = true
              } else {
                this.promptMes = '页面跳转失败,请稍后重试'
              }
              this.$message.error(res.errorMsg)
            })
        }
      })
    },
    // 确认发票抬头
    submitForm(formName) {
      window.open(this.sign_url)
      this.dialogVisible = false
    },
    //发票抬头列表
    getInvoiceTitle() {
      api.getInvoiceTitle(JSON.parse(window.localStorage.QingjuuserId)).then(res => {
        this.options = res.dataList
      })
    },
    payAmount() {
      window.open('/myqingju/cashierDesk/BIM/' + this.$route.params.id)
    },
    // 查看项目详情
    backProjectBaseInfo(id = this.$route.params.id) {
      api.backProjectBaseInfo(id).then(res => {
        this.bimDto = res.bimDto
        this.projectBaseId = res.bimDto.projectBaseId
        this.projectProcesses = res.bimDto.projectProcesses // 成果文件
        this.evaluationOfState = res.bimDto.evaluationOfState // 是否已评价
        this.ifSign = res.bimDto.ifSign //是否已签约
        this.ContractAddress = res.bimDto.contractLink //签约地址
      })
    },
    changeFile(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      for (let index = 0; index < files.length; index++) {
        this.formData.append('files', files[index])
        this.filesName.push(files[index].name)
      }
    },
    // 问题留言
    bimMessage() {
      if (!this.messageParams.message) {
        this.$message('请输入您遇到的问题')
        return false
      }
      api.bimMessage(Object.assign(this.messageParams, { projectBaseId: this.projectBaseId })).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.messageParams.message = []
        this.backProjectConsultation()
      })
    },
    // 查看留言
    backProjectConsultation() {
      api.backProjectConsultation(this.$route.params.id).then(res => {
        this.messageData = res.dataList
      })
    },
    // 取消项目
    cancleProject() {
      this.$confirm('此操作将取消该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        api
          .giveUp(this.projectBaseId)
          .then(res => {
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            this.backProjectBaseInfo()
          })
          .catch(err => {
            this.$message.error(err.errorMsg)
          })
      })
    },
    // 验收
    BIMcheck() {
      this.$confirm('您是否已经确认验收成果文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      })
        .then(() => {
          api
            .BIMcheck({ projectBaseId: this.projectBaseId })
            .then(res => {
              this.$message({
                message: res.errorMsg,
                type: 'success'
              })
              this.backProjectBaseInfo()
            })
            .catch(res => {
              this.$message.error({ message: res.errorMsg })
            })
        })
        .catch(() => {})
    },
    // 评价项目
    evaluation() {
      this.$router.push('/myqingju/evaluation/' + this.$route.params.id)
    }
  },
  mounted() {
    this.backProjectBaseInfo()
    this.backProjectConsultation()
    this.getInvoiceTitle() //抬头列表
  }
}
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto 100px;
}
.status {
  color: #666;
  height: 240px;
  border-top: 3px solid rgba(0, 153, 107, 1);
  background-color: #fff;
  > div {
    padding: 13px 26px;
    box-sizing: border-box;
  }
  .left {
    width: 240px;
    height: 100%;
    border-right: 1px solid #e4e4e4;
    text-align: center;
    position: relative;
    > p {
      font-size: 20px;
      font-weight: 700;
      &:nth-child(2) {
        color: #2dbe7f;
        margin-top: 45px;
      }
      &:nth-child(3) {
        color: #ff0000;
        margin-top: 5px;
      }
    }
    > button {
      cursor: pointer;
      font-size: 13px;
      color: #e4433f;
      background-color: #fff;
      margin: 15px 0;
      padding: 5px 25px;
      border: 1px solid #e4433f;
      &:hover {
        color: #fff;
        background-color: #e4433f;
      }
    }
    > div {
      width: 100%;
      font-size: 14px;
      position: absolute;
      left: 0;
      bottom: 12px;
      > span {
        color: #333;
        cursor: pointer;
        padding-left: 20px;
        &.confirm {
          background: url(../../assets/img/u767.png) left center no-repeat;
        }
        &.download {
          background: url(../../assets/img/u766.png) left center no-repeat;
        }
        &:hover {
          color: #e4433f;
          &.confirm {
            background: url(../../assets/img/u767_mouseOver.png) left center no-repeat;
          }
          &.download {
            background: url(../../assets/img/u766_mouseOver.png) left center no-repeat;
          }
        }
        & + span {
          margin-left: 30px;
        }
      }
    }
  }
  .right {
    width: 960px;
    height: 100%;
    .step {
      margin-top: 55px;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: space-around;
      > div {
        flex: 0 0 64px;
        height: 87px;
        text-align: center;
        &.now {
          color: #333;
        }
        > span {
          display: block;
          width: 100%;
          &:nth-child(2) {
            font-size: 14px;
          }
          &:nth-child(3) {
            font-size: 12px;
          }
        }
      }
      > img {
        width: 110px;
        height: 9px;
        margin-top: -40px;
      }
    }
  }
}
.project-info {
  font-size: 14px;
  margin-top: 20px;
  padding: 0 20px;
  background-color: #fff;
  border: 1px solid #eee;
  > div {
    &:first-child {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      background-color: #fafbfc;
      padding-left: 15px;
      margin: 0 -20px;
    }
    &.exponent-price {
      padding: 15px 0;
      > div {
        text-align: right;
        margin: 0 30px;
      }
      > ul {
        li {
          float: left;
        }
      }
    }
    &.pay-button {
      text-align: right;
      border-top: 1px dashed #eeeeee;
      padding: 20px 0;
      > button {
        cursor: pointer;
        font-size: 16px;
        padding: 8px 10px;
        border-radius: 2px;
        font-weight: 700;
        &.pay {
          color: #fff;
          background-color: rgba(230, 67, 70, 1);
          margin-right: 5px;
        }
        &.giveUp {
          color: #666666;
          background-color: rgba(228, 228, 228, 1);
        }
      }
    }
    &.info {
      padding: 15px 10px;
      .info-list > li {
        > span {
          display: inline-block;
          line-height: 40px;
          &:first-child {
            color: #666;
            font-weight: 700;
            width: 135px;
            vertical-align: top;
          }
        }
      }
      .price-info {
        border-top: 1px solid #e4e4e4;
        text-align: right;
        padding: 20px 0;
        > li {
          line-height: 40px;
          > span {
            display: inline-block;
            &:last-child {
              min-width: 130px;
            }
          }
          &:last-child {
            color: #ff0000;
            > span:last-child {
              font-size: 20px;
              font-weight: 700;
            }
          }
        }
      }
    }
    &.file {
      padding-bottom: 15px;
      > div {
        line-height: 45px;
        > label {
          width: 135px;
          margin-left: 10px;
        }
        > div {
          margin-left: 150px;
          select {
            width: 200px;
            height: 30px;
          }
          select,
          textarea {
            border: 1px solid #bcbcbc;
          }
        }
      }
    }
    &.history {
      color: #666;
      background-color: #fff;
      border-top: 1px dashed #eee;
      padding: 15px 0;
      .left {
        width: 148px;
        text-align: center;
        > div {
          margin: 10px 0;
          font-size: 12px;
        }
      }
      .right {
        width: 1000px;
        > ul {
          margin: 10px 0;
          > li {
            color: #77ce45;
            > a {
              color: #77ce45;
              text-decoration: underline;
            }
            &:hover {
              color: #28b343;
              > a {
                color: #28b343;
              }
            }
          }
        }
        > span {
          font-size: 12px;
          color: #999;
        }
      }
    }
    &.final-charge {
      > ul {
        padding: 20px 0;
        > li {
          float: left;
          font-weight: 700;
          margin-right: 150px;
        }
      }
    }
    &.price-calculation {
      border-top: 1px dashed #eeeeee;
      padding: 15px 0;
      line-height: 22px;
      > dl {
        padding-left: 18px;
        dt {
          cursor: pointer;
          font-weight: 700;
          margin-left: -18px;
          &::before {
            margin-right: 4px;
            content: '—';
            display: inline-block;
            width: 14px;
            height: 14px;
            line-height: 14px;
            text-align: center;
            color: #fff;
            background-color: rgba(33, 165, 126, 1);
          }
        }
      }
      > ul {
        text-align: right;
        b {
          display: inline-block;
          min-width: 110px;
        }
      }
    }
  }
}
.question {
  margin-top: 20px;
  padding: 40px 20px 0;
  background-color: #fff;
  > textarea {
    border: 1px solid #ccc;
    padding: 0 10px;
  }
  > div:nth-child(2) {
    text-align: right;
    padding: 15px 0;
  }
  .history {
    color: #666;
    border-top: 1px dashed #eee;
    padding: 15px 0;
    .left {
      width: 148px;
      text-align: center;
      > div {
        margin: 10px 0;
        font-size: 12px;
      }
    }
    .right {
      width: 1000px;
      > p {
        font-size: 14px;
        margin-bottom: 15px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.font12 {
  font-size: 12px;
}
.upload-button {
  cursor: pointer;
  color: #fff;
  background-color: #34a47e;
  padding: 7px 20px;
  border-radius: 3px;
}
textarea {
  width: 100%;
  box-sizing: border-box;
}
</style>
