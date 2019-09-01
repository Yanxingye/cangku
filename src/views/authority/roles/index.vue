<template lang="pug">
  .auth-roles
    router-view(v-if="$route.name !== 'auth-roles'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'auth-roles',
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
