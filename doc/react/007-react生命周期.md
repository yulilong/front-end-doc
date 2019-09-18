[[TOC]]

[TOC]

# react组件生命周期

react组件的生命周期就是react组件在运行过程中特定的阶段执行的方法，你可以重写这些方法，一边在特定阶段做一些对应操作。

React 的生命周期包括三个阶段：

- Mounting（加载阶段）：第一次让组件出现在页面中的过程
- Updating（更新阶段）：mount 之后，如果数据有任何变动，就会来到 update 过程
- Unmounting（卸载阶段）当一个组件将要从页面中移除时，会进入 unmount 过程

到目前为止react最新的版本是16.9.0(2019年08月08号发布)，由于版本迭代了很多，所以声明周期也经历了大的变动，出现了新旧不同的声明周期，部分旧的声明周期支持到react的17版本后就停止使用了。

![react生命周期版本](./img/001-react.png)

react生命周期变动和对应版本说明：

- react 16.2 版本以前的生命周期是旧的生命周期
- react 16.3 版本开始出现了新的生命周期，把旧的不推荐使用的生命周期重命名了
- react 16.4 版本优化了`getDerivedStateFromProps`生命周期，后续react版本的生命周期都跟16.4的一样 

![](./img/002-react.png)



## 参考资料

[React.Component 官方文档](https://zh-hans.reactjs.org/docs/react-component.html)

[react 16.4 生命周期图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

[React-新的生命周期（React16版本） segmentfault](https://segmentfault.com/a/1190000016617400)

[详解React生命周期(包括react16版) 简书](https://www.jianshu.com/p/514fe21b9914)