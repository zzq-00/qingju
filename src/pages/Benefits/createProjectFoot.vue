<template>
  <div class="footer">
    <div class="container">
      <div>
        <div class="rows">
          <dl v-for="(item,index) in navs" :key="index">
            <dt>{{item.title}}</dt>
            <dd v-for="(i,index) in item.content" :key="index">
              <router-link :to="i.url" v-if="i.new">{{i.name}}</router-link>
              <a :href="i.url" v-else>{{i.name}}</a>
            </dd>
          </dl>
        </div>
        <!-- <div class="firends">
          <a  target="_blank"  href="http://www.jc.net.cn/">中国建材在线</a>
          <a  target="_blank" href="http://www.zjlcost.com/">中国造价信息化联盟</a>
          <a  target="_blank" href="http://www.cecn.gov.cn/">中国建设工程造价信息网</a>
          <a  target="_blank" href="http://www.qianghuoba.com/">抢活吧</a>
        </div> -->
      </div>
      <div>
        <p>公司地址：北京市海淀区车公庄西路19号外文文化创意园12A 江苏省苏州市西环路2718号海弘商务大厦507室</p>
        <p>Copyright(©)2017上海青矩互联网科技有限公司 版权所有
          <a target="_blank" href="http://www.beian.miit.gov.cn/">沪ICP备16015426号-1</a>
        </p>
        <p>联系电话：400-697-5677</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          title: "产品中心",
          content: [
            { name: "青矩计量", url: "/businessService/estimate", new: true },
            {
              name: "BIM建模",
              url: "https://www.qingju.cn/info/Contents/Item/Display/538"
            }
          ]
        },
        {
          title: "合作服务",
          content: [
            // { name: "服务商合作", url: "/collaborationService/facilitator", new: true },
            {
              name: "服务商合作",
              url: "/collaborationService/facilitator",
              new: true
            },
            {
              name: "企业战略合作",
              url: "https://www.qingju.cn/info/Cooperation/Company"
            },
            { name: "商务合作（待开通）", url: "javascript:;" }
          ]
        },
        {
          title: "帮助中心",
          content: [
            { name: "新手上路", url: "https://www.qingju.cn/info/About/New" },
            {
              name: "联系方式",
              url: "https://www.qingju.cn/info/About/Contact"
            },
            { name: "常见问题", url: "https://www.qingju.cn/info/questions" },
            { name: "用户认证", url: "javascript:;" },
            { name: "工作机会", url: "https://www.qingju.cn/info/Job/Joinus" }
          ]
        },
        {
          title: "服务保障",
          content: [
            {
              name: "用户须知",
              url: "https://www.qingju.cn/info/About/Clause"
            },
            {
              name: "用户协议",
              url: "https://www.qingju.cn/info/About/Agreement"
            },
            { name: "法律声明", url: "https://www.qingju.cn/info/About/Law" }
          ]
        },

        {
          title: "关于青矩",
          content: [
            {
              name: "平台介绍",
              url: "https://www.qingju.cn/info/About/Introduced"
            },
            {
              name: "标准化",
              url: "https://www.qingju.cn/info/About/Standard"
            },
            { name: "交易流程", url: "https://www.qingju.cn/info/About/Trade" },
            {
              name: "收费标准",
              url: "https://www.qingju.cn/info/About/BiaoZhun"
            },
            { name: "福利专区", url: "javascript:;" }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.footer {
  height: 466px;
  box-sizing: border-box;
  padding: 50px 0;
  border-top: 1px solid #d7d7d7;
  .container {
    > div {
      &:first-child {
        padding: 0 50px;
        border-bottom: 1px solid #d7d7d7;
        .rows {
          display: flex;
          justify-content: space-between;
          > dl {
            > dt {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 25px;
            }
            > dd {
              font-size: 12px;
              line-height: 28px;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
        .firends {
          padding: 25px 0;
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
      &:last-child {
        text-align: center;
        font-size: 14px;
        margin-top: 20px;
        > p {
          line-height: 36px;
        }
      }
    }
  }
}
</style>
