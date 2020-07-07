<template>
  <div class="goodsInfo">
    <div class="tit1">订单详情</div>
    <steps :stepActive="stepActive"></steps>
    <div class="info">
      <div class="telInfo">
        <div>
          <div>
            <span style="color:red;margin-right:15px;">*</span>
            <span>手机号码：</span>
          </div>
          <div>
            <span>{{sendData.phone}}</span>
          </div>
        </div>
        <div>
          <div style="margin-right:30px">
            <span style="color:red;margin-right:15px;">*</span>
            <span>短信验证码：</span>
          </div>
          <div><input type="tel" v-model="sendData.verityCode"></div>
          <div>
            <el-button size='medium ' type="success" :disabled="disabled" style="background-color:green;" @click.native="sendCode">
              <span v-if="!disabled">发送短信验证码</span>
              <span v-else>{{secondCount}}s后重新发送...</span>
            </el-button>
          </div>
          <!-- <div>
            <span>{{secondCount}}</span>
            <span>s</span>
          </div> -->
        </div>
        <div>
          <p> 注：确保你的手机开机，能够正常接收短信</p>
        </div>
      </div>
      <div class="adressInfo">
        <div class="tit">
          <div>邮寄地址</div>
          <div @click="addNewadress">添加收货地址</div>
        </div>
        <div class="addressList">
          <div :style="{height: activeHight + 'px' }">
            <div v-for="(item,index) in addressList" style="display:flex;">
              <div>
                <el-radio @change='setDefaultAddress(item.id)' v-model="radio" :label="index+1">姓名&nbsp;&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;&nbsp;电话&nbsp;&nbsp;&nbsp;{{item.phone}}&nbsp;&nbsp;&nbsp;{{item.chineseAddress}}&nbsp;&nbsp;{{item.detailAddress}}</el-radio>
              </div>
              <p v-if="item.isDefault==='1'">默认地址</p>
            </div>
          </div>
          <div>
            <span @click="getmoreAddress">更多地址</span><img @click="getmoreAddress" src="../../assets/img/u4672.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="submit">
      <span>确认下单后不能修改订单</span>
      <p @click="goodsinfoSubmit">确认支付</p>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="800px">
      <div class="dialog-list">
        <span>*</span>
        <span>姓名</span>
        <el-input class="inp" v-model="form.name" placeholder="请输入联系人姓名"></el-input>
      </div>
      <div class="dialog-list">
        <span>*</span>
        <span>电话</span>
        <el-input class="inp" v-model="form.telephone" placeholder="请输入联系人电话"></el-input>
      </div>
      <div class="dialog-list">
        <span>*</span>
        <span>收货地址</span>
        <el-select v-model="provinceSel" style="width:160px">
          <el-option v-for="(item,index) in provinceList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select v-model="citySel" style="width:160px">
          <el-option v-for="(item,index) in cityList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
        <el-select v-model="districtSel" style="width:160px">
          <el-option v-for="(item,index) in districtList" :key="index" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </div>
      <div class="dialog-list">
        <span style="float:left">*</span>
        <span style="float:left;margin-left:5px;">详细地址</span>
        <textarea type="textarea" style="width:489px;" v-model="form.address" clearable :maxlength='60' placeholder="请输入详细地址，字数勿超过60" class="text_area"></textarea>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="addReceiveAddress">确 定</el-button>
        <el-button style="margin-left:30px;" @click="dialogFormVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/fetch/api";
