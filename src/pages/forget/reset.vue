<template>
  <div class="reset-page">
    <header-register></header-register>
    <div class="reset-main">
      <p class="main-title">重置密码</p>
      <div class="main-center">
        <div class="minput">
          <input type="password" v-model="password" placeholder="请设置密码" @blur="validation1">
          <img src="../../assets/img/ok.png" alt="" v-if="isOK1">
          <div style="clear:both"></div>
        </div>
        <p class="minput-tips">{{tipsone}}</p>
        <div class="minputTwo">
          <input type="password" v-model="twoPassword" placeholder="请再次确定密码" @blur="validation2">
          <img src="../../assets/img/ok.png" alt="" v-if="isOK2">
          <div style="clear:both"></div>
        </div>
        <p class="minput-tips">{{tipsTwo}}</p>
        <button class="next-btn" @click="gotoNext">下一步</button>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :show-close="false">
      <span style="font-weight:bold;text-align:center;font-size:20px;">密码重置成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/fetch/api'
import headerRegister from '@/components/forgetHeaderComponent'
export default {
  components: {
    headerRegister
  },
  data() {
    return {
      password: '', //密码
      tipsone: '', //密码提示 第一个
      isOK1: false,
      isOK2: false,
      twoPassword: '', //第二次输入密码
      tipsTwo: '', //第二次输入密码
      dialogVisible: false
    }
  },
  methods: {
    validation1() {
      if (this.password) {
        this.isOK1 = true
      } else {
        this.tipsone = '请输入密码'
        this.isOK1 = false
      }
    },
    validation2() {
      if (this.twoPassword) {
        if (this.password) {
          if (this.password == this.twoPassword) {
            this.isOK1 = true
            this.isOK2 = true
          } else {
            this.tipsTwo = '两次填写的不一致，请重新设置密码'
            this.isOK2 = false
          }
        } else {
          this.tipsone = '请输入密码'
          this.isOK1 = false
        }
      } else {
        this.tipsTwo = '请再次确定密码'
        this.isOK2 = false
      }
    },
    sure() {
      this.dialogVisible = false
      this.$router.push('/login')
    },
    gotoNext() {
      if (this.password) {
        if (this.twoPassword) {
          if (this.password == this.twoPassword) {
            this.isOK1 = true
            this.isOK2 = true
            let data = {
              newPassword: this.password,
              password: this.twoPassword,
              telephone: this.$route.params.id ? this.$route.params.id : '',
              email: this.$route.params.id ? this.$route.params.id : ''
            }
            api
              .forgetPassword(data)
              .then(res => {
                if (res.errorCode == 200) {
                  // this.$router.push('/login')
                  this.dialogVisible = true
                }
              })
              .catch(res => {
                this.$message.error(res.errorMsg)
              })
          } else {
            this.tipsTwo = '两次填写的不一致，请重新设置密码'
            this.isOK2 = false
          }
        } else {
          this.tipsTwo = '请再次确定密码'
          this.isOK2 = false
        }
      } else {
        this.tipsone = '请输入密码'
        this.isOK1 = false
      }
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.reset-page {
  .reset-main {
    height: ~'calc(100vh - 60px)';
    background-color: #fff;
    .main-title {
      height: 28px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin: 0px 0 40px 0;
      padding-top: 82px;
    }
    .main-center {
      margin: 0 auto;
      width: 500px;
      .minput {
        width: 464px;
        height: 16px;
        line-height: 16px;
        padding: 18px 11px 18px 17px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 2px;
        input {
          width: ~'calc(100% - 36px)';
        }
        img {
          margin-top: 2px;
          width: 15px;
          height: 10px;
          float: right;
        }
      }
      .minput-tips {
        height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: #d71818;
        margin-top: 5px;
      }
      .minputTwo {
        margin-top: 19px;
        width: 464px;
        height: 16px;
        line-height: 16px;
        padding: 18px 11px 18px 17px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 2px;
        input {
          width: ~'calc(100% - 36px)';
        }
        img {
          margin-top: 2px;
          width: 15px;
          height: 10px;
          float: right;
        }
      }
      .next-btn {
        margin-top: 49px;
        width: 500px;
        height: 50px;
        background: rgba(3, 177, 137, 1);
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
      }
      .next-btn:hover {
        background: #21a57e;
      }
    }
  }
}
</style>
