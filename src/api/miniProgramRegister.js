// 后面小程序注册的api都放在这里
import request from '@/utils/request'
export function miniProgramEmailCheck(data) {
  return request({
    url: '/api/application/email_repeat',
    method: 'get',
    params: data
  })
}
