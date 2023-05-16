[[TOC]]

[TOC]

# Moment日期处理类库

文档网址：http://momentjs.cn/

可打开网站后，打开开发者选择项，直接在console里面测试值

## 1. 取值 + 赋值

Moment.js 使用重载的 getter 和 setter。 您可能熟悉这种模式在 jQuery 中的使用。

调用这些不带参数的方法充当 getter，带参数调用它们充当 setter。

### 1.1 取值

```js
moment().get('year');
moment().get('month');  // 0 to 11
moment().get('date');
moment().get('hour');
moment().get('minute');
moment().get('second');
moment().get('millisecond');
```

字符串获取器。 一般来说`moment().get(unit) === moment()[unit]()`

单位不区分大小写，并支持复数和缩写形式： 年（years，y），月（months，M），日期（dates，D），小时（hours，h），分钟（minutes，m），秒（seconds，s），毫秒（milliseconds，ms）。

### 1.2 赋值

通用设置器，接受单位作为第一个参数，值作为第二个参数：

```javascript
moment().set('year', 2013);
moment().set('month', 3);  // April
moment().set('date', 1);
moment().set('hour', 13);
moment().set('minute', 20);
moment().set('second', 30);
moment().set('millisecond', 123);

moment().set({'year': 2013, 'month': 3});
```

单位不区分大小写，并支持复数和缩写形式： 年（years，y），月（months，M），日期（dates，D），小时（hours，h），分钟（minutes，m），秒（seconds，s），毫秒（milliseconds，ms）。

### 1.3 其他取值-赋值方法

```js
// 毫秒 - 获取或设置毫秒数。接受从 0 到 999 的数字。 如果超出范围，它将冒泡到秒。
moment().millisecond(Number);
moment().millisecond(); // Number
moment().milliseconds(Number);
moment().milliseconds(); // Number

// 秒 - 获取或设置秒数。接受从 0 到 59 的数字。 如果超出范围，它将冒泡到分钟。
moment().second(Number);
moment().second(); // Number
moment().seconds(Number);
moment().seconds(); // Number

// 分钟 - 获取或设置分钟。接受从 0 到 59 的数字。 如果超出范围，它将冒泡到小时。
moment().minute(Number);
moment().minute(); // Number
moment().minutes(Number);
moment().minutes(); // Number

// 小时 - 获取或设置小时。接受从 0 到 23 的数字。 如果超出范围，它将冒泡到当天。
moment().hour(Number);
moment().hour(); // Number
moment().hours(Number);
moment().hours(); // Number

// 获取或设置月中的第几天。接受从 1 到 31 的数字。 如果超出范围，它将冒泡到几个月。
// 注意： Moment#date 代表月份日期，Moment#day 代表星期几。
// 如果你串联多个动作来构造一个日期，你应该从一年开始，然后是一个月，然后是一天等等。否则你可能会得到意想不到的结果，比如当day=31和当前月份只有30天时（ 这同样适用于原生 JavaScript Date 操作），返回的日期将是当月的 30 号
moment().date(Number);
moment().date(); // Number

// 获取或设置星期几。该方法可用于设置星期几，星期日为0，星期六为6。如果超出范围，它将冒泡到其他几周。
// 如果给定的值是从 0 到 6，则结果日期将在当前（星期日到星期六）周内。
moment().day(Number|String);
moment().day(); // Number
moment().days(Number|String);
moment().days(); // Number
moment().day(-7); // last Sunday (0 - 7)
moment().day(0); // this Sunday (0)
moment().day(7); // next Sunday (0 + 7)
moment().day(10); // next Wednesday (3 + 7)
moment().day(24); // 3 Wednesdays from now (3 + 7 + 7 + 7)

// 星期几（区域设置感知） : http://momentjs.cn/docs/#/get-set/weekday/
// ISO 星期几           : http://momentjs.cn/docs/#/get-set/iso-weekday/
// 一年中的某一天        : http://momentjs.cn/docs/#/get-set/day-of-year/
// 一年中的一周          : http://momentjs.cn/docs/#/get-set/week/
// 一年中的一周 (ISO)    : http://momentjs.cn/docs/#/get-set/iso-week/

// 获取或设置月份。接受从 0 到 11 的数字。 如果超出范围，它将冒泡到年份。
// 注意：月份是零索引的，所以一月是第 0 个月。
moment().month(Number|String);
moment().month(); // Number
moment().months(Number|String);
moment().months(); // Number

// 获取季度（1 到 4）
moment().quarter(); // Number
moment().quarter(Number);
moment().quarters(); // Number
moment().quarters(Number);
moment('2013-01-01T00:00:00.000').quarter() // 1
moment('2013-04-01T00:00:00.000').subtract(1, 'ms').quarter() // 1
oment('2013-01-01T00:00:00.000').quarter(2) // '2013-04-01T00:00:00.000'

// 获取或设置年份。接受从 -270,000 到 270,000 的数字。
moment().year(Number);
moment().year(); // Number
moment().years(Number);
moment().years(); // Number

// 周年 : http://momentjs.cn/docs/#/get-set/week-year/
// 周年 (ISO) : http://momentjs.cn/docs/#/get-set/iso-week-year/
// 一年中的几周 : http://momentjs.cn/docs/#/get-set/weeks-in-year/
// 一年中的周数 (ISO) : http://momentjs.cn/docs/#/get-set/iso-weeks-in-year/
```

## 2. 时间操作

### 2.1 添加

```js
moment().add(Number, String);
moment().add(Duration);
moment().add(Object);
```

