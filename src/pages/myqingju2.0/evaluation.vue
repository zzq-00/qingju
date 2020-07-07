<template>
  <div>
    <projectListheader />
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color:#f1f1f1;margin-top: 0px;" />
    <div class="container">
      <div class="title">
        <h3>项目评价</h3>
        <p>{{projectName}}</p>
      </div>
      <div class="content clearfix" v-for="(item,index) in dataList" :key="index">
        <div class="left fl">
          <img :src="item.headPortrait" alt="" width="70px" height="70px">
          <p>{{item.workStationName}}</p>
          <span style="display:none;">{{evaluationParams.evaluationProjects[index].projectInfoId = item.projectInfoId}}</span>
        </div>
        <div class="right fl">
          <div class="clearfix">
            <label class="require">评分</label>
            <div>
              <el-rate v-if="item.projectEvaluationDtos" disabled v-model="item.projectEvaluationDtos.starNumber" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
              <el-rate v-else v-model="evaluationParams.evaluationProjects[index].starNumber" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
              <!-- <div style="margin-top: 10px">
                <el-checkbox-group v-model="checkboxGroup" size="mini">
                  <el-checkbox label="省心、省力、省时" border></el-checkbox>
                  <el-checkbox label="省心、省力、省时" border></el-checkbox>
                </el-checkbox-group>
              </div> -->
            </div>
          </div>
          <div class="clearfix">
            <label>描述</label>
            <div>
              <textarea v-if="!item.projectEvaluationDtos" v-model="evaluationParams.evaluationProjects[index].description" cols="105" rows="5" placeholder="请描述评分依据！"></textarea>
              <p v-else>{{item.projectEvaluationDtos.description}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="confirm" v-if="!projectEvaluationDtos">
        <el-button type="primary" size="medium" @click="evaluation">确&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import projectListheader from "@/components/projectListheader";
import breadcrumb from "@/components/breadcrumb";
import api from "@/fetch/api";

export default {
  components: {
    projectListheader,
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [
        { name: "我的项目", path: '/myqingju/project' },
        { name: "项目评价", path: this.$route.fullPath }
      ],
      checkboxGroup: [],
      evaluationParams: {
        evaluationProjects: [],
        projectBaseId: "",
      },
      dataList: [],
      projectName: '',
      projectEvaluationDtos: '',
    }
  },
  methods: {
    evaluation() {
      api.evaluation(this.evaluationParams).then(res => {
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        this.$router.push('/myqingju/project')
      }).catch(res => {
        this.$message.error(res.errorMsg)
      })
    },
    getProjectNameAndHeadPortrait() {
      api.getProjectNameAndHeadPortrait(this.$route.params.id).then(res => {
        for (let index = 0; index < res.dataList.length; index++) {
          this.evaluationParams.evaluationProjects.push({
            description: "",
            projectInfoId: "",
            starNumber: 5
          })
        }
        this.dataList = res.dataList
        this.projectName = res.dataList[0].projectName
        this.projectEvaluationDtos = res.dataList[0].projectEvaluationDtos
      })
    }
  },
  mounted() {
    this.evaluationParams.projectBaseId = this.$route.params.id
    this.getProjectNameAndHeadPortrait()
  }
}
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto 100px;
  .title {
    text-align: center;
    > h3 {
      & + p {
        font-size: 12px;
        margin-top: 15px;
        margin-bottom: 20px;
        color: #666;
      }
    }
  }
  .content {
    background-color: #fff;
    height: 228px;
    border-right: 1px solid #e4e4e4;
    margin-bottom: 20px;
    .left {
      width: 250px;
      height: 100%;
      border-right: 1px solid #e4e4e4;
      text-align: center;
      > img {
        margin-top: 60px;
        margin-bottom: 40px;
        & + p {
          font-size: 12px;
          color: #666;
        }
      }
    }
    .right {
      box-sizing: border-box;
      width: 925px;
      height: 100%;
      padding: 20px 0;
      textarea {
        border: 1px solid #d8dce5;
        padding: 10px;
      }
      > div {
        & + div {
          margin-top: 20px;
        }
        > label {
          float: left;
          font-size: 14px;
          width: 110px;
          text-align: center;
        }
        > label + div {
          font-size: 13px;
          margin-left: 116px;
          > p {
            width: 774px;
            margin-top: 3px;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
      }
    }
  }
  .confirm {
    text-align: center;
    background-color: #fff;
    padding: 20px 0;
  }
}
textarea {
  width: 100%;
  box-sizing: border-box;
}
</style>
