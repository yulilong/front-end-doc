[[TOC]]

[TOC]

# react使用手册

## 1. react样式的写法

```jsx
var HelloWorld = React.createClass({  
  render:function(){  
    var styles = {   color: 'blue',  fontSize: '30'  }  
    return (  
      <div className="box">  
        <h3 className="title" 
          style={{color:'red',backgroundColor:'lime'}}>默认标题</h3>  
        <p className="subtitle" style={styles}>说明</p>  
        <p className="details">这个是用来教学的案例</p>  
      </div>  
    )  
  }  
})  
ReactDOM.render(<HelloWorld/>,document.getElementById("app"))  
```

- JSX中使用样式 

  1、行内样式：写行内样式的时候需要使用两个{}  ==>{{}}    

  2、对象样式：在return前面定义一个样式对象，注意样式的写法，与HTML的不同点     

  3、CSS样式

- 在HTML5中与在React中的样式的书写区别

  1、HTML5中以`;`结束，在React中以`,`结束

  2、在HTML5中属性与值都不需要加上引号。在React中，属于javascript对象，key中不能存在 `-`,需要使用驼峰命名，如果是value值，需要加上引号

  3、在HTML中，设置带数字的值，宽度，高度==，需要带上单位。在React中可以不用带单位，直接写数字 这里是指那些规定了默认单位的值。比如说像素px，如果要使用em或者是rem则需要加上单位

- 其他注意事项

  在使用插值符号的时候，里面需要时一个对象或者是一个表达式

参考资料：https://blog.csdn.net/chuipaopao163/article/details/73432229

### 1.1 JSX中根据条件显示特殊样式

```jsx
<div className={(this.state.menuIndex === i ? 'active' : '')} />
```

### 1.2 多个类样式根据不同条件来显示

可使用npm包工具来实现：<https://www.npmjs.com/package/classnames>

或者自己根据条件来拼字符串：

```jsx
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



## 2. 生命周期（Lifecycle）

https://segmentfault.com/a/1190000004168886

https://segmentfault.com/a/1190000018490987

React 的生命周期包括三个阶段：mount（挂载）、update（更新）和 unmount（移除）

### 2.1 mount

mount 就是第一次让组件出现在页面中的过程。这个过程的关键就是 render 方法。React 会将 render 的返回值（一般是虚拟 DOM，也可以是 DOM 或者 null）插入到页面中。

这个过程会暴露几个钩子（hook）方便你往里面加代码：

1. constructor()
2. componentWillMount()
3. render()
4. componentDidMount()

我用一幅图解释一下：

![](http://cdn.jscode.me/2017-04-09-14916683117874.jpg)

### 2.2 update

mount 之后，如果数据有任何变动，就会来到 update 过程，这个过程有 5 个钩子：

1. componentWillReceiveProps(nextProps) - 我要读取 props 啦！

2. shouldComponentUpdate(nextProps, nextState) - 请问要不要更新组件？true / false
3. componentWillUpdate() - 我要更新组件啦！
4. render() - 更新！
5. componentDidUpdate() - 更新完毕啦！

 ### 2.3 unmount

当一个组件将要从页面中移除时，会进入 unmount 过程，这个过程就一个钩子：

1. componentWillUnmount() - 我要死啦！

你可以在这个组件死之前做一些清理工作。

 

## 3. ref的使用

ref是使用回调函数的方式去使用：

```jsx
class Input extends Component {
  focus = () => { this.textInput.focus(); }
  render(){
    return (<input ref={(input) => { this.textInput = input }} />)
	}
}
```

`input`参数来源：

当我们在DOM Element中使用`ref`时，回调函数将接收当前的DOM元素作为参数，然后存储一个指向这个DOM元素的引用。那么在示例代码中，我们已经把`input`元素存储在了`this.textInput`中，在`focus`函数中直接使用原生DOM API实现focus聚焦。

父组件使用ref调用子组件方法:

```jsx
class Son extends React.Component {
  getShowData = (params) => { console.log('params ', params) }
  render() { return ( <div>12312</div> ) }
}
class father extends React.Component {
  // 获取子组件引用
  getRef = (ele) => {
    this.incomeTable = ele;
    if (ele) {
      const params = {a: 1, b: 2}
      ele.getShowData(params);
    }
  }
  render() {
    return (  <Son  ref={this.getRef} /> )
  }
}
```

- ref的回调函数执行时间

  当组件挂载后和卸载后，以及ref属性本身发生变化时，回调函数就会被调用。

可以在组件实例中使用`ref`：

```jsx
// <Input>来源于上面的示例代码👆
class AutoFocusTextInput extends Component {
  componentDidMount(){
    this.textInput.focus();
  }
  render(){
    return (
      <Input ref={(input) => { this.textInput = input }}>
    )
	}
}
```

当我们在`<Input>`中添加`ref`属性时，其回调函数接收已经挂载的组件实例`<Input>`作为参数，并通过`this.textInput`访问到其内部的`focus`方法。也就是说，上面的示例代码实现了当`AutoFocusTextInput`组件挂载后`<Input>`组件的自动聚焦。

接下来文档指出，`<Input>`组件必须是使用`class`声明的组件，不然无法使用。这意味着React逐渐与ES6全面接轨了。

父组件的ref回调函数可以使用子组件的DOM:

这是Facebook非常不推荐的做法，因为这样会打破组件的封装性，这种方法只是某些特殊场景下的权宜之计。我们看看如何实现，上代码：

```jsx
function CustomTextInput(props) {
  return (<input ref={props.inputRef} />);
}
class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput inputRef={el => this.inputElement = el} />
		);
	}
}
```

原理就是父组件把`ref`的回调函数当做`inputRef`props传递给子组件，然后子组件`<CustomTextInput>`把这个函数和当前的DOM绑定，最终的结果是父组件`<Parent>`的`this.inputElement`存储的DOM是子组件`<CustomTextInput>`中的`input`。

同样的道理，如果A组件是B组件的父组件，B组件是C组件的父组件，那么可用上面的方法，让A组件拿到C组件的DOM。但是官方态度是discouraged，这种多级调用确实不雅，我们确实需要考虑其他更好的方案了。

 参考资料：https://juejin.im/post/5927f51244d904006414925a

## 4.Context：组件间共享变量

Context是react 16.0以上版本才支持的。

注意：使用Context共享变量时，要是一个React.createContext创建的才能共享

### 4.1 API说明

```jsx
// 1. 创建一个Context文件，所有地方都只能引入这一个文件{Provider, Consumer}
export const UserContext = React.createContext(defaultValue);

