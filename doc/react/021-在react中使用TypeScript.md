[[TOC]]

[TOC]



# 在react中使用TypeScript

TypeScript在react中两种类型文件：

1、`.tsx`文件：编写程序代码的地方，既包含类型信息又可执行代码

2、`.d.ts`文件：只包含类型信息的类型声明文件。不会生成 .js 文件，仅用于提供类型信息,在.d.ts文件中不允许出现可执行的代码，只用于提供类型

如果要为 JS 库提供类型信息，要使用 `.d.ts` 文件

## 1. props、state等变量属性声明接口

```tsx
interface Base {
  // 基本类型
  message: string;
  count: number;
  disabled: boolean;
  names: string[]; // 数组类型
  /** 用「联合类型」限制为下面两种「字符串字面量」类型 */
  status: 'waiting' | 'success';
}
interface Props {
  /** 如果你不需要用到具体的属性 可以这样模糊规定是个对象 ❌ 不推荐 */
  obj: object; // 或 obj2: {}
  /** 拥有具体属性的对象类型 ✅ 推荐 */
  obj3: { id: string; title: string };
  /** 对象数组 😁 常用 */
  objArr: Array<{ id: string; title: string }>;
  /** key 可以为任意 string，值限制为 MyTypeHere 类型 */
  dict1: {
    [key: string]: Base;
  };
  // 基本上和 dict1 相同，用了 TS 内置的 Record 类型。
  dict2: Record<string, Base>;
  /** 任意的函数类型 ❌ 不推荐 不能规定参数以及返回值类型 */
  onSomething: Function;
  /** 没有参数的函数 不需要返回值 😁 常用 */
  onClick: () => void;
  /** 带函数的参数 😁 非常常用 */
  onChange: (id: number) => void;
  /** 另一种函数语法 参数是 React 的按钮事件 😁 非常常用 */
  onClickOne: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 可选参数类型 😁 非常常用 */
  optional?: Base;

  children2: JSX.Element | JSX.Element[]; // ❌ 不推荐 没有考虑字符串 children
  children4: React.ReactChild[]; // 稍微好点 但是没考虑 null
  children: React.ReactNode; // ✅ 包含所有 children 情况
  functionChildren: (name: string) => React.ReactNode; // ✅ 返回 React 节点的函数
  style?: React.CSSProperties; // ✅ 推荐 在内联 style 时使用
  // ✅ 推荐原生 button 标签自带的所有 props 类型
  // 也可以在泛型的位置传入组件 提取组件的 Props 类型
  props: React.ComponentProps<'button'>;
  // ✅ 推荐 利用上一步的做法 再进一步的提取出原生的 onClick 函数类型
  // 此时函数的第一个参数会自动推断为 React 的点击事件类型
  onClickButton: React.ComponentProps<'button'>['onClick'];
}
```

## 2. 类组件声明

```tsx
// props 和 state 都规定具体的
type IPrps = { message: string; };
type IState = { count: number;  };
class App extends React.Component<IPrps, IState> {}

// props 和 state 都是任何数据的
type P = any;
type S = any;
class App extends PureComponent<P, S> {}

// props是泛型，在调用的时候确认，state接口使用上面的
class App<P> extends PureComponent<P, state> {}
// 使用组件
type IProps = { name: string; age: number; };
<App<IProps> name="React" age={18} />;          // Success
<App<IProps> name="TypeScript" age="hello" />;  // Error
```

React 官网对于 Component 的类型定义如下:

```tsx
interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
```



## 3. 函数组件声明

```tsx
import React from 'react';
interface IProps { name: string }
const App = (props: IProps) => {}
// 或
const App = ({name}: IProps) => {}
// 或 FC：函数组件
// type React.FC<P = {}> = React.FunctionComponent<P>
const App: React.FC<IProps> = (props) => {}
```

如果我们在定义组件时不知道props的类型，只有调用时才知道，那就还是用泛型来定义props的类型：

```tsx
// 定义组件
function App<P>(props: P) {}
// 使用组件
type IProps = { name: string; age: number; };
<App<IProps> name="React" age={18} />;          // Success
<App<IProps> name="TypeScript" age="hello" />;  // Error

```

## 4. hooks组件

### 4.1 useState

```tsx
 interface Item { target: string; }
// 1. 默认情况下，React会为根据设置的state的初始值来自动推导state以及更新函数的类型：
const [name, setName] = useState('jack');
// 2. 已知类型
const [count, setCount] = useState<number>(1);
const [item, setItem] = useState<Item | null>(null);
// 3. 初始值为null，需要显示地声明
const [count, setCount] = useState<number | null>(null);

```

### 4.2 useRef、useCallback、useMemo

```tsx
const nameInput = React.useRef<HTMLInputElement>(null);
const ref = React.useRef<HTMLElement | null>(null);
// useCallback
const memoizedCallback = useCallback(
  // 如果不给参数定义类型，会报错
  (a: number) => { add(a, b); },
  [b]
);
// useMemo
const calculatedValue = useMemo<number>(() => a ** 2, [a]);
```

### 4.3 useReducer

```tsx
type AuthState = {};
type Action =
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_ERROR"; payload: string };

export function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        one: action.payload
      };
    case "FETCH_ERROR":
      ....
    default:
      return state;
  }
}
```

## 5. 事件处理、HTML标签类型

待完成：

https://juejin.cn/post/7021674818621669389#heading-19



https://juejin.cn/post/6844903999351554056#heading-5







## 参考资料

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) 是一个社区维护的，用于在 React 中使用 TypeScript 的速查表，涵盖了许多有用的边界情况，并提供了比本文更广泛全面的内容。

- [如何优雅地在 React 中使用TypeScript，看这一篇就够了！](https://juejin.cn/post/7021674818621669389)

- [React 记录 - 使用 TS 编写 React 项目(1)](https://juejin.cn/post/6844903999351554056)

- [TS在React的优雅写法](https://www.cnblogs.com/cczlovexw/p/15736174.html)

  