[[TOC]]

[TOC]



# Decorator 装饰器

Decorator 提案经过了大幅修改，目前还没有定案，不知道语法会不会再变。

装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。许多面向对象的语言都有这项功能，目前有一个[提案](https://github.com/tc39/proposal-decorators)将其引入了 ECMAScript。

装饰器是一种函数，写成`@ + 函数名`。它可以放在类和类方法的定义前面。

```javascript
@frozen class Foo {
  @configurable(false)
  @enumerable(true)
  method() {}

  @throttle(500)
  expensiveMethod() {}
}
```

上面代码一共使用了四个装饰器，一个用在类本身，另外三个用在类方法。它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能。

## 1. 类的装饰

装饰器可以用来装饰整个类。

```javascript
@testable
class MyTestableClass { }
function testable(target) {
  target.isTestable = true;
}
MyTestableClass.isTestable // true
```

上面代码中，`@testable`就是一个装饰器。它修改了`MyTestableClass`这个类的行为，为它加上了静态属性`isTestable`。`testable`函数的参数`target`是`MyTestableClass`类本身。

基本上，装饰器的行为就是下面这样。

```javascript
@decorator
class A {}

// 等同于
class A {}
A = decorator(A) || A;
```

也就是说，装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。

如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。

```javascript
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```

注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。

前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的`prototype`对象操作。

```javascript
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```

上面代码中，装饰器函数`testable`是在目标类的`prototype`对象上添加属性，因此就可以在实例上调用。

## 2. 类方法的装饰

装饰器不仅可以装饰类，还可以装饰类的属性。

```javascript
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
```

上面代码中，装饰器`readonly`用来装饰“类”的`name`方法。

装饰器函数`readonly`一共可以接受三个参数。

```javascript
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

装饰器第一个参数是类的原型对象，上例是`Person.prototype`，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时`target`参数指的是类本身）；第二个参数是所要装饰的属性名，第三个参数是该属性的描述对象。

另外，上面代码说明，装饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。

下面是另一个例子，修改属性描述对象的`enumerable`属性，使得该属性不可遍历。

```javascript
class Person {
  @nonenumerable
  get kidCount() { return this.children.length; }
}

function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}
```



## 3. 为什么装饰器不能用于函数？

装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。

```javascript
var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}
```

上面的代码，意图是执行后`counter`等于 1，但是实际上结果是`counter`等于 0。因为函数提升，使得实际执行的代码是下面这样。

```javascript
@add
function foo() {
}

var counter;
var add;

counter = 0;

add = function () {
  counter++;
};
```

总之，由于存在函数提升，使得装饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。

另一方面，如果一定要装饰函数，可以采用高阶函数的形式直接执行。

```javascript
function doSomething(name) {
  console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

const wrapped = loggingDecorator(doSomething);
```





## 参考资料

[ES6入门 装饰器 阮一峰](https://es6.ruanyifeng.com/#docs/decorator)