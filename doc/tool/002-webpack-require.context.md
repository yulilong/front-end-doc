[[TOC]]

[TOC]



# require.context方法讲解



## 1. 带表达式的 require 语句

如果你的 request 含有表达式(expressions)，就会创建一个上下文(context)，因为在编译时(compile time)并不清楚**具体**导入哪个模块。

示例：

```javascript
require('./template/' + name + '.ejs');
```

webpack 解析 `require()` 调用，然后提取出如下一些信息：

```code
Directory: ./template
Regular expression: /^.*\.ejs$/
```

**context module**

生成一个 context module(上下文模块)。它包含**目录下的所有模块**的引用，是通过一个 request 解析出来的正则表达式，去匹配目录下所有符合的模块，然后都 require 进来。此 context module 包含一个 map 对象，会把 request 中所有模块翻译成对应的模块 id。（译者注：request 参考 [概念术语](https://webpack.docschina.org/glossary/) 文档）

示例：

```json
{
  "./table.ejs": 42,
  "./table-row.ejs": 43,
  "./directory/folder.ejs": 44
}
```

此 context module 还包含一些访问这个 map 对象的 runtime 逻辑。

这意味着 webpack 能够支持动态地 require，但会导致所有可能用到的模块都包含在 bundle 中。

## 2. `require.context`

你还可以通过 `require.context()` 函数来创建自己的 context。

可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。

webpack 会在构建中解析代码中的 `require.context()` 。

语法如下：

```javascript
require.context(directory, useSubdirectories = false, regExp = /^\.\//);
```

示例：

```javascript
require.context('./test', false, /\.test\.js$/);
// （创建出）一个 context，其中文件来自 test 目录，request 以 `.test.js` 结尾。
require.context('../', true, /\.stories\.js$/);
// （创建出）一个 context，其中所有文件都来自父文件夹及其所有子级文件夹，request 以 `.stories.js` 结尾。
```

>   传递给 `require.context` 的参数必须是字面量(literal)！

### 2.1 context module API

一个 context module 会导出一个（require）函数，此函数可以接收一个参数：request。

此导出函数有三个属性：`resolve`, `keys`, `id`。

-   `resolve` 是一个函数，它返回 request 被解析后得到的模块 id。
-   `keys` 也是一个函数，它返回一个数组，由所有可能被此 context module 处理的请求（译者注：参考下面第二段代码中的 key）组成。

如果想引入一个文件夹下面的所有文件，或者引入能匹配一个正则表达式的所有文件，这个功能就会很有帮助，例如：

```javascript
function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js$/));
var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../components/', true, /\.js$/));
// 在构建时(build-time)，所有被 require 的模块都会被填充到 cache 对象中。
```

-   `id` 是 context module 里面所包含的模块 id. 它可能在你使用 `module.hot.accept` 时会用到。

## 3. 一些实际使用例子

目录结构：

```
.
├── images
│   ├── graph
│   └── new
│       ├── 0.png
│       ├── 1.png
│       ├── 11.png
├── index.jsx
```

```js
const requireContext = require.context('./images/new/', false, /\.png$/)
const cache = {}
requireContext.keys().forEach((key, index) => { cache[index] = requireContext(key) })
```



另一个使用例子：

```js
const requireContext = require.context('./', true, /([a-z])\/$/)
const res = {}
requireContext.keys().forEach((path) => {
    const name = path.replace(/^\.\//, '').replace(/\/$/, '')
    // const filePath = require.resolve(`${path}index.js`)
    // Object.keys(require.cache).forEach(key => {
    //     if (key.endsWith(filePath)){
    //         delete require.cache[key]
    //     }
    // })
    // eslint-disable-next-line import/no-dynamic-require
    res[name] = require(`${path}index.js`).default
})

export default {
    ...res
}
```











## 参考资料

[webpack官网介绍 require.context](https://webpack.docschina.org/guides/dependency-management)

