<template>
  <div id="app">
    <router-view />
    <floatIcon/>
    <el-dialog title="请选择项目类型" :visible.sync="$store.state.showReleaseWindow" width="500px">
      <ul class="list clearfix">
        <li class="fl" v-for="(item,index) in projects" :key="index">
          <el-button @click="gotoPage(item.location)">{{item.name}}</el-button>
        </li>
      </ul>
    </el-dialog>

    <el-dialog title="培训证书查询" :visible.sync="$store.state.showCertificate" width="500px" center>
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入学员姓名"></el-input>
        </el-form-item>
        <el-form-item label="验证方式" :label-width="formLabelWidth">
          <el-input v-model="form.code" auto-complete="off" placeholder="请输入证件编号或者身份证号码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmInquiry">确 定</el-button>
        <el-button @click="cancelInquiry">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查询结果" :visible.sync="showResult" width="500px" center>
      <div class="inquiryResult" v-if="!CertificateUrl">
        <i class="el-icon-circle-close-outline"></i>
        <div>抱歉，没有查询到您的信息，请重新输入后查询</div>
        <a href="javascript:;" @click="reInquiry">重新查询</a>
      </div>
      <div class="inquiryResult" v-else>
        <img :src="CertificateUrl">
        <a href="javascript:;" @click="downLoad">电子证书下载</a>
      </div>
    </el-dialog>

    <el-dialog title="申诉项目质量" :visible.sync="$store.state.showAppealAgreement" width="600px">
      <div class="agreement-dialog">
        <h5 style="text-align: center;font-size: 18px;">青矩互联工程计量成果质量评定标准及考核细则</h5>
        <p>为了规范青矩互联工程计量成果质量评定标准，明确业务委托人与承接人的权利和责任，依据国家有关法规及行业规范，特制定《青矩互联工程计量成果质量评定标准及考核细则》（下简称本细则）。</p>
        <p class="title">一、评定期限</p>
        <p>提交成果文件之日起7天内。</p>
        <p class="title">二、评定标准</p>
        <p>1、评定标准</p>
        <p>以单体建筑子分部工程的单独服务内容为评定单元，依据业务成果的错漏项数量及综合误差率，成果质量分为优秀、合格、不合格三种。具体见下表：</p>
        <img src="@/assets/img/quality-rules.png" alt="" width="100%">
        <p>说明：同时委托多个单体建筑，或一个单体建筑包含多个子分部工程，或委托业务包含多项服务内容时，各单体建筑的子分部工程包括的服务内容分别评定，不累计合并。</p>
        <p>因自身单方面原因出现以下事项，直接判定为不合格：</p>
        <p>（1）计量、计价软件或版本错误</p>
        <p>（2）成果文件不完整（无编制说明、无计算底稿，无软件模型（若有））</p>
        <p>（3）未按期交付成果造成业务终止</p>
        <p>2、评定值计算规则</p>
        <p>相同口径下，因承接人自身单方面原因，在同一项目中，工程量计算、清单编制或计价等方面与正确的成果文件相比存在偏差，评定规则如下。</p>
        <p>（1）工程量综合误差率</p>
        <p>以GB50500-2013系列工程量计算规范所规定的计量单位为准，各清单列项工程量偏差绝对值的累计数量占正确工程量累计值的百分比。</p>
        <p>工程量综合误差率=∑∣成果工程量-正确工程量∣/∑正确工程量（%）</p>
        <p>累计值不考虑计量单位因素，非关联项正负偏差不冲抵，缺项视为工程量为0.</p>
        <p>（2）错漏项</p>
        <p>清单漏项包括缺项、多项、重复项，按实际数量统计。</p>
        <p>清单错项包括项目编码、项目名称、项目特征、计量单位等不符合国家规范强制性要求或未按图纸和技术文件编制的，按存在错误的清单项统计。</p>
        <p>（3）工程造价综合误差率</p>
        <p>各计价列项工程造价偏差的累计金额占正确的工程总造价</p>
        <p>工程造价综合误差率=∑（成果工程造价-正确工程造价）/∑正确工程造价（%）</p>
        <p>缺项视为造价金额为0.</p>
        <p class="title">三、考核细则</p>
        <p>1、业务质量终身维护</p>
        <p>委托人有权在评定期限内对承接人的业务成果进行评定，并按本细则申请赔偿。超过评定期视为放弃赔偿申请权利，但有权要求承接人修正完善不合格成果文件的质量误差及错漏。</p>
        <p>2、以委托人满意为准</p>
        <p>对于业务质量评定为优秀的成果文件，委托人要求修改完善质量瑕疵的，承做人应积极配合。</p>
        <p>3、达不到优秀不收费</p>
        <p>对于业务质量在评定期内评定为合格的成果文件，除修改完善外，该评定单元不收取费用，不可提现只能用于平台消费。</p>
        <p>因承接人单方面原因未按期交付成果，委托人同意延期的，每逾期1天扣减未交付单元服务报酬总额的10%。</p>
        <p>4、质量不合格双倍返还</p>
        <p>对于业务质量在评定期内评定为不合格的成果文件，除修改完善外，双倍返还该评定单元的托管资金，不可提现只能用于平台消费。</p>
        <p>5、平台项目申诉</p>
        <p>项目出现质量问题，须通过青矩平台申述功能进行申请，申诉时根据项目收费的10%进行平台申诉费托管（单笔不低于1000元），用户申诉成功，平台按照约定返还赔偿以及申诉费；若用户申诉失败，需支付平台申诉费。</p>
        <p>6、本细则最终解释权归青矩互联所有。</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/fetch/api'
