(window.webpackJsonp=window.webpackJsonp||[]).push([[142],{602:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("p"),t._m(0),a("p"),t._v(" "),a("p",[t._v("[TOC]")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._m(10),t._v(" "),t._m(11),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._m(15),t._v(" "),t._m(16),t._v(" "),t._m(17),a("p",[t._v("参考资料：https://blog.csdn.net/abxn2002/article/details/50887594")]),t._v(" "),t._m(18),t._v(" "),a("p",[t._v("页面中下载一个附件，在其他浏览器都是正常下载，在IE11浏览器里面则是打开了一个新标签页后，显示乱码，经过在网络上查找资料：")]),t._v(" "),t._m(19),t._v(" "),a("p",[t._v("因此需要后端设置正确的文件类型，IE浏览器才能正确处理下载的文件，以tomcat服务为例：")]),t._v(" "),t._m(20),a("p",[t._v("问过后端同事：后端代码需要指定一个响应http头，将contentType设置为正确的文件类型。")]),t._v(" "),t._m(21),t._v(" "),a("p",[t._v("在使用原生JS代码嵌入到html中执行时，部分ES6以上的语法会报错，比如：")]),t._v(" "),t._m(22),t._v(" "),a("p",[t._v("上面的操作符在旧版本的浏览器中不支持导致JS报错")]),t._v(" "),t._m(23),t._v(" "),a("p",[t._v("页面顶部是查询条件，下面是内嵌的iframe页面，点击查询按钮会把查询条件拼接到链接中然后更新iframe的src链接， 但是当查询条件没有修改的时候，链接没有改版，当更新iframe的src链接后，iframe页面的内容不会更新。")]),t._v(" "),a("p",[t._v("解决方法：链接中加一个无意义的参数，每次点击查询按钮的时候，都会改变这个参数，这样src 的链接每次都不一样，就会请求新的数据了，这个随时改变的参数一般是时间戳(到毫秒)：")]),t._v(" "),t._m(24),t._m(25),t._v(" "),t._m(26),t._v(" "),a("p",[t._v("双冒号"),a("a",{attrs:{href:"https://so.csdn.net/so/search?q=%E8%BF%90%E7%AE%97%E7%AC%A6&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"}},[t._v("运算符"),a("OutboundLink")],1),t._v("::是 ES7 中提出的函数绑定运算符，用来取代call()、apply()、bind()调用。")]),t._v(" "),a("p",[t._v("双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。")]),t._v(" "),t._m(27),a("p",[t._v("如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。")]),t._v(" "),t._m(28),a("p",[t._v("在react中应用")]),t._v(" "),t._m(29),a("p",[t._v("onChange={::this.handleChange} 等价于 onChange={this::this.handleChange} 即 onChange={this.handleChange.bind(this)}")]),t._v(" "),a("p",[t._v("转载自：https://blog.csdn.net/Misnice/article/details/137245923")])])},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#_1-atob、base64加密中文乱码"}},[t._v("1. atob、base64加密中文乱码")]),a("ul",[a("li",[a("a",{attrs:{href:"#_1-1-报错原因"}},[t._v("1.1 报错原因")])]),a("li",[a("a",{attrs:{href:"#_1-2-通过-encodeuricomponent-和-decodeuricomponent-转义中文字符"}},[t._v("1.2 通过 encodeURIComponent 和 decodeURIComponent 转义中文字符")])]),a("li",[a("a",{attrs:{href:"#_1-3-github-api-获取-readme-的中文乱码问题"}},[t._v("1.3 GitHub API 获取 README 的中文乱码问题")])])])]),a("li",[a("a",{attrs:{href:"#_2-ie11浏览器文件下载乱码"}},[t._v("2. IE11浏览器文件下载乱码")])]),a("li",[a("a",{attrs:{href:"#_3-未编译的es6语法在部分旧版本浏览器中不支持导致报错"}},[t._v("3. 未编译的ES6语法在部分旧版本浏览器中不支持导致报错")])]),a("li",[a("a",{attrs:{href:"#_4-页面中js设置iframe的src不变，导致iframe不刷新内容"}},[t._v("4. 页面中JS设置iframe的src不变，导致iframe不刷新内容")])]),a("li",[a("a",{attrs:{href:"#_5-js新语法"}},[t._v("5. JS新语法")]),a("ul",[a("li",[a("a",{attrs:{href:"#_5-1-js-双冒号运算符（-）"}},[t._v("5.1 js 双冒号运算符（::）")])])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"js常见问题解决"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js常见问题解决","aria-hidden":"true"}},[this._v("#")]),this._v(" JS常见问题解决")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_1-atob、base64加密中文乱码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-atob、base64加密中文乱码","aria-hidden":"true"}},[this._v("#")]),this._v(" 1. atob、base64加密中文乱码")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("前端在把数据进行 base64 编码加密时，一般是通过"),s("code",[this._v("window.btoa()")]),this._v("方法对数据编码，使用"),s("code",[this._v("window.atob()")]),this._v("进行解码。这种方法存在的问题。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1-1-报错原因"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-报错原因","aria-hidden":"true"}},[this._v("#")]),this._v(" 1.1 报错原因")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("window.btoa()")]),this._v(" 不支持中文，仅支持 ASCII 编码。在浏Chrome览器终端对中文进行编码，会发现报错：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("window.btoa"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'中文'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nUncaught DOMException: Failed to execute "),a("span",{attrs:{class:"token string"}},[t._v("'btoa'")]),t._v(" on "),a("span",{attrs:{class:"token string"}},[t._v("'Window'")]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" The string to be encoded contains characters outside of the Latin1 range.\n    at "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("anonymous"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(":1:8\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("window.atob()")]),this._v("转换含有中文的 base64编码的时候中文部分会变为乱码。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在bash终端获取"),s("code",[this._v("中文")]),this._v("两个字的  base64 编码：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("~ "),a("span",{attrs:{class:"token keyword"}},[t._v("echo")]),t._v(" 中文 "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v(" base64\n5Lit5paHCg"),a("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v("         "),a("span",{attrs:{class:"token comment"}},[t._v("# 解码：echo 5Lit5paHCg== | base64 -D")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在浏Chrome览器终端通过"),s("code",[this._v("window.atob()")]),this._v("对其进行解码，可以发现是乱码：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("atob")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'5Lit5paHCg=='")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v('// "ä¸­æ\\n"')]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1-2-通过-encodeuricomponent-和-decodeuricomponent-转义中文字符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-通过-encodeuricomponent-和-decodeuricomponent-转义中文字符","aria-hidden":"true"}},[this._v("#")]),this._v(" 1.2 通过 encodeURIComponent 和 decodeURIComponent 转义中文字符")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("由于"),a("code",[t._v("btoa")]),t._v(" 方法仅支持 ASCII 编码，所以我们可以先将中文转为ASCII字符，然后在使用"),a("code",[t._v("btoa")]),t._v(" 进行编码。我们可以通过"),a("code",[t._v("encodeURIComponent")]),t._v(" 和 "),a("code",[t._v("decodeURIComponent")]),t._v(" 这两个方法：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// 编码 ")]),t._v("\nwindow"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("btoa")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("encodeURIComponent")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'中文'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),a("span",{attrs:{class:"token comment"}},[t._v('// "JUU0JUI4JUFEJUU2JTk2JTg3"')]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 解码")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("decodeURIComponent")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("atob")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'JUU0JUI4JUFEJUU2JTk2JTg3'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v('// "中文"')]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1-3-github-api-获取-readme-的中文乱码问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-github-api-获取-readme-的中文乱码问题","aria-hidden":"true"}},[this._v("#")]),this._v(" 1.3 GitHub API 获取 README 的中文乱码问题")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("通过"),s("code",[this._v("encodeURIComponent")]),this._v(" 、"),s("code",[this._v("decodeURIComponent")]),this._v(" 的方式解码 github 的 readme 数据的时候仍旧是乱码, 经过查找相关资料发现了Base64的编码与解码转的最优方案是下面这种:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("utf8_to_b64")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("btoa")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("unescape")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("encodeURIComponent")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("b64_to_utf8")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("decodeURIComponent")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("escape")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("atob")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// Usage:")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("utf8_to_b64")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'✓ à la mode'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// JTI1dTI3MTMlMjUyMCUyNUUwJTI1MjBsYSUyNTIwbW9kZQ==")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("b64_to_utf8")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'JTI1dTI3MTMlMjUyMCUyNUUwJTI1MjBsYSUyNTIwbW9kZQ=='")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v('// "✓ à la mode"')]),t._v("\n\n"),a("span",{attrs:{class:"token function"}},[t._v("utf8_to_b64")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'I \\u2661 Unicode!'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// SSUyNTIwJTI1dTI2NjElMjUyMFVuaWNvZGUlMjUyMQ==")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("b64_to_utf8")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'SSUyNTIwJTI1dTI2NjElMjUyMFVuaWNvZGUlMjUyMQ=='")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v('// "I ♡ Unicode!"')]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_2-ie11浏览器文件下载乱码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-ie11浏览器文件下载乱码","aria-hidden":"true"}},[this._v("#")]),this._v(" 2. IE11浏览器文件下载乱码")])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("https://blog.csdn.net/itmyhome1990/article/details/103032316")]),this._v(" "),s("p",[this._v("浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理URL，因此Web服务器在响应头中添加正确的MIME类型非常重要。如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-mapping")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("extension")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("docx"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("extension")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-type")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("application/vnd.openxmlformats-officedocument.wordprocessingml.document"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-type")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-mapping")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_3-未编译的es6语法在部分旧版本浏览器中不支持导致报错"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-未编译的es6语法在部分旧版本浏览器中不支持导致报错","aria-hidden":"true"}},[this._v("#")]),this._v(" 3. 未编译的ES6语法在部分旧版本浏览器中不支持导致报错")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("ES2020新增的操作符"),s("code",[this._v("?.")]),this._v("、"),s("code",[this._v("??")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_4-页面中js设置iframe的src不变，导致iframe不刷新内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-页面中js设置iframe的src不变，导致iframe不刷新内容","aria-hidden":"true"}},[this._v("#")]),this._v(" 4. 页面中JS设置iframe的src不变，导致iframe不刷新内容")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" time2 "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Date")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("getTime")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 1646379926674,精确到毫秒")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" time3 "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Date")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("valueOf")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 1646379926674.精确到毫秒")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" time4 "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" Date"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("now")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 1646379926674,精确到毫秒，实际上是new Date().getTime()")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"_5-js新语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-js新语法","aria-hidden":"true"}},[this._v("#")]),this._v(" 5. JS新语法")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_5-1-js-双冒号运算符（-）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-js-双冒号运算符（-）","aria-hidden":"true"}},[this._v("#")]),this._v(" 5.1 js 双冒号运算符（::）")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("foo"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("bar"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 等同于")]),t._v("\nbar"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("bind")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("foo"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nfoo"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{attrs:{class:"token function"}},[t._v("bar")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("arguments"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 等同于")]),t._v("\nbar"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("apply")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("foo"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" arguments"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" method "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" obj"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("obj"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("foo"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 等同于")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" method "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("obj"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("foo"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" log "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("console"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 等同于")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" log "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" console"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("bind")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("console"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-react extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v("<div onChange={::this.handleChange}></div>\n")])])])}],!1,null,null,null);e.options.__file="015-JS常见问题解决.md";s.default=e.exports}}]);