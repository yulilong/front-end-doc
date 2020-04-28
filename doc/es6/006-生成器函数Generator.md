[[TOC]]

[TOC]



# 生成器函数Generator

## 1. Generator基本概念

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征:

>   一是，`function`关键字与函数名之间有一个星号；
>   二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }
hw.next() // { value: undefined, done: true }
```

上面代码定义了一个 Generator 函数`helloWorldGenerator`，它内部有两个`yield`表达式（`hello`和`world`），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

Generator 函数的调用方法与普通函数一样。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是迭代器对象（Iterator Object）。

下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。也就是说Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

上面代码中调用了五次`next`方法：

>   第一次：Generator 函数开始执行，遇到第一个`yield`表达式为止。`next`返回一个对象，`value`属性就是当前`yield`表达式的值`hello`，`done`属性的值为`false`，表示遍历还没有结束。
>   第二次：函数从上次`yield`表达式停下的位置一直执行到下一个`yield`表达式。`next`方法返回的对象与第一次类似。
>   第三次：函数从上次`yield`表达式停下的位置一直执行到下一个`return`语句(如果没有return，就执行到结束)。`next`方法返回的对象的`value`就是`return`语句的返回值(如果没有return语句，则value属性的值为`undefined`)，`done`属性的值`true`，表示遍历已经结束。
>   第四次：此时函数已经运行完毕，`next`方法返回对象的`value`属性为`undefined`，`done`属性为`true`。以后再调用`next`方法，返回的都是这个值。

## 2. yield表达式

由于 Generator 函数返回的遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`表达式就是暂停标志。

需要注意的是，`yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。

```js
function* f() { console.log('执行了！') }
var generator = f();
// 函数f是一个 Generator 函数，只有调用next方法时，函数f才会执行。
setTimeout(function () { generator.next() }, 2000);
```

`yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。

```js
(function (){ yield 1; })()
// SyntaxError: Unexpected number
```

另外，`yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。`yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

```js
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError
  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```

## 3. next 方法的参数

`yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

注意，由于`next`方法的参数表示上一个`yield`表达式的返回值，所以在第一次使用`next`方法时，传递参数是无效的。V8 引擎直接忽略第一次使用`next`方法时的参数，只有从第二次使用`next`方法开始，参数才是有效的。从语义上讲，第一个`next`方法用来启动遍历器对象，所以不用带有参数。

这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

上面a对象第二次运行`next`方法的时候不带参数，导致 y 的值等于`2 * undefined`(即NaN),除以3以后还是NaN，所以返回的value的值是NaN。第三次运行`next`方法不带参数，所以 z 等于`undefined`，返回的value属性等于`5 + NaN + undefined`，即NaN。

上面 b 对象`next`方法提供了参数，结果就不一样，第二次调用`next`方法，将上一次`yield`表达式的值设为12，一次y等于24，返回`y / 3`的值8；第三次调用`next`方法，将上一次`yield`表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42.

## 4. for...of 循环

`for...of`循环可以自动遍历 Generator 函数运行时生成的`Iterator`对象，且此时不再需要调用`next`方法。这里需要注意，一旦`next`方法的返回对象的`done`属性为`true`，`for...of`循环就会中止，且不包含该返回对象。

```js
function* foo() {
  yield 1; yield 2; yield 3; yield 4; yield 5;
  return 6;
}
for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5

```

下面是一个利用 Generator 函数和`for...of`循环，实现斐波那契数列的例子。

```js
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}
for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```

除了`for...of`循环以外，扩展运算符（`...`）、解构赋值和`Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

```js
function* numbers () {
  yield 1;
  yield 2;
  return 3;
  yield 4;
}
// 扩展运算符
[...numbers()] // [1, 2]
// Array.from 方法
Array.from(numbers()) // [1, 2]
// 解构赋值
let [x, y] = numbers();
x // 1
y // 2
// for...of 循环
for (let n of numbers()) {
  console.log(n) // 1 2
}
```

## 5. Generator.prototype.throw()

Generator 函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。`throw`方法可以接受一个参数，该参数会被`catch`语句接收，建议抛出`Error`对象的实例。

