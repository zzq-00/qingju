<template>
  <div style="background-color: #f8f9fa;margin-bottom: 40px;">
    <div class="bill-details">
      <h5 v-if="quickPayBillInfo.unRepayMoney > 0">{{quickPayBillInfo.repayDate}} 应还</h5>
      <h5 v-else>此项目账单已还清</h5>
      <div>
        <div class="amount"><i>￥</i>{{quickPayBillInfo.unRepayMoney | formatMoney}}</div>
        <el-button type="danger" style="width:180px;" @click="billShow=true" :disabled="quickPayBillInfo.unRepayMoney == 0">立即还款</el-button>
      </div>
      <div style="width:500px;height:10px;background-color:#F2F2F2;"></div>
      <div>{{quickPayBillInfo.projectName}}</div>
      <p>{{quickPayBillInfo.userName}}</p>
    </div>
    <div class="bill-table">
      <div class="title">账单明细</div>
      <el-table :data="tableData" style="width: 99%;margin-top:12px;">
        <el-table-column label="时间" width="100">
          <template slot-scope="scope">
            <div>{{scope.row.createTime.slice(0,10)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="业务|现金类型|备注" min-width="300px">
          <template slot-scope="scope">
            <div>{{scope.row.businessSource}}</div>
            <div style="color: #888888;">{{scope.row.moneyType}} | {{scope.row.description}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="methods" label="类型">
        </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
            <!-- <div style="color: #25BC89;" v-if="scope.row.incomeAmount">+{{scope.row.incomeAmount | formatMoney}}</div>
            <div style="color: #FF5E5B;" v-if="scope.row.deductionAmount">-{{scope.row.deductionAmount | formatMoney}}</div> -->
            <div>{{scope.row.money | formatMoney}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作人" width="120">
          <template slot-scope="scope">
            <div style="color: #03B189;">{{scope.row.userName}}</div>
            <div>{{scope.row.telephone}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="还款" :visible.sync="billShow" width="30%">
      <el-input placeholder="请输入还款金额" type="number" min="0" v-model="amount"></el-input>
      <p style="margin-top: 10px;">本期还有 <span style="color: rgb(228, 57, 60);font-size: 20px;">{{quickPayBillInfo.unRepayMoney | formatMoney}}</span> 元未还清，到期后，未还款金额按日计息并计入下月账单</p>
      <span slot="footer">
        <el-button @click="billShow = false">取 消</el-button>
        <el-button type="primary" @click="repaymentClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  data() {
    return {
      billShow: false,
      amount: '',
      quickPayBillInfo: {
        unRepayMoney: 0
      },
      tableData: []
    };
  },
  methods: {
    getQuickPayBillInfoById() {
      api.getQuickPayBillInfoById(this.$route.params.id).then(res => {
        this.quickPayBillInfo = res.quickPayBillInfo
        this.tableData = res.dataList
      }).catch(err => {
        this.$message.error(err.errorMsg)
      })
    },
    repaymentClick() {
      if (this.amount <= 0) return this.$message('金额必须大于0')
      if (this.amount > this.quickPayBillInfo.unRepayMoney) return this.$message('金额不能大于待还款总额')
      api.submitRepaymentAmountByBillIds({ amount: this.amount, billIds: [this.$route.params.id] }).then(res => {
        window.open('/myqingju/cashier/' + res.deskId);
      }).catch(res => {
        this.$message.error(res.errorMsg)
      })
    },
  },
  mounted() {
    this.getQuickPayBillInfoById()
  }
}
</script>

<style lang="less" scoped>
.bill-details {
  display: flex;
  line-height: 1;
  background-color: #fff;
  padding: 35px 30px;
  flex-direction: column;
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
  div:nth-child(4) {
    margin: 14px 0 21px;
    & + p {
      font-size: 12px;
      color: #00b38a;
    }
  }
}
.bill-table {
  background-color: #fff;
  margin-top: 40px;
  padding: 18px 20px;
  position: relative;
  .title {
    font-size: 18px;
    color: #666666;
  }
}
</style>
<style scoped>
.bill-table >>> .has-gutter th {
  font-weight: normal;
  color: #333;
  background-color: rgba(246, 247, 251, 1);
}
</style>
