[[TOC]]

[TOC]



# Vue CLI使用文档

[官方文档](https://cli.vuejs.org/zh/)

## 1. [运行模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html)

一个 Vue CLI 项目有三个模式：

- development 模式：用于 `vue-cli-service serve`命令。此模式会创建一个 webpack 配置，该配置启用热更新，不会对资源进行 hash 也不会打出 vendor bundles，目的是为了在开发的时候能够快速重新构建。
- production 模式：用于 `vue-cli-service build` 和 `vue-cli-service test:e2e`命令。
- test 模式：用于 `vue-cli-service test:unit`命令。此模式Vue CLI 会创建一个优化过后的，并且旨在用于单元测试的 webpack 配置，它并不会处理图片以及一些对单元测试非必需的其他资源。

你可以通过传递 `--mode` 选项参数为命令行覆写默认的模式。例如，如果你想要在构建命令中使用开发环境变量：

```sh
vue-cli-service build --mode development
```

当运行 `vue-cli-service` 命令时，所有的环境变量都从对应的`环境文件中`载入。如果文件内部不包含 `NODE_ENV` 变量，它的值将取决于模式。

> `NODE_ENV` 将决定您的应用运行的模式，是开发，生产还是测试，因此也决定了创建哪种 webpack 配置。如果在开发环境中有默认的 `NODE_ENV`，你应该移除它或在运行 `vue-cli-service` 命令的时候明确地设置 `NODE_ENV`。

### 1.1 环境变量文件

在项目的根目录中放置下列文件来指定环境变量：

```bash
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略,需要自己在.gitignore文件中添加
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

一个环境文件只包含环境变量的“键=值”对，想要了解解析环境文件规则的细节，请参考 [dotenv](https://github.com/motdotla/dotenv#rules)。我们也使用 [dotenv-expand](https://github.com/motdotla/dotenv-expand) 来实现变量扩展 (Vue CLI 3.5+ 支持)。：

```bash
FOO=foo
BAR=bar
CONCAT=$FOO$BAR # CONCAT=foobar
```

### 1.2 环境文件加载优先级

为一个特定模式准备的环境文件 (例如 `.env.production`) 将会比一般的环境文件 (例如 `.env`) 拥有更高的优先级。此外，Vue CLI 启动时已经存在的环境变量拥有最高优先级，并不会被 `.env` 文件覆写(比如NODE_ENV变量声明无效)。`.env` 环境文件是通过运行 `vue-cli-service` 命令载入的，因此环境文件发生变化，你需要重启服务。

假设我们有一个应用包含以下 `.env` 文件：

```sh
VUE_APP_TITLE=My App
```

和 `.env.staging` 文件：

```sh
NODE_ENV=production
VUE_APP_TITLE=My App (staging)
```

- `vue-cli-service build` 会加载可能存在的 `.env`、`.env.production` 和 `.env.production.local` 文件然后构建出生产环境应用。
- `vue-cli-service build --mode staging` 会在 staging 模式下加载可能存在的 `.env`、`.env.staging` 和 `.env.staging.local` 文件然后构建出生产环境应用。

这两种情况下，根据 `NODE_ENV`，构建出的应用都是生产环境应用，但是在 staging 版本中，`process.env.VUE_APP_TITLE` 被覆写成了另一个值。

### 1.3 在客户端侧代码中使用环境变量

请注意，只有 `NODE_ENV`，`BASE_URL` 和以 `VUE_APP_` 开头的变量将通过 `webpack.DefinePlugin` 静态地嵌入到*客户端侧*的代码中。

你可以在应用的代码中这样访问它们：

```js
console.log(process.env.VUE_APP_SECRET)
```

在构建过程中，`process.env.VUE_APP_SECRET` 将会被相应的值所取代。在 `VUE_APP_SECRET=secret` 的情况下，它会被替换为 `"secret"`。

除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量：

- `NODE_ENV` - 会是 `"development"`、`"production"` 或 `"test"` 中的一个。具体的值取决于应用运行的[模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#模式)。
- `BASE_URL` - 会和 `vue.config.js` 中的 `publicPath` 选项相符，即你的应用会部署到的基础路径。

所有解析出来的环境变量都可以在 `public/index.html` 中以 [HTML 插值](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#插值)中介绍的方式使用。

你可以在 `vue.config.js` 文件中计算环境变量。它们仍然需要以 `VUE_APP_` 前缀开头。这可以用于版本信息:

```js
process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {}
```

## 2.  vue.config.js配置文件参数说明













