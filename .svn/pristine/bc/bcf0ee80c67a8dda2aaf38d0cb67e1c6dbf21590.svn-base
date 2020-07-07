
const rolesList = {
  state: {
    breadcrumbName: [],
    currentLevel: 0,
    userList: [],
    userVisible: false,
    deptIdstate: [],
    userIdstate: []
  },
  mutations: {
    SETLEVEL (state, level) {
      state.currentLevel = level
    },
    PUSHBREAD (state, data) {
      state.breadcrumbName.push(data)
    },
    POPBREAD (state, index) {
      state.breadcrumbName.splice(index, state.breadcrumbName.length)
    },
    CLEARBREAD (state) {
      state.breadcrumbName = []
    },
    PUSHUSER (state, data) {
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (!state.userList.includes(item)) {
            state.userList.push(item)
            if (item.depart) {
              state.deptIdstate.push(item)
            } else {
              state.userIdstate.push(item)
            }
          }
        })
      } else {
        if (!state.userList.includes(data.id)) {
          state.userList.push(data)
          if (data.depart) {
            state.deptIdstate.push(data)
          } else {
            state.userIdstate.push(data)
          }
        }
      }
      console.log(data, 'push')
      console.log(state.userList, 'state.userList')
      // 判断userlist有不有重复数据
      let dataCache = []
      state.userList.forEach((item, index) => {
        if (!dataCache.includes(item.id)) {
          dataCache.push(item.id)
        } else {
          state.userList.splice(index, 1)
        }
      })
    },
    POPUSER (state, data) {
      if (Array.isArray(data)) {
        // 数组对比 -- 第一层
        data = data.map(item => item.id)
        state.userList = state.userList.filter(item => {
          if (!data.includes(item.id)) {
            return item
          }
        })
        state.deptIdstate = state.deptIdstate.filter(item => {
          if (!data.includes(item.id)) {
            return item
          }
        })
        state.userIdstate = state.userIdstate.filter(item => {
          if (!data.includes(item.id)) {
            return item
          }
        })
      } else {
        state.userList = state.userList.filter(item => {
          if (item.id !== data.id) {
            return item
          }
        })
        state.deptIdstate = state.deptIdstate.filter(item => {
          if (item.id !== data.id) {
            return item
          }
        })
        state.userIdstate = state.userIdstate.filter(item => {
          if (item.id !== data.id) {
            return item
          }
        })
        
      }
      // 判断userlist有不有重复数据 -- 提取
      let dataCache = []
      state.userList.forEach((item, index) => {
        if (!dataCache.includes(item.id)) {
          dataCache.push(item.id)
        } else {
          state.userList.splice(index, 1)
        }
      })
      console.log(state.userList, '存在值')
    },
    CLEARUSER (state) {
      state.userList = []
      state.deptIdstate = []
      state.userIdstate = []
    },
    DIALOGTOGGLE (state) {
      state.userVisible = !state.userVisible
    }
  }
}
export default rolesList