<template>
  <div class="createProject">
    <headerComponents></headerComponents>
    <div class="createProject-main">
      <div class="createProject-content container">
        <div>一个项目，其实没那么麻烦</div>
        <div>您只需轻点鼠标，即可享受方便、快速、准确、经济的在线计量服务。</div>
        <div>
          <div @click="do2createProject">发布造价项目</div>
          <div @click="do2createBIM">发布BIM项目</div>
        </div>
      </div>
    </div>
    <createProjectFoot/>
  </div>
</template>


<script>
import headerComponents from "@/components/headerComponents";
import createProjectFoot from "./createProjectFoot";
export default {
  data() {
    return {};
  },
  methods: {
    do2createProject() {
      this.$router.push('/businessService/releaseEstimate')
    },
    do2createBIM() {
      this.$router.push('/businessService/releaseBIM')
    }
  },
  components: {
    headerComponents,
    createProjectFoot
  }
};
</script>


<style lang="less" scoped>
.createProject {
  > .createProject-main {
    background-image: url("../../assets/img/u603.png");
    background-repeat: no-repeat;
    height: 600px;
    .createProject-content {
      margin-top:130px;
      padding-top:190px;
      padding-left: 100px;
      box-sizing: border-box;
      >div {
        &:nth-child(1) {
          font-weight: 700;
          font-style: normal;
          font-size: 48px;
        }
        &:nth-child(2) {
          font-weight: 290;
          font-style: normal;
          color: #666666;
          font-size: 24px;
          margin-top:40px;
        }
        &:nth-child(3) {
          margin-top:60px;
          display: flex;
         > div {
            height: 68px;
            width: 258px;
            border:1px solid #00986a;
            text-align: center;
            line-height: 68px;
            border-radius: 68px;
            background-color: #fff;
            &:nth-child(1) {
              font-weight: 400;
              font-style: normal;
              font-size: 20px;
              color: #00986a;
            }
            &:nth-child(2) {
              margin-left: 59px;
              font-weight: 400;
              font-style: normal;
              font-size: 20px;
              color: #00986a;
            }
             &:nth-child(1):hover{
               cursor: pointer;
               background-color: #00986a;
               color:#fff;
             }
             &:nth-child(2):hover{
                cursor: pointer;
                background-color: #00986a;
                 color:#fff;
             }
          }
        }
      }
    }
  }
}
</style>


