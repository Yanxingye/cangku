<template lang="pug">
  .inter-list
    .bb-nav
      span.nav-item {{$route.meta.name}}
      a-button.fr(type="primary" icon="plus" @click="$router.push({name:'add-inter'})") 新建接口
    .bb-content
      a-form.inter-list-filter.clearfix(
        :form="form"
        @keydown.native.enter.prevent="handleSearch"
      )
        a-form-item.filter-item(
          label="接口名称"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 18 }"
        )
          a-input.item-input(
            v-decorator="['name']"
            style="display: inline-block" placeholder="请输入")
        a-form-item.filter-item(
          label="接口类型"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 18 }"
        )
          a-select.item-selct(
            v-decorator="['type']"
            placeholder="请选择")
            a-select-option(value="0") 平台
            a-select-option(value="1") 管理后台
        a-form-item.filter-item(
          label="接口文件夹"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
        )
          a-select.item-selct(
            v-decorator="['code']"
            placeholder="请选择")
            a-select-option(v-for="item,index in classifyList"
              :value="item.code"
              :key="index") {{item.folder}}
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
          //- a-button.btn(type="primary"
          //-   icon="plus"
          //-   @click="$router.push({name:'add-inter'})").fr 新建接口
      .inter-list-table
        a-table(
          :columns="columns"
          :dataSource="dataSource"
          :pagination="pagination"
          :loading="loading"
          rowKey="id"
          @change="changePage"
        )
          span(slot="type" slot-scope="text")
            span {{text === 0 ? '平台':'管理后台'}}
          span(slot="status" slot-scope="text")
            span(v-if="text === 0") 可用
            span(v-if="text === 1") 不可用
          span(slot="action"
            slot-scope="text, record")
            span.look(@click="$router.push({name:'inter-details',query:{id:record.id}})") 查看
            span.edit(@click="$router.push({name:'edit-inter',query:{id:record.id}})") 编辑
            span.todo(@click="todo(text)") {{text.status === 0 ? '禁用':'启用'}}
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'inter-list',
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
      name: '',
      type: '',
      code: '',
      status: '',
      pageNo: 1,
      classifyList: []
      // todoText: '启用'
    }
  },
  computed: {
    columns () {
      return [
        {
          title: '编号',
          dataIndex: 'id'
        },
        {
          title: '接口名称',
          dataIndex: 'name'
        },
        {
          title: '接口文件夹',
          dataIndex: 'folder'
        },
        {
          title: '接口类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
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
  mounted () {
    this.getClassify()
    this.getData()
  },
  methods: {
    ...mapActions(['query_port', 'query_classify', 'modify_port']),
    getClassify () {
      this.query_classify().then(res => {
        this.classifyList = res.data
        console.log(this.classifyList)
      })
    },
    todo (text) {
      console.log(text)
      if (text.status === 0) {
        this.modify_port({
          id: text.id,
          status: 1,
          name: text.name,
          folder: text.folder
        }).then(res => {
          if (res.retCode === 1) {
            text.status = 1
            this.$message.success('禁用成功')
          }
        })
      }
      if (text.status === 1) {
        this.modify_port({
          id: text.id,
          status: 0,
          name: text.name,
          folder: text.folder
        }).then(res => {
          if (res.retCode === 1) {
            text.status = 0
            this.$message.success('启用成功')
          }
        })
      }
    },
    getData () {
      this.loading = true
      this.query_port({
        pageNo: this.pageNo,
        pageSize: 10,
        name: this.name,
        type: this.type,
        status: this.status,
        code: this.code
      }).then(res => {
        console.log(res)
        this.loading = false
        this.dataSource = res.data
        this.pagination.total = res.totalCount
      })
    },
    changePage (pagination) {
      this.pageNo = pagination.current
      this.getData()
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
        this.name = ''
        this.type = ''
        this.status = ''
        this.code = ''
        if (values.name) this.name = values.name
        if (values.type) this.type = values.type
        if (values.status) this.status = values.status
        if (values.code) this.code = values.code
        this.getData()
      })
    },
    handleReset (e) {
      this.form.resetFields()
      this.name = ''
      this.type = ''
      this.status = ''
      this.code = ''
      this.getData()
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.inter-list
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
