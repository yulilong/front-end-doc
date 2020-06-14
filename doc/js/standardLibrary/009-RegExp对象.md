[[TOC]]

[TOC]



# 正则对象和正则规则



## 1. 正则表达式规则

一个正则表达式模式是由简单的字符所构成的,一个字符（转义字符算一个）对应字符串一个字符.    

如`/abc/`中，仅仅当'abc'同时出现并按照这个顺序，"Hi abc"和"My name is abc"会匹配到'abc',而"Grab crab"中将不会匹配。

当你需要搜索一个比直接匹配需要更多条件的匹配时,比如寻找一个或多个 'b'，或者寻找空格，那么这时模式将要包含特殊字符。

### 1.1 匹配特殊字符-制表符

正则表达式对一些不能打印的特殊字符，提供了表达方法。

| 表达式 | 含义                                                         |
| :----- | :----------------------------------------------------------- |
| \n     | 匹配换行符                                                   |
| \r     | 匹配回车符                                                   |
| \t     | 匹配水平制表符 tab（U+0009）                                 |
| \v     | 匹配垂直制表符（U+000B）                                     |
| \f     | 匹配换页符（U+000C）                                         |
| \0     | 匹配`null`字符（U+0000），空字符(c/c++ 语言中的字符串结束符，在ASCII字符集中对应空字符NULL，数值为0) |
| \xhh   | 匹配一个以两位十六进制数（`\x00`-`\xFF`）表示的字符          |
| \uhhhh | 匹配一个以四位十六进制数（`\u0000`-`\uFFFF`）表示的 Unicode 字符 |
| \cX    | 表示`Ctrl-[X]`，其中的`X`是A-Z之中任一个英文字母，用来匹配控制字符 |
| [\b]   | 匹配退格键(U+0008)，不要与`\b`混淆。                         |

使用例子：

```javascript
'\tda\nda'.match(/\t/)		=> ["	", index: 0, input: "	da↵da"]
'\tda\nda'.match(/\n/)		=> ["↵", index: 3, input: "	da↵da"]
```

### 1.2 []、`[^]`、()、|字符合集、捕获、或

| 字符     | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| [abc]    | 一个字符集合。匹配方括号的中任意字符，包括转义字符。你可以使用破折号（-）来指定一个字符范围。对于点（.）和星号（*）这样的特殊符号在一个字符集中没有特殊的意义。他们不必进行转义，不过转义也是起作用的。 [abcd] 和[a-d]是一样的， /[a-z.]+/ 和/[\w.]+/一样。 |
| `[^a-c]` | 一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符。你可以使用破折号（-）来指定一个字符范围。任何普通字符在这里都是起作用的。`[^abc]`和`[^a-c]`是一样的。 |
| (x)      | 匹配 'x' 并且记住匹配项, 括号被称为 *捕获括号*。捕获的内容存在RegExp.\$1到RegExp.\$9中(最多存9个)， 在replace方法中，则要使用`$1`、`$2`、`$n` 这样的语法，例如，` 'bar foo'.replace( /(...) (...)/, '$2 $1' )` |
| (?:x)    | 匹配 'x' 但是不记住匹配项。叫作非捕获括号.可用来定义为与正则表达式运算符一起使用的子表达式。如 /(?:foo){1,2}/则{1,2}会匹配整个 ‘foo’ 单词。 |
| `(\n)`   | n指数字，表示重复第n个分组匹配到的数据,比如：`'123dsadas123'.match(/(\d{3}).*(\1)/)`，第一个括号分支匹配的内容是`123`,那么`(\1)`匹配的内容必须也是`123`, 这个字符串就不匹配`123dsadas456` |
| `x|y`    | 匹配‘x’或者‘y’                                               |

使用例子：

```javascript
// chrome 浏览器 -> Developer Tools -> Console
'@#$a2*()'.match(/[a-z][0-9]/)			// ["a2", index: 3, input: "@#$a2*()"]
'@#$a2*()'.match(/[^a-z][^0-9]/)		// ["@#", index: 0, input: "@#$a2*()"]
'green apple'.match(/green|red/)		// ["green", index: 0, input: "green apple"]
'Hi, hello world'.match(/(hello).*(world)/)	
// ["hello world", "hello", "world", index: 4, input: "Hi, hello world"]
RegExp.$1		//	"hello"
RegExp.$2		//	"world"
RegExp.$3		//	""
'Hi, hello world'.match(/(?:hello).*(world)/)	
// ["hello world", "world", index: 4, input: "Hi, hello world"]
RegExp.$1		// "world"
RegExp.$2		// ""
```



