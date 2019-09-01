<template lang="pug">
  .order
    router-view(v-if="$route.name !== 'orders'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'orders',
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
