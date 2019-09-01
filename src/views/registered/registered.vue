<template lang="pug">
  #registered
    .registered
      .registered-logo
      .registered-box
        a-form(
          :form="form"
          class='registered-form'
          @submit="handleSubmit")
          a-form-item()
            a-radio-group.xuanze(@change="onChange" v-model="value")
              a-radio.item(:value="1") 管理员
              a-radio.item(:value="2") 员工
          a-form-item()
            a-input(
              v-decorator="['username',{rules: [{ required: true, message: '请输入用户名' }]}]"
              placeholder='请输入账号')
              a-icon(slot="prefix" type="user")
          a-form-item()
            a-input(
              v-decorator="['password',{rules: [{ required: true, message: '请输入密码' }]}]"
              placeholder='请输入密码' type="password")
              a-icon(slot="prefix" type="unlock")
          a-form-item()
            a-input(
              v-decorator="['surePsw',{rules: [{ required: true, message: '请输入正确密码' }]}]"
              placeholder='请确认密码'
              type="password"
              v-model="surePassword"
              )
              a-icon(slot="prefix" type="unlock")
          .btn
            <a-button type='primary' class="btn-item" htmlType='submit'>注册</a-button>
            <a-button class="btn-item" @click="$router.go(-1)">取消</a-button>
</template>
<script>
import crypto from 'crypto'
import {mapActions} from 'vuex'
export default {
  name: 'registered',
  mounted () {
  },
  data () {
    return {
      form: this.$form.createForm(this),
      surePassword: '',
      value: 1,
      username: '',
      password: ''
    }
  },
  computed: {
    // ...mapState(['user'])
  },
  methods: {
    ...mapActions(['addUser']),
    // ...mapMutations(['setState']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log('error', err, values)
        if (this.surePassword === values.password) {
          if (!err) {
            // console.log('Received values of form: ', values)
            var md5 = crypto.createHash('md5')
            md5.update(values.password)
            this.addUser({
              username: values.username,
              password: values.password,
              name: '1',
              phone: '1',
              sex: '1',
              email: '1',
              status: '1',
              roleId: '1'
            }).then(res => {
              this.$message.info('新增成功')
            })
          }
        } else {
          console.log('1111')
        }
      })
    },
    onChange (e) {
      console.log('radio checked', e.target.value)
    }
  }
}
</script>

<style lang="stylus">
#registered
  width 100%
  height 100%
  min-width 1440px
  background linear-gradient(89deg,rgba(41,50,103,1) 0%,rgba(22,27,64,1) 100%)
  overflow hidden
.registered
  width 320px
  height 246px
  margin 150px auto
  &-logo
    background-image url(../../assets/img/ckgl.png)
    width 105px
    height 40px
    background-size 105px 40px
    background-position center
    background-repeat no-repeat
    margin 0 auto
  &-box
    width 100%
    // height 136px
    background-color rgba(255,255,255,1)
    margin-top 30px
    padding 30px
    border-radius 4px
    .ant-form-item:last-child
      margin-bottom 0
  .btn
    width 100%
    display flex
    &-item
      margin 0 0 0 5%
      width 40%
</style>
