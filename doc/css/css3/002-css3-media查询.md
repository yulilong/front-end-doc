[[TOC]]

[TOC]



# CSS3 @media查询

**媒体查询**（**Media queries**）非常实用，尤其是当你想要根据设备的大致类型（如打印设备与带屏幕的设备）或者特定的特征和设备参数（例如屏幕分辨率和浏览器[视窗](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport)宽度）来修改网站或应用程序时。

媒体查询常被用于以下目的：

-   有条件的通过 [`@media`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media) 和 [`@import`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import) [at-rules](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule) 用[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) 装饰样式。
-   用`media=` 属性为[`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style), [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link), [`source`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source)和其他[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)元素指定特定的媒体类型。如:

```html
<link rel="stylesheet" src="styles.css" media="screen" />
<link rel="stylesheet" src="styles.css" media="print" />
```

-   使用[`Window.matchMedia()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia) 和[`MediaQueryList.addListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList/addListener) 方法来[测试和监控媒体状态](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries)。

浏览器支持情况：

| 浏览器        | 支持的最低版本 |
| ------------- | -------------- |
| Google Chrome | 21             |
| IE            | 9              |
| Firefox       | 3.5            |
| Safari        | 4.0            |
| Opera         | 9              |

## 1. 语法

```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

你也可以针对不同的媒体使用不同 *stylesheets* :

```html
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
```

## 2. 媒体类型：mediatype

| 值         | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| all        | 用于所有设备                                                 |
| screen     | 用于电脑屏幕，平板电脑，智能手机等。                         |
| speech     | 应用于屏幕阅读器等发声设备                                |
| print      | 用于打印机和打印预览                                     |

>   还有一些已废弃的：aural：用于语音和声音合成器。braille：应用于盲文触摸式反馈设备。embossed：用于打印的盲人印刷设备。handheld：用于掌上设备或更小的装置，如PDA和小型电话。projection：用于投影设备。tty：用于固定的字符网格，如电报、终端设备和对字符有限制的便携设备。 tv：用于电视和网络电视。




## 3. 逻辑操作符

*逻辑操作符*（*logical operators*） `not`, `and`, 和 `only` 可用于联合构造复杂的媒体查询，您还可以通过用逗号分隔多个媒体查询，将它们组合为一个规则。

有时您可能想创建一个取决于多个条件的媒体查询。 这就是*逻辑运算符*使用的场景：`not`，`and`，和 `only`。 此外，您可以将多个媒体查询合并到一个*逗号分隔的列表*中。 这使您可以在不同情况下应用相同的样式。

>   **注意：** 在大多数情况下，默认情况下，如果未指定其他类型，则使用`all`媒体类型。 但是，如果使用`not`或`only`运算符，则必须显式指定媒体类型。

-   and

    `and` 操作符用于将多个媒体查询规则组合成单条媒体查询，当每个查询规则都为真时则该条媒体查询为真，它还用于将媒体功能与媒体类型结合在一起。比如：`@media screen and (*max-width*: 1600px)`表示是屏幕，并且宽度小于1600px是才应用样式。

-   not

    `not`运算符用于否定媒体查询，如果不满足这个条件则返回true，否则返回false。 如果出现在以逗号分隔的查询列表中，它将仅否定应用了该查询的特定查询。 如果使用not运算符，则还必须指定媒体类型。**注意：**在Level 3中，`not`关键字不能用于否定单个媒体功能表达式，而只能用于否定整个媒体查询。

-   only

    `only`运算符仅在整个查询匹配时才用于应用样式，并且对于防止较早的浏览器应用所选样式很有用。 当不使用`only`时，旧版本的浏览器会将`screen and (max-width: 500px)`简单地解释为`screen`，忽略查询的其余部分，并将其样式应用于所有屏幕。 如果使用`only`运算符，则*还必须指定*媒体类型。

-   `,`(逗号)

    逗号用于将多个媒体查询合并为一个规则。 逗号分隔列表中的每个查询都与其他查询分开处理。 因此，如果列表中的任何查询为true，则整个media语句均返回true。 换句话说，列表的行为类似于逻辑或`or`运算符。

    

## 4. 媒体功能：(media feature)

| 值                      | 描述                                                         |
| :---------------------- | :----------------------------------------------------------- |
| aspect-ratio            | 定义输出设备中的页面可见区域宽度与高度的比率                 |
| color                   | 定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0 |
| color-index             | 定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0 |
| device-aspect-ratio     | 定义输出设备的屏幕可见宽度与高度的比率。                     |
| device-height           | 定义输出设备的屏幕可见高度。                                 |
| device-width            | 定义输出设备的屏幕可见宽度。                                 |
| grid                    | 用来查询输出设备是否使用栅格或点阵。                         |
| height                  | 定义输出设备中的页面可见区域高度。                           |
| max-aspect-ratio        | 定义输出设备的屏幕可见宽度与高度的最大比率。                 |
| max-color               | 定义输出设备每一组彩色原件的最大个数。                       |
| max-color-index         | 定义在输出设备的彩色查询表中的最大条目数。                   |
| max-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最大比率。                 |
| max-device-height       | 定义输出设备的屏幕可见的最大高度。                           |
| max-device-width        | 定义输出设备的屏幕最大可见宽度。                             |
| max-height              | 定义输出设备中的页面最大可见区域高度。                       |
| max-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最大单色原件个数。     |
| max-resolution          | 定义设备的最大分辨率。                                       |
| max-width               | 定义输出设备中的页面最大可见区域宽度。                       |
| min-aspect-ratio        | 定义输出设备中的页面可见区域宽度与高度的最小比率。           |
| min-color               | 定义输出设备每一组彩色原件的最小个数。                       |
| min-color-index         | 定义在输出设备的彩色查询表中的最小条目数。                   |
| min-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最小比率。                 |
| min-device-width        | 定义输出设备的屏幕最小可见宽度。                             |
| min-device-height       | 定义输出设备的屏幕的最小可见高度。                           |
| min-height              | 定义输出设备中的页面最小可见区域高度。                       |
| min-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最小单色原件个数       |
| min-resolution          | 定义设备的最小分辨率。                                       |
| min-width               | 定义输出设备中的页面最小可见区域宽度。                       |
| monochrome              | 定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0 |
| orientation             | 定义输出设备中的页面可见区域高度是否大于或等于宽度。         |
| resolution              | 定义设备的分辨率。如：96dpi, 300dpi, 118dpcm                 |
| scan                    | 定义电视类设备的扫描工序。                                   |
| width                   | 定义输出设备中的页面可见区域宽度。                           |



## 5. 常用方法

### 5.1 手机、平板、PC端各自属性

屏幕宽度按小于400px是手机端，宽度在400px到900px是平板，大于900px的是PC端的。

```less
@media screen and (max-width: 400px) {
  body {
    background-color: red;
  }
}
@media screen and (min-width:400px) and (max-width: 900px) {
  body {
    background-color: blue;
  }
}
@media screen and (min-width: 900px) {
  body {
    background-color: yellow;
  }
}
```

### 5.2 小于1600隐藏，大于1600显示

```less
@media screen and (max-width: 1600px) {
  .link-logo-title {
    width: 0;
    overflow: hidden;
  }
}
```

### 5.3 特定媒体类型才应用

规则打印机才应用样式：

```css
@media print { ... }
```

使用两个媒体查询来同时定位屏幕和打印设备：

```css
@media screen, print { ... }
```



## 参考资料

[CSS3 @media查询 W3Cschool](https://www.w3cschool.cn/cssref/css3-pr-mediaquery.html)

[使用媒体查询 MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)