通过添加时间来改变原始moment。这是一个非常强大的功能，可以为现有moment添加时间。 要添加时间，请传递要添加的时间和要添加的数量的密钥。

```js
moment().add(7, 'days'); // 当前时间加7天
moment().add(7, 'days').add(1, 'months'); // with chaining
moment().add({days:7,months:1}); // with object literal
// 数量没有上限，因此您可以重载任何参数。
moment().add(1000000, 'milliseconds'); // a million milliseconds

// 月份和年份的特殊考虑
// 如果原始日期的月份天数大于最后一个月的天数， 该月的日期将更改为最后一个月的最后一天。
moment([2010, 0, 31]);                  // January 31
moment([2010, 0, 31]).add(1, 'months'); // February 28

// 添加跨越夏令时的时间时，还需要牢记一些特殊注意事项。 如果您要添加年、月、周或日，则原始小时将始终与添加的小时匹配。
moment([2010, 1, 28]);                 // February 28
moment([2010, 1, 28]).add(1, 'month'); // March 28
```

### 2.2 减去

```js
oment().subtract(Number, String);
moment().subtract(Duration);
moment().subtract(Object);
```

通过减去时间来改变原始moment。这和`moment#add`完全一样，只是不是加了时间，而是减了时间。

```js
moment().subtract(7, 'days');

// 从 2.12.0 开始，当天数和月数传递十进制值时，它们会四舍五入到最接近的整数。 周、季度和年转换为天或月，然后四舍五入为最接近的整数。
moment().subtract(1.5, 'months') == moment().subtract(2, 'months')
moment().subtract(.7, 'years') == moment().subtract(8, 'months') //.7*12 = 8.4, rounded to 8
// 请注意，为了使操作 moment.add(-.5, 'days') and moment.subtract(.5, 'days') 等效，-.5、-1.5、-2.5 等向下舍入。
```

### 2.3 开始时间

通过将其设置为一个时间单位的开始来改变原始moment。

```javascript
moment().startOf('year');    // set to January 1st, 12:00 am this year
moment().startOf('month');   // set to the first of this month, 12:00 am
moment().startOf('quarter');  // set to the beginning of the current quarter, 1st day of months, 12:00 am
moment().startOf('week');    // set to the first day of this week, 12:00 am
moment().startOf('isoWeek'); // set to the first day of this week according to ISO 8601, 12:00 am
moment().startOf('day');     // set to 12:00 am today
moment().startOf('date');     // set to 12:00 am today
moment().startOf('hour');    // set to now, but with 0 mins, 0 secs, and 0 ms
moment().startOf('minute');  // set to now, but with 0 seconds and 0 milliseconds
moment().startOf('second');  // same as moment().milliseconds(0);
```

这些快捷方式与以下基本相同。

```javascript
moment().startOf('year');
moment().month(0).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
moment().startOf('hour');
moment().minutes(0).seconds(0).milliseconds(0)
```

### 2.4 结束时间

通过将原始moment设置为时间单位的末尾来改变原始moment。

这点和`moment#startOf`一样，只是不是设置为单位时间的开始，而是设置为单位时间的结束。

```javascript
moment().endOf("year"); // set the moment to 12-31 23:59:59.999 this year
```



## 3. 格式化显示

```js
moment().format() // "2020-01-02T18:19:57+08:00"
moment().format('YYYY-MM-DD') // "2020-01-02"
moment().format('YYYY-MM-DD hh:mm:ss') // "2020-01-02 06:18:45"
moment().format('YYYY-MM-DD HH:mm:ss') // "2020-01-02 18:21:50"
```

## 4. 显示

### 4.1 时间差

```js
moment().diff(Moment|String|Number|Date|Array);
moment().diff(Moment|String|Number|Date|Array, String);
moment().diff(Moment|String|Number|Date|Array, String, Boolean);
```



要获得另一个测量单位的差异，请将该测量值作为第二个参数传递。

```javascript
var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b) // 86400000，默认是毫秒
a.diff(b, 'days') // 1

// 几秒中前：现在时间："2020-01-02 18:23:27"
console.log(moment().format('YYYY-MM-DD HH:mm:ss')) // 2020-01-02 18:26:32
console.log(moment().diff(moment("2020-01-02 18:21:50"))) // 282276
console.log(moment().diff(moment("2020-01-02 18:21:50"), 'second')) // 282
```

要获得两个moment之间差异的持续时间，您可以将 `diff` 作为参数传递给 `moment#duration`。 有关详细信息，请参阅 [moment#duration](http://momentjs.cn/docs/#) 上的文档。

支持的测量是 `years`、`months`、`weeks`、`days`、`hours`、`minutes` 和 `seconds`。 为了便于开发，从 **2.0.0** 开始支持单数形式。 版本 **1.1.1** 中提供了毫秒以外的测量单位。

默认情况下，`moment#diff` 会将结果截断为零位小数，返回一个整数。 如果你想要一个浮点数，传递 `true` 作为第三个参数。 在 **2.0.0** 之前，`moment#diff` 返回一个四舍五入到最接近的整数的数字，而不是截断的数字。

```javascript
var a = moment([2008, 9]);
var b = moment([2007, 0]);
a.diff(b, 'years');       // 1
a.diff(b, 'years', true); // 1.75

// 如果这个moment早于你传递给 moment.fn.diff 的moment，则返回值为负数。
var a = moment();
var b = moment().add(1, 'seconds');
a.diff(b) // -1000
b.diff(a) // 1000
```



