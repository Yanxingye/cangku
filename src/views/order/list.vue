<template lang="pug">
  .order-list
    .bb-nav
      span.nav-item {{$route.meta.name}}
      a-button.fr(type="primary" icon="plus" @click="$router.push({name: 'order-add'})") 新增客户
    .bb-content
      a-form.order-list-filter.clearfix(
        class="ant-advanced-search-form"
        :form="form"
        @keydown.native.enter.prevent="handleSearch"
      )
        a-row(:gutter="24")
          a-col(:span="8")
            a-form-item.filter-item(
              label="客户姓名"
              v-bind="formItemLayout"
            )
              a-input.item-input(
                v-decorator="['userName']"
                style="display: inline-block" placeholder="请输入")
          a-col(:span="8")
            a-form-item.filter-item(
              label="联系方式"
              v-bind="formItemLayout"
            )
              a-input.item-input(
                v-decorator="['phone']"
                style="display: inline-block" placeholder="请输入")
        a-row(:gutter="24")
          a-col(:span="8")
          a-col(:span="8")
          a-col(:span="8")
            a-form-item.filter-item.fr.clearfix(
            )
              a-button.btn(@click="handleReset").fr 重置
              a-button.btn(type="primary" @click="handleSearch").fr 查询
      .order-list-table
        a-table(
          :columns="columns"
          :dataSource="dataSource"
          :loading="loading"
          rowKey="id"
        )
          span(slot="action"
            slot-scope="text, val"
          )
            span.look(@click="del(val)") 删除
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'order-list',
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      loading: false,
      dataSource: [],
      form: this.$form.createForm(this),
      isEmpty: false,
      reason: '',
      pagination: {
        pageSize: 10,
        total: 0
      },
      pageNo: 1,
      companyName: '',
      goodsNo: '',
      userName: '',
      phone: '',
      areaName: '',
      val: ''
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
          title: '合作商名称',
          dataIndex: 'companyName'
        },
        {
          title: '联系人姓名',
          dataIndex: 'userName'
        },
        {
          title: '联系方式',
          dataIndex: 'phone'
        },
        {
          title: '所在地区',
          dataIndex: 'areaName'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapActions(['queryCooperator', 'deleteCooperator']),
    getData () {
      this.loading = true
      this.queryCooperator({
        goodsNo: this.goodsNo,
        companyName: this.companyName,
        userName: this.userName,
        phone: this.phone,
        areaName: this.areaName
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
        this.companyName = values.companyName
        this.pageNo = 1
        this.goodsNo = values.goodsNo
        this.userName = values.userName
        this.phone = values.buyMoney
        this.areaName = values.areaName
        this.getData()
      })
    },
    handleReset () {
      this.form.resetFields()
      this.companyName = ''
      this.pageNo = 1
      this.goodsNo = ''
      this.userName = ''
      this.phone = ''
      this.areaName = ''
      this.getData()
    },
    del (val) {
      console.log('1111', val)
      this.deleteCooperator({
        id: val.id
      }).then(res => {
        if (res.retCode === 1) {
          this.$message.info('删除成功')
          this.handleReset()
        }
      })
    }
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
