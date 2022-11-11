import request from '@/utils/request'
export function getVerificationCode() {
  return request({
    url: '/constant/verificationCode',
    method: 'get'
  })
}
