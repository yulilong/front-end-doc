[[TOC]]

[TOC]



# Vuex 使用说明

官方文档地址：https://vuex.vuejs.org/zh/

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。每一个 Vuex 应用的核心就是 store。

1.  Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2.  你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

## 1 vuex的声明

vuex的声明文件一般存放在项目根目录中有一个store文件夹：

```bash
./
├── actions.js
├── index.js
├── modules # vuex的模块存放文件夹
│   ├── customInfo.js
│   └── global.js
├── modules.js
└── mutation.js
```

一个vuex的文件：

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// customInfo.js
import { SOME_MUTATION } from './mutation-types'

export default {
  // 状态变量
  state: {
    todos: [ { id: 1, text: '...', done: true } ]
  },
  /** getters: 从state中派生出一些状态 ///////////////////////////
   *  就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
   *  且只有当它的依赖值发生了改变才会被重新计算。
   */
  getters: {
    // Getter 接受 state 作为其第一个参数
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // Getter 也可以接受其他 getter 作为第二个参数
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // 让 getter 返回一个函数，来实现给 getter 传参。
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
    
  /** Mutation：同步更新 store 中的状态 /////////////////////////
   * mutation 也需要与使用 Vue 一样遵守一些注意事项：
   *  1、最好提前在你的 store 中初始化好所有所需属性。
   *  2、当需要在对象上添加新属性时，你应该：
   *    2.1 使用Vue.set(obj, 'newProp', 123), 
   *    2.2 以新对象替换老对象: state.obj = { ...state.obj, newProp: 123 }
   */
  mutations: {
    increment (state) {
      state.count++
    },
    // 传入额外的参数，即 mutation 的 载荷（payload）
    increment (state, payload) {
      state.count += payload.amount
    },
    /** 使用常量替代 Mutation 事件类型
     * 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
     * 这样可以使 linter 之类的工具发挥作用，
     * 同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然
     */
    [SOME_MUTATION] (state) {
      // mutate state
    }
  },
  
  /** Action：异步更新 store 中的状态 //////////////////////////
   * Action 类似于 mutation，不同在于：
   *  Action 提交的是 mutation，而不是直接变更状态。
   *  Action 可以包含任意异步操作。
   * Action 通常是异步的， `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，
   * 并且 `store.dispatch` 仍旧返回 Promise。
   * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
   * 因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。
   * 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。
   * 在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
   */
  actions: {
    increment (context) { context.commit('increment') },
    // 第二个参数是方法的参数
    increment ({ commit }, payload) { commit('increment') },
    // 使用参数解构来简化代码
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => { commit('someMutation') resolve() }, 1000)
      })
    },
    // 调用另外一个 action
    actionB ({ dispatch, commit }) {
      return dispatch('actionA').then(() => { commit('someOtherMutation') })
    },
    // 利用 async / await, 我们可以如下组合 action：
    async actionC ({ commit }) {
      commit('gotData', await getData())
    },
    async actionD ({ dispatch, commit }) {
      await dispatch('actionA') // 等待 actionA 完成
      commit('gotOtherData', await getOtherData())
    }
  },
}
```



## 2 vuex的使用

### 2.1 vuex文件挂载

一般在项目的`src`文件夹下有一个`store.js`文件：

```js
import Vue from 'vue'
import Vuex from 'vuex'

import actions from './store/actions'
import modules from './store/modules'
Vue.use(Vuex)

const store =  new Vuex.Store({
  actions,
  modules,
})
export default store;
```

然后`src`文件夹下的`main.js`文件中使用：

```js
import App from './App.vue'
import router from './router.js'
import store from './store.js'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
```

### 2.2 在组件中使用vuex

```js
import {
  mapState,     // state 的辅助函数，帮助我们生成计算属性
  mapGetters,   // getter 的辅助函数,仅仅是将 store 中的 getter 映射到局部计算属性
  mapMutations, // Mutation 的辅助函数, 将组件中的 methods 映射为 store.commit 调用
  mapActions    // Action 的辅助函数, 将组件的 methods 映射为 store.dispatch 调用
} from 'vuex'

