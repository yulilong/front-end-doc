[[TOC]]

[TOC]

# Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

`Promise`对象有以下两个特点:

- 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

`Promise`也有一些缺点:

- 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消
- 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部
- 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

## 1. 创建一个Promise实例

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... 一些操作
  
  if (/* 异步操作成功 */){
    // 如果请求成功了，把执行结果传给resolve回调
    resolve(value);
  } else {
    // 如果请求失败而，把错误信息传给reject回调
    reject(error);
  }
});
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

> resolve函数作用：将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
>
> reject函数作用：将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

## 2. 使用Promise

```javascript
// 第一种使用方式
promise.then(function(value) {
  // 请求成功时执行这里，也就是执行resolve(value)后，会回调这个函数处理
}, function(error) {
  // 请求失败或报错执行这里，也就是执行reject(error)后，会回调这个函数处理
});

// 第二种使用方式
promise.then(function(value) {
   // 请求成功时执行这里，也就是执行resolve(value)后，会回调这个函数处理
}).catch(function(error) {
   // 请求失败或报错执行这里，也就是执行reject(error)后，会回调这个函数处理
});
```

使用第一种方式：

> `then`方法接受两个回调函数作为参数：
>
> - 第一个回调函数：请求成功时(Promise对象状态变为resolved)调用，参数是Promise对象传出的值
> - 第二个回调函数(可选的)：请求失败(Promise对象状态变为rejected)或报错时调用，参数是Promise对象传出的值
> - 不推荐使用此种方式

使用第二种方式

> `then`方法接受一个回调函数，该回调函数会在请求成功时(Promise对象状态变为resolved)调用，参数是Promise对象传出的值
>
> `catch`方法接受一个回调函数，该回调函数会在请求失败(Promise对象状态变为rejected)或报错时调用，参数是Promise对象传出的值
>
> 推荐使用这种方式调用

一个使用Promise对象的简单例子：

```javascript
function timeout(flag) {
  return new Promise((resolve, reject) => {
    if (flag) { resolve('正常返回结果') }
    else { reject('报错'); }
  });
}
var a = timeout(true)
a.then((value) => { console.log('一号：', value); });
timeout(false)
.then((value) => { console.log(value); })
.catch((err) => { console.log('二号：', err); })

// 输出结果：
// 一号： 正常返回结果
// 二号： 报错
```

`resolve`函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样:

```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});
const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```

上面代码中,一个异步操作的结果是返回另一个异步操作。注意，这时`p1`的状态就会传递给`p2`，也就是说，`p1`的状态决定了`p2`的状态。如果`p1`的状态是`pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`resolved`或者`rejected`，那么`p2`的回调函数将会立刻执行。

## 3. Promise.prototype.then()状态改变时的回调函数

Promise 实例具有`then`方法，它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数。`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

```javascript
new Promise(function (resolve) {
  console.log(1)
  resolve(2)
})
.then((res) => { console.log(res); return 3; })
.then((res) => { console.log(res); return 4; })
.then((res) => { console.log(res) })
// 输出结果：1 2 3 4
```

采用链式的`then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个`Promise`对象（即有异步操作），这时后一个回调函数，就会等待该`Promise`对象的状态发生变化，才会被调用。

## 4. Promise.prototype.catch()发生错误回调

`.catch`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。`catch`方法返回的还是一个 Promise 对象，因此后面还可以接着调用`then`方法。后面的方法报错需要在后面的catch去处理。

调用`.catch`方法的情况：

> 1、 `Promise`对象异步操作抛出错误，状态就会变成`rejected`，就会调用`catch`方法指定的回调函数
>
> 2、`then`方法指定的回调函数在运行中抛出错误

```javascript
new Promise(function (resolve, rejected) {
  rejected(2)
})
.catch(function(err){
  console.log('出错了：', err);
})
```

如果 Promise 状态已经变成`resolved`，再抛出错误是无效的。

```javascript
new Promise(function (resolve, reject) {
  resolve('ok');
  throw new Error('test');
})
  .then(function (value) { console.log(value) })
  .catch(function (error) { console.log(error) });
// 没有报错，输出了ok
```

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

```javascript
new Promise(function (resolve, reject) {
  reject('出错误了');
})
  .then(function (value) { console.log(value); return 'ok1';})
  .then(function (value) { console.log(value) })
  .catch(function (error) { console.log(error) });
// 出错误了
```

跟传统的`try/catch`代码块不同的是，如果没有使用`catch`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

```javascript
new Promise(function (resolve, reject) {
  resolve(x + 2);	// 这个会报错： Uncaught (in promise) ReferenceError: x is not defined
})
  .then(function (value) { console.log(value)})
