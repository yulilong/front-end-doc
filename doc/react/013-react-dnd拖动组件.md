[[TOC]]

[TOC]



# react-dnd组件使用教程

React DnD 是一组 React 高阶组件，使用的时候只需要使用对应的 API 将目标组件进行包裹，即可实现拖动或接受拖动元素的功能。将拖动的事件转换成对象中对应状态的形式，不需要开发者自己判断拖动状态，只需要在传入的 spec 对象中各个状态属性中做对应处理即可。

组件名字：`react-dnd`，一般还配合`react-dnd-html5-backend`，目前使用的版本：

```
"react-dnd": "^9.5.1",
"react-dnd-html5-backend": "^9.4.0",
```

## 1. 核心API介绍

- **DragSource** 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）
- **DropTarget** 用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）

下面是`react-dnd: ^7.0.2`,`"react-dnd-html5-backend": "^7.0.2"`版本的：

- **DragDropContex** 用于包装拖拽根组件，`DragSource` 和 `DropTarget` 都需要包裹在`DragDropContex`内
- **DragDropContextProvider** 与 `DragDropContex` 类似，用 `DragDropContextProvider` 元素包裹拖拽根组件。

下面是`"react-dnd": "^9.5.1"`,`"react-dnd-html5-backend": "^9.4.0"`版本的：

- **DndProvider** 用 `DndProvider` 元素包裹拖拽根组件。

## 2. DragSource(type, spec, collect)参数介绍

```js
DragSource(type, spec, collect)
```

参数：

- type: 拖拽类型，必填
- spec: 拖拽事件的方法对象，必填
- collect: 把拖拽过程中需要信息注入组件的 props，接收两个参数 `connect` and `monitor`，必填

### 2.1 type参数说明

约定 **source组件** 为DragSource包装的组件，**target组件** 为DropTarget包装的组件

当 `source组件`的type 和 `target组件`的type 一致时，`target组件`可以接受`source组件`。

type的类型可以是 string，symbol，也可以是用一个函数来返回该组件的其他 props。

示例代码：

```js
// ItemTypes.js 定义类型
export default {
  BOX: 'box',
}

// Box.jsx
import ItemTypes from './ItemTypes'
@DragSource(ItemTypes.BOX, spec, collect)

// Dustbin.jsx
import ItemTypes from './ItemTypes'
@DropTarget(ItemTypes.BOX, spec, collect)
```

### 2.2spec参数说明

spec定义特定方法的对象，可以定义 **拖动** 相关的事件。





## 实际代码

package.json文件中添加包：

```
"react-dnd": "^9.5.1",
"react-dnd-html5-backend": "^9.4.0",
```

### 要拖动的组件使用DragSource包装

```js
import { DropTarget } from 'react-dnd'

// type
const searchDragType = 'searchDragType'

// 拖动组件定义的一些回调方法
const itemSpecSource = {
    // 当前是否可以拖拽的事件，可选
    canDrag() { return true },
    // 拖拽时触发的事件，可选。
    // isDragging(props, monitor) {
    //     // return monitor.getItem().itemType === props.itemType
    // },
    // 拖动开始时触发的事件，必须。返回跟props相关的对象。
    beginDrag(props) {
      // props 属性是react组件的props属性
        const { data } = props
        // 这里返回的数据是target里面获取的
        return { data, }
    },
    // 拖动结束时触发的事件，可选。
    endDrag() { }
}

// 拖拽过程中需要信息注入组件的 props，接收两个参数 connect and monitor，必填
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const AtlasSearchListItem = function (connectDragSource) {
  	// 这个很重要，一定要使用connectDragSource包装
  	return connectDragSource(
        <div className="map"> 数据</div>
    )
}
AtlasSearchListItem.propTypes = {
    connectDragSource: PropTypes.func, // DropTarget带的
}
export default DragSource(searchDragType, itemSpecSource, collect)(AtlasSearchListItem)
```



### 接受拖动组件使用DropTarget包装



```js
import { DropTarget } from 'react-dnd'

// type
const searchDragType = 'searchDragType'

// 拖动组件定义的一些回调方法
const itemSpecTarget = {
    // 组件可以被放置时触发的事件，可选
    canDrop() { return true },
    // 组件放下时触发的事件，可选
    drop(props, monitor) {
        const { info } = props
        console.log('props: ', props)
        console.log('monitor.getItem(): ', monitor.getItem())
    }
}

// 拖拽过程中需要信息注入组件的 props，接收两个参数 connect and monitor，必填
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}
class AtlasRightCard extends PureComponent {
		render() {
        const { connectDropTarget } = this.props
        // 这个很重要，一定要使用connectDropTarget包装
        return connectDropTarget(
            <div className="atlas-right-card-data-map">
            </div>
        )
    }
}

AtlasRightCard.propTypes = {
    connectDropTarget: PropTypes.func, // DropTarget传的方法，用于拖拽组件
}

export default DropTarget(searchDragType, itemSpecTarget, collect)(AtlasRightCard)
```



### 使用DndProvider包裹上拖动、接受拖动的组件

在拖动组件、接受拖动的组件上一层使用`DndProvider`包裹上，来完成拖动

```jsx
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Atlas extends PureComponent {
		render() {
        return (
            <div className="data-map-atlas-mian-box-data-map">
                <DndProvider backend={HTML5Backend}>
                    <div className="content-main-box">
                        {/* 要拖动的组件 */}
                        <AtlasSearchListItem />
                        {/* 接受拖动的组件 */}
                        <AtlasRightPancel />
                    </div>
                </DndProvider>
                
            </div>
        )
    }
}
```











## 参考资料

[react-dnd github](https://github.com/react-dnd/react-dnd)

 [强大的拖拽组件：React DnD 的使用 segmentfault](https://segmentfault.com/a/1190000014723549)

[react-dnd 用法详解 CSDN](https://blog.csdn.net/sinat_17775997/article/details/88727672)