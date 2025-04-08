[[TOC]]

[TOC]

# 前端JS调用iframe中页面事件实现

在工作开发遇到了一个需求：A页面使用ifram方式嵌入B页面，B页面需要登录后才能查看，需要A页面操作B页面，自动填充账号密码，并点击登陆按钮实现自动登录

## 1. 原生JS实现

### 1.1 两个网站是同源的

A页面代码：

```html
<!DOCTYPE html>
<html>
<head> <title>父页面（A页面）</title> </head>
<body>
  <h1>父页面</h1>
  <iframe id="myIframe" src="b.html" width="400" height="200"></iframe>
  <script>
    const iframe = document.getElementById('myIframe');
    iframe.onload = function() {
      // 获取 B 页面的 document 对象
      // const bDocument = iframe.contentDocument || iframe.contentWindow.document;
      const bDocument = iframe.contentDocument;
      console.log('bDocument: ', bDocument);
      // 操作 B 页面的输入框（假设输入框的 id 为 "bInput"）
      const inputBox = bDocument.getElementById('bInput');
      inputBox.value = "来自父页面的内容";

      // 点击 B 页面的按钮（假设按钮的 id 为 "bButton"）
      const submitBtn = bDocument.getElementById('bButton');
      submitBtn.click();
    };
  </script>
</body>
</html>
```

B页面代码：

```html
<!-- B页面代码 -->
<!DOCTYPE html>
<html>
<head> <title>子页面（B页面）</title> </head>
<body>
  <h2>子页面</h2>
  <input type="text" id="bInput">
  <button id="bButton" onclick="showMessage()">点击我</button>
  <script>
    // B页面的点击处理函数
    function showMessage() {
      const inputValue = document.getElementById('bInput').value;
      alert('来自B页面的消息：' + inputValue);
    }
  </script>
</body>
</html>
```

注意要点说明：

1. **同源策略**：两个页面必须同源（协议+域名+端口一致），否则会因为浏览器安全限制无法操作DOM
2. **加载时机**：必须等待iframe加载完成后再操作，因此要监听`load`事件
3. **DOM访问**：通过`contentDocument`访问iframe的文档对象
4. **执行顺序**：父页面代码需要放在iframe元素之后，确保能获取到iframe元素

测试步骤：

1. 将两个文件保存为同目录下的A.html和B.html
2. 启动前端服务，比如`http-server` 服务(没有需要使用npm全局安装)，然后浏览器打开：http://127.0.0.1:8080/a.html
3. 你会看到自动填充了输入框并触发了B页面的alert弹窗

### 1.2 跨域的

跨域情况，需要使用postMessage API进行通信，由于跨域场景需要安全通信，代码结构会略复杂一些：

父页面（A页面）代码 - `http://a-domain.com/a.html`

```html
<!DOCTYPE html>
<html>
<head> <title>父页面（跨域示例）</title> </head>
<body>
  <h1>父页面（域：a-domain.com）</h1>
  <iframe id="myIframe" src="http://b-domain.com/b.html" width="500" height="300"></iframe>
  <script>
    const iframe = document.getElementById('myIframe');
    // 监听来自子页面的消息
    window.addEventListener('message', (event) => {
      // 安全检查：验证来源域名
      if (event.origin !== 'http://b-domain.com') return;
      console.log('收到子页面消息:', event.data);
      if (event.data.type === 'READY') {
        // 子页面加载完成后，发送操作指令
        iframe.contentWindow.postMessage({
          type: 'FILL_AND_CLICK',
          value: '跨域输入的内容'
        }, 'http://b-domain.com'); // 目标域名
      }
    });
  </script>
</body>
</html>
```

子页面（B页面）代码 - `http://b-domain.com/b.html`

```html
<!DOCTYPE html>
<html>
<head> <title>子页面（跨域示例）</title> </head>
<body>
  <h2>子页面（域：b-domain.com）</h2>
  <input type="text" id="bInput">
  <button id="bButton">点击我</button>
  <script>
    // 监听父页面的消息
    window.addEventListener('message', (event) => {
      // 安全检查：验证来源域名
      if (event.origin !== 'http://a-domain.com') return;
      const data = event.data;
      if (data.type === 'FILL_AND_CLICK') {
        // 操作本地DOM
        const input = document.getElementById('bInput');
        input.value = data.value;
        // 模拟按钮点击
        document.getElementById('bButton').click();
        // 可选：发送反馈给父页面
        event.source.postMessage({
          type: 'COMPLETED',
          value: input.value
        }, event.origin);
      }
    });
    // 通知父页面已加载完成
    window.parent.postMessage({ type: 'READY' }, 'http://a-domain.com');
    // 子页面按钮点击事件
    document.getElementById('bButton').addEventListener('click', () => {
      const inputValue = document.getElementById('bInput').value;
      alert(`子页面收到操作：${inputValue}`);
    });
  </script>
</body>
</html>
```

关键点说明

1. **通信流程**：
   - **步骤 1**：子页面加载完成后，主动发送`READY`消息通知父页面
   - **步骤 2**：父页面收到`READY`后，发送携带操作指令的消息
   - **步骤 3**：子页面执行DOM操作，并通过`postMessage`反馈结果
2. **安全措施**：
   - 双方均通过`event.origin`验证消息来源
   - `postMessage`时明确指定目标域名（第二个参数）
3. **跨域限制**：
   - 不能直接操作iframe的DOM（会报跨域错误）
   - 所有操作必须通过消息传递间接完成

测试方法

1. **模拟跨域环境**（两种方式任选其一）：

   - **本地HOSTS修改**：在本地hosts文件中添加两条记录：

     复制

     ```bash
     127.0.0.1 a-domain.com
     127.0.0.1 b-domain.com
     ```

   - **不同端口号**：用两个不同端口模拟不同域：

     - 父页面运行在`http://localhost:8000/a.html`
     - 子页面运行在`http://localhost:9000/b.html`

2. **操作效果**：

   - 打开父页面后，会自动填充子页面输入框并触发按钮点击
   - 最终会看到子页面的弹窗提示
