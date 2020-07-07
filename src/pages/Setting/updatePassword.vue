<template>
  <div class="Pro_content">
    <div class="title">
      <p>修改支付密码</p>
    </div>
    <div class="authentication_message">
      <p class="tips">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全</p>
      <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="当前密码" prop="beforPassword">
          <el-input v-if="!eyeWatch[0]" class="list" type="password" placeholder="请输入当前密码" v-model.number="ruleForm.beforPassword" @focus="focusClick"></el-input>
          <el-input v-if="eyeWatch[0]" class="list" type="text" placeholder="请输入当前密码" v-model.number="ruleForm.beforPassword" @focus="focusClick"></el-input>
          <!-- 眼睛 -->
          <span class="eye el-icon-view" v-bind:class="{'closeEye':eyeWatch[0]}" @click="eyeClick(0)"></span>
        </el-form-item>
        <el-form-item label="新 密 码" prop="newPassword">
          <el-input v-if="!eyeWatch[1]" class="list" type="password" placeholder="请输入新密码" v-model.number="ruleForm.newPassword" @focus="focusClick"></el-input>
          <el-input v-if="eyeWatch[1]" class="list" type="text" placeholder="请输入新密码" v-model.number="ruleForm.newPassword" @focus="focusClick"></el-input>
          <!-- 眼睛 -->
          <span class="eye el-icon-view" v-bind:class="{'closeEye':eyeWatch[1]}" @click="eyeClick(1)"></span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitClick('ruleForm')">确 认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import api from "@/fetch/api";
export default {
  data() {
    return {
      input: "",
      showhistoryListFlag: false,
      beforPassword: "",
      newPassword: "",
      passWord: "",
      text: ["1", "2", "3"],
      vaildSuccess: true, // 验证是否还有误
      textShow: [false, false, false], // 是否展示错误提示
      eyeWatch: [false, false, false], // 是否显示眼睛
      ruleForm: {
        beforPassword: "",
        newPassword: ""
      },
      rules: {
        beforPassword: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          {
            pattern: /^[0-9]{6}$/,
            message: "请输入6位数字"
          }
        ],
        newPassword: [
          { required: true, message: "请输入您的新密码", trigger: "blur" },
          {
            pattern: /^[0-9]{6}$/,
            message: "请输入6位数字"
          }
        ]
      }
    };
  },
  mounted() {
    // this. clickimg(1);
  },
  methods: {
    showhistoryList() {
      this.showhistoryListFlag = true;
    },
    // 当鼠标进入任一输入框就变为密码
    focusClick() {
      this.$set(this.eyeWatch, [false, false, false]);
      this.eyeWatch = [false, false, false];
    },
    vailOld() {
      if (this.wordRules(this.ruleForm.beforPassword, 0)) {
        return true;
      }
    },
    // 点击眼
    eyeClick(n) {
      this.$set(this.eyeWatch, n, !this.eyeWatch[n]);
    },
    // 提交数据
    submitClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            newPassword: this.ruleForm.newPassword,
            password: this.ruleForm.beforPassword
          };
          api
            .updatePayPassword(data)
            .then(() => {
              this.$message({ type: "success", message: "密码修改成功" });
              this.$router.push("/Setting/accountsecurity");
            })
            .catch(err => {
              this.$message.error(err.errorMsg);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.Pro_content {
  padding: 0 20px;
  .title {
    border-bottom: 1px solid #d7d7d7;
    overflow: hidden;
    height: 60px;
    line-height: 60px;
    p {
      color: #666666;
      font-size: 18px;
      font-weight: normal;
    }
    > div {
      float: right;
      > span {
        font-weight: 400;
        font-size: 14px;
        color: #aeaeae;
      }
      > img {
        height: 12px;
        width: 12px;
      }
      > img:hover {
        cursor: pointer;
      }
      > span:hover {
        cursor: pointer;
      }
    }
  }
  .authentication_message {
    padding: 0 20px;
    padding-bottom: 50px;
    border-bottom: 1px solid #d7d7d7;
  }
  .input-lists {
    margin-top: 48px;
    margin-left: 10px;
    .lists {
      margin-top: 30px;
      span:nth-child(1) {
        color: red;
      }
      span:nth-child(2) {
        font-size: 14px;
        color: #666666;
        font-weight: 700;
      }
      .list {
        width: 396px;
        height: 40px;
        margin-left: 60px;
      }
    }
  }
  .tips {
    padding: 20px 0 20px;
    color: #d5d4d4;
  }
  .but-list {
    margin-top: 35px;
    margin-left: 15px;
  }
  .history_but {
    // margin-top: 9px;
    // margin-right: 32px;
    // float: right;
    margin-left: 20px;
    font-size: 14px;
    color: #666666;
    font-weight: 700;
  }
  .history-lists {
    margin-top: 40px;
    .history-title {
      border-bottom: 2px solid #bcbcbc;
      p {
        font-size: 14px;
        color: #666666;
        font-weight: 700;
        margin-bottom: 10px;
      }
    }

    .tableList {
      margin-top: 10px;
    }
  }
}
.tip {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  border: 1px solid #009966;
  color: #666666;
  font-size: 13px;
  position: relative;
  padding-left: 10px;
  padding-right: 20px;
  margin-left: 30px;
  &::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #009966;
    position: absolute;
    top: 10px;
    left: -5px;
  }
  &::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #fff;
    position: absolute;
    top: 10px;
    left: -4px;
  }
}
/* 眼睛 */
.eye {
  position: relative;
  right: 40px;
  cursor: pointer;
}
.closeEye {
  color: #aeaeae;
}
.submit-btn {
  background-color: #009966;
  color: white;
  width: 108px;
  border: 1px solid #009966;
}
.failed-btn {
  background-color: #fff;
  color: #aeaeae;
}
</style>

<style lang="less">
.el-tabs__header {
  margin: 0 0 0;
}
.el-tabs__item {
  font-size: 18px;
  line-height: 18px;
}
.el-tabs__item:hover {
  color: #009966;
  cursor: pointer;
}
.el-tabs__item.is-active {
  color: #333333;
  font-weight: 700;
}
.demo-ruleForm {
  .el-input {
    width: 450px;
  }
  .el-button {
    width: 450px;
    height: 40px;
    color: #fff;
    background: #03b189;
    margin-top: 35px;
    font-size: 14px;
  }
  .el-form-item__label::before {
    content: "" !important;
    margin-right: 0px !important;
  }
}
</style>


