<template>
<div>
  <div class="list-sort">
    <div class="list row-01" v-for="(firstList, firstListIndex) in authData" :key="firstList.firstName">
      <div class="col-01 col-css-01" :style="{'height': currentHeight.col01[firstListIndex] + 'px','line-height': currentHeight.col01[firstListIndex] + 'px'}">
        <el-checkbox class="row-inline" :indeterminate="indeterminateAll[firstListIndex]" v-model="checkAll[firstListIndex]" @change="handleCheckAllChange(checkAll[firstListIndex], firstList, firstListIndex)">{{firstList.firstName}}</el-checkbox>
      </div>
      <ul class="checkbox J-col-02">
        <li v-for="(secondList, secondListIndex) in firstList.functionSecondList" :key="secondList.secondName" class="col-02">
          <div class="col-01" :style="{'top': currentHeight.col02[firstListIndex][secondListIndex] + 'px'}">
            <el-checkbox class="row-inline" :indeterminate="indeterminateAnyFun[firstListIndex][secondListIndex]" v-model="checkAnyFun[firstListIndex][secondListIndex]" @change="handleCheckFunChange(firstList.functionSecondList.length, checkAnyFun[firstListIndex][secondListIndex], secondList, firstListIndex, secondListIndex)">{{secondList.secondName}}</el-checkbox>
          </div>
          <div class="col-03 J-col-03">
            <el-checkbox-group v-model="roleDataModelBaseAuth[firstListIndex][secondListIndex]" 
            @change="handleCheckedChange(firstList.functionSecondList.length, secondList.firmBaseFunctionList.length,firstListIndex,secondListIndex)">
            <p v-for="thridList in secondList.firmBaseFunctionList" :key="thridList.id" >
              <el-checkbox :label="thridList.functionEnum">{{thridList.name}}</el-checkbox>
              <span class="details-text" :title="thridList.correspondingFunction">{{thridList.correspondingFunction}}</span>
            </p>
            </el-checkbox-group>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="btn-div">
    <button class="btn-common btn-green btn-width-150" @click="submitClick">确定</button>
    <button class="btn-common btn-cancel btn-width-150" @click="cancelClick">取消</button>
  </div>
