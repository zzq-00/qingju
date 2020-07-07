<template>
  <div class="email-page">
    <header-register></header-register>
    <div class="email-main">
      <div class="center-box">
        <p class="main-title">邮箱找回</p>
        <img src="../../assets/img/ef.png" alt="">
        <p class="tips1">密码重设链接邮件已经发送，从链接进入即可</p>
        <p class="tips2">登录至{{showEmail}}查看</p>
        <button class="next-btn" @click="gotoNext">确 定</button>
      </div>

    </div>
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
      email: this.$route.params.id,
      showEmail: '' //在页面上显示的邮箱地址
    }
  },
  methods: {
    gotoNext() {
      this.$router.push('/login')
    },
    functions() {
      let arr = []
      var indexs = ''
      if (this.email) {
        arr = this.email.split('')
        for (let index = 0; index < arr.length; index++) {
          if (arr[index] == '@') {
            indexs = index
          }
        }
        arr.map((item, index) => {
          if (index > 3 && index < indexs) {
            arr[index] = '*'
          }
        })
        this.showEmail = arr.join('')
      }
    }
  },
  mounted() {
    this.functions()
  }
}
</script>
<style lang="less" scoped>
.email-page {
  .email-main {
    height: ~'calc(100vh - 60px)';
    background-color: #fff;
    .center-box {
      width: 500px;
      margin: 0 auto;
      text-align: center;
      .main-title {
        height: 28px;
        font-size: 30px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin: 0px 0 40px 0;
        padding-top: 82px;
      }
      img {
        width: 67px;
        height: 75px;
        display: inline-block;
      }
      .tips1 {
        margin: 29px 0 21px 0;
        height: 19px;
        line-height: 19px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
      }
      .tips2 {
        height: 15px;
        line-height: 18px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .next-btn {
        margin-top: 71px;
        width: 500px;
        height: 50px;
        line-height: 50px;
        background: rgba(3, 177, 137, 1);
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
      }
      .next-btn:hover {
        background: #21a57e;
      }
    }
  }
}
</style>
