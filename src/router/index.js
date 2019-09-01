import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 入库系统
const user = {
  path: '/menu/users/user',
  name: 'users-user',
  meta: {
    name: '入库系统'
  },
  component: () => import('@/views/users/user/index')
}
// 出库系统
const area = {
  path: '/menu/users/area',
  name: 'users-area',
  meta: {
    name: '出库系统'
  },
  component: () => import('@/views/users/area/index')
}
// 库存查询
const steward = {
  path: '/menu/users/steward',
  name: 'users-steward',
  meta: {
    name: '库存查询'
  },
  component: () => import('@/views/users/steward/index')
}
// 进销存管理
const users = {
  path: '/menu/users',
  name: 'users',
  meta: {
    name: '进销存管理',
    icon: 'pie-chart'
  },
  component: () => import('@/views/users/index'),
  redirect: '/menu/users/user',
  children: [user, steward, area]
}
// 普通商品
const general = {
  path: '/menu/goods/general',
  name: 'goods-general',
  meta: {
    name: '商品列表'
  },
  component: () => import('@/views/goods/general/index'),
  children: [
    {
      path: '/menu/goods/general/add',
      name: 'general-add',
      meta: {
        name: '新增商品'
      },
      component: () => import('@/views/goods/general/add')
    }
  ]
}
// goods 商品管理
const goods = {
  path: '/menu/goods',
  name: 'goods',
  meta: {
    name: '商品管理',
    icon: 'pie-chart'
  },
  component: () => import('@/views/goods/index'),
  redirect: '/menu/goods/general',
  children: [general]
}
// 客户信息
const order = {
  path: '/menu/order',
  name: 'order',
  meta: {
    name: '客户信息',
    icon: 'pie-chart'
  },
  component: () => import('@/views/order/index'),
  children: [
    {
      path: '/menu/order/list',
      name: 'orders',
      meta: {
        name: '客户信息',
        icon: 'pie-chart'
      },
      component: () => import('@/views/order/order'),
      children: [
        {
          path: '/menu/order/list/add',
          name: 'order-add',
          meta: {
            name: '新增客户',
            icon: 'pie-chart'
          },
          component: () => import('@/views/order/add')
        }
      ]
    }
  ]
}
// 订单信息
const dingdan = {
  path: '/menu/dingdan',
  name: 'dingdan',
  meta: {
    name: '订单信息',
    icon: 'pie-chart'
  },
  component: () => import('@/views/dingdan/index'),
  children: [
    {
      path: '/menu/dingdan/list',
      name: 'dingdans',
      meta: {
        name: '订单信息',
        icon: 'pie-chart'
      },
      component: () => import('@/views/dingdan/dingdan'),
      children: [
        {
          path: '/menu/dingdan/list/add',
          name: 'dingdan-add',
          meta: {
            name: '新增订单',
            icon: 'pie-chart'
          },
          component: () => import('@/views/dingdan/add')
        },
        {
          path: '/menu/dingdan/list/detail',
          name: 'dingdan-detail',
          meta: {
            name: '订单详情',
            icon: 'pie-chart'
          },
          component: () => import('@/views/dingdan/detail')
        }
      ]
    }
  ]
}
// // 接口管理
// const inter = {
//   path: '/menu/auth/interface',
//   name: 'auth-interface',
//   meta: {
//     name: '接口管理'
//   },
//   component: () => import('@/views/authority/interface/index'),
//   children: [
//     {
//       path: '/menu/auth/interface/add',
//       name: 'add-inter',
//       meta: {
//         name: '新增接口'
//       },
//       component: () => import('@/views/authority/interface/add')
//     },
//     {
//       path: '/menu/auth/interface/details',
//       name: 'inter-details',
//       meta: {
//         name: '接口信息'
//       },
//       component: () => import('@/views/authority/interface/details')
//     },
//     {
//       path: '/menu/auth/interface/edit',
//       name: 'edit-inter',
//       meta: {
//         name: '编辑接口'
//       },
//       component: () => import('@/views/authority/interface/edit')
//     }
//   ]
// }
// // 页面管理
// const pages = {
//   path: '/menu/auth/pages',
//   name: 'auth-pages',
//   meta: {
//     name: '页面管理'
//   },
//   component: () => import('@/views/authority/pages/index'),
//   children: [
//     {
//       path: '/menu/auth/pages/add',
//       name: 'add-pages',
//       meta: {
//         name: '新增页面'
//       },
//       component: () => import('@/views/authority/pages/add')
//     },
//     {
//       path: '/menu/auth/pages/details',
//       name: 'pages-details',
//       meta: {
//         name: '页面信息'
//       },
//       component: () => import('@/views/authority/pages/details')
//     },
//     {
//       path: '/menu/auth/pages/edit',
//       name: 'edit-pages',
//       meta: {
//         name: '编辑页面'
//       },
//       component: () => import('@/views/authority/pages/edit')
//     }
//   ]
// }
// // 角色管理
// const roles = {
//   path: '/menu/auth/roles',
//   name: 'auth-roles',
//   meta: {
//     name: '角色管理'
//   },
//   component: () => import('@/views/authority/roles/index'),
//   children: [
//     {
//       path: '/menu/auth/roles/add',
//       name: 'add-roles',
//       meta: {
//         name: '新增角色'
//       },
//       component: () => import('@/views/authority/roles/add')
//     },
//     {
//       path: '/menu/auth/roles/details',
//       name: 'roles-details',
//       meta: {
//         name: '角色信息'
//       },
//       component: () => import('@/views/authority/roles/details')
//     },
//     {
//       path: '/menu/auth/roles/edit',
//       name: 'edit-roles',
//       meta: {
//         name: '编辑角色'
//       },
//       component: () => import('@/views/authority/roles/edit')
//     }
//   ]
// }
// // 用户管理
// const customer = {
//   path: '/menu/auth/customer',
//   name: 'auth-customer',
//   meta: {
//     name: '用户管理'
//   },
//   component: () => import('@/views/authority/customer/index'),
//   children: [
//     {
//       path: '/menu/auth/customer/add',
//       name: 'add-customer',
//       meta: {
//         name: '新增用户'
//       },
//       component: () => import('@/views/authority/customer/add')
//     },
//     {
//       path: '/menu/auth/customer/details',
//       name: 'customer-details',
//       meta: {
//         name: '用户信息'
//       },
//       component: () => import('@/views/authority/customer/details')
//     },
//     {
//       path: '/menu/auth/customer/edit',
//       name: 'edit-customer',
//       meta: {
//         name: '编辑用户'
//       },
//       component: () => import('@/views/authority/customer/edit')
//     }
//   ]
// }
// // 权限管理
// const authority = {
//   path: '/menu/auth',
//   name: 'authority',
//   meta: {
//     name: '权限管理',
//     icon: 'icon-9'
//   },
//   component: () => import('@/views/authority/index'),
//   children: [customer, roles, inter, pages]
// }
// login
const login = {
  path: '/blank/login',
  name: 'login',
  meta: {
    name: '登录',
    icon: 'login'
  },
  component: () => import('@/views/login/login')
}
// 注册
const registered = {
  path: '/blank/registered',
  name: 'registered',
  meta: {
    name: '注册'
  },
  component: () => import('@/views/registered/registered')
}
// 路由导出
export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/layout/MainLayout'),
      redirect: '/blank/login',
      children: [
        {
          path: 'menu',
          component: () => import('@/layout/MenuLayout'),
          children: [users, goods, order, dingdan]
        },
        {
          path: 'blank',
          component: () => import('@/layout/BlankLayout'),
          children: [login, registered]
        }
      ]
    }
  ]
})
