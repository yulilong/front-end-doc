---
home: true
heroImage: 
actionText: 快速开始 →
actionLink: /zh/guide/
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
~ npm install -g vuepress

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

