<template lang="pug">
  .order-list
    .bb-nav
      span.nav-item {{$route.meta.name}}
      a-button.fr(type="primary" icon="plus" @click="$router.push({name: 'dingdan-add'})") 新增订单
    .bb-content
      .order-list-table
        a-table(
          :columns="columns"
          :dataSource="dataSource"
          :loading="loading"
          rowKey="id"
        )
          span(slot="status"
            slot-scope="status"
          )
            span.look {{status===0?'未完成':'已完成'}}
          span(slot="action"
            slot-scope="text, record"
          )
            span.look(@click="$router.push({name:'dingdan-detail',query:{id:record.id}})") 详情
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'dingdan-list',
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      pagination: {
        pageSize: 10,
        total: 0
      },
      loading: false,
      dataSource: [],
      form: this.$form.createForm(this),
      isEmpty: false,
      reason: '',
      pageNo: 1,
      goodsNo: '',
      companyName: '',
      phone: '',
      goodsName: ''
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
          title: '买家名称',
          dataIndex: 'companyName'
        },
        {
          title: '联系方式',
          dataIndex: 'phone'
        },
        {
          title: '详情',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapActions(['queryOrder']),
    getData () {
      this.loading = true
      this.queryOrder({
        pageNo: 1,
        goodsNo: this.goodsNo,
        companyName: this.companyName,
        phone: this.phone,
        goodsName: this.goodsName
      }).then(res => {
        this.dataSource = res.data
        this.loading = false
        this.pagination.total = res.totalCount
        this.pagination.current = this.pageNo
      })
    },
    handleSearch () {},
    handleReset () {},
    onChange () {}
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.order-list
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
      cursor pointer
  &-mod-hint
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    line-height:22px;
    margin-bottom 16px
</style>
