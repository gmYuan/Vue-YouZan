
// S1 导入路由组件
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// S2 配置路由属性
const routes = [{
  path: '/',
  component: ()=> import('./components/member.vue')
}]


//S3 创建路由实例
const router = new Router({
  routes
})


// S4 根组件注入
new  Vue({
  el: '#app',
  router,

})

