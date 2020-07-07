<template>
  <div>
    <div class="mask"></div>
    <div class="form">
      <p class="sign-title">我要报名</p>
      <el-form label-width="50px">
        <el-form-item label="姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="公司">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="signBtn popBtn">我要报名</div>
          <div class="cancelBtn popBtn">取消</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  //子组件内用事件
  created () {
  }
};
</script>

<style lang='less' scoped>
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 200;
    background-color: rgba(0,0,0,.2);
  }
  .form{
    padding-top: 35px;
    .sign-title{
      font-size: 24px;
      color: #333;
      text-align: center;
      margin-bottom: 35px;
      font-weight: bold;
    }
    .el-form{
      padding: 0 100px 50px 100px;
    }
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 300;
    background-color: #fff;
    .el-input{
      width: 400px;
    }
    .el-textarea{
      width: 470px;
    }
    .popBtn{
      width: 140px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      float: left;
      border-radius: 5px;
      background-color: #fff;
    }
    .signBtn{
      background-color: #00cc66;
      color: #fff;
      margin-left: 50px;
    }
    .cancelBtn{
      color: #ff9900;
      border: 1px solid #d7d7d7;
      margin-left: 50px;
    }
  }
</style>
