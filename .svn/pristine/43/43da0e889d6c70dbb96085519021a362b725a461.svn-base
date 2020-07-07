<template>
  <div class="code-container">
    <h3 class="code-title">邀请码</h3>
    <div class="code-mine" v-if="$store.state.userInfo.isFriend">
      <p class="title">我的邀请码:<span style="margin-left: 10px;">{{code}}</span></p>
      <p class="link">邀请链接：{{locationUrl}}register/person?code={{code}}</p>
      <span>分享至：</span>
      <div class="share bdsharebuttonbox" data-tag="share_1">
        <!-- <a href="#" class="bds_more" data-cmd="more"></a> -->
        <img :src='wxSrc' ref='wx' class="bds_weixin" data-cmd="weixin" title="分享到微信" alt="">
        <img :src='wbSrc' class="bds_tsina" data-cmd="tsina" @click='getIvCodeAndIvlist' title="分享到新浪微博">
        <!-- <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a> -->
        <!-- <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
        <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
        <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a> -->
      </div>
    </div>
    <div class="invites">
      <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="谁邀请的我" prop="name" class="invites_num">
          <p class="sizes" v-if='!codeNum'>填写对方邀请码后，对方获得相应的青豆。确定后不可修改。</p>
          <el-input v-if='!codeNum' v-model.trim="ruleForm.name" placeholder="请输入邀请码"></el-input>
          <el-button v-if='!codeNum' @click='invitesFn("ruleForm")' class="btn-add">添 加</el-button>
          <span class="xiugai" v-if='!codeNum'>确定并生效后不可修改</span>
          <p class="successInv" v-if='codeNum'>
            <span>{{codeNum}}</span>
            <span>填写对方邀请码后，对方获得相应的青豆</span>
          </p>
        </el-form-item>
      </el-form>
    </div>
    <div class="my_invites">
      <h3>我邀请的谁</h3>
      <ul class="invite-ul" v-if='list'>
        <li class="invite-list" v-for="(item, index) in list" :key="index">
          <img :src="item.headPortraits" :onerror="errIcon" class="icons" alt="">
          <p class="name" :title="item.userName">{{item.userName}}</p>
        </li>
      </ul>
    </div>
    <!-- <p class="invite-title">邀请名单</p> -->
    <!-- <ul class="invite-ul" v-if="list&&list.length">
      <li class="invite-list" v-for="(item, index) in list" :key="index">
        <img :src="item.headPortraits" class="icons" alt="">
        <p class="name">{{item.userName}}</p>
      </li>
    </ul>
    <p v-else class="text">快去邀请你的小伙伴吧</p> -->
  </div>
</template>
<script>
import api from '@/fetch/api'
import wxh from '@/assets/img/wxh.png'
import wxurl from '@/assets/img/wx.png'
import wbh from '@/assets/img/wbh.png'
import wburl from '@/assets/img/wb.png'
export default {
  data() {
    return {
      code: '',
      list: [],
      status: null,
      codeNum: null,
      locationUrl: process.env.siteUrl,
      wxSrc: wxh,
      wbSrc: wbh,
      ruleForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '您输入的邀请码不正确，请重新输入', trigger: 'blur' }]
      },
      errIcon: 'this.src = "' + require('@/assets/img/err-header-icon01.png') + '"'
    }
  },

  mounted() {
    this.getIvCodeAndIvlist()
    if (this.$store.state.userInfo.isFriend) {
      let wx = document.querySelector('.bds_weixin')
      let wb = document.querySelector('.bds_tsina')
      wx.onmouseover = function() {
        this.src = wxurl
        this.style.cursor = 'pointer'
      }
      wx.onmouseout = function() {
        this.src = wxh
      }
      wb.onmouseover = function() {
        this.src = wburl
        this.style.cursor = 'pointer'
      }
      wb.onmouseout = function() {
        this.src = wbh
      }
    }
  },
  methods: {
    //邀请码
    invitesFn(formName) {
      this.$refs[formName].validate(valid => {
        let that = this
        if (valid) {
          if (this.status) {
            api
              .addInvitationCode(this.ruleForm.name)
              .then(res => {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.getIvCodeAndIvlist()
              })
              .catch(err => {
                this.$message({
                  message: err.errorMsg,
                  type: 'error'
                })
              })
          }
        } else {
          return false
        }
      })
    },
    getIvCodeAndIvlist() {
      api.getIvCodeAndIvlist().then(res => {
        this.code = res.invitationCode
        this.list = res.dataList
        this.status = res.status //是否可以填写（谁邀请的我）
        this.codeNum = res.code //邀请码
        // 百度分享
        var _this = this
        window._bd_share_config = {
          common: { bdSnsKey: {}, bdText: `邀请链接：${process.env.siteUrl}register/person?code=` + _this.code, bdMini: '2', bdMiniList: false, bdPic: '', bdStyle: '0', bdSize: '18', bdUrl: process.env.siteUrl + 'register/person?code=' + _this.code },
          image: [
            {
              tag: '../../assets/img/save_icon.png',
              viewType: 'list',
              viewPos: 'top',
              viewColor: 'black',
              viewSize: '18',
              viewList: ['qzone', 'tsina', 'huaban', 'tqq', 'renren']
            }
          ],
          share: {
            tag: 'share_1',
            bdSize: 18
          }
        }
        ;(document.getElementsByTagName('head')[0] || body).appendChild(document.createElement('script')).src = '/static/share.js'
      })
    }
  },
  // 解决分享按钮不显示
  beforeCreate() {
    window._bd_share_main = ''
  }
}
</script>

