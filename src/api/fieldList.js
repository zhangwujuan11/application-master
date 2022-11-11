import request from '@/utils/request'

export function getFieldList() {
  return request({
    url: '/constant/fieldList',
    method: 'get'
  })
}
// export function getVerificationCode() {
//   return request({
//     url: '/constant/verificationCode',
//     method: 'get'
//   })
// }
export function postRegisterMessage(data) {
  return request({
    url: '/constant/register',
    method: 'post',
    data
  })
}

