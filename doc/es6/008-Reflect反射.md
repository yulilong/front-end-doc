[[TOC]]

[TOC]



# Reflect反射

**Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与`Proxy`对象的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。

与大多数全局对象不同，`Reflect`不是一个构造函数。你不能将其与一个[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)一起使用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）。

`Reflect`对象的设计目的有这样几个:

1、将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

2、修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

```js
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

3、让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

4、`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

```js
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```

上面代码中，每一个`Proxy`对象的拦截操作（`get`、`delete`、`has`），内部都调用对应的`Reflect`方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。

有了`Reflect`对象以后，很多操作会更易读。

```js
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

## 2. 静态方法

`Reflect`对象一共有 13 个静态方法。

-   Reflect.apply(target, thisArg, args)
-   Reflect.construct(target, args)
-   Reflect.get(target, name, receiver)
-   Reflect.set(target, name, value, receiver)
-   Reflect.defineProperty(target, name, desc)
-   Reflect.deleteProperty(target, name)
-   Reflect.has(target, name)
-   Reflect.ownKeys(target)
-   Reflect.isExtensible(target)
-   Reflect.preventExtensions(target)
-   Reflect.getOwnPropertyDescriptor(target, name)
-   Reflect.getPrototypeOf(target)
-   Reflect.setPrototypeOf(target, prototype)

上面这些方法的作用，大部分与`Object`对象的同名方法的作用都是相同的，而且它与`Proxy`对象的方法是一一对应的。下面是对它们的解释。

### 2.1 Reflect.get()读取属性

`Reflect.get()`方法与从 对象 (`target[name]`) 中读取属性类似，但它是通过一个函数执行来操作的。该方法有三个参数，第一个是目标对象，第二个参数是属性key，第三个参数，如果`target`对象中指定了`getter`，`receiver`则为`getter`调用时的`this`值。第三个参数可选。

语法：`Reflect.get(target, name, receiver)`

返回值：属性的值。

异常：如果第一个参数不是对象，则抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

```js
var myObject = {
  foo: 1, bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = { foo: 4, bar: 4, };
Reflect.get(myObject, 'foo', myReceiverObject) // 1
Reflect.get(myObject, 'baz', myReceiverObject) // 8

// 如果第一个参数不是对象，Reflect.get方法会报错。
Reflect.get(1, 'foo') // 报错: Uncaught TypeError: Reflect.get called on non-object
Reflect.get(false, 'foo') // 报错
```

### 2.2 Reflect.set()

[Reflect.set() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)

`Reflect.set`方法设置`target`对象的`name`属性等于`value`。该方法第一个参数是目标对象，第二个参数是属性key，第三个参数是设置的值，第四个参数，如果`target`对象中指定了`getter`，`receiver`则为`getter`调用时的`this`值。第四个参数可选。

语法：`Reflect.set(target, name, value, receiver)`

返回值：返回一个 `Boolean`值表明是否成功设置属性。

异常：如果第一个参数不是对象，则抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

```js
var myObject = {
  foo: 4,
  set bar(value) { return this.foo = value; },
};

var myReceiverObject = { foo: 0, };
Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
Reflect.set(myObject, 'foo', 330)
myObject.foo // 330
// 如果第一个参数不是对象，Reflect.set会报错。
Reflect.set(1, 'foo', {}) // 报错
```

注意，如果 `Proxy`对象和 `Reflect`对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了`receiver`，那么`Reflect.set`会触发`Proxy.defineProperty`拦截。

```js
let p = { a: 'a' };
let handler = {
  set(target, key, value, receiver) {
    Reflect.set(target, key, value, receiver); console.log('set');
  },
  defineProperty(target, key, attribute) {
    Reflect.defineProperty(target, key, attribute); console.log('defineProperty');
  }
};
let obj = new Proxy(p, handler);
obj.a = 'A'; // set   defineProperty
```

上面代码中，`Proxy.set`拦截里面使用了`Reflect.set`，而且传入了`receiver`，导致触发`Proxy.defineProperty`拦截。这是因为`Proxy.set`的`receiver`参数总是指向当前的 `Proxy`实例（即上例的`obj`），而`Reflect.set`一旦传入`receiver`，就会将属性赋值到`receiver`上面（即`obj`），导致触发`defineProperty`拦截。如果`Reflect.set`没有传入`receiver`，那么就不会触发`defineProperty`拦截。

```js
let p = { a: 'a' };
let handler = {
  set(target, key, value, receiver) {
    Reflect.set(target, key, value); console.log('set'); 
  },
  defineProperty(target, key, attribute) {
    Reflect.defineProperty(target, key, attribute); console.log('defineProperty'); 
  }
};
let obj = new Proxy(p, handler);
obj.a = 'A'; // set
```

### 2.3 Reflect.has(obj, name)

[Reflect.has() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)

`Reflect.has`方法对应`name in obj`里面的`in`运算符。第一个参数是目标对象，第二个参数是属性名。

语法：`Reflect.has(obj, name)`

返回值：该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回`true`；删除失败，被删除的属性依然存在，返回`false`。

异常：如果第一个参数不是对象，则抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

```js
const myObj = { foo: 'bar' };
// 旧写法
delete myObj.foo;
// 新写法
Reflect.deleteProperty(myObj, 'foo');
```

### 2.4 Reflect.deleteProperty(obj, name)

[Reflect.deleteProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty)

`Reflect.deleteProperty`方法等同于`delete obj[name]`，用于删除对象的属性。该对象第一个参数是目标对象，第二个参数是要删除属性的名称。

语法：`Reflect.deleteProperty(obj, name)`

返回值：返回一个布尔值，如果删除成功，或者被删除的属性不存在，返回`true`；删除失败，被删除的属性依然存在，返回`false`。

异常：如果第一个参数不是对象，则抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

```js
const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;
// 新写法
Reflect.deleteProperty(myObj, 'foo');
// 如果属性不可配置，返回 false
Reflect.deleteProperty(Object.freeze({foo: 1}), "foo"); // false
```



### 2.5 Reflect.construct(target, args)

[Reflect.construct() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct)

`Reflect.construct`方法等同于`new target(...args)`，这提供了一种不使用`new`，来调用构造函数的方法。第一个参数是目标构造函数，第二个参数是类数组，构造函数调用的参数，第三个参数可选，新建对象的原型对象，参考 `new.target` 操作符，默认值为`target。`

语法：`Reflect.construct(target, args, newTarget)`

返回值：以`target`（如果`newTarget`存在，则为`newTarget`）函数为构造函数，`args`为其初始化参数的对象实例。

异常：如果target或者newTarget不是构造函数，则抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

```js
function Greeting(name) { this.name = name; }
function Pro() {}
Pro.prototype.age = 330
// new 的写法
var a = new Greeting('张三');
// Reflect.construct 的写法
var b = Reflect.construct(Greeting, ['张三']);
var c = Reflect.construct(Greeting, ['jack'], Pro);
c.age // 330
// Reflect.construct(Greeting, ['qwe'], Pro); 等同于下面：
var d = Object.create(Pro.prototype);
Greeting.apply(d, ['jack'])
```

### 2.6 Reflect.getPrototypeOf(obj)

[Reflect.getPrototypeOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf)

`Reflect.getPrototypeOf`方法用于读取对象的`__proto__`属性，对应`Object.getPrototypeOf(obj)`。该方法只有一个参数是，就是获取原型的目标对象。

语法：`Reflect.getPrototypeOf(obj)`

返回值：给定对象的原型。如果给定对象没有继承的属性，则返回 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。

异常：如果第一个参数不是对象，则抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

```js
const myObj = new FancyThing();

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;
// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
```

`Reflect.getPrototypeOf`和`Object.getPrototypeOf`的一个区别是，如果参数不是对象，`Object.getPrototypeOf`会将这个参数转为对象，然后再运行，而`Reflect.getPrototypeOf`会报错。

```javascript
Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1) // 报错
```

### 2.7 Reflect.setPrototypeOf(obj, newProto)

[Reflect.setPrototypeOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf)

`Reflect.setPrototypeOf`方法用于设置目标对象的原型（prototype），对应`Object.setPrototypeOf(obj, newProto)`方法。第一个参数是设置原型的目标对象，第二个参数是对象的新原型(一个对象或者null)。

语法：`Reflect.setPrototypeOf(obj, newProto)`

返回值：返回一个布尔值，表示是否设置成功。

异常：如果第一个参数不是对象，或者newProto既不是对象也不是null，就会抛出一个TypeError。

```js
const myObj = {};

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);
// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);
myObj.length // 0
```

如果无法设置目标对象的原型（比如，目标对象禁止扩展），`Reflect.setPrototypeOf`方法返回`false`。

```javascript
Reflect.setPrototypeOf({}, null)
// true
Reflect.setPrototypeOf(Object.freeze({}), null)
// false
```

如果第一个参数不是对象，`Object.setPrototypeOf`会返回第一个参数本身，而`Reflect.setPrototypeOf`会报错。

```javascript
Object.setPrototypeOf(1, {})
// 1
Reflect.setPrototypeOf(1, {})
// TypeError: Reflect.setPrototypeOf called on non-object
```

如果第一个参数是`undefined`或`null`，`Object.setPrototypeOf`和`Reflect.setPrototypeOf`都会报错。

```javascript
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Reflect.setPrototypeOf(null, {})
// TypeError: Reflect.setPrototypeOf called on non-object
```

### 2.8 Reflect.apply(func, thisArg, args)

[Reflect.apply() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)

`Reflect.apply`方法等同于`Function.prototype.apply.call(func, thisArg, args)`，用于绑定`this`对象后执行给定函数。第一个参数是目标函数，第二个参数是函数调用时绑定的this对象，第三个参数是目标函数调用时传入的参数列表，该参数应该是一个类数组的对象。

语法：`Reflect.apply(func, thisArg, args)`

返回值：返回值是调用完带着指定参数和 `this` 值的给定的函数后返回的结果。

异常：如果第一个参数不可以调用，抛出TypeError。

一般来说，如果要绑定一个函数的`this`对象，可以这样写`fn.apply(obj, args)`，但是如果函数定义了自己的`apply`方法，就只能写成`Function.prototype.apply.call(fn, obj, args)`，采用`Reflect`对象可以简化这种操作。

```javascript
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);
// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);

