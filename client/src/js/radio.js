/**
 * type: loading 的类型，默认1
 * tipLabel: loading 内的文本，默认 loading...
 * wrap: loading 的父级
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
/* 初始化 loading 效果，在原型链上添加 init 方法 */
radiomsg.prototype.init = function () {
    this.createDom();
}
/* 创建 loading 结构 */
radiomsg.prototype.createDom = function () {
    // loading wrap的子盒子，即整个loading的内容盒子
    var radioWrapper = document.createElement('div');
    radioWrapper.className = 'container';
    var overWrapper = document.createElement('div');
    overWrapper.className = "overlay";
    // loading type对应的不同的动画
    var radioView = document.createElement('div');
    radioView.className = 'loading-view';
    // loading 内的文本标签
    var tipView = document.createElement('div');
    tipView.className = 'tip-view';
    var html = `
            <div class="view">
            <p>${this.title}</p>
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

// 对loading隐藏
radiomsg.prototype.hide = function () {
    this.wrap.removeChild(this.radioWrapper);
}
