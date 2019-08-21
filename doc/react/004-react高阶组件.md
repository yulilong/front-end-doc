# 高阶组件

参考资料：https://www.jianshu.com/p/0aae7d4d9bc1

## 1. 什么是高阶组件

高阶组件： 接收React组件作为输入，输出一个新的React组件的组件。

> **一个高阶组件只是**一个包装了另外一个 React 组件的 **React 组件**。

这种形式通常实现为一个函数，本质上是一个类工厂（class factory），它下方的函数标签伪代码启发自 Haskell

```
hocFactory:: W: React.Component => E: React.Component
```

这里 W（WrappedComponent） 指被包装的 React.Component，E（Enhanced Component） 指返回的新的高阶 React 组件。

定义中的『包装』一词故意被定义的比较模糊，因为它可以指两件事情：

1. 属性代理（Props Proxy）：高阶组件操控传递给 WrappedComponent 的 props，
2. 反向继承（Inheritance Inversion）：高阶组件继承（extends）WrappedComponent。

我们将讨论这两种形式的更多细节。

## 2. 高阶组件用来做什么？

概括的讲，高阶组件允许你做：

- 代码复用，逻辑抽象，抽离底层准备（bootstrap）代码
- 渲染劫持
- State 抽象和更改
- Props 更改

在探讨这些东西的细节之前，我们先学习如何实现一个高阶组件，因为实现方式『允许/限制』你可以通过高阶组件做哪些事情。

react中主流的两种高阶组件实现方法：

属性代理（Props Proxy）

反向继承（Inheritance Inversion）

两种方法囊括了几种包装 WrappedComponent 的方法。

## 3. 属性代理（Props Proxy）高阶组件

属性代理实现方法如下：

```jsx
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}
```

高阶组件的 render 方法**返回**了一个 type 为 WrappedComponent 的 React Element（也就是被包装的那个组件），我们把高阶组件收到的 props 传递给它，因此得名 **Props Proxy**。

注意：

```jsx
<WrappedComponent {...this.props}/>
// 等价于
React.createElement(WrappedComponent, this.props, null)
```

