<template>
  <div>
    <el-carousel height="400px" class="self-carousel" arrow="never" :interval="8000">
      <el-carousel-item v-for="(item,index) in swiperImg" :key="index">
        <a :href="item.attachURL.includes('http') ? item.attachURL : `http://${item.attachURL}`" target="_blank" v-if="item.attachURL">
          <img :src="item.imgURL" alt="" height="100%" width="100%">
        </a>
        <router-link to="/" v-else>
          <img :src="item.imgURL" alt="" height="100%" width="100%">
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import api from '@/fetch/api'

export default {
  data() {
    return {
      swiperImg: []
    }
  },
  methods: {
    getAllImg() {
      api.getAllImg().then(res => {
        this.swiperImg = res.dataList
      })
    }
  },
  mounted() {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
</style>
<style type="text/css">
/*改变的公共饿了么的轮播样式*/
.self-carousel .el-carousel__arrow--right {
  background: url('../assets/img/index-right-icon.png') no-repeat;
  width: 34px;
  height: 70px;
}
.self-carousel .el-carousel__arrow--right:hover {
  background-color: transparent;
}
.self-carousel .el-icon-arrow-right:before {
  content: '';
}
.self-carousel .el-carousel__arrow--left {
  background: url('../assets/img/index-left-icon.png') no-repeat;
  width: 34px;
  height: 70px;
}
.self-carousel .el-carousel__arrow--left:hover {
  background-color: transparent;
}
.self-carousel .el-icon-arrow-left:before {
  content: '';
}
.self-carousel .el-carousel__button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ffffff;
}
.self-carousel .el-carousel__indicator + .el-carousel__indicator {
  margin-left: 30px;
  width: 10px;
}
.self-carousel .el-carousel__indicators {
  bottom: 10px;
}
</style>