// 2. 设置变量，Provider接收一个 value 属性，这个变量就是Context用到的变量，所有用到的变量的组件都要包裹在Provider下面。
// 要引入UserContext文件
<UserContext.Provider value={{ name: 'Alice', age: age, setAge: setAge }}>
  <Content />
</UserContext.Provider>

// 3. 使用变量：Consumer接收一个函数作为子节点函数接收当前 context 的值并返回一个 React 节点。传递给函数的 value 将等于组件树中上层 context 的最近的 Provider 的 value 属性。
// 如果 context 没有 Provider ，那么 value 参数将等于被传递给 createContext() 的 defaultValue 。
// 要引入UserContext文件
<UserContext.Consumer>
  { value => (<div>名字：{value.name}，年龄：{value.age}</div>)}
</UserContext.Consumer>

// 4. 其他方式使用变量
// 4.1 函数组件：使用React.useContext(UserContext)，具体看下面例子
// 4.1 类组件：使用 contextType，具体看下面例子
```

每当Provider的值发送改变时, 作为Provider后代的所有Consumers都会重新渲染。 从Provider到其后代的Consumers传播不受shouldComponentUpdate方法的约束，因此即使祖先组件退出更新时，后代Consumer也会被更新。

通过使用与[Object.is](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description)相同的算法比较新值和旧值来确定变化。

### 4.2 一个使用的例子(使用变量、修改变量)：

```jsx
// contextTest.js：定义一个context 文件，所有用到这个context的组件都要引用这个文件
import React from 'react';
export const UserContext = React.createContext();

// 共同的父组件发布变量
import React from 'react';
import { UserContext } from '@views/contextTest.js'; // 引入共同的 Context
const Content = () => (<div> <UserInfo /> </div>);
const App = () => (
  const [age, setAge] = React.useState(256); // 让子组件可以修改 Context
  <UserContext.Provider value={{ name: 'Alice', age: age, setAge: setAge }}>
    <Content />
  </UserContext.Provider>
);

