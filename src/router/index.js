import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//一级路由渲染在APP上
//当转换路径时候再去请求页面，路由懒加载
// 二级路由当中如果没有/ 那么就是会和一级路由进行拼接 假设一级路由 /my 二级路由 home 那么就是/my/home
// 二级路由当中如果有/ 那么就是不会和一级路由进行拼接
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/ ',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
