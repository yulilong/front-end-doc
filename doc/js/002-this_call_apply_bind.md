[[toc]]

[TOC]

# this、call、apply、bind

## 1. 什么是this

使用this会返回一个对象。也就是说：this就是属性或方法当前所在的对象。

由于对象的属性可以赋值(复制一份)给另一个对象,所以属性所在的当前对象是可变，即this的指向是可变的：

```javascript
var A = {
  name: 'jack',
  say: function() {console.log('hello ' + this.name)}
};
var B = {name: 'aimi'}
B.t = A.say;
B.t()	// "hello aimi"
```

A.say属性赋值给B.t,所以this.name就指向B.name,类似于下面：

```javascript
var f = function() {console.log('hello ' + this.name)}
var B = {name: 'aimi'}
B.t = f;
B.t()
```

只要函数被赋给另一个变量，`this`的指向就会变:

```javascript
var A = {
  name: 'jack',
  say: function() {console.log('hello ' + this.name)}
};
var name = 'huawei'
var tmp = A.say;
tmp()	// hello huawei
```

在JavaScript语言中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是函数运行时所在的对象(环境)。

## 2. 不同环境下this的指向

### 2.1 全局环境：this指向顶层对象window

### 2.2 构造函数：this指向实例对象

### 2.3 对象的方法中(a.b.c()):this指向a.b

如果对象的方法里面包含this，那么this指向的就是方法运行时所在的对象。该方法赋值(复制)给另一个对象，就会改变this的指向。

```javascript
var obj ={
  foo: function () { console.log(this); }
};
// obj.foo方法执行时，它内部的this指向obj。
obj.foo() // obj
```

但，下面这几种用法都会改变this的指向：

```javascript
// 情况一
(obj.foo = obj.foo)() // window
// 情况二
(false || obj.foo)() // window
// 情况三
(1, obj.foo)() // window
```

`obj.foo`就是一个值，这个值真正调用的时候，运行环境已经不是`obj`了，而是全局环境，所以this不在指向`obj`。

可以这样理解，`obj`和`obj.foo`储存在两个内存地址，称为地址一和地址二。`obj.foo()`这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，`this`指向`obj`。但是，上面三种情况，都是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此`this`指向全局环境。上面三种情况等同于下面的代码。

```javascript
// 情况一
(obj.foo = function () {
  console.log(this);
})()
// 等同于
(function () {
  console.log(this);
})()

// 情况二
(false || function () {
  console.log(this);
})()

// 情况三
(1, function () {
  console.log(this);
})()
```



## 3. 使用this注意点

### 3.1 避免多层this

由于`this`的指向是不确定的，所以切勿在函数中包含多层的`this`。

```javascript
var o = {
  f1: function () {
    console.log(this);
    var f2 = function () { console.log(this); }();
  }
}
o.f1()
// Object
// Window
// 上面代码包含两层this，结果运行后，第一层指向对象o，第二层指向全局对象，因为实际执行的是下面的代码。
var temp = function () {
  console.log(this);
};
var o = {
  f1: function () { console.log(this); var f2 = temp(); }
}

// 解决方法是在第二层改用一个指向外层this的变量。
var o = {
  f1: function() {
    console.log(this); var that = this;
    var f2 = function() { console.log(that); }();
  }
}
```

JavaScript 提供了严格模式，也可以硬性避免这种问题。严格模式下，如果函数内部的`this`指向顶层对象，就会报错。

### 3.2 避免数组处理方法中的this

数组的`map`和`foreach`方法，允许提供一个函数作为参数。这个函数内部不应该使用`this`。

```javascript
var o = {
  v: 'hello', p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) { console.log(this.v + ' ' + item); });
  }
}
o.f()
// undefined a1
// undefined a2
```

上面代码中，`foreach`方法的回调函数中的`this`，其实是指向`window`对象，因此取不到`o.v`的值。原因跟上一段的多层`this`是一样的，就是内层的`this`不指向外部，而指向顶层对象。

解决这个问题的一种方法，就是前面提到的，使用中间变量固定`this`。

```javascript
var o = {
  v: 'hello', p: [ 'a1', 'a2' ],
  f: function f() {
    var that = this;
    this.p.forEach(function (item) { console.log(that.v+' '+item); });
  }
}
o.f()
// hello a1
// hello a2

// 另一种方法是将this当作foreach方法的第二个参数，固定它的运行环境。
var o = {
  v: 'hello', p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) { console.log(this.v + ' ' + item); }, this);
  }
}
o.f()
// hello a1
// hello a2
```

### 3.3 避免回调函数中的this

回调函数中的`this`往往会改变指向，最好避免使用。

```javascript
var o = new Object();
o.f = function () { console.log(this === o); }
// jQuery 的写法
$('#button').on('click', o.f);
```

上面代码中，点击按钮以后，控制台会显示`false`。原因是此时`this`不再指向`o`对象，而是指向按钮的 DOM 对象，因为`f`方法是在按钮对象的环境中被调用的。这种细微的差别，很容易在编程中忽视，导致难以察觉的错误。

为了解决this不定问题，可以使用一些方法对this进行绑定，也就是固定this指向，减少不确定性。

## 4. 绑定this的方法

this的动态切换，为JavaScript带来了巨大的灵活性，但也使得编程变得困难和模糊。

有时需要把this固定下来，免得出现意外情况。

JavaScript提供了call、apply、bind三个方法来切换/固定this的指向。

### 4.1 Function.prototype.call()

函数实例的call方法，可以指定函数内部this的指向(函数执行时所在的作用域)，然后在指定的作用域中，调用该函数。

- call方法会立即执行函数


