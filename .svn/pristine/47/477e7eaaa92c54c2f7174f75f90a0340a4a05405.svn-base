<template>
  <div>
    <div v-show="$store.state.rolesList.currentLevel == levelInComponent">
      <bream></bream>
      <div class="roles-ul" v-if="dataItem.length">
        <el-checkbox @change="handleCheckAllChange" v-model="checkAll">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItem"> <!-- @change="handleCheckedItemChange"  -->
          <el-checkbox v-for="(item,index) in dataItem" 
          :label="item.id" :key="index"
          :disabled="item.fixed"
          @click.native.stop.prevent="handleCheckClick(item,index)"><!-- click递归组件 数据是叠加 -->
            <span :class="{'disabled-checkbox': !!item.checked}">
              {{item.name}}
              <span class="next-span"
                @click.stop.prevent="handleNextNode(item, !!item.checked)" 
                v-if="item.depart">下级</span>
            </span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <p v-else class="no-data">暂无数据</p>
    </div>
    <rolesList v-if="dataItem.length"
      :dataItem="nextDataItem" :levelInComponent="level"></rolesList>
  </div>
</template> 
<script>
import api from '@/fetch/api'
import bream from './rolesaddBream'
export default {
  name: 'rolesList',
  props: ['dataItem', 'levelInComponent'],
  components: {
    bream 
  },
  data () {
    return {
      checkedItem: [],
      userList: [],
      nextDataItem: [],
      level: '',
      checkAll: false,
      nodeData: []
   }
  },
  methods: {
    handleCheckClick (item, index) {
      if (!item.fixed) {
        this.nodeData[index].checked = !this.nodeData[index].checked
        // this.$set(this.nodeData, index, this.nodeData[index])
        if (!!this.nodeData[index].checked) {
          this.$store.commit('PUSHUSER', this.nodeData[index])
          this.checkedItem.push(item.id)
        } else {
          this.$store.commit('POPUSER', this.nodeData[index])
          let INDEX = this.checkedItem.indexOf(item.id)
          if (INDEX > -1) {
            this.checkedItem.splice(INDEX, 1)
          }
        }
        this.checkAll = this.checkedItem.length  === this.dataItem.length ? true : false
      }
    },
    // handleCheckedItemChange (val) {
    //   console.log(val, 'val')
    // },
    handleNextNode(node, flag){
      if (!flag) {
        api.getDepartmentById(node.id).then(res => {
          this.nextDataItem = res.dataList.map(item => {
            item.level = node.level + 1
            item.checked = false
            item.depart = true
            return item
          })
          return node
        }).then((node) => {
          let data = {
            departmentId: node.id,
            firmId: JSON.parse(localStorage.firmId),
            inquiryMode: '',
            page: 1,
            pageSize: 10000
          }
          api.getUserList(data).then(res => {
            res.dataList.forEach(item => {
              let obj = {
                name: item.userName || item.code,
                id: item.userId,
                level: node.level + 1,
                checked: false
              }
              this.nextDataItem.push(obj)
            })
            this.$store.commit('PUSHBREAD', node)
            this.$store.commit('SETLEVEL', node.level + 1)
            this.level = node.level + 1
          })
        })
      }
    },
  
    handleCheckAllChange (val) {
      let data = this.nodeData.filter(item => !item.fixed)
      if (val) {
        this.nodeData = this.nodeData.map(item => {
          item.checked = true
          return item
        })
        this.checkedItem = data.map(item => item.id)
        this.$store.commit('PUSHUSER', data)
      } else {
        this.nodeData = this.nodeData.map(item => {
          item.checked = false
          return item
        })
        this.checkedItem = []
        this.$store.commit('POPUSER', data)
      }
    },
    init (val) {
      this.checkAll = false
      this.checkedItem = []
      
      let valIDarr = val && val.map(item => {
        return {
          id: item.id,
          fixed: item.fixed
        }
      })
      // 取出长度
      let ids = val.map(item => item.id)
      this.checkedItem = this.nodeData && this.nodeData.map(item => {
        if (ids.includes(item.id)) {
          return item.id
        }
      }).filter(item => !!item)

      this.nodeData && this.nodeData.map(item => {
        if (ids.includes(item.id)) {
          let idsIndex = ids.indexOf(item.id)
          item.fixed = valIDarr[idsIndex].fixed
          item.checked = true
        } else {
          item.checked = false
        }
      })
      if (this.dataItem.length) {
        this.checkAll = this.checkedItem.length  === this.dataItem.length ? true : false
      }
    }
  },
  computed: {
    stateUserList () {
      return this.$store.state.rolesList.userList
    }
  },
  watch : {
    'dataItem': function (val) {
      if (val.length) {
        console.log(val, 'val')
        this.nodeData = val
        this.init(this.$store.state.rolesList.userList)
      }
    },
    stateUserList: function (val) {
      this.init(val)
    }
  },
  mounted () {
    if (this.dataItem.length) {
      this.nodeData = this.dataItem
      this.checkAll = this.checkedItem.length  === this.dataItem.length ? true : false
    }
    this.init(this.$store.state.rolesList.userList)
  }
}
</script>
<style lang="less" scoped>
.roles-ul{
  // overflow-y: auto;
  // max-height: 400px;
  .el-checkbox{
    padding-left: 20px;
    display: block;
    height: 40px;
    line-height: 40px;
    margin-right: 30px;
    &:hover{
      background-color: aliceblue;
    }
  }
  .el-checkbox + .el-checkbox{margin-left: 0;}
}
.no-data{
  padding-left: 20px;
  margin-top: 20px;
}
.disabled-checkbox{
  cursor: not-allowed;
  color: #ccc;
}
.next-span{
  position: absolute;
  right: 10px;
  top: 10px;
  &:hover{
    color: #03b189;
  }
}
</style>

