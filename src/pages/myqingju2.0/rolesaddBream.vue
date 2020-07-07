<template>
  <div class="my-breadcrumb">
    <p  @click="handleBream(-1)" class="title">{{$store.state.userInfo.companyName}}</p>
    <span v-for="(breamItem, breamIndex) in $store.state.rolesList.breadcrumbName" 
      :key="breamItem.name" @click="handleBream(breamItem.level, breamIndex)">
      <span :class="{'gray-title': breamIndex === $store.state.rolesList.breadcrumbName.length -1}">
        / <span class="bream-name">{{ breamItem.name}}</span> 
      </span>
    </span>
  </div>
</template>
<script>
export default {
  methods: {
    handleBream (level,breamIndex = -1) {
      console.log(level, 'level')
      // 点击标题
      if (level === -1) {
        this.$store.commit('POPBREAD', 0)
        this.$store.commit('SETLEVEL', 0)
      } else if (breamIndex !== this.$store.state.rolesList.breadcrumbName.length -1) {
        this.$store.commit('POPBREAD', +level+1)
        this.$store.commit('SETLEVEL', +level+1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  font-size: 32px;
  line-height: 50px;
  height: 50px;
  margin-bottom: 10px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.my-breadcrumb{
  padding-left: 20px;
  .bream-name{
    cursor: pointer;
    &:hover{
      color: #03B189;
    }
  }
}
.gray-title{
  color: #ccc;
  .bream-name{
    cursor: not-allowed;
    &:hover{
      color: #ccc;
    }
  }
}
</style>
