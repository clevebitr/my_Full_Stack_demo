// 2024年2月11日 v0.1
// xlbt
//深度绑定message模块,dark模块(cookie查询)

var wrapper = document.getElementsByClassName('wrapper')[0];//设置弹窗背景
var AUTH_TOKEN = localStorage.getItem("token");//获取缓存中的token

//当页面加载完成后执行以下函数
window.addEventListener("load", (event) => {
    //控制台显示页面加载完成
    console.log("page is fully loaded");
    checkNightMode()
    //link test 测试与服务器链接
    linktest(AUTH_TOKEN);
});

//链接测试函数
function linktest(AUTH_TOKEN){
    axios.get("http://localhost:3000/admin", {
        headers: {
            'Authorization': 'Bearer ' + AUTH_TOKEN
        },
    }).then(response => {
        //传过来的参数比较
        data = response.data
        console.log(response.data)
        if (!data.status === 200) {
            message.show({
                type: 'error',
                text: '请求失败',
                duration: 0,
                closeable: true
            });
            return false;
        }
        return data;
    }).catch(error => {
        errorobj = error.data
        //请求失败
        if (errorobj) {
            if (errorobj.status === 401) {
                // 如果状态码为401，表示未授权，Token过期等  
                message.show({
                    type: 'error',
                    text: errorobj.msg
                });
            } else {
                // 其他状态码的处理逻辑  
                console.log(error.response.data);
                message.show({
                    type: 'error',
                    text: errorobj.msg + "Code:" + errorobj.status
                });
            }
        } else if (error.request) {
            // 请求已发出，但是没有收到任何响应  
            console.log(error.request);
            message.show({
                type: 'error',
                text: "请求服务器失败",
                duration: 0,
                closeable: true
            });
        } else {
            // 在设置请求时触发了一个错误  
            console.log('Error', error.message);
            message.show({
                type: 'error',
                text: errorobj.msg
            });
        }
        console.log("请求失败")
    })
}


//邮箱格式检查函数
//用户管理使用
function H_email(email) {
    var email_reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!email_reg.test(email)) {
        H_email_bool = false;
        alert("邮箱格式不正确")
    } else {
        H_email_bool = true;
    }
}


//密码格式检查
//用户管理使用
function H_pwd(password) {
    var password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    if (!password_reg.test(password)) {
        H_pwd_bool = false;
        alert("密码格式不正确,密码长度要大于6位,由数字和字母组成")
    } else {
        H_pwd_bool = true;
    }
}

function liclick() {
    //侧边栏点击
    var itemli = document.getElementsByTagName("li");

    for (var i = 0; i < itemli.length; i++) {
        itemli[i].onclick = function (n) {
            return function () {
                switch (n) {
                    case 1:
                        location.href = "http://127.0.0.1:5500/client/src/home.html";
                        break;
                    case 2:
                        radio = new radiomsg({
                            title: "确定跳转到GitHub?",
                            tipLabel_yes: "是",
                            tipLabel_no: "否",
                            wrap: wrapper
                        });
                        radio.init();
                        // 定义处理“是”按钮点击的回调函数  
                        function github() {
                            radio.result = true;
                            console.log('用户点击了“是”');
                            setTimeout(() => {
                                location.href = "https://github.com/clevebitr/my_Full_Stack_demo";
                            }, 500);
                        }
                        addClickListenersByClassName("yes", github)
                        addClickListenersByClassName("no", handleNoClick)
                        break;
                    case 4:// 更改用户名
                        console.log("更改用户名");
                        break;
                    case 5:// 更改密码
                        console.log("更改密码");
                        break;
                    case 6://更改邮箱
                        console.log("更改邮箱");
                        break;
                    case 7://请求设置
                        console.log("请求设置");
                        break;
                    case 8://查看Token
                        console.log("查看Token");
                        if(AUTH_TOKEN){
                            message.show({
                                type: 'info',
                                text: AUTH_TOKEN,
                            });
                        }else{
                            message.show({
                                type: 'info',
                                text: "本地不存在缓存的token",
                            });
                        }
                        break;
                    case 9://测试链接
                        console.log("测试链接");
                        var data = linktest(AUTH_TOKEN);
                        if (data){
                            if (data.status == 200) {
                                message.show({
                                    type: 'success',
                                    text: '成功与服务器链接',
                                });
                            }
                        }
                        break;
                    case 11://申请管理员
                        console.log("申请管理员");
                        break;
                    case 12://用户管理
                        console.log("用户管理");
                        break;
                    case 13://后台管理
                        console.log("后台管理");
                        break;
                    case 14://链接管理
                        console.log("链接管理");
                        break;
                    case 16://明/暗模式
                        console.log("明/暗模式");
                        var info = getCookie("prefers")
                        if (info == null) {
                            message.show({
                                type: 'info',
                                text: "当前正在跟随系统设置,无法手动修改",
                            });
                        }else if(info == "true"){
                            switchNightMode()
                        }else if (info == "false"){
                            message.show({
                                type: 'info',
                                text: "当前正在跟随系统设置,无法手动修改",
                            });
                        }
                        break;
                    case 17://根据系统颜色切换明/暗模式
                        console.log("根据系统颜色切换明/暗模式");
                        prefers_mode();
                        var info = getCookie("prefers")
                        if (info == null) {
                            message.show({
                                type: 'info',
                                text: "当前正在跟随系统设置",
                            });
                        }else if(info == "true"){
                            message.show({
                                type: 'info',
                                text: "不再跟随系统设置",
                            });
                        }else if (info == "false"){
                            message.show({
                                type: 'info',
                                text: "当前正在跟随系统设置",
                            });
                        }
                        break;
                    case 19://个人资料
                        console.log("个人资料");
                        break;
                    case 20://管理个人信息
                        console.log("管理个人信息");
                        break;
                    case 21://关于
                        console.log("关于");
                        location.href = "http://127.0.0.1:5500/client/src/home_by.html";
                        break;
                    case 22://反馈
                        console.log("反馈");
                        break;
                    case 23://参考文件
                        console.log("参考文件");
                        break;
                    case 24://关于作者
                        console.log("关于作者");
                        break;
                    case 25://退出登录
                        console.log("退出登录");
                        radio = new radiomsg({
                            title: "确定退出登录？",
                            tipLabel_yes: "是",
                            tipLabel_no: "否",
                            wrap: wrapper
                        });
                        radio.init();
                        // 定义处理“是”按钮点击的回调函数  
                        function outlogin() {
                            radio.result = true;
                            console.log('用户点击了“是”');
                            localStorage.removeItem("token");
                            AUTH_TOKEN = ''; 
                            setTimeout(() => {
                                location.href = "http://127.0.0.1:5500/client/src/index.html";
                            }, 500);
                        }
                        addClickListenersByClassName("yes", outlogin)
                        addClickListenersByClassName("no", handleNoClick)
                        break;
                }
            }
        }(i)
    }
}

//弹窗

// 定义处理“否”按钮点击的回调函数  
function handleNoClick() {
    setTimeout(() => {
        radio.hide();
    }, 500);
    console.log('用户点击了“否”');
}
// 封装添加点击事件监听器的函数  
function addClickListenersByClassName(className, callback) {
    document.querySelectorAll(`.${className}`).forEach(function (button) {
        button.addEventListener('click', callback);
    });
}  