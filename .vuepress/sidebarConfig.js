module.exports = {
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
            ]
        },
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
        'react常用语法',
        'react代码片段',
        'react开发遇到的问题',
        '',
    ],
    '/doc/browser/': [
        '',
        '001-URL相关操作',
    ],
    '/doc/css/base/': [
        '',
        '001-Transitions-Transforms-Animation',
        '002-定位',
        '003-浏览器兼容',
        '004-normalize-reset',
    ],
    '/doc/css/depth/': [
        '',
        '001-堆叠上下文',
        '002-icon全解',
        '003-移动端页面(响应式)',
        '004-Flex布局',
        '005-布局套路',
        '006-BFC',
    ],
}