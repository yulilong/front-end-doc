<!-- ---
sidebar: auto
--- -->

# 正则表达式

## 1、正则表达式介绍

正则表达式（英语：Regular Expression，在代码中常简写为regex、regexp或RE）使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。           

搜索模式可用于文本搜索和文本替换。



## 2、创建一个正则表达式

1. 使用JavaScript内置对象RegExp创建     

   ```javascript
      // 匹配手机号(chrome 浏览器 -> Developer Tools -> Console)
      var reg1 = new RegExp('1[3-9]\\d{9}', 'g')		=> /1[3-9]\d{9}/g
      var reg2 = new RegExp(/1[3-9]\d{9}/m)			=> /1[3-9]\d{9}/m
      var reg3 = new RegExp(reg1, 'ig')				=> /1[3-9]\d{9}/gi
   ```

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

2. 表达式字面量

   正则表达式字面量由包含在斜杠之间字符组成：

   ```javascript
   var reg4 = /1[3-9]\d{9}/		=> /1[3-9]\d{9}/
   var reg5 = /1[3-9]\d{9}/g		=> /1[3-9]\d{9}/g
   ```

## 3、正则表达式规则

一个正则表达式模式是由简单的字符所构成的,一个字符（转义字符算一个）对应字符串一个字符.    

如`/abc/`中，仅仅当'abc'同时出现并按照这个顺序，"Hi abc"和"My name is abc"会匹配到'abc',而"Grab crab"中将不会匹配。

当你需要搜索一个比直接匹配需要更多条件的匹配时,比如寻找一个或多个 'b'，或者寻找空格，那么这时模式将要包含特殊字符。



### 3.1 制表符

| 字符 | 含义                                                         |
| :--- | :----------------------------------------------------------- |
| \t   | 水平制表符(水平tab)                                          |
| \r   | 回车符                                                       |
| \n   | 换行符                                                       |
| \f   | 换页符(\x0c)                                                 |
| \v   | 垂直制表符(等于\x0b),垂直tab                                 |
| \0   | 空字符(c/c++ 语言中的字符串结束符，在ASCII字符集中对应空字符NULL，数值为0) |

使用例子：

```javascript
'\tda\nda'.match(/\t/)		=> ["	", index: 0, input: "	da↵da"]
'\tda\nda'.match(/\n/)		=> ["↵", index: 3, input: "	da↵da"]
```



### 3.2 []、`[^]`、()、|：字符合集、捕获、或

| 字符     | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| [abc]    | 一个字符集合。匹配方括号的中任意字符，包括转义字符。你可以使用破折号（-）来指定一个字符范围。对于点（.）和星号（*）这样的特殊符号在一个字符集中没有特殊的意义。他们不必进行转义，不过转义也是起作用的。 [abcd] 和[a-d]是一样的， /[a-z.]+/ 和/[\w.]+/一样。 |
| `[^a-c]` | 一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符。你可以使用破折号（-）来指定一个字符范围。任何普通字符在这里都是起作用的。`[^abc]`和`[^a-c]`是一样的。 |
| (x)      | 匹配 'x' 并且记住匹配项, 括号被称为 *捕获括号*。捕获的内容存在RegExp.\$1到RegExp.\$9中(最多存9个)， 在replace方法中，则要使用`$1`、`$2`、`$n` 这样的语法，例如，` 'bar foo'.replace( /(...) (...)/, '$2 $1' )` |
| (?:x)    | 匹配 'x' 但是不记住匹配项。叫作非捕获括号.可用来定义为与正则表达式运算符一起使用的子表达式。如 /(?:foo){1,2}/则{1,2}会匹配整个 ‘foo’ 单词。 |

还有一个：x|y : 匹配‘x’或者‘y’。 

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

### 3.3 预定义

预定义： 一个特殊字符代表了一类字符的合集。

