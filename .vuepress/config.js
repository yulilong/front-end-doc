/**
 * 码云的配置文件，主要是设置：base: '/front-end-doc/',
 */
const path = require("path");

module.exports = {
  // 如果github Pages绑定域名，则需要把base删除，否则域名访问会失败
  // base: '/front-end-doc/',     // 仓库名字,用于github Pages 部署,
  title: "前端知识",
  description: "一个总结前端知识的文档网站",
  head: [
    ["link", { rel: "icon", href: "/logo.png" }], // 添加网站的icon图标
    // add jquery and fancybox async添加异步执行
    ["script", { defer: "defer", src: "/static/jquery.slim.min.js" }],
    ["script", { defer: "defer", src: "/static/jquery.fancybox.min.js" }],
    [
      "link",
      {
        defer: "defer",
        rel: "stylesheet",
        type: "text/css",
        href: "/static/jquery.fancybox.min.css",
      },
    ],
  ],
  // 设置本地开发端口号
  port: 4000,
  configureWebpack: {
    resolve: {
      // 设置路径别名，用于引入图片地址时，使用别名表示路径
      alias: {
        "@img": path.join(__dirname, "../assets/img"),
      },
    },
  },
  themeConfig: {
    // 如果有新内容，则显示刷新按钮刷新页面
    serviceWorker: {
      updatePopup: true, // Boolean | Object, 默认值是 undefined.
    },
    // 在导航最右边显示github链接
    repo: "https://github.com/yulilong/front-end-doc",
    // 编辑此页功能打开
    editLinks: true,
    // 启用最后更新时间
    lastUpdated: "Last Updated",
    logo: "/logo.png",
    // 设置使用Algolia 搜索
    algolia: {
      apiKey: "eb7ed07c4a067ac8d5276f84faed7c97",
      indexName: "yulilong",
    },
    // 导航栏设置
    nav: [
      // 根路径
      // { text: 'Home', link: '/' },
      { text: "目录", link: "/catalog" },
      { text: "ES6", link: "/doc/es6/" },
      {
        text: "javascript",
        items: [
          { text: "js", link: "/doc/js/" },
          { text: "js标准库", link: "/doc/js/standardLibrary/" },
          { text: "dom操作文档", link: "/doc/dom/" },
          { text: "设计模式", link: "/doc/designPattern/" },
        ],
      },
      { text: "浏览器", link: "/doc/browserNetwork/", },
      { text: "CSS", link: "/doc/css/", },
      { text: "react", link: "/doc/react/" },
      { text: "vue", link: "/doc/vue/" },
      { text: "TypeScript", link: "/doc/typeScript/" },
      {
        text: "其他",
        items: [
          { text: "html", link: "/doc/html/" },
          { text: "node", link: "/doc/node/" },
          { text: "工具", link: "/doc/tool/" },
          { text: "echarts", link: "/doc/tool/echarts/" },
          { text: "常见问题", link: "/doc/problem/" },
        ],
      },
    ],
    // 侧边栏标题显示的层数, 0:禁用标题（headers）链接， 1：提取到 h2 的标题， 2： 同时提取 h2 和 h3 标题
    sidebarDepth: 1,
    // 侧边栏设置
    // sidebar: sidebarConfig,
    sidebar: {
      // 目录
      "/catalog": ["catalog"],
      // js标准库
      "/doc/js/standardLibrary/": [
        // 如果只是想显示这个页面的名字，那么可以在md文件的顶部写如下代码：
        // ---
        // sidebarDepth: 0
        // ---

        // 侧边栏显示的标题跟md中的标题不一致使用如下方式
        // ["006-1函数柯里化", "函数柯里化"],

        "",
        "001-math",
        "002-array",
        "003-object",
        "004-attributes",
        "005-String对象",
        "006-Number对象",
        "007-Date对象",
        "008-JSON对象",
        "009-RegExp对象",
        "010-Error错误对象",
      ],
      // ES6
      "/doc/es6/": [
        // '',
        "001-ES6新特性列表",
        '001-import-export',
        "002-数组新增方法",
        "003-asyncawait函数说明",
        "004-ES6的类",
        "005-迭代器和for···of",
        "006-生成器函数Generator",
        "007-Proxy代理JS操作",
        "008-Reflect反射",
        "009-Symbol",
        "010-Set和WeakSet",
        "011-Map和WeakMap",
        "012-Promise",
        "013-手写Promise",
        "014-Decorator装饰器",
        "015-对象的新增方法",
        "016-Number-Math和数值的扩展",
      ],
      // javascript
      "/doc/js/": [
        "",
        "001-对象原型继承",
        "002-this_call_apply_bind",
        "003-数据类型转换",
        "004-跨域",
        "005-Ajax",
        "007-作用域-执行环境",
        "008-排序算法",
        "009-获取标签宽高及实例",
        "013-JS数字计算精度和显示",
        "014-Web-Worker使用教程",
        "015-JS常见问题解决",
        {
          title: "JS效果-代码片段",
          collapsable: false,
          children: [
            // "01-js-example/",
            "01-js-example/01-常用的代码片段",
            "01-js-example/02-示例1",
          ],
        },
        {
          title: "函数",
          collapsable: false, // 让一个组永远都是展开状态
          children: [
            "006-函数",
            // 侧边栏显示的标题跟md中的标题不一致使用如下方式
            ["006-1函数柯里化", "函数柯里化"],
          ],
        },
        {
          title: "JS代码执行机制和事件循环",
          // collapsable: false,
          children: [
            // 'jsHowWork/',
            "jsHowWork/JS在浏览器中运行机制和事件循环",
            "jsHowWork/JS代码在nodejs环境下执行机制和事件循环",
            "jsHowWork/JS中异步方法",
            "jsHowWork/EventLoop和浏览器渲染-帧动画-空闲回调的关系",
          ],
        },
        {
          title: "高级",
          // collapsable: false,
          children: [
            "advanced/002-错误处理try_catch",
            "advanced/004-轮播代码实现",
            "advanced/006-手机端页面开发",
            "advanced/007-SEO搜索引擎优化",
            "advanced/008-前端数据模拟Mock",
            "advanced/009-JS中的垃圾回收和内存泄露",
            "advanced/010-moment时间插件使用说明",
            "advanced/011-react项目搭建",
            "advanced/012-vue项目搭建",
          ],
        },
        {
          title: "文章",
          collapsable: false,
          children: [
            "blog/001-JS常用的60余种工具方法",
            "blog/002-js数据类型判断",
            "blog/003-js开启摄像头照相人脸识别",
            "blog/004-浏览器控制台反调试",
            "blog/006-JS调用iframe中页面dom",
          ],
        },
      ],

      "/doc/dom/": [
        "",
        "001-节点的类型",
        "002-节点的关系",
        "003-节点的操作",
        "004-动态集合NodeLIst-HTMLCollection",
        "005-Element",
        "006-Node",
        "007-Element对象",
        "008-document对象",
        "009-事件模型",
        "010-事件种类",
      ],

      // 浏览器、网络相关
      "/doc/browserNetwork/": [
        // "",
        {
          title: "浏览器相关",
          collapsable: false, // 让一个组永远都是展开状态
          children: [
            "001-URL相关操作",
            "002-从输入URL到页面渲染过程",
            "003-Web前端性能优化",
            "004-浏览器渲染过程",
            "005-浏览器间差异",
            "006-常见浏览器兼容问题解决汇总",
            "006-工作遇到的浏览器兼容问题",
            "007-移动H5首屏秒开优化方案",
            "008-CSRF攻击",
            "009-XSS攻击",
            "010-WebSocket介绍",
          ],
        },
        {
          title: "浏览器存储",
          collapsable: false, // 让一个组永远都是展开状态
          children: [
            "100-浏览器缓存",
            "101-cookie、session、WebStorage区别",
            "102-cookie使用介绍",
            "103-storage接口",
          ],
        },
        {
          title: "网络相关",
          collapsable: false, // 让一个组永远都是展开状态
          children: [
            "900-http发展史",
            "901-http报文和请求数据大小",
            "902-http方法和状态码",
            "903-一篇文章带你详解HTTP协议",
            "904-一篇文章带你熟悉TCP-IP协议",
            "905-HTTPS是如何保证安全的",
          ],
        },
      ],

      "/doc/designPattern/": [""],

      "/doc/css/": [
        // '',
        "001-选择器",
        "002-transition-transform",
        "002-animation",
        "003-定位",
        "004-css兼容性",
        "005-normalize-reset",
        "006-css常用简单效果样式",
        "007-css复杂效果示例",
        "008-margin外边距合并",
        "009-float浮动",
        "010-css常用属性",
        "011-css的值和单位",
        "012-css中min-max-clamp使用",
        "013-css常见问题",
        "014-块-行内-行内快元素",
        {
          title: "css深入浅出",
          collapsable: false,
          children: [
            "depth/001-宽度与高度",
            "depth/002-堆叠上下文",
            "depth/003-icon全解",
            "depth/004-移动端页面(响应式)",
            "depth/005-Flex布局",
            "depth/006-布局套路",
            "depth/007-BFC",
          ],
        },
        {
          title: "CSS3",
          collapsable: false,
          children: ["css3/001-css3新属性介绍", "css3/002-css3-media查询"],
        },
        {
          title: "less",
          collapsable: false,
          children: ["less/001-less代码片段"],
        },
        {
          title: "scss",
          collapsable: false,
          children: ["scss/001-scss语法说明"],
        },
        {
          title: "CSS文章",
          collapsable: false,
          children: [
            "blog/001-7个关于background-image好用技巧",
            "blog/002-隐藏元素opacity-visibility-display对比",
            "blog/003-css关键字initial-inherit-unset区别",
            "blog/004-Bootstrap响应式",
          ],
        },
      ],

      "/doc/html/": [
        "001-HTML5特性说明",
        "002-HTML字符实体",
        "003-html常用标签说明",
      ],

      "/doc/react/": [
        "",
        "001-react编程规范",
        "002-react使用手册",
        "003-react代码片段",
        "004-react高阶组件",
        "005-react开发遇到的问题",
        "005-react中eslint代码检查常见问题解决",
        "006-react平时注意的规范",
        "007-react生命周期",
        "008-react类型检查PropTypes",
        "009-react-Hook",
        "009-hooks",
        "010-diff算法和性能优化",
        "011-react-Virtual-Dom",
        "012-react-fiber",
        "013-react-dnd拖动组件",
        "014-react-refs引用dom",
        "015-react的setState说明",
        "016-react中使用echarts",
        "017-render-props",
        "018-react父子组件执行顺序",
        "019-react类组件和函数组件区别",
      ],

      "/doc/vue/": [
        "001-vue遇到的问题",
        "002-vue常用语法",
        "003-vue教程",
        "004-vue生命周期",
        "005-vue指令",
        "006-vue-scoped-css",
        "007-vue访问根父子组件-依赖注入",
        "008-vue知识点思维导图",
        "009-vuex使用文档",
        "010-vue-cli使用文档",
        "011-router使用相关",
        "012-一个vue组件代码写法",
        "013-vue的diff算法详解",
        {
          title: "VUE3",
          collapsable: false, // 让一个组永远都是展开状态
          children: [
            ['vue3/', '简介'],
            'vue3/001-vue3开发遇到的问题',
            'vue3/002-vue3核心语法',
            'vue3/003-vue3其他API和新组件',
            'vue3/004-vue3生命周期',
            'vue3/005-vue3组件通信',
            'vue3/006-vue3事件',
            'vue3/007-vue3常用语法',
            'vue3/009-vue3单文件CSS',
            'vue3/019-vue-router4.x',
            'vue3/020-pinia状态管理',
            'vue3/099-vite',
            'vue3/100-新建vue3项目及相关问题',
            'vue3/101-vite关于低版本浏览器的支持',
          ],
        },
      ],
      // TypeScript部分文档
      "/doc/typeScript/": [
        "001-在react中使用TypeScript",
        "002-typescript部分语法说明",
        "020-TS中常见问题解决",
      ],

      "/doc/node/": [
        "001-express-api总结",
        "002-node中require引用缓存解决",
        "003-CommonJS规范",
        "004-AMD规范",
        "005-node环境常见问题",
        "006-前端http-server开启本地https服务",
        "007-node版本管理n包使用",
      ],
      "/doc/tool/echarts/": [
        ['', '简介'],
        "001-饼图-pie1",
        "002-折线图-line1",
        "003-柱状图-bar1",
      ],
      "/doc/tool/": [
        // {
        //   title: "echarts图表",
        //   collapsable: false, // 让一个组永远都是展开状态
        //   children: [
        //     ['echarts/', '简介'],
        //     "echarts/001-饼图-pie1",
        //   ],
        // },
        {
          title: "webpack教程",
          collapsable: false,
          children: [
            "001-webpack教程",
            "002-webpack-require.context",
            "003-webpack常见问题解决",
          ],
        },
        "004-prettier代码格式化工具",
        "005-Moment日期处理类库",
      ],
      
      // 常见问题
      "/doc/problem/": [
        "001-antd组件在react遇到的问题",
      ],
    },
  },
};
