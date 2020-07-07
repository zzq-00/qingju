export default {
  // 传入文件
  changeImg (e) { // 可以提取为公共方法 -- 大小和后缀只判断了一个文件的情况
    return new Promise(function (resolve, reject) {
      let files = e.target.files || e.dataTransfer.files
      let backObj = {}
      if (!files.length) return
      // let formData = new FormData()
      // formData.append('file', files[0])
      for (let i = 0; i < files.length; i++) {
        let size = files[i].size // 检测文件大小
        if (size / 1024 > 2000) {
          backObj.warnText = '文件不能大于2M'
        } else {
          // 检测文件后缀名
          // let fix = files[i].name
          // let fileFix = fix.substring(fix.lastIndexOf('.') + 1).toLowerCase()
          if (!/\/(?:jpeg|jpg|png)/i.test(files[i].type)) {
            backObj.warnText = '文件格式仅支持jpg、png'
          }
          // 把名字传过去
          backObj.name = files[i].name
          let reader = new FileReader()
          reader.readAsDataURL(files[i])
          reader.onloadend = function (e) {
            backObj.url = e.target.result
            if (backObj.url) {
              resolve(backObj)
            }
          }
        }
      }
    })
  }
}
