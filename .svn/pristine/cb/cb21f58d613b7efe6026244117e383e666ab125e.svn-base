<template>
  <div class="container" style="width:100%">
    <projectListheader/>
    <div class="Pro_content">
      <div class="title">
        <!-- <div>
          <el-tabs v-model="activeName">
            <el-tab-pane style="font-size:18px;" label="通知" name="first"></el-tab-pane>
            <el-tab-pane style="font-size:18px;" label="私信" name="second"></el-tab-pane>
          </el-tabs>
        </div> -->
      </div>
      <notice v-show="activeName==='first'"></notice>
      <!-- <privateLetter v-show="activeName==='second'"></privateLetter>-->
    </div>
  </div>
</template>


<script>
import projectListheader from "@/components/qingjuHeader";
import notice from '@/components/notice'        //通知
import privateLetter from '@/components/privateLetter'    //私信
import api from "@/fetch/api";

export default {
  components: {
    projectListheader,
    notice,
    privateLetter
  },
  data () {
    return {
      activeName: 'first',
    }
  },
  mounted () {
  },
  methods: {

  }

}

</script>

<style lang="less" scoped>
.Pro_content {
  width: 1200px;
  // margin: 100px auto 0 auto;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
<style>
/* .el-tabs__item.is-active {
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: #f01414;
  line-height: 36px;
}
.el-tabs__item:hover {
  color: #f01414;
  cursor: pointer;
}
.el-tabs__item {
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 36px;
  color: #333;
}
.el-tabs__active-bar {
  background-color: #f01414;
  width: 100px;
}
.el-tabs__nav-wrap::after {
  background-color: none;
} */
</style>
