[[TOC]]

[TOC]

# Vue3 单文件组件 CSS 功能

## 1. 样式作用域管理

### 1.1 组件级样式隔离（Scoped CSS）

当 `<style>` 标签带有 `scoped` attribute 的时候，它的 CSS 只会影响当前组件的元素，和 Shadow DOM 中的样式封装类似。使用时有一些注意事项，不过好处是不需要任何的 polyfill。它的实现方式是通过 PostCSS 将以下内容：

```vue
<style scoped>
.example { color: red; }
</style>
<template>
  <div class="example">hi</div>
</template>
```

转换为：

```vue
<style>
.example[data-v-f3f3eg9] { color: red; }
</style>
<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

#### 1.1.1 可以影响子组件的根元素

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

### 1.2 深度选择器(样式穿透)

处于 `scoped` 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 `:deep()` 这个伪类：

```vue
<style scoped>
.a :deep(.b) { /* 嵌套使用 */
  /* ... */
}
:deep(.child-component) { /* 修改子组件样式 */
  color: red;
}
</style>
```

上面的代码会被编译成：

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
.child-component {}
```

#### 1.2.1 与 Vue2 的对比

| 版本 | 写法示例             | 状态     |
| :--- | :------------------- | :------- |
| Vue2 | `.parent >>> .child` | 已废弃   |
| Vue2 | `/deep/ .child`      | 已废弃   |
| Vue3 | `:deep(.child)`      | 推荐写法 |













