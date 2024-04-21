# 🎶FULLSTACK demo
## 概述
- 本项目为练习项目，技术很渣。而且有很多性能及安全问题。谨慎使用  
- 这是我的第一个全栈练手项目，以后估计也会更新，有一堆问题没解决，而且主页也还没实现（懒）因为自学的缘故，想到哪就写到哪了。  
- 包含简单的登录，注册，重置密码功能。主页目前没有实现。
## 😐技术栈：前后端分离
1. 前端为原生HTML+JAVASCRIPT+CSS。
2. 后端为nodejs + express。


### 😗前端 原生js + axios
---
本人没学过vue等前端脚手架，主要是因为懒，以后有时间的话应该会换架构（flag+1）
所以就直接原生写了（确实有点麻烦，粗略看了一下vue，确实方便很多）
#### 运行：
- 建议使用vscode打开该项目，最好安装"Live Server"这个插件打开，方便很多。
     > Index.html

- 使用CDN引用的Axios，因为没有项目管理，直接引入了。链接可能失效，所以注意一下。
    ``` html
        <!-- html -->
        <!-- axios cdn -->
        <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script> 
   ```

 ### 😊后端 Nodejs + Express
---
其实Express也是现学现卖，有些东西根本没弄明白，勉强写了一个。不忙的话建议重构一下。这是本人第一次接触后端。
#### 配置运行：
1.首先，你需要安装Nodejs，因为后端使用Nodejs写的（废话）    
2.安装插件，引用了第三方中间件及插件。(本项目自带，一般不需要配置)
|   插件名   |   版本   |说明|
|:--------:|:-------:|:--------:|
|cors|2.8.5| 跨域 |
|express-jwt |8.4.1 | 验证Token |
|jsonwebtoken |9.0.2 | 生成Token  |
|mysql2 |3.9.3 | mysql数据库  |
| nodemon|3.1.0 | 项目更改自动重启  |
| sequelize|6.37.2| 链接数据库  |  

3.安装mysql，配置数据库
|   数据库名称   |   表   |说明|
|:--------:|:-------:|:--------:|
|onlinedb|users| 用户表 |   

4.建表   
``` sql
CREATE TABLE `users` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "用户id",
	`uname` VARCHAR(30)  DEFAULT '空' COMMENT "用户名",
	`upwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT "用户密码",
	`email` VARCHAR(50) NULL DEFAULT NULL COMMENT "用户邮箱",
	`admin` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT "管理员",
	PRIMARY KEY (`id`)
);
```

5.前往./server/model/修改 "dbcondig.js"    
```js
//创建新的sequelize实例  数据库名称⬇  用户名⬇ sql密码⬇
const DB = new Sequelize("onlinedb","root","system",{
    host:"localhost",//主机地址
    port:3306,//数据库端口号
    dialect:"mysql",//数据库类型
    pool:{
        max:5,//最大链接数量
        min:0,//最小连接数量
        idle:10000,//10秒内没有调用，释放该链接
    },define:{
        timestamps:false
    },loggong:console.log//控制台输出日志
});

```

6.运行命令
``` bash
1.    cd /FULL_STACK/server/
2.    \FULL_STACK\server> npm run dev
```

7.结束项目 "Ctrl+C"

## 前端文件结构:
```
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

## 后端文件结构:
请到tree.md查看大致结构，文件夹较多