export default {
  computed: {
    // state 变量使用 ///////////////////////////////////////////
    // 直接使用：当store在根组件注入后，子组件能通过 `this.$store` 访问到
    count () { return this.$store.state.count },
    // 使用对象展开运算符将此对象混入到外部对象中
  	...mapState({
      // 第一种写法：箭头函数可使代码更简练
      count: state => state.count,
      // 第二种写法：传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',
      // 第三种写法：为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    })
  	// 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
  	...mapState([
      // 映射 this.count 为 store.state.count
      'count'
    ]),
    
    // Getter的使用 //////////////////////////////////////////////
    // 直接使用
    doneTodos () {this.$store.getters.doneTodos}, // -> [{ id: 1, text: '...', done: true }]
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
    ]),
    // 如果你想将一个 getter 属性另取一个名字，使用对象形式：
    ...mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    })
  },
  methods: {
    // Mutation 的使用 /////////////////////////////////////////////
    // 直接使用
    getIncrement() {
      this.$store.commit('increment')
      this.$store.commit('increment', 10)
      // 对象风格的触发方式
      this.$store.commit({ type: 'increment', amount: 10 })
    },
    // 使用Mutation 的辅助函数，参数是数组形式
    ...mapMutations([
      // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      'increment',
      // `mapMutations` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      'incrementBy' 
    ]),
    // 使用Mutation 的辅助函数，参数是对象形式
    ...mapMutations({
      setTemplateSeq: 'SET_TEMPLATESEQ', // 常量
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
      
    // action 的使用 /////////////////////////////////////////////////
    // 直接使用
    addIncrement() {
      this.$store.dispatch('increment')
      // 以载荷形式分发
      this.$store.dispatch('incrementAsync', { amount: 10 })
      // 以对象形式分发
      this.$store.dispatch({ type: 'incrementAsync', amount: 10 })
      // 处理异步
      this.$store.dispatch('actionA').then(() => { })
    },
    // 使用 Action 的辅助函数，参数是组数
    ...mapActions([
      // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'increment', 
      // `mapActions` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      'incrementBy' 
    ]),
    // 使用 Action 的辅助函数，参数是对象
    ...mapActions({
      // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      add: 'increment'
    })
  }
}
```



## 3. Module模块

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

默认情况下，模块内部的 action 和 mutation 仍然是注册在**全局命名空间**的——这样使得多个模块能够对同一个 action 或 mutation 作出响应。Getter 同样也默认注册在全局命名空间，但是目前这并非出于功能上的目的（仅仅是维持现状来避免非兼容性变更）。必须注意，不要在不同的、无命名空间的模块中定义两个相同的 getter 从而导致错误。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

```js
const moduleA = {
  /** 模块中 state 使用函数目的：
   *  模块复用的时候，如果state使用一个象来声明模块的状态，
   *  那么这个状态对象会通过引用被共享，导致状态对象被修改时store或模块间数据互相污染的问题。
   *  实际上这和Vue组件内的data是同样的问题。因此解决办法也是相同的,
   *  使用一个函数来声明模块状态（仅 2.3.0+ 支持）
   */
  state: () => ({ count: 0 }),
  getters: {
    // state是模块局部状态，getters是根节点的， rootState是根节点状态
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  },
  mutations: {
    // 这里的 `state` 对象是模块的局部状态
    increment (state) { state.count++; }
  },
  actions: {
    // context.state为局部状态，context.rootState为根节点状态
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  },
}

const moduleB = { state: () => ({ ... }), }
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 3.1 命名空间

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`。

如果你希望使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

若需要在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中。例如：

```js
modules: {
  foo: {
    namespaced: true,
    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... },
      // 注册全局 action
      someAction: {
        root: true,
        handler (namespacedContext, payload) { ... } // -> 'someAction'
      }
    }
  }
}
```

### 3.2 带命名空间模块的使用

第一种直接使用：

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

第二种，将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文：

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

第三种，通过vuex的`createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```js
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([ 'foo', 'bar' ])
  }
}
```

