<template lang="pug">
  .dingdan
    router-view(v-if="$route.name !== 'dingdans'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'dingdans',
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
