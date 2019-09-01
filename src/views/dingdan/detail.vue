<template lang="pug">
  .dingdan-detail
    .bb-nav.clearfix
      span.nav-item {{$route.meta.name}}
    .bb-content
      .center
        .goodsNo 商品编号
        .goodsName 商品名
        .number 数量
      //- .center(
      //-   v-for="(item, index) in list"
      //-   :key="index"
      //- )
      .center
        .goodsNo {{list.goodsNo}}
        .goodsName {{list.goodsName}}
        .number {{list.number}}
      .bottom
        a-button(type='primary' @click="finish") 完成
        a-button.right(type='default' @click="$router.go(-1)") 取消
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'dingdan-detail',
  data () {
    return {
      list: {}
    }
  },
  methods: {
    ...mapActions(['getOrderDetail', 'detailFinish']),
    getData () {
      this.getOrderDetail({
        id: this.$route.query.id
      }).then(res => {
        this.list = res.data
        console.log('11111', res.data)
      })
    },
    finish () {
      this.detailFinish({
        id: this.$route.query.id
      }).then(res => {
        if (res.retCote === 1) {
          this.$message.info('操作成功')
        }
      })
      this.$router.go(-1)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped lang="stylus">
.dingdan-detail
  width 100%
  .center
    width 60%
    margin 5px auto
    display flex
    .goodsNo
      width 30%
    .goodsName
      width 30%
    .number
      width 30%
  .bottom
    width 20%
    margin 40px auto 10px auto
    .right
      margin-left 8px
</style>
