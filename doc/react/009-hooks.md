[[TOC]]

[TOC]



# React Hooks详解

本文整理自：https://juejin.cn/post/7118937685653192735，作者：我不是外星人

## 1. 概述

*Hooks* 是 React 16.8 的新增特性。并在React 18版本新增了一些功能。Hooks可以让函数组件也可以实现部分类组件的功能，比如state状态管理、部分React生命周期钩子、*以及其他的React特性*。

在Hooks出现以前，开发遇到的问题：

- 函数组件后期维护需要添加状态管理的功能
- 一些函数组件中不能处理接口请求、获取数据的逻辑处理，只能改成类组件
- 类组件随着开发功能越来越多，随着功能增强而变得越来越臃肿。在进行优化拆分时，只要有状态管理的就都需要使用类组件拆分

所以 Hooks 出现本质上原因是：

- **让函数组件也能做类组件的事，有自己的状态，可以处理一些副作用，能获取 ref ，也能做数据缓存**
- **解决逻辑复用难的问题**
- **放弃面向对象编程，拥抱函数式编程**

关于自定义  Hooks：

自定义 hooks 是在 React Hooks 基础上的一个拓展，可以根据业务需求制定满足业务需要的组合 hooks ，更注重的是逻辑单元。通过业务场景不同，到底需要React Hooks 做什么，怎么样把一段逻辑封装起来，做到复用，这是自定义 hooks 产生的初衷。

自定义 hooks 也可以说是 React Hooks 聚合产物，其内部有一个或者多个 React Hooks 组成，用于解决一些复杂逻辑。

hooks功能概览和出现的版本：

![](./img/023-hooks.png)



## 2. hooks数据驱动更新

### 2.1 useState

useState 可以使函数组件像类组件一样拥有 state，函数组件通过 useState 可以让组件重新渲染，更新视图。

使用方法、参数说明：

```js
import { useState } from 'react';
const [ state , setState ] = useState(initData)
```

- state：状态变量，目的提供给 UI ，作为渲染视图的数据源。     
- setState：用于更新状态值的函数。当使用这个函数设置新的状态时，React 会根据新的状态重新渲染组件。     
- initData：状态的初始值。分为三种情况：第一种是不传，则 state 的初始值为undefined。第二种情况是非函数，将作为 state 初始化的值。 第三种情况是函数，函数的返回值作为 useState 初始化的值。

useState例子：

```jsx
const DemoState = (props) => {
   /* number为此时state读取值 ，setNumber为派发更新的函数 */
   let [number, setNumber] = useState(0) /* 0为初始值 */
   return (<div>
       <span>{ number }</span>
       <button onClick={ ()=> {
         setNumber(number+1) // 会在下次渲染才更新number便令
         console.log(number) /* 这里的number是 旧值 */
       } } ></button>
   </div>)
}
```

**useState 注意事项：**

1、在函数组件一次执行上下文中，state 的值是固定不变的

```jsx
function Index(){
  const [ number, setNumber ] = React.useState(0)
  const handleClick = () => setInterval(()=>{
    setNumber(number + 1 ) // // 此时 number 一直都是 0
  },1000)
  return <button onClick={ handleClick } > 点击 { number }</button>
}
```

2、 如果两次传入相同的 state 值，那么组件就不会更新

```jsx
let account =5;
export default function Index(){
  const [ state  , dispatchState ] = useState({ name:'alien' })
  const  handleClick = ()=>{ // 点击按钮，视图没有更新。
    state.name = 'Alien';
    dispatchState(state) // state变量是对象，存储的是对象地址，这么操作直接等于内存地址重新赋值了相同的值。而传入相同的state值，组件不会渲染，所以视图没有更新。但是对象内的属性已经修改成功了
  }
  return (<div>
    <span>{state.name}</span>
    <button onClick={handleClick}>changeName++</button>
  </div>);
}
```

3、设置的state值，在当前执行上下文中获取不到最新的 state, 只有再下一次组件 rerender 中才能获取到。

4、当调用 setstate 设置state值时，React 将跳过子组件的渲染及 effect 的执行。需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 `useMemo` 来进行优化。

### 2.2 useReducer

useReducer 是 react-hooks 提供的能够在无状态组件中运行的类似redux的功能 api 。

使用方法、参数说明：

