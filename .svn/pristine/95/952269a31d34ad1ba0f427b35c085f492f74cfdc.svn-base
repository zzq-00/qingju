<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color: #F8F9FA;"></breadcrumb>
    <div class="content" v-if="operate">
      <div class="container clearfix">
        <div>
          <h5>发布项目</h5>
          <div id="release">
            <div>
              <label class="require">项目名称</label>
              <div>
                <input type="text" v-model.trim="params.name" @blur="checkForm($event, params.name)">
                <p class="tips">请填写您的项目名称</p>
              </div>
            </div>
            <div>
              <label class="require">工作模式</label>
              <div>
                <label v-for="(item,index) in operatingModeList" :key="index">
                  <input type="radio" name="operatingMode" :value="item.value" v-model="params.operatingMode" @change="selOperatingMode(params.operatingMode)">
                  <span>{{item.name}}</span>
                </label>
              </div>
            </div>
            <div>
              <label class="require">服务内容</label>
              <div>
                <template v-if="params.operatingMode==='1'">
                  <label v-for="(item,index) in allCoefficientList" :key="index" v-if="item.type==='1'&&item.content.length<6">
                    <input type="checkbox" :disabled="(params.serviceContents.length===1&&
                      (item.cid===kongzhijiaCid&&params.serviceContents.includes(qingdanCid)
                      || item.cid===qingdanCid&&params.serviceContents.includes(kongzhijiaCid)
                      ))" :value="item.cid" v-model="params.serviceContents" @change="checkForm($event, params.serviceContents)">
                    <span>{{item.content}}</span>
                  </label>
                </template>
                <template v-else>
                  <label v-for="(item,index) in allCoefficientList" :key="index" v-if="item.type==='1'&&item.content.length<6">
                    <input type="checkbox" :disabled="item.cid===kongzhijiaCid || item.cid===qingdanCid" :value="item.cid" v-model="params.serviceContents" @change="checkForm($event, params.serviceContents)">
                    <span>{{item.content}}</span>
                  </label>
                </template>
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
              <label class="require">建筑类型</label>
              <div>
                <template v-if="params.operatingMode==='1'">
                  <label v-for="(item,index) in allStructTypeList" :key="index">
                    <input style="display: none;" type="radio" :value="item.id" v-model="params.type" @change="checkForm($event, params.type)">
                    <span>{{item.typeName}}</span>
                  </label>
                </template>
                <template v-else>
                  <label v-for="(item,index) in allStructTypeListFilter" :key="index">
                    <input style="display: none;" type="radio" :value="item.id" v-model="params.type" @change="checkForm($event, params.type)">
                    <span>{{item.typeName}}</span>
                  </label>
                </template>
                <label style="display: inline-block;">
                  <span>其他：</span>
                  <input type="text" class="other-type" v-model.trim="params.typeOther" @focus="params.type=''">
                </label>
                <p class="tips">请选择建筑类型</p>
              </div>
            </div>
            <template v-if="params.operatingMode==='1'">
              <div v-if="jianzhumianji">
                <label class="require">建筑面积</label>
                <div>
                  <input type="number" min="0" v-model.trim="params.buildingArea" @blur="lessThan1000($event, params.buildingArea)"> ㎡
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
            </template>
            <template v-else>
              <div>
                <label class="require">建筑面积</label>
                <div>
                  <input type="number" min="0" v-model.trim="params.buildingArea" @blur="lessThan5000($event, params.buildingArea)"> ㎡
                  <p class="tips">请填写建筑面积</p>
                </div>
              </div>
              <div>
                <label class="require">单体个数</label>
                <div>
                  <input type="number" min="0" v-model="params.monomerNumber" @blur="checkForm($event, params.monomerNumber)">
                  <p class="tips">请填写单体个数</p>
                </div>
              </div>
            </template>
            <div>
              <label class="require">专业类型</label>
              <div>
                <template v-if="params.operatingMode==='1'">
                  <label v-for="(item,index) in allProjList" :key="index">
                    <input type="checkbox" :disabled="item.pid===zhuangshiPid&&(params.type===xiaoxingId||params.type===danduId)" v-model="params.professionalTypes" :value="item.pid" @change="checkForm($event, params.professionalTypes)">
                    <span>{{item.projName}}</span>
                  </label>
                </template>
                <template v-else>
                  <label v-for="(item,index) in allProjListFilter" :key="index">
                    <input type="checkbox" :disabled="item.disabled" v-model="params.professionalTypes" :value="item.pid" @change="checkForm($event, params.professionalTypes)">
                    <span>{{item.projName}}</span>
                  </label>
                </template>
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
            <div v-if="params.operatingMode==='1'">
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
                  <option v-for="(item,index) in allCoefficientList" :key="index" v-if="item.type==='3'" :disabled="params.operatingMode==='2'&&item.cid!=='e9128ef02ae84374ae5ade4fa1698d07'" :value="item.cid">{{item.content}}</option>
                </select>
                <p class="tips">请选择委托范围</p>
              </div>
            </div>
            <div>
              <label class="require">交付截止日期</label>
              <div>
                <el-tooltip class="item" content="交付日期越长，优惠越大哦，最高优惠8折" placement="right">
                  <el-date-picker style="width:400px;" v-model="params.deliveryDeadline" type="date" :editable=false :picker-options="pickerOptions">
                  </el-date-picker>
                </el-tooltip>
                <p class="tips">请选择交付截止日期</p>
              </div>
            </div>
            <div v-if="params.operatingMode==='1'">
              <label>是否需要现场工作(天)</label>
              <div class="spot clearfix">
                <label>
                  <input type="checkbox" v-model="params.localeWork">
                </label>
                <input type="number" min="0" :disabled="!params.localeWork" placeholder="全体人员现场工作天数之和" v-model.trim="params.expectWorkDays">
              </div>
            </div>
            <div>
              <label class="require">项目地址</label>
              <div>
                <el-cascader v-model="selectedAddressOptions" expand-trigger="hover" :options="addressOptions" :props="addressProps" @active-item-change="handleItemChange" style="line-height: 35px;width: 400px;"></el-cascader>
              </div>
            </div>
            <div>
              <label class="require">联系电话</label>
              <div>
                <input type="text" v-model.trim="params.mobile" @blur="checkForm($event, params.mobile)">
                <p class="tips">请填写您的联系电话</p>
              </div>
            </div>
            <div>
              <label class="require">附件</label>
              <el-upload name="file" :file-list="fileArray" with-credentials multiple :action="httpHead+'FastDFS/fastDFSupload'" :on-success="handleSuccess" :on-error="handleError" :on-remove="handleRemove">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">提示：确认上传的图纸为最终版本，若修改图纸版本会导致产生额外费用</div>
              </el-upload>
            </div>
            <div>
              <label>项目描述</label>
              <div>
                <textarea v-model.trim="params.description" maxlength="200" rows="7" placeholder="关键要求要明确，针对项目的特殊要求、图纸注意事项、变更说明、软件选择、业务类型、计算模式、规则选用、计算范围、划分要求、软件选择等，可逐条列出"></textarea>
              </div>
            </div>
            <!-- 1:企业下用户 0：企业用户  2：普通用户 '': 老用户-普通普通-->
            <div v-if="!$store.state.userInfo.userCategoryCode || $store.state.userInfo.userCategoryCode === '2'">
              <label>邀请码</label>
              <div>
                <input type="text" v-model.trim="params.friendInvitationCode" ref="friendCodeRef" @input="friendInvitationCodeInput" placeholder="请填写“青友”的邀请码，没有可不填">
              </div>
            </div>
            <div style="margin: -24px 0 0;">
              <label></label>
              <div>
                <input type="checkbox" v-model="agreeQualityAppeal">
                我已阅读并同意<i style="color: #2dbe7f;cursor: pointer;" @click="$store.commit('changeAppealAgreement', true)">《青矩互联工程计量成果质量评定标准及考核细则》</i>
              </div>
            </div>
            <div>
              <label></label>
              <div>
                <el-button type="primary" size="small" style="padding: 9px 25px;" @click="publish">发布项目</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div v-if='params.operatingMode === "1"'>
            <h4>发布项目说明</h4>
            <p>一、说明及解释
              <br> 1、居住建筑包括住宅、宿舍、公寓等，公共建筑包括办公、商业、学校、医院、酒店等；
              <br> 2、除别墅、小型建筑外，单体建筑小于5000㎡的按5000㎡计费；
              <br> 3、主体建筑结构相同的项目按单栋计算，其中基础及附属结构相同的每增加一栋按整栋的10%计算，基础及附属结构不同的每增加一栋按整栋20%计算；本条适用于单独地下室包含两个及以上单体建筑的基础及附属结构的情况；
              <br> 4、结构工程包括主体结构和二次结构，含钢筋混凝土、砌体及门窗；
              <br> 5、工程计量成果文件包括编制说明、工程量汇总表、广联达算量模型；
              <br> 6、结构工程计量不含钢结构工程，如委托范围包含钢结构计量，基准单价为3.0元/吨；
              <br> 7、建筑工程计量包含建筑图纸装修做法表的一般装饰装修工程，如单独设计的装修图纸执行装饰装修工程相应标准另外计费；
              <br> 8、豪华装修指按四星级以上酒店装修标准设计的工程；
              <br> 9、不能用软件建模算量的外立面装修工程参照幕墙工程计费；
              <br> 10、消防工程指室内消火栓系统、消防喷淋系统、火灾自动报警系统等；
              <br> 11、智能化工程指综合布线系统、安全技术防范系统、建筑设备监控系统等；
              <br> 12、室外设施指道路、广场、停车场、场地硬化、边坡支护等；
              <br> 13、附属建筑指车棚、围墙、大门、挡土墙等；
              <br> 14、小型建筑指建筑面积小于1000㎡的工程。
              <br>二、收费标准未涉及的建筑类型及工程类别，另行协商确定。
              <br>三、本收费标准自发布起试行，解释权归青矩互联。
              <br></p>
          </div>
          <div v-else>
            <h4>发布项目说明</h4>
            <p>一、适用范围：
              <br>1、建筑类型：仅限住宅、宿舍、公寓等居住建筑及办公、商业、学校、医院、酒店等公共建筑，暂不支持错层结构及单独地库。
              <br>2、结构形式：框架或剪力墙结构，不支持算量软件不能建模的异型结构造型。
              <br>3、只接受单体建筑整体委托。
              <br>二、图纸标准：
              <br>1、图纸格式：CAD电子版。
              <br>2、图纸深度：不缺张少页，节点详图完整，结构边线、尺寸标注清晰明了。
              <br>3、图纸版本：不支持多版本局部混搭及未体现在图纸中的设计变更。
              <br>三、收费标准
              <br>1、小青结构智能建模收费严格按照平台收费标准执行。活动期间，将按照平台优惠活动价为准。
              <br>2、建筑面积计算规则执行《建筑工程建筑面积计算规范 GB/T 50353-2013》。
              <br>3、考虑委托范围系数、工期调整系数及青矩指数。
              <br>4、单体建筑小于5000㎡的按5000㎡计费。
              <br>四、成果交付标准：
              <br>1、成果文件包括编制说明、工程量汇总表、广联达算量模型。
              <br>2、工程量范围包括主体结构和二次结构，含钢筋、钢筋混凝土、砌体及门窗。
              <br>五、其他说明
              <br>1、结构智能建模不享受平台轻松付功能。
              <br>2、不适用结构智能建模的建筑类型，我们仍采用标准化算量模式实施，执行平台收费标准。
              <br>3、具体适用范围及图纸标准由平台管理员判别。
              <br>4、最终解释权归青矩互联。
            </p>
          </div>
        </div>
      </div>
    </div>
    <no-auth v-else></no-auth>
    <span class="J-operate" v-has="['6iwhI8']"></span>
  </div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
