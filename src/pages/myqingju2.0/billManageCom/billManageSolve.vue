<template>
  <div class="tableList1">
    <div class="bill-filter">
      <div class="search-box">
        <span>搜索内容：</span>
        <input v-model="searchinput" placeholder="公司抬头/纳税人识别码/创建人" style="min-width: 183px;">
      </div>
      <div class="time-filter">
        <span class="time">创建时间：</span>
        <el-date-picker class="date-style" prefix-icon="icon-style" clear-icon="icon-style" v-model="dateTime" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="search-btn">
        <span @click="search">搜索</span>
        <span @click="reset">重置</span>
      </div>
      <div class="down-btn" @click="downQualifications">导出</div>
    </div>
    <el-table :data="tableData" class="info-table" style="width: 100%" @sort-change="sortChange">
      <el-table-column prop="date" label="发票信息" width="650">
        <template slot-scope="scope">
          <p class="company-title">{{scope.row.companyName}}</p>
          <div class="conpany-info-show">
            <ul class="ul-show" v-if="!scope.row.isEdit">
              <li><span>纳税识别号：</span><span>{{scope.row.taxNumber}}</span></li>
              <li><span>注册地址：</span><span>{{scope.row.registeredAddress}}</span></li>
              <li><span>注册电话：</span><span>{{scope.row.registeredTelephone}}</span></li>
              <li><span>开户银行：</span><span>{{scope.row.bank}}</span></li>
              <li><span>银行账户：</span><span>{{scope.row.bankAccount}}</span></li>
            </ul>
            <ul class="ul-edit" v-else>
              <li><span>纳税识别号：</span><input v-model="scope.row.taxNumberEdit" placeholder="请输入纳税识别号" @keyup="taxNumberEnter(scope.row,scope.row.taxNumberEdit,scope.$index)"></li>
              <li><span>注册地址：</span><input v-model="scope.row.registeredAddressEdit" placeholder="请输入注册地址"></li>
              <li><span>注册电话：</span><input v-model="scope.row.registeredTelephoneEdit" placeholder="请输入注册电话"></li>
              <li><span>开户银行：</span><input v-model="scope.row.bankEdit" placeholder="请输入开户银行"></li>
              <li><span>银行账户：</span><input v-model="scope.row.bankAccountEdit" placeholder="请输入银行账号"></li>
            </ul>
          </div>
        </template>

      </el-table-column>
      <el-table-column label="添加人员" width="180">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="hover" v-if="scope.row.invoiceVerificationUserDto">
            <div class="add-person-info">
              <div class="info-box">
                <span class="box-span">电话号码:</span>
                <span class="info-ul">{{scope.row.invoiceVerificationUserDto.phone}}</span>
                <div style="clear:both"></div>
              </div>
              <div class="info-box" v-if="scope.row.invoiceVerificationUserDto.role!=[]">
                <span class="box-span">企业角色:</span>
                <ul class="info-ul">
                  <li v-for="(item,index) in scope.row.invoiceVerificationUserDto.role" :key="index">{{item}}</li>
                </ul>
                <div style="clear:both"></div>
              </div>
              <div class="info-box" v-if="scope.row.invoiceVerificationUserDto.framework!=[]">
                <span class="box-span">组织架构:</span>
                <ul class="info-ul">
                  <li v-for="(item,index) in scope.row.invoiceVerificationUserDto.framework" :key="index">{{item}}</li>
                </ul>
                <div style="clear:both"></div>
              </div>
            </div>
            <span slot="reference" class="live-people" @click="gotoPeople(scope.row)">{{scope.row.userName}}</span>
          </el-popover>
          <p class="live-people" @click="gotoPeople(scope.row)" v-if="!scope.row.invoiceVerificationUserDto">{{scope.row.userName}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" sortable="custom" min-width="100">
      </el-table-column>
      <el-table-column label="操作" align="right" v-if="operateUser || operateCompany" style="padding-right:20px;">
        <template slot-scope="scope">
          <el-button type="text" size="small" :disabled="scope.row.defaultOption=='true'" v-if="(userType=='企业用户'||userType=='企业内用户')&&scope.row.defaultOption=='true'">不可删除</el-button>
          <div v-if="!scope.row.isEdit&&(scope.row.defaultOption=='false'||userType=='普通用户')" class=" operation-btn">
            <p>
              <el-button type="text" size="small" @click="editClick(scope.row,scope)" v-if="operateJudge(scope.row)">编辑</el-button>
              <el-button type="text" size="small" class="gray" v-else>编辑</el-button>
            </p>
            <p>
              <el-button type="text" size="small" @click="handleClick(scope.row)" v-if="operateJudge(scope.row)">删除</el-button>
              <el-button type="text" size="small" class="gray" v-else>删除</el-button>
            </p>
            <p>
              <el-button type="text" size="small" @click="setDefault(scope.row)" v-if="userType=='普通用户'&&scope.row.defaultOption=='false'">设为默认</el-button>
            </p>
          </div>
          <div v-if="scope.row.isEdit&&(scope.row.defaultOption=='false'||userType=='普通用户')" class="operation-btn">
            <p>
              <el-button type="text" size="small" @click="saveClick(scope.row)">保存</el-button>
            </p>
            <p>
              <el-button type="text" size="small" @click="cancelClick(scope.row,scope)">取消</el-button>
            </p>
          </div>
          <div class="contact" v-if="(userType=='企业用户'||userType=='企业内用户')&&scope.row.defaultOption=='true'">企业信息修改请
            <span @click="gotoContact">联系客服</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-btn" @click="addTo" v-if="$store.state.addZizhi">
      <span>+</span>
      <span>继续增加发票资质</span>
    </div>
    <billZizhiManage v-if="!$store.state.addZizhi" @addzizhi="addzizhi"></billZizhiManage>
    <span class="J-operateUser" v-has="['TGcyHs']"></span> <!-- 个人修改操作 -->
    <span class="J-operateCompany" v-has="['kOOfV9']"></span> <!-- 企业修改操作 -->
  </div>
</template>

<script>
import api from '@/fetch/api'
import billZizhiManage from './billZizhiManage'
import { formatDate, downloadBlob, downloadSingle } from '@/assets/js/date-format'

export default {
  components: {
    billZizhiManage,
    formatDate,
    downloadBlob,
    downloadSingle
  },
  data() {
    return {
      searchinput: '', //搜索内容
      dateTime: '', //创建时间
      tableData: [],
      params: {
        createAtMax: '',
        createAtMin: '',
        field: 'defaultOption',
        keyword: '',
        sort: 'desc'
      },
      userType: '',
      operateUser: false, // 个人修改
      operateCompany: false // 企业修改
    }
  },
  props: [''],
  mounted() {
    this.getMyInvoiceVerificationList()
    // hack 操作的显示
    let dNoneoperate = document.getElementsByClassName('J-operateUser')[0]
    if (dNoneoperate && !dNoneoperate.style.display) {
      this.operateUser = true
    }
    let dNoneoperateCompany = document.getElementsByClassName('J-operateCompany')[0]
    if (dNoneoperateCompany && !dNoneoperateCompany.style.display) {
      this.operateCompany = true
    }
  },
  methods: {
    addzizhi() {
      this.getMyInvoiceVerificationList()
    },
    taxNumberEnter(row, taxNumberEdit, index) {
      if (taxNumberEdit) {
        row.taxNumberEdit = taxNumberEdit.toUpperCase()
        this.$set(this.tableData, index, row)
      }
    },
    operateJudge(row) {
      if (row.userId === JSON.parse(localStorage.QingjuuserId) || this.operateCompany) {
        return true
      }
      return false
    },
    gotoContact() {
      this.$router.push('/info/Contact')
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
    // 导出发票资质
    downQualifications() {
      api
        .invoiceQualificationExport(this.params)
        .then(res => {
          downloadBlob(res, '资质列表')
        })
        .catch(res => {})
    },
    // 我的资质列表
    getMyInvoiceVerificationList() {
      api
        .getMyInvoiceVerificationList(this.params)
        .then(res => {
          this.tableData = res.dataList[0].invoiceVerificationHomeDto
          this.userType = res.dataList[0].userCategory
          this.tableData.map(item => {
            item.isEdit = false
          })
        })
        .catch(res => {})
    },
    // 修改发票资质接口
    updateInvoiceVerification(data) {
      let datas = {
        taxNumber: data.taxNumber,
        registeredAddress: data.registeredAddress,
        registeredTelephone: data.registeredTelephone,
        bank: data.bank,
        bankAccount: data.bankAccount,
        userId: data.userId,
        invoiceVerificationId: data.id
      }
      api
        .updateInvoiceVerification(datas)
        .then(res => {
          if (res.errorCode == '200') {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.getMyInvoiceVerificationList()
          }
        })
        .catch(res => {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          this.getMyInvoiceVerificationList()
        })
    },
    search() {
      if (this.dateTime) {
        this.dateTime[0] ? (this.params.createAtMin = this.dateTime[0]) : (this.params.createAtMin = '')
        this.dateTime[1] ? (this.params.createAtMax = this.dateTime[1]) : (this.params.createAtMax = '')
      } else {
        this.params.createAtMin = ''
        this.params.createAtMax = ''
      }
      this.params.keyword = this.searchinput
      this.getMyInvoiceVerificationList()
    },
    reset() {
      this.searchinput = ''
      this.dateTime = ''
      this.params.createAtMin = ''
      this.params.createAtMax = ''
      this.params.keyword
      this.getMyInvoiceVerificationList()
    },
    // 排序
    sortChange(column, prop, order) {
      this.params.field = column.prop
      column.order == 'descending' ? (this.params.sort = 'desc') : (this.params.sort = 'asc')
      this.getMyInvoiceVerificationList()
    },
    // 编辑
    editClick(row, scope, index) {
      this.tableData.map(item => {
        item.isEdit = false
      })
      row.isEdit = true
      this.tableData[scope.$index].isEdit = true
      row.taxNumberEdit = row.taxNumber //纳税识别号
      row.registeredAddressEdit = row.registeredAddress //注册地址
      row.registeredTelephoneEdit = row.registeredTelephone //注册电话
      row.bankEdit = row.bank //开户银行
      row.bankAccountEdit = row.bankAccount //银行账号
      this.$set(this.tableData, scope.$index, row)
    },
    // 保存
    saveClick(row) {
      row.taxNumber = row.taxNumberEdit.toUpperCase()
      row.registeredAddress = row.registeredAddressEdit
      row.registeredTelephone = row.registeredTelephoneEdit
      row.bank = row.bankEdit
      row.bankAccount = row.bankAccountEdit
      if (!row.taxNumber)
        return this.$message({
          message: '请输入纳税识别号',
          type: 'warning'
        })
      if (!row.registeredAddress)
        return this.$message({
          message: '注册地址',
          type: 'warning'
        })
      if (!row.registeredTelephone)
        return this.$message({
          message: '注册电话',
          type: 'warning'
        })
      if (!row.bank)
        return this.$message({
          message: '开户银行',
          type: 'warning'
        })
      if (!row.bankAccount)
        return this.$message({
          message: '银行账号',
          type: 'warning'
        })

      this.updateInvoiceVerification(row)
    },
    // 取消编辑
    cancelClick(row, scope) {
      row.isEdit = false
      this.$set(this.tableData, scope.$index, row)
    },
    // 删除
    handleClick(row) {
      api
        .deleteInvoice(row.id)
        .then(res => {
          if (res.errorCode == '200') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getMyInvoiceVerificationList()
          }
        })
        .catch(res => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    // 普通账号设置默认发票
    setDefault(row) {
      api
        .setInvoiceVerificationDefault(row.id)
        .then(res => {
          if (res.errorCode == '200') {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            this.getMyInvoiceVerificationList()
          }
        })
        .catch(res => {
          this.$message({
            message: '设置失败',
            type: 'success'
          })
        })
    },
    // 添加发票资质
    addTo() {
      this.tableData.map(item => {
        item.isEdit = false
      })
      this.$store.commit('addWindow', false)
    }
  }
}
</script>
<style lang="less" scoped>
.new-btn {
  position: absolute;
}
.tableList1 {
  margin-top: 20px;
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
      margin-top: 4px;
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
    .down-btn:hover {
      color: #2fc182;
    }
  }
  .info-table {
    th:nth-child(1) {
      padding-left: 20px;
    }
    th:last-child {
      padding-right: 20px;
    }
    .company-title {
      margin: 12px 0 13px 0;
      height: 17px;
      line-height: 17px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .live-people {
      font-weight: 400;
      color: rgba(0, 179, 138, 1);
      cursor: pointer;
    }
    .operation-btn {
      p {
        text-align: right;
      }
    }
    .contact {
      position: absolute;
      top: 5px;
      right: 20px;
      min-width: 170px;
      span {
        cursor: pointer;
        color: #0099cc;
      }
    }
    .conpany-info-show {
      .ul-show {
        li {
          padding: 13px 0;
          font-size: 14px;
          height: 14px;
          line-height: 14px;
          span:nth-child(1) {
            display: inline-block;
            width: 84px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          span:nth-child(2) {
            display: inline-block;
            margin-left: 24px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            width: 500px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .ul-edit {
        padding-bottom: 5px;
        li {
          padding: 13px 0;
          font-size: 14px;
          height: 14px;
          line-height: 14px;
          span {
            display: inline-block;
            width: 84px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          input {
            width: 488px;
            border: 1px solid #cccccc;
            border-radius: 2px;
            height: 28px;
            line-height: 28px;
            padding: 0 5px;
            margin-left: 24px;
          }
          input:focus {
            border: 1px solid #03b189;
          }
        }
      }
    }
  }
  .add-btn {
    height: 80px;
    line-height: 80px;
    vertical-align: middle;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    margin-top: 20px;
    cursor: pointer;
    span:nth-child(1) {
      margin-right: 2px;
    }
  }
  .add-btn:hover {
    color: #00b38a;
    background-color: #f2f2f2;
  }
}
</style>
<style scoped>
.bill-filter >>> .el-input__inner {
  border-top: 0 none;
  border-left: 0 none;
  border-right: 0 none;
}
.add-person-info >>> .info-box {
  margin-bottom: 5px;
}
.info-box >>> .box-span {
  float: left !important;
  color: #999999;
}
.info-box >>> .info-ul {
  margin-left: 10px;
  float: left !important;
  color: #333;
}
.info-table >>> th {
  background: #f6f7fb;
  padding: 0;
  height: 40px;
  line-height: 40px;
}
.time-filter >>> .el-range-editor {
  padding: 3px 0px !important;
}
.info-table >>> .el-table__row {
  position: relative;
}
.info-table >>> tr th:nth-child(1) .cell {
  padding-left: 22px;
}
.info-table >>> tr td:nth-child(1) .cell {
  padding-left: 20px;
}
.info-table >>> tr th:nth-child(4) .cell {
  padding-right: 22px;
}
.info-table >>> .el-table__row td:nth-child(4) .cell {
  padding-right: 20px;
}
</style>
