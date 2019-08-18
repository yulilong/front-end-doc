# Ajax

- 介绍

> Asynchronous JavaScript and XML，异步的JavaScript 和 XML,ajax是一种技术方案，但并不是一种新技术。

> 它依赖的是现有的CSS/HTML/Javascript.
>
> **Ajax核心**: 依赖是浏览器提供的**XMLHttpRequest**对象，用这个对象使得浏览器可以**发出HTTP请求**与**接收HTTP响应**。

- 使用Ajax目的：

> 使用Ajax技术，网页程序能够快速地将渐步更新呈现在用户界面上，不需要重载（刷新）整个页面。



## 使用XMLHttpRequest实现Ajax

首先，使用nodeJS在本地创建一个最简单的API：

```javascript
var http = require('http')
http.createServer(function(req, res){
	res.setHeader('Access-Control-Allow-Origin','*') // 允许跨域
	res.writeHead(200, 'OK')
	res.end('hello world')
}).listen(8080)
console.log('open http://localhost:8080')
// 在终端打开目录，使用 `node server.js` 启动服务， 如果没有安装nodeJS，请在官网下载安装
```

### 使用XMLHTTPRequest()发一个请求

#### GET

如果GET中有参数，在URL拼接参数即可`http://127.0.0.1:80?name=jack`

```javascript
var xhr = new XMLHttpRequest()
xhr.open('GET', '//localhost:8080', true)	// true:异步调用，
// 每次xhr.readyState的值发生变化时，都会触发xhr.onreadystatechange事件，
xhr.onreadystatechange = function(){
    // xhr.readyState === 4: 整个数据传输过程结束，不管本次请求是成功还是失败
    if(xhr.readyState === 4) {
        // xhr.status: 返回状态码
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            // responseText: 返回的数据
            console.log(xhr.responseText) //成功了
        } else { console.log('没有返回正确结果') }
    }
}
xhr.onerror = function(){ console.log('服务器异常') }
xhr.send()
```

还可以使用`xhr.onload`事件：当请求成功完成时触发，此时`xhr.readystate=4`

```javascript
var xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:8080/', true)
xhr.onload = function(){
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        console.log(xhr.responseText)
    } else { console.log('服务没有正确返回结果') }
}
xhr.onerror = function(){ console.log('服务器异常') }
xhr.send()
```

1. 使用同步方式：

   ```javascript
   var xhr = new XMLHttpRequest()
   xhr.open('GET', 'http://localhost:8080/', false)
   xhr.onerror = function(){ console.log('服务器异常') }
   xhr.send()	// 发送后会在这里等待，等有结果了才继续执行。
   console.log(xhr.responseText)
   ```

   同步调用有如下限制：

   - `xhr.timeout`必须为`0`
   - `xhr.withCredentials`必须为 `false`
   - `xhr.responseType`必须为`""`（注意置为`"text"`也不允许）

   若上面任何一个限制不满足，都会抛错，而对于异步请求，则没有这些参数设置上的限制。

   实际开发中我确实遇到过部分应该触发的事件并没有触发的现象。如在 chrome中，当`xhr`为同步请求时，在`xhr.readyState`由`2`变成`3`时，并不会触发 `onreadystatechange`事件，`xhr.upload.onprogress`和 `xhr.onprogress`事件也不会触发。

#### POST

post的方法跟GET的差不多，只不过传参不一样：

```javascript
var xhr = new XMLHttpRequest()
xhr.open('post', 'http://localhost:3000/getInfo', true)
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) { console.log(xhr.responseText) }
}
// var info = "info={'FullName':'小明','Company':'母鸡'}";
var info = 'name=jack&address=America'
xhr.send(info)
// 返回的结果
// I am POST{'FullName':'小明','Company':'母鸡'}
```





## 参考

[饥人谷课件 Ajax](http://book.jirengu.com/fe/前端基础/Javascript/ajax.htmll)

[你真的会使用XMLHttpRequest吗](https://segmentfault.com/a/1190000004322487)

[Ajax MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)

[XMLHttpRequest 使用指南 阮一峰]()

[XMLHttpRequest MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

[HTTP教程 菜鸟教程](http://www.runoob.com/http/http-tutorial.html)

[HTTP协议入门 阮一峰](http://www.ruanyifeng.com/blog/2016/08/http.html)

[关于HTTP协议，一篇就够了](http://www.cnblogs.com/ranyonsue/p/5984001.html)

[Http协议与TCP协议简单理解](https://blog.csdn.net/sundacheng1989/article/details/28239711)

[Fetch和Ajax的比较 简书](https://www.jianshu.com/p/71f756103df8)

[fetch和ajax的区别 SegmentFault](https://segmentfault.com/a/1190000011019618)

[深入浅出Fetch API](http://web.jobbole.com/84924/)

