[[TOC]]

[TOC]



# 属性描述对象

本文转载整理自：https://wangdoc.com/javascript/stdlib/attributes.html

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。

下面是属性描述对象的一个例子:

```js
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

1、value

value是该属性的属性值，默认为`undefined`。

2、writable

writable是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为`true`。

3、enumerable

enumerable是一个布尔值，表示该属性是否可遍历，默认为`true`。如果设为`false`，会使得某些操作（比如`for...in`循环、`Object.keys()`）跳过该属性。

4、configurable

configurable是一个布尔值，表示可配置性，默认为`true`。如果设为`false`，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（`value`属性除外）。也就是说，`configurable`属性控制了属性描述对象的可写性。

5、get

get是一个函数，表示该属性的取值函数（getter），默认为`undefined`。

6、set

set是一个函数，表示该属性的存值函数（setter），默认为`undefined`。

## 1. value目标属性的值

value属性是目标属性的值。

```js
var obj = { p: 123 };

Object.getOwnPropertyDescriptor(obj, 'p').value // 123
Object.defineProperty(obj, 'p', { value: 246 });
obj.p // 246
```

## 2. writable值是否可以修改

writable属性是一个布尔值，决定了目标属性的值（value）是否可以被改变。

注意，正常模式下，对`writable`为`false`的属性赋值不会报错，只会默默失败。但是，严格模式下会报错，即使对`a`属性重新赋予一个同样的值。

如果原型对象的某个属性的`writable`为`false`，那么子对象将无法自定义这个属性。但是，有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制。原因是这种情况下，原型链会被完全忽视。

```js
var obj = {};
Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});
obj.a // 37
obj.a = 25;
obj.a // 37

// 严格模式，writable为false的赋值会报错
function func() {
  'use strict';
  var obj = {};
  Object.defineProperty(obj, 'a', { value: 37, writable: false });
  obj.a = 37;
}
func();// Uncaught TypeError: Cannot assign to read only property 'a' of object '#<Object>'

// 原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性
var proto = Object.defineProperty({}, 'foo', { value: 'a', writable: false });
var obj = Object.create(proto);
obj.foo = 'b';
obj.foo // 'a'
// 规避方法，通过覆盖属性描述对象，绕过这个限制
var proto = Object.defineProperty({}, 'foo', { value: 'a', writable: false });
var obj = Object.create(proto);
Object.defineProperty(obj, 'foo', { value: 'b' });
obj.foo // "b"
```

## 3. enumerable是否可枚举

enumerable(可枚举)返回一个布尔值，表示目标属性是否可枚举。

我们知道，`in`运算符不管某个属性是对象自身的还是继承的，都会返回`true`。

JavaScript 的早期版本，`for...in`循环是基于`in`运算符的。这导致了`toString`等属性也会被`for...in`循环遍历。

这显然不太合理，后来就引入了“可遍历性”这个概念。只有可遍历的属性，才会被`for...in`循环遍历，同时还规定`toString`这一类实例对象继承的原生属性，都是不可遍历的，这样就保证了`for...in`循环的可用性。

具体来说，如果一个属性的`enumerable`为`false`，下面三个操作不会取到该属性：

-   `for..in`循环：循环包括继承的属性
-   `Object.keys`方法：不包括继承的属性
-   `JSON.stringify`方法：如果对象的 JSON 格式输出要排除某些属性，就可以把这些属性的`enumerable`设为`false`

因此，`enumerable`可以用来设置“秘密”属性。

```js
var a = { p: 10, w: 'hello'}
var obj = Object.create(a)
Object.defineProperty(obj, 'x', {
  value: 123,
  enumerable: false
});
obj.z = 300;

for (var key in obj) {
  console.log(key);
}
// z p w

Object.keys(obj)  // ["z"]
JSON.stringify(obj) // "{"z":300}"
```

## 4. configurable可配置

configurable(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。

也就是说，`configurable`为`false`时，`value`、`writable`、`enumerable`和`configurable`都不能被修改了。

注意，`writable`只有在`false`改为`true`会报错，`true`改为`false`是允许的。

至于`value`，只要`writable`和`configurable`有一个为`true`，就允许改动。

可配置性决定了目标属性是否可以被删除（delete）。configurable为false时，属性不能被删除。

```js
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(obj, 'p', {value: 2})
Object.defineProperty(obj, 'p', {writable: true})
Object.defineProperty(obj, 'p', {enumerable: true})
Object.defineProperty(obj, 'p', {configurable: true})
// 上面的都报这个错误：Uncaught TypeError: Cannot redefine property: p

