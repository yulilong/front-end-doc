[[TOC]]

[TOC]

# html常用标签说明

## 1. meta标签相关说明

### 1.1 格式检测：name="format-detection"

format-detection —— 格式检测，用来检测html里的一些格式，主要有以下几个设置：

```html
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<meta name="format-detection" content="address=no">
<meta name="format-detection" content="telephone=no,email=no,address=no">
```

1、telephone   
主要作用是是否设置自动将你的数字转化为拨号连接   
telephone=no 禁止把数字转化为拨号链接   
telephone=yes 开启把数字转化为拨号链接，默认开启   

2、email  
告诉设备不识别邮箱，点击之后不自动发送  
email=no 禁止作为邮箱地址  
email=yes 开启把文字默认为邮箱地址，默认情况开启  

3、address  
address=no 禁止跳转至地图  
address=yes 开启点击地址直接跳转至地图的功能, 默认开启  

https://www.jianshu.com/p/1ab5dfd96759

## 2. a标签

HTML `<a>` 标签是用来定义超链接的，即创建指向另一个网页或当前页面内部特定部分的链接。

使用方法：

```html
<!-- 1、创建指向另一个页面的链接： -->
<a href="https://www.example.com">访问示例网站</a>
<!-- 2、创建指向电子邮件地址的链接 -->
<a href="mailto:someone@example.com">发送电子邮件</a>
<!-- 3、页面内部的某个位置定义锚点 -->
<h2 id="section2">第二部分标题</h2>
<a href="#section2">跳转到页面的第二部分</a>
<!-- 3、在新窗口中打开链接 -->
<a href="https://www.example.com" target="_blank">在新窗口打开示例网站</a>
<!-- 4、使用 title 属性来提供当用户悬停链接时显示的额外信息 -->
<a href="https://www.example.com" title="访问官方网站">示例网站</a>
```

target属性选项值说明：

- _blank：在新窗口中打开被链接文档。
- _self：默认。在相同的框架中打开被链接文档。
- _parent：在父框架集中打开被链接文档。
- _top：在整个窗口中打开被链接文档。
- framename：在指定的框架中打开被链接文档。
