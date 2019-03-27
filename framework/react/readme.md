# 四、react编程规范

## 1. Basic Rules 基本规范

- 每个文件只写一个模块.
  - 不过可以包含多个 [Stateless 或 Pure 组件](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)。 eslint 规则：[react/no-multi-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless)
- 推荐使用JSX语法.
- 不要使用 React.createElement，除非从一个非JSX的文件中初始化你的app.

## 2. 创建模块

如果你的模块有内部状态或者是`refs`, 推荐使用 `class extends React.Component` 而不是 `React.createClass`. eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

```javascript
// bad
const Listing = React.createClass({
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
});
// good
class Listing extends React.Component {
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
}
```

如果你的模块没有状态或是没有引用`refs`， 推荐使用普通函数（非箭头函数）而不是类:

```javascript
// bad
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}
// bad (relying on function name inference is discouraged)
const Listing = ({ hello }) => (
  <div>{hello}</div>
);
// good
function Listing({ hello }) {
  return <div>{hello}</div>;
}
```

## 3. 混淆

- [不要使用混淆](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html)

  > 为什么? Mixins 会增加隐式的依赖，导致命名冲突，并且会以雪球式增加复杂度。在大多数情况下Mixins可以被更好的方法替代，如：组件化，高阶组件，工具模块等。

## 4. Naming 命名

- **扩展名:** 使用 `jsx` 作为 React 组件的扩展名
- **文件名:** 文件命名采用帕斯卡命名法，如：`ReservationCard.jsx`
- **引用名:** 组件引用采用帕斯卡命名法，其实例采用驼峰式命名法。eslint rules: [react/jsx-pascal-case](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

```javascript
// bad
const reservationCard = require('./ReservationCard');

// good
const ReservationCard = require('./ReservationCard');

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- **模块命名**: 模块使用当前文件名一样的名称. 比如 `ReservationCard.jsx` 应该包含名为 `ReservationCard`的模块. 但是，如果整个文件夹是一个模块，使用 `index.js`作为入口文件，然后直接使用 `index.js` 或者文件夹名作为模块的名称:

  ```javascript
  // bad
  import Footer from './Footer/Footer';
  // bad
  import Footer from './Footer/index';
  // good
  import Footer from './Footer';
  ```

- **高阶模块命名**: 对于生成一个新的模块，其中的模块名 `displayName` 应该为高阶模块名和传入模块名的组合. 例如, 高阶模块 `withFoo()`, 当传入一个 `Bar` 模块的时候， 生成的模块名 `displayName` 应该为 `withFoo(Bar)`.

  > 为什么？一个模块的 `displayName` 可能会在开发者工具或者错误信息中使用到，因此有一个能清楚的表达这层关系的值能帮助我们更好的理解模块发生了什么，更好的Debug.

  ```javascript
  // bad
  export default function withFoo(WrappedComponent) {
    return function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    }
  }
  
  // good
  export default function withFoo(WrappedComponent) {
    function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    }
  
    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';
  
    WithFoo.displayName = `withFoo(${wrappedComponentName})`;
    return WithFoo;
  }
  ```

- **属性命名:** 避免使用 DOM 属性为组件的属性命名.

  > 为什么？对于 `style` 和 `className` 这样的属性名会默认代表一些含义，在你的应用中使用这些属性来表示其他的含义会使你的代码更难阅读，更难维护，并且可能会引起bug。

  ```javascript
  // bad
  <MyComponent style="fancy" />
  
  // bad
  <MyComponent className="fancy" />
  
  // good
  <MyComponent variant="fancy" />
  ```

## 5. Declaration 声明模块

不要使用 `displayName` 来命名React模块，而是使用引用来命名模块， 如 class 名称.

```javascript
// bad
export default React.createClass({
  displayName: 'ReservationCard',
  // stuff goes here
});
// good
export default class ReservationCard extends React.Component {
}
```

## 6. Alignment 代码对齐

对于 `JSX` 语法，遵循下面的对齐风格。eslint rules: [react/jsx-closing-bracket-location](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)， [react/jsx-closing-tag-location](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

```javascript
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />
         
// good, 有多行属性的话, 新建一行关闭标签
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>
      
// 若能在一行中显示, 直接写成一行
<Foo bar="bar" />
    
// 子元素按照常规方式缩进
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>
```

## 7. Quotes 单引号还是双引号

于JSX属性值总是使用双引号(`"`), 其他均使用单引号(`'`). eslint: [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes)

