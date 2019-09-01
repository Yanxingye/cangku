<template lang="pug">
  router-view(v-if="show === '1'")
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'goods',
  mounted () {
    var data2 = localStorage.getItem('zheng')
    console.log('123123', data2)
    this.show = data2
    console.log('123', this.show)
    if (this.show !== '1') {
      this.$confirm({
        title: '错误！',
        content: '您没有权限访问该系统！',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 0)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    }
  },
  data () {
    return {
      show: ''
    }
  },
  methods: {
    ...mapActions(['getUserInfo'])
  }
}
</script>

<style lang="stylus">
</style>
