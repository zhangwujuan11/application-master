import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import {overdue} from '@/api/login'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 无token也可进入的路由白名单
const whiteList = ['/login','/register']

router.beforeEach(async(to, from, next) => {



  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确认用户是否登录
  const hasToken = getToken()
  if (!hasToken) {
    if (whiteList.indexOf(to.path) >= 0) {
      // console.log('66')
      // 在白名单中，直接可进入
      next()
      NProgress.done()
    } else {
      // console.log('gg')
      alert('请先登录')
      store.commit('user/loginOut')
      next('/login')
      NProgress.done()
    }
  } else {
    // token是否过期
    overdue().then(res=>{
      if(res.data.active==true){
        next()
        NProgress.done()
      }
    }).catch(()=>{
      alert("登录过期,请重新登录")
      store.commit('user/loginOut')
      next('/login')
    })
  }
})



router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
