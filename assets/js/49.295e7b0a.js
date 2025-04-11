(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{222:function(e,s,o){e.exports=o.p+"assets/img/019-localStorage.eda1aa26.png"},520:function(e,s,o){"use strict";o.r(s);var t=[function(){var e=this.$createElement,s=this._self._c||e;return s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#_1-cookie和session"}},[this._v("1. cookie和session")])]),s("li",[s("a",{attrs:{href:"#_2-webstorage"}},[this._v("2. WebStorage")]),s("ul",[s("li",[s("a",{attrs:{href:"#_2-1-webstorage的优点"}},[this._v("2.1 WebStorage的优点")])]),s("li",[s("a",{attrs:{href:"#_2-2-cookie、localstorage、sessionstorage区别"}},[this._v("2.2 cookie、localStorage、sessionStorage区别")])])])]),s("li",[s("a",{attrs:{href:"#_3-参考资料"}},[this._v("3. 参考资料")])])])])},function(){var e=this.$createElement,s=this._self._c||e;return s("h1",{attrs:{id:"cookie、session、webstorage区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cookie、session、webstorage区别","aria-hidden":"true"}},[this._v("#")]),this._v(" cookie、session、WebStorage区别")])},function(){var e=this.$createElement,s=this._self._c||e;return s("h2",{attrs:{id:"_1-cookie和session"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-cookie和session","aria-hidden":"true"}},[this._v("#")]),this._v(" 1. cookie和session")])},function(){var e=this.$createElement,s=this._self._c||e;return s("h2",{attrs:{id:"_2-webstorage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-webstorage","aria-hidden":"true"}},[this._v("#")]),this._v(" 2. WebStorage")])},function(){var e=this.$createElement,s=this._self._c||e;return s("p",[s("img",{attrs:{src:o(222),alt:""}})])},function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("ul",[o("li",[o("p",[e._v("声明周期")]),e._v(" "),o("p",[e._v("localStorage:")]),e._v(" "),o("p",[e._v("生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。")]),e._v(" "),o("p",[e._v("sessionStorage：")]),e._v(" "),o("p",[e._v("生命周期是在仅在当前会话下有效。sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。")])]),e._v(" "),o("li",[o("p",[e._v("存储大小")]),e._v(" "),o("p",[e._v("localStorage和sessionStorage的存储数据大小一般都是：5MB")])]),e._v(" "),o("li",[o("p",[e._v("存储位置")]),e._v(" "),o("p",[e._v("localStorage和sessionStorage都保存在客户端，不与服务器进行交互通信。")])]),e._v(" "),o("li",[o("p",[e._v("存储内容类型")]),e._v(" "),o("p",[e._v("localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理")])]),e._v(" "),o("li",[o("p",[e._v("获取方式")]),e._v(" "),o("p",[e._v("localStorage：window.localStorage")]),e._v(" "),o("p",[e._v("sessionStorage：window.sessionStorage")])]),e._v(" "),o("li",[o("p",[e._v("应用场景")]),e._v(" "),o("p",[e._v("localStoragese：常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据")]),e._v(" "),o("p",[e._v("sessionStorage：敏感账号一次性登录")])])])},function(){var e=this.$createElement,s=this._self._c||e;return s("h3",{attrs:{id:"_2-1-webstorage的优点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-webstorage的优点","aria-hidden":"true"}},[this._v("#")]),this._v(" 2.1 WebStorage的优点")])},function(){var e=this.$createElement,s=this._self._c||e;return s("h3",{attrs:{id:"_2-2-cookie、localstorage、sessionstorage区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-cookie、localstorage、sessionstorage区别","aria-hidden":"true"}},[this._v("#")]),this._v(" 2.2 cookie、localStorage、sessionStorage区别")])},function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("table",[o("thead",[o("tr",[o("th",[e._v("特性")]),e._v(" "),o("th",[e._v("Cookie")]),e._v(" "),o("th",[e._v("localStorage")]),e._v(" "),o("th",[e._v("sessionStorage")])])]),e._v(" "),o("tbody",[o("tr",[o("td",[e._v("数据声明周期")]),e._v(" "),o("td",[e._v("一般都服务器生成，可设置失效时间。如果在浏览器端生成，默认是关闭浏览器后失效")]),e._v(" "),o("td",[e._v("除非被清除，否则永久保存")]),e._v(" "),o("td",[e._v("仅在当前会话有效，关闭页面或浏览器后被清除")])]),e._v(" "),o("tr",[o("td",[e._v("存放数据大小")]),e._v(" "),o("td",[e._v("4KB")]),e._v(" "),o("td",[e._v("一般5MB")]),e._v(" "),o("td",[e._v("一般5MB")])]),e._v(" "),o("tr",[o("td",[e._v("与服务器端通信")]),e._v(" "),o("td",[e._v("每次请求都会携带cookie，保存过多会带来性能问题")]),e._v(" "),o("td",[e._v("仅在浏览器端保存，不参与和服务器通信")]),e._v(" "),o("td",[e._v("同localStorage")])]),e._v(" "),o("tr",[o("td",[e._v("用途")]),e._v(" "),o("td",[e._v("一般由服务器端生成，用于标识用户身份，少量浏览器数据也可保存在cookie")]),e._v(" "),o("td",[e._v("用于浏览器端缓存数据")]),e._v(" "),o("td",[e._v("localStorage")])])])])},function(){var e=this.$createElement,s=this._self._c||e;return s("h2",{attrs:{id:"_3-参考资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-参考资料","aria-hidden":"true"}},[this._v("#")]),this._v(" 3. 参考资料")])}],_=o(0),i=Object(_.a)({},function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("div",{staticClass:"content"},[o("p"),e._m(0),e._v("\n[TOC]"),o("p"),e._v(" "),e._m(1),e._v(" "),o("p",[e._v("主要参考：https://www.cnblogs.com/zr123/p/8086525.html")]),e._v(" "),e._m(2),e._v(" "),o("p",[e._v("cookie和session都是用来跟踪浏览器用户身份的会话方式。")]),e._v(" "),o("p",[e._v("区别：")]),e._v(" "),o("p",[e._v("1、保持状态：cookie保存在浏览器端，session保存在服务器端")]),e._v(" "),o("p",[e._v("2、使用方式：")]),e._v(" "),o("p",[e._v("（1）cookie机制：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失。")]),e._v(" "),o("p",[e._v("​     Cookie是服务器发给客户端的特殊信息，cookie是以文本的方式保存在客户端，每次请求时都带上它")]),e._v(" "),o("p",[e._v("（2）session机制：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含sessionid。如果有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的session对象，并把sessionid在本次响应中返回给客户端。通常使用cookie方式存储sessionid到客户端，在交互中浏览器按照规则将sessionid发送给服务器。如果用户禁用cookie，则要使用URL重写，可以通过response.encodeURL(url) 进行实现；API对encodeURL的结束为，当浏览器支持Cookie时，url不做任何处理；当浏览器不支持Cookie的时候，将会重写URL将SessionID拼接到访问地址后。")]),e._v(" "),o("p",[e._v("3、存储内容：cookie只能保存字符串类型，以文本的方式；session通过类似与Hashtable的数据结构来保存，能支持任何类型的对象(session中可含有多个对象)")]),e._v(" "),o("p",[e._v("4、存储的大小：cookie：单个cookie保存的数据不能超过4kb；session大小没有限制。")]),e._v(" "),o("p",[e._v("5、安全性：cookie：针对cookie所存在的攻击：Cookie欺骗，Cookie截获；session的安全性大于cookie。")]),e._v(" "),o("p",[e._v("原因如下：（1）sessionID存储在cookie中，若要攻破session首先要攻破cookie；")]),e._v(" "),o("p",[e._v("（2）sessionID是要有人登录，或者启动session_start才会有，所以攻破cookie也不一定能得到sessionID；")]),e._v(" "),o("p",[e._v("（3）第二次启动session_start后，前一次的sessionID就是失效了，session过期后，sessionID也随之失效。")]),e._v(" "),o("p",[e._v("（4）sessionID是加密的")]),e._v(" "),o("p",[e._v("（5）综上所述，攻击者必须在短时间内攻破加密的sessionID，这很难。")]),e._v(" "),o("p",[e._v("6、应用场景：")]),e._v(" "),o("p",[e._v("cookie：")]),e._v(" "),o("p",[e._v("（1）判断用户是否登陆过网站，以便下次登录时能够实现自动登录（或者记住密码）。如果我们删除cookie，则每次登录必须从新填写登录的相关信息。")]),e._v(" "),o("p",[e._v("（2）保存上次登录的时间等信息。")]),e._v(" "),o("p",[e._v("（3）保存上次查看的页面")]),e._v(" "),o("p",[e._v("（4）浏览计数")]),e._v(" "),o("p",[e._v("session：")]),e._v(" "),o("p",[e._v("Session用于保存每个用户的专用信息，变量的值保存在服务器端，通过SessionID来区分不同的客户。")]),e._v(" "),o("p",[e._v("（1）网上商城中的购物车")]),e._v(" "),o("p",[e._v("（2）保存用户登录信息")]),e._v(" "),o("p",[e._v("（3）将某些数据放入session中，供同一用户的不同页面使用")]),e._v(" "),o("p",[e._v("（4）防止用户非法登录")]),e._v(" "),o("p",[e._v("7、缺点：")]),e._v(" "),o("p",[e._v("cookie：")]),e._v(" "),o("p",[e._v("（1）大小受限")]),e._v(" "),o("p",[e._v("（2）用户可以操作（禁用）cookie，使功能受限")]),e._v(" "),o("p",[e._v("（3）安全性较低")]),e._v(" "),o("p",[e._v("（4）有些状态不可能保存在客户端。")]),e._v(" "),o("p",[e._v("（5）每次访问都要传送cookie给服务器，浪费带宽。")]),e._v(" "),o("p",[e._v("（6）cookie数据有路径（path）的概念，可以限制cookie只属于某个路径下。")]),e._v(" "),o("p",[e._v("session：")]),e._v(" "),o("p",[e._v("（1）Session保存的东西越多，就越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大。")]),e._v(" "),o("p",[e._v("（2）依赖于cookie（sessionID保存在cookie），如果禁用cookie，则要使用URL重写，不安全")]),e._v(" "),o("p",[e._v("（3）创建Session变量有很大的随意性，可随时调用，不需要开发者做精确地处理，所以，过度使用session变量将会导致代码不可读而且不好维护。")]),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),o("p",[e._v("WebStorage的目的是克服由cookie所带来的一些限制，当数据需要被严格控制在客户端时，不需要持续的将数据发回服务器。")]),e._v(" "),o("p",[e._v("WebStorage两个主要目标：（1）提供一种在cookie之外存储会话数据的路径。（2）提供一种存储大量可以跨会话存在的数据的机制。")]),e._v(" "),o("p",[e._v("HTML5的WebStorage提供了两种API：localStorage（本地存储）和sessionStorage（会话存储）。")]),e._v(" "),e._m(5),e._v(" "),e._m(6),e._v(" "),o("p",[e._v("（1）存储空间更大：cookie为4KB，而WebStorage是5MB；")]),e._v(" "),o("p",[e._v("（2）节省网络流量：WebStorage不会传送到服务器，存储在本地的数据可以直接获取，也不会像cookie一样美词请求都会传送到服务器，所以减少了客户端和服务器端的交互，节省了网络流量；")]),e._v(" "),o("p",[e._v("（3）对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage会非常方便；")]),e._v(" "),o("p",[e._v("（4）快速显示：有的数据存储在WebStorage上，再加上浏览器本身的缓存。获取数据时可以从本地获取会比从服务器端获取快得多，所以速度更快；")]),e._v(" "),o("p",[e._v("（5）安全性：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说比较高一些，不会担心截获，但是仍然存在伪造问题；")]),e._v(" "),o("p",[e._v("（6）WebStorage提供了一些方法，数据操作比cookie方便；")]),e._v(" "),o("p",[e._v("setItem (key, value) ——  保存数据，以键值对的方式储存信息。")]),e._v(" "),o("p",[e._v("​      　　 getItem (key) ——  获取数据，将键值传入，即可获取到对应的value值。")]),e._v(" "),o("p",[e._v("​        　　removeItem (key) ——  删除单个数据，根据键值移除对应的信息。")]),e._v(" "),o("p",[e._v("​        　　clear () ——  删除所有的数据")]),e._v(" "),o("p",[e._v("​        　　key (index) —— 获取某个索引的key")]),e._v(" "),e._m(7),e._v(" "),e._m(8),e._v(" "),o("p",[e._v("相同点：")]),e._v(" "),o("p",[e._v("三者都可以被用来浏览器端存储数据，而且都是字符串类型的键值对。")]),e._v(" "),e._m(9),e._v(" "),o("p",[e._v("https://segmentfault.com/a/1190000015804205")]),e._v(" "),o("p",[e._v("https://www.cnblogs.com/zr123/p/8086525.html")]),e._v(" "),o("p",[e._v("https://www.cnblogs.com/cencenyue/p/7604651.html")]),e._v(" "),o("p",[e._v("https://blog.csdn.net/qq_35585701/article/details/81393361")]),e._v(" "),o("p",[e._v("https://www.cnblogs.com/dolphinX/p/3348469.html")]),e._v(" "),o("p",[o("a",{attrs:{href:"https://blog.csdn.net/qq_35585701/article/details/81393361",target:"_blank",rel:"noopener noreferrer"}},[e._v("理解cookie、session、localStorage、sessionStorage之不同"),o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("https://zhidao.baidu.com/question/1887680473119326828.html")])])},t,!1,null,null,null);i.options.__file="101-cookie、session、WebStorage区别.md";s.default=i.exports}}]);