它们都创建了一个 React Element，描述了 React 在『reconciliation』（可以理解为解析）阶段的渲染内容，如果你想了解更多关于 React Element 的内容，请看 [Dan Abramov 的这篇博客](https://link.jianshu.com?t=https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html) 和官方文档上关于 [reconciliation process](https://link.jianshu.com?t=https://facebook.github.io/react/docs/reconciliation.html) 的部分。

### 3.1 Props Proxy 可以做什么？

- 更改 props
- 通过 refs 获取组件实例
- 抽象 state
- 把 WrappedComponent 与其它 elements 包装在一起

### 3.2 更改 props

可以『**读取，添加，修改，删除**』将要传递给 WrappedComponent 的 props。

在修改或删除重要 props 的时候要小心，你可能应该给高阶组件的 props 指定命名空间（namespace），以防破坏从外传递给 WrappedComponent 的 props。

例子：添加新 props。这个应用目前登陆的一个用户可以在 WrappedComponent 通过 this.props.user 获取

```jsx
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      const newProps = {
        user: currentLoggedInUser
      }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}
```

### 3.3 通过 refs 获取组件实例

你可以通过 ref 获取关键词 **this**（WrappedComponent 的实例），但是想要它生效，必须先经历一次正常的渲染过程来让 ref 得到计算，这意味着你需要在高阶组件的 render 方法中返回 WrappedComponent，让 React 进行 reconciliation 过程，这之后你就通过 ref 获取到这个 WrappedComponent 的实例了。

例子：下方例子中，我们实现了通过 ref 获取 WrappedComponent 实例并调用实例方法。

```jsx
function refsHOC(WrappedComponent) {
  return class RefsHOC extends React.Component {
    proc(wrappedComponentInstance) {
      wrappedComponentInstance.method()
    }
    render() {
      const props = Object.assign({}, this.props, {ref: this.proc.bind(this)})
      return <WrappedComponent {...props}/>
    }
  }
}
```

当 WrappedComponent 被渲染后，ref 上的回调函数 proc 将会执行，此时就有了这个 WrappedComponent 的实例的引用。这个可以用来『**读取，添加**』实例的 props 或用来执行实例方法。

### 3.4 抽象 state

你可以通过向 WrappedComponent 传递 props 和 callbacks（回调函数）来抽象 state，这和 React 中另外一个组件构成思想 [Presentational and Container Components](https://link.jianshu.com?t=https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.9licl3udu) 很相似。

例子：在下面这个抽象 state 的例子中，我们幼稚地（原话是naively :D）抽象出了 name input 的 value 和 onChange。我说这是幼稚的是因为这样写并不常见，但是你会理解到点。

```
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }
      this.onNameChange = this.onNameChange.bind(this)
    }
    onNameChange(event) {
      this.setState({
        name: event.target.value
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange
        }
      }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}
```

然后这样使用它：

```
@ppHOC
class Example extends React.Component {
  render() {
    return <input name="name" {...this.props.name}/>
  }
}
```

这里的 input 自动成为一个[受控的 input](https://link.jianshu.com?t=https://facebook.github.io/react/docs/forms.html)。

> 点击此[链接](https://link.jianshu.com?t=https://github.com/franleplant/react-hoc-examples/blob/master/pp_state.js)查看一个更常见的双向绑定的高阶组件例子

### 3.5 把 WrappedComponent 与其它 elements 包装在一起

出于操作样式、布局或其它目的，你可以将 WrappedComponent 与其它组件包装在一起。一些基本的用法也可以使用正常的父组件来实现（附录 B），但是就像之前所描述的，使用高阶组件你可以获得更多的灵活性。

例子：包装来操作样式

```jsx
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      return (
        <div style={{display: 'block'}}>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
}
```

## 4. 反向继承

反向继承（II）可以像这样简单地实现：

```jsx
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      return super.render()
    }
  }
}
```

如你所见，返回的高阶组件类（Enhancer）继承了 WrappedComponent。这被叫做反向继承是因为 WrappedComponent 被动地被 Enhancer 继承，而不是 WrappedComponent 去继承 Enhancer。通过这种方式他们之间的关系倒转了。

反向继承允许高阶组件通过 **this** 关键词获取 WrappedComponent，意味着它可以获取到 state，props，组件生命周期（component lifecycle）钩子，以及渲染方法（render）。

我不会详细介绍你可以使用组件生命周期方法做什么，因为这是 React 的内容，而不是高阶组件的。但是请注意，你可以通过高阶组件来给 WrappedComponent 创建新的生命周期挂钩方法，别忘了调用 **super.[lifecycleHook]** 防止破坏 WrappedComponent。

React Element 在 React 执行它的 reconciliation 的过程时描述什么将被渲染。

React Element 可以是两个种类其中的一种：String 或 Function。String 类型的 React Element 代表原声 DOM 节点，Function 类型的 React Element 代表通过 React.Component 创建的组件。想要了解更多关于 Elements 和 Components 的知识请阅读此[推文](https://link.jianshu.com?t=https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html)。

Function 类型的 React Element 将在 reconciliation 阶段被解析成 DOM 类型的 React Element （最终结果一定都是 DOM 元素）。

这点非常重要，这意味着『**反向继承的高阶组件不保证一定解析整个子元素树**』。这对渲染劫持非常重要。

### 4.1 反向继承高阶组件可以做什么

- 渲染劫持（Render Highjacking）
- 操作 state

### 4.2 渲染劫持

它被叫做渲染劫持是因为高阶组件控制了 WrappedComponent 生成的渲染结果，并且可以做各种操作。

通过渲染劫持你可以：

- 『读取、添加、修改、删除』任何一个将被渲染的 React Element 的 props
- 在渲染方法中读取或更改 React Elements tree，也就是 WrappedComponent 的 children
- 根据条件不同，选择性的渲染子树
- 给子树里的元素变更样式

**渲染* 指的是 WrappedComponent.render 方法

> 你**无法**更改或创建 props 给 WrappedComponent 实例，因为 React 不允许变更一个组件收到的 props，但是你**可以**在 render 方法里更改子元素/子组件们的 props。

就像之前所说的，反向继承的高阶组件不能保证一定渲染整个子元素树，这同时也给渲染劫持增添了一些限制。通过反向继承，你只能劫持 WrappedComponent 渲染的元素，这意味着如果 WrappedComponent 的子元素里有 Function 类型的 React Element，你不能劫持这个元素里面的子元素树的渲染。

例子：通过 render 来变成 React Elements tree 的结果

```
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      const elementsTree = super.render()
      let newProps = {};
      if (elementsTree && elementsTree.type === 'input') {
        newProps = {value: 'may the force be with you'}
      }
      const props = Object.assign({}, elementsTree.props, newProps)
      const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children)
      return newElementsTree
    }
  }
}
```

在这个例子中，如果 WrappedComponent 的顶层元素是一个 input，则改变它的值为 “may the force be with you”。

这里你可以做任何操作，比如你可以遍历整个 element tree 然后变更某些元素的 props。这恰好就是 [Radium](https://link.jianshu.com?t=http://formidable.com/open-source/radium/) 的工作方式。

注意：你**不能**通过 Props Proxy 来做渲染劫持

即使你可以通过 WrappedComponent.prototype.render 获取它的 render 方法，你需要自己手动模拟整个实例以及生命周期方法，而不是依靠 React，这是不值当的，应该使用反向继承来做到渲染劫持。要记住 React 在内部处理组件的实例，而你只通过 **this** 或 **refs** 来处理实例。

### 4.3 操作 state

高阶组件可以 『读取、修改、删除』WrappedComponent 实例的 state，如果需要也可以添加新的 state。需要记住的是，你在弄乱 WrappedComponent 的 state，可能会导致破坏一些东西。通常不建议使用高阶组件来读取或添加 state，添加 state 需要使用命名空间来防止与 WrappedComponent 的 state 冲突。

例子：通过显示 WrappedComponent 的 props 和 state 来 debug

```jsx
export function IIHOCDEBUGGER(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      return (
        <div>
          <h2>HOC Debugger Component</h2>
          <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
          <p>State</p><pre>{JSON.stringify(this.state, null, 2)}</pre>
          {super.render()}
        </div>
      )
    }
  }
}
```

## 5. 使用高阶组件命名问题

当通过高阶组件来包装一个组件时，你会丢失原先 WrappedComponent 的名字，可能会给开发和 debug 造成影响。

常见的解决方法是在原先的 WrappedComponent 的名字前面添加一个前缀。下面这个方法是从 React-Redux 中拿来的。

```jsx
function getDisplayName(component) {
	return component.displayName || component.name || 'Component';    
}

export default function WithHOC(WrapComponent) {
  // 此处未定义名称
  return class extends React.Component {
    // 定义displayName;
    static displayName = `withHOC(${getDisplayName(WrapComponent)})`;
    render() {
      console.log('inside HOC');
      return (
        return <WrapComponent {...this.props} />
      )
    }
  }
}
App = WithHOC(App);
```

实际上你不用自己写这个方法，因为 [recompose](https://link.jianshu.com?t=https://github.com/acdlite/recompose) 库已经提供了。