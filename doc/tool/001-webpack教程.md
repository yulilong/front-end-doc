[[TOC]]

[TOC]

# webpack教程

## 1. webpack介绍

本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

从webpack V4.0.0开始，可以不用引入一个配置文件，而webpack还是高度可配置的。

webpack的四个核心概念：

| 概念          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| 入口(entry)   | 指示 webpack 应该使用哪个模块，来作为构建其内部*依赖图*的开始 |
| 输出(output)  | 告诉 webpack 在哪里输出它所创建的 *bundles*，以及如何命名这些文件 |
| loader        | 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript） |
| 插件(plugins) | 执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量 |

一个简单的示例： 把编写的的代码转化为浏览器可以理解JS代码

```javascript
// src/index.js
import bar from './bar';
bar();

// src/bar.js
export default function bar() {
  //
}

// webpack.config.js 通过这个配置文件，执行后，可以生成浏览器理解的JS代码
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
// page.html
<body>
    <script src="dist/bundle.js"></script>
</body>
```


## 2. entry(入口)、output(出口)

### 2.1 单个入口、出口写法

- 单个入口写法

  用法：`entry: string|Array<string>`

- 单个出口写法

  配置 `output` 属性的最低要求是，将它的值设置为一个对象，包括以下两点：

  1. `filename`: 用于输出的文件名
  2. `path`: 目标输出路径，绝对路径，也可以使用`path`模块来生成绝对路径

```javascript
const path = require('path');
const config = {
    // 入口
    entry: './path/to/my/entry/file.js',
    // 出口
    output: { filename: 'bundle.js',
       // path: '/home/proj/public/assets'
       path.join(__dirname,'../dist/')
    }
};
module.exports = config;
```



### 2.1 多个入口、出口写法

- 多个入口写法

  多个入口使用对象语法，用法：`entry: {[entryChunkName: string]: string|Array<string>}`

