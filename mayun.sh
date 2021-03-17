#!/usr/bin/env sh

echo '开始执行部署码云命令'

echo '删除config.js配置文件'
rm .vuepress/config.js

echo '复制符合码云的配置文件'
cp .vuepress/configMayun.js .vuepress/config.js

# 生成静态文件
echo '执行命令：vuepress build .'
vuepress build .

# 进入生成的文件夹
echo "执行命令：cd ./.vuepress/dist\n"
cd ./.vuepress/dist


# 初始化一个仓库，仅仅是做了一个初始化的操作，项目里的文件还没有被跟踪
echo "执行命令：git init\n"
git init

# 保存所有的修改
echo "执行命令：git add -A"
git add -A

# 把修改的文件提交
echo "执行命令：commit -m 'deploy'"
git commit -m 'deploy'

# 发布到码云
echo "代码推送到码云的gh-pages分支，用于部署:"
echo "git push -f https://gitee.com/dragon-li/front-end-doc.git master:gh-pages"
git push -f https://gitee.com/dragon-li/front-end-doc.git master:gh-pages

# 返回到上一次的工作目录
echo "回到刚才工作目录"
cd -
echo "恢复修改的.vuepress/config.js"
echo "git checkout .vuepress/config.js"
git checkout .vuepress/config.js

echo ""
echo "打开码云 Gitee Pages 服务，手动更新服务"
open https://gitee.com/dragon-li/front-end-doc/pages
echo ''
