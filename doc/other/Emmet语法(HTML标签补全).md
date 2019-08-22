绝大多数代码编辑器都支持 Emmet 语法。

[Emmet官方文档](https://docs.emmet.io/cheat-sheet/)   

Emmet语法： 输入字符，然后按Tab键，即可补全HTML标签



### `!`自动生成HTML空标签

```html
<!-- !-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

</body>
</html>
```



| 输入           | 生成的代码                                     |
| -------------- | ---------------------------------------------- |
| `p`            | `<p></p>`                                      |
| `.header`      | `<div class="header"></div>`                   |
| `#header`      | `<div id="header"></div>`                      |
| `#header.logo` | `<div id="header" class="logo"></div>`         |
| `li*3`         | `<li></li>   <li></li>   <li></li>`            |
| `li*3>{hello}` | `<li>hello</li> <li>hello</li> <li>hello</li>` |
|                |                                                |
|                |                                                |
|                |                                                |
|                |                                                |
|                |                                                |
|                |                                                |
|                |                                                |
|                |                                                |

```html
<!-- li*3>div.box -->
<li>
    <div class="box"></div>
</li>
<li>
    <div class="box"></div>
</li>
<li>
    <div class="box"></div>
</li>

<!-- #header+#content+#footer -->
<div id="header"></div>
<div id="content"></div>
<div id="footer"></div>

<!-- (#header>.logo+.nav)+#content+#footer -->
<div id="header">
  <div class="logo"></div>
  <div class="nav"></div>
</div>
<div id="content"></div>
<div id="footer"></div>

<!-- meta:vp -->
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

<!-- li*3>div.box -->

<!-- li*3>div.box -->

<!-- li*3>div.box -->

<!-- li*3>div.box -->
```

