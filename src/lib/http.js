import axios from 'axios'
import store from '@/store'
import router from '@/router'
import api from './api'
import Vue from 'vue'

const Http = axios.create({
  withCredentials: true
})
const errorMap = {
  2: '失败',
  101: '系统繁忙，请稍后再试',
  102: '参数错误',
  103: '权限错误',
  104: '用户未登录',
  105: '记录未找到',
  106: '网络请求超时',
  107: '网络响应超时',
  108: '服务不可用',
  109: '签名验证失败',
  130: '操作过于频繁',
  131: '操作有风险'
}
let loadingCount = 0
// 请求拦截
Http.interceptors.request.use(config => {
  // token处理
  // const token = store.state.token
  // if (token) {
  //   config.headers.Auth  orization = config.headers.Authorization || `Bearer ${token}`
  // }
  // console.log(config)
  loadingCount++
  store.commit('setState', {loading: loadingCount > 0})
  // 获得完整URL
  config.url = api(config.url)
  config.params = {...config.params, t: (new Date()).getTime()} // 设置时间戳防止缓存
  return config
}, error => {
  return Promise.reject(error)
})

Http.interceptors.response.use(response => {
  // 对响应数据做些事
  loadingCount--
  store.commit('setState', {loading: loadingCount > 0})
  const {retCode, retMsg} = response.data
  if (retCode === 1) {
    return response.data
  } else {
    let error = retMsg || errorMap[retCode]
    if (retCode === 104) {
      router.push({
        name: 'login'
      })
    } else {
      !response.alertDisabled && error && Vue.prototype.$message.info(error) // alertDisabled 主动不显示错误提示
    }
    return Promise.reject(error)
  }
}, error => {
  loadingCount--
  store.commit('setState', {loading: loadingCount > 0})
  if (error instanceof Error) {
    if (error.response && error.response.data) {
      if (error.response.data.status === 104) {
        // 跳转到登录页面
        router.push({
          name: 'login'
        })
      }
    } else {
      Vue.prototype.$message.info('网络连接失败')
    }
  }
  // 取消请求
  if (error.__CANCEL__) {
    error.cancel = true
  }
  return Promise.reject(error)
})

export default Http
