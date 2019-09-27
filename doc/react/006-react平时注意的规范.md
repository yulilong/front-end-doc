[[TOC]]

[TOC]

# react 平时注意的规范

## 1. for循环的元素key值尽量不要是用数组的索引

## 2. HTML元素的点击事件不要是用箭头函数

1、如果有参数，可以使用使用HTML的`data-`属性，注意`data-`的属性要全小写。

```jsx
<div
  data-levelcode={data.levelCode}
  onClick={event => {
    this.onShowMoreQueryBtn(levelCode);
  }}
 >
</div>
{/* 改成如下形式 */}
<div
  data-levelcode={data.levelCode}
  onClick={this.onShowMoreQueryBtn}
 >
</div>

onShowMoreQueryBtn = e => {
  // 使用这种方式获取参数
  const levelcode = e.currentTarget.dataset.levelcode;
}
```

2、还可以修改函数，以如下形式传参：

```jsx
<div onClick={this.onShowMoreQueryBtn(data.levelCode, b)}>
  <span> 123 </spanspan>
</div>

onShowMoreQueryBtn = (a, b) => e => {
  
}
```

## 3. 文件头注释、函数注释

文件头注释：

```javascript
/**
 * @file 文件说明
 * @author 作者名字
 * @date 2019-09-02 文件创建日期
 */
 // 这里空一行，建议
```

函数注释：

```js
/**
 * 编辑弹窗确定按钮事件，获取数据，关闭弹窗
 * 																			这里要空一行
 * @param  {Object} data    选择的条件
 * @return {*}           		有返回值在写这个，没有不写return
 */
onConfirmEditBtn = data => {}
```

关于`{Object} `:

任意类型：`{*}`，参数可选：` {string=} `，可变参数：` {...number}`

基本类型小写:`{string}`,`{number}`,`{boolean}`,

引用类型大写:`{Object}`,`{Function}`,`{Array}`,`{Date}`,`{RegExp}`

## 4. JavaScript中避免硬编码

在代码中如果一个常量使用超过2次，那么就需要定义一个常量变量来使用。

`常量` 使用 `全部字母大写，单词间下划线分隔` 的命名方式。

`var HTML_ENTITY = {};`

## 5. 关于数据遍历

遍历数据返回新的数组，尽量使用map方法。



## 6. html中样式尽量减少标签

比如HTML文本需要换行，避免使用`<br />` 标签，应该使用CSS样式修改或者使用`<div>`标签。

HTML尽量使用`&nbsp;`空格实体，可使用CSS样式来添加边距。

## 7. 事件方法命名规范

组件提供的事件，建议采用on开头。

如果每次点击都触发，使用`onClick`；

如果是切换的时候触发，使用`onChange`;

可以参考[antd UI](https://ant.design/docs/react/introduce-cn)组件命名方式。


