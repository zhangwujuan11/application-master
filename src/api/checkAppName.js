import request from '@/utils/request'
export function checkAppName(data) {
  return request({
    url: '/api/application/name_repeat',
    method: 'get',
    params: data
  })
}
