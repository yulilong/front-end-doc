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

```js
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

```js
// 定义输入框，初始化是null，但是你在调用他的时候，要取输入框的value，这时候dom实例一定是有值的，所以用断言，这样就不会报错了
const inputRef = useRef<HTMLEInputlement>(null);
const value: string = inputRef.current!.value;

// 直接用user.address.length，TypeScript 会认为 user.address 可能是 undefined，因为它没有在 user 对象中定义
let user = { name: 'Alice', age: 25 };
// 使用非空断言，告诉 TypeScript 我确信 user.address 存在，可以强制将其视为有效的对象。
console.log(user.address!.length);
```

适用场景：    
1、当确信某个值不会是 null 或 undefined，并且 TypeScript 编译器无法推断出这一点时，可以使用 ! 告知 TS 该值运行时肯定存在。     
2、在某些情况下，可能是外部库的 API 或代码中的某些逻辑导致 TS 无法推断出某个值的类型，可以使用 ! 强制该值不是 null 或 undefined。

## 3. 其他符号在TS中的作用

### 3.1 ?? 

1、`??`跟`||`类似。区别是`??`在左边操作数是0的时候返回0。

```tsx
console.log(null || 1) // 1
console.log(null ?? 1) // 1
 
console.log(undefined || 1) // 1
console.log(undefined ?? 1) // 1
 
console.log(0 || 1) // 1
console.log(0 ?? 1) // 0
```

### 3.2 | 声明联合类型

`|`声明联合类型：在 TypeScript 中联合类型（Union Types）表示取值可以为多种类型中的⼀种，联合类型使⽤ | 分隔每个类型。联合类型通常与 null 或 undefined ⼀起使⽤

```tsx
const fn = (info: strong | null | undefined) => {}
```

参考链接：https://blog.csdn.net/qq_36375343/article/details/143480012

### 3.2 & 创建交叉类型(合并多个类型)

在TypeScript中，`&`符号用于创建交叉类型（Intersection Types）。交叉类型表示一个类型同时拥有多个类型的特性，类似于逻辑与操作符。使用`&`符号可以将多个类型合并为一个新的类型。

```tsx
interface A { prop1: number; }
interface B { prop2: string; }
type C = A & B;
// 如果一个值的类型是交叉类型A & B，那么该值必须同时满足类型A和类型B的要求。
const obj: C = {
  prop1: 10,
  prop2: 'hello',
};
```

**使用场景**‌：交叉类型常用于组合多个类型，从而创建一个新的更具体的类型。这在开发中非常有用，特别是在需要同时满足多个接口或类型的场景下‌。

## 4. 类型断言 as、<>

类型断言：确认变量是某个类型，从而让这个变量可以调用这个类型的属性。

类型断言作用：让代码可以安全的调用变量没有在类型声明中定义的属性，这样就不会让TS类型检查报错。但是当运行这段代码的时候，如果没有这个属性，则还是会报错。类型断言让TypeScript会假设程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法，另一个为`as`语法：

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;   // “尖括号”语法
let strLength: number = (someValue as string).length; // as语法
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；

但是，当你在TypeScript里使用JSX时，只有 `as`语法断言是被允许的。

需要用到类型断言的场景：

1、访问变量的声明类型不存在的属性：

```tsx
let someValue: string = "this is a string";
type userId = { name: string}
let jackName: string = (someValue as unknown as userId).name; 
```

2、访问联合类型的中某个类型独有的属性

```tsx
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法：
interface Cat { name: string; run(): void; }
interface Fish { name: string; swim(): void; }
function isFish(animal: Cat | Fish) {
  // animal.swim报错：类型“Cat | Fish”上不存在属性“swim”。类型“Cat”上不存在属性“swim”。ts(2339)
  if (typeof animal.swim === 'function') { return true; }
  return animal.name; // 没问题
}

