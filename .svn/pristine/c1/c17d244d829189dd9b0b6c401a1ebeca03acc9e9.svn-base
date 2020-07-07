<template>
  <div style="background-color:#fff">
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <div class="contents">
      <div class="leftBox">
        <h3>青矩平台</h3>
        <ul>
          <li v-for="(item,index) in proOptions" :key="index" :class="{active: isActive==index}" @click="changeType(item,index)">{{item.value}}</li>
        </ul>
      </div>
      <div class="rightBox">
        <!-- <div v-if="noData">暂无数据</div> -->
        <div v-for="(item,index) in titleOptions" class="whole">
          <h4>{{item.title}}</h4>
          <p v-if="dropDown==index?false:true" v-html="item.body" style="height: 60px;overflow: hidden;"></p>
          <!-- <div style="margin-top: 20px; height: 200px;"> -->
          <el-collapse-transition>
            <div v-if="show3==index?true:false">
              <div class="transition-box" v-html="item.body"></div>
            </div>
          </el-collapse-transition>
          <!-- </div>             -->
          <span class="seek" @click="details(item,index)">{{saleUp===index?'收起 &and;':'查看详情 &or;'}}</span>
          <!-- <span class="takeUp" v-if="isfalse==index" @click="takeUp(item,index)"></span> -->
        </div>

      </div>
      <div style="clear:both"></div>
    </div>

  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'

export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '常见问题', path: this.$route.fullPath }],
      proOptions: [], //问题类型
      isActive: -1,
      titleOptions: [], //标题列表
      isShow: true,
      isfalse: -1,
      saleUp: -1,
      show3: -1,
      dropDown: -1,
      brief: '',
      typeList: []
    }
  },
  methods: {
    //   获取问题类型
    getProblemTypeValue() {
      api.getProblemTypeValue().then(res => (this.proOptions = res.dataList))
    },
    // 选择问题类型
    changeType(item, index) {
      this.typeList = []
      this.isActive = index
      this.typeList.push(item.id)
      let data = {
        asList: [],
        flag: 0,
        page: 0,
        size: 1000,
        status: true,
        title: '',
        typeList: this.typeList
      }
      api.getAllProblem(data).then(res => {
        this.titleOptions = res.page.content
        if (this.titleOptions.length == 0) {
          this.noData = true
        } else {
          this.noData = false
        }
        this.titleOptions.map(item => {
          if (item.body.length > 80) {
            this.brief = item.body.substring(0, 80)
          }
        })
      })
    },
    // 查询问题
    getAllProblem() {
      let data = {
        asList: [],
        flag: 0,
        page: 0,
        size: 1000,
        status: true,
        title: '',
        typeList: []
      }
      api.getAllProblem(data).then(res => {
        this.titleOptions = res.page.content
        if (this.titleOptions.length == 0) {
          this.noData = true
        } else {
          this.noData = false
        }
        this.titleOptions.map(item => {
          if (item.body.length > 80) {
            this.brief = item.body.substring(0, 80)
          }
        })
      })
    },
    // 查看详情
    details(item, index) {
      this.show3 = this.show3 === index ? -1 : index
      this.saleUp = this.saleUp === index ? -1 : index
      this.isfalse = this.isfalse === index ? -1 : index
      this.dropDown = this.dropDown === index ? -1 : index
    },
    // 收起
    takeUp(item, index) {}
  },
  mounted() {
    this.getProblemTypeValue() //获取问题类型
    this.getAllProblem() //问题标题
  }
}
</script>

<style lang='less' scoped>
.contents {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;
}
.leftBox {
  width: 230px;
  min-height: 569px;
  float: left;
  background-color: rgba(248, 250, 252, 1);
  h3 {
    font-weight: 700;
    font-style: normal;
    color: #333;
    font-size: 18px;
    padding: 18px 0 18px 18px;
  }
  ul {
    li {
      padding: 0 30px;
      height: 40px;
      line-height: 40px;
      background: url(../../assets/img/right.png) no-repeat 190px center;
      background-size: 12px 12px;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #666666;
    }
    li:hover {
      padding: 0 30px 0 40px;
      background: rgba(33, 165, 126, 1) url(../../assets/img/right1.png) no-repeat 190px center;
      background-size: 12px 12px;
      cursor: pointer;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #fff;
    }
    .active {
      padding: 0 30px 0 40px;
      background: rgba(33, 165, 126, 1) url(../../assets/img/right1.png) no-repeat 190px center;
      background-size: 12px 12px;
      cursor: pointer;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #fff;
    }
  }
}
.rightBox {
  float: left;
  margin-left: 59px;
  width: 911px;
  .whole {
    border-bottom: 1px solid#eee;
    padding-bottom: 50px;
    margin-bottom: 30px;
    position: relative;
    h4 {
      font-weight: 700;
      font-style: normal;
      font-size: 18px;
      text-align: left;
      margin-bottom: 15px;
    }
    p {
      font-size: 14px;
      color: #666666;
      line-height: 28px;
    }
    span {
      position: absolute;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #666666;
      bottom: 9px;
      display: block;
    }
    .seek {
      width: 78px;
      // background: url(../../assets/img/show.png) no-repeat right center;
      // background-size:8px 8px;
      cursor: pointer;
    }
  }
}
.transition-box {
  font-size: 14px;
  color: #666666;
  line-height: 28px;
  min-height: 60px;
}
</style>
