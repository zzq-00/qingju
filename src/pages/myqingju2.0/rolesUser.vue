<template>
  <div class="roles-user-container">
    <p class="page-title">配置账号</p>
    <div class="maintain-user">
      <p class="user-p">
        <span class="label-title">角色名称：</span>
        <span class="role-name">{{$route.query.name}}</span>
      </p>
      <p class="user-p">
        <span class="label-title">拥有人员：</span>
        <span class="role-placeholder">分配角色后，需要退出登录，选择角色生效。</span>
      </p>
      <ul class="maintain-main" >
        <li class="add-li" v-if="userLists.length > 50">
          <span class="circular-icon add-icon" @click="handlePreAdd">+</span>
        </li>
        <!--  -->
        <li class="maintain-li"  
          v-for="(item, index) in userLists" :key="item.id" >
          <div class="circular-icon"
            @mouseenter="mouseEnter($event,item, index)" ref="headerIcon">
            <img :src="item.headPortraits" alt="" class="circular-icon">
            <span class="del-icon" @click="deleteRoleUser(item)">×</span>
          </div>
          <p class="green-name">{{item.userName}}</p>
          <p class="gray-mobile">{{item.code}}</p>
        </li>
        <li class="add-li">
          <span class="circular-icon add-icon" @click="handlePreAdd">+</span>
        </li>
      </ul>
      <!-- <el-pagination
      class="my-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[30,50,100]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
      <!--  -->
      <div class="card-info" ref="crads" 
        :style="{
          top: infoVisible.top + 'px', 
          left: infoVisible.left + 'px',
          display: infoVisible.display,
          opacity: infoVisible.opacity}">
        <div class="card-top">
          <div class="fl">
            <p class="name">{{infoData.userName}}</p>
            <p class="link">{{infoData.phone}}</p>
            <p class="link">{{infoData.email}}</p>
          </div>
          <img :src="infoData.headPortraits" alt="" class="circular-icon fr"> 
        </div>
        <div class="card-bottom">
          <div class="block">
            <span class="block-left">企业角色</span>
            <ul class="block-right">
              <li v-for="item in infoData.role" :key="item">{{item}}</li>
            </ul>
          </div>
          <div class="block">
            <span class="block-left">所在部门</span>
            <ul class="block-right">
              <li v-for="item in infoData.department" :key="item.deptId">{{item.deptName}}</li>
            </ul>
          </div>
          <div class="block">
            <span class="block-left">用户账号</span>
            <ul class="block-right">
              <li>{{infoData.code}}</li>
            </ul>
          </div>
          <button class="btn-common btn-submit btn-width" @click="handleclick(infoData.userId)">查看详情</button>
        </div>
      </div>
      <!-- <div class="btn-footer">
        <button class="btn-common btn-green btn-width-150" @click="handleclick">确定</button>
        <button class="btn-common btn-cancel btn-width-150" @click="handleclick">取消</button>
      </div> -->
    </div>
    <!-- 弹窗 -->
    <el-dialog title="添加人员" width='600px' 
    :visible.sync='$store.state.rolesList.userVisible' 
    class="msg-dialog">
      <user-dialog></user-dialog>
    </el-dialog>
  </div>
