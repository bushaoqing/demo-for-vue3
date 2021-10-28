const state = () => ({
  userInfo: {
    name: 'abu',
    age: 26
  } // 存储用户基本信息
})

const mutations = {
  updateUserInfo (state, { userInfo }) {
    state.userInfo = userInfo
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}