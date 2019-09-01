<template lang="pug">
  .edit-role
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      .edit-roles
        a-form(
          @submit="handleSubmit"
          :form="form"
        )
          a-form-item(
            label='角色名'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['name',{rules: [{ required: true, message: '请输入角色名' }],initialValue:name}]"
              placeholder='请输入角色名')
          a-form-item(
            label='角色描述'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 17 }"
          )
            a-input(
              v-decorator="['description',{rules: [{ required: true, message: '请输入角色描述' }],initialValue:description}]"
              type="textarea" placeholder='请输入角色描述')
          .edit-roles-box.clearfix()
            span.item-name.fl(:labelCol="{ span: 6 }") 权限配置：
            span.box-head.fl
              span.key-name 页面权限
              span.key-name 操作权限
          .check-list.clearfix(
            v-for="items,aindex in list"
            :key="aindex")
            .item-head.fl(
            )
              a-checkbox(
                :indeterminate="items.indeterminate"
                :checked="items.checkAll"
                @change="onCheckAllChange(items, aindex)"
                :disabled="items.name === '修改密码'? true:items.name === '基本资料'? true:items.name === '接口管理'? true:items.name === '页面管理'?true:false "
              ) {{items.name}}
            .item-list.fl
              a-checkbox(
                v-for="item,bindex in items.portList"
                :key="bindex"
                :checked="item.checked"
                @change="onChange(items, aindex, item, bindex)"
                :disabled="items.name === '修改密码'? true:items.name === '基本资料'? true:items.name === '接口管理'? true:items.name === '页面管理'?true:false "
              ) {{item.name}}
          a-form-item(
            :wrapperCol="{ span: 12, offset: 5 }"
          )
            a-button(type='primary' htmlType='submit') 提交
            a-button.right(type='default' @click="$router.push({name:'auth-roles'})") 取消
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'edit-roles',
  data () {
    return {
      form: this.$form.createForm(this),
      name: '',
      description: '',
      // 显示
      list: [],
      // 上传
      roleConfig: [],
      port: [],
      kk: ''
    }
  },
  mounted () {
    this.get_role({
      id: this.$route.query.id
    }).then(res => {
      this.name = res.data.name
      this.description = res.data.description
      this.roleConfig = res.data.roleConfigVos
      // console.log(res.data.roleConfigVos)
      // this.roleConfig.map(item => {
      //   item.portList.map(items => {
      //     this.port.push(item.pageId + '-' + items.id)
      //   })
      // })
      // console.log(this.roleConfig)
      this.query_page_port({}).then(res => {
        // console.log(res.data)
        this.list = res.data
        let a = []
        for (let i = 0; i < this.list.length; i++) {
          // 全部变灰
          // this.list[i].checkAll = false
          // this.list[i].indeterminate = false
          a.push({portList: []})
          // this.list[i].portList.map((item, index) => {
          //   item.checked = false
          // })
        }
        let b = []
        this.roleConfig.map((item, index) => {
          this.list.map((items, indexs) => {
            if (item.pageId === items.pageId) {
              b.push(indexs)
            }
          })
        })
        // console.log(b)
        for (let i = 0; i < b.length; i++) {
          a[b[i]] = this.roleConfig[i]
        }
        // console.log(a)
        // 截止
        for (let i = 0; i < this.list.length; i++) {
          // 全部变灰
          this.list[i].checkAll = false
          this.list[i].indeterminate = false
          this.list[i].portList.map((item, index) => {
            item.checked = false
            // console.log(a[i])
            // if (this.roleConfig[i] === 'undefined') {
            //   console.log(1)
            // }
            a[i].portList && a[i].portList.map(items => {
              if (items.id === item.id) {
                item.checked = true
              }
            })
          })
          if (a[i].portList.length === this.list[i].portList.length) {
            this.list[i].checkAll = true
          } else if (a[i].portList.length > 0 && a[i].portList.length < this.list[i].portList.length) {
            this.list[i].indeterminate = true
          } else {
            this.list[i].indeterminate = false
          }
        }
        // 截止
        // for (let j = 0; j < this.list[i].portList.length; j++) {
        //   this.list[i].portList[j].checked = false
        // }
        // // 开始回写  -  左侧
        // this.roleConfig.map((item, index) => {
        //   if (item.pageId === this.list[i].pageId && item.portList.length === this.list[i].portList.length) {
        //     this.list[i].checkAll = true
        //     this.list[i].indeterminate = false
        //     // this.list[i].portList.indexOf()
        //   } else if (item.pageId === this.list[i].pageId && item.portList.length !== this.list[i].portList.length) {
        //     this.list[i].checkAll = false
        //     this.list[i].indeterminate = true
        //   }
        // })
        // // 全选-右侧
        // if (this.list[i].checkAll === true) {
        //   this.list[i].portList.map(item => {
        //     item.checked = true
        //   })
        // }
        // 半选 - 右侧
        // this.list.map((item, index) => {
        //   item.portList.map((items, indexs) => {
        //     items.id = item.pageId + '-' + items.id
        //     if (this.port.indexOf(items.id) > -1) {
        //       items.checked = true
        //     }
        //   })
        // })
      })
    })
  },
  methods: {
    ...mapActions(['get_role', 'query_page_port', 'modify_role']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // let a = []
          // this.roleConfig.map((item, index) => {
          //   if (item.portList.length > 0) {
          //     a.push(item)
          //   }
          // })
          // console.log('Received values of form: ', values)
          // console.log(this.pageData.join(','), this.pageAuth.join(','),)
          if (this.roleConfig.length > 0) {
            this.modify_role({
              id: this.$route.query.id,
              name: values.name,
              description: values.description,
              roleConfig: JSON.stringify(this.roleConfig)
            }).then(res => {
              if (res.retCode === 1) {
                this.$router.push({name: 'auth-roles'})
                this.$message.success('编辑成功')
              }
            })
          } else {
            this.$message.error('请选择权限配置')
          }
        }
      })
    },
    onChange (items, aindex, item, bindex) {
      this.$forceUpdate()
      item.checked = !item.checked
      console.log(items, aindex, item, bindex)
      if (item.checked === true) {
        let current = 0
        if (this.roleConfig.length === 0) {
          this.roleConfig.push({})
          this.roleConfig[0].pageId = items.pageId
          this.roleConfig[0].portList = []
          this.roleConfig[0].portList.push({id: item.id})
          current = 0
        } else {
          let a = false
          for (let i = 0; i < this.roleConfig.length; i++) {
            if (this.roleConfig[i].pageId === items.pageId) {
              this.roleConfig[i].portList.push({id: item.id})
              current = i
              a = true
              break
            } else {
              a = false
            }
          }
          if (!a) {
            this.roleConfig.push({})
            this.roleConfig[this.roleConfig.length - 1].pageId = items.pageId
            this.roleConfig[this.roleConfig.length - 1].portList = []
            this.roleConfig[this.roleConfig.length - 1].portList.push({id: item.id})
            current = this.roleConfig.length - 1
          }
        }
        if (this.roleConfig[current].portList.length === items.portList.length) {
          items.checkAll = true
          items.indeterminate = false
        } else {
          items.checkAll = false
          items.indeterminate = true
        }
      } else {
        let current = 0
        for (let i = 0; i < this.roleConfig.length; i++) {
          if (this.roleConfig[i].pageId === items.pageId) {
            current = i
            this.roleConfig[i].portList.map((val, indexs) => {
              if (val.id === item.id) {
                this.roleConfig[i].portList.splice(indexs, 1)
              }
            })
          }
        }
        if (this.roleConfig[current].portList.length === items.portList.length) {
          items.checkAll = true
          items.indeterminate = false
        } else {
          if (this.roleConfig[current].portList.length === 0) {
            items.checkAll = false
            items.indeterminate = false
            this.roleConfig.splice(current, 1)
          } else {
            items.checkAll = false
            items.indeterminate = true
          }
        }
      }
      // this.$forceUpdate()
      // item.checked = !item.checked
      // console.log(items, aindex, item, bindex)
      // if (item.checked === true) {
      //   this.roleConfig[aindex].pageId = items.pageId
      //   this.roleConfig[aindex].portList.push({id: item.id})
      //   if (this.roleConfig[aindex].portList.length === items.portList.length) {
      //     items.checkAll = true
      //     items.indeterminate = false
      //   } else {
      //     items.checkAll = false
      //     items.indeterminate = true
      //   }
      //   console.log(this.roleConfig[aindex], this.roleConfig[aindex].portList)
      // } else {
      //   for (let i = 0; i < this.roleConfig[aindex].portList.length; i++) {
      //     if (this.roleConfig[aindex].portList[i].id === item.id) {
      //       let a = i
      //       console.log(this.roleConfig[aindex].portList[i])
      //       this.roleConfig[aindex].portList.splice(a, 1)
      //     }
      //     console.log(this.roleConfig[aindex], this.roleConfig[aindex].portList)
      //   }
      //   if (this.roleConfig[aindex].portList.length === items.portList.length) {
      //     items.checkAll = true
      //     items.indeterminate = false
      //   } else {
      //     if (this.roleConfig[aindex].portList.length === 0) {
      //       items.checkAll = false
      //       items.indeterminate = false
      //     } else {
      //       items.checkAll = false
      //       items.indeterminate = true
      //     }
      //   }
      // }
      // 截止
      // if (item.checked === true) {
      //   console.log('true')
      //   let obj = {}
      //   obj.portList = []
      //   if (this.roleConfig.length === 0) {
      //     obj.pageId = items.pageId
      //     obj.portList.push(item)
      //     this.roleConfig.push(obj)
      //   } else {
      //     this.roleConfig.map((role, index) => {
      //       console.log('触发')
      //       if (role.pageId === items.pageId) {
      //         console.log('存在一样')
      //         role.portList.push(item)
      //       } else {
      //         console.log('不存在')
      //         obj.pageId = items.pageId
      //         obj.portList.push(item)
      //         this.roleConfig.push(obj)
      //       }
      //     })
      //   }
      //   items.count++
      //   if (items.count > 0 && items.count < items.portList.length) {
      //     items.checkAll = false
      //     items.indeterminate = true
      //   } else if (items.count === items.portList.length) {
      //     items.checkAll = true
      //     items.indeterminate = false
      //   }
      // } else if (item.checked === false) {
      //   this.roleConfig.map((role, index) => {
      //     if (role.pageId === items.pageId) {
      //       role.portList.map((list, indexs) => {
      //         if (list.id === item.id) {
      //           role.portList.splice(indexs, 1)
      //         }
      //       })
      //     }
      //   })
      //   items.count--
      //   if (items.count > 0 && items.count < items.portList.length) {
      //     items.checkAll = false
      //     items.indeterminate = true
      //   } else if (items.count === items.portList.length) {
      //     items.checkAll = true
      //     items.indeterminate = false
      //   } else {
      //     this.roleConfig.map((role, index) => {
      //       if (role.pageId === items.pageId) {
      //         this.roleConfig.splice(index, 1)
      //       }
      //     })
      //     items.checkAll = false
      //     items.indeterminate = false
      //   }
      // }
      // console.log('radio', this.roleConfig)
    },
    onCheckAllChange (items, aindex) {
      this.$forceUpdate()
      items.checkAll = !items.checkAll
      if (items.checkAll) {
        // let current = 0
        if (this.roleConfig.length === 0) {
          this.roleConfig.push({})
          this.roleConfig[0].pageId = items.pageId
          this.roleConfig[0].portList = []
          items.indeterminate = false
          items.portList.map((item) => {
            if (item.checked === false) {
              item.checked = true
            }
          })
          items.portList.map(item => {
            this.roleConfig[0].portList.push({id: item.id})
          })
          // this.roleConfig[0].portList.push({id: item.id})
          // current = 0
        } else {
          let a = false
          for (let i = 0; i < this.roleConfig.length; i++) {
            if (this.roleConfig[i].pageId === items.pageId) {
              this.roleConfig[i].portList = []
              items.indeterminate = false
              items.portList.map((item) => {
                if (item.checked === false) {
                  item.checked = true
                }
              })
              items.portList.map(item => {
                this.roleConfig[i].portList.push({id: item.id})
              })
              // current = i
              a = true
              break
            } else {
              a = false
            }
          }
          if (!a) {
            this.roleConfig.push({})
            this.roleConfig[this.roleConfig.length - 1].pageId = items.pageId
            this.roleConfig[this.roleConfig.length - 1].portList = []
            items.indeterminate = false
            items.portList.map((item) => {
              if (item.checked === false) {
                item.checked = true
              }
            })
            items.portList.map(item => {
              this.roleConfig[this.roleConfig.length - 1].portList.push({id: item.id})
            })
            // this.roleConfig[this.roleConfig.length-1].portList.push({id: item.id})
            // current = this.roleConfig.length - 1
          }
        }
      } else {
        let current = 0
        this.roleConfig.map((item, index) => {
          if (item.pageId === items.pageId) {
            current = index
          }
        })
        this.roleConfig.splice(current, 1)
        items.checkAll = false
        items.indeterminate = false
        items.portList.map((item) => {
          item.checked = false
        })
      }
      // this.$forceUpdate()
      // items.checkAll = !items.checkAll
      // if (items.checkAll) {
      //   this.roleConfig[aindex].pageId = items.pageId
      //   items.indeterminate = false
      //   items.portList.map((item) => {
      //     if (item.checked === false) {
      //       item.checked = true
      //     }
      //   })
      //   this.roleConfig[aindex].portList = []
      //   items.portList.map(item => {
      //     this.roleConfig[aindex].portList.push({id: item.id})
      //   })
      // } else {
      //   this.roleConfig[aindex].pageId = ''
      //   items.indeterminate = false
      //   items.portList.map((item) => {
      //     item.checked = false
      //   })
      //   items.portList.map(item => {
      //     this.roleConfig[aindex].portList = []
      //   })
      // }
      // console.log(this.roleConfig, this.roleConfig[aindex])
    //   items.checkAll = !items.checkAll
    //   let obj = {}
    //   if (items.checkAll) {
    //     items.count = items.portList.length
    //     items.indeterminate = false
    //     obj.pageId = items.pageId
    //     obj.portList = []
    //     items.portList.map(item => {
    //       obj.portList.push(item)
    //     })
    //     this.roleConfig.push(obj)
    //     items.portList.map((item) => {
    //       if (item.checked === false) {
    //         item.checked = true
    //       }
    //     })
    //   } else {
    //     items.count = 0
    //     items.checkAll = false
    //     items.indeterminate = false
    //     this.roleConfig.map((item, index) => {
    //       if (item.pageId === items.pageId) {
    //         this.roleConfig.splice(index, 1)
    //       }
    //     })
    //     items.portList.map((item) => {
    //       item.checked = false
    //     })
    //   }
    //   console.log('all', this.roleConfig)
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.edit-roles
  width 650px
  margin 0 auto
  &-box
    width 100%
    height 40px
    font-size 14px
    span.item-name
      height 100%
      line-height 40px
      display block
      width 135px
      text-align right
      vertical-align middle
    span.item-name:before
      content '*'
      display inline-block
      color red
      position relative
      left -5px
      top 4px
      font-size 18px
    span.box-head
      display block
      width 500px
      height 40px
      line-height 40px
      background-color #f9f9f9
      padding 0 15px
      .key-name:last-child
        margin-left 150px
  .check-list
    width 550px
    margin-left 135px
    .item-head
      width 210px
      padding 10px
    .item-list
      width 250px
      padding 10px
    .ant-checkbox-wrapper + .ant-checkbox-wrapper
      margin-left 0
  .right
    margin-left 30px
</style>
