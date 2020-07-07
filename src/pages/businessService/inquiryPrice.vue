<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color: #F8F9FA;"></breadcrumb>
    <div class="content">
      <div class="container clearfix">
        <div>
          <h5>一键询价</h5>
          <div id="release">
            <div>
              <label class="require">服务内容</label>
              <div>
                <label v-for="(item,index) in allCoefficientList" :key="index" v-if="item.type==='1'&&item.content.length<6">
                  <input type="checkbox" :disabled="!params.serviceContents.includes(gongchengliangCid)&&params.serviceContents.includes(qingdanCid)&&item.cid===kongzhijiaCid || !params.serviceContents.includes(gongchengliangCid)&&params.serviceContents.includes(kongzhijiaCid)&&item.cid===qingdanCid" :value="item.cid" v-model="params.serviceContents" @change="checkForm($event, params.serviceContents)">
                  <span>{{item.content}}</span>
                </label>
                <p class="tips">请选择服务内容</p>
              </div>
            </div>
            <div v-if="qingdanbianzhizimulu">
              <label class="require">清单编制子目录</label>
              <div>
                <input type="number" min="0" class="short" v-model.trim="params.inventoriesSubdirectory" @blur="checkForm($event, params.inventoriesSubdirectory)"> 条
                <p class="tips">请输入清单编制子目录</p>
              </div>
            </div>
            <div v-if="kongzhijiazimulu">
              <label class="require">控制价子目录</label>
              <div>
                <input type="number" min="0" class="short" v-model.trim="params.controlPriceSubdirectory" @blur="checkForm($event, params.controlPriceSubdirectory)"> 条
                <p class="tips">请输入控制价子目录</p>
              </div>
            </div>

            <div class="project-type">
              <label class="require">项目类型</label>
              <div class="clearfix">
                <label v-for="(item,index) in allStructTypeList" :key="index" class="fl clearfix">
                  <input style="display: none;" type="radio" :value="item.id" v-model="params.type" @change="checkForm($event, params.type)">
                  <span>{{item.typeName}}</span>
                </label>
                <!-- <select v-model="params.type" @change="checkForm($event, params.type)">
                  <option v-for="(item,index) in allStructTypeList" :key="index" :value="item.id">{{item.typeName}}</option>
                </select> -->
                <p class="tips">请选择项目类型</p>
              </div>
            </div>
            <div v-if="jianzhumianji">
              <label class="require">建筑面积</label>
              <div>
                <input type="number" min="0" v-model.trim="params.buildingArea" @blur="lessThan1000(params.buildingArea)"> ㎡
                <p class="tips">请填写建筑面积</p>
              </div>
            </div>
            <div v-if="jianzhuloushu">
              <label class="require">建筑楼数</label>
              <div>
                <input type="number" min="0" v-model.trim="params.buildingFloorNumber" @blur="checkForm($event, params.buildingFloorNumber)"> 栋
                <p class="tips">请填写建筑楼数</p>
              </div>
            </div>

            <div>
              <label class="require">专业类型</label>
              <div>
                <label v-for="(item,index) in allProjList" :key="index">
                  <input type="checkbox" :disabled="params.type===danduId&&item.pid===zhuangshiPid || params.type===xiaoxingId&&item.pid===zhuangshiPid" v-model="params.professionalTypes" :value="item.pid" @change="checkForm($event, params.professionalTypes)">
                  <span>{{item.projName}}</span>
                </label>
                <p class="tips">请选择专业类型</p>
              </div>
            </div>
            <div v-if="shineianzhuangzimulu">
              <label class="require">室内安装子目录</label>
              <div>
                <label v-for="(item,index) in allSubProjList" :key="index" v-if="item.projId===shineiPid">
                  <input type="checkbox" v-model="params.indoorInstallSubdirectories" :value="item.id" @change="checkForm($event, params.indoorInstallSubdirectories)">
                  <span>{{item.subProjName}}</span>
                </label>
                <p class="tips">请选择室内安装子目录</p>
              </div>
            </div>
            <div v-if="zhuangshizhuangxiuzimulu">
              <label class="require">装饰装修子目录</label>
              <div>
                <label v-for="(item,index) in allSubProjList" :key="index" v-if="item.projId===zhuangshiPid">
                  <input type="checkbox" :disabled="params.decorationSubdirectories.includes(jingzhuangxiuId)&&item.id===haohuazhuangxiuId || params.decorationSubdirectories.includes(haohuazhuangxiuId)&&item.id===jingzhuangxiuId" v-model="params.decorationSubdirectories" :value="item.id" @change="checkForm($event, params.decorationSubdirectories)">
                  <span>{{item.subProjName}}</span>
                </label>
                <p class="tips">请选择装饰装修子目录</p>
              </div>
            </div>
            <div v-if="gangjiegou">
              <label class="require">钢结构</label>
              <div>
                <input type="number" min="0" class="short" v-model.trim="params.steelStructureNumber" @blur="checkForm($event, params.steelStructureNumber)"> 吨
                <p class="tips">请输入钢结构</p>
              </div>
            </div>
            <div v-if="zongzhandimianji">
              <label class="require">总占地面积</label>
              <div>
                <input type="number" min="0" class="short" v-model.trim="params.totalArea" @blur="checkForm($event, params.totalArea)"> ㎡
                <p class="tips">请输入总占地面积</p>
              </div>
            </div>
            <div v-if="shiwaipeitaozimulu">
              <label class="require">室外配套子目录</label>
              <div>
                <label v-for="(item,index) in allSubProjList" :key="index" v-if="item.projId===shiwaiPid">
                  <input type="checkbox" :value="item.id" v-model="params.outdoorMatchingSubdirectories" @change="checkForm($event, params.outdoorMatchingSubdirectories)">
                  <span>{{item.subProjName}}</span>
                </label>
                <p class="tips">请选择室外配套子目录</p>
              </div>
            </div>

            <div>
              <label class="require">是否提供CAD图纸</label>
              <div>
                <label v-for="(item,index) in allCoefficientList" :key="index" v-if="item.type==='2'">
                  <input type="radio" name="CAD" :value="item.cid" v-model="params.provideCad" @change="checkForm($event, params.provideCad)">
                  <span>{{item.content}}</span>
                </label>
                <p class="tips">请选择是否提供CAD图纸</p>
              </div>
            </div>
            <div>
              <label class="require">委托范围</label>
              <div>
                <select v-model="params.monomerEntrust" @change="checkForm($event, params.monomerEntrust)">
                  <option v-for="(item,index) in allCoefficientList" :key="index" v-if="item.type==='3'" :value="item.cid">{{item.content}}</option>
                </select>
                <p class="tips">请选择委托范围</p>
              </div>
            </div>
            <div>
              <label class="require">交付截止日期</label>
              <div>
                <el-tooltip class="item" content="交付日期越长，优惠越大哦，最高优惠8折" placement="right">
                  <el-date-picker style="width:400px;" v-model="params.deliveryDeadline" type="date" :editable="false" :picker-options="pickerOptions">
                  </el-date-picker>
                </el-tooltip>
                <p class="tips">请选择交付截止日期</p>
              </div>
            </div>
            <div>
              <label>是否需要现场工作(天)</label>
              <div class="spot clearfix">
                <label>
                  <input type="checkbox" v-model="params.localeWork">
                </label>
                <input type="number" min="0" :disabled="!params.localeWork" placeholder="全体人员现场工作天数之和" v-model.trim="params.expectWorkDays">
              </div>
            </div>
            <div>
              <label></label>
              <div>
                <el-button type="primary" size="small" style="padding: 9px 25px;" @click="calcTotalFeeAsk">计算价格</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="fr">
          <dl v-if="civilPartFee && civilPartFee.discountAskFormat !== '0.00'">
            <dt>
              <span>土建工程</span>
            </dt>
            <dd>
              <span>服务费：</span>
              <span>{{civilPartFee.consultMoneyFormat | formatMoney}}元</span>
            </dd>
            <dd>
              <span>青矩指数：</span>
              <span>{{civilPartFee.pfExponentValue}}</span>
            </dd>
            <dd>
              <span>费用小计：</span>
              <span>{{civilPartFee.discountAskFormat | formatMoney}}元</span>
            </dd>
          </dl>
          <dl v-if="installPartFee && installPartFee.discountAskFormat !== '0.00'">
            <dt>
              <span>安装工程</span>
            </dt>
            <dd>
              <span>服务费：</span>
              <span>{{installPartFee.consultMoneyFormat | formatMoney}}元</span>
            </dd>
            <dd>
              <span>青矩指数：</span>
              <span>{{installPartFee.pfExponentValue}}</span>
            </dd>
            <dd>
              <span>费用小计：</span>
              <span>{{installPartFee.discountAskFormat | formatMoney}}元</span>
            </dd>
          </dl>
          <dl v-if="baseFee">
            <dd>
              <span>现场工作费：</span>
              <span>{{baseFee.baseMoneyFormat | formatMoney}}元</span>
            </dd>
          </dl>
          <dl v-if="totalMoney">
            <dd>
              <span>
                <b>费用预计：</b>
              </span>
              <span>
                <b style="font-size:24px;color:#FF4E33;">{{totalMoney | formatMoney}}</b> 元
              </span>
            </dd>
            <dd>
              <p>注：此金额含税费，最终以发票金额为准</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '我要询价', path: this.$route.fullPath }],
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < this.Fs
        }
      },
      allProjList: [],
      allSubProjList: [],
      allCoefficientList: [],
      allStructTypeList: [],
      gongchengliangCid: '4df0530c784e4a7ebeb34c41c059fb87',
      qingdanCid: '843794e4ba9e438985670370520eb2bc',
      kongzhijiaCid: 'a478806d57dd4066bde1ad21c84af1e2',
      putongId: '2903ebdf5a0e4a36b3b1e7dbb16e9f68',
      bieshuId: '31c68e1f6c764f2195527a0b947d5299',
      xiaoxingId: '6a07944aea0a4580bf789b0ff0c99eb6',
      danduId: 'e3a721c315d84d208bfa387f5518b8ac',
      shineiPid: '2f6298c0f22b4805aeedca2e0f82ccaa',
      zhuangshiPid: '04d1664e3b21405f8cc7656b8eac72df',
      tufangdijiPid: '46dca9ee825043a1a068f856ee537c4b',
      tujianPid: '524fec0555c34e6e9f0b168ee0da5ec0', // "建筑工程"
      gangjiegouPid: 'bfa2495de068480bbd8149018ebd9e09',
      shiwaiPid: '9a2e7e1b3c3d4b35ac36e684a0aab40d',
      gangjinPid: 'f5dbb1c1ce8a4c5fa6085b73666a721e', // "结构工程"
      jingzhuangxiuId: 'e3f97d6c83b54e9fa49bf2f25d80ecce',
      haohuazhuangxiuId: '56befb7cf04244dc893e9760a1efe230',
      params: {
        buildingArea: '',
        buildingFloorNumber: '',
        cad: true,
        civilSubdirectory: '',
        controlPriceSubdirectory: '',
        decorationSubdirectories: ['4ddddbae42fd4515a51107adb81223db', 'e3f97d6c83b54e9fa49bf2f25d80ecce'],
        startDate: new Date(),
        deliveryDeadline: '',
        discount: '',
        earthworkSubdirectory: '',
        expectWorkDays: 0,
        indoorInstallSubdirectories: ['3c5dcbe56048440da7116af3ce4a025f', '10b5b8726e7946d79c01d4b5484e1dee', '41597416f64c45fa9748e90b1a2b08d2', '54d048d5476d40809a38335f11863124', '72f95d04524d407796e2acd512f01212'],
        inventoriesSubdirectory: '',
        localeWork: false,
        monomerEntrust: '',
        outdoorMatchingSubdirectories: ['2acaf9d0e27e4889a611fd6f74299a8f', '4064e3a8f5b1445b836fb4e20fccc8a5', '44f9f01fe6a642a093463ad0198d750e', 'b3e1f9ae6fdc4fa7aee8b25d10b0f2a1', 'd531e204bd2d4825aa093c62ad8b0f1a', '44f9f01fe6a642a093463ad0198d750r', '44f9f01fe6a642a093463ad0198d750o'],
        professionalTypes: [],
        projectInfoId: '',
        provideCad: '340ecfb90d3d4c4fa2267391ddd51fcb',
        serviceContentFlag: '',
        serviceContentSubdirectory: '',
        serviceContents: [],
        standardId: '',
        steelBarSubdirectory: '',
        steelStructId: '',
        steelStructureNumber: 0,
        totalArea: 0,
        type: ''
      },
      baseFee: '',
      civilPartFee: '',
      installPartFee: '',
      totalMoney: '',
      Fs: ''
    }
  },
  computed: {
    // 子目录的显示与隐藏
    gongchengliangjisuan: function() {
      return this.params.serviceContents.includes(this.gongchengliangCid)
    },
    qingdanbianzhizimulu: function() {
      return this.params.serviceContents.includes(this.qingdanCid) && !this.params.serviceContents.includes(this.gongchengliangCid)
    },
    kongzhijiazimulu: function() {
      return this.params.serviceContents.includes(this.kongzhijiaCid) && !this.params.serviceContents.includes(this.gongchengliangCid)
    },
    jianzhumianji: function() {
      return !(this.params.type === this.bieshuId || this.params.type === this.xiaoxingId)
    },
    jianzhuloushu: function() {
      return this.params.type === this.bieshuId || this.params.type === this.xiaoxingId
    },
    shineianzhuangzimulu: function() {
      return this.params.professionalTypes.includes(this.shineiPid)
    },
    zhuangshizhuangxiuzimulu: function() {
      return this.params.professionalTypes.includes(this.zhuangshiPid)
    },
    gangjiegou: function() {
      return this.params.professionalTypes.includes(this.gangjiegouPid) && this.params.serviceContents.includes(this.gongchengliangCid)
    },
    zongzhandimianji: function() {
      return this.params.professionalTypes.includes(this.shiwaiPid) && this.params.serviceContents.includes(this.gongchengliangCid)
    },
    shiwaipeitaozimulu: function() {
      return this.params.professionalTypes.includes(this.shiwaiPid)
    }
  },
  methods: {
    GetDateStr(AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1 // 获取当前月份的日期
      var d = dd.getDate()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    },
    // 获取标准工期
    getFs() {
      let date = new Date()
      // 如果发活时间是周末，紧挨着的周一不能选
      // if (date.getDay() == 0) {
      //   date = this.GetDateStr(2)
      // } else if (date.getDay() == 6) {
      //   date = this.GetDateStr(3)
      // } else {
      //   date = this.GetDateStr(1)
      // }
      date = this.GetDateStr(1)
      let timeparams = {
        startDate: new Date(),
        buildNum: 0,
        cad: true,
        date: date,
        itemOrControl: false,
        s: 0
      }
      if (this.params.serviceContents.length === 1 && !this.params.serviceContents.includes(this.gongchengliangCid)) {
        timeparams.itemOrControl = true
      }
      if (this.params.provideCad === '340ecfb90d3d4c4fa2267391ddd51fcb') {
        timeparams.cad = true
      } else if (this.params.provideCad === '8a2aede8f973428bab5298d94d8d62c2') {
        timeparams.cad = false
      }
      if (this.jianzhumianji) {
        delete timeparams.buildNum
        timeparams.s = this.params.buildingArea ? this.params.buildingArea : 0
      }
      if (this.jianzhuloushu) {
        delete timeparams.s
        timeparams.buildNum = this.params.buildingFloorNumber ? this.params.buildingFloorNumber : 0
      }

      api.getFs(timeparams).then(res => {
        // 预期天数
        let expectedDays = res.data / 1
        // 限制三分之一的日期不能点击，如果发活时间是周末，紧挨着的周一不能选
        // if (new Date().getDay() == 6) {
        //   this.Fs = new Date(this.GetDateStr(Math.ceil(expectedDays / 3) + 1))
        // } else {
        //   this.Fs = new Date(this.GetDateStr(Math.ceil(expectedDays / 3)))
        // }
        // this.params.deliveryDeadline = this.countExpectedDate(expectedDays)
        this.Fs = new Date(this.GetDateStr(Math.ceil(expectedDays / 3)))
        this.params.deliveryDeadline = new Date(this.GetDateStr(Number(res.data)))
      })
    },
    // 计算预期时间
    countExpectedDate(expectedDays) {
      let weekEnds = this.countOffDay(new Date(), new Date(this.GetDateStr(expectedDays))),
        expectedDate = new Date(this.GetDateStr(expectedDays + weekEnds))
      // 当为周末+1天，周六+2天
      if (expectedDate.getDay() == 0) {
        expectedDate = new Date(this.GetDateStr(expectedDays + weekEnds + 1))
      } else if (expectedDate.getDay() == 6) {
        expectedDate = new Date(this.GetDateStr(expectedDays + weekEnds + 2))
      }
      return expectedDate
    },
    // 计算周六日的天数
    countOffDay(date1, date2) {
      // date1 = new Date(date1.replace(/-/, "/"))
      // date2 = new Date(date2.replace(/-/, "/"))
      let delta = (date2 - date1) / (1000 * 60 * 60 * 24) + 1,
        weekEnds = 0
      for (let i = 0; i < delta; i++) {
        if (date1.getDay() == 0 || date1.getDay() == 6) {
          weekEnds++
        }
        date1 = date1.valueOf()
        date1 += 1000 * 60 * 60 * 24
        date1 = new Date(date1)
      }
      return weekEnds
    },
    // 建筑面积小于1000㎡，项目类型变更为“小型建筑”
    lessThan1000(value) {
      const eventTarget = event.target || event.srcElement
      if (!value) {
        eventTarget.parentNode.lastChild.innerText = '请填写建筑面积'
        eventTarget.parentNode.lastChild.style.display = 'block'
      } else if (value < 1000 && value > 0) {
        eventTarget.parentNode.lastChild.innerText = '建筑面积小于1000㎡，项目类型请选择“小型建筑”'
        eventTarget.parentNode.lastChild.style.display = 'block'
        setTimeout(() => {
          this.params.type = this.xiaoxingId
        }, 2000)
      } else {
        eventTarget.parentNode.lastChild.style.display = 'none'
      }
    },
    checkForm(event, value) {
      // 非空提示的显示与隐藏
      const eventTarget = event.target || event.srcElement
      if (eventTarget.parentNode.tagName === 'DIV') {
        eventTarget.parentNode.lastChild.style.display = value !== '' ? 'none' : 'block'
      } else if (eventTarget.parentNode.tagName === 'LABEL') {
        eventTarget.parentNode.parentNode.lastChild.style.display = value.length > 0 ? 'none' : 'block'
      }

      this.getFs()

      // 当勾选控制价时，默认勾选上工程量计算和清单编制
      // if (this.params.serviceContents.length === 1 && this.params.serviceContents.includes(this.kongzhijiaCid)) {
      //   this.params.serviceContents.push(this.gongchengliangCid, this.qingdanCid)
      // }
      // 当工程量计算未勾选时，清空清单编制和控制价的选中状态
      if (this.params.serviceContents.length === 2 && this.params.serviceContents.includes(this.qingdanCid) && this.params.serviceContents.includes(this.kongzhijiaCid)) {
        this.params.serviceContents = []
      }
      // 当选择单独地库或者小型建筑时，清空装饰装修工程的选中状态
      if (this.params.type === this.danduId || this.params.type === this.xiaoxingId) {
        let index = this.params.professionalTypes.indexOf(this.zhuangshiPid)
        if (index > -1) {
          this.params.professionalTypes.splice(index, 1)
        }
      }
    },
    // 发布项目
    calcTotalFeeAsk() {
      if (this.params.serviceContents.length === 0) return this.$message('请选择服务内容')
      if (this.qingdanbianzhizimulu && !this.params.inventoriesSubdirectory) return this.$message('请填写清单编制子目录')
      if (this.kongzhijiazimulu && !this.params.controlPriceSubdirectory) return this.$message('请填写控制价子目录')
      if (!this.params.type) return this.$message('请选择项目类型')
      if (this.jianzhumianji) {
        if (!/^\d+(\.\d{0,2})?$/.test(this.params.buildingArea)) return this.$message('请填写建筑面积，且最多包含两位小数')
        if (this.params.buildingArea <= 0) return this.$message('建筑面积不得小于0')
        if (this.params.buildingArea > 0 && this.params.buildingArea < 1000) return this.$message('建筑面积小于1000㎡，项目类型请选择“小型建筑”')
      }
      if (this.jianzhuloushu && !this.params.buildingFloorNumber) return this.$message('请填写建筑楼数')
      if (this.params.professionalTypes.length === 0) return this.$message('请选择专业类型')
      if (this.zhuangshizhuangxiuzimulu && this.params.decorationSubdirectories.length === 0) return this.$message('请选择装饰装修子目录')
      if (this.shineianzhuangzimulu && this.params.indoorInstallSubdirectories.length === 0) return this.$message('请选择室内安装子目录')
      if (this.shiwaipeitaozimulu && this.params.outdoorMatchingSubdirectories.length === 0) return this.$message('请选择室外配套子目录')
      if (this.zongzhandimianji) {
        if (this.params.totalArea === '') return this.$message('请填写总占地面积')
        if (this.params.totalArea <= 0) return this.$message('总占地面积不得小于0')
      }
      if (this.gangjiegou) {
        if (this.params.steelStructureNumber === '') return this.$message('请填写钢结构')
        if (this.params.steelStructureNumber <= 0) return this.$message('钢结构不得小于0')
      }
      if (!this.params.provideCad) return this.$message('请选择是否有CAD图纸')
      if (!this.params.monomerEntrust) return this.$message('请选择单体委托')
      if (!this.params.deliveryDeadline) return this.$message('请选择交付截止日期')
      if (this.params.localeWork) {
        if (this.params.expectWorkDays % 1 !== 0) return this.$message('现场工作天数为大于0的整数')
      }

      // 当选中工程量计算时，清空清单编制子目录和控制价子目录的值
      if (this.gongchengliangjisuan) {
        this.params.inventoriesSubdirectory = ''
        this.params.controlPriceSubdirectory = ''
      }
      if (!this.qingdanbianzhizimulu) {
        this.params.inventoriesSubdirectory = ''
      }
      if (!this.kongzhijiazimulu) {
        this.params.controlPriceSubdirectory = ''
      }

      // 项目类型的选择，建筑楼数和建筑面积值切换
      if (this.jianzhumianji) {
        this.params.buildingFloorNumber = ''
      }
      if (this.jianzhuloushu) {
        this.params.buildingArea = ''
      }

      // 未选中时，清空其下子目录的值
      if (!this.zhuangshizhuangxiuzimulu) {
        this.params.decorationSubdirectories = []
      }
      if (!this.shineianzhuangzimulu) {
        this.params.indoorInstallSubdirectories = []
      }
      if (!this.shiwaipeitaozimulu) {
        this.params.outdoorMatchingSubdirectories = []
        this.params.totalArea = ''
      }
      // 土建子目录
      if (this.params.professionalTypes.includes(this.tujianPid)) {
        this.params.civilSubdirectory = '98924f5238ec4c6ea8c4556bc6c2988e'
      } else {
        this.params.civilSubdirectory = ''
      }
      // 土方及地基工程子目录
      if (this.params.professionalTypes.includes(this.tufangdijiPid)) {
        this.params.earthworkSubdirectory = '8a201624f274461a9bb423f1d94df518'
      } else {
        this.params.earthworkSubdirectory = ''
      }
      // 钢筋子目录
      if (this.params.professionalTypes.includes(this.gangjinPid)) {
        this.params.steelBarSubdirectory = '964cf2c83fed41a8828df355871f46c5'
      } else {
        this.params.steelBarSubdirectory = ''
      }

      // 包含钢结构，不包含工程量计算，钢结构赋值0
      if (!this.gangjiegou) {
        this.params.steelStructureNumber = 0
      }
      // 包含室外配套工程，不包含工程量计算，总占地面积赋值0
      if (!this.zongzhandimianji) {
        this.params.totalArea = 0
      }

      // 现场工作为否时，天数赋值0
      if (!this.params.localeWork) {
        this.params.expectWorkDays = 0
      }

      // 是否提供CAD图纸
      if (this.params.provideCad === '340ecfb90d3d4c4fa2267391ddd51fcb') {
        this.params.cad = true
      } else if (this.params.provideCad === '8a2aede8f973428bab5298d94d8d62c2') {
        this.params.cad = false
      }

      // 勾选钢结构时，文昌计价需要的钢结构子目录id
      if (this.params.professionalTypes.includes(this.gangjiegouPid)) {
        this.params.steelStructId = '8af8a6ea76814f34b9f37838bde92e2e'
      } else {
        this.params.steelStructId = ''
      }

      // 服务内容标识及子目录
      if (this.params.serviceContents.length === 1) {
        if (this.qingdanbianzhizimulu) {
          this.params.serviceContentSubdirectory = this.qingdanCid
          this.params.serviceContentFlag = 'A'
        } else if (this.kongzhijiazimulu) {
          this.params.serviceContentSubdirectory = this.kongzhijiaCid
          this.params.serviceContentFlag = 'B'
        } else if (this.gongchengliangjisuan) {
          this.params.serviceContentSubdirectory = this.gongchengliangCid
          this.params.serviceContentFlag = ''
        }
      } else if (this.params.serviceContents.length === 2) {
        this.params.serviceContentFlag = ''
        if (this.params.serviceContents.includes(this.qingdanCid) && this.gongchengliangjisuan) {
          // 工程量计算+清单编制
          this.params.serviceContentSubdirectory = '12e13efeff134ca8888739afc95e1eb8'
        } else if (this.params.serviceContents.includes(this.kongzhijiaCid) && this.gongchengliangjisuan) {
          // 工程量计算+控制价
          this.params.serviceContentSubdirectory = '79a5cb7b63f847d095dd3f622d382830'
        }
      } else if (this.params.serviceContents.length === 3) {
        this.params.serviceContentFlag = ''
        // 工程量计算+清单编制+控制价
        this.params.serviceContentSubdirectory = '1a68ec8c3159413c904f679beb2888f5'
      }
      api
        .calcTotalFeeAsk(this.params)
        .then(res => {
          this.baseFee = res.data.baseFee
          this.civilPartFee = res.data.civilPartFee
          this.installPartFee = res.data.installPartFee
          this.totalMoney = (Number(res.data.baseFee.baseMoneyFormat) + Number(res.data.civilPartFee.discountAskFormat) + Number(res.data.installPartFee.discountAskFormat)).toFixed(2)
        })
        .catch(res => {
          this.$message.error(res.errorMsg)
        })
    }
  },
  mounted() {
    if (!window.localStorage.QingjuAccount) return this.$router.push('/login')
    // 获取项目类型
    api.getAllStructType().then(res => {
      this.allStructTypeList = res.dataList
      this.params.type = res.dataList[0].id
    })
    // 获取专业类型
    api.getAllProj().then(res => {
      // 隐藏"土方及地基工程"
      this.allProjList = res.dataList.filter(item => item.pid !== this.tufangdijiPid)
    })
    // 获取室内安装/装饰装修子目录
    api.getAllSubProj().then(res => {
      this.allSubProjList = res.dataList.filter(item => item.subProjName !== '供暖工程')
    })
    // 获取发布项目列表系数
    api.getAllCoefficient().then(res => (this.allCoefficientList = res.dataList))
  }
}
</script>
<style lang="less" scoped>
.content {
  .container {
    > div {
      margin-bottom: 20px;
      &:first-child {
        float: left;
        box-sizing: border-box;
        width: 866px;
        padding: 0 15px 60px;
        background-color: #fff;
        > h5 {
          border-bottom: 1px solid #eee;
          padding: 20px 0;
        }
        #release {
          margin-top: 60px;
          > div {
            margin-bottom: 30px;
            > label {
              float: left;
              font-size: 14px;
              width: 140px;
              text-align: right;
              margin-top: 5px;
            }
            > label + div {
              font-size: 13px;
              margin-left: 170px;
              > label {
                line-height: 30px;
                margin-right: 18px;
              }
              > p {
                font-size: 12px;
                &.tips {
                  display: none;
                  margin-top: 3px;
                  position: absolute;
                  color: #ff0000;
                }
              }
            }
          }
        }
      }
      &:last-child {
        width: 329px;
        background-color: #fff;
        font-size: 14px;
        box-shadow: 1px 1px 4px 0px #ddd;
        position: sticky;
        top: 181px;
        > dl {
          padding: 15px 25px;
          line-height: 30px;
          dt {
            margin-left: -10px;
            > span {
              color: #fff;
              padding: 3px 9px;
              border-radius: 3px;
            }
          }
          dd {
            display: flex;
            justify-content: space-between;
            > p {
              color: #666;
              font-style: italic;
              font-size: 12px;
            }
          }
          & + dl {
            border-top: 1px dashed #ddd;
          }
          &:nth-child(1) {
            > dt {
              > span {
                background-color: #e0972a;
              }
            }
          }
          &:nth-child(2) {
            > dt {
              > span {
                background-color: #e92634;
              }
            }
          }
        }
      }
    }
  }
}
input[type='text'],
input[type='number'],
select,
textarea {
  border: 1px solid #aaa;
}
input[type='text'],
input[type='number'],
select {
  box-sizing: border-box;
  width: 400px;
  height: 35px;
  padding-left: 10px;
}
input[type='text'].short,
input[type='number'].short {
  width: 200px;
}
.spot {
  > label {
    float: left;
    width: 33px;
    height: 33px;
    text-align: center;
    margin-right: 0 !important;
    border: 1px solid #aaa;
  }
  > input {
    float: left;
    width: 366px !important;
    margin-left: -1px;
  }
}
input[type='checkbox']:disabled + span {
  color: #adabab;
}
.project-type {
  input[type='radio'] + span {
    float: left;
    height: 30px;
    padding: 0 10px;
  }
  input[type='radio']:checked + span {
    background-color: #cacaca;
  }
}
</style>
<style>
.el-input__inner {
  border-radius: unset;
  height: 35px;
  border: 1px solid #aaa;
}
</style>
