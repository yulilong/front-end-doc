[[TOC]]

[TOC]



# react中使用echarts图标库

echarts官网：https://echarts.apache.org/zh/index.html

安装：

```
npm install echarts --save
```

使用：

```js
var echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
```

默认使用 `require('echarts')` 得到的是已经加载了所有图表和组件的 ECharts 包，因此体积会比较大，如果在项目中对体积要求比较苛刻，也可以只按需引入需要的模块:

```js
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// 接下来使用与上面一样
```



## 1. 在react中使用echarts



```jsx
import React, { PureComponent } from 'react';
import echarts from 'echarts';
import './index.less';

class RecentVisits extends PureComponent {
  constructor(props) {
    super(props);
    this.myChart = null;
    // 创建一个 ref 来存储 echarts 的 DOM 元素
    this.echartsDom = React.createRef();
  }

  componentWillMount() {
    window.removeEventListener('resize', this.echartsResize);
  }

  componentDidMount () {
    this.setEcharts();
    // 当页面调整宽度后，echarts的宽度自动跟随变化
    window.addEventListener('resize', this.echartsResize);
  }

  // echarts宽度调整
  echartsResize = () => {
    this.myChart.resize();
  }

  // 处理echarts数据
  processOptionData = () => {
    const { data } = this.props;
    let xAxisData = [];
    let seriesData = [];
    if (Array.isArray(data)) {
      xAxisData = data.map((item) => item.x);
      seriesData = data.map((item) => item.y);
    }
    const option = {
      tooltip: { trigger: 'axis', },
      xAxis: { show: false, type: 'category', boundaryGap: false, data: xAxisData },
      yAxis: { show: false, type: 'value' },
      color: '#975FE4',
      series: [{ data: seriesData, type: 'line', areaStyle: { color: "#975FE4" },
        smooth: true, // 线圆润的过度
      }]
    }
    return option;
  }

  setEcharts = () => {
    const { current } = this.echartsDom;
    // 如果获取到了dom，这执行
    if (current) {
      this.myChart = echarts.init(current);
      // // 绘制图表
      this.myChart.setOption(this.processOptionData());
    } else {
      // 延迟200毫秒后，再次执行
      setTimeout(this.setEcharts, 200)
    }
  }

  render () {
    return (
      <div 
        className="recent-visits"
        ref={this.echartsDom}
      >
        具体内容
      </div>
    )
  }
}

export default RecentVisits;
```



## 2. 一个echarts的option配置

具体配置查看：https://echarts.apache.org/zh/option.html

```js
// 图表折线图颜色
const barColors = [
    '#2b95ff',
    '#fcae04',
    '#d8e24a',
]
// X轴坐标值的颜色
const xAxisValueColor = '#a8aab3'
// X轴坐标值的颜色
const yAxisValueColor = '#a8aab3'

const chartOption = {
    // 鼠标移动到点上，显示的信息
    tooltip: {
        trigger: 'axis'
    },
    // 指示的点，没有就不显示
    legend: {
        data: [],
        x: 'right', // 顶部 右边显示
    },
    // 距离父元素的距离
    grid: {
        top: 40,
        right: 20,
        left: 80,
        bottom: 40,
    },
    // 折线的颜色，数组，根据线的数量自动取值
    color: [...barColors],
    // X轴信息
    xAxis: {
        type: 'category',
        data: [], // X周坐标显示的数据
        // 两边留白
        boundaryGap: true,
        axisLabel: {
            textStyle: {
                color: xAxisValueColor, // 坐标值的具体的颜色
            }
        }
    },
    // Y轴信息
    yAxis: {
        type: 'value',
        // 坐标轴的分割段数,最少是3个，最后可能会比这个多
        splitNumber: 3,
        style: {
            // color: yAxisValueColor,
            fontSize: 12,
            padding: [0, 8, 0, 0]
        },
        splitLine: {
            lineStyle: {
                color: yAxisValueColor, // Y轴坐标线颜色样式
                type: 'dashed'
            }
        },
        axisLabel: {
            textStyle: {
                color: yAxisValueColor, // 坐标值的具体的颜色
            }
        }
    },
    // 每条数据的信息
    series: [
        { // 一条数据
            type: 'line', // 线形图
            name: '', // 这条数据的名字
            data: [], // 数据
            areaStyle: {}, // 连线的下面显示颜色
            smooth: true, // 线圆润的过度
        }
    ]
}
```

