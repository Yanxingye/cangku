<template lang="pug">
  .customer-list
    .bb-nav
      span.nav-item {{$route.meta.name}}
      a-button.fr(type="primary" icon="plus" @click="$router.push({name:'add-customer'})") 新增用户
    .bb-content
      a-form.customer-list-filter.clearfix(
        :form="form"
        @keydown.native.enter.prevent="handleSearch"
      )
        a-form-item.filter-item(
          label="用户名"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 18 }"
        )
          a-input.item-input(
            v-decorator="['username']"
            style="display: inline-block" placeholder="请输入")
        a-form-item.filter-item(
          label="真实姓名"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 18 }"
        )
          a-input.item-input(
            v-decorator="['name']"
            style="display: inline-block" placeholder="请输入")
        a-form-item.filter-item(
          label="角色"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
        )
          a-select.item-selct(
            v-decorator="['roleId']"
            placeholder="请选择")
            a-select-option(v-for="item,index in list"
              :value="item.id"
              :key="index") {{item.name}}
        a-form-item.filter-item(
          label="状态"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 18 }"
        )
          a-select.item-selct(
            v-decorator="['status']"
            placeholder="请选择")
            a-select-option(value="0") 可用
            a-select-option(value="1") 不可用
        a-form-item.filter-item.fr.clearfix(
        )
          a-button.btn(@click="handleReset").fr 重置
          a-button.btn(type="primary" @click="handleSearch").fr 查询
      .customer-list-table
        a-table(
          :columns="columns"
          :dataSource="dataSource"
          :pagination="pagination"
          :loading="loading"
          rowKey="id"
          @change="changePage"
        )
          span(slot="status" slot-scope="text")
            span(v-if="text === 0") 可用
            span(v-if="text === 1") 不可用
          span(
            slot="action"
            slot-scope="text, record"
          )
            span.look(@click="$router.push({name:'customer-details',query:{id:record.id}})") 查看
            span.edit(@click="$router.push({name:'edit-customer',query:{id:record.id}})") 编辑
            span.todo(@click="todo(text)") {{text.status === 0 ? '禁用':'启用'}}
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'customer-list',
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false,
      pagination: {
        pageSize: 10,
        total: 0
      },
      dataSource: [
        {id: 1}
      ],
      visible: false,
      // 上传字段
      pageNo: 1,
      id: '',
      username: '',
      name: '',
      phone: '',
      sex: '',
      email: '',
      status: '',
      roleId: '',
      startTime: '',
      endTime: '',
      // 列表
      list: []
    }
  },
  computed: {
    columns () {
      return [
        {
          title: '序号',
          dataIndex: 'id'
        },
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '真实姓名',
          dataIndex: 'name'
        },
        {
          title: '角色',
          dataIndex: 'roleName'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '最近登陆',
          dataIndex: 'lastLoginTime'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  components: {
  },
  mounted () {
    this.getData()
    // 角色列表
    this.query_role({
      pageNo: 1,
      pageSize: 200
    }).then(res => {
      this.list = res.data
    })
  },
  methods: {
    ...mapActions(['query_Auth_user', 'modifyUser', 'roleNameList', 'query_role', 'modify_user_status']),
    getData () {
      this.loading = true
      this.query_Auth_user({
        pageNo: this.pageNo,
        pageSize: 10,
        id: this.id,
        username: this.username,
        name: this.name,
        phone: this.phone,
        sex: this.sex,
        email: this.email,
        status: this.status,
        roleId: this.roleId,
        startTime: this.startTime,
        endTime: this.endTime
      }).then(res => {
        console.log(res.data)
        this.loading = false
        this.dataSource = res.data
        this.pagination.total = res.totalCount
      })
    },
    changePage (pagination) {
      this.pageNo = pagination.current
      this.getData()
    },
    todo (text) {
      console.log(text)
      if (text.status === 0) {
        this.modify_user_status({
          id: text.id,
          status: 1
        }).then(res => {
          if (res.retCode === 1) {
            text.status = 1
            this.$message.success('禁用成功')
          }
        })
      }
      if (text.status === 1) {
        this.modify_user_status({
          id: text.id,
          status: 0
        }).then(res => {
          if (res.retCode === 1) {
            text.status = 0
            this.$message.success('启用成功')
          }
        })
      }
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        this.name = ''
        this.username = ''
        this.roleId = ''
        this.status = ''
        if (values.name) this.name = values.name
        if (values.username) this.username = values.username
        if (values.roleId) this.roleId = values.roleId
        if (values.status) this.status = values.status
        this.getData()
      })
    },
    handleReset (e) {
      this.form.resetFields()
      this.pageNo = 1
      this.id = ''
      this.username = ''
      this.name = ''
      this.phone = ''
      this.sex = ''
      this.email = ''
      this.status = ''
      this.roleId = ''
      this.startTime = ''
      this.endTime = ''
      this.getData()
    }
  }
}
</script>

<style scoped lang="stylus">
.customer-list
  width 100%
  &-filter
    width 100%
    .filter-item
      width 33.3%
      display inline-block
      .btn
        margin-left 30px
  &-table
    span.look, span.edit, span.todo
      font-szie 14px
      color #865FCE
      display inline-block
      margin-right 15px
      cursor pointer
</style>
