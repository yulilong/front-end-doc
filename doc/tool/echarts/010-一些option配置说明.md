[[TOC]]

[TOC]

## 一些option配置说明

## 1. 关于Y轴的特别配置说明

[官方文档关于Y轴配置链接](https://echarts.apache.org/zh/option.html#yAxis)

### 1.1 自动计算的坐标轴最小间隔大小

通过这个设置，可以做到坐标显示只显示整数(设置成1)

```js
yAxis: {
  type: 'value',
  minInterval: 1,
}
```

只在数值轴或时间轴中（[type](https://echarts.apache.org/zh/option.html#yAxis.type): 'value' 或 'time'）有效。

官方文档地址：https://echarts.apache.org/zh/option.html#yAxis.minInterval