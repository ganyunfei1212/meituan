// 适配函数，动态给跟标签添加字体大小
//20rem为满适配
setRem();
function setRem(){
        let width = window.innerWidth;//获取屏幕的最大宽度
        let Root = window.document.querySelector("html");//获取根元素
        Root.style.fontSize = width/20+"px";//动态改变跟标签字体大小
        window.onresize = function(){
            let width = window.innerWidth;//获取屏幕的最大宽度
            Root.style.fontSize = width/20+"px";
        }
}