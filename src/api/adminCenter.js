import request from '@/utils/request'

//管理员身份
export function kuakeadmin(data){
  return request({
    url:"/manage/applMain/isAdmin",
    method:'get',
    params:data
  })
}

// 根据username获取应用列表
export function getApplicationList(data) {
  return request({
    url: '/user/applMain/getMyAppls',
    method: 'post',
    data: data
  })
}

// 添加应用开发版本（未确认上传），基本信息
export function addNeverPublishVersion(data) {
  return request({
    url: '/user/applMain',
    method: 'post',
    data
  })
}

// 修改app
export function upappdata(data){
  return request({
      url: '/user/applMain',
      method: 'put',
      data
    })
}

// 应用详情
export function appdatas(n){
  return request({
    url:'/user/applMain/getApplsAllInfo',
    method:'get',
    params:{'appId':n}
  })
}





// 资源包管理列表
export function resourcePackag(params) {
  return request({
    url: '/user/applVersion',
    method: 'get',
    params:params
  })
}
//提交资源包
export function applVersion(data){
  return request({
    url:'/user/applVersion',
    method:'post',
    data
  })
}
// 更新资源包列表
export function updataapplVersion(data){
  return request({
    url:'/user/applVersion',
    method:'put',
    data
  })
}
// 资源包提交审核
export function submitAudit (data){
  return request({
    url:'/user/applVersion/submitAudit',
    method:'post',
    data
  })
}


//获取应用线上版本记录
export function onlineVersionRecord(data){
  return request({
    url:'/user/applVersion/onlineVersionRecord',
    method:'get',
    params:data
  })
}
//版本回退
export function rollback(data){
  return request({
    url:'/user/applVersion/rollback',
    method:'put',
    params:data
  })
}

//获取管理员列表
export function memberList(data){
  return request({
    url:'/user/applMember/getAll',
    method:'get',
    params:data
  })
}
//新增成员
export function applMember(data){
  return request({
    url:'/user/applMember',
    method:'post',
    data
  })
}
// 获取成员信息
export function getMemberInfo(data){
  return request({
    url:'/user/applMember',
    method:'get',
    params:data
  })
}
//删除成员
export function delapplMember(data){
  return request({
    url:'/user/applMember',
    method:'delete',
    params:data
  })
}
//获取应用详情
export function getApplsBasicInfoDetail(data){
  return request({
    url:'/user/applMain/getApplsBasicInfoDetail',
    method:'get',
    params:data
  })
}

// 提交夸克认证
export function kuakeCompany(data){
  return request({
    url:"/user/enterprise/authentication/" + data.appid,
    method:"post",
    data:data.data
  })
}

// 审核中获取相关公司认证信息
export function statuGetInfo(data){
  return request({
    url:'/user/enterprise/authentication/' + data ,
    method:'get',
  })
}

// 认证失败原因
export function remarkson(data){
  return request({
    url:'/user/enterprise/authenticationFailReason',
    method:'get',
    params:data
  })
}
// 撤销认证中
export function revoke(data){
  return request({
    url:"/user/enterprise/authentication/" + data,
    method:"put"
  })
}
// 需审核认证列表
export function Toexamine(data){
  return request({
    url:'/manage/applMain/getAuthenticationApplsBasicInfo',
    method:'post',
    data
  })
}

// 公司信息认证审核
export function examine(data){
  return request({
    url:"/manage/enterprise/authentication",
    method:"post",
    params:data
  })
}
// 审核应用
export function checkApp(data){
  return request({
    url:'/manage/applMain/checkApp',
    method:'get',
    params:data
  })
}
// 审核版本
export function checkAppservion(data){
  return request({
    url:'/manage/applMain/checkAppservion',
    method:'get',
    params:data
  })
}
// 获取应用商店列表
export function allList(data){
  return request({
    url:'/user/applMain/getApplsBasicInfo',
    method:'post',
    data
  })
}























export function putAuthentication(data) {
  return request({
    url: '/examine/application/authentication',
    method: 'put',
    data
  })
}
// 通过应用id获取基本信息

export function basicInformation(data) {
  return request({
    url: '/api/application/basic_information',
    method: 'get',
    params: data
  })
}
// 编辑应用额外信息（如截图，下载数量等）
export function updateExtraInformation(data) {
  return request({
    url: '/api/application/extra_information/edit',
    method: 'put',
    data
  })
}
// 基本信息：提交小程序信息和编辑（修改）小程序基本信息接口共用此接口
// export function updateBasicInation(data) {
//   return request({
//     url: '/api/application/basic_information/edit',
//     method: 'put',
//     data
//   })
// }

// 获取应用的所有版本信息
export function getAllVersions(data) {
  return request({
    url: '/api/application/versions',
    method: 'get',
    params: data
  })
}
// 将未提交审核的版本提交到审核版本
export function AddApplicationExamineVersion(data) {
  return request({
    url: '/user/applVersion/submitAudit',
    method: 'post',
    data
  })
}
// 撤销审核版本 （删除审核版本）
export function delApplicationExamineVersion(data) {
  return request({
    url: '/api/application/examine/version',
    method: 'delete',
    data
  })
}
// 删除开发版本
export function delApplicationDevVersion(data) {
  return request({
    url: '/api/application/dev/version',
    method: 'delete',
    data
  })
}
// 应用审核版本发布
export function AddApplicationProdVersion(data) {
  return request({
    url: '/api/application/prod/version',
    method: 'post',
    data
  })
}
// 下架线上的运行版本
export function OffApplicationProdVersion(data) {
  return request({
    url: '/api/application/prod/version',
    method: 'put',
    data
  })
}
// 历史版本回退
export function returnApplicationProdVersion(data) {
  return request({
    url: '/api/application/prod/re_online',
    method: 'put',
    data
  })
}
// 获取应用的所有成员信息（包含管理员）
export function findApplicationMembers(data) {
  return request({
    url: '/api/application/members',
    method: 'get',
    params: data
  })
}
// 给指定应用添加新成员
export function addApplicationMember(data) {
  return request({
    url: '/api/application/member',
    method: 'post',
    data
  })
}
// 指定应用下添加成员时的成员是否存在
export function IsRepeatApplicationMember(data) {
  return request({
    url: '/api/application/member/is_repeat',
    method: 'get',
    params: data
  })
}
// 编辑成员信息（权限、备注信息）
export function editApplicationMember(data) {
  return request({
    url: '/api/application/member',
    method: 'put',
    data
  })
}
// 删除成员
export function deleteApplicationMember(data) {
  return request({
    url: '/api/application/member',
    method: 'delete',
    data
  })
}