- `call`方法的参数，应该是一个对象。如果参数为空、`null`和`undefined`，则默认传入全局对象。
- call方法第一个参数如果是原始类型，则会自动转成对应的包装对象，然后传入call方法中
- `call`方法还可以接受多个参数,第一个参数就是`this`所要指向的那个对象，后面的参数则是函数调用时所需的参数。
- `call`方法的一个应用是调用对象的原生方法。

```javascript
var n = 123;
var obj = { n: 456 };
function a() { console.log(this.n); }
a.call() 		// 123
a.call(null) 	// 123
a.call(undefined) // 123
a.call(window) 	// 123
a.call(obj) 	// 456
var f = function () { return this; };
// 传入了原始类型，自动转为对象。
f.call(5)		// Number {5}

var obj = {};
obj.hasOwnProperty('toString') // false
// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () { return true; };
obj.hasOwnProperty('toString') // true
// 将hasOwnProperty方法的原始定义放到obj对象上执行，这样无论obj上有没有同名方法，都不会影响结果。
Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```



### 4.2 Function.prototype.apply()

`apply`方法的作用与`call`方法类似，也是改变`this`指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数。

`apply`方法的第一个参数也是`this`所要指向的那个对象，如果设为`null`或`undefined`，则等同于指定全局对象。第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。原函数的参数，在`call`方法中必须一个个添加，但是在`apply`方法中，必须以数组形式添加。

```javascript
function f(x, y){ console.log(x + y); }
f.call(null, 1, 1) 		// 2
f.apply(null, [1, 1]) 	// 2
```

利用apply使用数组作为函数参数这一点可以做一些事情：

- 找出数组最大元素

  JS不提供找数组最大元素的函数，使用Math.max和apply方法，就可以返回数组的最大元素：

- 将数组的空元素变为undefined

  空元素与`undefined`的差别在于，数组的`forEach`方法会跳过空元素，但是不会跳过`undefined`。因此，遍历内部元素的时候，会得到不同的结果。

- 转换类似数组的对象

  这个方法起作用的前提是，被处理的对象必须有`length`属性，以及相对应的数字键。

  ```javascript
  var a = [8, 3, 4, 15, 400];
  Math.max.apply(null, a) // 400
  Array.apply(null, ['a', ,'b'])	// [ 'a', undefined, 'b' ]
  Array.prototype.slice.apply({0: 1, length: 1}) // [1]
  ```


### 4.3 Function.prototype.bind() 

bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。

```javascript
var d = new Date();
d.getTime() // 1524842071860
var print = d.getTime;
print() // Uncaught TypeError: this is not a Date object.
var print = d.getTime.bind(d);
print() // 1524842071860
```

上面的例子中getTime方法内部的this绑定了Data对象的实例，所以会报错，使用bind方法将`getTime`方法内部的`this`绑定到`d`对象，这时就可以安全地将这个方法赋值给其他变量了。

也可以绑到其他对象上：

```javascript
var counter = {
  count: 0,
  add: function () { this.count++; }
};
var fun = counter.add.bind(counter);
fun();
counter.count // 1

var counter = {
  count: 0,
  inc: function () { this.count++; }
};
var obj = { count: 100 };
var func = counter.inc.bind(obj);
func();
obj.count // 101
```

`bind`还可以接受更多的参数，将这些参数绑定原函数的参数。

```javascript
var add = function (x, y) { return x * this.m + y * this.n; }
var obj = { m: 2, n: 2 };
var newAdd = add.bind(obj, 5);
newAdd(5) // 20
```

上面代码中，`bind`方法除了绑定`this`对象，还将`add`函数的第一个参数`x`绑定成`5`，然后返回一个新函数`newAdd`，这个函数只要再接受一个参数`y`就能运行了。

如果`bind`方法的第一个参数是`null`或`undefined`，等于将`this`绑定到全局对象，函数运行时`this`指向顶层对象（浏览器为`window`）。

#### 4.3.1 使用bind方法注意事项



1. bind方法不执行函数，会返回一个新函数

   由于bind方法每次返回一个新函数，所以有的地方需要注意：如监听事件的时候，如果需要取消绑定，那么就需要把bind返回的函数赋值给一个变量，然后在绑定：

   ```javascript
   var listener = o.m.bind(o);
   element.addEventListener('click', listener);	// 绑定事件
   element.removeEventListener('click', listener);	// 取消绑定
   ```

2. 回调函数使用bind解决this指向问题

   回调函数中如果有this，那么执行回调函数后，this的指向就会改变，可使用bind方法将this绑定：

   ```javascript
   var counter = {
     count: 0,
     inc: function () { this.count++; }
   };
   function callIt(callback) { callback(); }
   callIt(counter.inc.bind(counter));
   counter.count // 1
   ```

   上面代码中，`callIt`方法会调用回调函数。这时如果直接把`counter.inc`传入，调用时`counter.inc`内部的`this`就会指向全局对象。使用`bind`方法将`counter.inc`绑定`counter`以后，就不会有这个问题，`this`总是指向`counter`。

   还有在数组中方法中的回调函数this指向也会改变：

   ```javascript
   var obj = {
     name: '张三', times: [1, 2, 3],
     print: function () {
       this.times.forEach(function (n) { console.log(this.name); });
     }
   };
   obj.print()	// 什么也没有， 数组回调函数里面的this指向Window
   
   obj.print = function () {
     this.times.forEach(function (n) { console.log(this.name); }.bind(this));
   };
   obj.print()	// 张三
   ```

   `obj.print`内部`this.times`的`this`是指向`obj`的，这个没有问题。但是，`forEach`方法的回调函数内部的`this.name`却是指向全局对象，导致没有办法取到值。可通过bind绑定。

  

## 参考资料



[this关键字 阮一峰](http://javascript.ruanyifeng.com/oop/this.html)