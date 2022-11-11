import Layout from '@/layout'
const registerRouter =
    {
      path: '/register',
      component: Layout,
      redirect: '/register/registerEmailinfo',
      children: [
        {
          path: 'registerEmailinfo',
          component: () => import('@/views/register/index.vue'),
          // component: () => import('@/components/RegisterModel/index.vue'),
          meta: {
            title: '注册'
          }
        },
        {
          path: 'registerEmailAct',
          component: () => import('@/views/register/registerEmailAct.vue'),
          meta: {
            title: '注册邮箱激活'
          }
        },
        {
          path: 'registerMesDown',
          component: () => import('@/views/register/registerMesDown.vue'),
          meta: {
            title: '注册信息登记'
          }
        }
      ]
    }
export default registerRouter
