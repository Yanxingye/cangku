<template lang="pug">
  #home 首页敬请期待
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'home',
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['getUserInfo'])
  }
}
</script>

<style lang="stylus">
</style>
