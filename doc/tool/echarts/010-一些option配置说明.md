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

### 1.2 Y轴添加单位或者名字

```js
yAxis: {
  name: 'Y轴名称',
  nameLocation: 'middle', // 'start' | 'middle' | 'end'
  nameGap: 30, // 名称与轴线距离
  nameTextStyle: {
    padding: [10, 20, 30, 40] // 上右下左边距
  },
  position: 'left', // 坐标轴显示位置
  offset: 0 // 坐标轴偏移量
},
```

