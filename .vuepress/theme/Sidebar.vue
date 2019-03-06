<template>
  <div class="sidebar">
    <NavLinks/>
    <slot name="top"/>
    <ul class="sidebar-links" v-if="items.length">
      <li v-for="(item, i) in items" :key="i" v-on:click="fileName($event.target)">
        <SidebarGroup
          v-if="item.type === 'group'"
          :item="item"
          :first="i === 0"
          :open="i === openGroupIndex"
          :collapsable="item.collapsable || item.collapsible"
          @toggle="toggleGroup(i)"
        />
        <SidebarLink v-else :item="item"/>
      </li>
    </ul>
    <slot name="bottom"/>
  </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'
import { isActive } from './util'

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },

  props: ['items'],

  data () {
    let h = '';
    if (typeof window !== 'undefined') {
        h = window.location.href
    }
    return {
      openGroupIndex: 0,
      href: h,
    }
  },

  created () {
    this.refreshIndex()
  },

  watch: {
    '$route' () {
      this.refreshIndex()
    }
  },

  methods: {
    refreshIndex () {
      const index = resolveOpenGroupIndex(
        this.$route,
        this.items
      )
      if (index > -1) {
        this.openGroupIndex = index
      }
    },

    toggleGroup (index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive (page) {
      return isActive(this.$route, page.path)
    },

    // 点击侧边栏标题链接
    fileName (a) {
        var nextSibling = a.nextSibling;
        // 点击没有子标题时 nextSibling === null，点击的是分组侧边栏时 nextSibling === #text
        // 当点击的标题有子标题时，才收缩标题
        if (nextSibling && nextSibling.tagName === 'UL') {
            setTimeout(this.changeStyle,5, a.nextSibling);
        }
    },
    // 切换二级菜单
    changeStyle (b) {
        if(this.href !== location.href) {
            // 点击了不同的标题
            this.href = location.href;
            b.style.height = 'auto';
            b.style.overflow = 'inherit';
        } else if (b.style.height === '' || b.style.height === 'auto') {
            // 收起子菜单
            b.style.height = '0';
            b.style.overflow = 'hidden';
        } else {
            // 展开子菜单
            b.style.height = 'auto';
            b.style.overflow = 'inherit';
        }
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  .sidebar-links
    padding 1.5rem 0

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    .sidebar-links
      padding 1rem 0
</style>