// 函数组件使用变量：1、通过useContext使用。2、通过Consumer使用
// 修改变量可以通过给useContext 传方法，然后调用方法修改变量
import React, { useContext } from 'react';
import { UserContext } from '@views/contextTest.js'; // 引入共同的 Context
export default function UserInfo() {
  const user = useContext(UserContext); // 1、通过useContext获取变量
  return (<div>
    <p>用户名: {user.name}</p> <p>年龄: {user.age}</p>
    <button onClick={() => { user.setAge(user.age + 1); }}>增加年龄</button>
    <UserContext.Consumer> {/* 2、通过Consumer获取变量 */}
      { value => (<div>名字：{value.name}，年龄：{value.age}</div>)}
    </UserContext.Consumer>
  </div>);
}

// class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
// 这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
// 如果你正在使用实验性的 public class fields 语法，你可以使用 static 这个类属性来初始化你的 contextType。
// 类组件使用变量：1、通过contextType。2、通过Consumer使用(跟上面的函数组件一样，这里不写了)
class UserInfo extends React.PureComponent {
  static contextType = UserContext;
  componentDidMount() {
    // 使用contexType可以在任意生命周期访问数据，使用 this.context 来消费最近 Context 上的那个值
    const value = this.context;
    console.log(value);
  }
  render() {
    return (<div>name:{this.context.name}age:{this.context.age}</div>);
  }
}
```

### 4.3 多个Context使用例子

```jsx
// 多个context 文件
const SchoolContext = React.createContext({
  name: '南师附中',
  location: '南京',
});
const StudentContext = React.createContext({
  name: 'chengzhu',
  age: 17,
});
export { SchoolContext, StudentContext };

// 共同父组件发布变量， 直接写调用的地方
<SchoolContext.Provider value={school}>
  <StudentContext.Provider value={student}>
    <MiddlePage />
  </StudentContext.Provider>
</SchoolContext.Provider>

// 使用变量，直接写调用的地方
<SchoolContext.Consumer>
  {school => (
    <StudentContext.Consumer>
      {student => {
        return (
          <div>
            学校: {school.name}，位置: {school.location}
            学生姓名: {student.name}，学生年龄: {student.age}
          </div>
        );
      }}
    </StudentContext.Consumer>
  )}
