<template>
  <div class="filter">
    <div class="search-part">
      <label for="search" class="title">搜索内容：</label>
      <input type="text" v-model="search" :placeholder="placeholder" style="min-width: 150px" @keyup.enter="handleSearch">
    </div>
    <div class="date-part">
      <span class="title">发布时间：</span>
      <el-date-picker class="date-style"
        clear-icon="icon-style"
        v-model="dateTime"
        value-format='yyyy-MM-dd'
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <button @click="handleSearch">搜索</button>
    <button @click="handleReset">重置</button>
    <button class="download" @click='download'>导出</button>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['placeholder'],
  data () {
    return {
      search: '',
      dateTime: []
    }
  },
  methods: {
    handleSearch(){
      let data = {
        search: this.search,
        dateTime: this.dateTime
      }
      this.$emit('handleFilter', data)
    },
    handleReset(){
      this.search = ''
      this.dateTime = []
      this.handleSearch()
    },
    download () {
      this.$emit('download')
    }
  }
}
</script>
<style lang="less" scoped>
.filter{
  height: 50px;
  padding-top: 10px;
  position: relative;
  button{
    cursor: pointer;
  }
}
.search-part, .date-part{display: inline-block;}
.title{
  font-size: 16px;
  // padding-right: 10px;
}
.search-part{
  input::-webkit-input-placeholder {
    color: #999;
  }
  input[type="text"]{
    -web-kit-appearance:none;
    -moz-appearance: none;
    outline: 0;
    color: #999;
    border-bottom: 1px solid #C2CAD8;
    height: 24px;
    padding-bottom: 5px;
    // line-height: 24px;
  }
}
.search-part + .date-part{
  padding-left: 15px;
}
.date-style{
  border:none;
  border-bottom: 1px solid #C2CAD8;
  border-radius: 0;
}
.icon-style{display: none;}
button{
  padding:6px 10px;
  font-size: 12px;
  color: #666;
  border: 1px solid #E4E4E4;
  background-color: #FCFAFA;
  margin-left: 10px;
  &:hover{
    background-color: #F2F2F2;
  }
}
.download{
  margin-top: 5px;
  position: absolute;
  right: 0;
}
</style>
