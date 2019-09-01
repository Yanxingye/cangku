<template lang="pug">
  .edit-page
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .edit-pages
        a-form(
          @submit="handleSubmit"
          :form="form"
        )
          a-form-item(
            label='页面名称'
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 12 }"
          )
            a-input(
              v-decorator="['name',{rules: [{ required: true, message: '请输入页面名称' }],initialValue: port.name}]"
              placeholder='请输入页面名称')
          a-form-item(
            label='页面描述'
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 12 }"
          )
            a-input(
              v-decorator="['description',{rules: [{ required: true, message: '请输入页面描述' }],initialValue: port.description}]"
              type="textarea" placeholder='请输入页面描述')
          .post-list(:style="{display: 'flex'}")
            .name 接口：
            //- .list-box
            //-   a-transfer(
            //-     :titles="['接口列表', '页面接口']"
            //-     :dataSource="dataSource"
            //-     :render="item=>item.title"
            //-     :listStyle="{width: '250px',height: '300px'}"
            //-     :targetKeys="targetKeys"
            //-     :selectedKeys="selectedKeys"
            //-     @change="handleChange"
            //-     @selectChange="handleSelectChange"
            //-     :showSearch="true"
            //-   )
            .transferbox
              treeTransfer(
                :from_data = 'fromData'
                :to_data = 'toData'
                @addBtn='add' @removeBtn='remove'
                :title=['接口列表', '页面接口']
                :key='key'
                filter
                :openAll='true'
              )
          a-form-item(
            :wrapperCol="{ span: 12, offset: 4 }"
          )
            a-button(type='primary' htmlType='submit') 提交
            a-button.right(type='default' @click="$router.push({name:'auth-pages'})") 取消
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'edit-pages',
  data () {
    return {
      form: this.$form.createForm(this),
      name: '',
      description: '',
      dataSource: [],
      targetKeys: [],
      selectedKeys: [],
      idList: [],
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
    this.query_port_classify().then(res => {
      this.fromData = res.data
      console.log(this.fromData)
      // this.data2 = res.data
      for (var i = 0; i < res.data.length; i++) {
        this.fromData[i].label = res.data[i].folder
        this.fromData[i].id = (i + 1).toString()
        this.fromData[i].pid = i
        this.fromData[i].children = res.data[i].list
        // this.fromData[i].disabled = true
        delete this.fromData[i].list
        for (var j = 0; j < res.data[i].children.length; j++) {
          this.fromData[i].children[j].label = this.fromData[i].children[j].name
          this.fromData[i].children[j].id = (i + '-' + this.fromData[i].children[j].id).toString()
          this.fromData[i].children[j].pid = (i + 1).toString()
          // this.fromData[i].children[j].disabled = true
        }
      }
      if (res.retCode === 1) {
        // 回写
        this.get_page({id: this.$route.query.id}).then(res => {
          this.port.name = res.data.name
          this.port.description = res.data.description
          console.log(res.data.pageFolderVos)
          for (var i = 0; i < res.data.pageFolderVos.length; i++) {
            for (var j = 0; j < this.fromData.length; j++) {
              if (res.data.pageFolderVos[i].folder === this.fromData[j].label) {
                if (res.data.pageFolderVos[i].folderPortVoList.length === this.fromData[j].children.length) {
                  this.toData.push(this.fromData[j])
                  this.fromData.splice(this.fromData.indexOf(this.fromData[j]), 1)
                  this.toData[i].children.map(item => {
                    if (parseInt(item.id) > 10) {
                      this.pagePort.push(item.id.substring(3))
                    } else {
                      this.pagePort.push(item.id.substring(2))
                    }
                  })
                } else {
                  this.toData.push(res.data.pageFolderVos[i])
                  this.toData[i].label = this.toData[i].folder
                  this.toData[i].children = this.toData[i].folderPortVoList
                  this.toData[i].pid = 0
                  this.toData[i].id = this.fromData[j].id
                  this.toData[i].children.map(item => {
                    item.label = item.portName
                    item.pid = this.toData[i].id
                    item.id = this.toData[i].id + '-' + item.portId
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
    ...mapActions(['query_port_classify', 'get_page', 'modify_page']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.modify_page({
            id: this.$route.query.id,
            name: values.name,
            description: values.description,
            status: 0,
            pagePort: this.pagePort.join(',')
          }).then(res => {
            console.log(res.data)
            if (res.retCode === 1) {
              this.$message.success('修改成功')
              this.$router.push({
                name: 'auth-pages'
              })
            }
          })
        }
      })
    },
    handleChange (nextTargetKeys, moveKeys) {
      this.targetKeys = nextTargetKeys
      console.log('targetKeys: ', this.targetKeys.toString())
      // console.log('direction: ', direction)
      console.log('moveKeys: ', moveKeys)
    },
    handleSelectChange (sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]
      console.log('sourceSelectedKeys: ', sourceSelectedKeys)
      console.log('targetSelectedKeys: ', targetSelectedKeys)
    },
    // 监听穿梭框组件添加
    add (fromData, toData, obj) {
      console.log('add', fromData, toData)
      console.log(obj.keys, parseInt(obj.keys[0]))
      for (var i = 0; i < obj.keys.length; i++) {
        if (parseInt(obj.keys[0]) > 10) {
          if (obj.keys[i].length > 2) {
            this.pagePort.push(obj.keys[i].substring(3))
          }
        } else {
          if (obj.keys[i].length > 2) {
            this.pagePort.push(obj.keys[i].substring(2))
          }
        }
      }
      console.log(this.pagePort)
    },
    // 监听穿梭框组件移除
    remove (fromData, toData, obj) {
      console.log('remove', fromData, toData)
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
  },
  components: {
  }
}
</script>

<style scoped lang="stylus">
.edit-pages
  width 800px
  margin 0 auto
  .post-list
    width 100%
    margin-bottom 50px
    .name
      width 150px
      display inline-block
      text-align right
      vertical-align top
    .name:before
      content '*'
      display inline-block
      color red
      position relative
      left -5px
      top 4px
      font-size 18px
    .list-box
      display inline-block
      width 666px
  .right
    margin-left 30px
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
      width 668px !important
      float left
</style>
