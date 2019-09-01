<template lang="pug">
  a-layout(
    id="components-layout-demo-side"
    style="min-height: 100vh"
  )
    a-layout-sider(
      :trigger="null"
      collapsible
      v-model="collapsed"
      :style="{background: '#fff', overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: '999'}"
    )
      .logo 仓库管理系统
      a-menu(
        theme="light"
        :defaultSelectedKeys="[$route.path]"
        :defaultOpenKeys="[defaultOpenKeys]"
        mode="inline"
        @select="menuSelect"
      )
        template(
          v-for="item in menu"
          v-if="!item.meta.menuHidden"
        )
          a-sub-menu(
            :key="item.path"
            v-if="item.children"
          )
            span(slot="title")
              a-icon(:type="item.meta.icon")
              span {{item.meta.name}}
            a-menu-item(
              v-for="n in item.children"
              :key="n.path"
            ) {{n.meta.name}}
          a-menu-item(
            :key="item.path"
            v-else
          )
            a-icon(type="pie-chart")
            span {{item.meta.name}}
    a-layout(:style="{ marginLeft: collapsed?'80px':'200px', minWidth: '1440px'}")
      a-layout-header(style="background: rgba(255,255,255,1); padding: 0 24px; box-shadow:0px 1px 4px 0px rgba(18,0,52,0.12);")
        a-icon(
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        )
        // w-header
      a-layout-content(style="background:rgba(243,242,243,1)")
        .my-breadcrumb
          a-breadcrumb(style="margin: 16px 0")
            a-breadcrumb-item(
              v-for="item,index in breadcrumb"
              :key="index"
              v-if="index>1"
            ) {{item.meta.name}}
        div(:style="{overflow:'initial'}")
          router-view
      a-layout-footer(style="text-align: center")
</template>
<script>
export default {
  mounted () {
  },
  computed: {
    menu () {
      return this.$router.options.routes[0].children[0].children
    },
    breadcrumb () {
      return this.$route.matched
    },
    defaultOpenKeys () {
      const {matched} = this.$route
      const len = matched.length
      if (len > 1) {
        return matched[len - 2].path
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    menuSelect ({key}) {
      this.$router.push(key)
    }
  }
}
</script>

<style>
#components-layout-demo-side .logo {
  height: 64px;
  border-bottom: 1px solid rgba(232,232,232,1);
  text-align: center;
  line-height: 64px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  /* z-index: 99; */
}
#components-layout-demo-side .my-breadcrumb {
  background-color: rgba(255,255,255,1);
  margin-top: 1px;
  padding: 1px 32px;
  font-size:14px;
}
</style>