```jsx
import { useReducer } from 'react';
const [ ①state , ②dispatch ] = useReducer(③reducer, initialState, processInitState)
```

- state：状态变量，目的提供给 UI ，作为渲染视图的数据源。
- dispatch：用于更新状态值的函数。本质上跟 useState方法返回的 setState 方法一样。
- reducer：一个函数 reducer ，我们可以认为它就是一个 redux 中的 reducer , reducer的参数就是常规reducer里面的state和action, 返回改变后的state, 这里有一个需要注意的点就是：**如果返回的 state 和之前的 state ，内存指向相同，那么组件将不会更新。**
- initialState：状态的初始值。如果不传则 state 的初始值为undefined。注意不能使用函数返回值形式设置。
- processInitState：选填，处理初始值的方法，initialState 可以当这个函数的参数使用。

useReducer 例子：

```jsx
function Index({ dispatch, State }) {
  return (
    <button onClick={() => { dispatch({ name: 'reset', payload: 666 }); }}>子 重置 {State.number}</button>
  );
}
const DemoUseReducer = ({size}) => {
  /* number为更新后的state值,  dispatchNumber 为当前的派发函数 */
  const [number, dispatchNumber] = useReducer((state, action) => {
    const { payload, name } = action;
    switch (name) { // /* return的值为新的state */
      case 'add':
        return state + 1;
      case 'sub':
        return state - 1;
      case 'reset':
        return payload;
      default:
        return 50;
    }
  }, 10, (initialState ) => {return initialState * size});
  return (
    <div>
      当前值：{number}
      <button onClick={() => dispatchNumber({ name: 'add' })}>增加</button>
      <button onClick={() => dispatchNumber({ name: 'sub' })}>减少</button>
      {/* 把dispatch 和 state 传递给子组件  */}
      <Index dispatch={dispatchNumber} State={{ number }} />
    </div>
  );
};
export default DemoUseReducer;
```



### 2.3 useSyncExternalStore(v18新增)

useSyncExternalStore 的诞生和 v18 的更新模式下外部数据的 tearing 有着十分紧密的关联。useSyncExternalStore 能够让 React 组件在 concurrent 模式下安全地有效地读取外接数据源，在组件渲染过程中能够检测到变化，并且在数据源发生变化的时候，能够调度更新。当读取到外部状态发生了变化，会触发一个强制更新，来保证结果的一致性。

使用方法、参数说明：

```jsx
import { useSyncExternalStore } from 'react';
useSyncExternalStore( subscribe, getSnapshot, getServerSnapshot)
```

- subscribe：为订阅函数，当数据改变的时候，会触发 subscribe，在 useSyncExternalStore 会通过带有记忆性的 getSnapshot 来判别数据是否发生变化，如果发生变化，那么会强制更新数据。
- getSnapshot：可以理解成一个带有记忆功能的选择器。当 store 变化的时候，会通过 getSnapshot 生成新的状态值，这个状态值可提供给组件作为数据源使用，getSnapshot 可以检查订阅的值是否改变，改变的话那么会触发更新。
- getServerSnapshot：用于 hydration 模式下的 getSnapshot。

useSyncExternalStore 例子：

```jsx
import { combineReducers , createStore  } from 'redux'

/* number Reducer */
function numberReducer(state=1,action){
    switch (action.type){
      case 'ADD':
        return state + 1
      case 'DEL':
        return state - 1
      default:
        return state
    }
}
/* 注册reducer */
const rootReducer = combineReducers({ number:numberReducer  })
/* 创建 store */
const store = createStore(rootReducer,{ number:1  })

function Index(){
    /* 订阅外部数据源 */
    const state = useSyncExternalStore(store.subscribe,() => store.getState().number)
    console.log(state)
    return <div>
        {state}
        <button onClick={() => store.dispatch({ type:'ADD' })} >点击</button>
    </div>
}
```

点击按钮，会触发 reducer ，然后会触发 store.subscribe 订阅函数，执行 getSnapshot 得到新的 number ，判断 number 是否发生变化，如果变化，触发更新。

### 2.4 useTransition(v18新增)

在 React v18 中，有一种`并发模式(concurrent)`，`concurrent`模式允许将UI更新标记为高优先级的或者可中断的低优先级操作。而`useTransition()`方法可以将某些更新标记为`可中断的`和`非紧急的`-也就是所谓的`transitions`。这种新特性在大量的UI更新操作中尤其有效，比如过滤一个较大的列表。打个比方如下图当点击 tab 从 tab1 切换到 tab2 的时候，本质上产生了两个更新任务。

