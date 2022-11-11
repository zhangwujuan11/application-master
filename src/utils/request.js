import axios from 'axios'
import { getToken } from '@/utils/auth'
import router from '@/router'
const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false, // 上次设置是true的时候连接不了
  timeout: 8000
})
// 请求拦截器
server.interceptors.request.use(
  config => {
    const token = getToken().access_token
    config.headers['Accept'] = 'application/json'
    config.headers['x-requested-with'] = 'XMLHttpRequest'
    if (!config.headers.hasOwnProperty('Authorization') && token) {

      config.headers.Authorization ="bearer" + ' ' + token
    }
    return config
  },
  error => {
    // 请求错误时
    console.log(error) // debug 模式
    return Promise.reject(error)
  }
)
// 响应拦截器
server.interceptors.response.use( response => {
    if (response.status >= 200 < 300 ) {
      return response.data
    }else if (response.status === 401){
      console.log(response.data)
    } else {
      console.log('响应错误')
    }
  },
  error => {
    return Promise.reject(error)
    console.log('err' + error)
  }
)
export default server
