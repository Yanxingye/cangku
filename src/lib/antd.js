import {Button, LocaleProvider, Cascader, Popover, Steps, Transfer, Row, Checkbox, Radio, Switch, message, Icon, Menu, Layout, Breadcrumb, Upload, Pagination, Table, Tag, Divider, Modal, Form, Input, Col, DatePicker, Select} from 'ant-design-vue'
const antd = {
  install: function (Vue) {
    Vue.component(Cascader.name, Cascader)
    Vue.component(Popover.name, Popover)
    Vue.component(Button.name, Button)
    Vue.component(Steps.name, Steps)
    Vue.component(Steps.Step.name, Steps.Step)
    Vue.component(Icon.name, Icon)
    Vue.component(Menu.name, Menu)
    Vue.component(Menu.Item.name, Menu.Item)
    Vue.component(Menu.SubMenu.name, Menu.SubMenu)
    Vue.component(Layout.name, Layout)
    Vue.component(Layout.Header.name, Layout.Header)
    Vue.component(Layout.Footer.name, Layout.Footer)
    Vue.component(Layout.Sider.name, Layout.Sider)
    Vue.component(Layout.Content.name, Layout.Content)
    Vue.component(Breadcrumb.name, Breadcrumb)
    Vue.component(Breadcrumb.Item.name, Breadcrumb.Item)
    Vue.component(Upload.name, Upload)
    Vue.component(Upload.Dragger.name, Upload.Dragger)
    Vue.component(Pagination.name, Pagination)
    Vue.component(Table.name, Table)
    Vue.component(Tag.name, Tag)
    Vue.component(Divider.name, Divider)
    Vue.component(Modal.name, Modal)
    Vue.component(Form.name, Form)
    Vue.component(Form.Item.name, Form.Item)
    Vue.component(Input.name, Input)
    Vue.component(Input.Group.name, Input.Group)
    // Input.TextArea
    Vue.component(Input.TextArea.name, Input.TextArea)
    Vue.component(Col.name, Col)
    Vue.component(LocaleProvider.name, LocaleProvider)
    Vue.component(Switch.name, Switch)
    Vue.component(Select.name, Select)
    Vue.component(Select.Option.name, Select.Option)
    Vue.component(DatePicker.name, DatePicker)
    Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker)
    Vue.component(Radio.name, Radio)
    Vue.component(Radio.Group.name, Radio.Group)
    Vue.component(Radio.Button.name, Radio.Button)
    Vue.component(Checkbox.name, Checkbox)
    Vue.component(Checkbox.Group.name, Checkbox.Group)
    Vue.component(Transfer.name, Transfer)
    Vue.component(Row.name, Row)
    Vue.prototype.$message = message
    Vue.prototype.$confirm = Modal.confirm
  }
}
export default antd
