<template lang="pug">
  .roles-list
    .bb-nav
      span.nav-item {{$route.meta.name}}
      a-button.fr(type="primary" icon="plus" @click="$router.push({name:'add-roles'})") 新建角色
    .bb-content
      a-form.roles-list-filter.clearfix(
        :form="form"
        @keydown.native.enter.prevent="handleSearch"
      )
        a-form-item.filter-item(
          label="角色名称"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 18 }"
        )
          a-input.item-input(
            v-decorator="['name']"
            style="display: inline-block" placeholder="请输入")
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
      .roles-list-table
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
          span(slot="action"
            slot-scope="text, record")
            span.look(@click="$router.push({name:'roles-details',query:{id:record.id}})") 查看
            span.edit(@click="$router.push({name:'edit-roles',query:{id:record.id}})") 编辑
            span.todo(@click="todo(text)") {{text.status === 1 ? '禁用':'启用'}}
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'roles-list',
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false,
      pagination: {
        pageSize: 10,
        total: 0
      },
      dataSource: [],
      visible: false,
      pageNo: 1,
      name: '',
      status: ''
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    columns () {
      return [
        {
          title: '序号',
          dataIndex: 'id'
        },
        {
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '基本权限',
          dataIndex: 'description'
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
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    ...mapActions(['query_role', 'set_role_status']),
    changePage (pagination) {
      // console.log(pagination)
      this.pageNo = pagination.current
      this.getData()
    },
    getData () {
      this.loading = true
      this.query_role({
        pageSize: 10,
        pageNo: this.pageNo,
        name: this.name,
        status: this.status
      }).then(res => {
        // console.log(res.data)
        this.loading = false
        this.dataSource = res.data
        this.pagination.total = res.totalCount
      })
    },
    todo (text) {
      if (text.status === 0) {
        this.set_role_status({
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
        this.set_role_status({
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
    handleReset () {
      this.form.resetFields()
      this.name = ''
      this.status = ''
      this.getData()
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        this.name = ''
        this.status = ''
        if (values.name) this.name = values.name
        if (values.status) this.status = values.status
        this.getData()
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.roles-list
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
