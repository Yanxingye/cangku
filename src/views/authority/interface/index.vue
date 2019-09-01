<template lang="pug">
  .interface
    router-view(v-if="$route.name!=='auth-interface'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'auth-inter',
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
