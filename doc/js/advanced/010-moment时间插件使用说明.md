# moment时间插件使用说明

## 1. moment代码片段

### 1.1 获取当前月份时间段

```javascript
var firstDay = moment().startOf('month').format('YYYY-MM-DD');
var lastDay  = moment().endOf('month').format('YYYY-MM-DD');
```

### 1.2 获取本周时间段：

```javascript
var firstDay = moment().day(0).format('YYYY-MM-DD');
var lastDay = moment().day(7).format('YYYY-MM-DD');
```

### 1.3 获取3个月内的时间段

```javascript
var currentMonth = moment().month()+1,
var currentYear  = moment().year(),<span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"> </span>
var lastMonth    = currentMonth-3;
lastMonth    = (currentMonth-3)<10?'0'+lastMonth:lastMonth;
 var lastDay = moment().startOf('month').format('YYYY-MM-DD'),
       firstDay = currentYear +'-'+ lastMonsth + '-01';
```

参考资料：https://blog.csdn.net/XingKong22star/article/details/44240687



## 参考资料

1. 官网： https://momentjs.com/
2. 中文网： http://momentjs.cn/



网上教程：

[Moment.js中文文档系列之一安装使用与日期时间解析](https://itbilu.com/nodejs/npm/VkCir3rge.html)

[Moment.js中文文档系列之二日期时间的设置与取值（Get + Set）](https://itbilu.com/nodejs/npm/Vk3t77Dlx.html)

[Moment.js中文文档系列之三日期时间的加减等操作（Manipulate）](https://itbilu.com/nodejs/npm/EJlmbFhgg.html)

[Moment.js中文文档系列之四日期时间的格式化显示（Display）](https://itbilu.com/nodejs/npm/4kz3tOClx.html)

[Moment.js中文文档系列之五日期时间的查询（Query）](https://itbilu.com/nodejs/npm/Ny2sYBN-e.html)

[Moment.js中文文档系列之六日期时间的国际化（i18n）](https://itbilu.com/nodejs/npm/4k1vtctZl.html)

[Moment.js中文文档系列之七日期时间的自定义（Customize）](https://itbilu.com/nodejs/npm/4Jxk-Ti-l.html)

[Moment.js中文文档系列之八时间段（Durations）](https://itbilu.com/nodejs/npm/4JkB42p-x.html#duration-get)

[Moment.js中文文档系列之九工具类（Utilities）](https://itbilu.com/nodejs/npm/NJRXTDRWe.html)

[Moment.js中文文档系列之十插件（Plugins）](https://itbilu.com/nodejs/npm/V1k1JpA-l.html)

