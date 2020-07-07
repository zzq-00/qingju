<template>
  <div class="project">
    <el-table ref="multipleTable" :data="tableData" 
      class="myQingju-table myQingju-table-th-left">
      <el-table-column label="时间" prop="createTime">
      </el-table-column>
      <el-table-column label="业务 | 资金类型 | 备注">
        <template slot-scope="scope">
            <p>{{scope.row.bussinessName}}</p>
            <p>
              <span class="gray-text">{{scope.row.methodsName}} </span>
              <span class="gray-text before-line">{{scope.row.description}}</span>
            </p>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="methodsName"></el-table-column>
      <el-table-column label="收入/支出">
        <template slot-scope="scope"> 
          <span class="green-text" v-if="scope.row.incomeAmount">+{{scope.row.incomeAmount|formatMoney}}</span>
          <span class="red-text" v-if="scope.row.deductionAmount">-{{scope.row.deductionAmount|formatMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
    </el-table>
    <div class="pagination-layout">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  data () {
    return {
      tableData:[],
      currentPage : 1,
      dataForBE: {
        page:1,
        pageSize: 20,
        userId: this.$route.query.userId
      },
      totalCount: 0
    }
  },
  methods: {
    handleSizeChange (val) {},
    handleCurrentChange (val) {},
    getTable () {
      api.getQuickPayLogListByUserId(this.dataForBE).then(res => {
        this.tableData = res.dataList
        this.totalCount = res.count
      })
    }
  },
  mounted () {
    this.getTable()
  }
}
</script>
<style lang="less" scoped>
.pagination-layout{
  text-align: right;
  margin-right: 20px;
}
.gray-text{
  color: #888888;
}
.before-line{
  &:before{
    content: '';
    display: inline-block;
    width: 1px;
    height: 14px;
    background-color: #888888;
    margin: 0 5px;
    vertical-align: middle;
  }
}
.red-text{
  color: #FF5E5B;
}
.green-text{
  color: #25BC89;
}
</style>
