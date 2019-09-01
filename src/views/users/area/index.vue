<template lang="pug">
  .users-area
    router-view(v-if="$route.name!=='users-area'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'users-area',
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