> 为什么？因为 JSX 属性[不能包含被转移的引号](http://eslint.org/docs/rules/jsx-quotes)，并且双引号使得如 `"don't"` 一样的连接词很容易被输入。常规的 HTML 属性也应该使用双引号而不是单引号，JSX 属性反映了这个约定。

```javascript
// bad
<Foo bar='bar' />
// good
<Foo bar="bar" />
// bad
<Foo style={{ left: "20px" }} />
// good
<Foo style={{ left: '20px' }} />
```

## 8. Spacing 空格

总是在自动关闭的标签前加一个空格，正常情况下也不需要换行. eslint: [`no-multi-spaces`](http://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-space-before-closing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md)

```javascript
// bad
<Foo/>
// very bad
<Foo                 />
// bad
<Foo
 />
// good
<Foo />
```

不要在JSX `{}` 引用括号里两边加空格. eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

```javascript
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```

## 9. 属性

JSX属性名使用骆驼式风格`camelCase`.

```javascript
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>
// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```

如果属性值为 `true`, 可以直接省略. eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

```javascript
// bad
<Foo
  hidden={true}
/>
// good
<Foo
  hidden
/>
```

`<img>` 标签总是添加 `alt` 属性. 如果图片以presentation(感觉是以类似PPT方式显示?)方式显示，`alt` 可为空, 或者`<img>`要包含`role="presentation"`. eslint: [`jsx-a11y/img-has-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-has-alt.md)

```javascript
// bad
<img src="hello.jpg" />
// good
<img src="hello.jpg" alt="Me waving hello" />
// good
<img src="hello.jpg" alt="" />
// good
<img src="hello.jpg" role="presentation" />
```

不要在 `alt` 值里使用如 "image", "photo", or "picture"包括图片含义这样的词， 中文也一样. eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

> 为什么? 屏幕助读器已经把 `img` 标签标注为图片了, 所以没有必要再在 `alt` 里说明了.

```html
// bad
<img src="hello.jpg" alt="Picture of me waving hello" />
// good
<img src="hello.jpg" alt="Me waving hello" />
```

使用有效正确的 aria `role`属性值 [ARIA roles](https://www.w3.org/TR/wai-aria/roles#role_definitions). eslint: [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

```
// bad - not an ARIA role
<div role="datepicker" />
// bad - abstract ARIA role
<div role="range" />
// good
<div role="button" />
```

不要在标签上使用 `accessKey` 属性. eslint: [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

> 为什么? 屏幕助读器在键盘快捷键与键盘命令时造成的不统一性会导致阅读性更加复杂.

```jsx
// bad
<div accessKey="h" />
// good
<div />

```

避免使用数组的 `index` 来作为属性 `key` 的值，推荐使用唯一ID([为什么?](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))

```jsx
// bad
{todos.map((todo, index) =>
<Todo
  {...todo}
  key={index}
/>
)}
// good
{todos.map(todo => (
<Todo
  {...todo}
  key={todo.id}
/>
))}

```

对于所有非必须的属性，总是手动去定义`defaultProps`属性.

> 为什么? propTypes 可以作为模块的文档说明, 并且声明 defaultProps 的话意味着阅读代码的人不需要去假设一些默认值。更重要的是, 显示的声明默认属性可以让你的模块跳过属性类型的检查.

```jsx
// bad
function SFC({ foo, bar, children }) {
return <div>{foo}{bar}{children}</div>;
}
SFC.propTypes = {
foo: PropTypes.number.isRequired,
bar: PropTypes.string,
children: PropTypes.node,
};
// good
function SFC({ foo, bar }) {
return <div>{foo}{bar}</div>;
}
SFC.propTypes = {
foo: PropTypes.number.isRequired,
bar: PropTypes.string,
children: PropTypes.node,
};
SFC.defaultProps = {
bar: '',
children: null,
};

```

## 10. Refs

总是在Refs里使用回调函数. eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

```jsx
// bad
<Foo
  ref="myRef"
/>
// good
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>

```

## 11. 括号

将多行的JSX标签写在 `()`里. eslint: [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

```jsx
// bad
render() {
  return <MyComponent className="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}
// good
render() {
  return (
    <MyComponent className="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}
// good, 单行可以不需要
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}

```

## 12. 标签

没有子组件的父组件使用自闭和标签。eslint: [react/self-closing-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

```jsx
// bad
<Foo className="stuff"></Foo>
// good
<Foo className="stuff" />

```

如果组件有多行属性，闭合标签应写在新的一行上。eslint: [react/jsx-closing-bracket-location](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

```jsx
// bad
<Foo
  bar="bar"
  baz="baz" />
// good
<Foo
  bar="bar"
  baz="baz"
/>

```

## 13. Methods 函数

使用箭头函数来获取本地变量.

```jsx
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={() => doSomethingWith(item.name, index)}
        />
      ))}
    </ul>
  );
}

