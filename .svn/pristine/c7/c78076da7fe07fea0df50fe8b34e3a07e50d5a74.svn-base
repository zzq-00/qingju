<template>
  <div class="personage">
    <ul class="list-ul">
      <li class="list-li">
        <span class="title">认证类型：</span>
        <span class="title">个人认证</span>
      </li>
      <li class="list-li">
        <span class="title">认证状态：</span>
        <span class="title">{{dataList.statusStr}}</span>
      </li>
      <li class="list-li">
        <span class="title">真实姓名：</span>
        <span class="title">{{dataList.userName}}</span>
      </li>
      <li class="list-li">
        <span class="title">身份证号：</span>
        <span class="title">{{dataList.certificateNumber}}</span>
      </li>
      <li class="list-li">
        <span class="title">联系方式：</span>
        <span class="title">{{dataList.telephone}}</span>
      </li>
      <li class="list-li">
        <span class="title">证件照片：</span>
        <img :src="dataList.legalFileFrontUrl" alt="" title="身份证件正面照">
        <img :src="dataList.legalFileVersoUrl" alt="" title="身份证件反面照">
      </li>
    </ul>
    <!-- <div class="list-tips" v-if='dataList.statusStr == "审核通过" && userCategory!="企业下用户"'>
      <h5>温馨提示：</h5>
      <p>完成
        <span @click='enterpriseFn'>企业实名认证，</span>可以免费升级为企业账号，
        <em>该功能可有效的帮助您集中管理各部门、各员工的账户。</em>
      </p>
      <p>您还可以创建多个账户，并可以对企业内账户进行开启/禁用、更改其他账户信息、设置用户权限、设置组织架构操作。</p>
    </div> -->
  </div>
</template>
<script>
import Bus from "@/assets/js/bus.js";
import api from "@/fetch/api";
export default {
  props: {
    dataList: {}
  },
  data() {
    return {
      userCategory:null
    };
  },
  created() {
    api.getUserInfo().then(res => {
      this.userCategory = res.dataList[0].userCategory;
    });
  },
  methods: {
    enterpriseFn() {
      let data = {
        select: 1,
        realNameStatus: 0,
        type: "企业认证"
      };
      Bus.$emit("enterpriseName", data);
    }
  }
};
</script>

<style lang="less" scoped>
.personage {
  overflow-y: hidden;
}
.list-ul {
  margin-left: 59px;
  // margin-top: 50px;
  .list-li {
    font-size: 14px;
    line-height: 80px;
    .title {
      display: inline-block;
      &:nth-child(1) {
        width: 100px;
        text-align: center;
      }
      &:nth-child(2) {
        color: #333;
        font-weight: 500;
        display: inline-block;
      }
    }
    img {
      width: 150px;
      height: 120px;
    }
    img + img {
      margin-left: 10px;
    }
  }
}
.list-tips {
  background-color: rgba(255, 251, 248, 1);
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(255, 221, 186, 1);
  margin-left: 39px;
  padding-left: 20px;
  margin-top: 40px;
  > h5 {
    color: #666666;
    padding: 10px 0;
  }
  > p {
    color: #666666;
    font-size: 14px;
    padding: 8px 0;
    > span {
      text-decoration: underline;
      color: #0099cc;
      &:hover {
        cursor: pointer;
      }
    }
    > em {
      color: #e4393c;
    }
  }
}
@media screen and (min-width: 1200px) {
  .list-tips {
    width: 750px !important;
    height: 150px;
  }
}
@media screen and (min-width: 1500px) {
  .list-tips {
    width: 848px !important;
    height: 125px;
  }
}
</style>
