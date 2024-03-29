import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from 'router/index'
import store from './store'
import vueawesome from 'vue-awesome-swiper'
import ElementUI from 'element-ui';
import * as echarts from 'echarts'


import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.js'

import 'assets/css/font-awesome.css'
import 'assets/css/base.css'
import 'assets/font/iconfont.css'
import 'assets/font/iconfont.js'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(vueawesome)
Vue.use(ElementUI)
    // Vue.use(ECharts)
new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')