| 字符 | 含义                                     | 相当于                                                       |
| ---- | :--------------------------------------- | ------------------------------------------------------------ |
| .    | (小数点)匹配除换行符之外的任何单个字符   | `[^\r\n]`                                                    |
| \d   | 数字字符                                 | ` [0-9]`                                                     |
| \D   | 非数字字符                               | ` [^0-9]`                                                    |
| \s   | 空白符( 空格、制表符、换页符和换行符)    | ` \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff` |
| \S   | 匹配一个非空白字符。                     | `[^\s]`                                                      |
| \w   | 匹配一个单字字符（字母、数字或者下划线） | ` [A-Za-z0-9_]`                                              |
| \W   | 匹配一个非单字字符                       | ` [^A-Za-z0-9_]`                                             |

### 3.4 边界

规定一个特殊字符表示匹配的边界。

| 字符 | 含义                                                         |
| ---- | ------------------------------------------------------------ |
| ^    | 匹配输入的开始, 多行标志被设置为true，那么也匹配换行符后紧跟的位置。 /^A/ 不会匹配 "an A" 中的 'A', 会匹配 "An E" 中的 'A'。注：^在[]中含义就变了，`[^]`表示取反。 |
| $    | 匹配输入的结束。如果多行标示被设置为true，那么也匹配换行符前的位置。 /t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'。 |
| \b   | 词的边界。 /\bm/匹配“moon”中得‘m’， /oon\b/匹配"moon"中得'oon'。 |
| \B   | 匹配一个非单词边界。他匹配一个前后字符都是相同类型的位置：都是单词或者都不是单词。一个字符串的开始和结尾都被认为是非单词。 |

例子：

```javascript
var str = 'hello1 whello9orld 12-hello8-3456 hello0'
str.match(/^hello\d/g)		// ["hello1"]
str.match(/hello\d$/g)		// ["hello0"]
str.match(/\bhello\d\b/g)	// ["hello1", "hello8", "hello0"] // -也用于区分单词边界
str.match(/\Bhello\d\B/g)	// ["hello9"]
str.match(/\Bhello\d/g)		// ["hello9"]
str.match(/hello\d\B/g)		// ["hello9"]
```



### 3.5 量词

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

### 3.6 断言(Assertions):`x(?=y)`,`x(?!y)`

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



### 3.7 贪婪模式和非贪婪模式

#### 3.7.1 贪婪模式(默认)

正则表达式规则中，量词的匹配的规则是尽可能多的匹配，也就是贪婪模式。

```javascript
'a+8613244043289s'.match(/\d{4,8}/g)	// ["86132440", "43289"]
```

#### 3.7.2 非贪婪模式(需设置)

也可以设置量词(量词后加上`?`即可)让正则表达式尽可能少的匹配，称非贪婪模式。

```javascript
'a+8613244043289s'.match(/\d{4,8}?/g)	// ["8613", "2440", "4328"]
```



## 4、javascript中正则表达式的相关方法

正则表达式对象本身存在一些属性，可供使用：

```javascript
reg1 = new RegExp(/\d{3}/, 'g')		// /\d{3}/g
reg1.lastIndex		// 0
reg1.ignoreCase		// false
reg1.multiline		// false
reg1.global			// true
reg1.source			// "\d{3}"
reg2 = /^.{3}/im					// /^.{3}/im
reg2.multiline		// true
```

这些属性说明：

