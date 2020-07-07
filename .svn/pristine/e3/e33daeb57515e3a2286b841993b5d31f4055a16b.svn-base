<template>
  <div>
    <ul v-if="multiple" class="filter-ul">
      <li v-for="item in filterData" :key="item.value"><!-- :class="{'selected': chkSelectData.includes(item.value)}" -->
        <el-checkbox v-model="checkedAllData" :label="item.value" @change="handleClick(checkedAllData)">
          {{item.name}}
        </el-checkbox>
      </li>
      <li class="choice" v-if="choice">
        <span class="sort" @click="handleClick(filterData.map(item => item.value))">全选</span>
        <span @click="handleClick([])">取消全选</span>
      </li>
    </ul>
    <ul v-else class="filter-ul">
      <li v-for="item in filterData" :key="item.value"
        :class="{'selected': radSelectData === item.value}"
        @click="handleClick(item)">
          {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['multiple', 'filterData', 'chkSelectData', 'radSelectData', 'choice'], // 多选 列表数据 多选值 单选值 项目列表特殊加一行
  data () {
    return {
      checkedAllData:[],
    }
  },
  methods: {
    handleClick (val) {
      this.checkedAllData = val
      this.$emit('filterClick', val)
    },
  },
  mounted () {
    if (this.chkSelectData) {
      this.checkedAllData = this.chkSelectData
    }
  }
}
</script>
<style lang="less" scoped>
.filter-ul{
  .selected{
    color: #009966;
    font-weight: 700;
  }
  >li{
    cursor: pointer;
    line-height: 32px;
    padding: 0 20px;
    &:hover{
      background-color: #f5f7fa;
    }
  }
  .choice{
    padding-top: 10px;
    font-size: 14px;
    color: #666;
    border-top: 1px solid #ebeef5;
    &:hover{
        color: #666;
    }
    > span{
      cursor: pointer;
      &:hover{
        color: #03B189;
      }
    }
    .sort{
      margin-right: 10px;
    }
  }
}
</style>
