[[TOC]]

[TOC]



# String对象

转载整理自：https://wangdoc.com/javascript/stdlib/string.html



## 1. 概述

`String`对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。

字符串对象是一个类似数组的对象（很像数组，但不是数组）。

除了用作构造函数，`String`对象还可以当作工具方法使用，将任意类型的值转为字符串。

```js
// 变量s1是字符串，s2是对象。由于s2是字符串对象，s2.valueOf方法返回的就是它所对应的原始字符串。
var s1 = 'abc';
var s2 = new String('abc');
typeof s1 // "string"
typeof s2 // "object"
s2.valueOf() // "abc"

// 字符串abc对应的字符串对象，有数值键（0、1、2）和length属性，所以可以像数组那样取值。
(new String('abc'))[1] // "b"

// String()方法当做工具方法，将任意类型的值转为字符串。
String(true) // "true"
String(5) // "5"
```

## 2. 静态方法

静态方法（即定义在对象本身，而不是定义在对象实例的方法）

### 2.1 String.fromCharCode()返回码点的字符串

String.fromCharCode()方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。该方法参数为空，就返回空字符串，否则返回参数对应的Unicode 字符串。

注意，该方法不支持 Unicode 码点大于`0xFFFF`的字符，即传入的参数不能大于`0xFFFF`（即十进制的 65535）。

```js
String.fromCharCode() // ""
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111) // "hello"

String.fromCharCode(0x20BB7) // "ஷ"
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7) // true

String.fromCharCode(0xD842, 0xDFB7) // "𠮷"
```

上面代码中，`String.fromCharCode`参数`0x20BB7`大于`0xFFFF`，导致返回结果出错。`0x20BB7`对应的字符是汉字`𠮷`，但是返回结果却是另一个字符（码点`0x0BB7`）。这是因为`String.fromCharCode`发现参数值大于`0xFFFF`，就会忽略多出的位（即忽略`0x20BB7`里面的`2`）。

这种现象的根本原因在于，码点大于`0xFFFF`的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把`0x20BB7`拆成两个字符表示(`0xD842`和`0xDFB7`)。即两个两字节字符，合成一个四字节字符，就能得到正确的结果。码点大于`0xFFFF`的字符的四字节表示法，由 UTF-16 编码方法决定。

## 3. 实例属性

### 3.1 String.prototype.length

字符串实例的`length`属性返回字符串的长度。

```js
'abc'.length // 3
```

## 4. 实例方法

### 4.1 charAt()返回指定位置字符

`charAt`方法返回指定位置的字符，参数是从`0`开始编号的位置。如果参数为负数，或大于等于字符串的长度，`charAt`返回空字符串。这个方法完全可以用数组下标替代。

```js
'abc'.charAt(1) // "b"
'abc'.charAt('abc'.length - 1) // "c"
'abc'.charAt(-1) // ""
'abc'.charAt(3) // ""
// 这个方法完全可以用数组下标替代
'abc'.charAt(1) // "b"
'abc'[1] // "b"
```

### 4.2 charCodeAt()返回指定位置Unicode码点

`charCodeAt()`方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于`String.fromCharCode()`的逆操作。

如果没有任何参数，`charCodeAt`返回首字符的 Unicode 码点。如果参数为负数，或大于等于字符串的长度，`charCodeAt`返回`NaN`。

```js
'abc'.charCodeAt(1) // 98
'abc'.charCodeAt() // 97
'abc'.charCodeAt(-1) // NaN
'abc'.charCodeAt(4) // NaN
```

注意，`charCodeAt`方法返回的 Unicode 码点不会大于65536（0xFFFF），也就是说，只返回两个字节的字符的码点。如果遇到码点大于 65536 的字符（四个字节的字符），必须连续使用两次`charCodeAt`，不仅读入`charCodeAt(i)`，还要读入`charCodeAt(i+1)`，将两个值放在一起，才能得到准确的字符。

### 4.3 concat()拼接两个字符串

