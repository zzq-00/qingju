<template>
  <div style="background:#fff;position:absolute;bottom:0;left:0;top:0;right:0">
    <projectListheader/>
    <breadcrumb :breadcrumbs="breadcrumbs" style='margin-top:0'></breadcrumb>
    <div class="contents">
        <h4>发票资质详情</h4>
        <ul>
          <li>
            <span>企业名称：</span>
            <span>{{infoList.companyName}}</span>
          </li>
          <li>
            <span>纳税人识别号：</span>
            <span>{{infoList.taxNumber}}</span>
          </li>
          <li>
            <span>注册地址：</span>
            <span>{{infoList.registeredAddress}}</span>
          </li>
          <li>
            <span>注册电话：</span>
            <span>{{infoList.registeredTelephone}}</span>
          </li>
          <li>
            <span>开户银行：</span>
            <span>{{infoList.bank}}</span>
          </li>
          <li>
            <span>银行账户：</span>
            <span>{{infoList.bankAccount}}</span>
          </li>
          <!--<li>-->
            <!--<span>法人姓名：</span>-->
            <!--<span>{{infoList.legalPerson}}</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span>法人身份证号码：</span>-->
            <!--<span>{{infoList.legalIdCard}}</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span>认证状态：</span>-->
            <!--<span>{{infoList.statusStr}}</span>-->
          <!--</li>-->
          <li>
            <span>备注：</span>
            <span>{{infoList.opinion}}</span>
          </li>
          <li>
            <span>提交日期：</span>
            <span>{{infoList.createAtStr}}</span>
          </li>
          <!--<li>-->
            <!--<span>证件照片：</span>-->
            <!--<div>-->
              <!--<img :src="infoList.invoiceBusinessFileUrl" alt="" @click="viewImg(infoList.invoiceBusinessFileUrl)">-->
              <!--<h5>营业执照</h5>-->
            <!--</div>-->
            <!--<div>-->
              <!--<img :src="infoList.invoiceTaxRegistFileUrl" alt="" @click="viewImg(infoList.invoiceTaxRegistFileUrl)" style="width:50px">-->
              <!--<h5>税务登记证</h5>-->
            <!--</div>-->
            <!--<div>-->
              <!--<img :src="infoList.personLegalFrontFileUrl" alt="" @click="viewImg(infoList.personLegalFrontFileUrl)" style="width:130px;">-->
              <!--<h5>法人身份证正面</h5>-->
            <!--</div>-->
             <!--<div>-->
              <!--<img :src="infoList.personLegalVersoFileUrl" alt="" @click="viewImg(infoList.personLegalVersoFileUrl)">-->
              <!--<h5>法人身份证背面</h5>-->
            <!--</div>-->
            <!--<div style="clear:both"></div>-->
          <!--</li>-->
        </ul>
        <el-button type="primary" plain @click='returnClick' style="width:150px;display:block;margin-top:140px;" >返回</el-button>
    </div>
    <el-dialog
      title="查看大图"
      :visible.sync="dialogVisible"
      width="30%">
      <img :src="viewImgs" alt="" style="width:300px;heigth:300px;margin:0 auto">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import projectListheader from "@/components/projectListheader";
import breadcrumb from "@/components/breadcrumb";
import imgTool from '@/assets/js/imgUpload'
import tool from '@/assets/js/useMoreTool'
import api from "@/fetch/api";

export default {
  components: {
    projectListheader,
    breadcrumb
  },
  data () {
    return {
        breadcrumbs: [
            { name: "个人中心", path: '/myqingju/project' },
            { name: "发票管理", path: '/myqingju/billManage' },
            { name: "发票抬头", path: '/myqingju/billManage' },
            { name: "详情", path: this.$route.fullPath },
        ],
        infoList:'',    //资质详情
        dialogVisible:false,
        viewImgs:''
    };
  },
  methods: {
    //资质详情
    getInvoiceVerificationInfo(){
      api.getInvoiceVerificationInfo(this.$route.query.id).then(res=>{
        this.infoList = res.dataList[0]
      })
    },
    // 返回上一页
    returnClick(){
      this.$router.push({path:'/myqingju/billManage',query:{name:'发票资质'}})
    },
    // 查看大图
    viewImg(val){
      this.dialogVisible = true
      this.viewImgs = val
    },
  },
  mounted () {
    this.getInvoiceVerificationInfo()     //资质详情
  }
};
</script>

<style lang='less' scoped>
.contents{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
    ul{
      margin: 20px 0;
      li{
        span:nth-child(1){
          font-weight: 400;
          font-style: normal;
          color: #666666;
          line-height: 36px;
          font-size: 14px;
          width:150px;
          text-align: left;
          display: inline-block;
        }
      }
      li:nth-child(9){
        span:nth-child(2){
          color:red;
        }
      }
      li:last-child{
        span{
          float: left;
        }
        div{
          float: left;
          margin-right: 40px;
          h5{
            text-align: center;
            font-weight: 400;
            font-style: normal;
            font-size: 12px;
            line-height: 36px;
            color: #333333;
          }
          img{
            height:79px;
          }
        }
        div:nth-child(1){
          width:80px;
          img{
            width:47px;
          }
        }
        div:nth-child(2){
          img{
            width:47px;
          }
        }
        div:nth-child(3){
          img{
            width:130px;
          }
        }
        div:nth-last-child(2){
          img{
            width:130px;
          }
        }
      }
    }
}
</style>
