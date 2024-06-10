[[TOC]]

[TOC]



# Object 对象

本文参考整理阮一峰老师的文章：https://wangdoc.com/javascript/stdlib/object.html

参考整理：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

JS原生提供`Object`对象(注意起首的`O`是大写)，本章介绍该对象原生的各种方法。JS的所有其他对象都继承自`Object`对象，都是`Object`的实例。

Object对象的原生方法分成两类：

Object本身的方法(静态方法)

Object的实例方法。

```js
// 本身的方法:直接定义在Object对象的方法。
Object.print = function (o) { console.log(o) };
// 实例方法: 定义在Object原型对象Object.prototype上的方法。它可以被Object实例直接使用。
Object.prototype.print = function () { console.log(this); };
var obj = new Object();
obj.print() // Object
```



## 1. Object()方法和`new Object()`

### 1.1 Object()方法：转为对象

Object本身是一个函数，将任意值转为对象。这个方法常用于保证某个值一定是对象。

参数和返回值：

>   参数为空(或者为undefined和null)，返回空对象。=> {}
>
>   参数是原始类型，返回对应的包装对象实例
>
>   参数是一个对象，返回该对象，即没有任何操作。利用这一点，可以判断变量是否为对象

```js
// 参数为空、undefined、null
var obj = Object(); // => {}
var obj = Object(undefined); // => {}
var obj = Object(null); // => {}
obj instanceof Object // true

// 参数是原始类型
var obj = Object(1);
obj instanceof Number // true
var obj = Object('foo');
obj instanceof String // true

// 参数是一个对象
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true
```

### 1.2 `new Object()`构造函数

`Object`构造函数的首要用途，是直接通过它来生成新对象。

注意：`var obj = new Object()`写法与`var obj = {}`是等价的，后者是前者的一种简便写法

`Object`构造函数的用法与工具方法很相似，几乎一模一样。虽然用法相似，但是`Object(value)`与`new Object(value)`两者的语义是不同的，`Object(value)`表示将`value`转成一个对象，`new Object(value)`则表示新生成一个对象，它的值是`value`。

```js
// 与字面量的写法var obj = {}是等价的, 是一种简便写法
// 参数为空、undefined、null
var obj = new Object(); // => {}

// 参数是原始类型
var obj = new Object(1);
obj instanceof Number // true

// 参数是一个对象
var arr = [];
var obj = new Object(arr); // 返回原数组
obj === arr // true
```



## 2. Object的静态方法

通过Object.keys()形式的调用

### 2.1 create()指定原型和属性返回新的对象

Object.create()方法是ECMAScript 5中新增的方法，这个方法用于创建一个新对象。被创建的对象继承另一个对象的原型，在创建新对象时可以指定一些属性。

`Object.create`方法生成的对象，继承了它的原型对象的构造函数。

>   语法：Object.create(proto[, propertiesObject])     
>   参数：        
>   proto: 新创建对象的原型对象, 不能为空，或者不是对象，否则会报错。    
>   **propertiesObject**:可选。如果没有指定为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性。

如果只需要第一个参数，那么还可以以如下方式实现create：

```js
if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}
```

使用例子：
```js
var A = { p: 1, print: function(){console.log('hello')} };
var B = Object.create(A);

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true

// 不传参数报错
Object.create()
Object.create(123)
// Uncaught TypeError: Object prototype may only be an Object or null: undefined

// 传第二个参数
var obj = Object.create({}, {
  p1: { value: 123, enumerable: true, configurable: true, writable: true, },
  p2: { value: 'abc', enumerable: true, configurable: true, writable: true, },
  p3: { value: 'hello' }, // 不传： writable: false, enumerable: false, configurable: false
  p4: {}
});
// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = 'abc';
Object.getOwnPropertyDescriptor(obj, 'p4')

// Object.create方法生成的对象，继承了它的原型对象的构造函数。
function A() {}
var a = new A();
var b = Object.create(a);
b.constructor === A // true
b instanceof A // true
```

### 2.2 getPrototypeOf()获取Prototype

`Object.getPrototypeOf`方法返回参数对象的原型。这是获取原型对象的标准方法。

