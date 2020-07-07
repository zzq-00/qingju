<template>
  <div>
    <headerComponent />
    <div class="qsf-container">
      <div class="apply-main">
        <h1 class="apply-title">“轻松付”申请</h1>
        <div class="apply-container">
          <div class="base-info">
            <h2 class="common-title">基本信息
              <i class="dotted"></i>
            </h2>
            <div class="apply-container">
              <div class="base-info">
                <div class="base-info-form">
                  <el-form ref="companyParams" :rules="companyParamsRules" :model="companyParams" label-width="175px">
                    <el-form-item label="申请类型">
                      <el-radio label="企业额度" v-model="usertype"></el-radio>
                    </el-form-item>
                    <el-form-item label="企业名称" class="short-input" prop="name">
                      <el-input type="text" v-model="companyParams.name" placeholder="请选择企业名称" :disabled="true"></el-input>
                      <span class="gray">请输入您企业的法定名称，3-30位</span>
                    </el-form-item>
                    <el-form-item label="企业邮箱" class="short-input" prop="email">
                      <el-input type="text" v-model="companyParams.email" placeholder="请选择企业邮箱"></el-input>
                      <span class="gray">请务必填写真实的企业邮箱，以便申请业务使用</span>
                    </el-form-item>
                    <el-form-item label="企业规模" class="short-input" prop="companySize">
                      <el-select v-model="companyParams.companySize" placeholder="请选择企业规模">
                        <el-option label="大型" value="1"></el-option>
                        <el-option label="中型" value="2"></el-option>
                        <el-option label="小型" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="企业类型" class="short-input" prop="companyType">
                      <el-select v-model="companyParams.companyType" placeholder="请选择企业类型">
                        <el-option label="国有企业" value="1"></el-option>
                        <el-option label="内资企业" value="2"></el-option>
                        <el-option label="集体企业" value="3"></el-option>
                        <el-option label="股份制企业" value="4"></el-option>
                        <el-option label="私营企业" value="5"></el-option>
                        <el-option label="民营企业" value="6"></el-option>
                        <el-option label="其他" value="7"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="固定电话" prop="companyPhone">
                      <el-input type="text" v-model="companyParams.companyPhone" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="营业住址" class="address-input" prop="homeAddress">
                      <el-select v-model="provinceSel">
                        <el-option v-for="(item,index) in provinceList" :key="index" :value="item.code" :label="item.name"></el-option>
                      </el-select>
                      <el-select v-model="citySel">
                        <el-option v-for="(item,index) in cityList" :key="index" :value="item.code" :label="item.name"></el-option>
                      </el-select>
                      <el-select v-model="districtSel">
                        <el-option v-for="(item,index) in districtList" :key="index" :value="item.code" :label="item.name"></el-option>
                      </el-select>
                      <div style="margin-left:30px;margin-top:15px;width: 430px;">
                        <el-input style="width:100%;" type="text" v-model="companyParams.homeAddress"></el-input>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div class="legal-msg">
                <h2 class="common-title">法人信息
                  <i class="dotted"></i>
                </h2>
                <div class="legal-person-info">
                  <el-form ref="companyParams" :rules="companyParamsRules" :model="companyParams" label-width="187px" class="legal-form">
                    <el-form-item label="法定代表人姓名" prop="corporateName">
                      <el-input type="text" v-model="companyParams.corporateName" :disabled="true" style="width: 270px;"></el-input>
                    </el-form-item>
                    <el-form-item label="法定代表人手机号" prop="corporatePhone">
                      <el-input type="text" v-model="companyParams.corporatePhone" style="width: 270px;"></el-input>
                    </el-form-item>
                    <el-form-item label="法定代表人证件类型" prop="corporateCardType">
                      <el-select v-model="companyParams.corporateCardType" style="width: 270px;" disabled>
                        <el-option v-for="item in companyParamsData.cardType" :key="item.label" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="法定代表人证件号码" prop="corporateCardNum">
                      <el-input type="text" v-model="companyParams.corporateCardNum" :disabled="true" style="width: 270px;"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="联系人姓名" prop="userName">
            <el-input type="text" v-model="companyParams.userName"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号" prop="userPhone">
            <el-input type="text" v-model="companyParams.userPhone"></el-input>
          </el-form-item> -->
                  </el-form>
                </div>
              </div>
              <div class="card-upload">
                <h2 class="common-title">证件上传
                  <i class="dotted"></i>
                </h2>
                <div class="card-upload-box">
                  <div class="card-photo-div">
                    <div class="common-label require">纳税人识别码</div>
                    <el-input type="text" v-model="companyParams.taxpayerNumber" :disabled="true"></el-input>
                  </div>
                  <div class="card-photo-div">
                    <div class="card-photo-label require">企业营业执照</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':businessLicense.accessPath}" :src="businessLicense.accessPath" @click="ImgClick(businessLicense.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!businessLicense.accessPath" class='iptfileupload uploading-btn' @change='show($event,0)'>
                      <!-- <span class="delete" v-if="businessLicense.accessPath" @click="deleteImg(0)">删除照片</span> -->
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(0)" @mouseout="mouseout(0)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[0]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/yyzz.jpg')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-photo-div">
                    <div class="card-photo-label">税务登记证</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':taxRegistrationCertificate.accessPath}" :src="taxRegistrationCertificate.accessPath" @click="ImgClick(taxRegistrationCertificate.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!taxRegistrationCertificate.accessPath" class='iptfileupload uploading-btn' @change='show($event,1)'>
                      <span class="delete" v-if="taxRegistrationCertificate.accessPath" @click="deleteImg(1)">删除照片</span>
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(1)" @mouseout="mouseout(1)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[1]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/u14653.png')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-photo-div">
                    <div class="card-photo-label">开户许可证</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':openingAccountsLicense.accessPath}" :src="openingAccountsLicense.accessPath" @click="ImgClick(openingAccountsLicense.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!openingAccountsLicense.accessPath" class='iptfileupload uploading-btn' @change='show($event,2)'>
                      <span class="delete" v-if="openingAccountsLicense.accessPath" @click="deleteImg(2)">删除照片</span>
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(2)" @mouseout="mouseout(2)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[2]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/u14666.jpg')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-photo-div">
                    <div class="card-photo-label require">法人证件照片正面</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':corporateIdCardForward.accessPath}" :src="corporateIdCardForward.accessPath" @click="ImgClick(corporateIdCardForward.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!corporateIdCardForward.accessPath" class='iptfileupload uploading-btn' @change='show($event,3)'>
                      <!-- <span class="delete" v-if="corporateIdCardForward.accessPath" @click="deleteImg(3)">删除照片</span> -->
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(3)" @mouseout="mouseout(3)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[3]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/u14612.png')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-photo-div">
                    <div class="card-photo-label require">法人证件照片反面</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':corporateIdCardBack.accessPath}" :src="corporateIdCardBack.accessPath" @click="ImgClick(corporateIdCardBack.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!corporateIdCardBack.accessPath" class='iptfileupload uploading-btn' @change='show($event,4)'>
                      <!-- <span class="delete" v-if="corporateIdCardBack.accessPath" @click="deleteImg(4)">删除照片</span> -->
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(4)" @mouseout="mouseout(4)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[4]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/u14612.png')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-photo-div choice-charge">
                    <div class="common-label require">请选择网站负责人</div>
                    <el-radio-group v-model="companyParams.hasOtherMan">
                      <el-radio label="0" v-if="companyParams.corporateName">
                        <b>{{companyParams.corporateName}}</b>
                        证件号码：{{companyParams.corporateCardNum}} 联系方式：{{companyParams.corporatePhone}}
                      </el-radio>
                      <el-radio label="1">其他授权代理人</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="card-photo-div" v-if="companyParams.hasOtherMan === '0'">
                    <div class="common-label require">负责人手持身份证照片</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':idCardInPrincipalHand.accessPath}" :src="idCardInPrincipalHand.accessPath" @click="ImgClick(idCardInPrincipalHand.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!idCardInPrincipalHand.accessPath" class='iptfileupload uploading-btn' @change='show($event,7)'>
                      <span class="delete" v-if="idCardInPrincipalHand.accessPath" @click="deleteImg(7)">删除照片</span>
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(7)" @mouseout="mouseout(7)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[7]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/u14638.jpg')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="charge-info" v-if="companyParams.hasOtherMan === '1'">
                <h2 class="common-title">负责人信息
                  <i class="dotted"></i>
                </h2>
                <div class="charge-info-form">
                  <el-form ref="companyParams" :rules="companyParamsRules" :model="companyParams" label-width="170px">
                    <el-form-item label="授权代理人姓名" prop="agentName">
                      <el-input type="text" v-model="companyParams.agentName"></el-input>
                    </el-form-item>
                    <el-form-item label="授权代理人证件类型" prop="agentIdCardType">
                      <el-select v-model="companyParams.agentIdCardType" style="width:300px;">
                        <el-option v-for="item in companyParamsData.cardType" :key="item.label" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="授权代理人证件号码" prop="agentIdCardNum">
                      <el-input type="text" v-model="companyParams.agentIdCardNum"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="agentPhoneNum">
                      <el-input type="text" v-model="companyParams.agentPhoneNum"></el-input>
                    </el-form-item>
                    <el-form-item label="上传委托书" prop="agencyAgreement" class="append-file-div">
                      <div class="choice-file-btn">
                        <input type="file" class="file-btn" id="file" @change='changeFile'> 选择文件
                      </div>
                      <span class="tip" @click="warrantDownLoad">下载授权书</span>
                      <p class="detail">请网站负责人请上传授权委托书（法人代表签字且加盖公司公章）</p>
                      <p class="file-text" v-if="agencyAgreement.originalName">
                        <span class="text-name">{{agencyAgreement.originalName}}</span>
                        <i class="file-delete" @click="deletFile()">×</i>
                      </p>
                    </el-form-item>
                  </el-form>
                  <div class="card-photo-div">
                    <div class="common-label require">授权代理人证件照片正面</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':agentIdCardForward.accessPath}" :src="agentIdCardForward.accessPath" @click="ImgClick(agentIdCardForward.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!agentIdCardForward.accessPath" class='iptfileupload uploading-btn' @change='show($event,5)'>
                      <span class="delete" v-if="agentIdCardForward.accessPath" @click="deleteImg(5)">删除照片</span>
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(5)" @mouseout="mouseout(5)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[5]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/u14612.png')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-photo-div">
                    <div class="common-label require">授权代理人证件照片反面</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':agentIdCardBack.accessPath}" :src="agentIdCardBack.accessPath" @click="ImgClick(agentIdCardBack.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!agentIdCardBack.accessPath" class='iptfileupload uploading-btn' @change='show($event,6)'>
                      <span class="delete" v-if="agentIdCardBack.accessPath" @click="deleteImg(6)">删除照片</span>
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(6)" @mouseout="mouseout(6)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[6]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/u14612.png')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-photo-div">
                    <div class="common-label require">负责人手持身份证照片</div>
                    <div class="uploading">
                      <span class="text">上传图片</span>
                      <img class="img uploading-btn" v-bind:class="{'uploading-img':idCardInPrincipalHand.accessPath}" :src="idCardInPrincipalHand.accessPath" @click="ImgClick(idCardInPrincipalHand.accessPath)" alt=''>
                      <input type='file' accept="image/*" v-if="!idCardInPrincipalHand.accessPath" class='iptfileupload uploading-btn' @change='show($event,7)'>
                      <span class="delete" v-if="idCardInPrincipalHand.accessPath" @click="deleteImg(7)">删除照片</span>
                    </div>
                    <div class="model-icon">
                      <span @mouseover="mouseover(7)" @mouseout="mouseout(7)">我是示意图</span>
                      <div class="model-hover" v-if="mouserHover[7]">
                        <p class="title">
                          <span class="text">注意事项</span>
                          <i class="dotted"></i>
                        </p>
                        <ul class="model-ul">
                          <li class="model-li">
                            1.最新版证件的原件拍照、彩色扫描，或者复印件加盖<br> 贵公司的红色公章后，再扫描或拍照上传；
                          </li>
                          <li class="model-li">
                            2.请确保上传图片信息清晰可辨；
                          </li>
                          <li class="model-li">
                            3.上传图片格式可以为jpg、png、bmp、gif，图片需小于5M；
                          </li>
                        </ul>
                        <p class="title">
                          <span class="text">正确实例</span>
                          <i class="dotted"></i>
                        </p>
                        <div class="img-example">
                          <img :src="require('@/assets/img/u14638.jpg')" alt="" class="img-example">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer-div">
                <div>
                  <el-checkbox v-model="useragree"></el-checkbox>
                  本人已阅读并同意遵守
                  <router-link to="/myqingju/quickPayAgreement">“轻松付”协议</router-link>
                </div>
                <div class="submit-btn" @click="submitClick('companyParams')">提交</div>
                <span class="return-text" @click="$router.go(-1)">返回</span>
              </div>
              <!-- 弹出窗 -->
              <div class="pop-window" v-if="showPop">
                <div class="pop-bg"></div>
                <div class="pop-box">
                  <h1 class="pop-title">提交</h1>
                  <p class="pop-text-01">恭喜你，资料已经提交成功</p>
                  <p class="pop-text-02">
                    <i>{{time}}</i>秒后可以自动返回，或者您可以直接
                    <router-link to="/myqingju/freeManage" class="return-icon">返回</router-link>
                  </p>
                </div>
              </div>
              <!-- 照片放大 -->
              <div class="photo-big" v-if="currentImg">
                <div class="photo-big-img">
                  <img :src="currentImg" alt="" class="photo-big-img">
                  <i class="close" @click="Jclose"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/fetch/api";
