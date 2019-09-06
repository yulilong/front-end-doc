[[TOC]]

[TOC]



# HTTP发展历史

**HTTP（**HyperText Transfer Protocol）是万维网（World Wide Web）的基础协议。自 Tim Berners-Lee 博士和他的团队在1989-1991年间创造出的。

HTTP 是基于 TCP/IP 协议的[**应用层协议**](http://www.ruanyifeng.com/blog/2012/05/internet_protocol_suite_part_i.html)。它不涉及数据包（packet）传输，主要规定了客户端和服务器之间的通信格式，默认使用80端口。

## 1. HTTP/0.9 - 单行协议

HTTP 的最早版本诞生在 1991 年，最初版本的HTTP协议并没有版本号，后来它的版本号被定位在 0.9 以区分后来的版本。 

0.9版本及其简单，只有一个`GET`命令。请求由单行指令构成，其后跟目标资源的路径：

```http
GET /index.html
```

上面命令表示，TCP 连接（connection）建立后，客户端向服务器请求（request）网页`index.html`。

协议规定，服务器只能回应HTML格式的字符串，不能回应别的格式:

```html
<html>
  <body>Hello World</body>
</html>
```

服务器发送完毕，就关闭TCP连接。

HTTP 0.9版本缺点：

> 1、响应内容不包含HTTP头，只能传送HTML文件，无法传输其他类型的文件。
>
> 2、没有状态码或错误代码，一旦出错，只能把错误信息放在HTML文件中传回，供人们查看。

## 2. HTTP/1.0 - 构建可扩展性

1996年，HTTP 1.0版本发布，对0.9版本进行了扩展：

- 在请求方法的后面添加了协议版本号：`GET /index.html HTTP/1.0`
- 增加了HTTP状态码，在响应开始时发送，便于浏览器了解请求执行成功或失败，并响应调整行为(更新或使用本地缓存)
- 引入了HTTP头的概念，无论是对于请求还是响应，允许传输元数据，使协议变得非常灵活，更具扩展新
- 在新HTTP头的帮助下，由只能传HTML文件变成了具备了传输其他文件类型(JS文件、图片、音频)的能力(`Content-Type`)

HTTP 1.0 请求的例子：

```http
GET /index.html HTTP/1.0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2)
Accept: */*
```

第一行是请求命令，必须在尾部添加协议版本号`HTTP/1.0`。第二行描述了客户端信息。第三行描述可以接受哪些数据类型。

HTTP/1.0响应的例子：

```html
HTTP/1.0 200 OK 
Content-Type: text/plain
Content-Length: 137582
Expires: Thu, 05 Dec 1997 16:00:00 GMT
Last-Modified: Wed, 5 August 1996 15:55:28 GMT
Server: Apache 0.84

<html>
  <body>Hello World</body>
</html>
```

响应的格式是：头信息 + 一个空行(`\r\n`) + 数据

第一行是：协议版本 + 状态码 + 状态描述

### 2.1 Content-Type 字段说明

Content-Type是用来标识资源的MIME类型。

[MIME类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)：**媒体类型**（**Multipurpose Internet Mail Extensions** 或 **MIME** 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。每个MIME类型值包括一级类型和二级类型，之间用斜杠分隔

> 浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理URL，因此Web服务器在响应头中添加正确的MIME类型非常重要。如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。

关于字符的编码，HTTP/1.0版规定，头信息必须是 ASCII 码，后面的数据可以是任何格式。因此，服务器回应的时候，必须告诉客户端，数据是什么格式，这就是`Content-Type`字段的作用。

常见的`Content-Type`字段的值：

```html
text/plain 文本文件默认值。即使它意味着未知的文本文件，但浏览器认为是可以直接展示的。
text/html 所有的HTML内容都应该使用这种类型
text/css 要被解析为CSS的任何CSS文件必须指定为text/css
image/jpeg JPEG 图片
image/png PNG 图片
image/svg+xml SVG图片 (矢量图)
audio/mp4 MP4
video/mp4
application/javascript
application/pdf
application/zip
application/atom+xml
```

除了预定义的类型，厂商也可以自定义类型：`application/vnd.debian.binary-package`，

MIME类型还可以在尾部使用分号，添加参数：`Content-Type: text/html; charset=utf-8`，这句话的意思是发送的是网页，而且编码是UTF-8。

客户端请求的时候，可以使用`Accept`字段声明自己可以接受哪些数据格式：`Accept: */*`，这句话的意思是客户端声明自己可以接受任何格式的数据。

MIME类型还可以在其他的地方使用，如HTML中：

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- 等同于 -->
<meta charset="utf-8" /> 
```





## 参考资料

[HTTP 协议入门 阮一峰](http://www.ruanyifeng.com/blog/2016/08/http.html)

[HTTP的发展 MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)

