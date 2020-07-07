export default {
  getMousePos (event) {
    var e = event || window.event
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop
    var x = e.pageX || e.clientX + scrollX
    var y = e.pageY || e.clientY + scrollY
    return { 'x': x, 'y': y }
  },
  windowClick () {
    window.onclick = function (event) {
      let self = event.target
      if (self.parentNode.className !== 'list-ul' && self.className !== 'icon-top') {
        for (let i = 0, len = document.getElementsByClassName('icon-top').length; i < len; i++) {
          document.getElementsByClassName('icon-top')[i].style.transform = 'rotate(0deg)'
          document.getElementsByClassName('icon-top')[i].style.borderTopColor = '#909399'
        }
        return false
      }
    }
  },
  goback () {
    history.go(-1) // 返回的列表
  },
  // 取数组的某一个值 -- 优化 因为取值是在sessionStorage 取的是字符串
  arrayHasVal (string, value) {
    let arr = string.split(',')
    for (let i = 0, len = arr.length; i < len; i++) {
      console.log(arr[i])
      if (arr[i] === value) {
        return true
      }
    }
    return false
  }
}
