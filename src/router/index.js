import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import registerStoreRouter from './registerStore'
// import registerRouter from './register'
import homeLayout from '@/views/home/layout'
// import homeLayout from '@/views/home/Layout/index.vue'
// import role from 'mock/role'
/* Router Modules */
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/home',
    // component: adminLayout,
    component: Layout,
    redirect: '/home/index',
    children: [
      // 点击管理中心之后的页面（应用列表页）
      {
        path: 'index',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '应用列表' }
      }
    ]
  },
  {
    path: '/registerStore',
    name:'RegisterStore',
    component: () => import('@/views/registerStore/index.vue')
  },

  // 程序管理首页
  {
    path: '/home/adminCenter/homePage',
    component: homeLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/adminCenter/homePage/index.vue'),
        meta: { title: '管理中心', icon: 'email' }
      }
    ]
  },
  // 程序认证
  // {
  //   path: '/home/adminCenter/certification',
  //   component: Layout,
  //   redirect: '/home/adminCenter/certification/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/home/adminCenter/certification/index.vue'),
  //       meta: { title: '认证信息', icon: 'email' }
  //     },
  //     {
  //       path: 'billDown',
  //       component: () => import('@/views/home/adminCenter/certification/billDown.vue'),
  //       meta: { title: '认证信息', icon: 'email' }
  //     },
  //     {
  //       path: 'payMoney',
  //       component: () => import('@/views/home/adminCenter/certification/payMoney.vue'),
  //       meta: { title: '支付', icon: 'email' }
  //     }
  //   ]
  // },


  // 小程序基本信息
  {
    path: '/home/adminCenter/miniProgramMessage',
    component: homeLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/adminCenter/miniProgramMessage/index.vue'),
        name:'ProgramMessage',
        meta: { title: '基本信息', icon: 'email' }
      }
    ]
  },
  // 展示基本信息
  {
    path: '/home/adminCenter/miniProgramMessage',
    component: homeLayout,
    children: [
      {
        path: 'showMessage',
        component: () => import('@/views/home/adminCenter/miniProgramMessage/showMessage.vue')
      }
    ]
  },
  // 上传资源包
  // {
  //   path: '/home/adminCenter/resourcePackage',
  //   component: homeLayout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/home/adminCenter/resourcePackage/index.vue'),
  //       meta: { title: '上传资源', icon: 'email' }
  //     }
  //   ]
  // },
  //权限管理
  {
    path: '/home/adminCenter/jurisdiction',
    component: homeLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/adminCenter/jurisdiction/index.vue'),
        meta: { title: '权限管理', icon: 'email' }
      }
    ]
  },
  // 成员管理
  {
    path: '/home/adminCenter/memberAdmin',
    component: homeLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/adminCenter/memberAdmin/index.vue'),
        meta: { title: '成员管理', icon: 'email' }
      }
    ]
  },

  // 审核认证
  {
    path: '/home/adminCenter/examine',
    component: homeLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/adminCenter/examine/index.vue'),
        meta: { title: '审核认证' }
      },
      {
        path: '/CompanyDetails',
        component: () => import('@/views/home/adminCenter/examine/CompanyDetails.vue'),
        meta: { title: '审核认证' }
      },
      {
        path: '/AppDetails',
        component: () => import('@/views/home/adminCenter/examine/AppDetails.vue'),
        meta: { title: '审核认证' }
      },
      {
        path: '/DevChek',
        component: () => import('@/views/home/adminCenter/examine/DevChek.vue'),
        meta: { title: '审核认证' }
      }
    ]
  },
  //版本管理
  {
    path: '/home/adminCenter/versionAdmin',
    component: homeLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/adminCenter/versionAdmin/index.vue'),
        meta: { title: '版本管理', icon: 'email' }
      }
    ]
  },
  // 用户反馈
  {
    path: '/home/adminCenter/userResponse',
    component: homeLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/adminCenter/userResponse/index.vue'),
        meta: { title: '用户反馈', icon: 'email' }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [
      {
        path: 'login',
        component: () => import ('@/views/login/index'),
        name: 'Login',
        meta: { title: '首页', icon: 'email' }
      }
    ]
  },
  // {
  //   path: '/adminCenter',
  //   redirect: '/adminCenter/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/home/index.vue')
  //     }
  //   ]
  // },

  // registerStoreRouter,
  // registerRouter,
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/register',
     component: () => import('@/views/register/index.vue'),

  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  linkExactActiveClass: 'active',
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
