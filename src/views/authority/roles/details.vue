<template lang="pug">
  .roles-detail
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .roles-details
        .list-item
          span.item-key 角色名称：
          span.item-data {{name}}
        .list-item
          span.item-key 角色描述：
          span.item-data {{description}}
        .roles-details-box.clearfix()
          span.item-name.fl(:labelCol="{ span: 6 }") 权限配置：
          span.box-head.fl
            span.key-name 页面权限
            span.key-name 操作权限
        .check-list.clearfix(
          v-for="items,aindex in list"
          :key="aindex")
          .item-head.fl(
          )
            a-checkbox(
              :indeterminate="items.indeterminate"
              :checked="items.checkAll"
              @change="onCheckAllChange(items, aindex)"
              disabled
            ) {{items.name}}
          .item-list.fl
            a-checkbox(
              v-for="item,bindex in items.portList"
              :key="bindex"
              :checked="item.checked"
              @change="onChange(items, aindex, item, bindex)"
              disabled
            ) {{item.name}}
        .list-item
          span.item-key
          span.item-data
            a-button(@click="$router.push({name:'auth-roles'})") 返回
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'roles-details',
  data () {
    return {
      name: '',
      description: '',
      list: [],
      // 上传
      roleConfig: [],
      port: []
    }
  },
  mounted () {
    this.get_role({
      id: this.$route.query.id
    }).then(res => {
      this.name = res.data.name
      this.description = res.data.description
      this.roleConfig = res.data.roleConfigVos
      this.roleConfig.map(item => {
        item.portList.map(items => {
          this.port.push(item.pageId + '-' + items.id)
        })
      })
      console.log(this.roleConfig)
      this.query_page_port({}).then(res => {
        // console.log(res.data)
        this.list = res.data
        for (let i = 0; i < this.list.length; i++) {
          // 全部变灰
          this.list[i].checkAll = false
          this.list[i].indeterminate = false
          this.list[i].count = 0
          for (let j = 0; j < this.list[i].portList.length; j++) {
            this.list[i].portList[j].checked = false
          }
          // 开始回写  -  左侧
          this.roleConfig.map((item, index) => {
            if (item.pageId === this.list[i].pageId && item.portList.length === this.list[i].portList.length) {
              this.list[i].checkAll = true
              this.list[i].indeterminate = false
              // this.list[i].portList.indexOf()
            } else if (item.pageId === this.list[i].pageId && item.portList.length !== this.list[i].portList.length) {
              this.list[i].checkAll = false
              this.list[i].indeterminate = true
            }
          })
          // 全选-右侧
          if (this.list[i].checkAll === true) {
            this.list[i].portList.map(item => {
              item.checked = true
            })
          }
        }
        // console.log(this.port)
        // 半选 - 右侧
        this.list.map((item, index) => {
          item.portList.map((items, indexs) => {
            items.id = item.pageId + '-' + items.id
            if (this.port.indexOf(items.id) > -1) {
              items.checked = true
            }
          })
        })
      })
    })
  },
  methods: {
    ...mapActions(['get_role', 'query_page_port'])
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.roles-details
  width 800px
  margin 0 auto;
  .list-item
    width 100%
    margin-bottom 20px
    font-size 14px
    span.item-key
      display inline-block
      width 100px
      text-align right
      vertical-align top
    span.item-data
      display inline-block
  &-box
    width 100%
    height 40px
    font-size 14px
    span.item-name
      height 100%
      line-height 40px
      display block
      width 100px
      text-align right
      vertical-align middle
    span.box-head
      display block
      width 500px
      height 40px
      line-height 40px
      background-color #f9f9f9
      padding 0 15px
      .key-name:last-child
        margin-left 150px
  .check-list
    width 550px
    margin-left 100px
    .item-head
      width 210px
      padding 10px
    .item-list
      width 250px
      padding 10px
    .ant-checkbox-wrapper + .ant-checkbox-wrapper
      margin-left 0
  .right
    margin-left 30px
</style>
