<template>
  <div class="control-container">
    <header-components></header-components>
    <div class="container">
      <h3>发布项目流程</h3>
      <img :src="require('@/assets/img/releaseEstimate.png')" alt="">
      <ul>
        <li>1）填写项目名称；</li>
        <li>2）选择计费方式，分别为：以建筑面积计算、以预算价或招标价计算、单独委托钢筋算量、单独CAD处理；</li>
        <li>3）选择工程类型和专业类型；</li>
        <li>4）填写工期及质量要求；</li>
        <li>5）对于特殊要求在项目描述中进行补充；</li>
        <li>6）确认发布项目；</li>
        <li>7）30分钟内得到青矩平台报价，在“我的主页”项目列表中选择“托管”，进入托管页面，确认项目报价后选择托管或者放弃，在托管前请确保个人用户资金符合项目所需金额。</li>
        <li>8）待项目完成后给予验收并评价。</li>
      </ul>
    </div>
    <footerComponents />
  </div>
</template>
<script>
import headerComponents from "@/components/headerComponents";
import footerComponents from "@/components/footerComponents";

export default {
  components: {
    headerComponents,
    footerComponents
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.control-container {
  background-color: #fff;
  .container {
    margin-top: 130px;
    padding: 60px 0;
    > h3 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    > ul {
      font-size: 14px;
      li {
        line-height: 28px;
        text-indent: 28px;
      }
    }
  }
}
</style>

