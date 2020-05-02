[[TOC]]

[TOC]



# Symbol 符号

**symbol** 是一种基本数据类型 （[primitive data type](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)）。`Symbol()`函数会返回**symbol**类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："`new Symbol()`"。

每个从`Symbol()`返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。

## 1. 概述

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。如果有一种机制，保证每个属性名都是独一无二的，这就从根本上防止属性名冲突，这就是这就是 ES6 引入`Symbol`的原因。

ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

Symbol 值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

注意，`Symbol`函数前不能使用`new`命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

`Symbol`函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
let s = Symbol();
typeof s // "symbol"

let s1 = Symbol('foo');
let s2 = Symbol('bar');
s1 // Symbol(foo)
s2 // Symbol(bar)
s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = { toString() { return 'abc'; } };
const sym = Symbol(obj);
sym // Symbol(abc)
// 注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2 // false
```

Symbol 值不能与其他类型的值进行运算，会报错。但是，Symbol 值可以显式转为字符串。另外，Symbol 值也可以转为布尔值，但是不能转为数值。

```js
let sym = Symbol('My symbol');
"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
Boolean(sym) // true
!sym  // false
```

## 2. Symbol.prototype.description

创建 Symbol 的时候，可以添加一个描述。但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。

```javascript
// sym的描述就是字符串foo
const sym = Symbol('foo');
String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"
```

上面的用法不是很方便。[ES2019](https://github.com/tc39/proposal-Symbol-description) 提供了一个实例属性`description`，直接返回 Symbol 的描述。

```javascript
const sym = Symbol('foo');
sym.description // "foo"
```

## 3. 作为对象属性的Symbol用法

由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```javascript
let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
let a = { [mySymbol]: 'Hello!' };
// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

上面代码通过方括号结构和`Object.defineProperty`，将对象的属性名指定为一个 Symbol 值。

注意，Symbol 值作为对象属性名时，不能用点运算符。因为点运算符后面总是字符串，所以不会读取`mySymbol`作为标识名所指代的那个值，导致属性名实际上是一个字符串，而不是一个 Symbol 值。同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

```js
const mySymbol = Symbol();
const a = {};
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

let s = Symbol();
let obj = { [s]: function (arg) { ... } };
obj[s](123);
```

Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

```javascript
const log = {};
log.levels = { DEBUG: Symbol('debug'), INFO: Symbol('info'), WARN: Symbol('warn') };
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');
```

## 4. Symbol作为属性名的遍历

Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

另一个新的 API，`Reflect.ownKeys()`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```js
var obj = {name: 'jack'};
obj[Symbol('foo')] = 'foo';
obj[Symbol('bar')] = 'bar';
for (let i in obj) {
  console.log(i); // name
}
Object.getOwnPropertyNames(obj) // ["name"]
Object.getOwnPropertySymbols(obj) // [Symbol(foo), Symbol(bar)]
Reflect.ownKeys(obj) // ["name", Symbol(foo), Symbol(bar)]
```

## 5. Symbol.for()，Symbol.keyFor()

Symbol.for()：使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol。

`Symbol.for()`与`Symbol()`这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。比如，如果你调用`Symbol.for("cat")`30 次，每次都会返回同一个 Symbol 值，但是调用`Symbol("cat")`30 次，会返回 30 个不同的 Symbol 值。

```js
Symbol.for("bar") === Symbol.for("bar") // true
Symbol("bar") === Symbol("bar") // false
```

注意，`Symbol.for()`为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。`Symbol.for()`的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

```javascript
function foo() { return Symbol.for('bar'); }
var x = foo();
let y = Symbol.for('bar');
console.log(x === y); // true

iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
```

`Symbol.keyFor()`方法返回一个已登记的 Symbol 类型值的`key`。

```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

## 6. 内置的 Symbol 值

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

### 6.1 Symbol.hasInstance

对象的`Symbol.hasInstance`属性，指向一个内部方法。当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo`在语言内部，实际调用的是`Foo[Symbol.hasInstance](foo)`。

```js
class Even {
  static [Symbol.hasInstance](obj) { console.log('符号方法执行'); return Number(obj) % 2 === 0; }
}
// 等同于
const Even = {
  [Symbol.hasInstance](obj) { console.log('符号方法执行');  return Number(obj) % 2 === 0; }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
```

