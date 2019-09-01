<template lang="pug">
  .edit-customers
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .edit-customer
        a-form(
          @submit="handleSubmit"
          :form="form"
        )
          a-form-item(
            label='用户名'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['username',{rules: [{ required: true, message: '请输入用户名' }],initialValue: list.username}]"
              placeholder='请输入用户名' disabled)
          a-form-item(
            label='密码'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['password',{initialValue: ''}]"
              type="password" placeholder='请输入密码')
          a-form-item(
            label='真实姓名'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['name',{rules: [{ required: true, message: '请输入真实姓名' }],initialValue: list.name}]"
              style="" placeholder='请输入真实姓名')
          a-form-item(
            label='手机号'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['phone',{rules: [{ required: true, pattern: reg, message: '请输入手机号' }],initialValue: list.phone}]"
              style="" placeholder='请输入手机号')
          a-form-item(
            label='性别'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-radio-group(v-decorator="['sex',{rules: [{ required: true, message: '请选择性别' }],initialValue: list.sex}]")
              a-radio(
                v-for="item,index in list2"
                :key="index"
                :value="item.code"
              ) {{item.name}}
          a-form-item(
            label='状态'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-select.item-selct(
              v-decorator="['status',{rules: [{ required: true, message: '请选择状态' }], initialValue: list.status === 0 ? '可用' : '不可用'}]"
              placeholder="请选择状态")
              a-select-option(
                v-for="item,index in list1"
                :key="index"
                :value="item.code") {{item.name}}
          a-form-item(
            label='角色'
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 17 }"
          )
            a-select.item-selct(
              v-decorator="['roleId',{rules: [{ required: true, message: '请选择角色' }], initialValue: Number(list.roleId)}]"
              placeholder="请选择角色")
              a-select-option(
                v-for="(item,index) in roleList"
                :key="'role' + index"
                :value="item.id"
              ) {{item.name}}
          a-form-item(
            :wrapperCol="{ span: 17, offset: 6 }"
          )
            a-button(type='primary' htmlType='submit') 提交
            a-button.right(type='default' @click="$router.go(-1)") 取消
</template>

<script>
import crypto from 'crypto'
import {mapActions} from 'vuex'
export default {
  name: 'edit-customer',
  data () {
    return {
      form: this.$form.createForm(this),
      reg: /^[1][3,4,5,7,8][0-9]{9}$/,
      list: {},
      roleList: [],
      list2: [
        {
          code: 0,
          name: '男'
        },
        {
          code: 1,
          name: '女'
        }
      ],
      list1: [
        {
          code: 0,
          name: '可用'
        },
        {
          code: 1,
          name: '不可用'
        }
      ]
    }
  },
  mounted () {
    this.get_user({
      pageNo: 1,
      pageSize: 200,
      id: this.$route.query.id
    }).then(res => {
      this.list = res.data
      this.query_role({
        pageNo: 1,
        pageSize: 200
      }).then(res => {
        this.roleList = res.data
      })
    })
  },
  methods: {
    ...mapActions(['query_role', 'get_user', 'modify_user']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          var md5 = crypto.createHash('md5')
          md5.update(values.password)
          this.modify_user({
            id: this.$route.query.id,
            password: values.password ? md5.digest('hex') : '',
            name: values.name,
            phone: values.phone,
            sex: values.sex,
            status: values.status === '可用' ? 0 : 1,
            roleId: values.roleId
          }).then(res => {
            if (res.retCode === 1) {
              this.$message.success('修改成功')
              this.$router.go(-1)
            }
          })
        }
      })
    },
    handleReset (e) {
      this.form.resetFields()
    }
  },
  components: {
  }
}
</script>

<style scoped lang="stylus">
.edit-customer
  width 500px
  margin 0 auto
  .right
    margin-left 30px
</style>
