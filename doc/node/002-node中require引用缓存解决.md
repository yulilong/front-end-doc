[[TOC]]

[TOC]



# node中require引用缓存问题解决

## 1. 重复require一个模块由于缓存导致只执行一次

foo.js：

```js
console.log('foo模块被加载了')
```

test.js

```js
// 同一模块标识,node第一次加载完成时会缓存该模块，再次加载时,将会从缓存中获取.
require('./foo')
require('./foo')
require('./foo')
require('./foo')
require('./foo')
```

终端执行：

```bash
✗ node test.js
foo模块被加载了
```

通过终端的执行， 发现 foo.js只执行了一次，这是由于 require一次后，就缓存这个文件了，以后再引用相同的模块就不在重新引入了。

## 2. delete require.cache[module.filename]

解决缓存的方法之一是在模块文件中添加`delete require.cache[module.filename]`代码：

foo.js：

```js
delete require.cache[module.filename]
console.log('foo模块被加载了')
```

test.js

```js
require('./foo')
require('./foo')
require('./foo')
require('./foo')
require('./foo')
```

终端执行：

```bash
✗ node test.js
foo模块被加载了
foo模块被加载了
foo模块被加载了
foo模块被加载了
foo模块被加载了
```

可以看到已经可以每次require都重新加载文件了。

## 3. delete require.cache[require.resolve('./foo')]

解决缓存的另一个方法是，在需要引入模块的文件中使用`delete require.cache[require.resolve('./foo')]`

foo.js：

```js
console.log('foo模块被加载了')
```

test.js

```js
require('./foo')
delete require.cache[require.resolve('./foo')];
require('./foo')
delete require.cache[require.resolve('./foo')];
require('./foo')
delete require.cache[require.resolve('./foo')];
require('./foo')
delete require.cache[require.resolve('./foo')];
require('./foo')
```

终端执行：

```bash
✗ node test.js
foo模块被加载了
foo模块被加载了
foo模块被加载了
foo模块被加载了
foo模块被加载了
```

## 4. 批量删除require缓存

代码：

```js
const path = require('path')

// 清除对 mock文件夹下的 require 引用缓存，解决缓存导致修改需要重启服务问题
const dirPath = path.join('./src', method);
Object.keys(require.cache).forEach(function(key) { 
  if (key.indexOf(dirPath) !== -1) { // 清除特定目录下的require
    delete require.cache[key]
  }
});
```

