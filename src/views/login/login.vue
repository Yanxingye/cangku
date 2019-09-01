<template lang="pug">
  #login
    .login
      .login-logo
      .login-box
        a-form(
          :form="form"
          class='login-form'
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
          .btn
            <a-button type='primary' class="btn-item" htmlType='submit'>登录</a-button>
            <a-button class="btn-item" @click="$router.push({name: 'registered'})">注册</a-button>
</template>
<script>
import crypto from 'crypto'
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
  name: 'login',
  mounted () {
  },
  data () {
    return {
      form: this.$form.createForm(this),
      value: 1
    }
  },
  computed: {
    ...mapState(['user', 'quanxian'])
  },
  methods: {
    ...mapActions(['login', 'getUserInfo']),
    ...mapMutations(['setState']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          var md5 = crypto.createHash('md5')
          md5.update(values.password)
          this.login({
            username: values.username,
            password: md5.digest('hex')
          }).then(res => {
            if (res.retCode === 1) {
              // 获取用户信息
              // this.setState({token: res.data.accessToken})
              // localStorage.setItem('token', res.data.accessToken)
              this.getUserInfo().then(res => {
                if (res.retCode === 1) {
                  this.setState({user: res.data})
                  localStorage.setItem('user', JSON.stringify(res.data))
                  if (res.data.type === 1) {
                    this.$router.push({name: 'users-user'})
                  } else {
                    let l = this.$router.options.routes[0].children[0].children
                    // console.log(l)
                    l.map(item => {
                      item.children && item.children.map(n => {
                        if (res.data.pages[0] === n.meta.name) {
                          console.log(n)
                          this.$router.push({name: n.name})
                        }
                      })
                    })
                    console.log(res.data.pages, res.data.ports)
                  }
                }
              })
            }
          })
        }
      })
    },
    onChange (e) {
      console.log('radio checked', e.target.value)
      localStorage.setItem('zheng', e.target.value)
    }
  }
}
</script>

<style lang="stylus">
#login
  width 100%
  height 100%
  min-width 1440px
  background linear-gradient(89deg,rgba(41,50,103,1) 0%,rgba(22,27,64,1) 100%)
  overflow hidden
.login
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
    .xuanze
      margin 0 auto
  .btn
    width 100%
    display flex
    &-item
      margin 0 0 0 5%
      width 40%
</style>
