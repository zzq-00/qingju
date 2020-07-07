<template>
  <div class="footer-per">
    <el-form ref="companyparams" :rules="rules" :model="companyparams" label-width="140px">
      <el-form-item label="企业名称" prop="name">
        <el-input type="text" v-model="companyparams.name"></el-input>
      </el-form-item>
      <el-form-item label="纳税人识别码" prop="card">
        <el-input type="text" v-model="companyparams.card"></el-input>
      </el-form-item>
      <el-form-item label="注册地址" prop="address">
        <el-select v-model="companyparams.provinceSel" class="select-qj">
          <el-option v-for="(item,index) in provinceList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select v-model="companyparams.citySel" class="select-qj">
          <el-option v-for="(item,index) in cityList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select v-model="companyparams.districtSel" class="select-qj">
          <el-option v-for="(item,index) in districtList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-input type="text" v-model="companyparams.address" :maxlength=60 style="margin-top: 20px;"></el-input>
      </el-form-item>
      <el-form-item label="注册电话" prop="mobile">
        <el-input type="text" v-model="companyparams.mobile"></el-input>
      </el-form-item>
      <el-form-item label="开户银行" prop="bank">
        <el-input type="text" v-model="companyparams.bank"></el-input>
      </el-form-item>
      <el-form-item label="银行账户" prop="bankAccount">
        <el-input type="text" v-model="companyparams.bankAccount"></el-input>
      </el-form-item>
      <i class="line"></i>
      <el-form-item label="法人姓名" prop="legalName">
        <el-input type="text" v-model="companyparams.legalName"></el-input>
      </el-form-item>
      <el-form-item label="法人身份证号码" prop="legalCode">
        <el-input type="text" v-model="companyparams.legalCode"></el-input>
      </el-form-item>
      <i class="line"></i>
      <el-form-item label="营业执照扫描件" prop="licenseUrl">
        <div class="uploading">
          <span class="text">上传营业执照</span>
          <img class="uploading-btn" alt='' :src="card.licenseUrl" :class="{'uploading-img': card.licenseUrl}">
          <input type='file' ref="licenseUrl" class='uploading-btn' accept="image/*" @change="showPhoto($event, 'licenseUrl')">
          <span class="delete" @click="deletePhotoClick('licenseUrl')" v-if="card.licenseUrl">删除照片</span>
        </div>
        <p class="gray">*请上传真实有效的营业执照扫描件，控制图片大小在2M以内，格式支持PNG、JPG。</p>
      </el-form-item>
      <el-form-item label="税务登记扫描件" prop="scansUrl">
        <div class="uploading">
          <span class="text">上传税务登记</span>
          <img class="uploading-btn" alt='' :src="card.scansUrl" :class="{'uploading-img': card.scansUrl}">
          <input type='file' ref="scansUrl" class='uploading-btn' accept="image/*" @change="showPhoto($event, 'scansUrl')">
          <span class="delete" @click="deletePhotoClick('scansUrl')" v-if="card.scansUrl">删除照片</span>
        </div>
        <p class="gray">*请上传真实有效的税务登记扫描件，控制图片大小在2M以内，格式支持PNG、JPG。</p>
      </el-form-item>
      <el-form-item label="证件照片" required>
        <template>
          <div style="display: flex;">
            <el-form-item prop="positiveUrl">
              <div class="uploading">
                <span class="text">上传身份证正面图片</span>
                <img class="uploading-btn" alt='' :src="card.positiveUrl" :class="{'uploading-img': card.positiveUrl}">
                <input type='file' ref="positiveUrl" class='uploading-btn' accept="image/*" @change="showPhoto($event, 'positiveUrl')">
                <span class="delete" @click="deletePhotoClick('positiveUrl')" v-if="card.positiveUrl">删除照片</span>
              </div>
            </el-form-item>
            <el-form-item prop="negativeUrl">
              <div class="uploading">
                <span class="text">上传身份证反面图片</span>
                <img class="uploading-btn" alt='' :src="card.negativeUrl" :class="{'uploading-img': card.negativeUrl}">
                <input type='file' ref="negativeUrl" class='uploading-btn' accept="image/*" @change="showPhoto($event, 'negativeUrl')">
                <span class="delete" @click="deletePhotoClick('negativeUrl')" v-if="card.negativeUrl">删除照片</span>
              </div>
            </el-form-item>
          </div>
        </template>
        <p class="gray">*请上传真实有效的身份证件，控制图片大小在2M以内，格式支持PNG、JPG。</p>
      </el-form-item>
    </el-form>
    <div class="footer-person">
      <el-checkbox v-model="companyparams.useragree"></el-checkbox>
      <router-link to="/Setting/agreementUser" class="agree-use" target="_blank">我已阅读并同意《青矩认证协议》</router-link><br>
      <el-button size="medium" class="submit-btn" @click="submitClick('companyparams')">提交认证</el-button>
    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";
