<template>
  <div>
    <el-form ref="personalParams" :rules="rules" :model="personalParams" label-width="140px">
      <el-form-item label="姓名" prop="name">
        <el-input type="text" v-model="personalParams.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="card">
        <el-input type="text" v-model="personalParams.card"></el-input>
      </el-form-item>
      <el-form-item label="证件照片" required>
        <template>
          <div style="display:flex;">
            <el-form-item  prop="positiveUrl">
              <div class="uploading">
                <span class="text">上传身份证正面图片</span>
                <img class="uploading-btn" alt='' :src="card.positiveUrl" :class="{'uploading-img': card.positiveUrl}">
                <input type='file' ref="positiveUrl" class='uploading-btn' accept="image/*" @change="showPhoto($event, 'positiveUrl')">
                <span class="delete" @click="deletePhotoClick('positiveUrl')" v-if="card.positiveUrl">删除照片</span>
              </div>
            </el-form-item>
            <el-form-item prop="negative">
              <div class="uploading">
                <span class="text">上传身份证反面图片</span>
                <img class="uploading-btn" alt='' :src="card.negative" :class="{'uploading-img': card.negative}">
                <input type='file' ref="negative" class='uploading-btn' accept="image/*" @change="showPhoto($event, 'negative')">
                <span class="delete" @click="deletePhotoClick('negative')" v-if="card.negative">删除照片</span>
              </div>
            </el-form-item>
          </div>
          <p class='tips'>格式支持PNG、BMP、JPG，控制图片大小在2M以内</p>
        </template>
      </el-form-item>
      <el-form-item label="联系方式" prop="mobile">
        <el-input type="text" v-model="personalParams.mobile"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer-person">
      <el-checkbox v-model="personalParams.useragree"></el-checkbox>
      <router-link to="/info/Agreement" class="agree-use" target="_blank">我已阅读并同意《青矩认证协议》</router-link>
      <br>
      <el-button size="medium" class="submit-btn" @click="submitRealClick('personalParams')">提交认证</el-button>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  data () {
    var validMobile = (rule, value, callback) => {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!value) {
        callback(new Error('请输入你的手机号'))
      } else {
        if (isNaN(value)) {
          callback(new Error('手机号必须为数字'))
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
    };
    return {
      personalParams: {
        name: '',
        card: '',
        positiveUrl: '',
        negative: '',
        mobile: '',
        useragree: '',
        photo: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入你的姓名', trigger: 'blur' }
        ],
        card: [
          { required: true, message: '请输入正确的身份证号', trigger: 'blur', pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ }
        ],
        mobile: [
          { required: true, trigger: 'blur', validator: validMobile }
        ],
        negative: [
          {
            required: true, message: '请选择你的反面身份证照片',trigger: 'change'
          }
        ],
        positiveUrl: [
          {
            required: true, message: '请选择你的正面身份证照片',trigger: 'change'
          }
        ]
      },
      // 显示图片
      card: {
        positiveUrl: '',
        negative: ''
      },
      // 点击图片传值
      forJava: {
        positiveUrl: new FormData(),
        negative: new FormData()
      }
    }
  },
  mounted () {
    api.getUserInfo().then(res => {
       //手机号
       this.personalParams.mobile = res.dataList[0].telephone;
    }).catch((err)=>{
        console.log(err);
    })
  },
  methods: {
    showPhoto (e, url) {
      this.forJava[url] = new FormData()
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      if (files[0].size / 1024 > 5000) {
        this.$message.error('图片不能大于5M')
        return false
      } else if (!/\/(?:jpeg|jpg|png)/i.test(files[0].type)) {
        this.$message.error('请传入jpg,png格式的图片')
        return false
      } else {
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onloadend =  (e) => {
          this.card[url] = e.target.result
        }
        if (url === 'positiveUrl') {
          this.forJava[url].append('auth_person_legalFile_front', files[0])
        } else if(url === 'negative') {
          this.forJava[url].append('auth_person_legalFile_verso', files[0])
        }
        api.uploadAuthFile(this.forJava[url]).then(res=>{
          this.personalParams[url] = res.dataList[0]
        }).catch(err => {
            this.$message.error(err.errorMsg)
        })
      }
    },
    deletePhotoClick (url) {
      this.card[url] = ''
      this.personalParams[url] = ''
      this.$refs[url].value = null;
    },
    submitRealClick (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.personalParams.useragree&&this.personalParams.positiveUrl&&this.personalParams.negative) {
            let data = {
              certificateNumber: this.personalParams.card,
              userName: this.personalParams.name,
              userId: JSON.parse(localStorage.QingjuuserId),
              legalFrontFileId: this.personalParams.positiveUrl.id,
              legalFileFrontUrl: this.personalParams.positiveUrl.accessPath,
              legalVersoFileId: this.personalParams.negative.id,
              legalFileVersoUrl: this.personalParams.negative.accessPath,
              telephone: this.personalParams.mobile
            }
            api.authPersonInfo(data).then(res => {
              this.$message({type: 'success', message: '提交成功'})
              this.$emit('successClick', true)
              this.$router.go(0)
            }).catch((err)=>{
              //是否已经实名认证
              this.$message({type: 'error', message: err.errorMsg})
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tips{
  padding-top:10px;
  color:#797979;
  font-weight:700;
}
.agree-use{
  font-size: 14px;
  margin-left: 10px;
  &:hover{
    color: #009966;
  }
}
.el-form{
  .el-input{
    width: 500px;
  }
}
.uploading {
  display: inline-block;
  width: 200px;
  height: 142px;
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
.footer-person{
  margin-left: 80px;
  margin-top: 30px;
  .submit-btn{
    margin-top: 20px;
    background-color: #0eaf63;
    color: #fff;
  }
}
</style>
<style lang='less'>
.footer-person{
  .el-checkbox{
    margin-right:0;
  }
}
</style>
