<template>
  <div class="Pro-address">
    <div class="title1">
      <p>收货地址</p>
    </div>
    <div class="arrangement">
      <div class="box" @click="addAddress">
        <div>
          <i class="add-icons">+</i>
          <p class="add-title">添加收货地址</p>
        </div>
      </div>
      <div class="list" v-for="(item, index) in listAddress" :key="index">
        <div class="icon" v-if="item.isDefault === '1'">
          <span class="title">默认</span>
        </div>
        <div class="title">
          <p>{{item.name}}</p>
        </div>
        <div class="list-content">
          <p>电话：{{item.phone}}</p>
          <p>地区：{{item.chineseAddress}}</p>
          <P>地址：{{item.detailAddress}}</P>
        </div>

        <div class="footer">
          <span v-if="!(item.isDefault === '1')" @click="setDefalutClick(item.id)">设为默认地址</span>
          <span @click="deleteClick(item.id, index)">删除</span>
          <span @click="editClick(item, index)">修改</span>
        </div>
      </div>
    </div>
    <div class="pro-mask">
      <el-dialog title="收货地址" :visible.sync="centerDialogVisible">
        <div class="dialog-list">
          <span>*</span>
          <span>姓名</span>
          <el-input class="inp" v-model="input1" placeholder="请输入联系人姓名"></el-input>
          <p class="text-tip">{{text.tipName}}</p>
        </div>
        <div class="dialog-list">
          <span>*</span>
          <span>电话</span>
          <el-input class="inp" v-model="input2" placeholder="请输入联系人电话" @blur="validPhone"></el-input>
          <p class="text-tip">{{text.tipPhone}}</p>
        </div>
        <div class="dialog-list">
          <span>*</span>
          <span>收货地址</span>
          <!-- <el-input class="inp" v-model="input3" placeholder="请输入收货人地址"></el-input>
                <p class="text-tip">{{text.tipAddress}}</p> -->
          <el-select v-model="provinceSel" class="select-qj" style="width:160px">
            <el-option v-for="(item,index) in provinceList" :key="index" :value="item.code" :label="item.name"></el-option>
          </el-select>
          <el-select v-model="citySel" class="select-qj" style="width:160px">
            <el-option v-for="(item,index) in cityList" :key="index" :value="item.code" :label="item.name"></el-option>
          </el-select>
          <el-select v-model="districtSel" class="select-qj" style="width:160px">
            <el-option v-for="(item,index) in districtList" :key="index" :value="item.code" :label="item.name"></el-option>
          </el-select>
        </div>
        <div class="dialog-list">
          <span style="float:left">*</span>
          <span style="float:left;margin-left:5px;">详细地址</span>
          <textarea type="textarea" style="width:489px;" v-model="homeAddress" clearable :maxlength='60' placeholder="请输入详细地址，字数勿超过60" class="text_area"></textarea>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" @click="submitClick">确 定</el-button>
          <el-button style="margin-left:30px;" @click="cancelClick">取 消</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>
<script>
import api from "@/fetch/api";
export default {
  data() {
    return {
      provinceList: [],
      provinceSel: "",
      cityList: [],
      citySel: "",
      districtList: [],
      districtSel: "",
      homeAddress: "", // 详细地址
      input1: "",
      input2: "",
      input3: "",
      centerDialogVisible: false,
      text: {
        tipName: "",
        tipPhone: "",
        tipAddress: ""
      },
      listAddress: "",
      index: 0
    };
  },
  methods: {
    cancelClick() {
      this.centerDialogVisible = false;
      /*   this.provinceSel = ''
        this.citySel = ''
        this.districtSel = '' */
    },
    addAddress() {
      this.centerDialogVisible = true;
      this.input1 = "";
      this.input2 = "";
      this.provinceSel = "";
      this.citySel = "";
      this.districtSel = "";
      this.homeAddress = "";
      this.index = -1;
    },
    editClick(item, index) {
      this.centerDialogVisible = true;
      this.input1 = item.name;
      this.input2 = item.phone;
      this.provinceSel = item.address.province;
      this.citySel = item.address.city;
      this.districtSel = item.address.district;
      this.homeAddress = item.detailAddress;
      this.index = index;
    },
    deleteClick(id, index) {
      api.deleteReceiptInfo(id).then(res => {
        this.$message({ type: "success", message: "删除地址成功" });
        // 删除后，默认地址为第一项
        if (this.listAddress.length > 1) {
          if (index === 0) {
            this.setDefalutClick(this.listAddress[1].id);
          }
        }
        this.getReceiptList();
      });
    },
    setDefalutClick(id) {
      api.setDefaultReceiptInfo(id).then(res => {
        this.getReceiptList();
      });
    },
    submitClick() {
      if (!this.input1) {
        this.text.tipName = "请填写收货人姓名";
      } else if (!this.input1) {
        this.text.tipName = "";
        this.text.tipPhone = "请填写收货人电话";
      } else if (!this.homeAddress) {
        this.text.tipName = "";
        this.text.tipPhone = "";
        this.text.tipAddress = "请填写收货地址";
      } else {
        this.text.tipName = "";
        this.text.tipPhone = "";
        this.text.tipAddress = "";
        let data = {
          name: this.input1,
          phone: this.input2,
          province: this.provinceSel,
          city: this.citySel,
          district: this.districtSel,
          detailAddress: this.homeAddress,
          userId: JSON.parse(localStorage.QingjuuserId)
        };
        if (Number(this.index) >= 0) {
          data.id = this.listAddress[this.index].id;
        } else {
          data.id = "";
        }
        api.saveReceiptInfo(data).then(res => {
          this.$message({ type: "success", message: "修改地址成功" });
          this.centerDialogVisible = false;
          this.getReceiptList();
        });
      }
    },
    // 总的收货地址
    getReceiptList() {
      api.getReceiptList().then(res => {
        this.listAddress = res.dataList;
        this.listAddress.map(item => {
          if (item.detailAddress.length > 60) {
            item.detailAddress = item.detailAddress.substring(0, 48) + "...";
          }
        });
      });
    },
    validPhone() {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(this.input2)) {
        this.text.tipPhone = "请填写正确的手机号";
      } else {
        this.text.tipPhone = "";
      }
    },
    // 获取省份
    province() {
      api.province().then(res => {
        this.provinceList = res.dataList;
        this.provinceSel = res.dataList[0].code;
      });
    },
    // 获取城市
    city() {
      api.city(this.provinceSel).then(res => {
        this.cityList = res.dataList;
        this.citySel = res.dataList[0].code;
      });
    },
    // 获取区县
    district() {
      api.district(this.citySel).then(res => {
        this.districtList = res.dataList;
        this.districtSel = res.dataList[0].code;
      });
    }
  },
  mounted() {
    this.getReceiptList();
    this.province();
  },
  watch: {
    provinceSel: function(newVal, oldVal) {
      if (newVal != "") {
        this.city();
      }
    },
    citySel: function(newVal, oldVal) {
      if (newVal != "") {
        this.district();
      }
    }
  }
};
</script>

