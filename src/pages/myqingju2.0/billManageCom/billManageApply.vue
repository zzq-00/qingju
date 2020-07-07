<template>
  <div class="tableList">
    <div class="bill-filter">
      <div class="search-box">
        <span>搜索内容：</span>
        <input v-model="searchinput" placeholder="项目名、发活人" style="min-width: 150px;">
      </div>
      <div class="time-filter">
        <span class="time">完成时间：</span>
        <el-date-picker class="date-style" prefix-icon="icon-style" clear-icon="icon-style" v-model="dateTime" type="daterange" range-separator="~" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="search-btn">
        <span @click="search">搜索</span>
        <span @click="reset">重置</span>
      </div>
      <div class="down-btn" @click="downInvoice">导出</div>
    </div>
    <el-table ref="multipleTable" class="apply-table" :data="tableData1" style="width: 100%;" :header-cell-class-name="tableHeaderClassName" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
      <el-table-column type="selection" width="28px" align="center">
      </el-table-column>
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          <div>
            <p class="pro-name" @click="gotoProDetails(scope.row)">{{scope.row.name}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发活人" align="" width="">
        <template slot-scope="scope">
          <div>
            <p class="live-people" @click="gotoPeople(scope.row)">{{scope.row.publisherName}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" prop="checkedTime" align="center" width="110px" sortable='custom'>
        <!-- <template slot-scope="scope">
          <p style="font-size:14px;padding-right:10px;text-align:center">{{scope.row.checkedTime}}</p>
        </template> -->
      </el-table-column>
      <el-table-column label="项目金额" prop="amount" align="center" width="140px" sortable='custom'>
        <template slot-scope="scope">
          <p style="font-size:14px;padding-right:10px;text-align:center">{{scope.row.amount | formatMoney}}</p>
        </template>
      </el-table-column>
      <el-table-column label="实际支付" prop="actualProjectCost" align="center" width="140px" sortable='custom'>
        <template slot-scope="scope">
          <p style="font-size:14px;padding-right:10px;text-align:center">{{scope.row.actualProjectCost | formatMoney}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="开票信息" align="left" width="">
      </el-table-column>
      <el-table-column prop="status" label="发票状态" align="center" min-width="120px" :render-header="renderStatus">
      </el-table-column>
      <el-table-column label="操作" width="" align="center">
        <template slot-scope="scope">
          <el-button @click="toApply(scope.row)" type="text" size="small" v-if="selectLength<=1&&scope.row.enableInvoice&&scope.row.time==0&&scope.row.userId==params.userId">申请开票</el-button>
          <el-button disabled type="text" size="small" v-if="selectLength<=1&&scope.row.enableInvoice&&scope.row.time==0&&scope.row.userId!=params.userId">申请开票</el-button>
          <el-button disabled type="text" size="small" v-if="selectLength<=1&&!scope.row.enableInvoice&&scope.row.time>0">{{scope.row.time}}天后方可申请开票</el-button>
          <el-button @click="seeInfo(scope.row)" type="text" size="small" v-if="selectLength<=1&&(scope.row.status=='已申请'||scope.row.status=='已成功')&&scope.row.time==0">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" v-if="selectLength>1">
      <el-button @click="opening()">申请开票</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import selectFilterComponent from '@/components/filterComponent'
import { formatDate, downloadBlob, downloadSingle } from '@/assets/js/date-format'
export default {
  components: {
    formatDate,
    downloadBlob,
    downloadSingle,
    selectFilterComponent
  },
  data() {
    return {
      tableData1: [],
      selectLength: 0, //选择的项目个数
      showMore: false,
      searchinput: '', //搜索内容：项目名，发活人
      dateTime: '', //时间
      params: {
        //列表的请求参数
        checkedTimeMax: '',
        checkedTimeMin: '',
        field: 'checkedTime', //amount金额排序
        keyword: '',
        page: 1,
        pageSize: 10,
        sort: 'desc', //asc升序   desc倒叙
        userId: JSON.parse(window.localStorage.QingjuuserId),
        status: []
      },
      currentPage: 1,
      total: Number(''),
      chkStatusSelectData: [],
      filterStatusData: [{ name: '已申请', value: '0' }, { name: '已成功', value: '1' }, { name: '可申请', value: '2' }] //发票状态
    }
  },
  mounted() {
    this.myProjectList() //列表
  },
  methods: {
    // 跳转项目详情
    gotoProDetails(row) {
      if (row.baseType == '1') {
        this.$router.push('/myqingju/projectDetail/' + row.projectBaseId)
      } else if (row.baseType == '2') {
        this.$router.push('/myqingju/BIMDetail/' + row.projectBaseId)
      } else if (row.baseType == '3') {
        this.$router.push('/myqingju/designDetail/' + row.projectBaseId)
      } else if (row.baseType == '4') {
        this.$router.push('/myqingju/modelingDetail/' + row.projectBaseId)
      }
    },
    // 导出发票列表
    downInvoice() {
      let downParams = this.params
      delete downParams.page
      delete downParams.pageSize
      api
        .invoiceExport(downParams)
        .then(res => {
          downloadBlob(res, '发票列表')
        })
        .catch(res => {})
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.myProjectList()
    },
    handleCurrentChange(val) {
      this.params.page = this.currentPage = val
      this.myProjectList()
    },
    //跳转发活人详情
    gotoPeople(row) {
      this.$router.push({
        path: '/myqingju/userDetails',
        query: {
          userId: row.userId
        }
      })
    },
    //按条件搜索
    search() {
      if (this.dateTime) {
        this.dateTime[0] ? (this.params.checkedTimeMin = this.dateTime[0]) : (this.params.checkedTimeMin = '')
        this.dateTime[1] ? (this.params.checkedTimeMax = this.dateTime[1]) : (this.params.checkedTimeMax = '')
      } else {
        this.params.checkedTimeMin = ''
        this.params.checkedTimeMax = ''
      }
      this.params.keyword = this.searchinput
      this.myProjectList()
    },
    // 搜索条件重置
    reset() {
      this.params.keyword = this.searchinput = ''
      this.dateTime = ''
      this.params.checkedTimeMin = ''
      this.params.checkedTimeMax = ''
      this.myProjectList()
    },
    // 排序
    handleSortChange(column, prop, order) {
      this.params.field = column.prop
      column.order == 'descending' ? (this.params.sort = 'desc') : (this.params.sort = 'asc')
      this.params.page = this.currentPage = 1
      this.myProjectList()
    },
    // 列表
    myProjectList() {
      api
        .myProjectList(this.params)
        .then(res => {
          this.tableData1 = res.dataList
          this.total = res.count
        })
        .catch(res => {})
    },
    renderStatus(h, { column }) {
      return h('div', [
        h('span', column.label),
        h(
          'el-popover',
          {
            props: {
              trigger: 'click',
              'visible-arrow': false,
              'popper-class': 'filterPopver'
            }
          },
          [
            h(selectFilterComponent, {
              // 自定义不需要引号
              props: {
                filterData: this.filterStatusData,
                chkSelectData: this.chkStatusSelectData,
                multiple: true
              },
              on: {
                filterClick: this.filterChkStatusClick
              }
            }),
            h('span', {
              class: {
                triangle: true,
                'active-triangle': this.chkStatusSelectData.length
              },
              slot: 'reference'
            })
          ]
        )
      ])
    },
    filterChkStatusClick(val) {
      if (val.length) {
        this.params.status = val
      } else {
        this.params.status = []
      }
      this.params.page = this.currentPage = 1
      this.chkStatusSelectData = val
      this.myProjectList()
    },
    //跳转到申请页面
    toApply(row) {
      if (row.enableInvoice) {
        window.localStorage.proArr = JSON.stringify([row])
        this.$router.push('/ticketApply')
      }
      if (!row.enableInvoice) {
        this.$message({
          message: '项目验收在7~90天内才可以开发票',
          type: 'warning'
        })
      }
    },
    // 查看开票信息
    seeInfo(row) {
      this.$router.push({ path: '/billDetails', query: { id: row.id } })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.selectLength = this.multipleSelection.length
      this.multipleSelection.map(item => {
        if (item.enableInvoice == false) {
          this.$refs.multipleTable.toggleRowSelection(item)
        }
      })
    },
    tableHeaderClassName({ row, rowIndex, columnIndex }) {
      return 'table-header-color'
    },
    // 取消
    toggleSelection() {
      this.myProjectList()
      this.selectLength = 0
    },
    // 申请开票
    opening() {
      window.localStorage.proArr = JSON.stringify(this.multipleSelection)
      this.$router.push('/ticketApply')
    }
  }
}
</script>
<style lang="less" scoped>
.tableList {
  margin-top: 20px;
  position: relative;
  padding-bottom: 60px;
  .bill-filter {
    margin-bottom: 12px;
    .search-box {
      display: inline-block;
      margin-right: 19px;
      input {
        outline: 0;
        color: #999;
        border-bottom: 1px solid #c2cad8;
        height: 38px;
      }
    }
    .time-filter {
      display: inline-block;
    }
    .search-btn {
      display: inline-block;
      margin-left: 18px;
      span {
        display: inline-block;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(252, 250, 250, 1);
        border: 1px solid rgba(228, 228, 228, 1);
        border-radius: 2px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        cursor: pointer;
      }
      span:nth-child(1) {
        margin-right: 15px;
      }
      span:hover {
        color: #2fc182;
      }
    }
    .down-btn {
      float: right;
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #fcfafa;
      border: 1px solid #e4e4e4;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      color: #666666;
      cursor: pointer;
      margin-top: 4px;
    }
    .down-btn:hover {
      color: #2fc182;
    }
  }
  .live-people {
    font-weight: 400;
    color: rgba(0, 179, 138, 1);
    cursor: pointer;
  }
  .pro-name {
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }
  .pro-name:hover {
    text-decoration: underline;
  }
  .operate_icon {
    overflow: hidden;
    .operate_icon1 {
      width: 25px;
      height: 25px;
      margin-left: 10px;
      float: left;
      background: url('~@/assets/img/operate_icon1-1.png');
      background-size: 25px 25px;
    }
    .operate_icon1:hover {
      background: url('~@/assets/img/operate_icon1.png');
      background-size: 25px 25px;
      cursor: pointer;
    }
  }
  .block {
    text-align: right;
    position: absolute;
    right: 0;
    bottom: 5px;
  }
  .el-button--small,
  .el-button--small.is-round {
    padding: 0 15px;
  }
}
</style>
<style scoped>
.bill-filter >>> .el-input__inner {
  border-top: 0 none;
  border-left: 0 none;
  border-right: 0 none;
}
.apply-table >>> th {
  background: #f6f7fb;
  padding: 0;
  height: 40px;
  line-height: 40px;
}
.apply-table >>> th .cell div {
  line-height: 23px;
  height: 23px;
}
.apply-table >>> .el-table-column--selection .cell {
  padding: 0 10px !important;
}
</style>
