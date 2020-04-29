[[TOC]]

[TOC]



# Proxy

## 1. 概述

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

语法：const p = new Proxy(target, handler)

参数：

>   target：要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
>   handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

```js
var proxy = new Proxy({}, {
  get: function(target, propKey) { return 35; }
});
proxy.time // 35
proxy.name // 35
proxy.title // 35

// Proxy 实例也可以作为其他对象的原型对象。
var proxy = new Proxy({}, {
  get: function(target, propKey) { return 35; }
});
let obj = Object.create(proxy);
obj.time // 35
```

注意，要使得`Proxy`起作用，必须针对`Proxy`实例（上例是`proxy`对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

如果`handler`没有设置任何拦截，那就等同于直接通向原对象。

下面是 Proxy 支持的拦截操作一览，一共 13 种。

-   **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
-   **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
-   **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
-   **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
-   **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
-   **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
-   **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
-   **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
-   **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
-   **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
-   **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
-   **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
-   **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

## 2. Proxy 实例的方法

### 2.1 get()拦截属性读取操作

[handler.get() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get)

`get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
语法：`var p = new Proxy(target, { get: function(target, property, receiver) {} })`
返回值：get方法可以返回任何值。
该方法会拦截目标对象的以下操作:

-   访问属性: `proxy[foo]和` `proxy.bar`
-   访问原型链上的属性: `Object.create(proxy)[foo]`
-   [`Reflect.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)

如果违背了以下的约束，proxy会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):
-   如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同。
-   如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined。

下面的例子使用`get`拦截，实现数组读取负数的索引。

```javascript
function createArray(elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) { propKey = String(target.length + index); }
      return target[propKey]
    }
  };
  return new Proxy(elements, handler);
}
let arr = createArray(['a', 'b', 'c']);
arr[-1] // c
```

### 2.2 set()拦截赋值操作

[handler.set() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)

`set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

语法：`const p = new Proxy(target, {set: function(target, property, value, receiver) {} })`

返回值：`set()` 方法应当返回一个布尔值。返回 true 代表属性设置成功。在严格模式下，如果 `set()` 方法返回 `false`，那么会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。

该方法会拦截目标对象的以下操作:

-   指定属性值：`proxy[foo] = bar` 和 `proxy.foo = bar`
-   指定继承者的属性值：`Object.create(proxy)[foo] = bar`
-   [`Reflect.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)

如果违背以下的约束条件，proxy 会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常：

-   若目标属性是一个不可写及不可配置的数据属性，则不能改变它的值。
-   如果目标属性没有配置存储方法，即 `[[Set]]` 属性的是 `undefined`，则不能设置它的值。
-   在严格模式下，如果 `set()` 方法返回 `false`，那么也会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。

假定`Person`对象有一个`age`属性，该属性应该是一个不大于 200 的整数，那么可以使用`Proxy`保证`age`的属性值符合要求。

```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) { throw new TypeError('The age is not an integer'); }
      if (value > 200) { throw new RangeError('The age seems invalid'); }
    }
    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
    return true; // 严格模式下，set代理如果没有返回true，就会报错。
  }
};

let person = new Proxy({}, validator);
person.age = 100;
person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

### 2.3 apply()拦截函数调用、call和apply操作

[handler.apply() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply)

`apply`方法拦截函数的调用、`call`和`apply`操作。

`apply`方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（`this`）和目标对象的参数数组。

语法：`var p = new Proxy(target, { apply: function(target, thisArg, argumentsList) {} })`

返回值：apply方法可以返回任何值。

该方法会拦截目标对象的以下操作:

-   `proxy(...args)`
-   [`Function.prototype.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 和 [`Function.prototype.call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
-   [`Reflect.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)

如果违反了以下约束，代理将抛出一个TypeError：

`target`必须是可被调用的。也就是说，它必须是一个函数对象。

一个例子：

```js
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () { return 'I am the proxy'; }
};
var p = new Proxy(target, handler);
p()
// "I am the proxy"
```

### 2.4 has()拦截HasProperty操作

[handler.has() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has)

`has`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符。`has`方法可以接受两个参数，分别是目标对象、需查询的属性名。

