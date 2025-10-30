[[TOC]]

[TOC]

# element-plus 代码示例

## 1. element-plus组件的form表单实现自定义组件

Vue 3 + TypeScript + Element Plus + 自定义组件作为数组输入源

示例规则：

- 使用element-plus组件的form表单，表单子项是自定义组件
- 这个自定义组件数据格式是数组，数组子项是对象。
- form校验这个自定义组件的数据

父组件form表单实现：

```vue
<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <!-- 自定义成员组件 -->
    <el-form-item label="成员信息" prop="members">
      <CustomMembers v-model="form.members" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import CustomMembers from './CustomMembers.vue'

interface Member {
  name: string
  age: number | null
}
const form = reactive({ members: [] as Member[] })
const formRef = ref<FormInstance>()

const validateMembers = (_rule: any, value: Member[], callback: (error?: Error) => void) => {
  if (!value || value.length === 0) {
    return callback(new Error('请至少添加一个成员'))
  }
  for (let i = 0; i < value.length; i++) {
    const member = value[i]
    if (!member.name || member.name.trim() === '') {
      return callback(new Error(`第 ${i + 1} 个成员的姓名不能为空`))
    }
    if (member.age === null || member.age === undefined) {
      return callback(new Error(`第 ${i + 1} 个成员的年龄不能为空`))
    }
  }
  callback()
}

const rules: FormRules = {
  members: [{ required: true, validator: validateMembers, trigger: 'change' }]
}
const submitForm = () => {
  formRef.value?.validate(valid => {
    if (valid) {
      console.log('提交成功', form.members)
    } else {
      console.log('校验失败')
    }
  })
}
const resetForm = () => {
  formRef.value?.resetFields()
}
</script>
```

自定义组件，内部使用变量

```vue
<template>
  <div>
    <div
      v-for="(member, index) in internalValue"
      :key="index"
      style="margin-bottom: 10px"
    >
      <el-input
        v-model="member.name"
        placeholder="请输入姓名"
        style="width: 200px; margin-right: 10px"
        @input="updateValue"
      />
      <el-input-number v-model="member.age" :min="0" placeholder="请输入年龄" @change="updateValue" />
      <el-button
        type="danger"
        @click="removeMember(index)"
        style="margin-left: 10px"
      >删除</el-button>
    </div>

    <el-button type="primary" @click="addMember">添加成员</el-button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, ref } from 'vue'

interface Member {
  name: string
  age: number | null
}

const props = defineProps<{
  modelValue: Member[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Member[]): void
}>()

const internalValue = ref<Member[]>([])

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = [...val] // // 保证本地 state 跟外部父组件传入的 modelValue 保持同步
  },
  { immediate: true, deep: true }
)

const updateValue = () => {
  emit('update:modelValue', internalValue.value)
}

const addMember = () => {
  internalValue.value.push({ name: '', age: null })
  updateValue()
}

const removeMember = (index: number) => {
  internalValue.value.splice(index, 1)
  updateValue()
}
</script>

```

子组件使用新变量来接受父组件传过来的属性意义：

- 为了让 `internalValue` 保持和外部传入的 `modelValue` 同步。

  在 Vue 的表单组件中，常用 **`v-model` 来进行双向绑定**，实际会传递：

  ```js
  props.modelValue  // 来自父组件的值
  emit('update:modelValue', newValue)  // 子组件更新时通知父组件
  ```

  但在子组件内部不能直接修改 `props.modelValue`，所以我们通常：

  - 用一个本地副本 `internalValue` 来做编辑
  - 监听 `props.modelValue`，确保本地副本同步外部的值（比如外部 `reset()` 了）

自定义组件，直接使用父组件属性

```vue
<template>
  <div>
    <el-checkbox-group
      :model-value="modelValue"
      @change="handleChange"
    >
      <el-checkbox
        v-for="user in allUsers"
        :key="user.id"
        :label="user"
      >
        {{ user.name }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface User {
  id: number
  name: string
}

const props = defineProps<{
  modelValue: User[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: User[]): void
}>()

const allUsers: User[] = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
]

function handleChange(val: User[]) {
  emit('update:modelValue', val)
}
</script>
```



## 2. el-table-column 内 `template` 的 `#default` 插槽取值

在Vue3的Element Plus中，el-table-column使用template的`#default`（即插槽）可以获取到当前行、列、索引等数据。具体来说，这个插槽提供了以下属性：

- scope.row: 当前行的数据
- scope.column: 当前列的数据
- scope.$index: 当前行的索引（从0开始）
- scope.disable: 是否禁用（用于一些操作）

当你在 `#default` 中接收参数时（通常命名为 `scope`），这个 `scope` 对象包含以下主要属性：

| 属性名       | 说明                                   | 类型     |
| :----------- | :------------------------------------- | :------- |
| **`$index`** | **当前行的索引**（从 0 开始）          | `number` |
| **`row`**    | **当前行的数据对象**                   | `object` |
| **`column`** | **当前列的信息对象**                   | `object` |
| **`store`**  | Table 内部的状态管理对象（通常用不到） | `object` |

其中最常用的是 **`row`** 和 **`$index`**。

```vue
<el-table-column label="姓名和地址">
  <template #default="{ row, $index }">
    <p><strong>姓名：</strong>{{ row.name }}</p>
    <p><small>行号：{{ $index + 1 }}</small></p>
  </template>
</el-table-column>
<el-table-column prop="name" label="姓名">
  <template #default="{ row, column }">
    <div>
      {{ row.status }}
      属性名: {{ column.property }} <!-- 输出 'name' -->
      <br>
      列标签: {{ column.label }} <!-- 输出 '姓名' -->
      <br>
      单元格值: {{ row[column.property] }} <!-- 等同于 row.name -->
    </div>
  </template>
</el-table-column>

```

