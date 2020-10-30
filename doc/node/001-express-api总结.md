[[TOC]]

[TOC]



# Express API 总结

本文主要介绍express的主要API的使用。

参考了官网文档：https://expressjs.com/zh-cn/4x/api.html

http://expressjs.com/



1.  express 相关 API（介绍两三个重要 API 即可）
2.  app 相关 API（介绍两三个重要 API 即可）
3.  request 相关 API（介绍两三个重要 API 即可）
4.  response 相关 API（介绍两三个重要 API 即可）
5.  router 示例



## 1. 一个简单express服务例子

首先需要你电脑里面已经安装了nodejs，并且有终端。如果没有请自行安装。

打开终端，进入一个文件夹后，输入如下命令：

```bash
$ mkdir myapp
$ cd myapp
$ npm init
$ npm install express --save
```

使用编辑器打开这个文件夹，新建一个`app.js`的文件，内容如下：

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

保存文件后，终端运行如下命令：

```bash
$ node app.js
```

然后，在浏览器中输入 http://localhost:3000/ 以查看输出。

## 2. express相关的API介绍

### 2.1 express()

创建一个Express应用程序。该`express()`函数是`express`模块导出的顶级函数。

```javascript
var express = require('express')
var app = express()
```

### 2.2 express.json













