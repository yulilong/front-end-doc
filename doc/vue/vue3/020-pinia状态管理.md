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

1、安装 pinia 包：

```bash
npm install pinia
# 或使用 yarn
yarn add pinia
```

2、创建一个 pinia 实例 (根 store) 并将其传递给应用：

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

## 3. 存储+读取数据

1. Store是一个保存：**状态**、**业务逻辑** 的实体，每个组件都可以**读取**、**写入**它。

2. 它有三个概念：`state`、`getter`、`action`，相当于组件中的： `data`、 `computed` 和 `methods`。

3. 具体编码：`src/store/talk.ts`

   ```js
   // 引入defineStore用于创建store
   import {defineStore} from 'pinia'
   
   // 定义并暴露一个store
   export const useTalkStore = defineStore('talk',{
     // 状态：存储的变量
     state(){
       return {
         num: 10,
         info: null,
         talkList:[
           {id:'da01', content:'你今天有点怪，哪里怪？怪好看的！'},
           {id:'da02', content:'草莓、蓝莓、蔓越莓，你想我了没？'},
         ]
       }
     },
     // 动作：执行方法，用来设置状态
     actions:{
       // 同步方法
       setNumber(num: umber) {
         this.num = num
       }
       // 异步方法
       getInfo() {
         info().then( res => {
           this.info = res.info
         })
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
   })
   ```

5. 组件中使用`state`中的数据

   ```vue
   <template>
   	<ul>
       <li v-for="talk in talkStore.talkList" :key="talk.id">
         {{ talk.content }}
       </li>
     </ul>
   </template>
   
   <script setup lang="ts" name="Count">
     import axios from 'axios'
     // 引入对应的useXxxxxStore	
     import {useTalkStore} from '@/store/talk'
     // 调用useXxxxxStore得到对应的store
     const talkStore = useTalkStore()
     // 执行方法
     talkStore.setNumber(20)
     // getter 使用
     talkStore.doubleNum
   </script>
   ```

## 4. 修改数据(三种方式)

1、第一种修改方式：直接修改

```js
countStore.sum = 666
```

2、第二种修改方式：批量修改

```js
countStore.$patch({
  sum:999,
  school:'atguigu'
})
```

在一次性修改多个属性的时候。第一种方式每个修改都会触发一次时间线。而第二种方式 是一次性批量修改，只会触发一次 时间线(浏览器vue插件，时间线(TimeLine))

3、第三种修改方式：借助`action`修改（`action`中可以编写一些业务逻辑）

```js
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  actions: {
    // 加
    increment(value:number) {
      if (this.sum < 10) {
        //操作countStore中的sum
        this.sum += value
      }
    },
    // 减
    decrement(value:number){
      if(this.sum > 1){
        this.sum -= value
      }
    }
  },
})
```

组件中调用`action`即可

```js
// 使用countStore
const countStore = useCountStore()
// 调用对应action
countStore.incrementOdd(n.value)
```

## 5. storeToRefs

- 借助`storeToRefs`将`store`中的数据转为`ref`对象，方便在模板中使用。
- 注意：`pinia`提供的`storeToRefs`只会将数据做转换，而`Vue`的`toRefs`会转换`store`中数据。

```vue
<template>
  <div class="count">
    <h2>当前求和为：{{sum}}</h2>
  </div>
</template>
<script setup lang="ts" name="Count">
  import { useCountStore } from '@/store/count'
  import { storeToRefs } from 'pinia' // 引入storeToRefs

  const countStore = useCountStore() // 得到countStore
  /* 使用storeToRefs转换countStore，随后解构 */
  const {sum} = storeToRefs(countStore)
</script>
```

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

## 8. store组合式写法

```js
import {defineStore} from 'pinia'
import axios from 'axios'
import {nanoid} from 'nanoid'
import {reactive} from 'vue'

export const useTalkStore = defineStore('talk',()=>{
  // talkList就是state
  const talkList = reactive(
    JSON.parse(localStorage.getItem('talkList') as string) || []
  )
  // getATalk函数相当于action
  async function getATalk(){
    // 发请求，下面这行的写法是：连续解构赋值+重命名
    let {data:{content:title}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
    // 把请求回来的字符串，包装成一个对象
    let obj = {id:nanoid(),title}
    // 放到数组中
    talkList.unshift(obj)
  }
  return {talkList,getATalk}
})
```













