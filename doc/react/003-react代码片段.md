[[TOC]]

[TOC]

# react代码片段

## 1. setState异步执行，中立即使用的方法

```jsx
this.setState({
    businessLine: [{name: '-'},...res.data.data],
},()=>{
    // 这里可以立即使用
});
```

## 2. jsx中HTML三木运算

```jsx
{this.state.businessLine ? (
    this.state.businessLine.map((item, i) => (
        <Option key={i.toString()} value={item.id}>{item.name}</Option>
    ))
) : (
    <Option key='1' value=''></Option>
)}
```

## 3 html中css类名根据条件添加方法

### 3.1 使用ES6语法的字符串拼接

此方法适用于判断条件少的情况。

```jsx
return (
  <span
    className={`custom-content ${show ? '' : 'hidden-custom'}`}
   >{item.name}</span>
)
```



### 3.2 封装方法(返回字符串)：根据对象属性判断拼接字符串

```jsx
/**
 * 拼接字符串，用于把符合条件的类样式名字拼接在一起
 * @param  {Object} obj     样式名字和是否符合条件
 * @return {String}         计算后的样式名字 字符串
*/
setClassNames = obj => {
  let str = '';
  // 如果是对象类型才处理
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        str += ` ${key}`; // str += ' ' + key;
      }
    });
    str = str.trim(); // 去除字符串两边的不可见字符
  }
  return str;
};
return (
  <span
    className={this.setClassNames({
      'active': this.state[e.key] === item.value,
      'forbidden': this.state.dimensional === e.value,
    })}
    >{item.name}</span>
)
```

## 4. react中引入图片

 在react中，如果在样式文件中使用背景图片格式：

```css
background: url('./../../../assets/images/arrow-up.png') no-repeat center;
```

这样使用是没问题的。

但是在react中HTML里面的img标签引入图片路径时：

```html
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

- 如果是背景图的话操作style

  ```react
  style={{background:`url(${require("./images/1.png")})` }}
  ```

  > ${} 为字符串模板,要用反引号``



## 5. 把数组数据渲染到HTML中

```jsx
let businessLine = [1, 2, 3];
{businessLine.length > 0 && businessLine.map((item, index) => (
  <Option key={index.toString()} value={item.code}>{item.name}</Option>
  <span key={index.toString()}> item </span>
))}
```

注意：箭头函数体是用`()`包围的，不是`{}`。

## 6. HTML点击事件中获取数据

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

## 7. 当props属性变化时，组件做一些操作

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



## 8. html方法里面传参

第一种是在HTML方法里面写箭头函数实现传参：

```jsx
handleAddPackageClick = (itemData) => {
  addPackage(itemData)
}
<span  onClick={() => { this.handleAddPackageClick(itemData) }} >
</span>
```

第二种是方法里面返回函数，然后HTML中直接执行这个方法，把参数传过去

```jsx
handleNewDataSouce = ttt => () => {
  console.log('ttt: ', ttt)
}
<Button
  type="primary"
  onClick={this.handleNewDataSouce('hello world')}
>
  新增数据源
</Button>
```

第三种方法是HTML元素上添加`data-name`属性，然后出发事件后使用`e.target.dataset`方法来读取参数：

```jsx
handleNewDataSouce = ttt => (e) => {
  console.log('ttt: ', ttt)
  console.log('dataset:', e.target.dataset)
}
<Button
  type="primary"
  onClick={this.handleNewDataSouce('hello world')}
  data-time="2020-02-03"
>
  新增数据源
