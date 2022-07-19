/**
 * 码云的配置文件，主要是设置：base: '/front-end-doc/',
 */
const path = require('path');

module.exports = {
    // 如果github Pages绑定域名，则需要把base删除，否则域名访问会失败
    // base: '/front-end-doc/',     // 仓库名字,用于github Pages 部署,
    title: '前端知识',
    description: '一个总结前端知识的文档网站',
    head: [
        ["link", { rel: "icon", href: "/logo.png" }],   // 添加网站的icon图标
        // add jquery and fancybox async添加异步执行
        ['script', { defer: 'defer', src: '/static/jquery.slim.min.js' }],
        ['script', { defer: 'defer', src: '/static/jquery.fancybox.min.js' }],
        ['link', { defer: 'defer', rel: 'stylesheet', type: 'text/css', href: '/static/jquery.fancybox.min.css' }]
    ],
    // 设置本地开发端口号
    port: 4000,
    configureWebpack: {
        resolve: {
            // 设置路径别名，用于引入图片地址时，使用别名表示路径
            alias: {
                '@img': path.join(__dirname, '../assets/img'),
            }
        }
    },
    themeConfig: {
        // 如果有新内容，则显示刷新按钮刷新页面
        serviceWorker: {
            updatePopup: true // Boolean | Object, 默认值是 undefined.
        },
        // 在导航最右边显示github链接
        repo: 'https://github.com/yulilong/front-end-doc',
        // 编辑此页功能打开
        editLinks: true,
        // 启用最后更新时间
        lastUpdated: 'Last Updated',
        logo: '/logo.png',
        // 设置使用Algolia 搜索
        algolia: {
            apiKey: 'eb7ed07c4a067ac8d5276f84faed7c97',
            indexName: 'yulilong'
        },
        // 导航栏设置
        nav: [
            // 根路径
            // { text: 'Home', link: '/' },
            { text: '目录', link: '/catalog' },
            { text: 'ES6', link: '/doc/es6/' },
            {
                text: 'javascript', 
                items: [
                    { text: 'js', link: '/doc/js/' },
                    { text: 'js标准库', link: '/doc/js/standardLibrary/' },
                    { text: 'dom操作文档', link: '/doc/dom/' },
                    { text: '浏览器、网络', link: '/doc/browserNetwork/' },
                    { text: '设计模式', link: '/doc/designPattern/' },
                ],
            },
            {
                text: 'CSS',
                link: '/doc/css/'
            },
            { text: 'html', link: '/doc/html/' },
            { text: 'react', link: '/doc/react/' },
            { text: 'vue', link: '/doc/vue/' },
            { text: 'node', link: '/doc/node/' },
            { text: '工具', link: '/doc/tool/' },
        ],
        // 侧边栏标题显示的层数, 0:禁用标题（headers）链接， 1：提取到 h2 的标题， 2： 同时提取 h2 和 h3 标题
        sidebarDepth: 2,
        // 侧边栏设置
        // sidebar: sidebarConfig,
        sidebar: {
            // 目录
            '/catalog': [
              'catalog',
            ],
            '/doc/js/standardLibrary/': [
                '',
                '001-math',
                '002-array',
                '003-object',
                '004-attributes',
                '005-String对象',
                '006-Number对象',
                '007-Date对象',
                '008-JSON对象',
                '009-RegExp对象',
            ],
            '/doc/es6/': [
                // '',
                '001-ES6新特性列表',
                '002-数组新增方法',
                '003-asyncawait函数说明',
                '004-ES6的类',
                '005-迭代器和for···of',
                '006-生成器函数Generator',
                '007-Proxy代理JS操作',
                '008-Reflect反射',
                '009-Symbol',
                '010-Set和WeakSet',
                '011-Map和WeakMap',
                '012-Promise',
                '013-手写Promise',
                '014-Decorator装饰器',
                '015-对象的新增方法',
                '016-Number-Math和数值的扩展',
            ],
            '/doc/js/': [
                '',
                '001-对象原型继承',
                '002-this_call_apply_bind',
                '003-数据类型转换',
                '004-跨域',
                '005-Ajax',
                '006-函数',
                '007-作用域',
                '008-排序算法',
                '009-获取标签宽高及实例',
                '010-从输入URL到页面渲染过程',
                '013-JS数字计算精度和显示',
                '014-Web-Worker使用教程',
                '015-JS常见问题解决',
                {
                    title: 'JS代码执行机制和事件循环',
                    // collapsable: false,
                    children: [
                        // 'jsHowWork/',
                        'jsHowWork/JS在浏览器中运行机制和事件循环',
                        'jsHowWork/JS代码在nodejs环境下执行机制和事件循环',
                        'jsHowWork/JS中异步方法',
                        'jsHowWork/EventLoop和浏览器渲染-帧动画-空闲回调的关系',
                    ]
                },
                {
                    title: '高级',
                    // collapsable: false,
                    children: [
                        'advanced/001-ES6模块import_export',
                        'advanced/002-错误处理try_catch',
                        'advanced/003-常用的代码片段',
                        'advanced/004-轮播代码实现',
                        'advanced/005-浏览器兼容',
                        'advanced/006-手机端页面开发',
                        'advanced/007-SEO搜索引擎优化',
                        'advanced/008-前端数据模拟Mock',
                        'advanced/009-JS中的垃圾回收和内存泄露',
                        'advanced/010-moment时间插件使用说明',
                        'advanced/011-react项目搭建',
                        'advanced/012-vue项目搭建',
                    ]
                },
                {
                    title: '文章',
                    // collapsable: false,
                    children: [
                        'blog/001-JS常用的60余种工具方法',
                        'blog/002-js数据类型判断',
                        'blog/003-js开启摄像头照相人脸识别',
                        'blog/004-浏览器控制台反调试',
                    ]
                },
                {
                    title: '浏览器模型',
                    children: [
                        'browserModel/001-storage接口',
                    ]
                },
            ],
            
            '/doc/dom/': [
                '',
                '001-节点的类型',
                '002-节点的关系',
                '003-节点的操作',
                '004-动态集合NodeLIst-HTMLCollection',
                '005-Element',
                '006-Node',
                '007-Element对象',
                '008-document对象',
                '009-事件模型',
                '010-事件种类',
            ],

            // 浏览器、网络相关
            '/doc/browserNetwork/': [
                '',
                '001-cookie',
                '001-URL相关操作',
                '002-cookie、session、WebStorage区别',
                '003-浏览器缓存',
                '004-http协议',
                '004-CSRF攻击',
                '005-XSS攻击',
                '006-http发展史',
                '007-http报文和请求数据大小',
                '008-http方法和状态码',
                '010-浏览器渲染过程',
                '011-Web前端性能优化',
                '012-移动H5首屏秒开优化方案',
                '013-一篇文章带你详解HTTP协议',
                '014-一篇文章带你熟悉TCP-IP协议',
                '015-HTTPS是如何保证安全的',
                '016-WebSocket介绍',
            ],

            '/doc/designPattern/':[
                ''
            ],

            '/doc/css/': [
                // '',
                '001-选择器',
                '002-transition-transform',
                '002-animation',
                '003-定位',
                '004-css兼容性',
                '005-normalize-reset',
                '006-css常用代码片段',
                '007-css一些常见效果代码',
                '008-margin外边距合并',
                '009-float浮动',
                '010-css常用属性',
                '011-css的值和单位',
                '012-css中min-max-clamp使用',
                '013-css常见问题',
                {
                    title: 'css深入浅出',
                    collapsable: false,
                    children: [
                        'depth/001-宽度与高度',
                        'depth/002-堆叠上下文',
                        'depth/003-icon全解',
                        'depth/004-移动端页面(响应式)',
                        'depth/005-Flex布局',
                        'depth/006-布局套路',
                        'depth/007-BFC',
                    ]
                },
                {
                    title: 'CSS3',
                    collapsable: false,
                    children: [
                        'css3/001-css3新属性介绍',
                        'css3/002-css3-media查询',
                    ]
                },
                {
                    title: 'less',
                    collapsable: false,
                    children: [
                        'less/001-less代码片段',
                    ]
                },
                {
                    title: 'scss',
                    collapsable: false,
                    children: [
                        'scss/001-scss语法说明',
                    ]
                },
                {
                  title: 'CSS文章',
                  collapsable: false,
                  children: [
                      'blog/001-7个关于background-image好用技巧',
                      'blog/002-隐藏元素opacity-visibility-display对比',
                      'blog/003-css关键字initial-inherit-unset区别',
                  ]
                },
            ],
            
            '/doc/html/': [
                '001-HTML5特性说明',
                '002-HTML字符实体',
                '003-html常用标签说明',
            ],

            '/doc/react/': [
                '',
                '001-react编程规范',
                '002-react常用语法',
                '003-react代码片段',
                '004-react高阶组件',
                '005-react开发遇到的问题',
                '005-react中eslint代码检查常见问题解决',
                '006-react平时注意的规范',
                '007-react生命周期',
                '008-react类型检查PropTypes',
                '009-react-Hook',
                '010-react的diff算法和性能优化',
                '011-react-Virtual-Dom',
                '012-react-fiber',
                '013-react-dnd拖动组件',
                '014-react-refs引用dom',
                '015-react的setState说明',
                '016-react中使用echarts',
                '017-render-props',
                '018-react父子组件执行顺序',
            ],

            '/doc/vue/': [
              '001-vue遇到的问题',
              '002-vue常用语法',
              '003-vue教程',
              '004-vue生命周期',
              '005-vue指令',
              '006-vue-scoped-css',
              '007-vue访问根父子组件-依赖注入',
              '008-vue知识点思维导图',
              '009-vuex使用文档',
              '010-vue-cli使用文档',
            ],

            '/doc/node/': [
              '001-express-api总结',
              '002-node中require引用缓存解决',
              '003-CommonJS规范',
              '004-AMD规范',
              '005-node环境常见问题',
            ],

            '/doc/tool/': [
              '001-webpack教程',
              '002-webpack-require.context',
              '003-Moment日期处理类库',
              '004-prettier代码格式化工具',
              '005-webpack常见问题解决',
            ],

        },
    },
}