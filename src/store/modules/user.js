// import { logout, getInfo, login } from '@/api/user'
// import { quickLogin } from '@/api/login'
// import { getToken, setToken, removeToken, setAccount, removeAccount, setEmail, getEmail, removeEmail, removeActiveProgramId } from '@/utils/auth'
// import router, { resetRouter } from '@/router'
// // import { login } from '@/api/login'
// const state = {
//   token: getToken(),
//   name: '',
//   avatar: '',
//   introduction: '',
//   roles: [],
//   email: '',
//   account: ''
// }

// const mutations = {
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_INTRODUCTION: (state, introduction) => {
//     state.introduction = introduction
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   },
//   SET_ROLES: (state, roles) => {
//     state.roles = roles
//   },
//   SET_ACCOUNT: (state, account) => {
//     state.account = account
//   },
//   SET_EMAIL: (state, email) => {
//     state.email = email
//   }
// }

// const actions = {
//   // user login
//   // 账号密码登录
//   async logins({ commit }, userInfo) {
//     const { email, password } = userInfo
//     const data = await login({ email: email, password: password })
//     setToken(data.token)
//     commit('SET_TOKEN', data.token)
//     const res = await getInfo({ email: email })
//     commit('SET_ACCOUNT', res.creator)
//     setAccount(res.creator)
//     commit('SET_EMAIL', email)
//     setEmail(email)
//   },

//   // 云商扫码快捷登录
//   async quickLogins({ commit }, userInfo) {
//     const { account, bindId } = userInfo
//     const data = await quickLogin({ account: account })
//     setToken(data.token)
//     commit('SET_TOKEN', data.token)
//     // const res = await getInfo({ email: email })
//     commit('SET_ACCOUNT', account)
//     setAccount(account)

//     // commit('SET_EMAIL', email)
//     // setEmail(email)
//   },

//   async getInformations({ commit }) {
//     const emails = getEmail()
//     const data = await getInfo({ email: emails })
//     const { creator, email } = data
//     commit('SET_ACCOUNT', creator)
//     commit('SET_EMAIL', email)
//   },

//   // user logout
//   logout({ commit, state, dispatch }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         commit('SET_TOKEN', '')
//         commit('SET_ROLES', [])
//         removeToken()
//         resetRouter()
//         removeEmail()
//         removeAccount()
//         removeActiveProgramId()
//         // reset visited views and cached views
//         // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
//         dispatch('tagsView/delAllViews', null, { root: true })

//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       commit('SET_TOKEN', '')
//       commit('SET_ROLES', [])
//       removeToken()
//       resolve()
//     })
//   },

//   // dynamically modify permissions
//   async changeRoles({ commit, dispatch }, role) {
//     const token = role + '-token'

//     commit('SET_TOKEN', token)
//     setToken(token)

//     const { roles } = await dispatch('getInfo')

//     resetRouter()

//     // generate accessible routes map based on roles
//     const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
//     // dynamically add accessible routes
//     router.addRoutes(accessRoutes)

//     // reset visited views and cached views
//     dispatch('tagsView/delAllViews', null, { root: true })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }




const state = {
  loginStatus:false,//登录状态
  token:null,	//token
  refresh_token:'',//刷新token钥匙
  expires_in:null,//token过期时间
  token_type:'',//token类型
  userInfo:{}//用户信息
}
const mutations = {
  //登录信息存储
  USER_LOGIN(state,user){
    state.loginStatus = true;
    state.token =user.access_token
    // user.access_token;
    state.refresh_token = user.refresh_token;
    state.expires_in = user.expires_in;
    state.token_type = user.token_type;

    //本地存储
    localStorage.setItem('token',JSON.stringify(user));
  },
  //更新token
  UPDATE_USER_LOGIN(state,newToken){
   state.token = newToken.access_token;
   state.refresh_token = newToken.refresh_token;
   state.expires_in = newToken.expires_in;
   state.token_type = newToken.token_type;
    localStorage.setItem('token',JSON.stringify(newToken));
  },

USER_INFO(state,data){
   state.userInfo = data;
   localStorage.setItem('userinfo',JSON.stringify(data));
},
  // 登录信息读取
  INIT_USER(state){
    let usertoken = JSON.parse(localStorage.getItem('token'))
    let userInfo=JSON.parse(localStorage.getItem('userinfo'))
    if( usertoken ){
      loginStatus:true;
      state.token = usertoken;
      state.userInfo= userInfo
    }
  },
  // 退出登录
  loginOut(state){
    loginStatus:false;
    state.token = null;
    userInfo:{}
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
    localStorage.removeItem('codee');
  }
}




export default {
  namespaced: true,
  state,
  mutations,
}