</SchoolContext.Consumer>
```

参考资料：https://blog.csdn.net/qq_34307801/article/details/109774612

## 5. setState()说明

`setState()`将对组件状态的改变排队，并告诉该组件及其子组件需要用已经更新的状态来重新渲染。这个方法主要是用来更新用户界面以响应事件处理和服务器响应。

1、`setState()`不总是立刻更新组件。其可能是成批处理或推迟更新。这使得在调用`setState()`后立刻读取`this.state`变成一个潜在陷阱。

```jsx
this.setState({ tt: 20}, () => { console.log('tt: ', this.state.tt) });
this.setState({ tt: 50}, () => { console.log('tt: ', this.state.tt) });
```

上面代码执行后，输出`50 50`, 说明方法合并到一起执行了

2、`setState()`永远都会导致重新渲染，除非`shouldComponentUpdate()` 返回`false`。所以和渲染无关的状态不要放在state中。

3、`setState()`的第二个参数是一个可选的回调函数，其执行将是在一旦`setState`完成，并且组件被重新渲染之后。通常，对于这类逻辑，我们推荐使用`componentDidUpdate`。

由于使用setState()更新了值后，不会立刻就能使用`this.state`看到最新的值，如：

```jsx
constructor(props, context) {
  super(props, context)
  this.state = { value: 1 };
}
// 第一次render后的生命周期
componentDidMount () {
  let value = 10;
  this.setState({tt: 10,})
  console.log('tt: ', this.state.tt);	// 此时输出的是1
}
```

### 5.1 执行setState()后this.state立即获取到更新方法

`setState()`的第二个参数是一个可选的回调函数，其执行将是在一旦`setState`完成，并且组件被重新渲染之后。可用如下方法：

```jsx
componentDidMount () {
  this.setState({ tt: 20}, () => {
    this.pp();
  });
  // this.setState({tt: 30}, this.pp ) 此方法也可以
}
pp = () => { console.log('tt: ', this.state.tt) }
```

可以使用**setTimeout**异步函数来替代。

```jsx
componentDidMount () {
 this.setState({tt: 40})
 setTimeout(this.pp, 0);	// 40
}
pp = () => { console.log('tt: ', this.state.tt) }
```

或者把需要的实时的变量放到类变量里面：

```jsx
constructor(props, context) {
  super(props, context)
  this.state = { value: 1 };
  this.value = 1; // 直接把变量放在这里
}
```

参考资料：

https://www.cnblogs.com/feiyu6/p/9202873.html

https://react.docschina.org/docs/react-component.html#setstate

### 5.2 在setState里面使用state的变量

```jsx
this.setState(prevState => ({
  collapsed: !prevState.collapsed
}));
```



## 6. 无状态组件SFC

无状态组件顾名思义就是没有状态的组件，如果一个组件不需要管理 state 只是纯的展示，那么就可以定义成无状态组件。无状态组件是在 React 在 v0.14 之后推出的

无状态组件是没有 refs 属性的。

无状态的函数创建的组件是无状态组件，它是一种只负责展示的纯组件：

```jsx
function HelloComponent(props) {
    return <div>Hello {props.name}</div>
}
ReactDOM.render(<HelloComponent name="marlon" />, mountNode)
```

对于这种无状态的组件，使用函数式的方式声明，会使得代码的可读性更好，并能大大减少代码量，箭头函数则是函数式写法的最佳搭档：

```jsx
const Todo = (props) => (
  <li
    onClick={props.onClick}
    style={{textDecoration: props.complete ? "line-through" : "none"}}
  >
    {props.text}
  </li>
)
```

上面定义的 `Todo` 组件，输入输出数据完全由`props`决定，而且不会产生任何副作用。对于`props`为 `Object` 类型时，我们还可以使用 ES6 的解构赋值：

```jsx
const Todo = ({ onClick, complete, text, ...props }) => (
  <li
    onClick={onClick}
    style={{textDecoration: complete ? "line-through" : "none"}}
    {...props}
  >
    {props.text}
  </li>
)
```

**优点**：

- 适当减少代码量，可读性增强；

- 无状态，统一移交给高阶组件（HOC）或者 Redux 进行管理；

  这种模式在大型项目或者组件中经常被使用，未来 React 也会对 SFC 做一些专门的优化；

这种模式被鼓励在大型项目中尽可能以简单的写法 来分割原本庞大的组件，而未来 React 也会面向这种无状态的组件进行一些专门的优化，比如避免无意义的检查或内存分配。所以建议大家尽可能在项目中使用无状态组件。

无状态组件内部其实是可以使用`ref`功能的，虽然不能通过`this.refs`访问到，但是可以通过将`ref`内容保存到无状态组件内部的一个本地变量中获取到。

例如下面这段代码可以使用`ref`来获取组件挂载到DOM中后所指向的DOM元素:

```jsx
function TestComp(props){
  let ref;
  return ( <div ref={(node) => ref = node}></div> )
}
```

参考资料：

https://www.w3cplus.com/react/stateful-vs-stateless-components.html

## 7. PureComponent 纯组件

> PureComponent 的作用：用来提升性能，因为它减少了应用中的渲染次数。

React15.3 中新加了一个 `PureComponent` 类，它是优化 React 应用程序最重要的方法之一。

在简单组件（纯展示组件）上的性能可以高出 `React.Component` 几十倍，所以性能还是很可观的~

### 7.1 原理

当组件更新时，如果组件的 `props` 和 `state` 都没发生改变，`render` 方法就不会触发，省去 **Virtual DOM** 的「生成」和「比对」过程，达到提升性能的目的。

React 做了如下判断：

```js
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps)
  || !shallowEqual(inst.state, nextState);
}
```

这里的 `shallowEqual` 会比较 `Object.keys(state | props)` 的**长度是否一致**，每一个 `key` 是否**两者都有**，并且**是否是一个引用**，也就是只比较了**第一层的值**，确实很浅，所以深层的嵌套数据是对比不出来的。

### 7.2 注意点

1. 如果 `PureComponent` 里有 `shouldComponentUpdate` 函数的话，React 会直接使用 shouldComponentUpdate 的结果作为是否更新的依据；

   只有**不存在** `shouldComponentUpdate` 函数，React 才会去判断是不是 `PureComponent`，是的话再去做 `shallowEqual` 浅比较。

   也因为可以少写 `shouldComponentUpdate` 函数，倒也节省了点代码。

2. 因为只做了浅比较，所以需要注意 state 或 props 中修改前后的对象引用是否一致；

3. 由于是 React15.3 之后才有的，所以可能需要进行兼容操作；

   ```jsx
   import React { PureComponent, Component } from 'react';
   class Foo extends (PureComponent || Component) {
     //...
   }
   ```

参考资料：https://blog.lbinin.com/frontEnd/React/React-SFC.html

react官网关于PureComponent组件介绍：https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent

## 8. Fragments:解决必须有一个根节点问题

`<React.Fragment>`是为了解决`render`函数必须有一个跟节点问题。

react版本15以前，`render`函数的返回必须有一个根节点，否则报错，为满足这一原则我会使用一个没有任何样式的 div 包裹一下。

react版本16开始，render支持返回数据，这一特性已经可以减少不必要节点嵌套：

```jsx
import React from 'react';
export default function () {
    return [ <div>一步 01</div>, <div>一步 02</div>, <div>一步 03</div> ];
}
```

如果你不喜欢用数组，React 16为我们提供了Fragments：

```jsx
import React from 'react';
export default function () {
  return (
    <React.Fragment>
      <div>一步 01</div>
      <div>一步 02</div>
    </React.Fragment>
  );
}
```

### 8.1 Fragments简写形式`<></>`

`<></>`形式，前有些前端工具***支持的还不太好\***，用 create-react-app 创建的项目就不能通过编译

```jsx
import React from 'react';
export default function () {
  return (
    <>
    <div>一步 01</div>
    <div>一步 02</div>
    </>
  );
}
```

## 9 react中DOM元素

https://zh-hans.reactjs.org/docs/dom-elements.html

React 实现了一套独立于浏览器的 DOM 系统，兼顾了性能和跨浏览器的兼容性。我们借此机会完善了浏览器 DOM 实现的一些特殊情况。

在 React 中，所有的 DOM 特性和属性（包括事件处理）都应该是小驼峰命名的方式。例如，与 HTML 中的 `tabindex` 属性对应的 React 的属性是 `tabIndex`。例外的情况是 `aria-*` 以及 `data-*` 属性，一律使用小写字母命名。比如, 你依然可以用 `aria-label` 作为 `aria-label`。

### 9.1 dangerouslySetInnerHTML

使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于[跨站脚本（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting)的攻击。

在react中html字符串不会渲染成真正的html，也不会执行脚本文件。

`dangerouslySetInnerHTML` 是 React 为浏览器 DOM 提供 `innerHTML` 的替换方案。当你想设置 `dangerouslySetInnerHTML` 时，需要向其传递包含 key 为 `__html` 的对象，以此来警示：

```jsx
function MyComponent(item) {
  const replaceHtml = (str) => { return str.replace('/', '')}
  // return <div dangerouslySetInnerHTML={createMarkup()} />;
  // <div dangerouslySetInnerHTML={{ __html: '<div>123</div>' }} />
  return <div dangerouslySetInnerHTML={{__html:replaceHtml(item.process)}} />
}
```

1、dangerouslySetInnerHTMl 是React标签的一个属性。2、有2个{{}}，第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对。3、.既可以插入DOM，又可以插入字符串。

## 10. props.children(容器类组件、插槽)

在编写html页面的时候，标签嵌套是很常见的。有时候你会希望以同样的方式嵌套自己开发的组件。当组件标签有子节点时，组件将在名为 `children` 的 props 中接收到该内容。

**children 属性**：表示组件标签的子节点。children 属性与普通的props一样，可以是任意值（文本、JSX、组件，甚至是函数）

```jsx
function ListItem ({ children }) {
  children() // 当函数执行，需要加判断
  return (<div>{ children } </div>);
}
{/* 当写了子组件， 那么props.children的值就是子组件，手动传的children属性无效*/}
<ListItem children="手写的">
  普通文本
  <div>标签</div>
  {() => console.log('函数')}
