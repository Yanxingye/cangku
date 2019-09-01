<template lang="pug">
  .general-add
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .general-add-form
        a-form(
          @submit="handleSubmit"
          :form="form"
        )
          a-form-item(
            label='商品编号'
            v-bind="formItemLayout"
          )
            a-input(
              v-decorator="['goodsNo', {rules: [{ required: true, message: '请输入商品编号' }]}]"
              placeholder='请输入商品编号')
          a-form-item(
            label='商品名称'
            v-bind="formItemLayout"
          )
            a-input(
              v-decorator="['goodsName', {rules: [{ required: true, message: '请输入商品名称' }]}]"
              placeholder="请输入商品名称")
          a-form-item(
            label='合作商户'
            v-bind="formItemLayout"
          )
            a-input(
              v-decorator="['cooperator', {rules: [{ required: true, message: '请输入合作商户' }]}]"
              placeholder='请输入合作商户')
          a-form-item(
            label='采购单价'
            v-bind="formItemLayout"
          )
            a-input(
              v-decorator="['buyMoney', {rules: [{ required: true, message: '请输入数量' }]}]"
              placeholder='请输入数量')
          a-form-item(
            :wrapperCol="{ span: 12, offset: 5 }"
          )
            a-button(type='primary' htmlType='submit') 提交
            a-button.right(type='default' @click="$router.go(-1)") 取消
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'general-add',
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this),
      plainOptions: [
        {
          label: '家政保洁',
          value: '0'
        },
        {
          label: '家宴酒席',
          value: '1'
        },
        {
          label: '驾校报名',
          value: '2'
        }
      ],
      checkedList: [],
      list: [],
      areaList: [],
      pageAuth: [],
      pageData: []
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(['addGoods']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(err, values)
        // this.goodsNo = values.goodsNo
        // this.goodsName = values.goodsName
        // this.cooperator = values.cooperator
        // this.buyMoney = values.buyMoney
        this.addGoods({
          goodsNo: values.goodsNo,
          goodsName: values.goodsName,
          pageNo: 1,
          cooperator: values.cooperator,
          buyMoney: values.buyMoney
        }).then(res => {
          if (res.retCode === 1) {
            this.$message.info('新增成功')
            this.$router.go(-1)
          }
        })
      })
    },
    onChange () {},
    handleChange () {}
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.general-add
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
