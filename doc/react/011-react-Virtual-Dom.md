[[TOC]]

[TOC]



# react Virtual DOM

Virtual DOM 概况来讲，就是在数据和真实 DOM 之间建立了一层缓冲。对于开发者而言，数据变化了就调用 React 的渲染方法，而 React 并不是直接得到新的 DOM 进行替换，而是先生成 Virtual DOM，与上一次渲染得到的 Virtual DOM 进行比对，在渲染得到的 Virtual DOM 上发现变化，然后将变化的地方更新到真实 DOM 上。

简单来说，React 在提供给开发者简单的开发模式的情况下，借助 Virtual DOM 实现了性能上的优化，以致于敢说自己“不慢”。

React 基于 Virtual DOM 的数据更新与UI同步机制：

![React - 初始渲染](./img/014-react-virtual.svg)

初始渲染时，首先将数据渲染为 Virtual DOM，然后由 Virtual DOM 生成 DOM。

![React - 数据更新](./img/015-react-virtual.svg)

数据更新时，渲染得到新的 Virtual DOM，与上一次得到的 Virtual DOM 进行 diff，得到所有需要在 DOM 上进行的变更，然后在 patch 过程中应用到 DOM 上实现UI的同步更新。

Virtual DOM 作为数据结构，需要能准确地转换为真实 DOM，并且方便进行对比。





## 参考资料

[一起理解 Virtual DOM segmentfault](https://segmentfault.com/a/1190000007694388)

[理解 Virtual DOM](https://www.w3cplus.com/javascript/understand-the-Virtual-DOM.html)

[图解 React Virtual DOM segmentfault](https://segmentfault.com/a/1190000010924023)