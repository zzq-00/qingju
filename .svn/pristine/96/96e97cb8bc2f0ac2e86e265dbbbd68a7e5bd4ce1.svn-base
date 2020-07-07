<template>
    <div class="design-container">
      <p class="design-title">装饰封面</p>
      <el-upload
        ref="upload"
        class="btn-load"
        :action="httpHead+'home/setCover'"
        name="headImage"
        :data = someData
        with-credentials
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-change="handlePreview"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false">
        <div v-if="imageUrl" class="has-img-block">
          <img :src="imageUrl" class="avatar">
          <span class="btn-edit">点击图片重新编辑</span>
        </div>
        <span v-else class="avatar-uploader-icon">上传封面</span>
      </el-upload>
      <p class="design-text">推荐1920*160像素，JPG/PNG ，3M以内</p>
      <div class="btn">
        <button class="btn-cancel" @click="handleCancel">返回</button>
        <button class="btn-save" @click="handleSave">保存设置</button>
      </div>
      <div class="block" v-if="false">
        <router-link to="/myqingju/project" class="card card-01"></router-link>
        <router-link to="/myqingju/financeCenter" class="card card-02"></router-link>
        <router-link to="/myqingju/quickPayBill" class="card card-03"></router-link>
      </div>
    </div>
</template>
<script>
import api from '@/fetch/api'
export default {
   data () {
    return {
      imageUrl: '',
      httpHead: process.env.API_ROOT,
      someData : {
        'oldName': ''
      }
    }
   },
   methods: {
    handleAvatarSuccess () {
      this.$message.success('设置成功')
      this.handleCancel()
    },
    handlePreview(file) {
      if (this.beforeAvatarUpload(file)) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$store.commit('setHeaderIcon', this.imageUrl)
      }
    },
    beforeAvatarUpload(file) {
      let type = file.type ? file.type : file.raw.type
      const isJPG = type === 'image/jpeg';
      const isPNG = type === 'image/png';
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片是 JPG / PNG 格式!');
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }
      return (isJPG || isPNG) && isLt3M;
    },
    handleCancel () {
      // this.imageUrl = ''
      // this.$router.go(-1)
      this.$store.commit('changeHeaderIcon', false)
      api.getFrontDeskUserInfo(JSON.parse(localStorage.QingjuuserId)).then(res => {
        let cover = res.dataList[0].cover
        this.$store.commit('setHeaderIcon', cover)
      })
    },
    handleSave () {
      this.$refs.upload.submit();
    },
   },
}
</script>

<style lang="less" scoped>

.design-container{
  min-width: 1200px;
  height: ~'calc(100vh - 260px)';
  background-color: #F8F9FA;
}
/* 布局 */
@media screen and (min-width: 1200px) {
  .design-container {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media screen and (min-width: 1500px) {
  .design-container {
    width: auto;
    margin-left: 150px;
    margin-right: 150px;
  }
}
.design-title{
  font-size: 20px;
  font-weight: bold;
  margin: 40px 0 30px 0;
  text-align: center;
}
.hidden-load{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 80px;
  height: 30px;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}
.avatar{
  height: 170px;
}
.btn-load{
  background-color: #fff;
  height: 170px;
  border: 1px solid rgba(230, 230, 230, 1);
  text-align: center;
  position: relative;
  .avatar-uploader-icon{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: 1px solid rgba(0, 179, 139, 1);
    background-color: rgba(242, 242, 242, 1);
    border-radius: 20px;
    color: rgba(0, 179, 139, 1);
    font-size: 12px;
    cursor: pointer;
  }
}
.design-text{
  margin: 40px 0;
  text-align: center;
}
.btn{
  text-align: center;
}
.btn-cancel{
  width: 140px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #FF9900;
  background-color: rgba(249, 249, 249, 1);
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgba(215, 215, 215, 1);
}
.btn-save{
  width: 140px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #FFF;
  background-color: rgba(0, 152, 101, 1);
  margin-left: 50px;
  border-radius: 5px;
  cursor: pointer;
}
.block{
  display: flex;
  justify-content: space-between;
  margin: 100px 0 ;
  .card{
    width: 370px;
    height: 240px;
    background-color: #fff;
    border: 1px solid rgba(230, 230, 230, 1);
    font-weight: bold;
    position: relative;
    &:hover{
      box-shadow: 3px 3px 10px 0 #ccc;
    }
    &:before{
      font-size: 16px;
      position: relative;
      top: -30px;
    }
    &:after{
      content: '查看项目 >';
      color: #0EAF63;
      position: absolute;
      bottom: 10px;
      left: 150px;
    }
  }
  .card-01{
    &:before{
      content: '项目管理';
    }
  }
  .card-02{
    &:before{
      content: '财务';
    }
  }
  .card-03{
    &:before{
      content: '轻松付';
    }
  }
}
.has-img-block{
  .btn-edit{display: none;}
  &:hover{
    .btn-edit{display: block;}
  }
}
.btn-edit{
  height: 30px;
  line-height: 30px;
  color: #0EAF63;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 5px;
}
</style>