Reflect.apply("".charAt, "ponies", [3]); // 'i'
```

### 2.9 Reflect.defineProperty(target, propertyKey, attributes)

[Reflect.defineProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty)

`Reflect.defineProperty`方法基本等同于`Object.defineProperty`，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用`Reflect.defineProperty`代替它。第一个参数是目标对象，第二个参数是要定义或修改的属性名称，第三个参数是要定义或修改的属性的描述。

语法：`Reflect.defineProperty(target, propertyKey, attributes)`

返回值：返回Boolean值，表示属性是否被成功定义。

异常：如果目标不是对象，抛出TypeError。

```js
var student = {};
Reflect.defineProperty(student, "name", {value: "Mike"}); // true
student.name; // "Mike"
```

[`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法，如果成功则返回一个对象，否则抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 。另外，当定义一个属性时，你也可以使用 `try...catch` 去捕获其中任何的错误。而因为 `Reflect.defineProperty` 返回 Boolean 值作为成功的标识，所以只能使用 `if...else` ：

```js
if (Reflect.defineProperty(target, property, attributes)) {
  // 成功
} else {
  // 失败
}
```

### 2.10 Reflect.getOwnPropertyDescriptor(target, propertyKey)

[Reflect.getOwnPropertyDescriptor() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor)