如果 Generator 函数内部没有部署`try...catch`代码块，那么`throw`方法抛出的错误，将被外部`try...catch`代码块捕获。如果 Generator 函数内部和外部，都没有部署`try...catch`代码块，那么程序将报错，直接中断执行。

一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用`next`方法，将返回一个`value`属性等于`undefined`、`done`属性等于`true`的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

```js
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

上面代码中，遍历器对象`i`连续抛出两个错误。第一个错误被 Generator 函数体内的`catch`语句捕获。`i`第二次抛出错误，由于 Generator 函数内部的`catch`语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的`catch`语句捕获。

`throw`方法抛出的错误要被内部捕获，前提是必须至少执行过一次`next`方法。

`throw`方法被捕获以后，会附带执行下一条`yield`表达式。也就是说，会附带执行一次`next`方法。

```js
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) { }
  yield console.log('b');
  yield console.log('c');
}
var g = gen();
g.next() // a
g.throw() // b
g.next() // c
```

上面代码中，`g.throw`方法被捕获以后，自动执行了一次`next`方法，所以会打印`b`。另外，也可以看到，只要 Generator 函数内部部署了`try...catch`代码块，那么遍历器的`throw`方法抛出的错误，不影响下一次遍历。

## 6. Generator.prototype.return()

Generator 函数返回的遍历器对象，还有一个`return`方法，可以返回给定的值，并且终结遍历 Generator 函数。

```js
function* gen() { yield 1; yield 2; yield 3; }
var g = gen();
g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

上面代码中，遍历器对象`g`调用`return`方法后，返回值的`value`属性就是`return`方法的参数`foo`。并且，Generator 函数的遍历就终止了，返回值的`done`属性为`true`，以后再调用`next`方法，`done`属性总是返回`true`。

如果`return`方法调用时，不提供参数，则返回值的`value`属性为`undefined`。

```javascript
function* gen() { yield 1; yield 2; yield 3; }
var g = gen();
g.next()        // { value: 1, done: false }
g.return() // { value: undefined, done: true }
```

如果 Generator 函数内部有`try...finally`代码块，且正在执行`try`代码块，那么`return`方法会导致立刻进入`finally`代码块，执行完以后，整个函数才会结束。

```javascript
function* numbers () {
  yield 1;
  try { yield 2; yield 3; } 
  finally { yield 4; yield 5; }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

上面代码中，调用`return()`方法后，就开始执行`finally`代码块，不执行`try`里面剩下的代码了，然后等到`finally`代码块执行完，再返回`return()`方法指定的返回值。

## 7. next()、throw()、return() 的共同点

`next()`、`throw()`、`return()`这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式。

`next()`是将`yield`表达式替换成一个值。

`throw()`是将`yield`表达式替换成一个`throw`语句。

`return()`是将`yield`表达式替换成一个`return`语句。

```js
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y 替换成 let result = 1;

gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));

gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

## 8. yield* 表达式

ES6 提供了`yield*`表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。`yield*`后面的 Generator 函数（没有`return`语句时），等同于在 Generator 函数内部，部署一个`for...of`循环。

```js
function* foo() { yield 'a'; yield 'b'; }
function* bar() { yield 'x'; yield* foo(); yield 'y'; }

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x" "a" "b" "y"
```

如果`yield*`后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。实际上，任何数据结构只要有 Iterator 接口，就可以被`yield*`遍历。

```js
function* gen(){ yield* ["a", "b", "c"]; }
gen().next() // { value:"a", done:false }

let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();
read.next().value // "hello"
read.next().value // "h"

```

如果被代理的 Generator 函数有`return`语句，那么就可以向代理它的 Generator 函数返回数据。

```js
function* foo() { yield 2; yield 3; return "foo"; }
function* bar() {
  yield 1;
  var v = yield* foo();
  console.log("v: " + v);
  yield 4;
}

var it = bar();
it.next() // {value: 1, done: false}
it.next() // {value: 2, done: false}
it.next() // {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next() // {value: undefined, done: true}
```

上面代码在第四次调用`next`方法的时候，屏幕上会有输出，这是因为函数`foo`的`return`语句，向函数`bar`提供了返回值。











## 参考资料

[Generator 函数的语法 ES6 阮一峰](https://es6.ruanyifeng.com/?search=isArray&x=0&y=0#docs/generator)

