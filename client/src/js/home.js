// 2024年2月11日 v0.1
// xlbt

//-----------------------------------------定义公用变量------------------------------------------

var wrapper = document.getElementsByClassName('wrapper')[0];
var AUTH_TOKEN = localStorage.getItem("token");
var more_icon = document.getElementById("more_icon");
var more_icon_exit = document.getElementById("more_icon_exit");
var ion = document.getElementById("ion");
var settings_but = document.getElementById("settings_but");
var item = document.getElementById('sidebar')

//----------------------------------------------------------------------------------------------
//当页面加载完成后执行以下函数
window.addEventListener("load", (event) => {
    //控制台显示页面加载完成
    console.log("page is fully loaded");

    //get admin确定登录状态
    axios.get("http://localhost:3000/admin",{
        headers: {  
            'Authorization': 'Bearer ' + AUTH_TOKEN  
        },
    }).then(response=>{
        //传过来的参数比较
        data = response.data
        console.log(response.data)
        if (!data.status === 200) {
            message.show({  
                type: 'error',  
                text: '请求失败'  
            });
            return false;
        }
    }).catch(error =>{
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
                text: "请求服务器失败"
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
});


//邮箱格式检查函数
//用户管理使用
function H_email(email){
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
function H_pwd(password){
    var password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    if (!password_reg.test(password)) {
        H_pwd_bool = false;
        alert("密码格式不正确,密码长度要大于6位,由数字和字母组成")
    } else {
        H_pwd_bool = true;
    }
}


//创建新用户函数
function newuser(usr,pwd){
    if (H_email_bool ==true && H_pwd_bool ==true) {
            //调用axios库进行提交
        axios(
            {
                method: 'POST',
                url: 'http://localhost:3000/userinfo',
                data:{
                    username: usr,
                    password: pwd
                }
            }
        ).then( response => {
            alert("提交成功");
            console.log("提交成功" + response);
        })
    }
}
