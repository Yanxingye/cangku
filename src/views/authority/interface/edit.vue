<template lang="pug">
  .edit-inters
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .edit-inter
        a-form(
          @submit="handleSubmit"
          :form="form"
        )
          a-form-item(
            label='接口名称'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['name',{rules: [{ required: true, message: '请输入接口名称' }],initialValue: list.name}]"
              placeholder='请输入接口名称')
          a-form-item(
            label='接口地址'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['url',{rules: [{ required: true, message: '请输入接口地址' }],initialValue: list.url}]"
              placeholder='请输入接口地址')
          a-form-item(
            label='接口描述'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['description',{rules: [{ required: true, message: '请输入接口描述' }],initialValue: list.description}]"
              type="textarea" style="" placeholder='请输入接口描述')
          a-form-item(
            label='接口文件夹'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-select.item-selct(
              v-decorator="['code',{rules: [{ required: true, message: '请选择接口文件夹' }],initialValue: list.code}]"
              placeholder="请选择接口文件夹")
              a-select-option(v-for="item,index in classifyList"
                :value="item.code"
                :key="index") {{item.folder}}
          a-form-item(
            label='接口类型'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-select.item-selct(
              v-decorator="['type',{rules: [{ required: true, message: '请选择接口类型' }],initialValue: list.type}]"
              placeholder="请选择接口类型")
              a-select-option(v-for="item,index in list2"
              :value="item.code"
              :key="index") {{item.name}}
          a-form-item(
            label='接口状态'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-select.item-selct(
              v-decorator="['status',{rules: [{ required: true, message: '请选择接口状态' }],initialValue: list.status}]"
              placeholder="请选择接口状态")
              a-select-option(v-for="item,index in list1"
                :value="item.code"
                :key="index") {{item.name}}
          a-form-item(
            :wrapperCol="{ span: 17, offset: 6 }"
          )
            a-button(type='primary' htmlType='submit') 提交
            a-button.right(type='default' @click="$router.push({name:'auth-interface'})") 取消
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'edit-inter',
  data () {
    return {
      form: this.$form.createForm(this),
      classifyList: [],
      folder: '',
      list: {},
      list1: [
        {
          code: 0,
          name: '可用'
        },
        {
          code: 1,
          name: '不可用'
        }
      ],
      list2: [
        {
          code: 0,
          name: '平台'
        },
        {
          code: 1,
          name: '管理后台'
        }
      ]
    }
  },
  mounted () {
    this.getClassify()
    this.get_port({
      id: this.$route.query.id
    }).then(res => {
      this.list = res.data
    })
  },
  methods: {
    ...mapActions(['query_classify', 'get_port', 'modify_port']),
    getClassify () {
      this.query_classify().then(res => {
        this.classifyList = res.data
        console.log(this.classifyList)
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.classifyList.map((item) => {
            if (item.code === values.code) {
              this.folder = item.folder
              console.log(this.folder)
            }
          })
          this.modify_port({
            id: this.$route.query.id,
            name: values.name,
            url: values.url,
            description: values.description,
            folder: this.folder,
            type: values.type,
            code: values.code,
            status: values.status
          }).then(res => {
            if (res.retCode === 1) {
              this.$message.success('修改成功')
              this.$router.push({name: 'auth-interface'})
            }
          })
        }
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.edit-inter
  width 500px
  margin 0 auto
  .right
    margin-left 30px
</style>
