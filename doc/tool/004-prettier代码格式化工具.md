[[TOC]]

[TOC]



# Prettier代码格式化工具介绍

Prettier是一个代码格式化规范，支持多种语言(前端语言都支持)，大多数编辑器都集成了，配置项不多。

1.  

## 1. 配置

-   配置文件格式

    Prettier的配置文件可以用4种文件格式编写：

    1.  JavaScript `.prettierrc.js`或`prettier.config.js`
    2.  JSON `.prettierrc.json`
    3.  YAML `.prettierrc.yaml`或`.prettierrc.yml`
    4.  TOML `.prettierrc.toml`

    除此之外，配置还可以写在`package.json`的`prettier`字段里。

-   配置文件格式优先级

    当同一个目录下有多个不同格式的配置文件时，Prettier只会使用一个。Prettier会按照以下优先级（从高到低）读取：

    1.  `package.json`
    2.  `.prettierrc` YAML或JSON格式
    3.  `.prettierrc.json`
    4.  `.prettierrc.yaml`
    5.  `.prettierrc.yml`
    6.  `.prettierrc.js`
    7.  `.prettier.config.js`
    8.  `.prettierrc.toml`

-   配置文件的查询

    默认情况下，Prettier会从文件所在目录开始并逐级向上寻找配置文件。直到找到一个配置文件或已经到达根目录时，才会停止。

## 2. 一个配置文件例子

```js
{
    // tab缩进大小,默认为2
    "tabWidth": 4,
    // 使用tab缩进，默认false
    "useTabs": false,
    // 使用分号, 默认true
    "semi": false,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    "singleQuote": false,
    // 行尾逗号,默认none,可选 none|es5|all
    // es5 包括es5中的数组、对象
    // all 包括函数对象等所有可选
    "TrailingCooma": "all",
    // 对象中的空格 默认true
    // true: { foo: bar }
    // false: {foo: bar}
    "bracketSpacing": true,
    // JSX标签闭合位置 默认false
    // false: <div
    //          className=""
    //          style={{}}
    //       >
    // true: <div
    //          className=""
    //          style={{}} >
    "jsxBracketSameLine": false,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    "arrowParens": "avoid"
}
```

## 3. 配置说明

### 3.1 printWidth： 配置列宽

列宽，默认为`80`

源文件：

```js
// 本行列宽为80
var foo = "1234567890123456789012345678901234567890123456789012345678901234567";

// 本行列宽为81
var bar = "12345678901234567890123456789012345678901234567890123456789012345678";
```

输出：

```js
// 本行列宽为80
var foo = "1234567890123456789012345678901234567890123456789012345678901234567";

// 本行列宽为81
var bar =
  "12345678901234567890123456789012345678901234567890123456789012345678";
```

### 3.2 tabWidth：缩进宽度

缩进宽度，默认为`2`

源文件：

```js
var foo = {
  name: "foo",
  age: 18
};
```

输出：

```js
var foo = {
    name: "foo",
    age: 18
};
```

### 3.3 useTabs：是否使用tab缩进

是否使用tab缩进，默认为`false`

### 3.4 semi：是否使用分号

是否使用分号，默认为`true`

源文件：

```js
var foo = {
  name: "foo",
}
```

输出：

```js
var foo = {
  name: "foo",
};
```

### 3.5 singleQuote：是否使用单引号包裹字符串

是否使用单引号包裹字符串，默认为`false`

源文件：

```js
var foo = {
  name: "foo",
};
```

输出

```js
var foo = {
  name: 'foo',
};
```

### 3.6 quoteProps：是否使用引号包裹对象的键名

是否使用引号包裹对象的键名，默认为`"as-needed"`

-   `"as-needed"` 当且仅当对象中特定键名需要被引号包裹时，使用引号包裹特定键名
-   `"consistent"` 如果对象中至少存在一个键名必须被引号包裹时，使用引号包裹所有键名
-   `"preserve"` 不做任何特殊处理

### 3.7 trailingComma：多行时使用尾后逗号

多行时使用尾后逗号，默认为`"es5"`

-   `"none"` 不使用
-   `"es5"` 仅使用多行数组尾后逗号和多行对象尾后逗号
-   `"all"` 尽可能多地使用尾后逗号，在`"es5"`的基础上，还在函数的参数列表中使用尾后逗号

源文件：

```js
// 本行列宽为74
var foo = { apple: 1, banana: 2, cake: 3, dog: 4, evening: 5, family: 6 };

// 本行列宽为83
var bar = { apple: 1, banana: 2, cake: 3, dog: 4, evening: 5, family: 6, girl: 7 };
```

输出(设置none)：

```js
// 本行列宽为74
var foo = { apple: 1, banana: 2, cake: 3, dog: 4, evening: 5, family: 6 };

// 本行列宽为83
var bar = {
  apple: 1,
  banana: 2,
  cake: 3,
  dog: 4,
  evening: 5,
  family: 6
};
```

输出(设置es5)：

```js
// 本行列宽为74
var foo = { apple: 1, banana: 2, cake: 3, dog: 4, evening: 5, family: 6 };

// 本行列宽为83
var bar = {
  apple: 1,
  banana: 2,
  cake: 3,
  dog: 4,
  evening: 5,
  family: 6,
  girl: 7,
};
```

源文件：

```js
// 本行列宽为79
function foo(apple, banana, cake, dog, evening, family, girl, happy, iphone) {}

// 本行列宽为85
function bar(apple, banana, cake, dog, evening, family, girl, happy, iphone, jack) {}
```

输出(设置all)：

```js
// 本行列宽为79
function foo(apple, banana, cake, dog, evening, family, girl, happy, iphone) {}

// 本行列宽为85
function bar(
  apple,
  banana,
  cake,
  dog,
  evening,
  family,
  girl,
  happy,
  iphone,
  jack,
) {}
```