</Button>
```



## 9 父组件调用子组件方法

要实现父组件调用子组件方式，主要是通过子组件的 ref 属性 来获取子组件的实例，通过子组件实例来执行方法。如果子组件是类组件，还可以把子组件的this传给父组件，通过子组件this调用方法。

而函数组件有两个问题：

- 1、没有实例给父组件调用。解决办法：通过 hooks 的 useImperativeHandle 方法实现自定义实例对象用来给父组件调用。
- 2、没有 ref 属性，解决办法有两种：
  - 2.1 使用自定义属性，例如props.onRef，这样函数组件 useImperativeHandle 方法可以使用这个 自定义onRef。
  - 2.2 函数组件使用React.forwardRef方法包裹，就可以有 ref属性了。

### 9.1 父-类组件、子-类组件

1、父组件使用`React.createRef()`，子组件不需要任何操作

```jsx
// 经过实际测试
import React, { Component } from 'react';
// 父组件
class Parent extends React.Component {
  constructor(props) {
    super();
    this.sub = React.createRef();
  }
  render() {
    return (<div>
      <button onClick={() => { this.sub.current.callback(); }}>click0</button>
      <Child ref={this.sub} />
    </div>);
  }
}
// 子组件
class Child extends React.Component {
  callback = () => { console.log('执行回调'); }
  render() { return <div>子组件</div>; }
}
export default Parent;
```

2、子组件把this传给父组件，父组件使用子组件的this

```jsx
// 经过实际测试
import React from 'react';
// 父组件
class Parent extends React.PureComponent {
  render() {
    return (<div>
      <button onClick={() => { this.child.setModelDisplay(); }}>click10</button>
      <Child onRef={(ref) => { this.child = ref; }} />
    </div>);
  }
}
// 子组件
class Child extends React.PureComponent {
  componentDidMount() {
    this.props.onRef(this);
  }
  setModelDisplay = () => { console.log('我是子组件，执行我'); };
  render() { return <div>子组件</div>; }
}
export default Parent;
```

### 9.2 父-类组件、子-函数组件

父组件使用`React.createRef()`，子组件使用自定义ref属性和`useImperativeHandle`

```jsx
// 经过测试
import React, { useImperativeHandle } from 'react';
// 父组件
class Parent extends React.Component {
  constructor(props) {
    super();
    this.sub = React.createRef(); // React.useRef() 也一样
  }
  render() {
    return (<div>
      <button onClick={() => { this.sub.current.func(); }}>click3</button>
      <Child onRef={this.sub} />
    </div>);
  }
}
// 子组件
const Child = (props) => {
  const [count, setCount] = React.useState(100);
  React.useImperativeHandle(props.onRef, () => ({
    func: () => {
      setCount(count + 1);
      console.log('我是子组件，count：', count);
    },
  }));
  return <div>子组件</div>;
};
export default Parent;
```

### 9.3 父-函数组件、子-类组件

1、父组件使用`React.useRef()`

```jsx
// 父组件
const Parent = () => {
  const childRef = React.useRef();
  return (
    <div>
      <button onClick={() => { childRef.current.setModelDisplay(); }}>click ref</button>
      <Child ref={childRef} />
    </div>
  );
};
// 子组件
class Child extends React.PureComponent {
  setModelDisplay = () => { console.log('我是子组件，执行我'); };
  render() { return <div>子组件</div>; }
}
```

2、子组件把this传给父组件：

```jsx
// 经过实际测试
// 父组件
const Parent = () => {
  const [childRef, setChildRef] = React.useState('');
  return (
    <div>
      <button onClick={() => { childRef.setModelDisplay(); }}>click</button>
      <Child onRef={(ref) => { setChildRef(ref); }} />
    </div>
  );
};
// 子组件
class Child extends React.PureComponent {
  componentDidMount() {
    this.props.onRef(this);
  }
  setModelDisplay = () => { console.log('我是子组件，执行我'); };
  render() { return <div>子组件</div>; }
}
```

### 9.4 父-函数组件、子-函数组件

1、父组件使用`React.useRef()`，子组件使用自定义ref属性和useImperativeHandle

- 优点： 1、写法简单易懂 2、假如子组件嵌套了HOC，也可以指向真实子组件
- 缺点： 1、需要自定义props属性 2、需要自定义暴露的方法

```jsx
// 经过测试
// 父组件
import React, { useImperativeHandle } from 'react';
const Parent = () => {
  const ChildRef = React.useRef();
  return (
    <div>
      <button onClick={() => { ChildRef.current.func(); }}>click1</button>
      <Child onRef={ChildRef} />
    </div>
  );
};
// 子组件
const Child = (props) => {
  const [count, setCount] = React.useState(100);
  React.useImperativeHandle(props.onRef, () => ({
    func: () => {
      setCount(count + 1);
      console.log('我是子组件，count：', count);
    },
  }));
  return <div>子组件</div>;
};
export default Parent;
```

2、父组件使用useRef，子组件使用useImperativeHandle和forwardRef组合：

使用forwardRef抛出子组件的ref。这个方法其实更适合自定义HOC。但问题是，withRouter、connect、Form.create等方法并不能抛出ref，假如Child本身就需要嵌套这些方法，那基本就不能混着用了。forwardRef本身也是用来抛出子元素，如input等原生元素的ref的，并不适合做组件ref抛出，因为组件的使用场景太复杂了。

```jsx
// 经过测试
import React, { useRef, useImperativeHandle } from 'react';
// 父组件
const Parent = (props) => {
  const fancyInputRef = React.useRef();
  return (<div>
    <FancyInput ref={fancyInputRef} />
    <button onClick={() => fancyInputRef.current.focus()}>调用子组件的 focus</button>
  </div>);
};
// 子组件
const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
      console.log('子组件执行了');
    },
  }));
  return <input ref={inputRef} type="text" />;
});
export default App;
```

## 10. 父组件操作子组件里面的 dom 元素

主要有以下几种方式实现：

- 1、父组件获取到子组件实例，通过子组件里面的方法操作dom元素
- 2、子组件声明ref变量，绑定到 dom 元素后，主动调用父组件方法，把 ref 传给父组件
- 3、函数组件使用forwardRef包裹后，可以直接把 ref 赋值给 dom 元素的 ref，这样父组件直接就获取到了子组件的dom 的 ref

一些例子：

```jsx
// 1、父组件获取子组件实例，通过子组件实例操作dom 元素
const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
      console.log('子组件执行了');
    },
  }));
  return <input ref={inputRef} type="text" />;
});

