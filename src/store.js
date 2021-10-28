import { createStore } from "vuex"

const modules = {}

// 获取vuex下所有的./vuex/xxModel.js
const modelFiles = import.meta.globEager("./vuex/*Model.js") 
Object.keys(modelFiles).forEach(key => {
  const modelName = key.slice('./vuex/'.length, -'Model.js'.length)
  modules[modelName] = modelFiles[key].default
})

export default createStore({
  modules
})
