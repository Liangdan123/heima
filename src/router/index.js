import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
//一级路由渲染在APP上
//当转换路径时候再去请求页面，路由懒加载
const routes = [
  {
    path:"/login",
    component:()=>import("@/views/login")
  }
]

const router = new VueRouter({
  routes
})

export default router
