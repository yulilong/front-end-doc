[[TOC]]
[TOC]

# transition:过度、transform:变形

这两个属性都是CSS3版本的属性，所以会有兼容性问题。

## 1. transition:过度

过渡`transition`是一个复合属性，包括`transition-property`,`transition-duration`，`transition-timing-function`，`transtion-delay`四个子属性。通过四个子属性配合完成过度效果。

Internet Explorer 10、Firefox、Opera 和 Chrome 支持 transition 属性。
Safari 支持替代的 -webkit-transition 属性。
注释：Internet Explorer 9 以及更早版本的浏览器不支持 transition 属性。

一个例子：

```css
/* 设置不同的transition-property，对应的transition-delay，transition-timing-function，transition-duration的属性相同时，设置一个即可。*/
.test1 {
  transition-property:width,background; // 过度的 属性
  transition-duration:3s;								// 过度的 持续时间
  transition-timing-function:ease;			// 过度的 时间函数
  transition-delay:500ms;								// 过度的 延迟时间
}
/*相当于*/
.test1 {
  transition:width 3s ease 500ms,background 3s ease 500ms;
}
```

### 1.1 transition-property:过渡的属性
  过渡的属性的名称：

可选值：none(没有指定任何样式)、 all(默认值，指定元素所有支持transition-property属性的样式)、` <transition-property>`(可选过度样式)
适用于：所有元素
继承性：无

不是所有的CSS样式都可以过渡，只有具有中间值的属性才有过渡效果。

```
颜色：color background-color border-color outline-color
位置：background-position left right top botton
长度：
    [1]max-height min-height max-width min-width height width
    [2]border-width margin padding outline-width outline-offset
    [3]font-size line-height text-indent vertical-align  
    [4]border-spacing letter-spacing word-spacing
数字: opacity visibility z-index font-weight zoom
组合: text-shadow transform box-shadow clip
其他: gradient
```



### 1.2 transition-duration:过渡持续时间

定义过渡效果花费的时间,默认是 0
该属性单位是 秒（s）或者毫秒（ms），该属性必须带单位，如果为0s则为默认值，如为0则为无效值。
该值为单值时，所有的过渡属性都对应同样时间；该值为多值时，过渡属性按照顺序对应顺序时间

### 1.3 transition-timing-function:过渡时间函数

规定过渡效果的时间曲线,用于指定过渡类型，
初始值ease，

  ```
  ease:开始和结束慢，中间快。
  linear：匀速
  ease-in：开始慢
  ease-out: 结束慢
  ease-in-out：和ease类似，但比ease幅度大
  step-start:直接位于结束处
  step-end:位于开始处经过时间间隔后结束。
  ```

### 1.4 transition-delay:过渡延迟时间
规定过渡效果何时开始。默认值是 0s。用于制定延迟过渡的时间，该属性单位是秒（s）或毫秒（ms）

**【注意】**该属性必须带单位，0s为默认值，0则为无效值。若该属性为负值，无延迟效果，但过渡元素的起始值将从0变成设定值（*设定值=延迟时间+持续时间*），若该设定值小于等于0；则无过渡效果；若该设定值大于0，则过渡元素从该设定值开始完成剩余的过渡效果

### 1.5 实际代码例子

```less
 .box {
  width: 100px;
  height: 100px;
  background: red;
  transition: width 2s;
  -weikit-transition: width 2s; /* Safari*/
}
.box:hover {
  width: 400px;
}
```

上面的代码在鼠标放入后div的宽会在2秒内变宽到400px。

