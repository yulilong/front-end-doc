[[TOC]]

[TOC]



# element-plus 样式修改

## 1. 选择框选中的文字和默认提示文字修改

```vue
<template>
  <div>
    <el-tree-select class="select" />
    <el-select class="select" >
      <el-option />
    </el-select>
  </div>
</template>
<style lang="scss" scoped>
.select {
  width: 200px;
  :deep(.el-select__wrapper) {
    background-color: unset;
    // 选择框选中的问题和默认提示文字颜色
    .is-transparent, .el-select__placeholder {
      color: white;
    }
  }
}
</style>
```



## 2. 表单包裹数字数据框，数字按钮遮住了报错红色边框解决

```vue
<template>
  <div>
    <el-form-item>
      <el-input-number class="input-number"/>
    </el-form-item>
  </div>
</template>
<style lang="scss" scoped>
:deep(.input-number) {
  // 按钮的绝对定位距离顶部 遮住了红线
  span {
    top: 2px;
  }
}
</style>
```

