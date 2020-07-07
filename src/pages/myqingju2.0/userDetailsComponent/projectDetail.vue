<template>
  <div class="project">
    <!-- <p class="page-title" v-has="['5aLq6M']">所有项目</p> -->
    <!-- 
      @selection-change="changeFun"
      @select="selectMemoryFn"
      @select-all="selectAll" -->
    <!-- <filterComponent @handleFilter="handleFilter" @download="download"></filterComponent> -->
    <button class="download" @click="download">导出</button>
    <el-table ref="multipleTable" :data="tableData"  
      class="myQingju-table">
      <!-- <el-table-column
        width="55"
        label="213"
        type="selection"
        class-name='selection-self'
        >
      </el-table-column> -->
      <el-table-column label="项目信息" prop=""  min-width="200">
        <template slot-scope="scope">
          <p class="project-name" @click="gotoDetail(scope.row.projectBaseId,scope.row.projectBaseType)">{{scope.row.name}}</p>
          <p><!-- , query: {userId: JSON.parse(localStorage.QingjuuserId) -->
            <router-link class="name" :to="{path: '/myqingju/userDetails', query: {userId: scope.row.userId}}" target="_blank">{{scope.row.publisherName}}</router-link>
            <span class="time">发布于{{scope.row.publishTime}}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="项目类型" prop="" :render-header="renderType" >
        <template slot-scope="scope">
          <div class="type">
            <p class="type-text" v-for="item in scope.row.engineers" :key="item.projectInfoId"
            :style="{backgroundColor: computedBackgroundColor(item.professional).color}">
            {{computedBackgroundColor(item.professional).name}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="项目金额" prop="amount" :render-header="renderSort">
        <template slot-scope="scope">
          {{scope.row.amount | formatMoney}}
        </template>
      </el-table-column>
      <el-table-column label="完成时间" prop="checkedTime"  :render-header="renderSort">
        <!-- <template slot-scope="scope">
          <p v-for="item in scope.row.engineers" :key="item.projectInfoId">
            {{item.checkedTime}}
          </p>
        </template> -->
      </el-table-column>
      <el-table-column label="承接部门" prop="workstationName" >
        <template slot-scope="scope">
            <p v-for="item in scope.row.engineers" :key="item.projectInfoId">
              {{item.workstationName}}
            </p>
        </template>
      </el-table-column>
      <el-table-column label="项目状态" prop="status" :render-header="renderStatus" >
        <template slot-scope="scope">
          <span  :style="{color: computedColor(scope.row.status)}">
            {{scope.row.status}}
          </span>
        </template>
      </el-table-column><!--  :render-header="renderBill" -->
      <el-table-column label="发票情况" prop="billingStatus" ></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <div class="more-handle more-handle-green"  v-if="scope.row.userId === rootId">
            <p v-if="scope.row.invoiceButton === 'true'" @click="toApplyBill(scope.row)">申请发票</p>
            <p v-if="scope.row.status === '已完成' && scope.row.projectBaseType === '1'" @click="gotoDetail(scope.row.projectBaseId,scope.row.projectBaseType, '#path')">申请售后</p>
            <p><router-link v-if="scope.row.status === '已完成'"  :to="{path: `/myqingju/evaluation/${scope.row.projectBaseId}`}" target="_blank">评价</router-link></p>
            <p v-if="scope.row.status === '待托管'  || scope.row.isThereAnySurcharge" @click="gotoDetail(scope.row.projectBaseId,scope.row.projectBaseType)">托管资金</p>
            <p v-if="scope.row.status === '待验收'" @click="gotoDetail(scope.row.projectBaseId,scope.row.projectBaseType)">验收项目</p>
            <p v-if="scope.row.status === '已驳回'"  @click="reEdit(scope.row)">重新编辑</p>
            <div  class="more-handle more-handle-green" >
              <p v-if="scope.row.status === '已驳回' ">
                <el-popover placement="left" width="300" trigger="click">
                  <div class="reject-reason">
                    <h5>驳回原因</h5>
                    <p>{{theReasonForTheRejection.rejectRemark}}</p>
                    <p>{{theReasonForTheRejection.rejectTime}}</p>
                  </div>
                  <p  slot="reference" @click="getTheReasonForTheRejection(scope.row.projectBaseId)">查看驳回原因</p>
                </el-popover>
              </p>
              <p @click="reEdit(scope.row)">使用该模板</p>
            </div>
            
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
        :total="total"
        border>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import filterComponent from '@/components/filterTableComponent'
import selectFilterComponent from '@/components/filterComponent'
import { downloadBlob } from '@/assets/js/date-format'
import {hasClass, addClass, removeClass} from '@/assets/js/classname'
import sortCommon from '@/components/sortCommon'

import api from '@/fetch/api'
export default {
  components: {filterComponent},
  data () {
    return {
      tableData:[],
       rootId: JSON.parse(localStorage.QingjuuserId),
      currentPage : 1,
      dataForBE: {
        page: 1,
        pageSize: 20,
        userId: this.$route.query.userId,
        checkedTime: '',
        amount: '',
      },
      indeterminate: false,
      multipleSelection: [], // 选中的数据二维数组
      ids: [], // 选中的数据id数组
      selectAllChk: false, // 是否全选
      total: 0,
      theReasonForTheRejection: {},
      // 项目类型
      filterTypeData: [
        {
          name: '计量',
          value: '1'
        },
        {
          name: 'BIM',
          value: '2'
        },
        {
          name: '设计',
          value: '3'
        },
        {
          name: '智能建模',
          value: '4'
        },
      ],
      chkTypeSelectData: [],
      // 项目状态
      filterStatusData: [],
      chkStatusSelectData: ['1', '2', '3', '4', '5', '6', '7'],
      allTableData: [], // 表格的所有数据
      amountArrow: {
        default: true,
        up: false,
        down: false
      }
      // 发票
      // filterBillData: [],
      // chkBillSelectData: [],
    }
  },
  methods: {
    toApplyBill (row) {
      window.localStorage.proArr = JSON.stringify([row])
      let routeData = this.$router.resolve('/ticketApply')
      window.open(routeData.href, '_blank');
    },
    computedColor(val) {
      if (val === '待审批' || val === '待确定' || val === '未开始' || val === '工作中') {
        return '#46B620'
      }
      if (val === '待验收' || val === '待托管') {
        return '#F41313'
      }
      if (val === '已驳回' || val === '已关闭') {
        return '#C2CAD8'
      }
      return '#333333'
    },
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
          return {
            name: '',
            color: '#009966'
          }
          break;
      }
    },
    gotoDetail (baseId, baseType, path = '') {
      let routerPath
      if (baseType === '1') {
        routerPath = this.$router.resolve('/myqingju/projectDetail/' + baseId + path)
      } else if (baseType === '2') {
        routerPath = this.$router.resolve('/myqingju/BIMDetail/' + baseId)
      } else if (baseType === '3') {
        routerPath = this.$router.resolve('/myqingju/designDetail/' + baseId)
      } else if (baseType === '4') {
        routerPath = this.$router.resolve('/myqingju/modelingDetail/' + baseId)
      }
      window.open(routerPath.href, '_blank')
    },
    handleSizeChange (val) {
      this.dataForBE.pageSize = val
      this.getTable()
    },
    handleCurrentChange (val) {
      this.dataForBE.page = val
      this.getTable()
    },
    getTable () {
      api.selfProjectList(this.dataForBE).then(res => {
        this.tableData = res.dataList
        this.total = res.count
      })
    },
    handleFilter (data) {
      // 筛选初始化
      this.currentPage = 1
      this.dataForBE.page = 1
      this.dataForBE.keyword = data.search
      this.dataForBE.publishTimeMax = data.dateTime[1]
      this.dataForBE.publishTimeMin = data.dateTime[0]
      this.getTable()
      // this.getAllTableData()
    },
    // 查看驳回原因
    getTheReasonForTheRejection (id) {
      api.getTheReasonForTheRejection(id).then(res => {
        this.theReasonForTheRejection = res.dataList[0]
      })
    },
     // 重新编辑
    reEdit (data) {
      if (data.projectBaseType === '1') {  // 计量
        this.$router.push('/businessService/releaseEstimate?reEditId=' + data.projectBaseId)
      } else if (data.projectBaseType === '4') {  // 智能建模
        this.$router.push('/businessService/releaseModeling?reEditId=' + data.projectBaseId)
      } else if (data.projectBaseType === '2') {  // BIM
        this.$router.push('/businessService/releaseBIM?reEditId=' + data.projectBaseId)
      } else if (data.projectBaseType === '3') {  // 设计
        this.$router.push('/businessService/releaseDesign?reEditId=' + data.projectBaseId)
      }
    },
    // 多选
    filterChkTypeClick (val) {
      this.currentPage = 1
      this.dataForBE.page = 1
      if (val.length) {
        this.dataForBE.projectType = val
      } else {
        this.dataForBE.projectType = []
      }
      this.chkTypeSelectData = val
      this.getTable()
      // this.clearChk()
      // this.getAllTableData()
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
      // this.clearChk()
      // this.getAllTableData()
    },
    // sortChange (col) {
    //   // 需要一个判断
    //   if (col.prop === 'amount') {
    //     this.dataForBE.amount = col.order ? col.order === 'ascending' ? 'asc' : 'desc' : ''
    //   } else if (col.prop === 'checkedTime') {
    //     this.dataForBE.checkedTime = col.order ? col.order === 'ascending' ? 'asc' : 'desc' : ''
    //   }
    //   this.getTable()
    // },
    // filterChkBillClick (val) {
    //   if (val.length) {
    //     this.dataForBE.status = val
    //   } else {
    //     this.dataForBE.status = []
    //   }
    //   this.chkBillSelectData = val
    //   this.getTable()
    // },
    renderType (h, {column}) {
      return h(
        'div', [
          h('span', column.label),
          h('el-popover', {
            props: {
              trigger: 'click',
              'visible-arrow':false,
              'popper-class': 'filterPopver' ,
              'popper-class': 'filterPopver' 
            },
          },
          [
            h(selectFilterComponent, { // 自定义不需要引号
              props: {
                filterData: this.filterTypeData,
                chkSelectData: this.chkTypeSelectData,
                multiple: true
              },
              on: {
                filterClick: this.filterChkTypeClick
              }
            }),
            h('span',
            {
              class: {
                triangle: true,
                'active-triangle': this.chkTypeSelectData.length
              },
              slot: 'reference'
            })
          ],
          ),
        ]
      )
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
                choice: true
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
      this.dataForBE.amount = ''
      this.dataForBE.checkedTime = ''
      // 根据后台字段排序
      this.dataForBE[col.prop] = col.order;
      this.currentPage = 1
      this.dataForBE.page = 1
      this.getTable()
    },
    getAllTableData () {
      return new Promise((resolve, reject) => {
        let data = Object.assign({}, this.dataForBE)
        data.pageSize = 10000
        api.selfProjectList(data).then(res => {
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
        page = this.allTableData.length / this.dataForBE.pageSize
      }
      if (!this.ids.length || (this.indeterminate && this.ids.length)) { // 全选
        for(let i = 0; i < page; i++){
          this.multipleSelection[i] = this.allTableData.slice((i)*this.dataForBE.pageSize ,(i + 1)*this.dataForBE.pageSize)
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
    download () {
      this.dataForBE.projectId = this.ids
      let data = Object.assign({}, this.dataForBE)
      data.pageSize = 10000
      api.frontItemListExport(data).then(res => {
        downloadBlob(res, '项目明细列表')
      })
    },

    // renderBill (h, {column}) {
    //   return h(
    //     'div', [
    //       h('span', column.label),
    //       h('el-popover', {
    //         props: {
    //           trigger: 'click',
    //           'visible-arrow':false
    //         },
    //       },
    //       [
    //         h(selectFilterComponent, { // 自定义不需要引号
    //           props: {
    //             filterData: this.filterBillData,
    //             chkSelectData: this.chkBillSelectData,
    //             multiple: true
    //           },
    //           on: {
    //             filterClick: this.filterChkBillClick
    //           }
    //         }),
    //         h('span',
    //         {
    //           class: {
    //             triangle: true,
    //             'active-triangle': this.chkBillSelectData.length
    //           },
    //           slot: 'reference'
    //         })
    //       ],
    //       ),
    //     ]
    //   )
    // },
  },
  // watch: {
  //   tableData (oldVal, newVal) { // 监听数据变化，然后执行分页记忆自动选中回调
  //     this.$nextTick(() => {
  //       this.selectMemoriedDataFn()
  //     })
  //   }
  // },
  mounted () {
    this.getTable()
    // this.getAllTableData()
    api.listFilterStatus().then(res => {
      this.filterStatusData = res.dataList.map(item => {
        item.name = item.key
        return item
      })
    })
  }
}
</script>
<style lang="less" scoped>
.project{
  background-color: #fff;
  position: relative;
  .name{
    color: #00B38A;
    margin-right: 10px;
    text-decoration: underline;
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
.pagination-layout{
  text-align: right;
  margin-right: 20px;
}
.type-text{
  margin-bottom: 10px;
  border-radius: 2px;
}
.project-name{
  cursor: pointer;
  &:hover{
    color: #00B38A;
    text-decoration: underline;
  }
}
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
  margin-top: 1px;
  position: absolute;
  right: 0;
  top: -60px;
}
</style>