语法：`var p = new Proxy(target, { has: function(target, prop) {} })`

返回值：`has` 方法返回一个 boolean 属性的值.

这个钩子可以拦截下面这些操作:

-   属性查询: `foo in proxy`
-   继承属性查询: `foo in Object.create(proxy)`
-   `with` 检查`: with(proxy) { (foo); }`
-   [`Reflect.has()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)

如果违反了下面这些规则,  proxy 将会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   如果原对象不可配置或者禁止扩展，这时`has`拦截会报错。

虽然`for...in`循环也用到了`in`运算符，但是`has`拦截对`for...in`循环不生效。

```js
let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) { console.log(`${target.name} 不及格`); return false; }
    return prop in target;
  }
}
let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1 // 张三 不及格 false
'score' in oproxy2 // true
// has拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被for...in循环所排除。
for (let a in oproxy1) { console.log(oproxy1[a]); }
// 张三 59

for (let b in oproxy2) { console.log(oproxy2[b]); }
// 李四 99
```

### 2.5 construct()拦截new命令

[handler.construct() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct)

`construct`方法用于拦截`new`命令，下面是拦截对象的写法。方法可以接受三个参数，第一个参数是目标对象，第二个参数是构造函数的参数对象，第三个参数是最初被调用的构造函数

语法：`var p = new Proxy(target, { construct: function(target, argumentsList, newTarget) {} })`

返回值：`construct` 方法必须返回一个对象。

该拦截器可以拦截以下操作:

-   `new proxy(...args)`
-   [`Reflect.construct()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct)

如果违反以下约定，proxy 将会抛出错误 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   必须返回一个对象.

一个例子：

```js
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});
(new p(1)).value // "called: 1" 10

// construct方法返回的必须是一个对象，否则会报错。
var p = new Proxy(function() {}, {
  construct: function(target) { return 1; }
});
new p() // 报错
```

### 2.6 deleteProperty()拦截delete操作

[handler.deleteProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty)

`deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除。该方法接受两个参数，第一个参数是目标对象，第二参数是待删除的属性名。

语法：`var p = new Proxy(target, { deleteProperty: function(target, property) {} })`

返回值：必须返回一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 类型的值，表示了该属性是否被成功删除。

该方法会拦截以下操作:

-   删除属性: `delete proxy[foo]` 和 `delete proxy.foo`
-   [`Reflect.deleteProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty)

如果违反以下约定，proxy 将会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   如果目标对象的属性是不可配置的，那么该属性不能被删除。

下面代码中，`deleteProperty`方法拦截了`delete`操作符，删除第一个字符为下划线的属性会报错。

```js
var handler = {
  deleteProperty (target, key) {
    if (key[0] === '_') {
      throw new Error(`不能删除私有 "${key}" 属性`);
    }
    delete target[key];
    return true;
  }
};

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Uncaught Error: 不能删除私有 "_prop" 属性
```

### 2.7 defineProperty()拦截defineProperty操作

[handler.defineProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty)

`defineProperty`方法拦截了`Object.defineProperty`操作。该方法有三个参数，第一个参数是目标对象，第二个参数是待检索其描述的属性名，第三个参数是待定义或修改的属性的描述符。第三个参数有限制，只有这些属性才有用：`enumerable`、`configurable`、`writable`、`value`、`get`、`set`.

语法：`var p = new Proxy(target, { defineProperty: function(target, property, descriptor) {} })`

返回值：必须以一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 返回，表示定义该属性的操作是否成功。

该方法会拦截目标对象的以下操作 :

