[[TOC]]

[TOC]



# Iterator 和 for...of 循环

Iterator有的翻译成迭代器，有的翻译成遍历器。

## 1.Iterator(迭代器)的概念

JS原有的表示"集合"的数据结构，主要是数组Array和对象Object，ES6又添加了`Map`和`Set`。用户还可以组合使用他们，这样就需要一种统一的接口机制，来处理所有不同的数据结构。

迭代器(Iterator)就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：

>   一是为各种数据结构，提供一个统一的、简便的访问接口；
>   二是使得数据结构的成员能够按某种次序排列；
>   三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

Iterator 的遍历过程是这样的:

>   （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
>   （2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
>   （3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
>   （4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。

```js
var it = makeIterator(['a', 'b']);
it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
// 对于遍历器对象来说，done: false和value: undefined属性都是可以省略的，因此上面的makeIterator函数可以简写成下面的形式。
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ? {value: array[nextIndex++]} : {done: true};
    }
  };
}
```

## 2. 默认 Iterator 接口

Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可迭代的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个迭代器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值。

```js
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () { return { value: 1, done: true }; }
    };
  }
};
```

上面代码中，对象`obj`是可遍历的（iterable），因为具有`Symbol.iterator`属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有`next`方法。每次调用`next`方法，都会返回一个代表当前成员的信息对象，具有`value`和`done`两个属性。

ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`属性（详见下文），另外一些数据结构没有（比如对象）。调用这个接口，就会返回一个遍历器对象。

原生具备 Iterator 接口的数据结构如下。

Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象

-   Set
-   String
-   TypedArray
-   函数的 arguments 对象
-   NodeList 对象

下面的例子是数组的`Symbol.iterator`属性。

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

上面代码中，变量`arr`是一个数组，原生就具有遍历器接口，部署在`arr`的`Symbol.iterator`属性上面。所以，调用这个属性，就得到遍历器对象。

对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

下面是另一个为对象添加 Iterator 接口的例子。

```javascript
class RangeIterator {
  constructor(start, stop) { this.value = start; this.stop = stop; }
  [Symbol.iterator]() { return this; }
  next() {
    var value = this.value;
    if (value < this.stop) { this.value++; return {done: false, value: value}; }
    return {done: true, value: undefined};
  }
}
function range(start, stop) { return new RangeIterator(start, stop); }
for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
```

对于类似数组的对象（存在数值键名和`length`属性），部署 Iterator 接口，有一个简便方法，就是`Symbol.iterator`方法直接引用数组的 Iterator 接口。

```javascript
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
[...document.querySelectorAll('div')] // 可以执行了
```

NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。上面代码中，我们将它的遍历接口改成数组的`Symbol.iterator`属性，可以看到没有任何影响。

## 3. 调用 Iterator 接口的场合

有一些场合会默认调用 Iterator 接口（即`Symbol.iterator`方法），除了下文会介绍的`for...of`循环，还有几个别的场合。

### 3.1 解构赋值

对数组和 Set 结构进行解构赋值时，会默认调用`Symbol.iterator`方法。

```javascript
let set = new Set().add('a').add('b').add('c');
let [x,y] = set; // x='a'; y='b'
let [first, ...rest] = set; // first='a'; rest=['b','c'];
```

### 3.2 扩展预算符

扩展运算符（...）也会调用默认的 Iterator 接口。

```javascript
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

上面代码的扩展运算符内部就调用 Iterator 接口。

实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。

```javascript
let arr = [...iterable];
```

### 3.3 yield\*

`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```javascript
let generator = function* () {
  yield 1; yield* [2,3,4]; yield 5;
};
var iterator = generator();
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

### 3.4 其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

-   for...of
-   Array.from()
-   Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
-   Promise.all()
-   Promise.race()

## 4. 字符串的 Iterator 接口

字符串是一个类似数组的对象，也原生具有 Iterator 接口。

```javascript
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"
var iterator = someString[Symbol.iterator]();
iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

上面代码中，调用`Symbol.iterator`方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。

可以覆盖原生的`Symbol.iterator`方法，达到修改遍历器行为的目的。

```javascript
var str = new String("hi");
[...str] // ["h", "i"]
str[Symbol.iterator] = function() {
  return {
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else { return { done: true }; }
    },
    _first: true
  };
};

