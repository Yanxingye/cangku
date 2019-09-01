<template lang="pug">
  .auth-customer
    router-view(v-if="$route.name!=='auth-customer'")
    list(v-else)
</template>

<script>
import list from './list'
export default {
  name: 'auth-customer',
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