</ListItem>
```

`props.children` 就可以获得组件的子节点，有以下几种情况：       
1、组件没有子节点，`props.children` 类型为 undefined；       
2、组件有一个子节点，`props.children` 类型为 子节点的类型(原始类型、对象、函数等)；        
3、组件有多个子节点，`props.children` 类型为 array。

注意：JSX将会自动删除`每行开头和结尾`的`空格`，以及空行。它还会把`字符串中间`的`空白行`压缩为一个空格。以下的这些例子都会渲染出一样的情况：

```jsx
<Grid>Hello world!</Grid>
<Grid>
  
  Hello
  
  world!
</Grid>
```

为什么 children 属性并不总是一个数组？

在 React 中，`children` 属性是被视为 **不透明的** 数据结构。这意味着你不应该依赖它的结构。如果要转换，过滤，或者统计子节点，你应该使用 `React.Children` 方法。

实际操作过程中，`children` 在底层常常被表示为数组。但是如果这里只有一个子节点，那么 React 将不会创建数组，因为这将导致不必要的内存开销。只要你使用 `React.Children` 方法而不是直接操作 `children` 底层结构，即使 React 改变了 `children` 数据结构的实际实现方式，你的代码也不会被中断。

当 `children` 是一个数组时，`Children.map` 会有许多有用的特性。比如，`Children.map` 将被返回元素上的 [key](https://zh-hans.react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) 和 你传递给它的 `children` 上的 key 绑定。这保证了原本的 JSX 子元素不会“丢失” key，即使它们上面的例子中那样被包裹。

## 11. React.Children：处理和转化props.children

由于 props.children 可以是任何类型，比如原始类型、数组、函数、对象等等。因此React提供了一系列的函数助手来使得操作children更加方便。

官方文档地址：https://zh-hans.react.dev/reference/react/Children

**注意**：使用 `Children` 的场景并不常见，使用它可能会削弱代码的健壮性。[查看常见的替代方案](https://zh-hans.react.dev/reference/react/Children#alternatives)。

- [Children.count(children)](https://zh-hans.react.dev/reference/react/Children#children-count)：获取 `children` 中的节点数量
- [Children.forEach(children, fn, thisArg?)](https://zh-hans.react.dev/reference/react/Children#children-foreach)：遍历 `children` 中的节点
- [Children.map(children, fn, thisArg?)](https://zh-hans.react.dev/reference/react/Children#children-map)：遍历 `children` 中的节点，返回新的处理后的节点
- [Children.only(children)](https://zh-hans.react.dev/reference/react/Children#children-only)：断言 `children` 代表一个 React 元素
- [Children.toArray(children)](https://zh-hans.react.dev/reference/react/Children#children-toarray)：将 `children` 转换成数组

### 11.1 Children.count 统计子节点数量

因为`this.props.children` 可以是任何类型的，检查一个组件有多少个children是非常困难的。而片面的使用this.props.children.length时, 当传入的是字符串或者函数时，不会得到想要的结果，比如有个child：`"Hello World!"` ，但是使用 `.length` 的方法将会显示为12。

这就是为什么我们有 `React.Children.count` 方法的原因。

```jsx
class ChildrenCounter extends React.Component {
  render() {
    return <p>React.Children.count(this.props.children)</p>
  }
}
<ChildrenCounter> {/* 1个 */}
  Second!
