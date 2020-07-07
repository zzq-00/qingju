<template>
  <ul class="tree-ul">
    <li class="tree-li" v-for="(item, index) in items" :key="index">
      <div class="tree-row" :class="{'root-level': item.level === 0}">
        <el-input type="text"
          v-model="valueName"
          :value="item.name"
          v-if="stateEdit[index]"
          style="width: 200px"
          @keyup.enter.native="handleEdit(item, index)"></el-input>
        <span class="text" v-else>{{item.name}}</span>
        <span :class="[item.visible ? 'plus-icon' : 'shrink-icon']"
         v-show="item.children && item.islowest !== '1'" @click="handleFlex(item)">{{item.visible ? '展开' : '收起'}}</span>
        <span class="plus-icon" @click="handlePreAdd(item, index)" v-has="['rOJ99I']">添加部门</span>
        <div class="tree-right more-handle more-handle-green" v-if="item.level !== 0">
          <!--  -->
          <p @click="handleEdit(item, index)" v-has="['ih6yV4']">{{stateEdit[index] ? '保存' : '编辑'}}</p>
          <p :class="{gray: index === 0}"  @click="moveTop($event, index)">上移</p>
          <p :class="{gray: index === items.length -1}" @click="moveDown($event, index)">下移</p>
          <p @click="handleDel(item, index, items)" v-has="['AIFSA7']">删除</p>
        </div>
      </div>
      <div class="tree-row" v-show="stateAdd[index]">
        <div class="contenteditable">
          <div class="value-input" v-for="(itemValue, itemIndex) in valueList[index]" :key="item.id + itemIndex">
            <el-input type="text" @keyup.enter.native="handleAgainAdd(item, index)"
            v-model="itemValue.name" placeholder="请输入部门名称"></el-input>
            <span class="plus-icon" @click="handleAgainAdd(item, index)" v-show="itemIndex === valueList[index].length - 1">继续添加</span>
          </div>
          <div>
            <button class="btn"  @click="handleAdd(item, index)">确定</button>
            <button class="btn-cancel"  @click="handleCancelAdd(index)">取消添加</button>
          </div>
        </div>
      </div>
      <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
      >
        <frame-list v-if="item.children" :data="item.children" v-show="!item.visible"
        :style="{'padding-left': item.level * 20 + 'px'}"></frame-list>
      </transition>
    </li>
  </ul>
