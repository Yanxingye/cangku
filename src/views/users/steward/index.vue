<template lang="pug">
  .users-steward
    router-view(v-if="$route.name!=='users-steward'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'users-steward',
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
