// 2024年4月12日 v0.2
// xlbt

//定义初始变量用于格式检查
var H_email_bool = false;
// var H_state_bool = false;
var H_pwd_bool = false;
var H1_pwd_bool = false;
var wrapper = document.getElementsByClassName('wrapper')[0];

function jump(){
    window.location.href='http://localhost:5500/client/src/index.html';
}

//加载完成
window.onload = function(){
    document.getElementById('loginbth').style.backgroundColor = "#464646"
}

//邮箱格式检查
function H_email(){
    var email = document.getElementById('user').value;
    var email_reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!email_reg.test(email)) {
        H_email_bool = false;
        document.getElementById('E_tips').innerHTML="邮箱格式不正确";
        document.getElementById('loginbth').style.backgroundColor = "#464646"
    } else {
        H_email_bool = true;
        document.getElementById('E_tips').innerHTML="";
        var password = document.getElementById('pasw').value;
        if (password) {
            document.getElementById('loginbth').style.backgroundColor = "rgb(3, 182, 237)";
        }
    }
}

//密码格式检查
function H_pwd(){
    var password = document.getElementById('pasw').value;
    var password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    if (!password_reg.test(password)) {
        H_pwd_bool = false;
        document.getElementById('P_tips').innerHTML="密码格式不正确";
        document.getElementById('loginbth').style.backgroundColor = "#464646"

    } else {
        H_pwd_bool = true;
        document.getElementById('P_tips').innerHTML="";
    }
}

//密码1格式检查
function H1_pwd(){
    var password = document.getElementById('pasw1').value;
    var password_reg = document.getElementById('pasw').value;
    if (password == password_reg) {
        H1_pwd_bool = true;
        document.getElementById('P1_tips').innerHTML = "";
        if (password_reg) {
            document.getElementById('loginbth').style.backgroundColor = "rgb(3, 182, 237)";
        }

    } else {
        H1_pwd_bool = false;
        document.getElementById('P1_tips').innerHTML = "两次输入的密码不一致";
        document.getElementById('loginbth').style.backgroundColor = "#464646"
    }
}

//按钮事件
function help(){
    if(H_email_bool == true && H_pwd_bool == true && H1_pwd_bool == true){
        const usrs = document.getElementById("user").value;
        const pwds = document.getElementById("pasw").value;
        var info = {
            "email":usrs,
            "upwd":pwds
        }

        //loading动画
        load = new Loading({
            type: 2,
            tipLabel:"",
            wrap: wrapper
        });
        load.init();

        axios({
            method: 'put',
            url: 'http://localhost:3000/user/update',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:info
        }).then(response => {
            data = response.data;
            if (data.code == "1002") {
                load.hide();
                message.show({
                    type: 'error',//info success loading warning error
                    text: '该用户不存在',
                    // duration:0,
                    // closeable:true
                });
                return false;
            }
            load.hide();
            localStorage.removeItem("token");
            message.show({
                type: 'sucess',//info success loading warning error
                text: '更新成功,即将跳转登录',
                // duration:0,
                // closeable:true
            });
            setTimeout(jump(),3000)
        }).catch(error=>{
            load.hide();
            console.log(error);
            message.show({
                type: 'error',//info success loading warning error
                text: '上传失败,服务器异常',
                // duration:0,
                // closeable:true
            });
        })
    }
}

function LOGININ(){
    window.location.href="index.html";
    // window.document.f.submit();
}