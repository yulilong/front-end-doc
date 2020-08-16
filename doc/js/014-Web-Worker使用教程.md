[[TOC]]

[TOC]

# Web Worker 使用教程

## 1. 概述

JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

### 1.1 Web Worker 兼容性

兼容性如下如所示：

![](./img/025-worker.png)

图片来源：https://caniuse.com/#feat=webworkers

### 1.2 Web Worker 使用注意点

-   同源限制

    分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

-   DOM限制

    Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以`navigator`对象和`location`对象。

-   通信联系

    Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

-   脚本限制

    Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

-   文件限制

    Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。

### 1.3 Web Worker作用域

Web Worker所执行的 js 代码完全在另一作用域中，与当前主线程的代码不共享作用域。在 Web Worker 中，同样有一个全局对象和其他对象以及方法，但其代码无法访问 DOM，也不能影响页面的外观。

Web Worker 中的全局对象是 worker 对象本身，即 `this` 和 `self` 引用的都是 worker 对象，`this` 完全可以换成 `self`，甚至可以省略。

为便于处理数据，Web Worker 本身也是一个最小化的运行环境，其可以访问或使用如下数据：

-   最小化的 `navigator` 对象 包括 `onLine`, `appName`, `appVersion`, `userAgent` 和 `platform` 属性
-   只读的 `location` 对象
-   `setTimeout()`, `setInterval()`, `clearTimeout()`, `clearInterval()` 方法
-   `XMLHttpRequest` 构造函数

## 2. API介绍

### 2.1 主线程里面API

浏览器原生提供`Worker()`构造函数，用来供主线程生成 Worker 线程。

```js
var myWorker = new Worker(jsUrl, options);
```

`Worker()`构造函数，可以接受两个参数。第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。

```js
// 主线程 文件中
var myWorker = new Worker('worker.js', { name : 'myWorker' });

// Worker 线程文件中
self.name // myWorker
```

`Worker()`构造函数返回一个 Worker 线程对象，用来供主线程操作 Worker。Worker 线程对象的属性和方法如下：

-   Worker.onerror：指定 error 事件的监听函数。
-   Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在`Event.data`属性中。
-   Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
-   Worker.postMessage()：向 Worker 线程发送消息。
-   Worker.terminate()：立即终止 Worker 线程。

### 2.2 Worker线程里面API

Web Worker 有自己的全局对象，不是主线程的`window`，而是一个专门为 Worker 定制的全局对象。因此定义在`window`上面的对象和方法不是全部都可以使用。

Worker 线程有一些自己的全局属性和方法：

-   self.name： Worker 的名字。该属性只读，由构造函数指定。
-   self.postMessage：向产生这个 Worker 线程发送消息。
-   self.onmessage：指定`message`事件的监听函数。
-   self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
-   self.importScripts()：加载 JS 脚本。
-   self.close()：关闭 Worker 线程。

## 3. 基本使用介绍

### 3.1 主线程中使用子线程

1、创建一个子线程：

主线程调用`Worker()`构造函数，新建一个 Worker 线程。构造函数参数是一个脚本文件，该文件就是 Worker 线程要执行的任务。Worker 不能读取本地文件，所以必须来自网络。如果下载失败(比如404)，Worker 就会默默地失败。

```js
var worker = new Worker('work.js');
```

2、发送数据给子线程：

然后，主线程调用`worker.postMessage()`方法，向 Worker 发消息。该方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。

```js
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
```

3、监听子线程发送的数据

接着，主线程通过`worker.onmessage`指定监听函数，接收子线程发回来的消息。事件对象的`data`属性可以获取 Worker 发来的数据。

```js
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  doSomething();
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}
```

4、关闭子线程：

Worker 完成任务以后，主线程就可以把它关掉。或者在子线程中关闭。

```js
worker.terminate();
```

5、监听 Worker 子线程是否发生错误

如果发生错误，Worker 子线程会触发主线程的`error`事件。

```js
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```

Worker 内部也可以监听`error`事件。

### 3.2 Worker 子线程使用

1、监听主线程发送的数据

Worker 子线程内部需要有一个监听函数，监听`message`事件。`self`代表子线程自身，即子线程的全局对象。因此，等同于`this`或者直接使用：

```js
self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
}, false);

// 写法一
this.addEventListener('message', function (e) {
  this.postMessage('You said: ' + e.data);
}, false);

// 写法二
addEventListener('message', function (e) {
  postMessage('You said: ' + e.data);
}, false);

// 另外一种直接写方法
onmessage = function (e) {
  const { data } = e;
  console.log('data: ', data);
};
```

除了使用`self.addEventListener()`指定监听函数，也可以使用`self.onmessage`指定。监听函数的参数是一个事件对象，它的`data`属性包含主线程发来的数据。

2、给主线程发送数据

`self.postMessage()`方法用来向主线程发送消息，下面是一个例子(根据主线程发来的数据，Worker 线程可以调用不同的方法)：

```js
self.addEventListener('message', function (e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
```

3、关闭子线程

`self.close()`用于在 Worker 内部关闭自身。

```js
self.close(); 
```

### 3.3 Worker 子线程加载脚本

Worker 线程能够访问一个全局函数 `importScripts()` 来引入脚本，该函数接受 0 个或者多个 URI 作为参数来引入资源；以下例子都是合法的：

```js
importScripts();                        /* 什么都不引入 */
importScripts('foo.js');                /* 只引入 "foo.js" */
importScripts('foo.js', 'bar.js');      /* 引入两个脚本 */
```

