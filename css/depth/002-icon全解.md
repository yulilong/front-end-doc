# 二、icon全解

## 大纲

1. img 法
2. background 法
3. background 合一法
4. font 法
5. SVG 法
6. 新手慎用：「CSS 就是干」法

## 使用`img`标签来显示图标

```html
<div>
    <img src="./img/qq.png" alt="QQ">
</div>
```

使用`img`标签的好处：可以自适应宽高，可直接设置一个宽度`width`就可以了，图片会默认保持比例显示。要保持图片的原始比例。



## 使用`background`背景色设置图标



```html
<style>
    .icon {
      border: 1px solid;
      width: 100px;
      height: 100px;
      background: url(http://pic.qiantucdn.com/58pic/11/72/82/37I58PICgk5.jpg) no-repeat -12px -12px;
      background-size:130px 130px;
    }
</style>
<div>
    <div class="icon"></div>
</div>
```

使用背景色设置图标的好处： 不会因为div大小变动而改变图标，也就是图标是固定的。



## CSS Sprite(雪碧图、精灵图) 

简介：把多个图标放到一张大图上，然后使用`background`属性来显示图标，每个图标只显示自己对应位置。



CSS Sprites可使用在线工具来自动生成。可在Google中搜索：`css sprites generator`.

下面以http://css.spritegen.com/ 网站为例讲解图和制作一个雪碧图。

1. 选择多个图标。

2. 在 Output Type中选择对要保存图片格式。 填上类名前缀。

3. 点击Create Sprite ，创建一个雪碧图,然后页面就会跳转到结果页面。

4. 保存合并的图标图片。

5. 复制CSS样式到自己的项目中，修改``background``: ``url``(``'png.png'``) 中图片名为自己的图片名称。

6. 直接引用CSS类名即可。

   ```html
   <style>
   	.iconqq, .icon-air, .icon-pp
   	{ display: inline-block; background: url('./icon.png') no-repeat; overflow: hidden; text-indent: -9999px; text-align: left; }
   	 
   	.iconqq { background-position: -0px -0px; width: 200px; height: 200px; }
   	.icon-air { background-position: -0px -200px; width: 200px; height: 200px; }
   	.icon-pp { background-position: -0px -400px; width: 200px; height: 200px; }
     </style>
   <span class="icon-pp"></span>
   <span class="iconqq"></span>
   <span class="icon-pp"></span>
   ```

雪碧图原理：

每个图标背景图都是一张图片，通过`background-postion`属性来调整图片的位置，然后调整元素的窗口大小即可。



## 字体图标

在线图标库：http://www.iconfont.cn/    

[可在网站查看使用帮助](http://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code)   

字体图标的原理： 把图标做成字体，然后引入这个字体样式，最后在页面中写出图标对应的字。

可在Mac系统里打开字体册应用来查看每种字体的不同。

同时按cmd + 空格 键打开Spotlight 搜索， 在里面输入`Font Book.app`或者`字体册.app`即可查看Mac系统的字体



### html转义(html entity)

[w3c](http://www.w3school.com.cn/html/html_entities.asp)    

[w3c英文](https://www.w3schools.com/html/html_symbols.asp)

html中有些字符是预留的，如(<)小于号，如果直接使用，浏览器会认为这个标签，如果想使用这些预留字符，则必须在 HTML 源代码中使用字符实体（character entities）。字符实体类似于：

```html
&entity_name;
或
&#entity_number;
&nbsp;
或
&#160;
```

[在线unicode编码转换器](http://www.bangnishouji.com/tools/chtounicode.html)       

unicode编码中以`&#xe6`开头是编码是没有任何意义的，所以字体图标使用了以`&#xe6`开头的Unicode编码。



### 在线字体图标制作

1. 打开iconfont.cn网站，在搜索框中搜索图标 -> 选择图标 -> 放入购物车 -> 点击购物车 -> 在下面选择添加至项目 -> 选择一个项目,确定 。
2. 此时会跳转到我的项目页面，然后点击生成代码(或更新代码).



#### 使用Unicode方式显示图标

在iconfont网站的我的项目页面中， 点击Unicode选项，复制代码到页面CSS文件中，然后在页面中写入图标的Unicode编码。

```html
<style>
    @font-face {
      font-family: 'iconfont'; 
      src: url('//at.alicdn.com/t/font_609932_yooo7yr926ueg66r.eot');
      src: url('//at.alicdn.com/t/font_609932_yooo7yr926ueg66r.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_609932_yooo7yr926ueg66r.woff') format('woff'),
        url('//at.alicdn.com/t/font_609932_yooo7yr926ueg66r.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_609932_yooo7yr926ueg66r.svg#iconfont') format('svg');
    }
    /*这里是使用CSS伪类来实现字体图标的例子*/
    span::after { content: "\e60a"; }
  </style>
<span style="font-family: iconfont;">&#xe6fa;&#xe796;</span>
```

#### 使用font class 方式显示图标

在CSS样式使用图标的原理就是使用伪元素，如上面的例子中所示，

在iconfont网页中的我的项目中点击Font Class，然后复制链接，放到自己项目中页面的`link`标签中，然后在标签中加入相关样式

```html
<link rel="stylesheet" href="//at.alicdn.com/t/font_609932_yooo7yr926ueg66r.css">
<span class="iconfont icon-time"></span>
```

#### 使用Symbol 方式显示图标

在iconfont网页中的我的项目中点击Symbol，然后复制链接，放到自己项目中页面的`script`标签中，

这个Script脚本在网页里面注入了一个看不见SVG标签

```html
<script src="//at.alicdn.com/t/font_609932_yooo7yr926ueg66r.js"></script>
<style>
    /*通用代码*/
    .icon {
       width: 1em; height: 1em; vertical-align: -0.15em;
       fill: currentColor;  overflow: hidden;
    }
</style>
<svg style="width:100px; height: 100px;" class="icon" aria-hidden="true">
    <!-- 这里找到自己图标类名 use标签意思是我要使用这个SVG-->
    <use xlink:href="#icon-air"></use>
</svg>
```

 SVG的好处：1. SVG支持CSS。 2. 不会变形(要同时设置宽高才会变形)。 图标没有锯齿。3. 默认就是居中的。4.  可以做渐变，可以做动画。

缺点： 如果这个SVG图片有颜色，那么就不能修改颜色了。



## 使用CSS样式自己画一个图标

在Google或者百度上搜索[CSS ICON -- project by Wenting Zhang](https://cssicon.space/)     

http://cssicon.space/#/    

下面就是使用CSS画了一个放大镜图标：

```html
<style>
    .search.icon {
  color: #000;
  position: absolute;
  margin-top: 2px;
  margin-left: 3px;
  width: 12px;
  height: 12px;
  border: solid 1px currentColor;
  border-radius: 100%;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}
.search.icon:before {
  content: '';
  position: absolute;
  top: 12px;
  left: 5px;
  height: 6px;
  width: 1px;
  background-color: currentColor;
}
  </style>
<div class="search icon"></div>
```

这样做的好处就是让自己的CSS知识更扎实。