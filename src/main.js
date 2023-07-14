import Vue from 'vue'
import App from './App.vue'
// 引入route
import router from '@/router'
// 按需引入
import {
  Upload,
  Button,
  Loading,
  Row,
  Alert
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Upload).use(Button).use(Loading).use(Row).use(Alert)

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
