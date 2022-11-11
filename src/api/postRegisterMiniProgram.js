import request from '@/utils/request'
export function postRegisterMiniProgram(data) {
  return request({
    url: '/api/application',
    method: 'post',
    data
  })
}
