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

