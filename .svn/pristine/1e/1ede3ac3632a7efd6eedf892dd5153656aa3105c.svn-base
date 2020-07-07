<template>
  <div class="Pro_content">
    <div class="history-list">
      <div class="tableList" :style="{height:ActiveHeight+'px'}">
        <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%;" :header-cell-class-name="tableHeaderClassName">
          <el-table-column label="流水号/时间" align="center" width="210px">
            <template slot-scope="scope">
              <!-- {{ scope.row.date }} -->
              <div>
                <p style="font-size: 12px;color: #333333;">{{scope.row.orderNumber}}</p>
                <p style="font-size: 12px;color: #666666;">{{scope.row.inputTime}}</p>
              </div>

            </template>
          </el-table-column>
          <el-table-column label="收入/支出" width="140px" align="center">
            <template slot-scope="scope">
              <p style="color:#5CCA37;" v-if="scope.row.methodsType==='1'">+{{scope.row.inOrOutBean}}</p>
              <p style="color:red;" v-if="scope.row.methodsType==='2'">-{{scope.row.inOrOutBean}}</p>
            </template>

          </el-table-column>

          <el-table-column label="详细说明" align="center">
            <template slot-scope="scope">
              <p style="font-size:14px;">{{scope.row.consumeColumn}}({{scope.row.comment}})</p>
            </template>

          </el-table-column>
        </el-table>

      </div>
      <div class="Pro-content-footer" @click="getMoreInfo" v-show="showMoreFlag===true">
        <p v-if="loadingFlag===false">查看更多</p>
        <p v-else v-loading="loadingFlag"></p>
      </div>
    </div>

  </div>
</template>


<script>
import api from "@/fetch/api";
export default {
  data() {
    return {
      input: "",
      showhistoryListFlag: false,
      tableData1: [],
      userId: window.localStorage.QingjuuserId,
      ActiveHeight: 400,
      showMoreFlag: false,
      loadingFlag: false
    };
  },
  mounted() {
    if (this.userId) {
      this.userId = JSON.parse(this.userId);
      this.getBeanDetailRecord();
    }
  },
  methods: {
    //更多信息
    getMoreInfo() {
      if (this.tableData1.length > 0)
      this.loadingFlag = true;
      setTimeout(() => {
        this.ActiveHeight = 70 * (this.tableData1.length + 2);
        this.loadingFlag = false;
        this.showMoreFlag = false;
      }, 1000);
    },
    //青豆记录
    getBeanDetailRecord() {
      api.getBeanDetailRecord(this.userId).then(res => {
        this.tableData1 = res.dataList;
        if (this.tableData1.length > 5) {
          this.showMoreFlag = true;
        } else {
          this.showMoreFlag = false;
        }
      });
    },
    tableHeaderClassName({ row, rowIndex, columnIndex }) {
      return "table-header-color";
    },
    showhistoryList() {
      this.showhistoryListFlag = true;
    }
  }
};
</script>

<style lang="less" scoped>
.Pro_content {
  .history-list {
    .history-title {
      border-bottom: 2px solid #bcbcbc;
      p {
        font-size: 14px;
        color: #666666;
        font-weight: 700;
        margin-bottom: 10px;
      }
    }

    .tableList {
      margin-top: 10px;
      overflow: hidden;
      transition: height 3s;
    }
  }
}
.Pro-content-footer {
  background-color: #f3f3f3;
  // width: 870px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  margin-top: 20px;
  border-radius: 6px;
  font-size: 13px;
  color: #333333;
  > p {
    height: 100%;
    width: 100%;
  }
}
.Pro-content-footer:hover {
  color: #2fc182;
  background-color: #e4e4e4;
  box-shadow: 2px 2px 10px #333333;
  cursor: pointer;
  border-radius: 6px;
}
</style>



