// 由于 VuePress 是一个标准的 Vue 应用，你可以通过创建一个 .vuepress/enhanceApp.js 文件来做一些应用级别的配置，
// 当该文件存在的时候，会被导入到应用内部。enhanceApp.js 应该 export default 一个钩子函数，
// 并接受一个包含了一些应用级别属性的对象作为参数。你可以使用这个钩子来安装一些附加的 Vue 插件、注册全局组件，
// 或者增加额外的路由钩子等：https://v0.vuepress.vuejs.org/zh/guide/basic-config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6
function integrateGitalk (router) {
    const linkGitalk = document.createElement('link');
    linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
    linkGitalk.rel = 'stylesheet';
    document.body.appendChild(linkGitalk);
    const scriptGitalk = document.createElement('script');
    scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
    document.body.appendChild(scriptGitalk);
    var path = '';

    router.afterEach((to) => {
        if (scriptGitalk.onload) {
            setTimeout(loadGitalk, 5, to)
        } else {
            scriptGitalk.onload = () => {
                loadGitalk(to.fullPath);
            }
        }
    });

    function loadGitalk (to) {
        if (to.path !== path) {
            path = to.path;
            let commentsContainer = document.getElementById('gitalk-container');
            const $page = document.querySelector('.page');
            if (commentsContainer && $page) {
                $page.removeChild(commentsContainer)
            }
            commentsContainer = document.createElement('div');
            commentsContainer.id = 'gitalk-container';
            commentsContainer.classList.add('content');
            if ($page) {
                $page.appendChild(commentsContainer);
                if (typeof Gitalk !== 'undefined' && Gitalk instanceof Function) {
                    renderGitalk();
                }
            }
        }
    }
    function renderGitalk () {
        // 如果url路径有中文则使用decodeURIComponent，否则可以直接使用location.pathname
        const path = decodeURIComponent(location.pathname)
        const gitalk = new Gitalk({
            clientID: '2fad63f5c69905c672f6',
            clientSecret: 'a452938fa0c8dad43a6b7f353f3ef336e4e426c0',
            repo: 'front-end-doc',
            owner: 'yulilong',
            admin: ['yulilong'],
            title: path.split('/').pop() || path,
            id: path,
            language: 'zh-CN',
        });
        gitalk.render('gitalk-container');
    }
    window.loadGitalk = loadGitalk;
}

export default ({ Vue, options, router }) => {
    try {
        document && integrateGitalk(router)
    } catch (e) {
        console.error(e.message)
    }
}