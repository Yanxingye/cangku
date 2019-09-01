import Http from '../lib/http'
// import router from '@/router'

export default {
  // 登录
  login ({commit}, params) {
    return Http.get('/:web/user/login_user', {
      params: {
        ...params,
        terminal: 2
      }
    })
  },
  // user/get_user_info 获取用户信息
  getUserInfo ({commit}, params) {
    return Http.get('/:web/user/get_user_info', {params})
  },
  // user/login_user 获取用户信息
  loginUser ({commit}, params) {
    return Http.get('/:web/user/login_user', {params})
  },
  // goods/add_warehouse 入库
  addWarehouse ({commit}, params) {
    return Http.get('/:web/goods/add_warehouse', {params})
  },
  // goods/reduce_warehouse 出库
  reduceWarehouse ({commit}, params) {
    return Http.get('/:web/goods/reduce_warehouse', {params})
  },
  // goods/query_warehouse 获取库存列表
  queryWarehouse ({commit}, params) {
    return Http.get('/:web/goods/query_warehouse', {params})
  },
  // goods/query_goods 获取商品信息列表
  queryGoods ({commit}, params) {
    return Http.get('/:web/goods/query_goods', {params})
  },
  // goods/add_goods 增加商品
  addGoods ({commit}, params) {
    return Http.get('/:web/goods/add_goods', {params})
  },
  // goods/query_cooperator 合作商列表
  queryCooperator ({commit}, params) {
    return Http.get('/:web/goods/query_cooperator', {params})
  },
  // goods/delete_cooperator 删除合作商
  deleteCooperator ({commit}, params) {
    return Http.get('/:web/goods/delete_cooperator', {params})
  },
  // goods/add_cooperator 增加合作商
  addCooperator ({commit}, params) {
    return Http.get('/:web/goods/add_cooperator', {params})
  },
  // goods/query_order 获取订单列表
  queryOrder ({commit}, params) {
    return Http.get('/:web/goods/query_order', {params})
  },
  // goods/add_order 增加订单
  addOrder ({commit}, params) {
    return Http.get('/:web/goods/add_order', {params})
  },
  // goods/detail_finish 点击已完成
  detailFinish ({commit}, params) {
    return Http.get('/:web/goods/detail_finish', {params})
  },
  // user/add_user 点击已完成
  addUser ({commit}, params) {
    return Http.get('/:web/user/add_user', {params})
  },
  // goods/get_order_detail 获取订单详情
  getOrderDetail ({commit}, params) {
    return Http.get('/:web/goods/get_order_detail', {params})
  }
}
