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

