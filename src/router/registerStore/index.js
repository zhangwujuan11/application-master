import Layout from '@/layout'
// import RegisterModel from '@/components/RegisterModel/index.vue'
const registerStoreRouter =
// 首页菜单注册商店的路由
  {
    path: '/registerStore',
    name:'RegisterStore',
    component: () => import('@/views/registerStore/index.vue'),
    meta: {
      title: '注册商店',
      icon: ''
    }
    // redirect: '/registerStore/index',
    // children: [
    //   {
    //     path: 'index',
    //     name: 'RegisterStore',
    //     component: () => import('@/views/registerStore/index.vue'),
    //     meta: {
    //       title: '注册商店',
    //       icon: ''
    //     }
    //   },
    //   {
    //     path: 'accountMes',
    //     component: () => import('@/views/registerStore/miniProgramRegister/index.vue'),
    //     meta: { title: '账户信息' }
    //   },
    //   {
    //     path: 'emailActive',
    //     component: () => import('@/views/registerStore/miniProgramRegister/emailActive.vue'),
    //     meta: { title: '邮箱激活' }

    //   },
    //   {
    //     path: 'personalData',
    //     component: () => import('@/views/registerStore/miniProgramRegister/personalData.vue'),
    //     meta: { title: '个人信息登记' }
    //   }
    // ]
  }

export default registerStoreRouter
