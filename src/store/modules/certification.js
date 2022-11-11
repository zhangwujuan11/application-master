const state = {
  // 保存程序认证的第一步的所有信息
  certificationMes: {},
  // 进入管理中心时点击管理时，激活的应用程序id
  activeProgramID: '',
  authenticationStatus: ''
}
const mutations = {
  SET_CERTIFICATION: (state, obj) => {
    state.certificationMes = obj
  },
  SET_ACTIVEPROGRAMID: (state, activeProgramID) => {
    state.activeProgramID = activeProgramID
  },
  SET_AUTHENTICATIONSTATUS: (state, authenticationStatus) => {
    state.authenticationStatus = authenticationStatus
  }

}

export default {
  namespaced: true,
  state,
  mutations
}
