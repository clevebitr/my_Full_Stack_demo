# 🎶FULLSTACK demo
## 概述
本项目为练习项目，技术很渣。而且有很多性能及安全问题。谨慎使用
这是我的第一个全栈练手项目，以后估计也会更新，有一堆问题没解决，而且主页也还没实现（懒）因为自学的缘故，想到哪就写到哪了。
包含简单的登录，注册，重置密码功能。主页目前没有实现。
## 😐前后端分离架构
前端为原生HTML+JAVASCRIPT+CSS。
后端为nodejs + express。
### 前端 原生js + axios
本人没学过vue等前端脚手架，主要是因为懒，以后有时间的话应该会换架构（flag+1）
所以就直接原生写了（确实有点麻烦，粗略看了一下vue，确实方便很多）

#### 运行：
建议使用vscode打开该项目，最好安装"Go Live"这个插件打开，方便很多。

```
    Index.html
```

使用CDN引用的Axios，因为没有项目管理，直接引入了。链接可能失效，所以平常关注一下。
``` html
    <!-- html -->
    <!-- axios cdn -->
    <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
```
### 后端 Nodejs + Express
其实Express也是现学现卖，有些东西根本没弄明白，勉强写了一个。不忙的话建议重构一下。这是本人第一次接触后端。
#### 配置运行：
1.首先，你需要安装Nodejs，因为后端使用Nodejs写的（废话） 
2.安装插件，引用了第三方中间件及插件。
|   插件名   |   版本   |说明|
|:--------:|:-------:|:--------:|
|cors|2.8.5| 跨域 |
|express-jwt |8.4.1 | 验证Token |
|jsonwebtoken |9.0.2 | 生成Token  |
|mysql2 |3.9.3 | mysql数据库  |
| nodemon|3.1.0 | 项目更改自动重启  |
| sequelize|6.37.2| 链接数据库  |
``` bash
1.    cd /FULL_STACK/server/
2.    \FULL_STACK\server> npm run dev
```