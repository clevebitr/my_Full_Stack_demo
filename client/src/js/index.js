// 2024年4月12日 v0.2
//xlbt

var wrapper = document.getElementsByClassName('wrapper')[0];
var AUTH_TOKEN = localStorage.getItem("token");
var info

//加载完毕
window.onload = function(){
    // console.log('加载完毕')
    if (!AUTH_TOKEN) {
        console.log('token为空')
        document.getElementById('outbth').style.visibility = 'hidden'
        document.getElementById('loginbth').style.backgroundColor = "#464646"
    }else{
        message.show({
            type: 'success',//info success loading warning error
            text: '本地已存在token',
        });
        document.getElementById('loginbth').innerHTML = "进入"
        document.getElementById('user').style.visibility = 'hidden'
        document.getElementById('pasw').style.visibility = 'hidden'
        console.log('已有token')
    }
} 

var Xios = {  
    //post
    post(url, obj) {  
        // 设置请求超时时间  
        const timeout = 3000;  
        // 发送POST请求  
        axios.post(url, obj, {  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            timeout: timeout  
        })  
        .then(response => {  
            // 请求成功时处理响应数据 
            console.log(response.data) 
            if (response.data.code == "1002") {  
                console.log('登录失败')
                // 登录失败的处理  
                load.hide();
                message.show({  
                    type: 'error',  
                    text: '登录失败,检查账号或密码'  
                });  
            } else if (response.data.code == "1001") {  
                console.log('登录成功')
                // 登录成功的处理  
                localStorage.setItem("token", response.data.token);  
                AUTH_TOKEN = localStorage.getItem("token");  
                load.hide();
                message.show({  
                    type: 'success',  
                    text: '登录成功'  
                });  
                location.reload();
            }  
        })  
        .catch(error => {  
            // 请求失败时处理错误  
            load.hide();
            if (error.response) {
                let errorobj = error.response.data;
                // 请求已发出，服务器也响应了状态码，但是状态码不在 2xx 范围内  
                console.log(error.response.data);
                message.show({  
                    type: 'error',  
                    text: errorobj.msg
                });  
            } else if (error.request) {  
                // 请求已发出，但是没有收到任何响应  
                console.log(error.request);
                message.show({
                    type: 'error',
                    text: "请求服务器失败",
                    duration: 0,
                    closeable: true
                });
                load.hide();  
            } else {  
                // 在设置请求时触发了一个错误  
                console.log('Error', error.message);  
            }  
            console.log(error.config);  
        });  
    },
    //get
    get(url, AUTH_TOKEN) {  
        // 发送GET请求并设置Authorization头  
        axios.get(url, {  
            headers: {  
                'Authorization': 'Bearer ' + AUTH_TOKEN  
            },  
            timeout: 3000 // 设置请求超时时间  
        })  
        .then(response => {  
            // 请求成功时处理响应数据 
            load.hide();
            message.show({  
                type: 'success',  
                text: response.data.message
            }); 
        })  
        .catch(error => {  
            // 请求失败时处理错误
            load.hide();
            let errorobj = error.response.data
            if (errorobj.status) {   
                if (errorobj.status === 401) {  
                    // 如果状态码为401，表示未授权，Token过期等  
                    message.show({  
                        type: 'error',  
                        text: errorobj.msg
                    });  
                    // 隐藏和显示某些元素，重置AUTH_TOKEN等  
                    document.getElementById('outbth').style.visibility = 'hidden';  
                    document.getElementById('loginbth').style.backgroundColor = "#464646";  
                    document.getElementById('loginbth').innerHTML = "登陆";  
                    document.getElementById('user').style.visibility = 'visible';  
                    document.getElementById('pasw').style.visibility = 'visible';
                    localStorage.removeItem("token");
                    AUTH_TOKEN = ''; 
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
                message.show({
                    type: 'error',
                    text: "请求服务器失败",
                    duration: 0,
                    closeable: true
                });
                load.hide();
                return false;
            } else {  
                // 在设置请求时触发了一个错误  
                console.log('Error', error.message);
                message.show({  
                    type: 'error',  
                    text: errorobj.msg
                });   
            }  
            console.log(error.config);  
        });  
    }  
};
  
//email格式检查
function L_email(){
    var user=document.getElementById("user").value;  //读取表单数据，创建变量
    var reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if(!reg.test(user)){
        document.getElementById('E_tips').innerHTML = "邮箱格式不正确"
        E=false;
        return false;  
    }else{
        document.getElementById('E_tips').innerHTML = ""
        E=true;
        var L_pwd=document.getElementById("pasw").value;
        if (L_pwd) {
            document.getElementById('loginbth').style.backgroundColor = "rgb(3, 182, 237)"
        }
    }
}

//pwd格式检查
function L_pwd(){
    var L_pwd=document.getElementById("pasw").value;
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    if(!reg.test(L_pwd)){
        document.getElementById('P_tips').innerHTML = "密码格式不正确,6-12位,包含数字和字母"
        P=false;
        return false;  
    }else{
        document.getElementById('P_tips').innerHTML = ""
        P=true;
        var user=document.getElementById("user").value;
        if (user) {
            document.getElementById('loginbth').style.backgroundColor = "rgb(3, 182, 237)"
        }
    }
}

//按钮点击
function login() {
    //读取表单数据，创建变量
    var name=document.getElementById("user").value;
    var pass=document.getElementById("pasw").value;

    var info = {
        email:name,
        upwd:pass
    }

    //loading动画
    load = new Loading({
        type: 2,
        tipLabel:"",
        wrap: wrapper
    });
    load.init();

    //如果token不为空且账号密码为空就直接请求
    if (AUTH_TOKEN && !name && !pass) {
        Xios.get('http://localhost:3000/admin',AUTH_TOKEN)
        return false   
    }


    if(E==true && P==true){
        let url = 'http://localhost:3000/user/login';
        Xios.post(url,info);
        // Xios.get('http://localhost:3000/admin',AUTH_TOKEN)  
    }else{
        if (!name || !pass) {
            message.show({
                type: 'error',//info success loading warning error
                text: '请输入账号和密码',
                // duration:0,
                // closeable:true
            });
            load.hide();
            document.getElementById('loginbth').style.backgroundColor = "#464646"
        }
        return false;
    }
}

function outlogin(){
    //删除token
    localStorage.removeItem("token");
    document.getElementById('user').style.visibility = 'visible'
    document.getElementById('pasw').style.visibility = 'visible'
    document.getElementById('outbth').style.visibility = 'hidden'
    location.reload();
    load.hide();
}