import headerComponent from '@/components/qingjuHeader'

export default {
  components: {
    headerComponent
  },
  data() {
    return {
      usertype: '企业额度', // 用户类型
      mouserHover: [],
      provinceList: [],
      provinceSel: '',
      cityList: [],
      citySel: '',
      districtList: [],
      districtSel: '',
      useragree: false, // 用户是否同意
      time: 5, // 倒计时秒数
      showPop: false, // 是否展示弹出窗
      // personInCharge: '1',
      currentImg: '',
      businessLicense: {},
      taxRegistrationCertificate: {},
      openingAccountsLicense: {},
      corporateIdCardForward: {},
      corporateIdCardBack: {},
      agentIdCardForward: {},
      agentIdCardBack: {},
      idCardInPrincipalHand: {},
      agencyAgreement: {},
      companyParamsRules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入企业邮箱', trigger: 'blur' }
        ],
        companySize: [
          { required: true, message: '请选择企业规模', trigger: 'change' }
        ],
        companyType: [
          { required: true, message: '请选择企业规模', trigger: 'change' }
        ],
        companyPhone: [
          { required: true, message: '请输入固定电话', trigger: 'blur' }
        ],
        homeAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        corporateName: [
          { required: true, message: '请输入法定代表人姓名', trigger: 'blur' }
        ],
        corporatePhone: [
          { required: true, message: '请输入法定代表人手机号', trigger: 'blur' }
        ],
        corporateCardType: [
          { required: true, message: '请输入法定代表人证件类型', trigger: 'change' }
        ],
        corporateCardNum: [
          { required: true, message: '请输入法定代表人证件号码', trigger: 'blur' }
        ],
        // userName: [
        //   { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        // ],
        // userPhone: [
        //   { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        // ],
        agentName: [
          { required: true, message: '请输入授权代理人姓名', trigger: 'blur' }
        ],
        agentIdCardType: [
          { required: true, message: '请选择授权代理人证件类型', trigger: 'change' }
        ],
        agentIdCardNum: [
          { required: true, message: '请输入授权代理人证件号码', trigger: 'blur' }
        ],
        agentPhoneNum: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        agencyAgreement: [
          { required: true, message: '请上传委托书', trigger: 'change' }
        ]
      },
      // 证件类型
      companyParamsData: {
        cardType: [
          { label: '身份证', value: '1' },
          { label: '港澳证', value: '2' },
          { label: '台胞证', value: '3' },
          { label: '护照', value: '4' }
        ],
      },
      companyParams: {
        agencyAgreement: "",  // 上传委托书 文件Id
        agentIdCardBack: "",  // 授权代理人证件照片反面 文件Id ,
        agentIdCardForward: "",  // 授权代理人证件照片正面 文件Id
        agentIdCardNum: "",  // 授权代理人证件号码
        agentIdCardType: "",  // 授权代理人证件类型
        agentName: "",  // 授权代理人姓名
        agentPhoneNum: "",  // 联系方式
        businessLicense: "",  // 企业营业执照:文件id
        cityId: '',  // 市Id
        companyPhone: "",  // 企业固定电话
        companySize: "",  // 企业规模
        companyType: "",  // 企业类型
        corporateCardNum: "",  // 法定代表人证件号码
        corporateCardType: "1",  // 法定代表人证件类型
        corporateIdCardBack: "",  // 法人证件照片反面
        corporateIdCardForward: "",  // 法人证件照片正面
        corporateName: "",  // 法定代表人姓名
        corporatePhone: "",  // 法定代表人联系电话
        districtId: '',  // 区Id
        email: "",  // 企业邮箱
        hasOtherMan: "0",  //  是否有其他授权人 0没有或1有
        homeAddress: "",  // 住址
        idCardInPrincipalHand: "",  // 负责人手持身份证照片 文件id
        name: "",  // 认证企业名称
        openingAccountsLicense: "",  // 开户许可证：文件Id
        provinceId: '',  // 省Id
        taxRegistrationCertificate: "",  //  税务登记证：文件Id
        taxpayerNumber: "",  // 纳税人识别码
        // userId: "string",
        // userName: "",
        // userPhone: ""
      }
    }
  },
  watch: {
    provinceSel: function () {
      this.city()
    },
    citySel: function () {
      this.district()
    }
  },
  methods: {
    warrantDownLoad() {
      window.location.href = '/static/关于申请轻松付及管理的授权书.doc'
    },
    // 提交
    submitClick(formName) {
      if (!this.useragree) {
        this.$message('请同意并签署“轻松付”协议')
        return false
      }
      if (!this.companyParams.taxpayerNumber) {
        this.$message('请填写纳税人识别码')
        return false
      }
      if (!this.companyParams.businessLicense) {
        this.$message('请上传企业营业执照')
        return false
      }
      if (!this.companyParams.corporateIdCardForward) {
        this.$message('请上传法人证件照片正面')
        return false
      }
      if (!this.companyParams.corporateIdCardBack) {
        this.$message('请上传法人证件照片反面')
        return false
      }
      if (!this.companyParams.idCardInPrincipalHand) {
        this.$message('请上传负责人手持证件照片')
        return false
      }
      // 当网站负责人为其他授权代理人时
      if (this.companyParams.hasOtherMan === '1') {
        if (!this.companyParams.agencyAgreement) {
          this.$message('请上传委托书')
          return false
        }
        if (!this.companyParams.agentIdCardForward) {
          this.$message('请上传代理人证件照片正面')
          return false
        }
        if (!this.companyParams.agentIdCardBack) {
          this.$message('请上传代理人证件照片反面')
          return false
        }
      } else if (this.companyParams.hasOtherMan === '0') {
        this.companyParams.agencyAgreement = ""
        this.companyParams.agentIdCardForward = ""
        this.companyParams.agentIdCardBack = ""
        this.companyParams.agentIdCardNum = ""
        this.companyParams.agentIdCardType = ""
        this.companyParams.agentName = ""
        this.companyParams.agentPhoneNum = ""
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.companyParams.provinceId = this.provinceSel
          this.companyParams.cityId = this.citySel
          this.companyParams.districtId = this.districtSel
          api.companyInfo(this.companyParams).then(res => {
            this.showPop = true;
            let timeSet = setInterval(() => {
              this.time--;
              if (this.time == 1) {
                clearInterval(timeSet);
                this.$router.push({ path: '/myqingju/quickPayStatus' });
              }
            }, 1000)
          }).catch(res => {
            this.$message.error(res.errorMsg)
          })
        } else {
          this.$message('请将信息填写完整')
          return false;
        }
      });
    },
    show(e, index) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      if (files[0].size / 1024 > 5000) {
        this.$message.error('图片不能大于5M')
        return false
      }
      let formData = new FormData()
      if (index === 0) {
        formData.append("auth_company_businessFile", files[0]);
      } else if (index === 1) {
        formData.append("auth_company_taxRegistFile", files[0]);
      } else if (index === 2) {
        formData.append("opening_accounts_license", files[0]);
      } else if (index === 3) {
        formData.append("auth_company_legalFile_front", files[0]);
      } else if (index === 4) {
        formData.append("auth_company_legalFile_verso", files[0]);
      } else if (index === 5) {
        formData.append("auth_person_legalFile_front", files[0]);
      } else if (index === 6) {
        formData.append("auth_person_legalFile_verso", files[0]);
      } else if (index === 7) {
        formData.append("hand_person_legalFile", files[0]);
      }

      api.quickPayUploadAuthFile(formData).then(res => {
        if (index === 0) {
          this.businessLicense = res.dataList[0]
          this.companyParams.businessLicense = res.dataList[0].id
        } else if (index === 1) {
          this.taxRegistrationCertificate = res.dataList[0]
          this.companyParams.taxRegistrationCertificate = res.dataList[0].id
        } else if (index === 2) {
          this.openingAccountsLicense = res.dataList[0]
          this.companyParams.openingAccountsLicense = res.dataList[0].id
        } else if (index === 3) {
          this.corporateIdCardForward = res.dataList[0]
          this.companyParams.corporateIdCardForward = res.dataList[0].id
        } else if (index === 4) {
          this.corporateIdCardBack = res.dataList[0]
          this.companyParams.corporateIdCardBack = res.dataList[0].id
        } else if (index === 5) {
          this.agentIdCardForward = res.dataList[0]
          this.companyParams.agentIdCardForward = res.dataList[0].id
        } else if (index === 6) {
          this.agentIdCardBack = res.dataList[0]
          this.companyParams.agentIdCardBack = res.dataList[0].id
        } else if (index === 7) {
          this.idCardInPrincipalHand = res.dataList[0]
          this.companyParams.idCardInPrincipalHand = res.dataList[0].id
        }
      }).catch(res => {
        this.$message.error({ message: res.errorMsg })
      })
    },
    // 删除照片
    deleteImg(index) {
      if (index === 0) {
        this.businessLicense = {}
        this.companyParams.businessLicense = ''
      }
    },
    // 点击图片查看大图
    ImgClick(src) {
      this.currentImg = src
    },
    // 关闭大图
    Jclose() {
      this.currentImg = false
    },
    // 上传委托书
    changeFile(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      let formData = new FormData()
      formData.append('agency_agreement', files[0])
      api.quickPayUploadAuthFile(formData).then(res => {
        this.agencyAgreement = res.dataList[0]
        this.companyParams.agencyAgreement = res.dataList[0].id
      }).catch(res => {
        this.$message.error({ message: res.errorMsg })
      })
    },
    mouseover(index) {
      this.$set(this.mouserHover, index, true)
    },
    mouseout(index) {
      this.$set(this.mouserHover, index, false)
    },
    // 删除委托书
    deletFile(index) {
      this.agencyAgreement = {}
      this.companyParams.agencyAgreement = ''
    },
    // 获取省份
    province() {
      api.province().then(res => {
        this.provinceList = res.dataList
        this.provinceSel = res.dataList[0].code
      })
    },
    // 获取城市
    city() {
      api.city(this.provinceSel).then(res => {
        this.cityList = res.dataList
        this.citySel = res.dataList[0].code
      })
    },
    // 获取区县
    district() {
      api.district(this.citySel).then(res => {
        this.districtList = res.dataList
        this.districtSel = res.dataList[0].code
      })
    },
    // 实名认证的相关信息
    getAuthInfo() {
      api.getAuthInfo().then(res => {
        this.taxRegistrationCertificate.accessPath = res.authCompany.taxRegistFileUrl
        this.businessLicense.accessPath = res.authCompany.businessFileUrl
        this.corporateIdCardForward.accessPath = res.authCompany.legalFrontFileUrl
        this.corporateIdCardBack.accessPath = res.authCompany.legalVersoFileUrl
        this.companyParams.taxRegistrationCertificate = res.authCompany.taxRegistFileId
        this.companyParams.businessLicense = res.authCompany.businessFileId
        this.companyParams.corporateIdCardForward = res.authCompany.legalFrontFileId
        this.companyParams.corporateIdCardBack = res.authCompany.legalVersoFileId
        this.companyParams.name = res.authCompany.companyName
        this.companyParams.taxpayerNumber = res.authCompany.taxNumber
        this.companyParams.companyPhone = res.authCompany.registeredTelephone
        this.companyParams.corporateName = res.authCompany.legalPersonName
        this.companyParams.corporateCardNum = res.authCompany.legalPersonNumber
      })
    }
  },
  mounted() {
    this.province()
    this.getAuthInfo()
  }
}
</script>
<style lang="less" scoped>
.qsf-container {
  background-color: #fff;
  font-size: 14px;
  width: 1200px;
  margin: 60px auto;
}
.apply-main {
  padding-bottom: 20px;
  &::before {
    content: '';
    display: block;
  }
  .breadcrumb {
    position: relative;
    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      top: -2px;
      left: 0;
      width: 3px;
      height: 20px;
      background-color: #008000;
    }
  }
  .apply-title {
    height: 40px;
    line-height: 40px;
    background-color: #d7d7d7;
    padding-left: 10px;
  }
}
.apply-container {
  width: 1100px;
  margin: 0 auto;
  .common-title {
    font-size: 16px;
    color: #666;
    margin-top: 50px;
    .dotted {
      display: inline-block;
      width: 995px;
      height: 10px;
      margin-left: 20px;
      border-top: 1px dotted #ccc;
      border-bottom: 1px dotted #ccc;
    }
  }
  .base-info-form {
    width: 995px;
    margin: 0 auto;
  }
  .legal-person-info {
    margin-left: 43px;
    margin-top: 20px;
    width: 995px;
    .legal-form {
      font-size: 0;
    }
  }
  .card-upload-box {
    margin: 0 auto;
    margin-top: 20px;
    width: 995px;
  }
  .choice-charge {
    margin-top: 30px;
  }
  .common-label {
    display: inline-block;
    width: 175px;
    margin-right: 30px;
    padding-right: 12px;
    text-align: right;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .card-photo {
    margin: 0 auto;
    margin-top: 20px;
    width: 995px;
  }
  .card-photo-div {
    height: 80px;
    margin-bottom: 10px;
    .card-photo-label {
      display: inline-block;
      width: 162px;
      text-align: right;
      margin-right: 45px;
    }
    .uploading {
      display: inline-block;
      width: 60px;
      height: 60px;
      background: url('../../../assets/img/qfs-uploading.png') no-repeat center 10px;
      font-size: 12px;
      color: #ccc;
      padding-top: 35px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      text-align: center;
      margin-right: 45px;
      position: relative;
      top: 15px;
      cursor: pointer;
      .delete {
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0;
      }
      &:hover {
        .delete {
          position: absolute;
          bottom: 0;
          left: 0;
          opacity: 1;
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      .uploading-btn {
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        opacity: 0;
        width: 100%;
        height: 100%;
        line-height: 30px;
        cursor: pointer;
      }
      .uploading-img {
        opacity: 1;
        background-color: #fff;
      }
      &:hover {
        border: 1px solid green;
      }
    }
    .model-icon {
      color: #0066cc;
      font-size: 13px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .model-hover {
      padding: 20px;
      display: inline-block;
      border: 1px solid #0066cc;
      position: absolute;
      top: -227px;
      left: 100px;
      background-color: #fff;
      border-radius: 5px;
      height: 410px;
      &:before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid #0066cc;
        position: absolute;
        top: 50%;
        left: -10px;
      }
      &:after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid #fff;
        position: absolute;
        top: 50%;
        left: -9px;
      }
      .title {
        width: 700px;
        margin-top: 10px;
        .dotted {
          display: inline-block;
          width: 500px;
          height: 0;
          border: 1px dashed #ccc;
        }
        .text {
          font-size: 16px;
          color: #666;
          display: inline-block;
          width: 80px;
          background-color: #fff;
        }
      }
      .model-ul {
        .model-li {
          margin-top: 20px;
          font-size: 14px;
          color: #333;
        }
      }
      .img-example {
        height: 160px;
        margin-top: 10px;
      }
    }
  }
  .charge-info-form {
    width: 995px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .footer-div {
    margin-top: 50px;
    margin-left: 260px;
    .submit-btn {
      cursor: pointer;
      display: inline-block;
      width: 140px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      background-color: #e4393c;
      border-radius: 5px;
      margin-top: 20px;
    }
    .return-text {
      cursor: pointer;
      font-size: 12px;
      color: #0066cc;
      margin-left: 20px;
    }
  }
  .append-file {
    width: 995px;
    margin: 0 auto;
    .append-file-box {
      margin-top: 50px;
    }
  }
  .append-file-div {
    .append-file-label {
      display: inline-block;
      width: 150px;
      margin-right: 45px;
      text-align: right;
    }
    .choice-file-btn {
      width: 100px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background-color: #2fadd3;
      color: #fff;
      border-radius: 3px;
      margin-right: 30px;
      position: relative;
      display: inline-block;
      .file-btn {
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        opacity: 0;
        width: 100%;
        height: 100%;
        line-height: 30px;
        cursor: pointer;
      }
    }
    .file-text {
      font-size: 12px;
      color: #5cca36;
      margin-left: 30px;
      .text-name {
        display: inline-block;
        min-width: 150px;
      }
      .file-delete {
        opacity: 0;
        cursor: pointer;
      }
      &:hover {
        .file-delete {
          opacity: 1;
          display: inline-block;
          width: 15px;
          height: 15px;
          line-height: 15px;
          text-align: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
        }
      }
    }
    .tip {
      font-size: 14px;
      color: #0066cc;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .detail {
      color: #999;
      font-size: 14px;
      margin-left: 30px;
    }
  }
  .el-input {
    width: 300px;
  }
  .long-input {
    width: 600px;
  }
}
/* 弹出窗的样式 */
.pop-window {
  .pop-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .pop-box {
    width: 500px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 110;
    padding: 20px;
    padding-top: 0;
    .pop-title {
      font-size: 14px;
      color: #333;
      height: 50px;
      line-height: 50px;
      background-color: #f6f7fb;
    }
    .pop-text-01 {
      margin-top: 20px;
      color: #333;
      font-size: 18px;
    }
    .pop-text-02 {
      font-size: 14px;
      color: #999;
      margin-top: 20px;
      i {
        color: #e4393c;
        font-size: 12px;
      }
    }
  }
}
.gray {
  color: #999;
  font-size: 12px;
}
.photo-big {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  .photo-big-img {
    width: 510px;
    height: 330px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* 黑色小关闭按钮 */
  .close {
    font-size: 24px;
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #fff;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    box-shadow: 0px 2px 5px #000;
    &::before {
      content: '×';
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: #000;
      border-radius: 50%;
      font-size: 24px;
    }
  }
}
</style>
<style>
/* 轻松付的导航 */
.breadcrumb .el-breadcrumb__inner,
.el-breadcrumb__inner a {
  margin-left: 15px;
}
.short-input .el-input__inner {
  width: 260px;
}
.address-input .el-input {
  width: 140px;
}
.apply-main .apply-container .long-input .el-input {
  width: 600px;
}
.apply-container .el-form-item__label {
  margin-right: 30px;
}
.legal-form .el-form-item {
  width: 50%;
  display: inline-block;
}
.choice-charge .el-radio {
  display: block;
  margin-left: 0;
}
.choice-charge .el-radio-group {
  vertical-align: top;
}
/* 错误信息位置显示 */
.legal-person-info .el-form-item__error {
  left: 30px;
}
/* 负责人信息 */
.charge-info-form .el-form-item__error {
  left: 30px;
}
</style>