### 1.3 预定义模式

预定义模式指的是某些常见模式的简写方式。

预定义： 一个特殊字符代表了一类字符的合集。

| 字符 | 含义                                      | 相当于                                                       |
| ---- | ----------------------------------------- | ------------------------------------------------------------ |
| .    | (小数点)匹配除换行符之外的任何单个字符    | `[^\r\n]`                                                    |
| \d   | 匹配0-9之间的任一数字                     | ` [0-9]`                                                     |
| \D   | 匹配所有0-9以外的字符                     | ` [^0-9]`                                                    |
| \s   | 匹配空白符( 空格、制表符、换页符和换行符) | ` \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff` |
| \S   | 匹配一个非空白字符                        | `[^\s]`                                                      |
| \w   | 匹配任意的字母、数字和下划线              | ` [A-Za-z0-9_]`                                              |
| \W   | 除所有字母、数字和下划线以外的字符        | `[^A-Za-z0-9_]`                                              |

下面是一些例子。

```js
// \s 的例子
/\s\w*/.exec('hello world') // [" world"]
```

### 1.4 匹配边界

规定一个特殊字符表示匹配的边界。

| 字符 | 含义                                                         |
| ---- | ------------------------------------------------------------ |
| ^    | 匹配输入的开始, 多行标志被设置为true，那么也匹配换行符后紧跟的位置。 /^A/ 不会匹配 "an A" 中的 'A', 会匹配 "An E" 中的 'A'。注：^在[]中含义就变了，`[^]`表示取反。 |
| $    | 匹配输入的结束。如果多行标示被设置为true，那么也匹配换行符前的位置。 /t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'。 |
| \b   | 词的边界。 /\bm/匹配“moon”中得‘m’， /oon\b/匹配"moon"中得'oon'。 |
| \B   | 匹配非词边界，即在词的内部。                                 |

例子：

```javascript
var str = 'hello1 whello9orld 12-hello8-3456 hello0'
str.match(/^hello\d/g)		// ["hello1"]
str.match(/hello\d$/g)		// ["hello0"]
str.match(/\bhello\d\b/g)	// ["hello1", "hello8", "hello0"] // -也用于区分单词
// \b 的例子
/\bworld/.test('hello world') // true
/\bworld/.test('hello-world') // true
/\bworld/.test('helloworld') // false
// \B 的例子
/\Bworld/.test('hello-world') // false
/\Bworld/.test('helloworld') // true
```

### 1.5 量词

下面介绍的字符可以表示一个字符出现多次的定义。

| 字符  | 含义                                                         |
| ----- | ------------------------------------------------------------ |
| ?     | 匹配前面一个表达式0次或者1次。等价于 {0,1}。 （最多出现一次） |
| +     | 匹配前面一个表达式1次或者多次。等价于 {1,}。 （至少出现一次） |
| *     | 匹配前一个表达式0次或多次。等价于 {0,}。 （任意次）          |
| {n}   | n是一个正整数，匹配了前面一个字符刚好发生了n次。             |
| {n,m} | n和m都是整数。匹配前面的字符至少n次,最多m次。如果n或者m的值是0,这个值被忽略。 |
| {n,}  | 前面一个字符至少出现n次                                      |

例子：

```javascript
// 匹配手机号 (chrome 浏览器 -> Developer Tools -> Console)
'dsa+8613244043289sss'.match(/(\+86)?1[2-8]\d{9}/)	
// ["+8613244043289", "+86", index: 3, input: "dsa+8613244043289sss"]
'dsa13244043289sss'.match(/(?:\+86)?1[2-8]\d{9}/)	
// ["13244043289", index: 3, input: "dsa13244043289sss"]
'hello worldworld'.match(/(?:world){1,2}/)	
// ["worldworld", index: 6, input: "hello worldworld"]
'hello worldworld'.match(/(?:world){1}/)	
// ["world", index: 6, input: "hello worldworld"]
```

### 1.6 贪婪模式和非贪婪模式

上面的量词(?、+、*)默认情况下都是最大可能匹配，即匹配直到下一个字符不满足匹配规则为止。这被称为贪婪模式。

```js
'a+8613244043289s'.match(/\d{4,8}/)
// ["86132440", index: 2, input: "a+8613244043289s", groups: undefined]
```