<style lang="less" scoped>
.code-container {
  margin: 0 20px;
  .code-title {
    line-height: 60px;
    border-bottom: 1px solid #d7d7d7;
    color: #666666;
    font-size: 18px;
    font-weight: normal;
  }
  .code-mine {
    margin-top: 22px;
    padding-left: 22px;
    font-size: 14px;
    padding-bottom: 55px;
    border-bottom: 1px solid #d7d7d7;
    p {
      line-height: 36px;
    }
    .title {
      color: #666;
      font-weight: 700;
      span {
        color: #009966;
      }
    }
    .share {
      position: relative;
      top: -20px;
      left: 70px;
      img:nth-child(2) {
        padding-left: 10px;
      }
    }
  }
  .invite-title {
    font-size: 18px;
    font-weight: 700;
    color: rgb(51, 51, 51);
    background-color: #f2f3f4;
    padding: 10px 0 10px 20px;
  }
  .invite-ul {
    overflow: hidden;
    // .invite-list {
    //   float: left;
    //   text-align: center;
    //   padding: 20px;
    //   font-size: 14px;
    // .icons {
    //   display: inline-block;
    //   background-color: #009966;
    //   width: 50px;
    //   height: 50px;
    //   border-radius: 50%;
    //   margin-bottom: 20px;
    // }
    //}
  }
  // .text {
  //   font-size: 14px;
  //   margin: 10px 20px;
  // }
}
.invites {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 19px;
  border-bottom: 1px solid #d7d7d7;
  .el-input {
    width: 450px;
  }
  .el-button {
    background: #101920;
    color: #fff;
    width: 119px;
    height: 40px;
  }
  .xiugai {
    color: #d5d4d4;
    float: right;
    padding-right: 20px;
  }
}
.successInv {
  display: flex;
  justify-content: space-between;
  > span {
    font-size: 18px;
    &:nth-child(2) {
      font-size: 14px;
      color: #666;
      padding-right: 20px;
    }
  }
}
.my_invites {
  padding-left: 10px;
  padding-bottom: 19px;
  border-bottom: 1px solid #d7d7d7;
  > h3 {
    color: #333;
    padding-top: 19px;
    font-weight: normal;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 19%;
    height: 121px;
    box-sizing: border-box;
    margin-top: 40px;
    img {
      width: 50px;
      height: 50px;
      display: block;
      margin: 0 auto;
      border-radius: 50%;
    }
    p {
      text-align: center;
      padding-top: 20px;
      color: #00b38a;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        cursor: default;
      }
    }
  }
}
.sizes {
  color: #aeaeae;
  font-size: 14px;
}
</style>
<style lang="less">
.invites_num {
  .el-form-item__label::before {
    content: '' !important;
    color: none !important;
    margin: 0px !important;
  }
  .el-form-item__label {
    color: #333;
    padding: 18px 0;
    line-height: 0;
  }
}
.invites {
  .el-input {
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #aeaeae;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #aeaeae;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #aeaeae;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #aeaeae;
    }
  }
}
.btn-add {
  vertical-align: bottom;
}
</style>