```js
var F = function () {};
// 实例对象f的原型是F.prototype
var f = new F();
Object.getPrototypeOf(f) === F.prototype // true

// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype // true
// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null // true
// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype // true
```

### 2.3 setPrototypeOf()设置Prototype

`Object.setPrototypeOf`方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。

```js
var a = {};
var b = {x: 1};
// 将对象a的原型，设置为对象b，因此a可以共享b的属性
Object.setPrototypeOf(a, b);
Object.getPrototypeOf(a) === b // true
a.x // 1

// new命令可以使用Object.setPrototypeOf方法模拟。
var F = function () { this.foo = 'bar'; };
var f = new F();
// 等同于
// new命令新建实例对象，其实可以分成两步:
// 第一步，将一个空对象的原型设为构造函数的prototype属性
// 第二步，将构造函数内部的this绑定这个空对象，然后执行构造函数，使得定义在this上面的方法和属性（上例是this.foo），都转移到这个空对象上
var f = Object.setPrototypeOf({}, F.prototype);
F.call(f);
```



### 2.4 Object.keys()遍历对象可枚举的属性

Object.keys方法用来遍历对象的属性。一般情况下，几乎总是使用`Object.keys`方法，遍历对象的属性。

参数是一个对象，返回一个数组。该数组的成员都是该对象自身的(不是继承的)所有可枚举的属性名字。

```js
var obj = { p1: 123, p2: 456 };
Object.keys(obj) // ["p1", "p2"]
Object.keys(obj).length // 2
// 数组有个不可枚举的length属性，Object.keys方法不会返回这个属性
var a = ['Hello', 'World'];
Object.keys(a) // ["0", "1"]

// 原始类型返回空数据
Object.keys(1) // []
```

### 2.5 getOwnPropertyNames()遍历对象所有属性

Object.getOwnPropertyNames()方法用来遍历对象的属性

参数是一个对象，返回一个数组。该数组的成员都是该对象自身的(不是继承的)所有属性名字。枚举不可枚举属性都返回。

```js
var obj = { p1: 123, p2: 456 };
Object.getOwnPropertyNames(obj) // ["p1", "p2"]
Object.getOwnPropertyNames(obj).length // 2

// 数组有个不可枚举的length属性，Object.getOwnPropertyNames方法可以返回这个属性
var a = ['Hello', 'World'];
Object.getOwnPropertyNames(a) // ["0", "1", "length"]

// 原始类型返回空数据
Object.getOwnPropertyNames(1) // []
```

对于一般的对象来说，`Object.keys()`和`Object.getOwnPropertyNames()`返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。`Object.keys`方法只返回可枚举的属性，`Object.getOwnPropertyNames`方法还返回不可枚举的属性名。

### 2.6 getOwnPropertyDescriptor()获取某个属性的描述对象

`Object.getOwnPropertyDescriptor()`方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。

注意：该方法只能用于对象自身的属性，不能用于继承的属性

```js
var obj = { p: 'a' };
Object.getOwnPropertyDescriptor(obj, 'p')
// {value: "a", writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(obj, 'toString') // undefined
```

### 2.7 defineProperty()、defineProperties()通过描述对象定义某个属性

`Object.defineProperty()`方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，如果属性已经存在，方法相当于更新该属性的属性描述对象。

`Object.defineProperty`方法接受三个参数，依次如下。

-   object：属性所在的对象
-   propertyName：字符串，表示属性名
-   attributesObject：属性描述对象

如果一次性定义或修改多个属性，可以使用`Object.defineProperties()`方法，参数如下

-   object：属性所在的对象
-   一个对象： { propertyName1: attributesObject1,  propertyName2: attributesObject2, ... }

`Object.defineProperty()`和`Object.defineProperties()`参数里面的属性描述对象，`writable`、`configurable`、`enumerable`这三个属性的默认值都为`false`。

```js
var obj = Object.defineProperty({}, 'p', {
  value: 123, // 属性值
  writable: false, // 属性只读，不可修改
  enumerable: true, // 属性可以枚举
  configurable: false
});
obj.p // 123

var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});
obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"

var obj = {};
Object.defineProperty(obj, 'foo', {});
Object.getOwnPropertyDescriptor(obj, 'foo')
// {value: undefined, writable: false, enumerable: false, configurable: false}
```

