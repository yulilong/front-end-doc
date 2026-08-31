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



## 2. 柱状图的配置相关

### 2.1 设置柱状图的宽度

```js
let data = [10, 20, 15, 20, 22, 12]
let option = {
	series: [
    {
      type: 'bar', name: '名字', barGap: 0,
      data: data,
      barWidth: (() => {
        // 大于5条数据，设置宽度为15
    		if (data.length > 5) {
          return 15;
        }
        return null; // 自适应
    	})(),
    }
  ]
}
```



## 3. 其他一些配置

```js
let option = {
	series: [],
  // grid: 控制直角坐标系绘图网格的位置与大小，用来调整图表四周留白、避免坐标轴标签和标题被遮挡，是柱状图布局优化的核心配置。
  // 单位支持像素值（如60）和百分比（如10%）
  grid: {
    // 值是数字 或者 百分比(6%)，
    top: 60,    // 控制绘图网格距离 ECharts 容器顶部的距离，单位支持像素值（如60）和百分比（如10%），默认值为60，用来给顶部图表标题留出足够空间。
    left: 50,   // 控制绘图网格距离容器左侧的距离，默认值为40，避免Y轴的数值标签被容器边缘遮挡。
    right: 40,  // 控制绘图网格距离容器右侧的距离，默认值为60，适配右侧可能存在的图例或额外标签。
    bottom: 50, // 控制绘图网格距离容器底部的距离，默认值为40，给底部X轴的类目标签预留显示空间。
  },
  // 其他值：
  // show：布尔值，默认false，设置为true时可直接显示网格的边框线，方便调试布局位置。
  // borderColor / borderWidth：自定义网格边框的颜色和粗细，默认边框为透明无样式。
  // backgroundColor：给绘图网格区域设置专属背景色，支持纯色和半透明色，提升图表视觉层次感。
  // containLabe：布尔值，默认false，设置为true时，grid 的边距会自动把坐标轴标签的尺寸计算在内，彻底避免标签被容器边缘截断。
}
```

