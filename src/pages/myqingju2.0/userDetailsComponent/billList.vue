<template>
  <div>
    <el-table :data="tableData" style="width:100%" class="myQingju-table myQingju-table-th-left">
      <el-table-column prop="createAt" width="180" label="申请时间"></el-table-column>
      <el-table-column prop="name" label="项目信息" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkedTime" label="完成时间" :render-header="renderSort"></el-table-column>
      <el-table-column prop="amount" label="项目金额(元)" :render-header="renderSort">
        <template slot-scope="scope">
          {{scope.row.amount|formatMoney}}
        </template>
      </el-table-column>
      <el-table-column prop="actualProjectCost" label="实付金额(元)" :render-header="renderSort">
        <template slot-scope="scope">
          {{scope.row.actualProjectCost|formatMoney}}
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="开票信息" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="invoiceNumber" label="发票编号"></el-table-column> -->
      <el-table-column prop="status" label="发票状态" >
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'" class="red">{{scope.row.status}}</span>
          <span v-else-if="scope.row.status === '1'" class="black">{{scope.row.status}}</span>
          <span v-else>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <router-link class="blue" v-if="scope.row.id" :to="{path: '/billDetails', query:{id: scope.row.id}}">查看</router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-layout">
      <el-pagination :page-sizes='[10,20,30,40,50]' :current-page.sync="currentPage"
      layout="total,sizes,prev,pager,next" :total='totalCount' @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import sortCommon from '@/components/sortCommon'
export default {
  data () {
    return {
      tableData: [],
      totalCount: 0,
      currentPage: 1,
      dataForBE: {
        page: 1,
        pageSize: 20,
        field: 'checkedTime',
        sort: 'desc',
        userId: this.$route.query.userId
      }
    }
  },
  methods: {
    getTable () {
      api.myProjectList(this.dataForBE).then(res => {
        this.tableData = res.dataList
        this.totalCount = res.count
      })
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
      this.dataForBE.checkedTime = ''
      this.dataForBE.actualProjectCost = ''
      this.dataForBE.amount = ''
      this.dataForBE.createAt = ''
      // 根据后台字段排序
      this.dataForBE[col.prop] = col.order;
      this.dataForBE.field = col.prop
      this.dataForBE.sort = col.order
      this.currentPage = 1
      this.dataForBE.page = 1
      this.getTable()
    },
    handleSizeChange (val) {
      this.dataForBE.pageSize = val
      this.getTable()
    },
    handleCurrentChange (val) {
      this.dataForBE.page = val
      this.getTable()
    },
  },
  mounted () {
    this.getTable()
  }
}
</script>


