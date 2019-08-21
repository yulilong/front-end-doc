[TOC]

# react代码片段

### 1. setState异步执行，中立即使用的方法

```jsx
this.setState({
    businessLine: [{name: '-'},...res.data.data],
},()=>{
    // 这里可以立即使用
});
```

### 2. jsx中HTML三木运算

```jsx
{this.state.businessLine ? (
    this.state.businessLine.map((item, i) => (
        <Option key={i.toString()} value={item.id}>{item.name}</Option>
    ))
) : (
    <Option key='1' value=''></Option>
)}
```

### 3. 根据不同条件拼接字符串，用于类样式名字拼接

```jsx
/**
 * 拼接字符串，用于把符合条件的类样式名字拼接在一起
 * @param  {Object} obj     样式名字和是否符合条件
 * @return {String}         计算后的样式名字 字符串
*/
setClassNames = (obj) => {
  if ( typeof obj !== 'object') {
    return '';
  }
  let key;
  let str = '';
  for (key in obj) {
    if(obj[key]) {
      str += ' ' + key;
    }
  }
  return str;
}
return (
<span
   className={this.setClassNames({
       'active': this.state[e.key] === item.value,
       'forbidden': this.state.dimensional === e.value,
   })}
>{item.name}</span>
)
```

### 4. react中引入图片

在react中，如果在样式文件中使用背景图片格式：

```
background: url('./../../../assets/images/arrow-up.png') no-repeat center;
```

这样使用是没问题的。

但是在react中HTML里面的img标签引入图片路径时：

```
<img src="./../../../../assets/images/arrow-up.png" alt=""/>
```

这样引入在本地开发时可以看见图片，但是一旦项目部署后，会发现找不到图片。

这是由于打包工具不会处理react中img标签中路径，所以会导致部署上线后找不到路片问题，因此可使用如下几种方式，可解决问题。

- 第一种，使用import导入图片路径

  ```react
  import Img from "./images/1.png"
  <img src={Img} alt=""/>
  ```

- 第二种，使用require方式直接获取图片

  ```react
  <img src={require("./images/1.png")} alt=""/>
  ```

- 如果是北京图的话操作style

  ```react
  style={{background:`url(${require("./images/1.png")})` }}
  ```

  > ${} 为字符串模板,要用反引号``



### 5. 把数组数据渲染到HTML中

```jsx
let businessLine = [1, 2, 3];
{businessLine.length > 0 && businessLine.map((item, index) => (
  <Option key={index.toString()} value={item.code}>{item.name}</Option>
  <span key={index.toString()}> item </span>
))}
```

注意：箭头函数体是用`()`包围的，不是`{}`。

### 6. HTML点击事件中获取数据

一个数组数据，在HTML中渲染，点击元素时，获取到数据：

```jsx
<div className="edit-item-content">
  {bussinessType.map( (item, index) => (
    <span
      key={index.toString()}
      onClick={(e) => {this.selectQuery(item, e)} }
      >{item.name}</span>
  ))}
</div>
```

正产一个点击事件是`onClick={this.fuc}`，默认的参数是event事件。

而想要在点击事件的时候，把数据也传到方法中，就要在HTML中的`onClik`事件里面使用箭头函数，

箭头函数里面去直接调用这个方法，同时把参数传过去，如果需要点击事件，则在箭头函数中传参数，然后该参数传给方法即可。

### 7. 当props属性变化时，组件做一些操作

```jsx
// props数据更新前调用的生命周期
    componentWillReceiveProps(nextProps) {
        const {showRangePicker} = this.props;
        const {selectDateBtn} = this.state;
        // 自定义时间组件显示与隐藏切换，主要是在读人次组件中用到
        if (nextProps.showRangePicker !== showRangePicker) {
            if (selectDateBtn === 0 && !nextProps.showRangePicker) {
                // 选择的是自定义时间组件，并且需要隐藏自定义时间组件，则时间组件选择月组件
                this.setState({selectDateBtn: DATATYPE.month});
                this.returnDateTypeRange(DATATYPE.month);
            }
            else {
                this.returnDateTypeRange(selectDateBtn);
            }
        }
    }
```

