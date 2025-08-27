[[TOC]]

[TOC]



# Array 对象 - 新增方法

## 1. Array数组静态新增的方法

### 1.1 Array.from()类数组转数组

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象(array-like object)和可遍历(iterable)的对象(包括 ES6 新增的数据结构 Set 和 Map)。

`Array.from`还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。如果`map`函数里面用到了`this`关键字，还可以传入`Array.from`的第三个参数，用来绑定`this`。这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。

常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的`arguments`对象。`Array.from`都可以将它们转为真正的数组。

只要是部署了 Iterator 接口的数据结构，`Array.from`都能将其转为数组。

如果参数是一个真正的数组，`Array.from`会返回一个一模一样的新数组。

`Array.from()`的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于`\uFFFF`的 Unicode 字符，算作两个字符的 bug。

```js
let arrayLike = { '0': 'a', '1': 'b', '2': 'c', length: 3 };
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// 没有部署该方法的浏览器，可以用Array.prototype.slice方法替代
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();

// 对象是 DOM 操作返回的 NodeList对象
let ps = document.querySelectorAll('p');
let nodeList = Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo(a, b) {
  var args = Array.from(arguments);
  console.log('args: ', args)
}
foo(1, 2) //  [1, 2]

// 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组
// 字符串和 Set 结构都具有 Iterator 接口，因此可以被Array.from转为真正的数组
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组
Array.from([1, 2, 3]) // [1, 2, 3]

// 类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
// Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]

// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
Array.from([1, 2, 3], (x) => x * x)
// 等同于
Array.from([1, 2, 3]).map(x => x * x);

// 将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug
function countSymbols(string) {
  return Array.from(string).length;
}
```

### 1.2 Array.of()将一组值转为数组

Array.of方法用于将一组值，转换为数组。这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。`Array`方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，`Array()`才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

`Array.of`基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一。

```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
Array.of() // []
Array.of(undefined) // [undefined]

// Array方法没有参数、一个参数、三个参数时，返回结果都不一样
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

// Array.of方法可以用下面的代码模拟实现
function ArrayOf(){
  return [].slice.call(arguments);
}
```

## 2. 数组实例方法

### 2.1 copyWithin()指定成员复制到其他位置

数组实例的`copyWithin()`方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

它接受三个参数。

-   target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
-   start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
-   end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

这三个参数都应该是数值，如果不是，会自动转为数值。

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

### 2.2 find()找到第一个符合条件的成员

数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。该方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

`find`方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

```js
[1, 4, -5, 10].find((n) => n < 0)
// -5

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10

function f(v){ return v > this.age; }
let person = {name: 'John', age: 20};
// find函数接收了第二个参数person对象，回调函数中的this对象指向person对象
[10, 12, 26, 15].find(f, person);    // 26

// 
[NaN].indexOf(NaN)
// -1
```

### 2.3 findIndex()找到符合条件成员的位置

数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。参数与find()一样，第一个参数是回调函数，第二个参数用来绑定回调函数的`this`对象。

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2

// find和findIndex方法都可以发现NaN，弥补了数组的indexOf方法的不足
[NaN].indexOf(NaN)
// -1
[NaN].findIndex(y => Object.is(NaN, y))
// 0
```

### 2.4 fill()填充一个数组

`fill`方法使用给定值，填充一个数组。方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

```js
// fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
['a', 'b', 'c'].fill(7)
// [7, 7, 7]
new Array(3).fill(7)
// [7, 7, 7]

// 第二个和第三个参数，用于指定填充的起始位置和结束位置
// 从 1 号位开始，向原数组填充 7，到 2 号位之前结束
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```

### 2.5 遍历器entries()键值对，keys()键名 和 values()键值

ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象，可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

如果不使用`for...of`循环，可以手动调用遍历器对象的`next`方法，进行遍历。

```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

### 2.6 includes()是否包含给定的值

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。ES2016 引入了该方法。该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

没有该方法之前，我们通常使用数组的`indexOf`方法，检查是否包含某个值。`indexOf`方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于`-1`，表达起来不够直观。二是，它内部使用严格相等运算符（`===`）进行判断，这会导致对`NaN`的误判。

`includes`使用的是不一样的判断算法，就没有这个问题。

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

// 第二个参数表示搜索的起始位置，默认为0
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true

// indexOf 对NaN有误判
[NaN].indexOf(NaN) // -1
// includes使用的是不一样的判断算法，就没有这个问题
[NaN].includes(NaN) // true
```

下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。

```javascript
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
```

另外，Map 和 Set 数据结构有一个`has`方法，需要注意与`includes`区分。

-   Map 结构的`has`方法，是用来查找键名的，比如`Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
-   Set 结构的`has`方法，是用来查找值的，比如`Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。

### 2.7 flat()/flatMap()拉平数组

Array.prototype.flat()用于将多维数组转为一维数组，该方法返回一个新数组，对原数据没有影响。

`flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1。

如果不管有多少层嵌套，都要转成一维数组，可以用`Infinity`关键字作为参数。

如果原数组有空位，`flat()`方法会跳过空位。

```javascript
// 默认只展开一层数组
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

// 原数组有空位，flat()方法会跳过空位
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]

// 参数传Infinity，展开所有层级数组
[1, 2, [3, 4, [4, [5, [7]]]]].flat(Infinity)
// [1, 2, 3, 4, 4, 5, 7]
```

`flatMap()`方法对原数组的每个成员执行一个函数（相当于执行`Array.prototype.map()`），然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组。

`flatMap()`只能展开一层数组。

`flatMap()`方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

`flatMap()`方法还可以有第二个参数，用来绑定遍历函数里面的`this`。

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]

// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]

// 函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```

### 2.8 数组的空位

数组的空位指，数组的某一个位置没有任何值。比如，`Array`构造函数返回的数组都是空位。

注意，空位不是`undefined`，一个位置的值等于`undefined`，依然是有值的。空位是没有任何值，`in`运算符可以说明这一点。

由于空位的处理规则非常不统一，所以建议避免出现空位。

```js
Array(3) // [, , ,]

// 第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```

ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

-   `forEach()`, `filter()`, `reduce()`, `every()` 和`some()`都会跳过空位。
-   `map()`会跳过空位，但会保留这个值
-   `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。

```js
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```

ES6 则是明确将空位转为`undefined`。

-   `Array.from`方法会将数组的空位，转为`undefined`，也就是说，这个方法不会忽略空位。
-   扩展运算符（`...`）也会将空位转为`undefined`
-   `copyWithin()`会连空位一起拷贝
-   `fill()`会将空位视为正常的数组位置
-   `for...of`循环也会遍历空位
-   entries()、keys()、values()、find()和findIndex()会将空位处理成undefined

```js
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]

[...['a',,'b']]
// [ "a", undefined, "b" ]

[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

new Array(3).fill('a') // ["a","a","a"]

let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1

// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```





