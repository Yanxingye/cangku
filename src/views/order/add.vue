<template lang="pug">
  .order-add
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .order-add-form
        a-form(
          @submit="handleSubmit"
          :form="form"
        )
          a-form-item(
            label='合作商名称'
            v-bind="formItemLayout"
          )
            a-input(
              v-decorator="['companyName', {rules: [{ required: true, message: '请输入合作商名称' }]}]"
              placeholder='请输入合作商名称')
          a-form-item(
            label='联系人姓名'
            v-bind="formItemLayout"
          )
            a-input(
              v-decorator="['userName', {rules: [{ required: true, message: '请输入联系人姓名' }]}]"
              placeholder="请输入联系人姓名")
          a-form-item(
            label='联系方式'
            v-bind="formItemLayout"
          )
            a-input(
              v-decorator="['phone', {rules: [{ required: true, message: '请输入联系方式' }]}]"
              placeholder='请输入联系方式')
          a-form-item(
            label='所在地区'
            v-bind="formItemLayout"
          )
            a-input(
              v-decorator="['areaName', {rules: [{ required: true, message: '请输入所在地区' }]}]"
              placeholder='请输入所在地区')
          a-form-item(
            :wrapperCol="{ span: 12, offset: 5 }"
          )
            a-button(type='primary' htmlType='submit') 提交
            a-button.right(type='default' @click="$router.go(-1)") 取消
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'order-add',
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this),
      pageNo: 1,
      companyName: '',
      userName: '',
      phone: '',
      areaName: ''
    }
  },
  methods: {
    ...mapActions(['addCooperator']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(err, values)
        // this.pageNo = values.pageNo
        // this.companyName = values.companyName
        // this.userName = values.userName
        // this.phone = values.phone
        // this.areaName = values.areaName
        this.addCooperator({
          companyName: values.companyName,
          pageNo: values.pageNo,
          userName: values.userName,
          areaName: values.areaName,
          phone: values.phone
        }).then(res => {
          if (res.retCode === 1) {
            this.$message.info('新增成功')
            this.$router.go(-1)
          }
        })
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.order-add
  width 100%
  &-form
    width 550px
    margin 0 auto
  &-box
    width 100%
    height 40px
    font-size 14px
    color:rgba(0,0,0,0.85);
    margin-top 16px
    span.box-head
      display block
      width 444px
      height 40px
      line-height 40px
      background-color #f9f9f9
      padding 0 15px
      border-bottom 1px solid rgba(232,232,232,1)
      .key-name:last-child
        margin-left 140px
  .check-list
    width 444px
    border-bottom 1px solid rgba(232,232,232,1)
    .item-head
      width 170px
      padding 10px
    .item-list
      width 270px
      padding 10px
    .ant-checkbox-wrapper + .ant-checkbox-wrapper
      margin-left 0
  .right
    margin-left 8px
</style>