import floatIcon from "@/components/floatIcon";


export default {
  name: 'app',
  components: {
    floatIcon
  },
  data() {
    return {
      projects: [
        { name: '计量项目', location: '/businessService/releaseEstimate', has: '6iwhI8' },
        { name: '编制业务', location: '/businessService/releaseEstablishment', has: 'n9Erv0' },
        { name: 'BIM项目', location: '/businessService/releaseBIM', has: 'bpoE9x' },
        { name: '设计项目', location: '/businessService/releaseDesign', has: 'n9Ervx' }
      ],
      form: {
        name: '',
        code: ''
      },
      formLabelWidth: '70px',
      CertificateUrl: '',
      showResult: false
    }
  },
  methods: {
    gotoPage(location) {
      this.$store.commit('changeReleaseWindow', false)
      this.$router.push(location)
    },
    cancelInquiry() {
      this.$store.commit('changeCertificate', false)
    },
    confirmInquiry() {
      if (!this.form.name) return this.$message('请填写学员姓名')
      if (!this.form.code) return this.$message('请填写证件编号或者身份证号码')
      api.getCfByCondition(this.form.name, this.form.code).then(res => {
        this.CertificateUrl = res.data
        this.$store.commit('changeCertificate', false)
        this.showResult = true
      })
    },
    reInquiry() {
      this.showResult = false
      this.$store.commit('changeCertificate', true)
    },
    downLoad() {
      window.open(this.CertificateUrl)
    }
  },
  mounted() {}
  // beforeDestroy ()  {
  //   sessionStorage.removeItem('isLoginOut')
  // }
}
</script>

<style lang='less' scoped>
.list {
  > li {
    width: 220px;
    margin-bottom: 20px;
    &:nth-child(2n) {
      margin-left: 20px;
    }
    button {
      width: 100%;
    }
  }
}
.inquiryResult {
  text-align: center;
  > i {
    font-size: 35px;
    color: rgb(243, 106, 106);
    margin-bottom: 30px;
  }
  > img {
    display: block;
    width: 300px;
    height: 170px;
    margin: 0 auto;
  }
  > a {
    display: inline-block;
    margin-top: 30px;
    color: rgb(48, 122, 232);
  }
}
.agreement-dialog {
  max-height: 650px;
  overflow: auto;
  > p {
    text-indent: 28px;
    font-size: 14px;
    line-height: 24px;
    &.title {
      color: #333;
      font-size: 16px;
    }
  }
}
</style>