</div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['name', 'description'],
  data () {
    return {
      checkAll: [],
      checkAnyFun: [],
      roleDataModelBaseAuth: [], // 参数数组
      indeterminateAll: [],
      indeterminateAnyFun: [],
      currentHeight: { // 高度问题
        col01: [],
        col02: []
      },
      authData: [],
      roleDataModel: {
        name: '', // 角色名称
        description: '', // 角色类型
        initEdit: false,
        functionEnumsObj: {}
      },
      // 角色类型
      roleTypeData: [],
      roleShow: {
        name: false,
        type: false
      },
      currentTop: 0, // 现在的高度
      allDataEnum: []
    }
  },
  watch: {
    'name': function (val) {
      if (val) {
        this.roleDataModel.name = val
      }
    },
    'description': function (val) {
      if (val) {
        this.roleDataModel.description = val
      }
    },
  },
  methods: {
    getHeight () {
      // 第二栏
      this.currentHeight.col01 = []
      // this.currentHeight.col02 = []
      let Jc03 = document.getElementsByClassName('J-col-03')
      /* for (let i = 0; i < Jc03.length; i++) {
        this.currentHeight.col02[firstListIndex].push(Jc03[i].clientHeight/2 - 10)
      } */
      let arrJc03 = [].slice.call(Jc03)
      this.authData.forEach((firstList, firstListIndex) => {
        firstList.functionSecondList.forEach((secondList, secondListIndex) => {
          let shift = arrJc03.shift()
          this.currentHeight && this.currentHeight.col02[firstListIndex] &&  this.currentHeight.col02[firstListIndex].push(shift.clientHeight / 2 - 10)
        })
      })
      let Jc02 = document.getElementsByClassName('J-col-02')
      for (let i = 0; i < Jc02.length; i++) {
        this.currentHeight && this.currentHeight.col01.push(Jc02[i].clientHeight)
      }
    },
    handleCheckFunChange (fLength, checked, list, firstListIndex, secondListIndex) {
      if (checked) {
        // 第二层循环
        list && list.firmBaseFunctionList.forEach((item, itemIndex) => {
          this.roleDataModelBaseAuth[firstListIndex][secondListIndex].push(item.functionEnum)
          this.$set(this.checkAnyFun[firstListIndex], secondListIndex, true)
          this.$set(this.indeterminateAnyFun[firstListIndex], secondListIndex, false)
        })
        /* // 第一层循环
        list&&list.functionSecondList.forEach((item, index) => {
          item.firmBaseFunctionList.forEach((secondItem, secondItemIndex) => {
            this.roleDataModelBaseAuth[firstListIndex][secondListIndex].push(secondItem.functionEnum)
          })
        }) */
      } else {
        list && list.firmBaseFunctionList.forEach((item, itemIndex) => {
          this.$set(this.roleDataModelBaseAuth[firstListIndex], secondListIndex, [])
          this.$set(this.checkAnyFun[firstListIndex], secondListIndex, false)
          this.$set(this.indeterminateAnyFun[firstListIndex], secondListIndex, false)
        })
      }
      this.hanleSecondChange(fLength, firstListIndex)
      // 需要判断第二层的选择框
      /*     let checkedCount = 0
          for (let i =0, len = this.checkAnyFun[firstListIndex].length; i < len; i++) {
            if (this.checkAnyFun[firstListIndex][i]) {
              ++checkedCount
            }
          }
          this.$set(this.checkAll, firstListIndex, (checkedCount === fLength))
          this.$set(this.indeterminateAll, firstListIndex, (checkedCount > 0 && checkedCount < fLength))
          this.hanleSecondChange(fLength, firstListIndex) */
    },
    hanleSecondChange (fLength, firstListIndex) {
      // 需要判断第二层的选择框
      let checkedCount = 0
      let checkedCountInder = 0
      for (let i = 0, len = this.checkAnyFun[firstListIndex].length; i < len; i++) {
        if (this.checkAnyFun[firstListIndex][i]) {
          ++checkedCount
        }
      }
      for (let i = 0, len = this.indeterminateAnyFun[firstListIndex].length; i < len; i++) {
        if (this.indeterminateAnyFun[firstListIndex][i]) {
          ++checkedCountInder
        }
      }
      this.$set(this.checkAll, firstListIndex, (checkedCount === fLength))
      this.$set(this.indeterminateAll, firstListIndex, (checkedCountInder > 0 && checkedCountInder < fLength) || (checkedCount > 0 && checkedCount < fLength))
      // 为第二级长度为0的增加hack
      if (checkedCountInder === 1 && this.indeterminateAnyFun[firstListIndex][0] && fLength === 1) {
        this.$set(this.indeterminateAll, firstListIndex, true)
      }
    },
    // 第一层选择
    handleCheckAllChange (checked, list, firstListIndex) {
      if (checked) {
        // 第一层循环
        list && list.functionSecondList.forEach((item, index) => {
          this.$set(this.checkAnyFun[firstListIndex], index, true)
          this.$set(this.indeterminateAll, firstListIndex, false)
          // 控制第二层的全选
          this.$set(this.indeterminateAnyFun[firstListIndex], index, false)
          item.firmBaseFunctionList.forEach((secondItem, secondItemIndex) => {
            this.roleDataModelBaseAuth[firstListIndex][index].push(secondItem.functionEnum)
          })
        })
      } else {
        list.functionSecondList.forEach((item, itemIndex) => {
          this.$set(this.checkAnyFun[firstListIndex], itemIndex, false)
          this.$set(this.indeterminateAll, firstListIndex, false)
          item.firmBaseFunctionList.forEach((secondItem, secondItemIndex) => {
            this.$set(this.roleDataModelBaseAuth[firstListIndex], itemIndex, [])
          })
        })
      }
    },
    // 第三栏的选择
    handleCheckedChange (fLength, sLength, firstListIndex, secondListIndex) {
      let checkedCount = this.roleDataModelBaseAuth[firstListIndex][secondListIndex].length
      // this.checkAnyFun[firstListIndex][secondListIndex] = checkedCount === sLength
      this.$set(this.checkAnyFun[firstListIndex], secondListIndex, (checkedCount === sLength))
      this.$set(this.indeterminateAnyFun[firstListIndex], secondListIndex, (checkedCount > 0 && checkedCount < sLength))
      this.hanleSecondChange(fLength, firstListIndex)
    },
    goback () {
      history.go(-1) // 返回的列表
    },
    // 所有权限
    rolesAll () {
      api.getAllFunction().then(res => {
        this.authData = res.dataList
        // 生成二维数组
        res.dataList.forEach((firstList, firstListIndex) => {
          // this.checkAll[firstListIndex] = [] // 第一列数据
          // this.checkAnyFun[firstListIndex] = [] // 第二列数据
          // this.indeterminateAll[firstListIndex] = [] // 第一列选择显示
          // this.indeterminateAnyFun[firstListIndex] = [] // 第二列选择显示
          // this.roleDataModelBaseAuth[firstListIndex] = []// 第三列数据
          this.$set(this.roleDataModelBaseAuth, firstListIndex, [])
          this.$set(this.indeterminateAnyFun, firstListIndex, [])
          this.$set(this.checkAnyFun, firstListIndex, [])
          this.$set(this.currentHeight.col02, firstListIndex, [])
          // this.$set(this.checkAll, firstListIndex, [])
          this.$set(this.indeterminateAll, firstListIndex, false)
          firstList.functionSecondList.forEach((secondList, secondListIndex) => {
            this.$set(this.checkAnyFun[firstListIndex], secondListIndex, false)
            // this.indeterminateAnyFun[firstListIndex][secondListIndex] = []
            // this.roleDataModelBaseAuth[firstListIndex][secondListIndex] = []
            this.$set(this.roleDataModelBaseAuth[firstListIndex], secondListIndex, [])
            // this.$set(this.checkAnyFun[firstListIndex], secondListIndex, false)
            /* secondList.firmBaseFunctionList.forEach((thirdList, thirdListIndex) => {
              this.roleDataModelBaseAuth[firstListIndex][secondListIndex][thirdListIndex] = ''
              // this.checkAll[firstListIndex][secondListIndex][thirdListIndex] = ''
            }) */
          })
        });
        if (this.$route.query.id) {
          this.editRoles()
        }
        this.$nextTick(this.getHeight)
      })
    },
    getDataArr () {
      this.allDataEnum = []
      this.roleDataModelBaseAuth.forEach((firstItem) => {
        firstItem.forEach((secondItem) => {
          secondItem.forEach((thirdItem) => {
            thirdItem && this.allDataEnum.push(thirdItem)
          })
        })
      })
    },
    // 提交按钮分为新建角色和编辑两类 后台给了两个接口
    submitClick (event) {
      event.preventDefault()
      if (!this.roleDataModel.name) {
        this.roleShow.name = '请输入角色名称'
        return false
      }
      /* if (!this.roleShow.type) {
        this.roleShow.type = '请选择角色类型'
        return false
      } */
      this.getDataArr()
      if (this.$route.query.id) {
        let data = {
          firmId: JSON.parse(localStorage.firmId),
          functionEnums: this.allDataEnum,
          name: this.roleDataModel.name,
          description: this.roleDataModel.description,
          id: this.$route.query.id
        }
        api.updateRole(data).then(res => {
          this.$message({
            type: 'success',
            message: '更改成功!'
          })
          this.$router.push('/myqingju/rolesList')
        })
      } else {
        let data = {
          firmId: JSON.parse(localStorage.firmId),
          functionEnums: this.allDataEnum,
          name: this.roleDataModel.name,
          description: this.roleDataModel.description
        }
        api.saveRole(data).then(res => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.$router.push('/myqingju/rolesList')
        })
      }
    },
    cancelClick () {
      event.preventDefault()
      this.$router.push('/myqingju/rolesList')
    },
    editRoles () {
      // 接口请求两次
      let id = this.$route.query.id
      let data = {
        firmId: JSON.parse(localStorage.firmId),
        id: id
      }
      api.getUserRoles(data).then(res => {
        this.roleDataModel.functionEnumsObj = res.dataList[0]
        this.roleDataModel.name = this.roleDataModel.functionEnumsObj.name
        this.authData.forEach((firstList, firstListIndex) => {
          firstList.functionSecondList.forEach((secondList, secondListIndex) => {
            secondList.firmBaseFunctionList.forEach((thridList, thirdListIndex) => {
              let rst = this.roleDataModel.functionEnumsObj.functionEnums.includes(thridList.functionEnum)
              rst && this.roleDataModelBaseAuth[firstListIndex][secondListIndex].push(thridList.functionEnum) 
              && this.handleCheckedChange(firstList.functionSecondList.length, secondList.firmBaseFunctionList.length, firstListIndex, secondListIndex)
            })
          })
        })
      })
    }
  },
  mounted () {
    this.rolesAll()
    this.roleDataModel.name = this.name
    this.roleDataModel.description = this.description
  }
}
</script>
<style lang="less" scoped>

  .list {
    overflow: hidden;
  }
  .list + .list {
    margin-top: 5px;
  }
  .row-01 {
    border: 1px solid #ccc;
    .col-01 {
      display: inline-block;
      position: relative;
    }
    .row-inline {
      display: inline;
    }
  }
  .col-css-01 {
    text-align: center;
    padding-left: 20px;
    .row-inline {
      display: inline;
    }
  }
  .checkbox {
    float: right;
    width: 85%;
    position: relative;
    .el-checkbox:first-child {
      margin-left: 30px;
    }
    .el-checkbox {
      width: 200px;
      font-weight: normal;
      display: inline-block;
    }
    .col-02 {
      // display: inline-block;
      border-left: 1px solid #ccc;
      width: 105%;
    }
    .col-02 + .col-02 {
      border-top: 1px solid #ccc;
    }
    .col-03 {
      border-left: 1px solid #ccc;
      margin-top: -20px;
      padding: 10px 0;
      margin-left: 200px;
    }
  }
  .title {
    display: inline-block;
    margin-right: 30px;
    font-size: 14px;
    color: #666;
  }
  .tip {
    color: red;
    font-size: 12px;
    margin-left: 10px;
  }
  .require-right:before {
    right: -5px;
  }
  .submitBtn {
    margin: 30px 0 0 100px;
  }
.list-sort {
  border: 1px solid #ccc;
  padding: 5px;
}
@media screen and (max-width: 1550px) {
  .role-container {
    .checkbox {
      width: 75%;
    }
  }
}
.btn-div{
  margin-top: 20px;
}
.details-text{
  font-size: 14px;
  color: #D5D4D4;
  display: inline-block;
  width: 50%;
  // height: 32px;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
@media screen and (max-width: 1600px) {
  .details-text{
    width: 40%;
  }
}


</style>