浏览器加载并运行每一个列出的脚本。每个脚本中的全局对象都能够被 worker 使用。如果脚本无法加载，将抛出 `NETWORK_ERROR` 异常，接下来的代码也无法执行。而之前执行的代码(包括使用 `window.setTimeout()` 异步执行的代码)依然能够运行。`importScripts()` 之后的函数声明依然会被保留，因为它们始终会在其他代码之前运行。

>   注意： 脚本的下载顺序不固定，但执行时会按照传入 `importScripts()` 中的文件名顺序进行。这个过程是同步完成的；直到所有脚本都下载并运行完毕， `importScripts()` 才会返回。

## 4. 同页面的Web Worker

通常情况下，Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。

```html
<!DOCTYPE html>
  <body>
    <script id="worker" type="app/worker">
      addEventListener('message', function () {
        postMessage('some message');
      }, false);
    </script>
  </body>
</html>
```

上面是一段嵌入网页的脚本，注意必须指定`<script>`标签的`type`属性是一个浏览器不认识的值，上例是`app/worker`。

然后，读取这一段嵌入页面的脚本，用 Worker 来处理。

```js
var blob = new Blob([document.querySelector('#worker').textContent]);
var url = window.URL.createObjectURL(blob);
var worker = new Worker(url);

worker.onmessage = function (e) {
  // e.data === 'some message'
};
```

上面代码中，先将嵌入网页的脚本代码，转成一个二进制对象，然后为这个二进制对象生成 URL，再让 Worker 加载这个 URL。这样就做到了，主线程和 Worker 的代码都在同一个网页上面。

## 5. Webpack项目中使用Web Worker

在webpack中使用Worker主要是需要`worker-loader`来加载。

使用参考：https://webpack.docschina.org/loaders/worker-loader/

### 5.1 安装worker-loader

项目工程目录下安装loader,目地是让Webpack识别worker文件

```
npm install -D worker-loader
```

### 5.2 webpack配置文件添加load

向webpack配置文件中添加loader的配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              inline: 'fallback',
            },
          },
          // 配置babel，让worker文件里面也能使用ES6语法。
          {
            loader: 'babel-loader',
            options: { presets: ['babel-preset-env'], }, // 这行可以忽略
          },
        ],
      },
    ],
  },
};
```

option选项：

-   fallback

    类型： `Boolean` 默认值： `false`，是否需要支持非 worker 环境的回退。

-   inline

    类型： `Boolean` 默认值： `false`，将 worker 内联为一个 BLOB。注意：内联模式还会为不支持内联 worker 的浏览器创建 chunk， 要禁用此行为，只需将 `fallback` 参数设置为 `false`。

-   name

    类型： `String` 默认值： `[hash].worker.js`，使用 `name` 参数，为输出的脚本设置一个自定义名称。 名称可能含有 `[hash]` 字符串，为了缓存会被替换为依赖内容哈希值。 只使用 `name` 时，`[hash]` 会被忽略。

-   publicPath

    类型： `String` 默认值： `null`，重写 worker 脚本的下载路径。 如果未指定， 则使用与其他 webpack 资源相同的公共路径。



### 5.3 使用worker文件

注意：创建的Worker文件必须以`worker.js`结尾，

file.worker.js:

```js
onmessage = function(ev){    // 也可以是self.onmessage
  // 工作线程收到主线程的ev.data
};
let msg = '工作线程向主线程发送消息'
postMessage(msg);     // 也可以是self.postMessage, msg可以直接是对象
```

使用：**App.js**

```js
import Worker from './file.worker.js';

const worker = new Worker();
worker.postMessage({ a: 1 });
worker.onmessage = function (event) {};
worker.addEventListener('message', function (event) {});
```



## 6. 实际例子

### 6.1 原生html例子

创建一个文件夹，文件夹内创建下面2个文件：

1、创建一个demo.js文件，内容如下：

```js
var i=0;
function count(){
    setInterval(function () {
        i++;
        postMessage(i);
    },1000)
}
count();
```

2、创建index.html文件，内容如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div>
    <span>计数</span>
    <span id="result"></span>
</div>
<button onclick="work(0)">开始工作</button>
<button onclick="work(1)">停止工作</button>
<script>
    var worker;
    function work(type) {
        if (typeof(Worker) !== "undefined") {
            if(type === 0){
                worker = new Worker("demo.js");
                console.log(worker);
                worker.onmessage=function(event){
                    document.getElementById("result").innerHTML=event.data;
                };
            }else {
                worker.terminate();
                worker = null;
            }
        }
        else { alert("抱歉! Web Worker 不支持"); }
    }
</script>
</body>
</html>
```

然后使用本地服务启动后，就能查看效果了。

### 6.2 Worker 线程完成轮询

有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。

```js
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;
  function compare(new, old) { ... };
  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});
pollingWorker.onmessage = function () {
  // render data
}
pollingWorker.postMessage('init');
```

上面代码中，Worker 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。

## 参考资料

[Web Worker 使用教程 阮一峰](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

[怎么在 ES6+Webpack 下使用 Web Worker](https://juejin.im/post/6844903590503383054)

[Web Worker 使用指南](https://blog.csdn.net/weixin_44135121/article/details/104419496)

[一个简单的HTML5 Web Worker 多线程与线程池应用](https://www.cnblogs.com/rock-roll/p/10176738.html)

