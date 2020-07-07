export default {
  // 传入文件 -- 暂时没用
  changeFile (e) {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    let formData = new FormData()
    formData.append('file', files[0])
    for (let i = 0; i < files.length; i++) {
      this.addFile.filename.push(files[i].name)
      this.show.file = false
    }
  }
}
