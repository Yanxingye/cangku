<template lang="pug">
  .general-list
    .bb-nav
      span.nav-item {{$route.meta.name}}
      a-button.fr(type="primary" icon="plus" @click="$router.push({name: 'general-add'})") 新增商品
    .bb-content
      a-form.general-list-filter.clearfix(
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
            a-form-item.filter-item(
              label="供货商"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            )
              a-input.item-input(
                v-decorator="['cooperator']"
                style="display: inline-block" placeholder="请输入")
        a-row(:gutter="24")
          a-col(:span="8")
          a-col(:span="8")
          a-col(:span="8")
            a-form-item.filter-item.fr.clearfix(
            )
              a-button.btn(@click="handleReset").fr 重置
              a-button.btn(type="primary" @click="handleSearch").fr 查询
      .general-list-table
        a-table(
          :columns="columns"
          :dataSource="dataSource"
          :loading="loading"
          rowKey="id"
          :pagination="pagination"
          @change="handleTableChange"
        )
          span(slot="productStatus" slot-scope="text" :class="colorClass") {{text | filterType}}
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'general-list',
  data () {
    return {
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
      goodsNo: '',
      goodsName: '',
      cooperator: '',
      buyMoney: '',
      colorClass: ''
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
          dataIndex: 'goodsName'
        },
        {
          title: '采购单价',
          dataIndex: 'buyMoney'
        },
        {
          title: '合作商',
          dataIndex: 'cooperator'
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  filters: {
    filterType (val) {
      switch (val) {
        case 0:
          return '充足'
        case 1:
          return '缺货'
      }
    }
  },
  methods: {
    ...mapActions(['queryGoods']),
    handleTableChange (pagination) {
      this.pagination = pagination
      console.log(pagination)
      this.pageNo = pagination.current
      this.getData()
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error, values)
        this.goodsNo = values.goodsNo
        this.pageNo = 1
        this.goodsName = values.goodsName
        this.cooperator = values.cooperator
        this.buyMoney = values.buyMoney
        this.getData()
      })
    },
    getData () {
      this.loading = true
      this.queryGoods({
        goodsNo: this.goodsNo,
        goodsName: this.goodsName,
        pageNo: this.pageNo,
        cooperator: this.cooperator,
        buyMoney: this.buyMoney
      }).then(res => {
        this.dataSource = res.data
        this.loading = false
        this.pagination.total = res.totalCount
        this.pagination.current = this.pageNo
      })
    },
    handleReset () {
      this.form.resetFields()
      this.goodsNo = ''
      this.pageNo = 1
      this.goodsName = ''
      this.cooperator = ''
      this.buyMoney = ''
      this.getData()
    },
    onChange () {}
    // showConfirm (record) {
    //   let self = this
    //   self.$confirm({
    //     title: '确定下架该商品？',
    //     centered: true,
    //     content: (
    //       <div>
    //         <p class="general-list-mod-hint">确认下架后无法撤销，如需恢复上架需要商家重新提交，审核通过后方可恢复。</p>
    //         <a-textarea placeholder='请输入下架原因' v-model={this.reason} onInput={(e) => { this.reason = e.target.value }}/>
    //       </div>
    //     ),
    //     okText: '确认',
    //     // okButtonProps: {
    //     //   props: {disabled: !self.reason}
    //     // },
    //     cancelText: '取消',
    //     onCancel () {
    //       self.reason = ''
    //     },
    //     onOk () {
    //       return new Promise((resolve, reject) => {
    //         if (self.reason === '') {
    //           self.$message.info('请输入原因')
    //           reject(new Error('something bad happened'))
    //         } else {
    //           self.modGoodsStatus({
    //             id: record.id,
    //             goodsNo: record.goodsNo,
    //             remark: self.reason
    //           }).then(res => {
    //             if (res.retCode === 1) {
    //               resolve()
    //               self.dataSource.map(item => {
    //                 if (item.id === record.id) {
    //                   item.productStatus = 2
    //                 }
    //               })
    //               self.$message.info('已禁用')
    //             }
    //           })
    //         }
    //       })
    //     }
    //   })
    // }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.general-list
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
.redClass
  color red
</style>