上面代码，模式是`/\d{4,8}/`,表示匹配4到8个数字，因为默认是贪婪模式，会一直匹配到最多，所以匹配到了8个数字。

如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号。

```js
'a+8613244043289s'.match(/\d{4,8}?/)
// ["8613", index: 2, input: "a+8613244043289s", groups: undefined]
```

上面代码中，模式结尾添加了一个问号，这时就改为非贪婪模式，一旦条件满足，就不再往下匹配。

除了非贪婪模式的加号，还有非贪婪模式的星号（`*`）和非贪婪模式的问号（`?`）。

-   `+?`：表示某个模式出现1次或多次，匹配时采用非贪婪模式。
-   `*?`：表示某个模式出现0次或多次，匹配时采用非贪婪模式。
-   `??`：表格某个模式出现0次或1次，匹配时采用非贪婪模式。

### 1.7 断言(Assertions):`x(?=y)`,`x(?!y)`

`x(?=y)`称为先行断言（Positive look-ahead），`x`只有在`y`前面才匹配，`y`不会被计入返回结果。比如，要匹配后面跟着百分号的数字，可以写成`/\d+(?=%)/`。

`x(?!y)`称为先行否定断言（Negative look-ahead），`x`只有不在`y`前面才匹配，`y`不会被计入返回结果。比如，要匹配后面跟的不是百分号的数字，就要写成`/\d+(?!%)/`。

| 字符   | 含义               |
| ------ | ------------------ |
| x(?=y) | 仅匹配被y跟随的x。 |
| x(?!y) | 仅匹配不被y跟随的x |

例子：

```javascript
'Hi, hello world'.match(/hello(?= world)/)
// ["hello", index: 4, input: "Hi, hello world"]
'Hi, hello Jack'.match(/hello(?= world)/)	// null   
'3.141'.match(/\d+(?!\.)/)					// ["141", index: 2, input: "3.141"]
```

## 2. RegExp构造函数

正则表达式（英语：Regular Expression，在代码中常简写为regex、regexp或RE）使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。JavaScript 的正则表达式体系是参照 Perl 5 建立的。

新建正则表达式有两种方法。一种是使用字面量，以斜杠表示开始和结束。

```js
var regex = /xyz/;
```

另一种是使用`RegExp`构造函数。

```js
var regex = new RegExp('xyz');
```

上面两种写法是等价的，都新建了一个内容为`xyz`的正则表达式对象。它们的主要区别是，第一种方法在引擎编译代码时，就会新建正则表达式，第二种方法在运行时新建正则表达式，所以前者的效率较高。而且，前者比较便利和直观，所以实际应用中，基本上都采用字面量定义正则表达式。

RegExp(pattern, attributes)有两个参数:

第一个参数是pattern: 匹配规则，可以是字符串、正则表达式、RegExp对象，如果是字符串`\`需要转义`\\`

第二个是可选参数，表示匹配模式，可选值(可组合)：

> g：global，全局匹配，找到所有匹配，而不是在第一个匹配后停止
>
> i：ingore case，忽略大小写，默认大小写敏感
>
> m：multiple lines，多行搜索 , 将开始和结束字符（^和$）视为在多行上工作
>
> u: Unicode; 将模式视为Unicode序列点的序列 
>
> y: 粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引(并且不尝试从任何后续的索引匹配)。

```js
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
```

上面代码中，正则表达式`/xyz/`有一个修饰符`i`。

## 3. RegExp实例属性

正则对象的实例属性分成两类。

一类是修饰符相关，用于了解设置了什么修饰符。

-   `RegExp.prototype.ignoreCase`：返回一个布尔值，表示是否设置了`i`修饰符。
-   `RegExp.prototype.global`：返回一个布尔值，表示是否设置了`g`修饰符。
-   `RegExp.prototype.multiline`：返回一个布尔值，表示是否设置了`m`修饰符。
-   `RegExp.prototype.flags`：返回一个字符串，包含了已经设置的所有修饰符，按字母排序。

上面四个属性都是只读的。

另一类是与修饰符无关的属性，主要是下面两个。

-   `RegExp.prototype.lastIndex`：返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义，详细介绍请看后文。
-   `RegExp.prototype.source`：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。

```js
var r = /abc/igm;

