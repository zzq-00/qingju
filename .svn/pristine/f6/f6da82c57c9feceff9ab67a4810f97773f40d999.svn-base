import axios from 'axios'
import { Message } from 'element-ui'

// axios 配置
axios.defaults.timeout = 0
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.API_ROOT
// axios.defaults.baseURL = 'http://172.16.209.212:8092/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common['system'] = 'visitor'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 返回状态判断
axios.interceptors.response.use(
  response => {
    // if (response.data.size || response.data.type === 'application/vnd.ms-excel' || response.data.type === 'application/octet-stream' || (response.headers && (response.headers['content-type'] === 'application/vnd.ms-excel' || response.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8' || response.headers['content-type'] === 'application/octet-stream;charset=UTF-8'))) {
    if (response.data.toString() === '[object Blob]') {
      return response.data
    }
    if (response.data.errorCode !== '200') {
      // 登录状态丢失，未登录 1004
      if (response.data.errorCode === '1004') {
        setTimeout(() => {
          window.localStorage.clear()
          window.sessionStorage.clear()
          window.location.href = window.location.pathname === '/' ? '/' : '/login'
        }, 1000)
      }
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    console.log(error.toString());
    return Promise.reject(error.toString())
  }
)

function jsonp(url, callback, func) {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!')
    return;
  }
  return new Promise((resolve, reject) => {
    // 回调函数
    window[callback] = func
    var JSONP = document.createElement("script");
    JSONP.type = "text/javascript";
    JSONP.src = `${url}?callback=${callback}`;
    document.getElementsByTagName("head")[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName("head")[0].removeChild(JSONP)
    }, 500)
  })
}

let apiObject = {
  // 与学习平台有关
  isLogin(url, callback, func) {
    return jsonp(url, callback, func)
  },
  learnLoginOut(url, callback, func) {
    return jsonp(url, callback, func)
  }
}
// 自动导入当前文件夹下的文件内容，合并为一个Object。
// 不太好，建议只在文件中引入需要的接口
const apiFiles = require.context('.', false, /\.js$/)
apiFiles.keys().forEach(key => {
  if (key === './api.js') return
  apiObject = { ...apiObject, ...apiFiles(key).default }
})
export default apiObject
