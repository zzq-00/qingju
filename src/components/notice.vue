<template>
  <div class="tableList1">
    <div class="leftBox">
      <ul>
        <li v-for="(item, index) in titleList" :key="index" :class="{'active-item': selectIndex == index}" @click="itemClick(index)">
          <div class="backImg" :class="{'green-color': index==1, 'yellow-color': index == 2}">
            <img src="../assets/img/mes.png" alt="">
          </div>
          <div>
            <div style="margin-bottom: 10px;font-size: 14px;color:#333;">{{item.title}}</div>
            <!-- <div  style="font-size: 14px;color:#666;">未读信息</div> -->
            <div style="font-size: 14px;color:#666;">无未读消息</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="rightBox" v-if="dataList.length">
      <div v-for="(item,index) in dataList" :key='index' class="bigMes">
        <p>
          <span>{{item.createDate}}</span>
        </p>
        <div class="smallMes">
          <h5>关于{{title}}系统通知</h5>
          <div>{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="rightBox paddingBottom" v-else>
      暂无消息
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import api from '../fetch/api'

export default {
  data() {
    return {
      dataList: [], // 显示消息
      projectMessageList: [],
      arr: [],
      selectIndex: 0,
      title: '',
      titleList: [
        {
          title: '系统通知'
        },
        {
          title: '轻松付通知'
        },
        {
          title: '奖励金通知'
        }
      ]
    }
  },
  props: ['receiveData'],
  mounted() {
    this.getNewMsgList() //系统消息
    this.modifyRead()
  },
  methods: {
    itemClick(index) {
      this.selectIndex = index
      this.getNewMsgList()
    },
    getNewMsgList() {
      api.getNewMsgList().then(res => {
        if (res.data) {
          if (this.selectIndex == 0) {
            this.dataList = res.data.projectMessageList
            this.title = '“系统”'
          } else if (this.selectIndex == 1) {
            this.dataList = res.data.quickPayMessageList
            this.title = '“轻松付”'
          } else if (this.selectIndex == 2) {
            this.dataList = res.data.rewardMessageList
            this.title = '“奖励金”'
          }
          this.dataList.map(item => {
            this.arr.push(item.id)
            if (item.isRead) {
              window.localStorage.isRead = '已读'
            } else {
              window.localStorage.isRead = '未读'
            }
          })
        }
      })
    },
    // //将消息转化为已读
    modifyRead() {
      setTimeout(() => {
        api.modifyRead(this.arr).then(res => {
          if (res.errorCode == '200') {
            this.getNewMsgList()
          }
        })
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.tableList1 {
  .leftBox {
    width: 300px;
    background: rgba(223, 227, 230, 1);
    padding: 5px 0 0 0;
    float: left;
    min-height: 750px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    ul {
      li {
        padding: 14.5px 0;
        margin-bottom: 1px;
        background-color: #f5f5f5;
        cursor: pointer;
        .backImg {
          margin-left: 25px;
          width: 51px;
          height: 51px;
          border-radius: 50%;
          background-color: #c1cbd3;
          text-align: center;
          line-height: 51px;
          margin-right: 20px;
          float: left;
          img {
            width: 35px;
            height: 35px;
          }
        }
        .green-color {
          background-color: #c6efce;
        }
        .yellow-color {
          background-color: #ffeb9c;
        }
        p {
          margin-left: 20px;
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          float: left;
          // line-height: 36px;
          div:nth-child(1) {
            margin-bottom: 10px;
          }
          div:nth-child(2) {
            color: #666;
            font-size: 14px;
          }
        }
      }
      li:hover {
        background-color: rgb(226, 239, 218);
      }
    }
  }
  .rightBox {
    float: left;
    width: 820px;
    background-color: #f5f5f5;
    min-height: 700px;
    padding: 0px 40px 50px 40px;
    .bigMes {
      margin-top: 25px;
      p {
        width: 100%;
        text-align: center;
        margin-bottom: 18px;
        span {
          font-weight: 400;
          font-style: normal;
          font-size: 13px;
          color: #333333;
          text-align: center;
          line-height: normal;
          padding: 2px 10px;
          background: #fff;
        }
      }
      .smallMes {
        width: 780px;
        min-height: 134px;
        background: #fff;
        padding: 0 20px;
        h5 {
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          border-bottom: 1px solid #d3d3d3;
          line-height: 36px;
          margin-bottom: 5px;
        }
        div {
          font-weight: 400;
          font-style: normal;
          font-size: 12px;
          color: #666666;
          line-height: 28px;
        }
      }
    }
  }
  .leftBox ul .active-item {
    background-color: rgb(226, 239, 218);
  }
  .paddingBottom {
    padding-top: 50px;
  }
}
</style>

<style>
</style>


