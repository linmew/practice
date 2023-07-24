import Vue from 'vue'
import App from './App.vue'
// 引入route
import router from '@/router'
// 引入pinia
import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 按需引入
import {
  Upload,
  Button,
  ButtonGroup,
  Loading,
  Row,
  Alert,
  Divider
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
// pinia持久化保存
pinia.use(piniaPluginPersistedstate)
// element组件按需引入
Vue.use(Upload).use(Button).use(ButtonGroup).use(Loading).use(Row).use(Alert).use(Divider)

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
