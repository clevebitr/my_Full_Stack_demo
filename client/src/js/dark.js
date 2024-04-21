//页面加载时根据cookie切换明/暗色模式
function checkNightMode() {
    var Mode = getCookie('DarkMode')
    var prefers = getCookie('prefers')

    // 存在暗色模式标识符，且Cookies中DarkMode值为1  
    if (Mode == 1 && prefers == "true") {
        document.body.classList.remove("night");
        console.log("mode为亮色模式,不跟据系统设置")
    }
    // 不存在暗色模式标识符或者DarkMode值不是1  
    else {//prefers为真时，不跟随系统颜色设置
        if (Mode == 0 && prefers == "true") {

            console.log("mode为暗色模式,不跟据系统设置")
            document.body.classList.add("night");
            return false;
        }
        //如果不执行上面手动设置时，就根据系统设置切换，或者标识符为空时，自动根据系统设置切换
        // 媒体查询，用户系统是否启动暗色模式  
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log("mode为暗色模式,跟据系统设置")
            document.body.classList.add("night");
            console.log(Mode)
        }
        // 媒体查询，用户系统是否启动亮色模式  
        else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            console.log("mode为亮色模式,跟据系统设置")
            document.body.classList.remove("night");
        }
        // 时间判断，是否到了夜间时间  
        else {
            var currentHour = new Date().getHours();
            if (currentHour >= 21 || currentHour < 7) {
                document.body.classList.add("night");
            } else {
                document.body.classList.remove("night");
            }
        }
    }
}


//设置cookie
function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // 设置过期时间为 days 天后  
    var expires = "; expires=" + date.toUTCString(); // 转换为 GMT 字符串  
    document.cookie = name + "=" + (value || "") + "; path=/" + expires; // 设置 cookie  
}

//查询cookie
function getCookie(cookieName) {
    const strCookie = document.cookie
    const cookieList = strCookie.split(';')

    for (let i = 0; i < cookieList.length; i++) {
        const arr = cookieList[i].split('=')
        if (cookieName === arr[0].trim()) {
            return arr[1]
        }
    }

    return ''
}

//手动切换明/暗色模式
function switchNightMode() {
    // 获取DarkMode值  
    var Mode = getCookie('DarkMode')
    var prefers = getCookie('prefers')
    if (prefers == null) {
        console.log("当前为跟随系统设置，修改无效")
        return false;
    } else if (prefers == "true") { //不跟随系统设置，可以手动设置
        // 切换暗色模式和亮色模式  
        if (Mode == null) {
            // 如果DarkMode值不存在，根据当前body的类名切换  
            if (document.body.classList.contains("night")) {
                // 当前是暗色模式，切换到亮色模式  
                document.body.classList.remove("night");
                setCookie("DarkMode", "1", 30); // 假设cookie过期时间为30天  
            } else {
                // 当前是亮色模式，切换到暗色模式  
                document.body.classList.add("night");
                setCookie("DarkMode", "0", 30); // 假设cookie过期时间为30天  
            }
        } else if (Mode == 0) {
            console.log("mode设置为亮色模式:1")
            document.body.classList.remove("night");
            setCookie("DarkMode", "1", 30); // 假设cookie过期时间为30天  
            console.log(getCookie('DarkMode'))
        } else if (Mode == 1) {
            console.log("mode设置为暗色模式:0")
            document.body.classList.add("night");
            setCookie("DarkMode", "0", 30); // 假设cookie过期时间为30天  
        }
    }else if (prefers == "false"){
        console.log("当前为跟随系统设置，修改无效")
        return false;
    }
}

//根据系统切换
function prefers_mode() {
    const prefers_data = getCookie("prefers");
    console.log(prefers_data)
    if (prefers_data == null) {//当prefers_data为空时
        //默认根据系统切换
        setCookie("prefers", "false", 30);
    } else if (prefers_data == "true") {//如果不跟据系统设置切换，就设置为true，跟随系统
        setCookie("prefers", "false", 30);
        // console.log(getCookie("prefers"))
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add("night");
            setCookie("DarkMode", "0", 30);
        }
        // 媒体查询，用户系统是否启动亮色模式  
        else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.remove("night");
            setCookie("DarkMode", "1", 30); 
        }
    } else if (prefers_data == "false") {//如果根据系统颜色切换，就设置为true，设置为不再跟随
        setCookie("prefers", "true", 30);
        // console.log(prefers_data)

        // 媒体查询，用户系统是否启动暗色模式  
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.remove("night");
            setCookie("DarkMode", "1", 30);
        }
        // 媒体查询，用户系统是否启动亮色模式  
        else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.add("night");
            setCookie("DarkMode", "0", 30);
        }
    }
}