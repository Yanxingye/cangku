<template lang="pug">
  #w-header.clearfix.fr
    a-popover(title="待办" v-model="visible" placement="bottomRight" :overlayStyle="overlayStyle" )
      .backlog(slot="content")
        .backlog-list
          .list-title 商品审核
          .list-content.clearfix(:style="{margin: '12px 0'}")
            span.backlog-count.fl 12条待处理
            span.look.fr(@click="$router.push({name: 'audit-goods'})") 前往处理
      .icon-message
        a-icon(type="bell")
    span.user-avatar
    span.user-name 用户名
</template>
<script>
export default {
  name: 'w-header',
  mounted () {
  },
  data () {
    return {
      visible: false,
      overlayStyle: {
        width: '336px'
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
#w-header
  height 64px
  display flex
  align-items center
  .backlog
    max-height 370px
    overflow-y scroll
    .backlog-list
      width 288px
      height 50px
      border-bottom 1px solid rgba(232,232,232,1)
      .list-title
        font-size 14px
        color:rgba(0,0,0,0.65);
      .list-content
        width 288px
        margin 12px 0
        font-size 12px
        span.backlog-count
          font-size 12px
          color:rgba(0,0,0,0.45);
  .user-avatar
    width:24px;
    height:24px;
    background:rgba(198,169,252,1);
    border-radius 50%
    margin-right 10px
    margin-left 26px
  .user-name
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.65);
  .icon-message
    cursor pointer
</style>
