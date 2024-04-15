# Client express 前端
## 概述
本项目指在exppress作为后端的情况下，轻量化部署的前端
#### 文件结构
``` tree
C:.
client
└─src
    ├─css
    |  | help.css
    |  | home.css
    |  | index.css
    |  | loading.css
    |  | message.css
    |  | register.css
    └─js
    |  | help.js
    |  | home.js
    |  | index.js
    |  | loading.js
    |  | message.js
    |  | register.js
    | help.html
    | home.html
    | index.html
    | register.html
```
### 包含文件
|   HTML   |   CSS   |Javascript|comment|
|:--------:|:-------:|:--------:|:------:|
|index.html|index.css| index.js |登录页|
|help.html |help.css | help.js  |重置密码页|
|home.html |home.css | home.js  |主页|
|register.html |register.css | register.js  |注册页|
| null|message.css | message.js  |消息模块|
| null|loading.css | loading.js  |加载动画模块|

### axios
使用axios发送请求
``` html
<script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
```

### 2024年4月12日
```
version v0.2
```

### ToDo List
- [x] 基础功能实现
    - [  ] bug修复与优化
    - [  ]性能优化 