</template>
<script>
import api from '@/fetch/api'
export default {
  name: 'frameList',
  props: ['data'],
  data () {
    return {
      items: [],
      valueList: [],
      stateAdd: [], // 新增部门状态
      stateEdit: [],
      valueName: ''
    }
  },
  watch: {
    'data': function (val) {
      this.items = val
    }
  },
  methods: {
    moveTop (event, index) {
      // console.log(event, 'evnet')
      // [this.data[0], this.data[1]] = [this.data[1], this.data[0]]
      let data = {
        deptId: this.items[index].id,
        sort: 'moveUp'
      }
      api.OrganizeStructureMove(data).then(res => {
        if (index !== 0) {
          this.items[index] = this.items.splice(index-1, 1, this.items[index])[0]
        }
      }).catch(err => {
        this.$message.error(err.errorMsg)
      })
    },
    moveDown (event, index) {
      let data = {
        deptId: this.items[index].id,
        sort: 'moveDown'
      }
      api.OrganizeStructureMove(data).then(res => {
        if (index !== this.items.length - 1) {
          this.items[index] = this.items.splice(index+1, 1, this.items[index])[0]
        }
      }).catch(err => {
        this.$message.error(err.errorMsg)
      })
      // console.log(event, 'evnet')
      // [this.data[0], this.data[1]] = [this.data[1], this.data[0]]
    },
    // 展开 收起 -- 当前children为空，展开请求api,当前visible切换
    handleFlex (node, flag, exportres){
      node.visible = exportres ?  !exportres : !node.visible // 添加为不隐藏
      if ((node.children && node.children.length === 0) || flag === 'add') {
        // node.id后台值
        api.getDepartmentById(node.id).then(res => {
          // store data是共享
          let resdata = res.dataList.map(item => {
            item.children = []
            item.visible = true
            item.level = node.level + 1
            item.parentId = node.id
            return item
          })
          node.children = resdata
          this.$store.dispatch('changedata')
        })
      } else {
        this.$store.dispatch('changedata')
      }
    },
    handleAdd(item, index) {
      var isVal = this.valueList[index].filter(item => {
        if (item.name) {
          return item;
        }
      })
      if (isVal.length) {
        let data = {
          deptId: item.id,
          deptInfoList: this.valueList[index] // 多了一些信息
        }
        api.addJuniorDepartment(data).then(res => {
          this.$message({
            message: '部门添加成功',
            type: 'success'
          })
          item.islowest = '0'
          this.$set(this.stateAdd, index, false)
          // 展示添加
          this.handleFlex(item, 'add', true)
        }).catch(err => {
          this.$message.error('添加失败，原因是' + err.errorMsg)
        })
      } else {
        this.$message.error('请填写部门名称')
      }
    },
    handleAgainAdd (item,index) {
      this.valueList[index].push({
        id: '',
        name: '',
        children: [],
        visible: true,
        level: item.level + 1,
        parentId: item.id
      })
      this.$set(this.valueList, index , this.valueList[index])
    },
    handleCancelAdd (index) {
      this.$set(this.stateAdd, index, false)
    },
    handlePreAdd (item, parentIndex) {
      this.$set(this.stateAdd, parentIndex, true)
      this.valueList[parentIndex] = [{
        id: '',
        name: '',
        children: [],
        visible: true,
        level: item.level + 1,
        parentId: item.id
      }]
      this.$set(this.valueList, parentIndex , this.valueList[parentIndex])
    },
    handleEdit (item, index) {
      if (this.stateEdit[index] && this.valueName.trim() !== item.name.trim()) {
        api.updateDepartment({
          id: item.id,
          name: this.valueName,
          parentId: item.parentId
        })
        .then(res => {
          item.name = this.valueName
          this.$store.dispatch('changedata')
          this.$message.success('保存成功')
        }).catch(err => {
          this.$message.error('保存失败，请稍后再试...')
        })
      } else {
        this.valueName = item.name
      }
      this.$set(this.stateEdit, index, !this.stateEdit[index])
    },
    handleDel (node, index, items) {
      let currentNode = {
        node: node,
        index: index,
        items: items
      }
      this.$store.dispatch('deletedata', currentNode)
    },
    beforeEnter (el) {
      el.style.height = '0';
    },
    enter (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      } else {
        el.style.height = '';
      }
      el.style.overflow = 'hidden';
    },
    afterEnter (el) {
      el.style.height = ''
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden';
    },
    leave (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = 0
      }
    }
  },
  mounted () {
    this.items = this.data
  },

}
</script>

<style lang="less" scoped>
.tree-ul{
  transition: height .5s;
  .tree-row{
    padding: 34px 0;
    padding-left: 30px;
    border-bottom: 1px solid #E4E4E4;
    position: relative;
    &:hover{
      background-color: #F5FBFA;
    }
  }
  .tree-right{
    position: absolute;
    right: 0;
    top: 5px;
  }
}
.text{
  padding-right: 25px;
  border-right: 1px solid #E4E4E4;
}
.icon{
  padding-left: 20px;
  vertical-align: middle;
  color: #999;
  cursor: pointer;
  &:before{
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    border: 1px solid;
    text-align: center;
    margin-right: 5px;
    color: inherit;
  }
}
.plus-icon{
  .icon();
  &:before{
    content: '+';
  }
  &:hover{
    color: #22BB98;
  }
}
.shrink-icon{
  .icon();
  &:before{
    content: '-';
  }
}
.contenteditable{
  .el-input{
      width: 350px;
  }
  @media screen and (min-width: 1700px){
    .el-input{
      width: 450px;
    }
  }
  .btn{
    width: 120px;
    height: 40px;
    text-align: center;
    margin-top: 20px;
    background-color: #101920;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .btn-cancel{
    .btn();
    background-color: #F7F7F7;
    color: #101920;
    border: 1px solid #D4D5D6;
    margin-left: 20px;
  }
}
.first-contenteditable{
  @media screen and (max-width: 1700px){
    .el-input{
      width: 250px;
    }
  }
}
.tree-ul .root-level{
  padding-left: 0;
  .text{
    color: #666;
    &:before{
      content: '';
      display: inline-block;
      width: 11px;
      height: 11px;
      border-left: 1px solid #D4D5D6;
      border-bottom: 1px solid #D4D5D6;
      margin-right: 10px;
    }
  }
}
.value-input{
  margin-top: 20px;
}
</style>