[...str] // ["bye"]
str // "hi"
```

上面代码中，字符串 str 的`Symbol.iterator`方法被修改了，所以扩展运算符（`...`）返回的值变成了`bye`，而字符串本身还是`hi`。

## 5. 迭代器对象的return(),throw()

遍历器对象除了具有`next`方法，还可以具有`return`方法和`throw`方法。如果你自己写遍历器对象生成函数，那么`next`方法是必须部署的，`return`方法和`throw`方法是否部署是可选的。

`return`方法的使用场合是，如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句），就会调用`return`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return`方法。

```js
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() { return { done: false }; },
        return() { file.close(); return { done: true }; }
      };
    },
  };
}
```

上面代码中，函数`readLinesSync`接受一个文件对象作为参数，返回一个遍历器对象，其中除了`next`方法，还部署了`return`方法。下面的两种情况，都会触发执行`return`方法。

```js
// 情况一
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}
// 情况二
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
```

上面代码中，情况一输出文件的第一行以后，就会执行`return`方法，关闭这个文件；情况二会在执行`return`方法关闭文件之后，再抛出错误。

注意，`return`方法必须返回一个对象，这是 Generator 规格决定的。

`throw`方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。

## 6. for...of 循环

**`for...of`语句**在[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/iterable)（包括 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)，[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Map)，[`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)，[`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments) 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

```js
const array1 = ['a', 'b', 'c'];
for (const element of array1) {
  console.log(element); // "a" "b" "c"
}
```

语法：

>   for(variable of iterable) {  }
>   variable：在每次迭代中，将不同属性的值分配给变量。
>   iterable：被迭代枚举其属性的对象。

### 6.1 迭代Array

数组原生具备`iterator`接口（即默认部署了`Symbol.iterator`属性），`for...of`循环本质上就是调用这个接口产生的遍历器。

`for...of`循环可以代替数组实例的`forEach`方法。

```js
const arr = ['red', 'green', 'blue'];
for(let v of arr) {
  console.log(v); // red green blue
}
arr.forEach(function (element, index) {
  console.log(element); // red green blue
  console.log(index);   // 0 1 2
});
```

### 6.2 for.of和for.in区别

JS原有的`for...in`循环，只能获得对象的键名，不能直接获取键值。ES6 提供`for...of`循环，允许遍历获得键值。

`for...of`数组的遍历器接口只返回具有数字索引的属性。这一点跟`for...in`循环也不一样。

```js
let arr = [3, 5, 7];
arr.foo = 'hello';
for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}
// for...of循环不会返回数组arr的foo属性。
for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```

### 6.3 Set 和 Map 结构

Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用`for...of`循环。

值得注意的地方有两个，首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。

```js
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262
```

### 6.4 类似数组对象：字符串、DOM集合、`arguments`对象

类似数组的对象包括好几类。下面是`for...of`循环用于字符串、DOM NodeList 对象、`arguments`对象的例子。

```js
// 字符串
let str = "hello";
for (let s of str) {
  console.log(s); // h e l l o
}
// 对于字符串来说，for...of循环还有一个特点，就是会正确识别 32 位 UTF-16 字符。
for (let x of 'a\uD83D\uDC0A') {
  console.log(x); // 'a' '\uD83D\uDC0A'
}

// DOM NodeList对象
let paras = document.querySelectorAll("p");
for (let p of paras) {
  p.classList.add("test");
}

// arguments对象
function printArgs() {
  for (let x of arguments) { console.log(x); }
}
printArgs('a', 'b');
// 'a'
// 'b'
```

并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用`Array.from`方法将其转为数组。

```js
let arrayLike = { length: 2, 0: 'a', 1: 'b' };
// 报错
for (let x of arrayLike) { console.log(x); }
// 正确
for (let x of Array.from(arrayLike)) { console.log(x); }
```



## 参考资料

[Iterator 和 for...of 循环 ES6 阮一峰](https://es6.ruanyifeng.com/?search=isArray&x=0&y=0#docs/iterator)

[for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

