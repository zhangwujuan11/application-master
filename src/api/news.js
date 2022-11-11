import request from '@/utils/request'
export function getNeverPublishVersion() {
  return request({
    url: '/vue-element-admin/customer/detail',
    method: 'get'
  })
}
