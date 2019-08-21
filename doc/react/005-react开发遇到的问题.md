[TOC]

# react开发遇到的问题

## 1. Module build failed: SyntaxError: Missing class properties transform.

在react中遇到报错信息：

```
Module build failed: SyntaxError: Missing class properties transform.
```

经过查找发现是webpack配置中的问题，

我之前在webpack中的配置：

```
 module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
           presets: ['react', 'env']
        }
      },
 .........
```

修改解析jsx的配置：

```
 module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {presets: ['react', 'stage-0'], cacheDirectory: true}
      },
 .........
```

https://github.com/babel/babel/issues/2729



## 2.  Cannot update during an existing state transition 

具体的报错信息：

```
Warning: Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.
```

这个错误在偶尔会出来，经过网络查找：

当报这类错误时，说明你的props和states在渲染的时候更改了。

```
大体意思就是在render这种需要props和state进行渲染的方法中，不能再对props和state进行更新。我的理解是，React会在props和state改变的时候调用 render进行DOM diff然后渲染，如果在渲染过程中再对props和states进行更改，就陷入死循环了。
例如：
<Button onPress={hideMessage('隐藏信息')}>隐藏信息</Button>
当点击button时，就会报上述错误，因为这样会在渲染是更改组件的状态。
解决方法：
在调用方法时创建一个匿名函数，再调用。
<Button onPress={()=>{hideMessage('隐藏信息')}}>隐藏信息</Button>
```

参考资料：https://www.jianshu.com/p/9780a302e509