### 3.8 bracketSpacing：是否在对象字面量的两个花括号内侧使用空格作为间隔

是否在对象字面量的两个花括号内侧使用空格作为间隔，默认为`true`。`false` 不使用。

源文件：

```js
var foo = {a: 1, b: 2};
```

输出：

```js
var foo = { a: 1, b: 2 };
```

### 3.9 arrowParens：是否使用箭头函数的参数

是否使用箭头函数的参数，默认为`"always"`

-   `"avoid"` 尽可能省略
-   `"always"` 总是使用

源文件：

```js
var sayHello = name => {
  return "hi " + name;
};
```

输出：

```js
var sayHello = (name) => {
  return "hi " + name;
};
```

### 3.10 rangeStart：设定格式化范围的起点，默认为`0`

源文件：

```js
var bar = { apple: 1, banana: 2, cake: 3, dog: 4, evening: 5, family: 6, girl: 7 };
```

输出(设置rangeStart: 84)：

```js
var bar = { apple: 1, banana: 2, cake: 3, dog: 4, evening: 5, family: 6, girl: 7 };
```

### 3.11 rangeEnd：设定格式化范围的终点，默认为无穷大

注意：`.inf`即YAML中的无穷大。

示例：`rangeEnd: .inf`

### 3.12 requirePragma：是否仅格式化文件顶部有pragma指令

是否仅格式化文件顶部有pragma指令（一种特殊注释）的文件，默认为`false`。

源文件：

```js
/** @prettier */

// 本行列宽为80
var foo = "1234567890123456789012345678901234567890123456789012345678901234567";

// 本行列宽为81
var bar = "12345678901234567890123456789012345678901234567890123456789012345678";
```

或

```js
/** @format */

// 本行列宽为80
var foo = "1234567890123456789012345678901234567890123456789012345678901234567";

// 本行列宽为81
var bar = "12345678901234567890123456789012345678901234567890123456789012345678";
```

输出：

```js
/** @prettier */

// 本行列宽为80
var foo = "1234567890123456789012345678901234567890123456789012345678901234567";

// 本行列宽为81
var bar =
  "12345678901234567890123456789012345678901234567890123456789012345678";
```

或

```js
/** @format */

// 本行列宽为80
var foo = "1234567890123456789012345678901234567890123456789012345678901234567";

// 本行列宽为81
var bar =
  "12345678901234567890123456789012345678901234567890123456789012345678";
```

### 3.13 insertPragma：是否在格式化后的文件顶部插入pragma指令

是否在格式化后的文件顶部插入pragma指令（一种特殊注释），默认为`false`。

源文件：

```js
// 本行列宽为80
var foo = "1234567890123456789012345678901234567890123456789012345678901234567";

// 本行列宽为81
var bar = "12345678901234567890123456789012345678901234567890123456789012345678";
```

输出：

```js
/** @format */

// 本行列宽为80
var foo = "1234567890123456789012345678901234567890123456789012345678901234567";

// 本行列宽为81
var bar =
  "12345678901234567890123456789012345678901234567890123456789012345678";
```

### 3.14 proseWrap： markdown折行

-   `"always"` 总是折行
-   `"never"` 不折行
-   `"preserve"` 不处理（默认值）

源文件：

```
markdown markdown markdown markdown markdown markdown markdown markdown markdown markdown
```

输出：

```
markdown markdown markdown markdown markdown markdown markdown markdown markdown
markdown
```

### 3.15 htmlWhitespaceSensitivity：是否使用空白字符格式化HTML文件

是否使用空白字符格式化HTML文件

-   `"css"` 按照CSS的`display`规则，块元素格式化，行内元素不格式化（默认值）
-   `"strict"` 都不格式化
-   `"ignore"` 都格式化

示例：`htmlWhitespaceSensitivity: "css"`

源文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">1<span>2</span>3</div>
    <div class="container">1<div>2</div>3</div>
  </body>
</html>
```

输出：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">1<span>2</span>3</div>
    <div class="container">
      1
      <div>2</div>
      3
    </div>
  </body>
</html>
```

注意：

1.  ``<span>2</span>`、`3`之间没有使用空白字符格式化
2.  `<div>2</div>`、`3`之间使用空白字符格式化

示例：`htmlWhitespaceSensitivity: "strict"`

源文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">1<span>2</span>3</div>
    <div class="container">1<div>2</div>3</div>
  </body>
</html>
```

输出：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">1<span>2</span>3</div>
    <div class="container">1<div>2</div>3</div>
  </body>
</html>
```

注意：

1.  `<span>2</span>`、`3`之间没有使用空白字符格式化
2.  `<div>2</div>`、`3`之间没有使用空白字符格式化

示例：`htmlWhitespaceSensitivity: "ignore"`

源文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">1<span>2</span>3</div>
    <div class="container">1<div>2</div>3</div>
  </body>
</html>
```

输出：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">
      1
      <span>2</span>
      3
    </div>
    <div class="container">
      1
      <div>2</div>
      3
    </div>
  </body>
</html>
```

注意：

1.  `<span>2</span>`、`3`之间使用空白字符格式化
2.  `<div>2</div>`、`3`之间使用空白字符格式化

### 3.16 endOfLine：换行符

-   `"auto"` 不处理
-   `"lf"` 换行 Linux或macOS（默认值）
-   `"crlf"` 回车换行 Windows
-   `"cr"` 回车







## 一些参考资料



[Prettier 官网](https://prettier.io/)

[Prettier看这一篇就行了 知乎](https://zhuanlan.zhihu.com/p/81764012)

[Prettier的配置文件 ](https://jsweibo.github.io/2019/10/17/Prettier%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6/)

