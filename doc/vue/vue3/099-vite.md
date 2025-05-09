[[TOC]]

[TOC]

# vite 超快的前端构建工具

## 1. 介绍

`vite` 是新一代前端构建工具，官网地址：[https://vitejs.cn](https://gitee.com/link?target=https%3A%2F%2Fvitejs.cn%2F)，`vite`的优势如下：

- 轻量快速的热重载（`HMR`），能实现极速的服务启动。
- 对 `TypeScript`、`JSX`、`CSS` 等支持开箱即用。
- 真正的按需编译，不再等待整个应用编译完成。
- `webpack`构建 与 `vite`构建对比图如下：

![](./img/013-vite.png)

![](./img/013-vite1.png)



## 文档网址

1、官方中文地址：https://cn.vite.dev/

[官方中文地址](https://cn.vite.dev/)一直显示最新版本的文档，目前(2025-02-07)版本是v6.0.0

2、第三方维护的中文官网：https://vitejs.cn/       
2.1 vite5 地址：https://vitejs.cn/vite5-cn/      
2.2 vite3 地址：https://vitejs.cn/vite3-cn/      
2.3 vite2 地址：https://vitejs.cn/guide/

3、官方中文github地址：https://github.com/vitejs/docs-cn

github仓库拉取下来后，本地启动服务，就能查看最新版本的文档，如果想看之前版本，切换到对应tag即可。

**注意**：

1、需要node版本是`v20.18.0`以上才可以，否则会报错。

2、在vite4版本中，启动服务会报错，需要在package.json文件中添加` "type": "module",`。详情参考：https://blog.csdn.net/qq_34793381/article/details/134284851

