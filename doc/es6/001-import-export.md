[[TOC]]

[TOC]

# import export

## 1. 介绍



## 2. export 导出

[导出（export） MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)

在创建JavaScript模块时，`export` 语句用于从模块中导出函数、对象或原始值，以便其他程序可以通过 [`import`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import) 语句使用它们。无论您是否声明，导出的模块都处于[`严格模式`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)。 export语句不能用在嵌入式脚本中。

`export`命令可以出现在模块的任何位置，只要处于模块顶层作用域就可以。如果处于块级作用域内，就会报错，下一节的`import`命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

存在两种 exports 导出方式：

- 命名导出（每个模块包含任意数量）
- 默认导出（每个模块包含一个）

```js
// 每个变量单独导出
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}

// 统一导出
let name1, name2, …, nameN
export { name1, name2, …, nameN };

// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };

// 解构导出并重命名
export const { name1, name2: bar } = o;

// 默认导出
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };
```

### 2.1 export default 默认导出

使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```javascript
// modules.js
function add(x, y) { return x * y; }
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
export var a = 1; // 正确
var b = 1;
export default b; // 正确
export default var c = 1; // 错误
```

上面代码中，`export default a`的含义是将变量`a`的值赋给变量`default`。所以，最后一种写法会报错。

同样地，因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。

## 3. import 导入

静态的`import` 语句用于导入由另一个模块导出的绑定。无论是否声明，导入的模块都运行在严格模式下。在浏览器中，`import` 语句只能在声明了 `type="module"` 的 `script` 的标签中使用。

- 静态型的 `import` 是初始化加载依赖项的最优选择，使用静态 `import` 更容易从代码静态分析工具和 [tree shaking](https://developer.mozilla.org/zh-CN/docs/Glossary/Tree_shaking) 中受益。
- import后变量都是只读的，不允许在加载模块的脚本里面，改写接口。但是，如果是一个对象，改写属性是允许的。
- 如果多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次。

```js
// 导出文件：/modules/my-module.js文件
export function cube(x) { return x * x * x; }
export const foo = Math.PI + Math.SQRT2;
const name = 'export'
export { name };
export default '我是默认导出的'

// 导入文件写法
// 导入整个模块的内容，这将myModule插入当前作用域，其中包含来自位于/modules/my-module.js文件中导出的所有接口。
import * as myModule from '/modules/my-module.js';
console.log(myModule)
// {cube: [Function: cube], default: '我是默认导出的', foo: 4.555, name: 'export'}
myModule.cube(5)
// 导入单个、多个
import {cube} from '/modules/my-module.js';
import {cube, foo} from '/modules/my-module.js';
// 导入时重命名接口
import {cube as cc , foo as ff} from '/modules/my-module.js';
console.log(ff) // 4.55580
// 为了执行模块文件，不导入模块任何接口：这将运行模块中的全局代码, 但实际上不导入任何值。
import '/modules/my-module.js';

// 导入默认，
// 单独导入默认，名字可以任意命名
import tt from '/modules/my-module.js';
console.log(tt) // '我是默认导出的'
// 默认和命名空间导入或命名导入一起使用
import tt, * as myModule from './b.mjs'
// 或者
import tt, {cube, foo} from './b.mjs'
```

### 3.1 动态导入import

在您希望按照一定的条件或者按需加载模块的时候，动态`import()` 是非常有用的。关键字import可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 `promise`。

```js
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });
```

这种使用方式也支持 `await` 关键字。

```js
let module = await import('/modules/my-module.js');
```



## 参考资料

[Module 的语法 ES6阮一峰](http://es6.ruanyifeng.com/#docs/module)

