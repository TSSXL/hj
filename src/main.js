// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css'
import store from './store/index'

import axios from 'axios'
Vue.prototype.$http = axios;

axios.defaults.baseURL="http://192.168.1.105/HMC"

Vue.use(ElementUI);
Vue.use(VueVideoPlayer)
// 全局定义 cookie方法
Vue.prototype.setCookie = function (name, value) {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

Vue.prototype.getCookie = function (name) {
  var arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    return arr[2]
  } else {
    return null
  }
}
Vue.prototype.delCookie = function (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = this.setCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