| 属性       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| lastIndex  | 下次匹配开始的字符串索引位置                                 |
| ignoreCase | 是否使用了'i'标记使正则匹配忽略大小写                        |
| global     | 是否使用了'g'标记来进行全局的匹配                            |
| multiline  | 是否使用了'`m'`标记使正则工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。 |
| source     | 正则表达式                                                   |



### 4.1、RegExp对象的方法

#### 4.1.1、RegExp.prototype.test(str)

> 方法介绍： 用于测试字符串中是否存在匹配的内容
>
> 参数(str)：用来与正则表达式匹配的字符串
>
> 返回值：如果存在匹配的内容则返回true，否则返回false

```javascript
var reg = /1[3-8]\d{9}/g
reg.test('a+8613244043289s')		// true
reg.test('xiaoxiao@163.com')		// false
```

#### 4.1.2、RegExp.prototype.exec(str)

> 方法介绍：在一个指定字符串中执行一个搜索匹配，如果设置了全局匹配('g')，exec可多次执行，每次执行返回一个匹配结果，直到返回null为止。如果不设置全局匹配('g')，那么每次执行结果都一样。
>
> 参数(str)：用来与正则表达式匹配的字符串
>
> 返回值：如果匹配成功返回一个结果数组，并更新正则表达式对象的属性。如果匹配失败返回null

```javascript
/\d{3}/.exec('+861330427')			// ["861", index: 1, input: "+861330427"]
res = /<%(.+?)%>/.exec('<%href%>')	// ["<%href%>", "href", index: 0, input: "<%href%>"]
res[1]		// "href"
res.index	// 0
res.input	// "<%href%>"
```

exec方法返回值(数组)结果说明：

| 属性       | 说明                                      |
| ---------- | ----------------------------------------- |
| [0]        | 匹配的结果                                |
| [1], ……[n] | 括号中的分组捕获                          |
| index      | 匹配到的字符位于原始字符串的基于0的索引值 |
| input      | 原始字符串                                |

- 全局匹配('g')的exec执行

  当正则表达式使用 "`g`" 标志时，那么每次执行 `exec`方法都会修改正则表达式对象的lastIndex 属性值，并且查找将从正则表达式的lastIndex属性指定的位置开始匹配，直到查询结果为null(此时会设置lastIndex的值为0)。

  ```javascript
  reg = new RegExp(/\d{3}/, 'g')		// /\d{3}/g
  reg = /\d{3}/g			// /\d{3}/g
  reg.lastIndex			// 0
  reg.exec('13304273390')	// ["133", index: 0, input: "13304273390"]
  reg.lastIndex			// 3
  reg.exec('13304273390')	// ["042", index: 3, input: "13304273390"]
  reg.lastIndex			// 6
  reg.exec('13304273390')	// ["733", index: 6, input: "13304273390"]
  reg.lastIndex			// 9
  reg.exec('13304273390')	// null
  reg.lastIndex			// 0
  ```

- 没有全局匹配的exec执行

  当正则表达式没有使用 "`g`" 标志时，那么多次执行 `exec` 方法返回的结果是一样的，

  ```javascript
  reg = /\d{3}/			// /\d{3}/
  reg.lastIndex			// 0
  reg.exec('13304273390')	// ["133", index: 0, input: "13304273390"]
  reg.lastIndex			// 0
  // 再执行一次
  reg.exec('13304273390')	// ["133", index: 0, input: "13304273390"]
  reg.lastIndex			// 0
  ```

### 4.2、String对象中关于正则表达式的方法

#### 4.2.1、String.prototype.search(regexp)

> 方法介绍：检索与正则表达式相匹配的子字符串
>
> 参数(regexp)：一个正则表达式对象，如果传入的不是正则表达式对象，则会用new RegExp(regexp)隐式地转为正则表达式
>
> 返回值：如果匹配成功返回符合规则子字符串的**索引**。否则返回-1.

search()方法不会执行全局匹配(忽略标志'g'),不管执行多少次，结果都一样，因为search()方法总是从字符串开始位置进行检索。

```javascript
reg = /\d{3}/		// /\d{3}/
reg1 = /\d{3}/g		// /\d{3}/g
'我还有100元'.search(reg)	// 3
'我还有100元'.search(reg1)	// 3
// 再执行一次
'我还有100元'.search(reg1)	// 3
'我还有100元'.search(reg)	// 3
```



#### 4.2.2、String.prototype.match(regexp)

> 方法介绍：检索字符串，找到一个或多个与regexp匹配的文本
>
> 参数(regexp)： 与String.prototype.search(regexp)的参数一样，此外，如果你未提供任何参数，会得到[""]
>
> 返回值：	
>
> 1. 正则表达式包含 `g` 标志(全局匹配)：返回数组，包含所有匹配的子字符串而不是匹配对象，捕获组不会被返回(括号捕获)
>    1. 正则表达式不包含 `g` 标志：返回和`RegExp.exec()`相同的结果
>       1. 如果没有匹配到：返回null

```javascript
'ss13304271122dd'.match(/\d{3}/)	// ["133", index: 2, input: "ss13304271122dd"]
'ss13304271122dd'.match(/\d{3}/g)	// ["133", "042", "711"]
'hello world'.match(/\d{3}/)		// null
'ss13304271122dd'.match(/\d{3}(0427)/)	
// ["1330427", "0427", index: 2, input: "ss13304271122dd"]
'ss13304271122dd'.match(/\d{3}(0427)/g)	// ["1330427"]
```

#### 4.2.3、String.prototype.replace(regexp|substr, newSubStr|function)

> 方法介绍：用于在字符串中把特定的值替换成新值，特定的值可以使用字符串或正则表达式去找，新值可以是一个字符串或者函数(返回一个字符串)。注意：原字符串不会改变。
>
> 参数：
>
> 1. regexp(第一个参数)：正则表达式，该正则所匹配的内容会被第二个参数的返回值替换掉
> 2. substr(第一个参数)：字符串，该字符串会被第二个参数的返回值替换掉
> 3. newSubStr(第二个参数)：字符串，用于替换第一个参数的新值
> 4. function(第二个参数)：一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果
>
> 返回值：一个新的字符串

在replace方法中，第一个参数是字符串是经常用的方式，但这种方式只能替换一次：

```javascript
'xx@163.com,yy@163.com'.replace('163', 'outlook')	//"xx@outlook.com,yy@163.com"
```

如果想实现更复杂的替换(多个值替换等)，可使用正则表达式作为第一个参数：

```javascript
'xx@163.com,yy@163.com'.replace(/163/g, 'outlook')	// "xx@outlook.com,yy@outlook.com"
'xx@163.com,yy@163.com'.replace(/163/, 'gmail')		// "xx@gmail.com,yy@163.com"
```

如果第一个参数是正则表达式，那么第二参数中还可以使用正则表达式中捕获的变量，使用`$1 ... $9`：

```javascript
'xx@gmail.com,yy@163.com'.replace(/(gmail)(.*)(163)/, '$3$2$1')
// "xx@163.com,yy@gmail.com"
```

#### 4.2.4、String.prototype.split(separator, limit)

> 方法介绍：用于把一个字符串分割成字符串数组。
>
> 参数：
>
> 1. separator(必需)：字符串或正则表达式，从该参数指定的地方分割字符串,如果该参数是空字符串("")，则字符串会在每个字符之间分割
> 2. limit(可选)：指定返回的数组的最大长度。返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割
>
> 返回值：一个字符串数组。该数组是通过在 *separator* 指定的边界处将字符串分割成子串创建的。返回的数组中的字串不包括 *separator* 自身

如果只是简单分割，则可以使用字符串：

```javascript
'163,gmail,hotmail,outlook'.split(',')	// ["163", "gmail", "hotmail", "outlook"]
'163,gmail,hotmail,outlook'.split(',',3)// ["163", "gmail", "hotmail"]
'abcdef'.split('')		// ["a", "b", "c", "d", "e", "f"]
```

如果是复杂的分割，则可以使用正则表达式：

```javascript
var reg = /\d*[\u4e00-\u9fa5]\/[\u4e00-\u9fa5]\,/	// 匹配（10元/斤,）
"鸡肉10元/斤,鱼肉20元/斤,牛肉30元/斤,".split(reg)		// ["鸡肉", "鱼肉", "牛肉", ""]
```



## 参考资料

- 饥人谷课件

  [正则基本语法](http://book.jirengu.com/fe/前端基础/Javascript/正则基本语法.html)

  [正则相关方法](http://book.jirengu.com/fe/前端基础/Javascript/正则相关方法.html)

- mdn资料

  [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-negated-character-set)

  [RegExp对象介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#assertions)

  [String对象介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)