- 多个出口写法

  如果配置了多个入口，则应该使用[占位符(substitutions)](https://doc.webpack-china.org/configuration/output#output-filename)来确保每个文件具有唯一的名称。

```javascript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js',
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist' // __dirname 获取当前路径的绝对路径
  }
}
```



## 3. loader

loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件。

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS文件！

### 3.1 使用示例

如：让webpack加载CSS文件，或将TypeScript 转为 JavaScript。

首相安装相对应的loader：

```
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

然后在配置文件`webpack.config.js`中配置，让webpack对每个`.css`使用`css-loader`,对所有`.ts`文件使用`ts-loader`:

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

### 3.2 使用loader的三种方式：配置、内联、CLI

#### 3.2.1 配置文件中配置

[`module.rules`](https://doc.webpack-china.org/configuration/module/#module-rules) 允许你在 webpack 配置中指定多个 loader。 这是展示 loader 的一种简明方式，并且有助于使代码变得简洁。同时让你对各个 loader 有个全局概览：

```javascript
  module: {
    rules: [
      {
        test: /\.css$/, use: [
          { loader: 'style-loader' }, 
          { loader: 'css-loader', options: { modules: true } }
        ]
      },
      { test: /\.scss$/, use: ['raw-loader', 'sass-loader'] },
    ]
  }
```

#### 3.2.2 内联：代码import语句后面使用

可以在 `import` 语句或任何[等效于 "import" 的方式](https://doc.webpack-china.org/api/module-methods)中指定 loader。使用 `!` 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析。

```javascript
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

通过前置所有规则及使用 `!`，可以对应覆盖到配置中的任意 loader。

选项可以传递查询参数，例如 `?key=value&foo=bar`，或者一个 JSON 对象，例如 `?{"key":"value","foo":"bar"}`。

#### 3.2.3 CLI:命令行中配置

```
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

这会对 `.jade` 文件使用 `jade-loader`，对 `.css` 文件使用 [`style-loader`](https://doc.webpack-china.org/loaders/style-loader) 和 [`css-loader`](https://doc.webpack-china.org/loaders/css-loader)。

### 3.3 loader特性

- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于对 loader 传递配置。
- loader 也能够使用 `options` 对象进行配置。
- 除了使用 `package.json` 常见的 `main` 属性，还可以将普通的 npm 模块导出为 loader，做法是在 `package.json` 里定义一个 `loader` 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多能力。 用户现在可以更加灵活地引入细粒度逻辑，例如压缩、打包、语言翻译和[其他更多](https://doc.webpack-china.org/loaders)。

### 3.4 解析loader

loader 遵循标准的[模块解析](https://doc.webpack-china.org/concepts/module-resolution/)。多数情况下，loader 将从[模块路径](https://doc.webpack-china.org/concepts/module-resolution/#module-paths)（通常将模块路径认为是 `npm install`, `node_modules`）解析。

loader 模块需要导出为一个函数，并且使用 Node.js 兼容的 JavaScript 编写。通常使用 npm 进行管理，但是也可以将自定义 loader 作为应用程序中的文件。按照约定，loader 通常被命名为 `xxx-loader`（例如 `json-loader`）。有关详细信息，请查看[如何编写 loader？](https://doc.webpack-china.org/development/how-to-write-a-loader)。



## 4. 插件(Plugins)

插件是 wepback 的[支柱](https://github.com/webpack/tapable)功能。webpack 自身也是构建于，你在 webpack 配置中用到的**相同的插件系统**之上！

插件目的在于解决 [loader](https://webpack.docschina.org/concepts/loaders) 无法实现的**其他事**。

### 4.1 剖析

webpack **插件**是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 属性的 JavaScript 对象。`apply` 属性会被 webpack compiler 调用，并且 compiler 对象可在**整个**编译生命周期访问。

```javascript
// ConsoleLogOnBuildWebpackPlugin.js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```

tap方法的第一个参数，是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中复用。

### 4.2 用法

由于**插件**可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 属性传入 `new` 实例。

根据你的 webpack 用法，这里有多种方式使用插件。

### 4.3 配置

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
module.exports = config;
```



## 5. 配置(configuration)

**webpack 的配置文件，是导出一个对象的 JavaScript 文件。**此对象，由 webpack 根据对象定义的属性进行解析。

因为 webpack 配置是标准的 Node.js CommonJS 模块，你**可以做到以下事情**：

- 通过 `require(...)` 导入其他文件
- 通过 `require(...)` 使用 npm 的工具函数
- 使用 JavaScript 控制流表达式，例如 `?:` 操作符
- 对常用值使用常量或变量
- 编写并执行函数来生成部分配置

请在合适的时机使用这些特性。

虽然技术上可行，**但应避免以下做法**：

- 在使用 webpack 命令行接口(CLI)（应该编写自己的命令行接口(CLI)，或[使用 `--env`](https://webpack.docschina.org/configuration/configuration-types/)）时，访问命令行接口(CLI)参数
- 导出不确定的值（调用 webpack 两次应该产生同样的输出文件）
- 编写很长的配置（应该将配置拆分为多个文件）

### 5.1 基本配置

**webpack.config.js**

```javascript
var path = require('path');
module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

### 5.2 导出多个配置

#### 5.2.1 导出为一个函数

在开发和生产构建之间，消除 `webpack.config.js` 的差异。（至少）有两种选项：

明天继续：

https://webpack.docschina.org/configuration/configuration-types/#exporting-multiple-configurations



该写插件了：

https://doc.webpack-china.org/concepts/plugins/





## webpack 中引入jQuery插件

1. 在项目中添加jQuery依赖：`npm install jquery --save-dev`

2. 在webpack配置文件的插件中添加如下代码：

   ```
   plugins: [
           new webpack.ProvidePlugin({ 
               $:"jquery", 
               jQuery:"jquery", 
               "window.jQuery":"jquery" 
           })
       ]
   ```

3. 直接在JS代码中使用：`var $ct = $(".img-ct");`

参考链接： https://yq.aliyun.com/ziliao/138017



## 一些常用的插件plugins

### 1. CleanWebpackPlugin：清理文件插件

这个插件主要用来清理打包的文件的，在项目打包前，把之前打包的文件清理掉

安装： `npm install clean-webpack-plugin --save-dev` 

配置：

```javascript
// 配置文件位置： config/webpack.config.prod.js
// 要清理的文件在dist目录下
const path = require("path");
module.exports = {
    plugins:[
        // 自动清理dist目录, root: process.cwd()不能少，否则不能清理
        new CleanWebpackPlugin(
            [path.join(__dirname,"../dist/")],
            {root: process.cwd()}
        ),
    ],
}
```

清理插件遇到的错误：`dist is outside of the project root. Skipping...`:  

https://github.com/johnagan/clean-webpack-plugin/issues/10

### 2. 复制静态文件到打包目录：Copy Webpack Plugin

安装：

```
npm i -D copy-webpack-plugin
```



用法，在webpack配置文件中：

```javascript
var CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制静态资源到打包目录
function resolve(dir){//因为自己改变了文件的路径，这里需要重新处理一下
    return path.join(__dirname,"..",dir);
}
module.exports = {
    plugins: [
        new CopyWebpackPlugin([{
            from: resolve("./static"),
            to:resolve("./dist/static"),
         }]),
    ]
}
```

插件的参数：

```
from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
to      定义要拷贝到的目标目录     from: __dirname + ‘/dist’
toType  file 或者 dir         可选，默认是文件
force   强制覆盖先前的插件           可选 默认false
context                         可选 默认base context可用specific context
flatten 只拷贝文件不管文件夹      默认是false
ignore  忽略拷贝指定的文件           可以用模糊匹配
```

参考：[webpack中经典实用的插件copy-webpack-plugin拷贝资源插件](https://blog.csdn.net/wbiokr/article/details/73011288)

这个插件主要用于html引入js、css、不需要webpack编译的大文件：

如在HTML文件引入JS文件：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" src="./static/js/rem.js"></script>
</head>
<body>
	<div>我是代码</div>
</body>
</html>
```



## webpack一些用法

### 1. 设置环境变量区分生产环境和开发环境process.env.NODE_ENV

[webpack参考](https://webpack.docschina.org/guides/production/#%E6%8C%87%E5%AE%9A%E7%8E%AF%E5%A2%83)

许多 library 将通过与 `process.env.NODE_ENV` 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于*生产环境*中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 `process.env.NODE_ENV === 'production'` 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 [`DefinePlugin`](https://webpack.docschina.org/plugins/define-plugin) 为所有的依赖定义这个变量：   

```javascript
  const webpack = require('webpack');
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  });
```

如果你正在使用像 [`react`](https://doc.react-china.org/) 这样的 library，那么在添加此 DefinePlugin 插件后，你应该看到 bundle 大小显著下降。还要注意，任何位于 `/src` 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，所以以下检查也是有效的：

**src/index.js**

```javascript
import { cube } from './math.js';
 
  if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
  }

  function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

