<template>
  <div class="no-company-auth">
    <!-- 未开通企业认证提示页面 -->
    <p>用户管理为企业账号功能。</p>
    <p>完成
      <span class="blue-text" @click="enterpriseFn">企业实名认证</span>
      可以免费升级为企业账号，
      <span class="red-text">该功能可有效的帮助您集中管理各部门、各员工的账户。</span>
    </p>
    <p>您还可以创建多个账户，并可以对企业内账户进行开启/禁用、更改其他账户信息、设置用户权限、设置组织架构操作。</p>
    <button class="btn-common btn-submit btn-width-200" @click="enterpriseFn">
     去开通
    </button>
  </div>
</template>
<script>
import Bus from "@/assets/js/bus.js";
export default {
  methods: {
    enterpriseFn () {
      // setTimeout(() => {
      //   let data = {
      //     select:1,
      //     realNameStatus:0,
      //     type:'企业认证'
      //   }
      //   Bus.$emit("enterpriseName", data);
      // }, 1000);
      this.$router.push('/Setting/userAttestation')
    }
  }
}
</script>

<style lang="less" scoped>
.no-company-auth{
  padding: 40px;
  color: #666;
  > p{
    line-height: 28px;
    letter-spacing: 2px;
  }
}
.btn-width-200{
  width: 200px;
  height: 50px;
  letter-spacing: 4px;
  margin-top: 40px;
  &:before{
    content: '+';
    font-size: 24px;
    position: relative;
    right: 10px;
    vertical-align: bottom;
  }
}
.blue-text{
  color: #0099CC;
  text-decoration: underline;
  cursor: pointer;
}
.red-text{
  color: #FC6D6B;
}

</style>
