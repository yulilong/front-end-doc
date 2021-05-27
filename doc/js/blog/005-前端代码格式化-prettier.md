[[TOC]]

[TOC]



# 代码风格工具 Prettier



## 在vue项目使用

在项目的根目录需要创建一个`.prettierrc.js`文件：

```js
/**
 * 功能: 代码风格Prettier配置文件
 * 作者: 
 * 日期: 2021-04-02
 * 说明：
 *  这个是项目代码风格Prettier工具的配置文件，用来统一每个开发同事的代码风格配置。
 *  由于大家都用vscode编辑器开发项目，需要安装插件来配合：
 *  1、用来识别vue格式的文件：
 *  vetur，https://marketplace.visualstudio.com/items?itemName=octref.vetur
 *  2、代码风格统一工具：
 *  prettier，https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
 *  3、在vscode配置中添加如下代码：
 *  "vetur.format.defaultFormatter.html": "prettier",
 *  
 */
module.exports = {
  "singleQuote": true, // 字符串使用 单引号
  "printWidth": 120 // 每行最多 120个字符
}
```

具体配置参考：https://prettier.io/docs/en/options.html



## 参考资料

[prettier 官网](https://prettier.io/)

[Prettier看这一篇就行了](https://zhuanlan.zhihu.com/p/81764012?from_voters_page=true)

[vscode编辑器插件 Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

