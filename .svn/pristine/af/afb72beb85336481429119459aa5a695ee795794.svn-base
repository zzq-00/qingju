<template>
  <div>
    <projectListheader />
    <breadcrumb :breadcrumbs="breadcrumbs" style="background-color:#f1f1f1;margin-top: 0;" />
    <div class="container">
      <!-- 项目状态 -->
      <div class="status clearfix">
        <div class="left fl">
          <span class="font12">项目编号:{{baseDto.projectNumber}}</span>
          <p>{{baseDto.statusName}}</p>
          <p v-if="amount">¥ {{amount | formatMoney}}</p>
          <button @click="payAmount" v-if="amount">去支付</button>
          <button @click="check" v-if="showCheck">确认验收</button>
          <button @click="evaluation" v-if="baseDto.status==7">{{evaluationOfState?'已评价':'评价'}}</button>
          <div>
            <span class="confirm" v-if="baseDto.status>=3&&baseDto.status<8" @click="dialogVisibleTrue('view')">{{ifSign?'查看合同':'签约合同'}}</span>
            <span class="download" v-if="baseDto.status>=3&&baseDto.status<8" @click="dialogVisibleTrue('download')" title="下载后，请盖章后寄送给我们">下载合同模板</span>
          </div>
        </div>
        <!-- 正常流程 -->
        <div class="right fl" v-if="baseDto.status<8">
          <div>
            <span class="font12" v-if="baseDto.status==1">感谢您使用青矩互联平台，我们会尽快审批该项目，请您耐心等候！</span>
            <span class="font12" v-if="baseDto.status==2">感谢您使用青矩互联平台，该项目已经审批通过，正在等待确认，请您耐心等候！</span>
            <span class="font12" v-if="baseDto.status==3">该项目会为您保留30个工作日，请尽快托管资金，感谢您使用青矩互联平台！</span>
            <span class="font12" v-if="baseDto.status==4">您已经付款成功，项目承接部门会马上开始工作，请您耐心等候！</span>
            <span class="font12" v-if="baseDto.status==5">您的项目已经开始工作，请您耐心等候！</span>
            <span class="font12" v-if="baseDto.status==6">您项目的成果文件已经提交，请您尽快验收！</span>
            <span class="font12" v-if="baseDto.status==7">恭喜您，您的项目已经完成交付。</span>
            <!-- <span class="font12" v-if="baseDto.status==3"><img src="@/assets/img/u774.png" alt="" style="vertical-align: bottom;"> 剩余时间：{{paymentCountdown}}</span> -->
            <!-- <span class="fr font12">日志</span> -->
          </div>
          <div class="step">
            <div style="color: #333;">
              <img src="@/assets/img/u262.png" alt="">
              <span>已发布</span>
              <span>{{baseDto.publishTime}}</span>
            </div>

            <img v-if="baseDto.status>1" src="@/assets/img/u667.png" alt="">
            <img v-else src="@/assets/img/u378.png" alt="">

            <div v-if="baseDto.status>=2" style="color: #333;">
              <img src="@/assets/img/u1996.png" alt="">
              <span>已审批</span>
              <span>{{baseDto.pendingTime}}</span>
            </div>
            <div v-else>
              <img src="@/assets/img/u263.png" alt="">
              <span>待审批</span>
            </div>

            <img v-if="baseDto.status>2" src="@/assets/img/u667.png" alt="">
            <img v-else-if="baseDto.status==2" src="@/assets/img/u378.png" alt="">
            <img v-else src="@/assets/img/u379.png" alt="">

            <div v-if="baseDto.status>=3" style="color: #333;">
              <img src="@/assets/img/u1997.png" alt="">
              <span>已确认</span>
              <span>{{baseDto.confirmTime}}</span>
            </div>
            <div v-else>
              <img src="@/assets/img/u264.png" alt="">
              <span>待确认</span>
            </div>

            <img v-if="baseDto.status>3" src="@/assets/img/u667.png" alt="">
            <img v-else-if="baseDto.status==3" src="@/assets/img/u378.png" alt="">
            <img v-else src="@/assets/img/u379.png" alt="">

            <div v-if="baseDto.status>=4" style="color: #333;">
              <img src="@/assets/img/u2131.png" alt="">
              <span>已托管</span>
              <span>{{baseDto.trusteeshipTime}}</span>
            </div>
            <div v-else>
              <img src="@/assets/img/u265.png" alt="">
              <span>待托管</span>
            </div>

            <img v-if="baseDto.status>5" src="@/assets/img/u667.png" alt="">
            <img v-else-if="baseDto.status==4 || baseDto.status==5" src="@/assets/img/u378.png" alt="">
            <img v-else src="@/assets/img/u379.png" alt="">

            <div v-if="baseDto.status>=6" style="color: #333;">
              <img src="@/assets/img/u2831.png" alt="">
              <span>已交付</span>
              <span>{{baseDto.deliveryTime}}</span>
            </div>
            <div v-else>
              <img src="@/assets/img/u383.png" alt="">
              <span>待交付</span>
            </div>

            <img v-if="baseDto.status>6" src="@/assets/img/u667.png" alt="">
            <img v-else-if="baseDto.status==6" src="@/assets/img/u378.png" alt="">
            <img v-else src="@/assets/img/u379.png" alt="">

            <div v-if="baseDto.status>=7" style="color: #333;">
              <img src="@/assets/img/u3073.png" alt="">
              <span>已完成</span>
              <span>{{baseDto.checkedTime}}</span>
            </div>
            <div v-else>
              <img src="@/assets/img/u384.png" alt="">
              <span>待完成</span>
            </div>
          </div>
        </div>
        <!-- 项目关闭的流程 -->
        <div class="right fl" v-else>
          <div>
            <span class="font12" v-if="activeClose">您取消了项目，感谢您使用青矩互联平台！</span>
            <span class="font12" v-else-if="baseDto.status==='8'">您的项目已被关闭，感谢您使用青矩互联！</span>
            <span class="font12" v-else-if="baseDto.status==='9'">您的项目暂时被驳回了，感谢您使用青矩互联！</span>
          </div>
          <div class="step" v-if="activeClose">
            <div>
              <img src="@/assets/img/u261.png" alt="">
              <span>提交申请</span>
              <span>{{baseDto.publishTime}}</span>
            </div>
            <img src="@/assets/img/u379.png" alt="">
            <div>
              <img src="@/assets/img/u263.png" alt="">
              <span>已审批</span>
              <span>{{baseDto.pendingTime}}</span>
            </div>
            <img src="@/assets/img/u379.png" alt="">
            <div>
              <img src="@/assets/img/u264.png" alt="">
              <span>已确认</span>
              <span>{{baseDto.confirmTime}}</span>
            </div>
            <img src="@/assets/img/u379.png" alt="">
            <div>
              <img src="@/assets/img/u3358.png" alt="">
              <span>取消支付</span>
              <span>{{baseDto.closeTime}}</span>
            </div>
            <img src="@/assets/img/u379.png" alt="">
            <div>
              <img src="@/assets/img/u3351.png" alt="">
              <span>已关闭</span>
              <span>{{baseDto.closeTime}}</span>
            </div>
          </div>
          <div class="step" v-else>
            <div>
              <img src="@/assets/img/u261.png" alt="">
              <span>提交申请</span>
              <span>{{baseDto.publishTime}}</span>
            </div>
            <template v-if="baseDto.status === '9'">
              <img src="@/assets/img/u379.png" alt="">
              <div>
                <img src="@/assets/img/u3358.png" alt="">
                <span>已驳回</span>
                <span>{{baseDto.closeTime}}</span>
              </div>
            </template>
            <template v-else>
              <img src="@/assets/img/u379.png" alt="">
              <div>
                <img src="@/assets/img/u3351.png" alt="">
                <span>已关闭</span>
                <span>{{baseDto.closeTime}}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 项目进度 -->
      <!-- <div class="project-info" v-if="baseDto.status>=5">
        <div>项目进度</div>
        <el-table :data="havePayBills" style="width: 100%">
          <el-table-column prop="name" label="条目">
          </el-table-column>
          <el-table-column label="项目负责人" width="180">
            <template slot-scope="scope">
              {{scope.row.amount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="180">
            <template slot-scope="scope">
              {{scope.row.principalAmount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="工作天数" width="180">
          </el-table-column>
        </el-table>
      </div> -->
      <!-- 成果文件 -->
      <div class="project-info" v-if="projectProcesses && projectProcesses.length>0 &&baseDto.status==='6'">
        <div>成果文件</div>
        <el-table :data="projectProcesses" style="width: 100%">
          <el-table-column prop="deliveryTime" label="交付时间" width="180">
          </el-table-column>
          <el-table-column label="交付文件">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.fileInfos" :key="index">
                <a :href="item.path" style="color:#77CE45;" target="_blank">{{item.name}}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
        </el-table>
      </div>
      <!-- 项目验收 -->
      <div class="project-info" v-if="showCheck">
        <div>项目验收</div>
        <div class="final-charge">
          <ul class="clearfix">
            <li>托管费用（元）：{{havePayAmount | formatMoney}}</li>
            <li>项目实际结算费用（元）：{{setupCost | formatMoney}}</li>
            <li>结余（元）：{{discountAmount | formatMoney}}</li>
            <li v-show="appealTheDifference">申诉差额：{{appealTheDifference | formatMoney}}</li>
          </ul>
        </div>
        <div class="price-calculation">
          <dl v-if="couponList.length > 0" v-has="['y1X637']">
            <dt @click="changeCouponSpread">
              <img :src="require('@/assets/img/jia.jpg')" v-if="!couponSpread">
              <img :src="require('@/assets/img/jian.jpg')" v-else> {{couponSpread?'使用优惠券':'查看可使用的优惠券'}}
            </dt>
            <dd v-show="couponSpread" v-for="(item,index) in couponList" :key="'00'+index">
              <label><input type="radio" name="coupon" :value="item.id" :disabled='!item.isUsable' v-model="checkParams.couponId">
                <span> {{item.couponName}}</span>
                <span style="color: #999;font-size:14px;margin-left: 5px;"> （到期时间：{{item.endDate}}）</span>
              </label>
            </dd>
          </dl>
          <ul>
            <li>
              <span>项目金额：</span>
              <b>¥ {{setupCost | formatMoney}}</b>
            </li>
            <li v-for="(item,index) in couponList" :key="'01'+index" v-if="checkParams.couponId === item.id">
              <span>优惠券：</span>
              <b>- ¥ {{item.subtractLimit}}</b>
            </li>
            <li v-for="(item,index) in couponList" :key="'02'+index" v-if="checkParams.couponId === item.id">
              <span>应付金额：</span>
              <b v-if="setupCost-item.subtractLimit >= 0">¥ {{(setupCost-item.subtractLimit).toFixed(2) | formatMoney}}</b>
              <b v-else>¥ 0.00</b>
            </li>
          </ul>
        </div>
        <div class="pay-button">
          <button class="pay" @click="check">确认验收</button>
        </div>
      </div>
      <!-- 待付款费用信息 -->
      <div class="project-info" v-if="notPayServiceBills && notPayServiceBills.length>0">
        <div>费用信息</div>
        <el-table :data="notPayServiceBills" style="width: 100%">
          <el-table-column prop="name" label="费用名称" width="180">
          </el-table-column>
          <el-table-column label="金额（元）" width="180">
            <template slot-scope="scope">
              {{scope.row.amount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="浮动（元）" width="180">
            <template slot-scope="scope">
              {{scope.row.discountAmount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="小计（元）" width="180">
            <template slot-scope="scope">
              {{scope.row.principalAmount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
        </el-table>
        <div class="exponent-price">
          <div>应托管金额：
            <b>¥ {{amount | formatMoney}}</b>
          </div>
          <!-- <ul class="clearfix">
            <li>发布当日指数：</li>
            <li>土建指数：{{civilEngineeringIndex}}，</li>
            <li>安装指数：{{installTheIndex}}</li>
            <li>钢筋指数：50.32</li>
          </ul> -->
        </div>
        <div class="pay-button">
          <button class="pay" @click="payAmount">去收银台支付</button>
          <button class="giveUp" @click="cancleProject">放弃</button>
        </div>
      </div>
      <!-- 待付款附加费明细 -->
      <div class="project-info" v-if="notPaySurcharges && notPaySurcharges.length>0">
        <div>附加费明细</div>
        <el-table :data="notPaySurcharges" style="width: 100%">
          <el-table-column prop="createTime" label="创建时间" width="200">
          </el-table-column>
          <el-table-column prop="feeType" label="费用类型" width="180">
          </el-table-column>
          <el-table-column prop="surchargeInfo" label="附加费信息">
          </el-table-column>
          <el-table-column label="费用金额" width="180">
            <template slot-scope="scope">
              {{scope.row.amount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="180">
          </el-table-column>
        </el-table>
        <div class="exponent-price">
          <div>支付金额：
            <b style="color:#FF0000;font-size:20px;">¥ {{amount | formatMoney}}</b>
          </div>
        </div>
        <div class="pay-button">
          <button class="pay" @click="payAmount">去收银台支付</button>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="project-info">
        <div>基本信息</div>
        <div class="info">
          <ul class="info-list">
            <li>
              <span>项目名称：</span>
              <span>{{baseDto.projectName}}</span>
            </li>
            <li>
              <span>项目地址：</span>
              <span>{{baseDto.location}}</span>
            </li>
            <li>
              <span>联系电话：</span>
              <span>{{baseDto.mobile}}</span>
            </li>
            <!-- <li>
              <span>是否购买变更套餐：</span>
              <span>{{baseDto.changePackageValue}}</span>
            </li> -->
            <li>
              <span>附件：</span>
              <span v-for="(item,index) in baseDto.files" :key="index" style="margin-right: 20px;">
                <a style="text-decoration: underline;color: #7BBC52;" :href="item.path" target="_blank">{{item.name}}</a>
              </span>
            </li>
            <li>
              <span>项目描述：</span>
              <span>{{baseDto.description}}</span>
            </li>
          </ul>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.professional" :name="item.professional" v-for="(item,index) in engineers" :key="index">
              <ul class="info-list">
                <li>
                  <span>建筑类型：</span>
                  <span v-if="item.type">{{item.type}}</span>
                  <span v-else>其他：{{item.typeOther}}</span>
                </li>
                <li>
                  <span>专业类型：</span>
                  <span>{{item.professionalType}}</span>
                </li>
                <li v-show="item.indoorInstallSubdirectory">
                  <span>室内安装子目录：</span>
                  <span>{{item.indoorInstallSubdirectory}}</span>
                </li>
                <li v-show="item.decorationSubdirectory">
                  <span>装饰装修子目录：</span>
                  <span>{{item.decorationSubdirectory}}</span>
                </li>
                <li v-show="item.outdoorMatchingSubdirectory">
                  <span>室外配套子目录：</span>
                  <span>{{item.outdoorMatchingSubdirectory}}</span>
                </li>
                <li>
                  <span>单体委托：</span>
                  <span>{{item.monomerEntrust}}</span>
                </li>
                <li>
                  <span>服务内容：</span>
                  <span>{{item.serviceContent}}</span>
                </li>
                <li v-show="item.inventoriesSubdirectory">
                  <span>清单编制子目录：</span>
                  <span>{{item.inventoriesSubdirectory}} 条</span>
                </li>
                <li v-show="item.controlPriceSubdirectory">
                  <span>控制价子目录：</span>
                  <span>{{item.controlPriceSubdirectory}} 条</span>
                </li>
                <li>
                  <span>交付截止日期：</span>
                  <span>{{item.deliveryDeadline}}</span>
                </li>
                <li v-show="item.workstationName">
                  <span>承做部分：</span>
                  <span>{{item.workstationName}}</span>
                </li>
                <li v-if="projectBaseType==='1'">
                  <span>是否提供CAD图纸：</span>
                  <span>{{item.provideCad}}</span>
                </li>
                <li v-if="projectBaseType==='1'">
                  <span>是否需要现场工作：</span>
                  <span>{{item.expectWorkDays}} 人日</span>
                </li>
                <li v-if="item.monomerNumber">
                  <span>单体个数：</span>
                  <span>{{item.monomerNumber}}</span>
                </li>
                <li v-if="item.buildingFloorNumber">
                  <span>建筑楼数：</span>
                  <span>{{item.buildingFloorNumber}} 栋</span>
                </li>
                <li v-if="item.buildingArea">
                  <span>建筑面积：</span>
                  <span>{{item.buildingArea}} ㎡</span>
                </li>
                <li v-if="item.steelStructureNumber">
                  <span>钢结构：</span>
                  <span>{{item.steelStructureNumber}} t</span>
                </li>
                <li v-if="item.totalArea">
                  <span>总占地面积：</span>
                  <span>{{item.totalArea}} ㎡</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 已付款费用信息 -->
      <div class="project-info" v-if="havePayBills">
        <div>费用信息</div>
        <el-table :data="havePayBills" style="width: 100%">
          <el-table-column prop="name" label="费用名称" width="180">
          </el-table-column>
          <el-table-column label="金额（元）" width="180">
            <template slot-scope="scope">
              {{scope.row.amount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="浮动（元）">
            <template slot-scope="scope">
              {{scope.row.discountAmount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="小计（元）" width="180">
            <template slot-scope="scope">
              {{scope.row.principalAmount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="180">
          </el-table-column>
        </el-table>
        <div class="exponent-price">
          <div>已付金额：
            <b>¥ {{actuallyPayAmount | formatMoney}}</b>
          </div>
          <!-- <ul class="clearfix">
            <li>发布当日指数：</li>
            <li>土建指数：{{civilEngineeringIndex}}，</li>
            <li>安装指数：{{installTheIndex}}</li>
            <li>钢筋指数：50.32</li>
          </ul> -->
        </div>
      </div>
      <!-- 已付款附加费明细 -->
      <div class="project-info" v-if="surChargeDetail && surChargeDetail.length>0">
        <div>附加费明细</div>
        <el-table :data="surChargeDetail" style="width: 100%">
          <el-table-column prop="createTime" label="创建时间" width="200">
          </el-table-column>
          <el-table-column prop="feeType" label="费用类型" width="180">
          </el-table-column>
          <el-table-column prop="surchargeInfo" label="附加费信息">
          </el-table-column>
          <el-table-column label="费用金额" width="180">
            <template slot-scope="scope">
              {{scope.row.amount | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="180">
          </el-table-column>
        </el-table>
        <div class="exponent-price">
        </div>
      </div>
      <!-- 成果文件 -->
      <div class="project-info" v-if="projectProcesses && projectProcesses.length>0 &&baseDto.status==='7'">
        <div>成果文件</div>
        <el-table :data="projectProcesses" style="width: 100%">
          <el-table-column prop="deliveryTime" label="交付时间" width="180">
          </el-table-column>
          <el-table-column label="交付文件">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.fileInfos" :key="index">
                <a :href="item.path" style="color:#77CE45;" target="_blank">{{item.name}}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
        </el-table>
      </div>
      <!-- 项目申诉 -->
      <div class="project-info" ref="appeal" v-if="this.$route.query.appealType || projectAppealList.length">
        <div>项目申诉</div>
        <div class="file" v-if="showAppealSubmit">
          <div class="clearfix">
            <label class="require fl">专业类型：</label>
            <div>
              <label style="margin-right: 50px;" v-for="(item,index) in engineers" :key="index" v-show="!item.detailStatusn">
                <input type="checkbox" :value="item" v-model="AppealProfessionType" @change="appealDeposit"> {{item.professional}}
              </label>
            </div>
          </div>
          <div class="clearfix" v-if="ComplaintParams.appealType==2">
            <label class="require fl">申诉押金：</label>
            <div>
              <span style="color: #f00;">¥ {{depositNum}}</span>
              <span style="color: #f00;margin-left: 30px;cursor: pointer;" @click="$router.push('/myqingju/recharge')" v-show="depositNum>canWithdrawMoney">您的可用余额不足，请充值后再发起申诉！</span>
            </div>
          </div>
          <div class="clearfix">
            <label class="require fl">申诉文件：</label>
            <div>
              <el-upload name="file" :with-credentials="true" :multiple="true" :action="httpHead+'FastDFS/fastDFSupload'" :on-success="handleComplaintFilesSuccess" :on-error="handleComplaintFilesError" :on-remove="handleComplaintFilesRemove">
                <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            </div>
          </div>
          <div class="clearfix">
            <label class="require fl">申诉内容：</label>
            <div>
              <label>
                <textarea cols="140" rows="8" v-model="ComplaintParams.content"></textarea>
              </label>
            </div>
          </div>
          <div class="clearfix" v-if="ComplaintParams.appealType==2">
            <label class="fl"></label>
            <div>
              <input type="checkbox" v-model="agreeQualityAppeal">
              我已阅读并同意<i style="color: #2dbe7f;cursor: pointer;" @click="$store.commit('changeAppealAgreement', true)">《青矩互联工程计量成果质量评定标准及考核细则》</i>
            </div>
          </div>
          <div class="clearfix">
            <label class="fl"></label>
            <div>
              <el-button type="primary" size="small" :disabled="ComplaintParams.files.length===0" @click="projectComplaint">&nbsp;&nbsp;提&nbsp;&nbsp;&nbsp;&nbsp;交&nbsp;&nbsp;</el-button>
            </div>
          </div>
        </div>
        <div class="history" v-for="(item,index) in projectAppealList" :key="index">
          <div class="clearfix">
            <div class="left fl">
              <img :src="item.headPortraits" alt="" width="50px" height="50px">
              <div>{{item.userName}}</div>
            </div>
            <div class="right fl">
              <span class="fr">{{item.complaintDate}}</span>
              <p>{{item.complaintType}}</p>
              <ul>
                <li v-for="(it,i) in item.complaintFiles" :key="i">{{i+1}}、
                  <a :href="it.path" target="_blank">{{it.name}}</a>
                </li>
              </ul>
              <p>{{item.content}}</p>
              <el-button style="margin-top: 10px;" size="small" type="primary" @click="cancelAppeal(item.appealId)" v-if="item.detailStatusnName=='待审核' && $route.query.appealType == 2">撤销申诉</el-button>
            </div>
          </div>
          <div class="results">
            <div>
              <span style="color:#FF0000;">青矩管理员：</span>
            </div>
            <div>
              <span>
                <b>{{item.detailStatusnName=='撤销'?'申诉状态':'审核结果'}}：</b>
                <i style="color:#FF0000;">{{item.detailStatusnName}}</i>
              </span>
              <span v-show="item.opinion">
                <b>处理结果：</b>
                <i>{{item.opinion}}</i>
              </span>
              <span v-show="item.reason">
                <b>{{item.detailStatusnName=='驳回'?'驳回原因':'关闭原因'}}：</b>
                <i style="color:#FF0000;">{{item.reason}}</i>
              </span>
              <span v-if="item.process=='评估中'">
                <b>误差率：</b>
                <i style="color:#FF0000;">{{item.process}}</i>
              </span>
              <!-- 作业中心处理后，存在这个值appealHandleResult -->
              <template v-if="item.appealHandleResult">
                <span>
                  <b>误差率水平：</b>
                  <i style="color:#FF0000;">{{item.appealHandleResult&&item.appealHandleResult.errorRateLeve}}</i>
                </span>
                <span>
                  <b>处理结果：</b>
                  <i style="color:#FF0000;">{{item.appealHandleResult&&item.appealHandleResult.processResult}}</i>
                </span>
                <div style="height: 10px;"></div>
                <span>
                  <b>附件：</b>
                  <ul v-if="item.appealHandleResult.submitFiles.length" style="display: table-cell;">
                    <li v-for="(it,i) in item.appealHandleResult.submitFiles" :key="i" style="color: #77ce45;">{{i+1}}、
                      <a :href="it.path" target="_blank">{{it.name}}</a>
                    </li>
                  </ul>
                </span>
                <div style="height: 10px;"></div>
                <span>
                  <b>备注：</b>
                  <i style="color:#FF0000;">{{item.appealHandleResult&&item.appealHandleResult.remark}}</i>
                </span>
              </template>
            </div>
          </div>
        </div>
        <p style="text-align: center;padding: 20px 0;" v-if="periodOfValidity>7 && !projectAppealList.length">暂无申诉</p>
      </div>
      <!-- 补充文件 -->
      <div class="project-info add-file" v-if="baseDto.status<8">
        <div>补充文件</div>
        <div class="file">
          <div class="clearfix">
            <label class="require fl">补充文件：</label>
            <div>
              <label style="margin-right: 50px;">
                <input type="radio" name="files" value="1" v-model="supplementFileParams.supplementFileType"> 补充文件
              </label>
              <label>
                <input type="radio" name="files" value="2" v-model="supplementFileParams.supplementFileType"> 我要变更
              </label>
            </div>
          </div>
          <div class="clearfix" v-if="supplementFileParams.supplementFileType==='2'">
            <label class="require fl">变更比例：</label>
            <div>
              <select v-model="supplementFileParams.changeRatio">
                <option value="" disabled selected>请输入变更比例</option>
                <option value="10%以内">10%以内</option>
                <option value="10%~20%（含）">10%~20%（含）</option>
                <option value="20%~30%（含）">20%~30%（含）</option>
                <option value="30%~50%（含）">30%~50%（含）</option>
                <option value="50%以上">50%以上</option>
              </select>
            </div>
          </div>
          <div class="clearfix">
            <label class="require fl">上传附件：</label>
            <div>
              <!-- <label v-if="filesName.length===0">
                <span class="upload-button">选择文件</span>
                <input type="file" style="display:none;" multiple @change="changeFile">
              </label>
              <p v-else v-for="(item,index) in filesName" :key="index" style="line-height: 20px;font-size: 15px;">{{item}}</p> -->
              <el-upload name="file" :with-credentials="true" :multiple="true" :action="httpHead+'FastDFS/fastDFSupload'" :on-success="handleSupplementFilesSuccess" :on-error="handleSupplementFilesError" :on-remove="handleSupplementFilesRemove">
                <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            </div>
          </div>
          <div class="clearfix">
            <label class="require fl">文件描述：</label>
            <div>
              <label>
                <textarea cols="140" rows="8" v-model="supplementFileParams.description"></textarea>
              </label>
            </div>
          </div>
          <div class="clearfix">
            <label class="fl"></label>
            <div>
              <el-button type="primary" size="small" :disabled="supplementFileParams.files.length===0" @click="supplementFile">&nbsp;&nbsp;提&nbsp;&nbsp;&nbsp;&nbsp;交&nbsp;&nbsp;</el-button>
            </div>
          </div>
        </div>
        <div class="history clearfix" v-for="(item,index) in supplementFiles" :key="index">
          <div class="left fl">
            <img :src="item.headPortraits" alt="" width="50px" height="50px">
            <div>{{item.userName}}</div>
          </div>
          <div class="right fl">
            <span class="fr">{{item.createTime}}</span>
            <p>{{item.supplementFileTypeName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.changeRatio}}</p>
            <ul>
              <li v-for="(it,i) in item.files" :key="i">{{i+1}}、
                <a :href="it.path" target="_blank">{{it.name}}</a>
              </li>
            </ul>
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
      <!-- 留言，问题描述 -->
      <div class="question" v-if="baseDto.status<8">
        <textarea cols="160" rows="5" placeholder="如果您遇到任何问题，请留言给我们！" v-model="messageParams.message"></textarea>
        <div>
          <el-button type="primary" size="small" @click="message">&nbsp;&nbsp;留&nbsp;&nbsp;&nbsp;&nbsp;言&nbsp;&nbsp;</el-button>
        </div>
        <div class="history clearfix" v-for="(item,index) in projectConsultations" :key="index">
          <div class="left fl">
            <img :src="item.headPortraits" alt="" width="50px" height="50px">
            <div>{{item.userName}}</div>
          </div>
          <div class="right fl">
            <p>{{item.message}}</p>
            <span>{{item.createTime}}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="doWhat==='download'?'下载合同模板':'合同签约'" :visible.sync="dialogVisible" width="30%" class="dialog">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="发票抬头" prop="invoiceTitle">
          <el-select v-model="ruleForm.invoiceTitle" placeholder="请选择发票抬头" @change="selInvoiceTitle('ruleForm')">
            <el-option :label="item.companyName" :value="item.invoiceVerificationId" v-for="(item,index) in options" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <div class="addQualifications" @click="gotoPage">添加发票资质</div>
        <el-form-item style="margin-bottom:0">
          <el-button type="primary" @click="submitForm" :disabled="!sign_url">确认</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
          <div style="margin-top: 10px"> <span v-if="prompt"> {{promptMes}}</span><span v-if="verify && $store.state.userInfo.userCategoryCode !== '1'">为了保证您签约的电子合同与纸质版的合同具有相同法律效应，使用此服务
              必须进行实名认证。去<a href="/Setting/userAttestation" style="color: #5daf34">实名认证</a></span></div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import projectListheader from '@/components/projectListheader'
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'

export default {
  components: {
    projectListheader,
    breadcrumb
  },
  computed: {
    // 项目申诉待审核时隐藏验收按钮
    showCheck() {
      if (this.baseDto.status == 6 && this.projectAppealList.length) {
        let arr = this.projectAppealList.filter(item => item.detailStatusnName === '待审核')
        if (arr.length) return false
      }
      return this.baseDto.status == 6
    },
    showAppealSubmit() {
      let hasNoAppealType = this.engineers.filter(item => !item.detailStatusn)
      return !this.hasRepay && this.ComplaintParams.appealType && this.periodOfValidity < 8 && hasNoAppealType.length
    }
  },
  data() {
    return {
      httpHead: process.env.API_ROOT,
      dialogVisible: false, //发票弹框
      agreeQualityAppeal: false, // 同意质量申诉协议
      depositNum: 0, // 申诉押金
      canWithdrawMoney: 0, //账户可提现余额
      AppealProfessionType: [], // 申诉专业类型
      // 选择发票抬头
      ruleForm: {
        invoiceTitle: '' //发票抬头
      },
      // 验证
      rules: {
        invoiceTitle: [{ required: true, message: '请选择发票抬头', trigger: 'change' }]
      },
      breadcrumbs: [{ name: '我的项目', path: '/myqingju/project' }, { name: '项目详情', path: this.$route.fullPath }],
      activeName: '',
      activeClose: true,
      baseDto: {},
      civilEngineeringIndex: '',
      installTheIndex: '',
      projectAppealList: [],
      periodOfValidity: 0,
      amount: '',
      actuallyPayAmount: '',
      engineers: [],
      havePayBills: [],
      notPayServiceBills: [],
      notPaySurcharges: [],
      supplementFiles: [],
      paymentCountdown: '',
      projectConsultations: [],
      projectProcesses: [],
      evaluationOfState: false,
      setupCost: '',
      surChargeDetail: '',
      havePayAmount: '',
      discountAmount: '',
      appealTheDifference: '',
      // filesName: [],
      projectBaseId: '',
      projectBaseType: '',
      supplementFileParams: {
        projectBaseId: '',
        files: [],
        supplementFileType: '1',
        changeRatio: '',
        description: ''
      },
      messageParams: {
        message: ''
      },
      // ComplaintFiles: [],
      ComplaintParams: {
        appealType: this.$route.query.appealType,
        content: '',
        files: [],
        projectbaseId: [],
        type: []
      },
      checkParams: {
        couponId: '' // 优惠券ID
      },
      couponList: [], // 优惠券列表
      couponSpread: false, // 优惠券列表
      options: [], //发票列表
      prompt: false, //跳转提示
      verify: false,
      promptMes: '',
      ifSign: false, //是否已签约
      ContractAddress: '', //签约合同地址
      doWhat: '',
      sign_url: '',
      hasRepay: false // 是否已还过轻松付账单，还过将不能申诉
    }
  },
  methods: {
    gotoPage() {
      this.$router.push({ path: '/myqingju/billManage', query: { name: '跳转' } })
    },
    // 获取申诉押金
    appealDeposit() {
      if (this.ComplaintParams.appealType != 2) return
      api.appealDeposit(this.AppealProfessionType.map(item => item.projectInfoId)).then(res => {
        this.depositNum = res.dataList[0]
      })
    },
    cancelAppeal(id) {
      this.$confirm('本次申诉仍在审核中，是否确认撤销？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          api.appealCancel(id).then(res => {
            this.$message.success(res.errorMsg)
            this.viewProject()
          })
        })
        .catch(() => {})
    },
    // 签约合同或 查看合同
    dialogVisibleTrue(param) {
      this.sign_url = ''
      this.ruleForm.invoiceTitle = ''
      this.verify = false
      this.doWhat = param
      if (this.doWhat === 'download' || (!this.ifSign && this.baseDto && this.baseDto.publisherId === JSON.parse(localStorage.QingjuuserId))) return (this.dialogVisible = true)
      if (!this.ifSign && this.baseDto && this.baseDto.publisherId !== localStorage.QingjuuserId) {
        this.$message.error('您不能签约此合同')
      } else {
        window.open(this.ContractAddress)
      }
    },
    // 是否使用优惠券
    changeCouponSpread() {
      this.couponSpread = !this.couponSpread
      if (!this.couponSpread) this.checkParams.couponId = ''
    },
    selInvoiceTitle(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false
        let data = {
          invoiceVerificationId: this.ruleForm.invoiceTitle,
          projectBaseId: this.projectBaseId
        }
        if (this.doWhat === 'download') {
          api
            .downloadTemplate(data)
            .then(res => {
              this.sign_url = res.dataList[0]
            })
            .catch(res => this.$message.error(res.errorMsg))
        } else {
          api
            .contractSign(data)
            .then(res => {
              if (res.errorCode !== '200') return this.$message.error(res.errorMsg)
              this.sign_url = res.sign_url
            })
            .catch(res => {
              console.log('res.errorCode', res)
              if (res.errorCode === '4003') {
                this.verify = true
              } else {
                this.promptMes = '页面跳转失败,请稍后重试'
              }
              this.$message.error(res.errorMsg)
            })
        }
      })
    },
    // 确认发票抬头
    submitForm(formName) {
      window.open(this.sign_url)
      this.dialogVisible = false
    },
    //发票抬头列表
    getInvoiceTitle() {
      api.getInvoiceTitle(JSON.parse(window.localStorage.QingjuuserId)).then(res => {
        this.options = res.dataList
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    payAmount() {
      window.open('/myqingju/cashierDesk/estimate/' + this.$route.params.id)
    },
    // 查看项目详情
    viewProject(id = this.$route.params.id) {
      api.viewProject(id).then(res => {
        this.activeClose = res.activeClose // true放弃支付关闭  false管理员驳回关闭
        this.projectBaseId = res.baseDto.projectBaseId // 项目ID
        this.projectBaseType = res.baseDto.projectBaseType // 项目类型
        this.amount = res.amount // 待付款金额
        this.actuallyPayAmount = res.actuallyPayAmount // 已付款金额
        this.baseDto = res.baseDto // 项目基本信息
        this.engineers = res.engineers // 安装工程和土建工程
        this.activeName = res.engineers[0].professional
        this.havePayBills = res.havePayBills // 已付款费用
        this.notPayServiceBills = res.notPayServiceBills // 待付款费用
        this.notPaySurcharges = res.notPaySurcharges // 待付款附加费
        this.supplementFiles = res.supplementFiles // 补充文件
        this.projectConsultations = res.projectConsultations // 留言
        this.projectProcesses = res.projectProcesses // 成果文件
        this.setupCost = res.setupCost // 实际结算费用
        this.havePayAmount = res.havePayAmount // 托管费用
        this.paymentCountdown = res.paymentCountdown // 剩余时间
        this.discountAmount = res.discountAmount // 结余
        this.appealTheDifference = res.appealTheDifference // 申诉差额
        this.surChargeDetail = res.surChargeDetail // 附加费明细
        this.evaluationOfState = res.evaluationOfState // 评价
        this.projectAppealList = res.projectAppealList ? res.projectAppealList : [] // 申诉详情
        this.periodOfValidity = res.periodOfValidity // 申诉剩余时间，7天后将不能申诉
        // this.civilEngineeringIndex = res.civilEngineeringIndex // 土建指数
        // this.installTheIndex = res.installTheIndex // 安装指数
        this.ifSign = res.ifSign //是否已签约
        this.ContractAddress = res.contractLink //签约地址
        // this.installTheIndex = res.installTheIndex // 钢筋指数
        if (this.baseDto.status === '6') this.getMyCouponByProjectId()
        if (this.baseDto.status === '6' || this.baseDto.status === '7') this.HasRepayQuickPayBill()
      })
    },
    // 获取优惠券信息
    getMyCouponByProjectId() {
      api.getMyCouponByProjectId(JSON.parse(window.localStorage.QingjuuserId), this.$route.params.id).then(res => {
        this.couponList = res.dataList
      })
    },
    // 补充文件
    handleSupplementFilesSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.supplementFileParams.files.push(res.dataList[0].id)
      } else {
        this.$message.error({ message: res.errorMsg })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleSupplementFilesError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleSupplementFilesRemove(file, fileList) {
      if (!file.response) return false
      let id = file.response.dataList[0].id
      let index = this.supplementFileParams.files.indexOf(id)
      if (index > -1) {
        this.supplementFileParams.files.splice(index, 1)
      }
    },
    // 补充文件
    supplementFile() {
      if (!this.supplementFileParams.description) return this.$message('请输入文件描述')
      if (this.supplementFileParams.supplementFileType === '1') this.supplementFileParams.changeRatio = ''
      this.supplementFileParams.projectBaseId = this.projectBaseId
      api
        .supplementFile(this.supplementFileParams)
        .then(res => {
          this.$message({
            message: res.errorMsg,
            type: 'success'
          })
          setTimeout(() => {
            window.location.reload()
          }, 800)
        })
        .catch(res => {
          this.$message.error({ message: res.errorMsg })
        })
    },
    // 问题留言
    message() {
      if (!this.messageParams.message) return this.$message('请输入您遇到的问题')
      api.message(Object.assign(this.messageParams, { projectBaseId: this.projectBaseId })).then(res => {
        this.$message.success('操作成功')
        this.messageParams.message = []
        this.viewProject()
      })
    },
    // 是否已还过轻松付账单，还过将不能申诉
    HasRepayQuickPayBill() {
      api.HasRepayQuickPayBill(this.projectBaseId).then(res => (this.hasRepay = res.hasRepay))
    },
    // 申诉文件
    handleComplaintFilesSuccess(res, file, fileList) {
      if (res.errorCode === '200') {
        this.ComplaintParams.files.push(res.dataList[0].id)
      } else {
        this.$message.error({ message: res.errorMsg })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500)
      }
    },
    handleComplaintFilesError(err, file, fileList) {
      this.$message.error({ message: err.errorMsg })
    },
    handleComplaintFilesRemove(file, fileList) {
      if (!file.response) return false
      let id = file.response.dataList[0].id
      let index = this.ComplaintParams.files.indexOf(id)
      if (index > -1) {
        this.ComplaintParams.files.splice(index, 1)
      }
    },
    // 项目申诉
    projectComplaint() {
      this.ComplaintParams.projectbaseId = this.projectBaseId
      this.ComplaintParams.type = this.AppealProfessionType.map(item => item.professional)
      if (!this.ComplaintParams.content) return this.$message('请输入申诉内容')
      if (!this.ComplaintParams.type.length) return this.$message('请选择专业类型')
      if (this.ComplaintParams.appealType == 2) {
        if (this.depositNum > this.canWithdrawMoney) return this.$message('您的可用余额不足，请充值后再发起申诉！')
        if (!this.agreeQualityAppeal) return this.$message('请阅读并同意《青矩互联工程计量成果质量评定标准及考核细则》')
        // 添加申诉账单
        api.addBillAndOrderForm(this.AppealProfessionType.map(item => item.projectInfoId)).then(res => {
          // appealKind  0：非申诉，1：验收前申诉，2：验收后申诉
          this.ComplaintParams.appealKind = this.baseDto.status == 7 ? '2' : '1'
          window.sessionStorage.qualityAppealParams = JSON.stringify(this.ComplaintParams)
          window.open('/myqingju/cashierDesk/estimate/' + this.$route.params.id + '?appealOrderId=' + res.dataList[0])
        })
        return
      }
      api
        .projectComplaint(this.ComplaintParams)
        .then(res => {
          this.$message.success(res.errorMsg)
          setTimeout(() => {
            window.location.reload()
          }, 800)
        })
        .catch(res => {
          this.$message.error(res.errorMsg)
        })
    },
    // 验收
    check() {
      this.$confirm('您是否已经确认验收成果文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      })
        .then(() => {
          api
            .check(Object.assign(this.checkParams, { projectBaseId: this.projectBaseId }))
            .then(res => {
              this.$message({
                message: res.errorMsg,
                type: 'success'
              })
              this.viewProject()
            })
            .catch(res => {
              this.$message.error({ message: res.errorMsg })
            })
        })
        .catch(() => {})
    },
    // 评价项目
    evaluation() {
      this.$router.push('/myqingju/evaluation/' + this.$route.params.id)
    },
    // 取消项目
    cancleProject() {
      this.$confirm('此操作将取消该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        api
          .giveUp(this.projectBaseId)
          .then(res => {
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            this.viewProject()
          })
          .catch(err => {
            this.$message.error(err.errorMsg)
          })
      })
    }
  },
  mounted() {
    this.viewProject()
    this.getInvoiceTitle() //抬头列表
    if (this.$route.query.appealType == 2) {
      api.FinanceInformation(JSON.parse(window.localStorage.QingjuuserId)).then(res => {
        let { financeAccountTotal, financePaidAmount } = res.data
        this.canWithdrawMoney = (financeAccountTotal - financePaidAmount).toFixed(2)
      })
    }
    this.$nextTick(() => {
      setTimeout(() => {
        var url = window.location.href
        var id = url.substring(url.lastIndexOf('#') + 1)
        if (this.$refs[id]) this.$refs[id].scrollIntoView(true)
      }, 500)
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto 100px;
}
.status {
  color: #666;
  height: 240px;
  border-top: 3px solid rgba(0, 153, 107, 1);
  background-color: #fff;
  > div {
    padding: 13px 26px;
    box-sizing: border-box;
  }
  .left {
    width: 240px;
    height: 100%;
    border-right: 1px solid #e4e4e4;
    text-align: center;
    position: relative;
    > p {
      font-size: 20px;
      font-weight: 700;
      &:nth-child(2) {
        color: #2dbe7f;
        margin-top: 45px;
      }
      &:nth-child(3) {
        color: #ff0000;
        margin-top: 5px;
      }
    }
    > button {
      cursor: pointer;
      font-size: 13px;
      color: #e4433f;
      background-color: #fff;
      margin: 15px 0;
      padding: 5px 25px;
      border: 1px solid #e4433f;
      &:hover {
        color: #fff;
        background-color: #e4433f;
      }
    }
    > div {
      width: 100%;
      font-size: 14px;
      position: absolute;
      left: 0;
      bottom: 12px;
      > span {
        color: #333;
        cursor: pointer;
        padding-left: 20px;
        &.confirm {
          background: url(~@/assets/img/u767.png) left center no-repeat;
        }
        &.download {
          background: url(~@/assets/img/u766.png) left center no-repeat;
        }
        &:hover {
          color: #e4433f;
          &.confirm {
            background: url(~@/assets/img/u767_mouseOver.png) left center no-repeat;
          }
          &.download {
            background: url(~@/assets/img/u766_mouseOver.png) left center no-repeat;
          }
        }
        & + span {
          margin-left: 30px;
        }
      }
    }
  }
  .right {
    width: 960px;
    height: 100%;
    .step {
      margin-top: 55px;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: space-around;
      > div {
        flex: 0 0 64px;
        height: 87px;
        text-align: center;
        &.now {
          color: #333;
        }
        > span {
          display: block;
          width: 100%;
          &:nth-child(2) {
            font-size: 14px;
          }
          &:nth-child(3) {
            font-size: 12px;
          }
        }
      }
      > img {
        width: 110px;
        height: 9px;
        margin-top: -40px;
      }
    }
  }
}
.project-info {
  font-size: 14px;
  margin-top: 20px;
  padding: 0 20px;
  background-color: #fff;
  border: 1px solid #eee;
  > div {
    &:first-child {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      background-color: #fafbfc;
      padding-left: 15px;
      margin: 0 -20px;
    }
    &.exponent-price {
      padding: 15px 0;
      > div {
        text-align: right;
        margin: 0 30px;
      }
      > ul {
        li {
          float: left;
        }
      }
    }
    &.pay-button {
      text-align: right;
      border-top: 1px dashed #eeeeee;
      padding: 20px 0;
      > button {
        cursor: pointer;
        font-size: 16px;
        padding: 8px 10px;
        border-radius: 2px;
        font-weight: 700;
        &.pay {
          color: #fff;
          background-color: rgba(230, 67, 70, 1);
          margin-right: 5px;
        }
        &.giveUp {
          color: #666666;
          background-color: rgba(228, 228, 228, 1);
        }
      }
    }
    &.info {
      padding: 15px 10px;
      .info-list > li {
        > span {
          display: inline-block;
          line-height: 40px;
          &:first-child {
            color: #666;
            font-weight: 700;
            width: 135px;
          }
        }
      }
    }
    &.file {
      padding-bottom: 15px;
      > div {
        line-height: 45px;
        > label {
          width: 135px;
          margin-left: 10px;
        }
        > div {
          margin-left: 150px;
          select {
            width: 200px;
            height: 30px;
          }
          select,
          textarea {
            border: 1px solid #bcbcbc;
          }
        }
      }
    }
    &.history {
      color: #666;
      background-color: #fff;
      border-top: 1px dashed #eee;
      padding: 15px 0;
      a {
        color: #77ce45;
        text-decoration: underline;
        &:hover {
          color: #28b343;
        }
      }
      .left {
        width: 148px;
        text-align: center;
        > div {
          margin: 10px 0;
          font-size: 12px;
        }
      }
      .right {
        width: 1000px;
        > ul {
          margin: 10px 0;
        }
        > span {
          font-size: 12px;
          color: #999;
        }
      }
      .results {
        color: #333333;
        background-color: #f8fafc;
        margin-top: 10px;
        padding: 13px 37px;
        display: flex;
        > div:last-child {
          flex: 1;
          margin-left: 10px;
          > span {
            margin-right: 23px;
          }
        }
      }
    }
    &.final-charge {
      > ul {
        padding: 20px 0;
        > li {
          float: left;
          font-weight: 700;
          & + li {
            margin-left: 150px;
          }
        }
      }
    }
    &.price-calculation {
      border-top: 1px dashed #eeeeee;
      padding: 15px 0;
      line-height: 22px;
      > dl {
        padding-left: 18px;
        dt {
          cursor: pointer;
          font-weight: 700;
          margin-left: -18px;
        }
        input[type='radio']:disabled + span {
          color: #999;
        }
      }
      > ul {
        text-align: right;
        b {
          display: inline-block;
          min-width: 110px;
        }
      }
    }
  }
}
.question {
  margin-top: 20px;
  padding: 40px 20px 20px;
  background-color: #fff;
  > textarea {
    border: 1px solid #ccc;
    padding: 10px 15px;
  }
  > div:nth-child(2) {
    text-align: right;
    margin: 20px 0;
  }
  .history {
    color: #666;
    border-top: 1px dashed #eee;
    padding: 15px 0;
    .left {
      width: 148px;
      text-align: center;
      > div {
        margin: 10px 0;
        font-size: 12px;
      }
    }
    .right {
      width: 1000px;
      > p {
        font-size: 14px;
        margin-bottom: 15px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.addQualifications {
  margin-left: 101px;
  color: #0066cc;
  font-size: 12px;
  margin-bottom: 20px;
}
.addQualifications:hover {
  cursor: pointer;
}
.font12 {
  font-size: 12px;
}
.upload-button {
  cursor: pointer;
  color: #fff;
  background-color: #34a47e;
  padding: 7px 20px;
  border-radius: 3px;
}
textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
}
</style>
<style lang="less">
.dialog {
  .el-button {
    padding: 12px 35px;
  }
}
</style>
