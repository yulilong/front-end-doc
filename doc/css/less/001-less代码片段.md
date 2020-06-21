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



## 2. 类中引入其他类的样式

命名空间和访问符

```less
.a { height: 30px; }
.b { width: 30px; }
// 使用
// <div className="a b"></div>
```

如果在类b中就引入了类a的样式，那么在HTML中类名就不需要写a了，less中写法：

```less
.a { height: 30px; }
.b {
    .a(); // 把类a的样式引入到b中，相当于把height: 30px;写入到此处
    width: 30px;
}
// 使用
// <div className="b"></div>
```

