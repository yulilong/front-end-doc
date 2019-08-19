const path = require('path');
const sidebarConfig = require('./sidebarConfig');

module.exports = {
    title: '前端知识',
    description: '一个总结前端知识的文档网站',
    head: [
        ["link", { rel: "icon", href: "/logo.png" }],   // 添加网站的icon图标
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
        // 导航栏设置
        nav: [
            { text: 'Home', link: '/' },                      // 根路径
            {
                text: 'CSS',
                items: [
                    { text: '基础', link: '/doc/css/base/' },
                    { text: 'CSS深入浅出', link: '/doc/css/depth/' },
                ],
            },
            { text: 'javascript', link: '/doc/js/' },
            { text: 'dom', link: '/doc/dom/' },
            { text: 'browser', link: '/doc/browser/' },
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
        sidebar: sidebarConfig,
    },
    // markdown: {
    //     lineNumbers: true,          // 代码块显示行号
    // },
}