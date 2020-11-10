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

由于不知道用户会上传什么，有可能是json数据，有可能是大文件，所以express默认是以流的实行处理用户上传的数据。

`express.json`是内置中间件，此方法用于监听请求的`data`事件，如果发现接收的数据是JSON格式，那么就会解析成对象，然后把解析的数据放到请求的body里面。

```js
const express = require('express')
const app = express()

const fn =  express.json() // 返回一个函数
app.use(fn)
app.use((request, response, next) => {
  console.log('request.body: ', request.body);
  response.send('hi')
  request.on('data', (chunk) => { // chunk是二进制数据
    console.log('chunk: ', chunk.toString());
  })
  next()
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
```

终端命令请求：

```bash
curl -X POST \
  http://localhost:3000/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 83881111-e8f1-4e0b-bf5c-2dc10ea4eeef' \
  -d '{
	"name": "frank",
	"age": 18
}'
```

注意：由于`express.json()`已经把`data`事件里面的JSON数据处理好了，所以在`data`事件就不会在接收到对应数据

### 2.3 express.static()

默认以参数为路径做一个静态服务器，如果访问的资源不存在，那么就会接着走`express.static()`下面的方法，

目录结构：

```
.
├── index.js
└── static
    └── index.html
```

index.js文件内容：

```js
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use((request, response, next) => {
  console.log('request.body: ', request.body);
  response.send('hi')
  next()
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
```

终端访问命令：

```bash
curl -X GET \
  http://localhost:3000/index.html \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 96df26b3-5403-9c6a-127c-9919a20174bb'
```

上面的请求访问`/index.html`,express服务就会找到`static/index.html`文件，并返回资源。

```bash
curl -X GET \
  http://localhost:3000/style.css \
  -H 'cache-control: no-cache' \
  -H 'postman-token: df833ced-9878-8dd9-cdc5-3e6e173fb0a9'
```

如果请求的不存在，那么就会返回`hi`。

### 2.4 express.raw()

如果发现请求的数据格式是：`application/octet-stream`，二进制格式文件，那么就是把请求的数据放到body中，不需要在自己处理请求的`data`事件。



### 2.5 express.text()

如果发现请求的数据是文本`text/plain`,那么就把请求的数据放到body中。

### 2.6express.urlencoded()

此中间件如果发现请求的数据格式是`application/x-www-form-urlencoded`，那么就会解析成对象，然后把解析的数据放到请求的body里面。

代码：

```js
const express = require('express')
const app = express()

app.use(express.urlencoded())
app.use((request, response, next) => {
  console.log('request.body: ', request.body);
  response.send('hi')
  next()
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
```

终端请求命令：

```bash
curl -X POST \
  http://localhost:3000/xxx \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: 6b0f152b-ad39-d2eb-cb40-ec5284192901' \
  -d 'name=frank&age=18'
```

## 3. application部分API介绍











