<template lang="pug">
  .user-list
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      a-form.user-list-filter.clearfix(
        class="ant-advanced-search-form"
        :form="form"
        @keydown.native.enter.prevent="handleSearch"
      )
        a-row(:gutter="24")
          a-col(:span="8")
          a-col(:span="8")
            a-form-item.filter-item(
              label="商品编号"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 18 }"
            )
              a-input.item-input(
                v-decorator="['goodsNo']"
                style="display: inline-block" placeholder="请输入")
          a-col(:span="8")
        a-row(:gutter="24")
          a-col(:span="8")
          a-col(:span="8")
            a-form-item.filter-item(
              label="商品名称"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 18 }"
            )
              a-input.item-input(
                v-decorator="['goodsName']"
                style="display: inline-block" placeholder="请输入")
          a-col(:span="8")
        a-row(:gutter="24")
          a-col(:span="8")
          a-col(:span="8")
            a-form-item.filter-item(
              label="入库位置"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 18 }"
            )
              a-input.item-input(
                v-decorator="['position']"
                style="display: inline-block" placeholder="请输入")
        a-row(:gutter="24")
          a-col(:span="8")
          a-col(:span="8")
            a-form-item.filter-item(
              label="数量"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 18 }"
            )
              a-input.item-input(
                v-decorator="['number']"
                style="display: inline-block" placeholder="请输入")
          a-col(:span="8")
        a-row(:gutter="24")
          a-col(:span="8")
          a-col(:span="8")
            a-form-item.filter-item.fr.clearfix(
            )
              a-button.btn(@click="handleReset").fr 重置
              a-button.btn(type="primary" @click="handleSearch").fr 入库
      //- .user-list-table
      //-   a-table(
      //-     :columns="columns"
      //-     :dataSource="dataSource"
      //-     :pagination="pagination"
      //-     :loading="loading"
      //-     rowKey="id"
      //-     @change="handleTableChange"
      //-   )
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'user-list',
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
      id: '',
      goodsNo: '',
      goodsName: '',
      position: '',
      number: ''
    }
  },
  mounted () {
    // this.getData()
  },
  computed: {
    columns () {
      return [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '商品编号',
          dataIndex: 'goodsNo'
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '入库数量',
          dataIndex: 'number'
        },
        {
          title: '入库位置',
          dataIndex: 'position'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['addWarehouse', 'queryWarehouse']),
    // showConfirm () {
    //   this.$confirm({
    //     title: '提示',
    //     content: '你确定要入库吗？',
    //     onOk () {
    //       console.log('OK')
    //       this.handleSearch()
    //     },
    //     onCancel () {
    //       console.log('Cancel')
    //     },
    //     class: 'test'
    //   })
    // },
    handleTableChange (pagination) {
      this.pagination = pagination
      console.log(pagination)
      this.pageNo = pagination.current
      this.getData()
    },
    getData () {
      this.loading = true
      this.queryWarehouse({
        id: this.id,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        goodsNo: this.goodsNo,
        goodsName: this.goodsName,
        position: this.position,
        number: this.number
      }).then(res => {
        this.dataSource = res.data
        this.loading = false
        this.pagination.total = res.totalCount
        this.pagination.current = this.pageNo
      })
    },
    onChange () {},
    handleReset (e) {
      this.form.resetFields()
      this.id = ''
      this.pageNo = 1
      this.pageSize = ''
      this.goodsNo = ''
      this.goodsName = ''
      this.position = ''
      this.number = ''
      this.getData()
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error, values)
        this.id = values.id
        this.pageNo = 1
        this.goodsNo = values.goodsNo
        this.goodsName = values.goodsName
        this.position = values.position
        this.number = values.number
        this.addWarehouse({
          id: this.id,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          goodsNo: this.goodsNo,
          goodsName: this.goodsName,
          position: this.position,
          number: this.number
        }).then(res => {
          if (res.retCode === 1) {
            this.$message.success('新增成功')
            this.$router.push({name: 'users-steward'})
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
.user-list
  width 100%
  .ant-advanced-search-form .ant-form-item {
    display: flex;
  }
  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }
  #components-form-demo-advanced-search .ant-form {
    max-width: none;
  }
  &-filter
    width 100%
    // display flex
    .filter-item
      // width 33.3%
      display inline-block
      margin-bottom 16px
      .btn
        margin-left 8px
  &-table
    span.look
      font-szie 14px
      color rgba(134, 95, 206, 1)
      display inline-block
      margin-right 15px
      cursor pointer
</style>
