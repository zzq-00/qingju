<template>
  <div class="benefits-container">
    <headerComponents></headerComponents>
    <div v-if="auth">
      <div class="benefits-main">
        <div class="benefits-banner">
          <div class="container">
            <el-carousel height="450px" max-width="1920px">
              <el-carousel-item v-for="(item,index) in swiperImg" :key="index">
                <a :href="`http://${item.attachURL}`" v-if="item.attachURL">
                  <img :src="item.imgURL" alt="" height="100%" width="100%">
                </a>
                <router-link to="" v-else>
                  <img :src="item.imgURL" alt="" height="100%" width="100%">
                </router-link>
              </el-carousel-item>
            </el-carousel>
            <div class="login-box">
              <!-- 登录之后的页面 -->
              <div class="login-show" v-show="userId">
                <div class="personal-info">
                  <div class="headIcon"><img :src="hearImg" alt=""></div>
                  <div class="info-des">
                    <div class="info_name">{{QingjuAccount}}</div>
                    <div>
                      <span>青豆：</span>
                      <span style="color:red;">{{myQingdouCount}}</span>
                    </div>
                    <div>
                      <div class="login-but" @click="quitLogin">退出</div>
                    </div>
                  </div>
                </div>
                <div class="buts">
                  <div class="list" @click="go2dotasks">去做任务</div>
                  <div class="list" @click="go2qingjuRecord('benefit','first')">青豆记录</div>
                  <div class="list" @click="go2qingjuRecord('benefit','second')">我已兑换</div>
                </div>
                <div class="qiaodao-but" v-if="!isSignIn">
                  <div><img src="../../assets/img/u248.png" alt=""></div>
                  <div @click="sign">签到领取青豆</div>
                </div>
                <div class="qiaodao-buts" v-if="isSignIn">
                  <div><img src="../../assets/img/u248.png" alt=""></div>
                  <div>已签到</div>
                </div>
                <div class="qingdou-content">
                  <div class="tit">大家都在做</div>
                  <div class="lists">
                    <div class="list" v-for="(item,index) in getQingdouList" :key="index">
                      <span>【{{item.taskType}}】{{item.taskName}}</span>
                      <span @click="getQingdou()">{{item.ifFinish?"领取完成":"领取"}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="login-hide" v-show="!userId">
                <div>
                  <img src="../../assets/img/chancelLogin.png" alt="">
                </div>
                <div>
                  <div @click="go2login" style="cursor: pointer;">登录</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 推荐礼品 -->
        <div class="goodsList-main container">
          <div class="tit">
            推荐礼品
          </div>
          <div class="goodsList-list container">
            <div class='samall'>
              <div v-for='(item,index) in goodsList' :key="index" style="margin-right:19px;margin-bottom:10px;">
                <goodsList :datalist='item' @send2ParentLogin="getChildLogin"></goodsList>
              </div>
            </div>
          </div>
        </div>
        <!-- 推荐优惠券 -->
        <div class="ticketList-main container">
          <div class="tit">
            推荐优惠券
          </div>
          <div class="ticketList-list container">
            <div v-for="(item,index) in WelfareCouponList" :key="index" style="margin-right:19px;margin-bottom:10px;">
              <ticketList :dataList='item' @send2ParentLogin="getChildLogin"></ticketList>
            </div>
          </div>
        </div>
        <!-- 我要抽奖 -->
        <div class="choujian-main container">
          <div class="tit">
            我要抽奖
          </div>
          <div class="choujian-content">
            <div class="coujian-left">
              <div class="choujiang-tit1">
                <span>—————</span>
                <span class="text">获奖名单</span>
                <span>—————</span>
              </div>
              <div class="choujiang-tit2">
                <div>中奖者名单</div>
                <div>奖品信息</div>
              </div>
              <div class="choujiang-lists" id='lists' @mouseover="stopScroll('lists')" @mouseout="reScroll()">
                <div id='list1'>
                  <div class="list" v-for='(item,index) in PriceAccountList' :key="index">
                    <span>{{item.userName}}</span>
                    <span>{{item.giftName}}</span>
                  </div>
                </div>
                <div id='list2'></div>
              </div>
            </div>
            <!-- 抽奖模块 -->
            <div class="coujian-right">
              <div class="coujian-tit">
                <div>
                  <span>青豆数量：</span>
                  <span style="color:red;">{{myQingdouCount}}</span>
                </div>
                <div>
                  <span @click="seeRecord">抽奖记录</span>
                </div>
              </div>
              <div class="choujian-box">
                <div v-for='(item,index) in priceList' :key="index" :class="[index==PlayIndex?'ActivePlay list':'list DefaultPlay',index==finalIndex?'finallActive list':'list ActivePlay']">
                  <div>
                    <div>
                      <img :src="item.image" alt="">
                    </div>
                  </div>
                </div>
                <div class="but" @click="startPlay(50,3)">开始抽奖</div>
              </div>
              <div class="des">每次游戏仅消耗 2青豆 哦！</div>
            </div>
          </div>
        </div>
        <!-- 推荐课程 -->
        <div class="kecheng-main container">
          <div class="tit">
            <span>推荐课程</span>
            <!-- <span>更多课程 〉</span> -->
          </div>
          <div class="kecheng-lists">
            <div v-for="(item,index) in courseList" :key="index" style="margin-right:15px;margin-bottom:10px;">
              <courseList :dataList='item' @send2ParentLogin="getChildLogin" @videoURL='playUrl'></courseList>
            </div>
          </div>
        </div>
      </div>
      <!-- 判断是否登录 -->
      <el-dialog :visible.sync="dialogVisible" width="650px" :lock-scroll='false'>
        <div class="dialogLogin-main">
          <div class="dialogLogin-left">
            <div>
              <img src="../../assets/img/wechat.jpg" alt="微信二维码" width="120px" height="120px">
            </div>
            <div>
              <span>扫描二维码，关注青矩微信<br>获取更多新鲜、优惠资讯</span>
            </div>
          </div>
          <div class="dialogLogin-right">
            <div class="tit">账号密码登录</div>
            <div class="inp" style="margin-top:34px;margin-bottom: 21px;">
              <div><img src="../../assets/img/u306.png" alt=""></div>
              <div><input type="text" v-model="loginData.account" placeholder="请输入青矩账号"></div>
            </div>
            <div class="inp">
              <div><img src="../../assets/img/u310.png" alt=""></div>
              <div><input type="password" v-model="loginData.pwd" placeholder="请输入密码"></div>
            </div>
            <div style="text-align:right;margin-top:5px;">
              <span style="cursor:pointer" @click="forget">忘记密码？</span>
            </div>
            <div class="dialogLogin-footer">
              <div @click="submitLogin">登录</div>
              <div @click="go2register">注册</div>
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 中奖地址  -->
      <el-dialog :title="winGift" :visible.sync="dialogVisible1" width="60%">
        <div class="adressInfo">
          <div class="tit">
            <div>邮寄地址</div>
            <div @click="addNewadress">添加收货地址</div>
          </div>
          <div class="addressList">
            <div :style="{height: activeHight + 'px' }">
              <div v-for="(item,index) in addressList" :key="index" style="display:flex;">
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
        <el-dialog title="收货信息" :visible.sync="dialogFormVisible" append-to-body width="800px">
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
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addReceiveAddress">确 定</el-button>
          </div>
        </el-dialog>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmAddressInfo">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="抽奖记录" :visible.sync="recordDia" width="576px" style="text-align:center;
          font-weight: 700;
          font-style: normal;
          font-size: 18px;
          color: #333333;">
        <el-table :data="tableData" style="width: 100%;margin-bottom:20px;font-size: 12px;font-weight: normal;">
          <el-table-column prop="inputTime" label="时间" width="150" align="center"></el-table-column>
          <el-table-column prop="bean" label="投注" width="" align="center"></el-table-column>
          <el-table-column prop="giftName" label="中奖情况" align="center"></el-table-column>
        </el-table>
        <button :disabled='point' class='record_btn' @click="selectPage('up')">上一页</button>
        <span style="margin:0 10px;">{{params.page+1}}/{{totalSum}}</span>
        <button :disabled='ispoint' class='record_btn' @click="selectPage('down')">下一页</button>
      </el-dialog>
      <div class="masks" v-if="video">
        <div class="box">
          <span class="close" @click="video = false">&times;</span>
          <video id="myVideo" :src="playVideo" autoplay controls="controls" width="auto" @click="videoClick">
            <source src="playVideo"> 您的浏览器不支持视频的播放
          </video>
        </div>
      </div>
    </div>
    <no-auth v-else class="no-auth"></no-auth>
    <footerComponents/>
  </div>
</template>
<script>
import api from "@/fetch/api";
import headerComponents from "@/components/headerComponents";
import goodsList from "./goodsList";
import ticketList from "./ticketList";
import courseList from "./courseList";
import noAuth from '@/components/noAuth';
import footerComponents from "@/components/footerComponents";
export default {
  data () {
    return {
      QingjuAccount: "",
      chancelLogin: Boolean(""),
      dialogVisible: false, //登录窗口
      dialogVisible1: false,
      myFunction: null,
      choujiangList: [],
      myQingdouCount: "", //我的青豆数量
      getQingdouFlag: false,
      getQingdouIndex: "",
      userId: "",
      getQingdouList: [], //大家都在做列表
      loginData: {
        account: "",
        pwd: "",
        remember: "checked"
      },
      goodsList: [], // 推荐礼品
      WelfareCouponList: [], //推荐优惠券
      priceList: [], //抽奖列表
      courseList: [], //课程列表
      PlayIndex: 0, //转动过程的Index
      finalIndex: "", //中奖的最后位置
      exchangeType: 0, //抽中奖品类型
      formLabelWidth: "120px",
      form: {
        name: "",
        telephone: "",
        address: ""
      },
      dialogFormVisible: false,
      radio: 1,
      activeHight: 35,
      addressList: [],
      priceRecordId: "",
      priceaddressId: "",
      PriceAccountList: [], //中奖人员名单
      recordDia: false, //抽奖记录的容器
      tableData: [], //抽奖记录
      params: {
        page: 0,
        size: 7,
        userId: ""
      },
      totalSum: Number(""),
      point: false,
      ispoint: false,
      taskList: [], //任务列表 查看是否签到
      isSignIn: false, //是否已经签到
      winGift: "", //抽中的礼物
      hearImg: "", //头像
      swiperImg: [],     //轮播图列表
      video: false,      //视频窗口
      playVideo: '',     //视频地址
      provinceList: [],      //省份列表
      provinceSel: '',
      cityList: [],          //城市列表
      citySel: '',
      districtList: [],      //区县列表
      districtSel: '',
      auth: false, // 没有权限
    };
  },
  components: {
    headerComponents,
    goodsList,
    ticketList,
    courseList,
    noAuth,
    footerComponents
  },
  created () {
    if (window.localStorage.QingjuuserId) {
      api.getUserInfo().then(res => {
        if (!res.dataList[0].userName) res.dataList[0].userName = res.dataList[0].code || '青矩用户'
        window.localStorage.accountInfo = JSON.stringify(res.dataList[0])
        this.userId = res.dataList[0].id
        this.getAddressList();       //地址列表
        this.getMyBean();            //我的青豆
        this.getdrawLotteryRecord(); //个人抽奖记录
        this.getEverybodyTaskList(); //大家都在做列表
        this.QingjuAccount = res.dataList[0].userName
        this.hearImg = res.dataList[0].headPortraits
      }).catch(err => { })
    }
    this.getGoodslist();          //推荐礼品列表
    this.getLotteryList();        //获奖名单
    this.getWelfareCouponList();  //推荐优惠券列表
    this.getWelfareCourseList();  //推荐课程列表
    // 注册中奖列表 滚动事件
    this.getLotteryHome();
  },
  mounted () {
    // 判断是否登陆 决定显示 页面
    this.startScroll("lists", "list1", "list2");
    this.welGetAllImg()     //轮播图列表
    this.province()           //省份列表
    var auth = localStorage.statusString && JSON.parse(localStorage.statusString)
    this.auth = auth === '无效' ? false : true
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
  methods: {
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
    // 轮播图列表
    welGetAllImg () {
      api.welGetAllImg().then(res => {
        this.swiperImg = res.dataList
      })
    },
    // 签到
    sign () {
      api.signIn(this.userId).then(res => {
        if (res.errorCode == "200") {
          this.isSignIn = true; //签到成功
          this.getMyBean();
          this.getEverybodyTaskList();
        }
      }).catch(res => {
        this.$message(res.errorMsg);
      });
    },
    // 大家都在做列表
    getEverybodyTaskList () {
      if (this.userId) {
        api.getEverybodyTaskList(this.userId).then(res => {
          this.getQingdouList = res.dataList;
          this.getQingdouList.map(item => {
            if (item.taskName == "签到") {
              if (item.ifFinish) {
                this.isSignIn = true; //已签到
              } else {
                this.isSignIn = false; //未签到
              }
            }
          });
        });
      }
    },
    // 个人抽奖记录翻页
    selectPage (value) {
      if (value == "down") {
        if (this.params.page + 1 < this.totalSum) {
          this.params.page = this.params.page + 1;
          this.getdrawLotteryRecord();
        }
      }
      if (value == "up") {
        if (this.params.page + 1 > 1) {
          this.params.page = this.params.page - 1;
          this.getdrawLotteryRecord();
        }
      }
    },
    //查看抽奖记录
    seeRecord () {
      if (this.userId) {
        this.recordDia = true;
      } else {
        this.dialogVisible = true; //未登录，登录窗口显示
      }
    },
    // 个人抽奖记录
    getdrawLotteryRecord () {
      if (this.userId) {
        this.params.userId = this.userId;
        api.getdrawLotteryRecord(this.params).then(res => {
          this.tableData = res.dataList;
          this.totalSum = Math.ceil(Number(res.totalSum) / 7);
        });
      }
    },
    //设置默认地址
    setDefaultAddress (id) {
      api.setDefaultAddress(id).then(res => {
        this.priceaddressId = id; // 获取默认地址 ID
        setTimeout(() => {
          this.getAddressList();
          this.radio = 1;
        }, 500);
      });
    },
    //中奖后提交地址信息
    confirmAddressInfo () {
      if (this.addressList.length != 0) {
        let data = {
          addressId: this.priceaddressId,
          recordId: this.priceRecordId
        };
        api.confirmAddressInfo(data).then(res => {
          this.dialogVisible1 = false;
        });
      } else {
        this.$message.error("请添加收货地址");
      }
    },
    // 地址列表
    getAddressList () {
      if (this.userId) {
        api.getAddressList(this.userId).then(res => {
          this.addressList = res.dataList;
          // 循环地址列表，如果列表里边没有默认地址，则把第一条地址设为默认地址，避免确认收货信息的时候 address为空
          for (var i = 0; i < this.addressList.length; i++) {
            if (this.addressList[i].isDefault === "1") {
              this.priceaddressId = this.addressList[i].id; // 获取默认地址 ID
              return false;
            } else {
              this.addressList[0].isDefault = "1";
              this.priceaddressId = this.addressList[0].id;
              let id = this.priceaddressId;
              api.setDefaultAddress(id).then(res => {
                this.priceaddressId = id; // 获取默认地址 ID
                setTimeout(() => {
                  this.getAddressList();
                  this.radio = 1;
                }, 500);
              });
              return false;
            }
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
    getmoreAddress () {
      //展开地址列表
      //  30为 单个列表高度
      this.activeHightFlag = ~this.activeHightFlag;
      if (!this.activeHightFlag) {
        this.activeHight = 35;
      } else {
        this.activeHight = 30 * this.addressList.length;
      }
    },
    addNewadress () {
      //添加新的地址列表
      this.dialogFormVisible = true;
      this.form = new Object()
      this.provinceSel = ''
      this.citySel = ''
      this.districtSel = ''
    },
    // 我的青豆
    getMyBean () {
      // 参数为userId
      if (this.userId) {
        api.getMyBean(this.userId).then(res => {
          this.myQingdouCount = res.dataList[0].myBean;
        });
      }
    },
    // 推荐课程
    getWelfareCourseList () {
      if (window.localStorage.QingjuuserId) {
        var datas = {
          page: 0,
          size: 10,
          userId: JSON.parse(window.localStorage.QingjuuserId)
        }
      } else {
        var datas = {
          page: 0,
          size: 10,
          userId: '',
        };
      }
      api.getWelfareCourseList(datas).then(res => {
        this.courseList = res.dataList;
      });
    },
    //推荐优惠券
    getWelfareCouponList () {
      let requiredata = {
        page: 0,
        size: 10
      };
      api.getWelfareCouponList(requiredata).then(res => {
        this.WelfareCouponList = res.dataList;
      });
    },
    // 获取中奖名单
    getLotteryList () {
      let require = {
        page: 0,
        size: 100
      };
      api
        .getLotteryList(require)
        .then(res => {
          this.PriceAccountList = res.dataList;
          this.PriceAccountList.forEach(item => {
            if (item.userName && item.userName.length > 7) {
              item.userName = item.userName.substring(0, 6) + "...";
            }
          });
        })
        .catch(res => {
          this.$message(res.errorMsg);
        });
    },
    // 去任务页面
    go2dotasks () {
      // 外部是0  内部是1
      if (JSON.parse(window.localStorage.isTzecc) == '1') {
        this.$message('内部员工禁止操作');
      } else {
        this.$router.push("/doTasks");
      }
    },
    //抽奖表盘数据获取
    getLotteryHome () {
      api
        .getLotteryHome()
        .then(res => {
          this.priceList = res.dataList;
        })
        .catch(res => {
          this.$message.error(res.errorMsg);
        });
    },
    //开始抽奖
    startPlay (speed, turns) {
      if (!this.userId) {
        this.dialogVisible = true;
      } else {
        //参数1 速度 参数2 旋转圈数
        if (this.myQingdouCount >= 2) {
          //青豆数量判断
          var n1 = 0;
          // 注意 参数 userId   现在是写死 状态
          api.drawLottery(this.userId).then(res => {
            if (res.errorCode == '200') {
              this.exchangeType = res.dataList[0].exchangeType;
              this.priceRecordId = res.recordId;
              this.winGift = "恭喜您，抽中" + res.dataList[0].prize;
              this.priceList.map((item, index) => {
                if (item.id === res.dataList[0].id) {
                  n1 = index;
                  var c = 0;
                  var circle = 0;
                  var timer = setInterval(() => {
                    //实现滚动事件
                    if (c > 10) {
                      c = 0;
                      circle++;
                      this.PlayIndex = c;
                    } else {
                      c++;
                      this.PlayIndex = c;
                    }
                    if (circle === turns) {
                      if (n1 === c) {
                        this.finalIndex = c;
                        clearInterval(timer);
                        this.getMyBean();
                        this.getLotteryList();
                        this.getdrawLotteryRecord();
                        this.myQingdouCount -= 2;
                        if (this.exchangeType === "5") {
                          this.dialogVisible1 = true;
                        }
                      }
                    }
                  }, speed);
                }
              });
            }
          }).catch(res => {
            this.$message(res.errorMsg);
          });
        } else {
          this.$message("青豆数量不足无法进行抽奖");
        }
      }
    },
    getChildLogin (data) {
      this.dialogVisible = data;
    },
    // 播放视频源
    playUrl (data) {
      this.playVideo = data
      this.video = true
    },
    // 视频播放暂停 开始
    videoClick () {
      let dom = document.getElementById('myVideo')
      if (dom.paused) {
        dom.play()
      } else {
        dom.pause()
      }
    },
    //获取推荐礼品列表
    getGoodslist () {
      let requestData = {
        page: 0,
        size: 10
      };
      api
        .getWelfareGiftList(requestData)
        .then(res => {
          if (res.errorCode === "200") {
            this.goodsList = res.dataList;
            this.chancelLogin = false;
          }
        })
        .catch(res => {
          this.chancelLogin = true;
        });
    },
    go2qingjuRecord (source, type) {
      this.$router.push({ path: "/myqingju/beanManage" });
      window.localStorage.beanManageType = JSON.stringify(type)
      window.localStorage.beanManageSource = JSON.stringify(source)
    },
    // 领取青豆
    getQingdou () {
      // 0是外部员工
      if (JSON.parse(window.localStorage.isTzecc) == '1') {
        this.$message('内部员工禁止操作');
      } else {
        this.$router.push("/doTasks");
      }
    },
    // 进入注册界面
    go2register () {
      this.$router.push("/register/person");
    },
    //点击登陆按钮
    submitLogin () {
      //注: 未作其他页面是否登陆判断  需确定登陆之后保存参数
      if (this.loginData.account == "") {
        this.$message("请输入正确的用户名");
        return;
      } else if (this.loginData.pwd == "") {
        this.$message("密码不能为空");
        return;
      }
      api
        .publishPeopleLogin(this.loginData)
        .then(res => {
          if (res.errorCode === "200") {
            // 保存用户的id
            this.getGoodslist();
            this.getLotteryList();
            this.getWelfareCouponList();
            this.getWelfareCourseList();
            this.getMyBean();
            // 注册中奖列表 滚动事件
            this.getLotteryHome();
            this.QingjuAccount = res.dataList[0].userName;
            this.chancelLogin = false;
            this.dialogVisible = false;
            window.localStorage.firmId = JSON.stringify(res.dataList[0].firmId) ||  JSON.stringify(res.dataList[0].id)
            window.localStorage.QingjuuserId = JSON.stringify(res.dataList[0].id)
            window.localStorage.QingjuAccount = JSON.stringify(res.dataList[0].userName)
            window.localStorage.QingjuTelePhone = JSON.stringify(res.dataList[0].telephone)
            window.localStorage.isTzecc = JSON.stringify(res.dataList[0].isTzecc)
            localStorage.firmCurrentUserInfo = JSON.stringify(res.dataList[0].firmCurrentUserInfo) // 权限
            api.getUserInfo().then(res => {
              if (!res.dataList[0].userName) res.dataList[0].userName = res.dataList[0].code || '青矩用户'
              window.localStorage.accountInfo = JSON.stringify(res.dataList[0])
              this.QingjuAccount = res.dataList[0].userName
              this.hearImg = res.dataList[0].headPortraits
            }).catch(err => { })
            location.reload();
          }
        })
        .catch(res => {
          this.$message(res.errorMsg);
        });
    },
    // 忘记密码
    forget () {
      this.$router.push("forget");
    },
    // 退出登录
    quitLogin () {
      api.logout().then(res => {
        if (res.errorCode === "200") {
          this.chancelLogin = false;
          localStorage.removeItem("QingjuuserId");
          localStorage.removeItem("QingjuTelePhone");
          localStorage.removeItem("QingjuAccount");
          localStorage.removeItem("isTzecc");
           window.localStorage.removeItem("firmId")
          location.reload();
        }
      });
    },
    // 调出登录弹窗
    go2login () {
      this.dialogVisible = true;
    },
    // 中奖名单循环滚动开始
    stopScroll (parent) {
      //进入停止滚动
      var dome = document.getElementById(parent);
      clearInterval(this.myFunction);
    },
    reScroll (fun, speed) {
      //移开恢复滚动
      this.startScroll("lists", "list1", "list2");
    },
    startScroll (parent, childdom, clonedon, speed = 20) {
      if (parent) {
        //参数1 父盒子 2 子盒子内容部分 3 复制的子盒子
        // 注册滚动事件
        var dome = document.getElementById(parent);
        var list1 = document.getElementById(childdom);
        if (this.PriceAccountList.length > 9) {
          var list2 = document.getElementById(clonedon);
          list2.innerHTML = list1.innerHTML; //复制节点
        }
        if (dome) {
          this.myFunction = setInterval(function () {
            if (dome.scrollTop - list1.offsetHeight >= 0) {
              dome.scrollTop = 0;
            } else {
              dome.scrollTop++;
            }
          }, speed);
        }
      }
    }
    // 中奖名单循环滚动结束
  }
};
</script>
<style lang="less" scoped>
.benefits-container {
  width: 100%;
  background-color: #f5f5f5;
  // padding-bottom: 48px;
}
.benefits-main {
  margin-top: 130px;
  .benefits-banner {
    width: 100%;
    position: relative;
    height: 450px;
    .container {
      position: relative;
      width: 100%;
    }
    .login-box {
      z-index: 2;
      position: absolute;
      left: 0;
      right: 0;
      top: 28px;
      width: 1200px;
      margin: 0 auto;
      .login-show {
        position: relative;
        padding: 20px 30px;
        box-sizing: border-box;
        width: 350px;
        background-color: #fff;
        .qiaodao-but {
          margin-top: 15px;
          background-color: rgba(255, 221, 0, 1);
          width: 260px;
          height: 50px;
          border-radius: 50px;
          display: flex;
          line-height: 50px;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          div:nth-child(1) {
            margin-right: 20px;
            img {
              margin-bottom: 3px;
              height: 21px;
              width: 21px;
            }
          }
        }
        .qiaodao-buts {
          margin-top: 15px;
          background-color: rgba(255, 221, 0, 1);
          width: 260px;
          height: 50px;
          border-radius: 50px;
          display: flex;
          line-height: 50px;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          div:nth-child(1) {
            margin-right: 20px;
            img {
              margin-bottom: 3px;
              height: 21px;
              width: 21px;
            }
          }
        }
        .qiaodao-but:hover {
          cursor: pointer;
          box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3490196);
        }

        .personal-info {
          display: flex;
          .headIcon {
            height: 100px;
            width: 100px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .info-des {
            font-size: 14px;
            margin-left: 23px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .info_name {
              width: 135px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .login-but {
              font-size: 12px;
              color: #999999;
              width: 60px;
              height: 19px;
              line-height: 19px;
              text-align: center;
              color: #00986a;
              border-radius: 6px;
              text-align: left;
            }
            .login-but:hover {
              cursor: pointer;
            }
          }
        }
        .buts {
          display: flex;
          font-size: 12px;
          color: #333333;
          justify-content: space-between;
          margin-top: 20px;
          div {
            width: 80px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border: 1px solid #d8d8d8;
            border-radius: 30px;
          }
          div:hover {
            background-color: #333333;
            color: #fff;
            cursor: pointer;
          }
        }
        .qingdou-content {
          margin-top: 28px;
          .tit {
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 15px;
          }
          .lists {
            .list {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              line-height: 24px;
              color: #333333;
              span:nth-child(2) {
                color: red;
              }
              span:nth-child(2):hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      .login-hide {
        text-align: center;
        padding: 20px 30px 93px 30px;
        box-sizing: border-box;
        width: 350px;
        background-color: #fff;
        div:nth-child(1) {
          margin-top: 56px;
          img {
            height: 120px;
            width: 120px;
          }
        }
        div:nth-child(2) {
          margin: 0 auto;
          height: 50px;
          width: 260px;
          line-height: 50px;
          background-color: #00986a;
          color: #fff;
        }
      }
    }
  }
}
.dialogLogin-main {
  display: flex;
  .dialogLogin-left {
    margin-left: 42px;
    margin-right: 40px;
    margin-top: 34px;
    margin-bottom: 34px;
    text-align: center;
    div:nth-child(2) {
      margin-top: 5px;
    }
  }
  .dialogLogin-right {
    border-left: 1px solid rgba(169, 169, 169, 1);
    padding-left: 50px;
    .tit {
      font-size: 18px;
      color: #009966;
      font-weight: 600;
    }
    .inp {
      display: flex;
      div:nth-child(1) {
        width: 44px;
        height: 38px;
        border: 1px solid rgba(169, 169, 169, 1);
        border-right: none;
        text-align: center;
        img {
          height: 20px;
          width: 20px;
          margin-top: 9px;
        }
      }
      div:nth-child(2) {
        height: 38px;
        border: 1px solid rgba(169, 169, 169, 1);
        text-align: center;
        input {
          height: 100%;
          width: 260px;
          padding-left: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}
.dialogLogin-footer {
  margin-top: 35px;
  display: flex;
  div:nth-child(1) {
    width: 180px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #009966;
    color: #fff;
    cursor: pointer;
  }
  div:nth-child(2) {
    height: 34px;
    width: 100px;
    line-height: 36px;
    text-align: center;
    border: 1px solid rgba(169, 169, 169, 1);
    margin-left: 23px;
    cursor: pointer;
  }
}
.goodsList-main {
  padding-top: 32px;
  .tit {
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
  }
  .goodsList-list {
    margin-top: 35px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1250px;
    .samall {
      margin-top: 35px;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.ticketList-main {
  padding-top: 83px;
  .tit {
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
  }
  .ticketList-list {
    width: 1250px;
    margin-top: 35px;
    display: flex;
    flex-wrap: wrap;
  }
}
.choujian-main {
  padding-top: 83px;
  .tit {
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
  }
  .choujian-content {
    margin-top: 30px;
    display: flex;
    .coujian-left {
      background-color: #fff;
      width: 331px;
      padding: 10px;
      margin-left: 50px;
      box-sizing: border-box;
      .choujiang-tit1 {
        display: flex;
        height: 31px;
        span {
          flex: 1;
          text-align: center;
          line-height: 31px;
          color: red;
          font-weight: 600;
        }
        .text {
          font-size: 24px;
          color: red;
          font-weight: 400;
        }
      }
      .choujiang-tit2 {
        display: flex;
        justify-content: space-around;
        color: #af6021;
        margin-bottom: 20px;
        margin-top: 26px;
      }
      .choujiang-lists {
        height: 400px;
        overflow: hidden;
        .list {
          padding: 0 5px 0 50px;
          box-sizing: border-box;
          font-size: 14px;
          line-height: 41px;
          border-bottom: 1px dashed #ccc;
          overflow: hidden;
          > span {
            &:nth-child(1) {
              float: left;
            }
            &:nth-child(2) {
              text-align: center;
              width: 150px;
              word-break: break-all;
              float: right;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .coujian-right {
      margin-left: 195px;
      width: 530px;
      .coujian-tit {
        display: flex;
        justify-content: space-between;
        justify-items: center;
        height: 26px;
        div:nth-child(1) {
          font-size: 18px;
          color: #666666;
          line-height: 26px;
        }
        div:nth-child(2) {
          font-size: 14px;
          line-height: 26px;
          > span:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
      .choujian-box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 25px;
        .ActivePlay {
          border: 1px solid red;
        }
        .finallActive {
          font-size: 28px;
        }
        .DefaultPlay {
          border: 1px solid #ccc;
        }
        > .list {
          height: 128px;
          width: 128px;
          line-height: 128px;
          text-align: center;
          margin-right: 2px;
          margin-bottom: 2px;
          position: relative;
          color: #fff;
          > div {
            &:nth-child(1) {
              > div {
                &:nth-child(1) {
                  > p {
                    &:nth-child(1) {
                      transition: all 0.5s;
                      word-break: break-all;
                    }
                  }
                }
              }
            }
          }
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4) {
            transform: translate(0, 0);
          }
          &:nth-child(6) {
            transform: translate(264px, 132px);
          }
          &:nth-child(5) {
            transform: translate(396px, 0);
          }

          &:nth-child(7) {
            transform: translate(0, 132px);
          }
          &:nth-child(8) {
            transform: translate(-264px, 132px);
          }
          &:nth-child(9) {
            transform: translate(0, 0);
          }
          &:nth-child(10) {
            transform: translate(-132px, -132px);
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 128px;
            height: 128px;
          }
        }
        .but {
          height: 128px;
          width: 260px;
          line-height: 128px;
          text-align: center;
          margin: 0 auto;
          background-color: rgba(214, 107, 113, 1);
          transform: translate(-134px, -132px);
          font-weight: 700;
          font-style: normal;
          font-size: 28px;
          color: #ffffff;
        }
        .but:hover {
          background-color: #fa554a;
          cursor: pointer;
        }
      }
      .des {
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #4a4a4a;
        width: 220px;
        border-radius: 30px;
        font-size: 12px;
        color: #ffffff;
        margin: 0 auto;
        margin-top: 30px;
      }
    }
  }
}
.kecheng-main {
  padding-top: 83px;
  .tit {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    span:nth-child(1) {
      font-weight: 700;
      font-style: normal;
      font-size: 24px;
    }
    span:nth-child(2) {
      font-size: 14px;
    }
    span:nth-child(2):hover {
      cursor: pointer;
    }
  }
  .kecheng-lists {
    margin-top: 36px;
    display: flex;
    flex-wrap: wrap;
  }
}
.adressInfo {
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
.record_btn {
  width: 100px;
  height: 30px;
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  background-color: #fa554a;
  color: #fff;
  border-radius: 15px;
  cursor: pointer;
}
.masks {
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    video {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-height: 100px;
      max-height: 720px;
      height: 100vh;
    }
    video::-webkit-media-controls-enclosure {
      overflow: hidden;
    }
    video::-webkit-media-controls-panel {
      width: ~"calc(100% + 30px)";
    }
    .close {
      font-size: 54px;
      color: #666;
      position: absolute;
      top: 20px;
      left: 50px;
      cursor: pointer;
      &:hover {
        color: #333;
      }
      &:before {
        content: "";
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
</style>
<style type="text/css">
/*改变的公共饿了么的轮播样式*/
.self-carousel .el-carousel__arrow--right {
  background: url("../../assets/img/index-right-icon.png") no-repeat;
  width: 34px;
  height: 70px;
}
.self-carousel .el-carousel__arrow--right:hover {
  background-color: transparent;
}
.self-carousel .el-icon-arrow-right:before {
  content: "";
}
.self-carousel .el-carousel__arrow--left {
  background: url("../../assets/img/index-left-icon.png") no-repeat;
  width: 34px;
  height: 70px;
}
.self-carousel .el-carousel__arrow--left:hover {
  background-color: transparent;
}
.self-carousel .el-icon-arrow-left:before {
  content: "";
}
.self-carousel .el-carousel__button {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #009966;
}
.self-carousel .el-carousel__indicator + .el-carousel__indicator {
  margin-left: 30px;
  width: 10px;
}
.self-carousel .el-carousel__indicators {
  bottom: 10px;
}
.no-auth{
  margin-top: 160px;
}
</style>
