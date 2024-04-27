/**
 * type: radio 的类型，默认1
 * tipLabel: radio 内的文本，默认 radio...
 * wrap: radio 的父级
 * 
 * @param {*} config 传入对象（含type/tipLabel/wrap）
 */
function radiomsg(config) {
    this.title = config.title || "无标题"
    this.tipLabel_yes = config.tipLabel_yes || "yes";
    this.tipLabel_no = config.tipLabel_no || "no";
    this.wrap = config.wrap || document.body;
    this.radioWrapper = null;
}
/* 初始化 radio 效果，在原型链上添加 init 方法 */
radiomsg.prototype.init = function () {
    this.createDom();
}
/* 创建 radio 结构 */
radiomsg.prototype.createDom = function () {
    // radio wrap的子盒子，即整个radio的内容盒子
    var radioWrapper = document.createElement('div');
    radioWrapper.className = 'container';
    var overWrapper = document.createElement('div');
    overWrapper.className = "overlay";
    // radio type对应的不同的动画
    var radioView = document.createElement('div');
    radioView.className = 'radio-view';
    // radio 内的文本标签
    var tipView = document.createElement('div');
    tipView.className = 'tip-view';
    var html = `
            <div class="view">
            <div class = "tip-box"><p>${this.title}</p></div>
            <div class="input-box">
                <label>
                    <input type="radio" name="yes_no">
                    <span class="yes" id="but"></span>
                    
                </label>
                <p class = "test">${this.tipLabel_yes}</p>
                <label>
                    <input type="radio" name="yes_no">
                    <span class="no" id="but"></span>
                </label>
                <p class = "test">${this.tipLabel_no}</p>
            </div>
            </div>
    `;
    radioView.innerHTML = html;

    radioWrapper.appendChild(radioView);
    radioWrapper.appendChild(overWrapper)
    this.wrap.appendChild(radioWrapper);
    this.radioWrapper = radioWrapper;
}

// 对radio隐藏
radiomsg.prototype.hide = function () {
    this.wrap.removeChild(this.radioWrapper);
}
