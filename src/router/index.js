import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/RemoveBackground',
    name: 'RemoveBackground',
    component: () => import('@/views/RemoveBackground.vue'),
    meta: {
      title: '图片背景移除'
    }
  },
  {
    path: '/FaceRecognition',
    name: 'FaceRecognition',
    component: () => import('@/views/FaceRecognition.vue'),
    meta: {
      title: '人脸识别'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  //base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 使用路由元信息设置页面标题
  document.title = to.meta.title || '';
  next();
});
export default router