### 2. 在webpack中配置mock，访问的API地址在webpack中过滤，使用假数据

[webpack-api-mocker](https://github.com/jaywcjlove/webpack-api-mocker)

使用webpack的插件，在webpack中配置好后，需要假数据的API就会跳转到假数据的地方访问。

参考资料：https://segmentfault.com/a/1190000013220134

还有一个：

[mock-webpack-plugin](https://github.com/MarxJiao/mock-webpack-plugin/blob/HEAD/readme-zh.md)



### 3. webpack本地开发配置API代理解决跨域问题

如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

dev-server 使用了非常强大的 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 包。更多高级用法，请查阅其 [文档](https://github.com/chimurai/http-proxy-middleware#options)。

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
```

请求到 `/api/users` 现在会被代理到请求 `http://localhost:3000/api/users`。

如果你不想始终传递 `/api` ，则需要重写路径：

```javascript
proxy: {
    '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
    }
}
```

一些比较重要的参数：

- secure: false

  接受运行在 HTTPS 上，可以使用无效证书的后端服务器

- changeOrigin: true

  如果代理地址是域名，那么需要加上这个配置才能生效，如：www.baidu.com 。否则会失败的。

https://segmentfault.com/a/1190000016199721



### 4. import或require时设置路径别名简化引入路径

参考资料：https://webpack.docschina.org/configuration/resolve/

```javascript
module.exports = {
    //...
    extensions: ['.js', '.json', '.jsx'],
    // 解析模块时应该搜索的目录
    modules:[resolve('../src'), resolve('../node_modules')],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
        components: path.join(__dirname, '../src/components'),
        utils: path.join(__dirname, '../src/utils'),
        style: path.join(__dirname, '../src/style'),
    },
};
```

主要的参数：

- resolve.extensions

  自动解析确定的扩展,能够使用户在引入模块时不带扩展,使用此选项，会**覆盖默认数组**，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。对于使用其扩展导入的模块，例如，`import SomeFile from "./somefile.ext"`，要想正确的解析，一个包含“*”的字符串必须包含在数组中。

- resolve.modules

  告诉 webpack 解析模块时应该搜索的目录.

  绝对路径和相对路径都能使用，但是要知道它们之间有一点差异。

  通过查看当前目录以及祖先路径（即 `./node_modules`, `../node_modules` 等等），相对路径将类似于 Node 查找 'node_modules' 的方式进行查找。

  使用绝对路径，将只在给定目录中搜索。

  如果你想要添加一个目录到模块搜索目录，此目录优先于 `node_modules/` 搜索:

  ```
   modules: [path.resolve(__dirname, 'src'), 'node_modules']
  ```

- resolve.alias

  创建 `import` 或 `require` 的别名，来确保模块引入变得更简单。

  ```javascript
  alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/')
  }
  ```

  现在，替换「在导入时使用相对路径」这种方式，就像这样：`import Utility from '../../utilities/utility';`

  你可以这样使用别名：`import Utility from 'Utilities/utility';`

  也可以在给定对象的键后的末尾添加 `$`，以表示精准匹配：

  ```
  alias: {
  	xyz$: path.resolve(__dirname, 'path/to/file.js')
  }
  ```

  这将产生以下结果：

  `import Test1 from 'xyz'; // 精确匹配，所以 path/to/file.js 被解析和导入`

  `import Test2 from 'xyz/file.js'; // 非精确匹配，触发普通解析`



### 5.  生成的HTML压缩，删除空格

主要是HtmlWebpackPlugin插件中加一个参数minify

https://github.com/jantimon/html-webpack-plugin

```
module.exports = {
    //...
    extensions: ['.js', '.json', '.jsx'],
    // 解析模块时应该搜索的目录
    modules:[resolve('../src'), resolve('../node_modules')],
    plugins: [
        new HtmlWebpackPlugin({ 
          filename: resolve("/dist/email.html"), 
          template: "./src/email.html",
          chunks: ["email"],
          minify:{  // 清除HTML的空格
            collapseWhitespace:true
          }
        }),
    ]
};
```

minify更多的参数：

```
{
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
}
```




## 参考资料

[webpack官网](https://webpack.js.org/)

[webpack中文官网](https://doc.webpack-china.org/)

[webpack概念](https://doc.webpack-china.org/concepts/)

[Node 环境变量 process.env.NODE_ENV 之webpack应用](https://blog.csdn.net/icewfz/article/details/76640319)

