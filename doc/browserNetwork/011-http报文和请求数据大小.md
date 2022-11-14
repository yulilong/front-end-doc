[[TOC]]

[TOC]



# http报文和请求数据大小

HTTP报文是在HTTP应用程序之间发送的数据块。这些数据块以一些文本形式的 `元信息(meta-information)`开头，这些信息描述了报文的内容及含义，后面跟着可选的数据部分。

## 1. 报文组成

HTTP报文是简单的格式化数据块，每个报文都包含一条来自客户端的请求，或者一条来自服务器的响应，由3个部分组成：

- 起始行(start line)：对报文的描述，用来说明报文的目的或者执行的结果
- 首部(header)：报文的属性信息，提供报文的附加信息
- 主体(body)：可选，发送的数据

```http
HTTP/1.0 200 OK
content-type: text/plain
content-length: 19

Hi, I'm a message
```

起始行和首部是由行分隔的ASCII文本，主体是一个可选的数据块，可以是文本、二进制或者空。

## 2. 报文分类

HTTP报文分为两类：

**请求报文：**从客户端向服务器发送的HTTP报文。

**响应报文：**从服务器向客户端发送的HTTP报文。

### 2.1 请求报文

请求报文由4部分组成：

- 请求行

  由请求方法、URL、HTTP协议版本组成，他们之间用空格分开

- 请求头部

  由关键字和值对组成，每行一对，用来附加一些信息

- 空行

- 请求体

  可选，是HTTP要传输的内容，post、put等请求携带的参数也在请求体里

![](./img/008-httpMessage.png)

![](./img/009-httpMessage.png)

### 2.2 响应报文

响应报文由4个部分组成：

- 响应行

  由HTTP协议版本、状态码、状态码、状态码说明组成，如：`HTTP/1.1 200 OK`

- 响应头部

  跟请求头部一样，由关键字和值对组成，每行一对，用来附加一些信息

- 空行

- 响应体

  服务器响应的数据

![](./img/010-httpMessage.png)

响应报文例子：

```
curl -i www.baidu.com

HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: Keep-Alive
Content-Length: 2381
Content-Type: text/html
Date: Sun, 08 Sep 2019 16:44:37 GMT
Etag: "588604c8-94d"
Last-Modified: Mon, 23 Jan 2017 13:27:36 GMT
Pragma: no-cache
Server: bfe/1.0.8.18
Set-Cookie: BDORZ=27315; max-age=86400; domain=.baidu.com; path=/

<!DOCTYPE html>
<!--STATUS OK--><html>  </html>
```



## 3. 报文首部

首部也就是请求头和响应头内容。

1、首部用来说明客户端、服务器或报文主体的一些信息

2、首部可以有好几行，也可以没有

3、每个首部行由首部字段+`:` + 空格 + 值组成，如：`Connection: Keep-Alive`

4、每个首部行在结束的地方都有`CRLF`(回车和换行符)

5、首部字段分为4种：**通用首部字段、请求首部字段、响应首部字段、实体首部字段**

6、请求头部包含：**请求首部字段、通用首部字段、实体首部字段**

7、响应头部包含：**响应首部字段、通用首部字段、实体首部字段**

![](./img/011-httpMessage.png)

### 3.1 通用部首

通用首部字段是请求报文和响应报文都使用的字段。

| 首部              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| Cache-Control     | 控制缓存的行为,`Cache-Control: private, no-cache, no-store`  |
| Connection        | 客户端和服务器是否保持连接,`Connection: Keep-Alive`          |
| Date              | 创建报文的日期时间,`Date: Sun, 08 Sep 2019 16:44:37 GMT`     |
| Pragma            | http1.1之前的版本历史遗留字段，报文指令，`Pragma: no-cache`对应`Cahche-Control: no-cache` |
| Trailer           | 允许发送方在分块传输发送的消息后面添加额外的元信息，比如消息的完整性校验，消息的数字签名，或者消息经过处理之后的最终状态等。`Trailer: Expires` |
| Transfer-Encoding | 规定了传输报文主体采用的编码方式,`Transfer-Encoding: chunked` |
| Upgrade           | 用于检测HTTP协议，是否可使用更高版本的协议,`Upgrade: TLS/1.0, HTTP/1.1` |
| Via               | 显示了报文经过的中间节点（代理、网关）,`Via: 1.0 fred, 1.1 p.example.net` |
| Warning           | 一般性的警告，告知在实体内容体中可能存在错误。`Warning: 199 Miscellaneous warning` |



