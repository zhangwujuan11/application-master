import request from '@/utils/request'
import axios from 'axios'

export function login(data) {
   
  return request({
    url: '/constant/login',
    method: 'post',
    data
  })
}


// 根据邮箱获取用户信息
export function getInfo(data) {
  return request({
    url: '/api/user/details',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
