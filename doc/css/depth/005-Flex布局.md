[[TOC]]

[TOC]



# 五、Flex布局

[
阮一峰flex教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

flex学习游戏：

<http://flexboxfroggy.com/#zh-cn>         

<http://www.flexboxdefense.com/>          



## 1. Flex之前布局使用的技术

- normal flow (正常流，也叫文档流)：内联元素从左到右，块元素从上到下
- float + clear ： 左右、两列、三列布局
- position(relative + absolute): 
- display inline-block ： 一些横向布局：导航
- 负 margin： 扩大宽度或产生位移

## 2. Flex 特点

一种新的布局方式

- 块级布局侧重垂直方向、行内布局侧重水平方向，Flex布局是**与方向无关**的
- Flex布局可以实现**空间自动分配、自动对齐**(flexble:弹性、灵活)
- Flex 适用于**简单的线性布局**，更复杂的布局交给grid布局(还没发布)



## 3. 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

```
+-----------------------------------+------------------------+ <-- cross start
|                                   ^                        |
|   flex container                  |                        |
|                                 cross axis                 |
| <------ main axis ----------------+--------------------->  |
|                                   |                        |
|           +---------------------+ | +--------------+----+  |
|           | flex item           | | |flex item     ^    |  |
|           |                     | | |              |    |  |
|           |                     | | |        cross size |  |
|           | <--+ main size ---> | | |              |    |  |
|           |                     | | |              v    |  |
|           +---------------------+ | +--------------+----+  |
|                                   |                        |
| <-- mian start                    |       main end +-----> |
|                                   |                        |
|                                   v                        |
+------------------------------------------------------------+ <-- cross end

```



## 4. flex container 的属性

| 属性            | 说明                        |
| :-------------- | :-------------------------- |
| flex-direction  | 设置主轴的方向              |
| flex-wrap       | 换行                        |
| flex-flow       | 上面两个的简写              |
| justify-content | 主轴方向对齐方式            |
| align-items     | 侧轴对齐方式                |
| align-content   | 多行/列内容对齐方式(用得少) |

### 4.1 flex-direction:设置主轴排列方向

flex-direction有四个值：

- row(默认值)：水平排列(行)，起点在左边
- row-reverse: 水平排列，起点在右边
- column: 垂直排列，起点在上面
- column-reverse: 垂直排列，起点在下面



```html
<style>
    .parent {
      border: 1px solid red; display: flex;
      flex-direction: column;
    }
    .child {
      border: 1px solid green; width: 100px; height: 50px;
    }
</style>
<div class="parent">
  <div class="child">1</div>
  <div class="child">2</div>
</div>
```

### 4.2 flex-wrap:换行设置，一行排不下时

flex-wrap属性定义，如果一条轴线排不下，如何换行。 默认不换行。

flex-wrap的取值：

- nowrap(默认): 不换行， 此时 设置子元素宽度无效
- wrap:  换行，第一行在上面 
- wrap-reverse: 换行，第一行在下面



### 4.3 flex-flow：flex-direction与flex-wrap的简写

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`.

也可以只写一个属性

```
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```



### 4.4. justify-content:主轴对齐方式

定义项目在主轴上的对齐方式。

justify-content的取值：

- `flex-start`（默认值）：左对齐
- `flex-end`：右对齐
- `center`： 居中
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

下面的代码实现的右侧对齐

```html
<style>
    .parent {
      border: 1px solid red; display: flex;
      flex-flow: wrap-reverse;
      justify-content: flex-end;
    }
    .child {
      border: 1px solid green; width: 150px; height: 50px;
    }
  </style>
<div class="parent">
  <div class="child">1</div>
  <div class="child">2</div>
  <div class="child">3</div>
  <div class="child">4</div>
  <div class="child">5</div>
</div>
```



### 4.5 align-items:定义交叉轴上如何对齐

定义项目在交叉轴上如何对齐。

align-items的取值：

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `baseline`: 项目的第一行文字的基线对齐。
- `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

下面的例子实现了垂直居中

```html
<style>
    .parent {
        border: 1px solid red; display: flex;
        align-items: center;
    }
    .child { border: 1px solid green; width: 150px; }
</style>
<div class="parent">
  <div class="child">1 <br> 1 <br> 1 <br></div>
  <div class="child">2 <br> 2</div>
  <div class="child">3</div>
</div>
```



### 4.6 align-content:多个轴线的对齐方式

定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

align-content的取值：

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。



## 5. item子元素的属性



| 名称        | 说明                                                         |
| :---------- | :----------------------------------------------------------- |
| flex-grow   | 放大比例(空间过多时)。默认为`0`，即如果存在剩余空间，也不放大 |
| flex-shrink | 缩小比例(空间不够时)。默认为1，即如果空间不足，该项目将缩小  |
| flex-basis  | 默认大小(一般不用)                                           |
| flex        | 上面三个的缩写                                               |
| order       | 项目的排列顺序。数值越小，排列越靠前，默认为0                |
| align-self  | 允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性 |

### 5.1 flex-grow:放大比例(空间有剩余)

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

下面的例子中只有第一个子元素设置了lex-grow属性，所以剩下的空间都分配给了第一个子元素。

```html
<style>
    .parent { border: 1px solid red; display: flex; align-items: center; }
    .child { border: 1px solid green; }
    .child:nth-child(1) { flex-grow: 1; }
</style>
<div class="parent">
    <div class="child">1</div>
    <div class="child">2</div>
    <div class="child">3</div>
</div>
```

### 5.2 flex-shrink:缩小比例(空间不够时)

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

下面的例子中，第二个子元素缩放比例比第一个大，所以空间不足时，第二个收缩更多。

```html
<style>
    .parent { border: 1px solid red; display: flex; width: 200px; }
    .child { border: 1px solid green; }
    .child:nth-child(1) { flex-shrink: 2 }
    .child:nth-child(2) { flex-shrink: 3 }
</style>
<div class="parent">
    <div class="child">1 111 111 he llo wor ld</div>
    <div class="child">2 22 22 22 th an kss sss</div>
    <div class="child">3 33333 ttt ttt</div>
</div>
```

### 5.3 flex-basis:不限定宽度时，占据的主轴空间

`flex-basis`属性定义了不限定宽度前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

在下面的例子中，设置了第一个子元素宽度为200px(在空间足够的情况下)，如果空间不足，则此设置无效。

```html
<style>
  .parent { border: 1px solid red; display: flex;  }
  .child { border: 1px solid green; }
  .child:nth-child(1) { flex-basis: 200px; }
</style>
<div class="parent">
  <div class="child">hello world</div>
  <div class="child">2 22 22 22 th an kss sss</div>
  <div class="child">3 33333 ttt ttt</div>
</div>
```



### 5.4 flex：flex-grow、flex-shrink、flex-basis的缩写

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。



### 5.5 order：项目的排列顺序

IE8浏览器不支持这个属性。

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

下面的例子中，第一个子元素排到了最后面。

```html
<style>
    .parent { border: 1px solid red; display: flex;  }
    .child { border: 1px solid green; }
    .child:nth-child(1) { order: 1 }
</style>
<div class="parent">
    <div class="child">1111</div>
    <div class="child">2222</div>
    <div class="child">3333</div>
</div
```

### 5.6 align-self：允许单个项目有与其他项目不一样的对齐方式

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

```
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

下面的例子中，父元素设置了子元素垂直方向顶部对齐，但是可以单独在子元素中设置不遵守这个约定。

```html
<style>
    .parent { border: 1px solid red; display: flex; 
        align-items: flex-start; }
    .child { border: 1px solid green;  width: 50px;}
    .child:nth-child(3) { align-self: flex-end; }
</style>
<div class="parent">
    <div class="child">111 <br> 1111 <br> 11 <br></div>
    <div class="child">2222 <br> 22</div>
    <div class="child">3333</div>
</div>
```



## 6. 使用flex编写的一些布局

### 6.1 手机页面布局(toobar + main + tabs)

上面是header头部，中间是main主内容，下面是footer， header和footer固定， 中间出现滚动条。

```html
<style>
    * { margin: 0; padding: 0;  box-sizing: border-box; }
    ul { list-style: none;}
    .container { height: 100vh; border: 1px solid;
        display: flex; flex-direction: column;
    }
    header { height: 100px;  background: #ddd; border: 1px solid red; }
    main { flex-grow: 1; overflow: auto; }
    footer > ul { display: flex; height: 100px; }
    footer > ul > li { background: red; width: 25%; border: 1px solid blue; }
</style>
<div class="container">
    <header>头部内容</header>
    <main>
        <p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p>
        <p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p>
        <p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p>
        <p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p>
        <p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p><p>内容</p>
    </main>
    <footer>
        <ul>
            <li>菜单</li><li>菜单</li><li>菜单</li><li>菜单</li>
        </ul>
    </footer>
</div>
<!-- http://js.jirengu.com/pinug/6/edit?html,output -->
```



### 6.2 产品列表(ul>li*9)

九宫格列表：

```html
<style>
    * { margin: 0; padding: 0;  box-sizing: border-box; }
    ul { list-style: none; border: 1px solid; width: 350px; margin: auto;
        display: flex; flex-wrap: wrap; justify-content: space-around;
    }
    ul > li { border: 1px solid red; width: 100px; height: 100px; margin: 10px 0; }
</style>
<ul>
    <li></li><li></li><li></li>
    <li></li><li></li><li></li>
    <li></li><li></li><li></li>
</ul>
<!-- http://js.jirengu.com/semuz/2/edit -->
```



### 6.3 PC页面布局

上面是头部，下面是footer，中间main分三列显示。

```html
<style>
    header,footer{ border: 1px solid; height: 100px; background: #ddd; }
    .content { display: flex; }
    .content > aside { width: 60px; background: #444; }
    .content > main { height: 400px; background: red; flex: 1;
    }
    .content > nav { width: 60px; background: green; }
</style>
<header></header>
<div class="content">
    <aside id=asidel></aside>
    <main></main>
    <nav></nav>
</div>
<footer></footer>
<!-- http://js.jirengu.com/nuqif/5/edit -->
```

### 6.4 完美居中

父元素高度固定， 子元素宽高不确定， 水平垂直居中。

```html
<style>
    .parent {
        height: 400px; border: 1px solid;
        background: #ddd;
        display: flex; justify-content: center;
        align-items: center;
    }
    .child {border: 1px solid red;}
</style>
<div class="parent">
    <div class="child">
        dsadasdsa
    </div>
</div>
<!-- http://js.jirengu.com/kosam/2/edit?html,output -->
```