### 3.2 请求首部

请求首部字段是客户端向服务器发送请求报文时，使用的首部字段。补充了请求的附加内容、客户端信息、响应内容相关优先级等信息。

| 首部                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Accept                                                       | 指定服务器返回的文件类型, `Accept: text/plain`, HTTP/1.1     |
| Accept-Charset                                               | 列出用户代理支持的字符集,`Accept-Charset: utf-8`, HTTP/1.1   |
| Accept-Encoding                                              | (接收端)可以接受的内容编码形式(所支持的压缩算法),`Accept-Encoding: gzip, deflate`, HTTP/1.1 |
| Accept-Language                                              | 列出用户代理期望的页面语言。`Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-US`,HTTP/1.1 |
| [Authorization](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Authorization) | 请求消息头含有服务器用于验证用户代理身份的凭证，通常会在服务器返回[`401`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/401) `Unauthorized` 状态码以及[`WWW-Authenticate`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/WWW-Authenticate) 消息头之后在后续请求中发送此消息头。`Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==` |
| [Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie) | 含有先前由服务器通过 [`Set-Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)  首部投放并存储到客户端的 [HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)。`Cookie: PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1;` |
| [Expect](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expect) | 包含一个期望条件，表示服务器只有在满足此期望条件的情况下才能妥善地处理请求。`Expect: 100-continue` |
| From                                                         | 发起此请求的用户的邮件地址,`From: user@example.com`          |
| Host                                                         | 指明了服务器的域名（对于虚拟主机来说），以及（可选的）服务器监听的TCP端口号。`Host: en.wikipedia.org:80` |
| If-Match                                                     | 是资源的Etag，如果ETag和文档当前ETag匹配，就获取文档,`If-Match: "737060cd8c284d8af7ad3082f209582d"` |
| If-Modified-Since                                            | 缓存字段，对应响应首部的`Last-Modified`字段，允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ）,`If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT` |
| If-None-Match                                                | 缓存字段，对应响应首部的`Etag`,允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ）,`If-None-Match: "737060cd8c284d8af7ad3082f209582d"` |
| If-Range                                                     | 如果该实体未被修改过，则向我发送我所缺少的那一个或多个部分；否则，发送整个新的实体,`If-Range: "737060cd8c284d8af7ad3082f209582d"` |
| If-Unmodified-Since                                          | 只有当资源在指定的时间之后没有进行过修改的情况下，服务器才会返回请求的资源，`If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT` |
| Max-Forwards                                                 | 限制该消息可被代理及网关转发的次数。`Max-Forwards: 10`       |
| Proxy-Authorization                                          | 用来向代理进行认证的认证信息。`Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==` |
| Range                                                        | Range对请求中的 Url 的原始获取方                             |
| [Referer](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer) | 当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。`Referer: http://en.wikipedia.org/wiki/Main_Page` |
| User-Agent                                                   | 告诉服务器，创建请求的浏览器和用户代理名称等信息。`user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36` |



### 3.3 响应首部字段

从服务器端向客户端返回响应报文时使用的首部。补充了响应的附加内容，也会要求客户端附加额外的内容信息。

| 首部                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Access-Control-Allow-Origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) | 指定哪些网站可参与到跨来源资源共享过程中.`Access-Control-Allow-Origin: *` |
| [Accept-Ranges](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Ranges) | 用来告诉浏览器，服务器是否可以处理范围请求，字段的具体值用于定义范围请求的单位。`Accept-Ranges: bytes`:范围请求的单位是 bytes （字节） |
| Age                                                          | 告诉浏览器，服务器在多久之前创建了响应,Age消息头的值通常接近于0。表示此消息对象刚刚从原始服务器获取不久；其他的值则是表示代理服务器当前的系统时间与此应答消息中的通用消息头 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Date) 的值之差。`Age: 12` |
| [ETag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag) | 协商缓存字段，对应请求头的`If-None-Match`表示当前资源文件的一个唯一标识(由服务器生成),`ETag: "737060cd8c284d8af7ad3082f209582d"` |
| [Location](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Location) | 需要将页面重新定向至的地址。一般在响应码为3xx的响应中才会有意义。`Location: /index.html` |
| Proxy-Authenticate                                           | 把代理服务器要求的认证信息发送给客户端,`Proxy-Authenticate: Basic` |
| [Retry-After](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Retry-After) | 如果某个实体临时不可用，则，此协议头用来告知客户端日后重试。其值可以是一个特定的时间段(以秒为单位)或一个超文本传输协议日期。`Retry-After: Fri, 07 Nov 2014 23:59:59 GMT`，或者：`Retry-After: 120` |
| Server                                                       | 服务器应用软件名称和版本,`Server: Apache/2.4.1 (Unix)`       |
| [Set-Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie) | 用来由服务器端向客户端发送 cookie,`Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1` |
| Vary                                                         | vary字段可以对缓存进行控制,当代理服务器接受到带有Vary字段的请求时，如果使用的Accept-Language字段相同，那么就直接从缓存中返回响应，如果不一致，就先从原服务器获取资源后，才能作为响应返回.`Vary: *` |
| [WWW-Authenticate](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/WWW-Authenticate) | 表明在请求获取这个实体时应当使用的认证模式,`WWW-Authenticate: Basic` |





