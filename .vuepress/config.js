const path = require('path');

module.exports = {
    title: '前端知识',
    description: '一个总结前端知识的文档网站',
    head: [
        ["link", { rel: "icon", href: "/logo.png" }],   // 添加网站的icon图标
        // add jquert and fancybox
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
        ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css' }]
    ],
    // 如果github Pages绑定域名，则需要把base删除，否则域名访问会失败
    // base: '/front-end-doc/',     // 仓库名字,用于github Pages 部署,
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
            {
                text: '工具',
                items: [
                    {
                        text: 'JS打包工具',
                        items: [
                            {text: 'webpack', link: '/doc/tool/webpack/'}
                        ]
                    },
                ],
            },
        ],
        // 侧边栏标题显示的层数, 0:禁用标题（headers）链接， 1：提取到 h2 的标题， 2： 同时提取 h2 和 h3 标题
        sidebarDepth: 2,
        // 侧边栏设置
        // sidebar: sidebarConfig,
        sidebar: {
            '/doc/js/standardLibrary/': [
                '',
                '001-math',
                '002-array',
                '003-object',
                '004-attributes',
            ],
            '/doc/js/': [
                '',
                'regularExpression',
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
                {
                    title: 'JS代码执行机制和事件循环',
                    collapsable: false,
                    children: [
                        // 'jsHowWork/',
                        'jsHowWork/JS在浏览器中运行机制和事件循环',
                        'jsHowWork/JS代码在nodejs环境下执行机制和事件循环',
                        'jsHowWork/JS中异步方法',
                    ]
                },
                {
                    title: '高级',
                    collapsable: false,
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
                '010-浏览器渲染过程与性能优化',
            ],

            '/doc/designPattern/':[
                ''
            ],

            '/doc/css/': [
                '',
                '001-选择器',
                '002-transition-transform',
                '002-animation',
                '003-定位',
                '004-浏览器兼容',
                '005-normalize-reset',
                '006-css常用代码片段',
                '007-scss语法说明',
                '008-外边距合并',
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
            ],
            
            '/doc/html/': [
                '001-HTML5特性说明',
                '002-HTML字符实体',
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
            ],

            '/doc/tool/webpack/': [
                '',
                '001-require.context',
            ],
            
            '/': [
                'catalog',
            ]
        },
    },
}