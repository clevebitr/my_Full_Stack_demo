// 2024年4月12日 v0.2
//xlbt

//定义初始检查变量
R_email_bool = false;
R_pwd_bool = false;
R1_pwd_bool = false;
R_name_bool = false;
var wrapper = document.getElementsByClassName('wrapper')[0];

//加载网页完成后将按钮设置颜色
window.onload = function(){
    document.getElementById('bth').style.backgroundColor = "#464646"
}

//成功后跳转登录
// function jump(){
//     window.location.href='http://localhost:5500/client/src/index.html';
// }

//昵称格式检查
function R_name(){
    var name = document.getElementById('R_name').value;
    var name_reg =/^[a-zA-Z0-9]{6,12}$/;
    if (!name_reg.test(name)) {
        document.getElementById('R_tips').innerHTML="昵称格式不正确"
        document.getElementById('bth').style.backgroundColor = "#464646"
        R_name_bool = false;
        return false;
    }else{
        document.getElementById('R_tips').innerHTML=""
        R_name_bool = true;
        var user = document.getElementById("R_user").value;
        var name = document.getElementById("R_name").value;
        var pasw = document.getElementById("R_pasw").value;
        if (user && name && pasw) {
            document.getElementById('bth').style.backgroundColor = "rgb(3, 182, 237)"
        }
    }
}

//邮箱格式检查
function R_email(){
    var email = document.getElementById("R_user").value;
    var email_reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (!email_reg.test(email)) {
        document.getElementById('E_tips').innerHTML="邮箱格式不正确"
        document.getElementById('bth').style.backgroundColor = "#464646"
        R_email_bool = false;
        return false;
    } else {
        document.getElementById('E_tips').innerHTML=""
        R_email_bool = true;
        var user = document.getElementById("R_user").value;
        var name = document.getElementById("R_name").value;
        var pasw = document.getElementById("R_pasw").value;
        if (name && user && pasw) {
            document.getElementById('bth').style.backgroundColor = "rgb(3, 182, 237)"
        }
    }
}

//密码格式检查
function R_pwd(){
    var pwd = document.getElementById("R_pasw").value;
    var pwd_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    if (!pwd_reg.test(pwd)) {
        document.getElementById('P_tips1').innerHTML="密码格式不正确"
        document.getElementById('bth').style.backgroundColor = "#464646"
        R_pwd_bool = false;
        return false;
    } else {
        document.getElementById('P_tips1').innerHTML=""
        R_pwd_bool = true;
    }
}

//密码一致性格式检查
function R1_pwd(){
    var pwd1 = document.getElementById("R1_pasw").value;
    var pwd1_reg = document.getElementById("R_pasw").value;
    if (pwd1_reg == pwd1) {
        document.getElementById('P_tips2').innerHTML=""
        R1_pwd_bool = true;
        var user=document.getElementById("R_pasw").value;
        if (user) {
            document.getElementById('bth').style.backgroundColor = "rgb(3, 182, 237)"
        }
    } else {
        document.getElementById('P_tips2').innerHTML="两次输入的密码不一致"
        document.getElementById('bth').style.backgroundColor = "#464646"
        R1_pwd_bool = false;
        return false;
    }
}

//注册按钮点击
function register(){
    var pwd = document.getElementById("R_pasw").value;
    var email = document.getElementById("R_user").value;
    var name = document.getElementById('R_name').value
    var info = {
        "uname":name,
        "email":email,
        "upwd":pwd,
    }

    //检查格式
    if (R_email_bool == true && R_pwd_bool == true && R1_pwd_bool == true && R_name_bool == true) {

        //loading动画
        load = new Loading({
            type: 2,
            tipLabel:"",
            wrap: wrapper
        });
        load.init();
        // localhost:3000
        //axios
        axios({
            method: 'post',
            url: 'http://39.101.78.130/user/add',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:info
        }).then(response => {
            data = response.data;
            load.hide();
            message.show({
                type: 'success',//info success loading warning error
                text: data.msg,
                // duration:0,
                // closeable:true
            });
            // setTimeout(jump(),3000)
        }).catch(error=>{
            console.log(error);
            load.hide();
            message.show({
                type: 'warning',//info success loading warning error
                text: error,
                // duration:0,
                // closeable:true
            });
        })
    } else {
        return false;
    }
}
