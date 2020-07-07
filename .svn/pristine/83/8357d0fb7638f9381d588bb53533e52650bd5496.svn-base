<template>
  <div class="project">
    <button class="download" @click='download'>导出</button>
    <el-table ref="multipleTable" :data="tableData" 
      class="myQingju-table myQingju-table-th-left">
      <el-table-column label="时间" prop="createTime">
      </el-table-column>
      <el-table-column label="业务 | 备注" >
        <template slot-scope="scope">
            <p>{{scope.row.bussinessName}}</p>
            <p>
              <span class="gray-text">{{scope.row.methodsName}} </span>
              <span class="gray-text before-line">{{scope.row.description}}</span>
            </p>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="methodsName" :render-header="renderType"></el-table-column>
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
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import filterComponent from '@/components/filterComponent'
import { downloadBlob } from '@/assets/js/date-format'
export default {
  data () {
    return {
      tableData:[],
      currentPage : 1,
      totalPage: 0,
      dataForBE: {
        page:1,
        pageSize: 20,
        userId: this.$route.query.userId
      },
      filterTypeData: [],
      radStatusSelectData: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      this.dataForBE.pageSize = val
      this.getTable()
    },
    handleCurrentChange (val) {
      this.dataForBE.page = val
      this.getTable()
    },
    getTable () {
      api.getFinanceLogByUserId(this.dataForBE).then(res => {
        this.tableData = res.dataList
        this.totalPage = res.total
      })
    },
    renderType (h, {column}) {
      return h(
        'div', [
          h('span', column.label),
          h('el-popover', {
            props: {
              trigger: 'click',
              'popper-class': 'minWidthChange', // 最小宽度重置
              'visible-arrow':false,
              'popper-class': 'filterPopver' 
            },
          },
          [
            h(filterComponent, { // 自定义不需要引号
              props: {
                filterData: this.filterTypeData,
                radSelectData: this.radStatusSelectData.value,
                // multiple: true
              },
              on: {
                filterClick: this.filterStatusClick
              }
            }),
            h('span',
            {
              class: {
                triangle: true,
                'active-triangle': this.radStatusSelectData
              },
              slot: 'reference'
            })
          ],
          ),
        ]
      )
    },
    filterStatusClick (val) {
      if (val) {
        this.dataForBE.methods = val.value
      } else {
        this.dataForBE.methods = '0'
      }
      this.radStatusSelectData = val
      this.getTable()
    },
    download () {
      // this.dataForBE.projectId = this.ids
      let data = Object.assign({}, this.dataForBE)
      data.pageSize = 10000
      api.downloadMyFinanceLogList(data).then(res => {
        downloadBlob(res, '账户明细列表')
      })
    }
  },
  mounted () {
    this.getTable()
    api.getFinanceMethodSelect().then(res => {
      this.filterTypeData = res.dataList.map(item => {
        item.name = item.key
        return item
      })
      this.filterTypeData.unshift({
        name: '全部',
        value: 0
      })
    })
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
    margin-left: 4px;
    margin-right: 5px;
    vertical-align: middle;
  }
}
.project{
  position: relative;
}
.download{
  padding:6px 10px;
  font-size: 12px;
  color: #666;
  border: 1px solid #E4E4E4;
  background-color: #FCFAFA;
  margin-left: 10px;
  position: absolute;
  top: -60px;
  right: 0;
  &:hover{
    background-color: #F2F2F2;
  }
}
.red-text{
  color: #FF5E5B;
}
.green-text{
  color: #25BC89;
}
</style>
