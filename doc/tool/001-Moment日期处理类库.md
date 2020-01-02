[[TOC]]

[TOC]

# Moment日期处理类库

文档网址：http://momentjs.cn/

可打开网站后，打开开发者选择项，直接在console里面测试值

## 1. 取范围时间

```js
// 当前时间这一周的开始时间
moment().startOf('week').format('YYYY-MM-DD')
// 当前时间这一周的结束事件
moment().endOf('week').format('YYYY-MM-DD')
// 当前时间上一个月的日期
moment().subtract(1, 'month').format('YYYY-MM-DD')
```

## 2. 格式化显示

```js
moment().format() // "2020-01-02T18:19:57+08:00"
moment().format('YYYY-MM-DD') // "2020-01-02"
moment().format('YYYY-MM-DD hh:mm:ss') // "2020-01-02 06:18:45"
moment().format('YYYY-MM-DD HH:mm:ss') // "2020-01-02 18:21:50"
```

## 3. 时间差值



几秒中前：

```js
// 现在时间："2020-01-02 18:23:27"
console.log(moment().format('YYYY-MM-DD HH:mm:ss')) // 2020-01-02 18:26:32
console.log(moment().diff(moment("2020-01-02 18:21:50"))) // 282276
console.log(moment().diff(moment("2020-01-02 18:21:50"), 'second')) // 282
```

