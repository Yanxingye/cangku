<template lang="pug">
  a-locale-provider(:locale="locale")
    #app
      router-view
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
export default {
  name: 'App',
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  data () {
    return {
      locale: zhCN
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import './assets/css/message.styl';
@import './assets/css/icon.styl';
body
  padding 0
  margin 0
  // overflow hidden
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // min-height 100vh
  padding 0
  background-color #f6f6f6
  font-size 16px
  // padding-top 44px
  width 100%
  // overflow hidden
  position relative
  width 100%
  height 100vh
*
  box-sizing border-box
a
  color rgb(51,179,209)
  text-decoration none
p
  padding 0
  margin 0
ul, li
  list-style none
  margin 0
  padding 0
.bb-content
  margin: 24px
  padding: 24px
  background: #fff
  border-radius:2px;
  // min-Height: 360px
span.look
  font-szie 14px
  color rgba(134, 95, 206, 1)
  display inline-block
  cursor pointer
.bb-nav
  background: #fff
  padding: 0 32px
  padding-bottom 16px
  .active
    color rgba(134, 95, 206, 1)!important
    border-bottom 2px solid rgba(134, 95, 206, 1)
  span.nav-bar
    margin 0 16px
  span.nav-key
    margin-top 6px
    margin-right 16px
  .nav-item
    font-size:20px;
    font-family:PingFangSC-Medium;
    font-weight:600;
    color:rgba(0,0,0,0.85);
    cursor pointer
  &-item
    padding 0 24px
    text-align right
    &-box:first-child
      text-align left
    &-box:last-child
      margin-left 40px
    &-box
      display inline-block
      margin-top 8px
      text-align right
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      .box-data,.box-key
        margin-top 8px
      .box-key
        color:rgba(0,0,0,0.45);
      .box-datas
        font-size:20px;
</style>
