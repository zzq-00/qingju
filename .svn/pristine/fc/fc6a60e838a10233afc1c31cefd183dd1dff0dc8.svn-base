
import { get, post } from 'axios'
/**
 * FastDFS
 */
export default {
  // 下载文件
  fastDFSDownload(fastdfsID) {
    return get(`FastDFS/fastDFSDownload/${fastdfsID}`)
  },
  // 上传文件
  fastDFSupload(params) {
    return post('FastDFS/fastDFSupload', params)
  },
  // 删除文件
  fastDFSDelect(id) {
    return get('FastDFS/fastDFSDelect/' + id)
  },
}
