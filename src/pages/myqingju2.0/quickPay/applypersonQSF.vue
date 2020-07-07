<template>
  <div class="apply-container">
    <div class="base-info">
      <div class="base-info-form">
        <el-form ref="personalParams" :rules="rules" :model="personalParams" label-width="175px">
          <el-form-item label="姓名" class="short-input" prop="name">
            <el-input type="text" v-model="personalParams.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" class="short-input" prop="cardType">
            <el-select v-model="personalParams.cardType">
              <el-option v-for="item in baseInfoData.cardType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="cardNum">
            <el-input type="text" v-model="personalParams.cardNum"></el-input>
          </el-form-item>
          <el-form-item label="证件有效期" prop="cardEndDate">
            <el-date-picker v-model="personalParams.cardEndDate" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="merryStatus">
            <el-radio-group v-model="personalParams.merryStatus">
              <el-radio label="0">未婚</el-radio>
              <el-radio label="1">已婚</el-radio>
              <el-radio label="2">其他</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="教育程度" prop="eduLevel">
            <el-select v-model="personalParams.eduLevel" class="short-input">
              <el-option v-for="item in baseInfoData.eduLevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家庭住址" class="address-input" prop="homeAddress">
            <el-select v-model="provinceSel">
              <el-option v-for="(item,index) in provinceList" :key="index" :value="item.code" :label="item.name"></el-option>
            </el-select>
            <el-select v-model="citySel">
              <el-option v-for="(item,index) in cityList" :key="index" :value="item.code" :label="item.name"></el-option>
            </el-select>
            <el-select v-model="districtSel">
              <el-option v-for="(item,index) in districtList" :key="index" :value="item.code" :label="item.name"></el-option>
            </el-select>
            <div style="margin-top: 15px;width: 430px;margin-left:30px">
              <el-input type="text" style="width:100%;" v-model="personalParams.homeAddress" clearable></el-input>
            </div>
          </el-form-item>
          <el-form-item label="信用卡卡号">
            <el-input type="text" v-model="personalParams.creditCardNum"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNum">
            <el-input type="text" v-model="personalParams.phoneNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="file-upload">
      <h2 class="common-title">证件上传
        <i class="dotted"></i>
      </h2>

      <div class="card-photo">
        <div class="card-photo-div">
          <div class="card-photo-label require">身份证照片正面</div>
          <div class="uploading">
            <span class="text">上传图片</span>
            <img class="img uploading-btn" v-bind:class="{'uploading-img':idCardForward.accessPath}" :src="idCardForward.accessPath" @click="ImgClick(idCardForward.accessPath)" alt=''>
            <input type='file' accept="image/*" v-if="!idCardForward.accessPath" class='iptfileupload uploading-btn' @change='show($event, 0)'>
            <span class="delete" v-if="idCardForward.accessPath" @click="deleteImg(0)">删除照片</span>
          </div>
          <div class="model-icon">
            <span @mouseover="mouseover(0)" @mouseout="mouseout(0)">查看示意</span>
            <div class="model-hover" v-if="mouserHover[0]">
              <p class="title">
                <span class="text">注意事项</span>
                <i class="dotted"></i>
              </p>
              <ul class="model-ul">
                <li class="model-li">
                  1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                </li>
                <li class="model-li">
                  2.请确保上传图片信息清晰可辨；
                </li>
                <li class="model-li">
                  3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                </li>
              </ul>
              <p class="title">
                <span class="text">正确实例</span>
                <i class="dotted"></i>
              </p>
              <div class="img-example">
                <img :src="require('@/assets/img/u14612.png')" alt="" class="img-example">
              </div>
            </div>
          </div>
        </div>

        <div class="card-photo-div">
          <div class="card-photo-label require">身份证照片反面</div>
          <div class="uploading">
            <span class="text">上传图片</span>
            <img class="img uploading-btn" v-bind:class="{'uploading-img':idCardBack.accessPath}" :src="idCardBack.accessPath" @click="ImgClick(idCardBack.accessPath)" alt=''>
            <input type='file' accept="image/*" v-if="!idCardBack.accessPath" class='iptfileupload uploading-btn' @change='show($event,1)'>
            <span class="delete" v-if="idCardBack.accessPath" @click="deleteImg(1)">删除照片</span>
          </div>
          <div class="model-icon">
            <span @mouseover="mouseover(1)" @mouseout="mouseout(1)">查看示意</span>
            <div class="model-hover" v-if="mouserHover[1]">
              <p class="title">
                <span class="text">注意事项</span>
                <i class="dotted"></i>
              </p>
              <ul class="model-ul">
                <li class="model-li">
                  1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                </li>
                <li class="model-li">
                  2.请确保上传图片信息清晰可辨；
                </li>
                <li class="model-li">
                  3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                </li>
              </ul>
              <p class="title">
                <span class="text">正确实例</span>
                <i class="dotted"></i>
              </p>
              <div class="img-example">
                <img :src="require('@/assets/img/u14612.png')" alt="" class="img-example">
              </div>
            </div>
          </div>
        </div>

        <div class="card-photo-div">
          <div class="card-photo-label require">手持身份证照片</div>
          <div class="uploading">
            <span class="text">上传图片</span>
            <img class="img uploading-btn" v-bind:class="{'uploading-img':idCardInHand.accessPath}" :src="idCardInHand.accessPath" @click="ImgClick(idCardInHand.accessPath)" alt=''>
            <input type='file' accept="image/*" v-if="!idCardInHand.accessPath" class='iptfileupload uploading-btn' @change='show($event,2)'>
            <span class="delete" v-if="idCardInHand.accessPath" @click="deleteImg(2)">删除照片</span>
          </div>
          <div class="model-icon">
            <span @mouseover="mouseover(2)" @mouseout="mouseout(2)">查看示意</span>
            <div class="model-hover" v-if="mouserHover[2]">
              <p class="title">
                <span class="text">注意事项</span>
                <i class="dotted"></i>
              </p>
              <ul class="model-ul">
                <li class="model-li">
                  1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                </li>
                <li class="model-li">
                  2.请确保上传图片信息清晰可辨；
                </li>
                <li class="model-li">
                  3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                </li>
              </ul>
              <p class="title">
                <span class="text">正确实例</span>
                <i class="dotted"></i>
              </p>
              <div class="img-example">
                <img :src="require('@/assets/img/u14638.jpg')" alt="" class="img-example">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="append-file">
      <h2 class="common-title">辅助证件
        <i class="dotted"></i>
      </h2>
      <div class="append-file-box">
        <div class="append-file-div">
          <div class="append-file-label">征信中心报告</div>
          <div class="choice-file-btn">
            <input type="file" class="file-btn" id="file" @change='changeFile'> 选择文件
          </div>
          <span class="tip">上传辅助证件，额度会翻倍哦~</span>
          <p class="file-text" v-if="creditConterReport.originalName">
            <span class="text-name">{{creditConterReport.originalName}}</span>
            <i class="file-delete" @click="deletFile">×</i>
          </p>
        </div>

        <div class="card-photo-div">
          <div class="card-photo-label">支付宝芝麻信用</div>
          <div class="uploading">
            <span class="text">上传图片</span>
            <img class="img uploading-btn" v-bind:class="{'uploading-img':alipayCreditLegalFile.accessPath}" :src="alipayCreditLegalFile.accessPath" @click="ImgClick(alipayCreditLegalFile.accessPath)" alt=''>
            <input type='file' accept="image/*" v-if="!alipayCreditLegalFile.accessPath" class='iptfileupload uploading-btn' @change='show($event,3)'>
            <span class="delete" v-if="alipayCreditLegalFile.accessPath" @click="deleteImg(3)">删除照片</span>
          </div>
          <div class="model-icon">
            <span @mouseover="mouseover(3)" @mouseout="mouseout(3)">查看示意</span>
            <div class="model-hover" v-if="mouserHover[3]">
              <p class="title">
                <span class="text">注意事项</span>
                <i class="dotted"></i>
              </p>
              <ul class="model-ul">
                <li class="model-li">
                  1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                </li>
                <li class="model-li">
                  2.请确保上传图片信息清晰可辨；
                </li>
                <li class="model-li">
                  3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                </li>
              </ul>
              <p class="title">
                <span class="text">正确实例</span>
                <i class="dotted"></i>
              </p>
              <div class="img-example">
                <img :src="require('@/assets/img/u14692.png')" alt="" class="img-example">
              </div>
            </div>
          </div>
        </div>

        <div class="card-photo-div">
          <div class="card-photo-label">京东小白信用</div>
          <div class="uploading">
            <span class="text">上传图片</span>
            <img class="img uploading-btn" v-bind:class="{'uploading-img':jdCreditLegalFile.accessPath}" :src="jdCreditLegalFile.accessPath" @click="ImgClick(jdCreditLegalFile.accessPath)" alt=''>
            <input type='file' accept="image/*" v-if="!jdCreditLegalFile.accessPath" class='iptfileupload uploading-btn' @change='show($event,4)'>
            <span class="delete" v-if="jdCreditLegalFile.accessPath" @click="deleteImg(4)">删除照片</span>
          </div>
          <div class="model-icon">
            <span @mouseover="mouseover(4)" @mouseout="mouseout(4)">查看示意</span>
            <div class="model-hover" v-if="mouserHover[4]">
              <p class="title">
                <span class="text">注意事项</span>
                <i class="dotted"></i>
              </p>
              <ul class="model-ul">
                <li class="model-li">
                  1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                </li>
                <li class="model-li">
                  2.请确保上传图片信息清晰可辨；
                </li>
                <li class="model-li">
                  3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                </li>
              </ul>
              <p class="title">
                <span class="text">正确实例</span>
                <i class="dotted"></i>
              </p>
              <div class="img-example">
                <img :src="require('@/assets/img/u14705.jpg')" alt="" class="img-example">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-div">
      <div>
        <!-- <el-checkbox label="同意并签署“轻松付”协议" v-model="useragree"></el-checkbox> -->
        <el-checkbox v-model="useragree"></el-checkbox>
        本人已阅读并同意遵守
        <router-link to="/myqingju/quickPayAgreement">“轻松付”协议</router-link>
      </div>
      <div class="submit-btn" @click="submitClick('personalParams')">提交</div>
      <!-- <span class="return-text">返回</span> -->
    </div>
    <!-- 照片放大 -->
    <div class="photo-big" v-if="currentImg">
      <div class="photo-big-img">
        <img :src="currentImg" alt="" class="photo-big-img">
        <i class="close" @click="Jclose"></i>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";

