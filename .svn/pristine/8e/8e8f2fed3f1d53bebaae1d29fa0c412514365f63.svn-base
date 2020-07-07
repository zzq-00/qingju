<template>
  <div class="Pro-header">
    <div class="container clearfix">
      <div class="logo fl">
        <img src="../assets/img/myPro-logo.png" alt="" @click="go2home">
      </div>
      <div class="leftList fl">
        <span class="spanlist" v-for="(item,index) in lists" :key="index" @click="go2listcontent(item.url,item.index)">{{item.name}}</span>
      </div>
      <div class="right-icon fr clearfix">
        <div class="setting-icon fl" @click="go2setting"></div>
        <div class="info-icon fl" @click="go2info">
          <div v-if="isRead"></div>
        </div>
        <div class="person-icon fl" @mouseenter="showFloatWindow = true">
          <img :src="$store.state.userInfo.headPortraits" alt="" width="60px" height="60px">
        </div>
        <div v-show="showFloatWindow" @mouseleave="showFloatWindow = false">
          <personalWindow class="float-window" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import personalWindow from "@/components/personalWindow";
import api from "../fetch/api";
export default {
  components: {
    personalWindow
  },
  data () {
    return {
      showFloatWindow: false,
      mesDataList: [],   //系统消息
      lists: [
        {
          index: 0,
          name: "我的青矩",
          url: "/myqingju/project"
        },
        // {
        //   index: 1,
        //   name: "我的学院",
        //   url: "/myqingju"
        // }
      ],
      isRead: false,   //是否有未读取信息
    };
  },
  watch: {
    $route: "fetchDate",
  },
  mounted () {
    let spanArr = document.getElementsByClassName("spanlist");
    for (var i = 0; i < spanArr.length; i++) {
      spanArr[i].style.backgroundColor = "#333333";
    }
    spanArr[0].style.backgroundColor = "#505050";
    if (window.localStorage.isRead == '已读') {
      this.isRead = false
    } else {
      this.isRead = true
    }
    this.getMsgList()
  },
  methods: {
    getMsgList () {
      api.getMsgList().then(res => {
        let mesDataList = res.dataList
        mesDataList.map(item => {
          if (item.isRead) {
            window.localStorage.isRead = '已读'
          } else {
            window.localStorage.isRead = '未读'
          }
        })
      })
    },
    fetchDate (data) {
      this.path = data.path;
      if (this.path) {
        this.$emit("send2parentPath", this.path);
      }
    },
    go2home () {
      this.$router.push("/");
    },
    go2listcontent (url, index) {
      let spanArr = document.getElementsByClassName("spanlist");
      for (var i = 0; i < spanArr.length; i++) {
        spanArr[i].style.backgroundColor = "#333333";
      }
      spanArr[index].style.backgroundColor = "#505050";
      this.$router.push(url);
    },
    go2setting () {
      this.$router.push("/Setting/personInfo");
    },
    go2info () {
      window.localStorage.isRead = '已读'
      this.isRead = false
      this.$router.push('/information');
    },
  }
};
</script>

<style lang='less' scoped>
.Pro-header {
  width: 100%;
  height: 80px;
  background-color: #333333;
  .container {
    width: 100%;
    padding: 0 35px;
    box-sizing: border-box;
  }
  .logo {
    padding-top: 15px;
  }
  .logo:hover {
    cursor: pointer;
  }

  .logo img {
    width: 118px;
    height: 50px;
    margin: 0 auto;
  }
  .leftList {
    margin-left: 60px;
    font-size: 18px;
  }
  .leftList span {
    display: inline-block;
    width: 130px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: white;
  }
  .leftList span:hover {
    color: rgb(0, 204, 153);
    cursor: pointer;
  }
  .right-icon {
    position: relative;
    .setting-icon {
      width: 26px;
      height: 80px;
      background: url("../assets/img/setting-icon1.png") no-repeat;
      background-size: 26px, 26px;
      background-position-y: center;
      margin-right: 35px;
    }
    .setting-icon:hover {
      width: 26px;
      height: 80px;
      background-image: url("../assets/img/setting-icon.png");
      background-size: 26px, 26px;
      cursor: pointer;
    }
    .info-icon {
      width: 26px;
      height: 80px;
      background: url("../assets/img/info-icon.png") no-repeat;
      background-size: 26px, 26px;
      background-position-y: center;
      margin-right: 35px;
      position: relative;
      div {
        width: 10px;
        height: 10px;
        background: red;
        position: absolute;
        top: 25px;
        left: 20px;
      }
    }
    .info-icon:hover {
      width: 26px;
      height: 80px;
      background-image: url("../assets/img/info-icon1.png");
      background-size: 26px, 26px;
      cursor: pointer;
    }
    .person-icon {
      width: 60px;
      height: 80px;
      line-height: 80px;
      position: relative;
      cursor: pointer;
      > img {
        border-radius: 50%;
      }
    }
  }
}
.float-window {
  position: absolute;
  top: 80px;
  right: -10px;
  z-index: 1;
}
</style>
