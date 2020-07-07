<!--  -->
<template>
  <div class="mask">
    <div class="mask-box">
      <div class="mask-box-header">
        <span>提示</span>
        <span @click="sure">X</span>
      </div>
      <div class="mask-box-content">
        <p>您的注册申请已经提交成功，我们会尽快审核，请您耐心等待！</p>
        <p>在审核期间，你可以通过登录查看您的申请进度，审核处理后，我们会以短信的方式通知您，请您注意查收。
        </p>
        <div>
          <button @click="sure">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  components: {},

  computed: {},
  methods: {
    sure() {
      this.$emit('emitStep', '4')
    }
  }
}
</script>
<style lang='less' scoped>
.mask {
  width: 100%;
  height: 100%;
  background: #cccccc;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .mask-box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -123.5px;
    margin-left: -300px;
    width: 600px;
    height: 247px;
  }
  .mask-box-header {
    height: 51px;
    background: #f5fbfa;
    span:nth-child(1) {
      float: left;
      width: 36px;
      height: 18px;
      line-height: 18px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin: 17px 0 16px 21px;
    }
    span:nth-child(2) {
      float: right;
      width: 11px;
      height: 11px;
      line-height: 11px;
      color: rgba(102, 102, 102, 1);
      margin: 21px 20px 19px 0px;
      cursor: pointer;
    }
    span:nth-child(2):hover {
      color: #03b189;
    }
  }
  .mask-box-content {
    background: #ffffff;
    padding: 36px 33px 30px 22px;
    height: 130px;
    width: 545px;
    p:nth-child(1) {
      font-size: 18px;
      line-height: 18px;
      color: #555;
      font-weight: bold;
    }
    p:nth-child(2) {
      margin-top: 10px;
      font-size: 14px;
      line-height: 22px;
      color: #888888;
    }
    div {
      text-align: center;
      button {
        cursor: pointer;
        margin-top: 21px;
        width: 100px;
        height: 35px;
        background: rgba(3, 177, 137, 1);
        border-radius: 2px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