console.log('我执行了')
```

上面的代码运行Promise时，内部有语法错误，浏览器运行到这一行会报错，但不会退出程序，会继续执行，最终输出了`我执行了`,这说明Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

这个脚本放在服务器执行，退出码就是`0`（即表示执行成功）。不过，Node 有一个`unhandledRejection`事件，专门监听未捕获的`reject`错误，上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误。

```javascript
process.on('unhandledRejection', function (err, p) {
  throw err;
});
```

上面代码中，`unhandledRejection`事件的监听函数有两个参数，第一个是错误对象，第二个是报错的 Promise 实例，它可以用来了解发生错误的环境信息。

注意，Node 有计划在未来废除`unhandledRejection`事件。如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0。

## 5. Promise.prototype.finally()最终都要执行的方法

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```javascript
new Promise(function (resolve, reject) {
  resolve(2);	
})
  .then(function (value) { console.log(value)})
  .finally(function() {
    console.log('finally')
  })
```

上面代码中，不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

## 6. Promise.all()多个Promise实例返回一个统一的结果

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

`Promise.all`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况

> 1、只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
>
> 2、只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

```javascript
var a = new Promise(function (resolve) { resolve(2);	 })
var b = new Promise(function (resolve, reject) { resolve(5); })
var c = new Promise(function (resolve) { resolve(2); })
Promise.all([a, b, c])
.then( function(res) { console.log('res: ', res) })
.catch( function(err){ console.log(err) })
// res:  [ 2, 5, 2 ]
```

注意，如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。

```javascript
var a = new Promise(function (resolve) { resolve(2);	 })
var b = new Promise(function (resolve, reject) { reject(5); }).catch(() => {console.log(123)})
var c = new Promise(function (resolve) { resolve(2); })
Promise.all([a, b, c])
.then( function(res) { console.log('res: ', res) })
.catch( function(err){ console.log('err:', err) })
// 123
// res:  [ 2, undefined, 2 ]
```

上面代码，a会resolve，b首先会rejected，但b有自己的catch方法，该方法返回一个新的Promise实例，b指向的实际上是这个实例。该实例执行完catch后，也会变成resolved，导致Promise.all()方法参数里面的三个实例都会resolved，因此会调用all后面的then方法指定的回调函数。

如果`b`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法。

## 7. Promise.race()多个Promise实例有一个返回就跟着返回

`Promise.race`方法将多个 Promise 实例，包装成一个新的 Promise 实例。

race的参数之中有一个实例率先改变状态，Promise.race的状态就跟着改变。那个率先改变的实例的返回值，就是Promise.race的回调函数的参数。

`Promise.race`方法的参数与`Promise.all`方法一样，如果不是 Promise 实例，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。

```javascript
var a = new Promise(function (resolve) { resolve(2);	 })
var b = new Promise(function (resolve, reject) { reject(5); }).catch(() => {console.log(123)})
var c = new Promise(function (resolve) { resolve(2); })
Promise.race([a, b, c])
.then( function(res) { console.log('res: ', res) })
.catch( function(err){ console.log('err:', err) })
```

## 8. Promise.resolve()

`Promise.resolve`方法会将现有对象转为Promise对象。

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

`Promise.resolve`方法的参数分四中情况：

- 参数是一个Promise实例

  如果参数是Promise实例，那么`resolve`将不做任何修改直接返回这个实例

- 参数是一个`thenable`对象

  `thenable`对象指的是具有`then`方法的对象，比如下面的例子：

  ```javascript
  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };
  let p1 = Promise.resolve(thenable);
  p1.then(function(value) {
    console.log(value);  // 42
  });
  ```

  `Promise.resolve`方法会将`thenable`对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

- 参数不是具有`then`方法的对象，或根本就不是对象

  如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`，resolved参数就是传入的参数。

  ```javascript
  Promise.resolve('Hello')
  .then(function(res){ console.log('res:', res); })
  Promise.resolve({a:'wer', b:'123'})
  .then(function(res){ console.log('res:', res); })
  // res: Hello
  // res: { a: 'wer', b: '123' }
  ```

  上面的例子中，由于传入的参数不属于异步操作（判断方法是对象不具有then方法），返回Promise实例的状态从一生成就是`resolved`，所以回调函数会立即执行，`Promise.resolve`方法的参数，会同时传给回调函数。

- 不带任何参数

  `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

  ```javascript
  const p = Promise.resolve();
  p.then(function () {
    console.log('ttttt')
  });
  ```

## 9. Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```javascript
const p = Promise.reject('出错了');
// 等同于
const q = new Promise((resolve, reject) => reject('出错了'))

q.then(null, function (s) {
  console.log(s)
});
```

***注意***，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

```javascript
const thenable = {
  then(resolve, reject) { reject('出错了'); }
};

Promise.reject(thenable)
.catch(e => { console.log(e === thenable) })
// true
```



## 参考资料

[【翻译】Promises/A+规范 图灵](http://www.ituring.com.cn/article/66566)

[Promise 对象 阮一峰](http://es6.ruanyifeng.com/#docs/promise)

[惊艳！可视化的 js：动态图演示 Promises & Async/Await 的过程！](https://zhuanlan.zhihu.com/p/145442030)



