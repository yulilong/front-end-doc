const path = require('path');
const sidebarConfig = require('./sidebarConfig');

module.exports = {
    title: '前端知识',
    description: '一个总结前端知识的文档网站',
    head: [
        ["link", { rel: "icon", href: "/logo.png" }],   // 添加网站的icon图标
    ],
    // 如果github Pages绑定域名，则需要把base删除，否则域名访问会失败
    base: '/front-end-doc/',     // 仓库名字,用于github Pages 部署,
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
        // 导航栏设置
        nav: [
            // 根路径
            { text: 'Home', link: '/' },
            // { text: 'javascript', link: '/doc/js/' },
            {
                text: 'javascript', 
                items: [
                    { text: 'js文档', link: '/doc/js/' },
                    { text: 'dom操作文档', link: '/doc/dom/' },
                    { text: 'network网络', link: '/doc/network/' },
                    { text: '浏览器相关', link: '/doc/browser/' },
                ],
            },
            {
                text: 'CSS',
                link: '/doc/css/'
            },
            { text: 'html', link: '/doc/html/' },
            {
                text: '工具',
                items: [
                    {
                        text: 'JS打包工具',
                        items: [
                            {text: 'webpack', link: '/doc/tool/bundle/webpack/'}
                        ]
                    },
                ],
            },
            {
                text: '前端框架',
                items: [
                    { text: 'react', link: '/doc/framework/react/' },
                ],
            },
        ],
        // 侧边栏标题显示的层数, 0:禁用标题（headers）链接， 1：提取到 h2 的标题， 2： 同时提取 h2 和 h3 标题
        sidebarDepth: 2,
        // 侧边栏设置
        // sidebar: sidebarConfig,
        sidebar: {
            '/doc/js/': [
                '',
                {
                    title: 'JS代码执行机制和事件循环',
                    children: [
                        'jsHowWork/',
                        'jsHowWork/JS在浏览器中运行机制和事件循环',
                        'jsHowWork/JS代码在nodejs环境下执行机制和事件循环',
                        'jsHowWork/JS中异步方法',
                    ]
                },
                'regularExpression',
                '001-对象_构造函数_原型链',
                '002-this_call_apply_bind',
                '003-数据类型转换',
                '004-跨域',
                '005-Ajax',
                '006-函数',
                '007-作用域',
                '008-排序算法',
                '009-获取标签宽高及实例',
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
                    ]
                },
            ],
            
            '/doc/css/': [
                // '',
                {
                    title: '基础',
                    collapsable: false,
                    children: [
                        'base/001-选择器',
                        'base/002-Transitions-Transforms-Animation',
                        'base/003-定位',
                        'base/004-浏览器兼容',
                        'base/005-normalize-reset',
                        'base/006-css常用代码片段',
                    ]
                },
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

            '/doc/network/': [
                '001-缓存',
                '002-http协议',
                '003-XSS攻击',
                '004-CSRF攻击',
            ],

            '/doc/tool/bundle/webpack/': [
                '',
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
            '/doc/framework/react/': [
                '',
                'react常用语法',
                'react代码片段',
                'react开发遇到的问题',
            ],
            '/doc/browser/': [
                '',
                '001-URL相关操作',
                '002-cookie、session、WebStorage区别',
            ],
        },
    },
    // markdown: {
    //     lineNumbers: true,          // 代码块显示行号
    // },
}