// writable true 改为 false 是允许的
var obj = Object.defineProperty({}, 'p', { writable: true, configurable: false });
Object.getOwnPropertyDescriptor(obj, 'p')
// {value: undefined, writable: true, enumerable: false, configurable: false}
Object.defineProperty(obj, 'p', {writable: false}) // 修改成功
Object.getOwnPropertyDescriptor(obj, 'p')
// {value: undefined, writable: false, enumerable: false, configurable: false}

// value只要writable和configurable有一个为true，就允许改动。
var o1 = Object.defineProperty({}, 'p', { value: 1, writable: true,  configurable: false });
Object.defineProperty(o1, 'p', {value: 2}) // 修改成功
var o2 = Object.defineProperty({}, 'p', { value: 1, writable: false, configurable: true });
Object.defineProperty(o2, 'p', {value: 2}) // 修改成功

// configurable为false时，属性不能被删除
var obj = Object.defineProperties({}, {
  p1: { value: 1, configurable: true },
  p2: { value: 2, configurable: false }
});
delete obj.p1 // true
delete obj.p2 // false p2无法删除
obj.p1 // undefined
obj.p2 // 2
```

## 5. set、get存取器

除了直接定义以外，属性还可以用存取器（accessor）定义。其中，存值函数称为`setter`，使用属性描述对象的`set`属性；取值函数称为`getter`，使用属性描述对象的`get`属性。

一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，可以实现许多高级特性，比如某个属性禁止赋值。

注意，取值函数`get`不能接受参数，存值函数`set`只能接受一个参数（即属性的值）。

```js
// obj.p定义了get和set属性。obj.p取值时，就会调用get；赋值时，就会调用set。
var obj = Object.defineProperty({}, 'p', {
  get: function () { return 'getter'; },
  set: function (value) { console.log('setter: ' + value); }
});
obj.p // "getter"
obj.p = 123 // "setter: 123"
```

JavaScript 还提供了存取器的另一种写法，这种写法与定义属性描述对象是等价的，而且使用更广泛。

```js
var obj = {
  get p() { return 'getter'; },
  set p(value) { console.log('setter: ' + value); }
};
```

存取器往往用于，属性的值依赖对象内部数据的场合。

```js
var obj ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw new Error('新的值必须大于当前值');
  }
};

// next属性的存值函数和取值函数，都依赖于内部属性$n。
obj.next // 5
obj.next = 10;
obj.next // 10
obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
```

## 6. in 运算符和 for...in 循环

`in`运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。

`in`运算符常用于检查一个属性是否存在。

```js
'length' in Date // true
'toString' in Date // true
```

获得对象的所有可遍历属性（不管是自身的还是继承的），可以使用`for...in`循环。

```js
var o1 = { p1: 123 };
var o2 = Object.create(o1, { p2: { value: "abc", enumerable: true } });
// 对象o2的p2属性是自身的，p1属性是继承的。这两个属性都会被for...in循环遍历。
for (p in o2) {
  console.info(p);
}
// p2 p1

// 为了在for...in循环中获得对象自身的属性，可以采用hasOwnProperty方法判断一下。
for ( var name in object ) {
  if ( object.hasOwnProperty(name) ) {
    /* loop code */
  }
}
```

获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举），可以使用下面的函数。

```js
function inheritedPropertyNames(obj) {
  var props = {};
  // 次获取obj对象的每一级原型对象“自身”的属性，从而获取obj对象的“所有”属性，不管是否可遍历。
  while(obj) {
    Object.getOwnPropertyNames(obj).forEach(function(p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj);
  }
  return Object.getOwnPropertyNames(props);
}

// 一个例子，列出Date对象的所有属性
inheritedPropertyNames(Date)
// ["length", "name", "prototype", "now", "parse", "UTC", "arguments", "caller",.....
```

## 7. 对象的拷贝

如果要拷贝一个对象，需要做到下面两件事情。

-   确保拷贝后的对象，与原对象具有同样的原型。
-   确保拷贝后的对象，与原对象具有同样的实例属性。

下面就是根据上面两点，实现的对象拷贝函数。

```js
function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

function copyOwnPropertiesFrom(target, source) {
  Object
    .getOwnPropertyNames(source)
    .forEach(function (propKey) {
      var desc = Object.getOwnPropertyDescriptor(source, propKey);
      Object.defineProperty(target, propKey, desc);
    });
  return target;
}
```

另一种更简单的写法，是利用 ES2017 才引入标准的`Object.getOwnPropertyDescriptors`方法。

```js
function copyObject(orig) {
  return Object.create(
    Object.getPrototypeOf(orig),
    Object.getOwnPropertyDescriptors(orig)
  );
}
```







## 参考资料

[属性描述对象 阮一峰](https://wangdoc.com/javascript/stdlib/attributes.html)

