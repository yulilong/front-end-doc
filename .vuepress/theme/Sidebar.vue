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
          :chapter="chapter"
        />
        <SidebarLink v-else :item="item" :chapter="chapter"/>
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
      chapter: true, // 菜单栏是否展开， true：展开， false：收起
      oneLevelkey: null, // 页面菜单的key
    }
  },

  created () {
    this.refreshIndex()
    // 设置当前的页面菜单key，用于菜单的展开、收缩
    this.setOneLevelkey();
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

    // 设置当前的页面菜单key，用于菜单的展开、收缩
    setOneLevelkey () {
      let urlPath = '';
      // vuepress编译项目的时候找不到location， 加个判断
      if (typeof window !== 'undefined') {
        urlPath = decodeURIComponent(window.location.pathname);
      }
      this.items.forEach(element => {
        if (urlPath === element.path) {
          this.oneLevelkey = element.key;
        } else if (element.type === 'group') {
          element.children.forEach( e => {
            if (urlPath === e.path) {
              this.oneLevelkey = e.key;
            }
          })
        }
      });
    },
    // 点击侧边栏标题链接
    fileName (a, time = 50) {
        // 延迟执行的目的是为了把菜单渲染结束后在操作
        setTimeout(this.fileName2,time, a, time);
    },
    fileName2 (a, time) {
      var nextSibling = a.nextSibling;
      // 为了防止在操作dom前ul还没有渲染，多进行几次重试
      if (!a.nextSibling && time === 50) {
        this.fileName(a, 100)
      } else if (!a.nextSibling && time === 100) {
        this.fileName(a, 300)
      } else if (!a.nextSibling && time === 300) {
        this.fileName(a, 600)
      } else if (!a.nextSibling) {
        // 确实没有子菜单，试了这么多遍了， 如果卡了那没办法
        // 设置当前的页面菜单key，用于菜单的展开、收缩, 只有点击的是一级标题才设置
        this.setOneLevelkey();
      }
      // 点击没有子标题时 nextSibling === null，点击的是分组侧边栏时 nextSibling === #text
      // 当点击的标题有子标题时，才收缩标题
      if (nextSibling && nextSibling.tagName === 'UL') {
        // setTimeout(this.changeStyle,5, a.nextSibling, a.innerText);
        this.changeStyle(a.nextSibling, a.innerText);
      }
    },
    // 切换二级菜单
    changeStyle (b, aInnerText) {
      if (b.offsetHeight && b.offsetHeight > 0) {
        // 展开状态， 收起菜单
        b.style.height = '0';
        b.style.overflow = 'hidden';
        this.items.forEach(element => {
          // 如果点击的是页面菜单标题
          if (aInnerText === element.title) {
            this.isOneLevel(b, element, false);
          } else if (element.type === 'group') {
            element.children.forEach( e => {
              if (aInnerText === e.title) {
                this.isOneLevel(b, e, false);
              }
            })
          }
        });
      } else {
        // 收起状态,展开菜单
        b.style.height = 'auto';
        b.style.overflow = 'inherit';
        // 点击的是页面标题菜单 才展开
        this.items.forEach(element => {
          if (element.title === aInnerText) {
            this.chapter = true;
          } else if (element.type === 'group') {
            element.children.forEach( e => {
              if (e.title === aInnerText) {
                this.chapter = true;
              }
            })
          }
        });
      }
    },

    // 判断点击的是否是页面标题菜单
    isOneLevel (b, element, chapter) {
      if (this.oneLevelkey !== element.key) {
        // 点击的是不同页面标题， 应该展开菜单
        b.style.height = 'auto';
        b.style.overflow = 'inherit';
        // 设置箭头为展开状态
        this.chapter = true;
        // 设置选中的页面标题的key
        this.oneLevelkey = element.key;
      } else if (this.oneLevelkey === element.key) {
        // 点击的是同一个页面标题，则收起菜单
        this.chapter = false;
      }
    },
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
