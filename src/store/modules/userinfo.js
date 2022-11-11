import { USER_LOGIN } from './mutations-types.js'

export default{
   namespaced: true,
   state:{
    loginStatus:false,//登录状态
    token:null,	//token
    // userInfo:{}//用户信息
  },

  mutations: {
    //设置用户信息存储
      [USER_LOGIN](state,user){
        state.loginStatus = true;
        state.token = user;
        // state.userInfo = user;
        //本地存储
        localStorage.setItem('teaUserInfo',JSON.stringify(user));
      },

  },

}
