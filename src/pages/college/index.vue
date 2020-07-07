<template>
  <div>
    <headerComponents></headerComponents>
    <div class="nopage" style="margin-top:131px;">
      <div class="container">
        <h3>本页面正在开发中，敬请期待！</h3>
      </div>
    </div>
    <footerComponents/>

  </div>
</template>

<script>
import headerComponents from "@/components/headerComponents";
import footerComponents from "@/components/footerComponents";

export default {
  components: {
    headerComponents,
    footerComponents,

  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.nopage {
  padding-bottom:100px;
  .container {
    height: 400px;
    background-color: #fff;
    text-align: center;
    padding-top: 200px;
    box-shadow: 3px 1px 5px 1px #aaa;
  }
}
h3 {
  font-size: 36px;
}
</style>