-   [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
-   [`Reflect.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty)
-   [`proxy.property='value'`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/proxy/property='value')

如果违反以下约定，proxy 将会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   如果目标对象不可扩展， 将不能添加属性。
-   不能添加或者修改一个属性为不可配置的，如果它不作为一个目标对象的不可配置的属性存在的话。
-   如果目标对象存在一个对应的可配置属性，这个属性可能不会是不可配置的。
-   如果一个属性在目标对象中存在对应的属性，那么 `Object.defineProperty(target, prop, descriptor)` 将不会抛出异常。
-   在严格模式下， `false` 作为` handler.defineProperty` 方法的返回值的话将会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。

```js
var handler = {
  defineProperty (target, key, descriptor) { return false; }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```

上面代码中，`defineProperty`方法返回`false`，导致添加新属性总是无效。

### 2.8 getOwnPropertyDescriptor()拦截这个方法

[handler.getOwnPropertyDescriptor() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor)

`getOwnPropertyDescriptor`方法拦截`Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者`undefined`。该方法有两个参数，第一个参数是目标对象，第二个参数是返回属性名称的描述。

语法：`var p = new Proxy(target, { getOwnPropertyDescriptor: function(target, prop) {} })`

返回值：必须返回一个 对象 或 `undefined`。

该方法会拦截目标对象的以下操作 :

-   [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
-   [`Reflect.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor)

如果违反以下约定，proxy 将会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   `getOwnPropertyDescriptor` 必须返回一个 对象 或 `undefined`。
-   如果属性作为目标对象的不可配置的属性存在，则该属性无法报告为不存在。
-   如果属性作为目标对象的属性存在，并且目标对象不可扩展，则该属性无法报告为不存在。
-   如果属性不存在作为目标对象的属性，并且目标对象不可扩展，则不能将其报告为存在。
-   属性不能被报告为不可配置，如果它不作为目标对象的自身属性存在，或者作为目标对象的可配置的属性存在。
-   Object.getOwnPropertyDescriptor（target）的结果可以使用 Object.defineProperty 应用于目标对象，也不会抛出异常。

```js
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```

上面代码中，`handler.getOwnPropertyDescriptor`方法对于第一个字符为下划线的属性名会返回`undefined`。

### 2.9 getPrototypeOf()拦截获取对象原型

`getPrototypeOf`方法主要用来拦截获取对象原型。该方法有一个参数，被代理的目标对象

语法：`const p = new Proxy(obj, { getPrototypeOf(target) {} })`

返回值：必须是一个对象或者 `null`。

该方法会拦截目标对象的以下操作 :

-   `Object.prototype.__proto__`
-   `Object.prototype.isPrototypeOf()`
-   `Object.getPrototypeOf()`
-   `Reflect.getPrototypeOf()`
-   `instanceof`

如果违反以下约定，proxy 将会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   `getPrototypeOf()` 方法返回的不是对象也不是 `null。`
-   目标对象是不可扩展的，且 `getPrototypeOf()` 方法返回的原型不是目标对象本身的原型。(即：如果目标对象不可扩展（non-extensible）， `getPrototypeOf`方法必须返回目标对象的原型对象。)

```js
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) { return proto; }
});
Object.getPrototypeOf(p) === proto // true
```

上面代码中，`getPrototypeOf`方法拦截`Object.getPrototypeOf()`，返回`proto`对象。

### 2.10 isExtensible()拦截

[handler.isExtensible() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible)

**isExtensible**方法用于拦截对对象的Object.isExtensible()。该方法只有一个参数，即目标对象。

语法：`var p = new Proxy(target, {isExtensible: function(target) {} })`

返回值：必须返回一个 Boolean值或可转换成Boolean的值。

该方法会拦截目标对象的以下操作:

-   [`Object.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
-   [`Reflect.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible)

如果违反以下约定，proxy 将会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

它的返回值必须与目标对象的`isExtensible`属性保持一致，否则就会抛出错误。

```js
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p) "called" true
```

对于约定的报错：

```js
var p = new Proxy({}, {
  isExtensible: function(target) { return false; }
});

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
```

### 2.11 ownKeys()拦截自身属性读取操作

[handler.ownKeys() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys)

`ownKeys`方法用来拦截对象自身属性的读取操作。该方法只有一个参数，即目标对象。

语法：`var p = new Proxy(target, { ownKeys: function(target) {} })`

返回值：必须返回一个可枚举对象。

该方法可以拦截以下操作：

-   `Object.getOwnPropertyNames()`
-   `Object.getOwnPropertySymbols()`
-   `Object.keys()`
-   `for...in`循环

如果违反以下约定，proxy 将会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   `ownKeys` 的结果必须是一个数组.
-   数组的元素类型要么是一个 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) ，要么是一个 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol).
-   结果列表必须包含目标对象的所有不可配置（non-configurable ）、自有（own）属性的key.
-   如果目标对象不可扩展，那么结果列表必须包含目标对象的所有自有（own）属性的key，不能有其它值.

注意，使用`Object.keys`方法时，有三类属性会被`ownKeys`方法自动过滤，不会返回。

-   目标对象上不存在的属性
-   属性名为 Symbol 值
-   不可遍历（`enumerable`）的属性

下面的例子是拦截第一个字符为下划线的属性名。

```js
let target = { _bar: 'foo', _prop: 'bar', prop: 'baz' };

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"
```

### 2.12 preventExtensions()拦截

[handler.preventExtensions() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions)

`preventExtensions`方法拦截`Object.preventExtensions()`。该方法必须返回一个布尔值，否则会被自动转为布尔值。该方法只有一个参数，即目标对象。

语法：`var p = new Proxy(target, { preventExtensions: function(target) {} })`

返回值：返回一个布尔值.

该方法可以拦截以下操作：

-   [`Object.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
-   [`Reflect.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions)

如果违反以下约定，proxy 将会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   只有目标对象不可扩展时（即`Object.isExtensible(proxy)`为`false`），`proxy.preventExtensions`才能返回`true`，否则会报错。

下面的例子说明限制情况：

```js
var proxy = new Proxy({}, {
  preventExtensions: function(target) { return true; }
});
Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
```

为了防止出现这个问题，通常要在`proxy.preventExtensions`方法里面，调用一次`Object.preventExtensions`。

```js
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});
Object.preventExtensions(proxy) // "called"  Proxy {}
```

### 2.13 setPrototypeOf()拦截

[handler.setPrototypeOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf)

`setPrototypeOf`方法主要用来拦截`Object.setPrototypeOf`方法。该方法有两个参数，第一个参数是目标对象，第二个参数是对象原型或null。另外，如果目标对象不可扩展（non-extensible），`setPrototypeOf`方法不得改变目标对象的原型。

语法：`var p = new Proxy(target, { setPrototypeOf: function(target, prototype) {} })`

返回值：如果成功修改了`[[Prototype]]`, `setPrototypeOf` 方法返回 `true`,否则返回 `false`.

该方法可以拦截以下操作：

-   [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
-   [`Reflect.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf)