r.ignoreCase // true
r.global // true
r.multiline // true
r.flags // 'gim'
r.lastIndex // 0
r.source // "abc"
```

## 4.RegExp实例方法

### 4.1 RegExp.prototype.test()

正则实例对象的`test`方法返回一个布尔值，表示当前模式是否能匹配参数字符串。

如果正则表达式带有`g`修饰符，则每一次`test`方法都从上一次结束的位置开始向后匹配。带有`g`修饰符时，可以通过正则对象的`lastIndex`属性指定开始搜索的位置。

```js
var r = /x/g;
var s = '_x_x';
r.lastIndex // 0
r.test(s) // true
r.lastIndex // 2
// 代码指定从字符串的第五个位置开始搜索，这个位置为空，所以返回false。同时，lastIndex属性重置为0，所以第二次执行r.test(s)会返回true。
r.lastIndex = 4;
r.test(s) // false
r.lastIndex // 0
r.test(s) // true
```

注意，带有`g`修饰符时，正则表达式内部会记住上一次的`lastIndex`属性，这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误。

```js
var r = /bb/g;
r.test('bb') // true
// 由于正则表达式r是从上一次的lastIndex位置开始匹配，导致第二次执行test方法时出现预期以外的结果。
r.test('-bb-') // false
```

`lastIndex`属性只对同一个正则表达式有效，所以下面这样写是错误的。

```js
var count = 0;
while (/a/g.test('babaa')) count++;
```

上面代码会导致无限循环，因为`while`循环的每次匹配条件都是一个新的正则表达式，导致`lastIndex`属性总是等于0。

如果正则模式是一个空字符串，则匹配所有字符串。

```js
new RegExp('').test('abc') // true
```

### 4.2 RegExp.prototype.exec()

正则实例对象的`exec()`方法，用来返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回`null`。

如果正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员。第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推。整个数组的`length`属性等于组匹配的数量再加1。

exec方法返回值(数组)说明：

| 属性       | 说明                                  |
| ---------- | ------------------------------------- |
| [0]        | 匹配的结果                            |
| [1], ……[n] | 括号中的分组捕获                      |
| index      | 模式匹配成功的开始位置（从0开始计数） |
| input      | 原始字符串                            |

```js
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;
var r3 = /_(x)/;
r1.exec(s) // ["x", index: 1, input: "_x_x", groups: undefined]
r2.exec(s) // null
r3.exec(s) // ["_x", "x", index: 0, input: "_x_x", groups: undefined]
```

如果正则表达式加上`g`修饰符，则可以使用多次`exec()`方法，下一次搜索的位置从上一次匹配成功结束的位置开始。

```js
var reg = /a/g;
var str = 'abc_abc_abc'

reg.exec(str); // ["a", index: 0, input: "abc_abc_abc", groups: undefined]
reg.lastIndex // 1
reg.exec(str); // ["a", index: 4, input: "abc_abc_abc", groups: undefined]
reg.lastIndex // 5
reg.exec(str); // ["a", index: 8, input: "abc_abc_abc", groups: undefined]
reg.lastIndex // 9
reg.exec(str); // null
reg.lastIndex // 0
```

利用`g`修饰符允许多次匹配的特点，可以用一个循环完成全部匹配。

```js
var reg = /a/g;
var str = 'abc_abc_abc'
// 只要exec()方法不返回null，就会一直循环下去，每次输出匹配的位置和匹配的文本。
while(true) {
  var match = reg.exec(str);
  if (!match) break;
  console.log('#' + match.index + ':' + match[0]);
}
// #0:a
// #4:a
// #8:a
```

正则实例对象的`lastIndex`属性不仅可读，还可写。设置了`g`修饰符的时候，只要手动设置了`lastIndex`的值，就会从指定位置开始匹配。

## 5. 字符串的实例方法

字符串的实例方法之中，有4种与正则表达式有关。

-   `String.prototype.match()`：返回一个数组，成员是所有匹配的子字符串。
-   `String.prototype.search()`：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
-   `String.prototype.replace()`：按照给定的正则表达式进行替换，返回替换后的字符串。
-   `String.prototype.split()`：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。

### 5.1 String.prototype.match()

`match`方法检索字符串，找到一个或多个与regexp匹配的文本。字符串的`match`方法与正则对象的`exec`方法非常类似：匹配成功返回一个数组，匹配失败返回`null`。

```js
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;
s.match(r1) // ["x", index: 1, input: "_x_x", groups: undefined]
s.match(r2) // null
```

如果正则表达式带有`g`修饰符，则该方法与正则对象的`exec`方法行为不同，会一次性返回所有匹配成功的结果。

```js
var s = 'abba';
var r = /a/g;
s.match(r) // ["a", "a"]
r.exec(s) // ["a"]
```

设置正则表达式的`lastIndex`属性，对`match`方法无效，匹配总是从字符串的第一个字符开始。

```js
var r = /a|b/g;
r.lastIndex = 7;
'xaxb'.match(r) // ['a', 'b']
r.lastIndex // 0
```

### 5.2 String.prototype.search()

字符串对象的`search`方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回`-1`。

search()方法不会执行全局匹配(忽略标志'g'),不管执行多少次，结果都一样，因为search()方法总是从字符串开始位置进行检索。

```js
'_x_x'.search(/x/)
// 1
```

### 5.3 String.prototype.replace()

字符串对象的`replace`方法用于在字符串中把特定的值替换成新值，特定的值可以使用字符串或正则表达式去找，新值可以是一个字符串或者函数(返回一个字符串)。注意：原字符串不会改变。

正则表达式如果不加`g`修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。

```js
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace(/a/, 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"
```

`replace`方法的第二个参数可以使用美元符号`$`，用来指代所替换的内容。

-   `$&`：匹配的子字符串。
-   `$``：匹配结果前面的文本。
-   `$'`：匹配结果后面的文本。
-   `$n`：匹配成功的第`n`组内容，`n`是从1开始的自然数。
-   `$$`：指代美元符号`$`。

```js
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1') // "world hello"
'abc'.replace('b', '[$`-$&-$\']') // "a[a-b-c]c"
```

`replace`方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值。改函数可以接受多个参数。其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串。

```js
'3 and 5'.replace(/[0-9]+/g, function (match) { return 2 * match; })
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;
a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.

