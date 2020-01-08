[[TOC]]

[TOC]



# react Hook

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

> Hook 本质就是 JavaScript 函数，但是在使用它时需要遵循两条规则:
>
> 只在最顶层使用 Hook:
>
> > **不要在循环，条件或嵌套函数中调用 Hook，** 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 `useState` 和 `useEffect` 调用之间保持 hook 状态的正确。
>
> 只在 React 函数中调用 Hook:
>
> > **不要在普通的 JavaScript 函数中调用 Hook**,你可以：
> >
> > - ✅ 在 React 的函数组件中调用 Hook
> > - ✅ 在自定义 Hook 中调用其他 Hook 



## 1. 在函数组件中使用state

```jsx
import React, { useState } from 'react';
function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```



## 2. useEffect

可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

```jsx
React.useEffect(() => {
        function handleWindowResize() {
            setScrollY(Math.max(100, document.body.clientHeight - 300))
        }
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)

  			// 如果需要清除一些内容，则写return语句，没有可以不写
        return () => {
            // 组件卸载时清除
            window.removeEventListener('resize', handleWindowResize)
        }
    })
```

https://zh-hans.reactjs.org/docs/hooks-effect.html



## 参考资料

[Hook 简介 react 官网](https://zh-hans.reactjs.org/docs/hooks-intro.html)