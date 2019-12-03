# SCSS 语法说明

SASS是世界上最成熟、最稳定、最强大的专业级CSS扩展语言！SASS提供的变量、嵌套、混合、继承等特性，让CSS的书写更加有趣与程式化。

而SCSS是Sass3版本当中引入的新语法特性，完全兼容CSS3的同时继承了Sass强大的动态功能。

下面scss语法可在线测试：https://www.sassmeister.com/

## 1. 变量

变量用来存储需要在CSS中复用的信息，例如颜色和字体。SASS通过`$`符号去声明一个变量。

```css
$nav-color: #F90;
$highlight-border: 1px solid $nav-color;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
  border: $highlight-border;
}

//编译后
nav {
  width: 100px;
  color: #F90;
  border: 1px solid #F90;
}
```

`$nav-color`这个变量定义在了规则块外边，所以在这个样式表中都可以像 `nav`规则块那样引用它。

在这段代码中，`$nav-color`这个变量定义在了规则块外边，所以在这个样式表中都可以像 `nav`规则块那样引用它。`$width`这个变量定义在了`nav`的`{ }`规则块内，所以它只能在`nav`规则块 内使用。这意味着是你可以在样式表的其他地方定义和使用`$width`变量，不会对这里造成影响。

`sass`的变量名可以与`css`中的属性名和选择器名称相同，包括中划线和下划线。这完全取决于个人的喜好。

## 2. 嵌套CSS 规则

SASS允许开发人员以嵌套的方式使用CSS，

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}

/* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
/* --------------------------------------------------- */
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}

/* 编译后 */
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

大多数情况下这种简单的嵌套都没问题，但是有些场景下不行，比如你想要在嵌套的选择器 里边立刻应用一个类似于`：hover`的伪类。为了解决这种以及其他情况，`sass`提供了一个特殊结 构`&`。

### 2.1 父选择器标识符&

scss只用`&`符号在嵌套中来表示父选择器：

```scss
article a {
  color: blue;
  &:hover { color: red }
}

/* 编译后 */
article a { color: blue }
article a:hover { color: red }
```

同时父选择器标识符还有另外一种用法，你可以在父选择器之前添加选择器:

```scss
#content aside {
  color: red;
  // 在<body>标签上添加一个ie的类名
  body.ie & { color: green }
}

/*编译后*/
#content aside {color: red};
body.ie #content aside { color: green }
```



### 2.2 嵌套属性

CSS许多属性都位于相同的命名空间（例如`border-style``border-width``border-color`以及`border-*`等都位于border命名空间下），Scss当中只需要编写命名空间一次，后续嵌套的子属性都将会位于该命名空间之下

```scss
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}

/*编译后*/
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}

/* --------------------------------------------------- */

.demo {
  font: 20px/24px fantasy {
    weight: bold;
  }
}
/*编译后*/
.demo {
  font: 20px/24px fantasy;
  font-weight: bold;
}
```



## 参考资料

[Sass中文网](https://www.sass.hk/)

[scss转CSS](https://www.sassmeister.com/)

[css转scss](https://www.sass.hk/css2sass/)