var prices = { 'p1': '$1.99', 'p2': '$9.99', 'p3': '$5.00' };

var template = '<span id="p1"></span>'
  + '<span id="p2"></span>'
  + '<span id="p3"></span>';
// 捕捉模式中，有四个括号，所以会产生四个组匹配，在匹配函数中用$1到$4表示。匹配函数的作用是将价格插入模板中。
template.replace(
  /(<span id=")(.*?)(">)(<\/span>)/g,
  function(match, $1, $2, $3, $4){
    return $1 + $2 + $3 + prices[$2] + $4;
  }
);
// "<span id="p1">$1.99</span><span id="p2">$9.99</span><span id="p3">$5.00</span>"
```

### 5.4 String.prototype.split()

split方法用于把一个字符串分割成字符串数组。

该方法接受两个参数：

第一个参数必填，字符串或正则表达式，从该参数指定的地方分割字符串,如果该参数是空字符串("")，则字符串会在每个字符之间分割。

第二个参数可选，指定返回的数组的最大长度。返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割。

```js
// 非正则分隔
'a,  b,c, d'.split(',') // [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */) // [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2) // [ 'a', 'b' ]

// 例一: 第一个分隔符是aaa，第二个分割符是a，将字符串分成三个部分，包含开始处的空字符串
'aaa*a*'.split(/a*/) // [ '', '*', '*' ]

// 例二: 第一个分隔符是aaa，第二个分隔符是0个a（即空字符），第三个分隔符是a，所以将字符串分成四个部分。
'aaa**a*'.split(/a*/) // ["", "*", "*", "*"]
```

如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回。

```js
'aaa*a*'.split(/(a*)/)
// [ '', 'aaa', '*', 'a', '*' ]
```

上面代码的正则表达式使用了括号，第一个组匹配是`aaa`，第二个组匹配是`a`，它们都作为数组成员返回。

## 6. 一些实际使用例子

### 6.1 hello-world转为HelloWorld

将`hello-world-jack` 转为`HelloWorldJack`.

```js
var str = 'hello-world-jack'
function camelize(str) {
   return  str.replace(/(^\w)|-(\w)/g, function(){
      // console.log(arguments)
      var target = arguments[1] || arguments[2]
      return target.toUpperCase()
    })
}
```





## 参考资料

- 饥人谷课件

    [正则基本语法](http://book.jirengu.com/fe/前端基础/Javascript/正则基本语法.html)

    [正则相关方法](http://book.jirengu.com/fe/前端基础/Javascript/正则相关方法.html)

- mdn资料

    [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-negated-character-set)

    [RegExp对象介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#assertions)

    [String对象介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

[学习正则表达式 github](https://github.com/ziishaned/learn-regex)

[RegExp 对象 阮一峰 ES5](https://wangdoc.com/javascript/stdlib/regexp.html#stringprototypereplace)













