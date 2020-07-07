<template>
  <div class="financial-record">
    <div class="title">全部明细</div>
    <div class="content">
      <div class="input-condition">
        <div>搜索：<input type="text" placeholder="真实姓名" v-model="params.query" @change="handleCurrentChange(1)"></div>
        <div>时间：<el-date-picker :editable='false' value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" style="width: 130px;" v-model="params.begin" @change="setDate">
          </el-date-picker>
          ~
          <el-date-picker :editable='false' value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" style="width: 130px;" v-model="params.end" @change="setDate">
          </el-date-picker>
        </div>
        <div>
          <label class="radio-label">
            <input type="radio" style="display: none;" value="1" v-model="timePick">
            <span>一个月</span>
          </label>
          <label class="radio-label">
            <input type="radio" style="display: none;" value="2" v-model="timePick">
            <span>三个月</span>
          </label>
          <label class="radio-label">
            <input type="radio" style="display: none;" value="3" v-model="timePick">
            <span>一年</span>
          </label>
          <label class="radio-label">
            <input type="radio" style="display: none;" value="0" v-model="timePick">
            <span>全部</span>
          </label>
        </div>
        <el-button type="info" plain size="mini" style="position: absolute;right: 20px;" @click="downloadMyQuickPayLogList">导出</el-button>
      </div>
      <div class="radio-condition">
        <div>
          <span>业务：</span>
          <ul>
            <li v-for="(item, index) in QuickPayBussinessSelect" :key="index">
              <label class="radio-label">
                <input type="radio" style="display: none;" v-model="params.bussiness" :value="item.value" @change="handleCurrentChange(1)">
                <span>{{item.key}}</span>
              </label>
            </li>
          </ul>
        </div>
        <div>
          <span>状态：</span>
          <ul>
            <li v-for="(item, index) in FinanceStatusSelect" :key="index">
              <label class="radio-label">
                <input type="radio" style="display: none;" v-model="params.states" :value="item.value" @change="handleCurrentChange(1)">
                <span>{{item.key}}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <el-table :data="MyQuickPayLog" style="width: 99%">
        <el-table-column label="时间" width="100">
          <template slot-scope="scope">
            <div style="color: #333333;">{{scope.row.createTime.slice(0,10)}}</div>
            <div style="color: #A3A4A6;">{{scope.row.createTime.slice(11)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" width="110">
          <template slot-scope="scope">
            <div>
              <router-link style="color: #00B38A;" :to="{path: '/myqingju/userDetails', query: {userId: scope.row.userId}}" target="_blank">
                {{scope.row.userName}}
              </router-link>
            </div>
            <div style="color: #333333;">{{scope.row.telephone}}</div>
          </template>
        </el-table-column>
        <el-table-column label="业务 | 资金类型 | 备注" min-width="200">
          <template slot-scope="scope">
            <div style="color: #333333;">{{scope.row.bussinessName}}</div>
            <div style="color: #888888;">{{scope.row.amountType}} | {{scope.row.description}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="methodsName" label="类型" width="60">
        </el-table-column>
        <el-table-column label="收入/支出">
          <template slot-scope="scope">
            <div style="color: #25BC89;" v-if="scope.row.incomeAmount">+{{scope.row.incomeAmount | formatMoney}}</div>
            <div style="color: #FF5E5B;" v-if="scope.row.deductionAmount">-{{scope.row.deductionAmount | formatMoney}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="70">
        </el-table-column>
        <el-table-column label="可用额度">
          <template slot-scope="scope">
            <div>{{scope.row.canUserLimit | formatMoney}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <div style="color: #03B189;cursor: pointer;" v-if="scope.row.bussinessSource == '9'&&scope.row.methods == '9'" @click="$router.push('quickPayBillDetails/' + scope.row.relationId)">查看</div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize" layout="sizes,total, prev, pager, next, jumper" :total='total'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import { downloadBlob } from '@/assets/js/date-format'

export default {
  watch: {
    timePick(val) {
      if (!val) return
      let dateNow = new Date()
      this.params.end = dateNow.format('yyyy-MM-dd')
      switch (val) {
        case '0':
          this.params.begin = ''
          break
        case '1':
          this.params.begin = new Date(dateNow.setMonth(dateNow.getMonth() - 1)).format('yyyy-MM-dd')
          break
        case '2':
          this.params.begin = new Date(dateNow.setMonth(dateNow.getMonth() - 3)).format('yyyy-MM-dd')
          break
        case '3':
          this.params.begin = new Date(dateNow.setMonth(dateNow.getMonth() - 12)).format('yyyy-MM-dd')
          break
        default:
          break
      }
      this.params.page = 1
      this.getMyQuickPayLogList()
    }
  },
  data() {
    return {
      timePick: '1',
      params: {
        begin: '',
        bussiness: '0',
        end: '',
        page: 1,
        pageSize: 10,
        query: '',
        states: '0',
        timeType: '0',
        userId: JSON.parse(window.localStorage.QingjuuserId)
      },
      QuickPayBussinessSelect: [],
      FinanceStatusSelect: [],
      total: 0,
      MyQuickPayLog: []
    }
  },
  methods: {
    setDate() {
      this.timePick = ''
      this.params.page = 1
      this.getMyQuickPayLogList()
    },
    getMyQuickPayLogList() {
      api
        .getMyQuickPayLogList(this.params)
        .then(res => {
          this.MyQuickPayLog = res.dataList
          this.total = res.count
        })
        .catch(err => {
          this.$message.error(err.errorMsg)
        })
    },
    handleSizeChange(val) {
      this.params.page = 1
      this.params.pageSize = val
      this.getMyQuickPayLogList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getMyQuickPayLogList()
    },
    getQuickPayBussinessSelect() {
      api.getQuickPayBussinessSelect().then(res => {
        res.dataList.unshift({ value: '0', key: '全部' })
        this.QuickPayBussinessSelect = res.dataList
      })
    },
    getFinanceStatusSelect() {
      api.getFinanceStatusSelect().then(res => {
        res.dataList.unshift({ value: '0', key: '全部' })
        this.FinanceStatusSelect = res.dataList
      })
    },
    // 导出
    downloadMyQuickPayLogList() {
      let params = Object.assign({}, this.params)
      delete params.page
      delete params.pageSize
      api.downloadMyQuickPayLogList(params).then(res => {
        downloadBlob(res, '轻松付消费明细')
      })
    }
  },
  mounted() {
    Date.prototype.format = function(formatStr) {
      var str = formatStr
      var Week = ['日', '一', '二', '三', '四', '五', '六']
      str = str.replace(/yyyy|YYYY/, this.getFullYear())
      str = str.replace(/MM/, this.getMonth() + 1 > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1))
      str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate())
      return str
    }
    let dateNow = new Date()
    this.params.end = dateNow.format('yyyy-MM-dd')
    this.params.begin = new Date(dateNow.setMonth(dateNow.getMonth() - 1)).format('yyyy-MM-dd')
    api.hasQuickPay().then(res => {
      if (res.quickPayStatus !== '2') return this.$router.replace('/myqingju/quickPayStatus')
      this.getQuickPayBussinessSelect()
      this.getFinanceStatusSelect()
      this.getMyQuickPayLogList()
    })
  }
}
</script>

<style lang="less" scoped>
.financial-record {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  .title {
    font-size: 18px;
    color: #666666;
  }
  .content {
    border-top: 1px solid #d7d7d7;
    margin-top: 15px;
    padding-top: 20px;
    .input-condition {
      display: flex;
      align-items: center;
      input[type='text'] {
        width: 130px;
        height: 27px;
        border-bottom: 1px solid #d8dce5;
        padding-left: 8px;
        &::placeholder {
          color: #b4bccc;
          font-size: 12px;
        }
      }
      > div {
        display: flex;
        align-items: center;
        & + div {
          margin-left: 20px;
        }
      }
    }
    .radio-condition {
      margin: 19px 0 30px;
      border-top: 1px dashed rgba(215, 215, 215, 1);
      > div {
        margin-top: 20px;
        display: flex;
        > span {
          flex: 0 0 50px;
          margin-top: 5px;
        }
        > ul {
          > li {
            margin-right: 20px;
            float: left;
          }
        }
      }
    }
  }
}
.pagination {
  text-align: right;
  margin-top: 20px;
}
.radio-label {
  display: block;
  cursor: pointer;
  > span {
    display: inline-block;
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    &:hover {
      background-color: rgba(242, 242, 242, 1);
    }
  }
  input[type='radio']:checked + span {
    background-color: rgba(153, 153, 153, 1);
    color: #fff;
  }
  & + .radio-label {
    margin-left: 18px;
  }
}
</style>
<style scoped>
.input-condition >>> .el-input__inner {
  border-top: 0 none;
  border-left: 0 none;
  border-right: 0 none;
}
.financial-record >>> .has-gutter th {
  font-weight: normal;
  color: #333;
  background-color: rgba(246, 247, 251, 1);
}
</style>