import noAuth from '@/components/noAuth'

export default {
  components: {
    breadcrumb,
    noAuth
  },
  data() {
    return {
      agreeQualityAppeal: false,
      codeLength: 6,
      operate: false,
      breadcrumbs: [{ name: '发布项目', path: this.$route.fullPath }],
      httpHead: process.env.API_ROOT,
      pickerOptions: {
        disabledDate: time => {
          let date = new Date()
          if (date.getDay() == 0) {
            return time.getTime() < new Date(date.setTime(date.getTime() + 24 * 60 * 60 * 1000))
          } else if (date.getDay() == 6) {
            return time.getTime() < new Date(date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * 2))
          } else {
            return time.getTime() < new Date()
          }
        }
      },
      addressOptions: [],
      addressProps: {
        value: 'code',
        label: 'name',
        children: 'cities'
      },
      operatingModeList: [{ name: '人工作业', value: '1' }, { name: '智能作业', value: '2' }],
      selectedAddressOptions: [],
      allProjList: [],
      allProjListFilter: [],
      allSubProjList: [],
      allCoefficientList: [],
      allStructTypeList: [],
      allStructTypeListFilter: [],
      gongchengliangCid: '4df0530c784e4a7ebeb34c41c059fb87',
      qingdanCid: '843794e4ba9e438985670370520eb2bc',
      kongzhijiaCid: 'a478806d57dd4066bde1ad21c84af1e2',
      putongId: '2903ebdf5a0e4a36b3b1e7dbb16e9f68',
      bieshuId: '31c68e1f6c764f2195527a0b947d5299',
      xiaoxingId: '6a07944aea0a4580bf789b0ff0c99eb6',
      danduId: 'e3a721c315d84d208bfa387f5518b8ac',
      jiegouPid: 'f5dbb1c1ce8a4c5fa6085b73666a721e',
      jianzhuPid: '524fec0555c34e6e9f0b168ee0da5ec0',
      shineiPid: '2f6298c0f22b4805aeedca2e0f82ccaa',
      zhuangshiPid: '04d1664e3b21405f8cc7656b8eac72df',
      tufangdijiPid: '46dca9ee825043a1a068f856ee537c4b',
      tujianPid: '524fec0555c34e6e9f0b168ee0da5ec0', // "建筑工程"
      gangjiegouPid: 'bfa2495de068480bbd8149018ebd9e09',
      shiwaiPid: '9a2e7e1b3c3d4b35ac36e684a0aab40d',
      gangjinPid: 'f5dbb1c1ce8a4c5fa6085b73666a721e', // "结构工程"
      jingzhuangxiuId: 'e3f97d6c83b54e9fa49bf2f25d80ecce',
      haohuazhuangxiuId: '56befb7cf04244dc893e9760a1efe230',
      fileArray: [],
      friendInvite: false, // 是否有效
      friendLoading: false, //  正在被校验
      params: {
        buildingArea: '',
        buildingFloorNumber: '',
        changePackageValue: 'ad9dbc59b50e46d18aca4e85a9dbf475', // 是否购买20%变更套餐，默认传否
        cad: true,
        city: '',
        civilSubdirectory: '',
        controlPriceSubdirectory: '',
        decorationSubdirectories: ['4ddddbae42fd4515a51107adb81223db', 'e3f97d6c83b54e9fa49bf2f25d80ecce'],
        deliveryDeadline: '',
        description: '',
        district: '',
        earthworkSubdirectory: '',
        expectWorkDays: 0,
        fileIds: [],
        friendInvitationCode: '', // 邀请码
        indoorInstallSubdirectories: [
          '3c5dcbe56048440da7116af3ce4a025f',
          '10b5b8726e7946d79c01d4b5484e1dee',
          '41597416f64c45fa9748e90b1a2b08d2',
          '54d048d5476d40809a38335f11863124',
          '72f95d04524d407796e2acd512f01212'
        ],
        inventoriesSubdirectory: '',
        localeWork: false,
        mobile: '',
        monomerNumber: '',
        monomerEntrust: 'e9128ef02ae84374ae5ade4fa1698d07', // 整体工程委托
        name: '',
        operatingMode: '1', // 1：标准化作业  2：智能化作业
        outdoorMatchingSubdirectories: [
          '2acaf9d0e27e4889a611fd6f74299a8f',
          '4064e3a8f5b1445b836fb4e20fccc8a5',
          '44f9f01fe6a642a093463ad0198d750e',
          'b3e1f9ae6fdc4fa7aee8b25d10b0f2a1',
          'd531e204bd2d4825aa093c62ad8b0f1a',
          '44f9f01fe6a642a093463ad0198d750r',
          '44f9f01fe6a642a093463ad0198d750o'
        ],
        professionalTypes: [],
        provideCad: '340ecfb90d3d4c4fa2267391ddd51fcb',
        province: '',
        serviceContentFlag: '',
        serviceContentSubdirectory: '',
        serviceContents: [],
        steelBarSubdirectory: '',
        steelStructId: '',
        steelStructureNumber: 0,
        totalArea: 0,
        type: '',
        typeOther: ''
      },
      locked: false
    }
  },
  computed: {
    // 子目录的显示与隐藏
    gongchengliangjisuan: function() {
      return this.params.serviceContents.includes(this.gongchengliangCid)
    },
    qingdanbianzhizimulu: function() {
      return (
        this.params.serviceContents.includes(this.qingdanCid) && !this.params.serviceContents.includes(this.gongchengliangCid)
      )
    },
    kongzhijiazimulu: function() {
      return (
        this.params.serviceContents.includes(this.kongzhijiaCid) && !this.params.serviceContents.includes(this.gongchengliangCid)
      )
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
      return (
        this.params.professionalTypes.includes(this.gangjiegouPid) && this.params.serviceContents.includes(this.gongchengliangCid)
      )
    },
    zongzhandimianji: function() {
      return (
        this.params.professionalTypes.includes(this.shiwaiPid) && this.params.serviceContents.includes(this.gongchengliangCid)
      )
    },
    shiwaipeitaozimulu: function() {
      return this.params.professionalTypes.includes(this.shiwaiPid)
    }
  },
  methods: {
    // 切换标准化作业和智能化作业
    selOperatingMode(val) {
      this.params.serviceContents = []
      this.params.type = this.allStructTypeListFilter[0].id
      this.params.monomerNumber = ''
      this.params.professionalTypes = []
      if (val === '2') {
        this.params.provideCad === '340ecfb90d3d4c4fa2267391ddd51fcb'
        this.params.monomerEntrust === 'e9128ef02ae84374ae5ade4fa1698d07'
        this.params.localeWork = false
      }
    },
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
        this.Fs = new Date(this.GetDateStr(Math.ceil(expectedDays / 3)))
        this.params.deliveryDeadline = new Date(this.GetDateStr(Number(res.data)))
      })
    },
    // 省市区联动懒加载
    handleItemChange(valArray) {
      this.addressOptions.forEach(item => {
        if (valArray.length === 1 && item.code === valArray[0] && !item.cities.length) {
          api.city(valArray[0]).then(res => {
            res.dataList.forEach(ele => (ele.cities = []))
            item.cities = res.dataList
          })
        } else if (valArray.length === 2) {
          item.cities.forEach(ele => {
            if (ele.code === valArray[1] && !ele.cities.length) {
              api.district(valArray[1]).then(res => (ele.cities = res.dataList))
            }
          })
        }
      })
    },
    // 省份
    province() {
      api.province().then(res => {
        res.dataList.forEach(item => (item.cities = []))
        this.addressOptions = res.dataList
      })
    },
    // 获取建筑类型
    getAllStructType() {
      api.getAllStructType().then(res => {
        this.allStructTypeList = res.dataList
        this.allStructTypeListFilter = res.dataList.filter(element => {
          return element.id != this.bieshuId && element.id != this.xiaoxingId && element.id != this.danduId
        })
        this.params.type = res.dataList[0].id
      })
    },
    // 获取专业类型
    getAllProj() {
      api.getAllProj().then(res => {
        // 隐藏"土方及地基工程"
        this.allProjList = res.dataList.filter(item => item.pid !== this.tufangdijiPid)
        this.allProjList.forEach(element => {
          element.disabled =
            element.pid === this.zhuangshiPid || element.pid === this.gangjiegouPid || element.pid === this.shiwaiPid
        })
        this.allProjListFilter = this.allProjList
      })
    },
    // 获取室内安装/装饰装修子目录
    getAllSubProj() {
      api.getAllSubProj().then(res => {
        // 隐藏"供暖工程"
        this.allSubProjList = res.dataList.filter(item => item.subProjName !== '供暖工程')
      })
    },
    // 获取发布项目列表系数
    getAllCoefficient() {
      api.getAllCoefficient().then(res => (this.allCoefficientList = res.dataList))
    },
    handleSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.params.fileIds.push(res.dataList[0].id)
      } else {
        this.$message.error({ message: res.errorMsg })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleRemove(file, fileList) {
      let id = file.response ? file.response.dataList[0].id : file.id
      let index = this.params.fileIds.indexOf(id)
      if (index > -1) this.params.fileIds.splice(index, 1)
    },
    // 人工作业 建筑面积小于1000㎡，建筑类型变更为“小型建筑”
    lessThan1000(event, value) {
      const eventTarget = event.target || event.srcElement
      if (!value) {
        eventTarget.parentNode.lastChild.innerText = '请填写建筑面积'
        eventTarget.parentNode.lastChild.style.display = 'block'
      } else if (value < 1000 && value > 0) {
        eventTarget.parentNode.lastChild.innerText = '建筑面积小于1000㎡，建筑类型请选择“小型建筑”'
        eventTarget.parentNode.lastChild.style.display = 'block'
        setTimeout(() => {
          this.params.type = this.xiaoxingId
        }, 2000)
      } else {
        eventTarget.parentNode.lastChild.style.display = 'none'
      }
    },
    // 智能作业 建筑面积小于5000㎡的提示
    lessThan5000(event, value) {
      const eventTarget = event.target || event.srcElement
      if (!value) {
        eventTarget.parentNode.lastChild.innerText = '请填写建筑面积'
        eventTarget.parentNode.lastChild.style.display = 'block'
      } else if (value < 5000 && value > 0) {
        eventTarget.parentNode.lastChild.innerText = '智能作业建筑面积不小于5000㎡'
        eventTarget.parentNode.lastChild.style.display = 'block'
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

      // 当工程量计算未勾选时，清空清单编制和控制价的选中状态
      if (
        !this.params.serviceContents.includes(this.gongchengliangCid) &&
        this.params.serviceContents.includes(this.qingdanCid) &&
        this.params.serviceContents.includes(this.kongzhijiaCid)
      ) {
        this.params.serviceContents = []
      }
      // 当选择单独地库或者小型建筑时，清空装饰装修工程的选中状态
      if (this.params.type === this.danduId || this.params.type === this.xiaoxingId) {
        let index = this.params.professionalTypes.indexOf(this.zhuangshiPid)
        if (index > -1) this.params.professionalTypes.splice(index, 1)
      }
    },
    // 发布项目
    publish() {
      // 防止重复点击
      if (this.locked) return false
      // 表单验证
      if (!this.params.name) return this.$message('请填写您的项目名称')
      if (this.params.serviceContents.length === 0) return this.$message('请选择服务内容')
      if (this.qingdanbianzhizimulu && !/^[0-9]+$/.test(this.params.inventoriesSubdirectory))
        return this.$message('请填写清单编制子目录（正整数）')
      if (this.kongzhijiazimulu && !/^[0-9]+$/.test(this.params.controlPriceSubdirectory))
        return this.$message('请填写控制价子目录（正整数）')
      if (!this.params.type && !this.params.typeOther) return this.$message('请选择建筑类型')
      if (this.jianzhumianji) {
        if (!/^\d+(\.\d{0,2})?$/.test(this.params.buildingArea)) return this.$message('请填写建筑面积，且最多包含两位小数')
        if (this.params.buildingArea <= 0) return this.$message('建筑面积不得小于0')
        if (this.params.buildingArea > 0 && this.params.buildingArea < 1000)
          return this.$message('建筑面积小于1000㎡，建筑类型请选择“小型建筑”')
      }
      if (this.params.operatingMode === '2' && this.params.buildingArea < 5000)
        return this.$message('智能作业建筑面积不小于5000㎡')
      if (this.params.operatingMode === '2' && !/^[0-9]+$/.test(this.params.monomerNumber))
        return this.$message('请填写单体个数（正整数）')
      if (this.jianzhuloushu && !/^[0-9]+$/.test(this.params.buildingFloorNumber))
        return this.$message('请填写建筑楼数（正整数）')
      if (this.params.professionalTypes.length === 0) return this.$message('请选择专业类型')
      if (this.zhuangshizhuangxiuzimulu && this.params.decorationSubdirectories.length === 0)
        return this.$message('请选择装饰装修子目录')
      if (this.shineianzhuangzimulu && this.params.indoorInstallSubdirectories.length === 0)
        return this.$message('请选择室内安装子目录')
      if (this.shiwaipeitaozimulu && this.params.outdoorMatchingSubdirectories.length === 0)
        return this.$message('请选择室外配套子目录')
      if (this.zongzhandimianji) {
        if (!/^\d+(\.\d{0,2})?$/.test(this.params.totalArea)) return this.$message('请填写总占地面积，且最多包含两位小数')
        if (this.params.totalArea <= 0) return this.$message('总占地面积不得小于0')
      }
      if (this.gangjiegou) {
        if (!/^\d+(\.\d{0,2})?$/.test(this.params.steelStructureNumber)) return this.$message('请填写钢结构，且最多包含两位小数')
        if (this.params.steelStructureNumber <= 0) return this.$message('钢结构不得小于0')
      }
      if (!this.params.provideCad) return this.$message('请选择是否有CAD图纸')
      if (!this.params.monomerEntrust) return this.$message('请选择单体委托')
      if (!this.params.deliveryDeadline) return this.$message('请选择交付截止日期')
      if (this.params.localeWork) {
        if (this.params.expectWorkDays % 1 !== 0) return this.$message('现场工作天数为大于0的整数')
      }
      if (this.selectedAddressOptions.length < 3) return this.$message('请选择项目地址')
      if (!/^1[345678]\d{9}$/.test(this.params.mobile)) return this.$message('请正确填写联系电话')
      if (this.params.fileIds.length === 0) return this.$message('请上传附件')
      if (this.params.description.length > 2500) return this.$message('项目描述不超2500字')
      if (
        this.params.friendInvitationCode &&
        this.params.friendInvitationCode.length &&
        this.params.friendInvitationCode.length < this.codeLength
      ) {
        return this.$message('请输入正确的邀请码')
      }
      if (this.params.friendInvitationCode && this.friendLoading) {
        return this.$message('邀请码校验中...')
      }
      if (
        !this.friendLoading &&
        this.params.friendInvitationCode &&
        this.params.friendInvitationCode.length &&
        !this.friendInvite
      ) {
        return '请输入正确的邀请码'
      }
      if (!this.agreeQualityAppeal) return this.$message('请阅读并同意《青矩互联工程计量成果质量评定标准及考核细则》')

      this.locked = true

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

      // 建筑类型的选择，建筑楼数和建筑面积值切换
      if (this.jianzhumianji) {
        this.params.buildingFloorNumber = ''
      }
      if (this.jianzhuloushu) {
        this.params.buildingArea = ''
      }
      // 当输入其他建筑类型时，清空所选择的建筑类型
      if (this.params.typeOther) this.params.type = ''

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
      this.params.civilSubdirectory = this.params.professionalTypes.includes(this.tujianPid)
        ? '98924f5238ec4c6ea8c4556bc6c2988e'
        : ''
      // 土方及地基工程子目录
      this.params.earthworkSubdirectory = this.params.professionalTypes.includes(this.tufangdijiPid)
        ? '8a201624f274461a9bb423f1d94df518'
        : ''
      // 钢筋子目录
      this.params.steelBarSubdirectory = this.params.professionalTypes.includes(this.gangjinPid)
        ? '964cf2c83fed41a8828df355871f46c5'
        : ''

      // 包含钢结构，不包含工程量计算，钢结构赋值0
      if (!this.gangjiegou) this.params.steelStructureNumber = 0
      // 包含室外配套工程，不包含工程量计算，总占地面积赋值0
      if (!this.zongzhandimianji) this.params.totalArea = 0
      // 现场工作为否时，天数赋值0
      if (!this.params.localeWork) this.params.expectWorkDays = 0

      // 是否提供CAD图纸
      if (this.params.provideCad === '340ecfb90d3d4c4fa2267391ddd51fcb') {
        this.params.cad = true
      } else if (this.params.provideCad === '8a2aede8f973428bab5298d94d8d62c2') {
        this.params.cad = false
      }

      // 勾选钢结构时，文昌计价需要的钢结构子目录id
      this.params.steelStructId = this.params.professionalTypes.includes(this.gangjiegouPid)
        ? '8af8a6ea76814f34b9f37838bde92e2e'
        : ''

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

      // 省市区的选择
      this.params.province = this.selectedAddressOptions[0]
      this.params.city = this.selectedAddressOptions[1]
      this.params.district = this.selectedAddressOptions[2]

      if (this.$route.query.flag === 'reuse') {
        this.params.projectBaseId = ''
      }
      api
        .publish(this.params)
        .then(res => {
          this.$message.success('发布成功')
          setTimeout(() => {
            this.$router.push('/myqingju/project')
          }, 2000)
        })
        .catch(res => {
          this.locked = false
          this.$message.error(res.errorMsg)
        })
    },
    friendInvitationCodeInput() {
      let code = this.params.friendInvitationCode
      this.friendLoading = true
      if (code.length == this.codeLength) {
        api
          .invitationCodeAndIsFriend(code)
          .then(res => {
            this.friendInvite = true
            this.$message.success('邀请码正确')
          })
          .catch(err => {
            this.friendInvite = false
            this.params.friendInvitationCode = ''
            this.$message.error(err.errorMsg)
          })
          .finally(() => {
            // 校验完成
            this.friendLoading = false
          })
      } else {
        this.friendLoading = false
      }
    }
  },
  mounted() {
    setTimeout(() => {
      if (!window.localStorage.QingjuAccount) return this.$router.push('/login')
    }, 0)
    if (this.$route.query.mode) this.params.operatingMode = this.$route.query.mode
    if (window.localStorage.QingjuTelePhone) this.params.mobile = JSON.parse(window.localStorage.QingjuTelePhone)
    this.getAllStructType()
    this.province()
    this.getAllProj()
    this.getAllSubProj()
    this.getAllCoefficient()
    // hack 操作的显示
    let dNoneoperate = document.getElementsByClassName('J-operate')[0]
    if (dNoneoperate && !dNoneoperate.style.display) {
      this.operate = true
    }
    if (window.sessionStorage.estimateContents) {
      this.params.serviceContents = window.sessionStorage.estimateContents.split(',')
    }
    // 重新编辑
    if (this.$route.query.reEditId) {
      api.getInformationAboutRejectedItems(this.$route.query.reEditId).then(res => {
        // if (res.status === '9') {
        this.params = res.dataList[0]
        if (this.params.friendInvitationCode) {
          this.friendInvitationCodeInput()
        }
        this.fileArray = res.dataList[0].file
        this.addressOptions.length &&
          this.addressOptions.forEach(item => {
            if (item.code === this.params.province) {
              api.city(this.params.province).then(res => {
                res.dataList.forEach(ele => {
                  if (ele.code === this.params.city) {
                    api.district(this.params.city).then(res => {
                      ele.cities = res.dataList
                      this.selectedAddressOptions = [this.params.province, this.params.city, this.params.district]
                    })
                  } else {
                    ele.cities = []
                  }
                })
                item.cities = res.dataList
              })
            }
          })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  .container {
    margin-bottom: 20px;
    > div {
      &:first-child {
        float: left;
        box-sizing: border-box;
        width: 800px;
        padding: 15px 15px 60px;
        background-color: #fff;
        > h5 {
          text-align: center;
        }
        #release {
          margin-top: 60px;
          > div {
            margin-bottom: 30px;
            min-height: 35px;
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
                margin-right: 20px;
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
        float: right;
        width: 380px;
        > div {
          background-color: #fff;
          margin-bottom: 20px;
          > h4 {
            color: #666;
            font-size: 18px;
            padding: 10px 30px;
            border-bottom: 1px dashed #d7d7d7;
          }
          > p {
            padding: 10px 30px;
            line-height: 28px;
            font-size: 14px;
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
textarea {
  width: 530px;
  padding: 5px 10px;
  &::placeholder {
    color: #c0c4cd;
    font-size: 14px;
  }
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
input[type='checkbox']:disabled + span {
  color: #adabab;
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
.project-type {
  input[type='radio'] + span {
    display: inline-block;
    height: 30px;
    padding: 0 10px;
    margin-bottom: 10px;
  }
  input[type='radio']:checked + span {
    background-color: #cacaca;
  }
  .other-type {
    width: 90px;
    height: 20px;
    border-top: 0 none;
    border-left: 0 none;
    border-right: 0 none;
  }
}
</style>
<style scoped>
#release >>> .el-input__inner {
  border-radius: unset;
  height: 35px;
  border: 1px solid #aaa;
}
</style>
