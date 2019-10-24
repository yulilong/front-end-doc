[[TOC]]

[TOC]

# react项目搭建

## 1. 安装create-react-app

安装create-react-app同时也需要安装yarn，否则在使用create-react-app创建项目的时候回失败。

```
~ npm install -g create-react-app yarn
/usr/local/bin/create-react-app -> /usr/local/lib/node_modules/create-react-app/index.js
/usr/local/bin/yarn -> /usr/local/lib/node_modules/yarn/bin/yarn.js
/usr/local/bin/yarnpkg -> /usr/local/lib/node_modules/yarn/bin/yarn.js
+ create-react-app@1.5.2
+ yarn@1.7.0
updated 2 packages in 7.901s

~ create-react-app --version	// 查看安装的版本
1.5.2
yarn -v
1.7.0
```



## 2. 使用create-react-app创建一个项目



```
~ create-react-app hello-world

Creating a new React app in /Users/user/tmp/hello-world.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts...

yarn add v1.7.0
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
info There appears to be trouble with your network connection. Retrying...
info There appears to be trouble with your network connection. Retrying...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 753 new dependencies.
info Direct dependencies
├─ react-dom@16.4.0
......
......
✨  Done in 104.42s.

Success! Created hello-world at /Users/dragon/tmp/hello-world
Inside that directory, you can run several commands:

  yarn start
    Starts the development server.

  yarn build
    Bundles the app into static files for production.

  yarn test
    Starts the test runner.

  yarn eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd hello-world
  yarn start

Happy hacking!
```



## 3. 打开创建的项目运行



```
~ cd hello-world
~ yarn start	// 或者使用 npm start

You can now view hello-world in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://172.24.70.142:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```



## 4. 打包



```
yarn build	// 或者 npm run build
yarn run v1.7.0
$ react-scripts build
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  36.71 KB  build/static/js/main.61911c33.js
  299 B     build/static/css/main.c17080f1.css

The project was built assuming it is hosted at the server root.
You can control this with the homepage field in your package.json.
For example, add this to build it for GitHub Pages:

  "homepage" : "http://myname.github.io/myapp",

The build folder is ready to be deployed.
You may serve it with a static server:

  yarn global add serve
  serve -s build

Find out more about deployment here:

  http://bit.ly/2vY88Kr

✨  Done in 7.87s.
```

这里打包后可以在服务器运行，如果想要在GitHub Pages显示则需要如下配置

## 5. 为GitHub Pages打包

在 package.json 里添加：

```
// react-test: github上的仓库名字， build： react项目生成的build目录
"homepage": "https://jirengu-inc.github.io/react-test/build",
```

然后再次运行打包命令：

```
~ yarn build
yarn run v1.7.0
$ react-scripts build
Creating an optimized production build...
Compiled with warnings.

./src/index.js
  Line 4:  'App' is defined but never used                    no-unused-vars
  Line 5:  'registerServiceWorker' is defined but never used  no-unused-vars

✨  Done in 6.65s.
```



## react Chrome插件

React Developer Tools

https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi