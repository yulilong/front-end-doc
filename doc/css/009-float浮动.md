[[TOC]]

[TOC]



# float浮动

常规流(文档流)：文字内容布局从左到右，从上到下布局，元素也是，块内元素从左到右，从上到下排列。块元素排列从上到下排列。

脱离常规流：元素脱离了常规流(定位、浮动)，独立显示。



**1.什么是浮动**：在我们布局的时用到的一种技术，能够方便我们进行布局，通过让元素浮动，我们可以使元素在水平上左右移动，再通过margin属性调整位置

2**.浮动的原理**：使当前元素脱离文档流，相当于浮动起来一样，浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘

**3.浮动的生成**：使用css属性float：left/right/none 左浮动/右浮动/不浮动（默认）

**4.浮动的影响**：

- 对附近的元素布局造成改变，使得布局混乱
- 浮动后的元素可以设置宽度和高度等，也就是说元素浮动后会变成块级元素，但我更倾向于说元素变成inline-block类型的元素，即同时拥有块级与行内元素的特征
- 因为浮动元素脱离了普通流，会出现一种高度坍塌的现象：原来的父容器高度是当前元素A撑开的，但是当A元素浮动后，脱离普通流浮动起来，那父容器的高度就坍塌（前提是父容器高度小于A元素高度）

如果浮动非替换元素，则要指定一个明确的宽度；否则，它们会尽可能地窄。

| 值      | 描述                                                 |
| ------- | ---------------------------------------------------- |
| left    | 元素向左浮动。                                       |
| right   | 元素向右浮动。                                       |
| none    | 默认值。元素不浮动，并会显示在其在文本中出现的位置。 |
| inherit | 规定应该从父元素继承 float 属性的值。                |



## 1. 浮动介绍

**浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。**

**由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。**

css权威指南中关于浮动说明：浮动元素同时处理(常规)流内和流外：

浮动元素不影响块级元素的布局(块级元素当浮动元素不存在)

浮动元素会影响行内元素布局，从而间接影响块级元素布局(行内元素影响的块级元素)

浮动不能和定位完全同时使用。
当同时使用时，定位生效，不完全是这样子， 浮动与相对定位就可以一起使用。
```html
<style>
    div {border: 1px solid; width: 200px;}
    /* span {float: left; color: red; position: fixed; top: 0;} */
    span { float: left; color: blue; position: relative; top: 10px;}
  </style>
  <div>
    sdadada dada dsadsad dsadasd dsada
    dsada dsada <span>3333</span> dad dsada
  </div>
```



## 2. 浮动元素的摆放

浮动元素的摆放方式(float: left)：
尽量靠上
尽量靠左
尽量挨着(margin外边缘挨着，阻止了margin合并)
不能超过所在行的最高点
不能超过它前面的浮动元素的最高点
行内元素绕着浮动元素摆放: 行内元素会出现在左浮动元素的右边，左浮动元素的左边不会摆放浮动元素

```html
<style>
  div {border: 1px solid; width: 200px;}
  .clearfix {display: inline-block; width: 230px; vertical-align: top;}
  .clearfix:after {content: ''; display: block; clear: both;}
  .t1 { width: 70px; height: 80px; color: red; float: left;}
  .t2 {width: 70px; height: 50px; color: blue; float: left;}
  .t3 {width: 100px; height: 70px; color: red; float: left;}
  .t5 {width: 60px; height: 80px; color: green; float: left; font-size: 14px}
  .t6 {width: 100px; height: 20px; color: red; float: right;}
  .t7 {width: 20px; height: 50px; color: red; float: right;}
</style>
<div class="clearfix">
  <div class="t1">1</div>
  <div class="t2">2</div>
  <div class="t3">3</div>
  <div class="t6">6</div>
  <div class="t7"></div>
  尽量挨着(margin外边缘挨着，阻止了margin合并)尽量挨着(margin外边缘挨着，阻止了margin合并)
  尽量挨着(margin外边缘挨着，阻止了margin合并)
</div>
<div class="clearfix">
  <div class="t1">4</div>
  <div class="t2">5</div>
  <div class="t3">6</div>
  <div class="t5">7 </div>
  123132 32 1 321 32 13 12 32 23 23 23 23 23222 32 3 23 23 23222 32
</div>
```

[代码效果](http://js.jirengu.com/wucam/6/edit)

![](./img/019-float.png)



## 3. 浮动的清除：clear属性

clear 属性规定元素的哪一侧不允许其他浮动元素， 只能用在块级元素上，行内元素无效。

| 值      | 描述                                  |
| ------- | ------------------------------------- |
| left    | 在左侧不允许浮动元素。                |
| right   | 在右侧不允许浮动元素。                |
| both    | 在左右两侧均不允许浮动元素。          |
| none    | 默认值。允许浮动元素出现在两侧。      |
| inherit | 规定应该从父元素继承 clear 属性的值。 |



清除子元素float效果

```html
<style>
    div {border: 1px solid; width: 200px;}
    .clearfix {display: inline-block; width: 230px; vertical-align: top;}
    .clearfix:after {content: ''; display: block; clear: both;}
    .t1 { width: 70px; height: 80px; color: red; float: left;}
    .t2 {width: 70px; height: 50px; color: blue; float: left;}
  </style>
  <div class="clearfix">
    <div class="t1">1</div>
    <div class="t2">2</div>
  </div>
```











## 参考资料

 [带你彻底掌握 CSS 浮动 segmentFault](https://segmentfault.com/ls/1650000018852896)

[CSS 浮动 W3school](https://www.w3school.com.cn/css/css_positioning_floating.asp)

[CSS浮动float详解 简书](https://www.jianshu.com/p/07eb19957991)