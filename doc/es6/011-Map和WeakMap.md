[[TOC]]

[TOC]



# Map和WeakMap



## 1. Map基本用法

JS的对象，本质上值键值对的集合(Hash结构)，但是键只能是字符串，这给它的使用带来了很大限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```js
var e = {a: 10}
var data = {}
// 由于对象只接受字符串作为键名，所以e被自动转为字符串[object Object]
data[e] = 300
data // {[object Object]: 200}

const m = new Map();
const o = {p: 'Hello World'};
// 向 Map 添加成员
m.set(o, 'content')
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作`Map`构造函数的参数。这就是说，`Set`和`Map`都可以用来生成新的 Map。

```js
const map = new Map([ ['name', '张三'], ['title', 'Author'] ]);
// 相当于
// items = [ ['name', '张三'], ['title', 'Author'] ];
// const map = new Map();
// items.forEach( ([key, value]) => map.set(key, value) );
map.size // 2
map.has('name') // true
map.get('name') // "张三"

const set = new Set([ ['foo', 1], ['bar', 2] ]);
const m1 = new Map(set);
m1.get('foo') // 1
const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```

如果对同一个键多次赋值，后面的值将覆盖前面的值。如果读取一个未知的键，则返回`undefined`。

```js
var map = new Map();
map.set(1, 'aaa').set(1, 'bbb');
map.get(1) // "bbb"
map.get('asfddfsasadf') // undefined
```

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。同理，同样的值的两个实例，在 Map 结构中被视为两个键。

由上可知，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，`undefined`和`null`也是两个不同的键。虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。

```js
// 同样的值的两个实例，在 Map 结构中被视为两个键
var map = new Map(); var k1 = ['a']; var k2 = ['a'];
map .set(k1, 111) .set(k2, 222);
map.get(k1) // 111
map.get(k2) // 222

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123
```

## 2. Map实例的属性和操作方法



### 2.1 size属性

`size`属性返回 Map 结构的成员总数。

```javascript
var map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2
```

### 2.2 Map.prototype.set(key, value)

`set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。`set`方法返回的是当前的`Map`对象，因此可以采用链式写法。

```javascript
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
```

### 2.3 Map.prototype.get(key)

`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

```javascript
var m = new Map();
var hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数
m.get(hello)  // Hello ES6!
```

### 2.4 Map.prototype.has(key)

`has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

```javascript
var m = new Map();
m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
```

### 2.5 Map.prototype.delete(key)

`delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。

```javascript
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false
```

### 2.6 Map.prototype.clear()

`clear`方法清除所有成员，没有返回值。

```javascript
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

## 3. Map遍历方法

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

-   `Map.prototype.keys()`：返回键名的遍历器。
-   `Map.prototype.values()`：返回键值的遍历器。
-   `Map.prototype.entries()`：返回所有成员的遍历器。
-   `Map.prototype.forEach()`：遍历 Map 的所有成员。

需要特别注意的是，Map 的遍历顺序就是插入顺序。Map 结构的默认遍历器接口（`Symbol.iterator`属性），就是`entries`方法。

```js
var map = new Map([ ['F', 'no'], ['T',  'yes'], ]);

for (let key of map.keys()) { console.log(key); }
// "F" "T"
for (let value of map.values()) { console.log(value); }
// "no" "yes"
for (let [key, value] of map.entries()) { console.log(key, value); }
// "F" "no"  "T" "yes"
// 等同于使用map.entries()
for (let [key, value] of map) { console.log(key, value); }
// "F" "no" "T" "yes"

map[Symbol.iterator] === map.entries
// true


// 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
var map0 = new Map() .set(1, 'a') .set(2, 'b') .set(3, 'c');
var map1 = new Map([...map0].filter(([k, v]) => k < 3) );
// 产生 Map 结构 {1 => 'a', 2 => 'b'}
var map2 = new Map( [...map0].map(([k, v]) => [k * 2, '_' + v]) );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

此外，Map 还有一个`forEach`方法，与数组的`forEach`方法类似，也可以实现遍历。`forEach`方法还可以接受第二个参数，用来绑定`this`。

```js
var map = new Map() .set(1, 'a') .set(2, 'b') .set(3, 'c');
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
const reporter = {
  report: function(key, value) { console.log("Key: %s, Value: %s", key, value); }
};
map.forEach(function(value, key, map) { this.report(key, value); }, reporter);
```

## 4. Map与其他数据结构的互相转换

### 4.1 Map转为数组

Map 转为数组最方便的方法，就是使用扩展运算符（`...`）。

```javascript
var myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

### 4.2 数组转为Map

将数组传入 Map 构造函数，就可以转为 Map。

```javascript
new Map([ [true, 7], [{foo: 3}, ['abc']] ])
// Map(2) {true => 7, {…} => Array(1)}
```

### 4.3 Map转为对象

如果所有 Map 的键都是字符串，它可以无损地转为对象。Map如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) { obj[k] = v; }
  return obj;
}
var myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

### 4.4 对象转为Map

对象转为 Map 可以通过`Object.entries()`。

```javascript
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```

此外，也可以自己实现一个转换函数。

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) { strMap.set(k, obj[k]); }
  return strMap;
}
objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

### 4.5 Map 转为 JSON

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```javascript
function strMapToJson(strMap) { return JSON.stringify(strMapToObj(strMap)); }

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```javascript
function mapToArrayJson(map) { return JSON.stringify([...map]); }

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

### 4.6 JSON 转为 Map

JSON 转为 Map，正常情况下，所有键名都是字符串。

```javascript
function jsonToStrMap(jsonStr) { return objToStrMap(JSON.parse(jsonStr)); }

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

```javascript
function jsonToMap(jsonStr) { return new Map(JSON.parse(jsonStr)); }

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## 5. WeakMap

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。`WeakMap`与`Map`的区别有两点。

首先，`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

其次，`WeakMap`的键名所指向的对象，不计入垃圾回收机制。

`WeakMap`的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

总之，`WeakMap`的专用场合就是，它的键所对应的对象，可能会在将来消失。`WeakMap`结构有助于防止内存泄漏。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

```javascript
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```

上面代码中，键值`obj`是正常引用。所以，即使在 WeakMap 外部消除了`obj`的引用，WeakMap 内部的引用依然存在。

## 6. WeakMap语法

WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有`keys()`、`values()`和`entries()`方法），也没有`size`属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持`clear`方法。因此，`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

```javascript
const wm = new WeakMap();

// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined
```

## 7. WeakMap 的用途

前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子。

```javascript
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
```

上面代码中，`document.getElementById('logo')`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

WeakMap 的另一个用处是部署私有属性。

```javascript
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```

上面代码中，`Countdown`类的两个内部属性`_counter`和`_action`，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。







## 参考资料

[Map MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

[WeakMap MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

[Set 和 Map 数据结构 ES6 阮一峰](https://es6.ruanyifeng.com/?search=isArray&x=0&y=0#docs/set-map)