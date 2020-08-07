[[TOC]]

[TOC]

# react中eslint代码检查常见问题解决

## 1. html元素有点击事件提示添加role属性

当HTML元素中有点击事件的时候，eslint检查工具会提示要添加role属性来表示元素要表达的意思。

```html
<div
     onClick={() => {}}
 />
```

解决办法是添加属性，并设置值`presentation`：

```html
<div
     role="presentation"
     onClick={() => {}}
 />
```

参考链接：https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md

role属性其他值：
`button`、`link`、`checkbox`、`menuitem`、`menuitemcheckbox`、`menuitemradio`、`option`、`radio`、`searchbox`、`switch`、`textbox`

## 2. import react组件报错

![](./img/021-eslint.png)

如上图所示，在import引入一个react组件的时候，eslint的`import/no-unresolved`报错，

查看配置文件.eslintrc.js:

```js
rules: {
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
},
```

并没有发现什么问题。

后经过网上查找资料：https://stackoverflow.com/questions/41769880/how-to-manually-add-a-path-to-be-resolved-in-eslintrc

在eslint配置文件中：

```js
settings: {
    'import/resolver': { node: { extensions: ['.js', '.ts', '.tsx'] } },
},
```

经过测试，在这里的`extensions`添加上`.jsx`即可：

```js
settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        // paths: ['./src']
      }
    },
},
```

或者直接把`import/resolver`规则注释掉(删除)。