// 3、函数组件直接把 ref 属性传给 dom
// 3.1 使用自定义ref 属性，父组件使用 <Child onRef={this.sub} />
const Child = props => <div ref={props.onRef}>子组件 自定义ref属性</div>;
// 3.2 使用 forwardRef 包裹，直接把 ref 赋值给 dom，父组件使用 <Child ref={this.sub} />
const Child2 = React.forwardRef((props, ref) => {
  return <div ref={ref}>子组件 forwardRef 形式</div>;
});
```



## 11. jsx中使用script标签调用JS文件

在jsx中使用script标签调用一个JS文件来执行，发现并没有去请求这个文件：

```jsx
return (
  <div>
    <script src="http://..."></script>
    <script
      // 这里的console.log不会执行
      dangerouslySetInnerHTML={{ __html: "console.log('我是测试')" }}
      />
    <script>
      console.log('我是111'); {/* 这里的console.log不会执行 */}
    </script>
  </div>
)
```

经过查找需要使用JS来手动添加一个script标签，才会执行：

```js
setScript = () => {
  let script = document.querySelector('#script-id');
	// 如果script标签已经存在了，则做一些操作
  if (script) {
    script.setAttribute('value', 'test');
  }
  // 如果标签不存在，则创建一个script标签
  if (!script) {
    script = document.createElement('script');
    script.id = 'script-id';
    script.setAttribute('value', 'test');
    script.setAttribute('src', 'https://www.domain.cn/exposure/runCallback.js');
    // 标签插入的位置
    const footer = window.document.querySelector('#portal-footer-logout');
    if (footer) {
      footer.appendChild(script);
    }
  }
}
```

## 12. 给peops.children传参(插槽、容器类组件)

组件嵌套的时候，既需要再书写的地方传参，又需要嵌套的父组件传参，则可以使用如下两种方式。

1、使用cloneElement，使用这种方式，既可以在写子组件的地方传参，也可以在父组件中传参：

```jsx
export function Father({ children }) {
  const name = 'jack';
  // 如果children 不确定，还可以使用这种方式
  // {React.Children.map(children, child => React.cloneElement(child, { name: name }))}
  return (<div>
    父组件，引入的子组件{React.cloneElement(children, { name: name })}
  </div>);
}
export function Show({ name, age }) {
  return (<p>我是子组件 名字：{name}, 年龄：{age}</p>);
}
export function App() {
  return (<Father><Show age="18" /></Father>);
}
```

cloneElement 官方文档：https://zh-hans.react.dev/reference/react/cloneElement

2、不用组件嵌套，给组件调用渲染方法，这样也达到了在写子组件的地方传参，也可以在父组件中传参：

```jsx
export function Father({ renderShow }) {
  const name = 'jack11';
  return (<div> {renderShow && renderShow(name)} </div>);
}
export function Show({ name, age }) {
  return (<p>我是子组件 名字：{name}, 年龄：{age}</p>);
}
export function App() {
  return (<Father renderShow={name => <Show name={name} age="18" />} />);
}
```

