[[TOC]]

[TOC]

# react组件生命周期

react组件的生命周期就是react组件在运行过程中特定的阶段执行的方法，你可以重写这些方法，以便于在特定阶段做一些对应操作。

React 的生命周期包括三个阶段：

- Mounting（加载阶段）：第一次让组件出现在页面中的过程
- Updating（更新阶段）：mount 之后，如果数据有任何变动，就会来到 update 过程
- Unmounting（卸载阶段）当一个组件将要从页面中移除时，会进入 unmount 过程

到目前为止react最新的版本是16.9.0(2019年08月08号发布)，由于版本迭代了很多，所以生命周期也经历了大的变动，出现了新旧不同的生命周期，部分旧的生命周期支持到react的17版本后就停止使用了。

![react生命周期版本](./img/001-react.png)

react生命周期变动和对应版本说明：

- react 16.2 版本以前的生命周期是旧的生命周期
- react 16.3 版本开始出现了新的生命周期，把旧的不推荐使用的生命周期重命名了
- react 16.4 版本优化了`getDerivedStateFromProps`生命周期，后续react版本的生命周期都跟16.4的一样 

react[官网](https://reactjs.org)文档中关于 Mounting 加载阶段生命周期历史版本变动：

![](./img/002-react.png)



## 1. 新的生命周期

![](./img/003-react.png)

[图片来源](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### 1.1 挂载阶段

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()：组件初始化
- static getDerivedStateFromProps(props, state)：props或state变化触发
- render()：渲染挂载页面
- componentDidMount()：挂载结束后

> ***注意，下面的生命周期即将过时，不推荐使用：***
>
> UNSAFE_componentWillMount():在render()执行前被调用

### 1.2 更新阶段

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- [static getDerivedStateFromProps()](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)：props或state变化触发
- [shouldComponentUpdate(nextProps, nextState)](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)：触发的更新是否渲染
- [**render()**](https://zh-hans.reactjs.org/docs/react-component.html#render)：渲染页面
- [getSnapshotBeforeUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)：在render()后，渲染提交到DOM节点之前调用
- [**componentDidUpdate()**](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)：更新结束后回调

> ***注意，下面的生命周期即将过时，不推荐使用：***
>
> [UNSAFE_componentWillUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillupdate): 在render()执行前被调用
>
> [UNSAFE_componentWillReceiveProps()](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops):props更新后执行，



### 1.3 卸载阶段

当组件从 DOM 中移除时会调用如下方法：

- [**componentWillUnmount()**](https://zh-hans.reactjs.org/docs/react-component.html#componentwillunmount)：组件挂载前执行



## 参考资料

[React.Component 官方文档](https://zh-hans.reactjs.org/docs/react-component.html)

[react 16.4 生命周期图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

[React-新的生命周期（React16版本） segmentfault](https://segmentfault.com/a/1190000016617400)

[详解React生命周期(包括react16版) 简书](https://www.jianshu.com/p/514fe21b9914)