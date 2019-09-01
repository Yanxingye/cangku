<template lang="pug">
  .dingdan-add
    .bb-nav.clearfix
      span.nav-item {{$route.meta.name}}
    .bb-content
      .title
        span 买家名称：
        a-input(:style="{width:'840px'}" v-model="companyName")
      .title
        span 联系方式：
        a-input(:style="{width:'840px'}" v-model="phone")
      .dingdan-add-list(v-for="item,index in contentList" :key="index")
        //- .title
        //-   span 买家名称：
        //-   a-input(:style="{width:'840px'}" v-model="item.companyName")
        //- .title
        //-   span 联系方式：
        //-   a-input(:style="{width:'840px'}" v-model="item.phone")
        .list-goodId
          span 商品编号：
          //- a-input(:style="{width:'840px'}" v-model="item.goodId" defaultValue="{contentList.goodId}")
          a-input(:style="{width:'840px'}" v-model="item.goodsNo")
          a-icon.dele(:style="{marginLeft:' 16px'}" type="minus-circle-o" v-if="index>0" @click="delet(index)")
        .list-goodId
          span 商品名称：
          //- a-textarea(:style="{width:'840px'}" v-model="item.goodName" defaultValue="{contentList.goodName}")
          a-input(:style="{width:'840px'}" v-model="item.goodsName")
        .list-goodName
          span 数量:
          //- a-textarea(:style="{width:'840px'}" v-model="item.goodName" defaultValue="{contentList.goodName}")
          a-input(:style="{width:'840px'}" v-model="item.number")
      .dingdan-add-add
        a-button(:style="{width:'840px'}" type="dashed" icon="plus" @click="add") 添加
    .bb-footer
      a-button.fr(style="margin: 0 12px 0 12px" @click="$router.go(-1)") 取消
      a-button.fr(type="primary" @click="handleSubmit") 完成
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'dingdan-add',
  data () {
    return {
      contentList: [
        {
          // companyName: '',
          // phone: '',
          goodsNo: '',
          goodsName: '',
          number: ''
        }
      ],
      companyName: '',
      phone: '',
      goodsNo: '',
      goodsName: '',
      number: ''
    }
  },
  mounted () {
    // this.queryHelpCenter().then(res => {
    //   console.log(res)
    //   this.contentList = res.data
    // })
  },
  methods: {
    // ...mapActions(['addHelpCenterJson', 'queryHelpCenter']),
    ...mapActions(['addOrder']),
    delet (index) {
      console.log(index)
      if (this.contentList.length > 0) {
        this.contentList.splice(index, 1)
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      console.log('22', this.contentList)
      this.addOrder({
        companyName: this.companyName,
        phone: this.phone,
        // goodsNo: this.contentList.goodsNo,
        // goodsName: this.contentList.goodsName,
        // number: this.contentList.number
        orderInfo: JSON.stringify(this.contentList)
      }).then(res => {
        if (res.retCode === 1) {
          this.$message.info('编辑成功')
          this.$router.go(-1)
        }
      })
    },
    add () {
      if (this.contentList.length < 10) {
        this.contentList.push({})
        console.log('contentList', this.contentList)
      } else {
        this.$message.info('请勿添加超过十条数据！')
      }
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.dingdan-add
  width 100%
  &-list
    width 100%
    margin-bottom 32px
    span
      display inline-block
      width 80px
    .list-goodId
      margin-bottom 24px
    .list-goodName
      span
        vertical-align top
  &-add
    margin-left 80px
  .bb-footer
    width 96%
    height 56px
    background-color #fff
    padding 12px
    position fixed
    bottom  0px
    right 0px
  .title
    margin-bottom 32px
</style>