// 此时可以使用类型断言，将 animal 断言成 Fish。这样就可以解决访问 animal.swim 时报错的问题了。
function isFish1(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {  return true; }
  return false;
}
```



## 5. 关键字含义

### 5.1 extend 类的继承和泛型约束

**`extends`关键字主要用于类的继承和泛型约束。**

1、类的继承：`extends`关键字用于创建一个类继承另一个类。通过使用`extends`，子类可以继承父类的属性和方法，并且可以添加新的属性和方法。

```tsx
class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
  }
}
let sam = new Snake("Sammy the Python");
sam.move();
```

2、泛型约束：在泛型编程中，`extends`关键字用于指定泛型类型必须继承自某个特定的类或接口。这样做可以提供类型安全性，并允许在泛型代码中使用特定于基类或接口的方法和属性。例如：

```tsx
interface GenericInterface<T> {
  (data: T): void;
}
function identity<T extends GenericInterface<T>>(arg: T): T {
  return arg;
}
```



## 6. 实用工具类(工具泛型)

参考自：http://www.patrickzhong.com/TypeScript/zh/reference/utility-types.html

### 6.1 keyof、in

keyof 可以用来取得接口的所有 key 值。    
in关键字可以遍历枚举类型

```ts
// keyof用法
interface IPerson { name: string; age: number }
type T = keyof IPerson // T 类型为： "name" | "age"
const p: T = 'age1'; // 变量p的取值只能是'name'或'age'

// in用法
type Person = 'name' | 'age' | 'number';
type Obj = {
  [m in Person]: any // m名字随便取名，Person是声明的接口
};// 等同于
// 等同于type Obj = {name: any; age: any; number: any}
```

### 6.2 Partial 设置属性可选

Partial 作用是**将传入的属性变为可选项**。适用于对类型结构不明确的情况。它还有两个关键字：keyof和in

```ts
interface User { id: number; name: string }
type PartialUser = Partial<User>;
// 等同于interface PartialUser { id?: number; name?: string }
const user1: PartialUser = {}; // TS不错报错

// Partial工具泛型的定义。将T中的所有属性设置为可选
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

TypeScript 2.1版本支持

### 6.3 Required 设置属性必填

Required 的作用是将传入的属性变为必选项

```ts
type User = { id?: number; name?: string; number: number };
type PartialUser = Required<User>;
// 等同于 type PartialUser = { id: number; name: string; number: number };
const user1: PartialUser = {}; // TS报错，必须要有id、name、number三个属性

// Required工具泛型的定义。将T中的所有属性设置为必填
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

TypeScript 2.8版本支持

### 6.4 Readonly 设置属性只读

Readonly 设置类型所有属性为只读，让属性只能在定义的时候赋值。

```tsx
type User = { id: number; name?: string };
type PartialUser = Readonly<User>;
// 等同于 type PartialUser = { readonly id: number; readonly name?: string };
const user: PartialUser = { id: 110 };
user.id = 100; // TS报错 无法为“id”赋值，因为它是只读属性

// Readonly工具泛型的定义。将T中的所有属性设置为只读
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

TypeScript 2.1版本支持

### 6.5 Record构造新类型

`Record<Keys, Type>`：构造一个类型，其属性名的类型为`Keys`，属性值的类型为`Type`。这个工具可用来将某个类型的属性映射到另一个类型上。

```ts
interface PageInfo { title: string }
type Page = 'home' | 'about' | 'contact';
const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' },
};

// Record工具泛型的定义。
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

TypeScript 2.1版本支持

### 6.6 Pick 挑选部分属性

`Pick<Type, Keys> `：从类型`Type`中挑选部分属性`Keys`来构造类型

```ts
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
type TodoPreview = Pick<Todo, 'title' | 'completed'>;
const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
};

// Pick工具泛型的定义。
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

TypeScript 2.1版本支持

### 6.7 Exclude 排除部分属性

`Exclude<T, Excluded> `：从联合类型`T`中剔除所有可以赋值给`Excluded`的属性，然后构造一个类型。也就是从一个联合类型中排除掉属于另一个联合类型的子集

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;                     // "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;               // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