```

当在 `render()` 里使用事件处理方法时，提前在构造函数里把 `this` 绑定上去. eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

> 为什么? 在每次 `render` 过程中， 再调用 `bind` 都会新建一个新的函数，浪费资源.

```jsx
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }
  render() {
    return <div onClick={this.onClickDiv.bind(this)} />
  }
}
// good
class extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDiv = this.onClickDiv.bind(this);
  }
  onClickDiv() {
    // do stuff
  }
  render() {
    return <div onClick={this.onClickDiv} />
  }
}

```

在React模块中，不要给所谓的私有函数添加 `_` 前缀，本质上它并不是私有的.

> 为什么？`_` 下划线前缀在某些语言中通常被用来表示私有变量或者函数。但是不像其他的一些语言，在JS中没有原生支持所谓的私有变量，所有的变量函数都是共有的。尽管你的意图是使它私有化，在之前加上下划线并不会使这些变量私有化，并且所有的属性（包括有下划线前缀及没有前缀的）都应该被视为是共有的。了解更多详情请查看Issue [#1024](https://github.com/airbnb/javascript/issues/1024), 和 [#490](https://github.com/airbnb/javascript/issues/490) 。

```jsx
// bad
React.createClass({
  _onClickSubmit() {
    // do stuff
  },
  // other stuff
});
// good
class extends React.Component {
  onClickSubmit() {
    // do stuff
  }
  // other stuff
}

```

在 `render` 方法中总是确保 `return` 返回值. eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

```
// bad
render() {
  (<div />);
}
// good
render() {
  return (<div />);
}

```

## 14. 模块生命周期

- `class extends React.Component` 的生命周期函数:

  1. 可选的 `static` 方法
  2. `constructor` 构造函数
  3. `getChildContext` 获取子元素内容
  4. `componentWillMount` 模块渲染前
  5. `componentDidMount` 模块渲染后
  6. `componentWillReceiveProps` 模块将接受新的数据
  7. `shouldComponentUpdate` 判断模块需不需要重新渲染
  8. `componentWillUpdate` 上面的方法返回 `true`， 模块将重新渲染
  9. `componentDidUpdate` 模块渲染结束
  10. `componentWillUnmount` 模块将从DOM中清除, 做一些清理任务
  11. *点击回调或者事件处理器* 如 `onClickSubmit()` 或 `onChangeDescription()`
  12. *render 里的 getter 方法* 如 `getSelectReason()` 或 `getFooterContent()`
  13. *可选的 render 方法* 如 `renderNavigation()` 或 `renderProfilePicture()`
  14. `render` render() 方法

- 如何定义 `propTypes`, `defaultProps`, `contextTypes`, 等等其他属性...

  ```jsx
  import React, { PropTypes } from 'react';
  const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
  };
  const defaultProps = {
    text: 'Hello World',
  };
  class Link extends React.Component {
    static methodsAreOk() {
      return true;
    }
    render() {
      return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
    }
  }
  Link.propTypes = propTypes;
  Link.defaultProps = defaultProps;
  export default Link;
  
  ```

- 使用 React.createClass 时，方法顺序如下：

  `React.createClass` 的生命周期函数，与使用class稍有不同: eslint: [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

  1. `displayName` 设定模块名称
  2. `propTypes` 设置属性的类型
  3. `contextTypes` 设置上下文类型
  4. `childContextTypes` 设置子元素上下文类型
  5. `mixins` 添加一些mixins
  6. `statics`
  7. `defaultProps` 设置默认的属性值
  8. `getDefaultProps` 获取默认属性值
  9. `getInitialState` 或者初始状态
  10. `getChildContext`
  11. `componentWillMount`
  12. `componentDidMount`
  13. `componentWillReceiveProps`
  14. `shouldComponentUpdate`
  15. `componentWillUpdate`
  16. `componentDidUpdate`
  17. `componentWillUnmount`
  18. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
  19. *getter methods for render* like `getSelectReason()` or `getFooterContent()`
  20. *Optional render methods* like `renderNavigation()` or `renderProfilePicture()`
  21. `render`

## 15. isMounted

不要再使用 `isMounted`. eslint: [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

> 为什么? [`isMounted` 反人类设计模式:()](https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html), 在 ES6 classes 中无法使用， 官方将在未来的版本里删除此方法.



## 参考资料

[React 编程规范](https://github.com/dwqs/react-style-guide)

[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

