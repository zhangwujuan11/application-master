import COS from 'cos-js-sdk-v5'
import { getAuth } from '@/api/cos'
import cosAuth from '@/utils/cos-auth'

const Bucket = 'applet-1253674864'
const Region = 'ap-guangzhou'
// 初始化实例
export const cos = new COS({
  getAuthorization: async function(options, callback) {
    // 异步获取临时密钥
    const res = await getAuth({
      bucket: Bucket,
      region: Region
    })
    const { credentials, startTime, expiredTime } = res.result
    if (!credentials) return console.error('credentials invalid')

    callback({
      TmpSecretId: credentials.tmpSecretId,
      TmpSecretKey: credentials.tmpSecretKey,
      XCosSecurityToken: credentials.sessionToken,
      // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
      StartTime: startTime, // 时间戳，单位秒，如：1580000000
      ExpiredTime: expiredTime // 时间戳，单位秒，如：1580000900
    })
  }
})
// 获取签名函数
export async function getAuthorization(options) {
  const res = await getAuth({
    bucket: Bucket,
    region: Region
  })
  console.log(res)
  // eslint-disable-next-line no-unused-vars
  const { credentials, startTime, expiredTime } = res.result
  if (!credentials) return console.error('credentials invalid')
  return {
    XCosSecurityToken: credentials.sessionToken,
    Authorization: cosAuth({
      SecretId: credentials.tmpSecretId,
      SecretKey: credentials.tmpSecretKey,
      Method: options.Method,
      Pathname: options.Pathname
    })
  }
}
/**
 * 删除单个对象
 * @param {string} key  cos key
 * @return {Promise}
*/
export async function deleteObject(key) {
  await new Promise((resolve, reject) => {
    cos.deleteObject({
      Bucket: Bucket, /* 必须 */
      Region: Region, /* 存储桶所在地域，必须字段 */
      Key: key /* 必须 */
    }, function(err, data) {
      if (err) {
        reject(err)
      }
      const { statusCode } = data
      if (statusCode === 204 || statusCode === 200) {
        resolve()
      } else {
        reject(data)
      }
    })
  })
}

/**
 * 查询单个对象
 * @param {string} key  cos key
 * @return {Promise}
*/
export async function headObject(key) {
  const data = await new Promise((resolve, reject) => {
    cos.headObject({
      Bucket: Bucket, /* 必须 */
      Region: Region, /* 存储桶所在地域，必须字段 */
      Key: key /* 必须 */
    }, function(err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
  return data
}