// Exclude工具泛型的定义，使用别的名进行测试
type Exclude1<T, U> = T extends U ? never : T;
type T4 = Exclude1<'a' | 'b' | 'c', 'a'>; 
```

TypeScript 2.8版本支持

### 6.8 Extract 提取部分属性

`Extract<Type, Union> `：从类型`Type`中提取所有可以赋值给`Union`的类型，然后构造一个类型。

```tsx
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;                 // "a"
type T1 = Extract<string | number | (() => void), Function>;   // () => void
```

TypeScript 2.8版本支持

### 6.9 Omit 对象排除部分属性

`Omit<Type, Keys>`：从类型`Type`中获取所有属性，然后从中剔除`Keys`属性后构造一个类型。

```ts
interface Todo { title: string; description: string; completed: boolean; }
// 从一个对象中剔除若干个属性，剩下的就是需要的新类型
type TodoPreview = Omit<Todo, 'description'>;
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
// Omit工具泛型的定义，使用别的名进行测试
type Omit1<T, K extends keyof any> = { [P in Exclude<keyof T, K>]: T[P]; }
type TodoPreview1 = Omit1<Todo, 'description'>;
```

TypeScript 3.5版本支持

### 6.10 ReturnType

ReturnType会返回函数返回值的类型

```ts
type T0 = ReturnType<() => string>;                 // string
type T1 = ReturnType<(s: string) => void>;          // void
type T2 = ReturnType<(<T>() => T)>;                 // {}
type c = <T extends U, U extends number[]>() => T;
type T3 = ReturnType<(c)>;                          // number[]
const f2 = () => ({ a: 10, b: '12' })
type T4 = ReturnType<typeof f2>;                    // { a: number, b: string }
type T5 = ReturnType<any>;                          // any
type T6 = ReturnType<never>;                        // never
type T7 = ReturnType<string>;  // 报错，不能用string
                     
// Omit工具泛型的定义，使用别的名进行测试
type ReturnType1<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
type T8 = ReturnType1<(s: string) => number>; // number
```

TypeScript 2.8版本支持





## 7. 接口声明interface 和 type 的区别

### 7.1 interface 和 type介绍

1、type：类型别名。用来给一个类型起个新名字，类型别名不仅可以用来表示基本类型，还可以用来表示对象类型、联合类型、元组和交集。例如：

```tsx
type userName = string; // 基本类型
type userId = string | number; // 联合类型
type arr = number[];  
// 对象类型
type Person = {
    id: userId; // 可以使用定义类型
    name: userName;
    age: number; gender: string;
};
// 范型
type Tree<T> = { value: T };
const user: Person = { id: "901", name: "椿", age: 22, gender: "女", };
```

2、interface：接口。是命名数据结构（例如对象）的另一种方式。与type 的不同点：

- interface仅限于描述对象类型。
- interface可以通过多次声明来扩展。

```tsx
interface Person { name: string; age: number; } // interface仅限于描述对象类型
```

### 7.2 interface和type的相似之处

- 都可以描述 Object和Function
- 二者都可以被继承extends
- 都可以实现 implements(类无法实现联合类型)

```tsx
// 描述 Object和Function
type Point = { x: number; y: number; };
type SetPoint = (x: number, y: number) => void;
interface Poin1t { x: number; y: number; };
interface SetPoint1 {
  (x: number, y: number): void;
};

// 继承
interface Person1{ name:string }
type Person2 = { name:string }
// interface 继承
interface Student extends Person1 { stuNo: number }
interface Student1 extends Person2 { stuNo: number }
// type 继承
type Student2 = Person1 & { stuNo: number }
type Student3 = Person2 & { stuNo: number }

