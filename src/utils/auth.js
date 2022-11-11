import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return JSON.parse(localStorage.getItem('token'))
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 保存云商账号
export function setAccount(value) {
  return Cookies.set('account', value)
}
// 获取云商账号
export function getAccount() {
  return Cookies.get('account')
}
// 删除云商账号
export function removeAccount() {
  return Cookies.remove('account')
}
export function setEmail(value) {
  return Cookies.set('email', value)
}
export function getEmail() {
  return Cookies.get('email')
}
export function removeEmail() {
  return Cookies.remove('email')
}
// 保存激活的应用id
export function setActiveProgramId(value) {
  return Cookies.set('activeProgramId', value)
}
// 获取激活的应用id
export function getActiveProgramId(value) {
  return Cookies.get('activeProgramId', value)
}
// 删除激活的应用id
export function removeActiveProgramId() {
  return Cookies.remove('activeProgramId')
}
// 保存当前激活的应用的类型
export function setActiveProgramType(data) {
  return Cookies.set('activeProgramType',data)
}
// 获取当前激活的应用的类型
export function getActiveProgramType() {
  return Cookies.get('activeProgramType')
}
