import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/github-markdown.css'
import Vant from 'vant'
import { ImagePreview } from 'vant'
import 'vant/lib/index.css'
import dayjs from 'dayjs'
import './untils/dayjs'

import '@/assets/fonts/iconfont.css'
import 'amfe-flexible/index.min.js'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
Vue.use(ImagePreview)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  },
  render: (h) => h(App)
}).$mount('#app')
