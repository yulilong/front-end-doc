module.exports = {
    title: '前端知识',
    description: '一个总结前端知识的文档网站',
    base: '/front-end-doc/',     // 仓库名字,用于github Pages 部署
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },                      // 根路径
            { text: '正则表达式', link: '/javascript/regularExpression.md' },
          ],
    },
    markdown: {
        lineNumbers: true,          // 代码块显示行号
    },
}