- 第一个就是 hover 状态由 tab1 变成 tab2。
- 第二个就是内容区域由 tab1 内容变换到 tab2 内容。

这两个任务，用户肯定希望 hover 状态的响应更迅速，而内容的响应有可能还需要请求数据等操作，所以更新状态并不是立马生效，通常还会有一些 loading 效果。所以第一个任务作为**立即执行任务**，而第二个任务就可以视为**过渡任务**。

![](./img/024-hooks.png)

useTransition使用方法、参数说明：

```jsx
import { useTransition } from 'react' 
const  [ isPending , startTransition ] = useTransition ()
```

- isPending：Boolean值，表示处于过渡状态的标志，指明这个`transition`正在加载中(`pending`)
- startTransition：设置过度的方法，这个方法接收一个函数作为参数，在这个参数函数里面执行一些地任务行为

useTransition 例子：

```jsx
/* 模拟数据 */
const mockList1 = new Array(10000).fill('tab1').map((item,index)=>item+'--'+index )
const mockList2 = new Array(10000).fill('tab2').map((item,index)=>item+'--'+index )
const mockList3 = new Array(10000).fill('tab3').map((item,index)=>item+'--'+index )

const tab = { tab1: mockList1, tab2: mockList2, tab3: mockList3 }

export default function Index(){
  const [ active, setActive ] = React.useState('tab1') //需要立即响应的任务，立即更新任务
  const [ renderData, setRenderData ] = React.useState(tab[active]) //不需要立即响应的任务，过渡任务
  const [ isPending,startTransition  ] = React.useTransition() 
  const handleChangeTab = (activeItem) => {
     setActive(activeItem) // 立即更新
     startTransition(()=>{ // startTransition 里面的任务优先级低
       setRenderData(tab[activeItem])
     })
  }
  return <div>
    <div className='tab' >
       { Object.keys(tab).map((item)=> <span className={ active === item && 'active' } onClick={()=>handleChangeTab(item)} >{ item }</span> ) }
    </div>
    <ul className='content' >
       { isPending && <div> loading... </div> }
       { renderData.map(item=> <li key={item} >{item}</li>) }
    </ul>
  </div>
}
```

### 2.5 useDeferredValue(v18新增)

官方说明：https://zh-hans.react.dev/reference/react/useDeferredValue

useDeferredValue用来接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。由于React 18 将UI更新标记为高优先级的或者可中断的低优先级操作。所以我们可以在高优先级任务结束后，再得到新的状态，而这个新的状态就称之为 DeferredValue。

useDeferredValue使用方法、参数说明：

```jsx
import { useDeferredValue } from 'react';
const [value, setValue] = useState('');
const deferrredValue = React.useDeferredValue(value, initialValue?)
```

- value：你想延迟的值，可以是任何类型。
- initialValue：可选值，组件初始渲染时使用的值。如果省略此选项，`useDeferredValue` 在初始渲染期间不会延迟，因为没有以前的版本可以渲染。
- deferrredValue：延迟的值

注意事项：

- 当更新发生在 Transition 内部时，`useDeferredValue` 总是返回新的 `value` 并且不会产生延迟渲染，因为该更新已经被延迟了。
- 传递给 `useDeferredValue` 的值应该是原始值（如字符串和数字）或是在渲染之外创建的对象。如果你在渲染期间创建一个新对象并立即将其传递给 `useDeferredValue`，它在每次渲染时都会不同，从而导致不必要的后台重新渲染。
- `useDeferredValue` 本身不会引起任何固定的延迟。一旦 React 完成原始的重新渲染，它会立即开始使用新的延迟值处理后台重新渲染。由事件（例如输入）引起的任何更新都会中断后台重新渲染，并被优先处理。
- 由 `useDeferredValue` 引起的后台重新渲染在提交到屏幕之前不会触发 Effect。如果后台重新渲染被暂停，Effect 将在数据加载后和 UI 更新后运行。

用法：

- 1、在新内容加载期间显示旧内容
- 2、延迟渲染 UI 的某些部分

useDeferredValue 例子：