注意，一旦定义了取值函数`get`（或存值函数`set`），就不能将`writable`属性设为`true`，或者同时定义`value`属性，否则会报错。

### 2.8 preventExtensions()防止对象扩展

`Object.preventExtensions`方法可以使得一个对象无法再添加新的属性。

```js
var obj = new Object();
Object.preventExtensions(obj);
Object.defineProperty(obj, 'p', { value: 'hello' });
// Uncaught TypeError: Cannot define property p, object is not extensible
obj.p = 1;
obj.p // undefined
```

### 2.9 isExtensible()判断对象是否可扩展

`Object.isExtensible`方法用于检查一个对象是否使用了`Object.preventExtensions`方法。也就是说，检查是否可以为一个对象添加属性。返回`false`，表示已经不能添加新属性了。

```js
var obj = new Object();

Object.isExtensible(obj) // true
Object.preventExtensions(obj);
Object.isExtensible(obj) // false
```

### 2.10 seal()禁止添加、删除属性

`Object.seal`方法使得一个对象既无法添加新属性，也无法删除旧属性。

`Object.seal`实质是把属性描述对象的`configurable`属性设为`false`，因此属性描述对象不再能改变了。

`Object.seal`只是禁止新增或删除属性，并不影响修改某个属性的值。

```js
var obj = { p: 'hello' };
// seal方法之前
Object.getOwnPropertyDescriptor(obj, 'p')
// {value: "hello", writable: true, enumerable: true, configurable: true}

Object.seal(obj);

// seal方法之后
Object.getOwnPropertyDescriptor(obj, 'p')
// {value: "hello", writable: true, enumerable: true, configurable: false}

delete obj.p; // 返回false
obj.p // "hello"
obj.x = 'world';
obj.x // undefined
// 修改属性值
obj.p = 'b';
obj.p // 'b'
```

### 2.11 isSealed()检查是否设置了seal()

`Object.isSealed`方法用于检查一个对象是否使用了`Object.seal`方法。如果设置过seal()返回true，否则返回false

```js
var obj = { p: 'a' };

Object.isExtensible(obj) // true
Object.isSealed(obj) // false
Object.seal(obj);
Object.isSealed(obj) // true
Object.isExtensible(obj) // false
```

### 2.12 Object.freeze()冻结一个对象

`Object.freeze`方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。

使用`Object.freeze`方法以后，`Object.isSealed`将会返回`true`，`Object.isExtensible`返回`false`。

冻结后修改属性、新增属性、删除属性都无效了。这些操作并不报错，只是默默地失败。如果在严格模式下，则会报错。

```js
var obj = { p: 'hello' };

Object.freeze(obj);
Object.isSealed(obj) // true
Object.isExtensible(obj) // false
obj.p = 'world';
obj.p // "hello"
obj.t = 'hello';
obj.t // undefined
delete obj.p // false
obj.p // "hello"
```

### 2.13 Object.isFrozen()判断是否冻结

`Object.isFrozen`方法用于检查一个对象是否使用了`Object.freeze`方法。没有冻结返回false，冻结返回true。

`Object.isFrozen`的一个用途是，确认某个对象没有被冻结后，再对它的属性赋值。

```js
var obj = { p: 'hello' };

Object.freeze(obj);
Object.isFrozen(obj) // true
// 判断对象没有冻结，再对它的属性赋值
if (!Object.isFrozen(obj)) {
  obj.p = 'world';
}
```

### 2.14 锁定对象的局限性

Object.preventExtensions()防止对象扩展，Object.seal()禁止添加、删除属性，Object.freeze()冻结一个对象。

上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。一种解决方案是，把`obj`的原型也冻结住。

另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。

```js
var obj = {};
Object.preventExtensions(obj);
var proto = Object.getPrototypeOf(obj);
proto.t = 'hello';
obj.t // hello

// 一种解决方案是，把obj的原型也冻结住
var obj = {};
Object.preventExtensions(obj);
var proto = Object.getPrototypeOf(obj);
Object.preventExtensions(proto);
proto.p = 'world';
obj.p // undefined

// 冻结后，还是能修改属性指向的对象的
var obj = { foo: 1, bar: ['a', 'b'] };
Object.freeze(obj);
obj.bar.push('c');
obj.bar // ["a", "b", "c"]
```