export default {
  data() {
    return {
      companyparams: {
        name: "",
        card: "",
        address: "",
        mobile: "",
        bank: "",
        bankAccount: "",
        positiveUrl: "",
        negativeUrl: "",
        licenseUrl: "",
        scansUrl: "",
        useragree: "",
        legalName: "",
        legalCode: "",
        provinceSel: "",
        citySel: "",
        districtSel: ""
      },
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        card: [
          { required: true, message: "请输入纳税人识别码", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入注册地址", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入注册电话", trigger: "blur" }
        ],
        bank: [{ required: true, message: "请输入开户银行", trigger: "blur" }],
        bankAccount: [
          { required: true, message: "请输入银行账户", trigger: "blur" }
        ],
        legalName: [
          { required: true, message: "请输入公司的法人姓名", trigger: "blur" }
        ],
        legalCode: [
          {
            required: true,
            message: "请输入正确的公司的法人身份证号",
            trigger: "blur",
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          }
        ],
        licenseUrl: [
          { required: true, message: "请上传营业执照", trigger: "change" }
        ],
        positiveUrl: [
          { required: true, message: "请上传正面身份证件", trigger: "change" }
        ],
        negativeUrl: [
          { required: true, message: "请上传反面身份证件", trigger: "change" }
        ]
      },
      card: {
        positiveUrl: "",
        negativeUrl: "",
        licenseUrl: "",
        scansUrl: ""
      },
      forJava: {
        positiveUrl: new FormData(),
        negativeUrl: new FormData(),
        licenseUrl: new FormData(),
        scansUrl: new FormData()
      },
      provinceList: [],
      cityList: [],
      districtList: []
    };
  },
  methods: {
    showPhoto(e, url) {
      this.forJava[url] = new FormData();
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size / 1024 > 5000) {
        this.$message.error("图片不能大于5M");
        return false;
      } else if (!/\/(?:jpeg|jpg|png)/i.test(files[0].type)) {
        this.$message.error("请传入jpg,png格式的图片");
        return false;
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = e => {
          this.card[url] = e.target.result;
        };
        if (url === "positiveUrl") {
          this.forJava[url].append("auth_company_legalFile_front", files[0]);
        } else if (url === "negativeUrl") {
          this.forJava[url].append("auth_company_legalFile_verso", files[0]);
        } else if (url === "licenseUrl") {
          this.forJava[url].append("auth_company_businessFile", files[0]);
        } else if (url === "scansUrl") {
          this.forJava[url].append("auth_company_taxRegistFile", files[0]);
        }
        api
          .uploadAuthFile(this.forJava[url])
          .then(res => {
            this.companyparams[url] = res.dataList[0];
            this.card[url] = res.dataList[0].accessPath;
          })
          .catch(err => {
              this.$message.error(err.errorMsg)
          });
      }
    },
    deletePhotoClick(url) {
      this.card[url] = "";
      this.companyparams[url] = "";
      this.$refs[url].value = null;
    },
    submitClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.companyparams.useragree) {
            let data = {
              userId: JSON.parse(localStorage.QingjuuserId),
              companyName: this.companyparams.name,
              taxNumber: this.companyparams.card,
              registeredAddress: this.companyparams.address,
              registeredTelephone: this.companyparams.mobile,
              bank: this.companyparams.bank,
              bankAccount: this.companyparams.bankAccount,
              legalPersonName: this.companyparams.legalName,
              legalPersonNumber: this.companyparams.legalCode,
              businessFileId: this.companyparams.licenseUrl.id,
              taxRegistFileId: this.companyparams.scansUrl.id,
              legalFrontFileId: this.companyparams.positiveUrl.id,
              legalVersoFileId: this.companyparams.negativeUrl.id
            };
            api
              .verifyMessage({ company: this.companyparams.name })//验证企业的唯一性
              .then(resd => {
                api
                  .authCompanyInfo(data)
                  .then(res => {
                    this.$message({ type: "success", message: "提交成功" });
                    this.$emit("successClick", true);
                    // 如果用户有奖励金， 将会出现弹窗
                    if (this.$store.state.userInfo.isFriend) {
                      api.getCurrentUserRewardInfo().then(res => {
                        let data = res.dataList[0]
                        if (data.rewardUserHaveAmount) {
                          this.$confirm('审核企业实名认证，需要先提出您的奖励金?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                            this.$router.push('/myqingju/bonusSettlement')
                          }).catch(() => {
                            this.$message({
                              type: 'info',
                              message: '您的企业认证需要提出奖励金后才能审核通过'
                            });
                            this.$router.go(0)
                          });
                        }
                      })
                    } else {
                      this.$router.go(0)
                    }
                  })
                  .catch(err => {
                    //是否已经实名认证
                    this.$message({
                      type: "error",
                      message: err.errorMsg
                    });
                  });
              })
              .catch(err => {
                this.$message({ type: "error", message: err.errorMsg });
              });
          } else {
            this.$message.error("请阅读《青矩认证协议》，并点击选中");
          }
        }
      });
    },
    // 获取省份
    province() {
      api.province().then(res => {
        this.provinceList = res.dataList;
        this.companyparams.provinceSel = res.dataList[0].code;
      });
    },
    // 获取城市
    city() {
      api.city(this.companyparams.provinceSel).then(res => {
        this.cityList = res.dataList;
        this.companyparams.citySel = res.dataList[0].code;
      });
    },
    // 获取区县
    district() {
      api.district(this.companyparams.citySel).then(res => {
        this.districtList = res.dataList;
        this.companyparams.districtSel = res.dataList[0].code;
      });
    }
  },
  created() {
    this.province();
  },
  watch: {
    "companyparams.provinceSel": function() {
      this.city();
    },
    "companyparams.citySel": function() {
      this.district();
    }
  }
};
</script>
<style lang="less" scoped>
.agree-use {
  font-size: 14px;
  margin-left: 10px;
  &:hover {
    color: #009966;
  }
}
.el-form {
  .el-input {
    width: 500px;
  }
  .line {
    display: block;
    border-top: 1px solid #ccc;
    width: 80%;
    height: 20px;
    position: relative;
    left: 20px;
    top: 10px;
  }
  .gray {
    margin-top: 10px;
    color: #ccc;
  }
}
.uploading {
  display: inline-block;
  width: 200px;
  height: 140px;
  background: url("../../assets/img/qfs-uploading.png") no-repeat center 75px;
  font-size: 12px;
  color: #ccc;
  padding-top: 25px;
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
.footer-person {
  margin-left: 80px;
  .submit-btn {
    margin-top: 20px;
    background-color: #0eaf63;
    color: #fff;
  }
}
.select-qj {
  width: 150px;
}
</style>
<style lang='less'>
.footer-per {
  .el-checkbox {
    margin-right: 0;
  }
}
</style>

