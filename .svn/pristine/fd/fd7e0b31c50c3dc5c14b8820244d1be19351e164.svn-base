<template>
  <div>
    <!-- 未开通页面 userCategoryCode-->
    <authComponent v-if="$store.state.userInfo.userCategoryCode === '2' || !!$store.state.userInfo.userCategoryCode === false "></authComponent>
    <div v-else>
      <div class="frame-container">
        <p class="page-title">组织架构</p>
        <!-- <div class="frame-total">
            <span class="text">xxxxxx公司</span>
            <span class="shrink-icon">收起</span>
            <span class="plus-icon">添加部门</span>
            <div class="contenteditable first-contenteditable">
              <el-input type="text" v-model="value" placeholder="请输入部门名称"></el-input>
              <button class="btn">{{value?'确定': '添加部门'}}</button>
            </div>
          </div> -->
        <frame-component :data="this.$store.state.struct.data" v-has="['M8JTNi']"></frame-component>
        <confirm-component :visibleProps='$store.state.struct.forbiddenVisible'>
          <template #color5>
            确认是否要删除该组织架构？
          </template>
          <p>该组织架构删除后，不能以该组织结构查看相应的信息，数据该组织架构下的人员名单自
            动成为“未添加到组织架构联系人中”。</p>
          <template #btn>
            <button @click="handleDel">确定</button>
            <button @click="$store.commit('VISIBLE')">取消</button>
          </template>
        </confirm-component>
      </div>
    </div>
  </div>
</template>
<script>
import frameComponent from '@/components/frameComponent'
import confirmComponent from '@/components/confirmComponent'
import authComponent from './roleNotAuth'
import api from '@/fetch/api'
export default {
  components: {
    frameComponent,
    confirmComponent,
    authComponent
  },
  data() {
    return {
      value: ''
    }
  },
  // methods: {
  //   // 向数据中增加一些判断条件
  //   dataAdditive (data, level) {
  //     if (data && data.length > 0) {
  //       data.forEach((item, index) => {
  //         if (Array.isArray(item.children)) {
  //           // 层级
  //           item.level = level
  //           // 是否隐藏
  //           item.visible = true
  //           this.dataAdditive(item.children, level + 1)
  //         } else {
  //           item.level = level
  //         }
  //       })
  //     }
  //   }
  // },
  // mounted () {
  //   this.dataAdditive(this.$store.state.struct.data, 0)
  // },
  computed: {
    userInfoMsg() {
      return this.$store.state.userInfo
    }
  },
  watch: {
    userInfoMsg: function(val) {
      // deptId
      // 只增加公司名 第0级
      let data = [
        {
          id: val.id,
          name: val.companyName,
          children: [],
          visible: false, // 展开/关闭
          level: 0
        }
      ]
      this.$store.commit('CHANGEDATA', data)
      this.getFirstData(data[0])
    }
  },
  methods: {
    handleDel() {
      this.$store.dispatch('deletedata', true)
    },
    getFirstData (node) {
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
    }
  },
  mounted() {
    let val = this.userInfoMsg
    if (val) {
      let data = [
        {
          id: JSON.parse(localStorage.firmId), // state的userInfo没有存公司id
          name: val.companyName,
          children: [],
          visible: false, // 展开/关闭
          level: 0
        }
      ]
      this.$store.commit('CHANGEDATA', data)
      if (data[0].id) {
        this.getFirstData(data[0])
      }
    }
  }
}
</script>
<style lang="less" scoped>
.frame-container {
  padding: 20px;
}
</style>
