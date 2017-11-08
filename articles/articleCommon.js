window.onload = function () {
    var obj = window.parent.document.getElementById("articleIframe");  //取得父页面IFrame对象
    if (obj) {
        obj.height = document.body.scrollHeight;  //调整父页面中IFrame的高度为此页面的高度
    }
}