<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <img :src="require('@/assets/img/u8.jpg')" alt="" width="100%" height="500px">
    <div class="projects">
      <div class="container">
        <ul class="clearfix">
          <li v-for="(item,index) in allClassicCase" :key="index" @click="gotoDetails(item)" class="fl">
            <img :src="item.accessURL" alt="" width="380px" height="200px">
            <div class="project-content">
              <div>
                <span>{{item.typeDesc}}</span>
                <span>{{item.days}}天</span>
                <span>{{item.location}}</span>
                <span>{{item.projectDate}}</span>
              </div>
              <h6>{{item.title}}</h6>
              <!-- <p>钢筋、土建、安装工程量计算</p> -->
            </div>
          </li>
        </ul>
        <div class="more" v-if="showMore">
          <el-button type="info" @click="seeMore">查看更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb";
import api from "@/fetch/api.js";
export default {
  components: {
    breadcrumb,
  },
  data () {
    return {
      breadcrumbs: [{ name: "经典案例", path: this.$route.fullPath }],
      allClassicCase: [],
      OperationCondition: {
        page: 0,
        size: 6,
        status: true
      },
      showMore: false
    };
  },
  methods: {
    getAllClassicCase () {
      api.getAllClassicCase(this.OperationCondition).then(res => {
        this.allClassicCase = [...this.allClassicCase, ...res.page.content]
        this.showMore = this.allClassicCase.length < res.page.totalElements
      })
    },
    seeMore () {
      this.OperationCondition.page += 1
      this.getAllClassicCase()
    },
    // 查看案例详情
    gotoDetails (item) {
      this.$router.push('/businessService/classicCaseDetail/' + item.id)
    },
  },
  mounted () {
    this.getAllClassicCase();
  }
};
</script>

<style lang='less' scoped>
.projects {
  background-color: #fff;
  padding-bottom: 100px;
  > .container {
    > ul {
      > li {
        cursor: pointer;
        margin-top: 30px;
        margin-right: 20px;
        transition: all 0.2s;
        > img {
          width: 380px;
          height: 200px;
        }
        .project-content {
          padding: 15px 24px 30px;
          background-color: #f2f4f7;
          > div,
          > p {
            font-size: 14px;
            color: #666;
          }
          > div:first-child {
            > span {
              &:not(:first-child) {
                border-left: 1px solid #bcbcbc;
                padding: 0 10px;
              }
              &:first-child {
                padding-right: 10px;
              }
            }
          }
          > h6 {
            font-size: 18px;
            margin: 25px 0;
            font-weight: normal;
          }
        }
        &:hover {
          transform: scale(1.01);
          box-shadow: 3px 3px 10px 1px #aaa;
        }
      }
    }
    .more {
      > button {
        width: 100%;
        margin-top: 45px;
      }
    }
  }
}
</style>