import steps from "./steps";
export default {
  data () {
    return {
      form: {
        name: "",       //姓名
        telephone: "",  //电话
        provinceSel: '', //省
        citySel: '',     //市
        districtSel: '', //区
        address: ""     //详细地址
      },
      provinceList: [],      //省份列表
      provinceSel: '',
      cityList: [],          //城市列表
      citySel: '',
      districtList: [],      //区县列表
      districtSel: '',
      formLabelWidth: "120px",
      dialogFormVisible: false,
      disabled: false,
      count: 10, //兑换数量
      unitprice: 2500, // 单个商品所需数量
      amountprice: 0, // 总计数量
      stepActive: 2,
      radio: 1,
      activeHight: 32,
      activeHightFlag: false,
      secondCount: 60, ///60s 重新发送
      userId: window.localStorage.QingjuuserId,
      QingjuAccount: window.localStorage.QingjuAccount,
      addressList: [],
      teleCode: "",
      sendData: {  //确认支付请求参数
        addressId: 1,
        exchangeType: "",
        giftId: 0,
        giftName: "",
        phone: window.localStorage.QingjuTelePhone, // 用户电话
        totalBean: window.localStorage.totalBean, //需要的青豆总数
        userId: window.localStorage.QingjuuserId,
        verityCode: "",               //验证码
        num: 0
      },
      PriceNum: window.localStorage.PriceNum,  //兑换奖品数量
    };
  },
  props: ["dataList"],
  created () {
    if (this.userId) {
      this.userId = JSON.parse(this.userId);
    }
    if (this.sendData.userId) {
      this.sendData.userId = JSON.parse(window.localStorage.QingjuuserId);
    }
    if (this.QingjuAccount) {
      this.QingjuAccount = JSON.parse(this.QingjuAccount)
    }
    if (this.sendData.phone) {
      this.sendData.phone = JSON.parse(this.sendData.phone)
    }
    if (this.sendData.totalBean) {
      this.sendData.totalBean = JSON.parse(this.sendData.totalBean)
    }
    if (this.PriceNum) {
      this.PriceNum = JSON.parse(this.PriceNum)
    }
    this.sendData.exchangeType = this.dataList.exchangeType;
    this.sendData.giftId = this.dataList.id;
    this.sendData.giftName = this.dataList.giftName;
    this.getAddressList();
    this.province()           //省份列表
  },
  watch: {
    provinceSel: function (newVal, oldVal) {
      if (newVal != '') {
        this.city()
      }
    },
    citySel: function (newVal, oldVal) {
      if (newVal != '') {
        this.district()
      }
    }
  },
  components: {
    steps
  },
  methods: {
    //设置默认地址
    setDefaultAddress (id) {
      api.setDefaultAddress(id).then(res => {
        this.sendData.addressId = id; // 获取默认地址 ID
        setTimeout(() => {
          this.getAddressList();
          this.radio = 1;
        }, 500);
      });
    },
    // 地址列表
    getAddressList () {
      if (this.userId) {
        api.getAddressList(this.userId).then(res => {
          this.addressList = res.dataList;
          if (this.addressList.length != 0) {
            this.addressList.map(item => {
              if (item.isDefault === '1') {
                this.sendData.addressId = item.id; // 获取默认地址 ID
              } else {
                api.setDefaultAddress(this.addressList[0].id).then(res => {
                  this.sendData.addressId = this.addressList[0].id; // 获取默认地址 ID
                });
              }
            })
          } else {
            this.sendData.addressId = '';
          }
        });
      } else {
        this.$message("请重新登录");
      }
    },
    // 添加收货地址
    addReceiveAddress () {
      this.form.provinceSel = this.provinceSel
      this.form.citySel = this.citySel
      this.form.districtSel = this.districtSel
      if (!this.form.name) {
        this.$message.error("请输入收货人姓名");
      } else if (!this.form.telephone) {
        this.$message.error("请输入收货人电话");
      } else if (!this.form.provinceSel) {
        this.$message.error("请选择省份");
      } else if (!this.form.citySel) {
        this.$message.error("请选择城市");
      } else if (!this.form.districtSel) {
        this.$message.error("请选择区县");
      }
      else if (!this.form.address) {
        this.$message.error("请输入具体地址");
      } else {
        let data = {
          detailAddress: this.form.address,
          name: this.form.name,
          phone: this.form.telephone,
          userId: this.userId,
          city: this.form.citySel,
          district: this.form.districtSel,
          province: this.form.provinceSel,
        };
        api.addReceiveAddress(data).then(res => {
          this.dialogFormVisible = false;
          this.activeHight = 32;
          this.getAddressList();
        });
      }
    },
    // 获取短信验证码
    sendVerifyCode () {
      let data = {
        phone: this.sendData.phone,
        userId: this.userId
      };
      api.sendVerifyCode(data).then(res => {
        if (res.errorCode == '200') {
          this.disabled = true
        }
      })
        .catch(res => {
          this.$message(res.errorMsg);
        });
    },
    // 发送短信验证码
    sendCode () {
      // this.disabled = true;
      let that = this;
      if (this.userId) {
        this.sendVerifyCode();
      } else {
        this.$message("请重新登录");
      }
      var timer = setInterval(function () {
        if (that.secondCount > 1) {
          that.secondCount--;
        } else {
          that.disabled = false;
          that.secondCount = 60; //复位计数时间
          clearInterval(timer);
        }
      }, 1000);
    },
    addNewadress () {
      //添加新的地址列表
      this.form = new Object()
      this.dialogFormVisible = true;
      this.provinceSel = ''
      this.citySel = ''
      this.districtSel = ''
    },
    getmoreAddress () {
      //展开地址列表
      //  30为 单个列表高度
      this.activeHightFlag = ~this.activeHightFlag;
      if (!this.activeHightFlag) {
        this.activeHight = 32;
      } else {
        this.activeHight = 30 * this.addressList.length;
      }
    },
    minusCount () {
      if (this.count > 1) {
        this.count--;
      }
    },
    addCount () {
      this.count++;
    },
    // 确认支付
    goodsinfoSubmit () {
      if (this.sendData.userId) {
        if (this.sendData.verityCode) {
          this.sendData.num = this.PriceNum;
          this.sendData.phone = this.sendData.phone; /// 这里的电话不对
          if (this.sendData.addressId) {
            api.confirmPayment(this.sendData).then(res => {
              // 这的参数都是死的  需要更改
              let data = {
                amount: this.sendData.totalBean,
                exchangeType: this.sendData.exchangeType,
                giftName: this.sendData.giftName,
                mobile: this.sendData.phone,
                size: this.PriceNum
              };
              // 兑换成功通知
              api.sendWelfareInform(data).then(res => {
                this.$emit("send2Parent", 3);// 跳转到下一页
              });
            }).catch(res => {
              this.$message.error(res.errorMsg)
            });
          } else {
            this.$message.error('请选择收货地址')
          }
        } else {
          this.$message.error("请填写短信验证码");
          return;
        }
      } else {
        this.$message("请重新登录");
      }
    },
    // 获取省份
    province () {
      api.province().then(res => {
        this.provinceList = res.dataList
        this.provinceSel = res.dataList[0].code
        this.form.provinceSel = res.dataList[0].code
      })
    },
    // 获取城市
    city () {
      api.city(this.provinceSel).then(res => {
        this.cityList = res.dataList
        this.citySel = res.dataList[0].code
        this.form.citySel = res.dataList[0].code
      })
    },
    // 获取区县
    district () {
      api.district(this.citySel).then(res => {
        this.districtList = res.dataList
        this.districtSel = res.dataList[0].code
        this.form.districtSel = res.dataList[0].code
      })
    },
  }
};
</script>

