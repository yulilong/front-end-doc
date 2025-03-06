[[TOC]]

[TOC]

# Vue3 单文件组件 CSS 功能

Vue3 的 CSS 功能演进带来了：
✅ 更规范的样式作用域管理
✅ 更强大的动态样式能力
✅ 更友好的预处理集成
✅ 更智能的编译优化

通过合理应用这些特性，开发者可以构建出：

- 高可维护的组件化样式体系
- 动态响应式的界面效果
- 高性能的前端应用

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

### 1.3 插槽选择器

默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。使用 `:slotted` 伪类以明确地将插槽内容作为选择器的目标：

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### 1.4 全局选择器

如果想让其中一个样式规则应用到全局有如下两种方式：

1、使用`:global` 伪类来实现

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

2、另外创建一个 `<style>`

```vue
<!-- 在同一个组件中同时包含作用域样式和非作用域样式： -->
<style>
/* 全局样式 */
</style>
<style scoped>
/* 局部样式 */
</style>
```

### 1.5 CSS Modules 集成

一个 `<style module>` 标签会被编译为 [CSS Modules](https://github.com/css-modules/css-modules) 并且将生成的 CSS class 作为 `$style` 对象暴露给组件：

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red { color: red; }
</style>
```

class 将被哈希化以避免冲突，实现了同样的将 CSS 仅作用于当前组件的效果。

参考 [CSS Modules spec](https://github.com/css-modules/css-modules) 以查看更多详情，例如 [global exceptions](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#exceptions) 和 [composition](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#composition)。

#### 1.5.1 自定义名称

你可以通过给 `module` attribute 一个值来自定义注入 class 对象的属性名：

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red { color: red; }
</style>
```

#### 1.5.2 在JS中访问

可以通过 `useCssModule` API 在 `setup()` 和 `<script setup>` 中访问注入的 class。对于使用了自定义注入名称的 `<style module>` 块，`useCssModule` 接收一个匹配的 `module` attribute 值作为第一个参数：

```vue
<script setup lang="ts">
import { useCssModule } from 'vue'
// 在 setup() 作用域中...
// 默认情况下，返回 <style module> 的 class
const classes = useCssModule()

// 具名情况下，返回 <style module="classes"> 的 class
// useCssModule('classes')
</script>

<template>
  <p :class="classes.red">red</p>
</template>

<style module>
.red { color: red; }
</style>
```



## 2. 动态样式

### 2.1 响应式 CSS 变量：`v-bind()`

单文件组件的 `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 的值链接到动态的组件状态：

```vue
<template>
  <div class="text">hello</div>
</template>
<script>
export default {
  data() {
    return { color: 'red' }
  }
}
</script>
<style>
.text {
  color: v-bind(color);
}
</style>
```

这个语法同样也适用于 [`<script setup>`](https://cn.vuejs.org/api/sfc-script-setup.html)，且支持 JavaScript 表达式 (需要用引号包裹起来)：

```vue
<script setup>
import { ref } from 'vue'
const accentColor = ref('#42b983')
const theme = ref({
    color: 'red',
})
</script>

<style scoped>
.header {
  color: v-bind(accentColor);
  border: 2px solid v-bind('accentColor + "80"');
}
p {
  color: v-bind('theme.color');
}
</style>
```

实际的值会被编译成哈希化的 CSS 自定义属性，因此 CSS 本身仍然是静态的。自定义属性会通过内联样式的方式应用到组件的根元素上，并且在源值变更的时候响应式地更新。

### 2.2 动态类名绑定

```vue
<template>
  <div :class="{
    'active': isActive,
    [dynamicClass]: true
  }"></div>
</template>
```

## 3. 预处理器支持

安装预处理工具：

```bash
npm install sass -D
```

示例代码：

```vue
<style lang="scss" scoped>
$primary: #42b983;
.button {
  &:hover {
    background: darken($primary, 15%);
  }
  :deep(.icon) {
    margin-right: 8px;
  }
}
</style>
```

## 4. 样式组织规范

### 4.1 文件结构建议

```vue
<style>
/* 全局基础样式 */
</style>

<style scoped>
/* 组件私有样式 */
:deep(...) { /* 穿透样式 */ }
</style>

<style module>
/* CSS Modules */
</style>
```

### 4.2 最佳实践

1. 优先使用作用域样式
2. 第三方组件样式修改使用 `:deep()`
3. 复杂项目使用 CSS Modules
4. 避免超过 3 层选择器嵌套
5. 动态样式优先使用 CSS 变量

## 5. 迁移指南

1、深度选择器改造

```diff
- .parent /deep/ .child
+ .parent :deep(.child)

- ::v-deep .child
+ :deep(.child)
```

2、样式绑定升级

```diff
- color: {{ dynamicColor }};
+ color: v-bind(dynamicColor);
```

## 6. 常见问题解决

**Q：为何修改子组件样式无效？**
A：检查是否：

1. 正确使用 `:deep()` 选择器
2. 子组件定义了默认插槽
3. 选择器权重足够

**Q：如何全局覆盖组件库样式？**
推荐方案：

```css
/* 全局样式文件 */
.el-button:deep(.inner-span) {
  font-weight: bold;
}
```



## 参考资料

[单文件组件 CSS 功能 官方文档](https://cn.vuejs.org/api/sfc-css-features.html)

[单文件组件语法定义 官方文档](https://cn.vuejs.org/api/sfc-spec.html)







