[[TOC]]

[TOC]



# http报文

HTTP报文是在HTTP应用程序之间发送的数据块。这些数据块以一些文本形式的 `元信息(meta-information)`开头，这些信息描述了报文的内容及含义，后面跟着可选的数据部分。

## 1. 报文组成

HTTP报文是简单的格式化数据块，每个报文都包含一条来自客户端的请求，或者一条来自服务器的响应，由3个部分组成：

1、对报文进行描述的起始行 - start line

2、包含属性的首部块 - header

3、可选的包含数据的主体部分 - body

```http
HTTP/1.0 200 OK
content-type: text/plain
content-length: 19

Hi, I'm a message
```

起始行和首部是由行分隔的ASCII文本，主体是一个可选的数据块，可以是文本、二进制或者空。



## 参考资料

[HTTP头字段 维基百科](https://zh.wikipedia.org/wiki/HTTP头字段)

[可能是全网最全的http面试答案 掘金](https://juejin.im/post/5d032b77e51d45777a126183)