### 6.2 Symbol.isConcatSpreadable

对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开。

数组的默认行为是可以展开，`Symbol.isConcatSpreadable`默认等于`undefined`。该属性等于`true`时，也有展开的效果。类似数组的对象正好相反，默认不展开。它的`Symbol.isConcatSpreadable`属性设为`true`，才可以展开。

```js
// 数组的Symbol.isConcatSpreadable默认值是undefined，等于true时有展开效果，等于false禁止展开
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined
arr1[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr1, 'e') // ['a', 'b', ['c','d'], 'e']
arr1[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(arr1, 'e') // ["a", "b", "c", "d", "e"]

// 类数组
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']
obj[Symbol.isConcatSpreadable] // undefined
obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ["a", "b", "c", "d", "e"]
```

`Symbol.isConcatSpreadable`属性也可以定义在类里面。

```javascript
class A1 extends Array {
  constructor(args) { super(args); this[Symbol.isConcatSpreadable] = true; }
}
class A2 extends Array { get [Symbol.isConcatSpreadable] () { return false; } }
let a1 = new A1(); a1[0] = 3; a1[1] = 4;
let a2 = new A2(); a2[0] = 5; a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]
```

上面代码中，类`A1`是可展开的，类`A2`是不可展开的，所以使用`concat`时有不一样的结果。

注意，`Symbol.isConcatSpreadable`的位置差异，`A1`是定义在实例上，`A2`是定义在类本身，效果相同。

### 6.3 Symbol.species

对象的`Symbol.species`属性，指向一个构造函数。创建衍生对象时，会使用该属性。

```javascript
class MyArray extends Array { }
var a = new MyArray(1, 2, 3);
var b = a.map(x => x);
var c = a.filter(x => x > 1);
b instanceof MyArray // true
c instanceof MyArray // true
```

上面代码中，子类`MyArray`继承了父类`Array`，`a`是`MyArray`的实例，`b`和`c`是`a`的衍生对象。你可能会认为，`b`和`c`都是调用数组方法生成的，所以应该是数组（`Array`的实例），但实际上它们也是`MyArray`的实例。 `Symbol.species`属性就是为了解决这个问题而提供的。现在，我们可以为`MyArray`设置`Symbol.species`属性。

```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
// 默认的Symbol.species属性等同于下面的写法。
static get [Symbol.species]() { return this; }
```

上面代码中，由于定义了`Symbol.species`属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义`Symbol.species`属性要采用`get`取值器。

现在，再来看前面的例子。

```javascript
class MyArray extends Array { static get [Symbol.species]() { return Array; } }
var a = new MyArray();
var b = a.map(x => x);
b instanceof MyArray // false
b instanceof Array // true
```

上面代码中，`a.map(x => x)`生成的衍生对象，就不是`MyArray`的实例，而直接就是`Array`的实例。

总之，`Symbol.species`的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。

### 6.4 Symbol.match

对象的`Symbol.match`属性，指向一个函数。当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值。

```javascript
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)
class MyMatcher {
  [Symbol.match](string) { return 'hello world'.indexOf(string); }
}
'e'.match(new MyMatcher()) // 1
```

### 6.5 Symbol.replace

对象的`Symbol.replace`属性，指向一个方法，当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值。

```javascript
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```

下面是一个例子。

```javascript
const x = {};
x[Symbol.replace] = (...s) => console.log(s);
'Hello'.replace(x, 'World') // ["Hello", "World"]
```

`Symbol.replace`方法会收到两个参数，第一个参数是`replace`方法正在作用的对象，上面例子是`Hello`，第二个参数是替换后的值，上面例子是`World`。

### 6.6 Symbol.search

对象的`Symbol.search`属性，指向一个方法，当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值。

```javascript
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) { this.value = value; }
  [Symbol.search](string) { return string.indexOf(this.value); }
}
'foobar'.search(new MySearch('foo')) // 0
```

### 6.7 Symbol.split

对象的`Symbol.split`属性，指向一个方法，当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值。

```javascript
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
```

下面是一个例子。

```javascript
class MySplitter {
  constructor(value) { this.value = value; }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) { return string; }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}
'foobar'.split(new MySplitter('foo'))
// ['', 'bar']
'foobar'.split(new MySplitter('bar'))
// ['foo', '']
'foobar'.split(new MySplitter('baz'))
// 'foobar'
```

