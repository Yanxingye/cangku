<template lang="pug">
  .steward-list
    .bb-nav
      span.nav-item {{$route.meta.name}}
    .bb-content
      a-form.steward-list-filter.clearfix(
        class="ant-advanced-search-form"
        :form="form"
        @keydown.native.enter.prevent="handleSearch"
      )
        a-row(:gutter="24")
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
            a-form-item.filter-item(
              label="商品名称"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 18 }"
            )
              a-input.item-input(
                v-decorator="['goodsName']"
                style="display: inline-block" placeholder="请输入")
          a-col(:span="8")
            a-form-item.filter-item.fr.clearfix(
            )
              a-button.btn(@click="handleReset").fr 重置
              a-button.btn(type="primary" @click="handleSearch").fr 查询
      .steward-list-table
        a-table(
          :columns="columns"
          :dataSource="dataSource"
          :pagination="pagination"
          :loading="loading"
          rowKey="id"
          @change="handleTableChange"
        )
          span(slot="stewardStatus" slot-scope="text") {{text === 0 ? '在岗':'离岗'}}
          span(slot="status" slot-scope="text, record")
            a-switch(
              checkedChildren="启用"
              unCheckedChildren="禁用"
              :checked="text === 0"
              @click="toggle(text,record.id)"
            )
          span(slot="productStatus"
            slot-scope="text, record"
          )
            span.look(@click="$router.push({name:'steward-details',query:{id:record.id}})") {{record.number >= 10?'充足':'缺货'}}
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'steward-list',
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      form: this.$form.createForm(this),
      loading: false,
      pagination: {
        pageSize: 10,
        total: 0
      },
      dataSource: [],
      visible: false,
      pageNo: 1,
      goodsNo: '',
      goodsName: '',
      number: ''
    }
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
          title: '库存数量',
          dataIndex: 'number'
        },
        {
          title: '库存状况',
          dataIndex: 'productStatus',
          scopedSlots: { customRender: 'productStatus' }
        }
      ]
    }
  },
  mounted () {
    this.getData()
    // this.queryAreaList().then(res => { this.areaList = res.data })
  },
  methods: {
    ...mapActions(['queryWarehouse']),
    handleTableChange (pagination) {
      this.pagination = pagination
      console.log(pagination)
      this.pageNo = pagination.current
      this.getData()
    },
    getData () {
      this.loading = true
      this.queryWarehouse({
        pageNo: this.pageNo,
        goodsNo: this.goodsNo,
        goodsName: this.goodsName,
        number: this.number
      }).then(res => {
        this.dataSource = res.data
        this.loading = false
        this.pagination.total = res.totalCount
        this.pagination.current = this.pageNo
      })
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error, values)
        this.goodsNo = values.goodsNo
        this.pageNo = 1
        this.goodsName = values.goodsName
        this.getData()
      })
    },
    handleReset (e) {
      this.form.resetFields()
      this.goodsNo = ''
      this.goodsName = 1
      this.number = ''
      this.getData()
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.steward-list
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
