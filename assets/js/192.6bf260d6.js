(window.webpackJsonp=window.webpackJsonp||[]).push([[192],{677:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("p"),t._m(0),a("p"),t._v(" "),a("p",[t._v("[TOC]")]),t._v(" "),t._m(1),t._v(" "),a("p",[t._v("React DnD 是一组 React 高阶组件，使用的时候只需要使用对应的 API 将目标组件进行包裹，即可实现拖动或接受拖动元素的功能。将拖动的事件转换成对象中对应状态的形式，不需要开发者自己判断拖动状态，只需要在传入的 spec 对象中各个状态属性中做对应处理即可。")]),t._v(" "),t._m(2),t._v(" "),t._m(3),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),a("p",[t._v("参数：")]),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),a("p",[t._v("type的类型可以是 string，symbol，也可以是用一个函数来返回该组件的其他 props。")]),t._v(" "),a("p",[t._v("示例代码：")]),t._v(" "),t._m(16),t._m(17),t._v(" "),t._m(18),t._v(" "),t._m(19),t._v(" "),a("p",[t._v("package.json文件中添加包：")]),t._v(" "),t._m(20),t._m(21),t._v(" "),t._m(22),t._m(23),t._v(" "),t._m(24),t._m(25),t._v(" "),t._m(26),t._v(" "),t._m(27),t._m(28),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/react-dnd/react-dnd",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-dnd github"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000014723549",target:"_blank",rel:"noopener noreferrer"}},[t._v("强大的拖拽组件：React DnD 的使用 segmentfault"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://blog.csdn.net/sinat_17775997/article/details/88727672",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-dnd 用法详解 CSDN"),a("OutboundLink")],1)])])},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#_1-核心api介绍"}},[t._v("1. 核心API介绍")])]),a("li",[a("a",{attrs:{href:"#_2-dragsource-type-spec-collect-参数介绍"}},[t._v("2. DragSource(type, spec, collect)参数介绍")]),a("ul",[a("li",[a("a",{attrs:{href:"#_2-1-type参数说明"}},[t._v("2.1 type参数说明")])]),a("li",[a("a",{attrs:{href:"#_2-2spec参数说明"}},[t._v("2.2spec参数说明")])])])]),a("li",[a("a",{attrs:{href:"#实际代码"}},[t._v("实际代码")]),a("ul",[a("li",[a("a",{attrs:{href:"#要拖动的组件使用dragsource包装"}},[t._v("要拖动的组件使用DragSource包装")])]),a("li",[a("a",{attrs:{href:"#接受拖动组件使用droptarget包装"}},[t._v("接受拖动组件使用DropTarget包装")])]),a("li",[a("a",{attrs:{href:"#使用dndprovider包裹上拖动、接受拖动的组件"}},[t._v("使用DndProvider包裹上拖动、接受拖动的组件")])])])]),a("li",[a("a",{attrs:{href:"#参考资料"}},[t._v("参考资料")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"react-dnd组件使用教程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-dnd组件使用教程","aria-hidden":"true"}},[this._v("#")]),this._v(" react-dnd组件使用教程")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("组件名字："),s("code",[this._v("react-dnd")]),this._v("，一般还配合"),s("code",[this._v("react-dnd-html5-backend")]),this._v("，目前使用的版本：")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v('"react-dnd": "^9.5.1",\n"react-dnd-html5-backend": "^9.4.0",\n')])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_1-核心api介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-核心api介绍","aria-hidden":"true"}},[this._v("#")]),this._v(" 1. 核心API介绍")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("strong",[this._v("DragSource")]),this._v(" 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）")]),this._v(" "),s("li",[s("strong",[this._v("DropTarget")]),this._v(" 用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("下面是"),s("code",[this._v("react-dnd: ^7.0.2")]),this._v(","),s("code",[this._v('"react-dnd-html5-backend": "^7.0.2"')]),this._v("版本的：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",[a("li",[a("strong",[t._v("DragDropContex")]),t._v(" 用于包装拖拽根组件，"),a("code",[t._v("DragSource")]),t._v(" 和 "),a("code",[t._v("DropTarget")]),t._v(" 都需要包裹在"),a("code",[t._v("DragDropContex")]),t._v("内")]),t._v(" "),a("li",[a("strong",[t._v("DragDropContextProvider")]),t._v(" 与 "),a("code",[t._v("DragDropContex")]),t._v(" 类似，用 "),a("code",[t._v("DragDropContextProvider")]),t._v(" 元素包裹拖拽根组件。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("下面是"),s("code",[this._v('"react-dnd": "^9.5.1"')]),this._v(","),s("code",[this._v('"react-dnd-html5-backend": "^9.4.0"')]),this._v("版本的：")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("strong",[this._v("DndProvider")]),this._v(" 用 "),s("code",[this._v("DndProvider")]),this._v(" 元素包裹拖拽根组件。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_2-dragsource-type-spec-collect-参数介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-dragsource-type-spec-collect-参数介绍","aria-hidden":"true"}},[this._v("#")]),this._v(" 2. DragSource(type, spec, collect)参数介绍")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token function"}},[t._v("DragSource")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("type"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" spec"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" collect"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",[a("li",[t._v("type: 拖拽类型，必填")]),t._v(" "),a("li",[t._v("spec: 拖拽事件的方法对象，必填")]),t._v(" "),a("li",[t._v("collect: 把拖拽过程中需要信息注入组件的 props，接收两个参数 "),a("code",[t._v("connect")]),t._v(" and "),a("code",[t._v("monitor")]),t._v("，必填")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_2-1-type参数说明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-type参数说明","aria-hidden":"true"}},[this._v("#")]),this._v(" 2.1 type参数说明")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("约定 "),s("strong",[this._v("source组件")]),this._v(" 为DragSource包装的组件，"),s("strong",[this._v("target组件")]),this._v(" 为DropTarget包装的组件")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("当 "),a("code",[t._v("source组件")]),t._v("的type 和 "),a("code",[t._v("target组件")]),t._v("的type 一致时，"),a("code",[t._v("target组件")]),t._v("可以接受"),a("code",[t._v("source组件")]),t._v("。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// ItemTypes.js 定义类型")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token constant"}},[t._v("BOX")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'box'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// Box.jsx")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ItemTypes "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'./ItemTypes'")]),t._v("\n@"),a("span",{attrs:{class:"token function"}},[t._v("DragSource")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ItemTypes"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("BOX")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" spec"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" collect"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// Dustbin.jsx")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ItemTypes "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'./ItemTypes'")]),t._v("\n@"),a("span",{attrs:{class:"token function"}},[t._v("DropTarget")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ItemTypes"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token constant"}},[t._v("BOX")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" spec"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" collect"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_2-2spec参数说明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2spec参数说明","aria-hidden":"true"}},[this._v("#")]),this._v(" 2.2spec参数说明")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("spec定义特定方法的对象，可以定义 "),s("strong",[this._v("拖动")]),this._v(" 相关的事件。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"实际代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实际代码","aria-hidden":"true"}},[this._v("#")]),this._v(" 实际代码")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v('"react-dnd": "^9.5.1",\n"react-dnd-html5-backend": "^9.4.0",\n')])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"要拖动的组件使用dragsource包装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#要拖动的组件使用dragsource包装","aria-hidden":"true"}},[this._v("#")]),this._v(" 要拖动的组件使用DragSource包装")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" DropTarget "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'react-dnd'")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// type")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" searchDragType "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'searchDragType'")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 拖动组件定义的一些回调方法")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" itemSpecSource "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// 当前是否可以拖拽的事件，可选")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("canDrag")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// 拖拽时触发的事件，可选。")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// isDragging(props, monitor) {")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("//     // return monitor.getItem().itemType === props.itemType")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// },")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// 拖动开始时触发的事件，必须。返回跟props相关的对象。")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("beginDrag")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// props 属性是react组件的props属性")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" data "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" props\n        "),a("span",{attrs:{class:"token comment"}},[t._v("// 这里返回的数据是target里面获取的")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" data"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// 拖动结束时触发的事件，可选。")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("endDrag")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 拖拽过程中需要信息注入组件的 props，接收两个参数 connect and monitor，必填")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("collect")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("connect"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" monitor"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        connectDragSource"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" connect"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("dragSource")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        isDragging"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" monitor"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("isDragging")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("AtlasSearchListItem")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("connectDragSource"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \t"),a("span",{attrs:{class:"token comment"}},[t._v("// 这个很重要，一定要使用connectDragSource包装")]),t._v("\n  \t"),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("connectDragSource")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("div className"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),a("span",{attrs:{class:"token string"}},[t._v('"map"')]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" 数据"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),a("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nAtlasSearchListItem"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("propTypes "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    connectDragSource"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" PropTypes"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("func"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// DropTarget带的")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("DragSource")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("searchDragType"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" itemSpecSource"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" collect"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("AtlasSearchListItem"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"接受拖动组件使用droptarget包装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#接受拖动组件使用droptarget包装","aria-hidden":"true"}},[this._v("#")]),this._v(" 接受拖动组件使用DropTarget包装")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" DropTarget "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'react-dnd'")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// type")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" searchDragType "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'searchDragType'")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 拖动组件定义的一些回调方法")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" itemSpecTarget "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// 组件可以被放置时触发的事件，可选")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("canDrop")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// 组件放下时触发的事件，可选")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("drop")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" monitor"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" info "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" props\n        console"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'props: '")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" props"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        console"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'monitor.getItem(): '")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" monitor"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("getItem")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 拖拽过程中需要信息注入组件的 props，接收两个参数 connect and monitor，必填")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("collect")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("connect"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" monitor"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        connectDropTarget"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" connect"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("dropTarget")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        canDrop"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" monitor"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("canDrop")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        itemType"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" monitor"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("getItemType")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("AtlasRightCard")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("PureComponent")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{attrs:{class:"token function"}},[t._v("render")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" connectDropTarget "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("props\n        "),a("span",{attrs:{class:"token comment"}},[t._v("// 这个很重要，一定要使用connectDropTarget包装")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("connectDropTarget")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n            "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("div className"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),a("span",{attrs:{class:"token string"}},[t._v('"atlas-right-card-data-map"')]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n            "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),a("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nAtlasRightCard"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("propTypes "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    connectDropTarget"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" PropTypes"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("func"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// DropTarget传的方法，用于拖拽组件")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("DropTarget")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("searchDragType"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" itemSpecTarget"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" collect"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("AtlasRightCard"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"使用dndprovider包裹上拖动、接受拖动的组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用dndprovider包裹上拖动、接受拖动的组件","aria-hidden":"true"}},[this._v("#")]),this._v(" 使用DndProvider包裹上拖动、接受拖动的组件")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在拖动组件、接受拖动的组件上一层使用"),s("code",[this._v("DndProvider")]),this._v("包裹上，来完成拖动")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-jsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-jsx"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" DndProvider "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'react-dnd'")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" HTML5Backend "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'react-dnd-html5-backend'")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Atlas")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("PureComponent")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{attrs:{class:"token function"}},[t._v("render")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n            "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("className")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("data-map-atlas-mian-box-data-map"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("DndProvider")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("backend")]),a("span",{attrs:{class:"token script language-javascript"}},[a("span",{attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("HTML5Backend"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                    ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("className")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("content-main-box"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                        ")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token comment"}},[t._v("/* 要拖动的组件 */")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                        ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("AtlasSearchListItem")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                        ")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token comment"}},[t._v("/* 接受拖动的组件 */")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                        ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("AtlasRightPancel")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("/>")])]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                    ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("DndProvider")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token plain-text"}},[t._v("\n                \n            ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"参考资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考资料","aria-hidden":"true"}},[this._v("#")]),this._v(" 参考资料")])}],!1,null,null,null);e.options.__file="013-react-dnd拖动组件.md";s.default=e.exports}}]);