</ChildrenCounter>
<ChildrenCounter> {/* 2个 */}
  <p>First</p>
  <ChildComponent />
</ChildrenCounter>
<ChildrenCounter> {/* 2个, 函数不统计，实测结果 */}
  {() => <h1>First!</h1>}
  Second!
  <p>Third!</p>
</ChildrenCounter>
```

**注意**：空节点（`null`，`undefined` 以及布尔值），字符串，数字和 [React 元素](https://zh-hans.react.dev/reference/react/createElement) 都会被统计为一个节点。**在遍历统计的过程中，React 元素不会被渲染，所以其子节点不会被统计**。 [Fragment](https://zh-hans.react.dev/reference/react/Fragment) 也不会被统计。函数不统计。对于数组，它本身也不会被统计，但其中的元素遵循上述规则。

### 11.2 遍历子节点

遍历处理子节点方法 `React.Children.map` 和 `React.Children.forEach` 。它们在对应数组的情况下能起作用，除此之外，当函数、对象或者任何东西作为children传递时，它们也会起作用。

```jsx
function IgnoreFirstChild({ children }) {
  return (<div>
    {React.Children.map(children, (child, i) => {
      if (i < 1) return null; // 忽略第一个元素
      return child;
    })}
  </div>);
}
{/* 使用 */}
<IgnoreFirstChild>
  <ListItem /> {/* 忽略这个元素 */}
  <p>Third!</p>
</IgnoreFirstChild>
```

上面的例子，我们也可以使用children.map方法。但是如果将一个函数作为child传递过来。children就会变成一个函数而不是数组，由于函数没有map方法，所以会导致报错。而使用 `React.Children.map` 函数，无论什么都不会报错。

```jsx
<IgnoreFirstChild>
  {() => <h1>First!</h1>} {/* React.Children 会忽略这个函数 */}