如果违反以下约定，proxy 将会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

-   如果 target 不可扩展, 原型参数必须与`Object.getPrototypeOf(target)` 的值相同.

下面一个列子，只要修改`target`的原型对象，就会报错：

```js
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```

## 3. Proxy.revocable()可取消的实例

`Proxy.revocable`方法返回一个可取消的 Proxy 实例。

```js
let target = {};
let handler = {};
let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123
revoke();
proxy.foo // TypeError: Revoked
```

`Proxy.revocable`方法返回一个对象，该对象的`proxy`属性是`Proxy`实例，`revoke`属性是一个函数，可以取消`Proxy`实例。上面代码中，当执行`revoke`函数之后，再访问`Proxy`实例，就会抛出一个错误。

`Proxy.revocable`的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## 4. this问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的`this`关键字会指向 Proxy 代理。

```js
const target = {
  m: function () { console.log(this === proxy); }
};
const handler = {};
const proxy = new Proxy(target, handler);
target.m() // false
proxy.m()  // true
```

上面代码中，一旦`proxy`代理`target.m`，后者内部的`this`就是指向`proxy`，而不是`target`。

此外，有些原生对象的内部属性，只有通过正确的`this`才能拿到，所以 Proxy 也无法代理这些原生对象的属性。

```javascript
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
```

上面代码中，`getDate`方法只能在`Date`对象实例上面拿到，如果`this`不是`Date`对象实例就会报错。这时，`this`绑定原始对象，就可以解决这个问题。

```javascript
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```



## 参考资料

[Proxy MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

[Proxy ES6 阮一峰](https://es6.ruanyifeng.com/?search=isArray&x=0&y=0#docs/proxy)

