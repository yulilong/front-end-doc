[[TOC]]

[TOC]



# CSS关键字 initial、inherit、unset区别

在css中，initial（初始）、inherit（继承）、unset（未设置）、revert（还原）这四个关键字可以应用于所有的CSS属性。

initial - 初始默认值，IE不支持。

inherit - 继承直接父元素的对应属性值，IE7-不支持。

unset - 表示如果该属性默认可继承，则值为inherit，否则值为initial，IE不支持，safari9-不支持，ios9.2-不支持，android4.4.4-不支持

revert - 表示样式表中定义的元素属性的默认值。若用户定义样式表中显式设置，则按此设置；否则，按照浏览器定义样式表中的样式设置；否则，等价于unset，只有safari9.1+和ios9.3+支持

## 1. initial

`initial` 关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。（IE 不支持该关键字）。

## 2. inherit

每一个 CSS 属性都有一个特性就是，这个属性必然是默认继承的 (`inherited: Yes`) 或者是默认不继承的 (`inherited: no`)其中之一，我们可以在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference) 上通过这个索引查找，判断一个属性的是否继承特性。

可继承的属性：

- 所有元素可继承：visibility 和 cursor
- 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、font-weight、text- decoration、text-transform、direction
- 块状元素可继承：text-indent和text-align
- 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image
- 表格元素可继承：border-collapse

## 3. unset

`unset` 关键字可以简单理解为不设置。其实，它是关键字 `initial` 和 `inherit` 的组合。也就是当我们给一个 CSS 属性设置了 `unset` 的话：

1. 如果该属性是默认继承属性，该值等同于 `inherit`
2. 如果该属性是非继承属性，该值等同于 `initial`

举个例子，根据上面列举的 CSS 中默认继承父级样式的属性，选取一个可继承样式:`color`，再选取一个不可继承样式`border`：

```html
<style>
  .father {
    width: 200px; margin: 50px auto; line-height: 32px;
    text-align: center; color: red;
    border: 1px solid black; padding: 10px;
  }
  .children { margin: 5px; color: green; border: 1px solid blue; }
  .unset { color: unset; border: unset; }
</style>
<div class="father">
  <div class="children">子级元素一</div>
  <div class="children unset">子级元素二</div>
</div>
```

1、由于 `color` 是可继承样式，设置了 `color: unset` 的元素，最终表现为了父级的颜色 `red`。

2、由于 `border` 是不可继承样式，设置了 `border: unset` 的元素，最终表现为 `border: initial` ，也就是默认 border 样式，无边框。



## 参考资料

[谈谈 CSS 关键字 initial、inherit 和 unset](https://www.cnblogs.com/coco1s/p/6733022.html)

[revert MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/revert)

