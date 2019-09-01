<template lang="pug">
  .pages-detail
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .pages-details
        .list-item
          span.item-key 页面名称：
          span.item-data {{port.name}}
        .list-item
          span.item-key 页面描述：
          span.item-data {{port.description}}
        .list-item(:style="{display: 'flex'}")
          span.item-key 接口：
          //- span.item-data
            //- a-transfer(
            //-   :titles="['接口列表', '页面接口']"
            //-   :dataSource="dataSource"
            //-   :render="item=>item.title"
            //-   :listStyle="{width: '250px',height: '300px'}"
            //-   :targetKeys="targetKeys"
            //-   :selectedKeys="selectedKeys"
            //-   :showSearch="true"
            //- )
          .transferbox
            treeTransfer(
              :from_data = 'fromData'
              :to_data = 'toData'
              @addBtn='' @removeBtn=''
              :title=['接口列表', '页面接口']
              :key='key'
              filter
              :openAll='true'
            )
        .list-item
          span.item-key
          span.item-data
            a-button(@click="$router.push({name:'auth-pages'})") 返回
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'pages-details',
  data () {
    return {
      // name: '',
      // description: '',
      // dataSource: [],
      // targetKeys: [],
      // selectedKeys: [],
      // idList: []
      port: {},
      portName: [],
      fromData: [],
      toData: [],
      pagePort: [],
      label: [],
      key: '',
      checkKey: []
    }
  },
  mounted () {
    // this.query_classify().then(res => {
    //   res.data.forEach(item => {
    //     this.dataSource = this.dataSource.concat(item.list)
    //   })
    //   for (let i = 0; i < this.dataSource.length; i++) {
    //     this.dataSource[i].title = this.dataSource[i].name
    //     this.dataSource[i].key = this.dataSource[i].id.toString()
    //     this.dataSource[i].disabled = true
    //   }
    // })
    // this.get_page({
    //   id: this.$route.query.id
    // }).then(res => {
    //   console.log(res.data)
    //   this.description = res.data.description
    //   this.name = res.data.name
    //   res.data.pageFolderVos.forEach(item => {
    //     this.idList = this.idList.concat(item.folderPortVoList)
    //   })
    //   this.targetKeys = this.idList.map(item => {
    //     return item.portId
    //   })
    // })
    this.query_port_classify().then(res => {
      this.fromData = res.data
      console.log(this.fromData)
      // this.data2 = res.data
      for (var i = 0; i < res.data.length; i++) {
        this.fromData[i].label = res.data[i].folder
        this.fromData[i].id = (i + 1).toString()
        this.fromData[i].pid = i
        this.fromData[i].children = res.data[i].list
        this.fromData[i].disabled = true
        delete this.fromData[i].list
        for (var j = 0; j < res.data[i].children.length; j++) {
          this.fromData[i].children[j].label = this.fromData[i].children[j].name
          this.fromData[i].children[j].id = (i + '-' + this.fromData[i].children[j].id).toString()
          this.fromData[i].children[j].pid = (i + 1).toString()
          this.fromData[i].children[j].disabled = true
        }
      }
      if (res.retCode === 1) {
        // 回写
        this.get_page({id: this.$route.query.id}).then(res => {
          this.port = res.data
          console.log(res.data.pageFolderVos)
          for (var i = 0; i < res.data.pageFolderVos.length; i++) {
            for (var j = 0; j < this.fromData.length; j++) {
              if (res.data.pageFolderVos[i].folder === this.fromData[j].label) {
                if (res.data.pageFolderVos[i].folderPortVoList.length === this.fromData[j].children.length) {
                  this.toData.push(this.fromData[j])
                  this.fromData.splice(this.fromData.indexOf(this.fromData[j]), 1)
                  this.toData[i].children.map(item => {
                    item.disabled = true
                    this.pagePort.push(item.id)
                    // this.checkKey.push(item.id)
                  })
                } else {
                  this.toData.push(res.data.pageFolderVos[i])
                  this.toData[i].label = this.toData[i].folder
                  this.toData[i].children = this.toData[i].folderPortVoList
                  this.toData[i].pid = 0
                  this.toData[i].id = this.fromData[j].id
                  this.toData[i].disabled = true
                  this.toData[i].children.map(item => {
                    item.label = item.portName
                    item.pid = this.toData[i].id
                    item.id = this.toData[i].id + '-' + item.portId
                    item.disabled = true
                    this.pagePort.push(item.id.substring(item.id.indexOf('-') + 1))
                    this.fromData[j].children.map((items, index) => {
                      if (items.label === item.label) {
                        this.key = items.label
                        this.fromData[j].children.splice(index, 1)
                      }
                    })
                  })
                }
              }
            }
          }
        })
      }
    })
  },
  methods: {
    ...mapActions(['query_port_classify', 'get_page']),
    // 监听穿梭框组件添加
    add (fromData, toData, obj) {
      console.log(obj.keys, parseInt(obj.keys[0]))
      for (var i = 0; i < obj.keys.length; i++) {
        if (parseInt(obj.keys[0]) >= 10) {
          if (obj.keys[i].length > 2) {
            this.pagePort.push(obj.keys[i].substring(3))
          }
        } else {
          if (obj.keys[i].length > 2) {
            this.pagePort.push(obj.keys[i].substring(2))
          }
        }
      }
    },
    remove (fromData, toData, obj) {
      // console.log(obj)
      for (var i = 0; i < obj.keys.length; i++) {
        if (parseInt(obj.keys[0]) >= 10) {
          if (obj.keys[i].length > 2) {
            this.pagePort.splice(this.pagePort.indexOf(obj.keys[i].substring(3)), 1)
          }
        } else {
          if (obj.keys[i].length > 2) {
            this.pagePort.splice(this.pagePort.indexOf(obj.keys[i].substring(2)), 1)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.pages-details
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
    >>>.transferbox
      width 770px
      height 400px
      .nameauth
        width 70px
        height 40px
        line-height 40px
        float left
        text-align right
        font-size 14px
      .transfer
        width 680px !important
        float left
      .transfer-title
        .el-checkbox__input
          display none!important
</style>
