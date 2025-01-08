[TOC]

## 1. md格式注意事项

### 1.1 md里面写HTML标签要注意，有时候会导致vuepress本地开发报错

```
aaa<span>1</ span>123 // 这样就会报错
<span>1</ span> // 这样也会报错

<span>1</span> // 这样就没有错误了，标签中不允许有空格
```



### 1.2 `** **`开始和结束不要有标点符号，否则无效

加重的`**d**`开始和末尾不要有空格和标点符号

```
**不要在函数中调用 Hook** // 有效
**不要在函数中调用 Hook。** // 有标点符号，无效
**不要在 函数中调用 Hook ** // 末尾有空格，无效
```

标点符号放在外面

### 1.3 README.md名字要大写

`README.md`文件名字要大写。

编辑此页功能:`editLinks: true,`会打开github链接里面的对应文件，`README`文件会默认找大写名字。

### 1.4 标题里面不能有 html标签的大于符号、小于符号

在md文档的标题里面不能出现html标签的`<>`，否则vurpress 会报错。

## 2. 启动vuepress 报错相关

### 2.1 启动服务报错

当使用 `vuepress build .` 打包文件，或`vuepress dev .`启动服务的时候，报错：

```bash
/usr/local/lib/node_modules/vuepress/node_modules/loader-runner/lib/LoaderRunner.js:114
			throw e;
			^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:79:19)
    at Object.createHash (node:crypto:139:10)
    at module.exports (/usr/local/lib/node_modules/vuepress/node_modules/webpack/lib/util/createHash.js:90:53)
    at NormalModule._initBuildHash (/usr/local/lib/node_modules/vuepress/node_modules/webpack/lib/NormalModule.js:386:16)
```

经过排查，是由于node 版本过高，导致的报错。由于我开发前端项目，我的node版本切换到了`20.18.0`。这个版本运行`vuepress` 命令就会报错。当我把node版本切换到`14.21.3`命令就可以成功运行了。

解决办法：使用工具，把node版本切换到`14.21.3`以下。

