[[TOC]]

[TOC]



# less 代码片段

## 1. less中使用calc

正常写法

```css
div{
  width: calc(100% - 30px);
}
```

less 写法

```css
div{
  width: calc(~"100% - 30px");
}
```

less 变量写法

```less
@myHeight: 30px;
div{
  height: calc(~"100% - @{myHeight}");
}
```

