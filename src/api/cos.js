/* 对象存储相关服务 */
import request from '@/utils/request'
export function getAuth(data) { // 获取临时密钥
  return request({
    url: 'https://1to2to3.cn/cos/sts/credential',
    method: 'get',
    params: data
  })
}
