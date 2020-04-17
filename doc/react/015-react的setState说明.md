[[TOC]]

[TOC]



# react中setState说明

整理转载自：[程墨Morgan](https://www.zhihu.com/people/morgancheng)的两篇文章：

https://zhuanlan.zhihu.com/p/25954470

https://zhuanlan.zhihu.com/p/26069727

setState的关键点:

1.  setState不会立刻改变React组件中state的值；
2.  setState通过引发一次组件的更新过程来引发重新绘制；
3.  多次setState函数调用产生的效果会合并。

这几个关键点其实是相互关联的，一个一个说吧。

## 1.setState不会立刻改变React组件中state的值

在React中，一个组件中要读取当前状态用是访问this.state，但是更新状态却是用this.setState，不是直接在this.state上修改，为什么呢？

```js
//读取状态
const count = this.state.count；
//更新状态
this.setState({count: count + 1}）；
//无意义
this.state.count = count + 1;
```

因为this.state说到底只是一个对象，单纯去修改一个对象的值是没有意义的，去驱动UI的更新才是有意义的，想想看，如果只是改了this.state这个对象，但是没有让React组件重新绘制一遍，那有什么用？你可以尝试在代码中直接修改this.state的值，会发现的确能够改变状态，但是却不会引发重新渲染。

```js
this.state.count = 100;
this.forceUpdate();
```

所以，需要用一个函数去更改状态，这个函数就是setState，当setState被调用时，能驱动组件的更新过程，引发componentDidUpdate、render等一系列函数的调用。

因为setState并不会立刻修改this.state的值，所以下面的code可能产生很不直观的结果。

```js
function incrementMultiple() {
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
}
```

直观上来看，当上面的incrementMultiple函数被调用时，组件状态的count值被增加了3次，每次增加1，那最后count被增加了3，但是，实际上的结果只给state增加了1。

原因并不复杂，就是因为调用this.setState时，并没有立即更改this.state，所以this.setState只是在反复设置同一个值而已，上面的code等同下面这样。

```js
function incrementMultiple() {
  const currentCount = this.state.count;
  this.setState({count: currentCount + 1});
  this.setState({count: currentCount + 1});
  this.setState({count: currentCount + 1});
}
```

currentCount就是一个快照结果，重复地给count设置同一个值，不要说重复3次，哪怕重复一万次，得到的结果也只是增加1而已。

既然this.setState不会立即修改this.state的值，那在什么时候修改this.state的值呢？这就要说一下React的更新生命周期。

## 2.setState通过引发一次组件的更新过程来引发重新绘制

setState调用引起的React的更新生命周期函数4个函数（比修改prop引发的生命周期少一个componentWillReceiveProps函数），这4个函数依次被调用。

-   shouldComponentUpdate

-   componentWillUpdate

-   render

-   componentDidUpdate

当shouldComponentUpdate函数被调用的时候，this.state没有得到更新。

当componentWillUpdate函数被调用的时候，this.state依然没有得到更新。

直到render函数被调用的时候，this.state才得到更新。

(或者，当shouldComponentUpdate函数返回false，这时候更新过程就被中断了，render函数也不会被调用了，这时候React不会放弃掉对this.state的更新的，所以虽然不调用render，依然会更新this.state。）

如果你没兴趣去记住React的生命周期（虽然你应该记住），那就可以简单认为，直到下一次render函数调用时（或者下一次shouldComponentUpdate返回false时）才得到更新的this.state。

不管你喜欢不喜欢，反正this.state就是不会再this.setState调用之后立刻更新。

## 3. 多次setState函数调用产生的效果会合并

比如下面的代码。

```js
function updateName() {
  this.setState({FirstName: 'Morgan'});
  this.setState({LastName: 'Cheng'});
}
```

连续调用了两次this.setState，但是只会引发一次更新生命周期，不是两次，因为React会将多个this.setState产生的修改放在一个队列里，缓一缓，攒在一起，觉得差不多了再引发一次更新过程。

在每次更新过程中，会把积攒的setState结果合并，做一个merge的动作，所以上面的代码相当于这样。

```js
function updateName() {
  this.setState({FirstName: 'Morgan', LastName: 'Cheng'});
}
```

如果每一个this.setState都引发一个更新过程的话，那就太浪费了！

对于开发者而言，也可以放心多次调用this.setState，每一次只要关注当前修改的那一个字段就行，反正其他字段会合并保留，丢不掉。

所以，合并多次this.setState调用更改的状态这个API设计决定也不错。

## 4. setState何时同步更新状态

在React中，**如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state**。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

如果我们按照教科书般的方式来使用React，基本上不会触及所谓的“除此之外”情况。

再说为什么会这样：

在React的setState函数实现中，会根据一个变量***isBatchingUpdates\***判断是直接更新this.state还是放到队列中回头再说，而***isBatchingUpdates***默认是false，也就表示setState会同步更新this.state，但是，有一个函数***batchedUpdates\***，这个函数会把***isBatchingUpdates***修改为true，而当React在调用事件处理函数之前就会调用这个***batchedUpdates\***，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

上面的介绍是不是有点枯燥？我希望不要太枯燥，如果你不关心缘由，那就直接记住结论就行了。

为了展示效果，我们来看一段代码：

http://js.jirengu.com/yonew/5/edit?html,js,output

```js

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
    this.onClickLater = this.onClickLater.bind(this);
    this.state = { count: 0 };
  }

  // 在onClick函数中，我们调用setState函数，然后在console.log上输出this.state，由此判断setState是否同步更新了this.state。
  onClick() {
    this.setState({count: this.state.count + 1});
    console.log('# this.state', this.state);
  }

  onClickLater() {
    setTimeout(() => { this.onClick(); });
  }

  componentDidMount() {
    document.querySelector('#btn-raw').addEventListener('click', this.onClick);
  }

  // 在render函数中，我们用console.log输出一个信息，通过render函数是否被执行，我们能够判断更新过程是否发生了，然后我们用三个按钮分别代表三种事件处理方式。
  render() {
    console.log('#enter render');
    return (
      <div>
        <div>{this.state.count}
          <button onClick={this.onClick}>Increment</button>
          <button id="btn-raw">Increment Raw</button>
          <button onClick={this.onClickLater}>Increment Later</button>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.querySelector('#container'));
```

Increment按钮使用最正规的onClick方式处理点击事件。

Increment Raw通过***addEventListener***处理点击事件。

Increment Later通过***setTimeout***来处理点击事件。

通过点击三个不同的按钮，我们可以看到不同的行为。

点击Increment，先输出没有更新的this.state，然后render函数被执行，可见this.state的更新是异步的，更新过程也是在setState执行之后才引发。

但是如果点击Increment Raw或者Increment Later，就是先执行render函数，然后输输出更新过的this.state，可见，this.state被同步更新了，而且在setState函数执行过程中更新过程就已经完成了。

你还希望setState同步更新this.state吗？

上面的试验很清楚地显示，同步更新this.state的话，每一次调用setState都会引发同步的更新过程，这会更新过程很频繁，也就会导致性能问题。

所以说，虽然React具有让setState同步更新this.state的功能，我们还是避免这种使用方式。

别用这招，我们可以了解一种工具，但是并不表示我们就应该使用它。







## 参考资料

[setState：这个API设计到底怎么样](https://zhuanlan.zhihu.com/p/25954470)

[setState何时同步更新状态](https://zhuanlan.zhihu.com/p/26069727)

