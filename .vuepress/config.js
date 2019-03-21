module.exports = {
    title: '前端知识',
    description: '一个总结前端知识的文档网站',
    base: '/front-end-doc/',     // 仓库名字,用于github Pages 部署
    themeConfig: {
        // 导航栏设置
        nav: [
            { text: 'Home', link: '/' },                      // 根路径
            { text: 'javascript', link: '/javascript/' },
            { text: '正则表达式', link: '/javascript/regularExpression.md' },
            { text: 'JS执行流程', link: '/javascript/jsHowWork/' },
        ],
        // 侧边栏标题显示的层数
        sidebarDepth: 2,
        // 侧边栏设置
        sidebar: {
            '/javascript/': [
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
            ],
        },
    },
    // markdown: {
    //     lineNumbers: true,          // 代码块显示行号
    // },
}