### 3.4 实体首部字段

针对http报文的实体部分使用的首部。补充了资源内容更新时间等与实体有关的信息。

在请求报文和响应报文中，都包含着实体相关信息的首部字段

| 首部                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Allow](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Allow) | 列出了服务器可用的请求方法，`Allow: GET, HEAD                |
| [Content-Encoding](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Encoding) | 用于对特定媒体类型的数据进行压缩。当这个首部出现的时候，它的值表示消息主体进行了何种方式的内容编码转换。这个消息首部用来告知客户端应该怎样解码才能获取在 `Content-Type` 中标示的媒体类型内容。`Content-Encoding: gzip` |
| [Content-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language) | 实体内容所使用的语言，`Content-Language: en-US`              |
| Content-Length                                               | 回应消息体的长度，以 字节 （8位为一字节）为单位.`Content-Length: 348` |
| [Content-Location](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Location) | 资源实际所处的位置,`Content-Location: /index.htm`            |
| Content-MD5                                                  | 客户端会将接受到的主体执行相同的MD5算法，然后与该字段比较,`Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==` |
| Content-Range                                                | 这条部分消息是属于某条完整消息的哪个部分,`Content-Range: bytes 21010-47021/47022` |
| [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) | 实体主体内对象的媒体类型,指示资源的[MIME类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types),`Content-Type: text/html; charset=utf-8` |
| Expires                                                      | 强缓存字段，指定一个日期/时间，超过该时间则认为此回应已经过期，`Expires: Thu, 01 Dec 1994 16:00:00 GMT` |
| [Last-Modified](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified) | 协商缓存字段，实体最后一次修改时间。`Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT` |



## 4. 请求数据大小说明

HTTP报文每个部分都包含请求信息，那么每个请求部分是否都有大小限制呢？

### 4.1 请求行 URI

在GET请求中，请求参数是放在URL中进行传递的，所以，HTTP GET请求最关心的问题：URL能有多长？能放多杀个参数？

在HTTP 1.1 协议中([RFC 2616](https://tools.ietf.org/html/rfc2616)):

```
The HTTP protocol does not place any a priori limit on the length of a URI
```

通过查看文档，可以明确一点的是HTTP协议没有显式限制URI的长度，理论上在URI中传递多少参数都可以。但出于各种原因考虑，浏览器、服务器都对URI做了不同的的限制。

#### 4.1.1 浏览器限制

所有主流浏览器都会对URI的长度进行限制。如果在浏览器中输入过长的URI，浏览器会自动进行截断。各个浏览器对URI长度的限制各不相同，甚至不同版本也不一样。大约一个概念，2000字符以内的URI都能符合所有主流浏览器的要求。

#### 4.1.2 服务器限制

一般服务器没有专门针对URI的参数限制，但是由于URI是会包含在报文请求头中(request header)，所以对header的大小限制会对URI起作用，比如Nginx的`large_client_header_buffers`这个属性，它默认是4K。

这里`URI是包含在 request header中的`这句话其实是有问题的。URI 在HTTP 请求报文的请求行中(request line)，请求报文分request line、request header、request body三个部分(具体：https://www.ietf.org/rfc/rfc2616.txt，第4章和第5章)。但是使用的时候都默认将header中理解为包含request line。

### 4.2 请求头部 header

请求头部 header 的长度和URI一样，协议中并没有显式的限制大小。理论上在header中放多少属性都是可以的，但出于各种考虑，各家浏览器和服务都做了不同的限制。

#### 4.2.1 浏览器限制

各个主流浏览器限制几十K到几百M不等的限制。基本上能满足平时的需求，如果这个长度对实际工作业务有很大影响的话，建议还是亲自测试一下。

#### 4.2.2 服务器限制

比如Nginx的`large_client_header_buffers`就限制了header的长度，也可以自己设置这个值。

可能会影响的header的参数还有：`client_header_buffer_size`、`client_header_timeout`，更多参考：http://wiki.nginx.org/HttpCoreModule

### 4.3 请求体 body

HTTP支持文件传输，文件的二进制数据不会放在URI或header中，而放在了body里面，那么这个body的大小就一定不能默认限制太小，尤其是客户端。

理论上，协议没有对body大小做任何限制。

浏览器也没有对body做任何大小限制，因为如果浏览器做了大小限制就意味着它直接影响了你的服务功能。

所以对body的限制任务就放在了服务器上。

出于安全考虑，我们必须在服务器端对请求体大小进行限制，请求体长度的最大值的设置有多方面的因素，需要根据业务情况反复调优决定。考虑以下几方面因素：
1、根据请求报文的大小，预估实际请求体的最大值；
2、限制上传文件的大小，文件上传服务与业务操作服务分离；
3、设置合理的超时时间，避免由于请求体太大导致线程被长时间占用；
4、请求体设置不能太大，防止轻易被DDOS攻击；
在Nginx中，`client_max_body_size`参数可以限制body大小，默认是1M。`client_body_timeout`参数用于当body太大，或者网络太差时，这个也有可能会影响请求的成功率。

### 4.3 HTTP请求大小的影响

安全因素：

如果一个网站的服务器不限制body大小，那么它就可以被黑客利用攻击。黑客利用这一点向HTTP POST方法的body中传递非常大（比如几M)的请求。那么有的服务器会占用一个进程专门处理这个请求，就会导致拟对外无法提供其他的服务，你的服务器就瘫痪了，这就是DDOS攻击。

文件上传服务：

文件上传有两种情况：

- 可能会遇到文件上传失败，那么大多是服务器请求大小设置没有设置好
- 文件上传大小是不是设置越大越好？答案必须是否定的，理由也是安全考虑。满足需求的大小限制就够了。

实际中，大都把文件上传和业务接口分开来提供。如果你的文件上传服务和业务接口是同一个机器的话，那么说明你的业务接口可以允许body大小一定是很大的。在这种情况下，你的业务中所有POST请求都是不安全的！！只要进行DDOS攻击，业务就会瘫痪。


## 参考资料

[HTTP头字段 维基百科](https://zh.wikipedia.org/wiki/HTTP头字段)

[HTTP Headers MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

[HTTP报文首部 简书](https://www.jianshu.com/p/df5a055c4693)

[部首脑图](https://www.processon.com/view/link/58025201e4b0d6b27dd4c8af)

[可能是全网最全的http面试答案 掘金](https://juejin.im/post/5d032b77e51d45777a126183)

[论HTTP请求大小](https://www.cnblogs.com/yjf512/archive/2013/03/29/2988296.html)