<style lang="less" scoped>
.goodsInfo {
  width: 100%;
  padding-bottom: 180px;
  > .tit1 {
    font-size: 18px;
  }
  > .info {
    font-size: 14px;
    color: #666666;
    padding: 0 152px;
    box-sizing: border-box;
    > .telInfo {
      padding-bottom: 40px;
      border-bottom: 1px solid #ccc;
      > div {
        display: flex;
        &:nth-child(1) {
          height: 35px;
          padding: 40px 0;
          > div {
            &:nth-child(1) {
              margin-right: 40px;
            }
            > span {
              display: inline-block;
              line-height: 35px;
            }
          }
        }
        &:nth-child(2) {
          > div {
            &:nth-child(1) {
              height: 35px;
              span {
                display: inline-block;
                line-height: 35px;
              }
            }
            &:nth-child(3) {
              color: #fff;
              margin-left: 15px;
            }
            &:nth-child(3):hover {
              cursor: pointer;
            }
            &:nth-child(4) {
              width: 35px;
              height: 35px;
              border-radius: 3px;
              color: #666666;
              text-align: center;
              line-height: 35px;
              border-width: 1px;
              border-style: solid;
              border-color: rgba(188, 188, 188, 1);
              margin-left: 15px;
            }
          }
          input {
            width: 348px;
            height: 33px;
            border: 1px solid #ccc;
          }
        }
        &:nth-child(3) {
          font-size: 12px;
          color: #666666;
          margin-top: 10px;
          > p {
            margin-left: 138px;
          }
        }
      }
    }
    > .adressInfo {
      > .tit {
        display: flex;
        justify-content: space-between;
        padding: 18px 0;
        box-sizing: border-box;
        div {
          &:nth-child(1) {
            font-size: 14px;
            color: #333333;
            font-weight: bold;
          }
          &:nth-child(2) {
            font-size: 12px;
            color: #0066cc;
            font-weight: bold;
          }
          &:nth-child(2):hover {
            cursor: pointer;
          }
        }
      }
      > .addressList {
        > div {
          &:nth-child(1) {
            overflow: hidden;
            transition: height 0.5s;
            p {
              margin-top: 4px;
              margin-left: 10px;
              font-size: 12px;
              color: #ffffff;
              width: 60px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              background-color: rgba(153, 153, 153, 1);
            }
            > div {
              line-height: 30px;
              height: 30px;
            }
          }
          &:nth-child(2) {
            font-size: 12px;
            font-weight: 700;
            span:hover {
              cursor: pointer;
            }
            img:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  > .submit {
    overflow: hidden;
    margin-top: 70px;
    text-align: right;
    span {
      font-size: 12px;
      line-height: 40px;
      display: inline-block;
      margin-right: 15px;
    }
    > p {
      float: right;
      height: 40px;
      width: 140px;
      background-color: rgba(240, 70, 70, 1);
      line-height: 40px;
      text-align: center;
      border-radius: 2px;
      font-size: 14px;
      color: #ffffff;
    }
    > p:hover {
      cursor: pointer;
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
</style>
