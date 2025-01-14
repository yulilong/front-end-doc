#!/usr/bin/env sh

# 先执行码云Pages部署
# bash mayun.sh

echo '执行命令：git push'
git push

echo '执行命令：git push mayun'
git push mayun

echo '开始执行前端项目构建命令'
# 生成静态文件
echo '执行命令：vuepress build .'
vuepress build .

# 进入生成的文件夹
echo "执行命令：cd ./.vuepress/dist\n"
cd ./.vuepress/dist

# 发布到自定义域名
# echo "把yulilong.cn域名放到CNAME文件中"
echo 'yulilong.cn' > CNAME

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


## 新建一个分支，解决git init命令生成的默认分支名字不确定问题(旧版本是master，新版本(2.39.3)是main)
echo "执行命令：git checkout -b front-end"
git checkout -b front-end

# 发布到 GitHub Pages
echo "执行命令：git push -f git@github.com:yulilong/front-end-doc.git front-end:gh-pages"
git push -f git@github.com:yulilong/front-end-doc.git front-end:gh-pages

# 返回到上一次的工作目录
echo "回到刚才工作目录"
cd -
