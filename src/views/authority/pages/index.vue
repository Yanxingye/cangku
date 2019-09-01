<template lang="pug">
  .pages
    router-view(v-if="$route.name !== 'auth-pages'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'auth-pages',
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
