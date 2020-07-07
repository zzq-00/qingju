<template>
  <el-dialog title="提示" class="confirm-dialog" :visible="visibleProps" width="600px" :show-close="false">
    <p class="color5">
      <slot name="color5"></slot>
    </p>
    <p class="color8">
      <slot></slot>
    </p>
    <div class="footer-btn">
      <slot name="btn"></slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ['visibleProps'],
  watch: {
    visibleProps: function (newValue) {
      return newValue
    }
  }
}
</script>

<style lang="less">
  .color5{
    color: #555;
    font-size: 18px;
    line-height: 40px;
    font-weight: bold;
  }
  .color8{
    color: #888;
    line-height: 24px;
  }
  .footer-btn{
    text-align: center;
    margin-top: 20px;
    .btn-common{
      width: 100px;
      height: 33px;
      line-height: 33px;
      cursor: pointer;
    }
    button{
      &:first-child{
        .btn-common();
        background-color: #03B189;
        border: 1px solid inherit;
        color: #fff;
        &:hover{
          background-color: #21A57E;
        }
      }
      &:last-child{
        .btn-common();
        background-color: #F7F7F7;
        border: 1px solid #CCCCCC;
        color: #333;
        &:hover{
          background-color: #fff;
        }
      }
    }
    button + button{margin-left: 20px;}
  }
</style>
