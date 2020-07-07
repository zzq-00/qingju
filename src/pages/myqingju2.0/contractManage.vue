<template>
  <div class="project">
    <p class="page-title">合同管理</p>
    <filterComponent @handleFilter="handleFilter" @download="download" :placeholder="'项目名称、真实姓名'"></filterComponent>
    <el-table ref="multipleTable" :data="tableData" 
      class="myQingju-table"
      @selection-change="changeFun"
      @select="selectMemoryFn"
      @select-all="selectAll">
      <el-table-column
        width="55"
        label="213"
        type="selection"
        class-name='selection-self'
        >
      </el-table-column>
      <el-table-column label="项目信息" show-overflow-tooltip min-width="200">
        <template slot-scope="scope">
          <p class="project-name">{{scope.row.projectName}}</p>
          <!-- <p class="project-name" @click="gotoDetail(scope.row.projectBaseId,scope.row.projectBaseType)">{{scope.row.projectName}}</p> -->
          <p>
            <span class="name" :to="{path: '/myqingju/userDetails', query: {userId: scope.row.userId}}" target="_blank">
              {{scope.row.publisherName }} 
            </span>
            <span class="time">发布于{{scope.row.createTime}}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="" prop="">
        <template slot-scope="scope">
          <div class="type">
          <p   class="type-text" v-for="item in scope.row.projectInfos" :key="item.projectInfoId" 
            :style="{backgroundColor: computedBackgroundColor(item.professional).color}">
            {{computedBackgroundColor(item.professional).name}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="申请日期" prop="inputTime" min-width="200" :render-header="renderSort"></el-table-column>
      <el-table-column label="合同编号" prop="number" :render-header="renderSort" show-overflow-tooltip min-width="120"></el-table-column>
      <el-table-column label="合同状态" prop="status" :render-header="renderStatus" min-width="150">
        <template slot-scope="scope">
          <span :style="{color: scope.row.status === '签约成功' ? '#F41313' : ''}">{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="more-handle more-handle-green">
            <p @click="clickView(scope.row.id)"  v-if="scope.row.status !='申请签约'">查看</p>
            <p @click="clickApply(scope.row.signUrl)"  v-if="scope.row.status=='申请签约'">续签合同</p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-layout">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import filterComponent from '@/components/filterTableComponent'
import selectFilterComponent from '@/components/filterComponent'
import {hasClass, addClass, removeClass} from '@/assets/js/classname'
import sortCommon from '@/components/sortCommon'
import { downloadBlob } from '@/assets/js/date-format'

import api from '@/fetch/api'
export default {
  components: {filterComponent},
  data () {
    return {
      tableData:[],
      currentPage : 1,
      dataForBE: {
        page: 1,
        searchContent: '',
        size: 20,
        status: [],
        sort: 'desc',
        field: 'inputTime'
      },
      total: 0,
      chkStatusSelectData: [],
      filterStatusData: [
        { name: '签约成功', value: '签约成功' },
        { name: '申请作废', value: '申请作废' },
        { name: '申请签约', value: '申请签约' },
        { name: '已作废', value: '已作废' }],
      indeterminate: false,
      multipleSelection: [], // 选中的数据二维数组
      ids: [], // 选中的数据id数组
      selectAllChk: false, // 是否全选
    }
  },
  methods: {
    computedBackgroundColor (item) {
      switch (item) {
        case '土建工程':
          return {
            name: '土建',
            color: '#ff5e5b'
          }
          break;
        case '安装工程':
          return {
            name: '安装',
            color: '#00b38b'
          }
          break;
        case 'BIM':
          return {
            name: 'BIM',
            color: '#46b620'
          }
          break;
        case '青矩设计':
          return {
            name: '设计',
            color: '#cc0066'
          }
          break;
        case '智能建模':
        case '结构智能建模':
          return {
            name: '智能建模',
            color: '#33cccc'
          }
          break;
        default:
          return '#009966'
          break;
      }
    },
    handleSizeChange (val) {
      this.dataForBE.size = val
      this.getTable()
    },
    handleCurrentChange (val) {
      this.dataForBE.page = val
      this.getTable()
    },
    // 合同列表
    getTable() {
      // this.contractList = []
      api.getContractInfoList(this.dataForBE).then(res => {
        this.tableData = [...res.dataList]
        this.total = res.count
      })
    },
    filterChkStatusClick (val) {
      this.currentPage = 1
      this.dataForBE.page = 1
      if (val.length) {
        this.dataForBE.status = val
      } else {
        this.dataForBE.status = []
      }
      this.chkStatusSelectData = val
      this.getTable()
    },
    renderStatus (h, {column}) {
      return h(
        'div', [
          h('span', column.label),
          h('el-popover', {
            props: {
              trigger: 'click',
              'visible-arrow':false,
              'popper-class': 'filterPopver' 
            },
          },
          [
            h(selectFilterComponent, { // 自定义不需要引号
              props: {
                filterData: this.filterStatusData,
                chkSelectData: this.chkStatusSelectData,
                multiple: true,
              },
              on: {
                filterClick: this.filterChkStatusClick
              }
            }),
            h('span',
            {
              class: {
                triangle: true,
                'active-triangle': this.chkStatusSelectData.length
              },
              slot: 'reference'
            })
          ],
          ),
        ]
      )
    },
    // 查看
    clickView(id) {
      api.preview(id).then(res => {
        window.open(res.dataList[0])
      })
    },
    clickApply(signUrl) {
      window.open(signUrl)
    },
    handleFilter (data) {
      this.currentPage = 1
      this.dataForBE.page = 1
      this.dataForBE.searchContent = data.search
      this.dataForBE.inputTimeMax = data.dateTime[1]
      this.dataForBE.inputTimeMin = data.dateTime[0]
      this.clearChk()
      this.getTable()
      this.getAllTableData()
    },
     getAllTableData () {
      return new Promise((resolve, reject) => {
        let data = Object.assign({}, this.dataForBE)
        data.size = 10000
        api.getContractInfoList(data).then(res => {
          this.allTableData = res.dataList
          resolve()
        })
      })
    },
    changeFun (val) { // 保存已选数据id到数组，供后续操作（与分页记忆无关）
      this.$nextTick(() => {
        let ids = []
        this.multipleSelection.forEach(L => L.forEach(M => ids.push(M.projectBaseId)))
        this.ids = ids
        if (this.allTableData.length !== this.ids.length && this.ids.length) {
          this.indeterminate = true
        } else {
          this.indeterminate = false
        }
        // 成全选
        if (this.ids.length === this.allTableData.length && this.allTableData.length) {
          this.selectAllChk = true
        }
        // 表头的状态
        this.getChkClassName()
      })
    },
    selectAll (selection) { // 全选切换方法
      // 改变el-table
      let page
      if (this.allTableData) {
        page = this.allTableData.length / this.dataForBE.size
      }
      if (!this.ids.length || (this.indeterminate && this.ids.length)) { // 全选
        for(let i = 0; i < page; i++){
          this.multipleSelection[i] = this.allTableData.slice((i)*this.dataForBE.size ,(i + 1)*this.dataForBE.size)
        }
        // 条件：有选中长度  selection selectAll受el-table组件影响
        if (this.indeterminate && this.ids.length && !selection.length) {
          this.setCurrent()
        }
        this.selectAllChk = true
        this.indeterminate = false
      } else { // 全不选
        for(let i = 0; i < page; i++){
          this.multipleSelection[i] = []
        }
        this.selectAllChk = false
        this.indeterminate = false
      }
      // this.getChkClassName()
    },
    selectMemoryFn (val, row) { // 设置分页记忆二位数组方法
      // 注意：val 传过来默认为数组类型 ，row 为 Object（当前选择数据对象）
      let currentArr = this.multipleSelection[this.currentPage - 1] // 当前分页对应数组
      if (!currentArr) {
        this.multipleSelection[this.currentPage - 1] = val // 不存在这个二维数组，则创建这个二位数组
      } else { // 存在
        if (val.includes(row)) { // 选中
          this.multipleSelection[this.currentPage - 1] = val
          // 循环
        } else { // 取消
          currentArr.forEach(item => {
            if (item.projectBaseId === row.projectBaseId) {
              delete currentArr[currentArr.indexOf(item)]
            }
          })
        }
      }
      // this.getChkClassName()
    },
    selectMemoriedDataFn () { // 分页记忆自动选中方法
      if (this.selectAllChk && !this.multipleSelection[this.currentPage - 1]) {
        this.$refs.multipleTable.toggleAllSelection()
      }
      if ((this.allTableData.length !== this.ids.length) && this.ids.length) {
        this.indeterminate = true
      }
      this.setCurrent()
      // 选择框样式
      this.getChkClassName()
    },
    setCurrent () {
      let currentArr = this.multipleSelection[this.currentPage - 1]  // 当前分页对应被选中数据
      if (currentArr && currentArr.length) { // 存在则继续执行
        let tempRowsIDs = this.tableData && this.tableData.map(L => L.projectBaseId) // 当前分页被选中数据的id集合
        currentArr.forEach((item, index) => { // 遍历当前分页被选中数据
          if (tempRowsIDs.includes(item.projectBaseId)) { // id匹配上，则选中
            this.$refs.multipleTable.toggleRowSelection(this.tableData[tempRowsIDs.indexOf(item.projectBaseId)])
          }
        })
      }
    },
    getChkClassName() {
      let dom = document.querySelector('.selection-self .el-checkbox__input')
      if (!this.ids.length) {
        removeClass(dom, 'is-checked')
        removeClass(dom, 'is-indeterminate')
      } else if (this.indeterminate) {
        this.$nextTick(() => {
          addClass(dom, 'is-indeterminate')
          removeClass(dom, 'is-checked')
        })
      } else if (this.selectAllChk) {
        this.$nextTick(() => {
          addClass(dom, 'is-checked')
          removeClass(dom, 'is-indeterminate')
        })
      }
    },
    clearChk () {
      this.indeterminate = false
      this.selectAllChk = false
      this.multipleSelection = []
      this.ids = []
    },
    renderSort (h, {column}) {
      return h(
        sortCommon,{
          props: {
            label: column.label,
            sortProp: column.property,
            sortDefault: this.dataForBE[column.property] // 切换监听对应
          },
          on: {
            handleSortChange: this.handleSortChange
          }
        }
      )
    },
    handleSortChange (col) {
      // 切换 组件会监听
      this.dataForBE.number = ''
      this.dataForBE.inputTime = ''
      // 根据后台字段排序
      this.dataForBE[col.prop] = col.order;

      this.dataForBE.sort = col.order
      this.dataForBE.field = col.prop
      this.getTable()
    },
    download () {
      this.dataForBE.id = this.ids
      let data = Object.assign({}, this.dataForBE)
      data.size = 10000
      api.contractListExport(data).then(res => {
        downloadBlob(res, '合同管理')
      })
    },
  },
  mounted () {
    this.getTable() //合同列表
    this.getAllTableData()
  }
}
</script>
<style lang="less" scoped>
.project{
  background-color: #fff;
  padding: 20px;
  // .title{
  //   font-size: 18px;
  //   padding-bottom: 15px;
  //   border-bottom: 1px solid #D7D7D7;
  // }
  .name{
    color: #00B38A;
  }
  .time{
    color: #D5D4D4;
  }
  .type > p{
    width: 80px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    text-align: center;
  }
}
.project-name{
  margin-bottom: 15px;
}
.type-text{
  margin-bottom: 10px;
  border-radius: 2px;
}
</style>
