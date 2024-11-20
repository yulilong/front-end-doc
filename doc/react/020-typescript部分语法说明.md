[[TOC]]

[TOC]

# typescript部分语法说明

TypeScript官方教程中文版：https://www.tslang.cn/docs/home.html

## 1. TS中 ? 相关操作符

### 1.1 `?` 三元操作符

```tsx
const a = isNumber(input) ? input : String(input);
```

### 1.2 `?:` 函数可选参数or可选对象属性

```tsx
// 这里的 ？表示这个参数 field 是一个可选参数
function getUser(user: string, field?: string) {
}
class A {
  name?: string // 可选属性
}
interface B {
  pageNumber: number,
  name?: string // 可选属性
}
```

### 1.3 `?.` 安全链式调用

? 可选链操作符，允许我们安全地访问一个对象的属性或方法，而不必担心中间某一环节为 null 或 undefined。如果对象的某个部分为 null 或 undefined，则表达式会短路并返回 undefined，而不会抛出错误。

```tsx
// 这里 Error对象定义的stack是可选参数，如果这样写的话编译器会提示
// 出错 TS2532: Object is possibly 'undefined'.
return new Error().stack.split('\n');

// 我们可以添加?操作符，当stack属性存在时，调用 stack.split。
// 若stack不存在，则返回空
return new Error().stack?.split('\n');
// 以上代码等同以下代码
const err = new Error();
return err.stack && err.stack.split('\n');

// 使用A对象属性A.B时，如果无法确定A是否为空，则需要用A?.B，表示当A有值的时候才去访问B属性，没有值的时候就不去访问，如果不使用?则会报错
const user = null;
console.log(user.account) // 报错
console.log(user?.account) // undefined
```

适用场景：     
1、当访问对象的深层嵌套属性时， 不确定某个中间属性是否存在，使用 ? 可以防止因访问 null 或 undefined 的属性而导致的错误。    
2、当调用一个方法或访问一个属性时，可能该对象本身或某些属性可能为 null 或 undefined，可选链操作符帮助我们避免报错。

## 2. TS中 ! 相关代码

### 2.1 `!` 一元操作符：取反

```tsx
// ! 就是将之后的结果取反，比如：为 True 时返回 False，为 False 时返回True
const a = !isNumber(input);
```

### 2.2 `!:` 属性不能为空

```tsx
// 因为接口B里面name被定义为可空的值，但是实际情况是不为空的，
// 那么我们就可以通过在class里面使用！，重新强调了name这个不为空值
class A implemented B {
  name!: string // 属性不能为空
}
interface B {
  name?: string // 属性可以为空
}
```

### 2.3 `!.` 非空断言

非空断言，告诉 TypeScript 确定某个值不为空(null或undefined)，可以绕过类型检查，但其本身不处理 null 或 undefined 的问题。

```tsx
const inputRef = useRef<HTMLEInputlement>(null);
// 定义了输入框，初始化是null，但是你在调用他的时候相取输入框的value，这时候dom实例一定是有值的，所以用断言
const value: string = inputRef.current!.value;
// 这样就不会报错了

let user = { name: 'Alice', age: 25 };
// 直接用user.address.length，TypeScript 会认为 user.address 可能是 undefined，因为它没有在 user 对象中定义
// 使用非空断言，告诉 TypeScript 我确信 user.address 存在，可以强制将其视为有效的对象。
console.log(user.address!.length);
```

适用场景：    
1、当确信某个值不会是 null 或 undefined，并且 TypeScript 编译器无法推断出这一点时，可以使用 ! 告知 TS 该值运行时肯定存在。     
2、在某些情况下，可能是外部库的 API 或代码中的某些逻辑导致 TS 无法推断出某个值的类型，可以使用 ! 强制该值不是 null 或 undefined。

## 3. ?? 和 |

1、`??`跟`||`类似。区别是`??`在左边操作数是0的时候返回0。

```tsx
console.log(null || 1) // 1
console.log(null ?? 1) // 1
 
console.log(undefined || 1) // 1
console.log(undefined ?? 1) // 1
 
console.log(0 || 1) // 1
console.log(0 ?? 1) // 0
```

2、`|`声明联合类型：在 TypeScript 中联合类型（Union Types）表示取值可以为多种类型中的⼀种，联合类型使⽤ | 分隔每个类型。联合类型通常与 null 或 undefined ⼀起使⽤

```tsx
const fn = (info: strong | null | undefined) => {}
```

参考链接：https://blog.csdn.net/qq_36375343/article/details/143480012

## 4. 类型断言as

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型中共有的属性或方法**：

```tsx
interface Cat { name: string; run(): void; }
interface Fish { name: string; swim(): void; }

function getName(animal: Cat | Fish) {
    return animal.name;
}
```

而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法:

```tsx
interface Cat { name: string; run(): void; }
interface Fish { name: string; swim(): void; }
function isFish(animal: Cat | Fish) {
  // index.ts:11:23 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'. Property 'swim' does not exist on type 'Cat'.
  if (typeof animal.swim === 'function') {
    return true;
  }
  return false;
}

// 此时可以使用类型断言，将 animal 断言成 Fish。这样就可以解决访问 animal.swim 时报错的问题了。
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
```

需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：

```tsx
function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}
const tom: Cat = {
  name: 'Tom',
  run() { console.log('run') }
};
swim(tom);
// Uncaught TypeError: animal.swim is not a function`
```

原因是 `(animal as Fish).swim()` 这段代码隐藏了 `animal` 可能为 `Cat` 的情况，将 `animal` 直接断言为 `Fish` 了，而 TypeScript 编译器信任了我们的断言，故在调用 `swim()` 时没有编译错误。

可是 `swim` 函数接受的参数是 `Cat | Fish`，一旦传入的参数是 `Cat` 类型的变量，由于 `Cat` 上没有 `swim` 方法，就会导致运行时错误了。

总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。

