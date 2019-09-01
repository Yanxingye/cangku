<template lang="pug">
  .add-page
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .add-pages
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
              v-decorator="['name',{rules: [{ required: true, message: '请输入页面名称' }]}]"
              placeholder='请输入页面名称')
          a-form-item(
            label='页面描述'
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 12 }"
          )
            a-input(
              v-decorator="['description',{rules: [{ required: true, message: '请输入页面描述' }]}]"
              type="textarea" placeholder='请输入页面描述')
          .post-list(:style="{display: 'flex'}")
            .name 接口：
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
  name: 'add-pages',
  data () {
    return {
      form: this.$form.createForm(this),
      dataSource: [],
      targetKeys: [],
      selectedKeys: [],
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
    // this.queryPortClassify({}).then(res => {
    //   res.data.forEach(item => {
    //     this.dataSource = this.dataSource.concat(item.list)
    //   })
    //   for (let i = 0; i < this.dataSource.length; i++) {
    //     this.dataSource[i].title = this.dataSource[i].name
    //     this.dataSource[i].key = this.dataSource[i].id.toString()
    //   }
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
        this.fromData[i].disabled = false
        delete this.fromData[i].list
        for (var j = 0; j < res.data[i].children.length; j++) {
          this.fromData[i].children[j].label = this.fromData[i].children[j].name
          this.fromData[i].children[j].id = (i + '-' + this.fromData[i].children[j].id).toString()
          this.fromData[i].children[j].pid = (i + 1).toString()
          this.fromData[i].children[j].disabled = false
        }
      }
    })
  },
  methods: {
    ...mapActions(['query_port_classify', 'add_page']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.add_page({
            name: values.name,
            description: values.description,
            status: 0,
            pagePort: this.pagePort.join(',')
          }).then(res => {
            console.log(res.data)
            if (res.retCode === 1) {
              this.$message.success('新增成功')
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
  },
  components: {
  }
}
</script>

<style scoped lang="stylus">
.add-pages
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
