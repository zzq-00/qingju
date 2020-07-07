<template>
  <div class="footer">
    <div>
      <div class="container clearfix">
        <div class="rows clearfix fl">
          <dl class="fl" v-for="(item,index) in navs" :key="index">
            <dt>{{item.title}}</dt>
            <dd v-for="(i,index) in item.content" :key="index">
              <a :href="i.url" v-if="i.externalLinks" target="_blank">{{i.name}}</a>
              <router-link :to="i.url" v-else>{{i.name}}</router-link>
            </dd>
          </dl>
        </div>
        <div class="info fr">
          <img :src="require('@/assets/logo.png')" alt="logo" width="112px" height="44px">
          <p>
            <i class="el-icon-location-outline"></i>
            <span>北京市海淀区车公庄西路19号外文文化创意园12A</span>
            <br>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>江苏省苏州市西环路2718号海弘商务大厦507室</span>
          </p>
          <p>
            <i class="el-icon-service"></i>
            <span>400-697-5677</span>
          </p>
        </div>
      </div>
    </div>

    <div>
      <div class="container">
        <div class="firends">
          <a target="_blank" href="http://www.jc.net.cn/">中国建材在线</a>
          <a target="_blank" href="http://www.zjlcost.com/">中国造价信息化联盟</a>
          <a target="_blank" href="http://www.cecn.gov.cn/">中国建设工程造价信息网</a>
          <a target="_blank" href="https://www.icostcloud.com/">咨询企业云平台</a>
          <a target="_blank" href="http://www.tzecc.com/">天职咨询</a>
          <!--<a target="_blank" href="http://www.qianghuoba.com/">抢活吧</a>-->
        </div>
        <p>Copyright(©)2017上海青矩互联网科技有限公司 版权所有
          <a target="_blank" href="http://www.beian.miit.gov.cn/">沪ICP备16015426号-1</a>
        </p>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  data () {
    return {
      navs: [
        {
          title: "关于青矩",
          content: [
            { name: "用户认证", url: "/Setting/userAttestation", externalLinks: false },
            { name: "收费标准", url: "/info/feeScale#first", externalLinks: true }
          ]
        },
        {
          title: "服务保障",
          content: [
            { name: "法律声明", url: "/info/Law", externalLinks: true },
            { name: "用户协议", url: "/info/Agreement", externalLinks: true },
            { name: "用户须知", url: "/info/Clause", externalLinks: true }
          ]
        },
        {
          title: "帮助中心",
          content: [
            { name: "新手教程", url: "/info/New", externalLinks: true },
            { name: "常见问题", url: "/problems/common", externalLinks: true },
            { name: "联系我们", url: "/info/Contact", externalLinks: true },
            { name: "工作机会", url: "/info/JobOpportunities", externalLinks: true },
          ]
        },
        {
          title: "社交网络",
          content: [
            { name: "微博", url: "https://weibo.com/p/1006065948273663", externalLinks: true },
            { name: "青矩头条号", url: "https://www.toutiao.com/c/user/59054668202/#mid=1574673197191182", externalLinks: true },
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang='less' scoped>
a {
  color: #656565;
  &:hover {
    color: #009769;
    text-decoration: underline;
  }
}
.footer {
  border-top: 1px solid #f1f1f1;
  > div {
    &:first-child {
      padding: 40px 0;
      background-color: #fff;
      .rows {
        > dl {
          margin-right: 85px;
          > dt {
            font-size: 14px;
            margin-bottom: 18px;
          }
          > dd {
            font-size: 12px;
            line-height: 28px;
          }
        }
      }
      .info {
        width: 400px;
        > p {
          font-size: 12px;
          line-height: 20px;
          margin-top: 8px;
        }
      }
    }
    &:last-child {
      font-size: 12px;
      color: #656565;
      background-color: #fff;
      text-align: center;
      border-top: 1px dashed #f1f1f1;
      padding: 20px 0 40px;
      .firends {
        margin-bottom: 15px;
        > a {
          font-size: 12px;
          &:not(:first-child) {
            border-left: 1px solid #626262;
            padding: 0 15px;
          }
          &:first-child {
            padding-right: 15px;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