上面方法使用`Symbol.split`方法，重新定义了字符串对象的`split`方法的行为，

### 6.8 Symbol.iterator

对象的`Symbol.iterator`属性，指向该对象的默认遍历器方法。

```javascript
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1; yield 2; yield 3;
};
[...myIterable] // [1, 2, 3]
```

对象进行`for...of`循环时，会调用`Symbol.iterator`方法，返回该对象的默认遍历器，详细介绍参见《Iterator 和 for...of 循环》一章。

```javascript
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) { yield this[i]; ++i; }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value); // 1 2
}
```

### 6.9 Symbol.toPrimitive

对象的`Symbol.toPrimitive`属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

`Symbol.toPrimitive`被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

-   Number：该场合需要转成数值
-   String：该场合需要转成字符串
-   Default：该场合可以转成数值，也可以转成字符串

```javascript
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number': return 123;
      case 'string': return 'str';
      case 'default': return 'default';
      default: throw new Error();
     }
   }
};
2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

### 6.10 Symbol.toStringTag

对象的`Symbol.toStringTag`属性，指向一个方法。在该对象上面调用`Object.prototype.toString`方法时，如果这个属性存在，它的返回值会出现在`toString`方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制`[object Object]`或`[object Array]`中`object`后面的那个字符串。

```javascript
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"
// 例二
class Collection { get [Symbol.toStringTag]() { return 'xxx'; } }
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

ES6 新增内置对象的`Symbol.toStringTag`属性值如下。

-   `JSON[Symbol.toStringTag]`：'JSON'
-   `Math[Symbol.toStringTag]`：'Math'
-   Module 对象`M[Symbol.toStringTag]`：'Module'
-   `ArrayBuffer.prototype[Symbol.toStringTag]`：'ArrayBuffer'
-   `DataView.prototype[Symbol.toStringTag]`：'DataView'
-   `Map.prototype[Symbol.toStringTag]`：'Map'
-   `Promise.prototype[Symbol.toStringTag]`：'Promise'
-   `Set.prototype[Symbol.toStringTag]`：'Set'
-   `%TypedArray%.prototype[Symbol.toStringTag]`：'Uint8Array'等
-   `WeakMap.prototype[Symbol.toStringTag]`：'WeakMap'
-   `WeakSet.prototype[Symbol.toStringTag]`：'WeakSet'
-   `%MapIteratorPrototype%[Symbol.toStringTag]`：'Map Iterator'
-   `%SetIteratorPrototype%[Symbol.toStringTag]`：'Set Iterator'
-   `%StringIteratorPrototype%[Symbol.toStringTag]`：'String Iterator'
-   `Symbol.prototype[Symbol.toStringTag]`：'Symbol'
-   `Generator.prototype[Symbol.toStringTag]`：'Generator'
-   `GeneratorFunction.prototype[Symbol.toStringTag]`：'GeneratorFunction'

### 6.11 Symbol.unscopables

对象的`Symbol.unscopables`属性，指向一个对象。该对象指定了使用`with`关键字时，哪些属性会被`with`环境排除。

```javascript
Array.prototype[Symbol.unscopables]
// {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, flat: true, flatMap: true, includes: true, keys: true, values: true}

Object.keys(Array.prototype[Symbol.unscopables])
// ["copyWithin", "entries", "fill", "find", "findIndex", "flat", "flatMap", "includes", "keys", "values"]
```

上面代码说明，数组有 7 个属性，会被`with`命令排除。

```javascript
// 没有 unscopables 时
class MyClass { foo() { return 1; } }
var foo = function () { return 2; };
with (MyClass.prototype) { foo(); }  // 1

// 有 unscopables 时
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() { return { foo: true }; }
}
var foo = function () { return 2; };
with (MyClass.prototype) { foo(); }  // 2
```

上面代码通过指定`Symbol.unscopables`属性，使得`with`语法块不会在当前作用域寻找`foo`属性，即`foo`将指向外层作用域的变量。



## 参考资料

[Symbol MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

[Symbol ES6 阮一峰](https://es6.ruanyifeng.com/?search=isArray&x=0&y=0#docs/symbol)