export default {
  data () {
    return {
      useragree: false, // 用户是否同意
      mouserHover: [],
      text: '',
      currentImg: '', //当前的图片
      baseInfoData: {
        cardType: [
          { label: '身份证', value: '1' },
          { label: '港澳证', value: '2' },
          { label: '台胞证', value: '3' },
          { label: '护照', value: '4' }
        ],
        eduLevel: [
          { label: '硕士及以上', value: '1' },
          { label: '本科', value: '2' },
          { label: '大专', value: '3' },
          { label: '高中或中专', value: '4' },
          { label: '初中或以下', value: '5' }
        ]
      },
      // 规则
      rules: {
        name: [
          { required: true, message: '请输入你的姓名', trigger: 'blur' }
        ],
        cardType: [
          { required: true, message: '请选择你的证件类型', trigger: 'change' }
        ],
        cardNum: [
          { required: true, message: '请输入你的证件号码', trigger: 'blur' }
        ],
        cardEndDate: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        merryStatus: [
          { required: true, message: '请选择你的婚姻状况', trigger: 'change' }
        ],
        eduLevel: [
          { required: true, message: '请选择你的教育程度', trigger: 'change' }
        ],
        homeAddress: [
          { required: true, message: '请输入你的具体地址', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入你的手机号码', trigger: 'blur' }
        ]
      },
      provinceList: [],
      provinceSel: '',
      cityList: [],
      citySel: '',
      districtList: [],
      districtSel: '',
      idCardForward: {},
      idCardBack: {},
      idCardInHand: {},
      creditConterReport: {},
      alipayCreditLegalFile: {},
      jdCreditLegalFile: {},
      personalParams: {
        alipayCreditLegalFile: "",
        cardEndDate: "",
        cardNum: "",
        cardType: "1",
        cityId: '',
        creditCardNum: "",
        creditConterReport: "",
        districtId: '',
        eduLevel: "1",
        homeAddress: "",
        idCardBack: "",
        idCardForward: "",
        idCardInHand: "",
        jdCreditLegalFile: "",
        merryStatus: "0",
        name: "",
        phoneNum: "",
        provinceId: '',
      }
    }
  },
  watch: {
    provinceSel: function () {
      this.city()
    },
    citySel: function () {
      this.district()
    }
  },
  methods: {
    submitClick (formName) {
      if (!this.useragree) {
        this.$message('请同意并签署“轻松付”协议')
        return false
      }
      if (!this.personalParams.idCardForward) {
        this.$message('请上传身份证照片正面')
        return false
      }
      if (!this.personalParams.idCardBack) {
        this.$message('请上传身份证照片反面')
        return false
      }
      if (!this.personalParams.idCardInHand) {
        this.$message('请上传手持身份证照片')
        return false
      }
      // sessionStorage.setItem('again', true);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.personalParams.provinceId = this.provinceSel
          this.personalParams.cityId = this.citySel
          this.personalParams.districtId = this.districtSel
          api.personInfo(this.personalParams).then(res => {
            this.$message({
              message: '申请已提交',
              type: 'success'
            })
            this.$router.push({ path: '/myqingju/quickPayStatus' });
          }).catch(res => {
            this.$message.error(res.errorMsg)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    show (e, index) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      if (files[0].size / 1024 > 5000) {
        this.$message.error('图片不能大于5M')
        return false
      }
      let formData = new FormData()
      if (index === 0) {
        formData.append("auth_person_legalFile_front", files[0]);
      } else if (index === 1) {
        formData.append("auth_person_legalFile_verso", files[0]);
      } else if (index === 2) {
        formData.append("hand_person_legalFile", files[0]);
      } else if (index === 3) {
        formData.append("alipay_credit_legalFile", files[0]);
      } else if (index === 4) {
        formData.append("jd_credit_legalFile", files[0]);
      }

      api.quickPayUploadAuthFile(formData).then(res => {
        if (index === 0) {
          this.idCardForward = res.dataList[0]
          this.personalParams.idCardForward = res.dataList[0].id
        } else if (index === 1) {
          this.idCardBack = res.dataList[0]
          this.personalParams.idCardBack = res.dataList[0].id
        } else if (index === 2) {
          this.idCardInHand = res.dataList[0]
          this.personalParams.idCardInHand = res.dataList[0].id
        } else if (index === 3) {
          this.alipayCreditLegalFile = res.dataList[0]
          this.personalParams.alipayCreditLegalFile = res.dataList[0].id
        } else if (index === 4) {
          this.jdCreditLegalFile = res.dataList[0]
          this.personalParams.jdCreditLegalFile = res.dataList[0].id
        }
      }).catch(res => {
        this.$message.error({ message: res.errorMsg })
      })
    },
    // 删除照片
    deleteImg (index) {
      if (index === 0) {
        this.idCardForward = {}
        this.personalParams.idCardForward = ''
      } else if (index === 1) {
        this.idCardBack = {}
        this.personalParams.idCardBack = ''
      } else if (index === 2) {
        this.idCardInHand = {}
        this.personalParams.idCardInHand = ''
      } else if (index === 3) {
        this.alipayCreditLegalFile = {}
        this.personalParams.alipayCreditLegalFile = ''
      } else if (index === 4) {
        this.jdCreditLegalFile = {}
        this.personalParams.jdCreditLegalFile = ''
      }
    },
    // 点击图片查看大图
    ImgClick (src) {
      this.currentImg = src
    },
    // 关闭大图
    Jclose () {
      this.currentImg = false
    },
    // 上传征信中心报告
    changeFile (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      let formData = new FormData()
      formData.append('credit_conter_report', files[0])
      api.quickPayUploadAuthFile(formData).then(res => {
        this.creditConterReport = res.dataList[0]
        this.personalParams.creditConterReport = res.dataList[0].id
      }).catch(res => {
        this.$message.error({ message: res.errorMsg })
      })
    },
    // 删除征信中心报告
    deletFile () {
      this.creditConterReport = {}
      this.personalParams.creditConterReport = ''
    },
    mouseover (index) {
      this.$set(this.mouserHover, index, true)
    },
    mouseout (index) {
      this.$set(this.mouserHover, index, false)
    },
    // 获取省份
    province () {
      api.province().then(res => {
        this.provinceList = res.dataList
        this.provinceSel = res.dataList[0].code
      })
    },
    // 获取城市
    city () {
      api.city(this.provinceSel).then(res => {
        this.cityList = res.dataList
        this.citySel = res.dataList[0].code
      })
    },
    // 获取区县
    district () {
      api.district(this.citySel).then(res => {
        this.districtList = res.dataList
        this.districtSel = res.dataList[0].code
      })
    },
  },
  mounted () {
    this.province()
  }
}
</script>
<style lang="less" scoped>
.qsf-container {
  background-color: #fff;
  font-size: 14px;
}
.apply-main {
  width: 1220px;
  margin: 0 auto;
  background-color: #fff;
  padding-top: 100px;
  &::before {
    content: "";
    display: block;
  }
  .breadcrumb {
    position: relative;
    &:before {
      content: "";
      display: inline-block;
      position: absolute;
      top: -2px;
      left: 0;
      width: 3px;
      height: 20px;
      background-color: #008000;
    }
  }
  .apply-title {
    height: 40px;
    line-height: 40px;
    background-color: #d7d7d7;
    margin-top: 20px;
    padding-left: 10px;
  }
  .apply-container {
    width: 1100px;
    margin: 0 auto;
    .common-title {
      font-size: 16px;
      color: #666;
      margin-top: 50px;
      .dotted {
        display: inline-block;
        width: 995px;
        height: 10px;
        margin-left: 20px;
        border-top: 1px dotted #ccc;
        border-bottom: 1px dotted #ccc;
      }
    }
    .base-info-form {
      width: 995px;
      margin: 0 auto;
    }
    .card-photo {
      margin: 0 auto;
      margin-top: 20px;
      width: 995px;
    }
    .card-photo-div {
      height: 80px;
      margin-bottom: 10px;
      .card-photo-label {
        display: inline-block;
        width: 155px;
        text-align: right;
        margin-right: 50px;
      }
      .uploading {
        display: inline-block;
        width: 60px;
        height: 60px;
        background: url("../../../assets/img/qfs-uploading.png") no-repeat
          center 10px;
        font-size: 12px;
        color: #ccc;
        padding-top: 35px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        text-align: center;
        margin-right: 50px;
        position: relative;
        top: 15px;
        cursor: pointer;
        .delete {
          position: absolute;
          bottom: 0;
          left: 0;
          opacity: 0;
        }
        &:hover {
          .delete {
            position: absolute;
            bottom: 0;
            left: 0;
            opacity: 1;
            width: 100%;
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
        .uploading-btn {
          position: absolute;
          top: 0;
          left: 0;
          outline: none;
          opacity: 0;
          width: 100%;
          height: 100%;
          line-height: 30px;
          cursor: pointer;
        }
        .uploading-img {
          opacity: 1;
          background-color: #fff;
        }
        &:hover {
          border: 1px solid green;
        }
      }
      .model-icon {
        color: #0066cc;
        font-size: 13px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .model-hover {
        padding: 20px;
        display: inline-block;
        border: 1px solid #0066cc;
        position: absolute;
        top: -227px;
        left: 100px;
        background-color: #fff;
        border-radius: 5px;
        height: 410px;
        &:before {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 10px solid #0066cc;
          position: absolute;
          top: 50%;
          left: -10px;
        }
        &:after {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 10px solid #fff;
          position: absolute;
          top: 50%;
          left: -9px;
        }
        .title {
          width: 700px;
          margin-top: 10px;
          .dotted {
            display: inline-block;
            width: 500px;
            height: 0;
            border: 1px dashed #ccc;
          }
          .text {
            font-size: 16px;
            color: #666;
            display: inline-block;
            width: 80px;
            background-color: #fff;
          }
        }
        .model-ul {
          .model-li {
            margin-top: 20px;
            font-size: 14px;
            color: #333;
          }
        }
        .img-example {
          height: 160px;
          margin-top: 10px;
        }
      }
    }
    .footer-div {
      margin: 0 auto;
      margin-top: 50px;
      margin-left: 255px;
      .submit-btn {
        cursor: pointer;
        display: inline-block;
        width: 140px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background-color: #e4393c;
        border-radius: 5px;
        margin-top: 20px;
      }
      .return-text {
        cursor: pointer;
        font-size: 12px;
        color: #0066cc;
        margin-left: 20px;
      }
    }
    .append-file {
      margin: 0 auto;
      .append-file-box {
        margin: 50px;
        .append-file-div {
          .append-file-label {
            display: inline-block;
            width: 155px;
            margin-right: 50px;
            text-align: right;
          }
          .choice-file-btn {
            width: 100px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            background-color: #2fadd3;
            color: #fff;
            border-radius: 3px;
            margin-right: 30px;
            position: relative;
            display: inline-block;
            .file-btn {
              position: absolute;
              top: 0;
              left: 0;
              outline: none;
              opacity: 0;
              width: 100%;
              height: 100%;
              line-height: 30px;
              cursor: pointer;
            }
          }
          .file-text {
            font-size: 12px;
            color: #5cca36;
            margin-top: 10px;
            margin-left: 180px;
            .text-name {
              display: inline-block;
              min-width: 150px;
            }
            .file-delete {
              opacity: 0;
              cursor: pointer;
            }
            &:hover {
              .file-delete {
                opacity: 1;
                display: inline-block;
                width: 15px;
                height: 15px;
                line-height: 15px;
                text-align: center;
                color: #fff;
                background-color: rgba(0, 0, 0, 0.3);
                border-radius: 50%;
              }
            }
          }
          .tip {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
    .el-input {
      width: 300px;
    }
  }
}
.photo-big {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  .photo-big-img {
    width: 510px;
    height: 330px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* 黑色小关闭按钮 */
  .close {
    font-size: 24px;
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #fff;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    box-shadow: 0px 2px 5px #000;
    &::before {
      content: "×";
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: #000;
      border-radius: 50%;
      font-size: 24px;
    }
  }
}
</style>
<style>
/* 轻松付的导航 */
.breadcrumb .el-breadcrumb__inner,
.el-breadcrumb__inner a {
  margin-left: 15px;
}
.short-input .el-input,.short-input .el-input__inner  {
  width: 260px;
}
.address-input .el-input {
  width: 140px;
}
.apply-container .el-form-item__label {
  margin-right: 30px;
}
.base-info-form .el-form-item__error {
  left: 30px;
}
</style>
