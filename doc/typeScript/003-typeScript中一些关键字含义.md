[[TOC]]

[TOC]



# 一些关键字含义

## 1. keyof

在 TypeScript 中，`keyof` 是一个 **类型操作符**，它用于获取一个对象类型的所有键名（即属性名），并将它们组成一个 **联合类型**。

```typescript
// 假设你有一个对象类型：
type Person = {
  name: string;
  age: number;
};

// 使用 keyof Person，你得到的类型是：
type PersonKeys = keyof Person; // 相当于 "name" | "age"

// 也就是说：
let key: keyof Person;
key = "name"; // ✅
key = "age";  // ✅
key = "gender"; // ❌ 报错，因为 "gender" 不是 Person 的属性
```

衍生知识

- `typeof` 是获取一个值的类型

- `keyof` 是获取一个类型的所有键（key）

- 二者可以一起使用：

  ```typescript
  const user = {
    id: 1,
    username: "test",
  };
  
  type UserKeys = keyof typeof user; // "id" | "username"
  ```

## 2. unknown

在 TypeScript 中，`unknown` 是一种**顶级类型**，用于表示**任何类型的值**，但与 `any` 不同的是，它是**类型安全的**。`unknown` 就是安全版的 `any`，它接受任何值，但**不允许你随便用**，你得**先检查它的类型**。

1、`unknown` 接收任意类型的值

```typescript
let value: unknown;
value = 123;
value = "hello";
value = true;
value = { a: 1 };
```

2、不能直接对 `unknown` 值进行操作，必须先判断或断言它的类型：

```typescript
let value: unknown;

console.log(value.toUpperCase()); // ❌ 报错：Object is of type 'unknown'
// 判断类型后使用
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ OK
}
// 断言
(value as string).toUpperCase(); // ✅ OK

// unknown 作为函数参数类型
function handle(input: unknown) {
  if (typeof input === "number") {
    console.log(input.toFixed(2));
  } else if (typeof input === "string") {
    console.log(input.trim());
  }
}
```

3、总结：什么时候用 `unknown`？

| 使用场景                                             | 为什么                     |
| ---------------------------------------------------- | -------------------------- |
| 从外部接收不确定类型的数据（如 API、`JSON.parse`）   | 类型不明确时保护类型安全   |
| 写工具函数，需要泛用参数，但又不希望完全跳过类型检查 | `unknown` 比 `any` 更安全  |
| `try...catch` 中捕获的错误值                         | `catch(e: unknown)` 更推荐 |