`concat`方法用于连接两个字符串，返回一个新字符串，不改变原字符串。该方法可以接受多个参数。如果参数不是字符串，`concat`方法会将其先转为字符串，然后再连接。

```js
var s1 = 'abc';
var s2 = 'def';
s1.concat(s2) // "abcdef"
s1 // "abc"
'a'.concat('b', 'c', 'd', 'e') // "abc"

var one = 1;
var two = 2;
var three = '3';
// concat方法将参数先转成字符串再连接，所以返回的是一个三个字符的字符串。作为对比，
''.concat(one, two, three) // "123"
// 加号运算符在两个运算数都是数值时，不会转换类型，所以返回的是一个两个字符的字符串。
one + two + three // "33"
```

### 4.4 slice()取出子字符串

`slice`方法用于从原字符串取出子字符串并返回，不改变原字符串。

关于参数：

-   第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）
-   省略第二个参数，表示一直取到字符串结束
-   参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度
-   第一个参数大于第二个参数，返回一个空字符串

```js
'JavaScript'.slice(0, 4) // "Java"
// 省略第二个参数，表示一直取到字符串结束
'JavaScript'.slice(4) // "Script"
// 参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度
'JavaScript'.slice(-6) // "Script"
'JavaScript'.slice(0, -6) // "Java"
'JavaScript'.slice(-2, -1) // "p"
// 第一个参数大于第二个参数，返回一个空字符串
'JavaScript'.slice(2, 1) // ""
```

### 4.5 substring()取出子字符串

`substring`方法用于从原字符串取出子字符串并返回，不改变原字符串。

关于参数：

-   第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）
-   省略第二个参数，表示一直取到字符串结束
-   参数是负数，自动将负数转为0
-   第一个参数大于第二个参数，会自动更换两个参数的位置

```js
'JavaScript'.substring(0, 4) // "Java"
// 省略第二个参数，表示一直取到字符串结束
'JavaScript'.substring(4) // "Script"
// 参数是负数，自动将负数转为0
'JavaScript'.substring(-3) // "JavaScript"
'JavaScript'.substring(4, -3) // "Java"
// 第一个参数大于第二个参数，会自动更换两个参数的位置
'JavaScript'.substring(10, 4) // "Script"
// 等同于
'JavaScript'.substring(4, 10) // "Script"
```

由于这些规则违反直觉，因此不建议使用`substring`方法，应该优先使用`slice`。

### 4.6 substr()取出子字符串

`substr`方法用于从原字符串取出子字符串并返回，不改变原字符串，跟`slice`和`substring`方法的作用相同。

关于参数：

-   第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的长度
-   省略第二个参数，表示一直取到字符串结束
-   第一个参数是负数，表示倒数计算的字符位置
-   第二个参数是负数，将被自动转为0，因此会返回空字符串

```js
'JavaScript'.substr(4, 6) // "Script"
// 省略第二个参数，表示一直取到字符串结束
'JavaScript'.substr(4) // "Script"
// 第一个参数是负数，表示倒数计算的字符位置
'JavaScript'.substr(-6) // "Script"
// 第二个参数是负数，将被自动转为0，因此会返回空字符串
'JavaScript'.substr(4, -1) // ""
```

### 4.7 indexOf(),lastIndexOf()确定出现的位置

`indexOf`方法用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回`-1`，就表示不匹配。该方法还可以接受第二个参数，表示从该位置开始向后匹配。

`lastIndexOf`方法的用法跟`indexOf`方法一致，主要的区别是`lastIndexOf`从尾部开始匹配，`indexOf`则是从头部开始匹配。该方法第二个参数表示从该位置起向前匹配。

```js
'hello world'.indexOf('o') // 4
'JavaScript'.indexOf('script') // -1
// 第二个参数，表示从该位置开始向后匹配
'hello world'.indexOf('o', 6) // 7

'hello world'.lastIndexOf('o') // 7
// 第二个参数表示从该位置起向前匹配
'hello world'.lastIndexOf('o', 6) // 4
```