</IgnoreFirstChild>
```

map、forEach参数说明(children, fn, thisArg?)：

- `children`：组件接收到的 [`children` 属性](https://zh-hans.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)。
- `fn`：和 [数组的 `forEach` 方法](https://zh-hans.react.dev/(https:/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)) 中的回调类似，是你希望为每个子节点执行的函数。当这个函数执行时，对应的子节点和其下标将分别作为函数的第一、第二个参数，下标从 `0` 开始自增。
- **可选** `thisArg`：为 `fn` 函数绑定 [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)。默认值为 `undefined`。

返回值：

- forEach 返回值： `undefined`。
- map返回值：如果 `children` 是 `null` 或者 `undefined`，那么就返回这个值。否则就返回一个由 `fn` 函数返回节点组成的一维数组。这个数组将包含除 `null` 和 `undefined` 以外的所有节点。

注意事项

- 空节点（`null`，`undefined` 以及布尔值），字符串，数字和 [React 元素](https://zh-hans.react.dev/reference/react/createElement) 都会被统计为单个节点。**在遍历统计的过程中，React 元素不会被渲染，所以其子节点不会被统计**。[Fragment](https://zh-hans.react.dev/reference/react/Fragment) 也不会被统计。对于数组，它本身也不会被统计，但其中的元素遵循上述规则。
- 如果你在 `fn` 中返回了一个具有 key 的元素或者元素数组，**各个元素的 key 将自动与其在 `children` 中对应的原始项的 key 绑定**。当你在 `fn` 中返回了一个包含了多个元素的数组时，其中的每个元素的 key 都需要保证在这个数组中是独一无二的。

### 11.3 Children.toArray(children)：将 `children` 转换成数组

如果以上的方法你都不适合，你能将children转换为数组通过 `React.Children.toArray` 方法。如果你需要对它们进行排序，这个方法是非常有用的。

```scala
class Sort extends React.Component {
  render() {
    const children = React.Children.toArray(this.props.children)
    return <p>{children.sort().join(' ')}</p> // 对子元素排序渲染
  }
}
<Sort>
  {/* 我们使用表达式容器来确保我们的字符串，作为三个子字符串传递，而不是作为一个字符串传递  */}
  {'bananas'}{'oranges'}{'apples'}
</Sort>
```

上例会渲染为三个排好序的字符串。

### 11.4 Children.only(children)：断言children是React元素

```jsx
const element = Children.only(children);
```

参数

- `children`：组件接收到的 [`children` 属性](https://zh-hans.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)。

返回值

如果 `children` [是一个合法的元素](https://zh-hans.react.dev/reference/react/isValidElement)，那么就会返回这个元素。否则会抛出一个异常。

注意事项

- 如果传入一个数组（比如 `Children.map` 的返回值）作为 `children`，那么这个方法会抛出异常。也就是说，这个方法强制要求 `children` 是一个 React 元素，而不是一个元素数组。

## 12 React.Children 替代方案

使用 `Children` 方法操作子节点通常会削弱代码的健壮性。在 JSX 中将子节点传递给组件时，通常不希望操作或转换子节点。如果能够的话，尽量避免使用 `Children` 方法。

### 12.1 暴露多个组件

如果你希望 `RowList` 的每一个子节点都被 `<div className="Row">` 包裹，那么可以导出一个 `Row` 组件，然后像下面这样手动把包裹每一行：

```jsx
export function RowList({ children }) {
  return (<div className="RowList"> 1{children} </div>);
}

export function Row({ children }) {
  return (<div className="Row">{children}</div>);
}
export default function App() {
  return (
    <RowList>
      <Row><p>这是第一项。</p></Row>
      <Row><p>这是第二项。</p></Row>
      <Row><p>这是第三项。</p></Row>
    </RowList>
  );
}
```

和使用 `Children.map` 不同，这种方式不会自动包裹每个子节点。但是，和 [上文中关于 `Children.map` 例子](https://zh-hans.react.dev/reference/react/Children#transforming-children) 相比，这种方式具有明显的优势，因为即使你继续抽离更多的组件，它也仍然有效。

### 21.2 接收对象数组作为参数

你也可以显示地传递一个数组作为组件的参数。例如，下面的 `RowList` 接收了一个 `rows` 数组作为组件的参数，因为 `rows` 是一个常规的 JavaScript 数组，`RowList` 组件可以对其使用 [`map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 等数组内置方法。：

