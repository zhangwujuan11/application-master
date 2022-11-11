import request from '@/utils/request'
import axios from 'axios'

// 登录获取token
export function login(options) {
  return axios({
    method:"POST",
    url:'https://1to2to3.cn/super-login/oauth/token',
    params:options
});
}

// 获取用户信息
export function userinfo(ad){
  return axios({
    url: 'https://1to2to3.cn/super-login/sys/me',
    method: 'post',
   headers:{Authorization:ad}
  })

}

//提交注册表单
export function postRegister(data){
  return axios({
    url:'https://1to2to3.cn/super-login/user/register',
    method:'post',
    data
  })
}

//企业认证服务类型、企业类型
export function serveType(data){
  return axios({
    url:'https://1to2to3.cn/rds2/service/query',
    method:'post',
    data
  })
}


// 微信扫码登录
export function wxcallBack(data){
  return axios({
    url:'https://1to2to3.cn/super-login/wx/htCallBack',
    method:'post',
    data
  })
}

// 微信扫码绑定手机
export function bindPhone(data){
  return axios({
    url:'https://1to2to3.cn/super-login/wx/htBind',
    method:'post',
    data
  })
}

// 发送短信验证码
export function sendVal(data){
  return axios({
    url:'https://1to2to3.cn/super-login/sms/dosendMsg',
    method:'post',
    data
  })
}
// 新增参数
export function paramsdata(data){
  return axios({
    url:'https://1to2to3.cn/rds2/service/query',
    method:'post',
    data
  })
}
// 判断token
export function overdue(){
  // console.log(JSON.parse(localStorage.getItem('token')).access_token)
  return axios({
    url:'https://1to2to3.cn/super-login/oauth/check_token',
    method:'post',
    // headers:{Authorization:'bearer'+ JSON.parse(localStorage.getItem('token')).access_token}
    params:{token:JSON.parse(localStorage.getItem('token')).access_token}
  })
}




// 微信登录获取用户信息
// export function wxgetUserInfo(data){
//   return axios({
//     url:'https://1to2to3.cn/super-login/wx/getUserInfo',
//     method:'post',
//     data
//   })
// }

//注册页面的验证码
// export function captcha(){
//   return axios({
//     url:'https://1to2to3.cn/super-login/sms/captcha.jpg',
//     method:'get',
//   })
// }

















// 在用户点击登录的时候开始调用获取key
export function getKey(data) {
  return request({
    url: '/constant/qrcheck/init',
    method: 'get',
    params: data
  })
}



// 二维码生成之后马上调用,获取缓存内容
// export function getCache(data) {
//   return request({
//     url: '/constant/cache',
//     method: 'get',
//     params: data
//   })
// }

// 云商快速登录
// export function quickLogin(data) {
//   return request({
//     url: '/constant/login/yunshang',
//     method: 'post',
//     data
//   })
// }
// 服务类别列表
export function serviceLabe(data){
  return axios({
    url:'https://1to2to3.cn/rds2/service/query',
    method:'post',
    data:{
    "auth": 2,
    "project": "applet",
    "table": "sys_sevice_label_info",
    "conditions": {
        "fields": [],
        "query": {

        }
       
    }
}
    
  })
}