[[TOC]]

[TOC]



# react类型检查PropTypes

`PropTypes` 是一个在 `编码` 阶段提供类型检查的方案

## 1. PropTypes 使用

npm地址：https://www.npmjs.com/package/prop-types

安装：

```
npm install --save prop-types
```

导入包：

```js
import PropTypes from 'prop-types'; // ES6
var PropTypes = require('prop-types'); // ES5 with npm
```

使用：

```jsx
import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // ... do things with the props
  }
}

// 使用
MyComponent.propTypes = {
  name: PropTypes.string,	// 不带isRequired一般需要给一个默认值
  history: PropTypes.object.isRequired,	// 可以不需要默认值
}

// 给一个默认值
MyComponent..defaultProps = {
  name: 'jack'
}
```



## 2. 不同类型的验证



```jsx
// 数组、布尔、函数、数字、对象、字符串、symbol
MyComponent.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何东西都可以被渲染:numbers, strings, elements,或者是包含这些类型的数组(或者是片段)。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,
  // 一个react元素类型
  optionalElementType: PropTypes.elementType,

  // 你也可以声明一个 prop 是类的一个实例。
  // 使用 JS 的 instanceof 运算符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以声明 prop 是特定的值，类似于枚举
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是多种类型其中之一
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 一个某种类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 属性值为某种类型的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 一个特定形式的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 你可以使用 `isRequired' 链接上述任何一个，以确保在没有提供 prop 的情况下显示警告。
  requiredFunc: PropTypes.func.isRequired,

  // 任何数据类型的值
  requiredAny: PropTypes.any.isRequired,

  // 你也可以声明自定义的验证器。如果验证失败返回 Error 对象。不要使用 `console.warn` 或者 throw ，
  // 因为这不会在 `oneOfType` 类型的验证器中起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 也可以声明`arrayOf`和`objectOf`类型的验证器，如果验证失败需要返回Error对象。
  // 会在数组或者对象的每一个元素上调用验证器。验证器的前两个参数分别是数组或者对象本身，
  // 以及当前元素的键值。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```



## 3. 为什么要 类型检查

我们先来看一份 [rollbar](https://rollbar.com/) 公司对 `1000+` 项目的错误回收分析 `top10`

![](./img/005-react.png)

大部分都是类型错误。

比如定义 `let prodList = []` , 你代码中 `prodList.push(...)`

但是初始的时候被设置 `prodList = 123` 而且没有任何提示, 那运行 `push(...)` 肯定要报未知方法的错误

这种问题在自由的 `JavaScript` 世界很普遍，如果在 `编译` `运行` 两个阶段都没提示的话，排错是很麻烦的，全靠经验和对业务的熟悉 (陈年老项目又没文档简直是地狱)

所以我们要把问题消灭在萌芽中，就是申明对象的时候同时把类型也定义掉了， `react` 的自带方案是 `PropTypes` 组件



## 参考资料

[prop-types  NPM](https://www.npmjs.com/package/prop-types)

[React 快速上手 - 10 类型检查 PropTypes  segmentfault](https://segmentfault.com/a/1190000015071373)