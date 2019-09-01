<template lang="pug">
  #user
    router-view(v-if="$route.name !== 'users-user'")
    list(v-else)
</template>
<script>
import list from './list'
export default {
  name: 'users-user',
  mounted () {
    console.log(this.$route)
  },
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    list
  }
}
</script>

<style lang="stylus">
</style>
