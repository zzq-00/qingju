<template>
  <div class="control-container">
    <header-components></header-components>
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <div class="qj-control-container container">
      <p class="qj-global-index">
        <span class="title">青矩综合指数：</span>
        <span class="index">{{indexNumber}}</span>
      </p>
      <ul class="query-time">
        <li class="kind-time" v-for="(item,index) in kindTime" :key="item.time" @click="kindTimeClick(index)" v-bind:class="{'kind-time-active':selected==index}">
          {{item.time}}
        </li>
      </ul>
      <div class="chart-container" style="background-color:#f1f1f1;" id="JqjIndex">
      </div>
    </div>
  </div>
</template>
<script>
import headerComponents from "@/components/headerComponents";
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
var echarts = require('echarts')
export default {
  components: {
    headerComponents,
    breadcrumb
  },
  data () {
    return {
      breadcrumbs: [{ name: "青矩计量指数", path: this.$route.fullPath }],
      // 选中的时间段
      kindTime: [
        { time: '一个月' },
        { time: '三个月' },
        { time: '半年' },
        { time: '一年' }
      ],
      indexNumber: 0,
      selected: 0,
    }
  },
  methods: {
    // 画图
    drawchart (data) {
      var myChart = echarts.init(document.getElementById('JqjIndex'))
      var option = ({
        backgroundColor: '#f1f1f1',
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['青矩综合指数', '土建指数', '安装指数'],
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.complexExponents.map(item => item.date.substring(5, 10)),
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            smooth: true,
            lineStyle: { width: 4 },
            itemStyle: {
              normal: {
                color: '#008000'
              }
            },
            name: '青矩综合指数',
            data: data.complexExponents.map(item => item.complexExponentFormat),
          },
          {
            type: 'line',
            smooth: true,
            lineStyle: { width: 4 },
            itemStyle: {
              normal: {
                color: '#df9829'
              }
            },
            name: '土建指数',
            data: data.civilExponents.map(item => item.civilExponentFormat),
          },
          {
            type: 'line',
            smooth: true,
            lineStyle: { width: 4 },
            itemStyle: {
              normal: {
                color: '#601986'
              }
            },
            name: '安装指数',
            data: data.installExponents.map(item => item.installExponentFormat),
          }
        ]
      })
      myChart.setOption(option)
    },
    getExponentByDay (param = 30) {
      api.getExponentByDay(param).then(res => {
        this.indexNumber = res.data.complexExponents[res.data.complexExponents.length - 1].complexExponentFormat
        this.drawchart(res.data)
      })
    },
    // 选择月份
    kindTimeClick (index) {
      this.selected = index
      if (index == 0) {
        this.getExponentByDay(30)
      } else if (index == 1) {
        this.getExponentByDay(90)
      } else if (index == 2) {
        this.getExponentByDay(180)
      } else if (index == 3) {
        this.getExponentByDay(365)
      }
    }
  },
  mounted () {
    this.getExponentByDay()
  }
}
</script>
<style lang="less" scoped>
.control-container {
  background-color: #fff;
  padding-bottom: 60px;
}
.qj-control-container {
  position: relative;
  .qj-global-index {
    font-size: 13px;
    color: #333;
    margin-left: 30px;
    margin-top: 20px;
    .index {
      font-size: 20px;
      color: #2b8f19;
    }
    .change {
      color: #0066cc;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .query-time {
    position: absolute;
    top: -20px;
    right: 0;
    .kind-time {
      float: left;
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 12px;
      color: #666;
      background-color: #f1f1f1;
      background: linear-gradient(0deg, #f1f1f1 20%, #fff 80%);
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
    .kind-time + .kind-time {
      margin-left: 5px;
    }
    .kind-time-active {
      color: #666;
      background: linear-gradient(0deg, #fff 20%, #f1f1f1 80%);
    }
  }
}
.chart-container {
  width: 100%;
  height: 600px;
  margin-top: 40px;
  background-color: #f1f1f1;
}
</style>

