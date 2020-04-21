import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: '房源管理',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: '增加房源', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: '查看房源', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: '房源列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden:true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/example/list'),
        name: 'Dashboard',
        meta: { title: '房源管理', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/demand',
    children: [
      {
        path: 'demand',
        component: () => import('@/views/demand/index'),
        name: 'demand',
        meta: { title: '需求管理', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/index',
    children: [
      {
        path: 'customer',
        component: () => import('@/views/customer/index'),
        name: 'customer',
        meta: { title: '客户管理', icon: 'dashboard'}
      }
    ]
  },
  {
    path: '/follow',
    component: Layout,
    redirect: '/follow/index',
    children: [
      {
        path: 'follow',
        component: () => import('@/views/follow/index'),
        name: 'follow',
        meta: { title: '最新跟进', icon: 'dashboard'}
      }
    ]
  },

  
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '员工管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '员工管理',
          roles: ['admin']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
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
