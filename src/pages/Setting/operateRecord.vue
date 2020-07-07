<template>
  <div class="Pro-content2">
    <div class="title1">
        <p>操作日志</p>
    </div>
    <div class="tableList">
                  <el-table
                      ref="multipleTable"
                      :data="tableData1"
                      tooltip-effect="dark"
                      style="width: 100%;"
                       :header-cell-class-name="tableHeaderClassName"
                     >
                      <el-table-column
                        label="模块"
                         align="center"
                        width="210px">
                        <template slot-scope="scope">
                          <!-- {{ scope.row.date }} -->
                          <div>
                              <p style="font-size: 12px;color: #333333;">{{scope.row.mode}}</p>
                          </div>

                          </template>
                    </el-table-column>
                      <el-table-column
                        label="操作内容"
                        align="center"
                        width="270px">
                        <template slot-scope="scope">
                            <p style="font-size: 14px;color: #666666;">{{scope.row.operate}}</p>

                        </template>
                      </el-table-column>
                      <el-table-column
                        label="状态"
                        width="150px"
                        align="center"
                        >
                        <template slot-scope="scope">
                                <p>{{scope.row.state}}</p>

                        </template>

                      </el-table-column>

                       <el-table-column
                        label="时间"
                        width="240px"
                        align="center"
                        >
                        <template slot-scope="scope">
                                <p style="font-size:14px;">{{scope.row.time}}</p>
                        </template>

                      </el-table-column>
                </el-table>

     </div>



    <div class="footer1">
         <el-button class="but"  size="small">上一页</el-button>
         <el-button class="but"  size="small">下一页</el-button>
    </div>

  </div>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {
         tableData1: [{
          mode:'活动 ',
          time: '2017-08-01  17:16:57',    ///1

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
          state:' 成功',
          amount:'1500.00'
        }, {
          mode:'活动 ',                                            ///2
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
           state:' 成功',
          amount:'1500.00'
        }, {
          mode:'活动 ',                                            ///3
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
          state:' 成功',
           amount:'1500.00'
        }, {
          mode:'活动 ',                                           ///4
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
           state:' 成功',
           amount:'1500.00'
        }, {///5
          mode:'活动 ',
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
           state:' 成功',
           amount:'1500.00'
        }, {///6
          mode:'活动 ',
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
           state:' 成功',
           amount:'1500.00'
        }, {///7\
           mode:'活动 ',
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
           state:' 成功',
           amount:'1500.00'

        },{///8
        mode:'活动 ',
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
           state:' 成功',
           amount:'1500.00'
        },
        {///9
        mode:'活动 ',
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
           state:' 成功',
           amount:'1500.00'
        },
        {///10
        mode:'活动 ',
          time: '2017-08-01  17:16:57',

          operate: '市场推广大会报名 ',
          pro_type:'交易成功',
           state:' 成功',
           amount:'1500.00'

        }
        ],
        multipleSelection: []
    }
  },
  methods: {
       tableHeaderClassName({row,rowIndex,columnIndex}){

            return 'table-header-color';
      },

  },
  mounted() {


  }
};
</script>
<style lang='less' scoped>
    body{
       background-color: #ffffff;
    }
    .Pro-content2{
      width: 870px;
      padding-left:50px;
      background-color: #ffffff;
      .title1{
        border-bottom:1px solid #333333;
        padding-bottom:20px;
        overflow: hidden;
        >p{
           color: #333333;
           font-size:18px;
           font-weight:700;
           float: left;
        }
        >div{
          float: right;
          >img{
            height: 12px;
            width: 12px;
          }
          >img:hover{
           cursor: pointer;
          }
          >span:hover{
           cursor: pointer;
          }
        }
      }
      .tableList{
         margin-top:10px;
      }


     .footer1{
        margin-top:40px;
        text-align: center;
        .but{
            background-color: #009966;
            border:1px  solid #009966;
            width: 108px;
            color: white;
            margin-right: 10px;

        }
      }


    }



</style>

<style>
   .el-table  .table-header-color{
        background-color: #F3F5F7;
        font-weight: 700;
        font-size: 14px;
        color: #333333;
        width:870px;

    }

</style>


