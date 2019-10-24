[[TOC]]

[TOC]

# ES6模块import_export

## 1. 介绍



## 2. 实际使用例子



```javascript
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
// 使用 firstName
import {firstName, lastName, year} from './profile.js';
// 直接使用 pro.year 
import * as pro from './profile.js';

var a = 'Michael';
var b = 'Jackson';
var c = 1958;
export {a, b, c};
// 使用
import { a, b, c} from './profile.js';

// 导出重命名
var b = 'Jacksonffffffffff';
export function f() {};	导出函数
export {b as big}
import { big} from './profile.js';


// export default

```

`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的`import`命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。



- import

import后变量都是只读的，不允许在加载模块的脚本里面，改写接口。但是，如果是一个对象，改写属性是允许的。

如果多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次。



## 3. export default

使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```javascript
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句。

```javascript
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

上面代码中，`export default a`的含义是将变量`a`的值赋给变量`default`。所以，最后一种写法会报错。

同样地，因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。





## 参考资料

[Module 的语法 ES6阮一峰](http://es6.ruanyifeng.com/#docs/module)