</template>
<script>
import userDialog from './rolesUserAdd'
import api from '@/fetch/api'
export default {
  components: {userDialog},
  data () {
    return {
      userLists: [],
      infoVisible: {
        display: 'none',
        opacity: 0,
        top: 0,
        left: 0
      },
      infoData: {},
      disabled: false,
      timer: '',
      cacheArr: [],
      currentPage: 1,
      total: 0,
      dataForBE: {
        firmId: JSON.parse(localStorage.firmId),
        roleId: [sessionStorage.rolesId],
        page: 1,
        pageSize: 10000,
        inquiryMode: ''
      }
    }
  },
  watch: {
    '$store.state.rolesList.userVisible': function (val) {
      this.getUserList()
    }
  },
  methods: {
    handleSizeChange (val) {
      this.dataForBE.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.dataForBE.page = val
      this.getUserList()
    },
    getUserList () {
      api.getUserList(this.dataForBE).then(res => {
        this.userLists = res.dataList
        let data = []
        res.dataList.forEach(item => {
          let obj ={
            id: item.userId,
            name: item.userName || item.code,
            fixed: true // 固定不动 已经存在的，不能改变
          }
          data.push(obj)
        })
        this.total = res.count
        this.$store.commit('CLEARUSER')
        this.$store.commit('PUSHUSER', data)
        this.$nextTick(function () {
          // 异步问题
          setTimeout(() => {
            this.$refs.headerIcon && this.$refs.headerIcon.length &&　this.$refs.headerIcon.forEach(item => {
                item.addEventListener('mouseenter', this.debounce(500, 'block',1))
                item.addEventListener('mouseleave', this.debounce(1000, 'none',0))
              })
              this.$refs.crads && this.$refs.crads.addEventListener('mouseenter', this.debounce(500, 'block',1))
              this.$refs.crads && this.$refs.crads.addEventListener('mouseleave', this.debounce(1000, 'none',0))
          }, 1000);
        })
      })
    },
    debounce(wait, display, opacity){
      return () => {
        clearTimeout(this.timer)
        opacity ? this.infoVisible.opacity = opacity : ''
        this.timer = setTimeout(() => {
          opacity ? '' : this.infoVisible.opacity = opacity
          this.infoVisible.display = display; 
        },wait)
      }
    },
    // mouseEnterCard(){
    //   console.log('enter')
    //   this.debounce(500, 'block', 1)()
    // },
    // mouseOutCard(){
    //   console.log('out')
    //   this.debounce(500, 'none', 0)()
    // },
    /* ??? */
    mouseEnter (ev, item) {
      // 显示
      var ev = ev || window.event;
　　　 var target = ev.target || ev.srcElement;
      // 位置
      // 鼠标高度 + 滚动高度 - 相对父元素的偏移量 + 元素的高度
      this.infoVisible.top = event.clientY + window.pageYOffset - event.offsetY + event.target.parentElement.offsetHeight;
      this.infoVisible.left = event.clientX + window.pageXOffset - event.offsetX;
      // 整体文档 - 鼠标高度 +  - 相对父元素的偏移量 - 元素的高度  --- 浮动层的高度
      // if (document.documentElement.clientHeight -event.clientY + event.offsetY - event.target.parentElement.offsetHeight < this.$refs.crads.scrollHeight) {
      //   // this.infoVisible.top = event.clientY + window.pageYOffset - event.offsetY - this.$refs.crads.scrollHeight - 20;
      // }
      // 数据
      this.infoData = {}
      this.cacheArr.forEach(child => {
        if(child.userId === item.userId){
          this.infoData =  child
        }
      })
      if (!Object.keys(this.infoData).length) {
        api.personnelInformation(item.userId).then(res => {
          this.infoData =  res.dataList[0]
          this.cacheArr.push(this.infoData)
        })
      }
    },
    handleclick (id) {
      this.$router.push({path: '/myqingju/userDetails', query: {
        userId: id
      }})
    },
    handlePreAdd () {
      // 初始化
      this.$store.commit('SETLEVEL', 0)
      this.$store.commit('CLEARBREAD')
      this.$store.commit('CLEARUSER')
      this.$store.commit('DIALOGTOGGLE')
    },
    deleteRoleUser (item) {
      api.deleteRoleUser({
        roleId: sessionStorage.rolesId,
        userId: item.userId
      }).then(res => {
        this.$message.success('删除成功')
        this.getUserList()
      })
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.roles-user-container{
  padding: 20px;
}
.maintain-user{
  padding: 50px 20px;
  .user-p + .user-p{
    margin-top: 60px;
  }
  .label-title{
    color: #666;
  }
  .role-name{
    padding-left: 20px;
  }
  .role-placeholder{
    color: #D5D4D4;
    padding-left: 20px;
  }
}
.circular-icon{
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  background-color: #4B022B;
  color: #C4C6C7;
  cursor: pointer;
  .del-icon{
    width: 15px;
    height: 15px;
    background-color: #000;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    line-height: 15px;
    border-radius: 50%;
  }
}
.maintain-main{
  margin-left: 80px;
  margin-top: 30px;
  width: 800px;
  .maintain-li, .add-li{
    width: 150px;
    text-align: center;
    margin-bottom: 20px;
    display: inline-block;
    vertical-align: top;
  }
  .green-name{
    color: #00B38A;
    margin-top: 20px;
    height: 20px;
  }
  .gray-mobile{
    color: #999999;
    line-height: 32px;
  }
  .add-li{
    .add-icon{
      font-size: 32px;
      background-color: #f6f6f6;
      &:hover{
        background-color: #C4C6C7;
        color: #fff;
      }
    }
  }
}
@media screen and (min-width: 1600px) {
  .maintain-main{
    width: 1000px;
  }
}
@media screen and (min-width: 1800px) and (max-width: 2000px) {
  .maintain-main{
    width: 1200px;
  }
}
@media screen and (min-width: 2000px) {
  .maintain-main{
    width: 1300px;
  }
}
.card-info{
  box-shadow: 0 0 10px #F0F0F0;
  width: 310px;
  position: absolute;
  z-index: 3;
  background-color: #fff;
  transition: opacity .5s;
  .card-top{
    padding: 20px;
    line-height: 32px;
    position: relative;
    background-color: #F2F2F2;
    overflow: hidden;
  }
  .name{
    font-size: 22px;
  }
  .card-bottom{
    margin: 20px;
  }
  .block{
    overflow: hidden;
    .block-left{
      float: left;
      color: #999;
      width: 100px;
      line-height: 24px;
    }
    .block-right{
      float: left;
      line-height: 24px;
    }
  }
}
.btn-common{
  margin-top: 20px;
}
.btn-width{
  width: 100%;
}
.btn-footer{
  margin-top: 60px;
  margin-left: 90px;
}
.my-pagination{
  text-align: center;
}
</style>
