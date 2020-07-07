<template>
  <div>
     <bream></bream>
      <el-checkbox v-model="chkDataAll" @change="handleAllChkData" v-if="nodeData && nodeData.length">全部</el-checkbox>
      <ul v-if="nodeData && nodeData.length">
        <el-checkbox-group v-model="dataChecked" @change="handleChange">
          <li v-for="item in nodeData" :key="item.name">
            <el-checkbox :label="item.id" :disabled="item.fixed"
             @click.native="handleClick(item)">
             {{item.name}}
            </el-checkbox>
          </li>
        </el-checkbox-group>
      </ul>
      <p v-else class="no-data">暂无数据</p>
  </div>
</template>
<script>
import bream from './rolesaddBream'
export default {
  props: ['listsData'],
  components: {bream},
  data () {
    return {
      chkDataAll: false,
      dataChecked: [], // 未分配的选中
      dataItem: {},
      nodeData : []
    }
  },
  methods: {
    handleAllChkData (val) {
      let data = this.nodeData.filter(item => !item.fixed)
      if (val) {
        this.$store.commit('PUSHUSER', data)
        this.dataChecked = data.map(item => item.id)
      } else {
        this.$store.commit('POPUSER', data)
        this.dataChecked = []
      }
    },
    handleClick (item) {
      this.dataItem = item
    },
    handleChange () {
      // 已经存在的，不能改变
      if (!this.dataItem.fixed) {
        if (this.dataChecked.includes(this.dataItem.id)) {
          this.$store.commit('PUSHUSER', this.dataItem)
        } else {
          this.$store.commit('POPUSER', this.dataItem)
        }
        this.chkDataAll = this.dataChecked.length === this.nodeData.length ? true : false
      }
    },
    init (val) {
      this.dataChecked = []
      this.chkDataAll = false
      let valIDarr = val && val.map(item => {
        return {
          id: item.id,
          fixed: item.fixed
        }
      })
      let ids = val.map(item => item.id)
      this.nodeData && this.nodeData.forEach((item, index) => {
        if (ids.includes(item.id) && item.id && !this.dataChecked.includes(item.id)) {
          this.dataChecked.push(item.id)
          let idsIndex = ids.indexOf(item.id)
          item.fixed = valIDarr[idsIndex].fixed
        }
      })
      if (this.nodeData.length) {
        this.chkDataAll = this.dataChecked.length === this.nodeData.length ? true : false
      }
    }
  },
  computed: {
    stateUserList () {
      return this.$store.state.rolesList.userList;
    }
  },
  watch: {
    stateUserList: function (val) {
      this.init(val)
    },
    listsData: function (val) {
      if (val.length) {
        this.nodeData = val
        this.init(this.$store.state.rolesList.userList)
      }
    }
  },
  mounted () {
    console.log('chkinit')
    // 总数据赋值
    if (this.listsData.length) {
      this.nodeData = this.listsData
      this.chkDataAll = this.dataChecked.length === this.nodeData.length ? true : false
      this.init(this.$store.state.rolesList.userList)
    }
    
  }
}
</script>
<style lang="less" scoped>

.el-checkbox{
  padding-left: 20px;
  display: block;
  height: 40px;
  line-height: 40px;
  &:hover{
    background-color: aliceblue;
  }
}
.no-data{
  padding-left: 20px;
  margin-top: 20px;
}
.el-checkbox + .el-checkbox{margin-left: 0;}
.disabled-checkbox{
  cursor: not-allowed;
  color: #ccc;
}
</style>
