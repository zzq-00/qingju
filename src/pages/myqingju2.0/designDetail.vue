<template>
  <div>
    <projectListheader />
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color:#f1f1f1;margin-top: 0;" />
    <div class="container">
      <!-- 项目状态 -->
      <div class="status clearfix">
        <div class="left fl">
          <span class="font12">项目编号:{{designDto.projectNumber}}</span>
          <p>{{designDto.statusName}}</p>
        </div>
        <div class="right fl" v-if="designDto.status<8">
          <div>
            <span class="font12" v-if="designDto.status==1">感谢您使用青矩互联平台，我们会尽快审批该项目，请您耐心等候！</span>
            <span class="font12" v-if="designDto.status==2">感谢您使用青矩互联平台，该项目已经审批通过，正在等待确认，请您耐心等候！</span>
            <span class="font12" v-if="designDto.status==3">该项目会为您保留30个工作日，请尽快托管资金，感谢您使用青矩互联平台！</span>
            <span class="font12" v-if="designDto.status==5">您的项目已经开始工作，请您耐心等候！</span>
            <span class="font12" v-if="designDto.status==6">您项目的成果文件已经提交，请您尽快验收！</span>
            <span class="font12" v-if="designDto.status==7">恭喜您，您的项目已经完成交付。</span>
          </div>
          <div class="step">
            <div style="color: #333;">
              <img src="../../assets/img/u262.png" alt="">
              <span>已发布</span>
              <span>{{designDto.publishTime}}</span>
            </div>

            <img v-if="designDto.status>1" src="../../assets/img/u667.png" alt="">
            <img v-else src="../../assets/img/u378.png" alt="">

            <div v-if="designDto.status>=2" style="color: #333;">
              <img src="../../assets/img/u1996.png" alt="">
              <span>已审批</span>
              <span>{{designDto.pendingTime}}</span>
            </div>
            <div v-else>
              <img src="../../assets/img/u263.png" alt="">
              <span>待审批</span>
            </div>

            <img v-if="designDto.status>2" src="../../assets/img/u667.png" alt="">
            <img v-else-if="designDto.status==2" src="../../assets/img/u378.png" alt="">
            <img v-else src="../../assets/img/u379.png" alt="">

            <div v-if="designDto.status>=3" style="color: #333;">
              <img src="../../assets/img/u1997.png" alt="">
              <span>已确认</span>
              <span>{{designDto.confirmTime}}</span>
            </div>
            <div v-else>
              <img src="../../assets/img/u264.png" alt="">
              <span>待确认</span>
            </div>

            <img v-if="designDto.status>5" src="../../assets/img/u667.png" alt="">
            <img v-else-if="designDto.status==5" src="../../assets/img/u378.png" alt="">
            <img v-else src="../../assets/img/u379.png" alt="">

            <div v-if="designDto.status>=7" style="color: #333;">
              <img src="../../assets/img/u3073.png" alt="">
              <span>已完成</span>
              <span>{{designDto.checkedTime}}</span>
            </div>
            <div v-else>
              <img src="../../assets/img/u384.png" alt="">
              <span>待完成</span>
            </div>
          </div>
        </div>
        <!-- 项目关闭的流程 -->
        <div class="right fl" v-else>
          <div>
            <span class="font12" v-if="designDto.status==='8'">您的项目已被关闭，感谢您使用青矩互联！</span>
            <span class="font12" v-else>您的项目暂时被驳回了，感谢您使用青矩互联！</span>
          </div>
          <div class="step">
            <div>
              <img src="../../assets/img/u261.png" alt="">
              <span>提交申请</span>
              <span>{{designDto.publishTime}}</span>
            </div>
            <template v-if="designDto.status === '9'">
              <img src="@/assets/img/u379.png" alt="">
              <div>
                <img src="@/assets/img/u3358.png" alt="">
                <span>已驳回</span>
                <span>{{designDto.closeTime}}</span>
              </div>
            </template>
            <template v-else>
              <img src="@/assets/img/u379.png" alt="">
              <div>
                <img src="@/assets/img/u3351.png" alt="">
                <span>已关闭</span>
                <span>{{designDto.closeTime}}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="project-info">
        <div>基本信息</div>
        <div class="info">
          <ul class="info-list">
            <li style="flex: 0 0 100%;">
              <span>项目名称：</span>
              <span>{{designDto.projectName}}</span>
            </li>
            <li>
              <span>建筑类型：</span>
              <span>{{designDto.projectType}}</span>
            </li>
            <li v-if="designDto.serviceItemString">
              <span>服务内容：</span>
              <span>{{designDto.serviceItemString}}</span>
            </li>
            <li>
              <span>{{designDto.projectType=='装饰设计'?'设计面积':'建筑面积'}}：</span>
              <span>{{designDto.buildingArea}} ㎡</span>
            </li>
            <li>
              <span>投资额：</span>
              <span>{{designDto.entrustTheSum | formatMoney}} 元</span>
            </li>
            <li>
              <span>设计费：</span>
              <span>{{designDto.designFee | formatMoney}} 元</span>
            </li>
            <li>
              <span>承做中心：</span>
              <span>{{designDto.undertakeDepartment}}</span>
            </li>
            <li v-if="designDto.designStyle">
              <span>{{designDto.projectType=='装饰设计'?'设计风格':'项目分类'}}：</span>
              <span>{{designDto.designStyle}}</span>
            </li>
            <li v-if="designDto.itemClassificationString">
              <span>项目类别：</span>
              <span>{{designDto.itemClassificationString}}</span>
            </li>
            <li v-if="designDto.buildingProperty">
              <span>建设性质：</span>
              <span>{{designDto.buildingProperty}}</span>
            </li>
            <li v-if="designDto.onSiteService">
              <span>驻场服务：</span>
              <span>{{designDto.onSiteService}} 人日</span>
            </li>
            <li>
              <span>联系方式：</span>
              <span>{{designDto.contactWay}}</span>
            </li>
            <li>
              <span>项目地址：</span>
              <span>{{designDto.location}}</span>
            </li>
            <li style="flex: 0 0 100%;">
              <span>附件：</span>
              <span>
                <div v-for="(item,index) in designDto.accessoryFiles" :key="index">
                  <a style="text-decoration: underline;color: #7BBC52;" :href="item.path" target="_blank">{{item.name}}</a>
                </div>
              </span>
            </li>
            <li style="flex: 0 0 100%;">
              <span>项目概述：</span>
              <span>{{designDto.projectOverview}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import projectListheader from '@/components/projectListheader'
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'

export default {
  components: {
    projectListheader,
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '我的项目', path: '/myqingju/project' }, { name: '项目详情', path: this.$route.fullPath }],
      designDto: {}
    }
  },
  methods: {
    // 查看项目详情
    backDesignProjectBaseInfo(id = this.$route.params.id) {
      api.backDesignProjectBaseInfo(id).then(res => {
        this.designDto = res.designDto
      })
    }
  },
  mounted() {
    this.backDesignProjectBaseInfo()
  }
}
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto 100px;
}
.status {
  color: #666;
  height: 240px;
  border-top: 3px solid rgba(0, 153, 107, 1);
  background-color: #fff;
  > div {
    padding: 13px 26px;
    box-sizing: border-box;
  }
  .left {
    width: 240px;
    height: 100%;
    border-right: 1px solid #e4e4e4;
    text-align: center;
    position: relative;
    > p {
      font-size: 20px;
      font-weight: 700;
      &:nth-child(2) {
        color: #2dbe7f;
        margin-top: 45px;
      }
      &:nth-child(3) {
        color: #ff0000;
        margin-top: 5px;
      }
    }
    > button {
      cursor: pointer;
      font-size: 13px;
      color: #e4433f;
      background-color: #fff;
      margin: 15px 0;
      padding: 5px 25px;
      border: 1px solid #e4433f;
      &:hover {
        color: #fff;
        background-color: #e4433f;
      }
    }
    > div {
      width: 188px;
      font-size: 14px;
      position: absolute;
      bottom: 12px;
      > span {
        color: #333;
        cursor: pointer;
        padding-left: 20px;
        &.confirm {
          background: url(../../assets/img/u767.png) left center no-repeat;
        }
        &.cancle {
          background: url(../../assets/img/u764.png) left center no-repeat;
        }
        &:hover {
          color: #e4433f;
          &.confirm {
            background: url(../../assets/img/u767_mouseOver.png) left center no-repeat;
          }
          &.cancle {
            background: url(../../assets/img/u764_mouseOver.png) left center no-repeat;
          }
        }
        & + span {
          margin-left: 30px;
        }
      }
    }
  }
  .right {
    width: 960px;
    height: 100%;
    .step {
      margin-top: 55px;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: space-around;
      > div {
        flex: 0 0 64px;
        height: 87px;
        text-align: center;
        &.now {
          color: #333;
        }
        > span {
          display: block;
          width: 100%;
          &:nth-child(2) {
            font-size: 14px;
          }
          &:nth-child(3) {
            font-size: 12px;
          }
        }
      }
      > img {
        width: 110px;
        height: 9px;
        margin-top: -40px;
      }
    }
  }
}
.project-info {
  font-size: 14px;
  margin-top: 20px;
  padding: 0 20px;
  background-color: #fff;
  border: 1px solid #eee;
  > div {
    &:first-child {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      background-color: #fafbfc;
      padding-left: 15px;
      margin: 0 -20px;
    }
    &.exponent-price {
      padding: 15px 0;
      > div {
        text-align: right;
        margin: 0 30px;
      }
      > ul {
        li {
          float: left;
        }
      }
    }
    &.pay-button {
      text-align: right;
      border-top: 1px dashed #eeeeee;
      padding: 20px 0;
      > button {
        cursor: pointer;
        font-size: 16px;
        padding: 8px 10px;
        border-radius: 2px;
        font-weight: 700;
        &.pay {
          color: #fff;
          background-color: rgba(230, 67, 70, 1);
          margin-right: 5px;
        }
        &.giveUp {
          color: #666666;
          background-color: rgba(228, 228, 228, 1);
        }
      }
    }
    &.info {
      padding: 15px 10px;
      .info-list {
        display: flex;
        flex-wrap: wrap;
        > li {
          flex: 0 0 50%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          > span {
            display: inline-block;
            line-height: 40px;
            &:first-child {
              color: #666;
              font-weight: 700;
              width: 135px;
              vertical-align: top;
            }
          }
        }
      }
      .price-info {
        border-top: 1px solid #e4e4e4;
        text-align: right;
        padding: 20px 0;
        > li {
          line-height: 40px;
          > span {
            display: inline-block;
            &:last-child {
              min-width: 130px;
            }
          }
          &:last-child {
            color: #ff0000;
            > span:last-child {
              font-size: 20px;
              font-weight: 700;
            }
          }
        }
      }
    }
    &.file {
      padding-bottom: 15px;
      > div {
        line-height: 45px;
        > label {
          width: 135px;
          margin-left: 10px;
        }
        > div {
          margin-left: 150px;
          select {
            width: 200px;
            height: 30px;
          }
          select,
          textarea {
            border: 1px solid #bcbcbc;
          }
        }
      }
    }
    &.history {
      color: #666;
      background-color: #fff;
      border-top: 1px dashed #eee;
      padding: 15px 0;
      .left {
        width: 148px;
        text-align: center;
        > div {
          margin: 10px 0;
          font-size: 12px;
        }
      }
      .right {
        width: 1000px;
        > ul {
          margin: 10px 0;
          > li {
            color: #77ce45;
            > a {
              color: #77ce45;
              text-decoration: underline;
            }
            &:hover {
              color: #28b343;
              > a {
                color: #28b343;
              }
            }
          }
        }
        > span {
          font-size: 12px;
          color: #999;
        }
      }
    }
    &.final-charge {
      > ul {
        padding: 20px 0;
        > li {
          float: left;
          font-weight: 700;
          margin-right: 150px;
        }
      }
    }
    &.price-calculation {
      border-top: 1px dashed #eeeeee;
      padding: 15px 0;
      line-height: 22px;
      > dl {
        padding-left: 18px;
        dt {
          cursor: pointer;
          font-weight: 700;
          margin-left: -18px;
          &::before {
            margin-right: 4px;
            content: '—';
            display: inline-block;
            width: 14px;
            height: 14px;
            line-height: 14px;
            text-align: center;
            color: #fff;
            background-color: rgba(33, 165, 126, 1);
          }
        }
      }
      > ul {
        text-align: right;
        b {
          display: inline-block;
          min-width: 110px;
        }
      }
    }
  }
}
.question {
  margin-top: 20px;
  padding: 40px 20px 0;
  background-color: #fff;
  > textarea {
    border: 1px solid #ccc;
    padding: 0 10px;
  }
  > div:nth-child(2) {
    text-align: right;
    padding: 15px 0;
  }
  .history {
    color: #666;
    border-top: 1px dashed #eee;
    padding: 15px 0;
    .left {
      width: 148px;
      text-align: center;
      > div {
        margin: 10px 0;
        font-size: 12px;
      }
    }
    .right {
      width: 1000px;
      > p {
        font-size: 14px;
        margin-bottom: 15px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.font12 {
  font-size: 12px;
}
.upload-button {
  cursor: pointer;
  color: #fff;
  background-color: #34a47e;
  padding: 7px 20px;
  border-radius: 3px;
}
textarea {
  width: 100%;
  box-sizing: border-box;
}
</style>
