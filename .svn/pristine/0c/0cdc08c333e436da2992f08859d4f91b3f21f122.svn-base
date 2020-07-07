<template>
  <div class="exchangePaly">
    <headerComponents></headerComponents>
    <div class="exchangePaly-main container">
      <div class="tit">
        <div></div>
        <router-link to='/'>
          <div>
            <span>网站首页</span>
            <span>></span>
          </div>
        </router-link>
        <router-link to='/benefits'>
          <div>
            <span>福利专区</span>
            <span>></span>
          </div>
        </router-link>
        <router-link to='/doTasks'>
          <div>
            <span>任务中心</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="exchangePaly-content">
      <div class="image">
        <div class="image-content container">
          <div class="tit">
            <div @click="go2beanRecord">青豆记录</div>
            <div @click="go2exchangeRecord">兑换记录</div>
          </div>
          <div>
            <div><img :src="headImg" alt="" style="border-radius:50%;"></div>
            <div class="username">{{QingjuAccount}}</div>
            <div>
              <span>青豆：</span>
              <span style="color:red;">{{myQingdouCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="taskDetail container">
      <div class="tit">
        <p>今日完成情况</p>
      </div>
      <div>
        <div class="tast-Progress">
          <div :style="{width:progressWidth+'px'}"></div>
        </div>
        <div class="task-icon" :style="{left:progressWidth-25+'px'}">
          <div class="icon-main">
            <div class="icon-tuoyuan">
              {{currentBeanCount}}青豆
            </div>
            <div class="sanjiao">
              <img src="../../assets/img/u4444.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="task-list1">
        <div class="tit">
          <img src="../../assets/img/u4446.png" alt="">
          <p>每日任务</p>
        </div>
        <div class="lists">
          <div class="list" v-for="(item,index) in everyList" :key="index">
            <div>
              <img :src="item.taskImage" alt="">
              <span>{{item.taskName}}</span>
              <span>+{{item.taskBean}}</span>
            </div>
            <div v-if="item.ifFinish" style="width: 102px;text-align: center;">已完成</div>
            <div @click="go2next(item.taskName)" v-if="!item.ifFinish" class="do_task">做任务</div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="task-list1">
        <div class="tit">
          <img src="../../assets/img/u4466.png" alt="">
          <p>日常任务</p>
        </div>
        <div class="lists">
          <div class="list" v-for="(item,index) in transactionList" :key="index">
            <div>
              <img :src="item.taskImage" alt="">
              <span>{{item.taskName}}</span>
              <span>+{{item.taskBean}}</span>
            </div>
            <div v-if="item.ifFinish" style="width: 102px;text-align: center;">已完成</div>
            <div @click="go2next(item.taskName)" v-if="!item.ifFinish" class="do_task">做任务</div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="task-list1">
        <div class="tit">
          <img src="../../assets/img/u4474.png" alt="">
          <p>完善资料</p>
        </div>
        <div class="lists">
          <div class="list" v-for="(item,index) in infoList" :key="index">
            <div class="">
              <img :src="item.taskImage" alt="">
              <span>{{item.taskName}}</span>
              <span>+{{item.taskBean}}</span>
            </div>
            <div v-if="item.ifFinish" style="width: 102px;text-align: center;">已完成</div>
            <div @click="go2next(item.taskName)" v-if="!item.ifFinish" class="do_task">做任务</div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/fetch/api";
import headerComponents from "../../components/headerComponents";
export default {
  data () {
    return {
      totalBeanCount: 200000, //总共任务获取  人为设定
      currentBeanCount: 0, //做任务领取青豆数
      progressWidth: 0,
      myQingdouCount: 0,
      userId: window.localStorage.QingjuuserId,
      QingjuAccount: window.localStorage.QingjuAccount,
      taskList: [],
      dealList: [],
      writeInfo: [],
      taskList: [],    //任务列表
      everyList: [],   //每日任务列表
      transactionList: [], //完成交易列表
      infoList: [],    //资料列表
      perfectImg: [
        '../../assets/img/perfectImg.png',
        ''
      ],
      headImg: '',     //用户头像

    };
  },
  mounted () {
    if (this.userId) {
      this.userId = JSON.parse(window.localStorage.QingjuuserId);
      this.headImg = JSON.parse(window.localStorage.accountInfo).headPortraits
      this.getMyBean();
      this.getBeansComplete();
      this.getTaskCenterList();
    }
    if (this.QingjuAccount) {
      this.QingjuAccount = JSON.parse(window.localStorage.QingjuAccount)
    }

  },
  watch: {

  },
  methods: {
    //获取任务列表
    getTaskCenterList () {
      api.getTaskCenterList(this.userId).then(res => {
        this.taskList = res.dataList
        this.taskList.map(item => {
          if (item.taskType == '每日任务') {
            this.everyList.push(item)
          }
          if (item.taskType == '日常任务') {
            this.transactionList.push(item)
          }
          if (item.taskType == '完善资料') {
            this.infoList.push(item)
          }
        })
      })
    },
    // 今日青豆完成情况
    getBeansComplete () {
      api.getBeansComplete(this.userId).then(res => {
        this.currentBeanCount = res.num;
        this.totalBeanCount = res.totalNum
        this.progressWidth = this.currentBeanCount / this.totalBeanCount * 1200;
      })
    },
    // 我的青豆
    getMyBean () {
      // 参数为userId
      api.getMyBean(this.userId).then(res => {
        this.myQingdouCount = res.dataList[0].myBean;
      });
    },
    //青豆记录
    go2beanRecord () {
      this.$router.push("/myqingju/beanManage");
      window.localStorage.beanManageType = JSON.stringify("first")
    },
    //兑换记录
    go2exchangeRecord () {
      this.$router.push("/myqingju/beanManage");
      window.localStorage.beanManageType = JSON.stringify("second")
    },
    go2next (taskName) {
      if (taskName == '签到') {
        this.$router.push("benefits");
      }
      if (taskName == '推荐注册') {
        this.$router.push("Setting/code");
      }
      if (taskName == '新闻分享成功') {
        this.$router.push("/newsCenter/news");
      }
      if (taskName == '发布项目,完成交易') {
        this.$store.commit('changeReleaseWindow', true)
      }
      if (taskName == '上传头像') {
        this.$router.push("Setting/personInfo");
      }
      if (taskName == '完成个人认证') {
        this.$router.push("/Setting/userAttestation");
      }
      if (taskName == '完成企业认证') {
        this.$router.push("/Setting/userAttestation");
      }
    }
  },
  components: {
    headerComponents
  }
};
</script>


<style lang="less" scoped>
.exchangePaly {
  background-color: #fff;
  height: 100%;
  padding-bottom: 50px;
}
.exchangePaly-main {
  margin-top: 130px;
  > .tit {
    display: flex;
    padding: 20px 0 40px 0;
    font-size: 14px;
    div {
      margin-right: 10px;
    }
    > div {
      &:nth-child(1) {
        border-left: 3px solid green;
      }
    }
  }
}
.exchangePaly-content {
  width: 100%;
  height: 250px;
  > .image {
    height: 250px;
    background: url("../../assets/img/u4502.jpg") no-repeat center/cover;
    > .image-content {
      padding-top: 10px;
      .tit {
        justify-content: flex-end;
        line-height: 16px;
        display: flex;
        font-size: 14px;
        div {
          padding: 0 10px;
          &:nth-child(1),
          &:nth-child(2) {
            cursor: pointer;
          }
          &:nth-child(1) {
            border-right: 1px solid #333333;
          }
        }
      }
      > div {
        &:nth-child(2) {
          text-align: center;
          > div {
            &:nth-child(1) {
              margin-top: 32px;
              margin-bottom: 22px;
              > img {
                height: 80px;
                width: 80px;
              }
            }
            &:nth-child(2) {
              margin-bottom: 22px;
              font-size: 18px;
              color: #ffffff;
              font-weight: 700;
            }
            &:nth-child(3) {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.taskDetail {
  > .tit {
    margin-top: 20px;
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
  }
  > div {
    &:nth-child(2) {
      //  //  存放 进度条的大盒子
      position: relative;
      .tast-Progress {
        margin-top: 65px;
        position: relative;
        width: 1200px;
        height: 7px;
        background-color: rgba(238, 238, 238, 1);
        border-radius: 5px;
        > div {
          &:nth-child(1) {
            position: absolute;
            top: 0;
            left: 0;
            height: 7px;
            width: 20%;
            background-color: rgba(255, 91, 66, 1);
            border-radius: 5px;
          }
        }
      }
      > .task-icon {
        position: absolute;
        top: -40px;
        > .icon-main {
          position: relative;
          > .icon-tuoyuan {
            font-size: 12px;
            color: #ffffff;
            text-align: center;
            line-height: 25px;
            // width: 60px;
            padding: 0 8px;
            height: 25px;
            border-radius: 25px;
            background-color: rgba(255, 91, 66, 1);
          }
          > .sanjiao {
            position: absolute;
            left: 50%;
            top: 18px;
          }
        }
      }
    }
  }
  > .task-list1 {
    margin-top: 56px;
    > .tit {
      display: flex;
      height: 30px;
      > img {
        height: 30px;
        width: 30px;
      }
      p {
        line-height: 30px;
        margin-left: 5px;
      }
    }
    > .lists {
      margin-top: 10px;
      > .list {
        float: left;
        padding: 23px 18px 23px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 366px;
        div {
          &:nth-child(1) {
            img {
              height: 53px;
              width: 53px;
            }
            span {
              &:nth-of-type(1) {
                margin-left: 10px;
              }
              &:nth-of-type(2) {
                margin-left: 15px;
                color: red;
              }
            }
          }
          // &:nth-child(3) {
          //   text-align: right;
          // }
        }
      }
      > .list:hover {
        background-color: #f9f9f9;
      }
    }
  }
  // > .task-list2 {
  //   margin-top: 56px;
  //   > .tit {
  //     display: flex;
  //     height: 30px;
  //     > img {
  //       height: 30px;
  //       width: 30px;
  //     }
  //     p {
  //       line-height: 30px;
  //       margin-left: 5px;
  //     }
  //   }
  //   > .lists {
  //     margin-top: 10px;
  //     > .list {
  //       padding: 23px 53px 23px 20px;
  //       display: flex;
  //       align-items: center;
  //       justify-content: space-between;
  //       width: 380px;
  //       div {
  //         &:nth-child(1) {
  //           img {
  //             height: 53px;
  //             width: 53px;
  //           }
  //           span {
  //             &:nth-of-type(1) {
  //               margin-left: 10px;
  //             }
  //             &:nth-of-type(2) {
  //               margin-left: 15px;
  //               color: red;
  //             }
  //           }
  //         }
  //         &:nth-child(2) {
  //           height: 40px;
  //           width: 100px;
  //           border: 1px solid #cccc;
  //           font-size: 14px;
  //           border-radius: 40px;
  //           text-align: center;
  //           line-height: 40px;
  //         }
  //         &:nth-child(2):hover {
  //           // border: 2px solid rgba(255, 91, 66, 1);
  //           // color: rgba(255, 91, 66, 1);
  //           // height: 38px;
  //           // width: 98px;
  //           // line-height: 38px;
  //           // border-radius: 38px;
  //           // cursor: pointer;
  //         }
  //       }
  //     }
  //     > .list:hover {
  //       background-color: #f9f9f9;
  //     }
  //   }
  // }
  // > .task-list3 {
  //   margin-top: 56px;
  //   > .tit {
  //     display: flex;
  //     height: 30px;
  //     > img {
  //       height: 30px;
  //       width: 30px;
  //     }
  //     p {
  //       line-height: 30px;
  //       margin-left: 5px;
  //     }
  //   }
  //   > .lists {
  //     margin-top: 10px;
  //     > .list:hover {
  //       background-color: #f9f9f9;
  //     }
  //     > .list {
  //       padding: 23px 53px 23px 20px;
  //       display: flex;
  //       align-items: center;
  //       justify-content: space-between;
  //       width: 380px;
  //       div {
  //         &:nth-child(1) {
  //           img {
  //             height: 53px;
  //             width: 53px;
  //           }
  //           span {
  //             &:nth-of-type(1) {
  //               margin-left: 10px;
  //             }
  //             &:nth-of-type(2) {
  //               margin-left: 15px;
  //               color: red;
  //             }
  //           }
  //         }
  //         &:nth-child(3) {
  //           text-align: right;
  //         }
  //       }
  //     }
  //   }
  // }
}
.do_task {
  height: 40px;
  width: 100px;
  border: 1px solid #cccc;
  font-size: 14px;
  border-radius: 40px;
  text-align: center;
  line-height: 40px;
}
.do_task:hover {
  border: 2px solid rgba(255, 91, 66, 1);
  color: rgba(255, 91, 66, 1);
  height: 38px;
  width: 98px;
  line-height: 38px;
  border-radius: 38px;
  cursor: pointer;
}
</style>


