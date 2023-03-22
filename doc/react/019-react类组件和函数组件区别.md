[[TOC]]

[TOC]

# react类组件和函数组件区别

在React中，组件有两种组件的写法。一种是函数组件，另一种是类组件。

1. 无论是使用函数或是类来声明一个组件，它决不能修改它自己的 `props`。
2. 所有 React 组件都必须是纯函数，并禁止修改其自身 `props` 。
3. React是单项数据流，父组件改变了属性，那么子组件视图会更新。
4. 属性 `props` 是外界传递过来的，状态 `state` 是组件本身的，状态可以在组件中任意修改
5. 组件的属性和状态改变都会更新视图。

## 1. 类组件和函数组件介绍

1、类组件：

顾名思义，也就是通过使用ES6类的编写形式去编写组件，该类必须继承React.Component。如果想要访问父组件传递过来的参数，可通过this.props的方式去访问在组件中必须实现render方法，在return中返回React对象：

```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

定义组件有两个要求：

1. 组件名称必须以大写字母开头
2. 组件的返回值只能有一个根元素

2、函数组件：

顾名思义，就是通过函数编写的形式去实现一个`React`组件，是`React`中定义组件最简单的方式。

函数组件只是一个普通的 JavaScript 函数，它可以返回 JSX。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

函数组件接收一个单一的 `props` 对象并返回了一个React元素

## 2. 区别

### 2.1 编写形式

两者最明显的区别在于编写形式的不同，同一种功能的实现可以分别对应类组件和函数组件的编写形式

函数组件：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

类组件：

```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

## 2.2 状态管理

在`hooks`出来之前，函数组件就是无状态组件，不能保管组件的状态，不像类组件中调用`setState`

如果想要管理`state`状态，可以使用`useState`，如下：

```jsx
const FunctionalComponent = () => {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <p>count: {count}</p >
            <button onClick={() => setCount(count + 1)}>Click</button>
        </div>
    );
};
```

在不使用`hooks`情况下，一般如果函数组件调用`state`，则需要创建一个类组件或者`state`提升到你的父组件中，然后通过`props`对象传递到子组件

### 2.3 生命周期

在函数组件中，并不存在生命周期，这是因为这些生命周期钩子都来自于继承的`React.Component`

所以，如果用到生命周期，就只能使用类组件

但是函数组件使用`useEffect`也能够完成替代生命周期的作用，这里给出一个简单的例子：

```jsx
const FunctionalComponent = () => {
    useEffect(() => {
        console.log("Hello");
    }, []);
    return <h1>Hello, World</h1>;
};
```

上述简单的例子对应类组件中的`componentDidMount`生命周期

如果在`useEffect`回调函数中`return`一个函数，则`return`函数会在组件卸载的时候执行，正如`componentWillUnmount`

```jsx
const FunctionalComponent = () => {
 React.useEffect(() => {
   return () => {
     console.log("Bye");
   };
 }, []);
 return <h1>Bye, World</h1>;
};
```

### 2.4 调用方式

如果是一个函数组件，调用则是执行函数即可：

```jsx
// 你的代码 
function SayHi() { 
    return <p>Hello, React</p > 
} 
// React内部 
const result = SayHi(props) // » <p>Hello, React</p >
```

如果是一个类组件，则需要将组件进行实例化，然后调用实例对象的`render`方法：

```jsx
// 你的代码 
class SayHi extends React.Component { 
    render() { 
        return <p>Hello, React</p > 
    } 
} 
// React内部 
const instance = new SayHi(props) // » SayHi {} 
const result = instance.render() // » <p>Hello, React</p >
```

### 2.5 获取渲染的值

函数组件对应如下：

```jsx
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  }

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  }

  return (
    <button onClick={handleClick}>Follow</button>
  )
}
```

类组件对应如下：

```jsx
class ProfilePage extends React.Component {
  showMessage() {
    alert('Followed ' + this.props.user);
  }

  handleClick() {
    setTimeout(this.showMessage.bind(this), 3000);
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>Follow</button>
  }
}
```

两者看起来实现功能是一致的，但是在类组件中，输出`this.props.user`，`Props`在 `React`中是不可变的所以它永远不会改变，但是 `this` 总是可变的，以便您可以在 `render` 和生命周期函数中读取新版本

因此，如果我们的组件在请求运行时更新。`this.props` 将会改变。`showMessage`方法从“最新”的 `props` 中读取 `user`

而函数组件，本身就不存在`this`，`props`并不发生改变，因此同样是点击，`alert`的内容仍旧是之前的内容