```jsx
import React from "react"
const tab = { tab1: ['1','2','3'], tab2: ['4','5','6'], tab3: ['7','8','9'] }
export default function Index(){
  const [ active, setActive ] = React.useState('tab1') //需要立即响应的任务，立即更新任务
  const deferActive = React.useDeferredValue(active) // 把状态延时更新，类似于过渡任务
  const handleChangeTab = (activeItem) => {
     setActive(activeItem) // 立即更新
  }
  const renderData = tab[deferActive] // 使用滞后状态
  return <div>
    <div className='tab' >
       { Object.keys(tab).map((item)=> <span className={ active === item && 'active' } onClick={()=>handleChangeTab(item)} >{ item }</span> ) }
    </div>
    <ul className='content' >
       { renderData.map(item=> <li key={item} >{item}</li>) }
    </ul>
  </div>
}
// 如上 active 为正常改变的状态，deferActive 为滞后的 active 状态，我们使用正常状态去改变 tab 的 active 状态，使用滞后的状态去更新视图，同样达到了提升用户体验的作用。
```

```jsx
import React, { memo, useState, useDeferredValue } from 'react';

const SlowList = memo(function SlowList({ text }) {
  // 仅打印一次。实际的减速是在 SlowItem 组件内部。
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');
  let items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return ( <ul className="items"> {items} </ul> );
});
function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // 每个 item 暂停 1ms，模拟极其缓慢的代码
  }
  return (<li className="item">Text: {text}</li>)
}

export default function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
// 在这个例子中，SlowList 组件中的每个 item 都被 故意减缓了渲染速度，这样你就可以看到 useDeferredValue 是如何让输入保持响应的。当你在输入框中输入时，你会发现输入很灵敏，而列表的更新会稍有延迟。
// 例子链接：https://zh-hans.react.dev/reference/react/useDeferredValue#examples
```



## 3. 执行副作用

React hooks也提供了 api ，用于弥补函数组件没有生命周期的缺陷。其本质主要是运用了 hooks 里面的 useEffect ， useLayoutEffect，还有 useInsertionEffect。其中最常用的就是 useEffect 。

### 3.1 useEffect

```jsx
import { useEffect } from 'react';
useEffect(setup, dependencies?)
```

- setup：处理 Effect 的函数。setup 函数选择性返回一个 **清理（cleanup）** 函数。当组件被添加到 DOM 的时候，React 将运行 setup 函数。在每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。
- dependencies：可选参数，数组，`setup` 代码中引用的所有响应式值的列表。响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数。依赖项里面的值改变，执行上一次setup 返回的 **清理（cleanup）** 函数，和执行新的 effect 第一个参数 setup 。React 将使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较每个依赖项和它先前的值。如果省略此参数，则在每次重新渲染组件之后，将重新运行 Effect 函数。



```jsx
import React, { useEffect, useRef, useState } from "react"

/* 模拟数据交互 */
function getUserInfo(a){
  return new Promise((resolve)=>{
      setTimeout(()=>{ resolve({ name:a, age:16, }) }, 500)
  })
}
const Demo = ({ a }) => {
  const [ userMessage , setUserMessage ] :any= useState({})
  const div= useRef()
  const [number, setNumber] = useState(0)
  const handleResize =()=>{} // 模拟事件监听处理函数
  /* useEffect使用 ，这里如果不加限制 ，会是函数重复执行，陷入死循环*/
  useEffect(()=>{
     /* 请求数据 */
     getUserInfo(a).then(res=>{
         setUserMessage(res)
     })
     /* 定时器 延时器等 */
     const timer = setInterval(()=>console.log(666),1000)
     /* 操作dom  */
     console.log(div.current) /* div */
     /* 事件监听等 */
     window.addEventListener('resize', handleResize)
     return function(){ // 此函数用于清除副作用
         clearInterval(timer) 
         window.removeEventListener('resize', handleResize)
     }
  /* 只有当props->a和state->number改变的时候 ,useEffect副作用函数重新执行 ，如果此时数组为空[]，证明函数只有在初始化的时候执行一次相当于componentDidMount */
  },[ a ,number ])
  return (<div ref={div} >
      <span>{ userMessage.name }</span> <span>{ userMessage.age }</span>
      <div onClick={ ()=> setNumber(1) } >{ number }</div>
  </div>)
}
```















