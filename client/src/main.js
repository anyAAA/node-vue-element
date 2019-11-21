import Vue from 'vue'
import App from './App.vue'
import axios from './http' // http.js 引入了axios 并进行请求和响应拦截
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'


Vue.use(ElementUI);
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')