// 实现 implements
interface ICat{ setName(name:string): void; }
class Cat implements ICat{
  setName(name:string):void{ }
}
// type  
type ICat1 = { setName(name:string): void; }
class Cat1 implements ICat1{
  setName(name:string):void{ }
}
// 无法对联合类型Person进行实现
type Person = { name: string; } | { setName(name:string): void };
// error: A class can only implement an object type or intersection of object types with statically known members.
class Student implements Person {
  name= "张三";
  setName(name:string):void{ }
}
```

### 7.3 interface和type的区别

只有type能做的：定义基本类型别名、声明联合类型、 声明元组

```tsx
type userName = string
type stuNo = number
type Student = {stuNo: number} | {classId: number}
type Data = [number, string];
```

只有interface能做的：声明合并

```tsx
// 'interface’具有声明合并的能力，允许多个同名的接口进行合并，通过这样的方式可以扩展接口的成员定义
interface Person { name: string; }
interface Person { age: number; } // 合并后的Person接口包含name和age两个属性

// 'type’不具备声明合并的能力，多次定义同一个类型会报错
type Person1 = { name: string; }
type Person1 = { age: number; } // 报错：标识符“Person1”重复。ts(2300)
```

### 7.4 索引签名问题

如果你经常使用TypeScript, 一定遇到过相似的错误：

Type 'xxx' is not assignable to type 'yyy'

Index signature is missing in type 'xxx'.

一个例子：

```tsx
interface propInter {
  [key: string] : string // 把这个注释掉，就不报错了，可以加上title: string
}
let props: propInter
type dataType = { title: string }
interface propInter2 { title: string }
const data: dataType = {title: "订单页面"}
const data1: propInter2 = {title: "订单页面"}
props = data // 没问题
// 报错：不能将类型“propInter2”分配给类型“propInter”。 类型“propInter2”中缺少类型“string”的索引签名。ts(2322)
props = data1


interface myInterface{
  title: string
  // [key: string] : string // 加上这个就不报错了
}
type myType = { title: string }
const myIn: myInterface = {title: '123'};
const myTy: myType = {title: '123'};
let record: Record<string, string> = {};
// 报错：不能将类型“myInterface”分配给类型“Record<string, string>”。类型“myInterface”中缺少类型“string”的索引签名。ts(2322)
record = myIn; 
record = myTy; // 没问题
// 这个报错的大致解释： Record<string,string>与{[key:string]：string}相同。只有当该类型的所有属性都已知并且可以对照该索引签名进行检查时，才允许将子集分配给该索引签名类型。在您的例子中，从exampleType到Record<string,string>的所有内容都是可分配的。这只能针对对象字面量类型进行检查，因为一旦声明了对象字面量类型，就无法更改它们。因此，索引签名是已知的。
// 相反，在你使用interface去声明变量时，它们在那一刻类型并不是最终的类型。由于interfac可以进行声明合并，所以总有可能将新成员添加到同一个interface定义的类型上。
// https://www.cnblogs.com/ygyy/p/18191941
```



其他区别参考：https://blog.csdn.net/qq_50294652/article/details/132322247



## 查看项目中TypeScript版本

要查看项目中使用的TypeScript版本，你可以检查以下几个方面：

1. `node_modules/typescript/package.json` 文件中的版本号。
2. 项目根目录中的 `package.json` 文件，查看 `devDependencies` 部分中是否有 `typescript`。
3. 如果项目使用了 `tsconfig.json` 配置文件，可以在其中查看 `compilerOptions` 部分的 `typescript` 版本。

以下是检查TypeScript版本的命令行示例：

```bash
# 方法1: 查看node_modules中的TypeScript版本
cat node_modules/typescript/package.json | grep version
# 方法2: 查看项目的package.json文件中的TypeScript版本
cat package.json | grep typescript
 # 方法3: 如果你已经安装了TypeScript，可以通过tsc命令查看版本
tsc --version
```

## 参考资料

[TypeScript 使用手册 中文版](http://www.patrickzhong.com/TypeScript/)

[TypeScript 使用手册 中文版 github地址](https://github.com/zhongsp/TypeScript)

https://www.tslang.cn/index.html
