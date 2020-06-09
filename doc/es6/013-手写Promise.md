[[TOC]]

[TOC]



# 手写Promise

Promises/A+ 英文原版说明：https://promisesaplus.com/

Promises/A+ 中文翻译：https://juejin.im/post/5b6161e6f265da0f8145fb72

## 1. Promise解决了什么问题？

以前的异步函数处理是回调函数，如果回到函数参数还是回调函数，如果层级多了，那么就会产生回调地狱问题

异步函数回调地狱问题：

```js
fs.readdir(source, function (err, files) {
    if (err) {console.log('报错')}
    else {
        files.forEach(function (filename, fileIndex){
            if (err) {console.log('报错')}
            else { }
        })
    }
})
```

```js
fs.readdir(source, function (err, files) {
    if (err) {
        console.log('Error finding files: ' + err)
    } else {
        files.forEach(function (filename, fileIndex) {
            console.log(filename)
            gm(source + filename).size(function (err, values) {
                if (err) {
                    console.log('Error identifying file size: ' + err)
                } else {
                    console.log(filename + ' : ' + values)
                    aspect = (values.width / values.height)
                    widths.forEach(function (width, widthIndex) {
                        height = Math.round(width / aspect)
                        console.log('resizing ' + filename + 'to ' + height + 'x' + height) this.resize(width, height)
                            .write(dest + 'w' + width + '_' + filename, function (err) {
                                if (err) console.log('Error writing file: ' + err)
                            })
                    }.bind(this))
                }
            })
        })
    }
})
```

回调地狱真的是个问题吗？有没有可能是这个程序员水平不行？

回调可以不地狱，回调没有问题，出现地狱是水平的问题。但是水平差的人就是多，所以妥协了。

回调不地狱：

```js
fs.readdir(source, (err, files) => {
    travalFiles = () => {
        if (err) { return console.log('Error: 找不到目录 ' + err) }
        files.forEach(gmFile)
    }
    gmFile = (filename) => {
        console.log(filename)
        gm(source + filename).size(afterGetSize)
    }
    afterGetSize = (err, values) => {
        if (err) return console.log('无法读取文件尺寸: ' + err) console.log(filename + ' : ' + values)
        aspect = (values.width / values.height) widths.forEach((width, widthIndex) => resize(width, aspect))
    }
    resize = (width, aspect) => {
        height = Math.round(width / aspect)
        console.log('将' + filename + '的尺寸变为 ' + width + 'x' + height) this.resize(width, height)
            .write(dest + 'w' + width + '_' + filename, (err) => err && console.log('Error writing file: ' + err)
            )
    }
    travalFiles(err, files)
})
```



## 2. Promise有什么优点？

-   减少缩进

    把`函数里的函数`变成`then 下面的 then`(链式调用)

    ```js
    f1(xxx, function f2(a){
        f3(yyy, function f4(b){
            // f4 是函数里的函数
            f5(a+b, function f6(){}) 
        })
    })
    
    f1(xxx)
        .then(f2) // f2 里面调用 f3 
    	.then(f4) // f4 里面调用 f5 .then(f6)
    // 提问: f5 怎么得到 a 和 b 答:f2 的输出作为 f4 的输入
    ```

-   消灭if(err)

    错误处理单独放到一个函数里，如果不处理，就一直往后抛

    ```js
    f1(xxx)
    .then(f2, error1)
    .then(f4, error2) 
    .then(f6, error3) 
    .then(null, errorAll)
    // 最后一句可以写成 .catch
    ```

## 3. 用户怎么用Promise

以前：

```js
function 摇色子(fn){ setTimeout(()=>{
    const result = Math.floor(Math.random()*6+1)
    fn(result) // 等价于 fn.call(null, result) },3000)
} 
摇色子(n=>console.log(`摇到了${n}`))
```

现在：

```js
function 摇色子(){
    // new Promise 接受一个函数，返回一个 Promise 实例 return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        const result = Math.floor(Math.random()*6+1)
        resolve(result)
    },3000)
}) }
摇色子().then(n=>console.log(`摇到了${n}`))
```

## 4. Promise的完整API是什么

-   Promise是一个类
-   JS里类是一个特殊的函数
-   类属性： length
-   类方法：all / allSettled / race / reject / resolve
-   对象属性： then(重要) / finally / catch
-   对象内部属性：state = pending / fulfilled / rejected



## 5. Promise 的手写代码

```js
class Promise1 {
    state = 'pending'; // Promise的状态
    callbacks = []; // .then .catch方法的回调队列
    constructor(fn) {
        if (typeof fn !== "function") {
            throw new Error("我只接受函数");
        }
        // 立即执行new Promise(fn) 参数的函数
        fn(this.resolve.bind(this), this.reject.bind(this));
    }
    // 已完成函数回调
    resolve (result) {
        if (this.state !== "pending") return; // 保证resolve只执行一次
        this.state = "fulfilled"; // 修改状态为fulfilled
        setTimeout(() => {
            this.callbacks.forEach
            // 遍历 callbacks，调用所有的 handle[0], handle[0]存放了多个then方法的回调
            this.callbacks.forEach(handle => {
                if (typeof handle[0] === "function") {
                    handle[0].call(undefined, result);
                }
            });
        })
    }
    // 报错函数回调
    reject (reason) {
        if (this.state !== "pending") return;
        this.state = "rejected";
        setTimeout(() => {
            // 遍历 callbacks，调用所有的 handle[1]，handle[1]存放了多个catch方法的回调
            this.callbacks.forEach(handle => {
                if (typeof handle[1] === "function") {
                    handle[1].call(undefined, reason);
                }
            });
        });
    }

    then (succeed, fail) {
        const handle = [];
        if (typeof succeed === "function") {
            handle[0] = succeed;
        }
        if (typeof fail === "function") {
            handle[1] = fail;
        }
        this.callbacks.push(handle); // 把函数推到 callbacks 里面
        return undefined; // 正常还应该返回一个新的Promise，这个待完成
    }
}
// 异步的回调，可以把上面的setTimeout 换成nextTick
function nextTick(fn) {
    if (process !== undefined && typeof process.nextTick === "function") {
      return process.nextTick(fn);
    } else {
      var counter = 1;
      var observer = new MutationObserver(fn);
      var textNode = document.createTextNode(String(counter));
      observer.observe(textNode, {
        characterData: true
      });
      counter = counter + 1;
      textNode.data = String(counter);
    }
}
```

https://github.com/FrankFang/promise-1/blob/master/src/promise.ts