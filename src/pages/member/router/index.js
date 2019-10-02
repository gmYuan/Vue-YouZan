// S1 导入路由组件
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// S2 配置路由属性
const routes = [{
    path: '/',
    component: ()=> import('../components/member.vue')
  },
  {
    path: '/address',
    component: ()=> import('../components/address/address.vue'),
    children: [
      {
        path: '',
        redirect: 'addressLists'

      },
      {
        path: 'addressLists',
        name: 'addressLists',
        component: ()=> import('../components/address/addressList.vue'),
      },
      {
        path: 'addressEdit',
        name: 'addressEdit',
        component: ()=> import('../components/address/addressEdit.vue'),
      }
    ]

  }
]


//S3 创建路由实例
const router = new Router({
  routes
})


export default router