<template>
  <div class="intelligentModeling">
    <!-- <img src="@/assets/img/intelligentModeling.jpg" alt="intelligentModeling" width="100%" usemap="#planetmap"> -->
    <img src="@/assets/img/xiaoqing.jpg" alt="intelligentModeling" width="100%" usemap="#planetmap">
    <router-link to="/businessService/releaseEstimate?mode=2" class="button release1">召唤小青</router-link>
    <router-link to="/businessService/releaseEstimate?mode=2" class="button release2">召唤小青</router-link>
    <a href="javascript:;" class="button video1" @click="myVideo1=true">视频介绍</a>
    <a href="javascript:;" class="button video2" @click="myVideo2=true">视频介绍</a>
    <div class="mask" v-show="myVideo1">
      <div class="box">
        <span class="close" @click="videoClick('myVideo1', 'close')">&times;</span>
        <video id="myVideo1" :src="VIDEO_PATH+'xiaoqing.mp4'" controls="controls" width="auto">
          <source :src="VIDEO_PATH+'xiaoqing.mp4'"> 您的浏览器不支持视频的播放
        </video>
      </div>
    </div>
    <div class="mask" v-show="myVideo2">
      <div class="box">
        <span class="close" @click="videoClick('myVideo2', 'close')">&times;</span>
        <video id="myVideo2" :src="VIDEO_PATH+'xiaoqing1s.mp4'" controls="controls" width="auto">
          <source :src="VIDEO_PATH+'xiaoqing1s.mp4'"> 您的浏览器不支持视频的播放
        </video>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myVideo1: false,
      myVideo2: false,
      VIDEO_PATH: process.env.VIDEO_PATH
    }
  },
  methods: {
    videoClick(param, action) {
      let dom = document.getElementById(param)
      if (action && action === 'close') {
        this[param] = false
        dom.pause()
        return
      }
    }
  }
}
</script>
<style lang="less" scoped>
.intelligentModeling {
  margin-top: 130px;
  position: relative;
  .button {
    position: absolute;
    opacity: 0;
    &.release1 {
      width: 8%;
      height: 0.9%;
      top: 8.3%;
      left: 33%;
    }
    &.release2 {
      width: 9%;
      height: 1%;
      top: 58.2%;
      left: 67.4%;
    }
    &.video1 {
      width: 6.4%;
      height: 2.2%;
      top: 33%;
      left: 47.1%;
    }
    &.video2 {
      width: 6.4%;
      height: 2.2%;
      top: 66.6%;
      left: 47.4%;
    }
  }
  .mask {
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
        width: ~'calc(100% + 30px)';
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
          content: '';
        }
      }
    }
  }
}
</style>
