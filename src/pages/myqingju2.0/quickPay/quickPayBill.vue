<template>
  <div style="background-color: #f8f9fa;">
    <div class="bill-info" v-has="['8YX58D', 'hdWkDj']">
      <div class="left" v-has="['8YX58D']">
        <h5>已出账单待还款</h5>
        <div>
          <div class="amount"><i>￥</i>{{QuickPayInfomation.hasNotPaymentNow | formatMoney}}</div>
          <el-button type="danger" style="width:180px;" @click="showPop('', 'repayment', 'now')" v-has="['8YX58D']">去还款</el-button>
        </div>
        <div style="width:500px;height:10px;background-color:#F2F2F2;"></div>
        <div style="margin-top: 14px;" v-show="QuickPayInfomation.taxAmount">已 有 项 目 逾 期 产 生 利 息 ，本 息 共 计 ￥ <i style="color: #E4393C;font-size:20px;">{{QuickPayInfomation.hasNotPaymentAll}}</i>
          <a style="color:#00B38A;" href="javascript:;" @click="seeHasTaxMoney"> 查看</a>
        </div>
        <p style="margin-top: 21px;font-size: 12px;color: #d71818;;">提示：逾期可能影响您的征信报告，请您按时还款！</p>
      </div>
      <div class="right" v-has="['hdWkDj']">
        <p>可用额度（元）</p>
        <div><i>￥</i>{{QuickPayInfomation.canUseAmount | formatMoney}}</div>
        <div>总额度：{{QuickPayInfomation.limitAmount | formatMoney}}
          <span style="color:#00B38A;cursor: pointer;" v-if="QuickPayInfomation.canAddCredit===3" @click="quotaShow = true">提额</span>
          <span style="color:#00B38A;" v-else-if="QuickPayInfomation.canAddCredit===1">提额已申请，正在审核中</span>
          <span style="color:#00B38A;" v-else>抱歉，您暂时无法调整</span>
        </div>
      </div>
    </div>
    <div class="bill-table" v-has="['AAbkgE', 'nEJUMu']">
      <div class="title">我的账单</div>
      <div class="input-condition">
        <div>搜索内容：<input type="text" placeholder="项目名称、发活人" v-model="params.query" @change="handleCurrentChange(1)"></div>
        <div>时间：<el-date-picker :editable='false' value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" style="width: 130px;" v-model="params.begin" @change="handleCurrentChange(1)">
          </el-date-picker>
          ~
          <el-date-picker :editable='false' value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" style="width: 130px;" v-model="params.end" @change="handleCurrentChange(1)">
          </el-date-picker>
        </div>
        <div>
          <el-button type="info" plain size="mini" @click="reset">重置</el-button>
          <el-button type="info" plain size="mini" style="position: absolute;right: 0;bottom: 0;" @click="downLoadUserQuickPayBillList">导出</el-button>
        </div>
      </div>
      <el-table :data="tableData" ref="singleTable" style="width: 99%;margin-top:12px;" @sort-change="handleSortChange" @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="项目信息" width="400">
          <template slot-scope="scope">
            <div>{{scope.row.projectNameBase}}</div>
            <div>
              <router-link style="color: #00B38A;" :to="{path: '/myqingju/userDetails', query: {userId: scope.row.userId}}" target="_blank">
                {{scope.row.userName}}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="项目金额" sortable='custom' prop="projectAmount">
          <template slot-scope="scope">
            <div>{{scope.row.projectAmount | formatMoney}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="projectBillDate" label="项目账单日" sortable='custom'>
          <template slot-scope="scope">
            <div>{{scope.row.projectBillDate.slice(0,10)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="到期还款日" sortable='custom' prop="repayDate">
          <template slot-scope="scope">
            <div>{{scope.row.repayDate.slice(0,10)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="待还款金额" sortable='custom' prop="noRepayAmount" align="right">
          <template slot-scope="scope">
            <div class="amount-money">
              <el-popover placement="bottom" trigger="hover">
                <ul class="amount-info">
                  <li>
                    <div>剩余还款</div>
                    <div>{{scope.row.noRepayAmount?scope.row.noRepayAmount:0}}</div>
                  </li>
                  <li>
                    <div></div>
                    <div>=</div>
                  </li>
                  <li>
                    <div>消费总金额</div>
                    <div>{{scope.row.projectAmount?scope.row.projectAmount:0}}</div>
                  </li>
                  <li>
                    <div></div>
                    <div>-</div>
                  </li>
                  <li>
                    <div>退款抵充</div>
                    <div>{{scope.row.refundMoney?scope.row.refundMoney:0}}</div>
                  </li>
                  <li>
                    <div></div>
                    <div>-</div>
                  </li>
                  <li>
                    <div>还款</div>
                    <div>{{scope.row.repayAmount?scope.row.repayAmount:0}}</div>
                  </li>
                  <li>
                    <div></div>
                    <div>+</div>
                  </li>
                  <li>
                    <div>利息</div>
                    <div>{{scope.row.TaxMoney?scope.row.TaxMoney:0}}</div>
                  </li>
                  <li style="clear:both"></li>
                </ul>
                <img src="@/assets/img/detailsInfo.png" alt="" slot="reference">
              </el-popover>
              <span>{{scope.row.noRepayAmount | formatMoney}}</span>
              <div style="clear:both"></div>
            </div>

            <!-- taxMoney 利息 -->
          </template>
        </el-table-column>
        <el-table-column label="还款状态" :render-header="renderStatus" align="right">
          <template slot-scope="scope">
            <div v-if="scope.row.repayStatus==='1'">未还清</div>
            <div v-if="scope.row.repayStatus==='2'">已还清</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="operate" align="right">
          <template slot-scope="scope">
            <div style="color:#03B189;cursor: pointer;" @click="$router.push('/myqingju/quickPayBillDetails/'+scope.row.billId)">查看</div>
            <div v-if="scope.row.repayStatus!=='2'" style="color:#03B189;cursor: pointer;" @click="showPop(scope.row, 'repayment', 'single')">还款</div>
            <div v-if="scope.row.repayStatus!=='2'&&scope.row.hasdelayed=='1'" style="color:#03B189;">延期申请审核中</div>
            <div v-else-if="scope.row.repayStatus!=='2'&&scope.row.hasdelayed=='2'" style="color:#03B189;">延期申请已通过</div>
            <div v-else-if="scope.row.repayStatus!=='2'&&scope.row.hasdelayed=='3'" style="color:#03B189;">申请已驳回</div>
            <div v-else-if="scope.row.repayStatus!=='2'" style="color:#03B189;cursor: pointer;" @click="showPop(scope.row, 'delay')">申请延期</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <div>总计<i>{{multipleSelectionMoney | formatMoney}}</i></div>
        <el-button type="info" plain style="width:150px;" @click="showPop('', 'repayment', 'list')" v-has="['8YX58D']">还款</el-button>
      </div>
      <div class="pagination">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize" layout="sizes,total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 还款 -->
    <el-dialog title="还款" :visible.sync="billShow" width="30%">
      <el-input placeholder="请输入还款金额" type="number" min="0" v-model="amount"></el-input>
      <p style="margin-top: 10px;" v-if="repaymentNow">本期还有 <span style="color: rgb(228, 57, 60);font-size: 20px;">{{QuickPayInfomation.hasNotPaymentNow | formatMoney}}</span> 元未还清，到期后，未还款金额按日计息并计入下月账单</p>
      <p style="margin-top: 10px;" v-if="!repaymentNow">所选账单还有 <span style="color: rgb(228, 57, 60);font-size: 20px;">{{selBillMoney | formatMoney}}</span> 元未还清</p>
      <span slot="footer">
        <el-button @click="billShow = false">取 消</el-button>
        <el-button type="primary" @click="repaymentClick">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提额申请 -->
    <el-dialog title="提额申请" :visible.sync="quotaShow" width="30%">
      <el-input type="textarea" :rows="4" v-model="appReason" placeholder="请填写提额原因"></el-input>
      <span slot="footer">
        <el-button @click="quotaShow = false">取 消</el-button>
        <el-button type="primary" @click="QuickPayAddCredit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 延期申请 -->
    <el-dialog title="延期申请" :visible.sync="delayShow" width="30%">
      <el-select v-model="QuickPayDelayApply.delayDays" placeholder="请选择延期时间">
        <el-option v-for="i in 10" :key="i" :label="i" :value="i">
        </el-option>
      </el-select> 天
      <div style="height:15px;"></div>
      <el-input type="textarea" :rows="4" v-model="QuickPayDelayApply.appReason" placeholder="请填写延时理由"></el-input>
      <span slot="footer">
        <el-button @click="delayShow = false">取 消</el-button>
        <el-button type="primary" @click="delayClick">确 定</el-button>
      </span>
    </el-dialog>
    <span class="J-operate" v-has="['BAPjhU', 'nEJUMu']"></span> <!-- 操作权限 -->
  </div>
</template>

<script>
import api from '@/fetch/api'
import filterComponent from '@/components/filterComponent'
import { downloadBlob } from '@/assets/js/date-format'

export default {
  components: {
    filterComponent
  },
  data() {
    return {
      operate: false,
      quotaShow: false,
      billShow: false,
      delayShow: false,
      repaymentNow: false,
      appReason: '',
      amount: '',
      billIds: [],
      selBillMoney: '',
      QuickPayInfomation: {},
      params: {
        begin: '',
        end: '',
        orderField: '', // 排序字段
        orderType: '0', // 0倒叙 1正序
        page: 1,
        pageSize: 10,
        query: '',
        status: ''
      },
      filterStatusData: [{ name: '全部', value: '' }, { name: '未还清', value: '1' }, { name: '已还清', value: '2' }],
      chkSelectData: '',
      total: 0,
      tableData: [],
      QuickPayDelayApply: {
        appReason: '',
        billId: '',
        delayDays: 1
      },
      multipleSelection: [],
      multipleSelectionMoney: 0
    }
  },
  methods: {
    // 轻松付相关信息
    GetQuickPayInfomationByUserId() {
      api.GetQuickPayInfomationByUserId(JSON.parse(window.localStorage.QingjuuserId)).then(res => {
        this.QuickPayInfomation = res.data
      })
    },
    // 轻松付账单相关信息
    userQuickPayBillList() {
      api
        .userQuickPayBillList(this.params)
        .then(res => {
          this.tableData = res.dataList
          this.total = res.count
        })
        .catch(err => {
          this.$message.error(err.errorMsg)
        })
    },
    // 高亮显示产生利息的项目
    seeHasTaxMoney() {
      let hasTaxData = this.tableData.filter(item => item.taxMoney && item.taxMoney > 0)
      hasTaxData.forEach(item => {
        this.$refs.singleTable.setCurrentRow(item)
      })
    },
    handleSizeChange(val) {
      this.params.page = 1
      this.params.pageSize = val
      this.userQuickPayBillList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.userQuickPayBillList()
    },
    renderStatus(h, { column }) {
      return h('span', [
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
            h(filterComponent, {
              // 自定义不需要引号
              props: {
                filterData: this.filterStatusData,
                radSelectData: this.chkSelectData
              },
              on: {
                filterClick: this.filterChkClick
              }
            }),
            h('span', {
              class: {
                triangle: true,
                'active-triangle': this.chkSelectData
              },
              slot: 'reference'
            })
          ]
        )
      ])
    },
    filterChkClick(val) {
      this.params.page = 1
      this.params.status = this.chkSelectData = val.value
      this.userQuickPayBillList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => item.billId)
      // 计算未还清总额
      let noRepayAmountList = val.map(item => item.noRepayAmount)
      this.multipleSelectionMoney = noRepayAmountList.length
        ? noRepayAmountList.reduce((total, num) => total + num).toFixed(2)
        : 0
    },
    reset() {
      this.params.begin = ''
      this.params.end = ''
      this.params.orderField = ''
      this.params.orderType = '0'
      this.params.page = 1
      this.params.pageSize = 10
      this.params.query = ''
      this.params.status = ''
    },
    // 提额
    QuickPayAddCredit() {
      if (!this.appReason) return this.$message('请填写提额原因')
      api
        .QuickPayAddCredit({ appReason: this.appReason })
        .then(res => {
          this.$message.success('申请成功')
          this.quotaShow = false
          this.GetQuickPayInfomationByUserId()
        })
        .catch(res => {
          this.$message.error({ message: res.errorMsg })
        })
    },
    // 还款
    repaymentClick() {
      if (this.amount <= 0) return this.$message('金额必须大于0')
      if (this.repaymentNow) {
        // 还当前已出账单
        if (this.amount > this.QuickPayInfomation.hasNotPaymentNow) return this.$message('金额不能大于待还款总额')
        api
          .submitQuickRepaymentAmount({ amount: this.amount })
          .then(res => {
            window.open('/myqingju/cashier/' + res.deskId)
          })
          .catch(res => {
            this.$message.error(res.errorMsg)
          })
      } else {
        // 还已选中账单
        if (this.amount > this.selBillMoney) return this.$message('金额不能大于待还款总额')
        api
          .submitRepaymentAmountByBillIds({ amount: this.amount, billIds: this.billIds })
          .then(res => {
            this.$router.push('/myqingju/cashier/' + res.deskId)
          })
          .catch(res => {
            this.$message.error(res.errorMsg)
          })
      }
    },
    // 弹窗显示
    showPop(row, model, billFrom) {
      if (model === 'repayment') {
        // 还款
        this.billShow = true
        this.repaymentNow = false
        switch (billFrom) {
          case 'now': // 还已出账单
            this.repaymentNow = true
            break
          case 'single': // 还当前点击的账单
            this.selBillMoney = row.noRepayAmount
            this.billIds = [row.billId]
            break
          case 'list': // 还所选中的账单
            this.selBillMoney = this.multipleSelectionMoney
            this.billIds = this.multipleSelection
            break
        }
      } else if (model === 'delay') {
        // 延期
        this.QuickPayDelayApply.billId = row.billId
        this.delayShow = true
      }
    },
    // 申请延期
    delayClick() {
      if (!this.QuickPayDelayApply.appReason) return this.$message('请填写延期原因')
      if (!this.QuickPayDelayApply.delayDays) return this.$message('请选择延期时间')
      api
        .QuickPayDelayCredit(this.QuickPayDelayApply)
        .then(res => {
          this.$message.success('申请成功，请等待处理结果!')
          this.delayShow = false
        })
        .catch(res => {
          this.$message.error(res.errorMsg)
        })
    },
    // 导出
    downLoadUserQuickPayBillList() {
      let params = Object.assign({}, this.params)
      delete params.page
      delete params.pageSize
      api.downLoadUserQuickPayBillList(params).then(res => {
        downloadBlob(res, '轻松付账单')
      })
    },
    // 排序
    handleSortChange(column) {
      this.params.page = 1 // 排序字段
      this.params.orderField = column.prop || '' // 排序字段
      this.params.orderType = column.order ? (column.order === 'ascending' ? '1' : '0') : '' // 0倒叙 1正序
      this.userQuickPayBillList()
    }
  },
  mounted() {
    api.hasQuickPay().then(res => {
      if (res.quickPayStatus !== '2') return this.$router.replace('/myqingju/quickPayStatus')
      this.GetQuickPayInfomationByUserId()
      this.userQuickPayBillList()
    })
    // hack 操作的显示
    let dNoneoperate = document.getElementsByClassName('J-operate')[0]
    if (dNoneoperate && !dNoneoperate.style.display) {
      this.operate = true
    }
  }
}
</script>

<style lang="less" scoped>
.bill-info {
  display: flex;
  justify-content: space-between;
  line-height: 1;
  margin-bottom: 40px;

  .left {
    padding: 35px 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    > h5 {
      font-size: 24px;
      color: #666;
    }
    .amount {
      color: #e4393c;
      font-size: 34px;
      position: relative;
      padding-left: 20px;
      > i {
        font-size: 18px;
        color: #666666;
        position: absolute;
        left: 0;
        top: 4px;
      }
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 30px 0 19px;
    }
  }
  .right {
    border-left: 1px dashed #bcbcbc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #fff;

    > div {
      &:nth-child(2) {
        padding: 0 40px;
        height: 60px;
        line-height: 60px;
        margin: 28px 0 56px;
        background: url(~@/assets/img/amount-bg.png) center;
        text-align: center;
        font-size: 40px;
        color: #666666;
        position: relative;
        > i {
          position: absolute;
          font-size: 18px;
          line-height: 1;
          top: 14px;
          left: 10px;
        }
      }
    }
  }
}
.bill-table {
  background-color: #fff;
  padding: 20px;
  position: relative;
  .title {
    font-size: 18px;
    color: #666666;
  }
  .input-condition {
    display: flex;
    align-items: center;
    border-top: 1px solid #d7d7d7;
    margin-top: 15px;
    padding-top: 25px;
    position: relative;
    input[type='text'] {
      width: 192px;
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
  .total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 40px;
    > div {
      margin-right: 50px;
      > i {
        color: #666666;
        font-size: 24px;
        margin-left: 17px;
      }
    }
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
  .amount-money {
    > span {
      float: right;
    }
    > span:nth-child(1) {
      margin-left: 10px;
      line-height: 0;
      margin-right: 5px;
      img {
        cursor: pointer;
        margin-top: 3px;
      }
    }
  }
}
</style>
<style scoped>
.input-condition >>> .el-input__inner {
  border-top: 0 none;
  border-left: 0 none;
  border-right: 0 none;
}
.bill-table >>> .has-gutter th {
  font-weight: normal;
  color: #333;
  background-color: rgba(246, 247, 251, 1);
}
.bill-table >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(245, 251, 250, 1);
}

.amount-info li {
  float: left;
  padding: 0 10px;
}
.amount-info li div {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
