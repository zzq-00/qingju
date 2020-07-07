<template>
  <div class="nav" style="margin-top: 130px;">
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">网站首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumbs: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.nav {
  background-color: #fff;
  padding: 23px 0;
  .container {
    box-sizing: border-box;
    padding: 5px 15px;
    border-left: 3px solid #008000;
  }
}
</style>
