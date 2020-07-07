<template>
  <span @click="handleClick" class="sort">
    <span>{{label}}</span>
    <span :class="{'arrow-default': arrow.default}"></span>
    <span :class="{'arrow-up': arrow.up}"></span>
    <span :class="{'arrow-down': arrow.down}"></span>
  </span>
</template>
<script>
export default {
  props: ['label', 'sortProp', 'sortDefault'],
  data () {
    return {
      arrow: {
        default: true,
        up: false,
        down: false
      }
    }
  },
  methods: {
    handleClick () {
      if (!this.arrow.default) {
        this.arrow.down = !this.arrow.down
        this.arrow.up = !this.arrow.up
      } else {
          this.arrow.down = true
          this.arrow.default = false
      }
      let order = this.arrow.up ? 'asc': 'desc'
      let col = {
        prop: this.sortProp,
        order: order
      }
      this.$emit('handleSortChange', col)
    }
  },
  watch: {
    sortDefault: function (val) {
      if (!val) {
        this.arrow.default = true
        this.arrow.down =false
        this.arrow.up = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.sort{
  cursor: pointer;
}
</style>