### 2.15 is()确定两个值是否为[相同值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#使用_object.is_进行同值相等比较)

语法：`Object.is(value1, value2)`，value1要比较的第一个值，value2要比较的第二个值，返回一个布尔值，指示两个参数是否为相同的值。

`Object.is()` 确定两个值是否为[相同值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#使用_object.is_进行同值相等比较)。如果以下其中一项成立，则两个值相同：

- 都是 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- 都是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)
- 都是 `true` 或者都是 `false`
- 都是长度相同、字符相同、顺序相同的字符串
- 都是相同的对象（意味着两个值都引用了内存中的同一对象）
- 都是 [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 且具有相同的数值
- 都是 [symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 且引用相同的 symbol 值
- 都是数字且
  - 都是 `+0`
  - 都是 `-0`
  - 都是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
  - 都有相同的值，非零且都不是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

`Object.is()` 与 [`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality) 运算符并不等价。`==` 运算符在测试相等性之前，会对两个操作数进行类型转换（如果它们不是相同的类型），这可能会导致一些非预期的行为，例如 `"" == false` 的结果是 `true`，但是 `Object.is()` 不会对其操作数进行类型转换。

`Object.is()` 也*不*等价于 [`===`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_equality) 运算符。`Object.is()` 和 `===` 之间的唯一区别在于它们处理带符号的 0 和 `NaN` 值的时候。`===` 运算符（和 `==` 运算符）将数值 `-0` 和 `+0` 视为相等，但是会将 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 视为彼此不相等。

```js
Object.is(value1, value2)

// 案例 1：评估结果和使用 === 相同
Object.is(25, 25); // true
Object.is("foo", "foo"); // true
Object.is("foo", "bar"); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false

// 案例 2: 带符号的 0
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// 案例 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true
```



## 3. Object原型上的方法

方法定义在`Object.prototype`对象。它们称为实例方法，所有`Object`的实例对象都继承了这些方法。

### 3.1 valueOf()返回当前对象对应的值

Object.prototype.valueOf()方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

`valueOf`方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法。

```js
var obj = new Object();
obj.valueOf() === obj // true

// JavaScript 就会默认调用valueOf()方法，求出obj的值再与1相加。所以，如果自定义valueOf方法，就可以得到想要的结果。
1 + obj // "1[object Object]"

// 自定义obj.valueOf，覆盖Object.prototype.valueOf
obj.valueOf = function () {
  return 2;
};
1 + obj // 3
```

### 3.2 toString()返回对象的字符串形式

Object.prototype.toString()方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。可以通过自定义`toString`方法，可以让对象在自动类型转换时，得到想要的字符串形式。

对于一个对象调用`toString`方法，会返回字符串`[object Object]`，该字符串说明对象的类型。

数组、字符串、函数、Date 对象都分别部署了自定义的`toString`方法，覆盖了`Object.prototype.toString`方法。

```js
var obj = {a:1};
obj.toString() // "[object Object]"

obj.toString = function () { return 'hello'; };
obj + ' ' + 'world' // "hello world"

[1, 2, 3].toString() // "1,2,3"
'123'.toString() // "123"
(function () { return 123; }).toString()
// "function () { return 123; }"
(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"
```

#### 3.2.1 toString() 的应用：判断数据类型

`Object.prototype.toString`方法返回对象的类型字符串，因此可以用来判断一个值的类型。

返回的字符串`object Object`，其中第二个`Object`表示该值的构造函数。这是一个十分有用的判断数据类型的方法。

由于实例对象可能会自定义`toString`方法，覆盖掉`Object.prototype.toString`方法，所以为了得到类型字符串，最好直接使用`Object.prototype.toString`方法。通过函数的`call`方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。

不同数据类型的`Object.prototype.toString`方法返回值如下。

-   数值：返回`[object Number]`。
-   字符串：返回`[object String]`。
-   布尔值：返回`[object Boolean]`。
-   undefined：返回`[object Undefined]`。
-   null：返回`[object Null]`。
-   数组：返回`[object Array]`。
-   arguments 对象：返回`[object Arguments]`。
-   函数：返回`[object Function]`。
-   Error 对象：返回`[object Error]`。
-   Date 对象：返回`[object Date]`。
-   RegExp 对象：返回`[object RegExp]`。
-   其他对象：返回`[object Object]`。

```js
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call([]) // "[object Array]"
function func() {
    console.log(Object.prototype.toString.call(arguments)) // [object Arguments]
}
Object.prototype.toString.call(func) // "[object Function]"
Object.prototype.toString.call(new Date()) // "[object Date]"
Object.prototype.toString.call(new Error) // "[object Error]"
Object.prototype.toString.call(/abc/) // "[object RegExp]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
```

利用这个特性，可以写出一个比`typeof`运算符更准确的类型判断函数。

```js
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"
```

### 3.3 toLocaleString()返回本地字符串形式

`Object.prototype.toLocaleString`方法与`toString`的返回结果相同，也是返回一个值的字符串形式。

这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的`toLocaleString`，用来返回针对某些地域的特定的值。

目前，主要有三个对象自定义了`toLocaleString`方法。

-   Array.prototype.toLocaleString()
-   Number.prototype.toLocaleString()
-   Date.prototype.toLocaleString()

```js
// Array.prototype.toLocaleString()
var arr = [123333333333, 'hello', 2, 3, 55555555,]
arr.toString() // "123333333333,hello,2,3,55555555"
// 数组的toLocaleString 是元素的每一项都调用toLocaleString
arr.toLocaleString() // "123,333,333,333,hello,2,3,55,555,555"

// Number.prototype.toLocaleString()
var num = 213321413213
num.toString() // "213321413213"
num.toLocaleString() // "213,321,413,213"

// Date.prototype.toLocaleString()
var date = new Date();
date.toString() // "Sun Apr 05 2020 12:40:31 GMT+0800 (China Standard Time)"
date.toLocaleString() // "4/5/2020, 12:40:31 PM"
```

### 3.4 hasOwnProperty()判断自身是否有该属性

`Object.prototype.hasOwnProperty`方法接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性。

```js
var obj = { p: 123 };
obj.hasOwnProperty('p') // true
// toString属性是继承的，所以返回false
obj.hasOwnProperty('toString') // false
```

### 3.5 isPrototypeOf()判断参数是否是原型

实例对象的`isPrototypeOf`方法，用来判断该对象是否为参数对象的原型。

只要实例对象处在参数对象的原型链上，`isPrototypeOf`方法都返回`true`。

```js
var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

o2.isPrototypeOf(o3) // true
o1.isPrototypeOf(o3) // true

Object.prototype.isPrototypeOf({}) // true
Object.prototype.isPrototypeOf([]) // true
Object.prototype.isPrototypeOf(/xyz/) // true
// 由于Object.prototype处于原型链的最顶端，所以对各种实例都返回true，只有直接继承自null的对象除外。
Object.prototype.isPrototypeOf(Object.create(null)) // false
```

### 3.6 propertyIsEnumerable()判断属性是否可枚举

实例对象的`propertyIsEnumerable()`方法返回一个布尔值，用来判断某个属性是否可遍历。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回`false`。

```js
var obj = { p: 123 };

obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false
```

### 3.7 `__proto__`返回对象的原型

实例对象的`__proto__`属性（前后各两个下划线），返回该对象的原型。该属性可读写。

根据语言标准，`__proto__`属性只有浏览器才需要部署，其他环境可以没有这个属性。它前后的两根下划线，表明它本质是一个内部属性，不应该对使用者暴露。因此，应该尽量少用这个属性，而是用`Object.getPrototypeOf()`和`Object.setPrototypeOf()`，进行原型对象的读写操作。

```js
var obj = {};
var p = {};

obj.__proto__ = p;
Object.getPrototypeOf(obj) === p // true
```













## 参考资料

[Object 对象 阮一峰](https://wangdoc.com/javascript/stdlib/object.html)

[属性描述对象 阮一峰](https://wangdoc.com/javascript/stdlib/attributes.html)

[Object 对象的相关方法 阮一峰](https://wangdoc.com/javascript/oop/object.html)



