(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{548:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("p"),t._m(0),a("p"),t._v(" "),a("p",[t._v("[TOC]")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),a("p",[a("a",{attrs:{href:"http://www.ayqy.net/doc/css2-1/visuren.html#block-formatting",target:"_blank",rel:"noopener noreferrer"}},[t._v("9.4.1 块格式化上下文"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("浮动，绝对定位元素，非块盒的块容器（例如，inline-blocks，table-cells和table-captions）和'overflow'不为'visible'的块盒会为它们的内容建立一个新的块格式化上下文")]),t._v(" "),a("p",[t._v("在一个块格式化上下文中，盒在竖直方向一个接一个地放置，从包含块的顶部开始。两个兄弟盒之间的竖直距离由'margin'属性决定。同一个块格式化上下文中的相邻块级盒之间的竖直margin会合并")]),t._v(" "),a("p",[t._v("在一个块格式化上下文中，每个盒的left外边（left outer edge）挨着包含块的left边（对于从右向左的格式化，right边挨着）。即使存在浮动（尽管一个盒的行盒可能会因为浮动收缩），这也成立。除非该盒建立了一个新的块格式化上下文（这种情况下，该盒自身可能会因为浮动变窄）")]),t._v(" "),t._m(4),t._v(" "),a("p",[t._v("https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),a("p",[t._v("块格式化上下文对浮动定位（参见 float）与清除浮动（参见 clear）都很重要。浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。")]),t._v(" "),t._m(7),t._v(" "),a("p",[t._v("http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/")]),t._v(" "),a("p",[t._v("BFC全称”Block Formatting Context”, 中文为“块级格式化上下文”。啪啦啪啦特性什么的，一言难尽，大家可以自行去查找，我这里不详述，免得乱了主次，总之，记住这么一句话：BFC元素特性表现原则就是，内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素。所以，避免margin穿透啊，清除浮动什么的也好理解了。")]),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),a("p",[t._v("1、简记版：")]),t._v(" "),t._m(10),t._v(" "),a("p",[t._v("全部情况：")]),t._v(" "),a("ul",[t._m(11),t._v(" "),a("li",[t._v("浮动元素（即 "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/float",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("float")]),a("OutboundLink")],1),t._v(" 值不为 "),a("code",[t._v("none")]),t._v(" 的元素）。")]),t._v(" "),a("li",[t._v("绝对定位元素（"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/position",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("position")]),a("OutboundLink")],1),t._v(" 值为 "),a("code",[t._v("absolute")]),t._v(" 或 "),a("code",[t._v("fixed")]),t._v(" 的元素）。")]),t._v(" "),a("li",[t._v("行内块元素（"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/display",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("display")]),a("OutboundLink")],1),t._v(" 值为 "),a("code",[t._v("inline-block")]),t._v(" 的元素）。")]),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),a("li",[a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("overflow")]),a("OutboundLink")],1),t._v(" 值不为 "),a("code",[t._v("visible")]),t._v(" 或 "),a("code",[t._v("clip")]),t._v(" 的块级元素。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/display",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("display")]),a("OutboundLink")],1),t._v(" 值为 "),a("code",[t._v("flow-root")]),t._v(" 的元素(flow-root：最新属性， 让DIV标签触发BFC，而没有其他任何副作用)。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("contain")]),a("OutboundLink")],1),t._v(" 值为 "),a("code",[t._v("layout")]),t._v("、"),a("code",[t._v("content")]),t._v(" 或 "),a("code",[t._v("paint")]),t._v(" 的元素。")]),t._v(" "),a("li",[t._v("弹性元素（"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/display",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("display")]),a("OutboundLink")],1),t._v(" 值为 "),a("code",[t._v("flex")]),t._v(" 或 "),a("code",[t._v("inline-flex")]),t._v(" 元素的直接子元素），如果它们本身既不是"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container",target:"_blank",rel:"noopener noreferrer"}},[t._v("弹性"),a("OutboundLink")],1),t._v("、"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Container",target:"_blank",rel:"noopener noreferrer"}},[t._v("网格"),a("OutboundLink")],1),t._v("也不是"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_table",target:"_blank",rel:"noopener noreferrer"}},[t._v("表格"),a("OutboundLink")],1),t._v("容器。")]),t._v(" "),a("li",[t._v("网格元素（"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/display",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("display")]),a("OutboundLink")],1),t._v(" 值为 "),a("code",[t._v("grid")]),t._v(" 或 "),a("code",[t._v("inline-grid")]),t._v(" 元素的直接子元素），如果它们本身既不是"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container",target:"_blank",rel:"noopener noreferrer"}},[t._v("弹性"),a("OutboundLink")],1),t._v("、"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Container",target:"_blank",rel:"noopener noreferrer"}},[t._v("网格"),a("OutboundLink")],1),t._v("也不是"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_table",target:"_blank",rel:"noopener noreferrer"}},[t._v("表格"),a("OutboundLink")],1),t._v("容器。")]),t._v(" "),a("li",[t._v("多列容器（"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("column-count")]),a("OutboundLink")],1),t._v(" 或 "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/column-width",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("column-width")]),a("OutboundLink")],1),t._v(" 值不为 "),a("code",[t._v("auto")]),t._v("，且含有 "),a("code",[t._v("column-count: 1")]),t._v(" 的元素）。")]),t._v(" "),a("li",[a("code",[t._v("column-span")]),t._v(" 值为 "),a("code",[t._v("all")]),t._v(" 的元素始终会创建一个新的格式化上下文，即使该元素没有包裹在一个多列容器中（"),a("a",{attrs:{href:"https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51",target:"_blank",rel:"noopener noreferrer"}},[t._v("规范变更"),a("OutboundLink")],1),t._v("、"),a("a",{attrs:{href:"https://bugs.chromium.org/p/chromium/issues/detail?id=709362",target:"_blank",rel:"noopener noreferrer"}},[t._v("Chrome bug"),a("OutboundLink")],1),t._v("）")])]),t._v(" "),t._m(15),t._v(" "),t._m(16),t._v(" "),a("p",[t._v("BFC 就是这样的东西（堆叠上下文也是）")]),t._v(" "),a("ol",[a("li",[t._v("它没有定义")]),t._v(" "),a("li",[t._v("它只有特性/功能\n"),a("ul",[a("li",[t._v("包含内部浮动")]),t._v(" "),a("li",[t._v("排除外部浮动")]),t._v(" "),a("li",[t._v("阻止"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing",target:"_blank",rel:"noopener noreferrer"}},[t._v("外边距重叠"),a("OutboundLink")],1)])])])]),t._v(" "),t._m(17),t._v(" "),a("p",[t._v("用 BFC 包住浮动元素。(可以达到清除浮动的效果，但是不是清除浮动，.clearfix 才是清除浮动）")]),t._v(" "),t._m(18),a("p",[t._v("还有：")]),t._v(" "),a("p",[t._v("BFC会包含所有的子元素， 如果子元素中有BFC，那么久只包含到这个子元素， 子元素BFC里面有子元素自己去管。（MDN）")]),t._v(" "),t._m(19),a("p",[t._v("效果：")]),t._v(" "),t._m(20),t._m(21),t._v(" "),a("p",[t._v("BFC会和浮动元素不产生任何交集，顺着浮动边缘形成自己的封闭上下文。BFC会自动填满除去浮动内容以外的剩余空间，这就是自适应布局。")]),t._v(" "),a("p",[t._v("用 float + div 做左右自适应布局")]),t._v(" "),t._m(22),t._m(23),t._v(" "),t._m(24),t._v(" "),t._m(25),t._m(26),t._v(" "),t._m(27)])},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#_1-关于-bfc-的描述"}},[t._v("1. 关于 BFC 的描述")]),a("ul",[a("li",[a("a",{attrs:{href:"#_1-1-css规范中对-bfc-的描述"}},[t._v("1.1 CSS规范中对 BFC 的描述")])]),a("li",[a("a",{attrs:{href:"#_1-2-mdn-对-bfc-的描述"}},[t._v("1.2 MDN 对 BFC 的描述")])]),a("li",[a("a",{attrs:{href:"#_1-3-张鑫旭对-bfc-的描述"}},[t._v("1.3 张鑫旭对 BFC 的描述")])])])]),a("li",[a("a",{attrs:{href:"#_2-触发-bfc-的条件"}},[t._v("2. 触发 BFC 的条件")])]),a("li",[a("a",{attrs:{href:"#_3-bfc-特性-功能"}},[t._v("3. BFC 特性/功能")]),a("ul",[a("li",[a("a",{attrs:{href:"#_3-1-功能1：-爸爸管儿子：父元素包住所有子元素"}},[t._v("3.1 功能1： 爸爸管儿子：父元素包住所有子元素")])]),a("li",[a("a",{attrs:{href:"#_3-2-功能2：-兄弟之间划清界限：两个bfc之间划清界限"}},[t._v("3.2 功能2： 兄弟之间划清界限：两个BFC之间划清界限")])]),a("li",[a("a",{attrs:{href:"#_3-3-功能三：-阻止margin合并"}},[t._v("3.3 功能三： 阻止margin合并")])])])]),a("li",[a("a",{attrs:{href:"#如何回答面试官"}},[t._v("如何回答面试官")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"七、bfc"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#七、bfc","aria-hidden":"true"}},[this._v("#")]),this._v(" 七、BFC")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_1-关于-bfc-的描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-关于-bfc-的描述","aria-hidden":"true"}},[this._v("#")]),this._v(" 1. 关于 BFC 的描述")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1-1-css规范中对-bfc-的描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-css规范中对-bfc-的描述","aria-hidden":"true"}},[this._v("#")]),this._v(" 1.1 CSS规范中对 BFC 的描述")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1-2-mdn-对-bfc-的描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-mdn-对-bfc-的描述","aria-hidden":"true"}},[this._v("#")]),this._v(" 1.2 MDN 对 BFC 的描述")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("块格式化上下文（Block Formatting Context，BFC）")]),this._v(" 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("创建了块格式化上下文的元素中的所有内容都会被包含到该BFC中。"),s("strong",[this._v("除了被包含于创建新的块级格式化上下文的后代元素内的元素。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1-3-张鑫旭对-bfc-的描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-张鑫旭对-bfc-的描述","aria-hidden":"true"}},[this._v("#")]),this._v(" 1.3 张鑫旭对 BFC 的描述")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_2-触发-bfc-的条件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-触发-bfc-的条件","aria-hidden":"true"}},[this._v("#")]),this._v(" 2. 触发 BFC 的条件")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("下列方式会创建"),s("strong",[this._v("块格式化上下文")]),this._v("：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",[a("li",[t._v("根元素，即HTML元素")]),t._v(" "),a("li",[t._v("浮动元素：float值为left、right")]),t._v(" "),a("li",[t._v("overflow值不为 visible，为 auto、scroll、hidden")]),t._v(" "),a("li",[t._v("display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid")]),t._v(" "),a("li",[t._v("position的值为absolute或fixed")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[this._v("文档的根元素（"),s("code",[this._v("<html>")]),this._v("）。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[this._v("表格单元格（"),s("code",[this._v("display")]),this._v(" 值为 "),s("code",[this._v("table-cell")]),this._v("，HTML 表格单元格默认值）。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[this._v("表格标题（"),s("code",[this._v("display")]),this._v(" 值为 "),s("code",[this._v("table-caption")]),this._v("，HTML 表格标题默认值）。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",[t._v("匿名表格单元格元素（"),a("code",[t._v("display")]),t._v(" 值为 "),a("code",[t._v("table")]),t._v("（HTML 表格默认值）、"),a("code",[t._v("table-row")]),t._v("（表格行默认值）、"),a("code",[t._v("table-row-group")]),t._v("（表格体默认值）、"),a("code",[t._v("table-header-group")]),t._v("（表格头部默认值）、"),a("code",[t._v("table-footer-group")]),t._v("（表格尾部默认值）或 "),a("code",[t._v("inline-table")]),t._v("）。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_3-bfc-特性-功能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-bfc-特性-功能","aria-hidden":"true"}},[this._v("#")]),this._v(" 3. BFC 特性/功能")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[this._v("我不知道什么是 BFC")]),this._v(" "),s("li",[this._v("但是你写出样式，我就知道这是不是 BFC")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_3-1-功能1：-爸爸管儿子：父元素包住所有子元素"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-功能1：-爸爸管儿子：父元素包住所有子元素","aria-hidden":"true"}},[this._v("#")]),this._v(" 3.1 功能1： 爸爸管儿子：父元素包住所有子元素")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token style language-css"}},[t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".dad")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("border")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 5px solid"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("overflow")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hidden"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".son")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("height")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 150px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("width")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 300px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("background")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" red"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("float")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" left"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dad"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("son"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- http://js.jirengu.com/xumij/1/edit --\x3e")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token style language-css"}},[t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".dad")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("border")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 5px solid"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("position")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" absolute"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".son")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("height")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 250px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("width")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 400px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("background")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" red"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("float")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" left"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("margin-top")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 50px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("height")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".grandson")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("height")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("width")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 200px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("margin-top")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("background")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" green"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dad"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("son"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("grandson"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("11"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- http://js.jirengu.com/xumij/3/edit --\x3e")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v("+-----------------------------------+\n|                              dad  |\n+---------------------------+       |\n||  son                     |       |\n|---------------------------+       |\n|-----------------------------------+\n+----------------------+\n|     grandson         |\n+----------------------+\n\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_3-2-功能2：-兄弟之间划清界限：两个bfc之间划清界限"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-功能2：-兄弟之间划清界限：两个bfc之间划清界限","aria-hidden":"true"}},[this._v("#")]),this._v(" 3.2 功能2： 兄弟之间划清界限：两个BFC之间划清界限")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token style language-css"}},[t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".one")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("border")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1px solid red"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("margin-right")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 20px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("width")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("height")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 300px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("float")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" left"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".two")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("border")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1px solid"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("height")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 300px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{attrs:{class:"token property"}},[t._v("overflow")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hidden"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("one"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("float 元素"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("two"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("BFC 元素"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- https://jsbin.com/quguqeq/2/edit?html,output --\x3e")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("这里想要在两个元素有间距，在BFC中加"),s("code",[this._v("margin-left")]),this._v("需要大于100px才会生效，要么在float元素中加"),s("code",[this._v("margin-right")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_3-3-功能三：-阻止margin合并"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-功能三：-阻止margin合并","aria-hidden":"true"}},[this._v("#")]),this._v(" 3.3 功能三： 阻止margin合并")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token style language-css"}},[t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".dad")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("outline")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 5px solid"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("overflow")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hidden"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token selector"}},[t._v(".son")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("height")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 150px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("border")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 5px solid red"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token property"}},[t._v("margin-top")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  ")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dad"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("son"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- https://jsbin.com/fayoqoj/1/edit?html,output --\x3e")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"如何回答面试官"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何回答面试官","aria-hidden":"true"}},[this._v("#")]),this._v(" 如何回答面试官")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[this._v("千万别解释什么是 BFC，一解释就错")]),this._v(" "),s("li",[this._v("用上面的例子回答什么是 BFC")])])}],!1,null,null,null);e.options.__file="007-BFC.md";s.default=e.exports}}]);