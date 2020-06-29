---
home: true
heroImage: 
actionText: 快速开始 →
actionLink: /doc/js/
features:
- title: JavaScript
  details: 主要记录一些JavaScript方面知识
- title: CSS
  details: 知识讲解，实际效果例子
- title: HTML
  details: 知识讲解，实际效果例子
footer: MIT Licensed | Copyright © 2019-yulilong
---

## 1. 项目介绍

本项目是前端技术文档网站，使用的是`vuepress`的静态网站生成器。

## 2. 环境搭建启动服务

`vuepress`开发需要node8.0以上的版本。

如果没有安装node，可在node官网选择对应操作系统下载安装：https://nodejs.org/zh-cn/

如果你的node版本低，请把node版本升级到8.0以上。

如何升级node：https://segmentfault.com/a/1190000016956077

### 2.1 安装VuePress

全局安装，打开终端，输入如下命令：

```
~ npm install -g vuepress@0.14.5 --registry=https://registry.npm.taobao.org/

http fetch GET 200 https://registry.npm.taobao.org/caniuse-db/download/caniuse-db-1.0.30000909.tgz 3993ms
/usr/local/bin/vuepress -> /usr/local/lib/node_modules/vuepress/bin/vuepress.js
+ vuepress@0.14.5
removed 1 package and updated 13 packages in 68.944s
```

### 2.2 启动一个服务

打开项目后，终端`vuepress dev .`：

```
~ vuepress dev .

 WAIT  Extracting site metadata...
 DONE  [00:34:16] Build 94707d finished in 5175 ms!
> VuePress dev server listening at http://localhost:8080/
```

## 3. 打包服务

首先在`.vuepress/config.js`文件里面修改仓库名字：

```
module.exports = {
    base: '/front-end-doc/',     // 仓库名字,用于github Pages 部署
}
```

如果是github Pages使用购买的域名，那么不需要设置这个参数，否则会出错。

然后在终端使用`vuepress build .`命令来生成最终项目：

```
vuepress build .

WAIT  Extracting site metadata...
[23:28:24] Compiling Client
[23:28:24] Compiling Server
 WAIT  Rendering static HTML...

 DONE  Success! Generated static files in .vuepress/dist.
```

生成的最终文件在`.vuepress/dist`目录中，可把此文件部署到你自己的服务器上

### 3.1 部署到GitHub Pages

部署到GitHub Pages上的命令写在了`deploy.sh`文件里面，文件里面需要修改仓库地址。

然后终端使用`bash deploy.sh`命令来执行脚本完成自动部署。