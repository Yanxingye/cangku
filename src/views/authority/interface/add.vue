<template lang="pug">
  .add-inters
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .add-inter
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
              v-decorator="['name',{rules: [{ required: true, message: '请输入接口名称' }]}]"
              placeholder='请输入接口名称')
          a-form-item(
            label='接口地址'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['url',{rules: [{ required: true, message: '请输入接口地址' }]}]"
              placeholder='请输入接口地址')
          a-form-item(
            label='接口描述'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['description',{rules: [{ required: true, message: '请输入接口描述' }]}]"
              type="textarea" style="" placeholder='请输入接口描述')
          a-form-item(
            label='接口文件夹'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-select.item-selct(
              v-decorator="['code',{rules: [{ required: true, message: '请选择接口文件夹' }]}]"
              placeholder="请选择接口文件夹")
              a-select-option(
                v-for="item,index in classifyList"
                :value="item.code"
                :key="index + 'classify'"
              ) {{item.folder}}
          a-form-item(
            label='接口类型'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-select.item-selct(
              v-decorator="['type',{rules: [{ required: true, message: '请选择接口类型' }]}]"
              placeholder="请选择接口类型")
              a-select-option(value="0") 平台
              a-select-option(value="1") 管理后台
          a-form-item(
            label='接口状态'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-select.item-selct(
              v-decorator="['status',{rules: [{ required: true, message: '请选择接口状态' }]}]"
              placeholder="请选择接口状态")
              a-select-option(value="0") 可用
              a-select-option(value="1") 不可用
          a-form-item(
            :wrapperCol="{ span: 17, offset: 6 }"
          )
            a-button(type='primary' htmlType='submit') 提交
            a-button.right(type='default' @click="$router.push({name:'auth-interface'})") 取消
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'add-inter',
  data () {
    return {
      form: this.$form.createForm(this),
      classifyList: [],
      folder: ''
    }
  },
  mounted () {
    this.getClassify()
  },
  methods: {
    ...mapActions(['query_classify', 'add_port']),
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
          this.add_port({
            name: values.name,
            url: values.url,
            description: values.description,
            folder: this.folder,
            type: values.type,
            code: values.code,
            status: values.status
          }).then(res => {
            if (res.retCode === 1) {
              this.$message.success('新增成功')
              this.$router.go(-1)
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
.add-inter
  width 500px
  margin 0 auto
  .right
    margin-left 30px
</style>
