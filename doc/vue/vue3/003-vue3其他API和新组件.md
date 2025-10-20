[[TOC]]

[TOC]

# Vue 3 其他API和新组件

## 1. 其他API

### 1.1 shallowRef 与 shallowReactive

通过使用 [`shallowRef()`](https://gitee.com/link?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Freactivity-advanced.html%23shallowref) 和 [`shallowReactive()`](https://gitee.com/link?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Freactivity-advanced.html%23shallowreactive) 来绕开深度响应。浅层式 `API` 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，这使得属性的访问变得更快，可提升性能。

#### 1.1.1 shallowRef

1. 作用：创建一个响应式数据，但只对顶层属性进行响应式处理。

2. 用法：

   ```
   let myVar = shallowRef(initialValue);
   ```

3. 特点：只跟踪引用值的变化，不关心值内部的属性变化。

#### 1.1.2 shallowReactive

1. 作用：创建一个浅层响应式对象，只会使对象的最顶层属性变成响应式的，对象内部的嵌套属性则不会变成响应式的

2. 用法：

   ```
   const myObj = shallowReactive({ ... });
   ```

3. 特点：对象的顶层属性是响应式的，但嵌套对象的属性不是。

### 1.2 readonly 与 shallowReadonly

#### 1.2.1 readonly

1. 作用：用于创建一个对象的深只读副本。

2. 用法：

   ```
   const original = reactive({ ... });
   const readOnlyCopy = readonly(original);
   ```

3. 特点：

   - 对象的所有嵌套属性都将变为只读。
   - 任何尝试修改这个对象的操作都会被阻止（在开发模式下，还会在控制台中发出警告）。

4. 应用场景：

   - 创建不可变的状态快照。
   - 保护全局状态或配置不被修改。

#### 1.2.2 shallowReadonly

1. 作用：与 `readonly` 类似，但只作用于对象的顶层属性。

2. 用法：

   ```
   const original = reactive({ ... });
   const shallowReadOnlyCopy = shallowReadonly(original);
   ```

3. 特点：

   - 只将对象的顶层属性设置为只读，对象内部的嵌套属性仍然是可变的。
   - 适用于只需保护对象顶层属性的场景。

### 1.3 toRaw 与 markRaw

#### 1.3.1 toRaw

1. 作用：用于获取一个响应式对象的原始对象， `toRaw` 返回的对象不再是响应式的，不会触发视图更新。

   > 官网描述：这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

   > 何时使用？ —— 在需要将响应式对象传递给非 `Vue` 的库或外部系统时，使用 `toRaw` 可以确保它们收到的是普通对象

2. 具体编码：

   ```js
   import { reactive,toRaw,markRaw,isReactive } from "vue";
   
   /* toRaw */
   // 响应式对象
   let person = reactive({name:'tony',age:18})
   // 原始对象
   let rawPerson = toRaw(person)
   
   /* markRaw */
   let citysd = markRaw([
     {id:'asdda01',name:'北京'},
     {id:'asdda02',name:'上海'},
     {id:'asdda03',name:'天津'},
     {id:'asdda04',name:'重庆'}
   ])
   // 根据原始对象citys去创建响应式对象citys2 —— 创建失败，因为citys被markRaw标记了
   let citys2 = reactive(citys)
   console.log(isReactive(person))
   console.log(isReactive(rawPerson))
   console.log(isReactive(citys))
   console.log(isReactive(citys2))
   ```

#### 1.3.2 markRaw

1. 作用：标记一个对象，使其**永远不会**变成响应式的。

   > 例如使用`mockjs`时，为了防止误把`mockjs`变为响应式对象，可以使用 `markRaw` 去标记`mockjs`

2. 编码：

   ```js
   /* markRaw */
   let citys = markRaw([
     {id:'asdda01',name:'北京'},
     {id:'asdda02',name:'上海'},
     {id:'asdda03',name:'天津'},
     {id:'asdda04',name:'重庆'}
   ])
   // 根据原始对象citys去创建响应式对象citys2 —— 创建失败，因为citys被markRaw标记了
   let citys2 = reactive(citys)
   ```

### 1.4 customRef

作用：创建一个自定义的`ref`，并对其依赖项跟踪和更新触发进行逻辑控制。

实现防抖效果（`useSumRef.ts`）封装在hooks里面：

```js
import {customRef } from "vue";

export default function(initValue:string,delay:number){
  //track（跟踪），trigger（触发）
  let msg = customRef((track,trigger)=>{
  	let timer:number
    return {
      //get何时调用？——msg被读取时候
      get(){
        track() // 告诉Vue数据msg很重要，要对msg持续关注，一旦变化就更新
        return initValue
      },
      //set何时调用？——msg被修改时候
      set(value){
        clearTimeout(timer)
        timer = setTimeout(() => {
          initValue = value
          trigger() //通知Vue数据msg变化了
        }, delay);
      }
    }
  }) 
  return {msg}
}
```

组件中使用：

```vue
<template>
	<div class="app">
		<h2>{{ msg }}</h2>
		<input
			type="text"
			v-model="msg"
		>
	</div>
</template>

<script setup lang="ts" name="App">
import { ref } from 'vue'
import useMsgRef from './useMsgRef'

// 使用Vue提供的默认ref定义响应式数据，数据一变，页面就更新
// let msg = ref('你好')

// 使用useMsgRef来定义一个响应式数据且有延迟效果
let { msg } = useMsgRef('你好', 2000)

</script>
```

### 1.5 nextTick

Vue 的响应式更新是 **批量的（batched）**，所有同步代码执行完后才会刷新视图。 `nextTick` 就是让你「等这次刷新完成」后再执行代码。

`nextTick()` 是 Vue 提供的一个异步方法，用来在 **下一次 DOM 更新完成后** 执行回调。
 简单来说，它让你「等视图更新完再执行某段逻辑」。

所以记住这句话：

> **“你改完响应式数据后，DOM 不会马上变。要等 nextTick() 才能拿到新 DOM。”**

```js
import { nextTick } from 'vue';
// Promise + await（最常用）
async function getData() {
  count.value++
  await nextTick()
  console.log('DOM 已更新')
}
// 回调函数写法
async function getData() {
  count.value++
  nextTick(() => {
    console.log('DOM 已更新')
  })
}
```

为什么需要它？    
Vue 是**异步更新 DOM** 的。当你修改响应式数据时，Vue 不会立刻更新 DOM，而是等待当前“事件循环（event loop）”结束后统一更新。

```js
count.value++
console.log(document.querySelector('#num').textContent)
```

这时打印的内容仍是旧值。因为 DOM 还没更新。如果你希望“等 DOM 更新后再访问/操作”，就要这样写：

```js
count.value++
await nextTick()
console.log(document.querySelector('#num').textContent) // ✅ 新值
```

`nextTick()` 常见应用场景

| 场景                     | 示例                                                         | 说明                    |
| ------------------------ | ------------------------------------------------------------ | ----------------------- |
| 🔄 数据变化后要访问新 DOM | `v-if` 切换、`v-for` 新增后操作元素                          | 等新 DOM 出现后才能操作 |
| 🎨 操作第三方组件         | Element Plus 的 `clearSelection()`、`toggleRowSelection()` 等 | 要等表格渲染完成        |
| 🧩 动画过渡控制           | 等下一帧再启动动画                                           | 保证 transition 生效    |
| 🧍‍♂️聚焦输入框             | `inputRef.value.focus()`                                     | 输入框必须先渲染到页面  |
| 🧠 复杂 watch             | watch 回调中数据变化需要再更新视图后再处理                   | 避免访问旧 DOM 状态     |



| 时机                                | 是否需要 nextTick  |
| ----------------------------------- | ------------------ |
| 改数据后立即访问 DOM                | ✅ 需要             |
| 改数据后仅逻辑判断                  | ❌ 不需要           |
| 调用 Element Plus 等依赖 DOM 的方法 | ✅ 通常需要         |
| 生命周期 onMounted 内访问初始 DOM   | ❌ 不需要（已渲染） |
| watch 中要操作新 DOM                | ✅ 常需要           |





## 2. 新组件

### 2.1 Teleport

- 什么是Teleport？—— Teleport 是一种能够将我们的**组件html结构**移动到指定位置的技术。

```html
<teleport to='body' >
    <div class="modal" v-show="isShow">
      <h2>我是一个弹窗</h2>
      <p>我是弹窗中的一些内容</p>
      <button @click="isShow = false">关闭弹窗</button>
    </div>
</teleport>
```

### 2.2 Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
- 使用步骤：
  - 异步引入组件
  - 使用`Suspense`包裹组件，并配置好`default` 与 `fallback`

```js
import { defineAsyncComponent,Suspense } from "vue";
const Child = defineAsyncComponent(()=>import('./Child.vue'))
```

`<Child/>`是一个包含了异步请求的子组件

```vue
<template>
  <div class="child">
    <h2>我是Child组件</h2>
    <h3>当前求和为：{{ sum }}</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

let sum = ref(0)
let { data: { content } } = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
console.log(content)

</script>
<template>
    <div class="app">
        <h3>我是App组件</h3>
        <Suspense>
          <template v-slot:default>
            <Child/>
          </template>
          <template v-slot:fallback>
            <h3>加载中.......</h3>
          </template>
        </Suspense>
    </div>
</template>
```

### 2.3 全局API转移到应用对象

- `app.component` 注册全局组件
- `app.config` 配置对象
- `app.directive` 注册全局指令
- `app.mount`
- `app.unmount`
- `app.use`

### 2.4 其他

- 过渡类名 `v-enter` 修改为 `v-enter-from`、过渡类名 `v-leave` 修改为 `v-leave-from`。
- `keyCode` 作为 `v-on` 修饰符的支持。
- `v-model` 指令在组件上的使用已经被重新设计，替换掉了 `v-bind.sync。`
- `v-if` 和 `v-for` 在同一个元素身上使用时的优先级发生了变化。
- 移除了`$on`、`$off` 和 `$once` 实例方法。
- 移除了过滤器 `filter`。
- 移除了`$children` 实例 `propert`。











  	