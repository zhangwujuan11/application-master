
module.exports = [
  {
    url: '/vue-element-admin/customer/detail',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          versionNumber: '1.0.0',
          publisher: '真善美',
          publishTime: '2021-01-25 20:27:18',
          remarks: '无'
        }
      }
    }
  }
]