[在线代码](http://js.jirengu.com/xadub/1/edit)

其他用法

```less
/* 当transition-property的值的个数多余对应的其他属性时（属性值大于1个），则按顺序取值。*/
.test{
  transition-property:width,background,opacity;
  transition-duration:2s,500ms;
  transition-timing-function:linera,ease;
  transition-delay:200ms,4s;
}
/*相当于*/
.test1{
  transition:width 2s linera 200ms, background 500ms ease 4s,opacity 2s linera 200ms;
}

// 当transition-property值的个数少于对应的其他属性，则多余的属性无效。
.test1{
    transition-property: width;
    transition-duration: 2s,500ms;
    transition-timing-function: linear,ease;
    transition-delay: 200ms,0s;
}
/*类似于*/
.test1{
    transition: width 2s linear 200ms;
}

// 当transition-property的值中出现一个无效值，它依然按顺序对transition的其他属性值（其他属性出现无效值，处理情况也类似）
.test1{
    transition-property: width,wuxiao,background;
    transition-duration: 2s,500ms;
    transition-timing-function: linear,ease;
    transition-delay: 200ms,0s;
}
/*类似于*/
.test2{
    transition: width 2s linear 200ms,background 2s linear 200ms;
}

// 当transition-property的值中，有些值重复出现多次，则以最后出现的值为准，前面所有出现的值都被认定为无效值，但依然按顺序对应transition的其他属性值
.test1{
    transition-property: width,width,background;
    transition-duration: 2s,500ms;
    transition-timing-function: linear,ease;
    transition-delay: 200ms,0s;
}
/*类似于*/
.test2{
    transition: width 500ms ease 0s,background 2s linear 200ms;
}

```

参考资料：https://www.jianshu.com/p/5dbeeb2159e8

## 2. Transform:变形

参考资料：https://www.cnblogs.com/aspnetjia/p/5139020.html

指拉伸，压缩，旋转，偏移等等一些图形学里面的基本变换。这是通过修改CSS视觉格式化模型的坐标空间来实现的。

只能转换由盒子模型定位的元素。根据经验，如果元素具有`display: block`，则由盒模型定位元素。

`skew`是倾斜，`scale`是缩放，`rotate`是旋转，`translate`是平移。最后需要说明一点，transform 支持综合变换。

以如下代码为例，讲解这几个属性作用：

```html
<style>
    .one {
        width: 200px;
        height: 200px;
        background-color: red;
        transition: transform 1s linear;
    }
</style>
<div class="one"></div>
```

### 2.1 旋转:rotate

```CSS
.one:hover {
  transform: rotate(45deg);
}
```

共一个参数“角度”，单位deg为度的意思，正数为顺时针旋转，负数为逆时针旋转，上述代码作用是顺时针旋转45度。

### 2.2 缩放:scale

```less
.one:hover {
  transform: scale(0.5);
  // transform: scale(0.5, 2); 或者这样用
}
```

参数表示缩放倍数；

- 一个参数时：表示水平和垂直同时缩放该倍率
- 两个参数时：第一个参数指定水平方向的缩放倍率，第二个参数指定垂直方向的缩放倍率。

### 2.3 倾斜:skew

用法：

```less
.one:hover {
  /* transform: skewX(30deg);  X轴(水平)倾斜30度*/
  /* transform: skewy(30deg); Y轴(垂直)倾斜30度*/
  transform: skew(30deg); /* X轴(水平)倾斜30度 */
  /* transform: skew(30deg, 30deg); X轴(水平)倾斜30度, Y轴(垂直)倾斜30度*/ 
}
```

参数表示倾斜角度，单位deg

- 一个参数时：表示水平方向的倾斜角度；
- 两个参数时：第一个参数表示水平方向的倾斜角度，第二个参数表示垂直方向的倾斜角度。

### 2.4 移动:translate

用法：

```less
.one:hover {
  /* transform: translate(45px); 水平右移45px*/
  /* transform: translate(45px, 45px); 水平右移45px, 垂直下移45px*/
  /* transform: translateX(45px); 水平右移45px*/
  transform: translateY(45px); /* 垂直下移45px*/
}
```

参数表示移动距离，单位px，

- 一个参数时：表示水平方向的移动距离；
- 两个参数时：第一个参数表示水平方向的移动距离，第二个参数表示垂直方向的移动距离。

### 2.5 基准点: transform-origin

在使用transform方法进行文字或图像的变形时，是以元素的中心点为基准点进行的。使用transform-origin属性，可以改变变形的基准点。

```less
.one:hover {
  transform-origin: 10px 10px;
}
```

共两个参数，表示相对左上角原点的距离，单位px，第一个参数表示相对左上角原点水平方向的距离，第二个参数表示相对左上角原点垂直方向的距离；

两个参数除了可以设置为具体的像素值，其中第一个参数可以指定为left、center、right，第二个参数可以指定为top、center、bottom。

### 2.6 多个方法组合使用

用法：

```less
.one:hover {
  transform: rotate(45deg) scale(0.5) skew(30deg, 30deg) translate(100px, 100px);
}
```

这四种变形方法顺序可以随意，但不同的顺序导致变形结果不同，原因是变形的顺序是从左到右依次进行，这个用法中的执行顺序为1.rotate  2.scalse  3.skew  4.translate


## 参考资料

[深入理解CSS过渡属性transition 简书](https://www.jianshu.com/p/5dbeeb2159e8)

[CSS3属性transform详解](https://www.cnblogs.com/aspnetjia/p/5139020.html)

[CSS3（三）Animation 入门详解 CSDN](https://blog.csdn.net/u013243347/article/details/7997