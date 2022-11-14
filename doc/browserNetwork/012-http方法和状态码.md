[[TOC]]

[TOC]

# HTTP 请求方法和状态码

HTTP定义了一组`请求方法`，以表明要给定资源执行的操作。指示针对给定资源要执行的期望动作。每个请求方法都实现了不同的语义，但一些共同的特征由一组共享，例如一个请求方法可以是[安全](https://developer.mozilla.org/zh-CN/docs/Glossary/safe)、[幂等](https://developer.mozilla.org/zh-CN/docs/Glossary/幂等)、[可缓存](https://developer.mozilla.org/en-US/docs/Glossary/cacheable)。

- 安全

  安全是指一个HTTP方法不会修改服务器的数据。也就是说，这是一个对服务器只读操作的方法。`GET`、`HEAD`、`OPTIONS`是安全的，`POST`、`PUT`、`DELETE`则不是安全的。

- 幂等

  幂等是指一个HTTP方法同样的请求被执行一次与连续执行多次的效果是一样的，服务器的状态也是一样的。也就是说，幂等方法不应该具有副作用(统计用途除外)。`GET`、`HEAD`、`PUT`、`DELETE`等方法都是幂等的，而`POST`方法不是。所有安全方法也都是幂等的。

- 可缓存

  可缓存响应是指，HTTP响应可以被缓存，响应被存储以供后面检索和使用，从而不需要从服务器从新获取。并不是所有HTTP响应都能被缓存，缓存HTTP响应有一下约束：

  - 请求方法本身是可缓存的，如`GET`或`HEAD`方法。如果设置了缓存字段并设置了`Content-Location`头，则也可以缓存`POST`或`PATCH`响应，但很少实现，(例如，Firefox不支持它，)
  - 响应的状态代码由应用程序缓存知道，并且它被视为可缓存的。以下状态代码是可缓存的：200、203、204、206、300、301、404、405、410、414 和 501。
  - 响应头中没有指定缓存的头部，如`Cache-Control`，它可以阻止缓存。
  
  ***注意:***对特定的URI的某些不可缓存的请求/响应可能会使以前缓存的响应失效。例如PUT到`pageX.html`页面，将使相同URI下所有的GET或HEAD请求缓存失效。

请求方法出现的时间：

- HTTP/0.9: GET
- HTTP/1.0: POST、HEAD
- HTTP/1.1: OPTIONS、PUT、DELETE、TRACE、CONNECT

## 1. 请求方法说明：get、post、option.....

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| GET                                                          | 请求一个指定资源的表示形式. 使用GET的请求应该只被用于获取数据. |
| HEAD                                                         | 请求一个与GET请求的响应相同的响应，但没有响应体.HEAD方法作用：1、在不获取资源的情况下获取资源信息(类型、大小等)。2、通过状态码查看资源是否存在。3、通过查看首部，测试资源是否被修改了。 |
| POST                                                         | 向指定资源提交数据，请求服务器对数据进行相应处理，如：表单数据提交、文件上传等，请求数据会被包含在请求体中。 |
| PUT                                                          | 向服务器写入资源，请求服务器创建一个新的目标资源，或者替换原先的目标资源。 |
| OPTIONS                                                      | 该请求返回服务器对指定资源支持哪些 HTTP 请求方法。           |
| DELETE                                                       | 用于删除指定的资源。和PUT一样，服务器可能会不支持。          |
| TRACE                                                        | 回显服务器收到的请求，主要用于测试或诊断。                   |
| CONNECT                                                      | HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。     |
| [PATCH](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PATCH) | 用于对资源进行部分修改。由于PATCH不是标准的HTTP方法，所以不能保证客户端和服务端都已经实现。 |

**注意：**

根据RFC2616，HTTP 方法是区分大小写的，而Header是不区分的。

当指定资源不支持对应请求方法时，服务器返回状态码405(Method Not Allowed)。

当服务器不认识或者不支持对应请求方法时，服务器返回状态码501(Not Implemented)。

## 2. 关于请求方法的说明、区别

### 2.1 GET和POST区别

[GET 和 POST 到底有什么区别？知乎](https://www.zhihu.com/question/28586791)

[W3school](https://www.w3school.com.cn/tags/html_ref_httpmethods.asp)给的标准答案：

|                      | GET                                                          | POST                                                         |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 浏览器后退/刷新 按钮 | 无害                                                         | 数据会被重新提交（浏览器应该告知用户数据会被重新提交）。     |
| 书签                 | 可以收藏为书签                                               | 不能收藏为书签                                               |
| 缓存                 | 可以被缓存                                                   | 不能被缓存                                                   |
| 编码类型             | application/x-www-form-urlencoded                            | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。 |
| 历史记录             | 参数保留在浏览器历史中。                                     | 参数不会保存在浏览器历史中。                                 |
| 数据长度限制         | 当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符）。 | 无限制。                                                     |
| 对数据类型的限制     | 只允许 ASCII 字符。                                          | 没有限制。也允许二进制数据。                                 |
| 安全性               | 与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。在发送密码或其他敏感信息时绝不要使用 GET ！ | POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。 |
| 可见性               | 数据在 URL 中对所有人都是可见的。                            | 数据不会显示在 URL 中。                                      |

从标准上来看，GET 和 POST 的区别如下：

- GET 用于获取信息，是无副作用的，是幂等的，且可缓存
- POST 用于修改服务器上的数据，有副作用，非幂等，不可缓存

#### 2.1.1 POST 方法比 GET 方法安全？

以下几点POST确实比GET安全一点：

- GET方法容易被浏览器缓存
- 在浏览器的历史记录中会保留请求的地址
- 使用GET提交数据还可能会造成`Cross-site request forgery`攻击

上述内容只是浅显的解释，对于真正意义上的安全没有任何作用。然而，从传输的角度来说，他们都是不安全的，因为 HTTP 在网络上是明文传输的，只要在网络节点上捉包，就能完整地获取数据报文。

要想安全传输，就只有加密，也就是 HTTPS。

#### 2.1.2 GET、POST与请求数据如何传递没有关系

GET、POST是由HTTP协议定义的。HTTP协议中没有定义：GET请求的数据要放在URL中，POST请求的数据放在BODY中。是HTML标准对GET、POST进行了以上约定。现在web server大都是支持GET中包含body这样的请求。

我们可以在GET请求中通过body传递参数，但是需要后端服务进行相应的解析，在复杂的网络环境中需要考虑中转服务器、代理服务器对body数据的处理，避免参数丢失。

#### 2.1.3 POST产生两个TCP数据包?

有些文章中提到，post 会将 header 和 body 分开发送，先发送 header，服务端返回 100 状态码再发送 body。

HTTP 协议中没有明确说明 POST 会产生两个 TCP 数据包，而且实际测试(Chrome)发现，header 和 body 不会分开发送。

所以，header 和 body 分开发送是部分浏览器或框架的请求方法，不属于 post 必然行为。

### 2.2 PUT、POST区别

put和post的技术实现上应该是没有很大区别的。但在于协议上语义是很大区别。

PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用），而POST方法是非幂等的。

除此之外还有一个区别，通常情况下，PUT的URI指向是具体单一资源，而POST可以指向资源集合。

举个例子，我们在开发一个博客系统，当我们要创建一篇文章的时候往往用`POST https://www.jianshu.com/articles`，这个请求的语义是，在articles的资源集合下创建一篇新的文章，如果我们多次提交这个请求会创建多个文章，这是非幂等的。

而`PUT https://www.jianshu.com/articles/820357430`的语义是更新对应文章下的资源（比如修改作者名称等），这个URI指向的就是单一资源，而且是幂等的，比如你把『刘德华』修改成『蔡徐坤』，提交多少次都是修改成『蔡徐坤』

### 2.3 PUT、PATCH区别

PUT和PATCH都是更新资源，而PATCH用来对已知资源进行局部更新。



## 3. HTTP状态码

**HTTP状态码**（英语：HTTP Status Code）用来表示请求的结果，状态码被分为五大类：

1. `100-199` 信息，服务器收到请求，需要请求者继续执行操作。
2. `200-299` 表示请求成功，操作被成功接收并处理。
3. `300-399` 重定向，需要进一步的操作以完成请求。
4. `400-499` 表示浏览器方面出错。
5. `500-599` 表示服务器方面出错。

| 状态代码 | 状态信息                        | 含义                                                         |
| -------- | ------------------------------- | ------------------------------------------------------------ |
| 100      | Continue                        | 初始的请求已经接受，客户应当继续发送请求的其余部分。（HTTP 1.1新） |
| 101      | Switching Protocols             | 服务器将遵从客户的请求转换到另外一种协议（HTTP 1.1新）       |
| 200      | OK                              | 一切正常，对GET和POST请求的应答文档跟在后面。                |
| 201      | Created                         | 服务器已经创建了文档，Location头给出了它的URL。              |
| 202      | Accepted                        | 已经接受请求，但处理尚未完成。                               |
| 203      | Non-Authoritative Information   | 文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝（HTTP 1.1新）。 |
| 204      | No Content                      | 没有新文档，浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而Servlet可以确定用户文档足够新，这个状态代码是很有用的。 |
| 205      | Reset Content                   | 没有新的内容，但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容（HTTP 1.1新）。 |
| 206      | Partial Content                 | 客户发送了一个带有Range头的GET请求，服务器完成了它（HTTP 1.1新）。 |
| 300      | Multiple Choices                | 客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明。 |
| 301      | Moved Permanently               | 客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL。 |
| 302      | Found                           | 类似于301，但新的URL应该被视为临时性的替代，而不是永久性的。注意，在HTTP1.0中对应的状态信息是“Moved Temporatily”。出现该状态代码时，浏览器能够自动访问新的URL，因此它是一个很有用的状态代码。注意这个状态代码有时候可以和301替换使用。例如，如果浏览器错误地请求http://host/~user（缺少了后面的斜杠），有的服务器 返回301，有的则返回302。严格地说，我们只能假定只有当原来的请求是GET时浏览器才会自动重定向。请参见307。 |
| 303      | See Other                       | 类似于301/302，不同之处在于，如果原来的请求是POST，Location头指定的重定向目标文档应该通过GET提取（HTTP 1.1新）。 |
| 304      | Not Modified                    | 客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告 诉客户，原来缓冲的文档还可以继续使用。 |
| 305      | Use Proxy                       | 客户请求的文档应该通过Location头所指明的代理服务器提取（HTTP 1.1新）。 |
| 307      | Temporary Redirect              | 和302 （Found）相同。许多浏览器会错误地响应302应答进行重定向，即使原来的请求是POST，即使它实际上只能在POST请求的应答是303时才能重定 向。由于这个原因，HTTP 1.1新增了307，以便更加清除地区分几个状态代码：当出现303应答时，浏览器可以跟随重定向的GET和POST请求；如果是307应答，则浏览器只 能跟随对GET请求的重定向。（HTTP 1.1新） |
| 400      | Bad Request                     | 请求出现语法错误。                                           |
| 401      | Unauthorized                    | 客户试图未经授权访问受密码保护的页面。应答中会包含一个WWW-Authenticate头，浏览器据此显示用户名字/密码对话框，然后在填 写合适的Authorization头后再次发出请求。 |
| 403      | Forbidden                       | 资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。 |
| 404      | Not Found                       | 无法找到指定位置的资源。这也是一个常用的应答。               |
| 405      | Method Not Allowed              | 请求方法（GET、POST、HEAD、DELETE、PUT、TRACE等）对指定的资源不适用。（HTTP 1.1新） |
| 406      | Not Acceptable                  | 指定的资源已经找到，但它的MIME类型和客户在Accpet头中所指定的不兼容（HTTP 1.1新）。 |
| 407      | Proxy Authentication Required   | 类似于401，表示客户必须先经过代理服务器的授权。（HTTP 1.1新） |
| 408      | Request Timeout                 | 在服务器许可的等待时间内，客户一直没有发出任何请求。客户可以在以后重复同一请求。（HTTP 1.1新） |
| 409      | Conflict                        | 通常和PUT请求有关。由于请求和资源的当前状态相冲突，因此请求不能成功。（HTTP 1.1新） |
| 410      | Gone                            | 所请求的文档已经不再可用，而且服务器不知道应该重定向到哪一个地址。它和404的不同在于，返回407表示文档永久地离开了指定的位置，而 404表示由于未知的原因文档不可用。（HTTP 1.1新） |
| 411      | Length Required                 | 服务器不能处理请求，除非客户发送一个Content-Length头。（HTTP 1.1新） |
| 412      | Precondition Failed             | 请求头中指定的一些前提条件失败（HTTP 1.1新）。               |
| 413      | Request Entity Too Large        | 目标文档的大小超过服务器当前愿意处理的大小。如果服务器认为自己能够稍后再处理该请求，则应该提供一个Retry-After头（HTTP 1.1新）。 |
| 414      | Request URI Too Long            | URI太长（HTTP 1.1新）。                                      |
| 416      | Requested Range Not Satisfiable | 服务器不能满足客户在请求中指定的Range头。（HTTP 1.1新）      |
| 500      | Internal Server Error           | 服务器遇到了意料不到的情况，不能完成客户的请求。             |
| 501      | Not Implemented                 | 服务器不支持实现请求所需要的功能。例如，客户发出了一个服务器不支持的PUT请求。 |
| 502      | Bad Gateway                     | 服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答。 |
| 503      | Service Unavailable             | 服务器由于维护或者负载过重未能应答。例如，Servlet可能在数据库连接池已满的情况下返回503。服务器返回503时可以提供一个 Retry-After头。 |
| 504      | Gateway Timeout                 | 由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答。（HTTP 1.1新） |
| 505      | HTTP Version Not Supported      | 服务器不支持请求中所指明的HTTP版本。（HTTP 1.1新）           |

![](https://raw.githubusercontent.com/for-GET/http-decision-diagram/master/httpdd.png)

[图片来源](https://raw.githubusercontent.com/for-GET/http-decision-diagram/master/httpdd.png)

## 参考资料

[HTTP 请求方法 MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)

[HTTP协议漫谈 - HTTP协议请求方法](https://blog.csdn.net/ccpat/article/details/79463473)

[99%的人理解错 HTTP 中 GET 与 POST 的区别](https://www.oschina.net/news/77354/http-get-post-different)

[HTTP状态码 菜鸟教程](https://www.runoob.com/http/http-status-codes.html)