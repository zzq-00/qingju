<template>
  <div>
    <el-form :model="userValidateForm" status-icon :rules="rules" v-loading="loading"
    class="user-edit-form"
     ref="userValidateForm" label-width="120px" >
      <el-form-item label="设置账号" prop="account" v-show="diffInfo === 'add'">
        <el-input type="text" v-model="userValidateForm.account" placeholder="请给用户设置登录账号"
        @input="validForm"></el-input>
      </el-form-item>
      <el-form-item label="用户账号" prop="account" v-show="diffInfo === 'edit'">
        <span>{{userValidateForm.account}}</span>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input type="text" v-model="userValidateForm.name" placeholder="方便你查看企业内成员，请输入真实姓名"
        @input="validForm"></el-input>
      </el-form-item>
      <el-form-item label="选择角色" prop="roles" v-show="diffInfo === 'add'" >
        <el-select v-model="userValidateForm.roles" filterable multiple
         placeholder="请选择角色" style="width: 100%;">
          <el-option v-for="item in selectRolesData" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile" :rules="{required: diffInfo === 'edit'? false : true,
       validator: validateMobile,trigger: 'blur'}">
        <el-input type="text" v-model="userValidateForm.mobile" placeholder="请输入手机号码"
        @input="validForm"></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱" prop="email">
        <el-input type="email" v-model="userValidateForm.email" placeholder="请输入有效的邮箱地址"></el-input>
      </el-form-item>
      <el-form-item label="组织架构" prop="structName">
        <el-select v-model="userValidateForm.structName" @remove-tag='handleRemoveTag'
        multiple  popper-class="struct-select"
         placeholder="请选择用户所在的组织架构" style="width: 100%;"  @visible-change="handleSelectVisible">
          <el-option value="" :style="{height: treeHeight + 'px', transition: 'height .5s'}"
          v-if="checkData && checkData[0] && checkData[0].deptInfoList">
            <el-tree ref="tree"
              :props="props"
              :data="checkData[0].deptInfoList"
              default-expand-all
              class="tree-restyle"
              node-key="id"
              @node-click='handleNodeClick'>
              <span class="custom-tree-node" slot-scope="{node,data}">
                <el-checkbox v-model="checkedValue" :label="node.data.id" @change="changeCheckbox(node)">{{node.label}}</el-checkbox>
              </span>
            </el-tree>
          </el-option>
          <el-option v-else disabled value="">
            当前无组织架构,需要先<router-link to="/myqingju/frameManage" class="blue">去创建</router-link>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="btn-common"
        :class="[diffInfo === 'edit' ? 'btn-width-100' : 'btn-width-150', {'btn-submit': finishBtn}]"
        @click="handleSubmit">确定</div>
        <div class="btn-common btn-cancel" :class="[diffInfo === 'edit' ? 'btn-width-100' : 'btn-width-150']"
        @click="hanleCancel">取消</div>
      </el-form-item>
    </el-form>
    <confirm-component :visibleProps='successVisible'>
      <template #color5>
        您已开通【{{userValidateForm.name}}】！
      </template>
      <p>初始密码已发送至对应的手机号码，了解具体权限登陆青矩平台进行查看！</p>
      <template #btn>
          <button @click="knowClick">我知道了</button>
      </template>
    </confirm-component>
  </div>
