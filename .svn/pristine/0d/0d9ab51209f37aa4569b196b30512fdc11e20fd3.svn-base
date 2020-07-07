<template>
    <div class="exchangeDetail-step">
      <div class="step">
        <div :class="stepActive>=1?'step-list  stepActive':'step-list stepDefault'">
          <div class="list">
            <div>1</div>
            <div>—————</div>
          </div>
          <div>兑换详情</div>
        </div>
        <div :class="stepActive>=2?'step-list  stepActive':'step-list stepDefault'">
          <div class="list">
            <div>2</div>
            <div>—————</div>
          </div>
          <div>确认兑换</div>
        </div>
        <div :class="stepActive>=3?'step-list  stepActive':'step-list stepDefault'">
          <div class="list">
            <div>3</div>
          </div>
          <div>兑换完成</div>
        </div>
      </div>
    </div>

</template>


<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
  },
  props:['stepActive']
}
</script>

<style lang="less" scoped>
.exchangeDetail-step {
    overflow: hidden;
    > .step {
      float: right;
      display: flex;
      .step-list {
        > div {
          &:nth-child(2) {
            font-size: 14px;
          }
        }
        >.list {
        display: flex;
        margin-left: 10px;
        margin-bottom: 12px;
        > div {
          &:nth-child(1) {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 40px;
            font-size: 18px;
          }
          &:nth-child(2) {
            line-height: 40px;
            margin: 0px 5px;
            color: #bfbfbf;
          }
        }
      }
      }

    }
  }

.stepActive {
  > .list {
      > div {
        &:nth-child(1) {
          background-color: #74cf73;
          color: #fff;
        }
      }
  }
}
.stepDefault {
  > .list {
      > div {
        &:nth-child(1) {
         background-color: #bfbfbf;
         color: #fff;
        }
      }
  }
}
</style>


