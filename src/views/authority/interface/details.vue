<template lang="pug">
  .inter-detail
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .inter-details
        ul
          li
            span.item-key 接口名称：
            span.item-data {{list.name}}
          li
            span.item-key 接口地址：
            span.item-data {{list.url}}
          li
            span.item-key 接口描述：
            span.item-data {{list.description}}
          li
            span.item-key 接口文件夹：
            span.item-data {{list.folder}}
          li
            span.item-key 接口类型：
            span.item-data {{list.type === 0 ? '平台':'管理后台'}}
          li
            span.item-key 接口状态：
            span.item-data {{list.status === 0 ? '可用':'不可用'}}
          li
            span.item-key
            span.item-data
              a-button(type="primary" @click="$router.go(-1)") 返回
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'inter-details',
  data () {
    return {
      list: {}
    }
  },
  methods: {
    ...mapActions(['get_port'])
  },
  mounted () {
    this.get_port({
      id: this.$route.query.id
    }).then(res => {
      this.list = res.data
    })
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.inter-details
  width 500px
  margin 50px auto
.inter-details li
  margin-top 15px
  font-size 16px
.inter-details li span.item-key
  display inline-block
  width 120px
  text-align right
</style>