`Reflect.getOwnPropertyDescriptor`基本等同于`Object.getOwnPropertyDescriptor`，用于得到指定属性的描述对象，将来会替代掉后者。第一个参数是目标对象，第二个参数是获取自己的属性描述符的属性的名称。

语法：`Reflect.getOwnPropertyDescriptor(target, propertyKey)`

返回值：如果属性存在于给定的目标对象中，则返回属性描述符；否则，返回 `undefined` 。

异常：如果目标不是对象，抛出TypeError。

```javascript
var myObject = {};
Object.defineProperty(myObject, 'hidden', { value: true, enumerable: false, });
// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
```

`Reflect.getOwnPropertyDescriptor`和`Object.getOwnPropertyDescriptor`的一个区别是，如果第一个参数不是对象，`Object.getOwnPropertyDescriptor(1, 'foo')`不报错，返回`undefined`，而`Reflect.getOwnPropertyDescriptor(1, 'foo')`会抛出错误，表示参数非法。

### 2.11 Reflect.isExtensible (target)

[Reflect.isExtensible() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible)

`Reflect.isExtensible`方法对应`Object.isExtensible`，返回一个布尔值，表示当前对象是否可扩展。

语法：`Reflect.isExtensible (target)`

返回值：返回一个Boolean，表明该对象是否可扩展。

异常：如果目标不是对象，抛出TypeError。

```javascript
const myObject = {};

// 旧写法
Object.isExtensible(myObject) // true
// 新写法
Reflect.isExtensible(myObject) // true
```

如果参数不是对象，`Object.isExtensible`会返回`false`，因为非对象本来就是不可扩展的，而`Reflect.isExtensible`会报错。

```javascript
Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错
```

### 2.12 Reflect.preventExtensions(target)

[Reflect.preventExtensions() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions)

`Reflect.preventExtensions`对应`Object.preventExtensions`方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。第一个参数是阻止扩展的目标对象。

语法：`Reflect.preventExtensions(target)`

返回值：返回一个 `Boolean`值表明目标对象是否成功被设置为不可扩展。

异常：如果目标不是对象，抛出TypeError。

```javascript
var myObject = {};

// 旧写法
Object.preventExtensions(myObject) // Object {}
// 新写法
Reflect.preventExtensions(myObject) // true
```

如果参数不是对象，`Object.preventExtensions`在 ES5 环境报错，在 ES6 环境返回传入的参数，而`Reflect.preventExtensions`会报错。

```javascript
// ES5 环境
Object.preventExtensions(1) // 报错
// ES6 环境
Object.preventExtensions(1) // 1
// 新写法
Reflect.preventExtensions(1) // 报错
```

### 2.13 Reflect.ownKeys (target)

[Reflect.ownKeys() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)

`Reflect.ownKeys`方法用于返回对象的所有属性，基本等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和。

语法：`Reflect.ownKeys(target)`

返回值：由目标对象的自身属性键组成的数组。

异常：如果目标不是对象，抛出TypeError。

```js
var myObject = { foo: 1, bar: 2, [Symbol.for('baz')]: 3, [Symbol.for('bing')]: 4, };

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']
Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]
// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```







## 参考资料

[Reflect MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

[Reflect ES6 阮一峰](https://es6.ruanyifeng.com/?search=isArray&x=0&y=0#docs/reflect)