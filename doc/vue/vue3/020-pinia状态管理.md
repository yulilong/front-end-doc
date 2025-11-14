[[TOC]]

[TOC]

# Pinia - 状态管理

[官网](https://pinia.vuejs.org/zh/)：https://pinia.vuejs.org/zh/

Pinia - 符合直觉的  Vue.js 状态管理库，类型安全、可扩展性以及模块化设计。 甚至让你忘记正在使用的是一个状态库。

## 1. 简介

Pinia [起始](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e)于 2019 年 11 月左右的一次实验，其目的是设计一个拥有[组合式 API](https://github.com/vuejs/composition-api) 的 Vue 状态管理库。从那时起，我们就倾向于同时支持 Vue 2 和 Vue 3，并且不强制要求开发者使用组合式 API，我们的初心至今没有改变。除了**安装**和 **SSR** 两章之外，其余章节中提到的 API 均支持 Vue 2 和 Vue 3。虽然本文档主要是面向 Vue 3 的用户，但在必要时会标注出 Vue 2 的内容，因此 Vue 2 和 Vue 3 的用户都可以阅读本文档。

Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。如果你熟悉组合式 API 的话，你可能会认为可以通过一行简单的 `export const state = reactive({})` 来共享一个全局状态。对于单页应用来说确实可以，但如果应用在服务器端渲染，这可能会使你的应用暴露出一些[安全漏洞](https://cn.vuejs.org/guide/scaling-up/ssr#cross-request-state-pollution)。 而如果使用 Pinia，即使在小型单页应用中，你也可以获得如下功能：

- 测试工具集
- 插件：可通过插件扩展 Pinia 功能
- 为 JS 开发者提供适当的 TypeScript 支持以及**自动补全**功能。
- 支持服务端渲染
- Devtools 支持
  - 追踪 actions、mutations 的时间线
  - 在组件中展示它们所用到的 Store
  - 让调试更容易的 Time travel
- 热更新
  - 不必重载页面即可修改 Store
  - 开发时可保持当前的 State

## 2. 搭建 pinia 环境

### 2.1 安装 pinia 包

```bash
npm install pinia
# 或使用 yarn
yarn add pinia
```

### 2.2 创建一个 pinia 实例 (根 store) 并将其传递给应用：

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入createPinia，用于创建pinia
import App from './App.vue'

const pinia = createPinia() // 创建pinia
const app = createApp(App)

app.use(pinia) // 使用插件
app.mount('#app')
```

重启服务后，就可以在浏览器的vue插件中看到`pinia`选项

### 2.3 一个完整的store定义文件(src/store/talk.ts)：

1. Store是一个保存：**状态**、**业务逻辑** 的实体，每个组件都可以**读取**、**写入**它。

2. 它有三个概念：`state`、`getter`、`action`，相当于组件中的： `data`、 `computed` 和 `methods`。

```js
// 引入defineStore用于创建store，注意：有的项目可以不用引入，直接使用这个变量
import {defineStore} from 'pinia'

// 定义并暴露一个store
export const useTalkStore = defineStore('talk',{
  // 状态：存储的变量
  state(){
    return {
      num: 10,
      talkList:[
        {id:'da01', content:'你今天有点怪，哪里怪？怪好看的！'},
        {id:'da02', content:'草莓、蓝莓、蔓越莓，你想我了没？'},
      ]
    }
  },
  // 计算：根据状态来计算新变量
  getters:{
    // 基本 getter，返回 state 的计算值
    doubleNum: (state) => state.num * 2,
    // 可以访问其他 getter
    doubleCountNum(): number {
      return this.doubleNum + 1;
    },
  }
  // 动作：执行方法，用来设置状态
  actions:{
    // 同步方法
    setNumber(num: umber) {
      this.num = num
    }
    // 异步方法
    getInfo() {
      info().then( res => {
        this.talkList = res.talkList
      })
    }
  },
})
```

## 3. 修改store变量

### 3.1 直接修改

当定义好store文件后，可以直接在组件中修改store变量：

```js
import useTalkStore from '@/store/talk'
const store = useTalkStore()

store.num = 66

// 下面这种方式也能修改变量
import { storeToRefs } from 'pinia'
const { num } = storeToRefs(store)
num.value = 88
```

### 3.2 多个属性批量修改

```js
countStore.$patch({
  sum:999,
  school:'atguigu'
})
```

在一次性修改多个属性的时候。第一种方式每个修改都会触发一次时间线。而第二种方式 是一次性批量修改，只会触发一次 时间线(浏览器vue插件，时间线(TimeLine))。

### 3.3 通过store文件中定义的actions方法进行修改

如果修改的数据需要一些逻辑处理，则可以直接在定义的store文件里面的actions方法.

1、store文件中定义`actions`方法：

```js
import {defineStore} from 'pinia'

// 定义并暴露一个store
export const useTalkStore = defineStore('talk',{
  state(){ return {  num: 10, } },
  actions: {
    // 同步操作
    increment(value:number) {
      if (this.num < 10) {
        //操作countStore中的num
        this.num += value
      }
    },
    // 异步方法：从接口获取数据
    getNumPromise() {
      return new Promise((resolve, reject) => {
        fetch('https://api.example.com/data').then(res => {
          return res.json();
        }).then(data => {
          this.num = data.num;
          resolve(data); // 可以在调用的地方使用then方法使用data数据
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 异步方法：从接口获取数据
    async fetchDataAwait() {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        this.num = data.num;
        return data || '' // 调用的地方获取data的值
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
})
```

2、组件中调用方法修改属性：

```js
import { onMounted, ref } from 'vue';

import {useTalkStore} from './stores/talkStore.ts'
const talkStore = useTalkStore();

onMounted(async () => {
  if (talkStore.num === 0) {
    talkStore.getNumPromise().then((res) => {
      console.log('设置数据的同时返回数据使用', res);
    });
  }
  // 同步形式，getNumPromise()方法使用await也可以
  if (talkStore.num === 2) {
    const res = await talkStore.fetchDataAwait();
    console.log('设置数据的同时返回数据await', res);
  }
});
```



## 4. 在组件中使用store属性的几种方法

### 4.1 直接使用store(最简单)

```vue
<template>
  <div>{{ store.userInfo?.name }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const store = useUserStore()
</script>
```

优点：   
1、最简单、直观，不用额外转/ref。   
2、响应性保留（Vue 会跟踪 `store.userInfo`）。

缺点：   
1、在模板中频繁写 `store.xxx` 比较啰嗦（但可读性好）。   
2、在 `<script setup>` 里 **不能用对象解构** `const { userInfo } = store`（那样会丢失响应性），必须直接访问 `store.userInfo` 或用下面的方法。    

何时用：想要快速、明确地读写 store，或只用少量字段时优先使用。

### 4.2 使用storeToRefs方法解构store属性

`storeToRefs()` 是 Pinia 提供的工具函数，用来把 store 的 **state + getter** 属性转换成 `ref`，从而可以安全地在组件中解构使用，同时保持响应性。

```vue
<template>
  <div>{{ userInfo }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
const store = useUserStore()
const { userInfo, isLoading } = storeToRefs(store)
</script>
```

优点：   
1、返回的是 `ref`，可以安全地在 `<template>` 中直接使用或在 `<script>` 中解构。   
2、保留响应性，和 Composition API 风格一致。   
3、TypeScript 支持良好（类型是 `Ref<T>`）。

缺点：   
1、需要多写一次 `storeToRefs(...)`（非常小的成本）。   

何时用：需要在 `<script>` 中解构多个字段，或想避免 `store.` 前缀时。**这是 Pinia 官方推荐**的做法。



**注意**：`pinia`提供的`storeToRefs`只会将数据做转换，而`Vue`的`toRefs`会转换`store`中数据。

#### 4.2.1 storeToRefs方法不能结构actions里面的方法

**注意**：**`storeToRefs()` 只能解构 state（状态）和 getter，不能解构 action（方法）**。
 如果你试图对 actions 使用它，是不会生效的（它只会忽略掉函数）。

```js
const store = useUserStore()
// getUserInfo 是store文件中的actions里面的方法
const { userInfo, getUserInfo } = storeToRefs(store)
```

上面的代码中`getUserInfo`实际上是 `undefined`！,因为 `storeToRefs()` **不会处理函数（actions）**。

Pinia 官方文档也明确指出这一点👇

> `storeToRefs()` only converts the state and getters into refs. Actions are ignored.

如果想要解构方法，可以使用如下方式：

```vue
<template>
  <div>
    <div v-if="isLoading">加载中...</div>
    <div v-else>{{ userInfo?.name }}</div>
    <button @click="getUserInfo">刷新用户信息</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { userInfo, isLoading } = storeToRefs(store)
const { getUserInfo } = store  // ✅ actions 用普通解构
</script>

```



### 4.3 用 `computed` 包裹访问（当需要派生/代理时）

```js
import { computed } from 'vue'
const store = useUserStore()
const name = computed(() => store.userInfo?.name ?? '匿名')
```

优点：   
1、可以做派生（加工）逻辑并保持响应性。   
2、适合做只读包装或格式化输出。

缺点：   
1、如果大量字段都用 computed，会稍微啰嗦。

何时用：需要对 store 的值做转换、格式化、或保证非空默认值时使用。

### 4.4 错误用法：直接解构 `const { userInfo } = store`

```vue
<template>
  <div>{{ userInfo }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
const store = useUserStore()
const { userInfo } = store // 当 store.userInfo 发生变化时，模板中绑定的 userInfo 不会自动更新。
</script>
```

问题：这样得到的 `userInfo` 是普通变量（不是 ref / reactive proxy），将**失去响应性**，模板不会随 store 更新而更新。

结论：切勿在组件中用普通解构直接拿 store 的属性；要么直接用 `store.xxx`，要么用 `storeToRefs` / `computed`。

例外情况：在组件的方法里面结构获取这一次的值是可以的，因为方法每次执行都会从新结构获取最新的值。

### 4.4 总结

TypeScript 注意点：    

- `storeToRefs(store)` 返回的每个字段类型为 `Ref<T>`，编译时更安全。
- 直接 `store.userInfo` 访问时若需要在 TS 中解构并保留类型/响应性，可用 `const { userInfo } = storeToRefs(store)`。
- 若 store 的 state 初始化为 `null`（例如 `userInfo: UserInfo | null`），模板或 computed 中要做好空值处理。

性能与可维护性

- 直接 `store.xxx` 与 `storeToRefs` 在渲染性能上差别微小，不用过度担心。
- `storeToRefs` 在多人协作和大型文件里能避免“响应性丢失”的踩坑，更推荐作为默认做法。

推荐总结（实用规则）

- **最推荐（默认）**：在 `<script setup>` 中用 `storeToRefs(store)` 解构你要用的字段；模板直接引用这些 refs。
- **想少写代码**：直接在模板中使用 `store.userInfo`（简单、可靠）。
- **需要加工数据**：用 `computed(() => store.xxx)` 做派生。
- **绝对不要**：用普通解构 `const { userInfo } = store`（会丢失响应性）。



## 6. getters

  1. 概念：当`state`中的数据，需要经过处理后再使用时，可以使用`getters`配置。

  2. 追加```getters```配置。

     ```js
     import {defineStore} from 'pinia' // 引入defineStore用于创建store
     
     // 定义并暴露一个store
     export const useCountStore = defineStore('count',{
       actions:{},
       state(){
         return {
           sum:1,
           school:'atguigu'
         }
       },
       // 计算
       getters:{
         bigSum:(state):number => state.sum *10,
         upperSchool():string{ return this. school.toUpperCase() }
       }
     })
     ```

  3. 组件中读取数据：

     ```js
     const {increment,decrement} = countStore
     let {sum,school,bigSum,upperSchool} = storeToRefs(countStore)
     ```


## 7. $subscribe

通过 store 的 `$subscribe()` 方法侦听 `state` 及其变化

```ts
talkStore.$subscribe((mutate,state)=>{
  console.log('LoveTalk',mutate,state)
  localStorage.setItem('talk',JSON.stringify(talkList.value))
})
```

## 8. store调用另外一个store的方法

**可以在一个 store 中调用另一个 store 的方法或 state**，但要**在方法内部（即函数作用域内）调用**，⚠️ **不要在 store 定义顶层直接调用**。

例子：

1、`auth.ts`文件：

```js
// stores/auth.ts
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: 'abc123'
  }),
  actions: {
    getToken() {
      return this.token
    },
    setToken(newToken: string) {
      this.token = newToken
    }
  }
})
```

2、`user.ts`文件，会调用`auth.ts`的store

```js
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
export const useUserStore = defineStore('user', {
  state: () => ({
    name: '张三',
    token: ''
  }),
  actions: {
    async fetchUserInfo() {
      const authStore = useAuthStore()   // ✅ 在方法内部调用
      const token = authStore.token      // 调用属性
      authStore.setToken()               // 调用方法 
      console.log('当前 token:', token)
      // ...根据 token 获取用户信息
    }
  }
})
```

### 8.1 不要在定义外层直接调用

下面这种写法 ❌ 会导致 **循环依赖或初始化错误**：

```js
// ❌ 错误写法
const authStore = useAuthStore()
export const useUserStore = defineStore('user', {
  actions: {
    fetchUserInfo() {
      console.log(authStore.getToken())
    }
  }
})
```

❌ 错误原因：    
 store 定义文件会在应用初始化时被加载，`useAuthStore()` 此时 Pinia 还未完全注册，可能导致“active pinia was not found”错误。

### 8.2 正确调用时机总结

| 调用位置                     | 是否允许 | 原因                              |
| ---------------------------- | -------- | --------------------------------- |
| 在 store 的 **actions 内部** | ✅ 允许   | 动态引用，不影响初始化            |
| 在 store 的 **getters 内部** | ⚠️ 不推荐 | getter 频繁执行，可能造成性能浪费 |
| 在 store **定义外部顶层**    | ❌ 禁止   | 容易循环依赖或初始化错误          |
| 在组件 `setup()` 中          | ✅ 允许   | 生命周期正确，Pinia 已初始化      |

### 8.3 如果需要双向调用（两个 store 互相依赖）

可以这样做来避免循环依赖：

- 让 **下层 store** 提供通用逻辑
- 让 **上层 store** 调用下层的函数
- 或者把公共逻辑抽成一个 **composable**，比如 `useAuthUtils()`

```js
// composables/useAuthUtils.ts
export function useAuthUtils() {
  const authStore = useAuthStore()
  const refreshToken = () => { /* ... */ }
  return { refreshToken }
}
```

然后在不同 store 中都可以安全使用。



## 9. 一些常见问题

### 9.1 使用const store = useUserStore()和直接使用useUserStore() 有什么区别吗？

结论：   在 **大多数情况下**，`const store = useUserStore()` 和 `useUserStore()` 表现效果是 **相同的** —— 因为 Pinia 的 `useXxxStore()` 本身返回的就是一个响应式的全局单例（Store 实例）。

但是：**当你要在模板中使用、要结构数据、要在逻辑中多次访问时 —— **保存成变量 (`const store = useUserStore()`) 更安全、更高效、更语义化**。

`useUserStore()` 是什么？    
在 `defineStore('user', {...})` 定义后，Pinia 会生成一个“hook 风格”的函数 `useUserStore()`，它会：

- **创建或返回一个全局的 Store 实例；**
- 这个实例是响应式的；
- 整个应用中，同一个 Store ID 只会有一个实例。
- 所以：`useUserStore() === useUserStore() ` 永远返回同一个对象

```js
const store = useUserStore()
store.userInfo
store.getUserInfo()
```

写法1：保存到变量,这种写法的优点：

- **语义清晰**：`store.xxx` 一看就知道是 Store 内的东西；
- **便于结构**：可以配合 `storeToRefs(store)`；
- **利于类型推导**：TypeScript 能推导出 store 的完整类型；
- **易于重用**：多处逻辑复用时不必重复调用。

```js
useUserStore().userInfo
useUserStore().getUserInfo()
```

写法2：直接调用，这种写法虽然可以用，但有以下缺点：

- ❌ **重复调用**：虽然底层是同一个实例，但每次调用都要经过一次查找；

- ❌ **不直观**：可读性较差，不容易看出属于哪个 store；

- ❌ **不便结构**：你无法像 `const { userInfo } = storeToRefs(store)` 那样简洁使用；

- ❌ **watch / computed 中重复写** 时显得臃肿。

- 特别说明：不会创建多个实例。有的同学担心：我在一个组件里多次调用 `useUserStore()` 会不会创建多个 store？不会。Pinia 内部会缓存同一个 ID 的 store 实例。所以它们操作的都是同一份状态。

  ```js
  const a = useUserStore()
  const b = useUserStore()
  console.log(a === b) // true ✅
  ```

  





