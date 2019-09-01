// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import utils from './lib/utils'
import antd from './lib/antd'
import echarts from 'echarts'
import api from './lib/api'
import * as components from './components'
// import axios from 'axios'
// Vue.prototype.$http = axios
Vue.prototype.$api = api
Object.keys(components).forEach(key => Vue.use(components[key]))
Vue.prototype.$utils = utils
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(antd)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