</template>
<script>
import confirmComponent from '@/components/confirmComponent'
import api from '@/fetch/api'
export default {
  props: ['diffInfo', 'userId', 'editInfoVisible'],
  components: {
    confirmComponent
  },
  data () {
    var validateAccount = (rule, value, callback) => {
        if (this.diffInfo === 'edit') {
          callback()
        } else {
          if (!value) {
            callback('请输入登录账号')
          } else if (!(/^[a-zA-Z0-9_]{3,25}$/.test(value))) {
            callback('请输入3-25位字符，不能使用特殊符号（包括汉字）')
          } else {
            let data = {
              code: value,
              callMethod: ''
            }
            api.firmVerifyMessage(data).then(res => {
              callback()
            }).catch(err => {
              // if (err.errorCode === '1014') {
                callback('登录账号被占用，请重新输入')
              // }
            })
        }
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (!value) {
        callback('请输入手机号码')
      } else if (!/^1[345678]\d{9}$/.test(value)) {
        callback('你输入的手机号码有误')
      } else if (this.oldMobile === this.userValidateForm.mobile) {
        callback()
      } else {
        let data = {
          phone: value,
          callMethod: ''
        }
        api.firmVerifyMessage(data).then(res => {
          callback()
        }).catch(err => {
          // if (err.errorCode === '1014') {
            callback('此手机号已被绑定，请重新输入，或者通知该用户解绑之前的账号 ')
          // }
        })
      }
    }
    var validateEmail =  (rule, value, callback) => {
      let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (value && !re.test(value)) {
        callback('请输入有效的邮箱')
      } else {
        if (this.oldEmail === this.userValidateForm.email) {
          callback()
        } else {
          let data = {
            email: value,
            callMethod: ''
          }
          api.firmVerifyMessage(data).then(res => {
            callback()
          }).catch(err => {
            // if (err.errorCode === '1014') {
              callback('此邮箱号已被注册，请重新输入')
           /* else {
              callback('系统错误')
            } */
          })
        }
      }
    }
    return {
      loading: false,
      userValidateForm: {
        account: '',
        name: '',
        roles: [],
        mobile: '',
        email: '',
        // struct: [],
        structName: []
      },
      checkedValue: [],
      finishBtn: false, // 能提交为true
      checkData: [], // 组织架构
      selectRolesData: [], // 角色
      oldMobile: '',
      oldEmail: '',
      rules: {
        account: [
          {
            required: true, validator: validateAccount, trigger: 'blur'
          }
        ],
        name: [
          {
            required: true, message: '请输入真实姓名', trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true, validator: validateMobile,trigger: 'blur'
          }
        ],
        email: [
          {
            required: false, validator: validateEmail,trigger: 'blur'
          }
        ]
      },
      props: {
        label: 'name',
        children: 'deptInfoList',
      },
      treeHeight: 0,
      successVisible: false,
      validateMobile: validateMobile
    }
  },
  methods: {
    knowClick () {
      this.successVisible = false
      this.$router.push('/myqingju/userInfo')
    },
    handleNodeClick (data) {
      // 高度
      setTimeout(() => {
        // 延时
        this.treeHeight = this.$refs.tree.$el.offsetHeight
      }, 500);
    },
    changeCheckbox (node) {
      let index = this.checkedValue.indexOf(node.data.id)
      if (index > -1) {
        this.userValidateForm.structName.push(node.data.name)
      } else {
          // push
        this.userValidateForm.structName.splice(index, 1)
      }
      // this.userValidateForm.struct = this.checkedValue
    },
    handleRemoveTag (tagValue) {
      let index = this.userValidateForm.structName.indexOf(tagValue)
      this.checkedValue.splice(index,1)
    },
    handleSelectVisible(val){
      if (val) {
        this.$nextTick(() => {
          this.treeHeight = this.$refs.tree.$el.offsetHeight + 20
        })
      }
    },
    handleSubmit () {
      this.$refs['userValidateForm'].validate((valid) => {
        if (valid) {
          this.finishBtn = true
          let dataArr = this.userValidateForm
          if (this.diffInfo === 'edit' ) {
            // 编辑
             let editdata = {
              code: dataArr.account,
              deptPositionStrInfoList: this.checkedValue,
              email: dataArr.email,
              firmId: JSON.parse(localStorage.firmId),
              realName: dataArr.name,
              telephone: dataArr.mobile,
              userId: this.userId
            }
            api.editFirmUser(editdata).then(res => {
              this.$message.success('编辑成功')
              this.hanleCancel()
            })
          } else {
            this.loading = true
            // 新增
            let data = {
              code: dataArr.account,
              realName: dataArr.name,
              roleIds: dataArr.roles,
              email: dataArr.email,
              telephone: dataArr.mobile,
              deptId: this.checkedValue.join(','),
              firmId: JSON.parse(localStorage.firmId),
            }
            api.addUser(data).then(res => {
              this.$message.success('添加成功')
              if (this.diffInfo === 'add') {
                  this.successVisible = true
                  this.loading = false
                }
            }).catch(err => {
              this.$message.error(err.errorMsg)
              this.loading = false
            })
          }
        } else {
          this.finishBtn = false
        }
      })

    },
    hanleCancel () {
      if (this.diffInfo === 'edit') {
        this.$emit('handleEditVisible')
      } else {
        this.$router.push('/myqingju/userInfo')
      }
    },
    validAccount () {
      let value = this.userValidateForm.account
      if (!value) {
        return false
      } else if (!(/^\w{3,25}$/.test(value))) {
        return false
      } else {
        return true
      }
    },
    validMobile () {
      let value = this.userValidateForm.mobile
      if (!value) {
        return false
      } else if (!/^1[345678]\d{9}$/.test(value)) {
        return false
      } else {
        return true
      }
    },
    validEmail () {
      let value = this.userValidateForm.email
      let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (value && !re.test(value)) {
        return false
      } else {
        return true
      }
    },
    // 主要为了按钮变化
    validForm () {
      let data = this.userValidateForm
      if (data.account && this.validAccount() && data.name && data.mobile && this.validMobile() && this.validEmail()) {
        this.finishBtn = true
      } else {
        this.finishBtn = false
      }
    },
    getInfo (val) {
      api.personnelInformation(val).then(res => {
        let data = res.dataList[0]
        this.userValidateForm.account = data.code
        this.userValidateForm.name = data.userName
        this.userValidateForm.mobile = data.phone
        this.userValidateForm.email = data.email
        // 清空再初始化
        this.checkedValue = []
        this.userValidateForm.structName = []
        data.department.forEach(item => {
          if (item.deptId) {
            this.userValidateForm.structName.push(item.deptName || item.deptId)
            this.checkedValue.push(item.deptId)
          }
        })
        this.oldMobile = data.phone
        this.oldEmail = data.email
      })
    }
  },
  mounted () {
    // 组织架构
    api.getOrganizeStructureList(JSON.parse(localStorage.firmId)).then(res => {
      this.checkData = res.dataList
    })
    api.getRoleList(JSON.parse(localStorage.firmId)).then(res => {
      this.selectRolesData = res.dataList
    })
    if (this.userId) {
      this.getInfo(this.userId)
    }
  },
  watch: {
    // 'userId': function (val) {
    //   if (val) {
    //    this.getInfo(val)
    //   }
    // },
    'editInfoVisible': function (val) {
      if (val) {
        this.getInfo(this.userId)
        // 移除表单项的提示信息
        this.$refs['userValidateForm'].clearValidate()
      }
    }
  },
}
</script>
<style lang="less" scoped>
.struct-select .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #fff;
}
.blue{
  color: #0EAF63;
  text-decoration: underline;
}
.user-edit-form{
  padding: 20px;
  padding-bottom: 0px;
}
</style>
<style>
/*  */
.user-edit-form .el-form-item__label{padding-right: 30px;}
.tree-restyle .el-icon-caret-right:before{content: '';}
.tree-restyle .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{background-color: #F5FBFA;}
</style>

