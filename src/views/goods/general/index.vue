<template lang="pug">
  .general-goods
    router-view(v-if="$route.name !== 'goods-general'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'goods-general',
  data () {
    return {

    }
  },
  components: {
    list
  }
}
</script>

<style scoped lang="stylus">

</style>