<style lang='less' scoped>
.text-tip {
  color: #f00;
  font-size: 12px;
  margin-left: 115px;
}
.Pro-address {
  height: 100%;
  overflow: hidden;
  padding: 0 20px;
  .title1 {
    border-bottom: 1px solid #d7d7d7;
    line-height: 60px;
    overflow: hidden;
    > p {
      color: #666666;
      font-size: 18px;
      // font-weight: 700;
      float: left;
    }
  }
  .arrangement{
    display: flex;
    flex-wrap: wrap;
  }
  .box {
    margin-top: 16px;
    margin-right: 20px;
    width: 30%;
    height: 230px;
    border: 1px solid #cccccc;
    text-align: center;
    cursor: pointer;
    .add-title {
      margin-top: 50px;
    }
    .add-icons {
      display: inline-block;
      width: 40px;
      height: 40px;
      font-size: 24px;
      line-height: 40px;
      color: #ccc;
      border: 2px solid #ccc;
      border-radius: 50%;
      margin-top: 75px;
    }
  }
  .list {
    margin:16px 20px 0 0;
    width: 30%;
    height: 232px;
    padding: 20px 30px 0 30px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    position: relative;
    .icon {
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      .title {
        color: #fff;
        font-size: 14px;
        position: absolute;
        top: 15px;
        left: 20px;
        transform: rotate(45deg);
        letter-spacing: 5px;
      }
      &:before {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border: 30px solid transparent;
        border-top: 30px solid #00b133;
        border-right: 30px solid #00b133;
      }
    }
    //  flex: 1;
    .title {
      color: #333333;
      font-weight: 700;
      font-size: 14px;
    }
    .list-content {
      margin-top: 15px;
      p {
        font-size: 14px;
        line-height: 24px;
      }
      p:nth-child(4) {
        color: #ff9966;
        font-weight: 700;
      }
    }
    .footer {
      display: none;
    }
    &:hover {
      .footer {
        display: block;
        margin-top: 50px;
        color: #2fc182;
        font-size: 14px;
        position: absolute;
        bottom: 20px;
        span {
          float: right;
          font-size: 14px;
          margin-right: 10px;
        }
        span:nth-child(1) {
          float: left;
          font-size: 14px;
          margin-right: 10px;
        }
        span:hover {
          cursor: pointer;
        }
      }
    }
  }
  .dialog-list {
    margin-bottom: 15px;
    span:nth-child(1) {
      color: red;
    }
    span:nth-child(2) {
      width: 100px;
      display: inline-block;
    }
    .inp {
      width: 360px;
    }
    .text_area {
      -webkit-appearance: none;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #d8dce5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #5a5e66;
      display: inline-block;
      font-size: inherit;
      line-height: 1;
      outline: 0;
      padding: 10px 15px;
      -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 489px;
      height: 80px;
      font-weight: 400;
      margin-left: 3px;
    }
    textarea::-webkit-input-placeholder {
      color: #aab2bd;
      font-size: 14px;
      font-weight: 400;
    }
    textarea:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #aab2bd;
      font-size: 14px;
      font-weight: 400;
    }
    textarea::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #aab2bd;
      font-size: 14px;
      font-weight: 400;
    }
    textarea:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #aab2bd;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
@media screen and (min-width: 600px) and (max-width: 1250px) {
  .select-qj {
    width: 150px;
  }
  // .list:nth-child(2n + 1) {
  //   margin-left: 20px;
  // }
}
@media screen and (min-width: 1500px) {
  .select-qj {
    width: 100%;
  }
  // .list {
  //   margin-left: 20px;
  // }
  // .list:nth-child(5) {
  //   margin-left: 0;
  // }
  // .list:nth-child(3n-1) {
  //   margin-left: 0;
  // }
}
</style>
<style lang='less'>
.el-dialog__footer {
  text-align: center;
}
.Pro-address{
  .el-dialog{
    width:800px;// !important
  }
}
</style>