```jsx
export function RowList({ rows }) {
  return (
    <div className="RowList">
      {rows.map(row => (
        <div className="Row" key={row.id}>
          {row.content}
        </div>
      ))}
    </div>
  );
}
export default function App() {
  return (
    <RowList rows={[
      { id: 'first', content: <p>这是第一项。</p> },
      { id: 'second', content: <p>这是第二项。</p> },
      { id: 'third', content: <p>这是第三项。</p> }
    ]} />
  );
}
```

和将子节点作为 JSX 传递不同，这个方法允许你将一些额外的数据，比如 `header`，与每个子项关联。因为你直接使用 `tabs`，并且它是一个数组，所以你并不需要 `Children` 方法。

### 12.3 调用渲染属性以自定义渲染

除了为每一个子项生成 JSX，你还可以传递一个返回值类型是 JSX 的函数，并且在必要的时候调用这个函数。在这个示例中，`App` 组件向 `TabSwitcher` 组件传递了一个 `renderContent` 函数。`TabSwitcher` 组件仅对被选中的 tab 调用 `renderContent`。

```jsx
export function TabSwitcher({ tabIds, getHeader, renderContent }) {
  const [selectedId, setSelectedId] = React.useState(tabIds[0]);
  return (
    <div>
      {tabIds.map(tabId => (
        <button key={tabId} onClick={() => setSelectedId(tabId)}>
          {getHeader(tabId)}
        </button>
      ))}
      <hr />
      <div key={selectedId}>
        <h3>{getHeader(selectedId)}</h3>
        {renderContent(selectedId)}
      </div>
    </div>
  );
}
export function App() {
  return (
    <TabSwitcher
      tabIds={['first', 'second', 'third']}
      getHeader={tabId => tabId[0].toUpperCase() + tabId.slice(1)}
      renderContent={tabId => <p>This is the {tabId} item.</p>}
    />
  );
}
```

这是如何在不操纵子组件的情况下，父组件和子组件进行协作的另一个示例。

## 13. cloneElement克隆元素

cloneElement 官方文档：https://zh-hans.react.dev/reference/react/cloneElement

使用方式：cloneElement(element, props, ...children)

说明：调用 `cloneElement` 方法会基于 `element` 创建一个新的 React 元素，但新元素具有不同的 `props` 和 `children`

参数

- `element`：`element` 参数必须是一个有效的 React 元素。例如，它可以是一个类似 `<Something />` 这样的 JSX 节点，也可以是 [`createElement`](https://zh-hans.react.dev/reference/react/createElement) 调用的结果，或者也可以是另一个 `cloneElement` 调用的结果。
- `props`：`props` 参数必须是一个对象或 `null`。如果传 `null`，克隆后的元素将保留所有原始的 `element.props`。否则，对于 `props` 对象中的每个 prop 属性，返回的元素将“优先”使用 `props` 中的值而不是 `element.props` 中的值。其余的 props 将从原始的 `element.props` 中填充。如果你传递 `props.key` 或者 `props.ref`，它们将替换原来的。
- **可选** `...children`：零个或多个子节点。它们可以是任何 React 节点，包括 React 元素、字符串、数字、[portals](https://zh-hans.react.dev/reference/react-dom/createPortal)、空节点（`null`、`undefined`、`true` 和 `false`），和 React 元素数组。如果你不传递任何 `...children` 参数，则原始的 `element.props.children` 将被保留。

返回值

`cloneElement` 返回一个具有一些属性的 React element 对象：

- `type`：与 `element.type` 相同。
- `props`：将 `element.props` 与你传递的 `props` 浅合并的结果。
- `ref`：原始的 `element.ref`，除非它被 `props.ref` 覆盖。
- `key`：原始的 `element.key`，除非它被 `props.key` 覆盖。

通常，你将从组件返回该元素或使其成为另一个元素的子元素。尽管你可以读取元素的属性，但最好在创建每个元素后将其视为不透明的，并且仅渲染它。

使用例子：

```jsx
export function Father({ children }) {
  const name = 'jack';
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

用法：覆盖元素的 props 

想象一个 `List` 组件将其 [`children`](https://zh-hans.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) 渲染为可选择行的列表，并带有可更改的“下一步”按钮选择了哪一行。`List` 组件需要以不同的方式渲染所选的 `Row`，因此它克隆它收到的每个 `<Row>` 子级，并添加额外的 `isHighlighted: true` 或 `isHighlighted: false` 属性。则可以使用克隆元素。具体例子参考官方文档。