### 4.8 trim()去除两端不可见字符

`trim`方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。该方法去除的不仅是空格，还包括制表符（`\t`、`\v`）、换行符（`\n`）和回车符（`\r`）。

```js
'  hello world  '.trim() // "hello world"
'\r\nabc \t'.trim() // 'abc'
```

### 4.9 toLowerCase(),toUpperCase()全部转大写、小写

`toLowerCase`方法用于将一个字符串全部转为小写，`toUpperCase`则是全部转为大写。它们都返回一个新字符串，不改变原字符串。

```js
'Hello World'.toLowerCase()
// "hello world"

'Hello World'.toUpperCase()
// "HELLO WORLD"
```

### 4.10 match()匹配字符串

`match`方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回`null`。返回的数组还有`index`属性和`input`属性，分别表示匹配字符串开始的位置和原始字符串。`match`方法还可以使用正则表达式作为参数。

```js
'cat, bat, sat, fat'.match('at') // ["at", index: 1, input: "cat, bat, sat, fat", groups: undefined]
'cat, bat, sat, fat'.match('xt') // null
var matches = 'cat, bat, sat, fat'.match('at');
matches.index // 1
matches.input // "cat, bat, sat, fat"
```

### 4.11 search()返回匹配位置

`search`方法的用法基本等同于`match`，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回`-1`。`search`方法还可以使用正则表达式作为参数

```js
'cat, bat, sat, fat'.search('at') // 1
```

### 4.12 replace()替换匹配到的子字符串

`replace`方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有`g`修饰符的正则表达式）。

```js
'aaa'.replace('a', 'b') // "baa"
```

`replace`方法还可以使用正则表达式作为参数。

### 4.13 split()根据参数分割字符串

`split`方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。

关于参数：

-   参数是分隔符，不包含分隔符
-   如果参数是空字符串，则返回每个字符组成的数组
-   如果省略参数，则返回数组的唯一成员就是原字符串
-   如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串
-   如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串
-   `split`方法还可以接受第二个参数，限定返回数组的最大成员数
-   `split`方法还可以使用正则表达式作为参数

```js
'a|b|c'.split('|') // ["a", "b", "c"]
// 参数是空字符串，则返回每个字符组成的数组
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]
// 省略参数，则返回数组的唯一成员就是原字符串
'a|b|c'.split() // ["a|b|c"]
// 满足分割规则的两个部分紧邻着,返回数组之中会有一个空字符串
'a||c'.split('|') // ['a', '', 'c']
// 满足分割规则的部分处于字符串的开头或结尾, 返回数组的第一个或最后一个成员是一个空字符串
'|b|c|'.split('|') //  ["", "b", "c", ""]
// 接受第二个参数，限定返回数组的最大成员数
'a|b|c'.split('|', 2) // ["a", "b"]
```

### 4.14 localeCompare()比较两个字符串

`localeCompare`方法用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。

```js
'apple'.localeCompare('banana') // -1
'apple'.localeCompare('apple') // 0
```

该方法的最大特点，就是会考虑自然语言的顺序。举例来说，正常情况下，大写的英文字母小于小写字母。

```js
'B' > 'a' // false
```

上面代码中，字母`B`小于字母`a`。因为 JavaScript 采用的是 Unicode 码点比较，`B`的码点是66，而`a`的码点是97。

但是，`localeCompare`方法会考虑自然语言的排序情况，将`B`排在`a`的前面。

```js
'B'.localeCompare('a') // 1
```

上面代码中，`localeCompare`方法返回整数1，表示`B`较大。

`localeCompare`还可以有第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较。

```js
'ä'.localeCompare('z', 'de') // -1
'ä'.localeCompare('z', 'sv') // 1
```

上面代码中，`de`表示德语，`sv`表示瑞典语。德语中，`ä`小于`z`，所以返回`-1`；瑞典语中，`ä`大于`z`，所以返回`1`。













