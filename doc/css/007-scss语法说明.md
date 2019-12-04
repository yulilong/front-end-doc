[[TOC]]

[TOC]

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

### 1.1 默认变量`!default`

一般情况下，反复声明一个变量，只有最后一处声明有效且会覆盖前面的值，如：

```scss
$link-color: blue;
div {  color: $link-color; }
$link-color: red;
a { color: $link-color; }

/* 编译后 */
div { color: blue;}
a { color: red; }
```

假如你写了一个可被他人通过`@import`导入的`sass`库文件，你可能希望导入者可以定制修改`sass`库文件中的某些值。使用`sass`的`!default`标签可以实现这个目的。

`!default`含义是：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。

```scss
$fancybox-width: 400px !default;
.fancybox {
width: $fancybox-width;
}
```

在上例中，如果用户在导入你的`sass`局部文件之前声明了一个`$fancybox-width`变量，那么你的局部文件中对`$fancybox-width`赋值`400px`的操作就无效。如果用户没有做这样的声明，则`$fancybox-width`将默认为`400px`。

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



## 3. 导入scss文件@import

css有`@import`特性，它允许一个css文件中导入其他css文件，然而，只有执行到`@import`时，浏览器才会去下载其他css文件，这导致页面加载起来变慢。

scss也有`@import`规则，不同的是，scss会在生成css文件时就把相关文件导入进来，所有相关样式归纳到同一个css文件，所有被导入文件中定义的变量和混合器均可在导入文件中使用。

使用`sass`的`@import`规则并不需要指明被导入文件的全名。你可以省略`.sass`或`.scss`文件后缀。在不修改样式表的前提下，你完全可以随意修改你或别人写的被导入的`sass`样式文件语法，在`sass`和`scss`语法之间随意切换。

![](./img/013-scss.png)

### 3.1 引入局部文件

当通过`@import`把scss样式分散到多个文件时，有的scss文件并不需要生成独立的css文件，这样的文件称为局部文件。scss有一个特殊的约定来命名这些文件。

scss局部文件的文件名以下划线开头(`_variable.scss`)，这样，scss就不会在编译时单独编译这个文件输出css，而只把这个文件用作导入。

```scss
// _reset.scss
html, body, ul, ol {
  margin:  0;
  padding: 0;
}

// base.scss
@import 'reset';
body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}

/*编译后*/
html, body, ul, ol {
  margin: 0;
  padding: 0; }

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef; }
```

### 3.2 嵌套导入

跟原生的`css`不同，`sass`允许`@import`命令写在`css`规则内。这种导入方式下，生成对应的`css`文件时，局部文件会被直接插入到`css`规则内导入它的地方。举例说明，有一个名为`_blue-theme.scss`的局部文件，内容如下：

```scss
// _blue-theme.scss
aside {
  background: blue;
  color: white;
}

// base.scss
.blue-theme {@import "blue-theme"}

//生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。
.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```



### 3.3 原生CSS的导入

由于`sass`兼容原生的`css`，所以它也支持原生的`CSS@import`。

下列三种情况下会生成原生的`CSS@import`，尽管这会造成浏览器解析`css`时的额外下载：

- 被导入文件的名字以`.css`结尾；
- 被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；
- 被导入文件的名字是`CSS`的url()值。

不能用scss的`@import`直接导入一个原始的css文件，因为scss会认为你想用css原生的`@import`。但是，由于scss语法完全兼容css，所以你可以直接把原始的css文件改名为`.scss`后缀，就可直接导入了。

## 4. 静默注释

css注释格式：`/* ... */`，这个注释会显示到源码中。

scss提供了一种静默注释，其注释内容不会出现在生成的css文件中，格式: `//`

```scss
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

scss在默写情况下，`/* ... */`注释也会在生成的css文件中抹去：当注释出现在原生css不允许的地方，如在`css`属性或选择器中，`sass`将不知如何将其生成到对应`css`文件中的相应位置，于是这些注释被抹掉：

```scss
body {
  color /* 这块注释内容不会出现在生成的css中 */: #333;
  padding: 1; /* 这块注释内容也不会出现在生成的css中 */ 0;
}
```

## 5. 混合

混合（Mixin）用来分组那些需要在页面中复用的CSS声明，开发人员可以通过向Mixin传递变量参数来让代码更加灵活，该特性在添加浏览器兼容性前缀的时候非常有用，SASS目前使用@mixin name指令来进行混合操作。

```scss
// 定义一个混合
@mixin rounded-corners { border-radius: 5px; }
notice {
  border: 2px solid #00aa00;
  // 使用混合
  @include rounded-corners;
}

/*编译后*/
notice {
  border: 2px solid #00aa00;
  border-radius: 5px;}
```

### 5.1 混合器中有css规则

```scss
@mixin no-bullets {
  list-style: none;
  li {
    margin-left: 0px;
  }
}
ul.plain {
  color: #444;
  @include no-bullets;
}
/*编译后*/
ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  margin-left: 0px;
}
```

### 5.2 混合器传参

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
a {
  @include link-colors(blue, red, green);
}
// 通过语法$name: value的形式指定每个参数的值。
ul {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}

/*编译后*/
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
ul { color: blue; }
ul:hover { color: red; }
ul:visited { color: green; }
```

### 5.3 默认参数值

参数默认值使用`$name: default-value`的声明形式，默认值可以是任何有效的`css`属性值，甚至是其他参数的引用，如下代码：

```scss
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

如果像下边这样调用：`@include link-colors(red)` `$hover`和`$visited`也会被自动赋值为`red`。

### 5.4 何时使用混合器

判断一组属性是否应该组合成一个混合器，一条经验法则就是你能否为这个混合器想出一个好的名字。比如`rounded-corners``fancy-font`或者`no-bullets`，那么往往能够构造一个合适的混合器。如果你找不到，这时候构造一个混合器可能并不合适。



## 6. 继承







## 参考资料

[Sass中文网](https://www.sass.hk/)

[scss转CSS](https://www.sassmeister.com/)

[css转scss](https://www.sass.hk/css2sass/)

