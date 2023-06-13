#!/usr/bin/env sh

# 先执行码云Pages部署
# bash mayun.sh

echo '开始执行部署github命令'
# 生成静态文件
echo '执行命令：vuepress build .'
vuepress build .

# 进入生成的文件夹
echo "执行命令：cd ./.vuepress/dist\n"
cd ./.vuepress/dist

# 发布到自定义域名
# echo "把yll.wiki域名放到CNAME文件中"
echo 'yll.wiki' > CNAME

# 初始化一个仓库，仅仅是做了一个初始化的操作，项目里的文件还没有被跟踪
echo "执行命令：git init\n"
git init

# 保存所有的修改
echo "执行命令：git add -A"
git add -A

# 把修改的文件提交
echo "执行命令：commit -m 'deploy'"
git commit -m 'deploy'


# 发布到码云pages-aliyun分支上，用于阿里云拉取
# echo "代码推送到码云的pages-aliyun分支，用于阿里云拉取:"
# echo "push -f https://gitee.com/dragon-li/front-end-doc.git master:pages-aliyun"
# git push -f https://gitee.com/dragon-li/front-end-doc.git master:pages-aliyun

# 发布到 GitHub Pages
echo "执行命令：git push -f git@github.com:yulilong/front-end-doc.git master:gh-pages"
git push -f git@github.com:yulilong/front-end-doc.git master:gh-pages

# 返回到上一次的工作目录
echo "回到刚才工作目录"
cd -
