import api from '@/fetch/api'
import { Message } from 'element-ui'
function deepCopy(obj){
  if (typeof obj === 'object' && obj !== null) {
    let result
    result = Array.isArray(obj) ?  [] : {}
    Object.keys(obj).forEach(item => {
      if (typeof obj[item] === 'object' && obj[item] !== null) {
        result[item] = deepCopy(obj[item])
      } else {
        result[item] = obj[item]
      }
    })
    return result
  } else {
    return obj
  }
}

const struct = {
  state: {
    data: [],
    forbiddenVisible: false,
    currentNodeInfo: {},
  },
  mutations: {
    CHANGEDATA(state, data) {
      state.data = data
      console.log(data, '每次的终值')
   },
   VISIBLE(state){
    state.forbiddenVisible = !state.forbiddenVisible
   },
   CURRENTNODE(state, data){
     state.currentNodeInfo = data
   }
  },
  actions: {
    changedata ({commit, state}) {
      // 深拷贝
      let data = []
      data = deepCopy(state.data)
      commit('CHANGEDATA', data)
    },
    deletedata({ commit, state }, flag) {
      if (typeof flag === 'boolean') { // flag有两种情况： node(点击出弹窗，保存点击的数据) / true（弹窗内的确定，删除数据）
        api.deleteDeptById(state.currentNodeInfo.node.id).then(res => {
          Message.success('删除成功')
          // 页面删除
          // this.commit('changedata')
          state.currentNodeInfo.items.splice(state.currentNodeInfo.index, 1) // 直接改变了值
        }).catch(err => {
          console.log(err)
          Message.error(err.errorMsg)
        })
      } else if (flag) {
        commit('CURRENTNODE', flag)
      }
      commit('VISIBLE', flag)
    }
  }
}
export default struct
