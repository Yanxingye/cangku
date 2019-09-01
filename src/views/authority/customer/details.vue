<template lang="pug">
  .customer-detail
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .customer-details
        ul
          li
            span.item-key 用户名：
            span.item-data {{list.username}}
          li
            span.item-key 真实姓名：
            span.item-data {{list.name}}
          li
            span.item-key 手机号：
            span.item-data {{list.phone}}
          li
            span.item-key 性别：
            span.item-data {{list.sex === 1 ? '男':'女'}}
          li
            span.item-key 角色：
            span.item-data {{list.roleName}}
          li
            span.item-key
            span.item-data
              a-button(type="primary" @click="$router.go(-1)") 返回
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'customer-details',
  data () {
    return {
      list: {}
    }
  },
  components: {
  },
  methods: {
    ...mapActions(['get_user'])
  },
  mounted () {
    this.get_user({
      id: this.$route.query.id
    }).then(res => {
      this.list = res.data
    })
  }
}
</script>

<style scoped lang="stylus">
.customer-details
  width 500px
  margin 50px auto
.customer-details li
  margin-top 15px
  font-size 16px
.customer-details li span.item-key
  display inline-block
  width 120px
  text-align right
</style>
