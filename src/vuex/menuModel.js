const state = () => ({
  hasLeftMenu: false, // 是否有左侧菜单
  closeLeftMenu: false, // 是否隐藏左侧菜单
})

const mutations = {
  updateHasLeftMenu (state, { hasLeftMenu }) {
    state.hasLeftMenu = hasLeftMenu
  },

  updateCloseLeftMenu (state, { closeLeftMenu }) {
    state.closeLeftMenu = closeLeftMenu
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}