window.onload = function () {
    //alert(this.document.body.scrollHeight); //弹出当前页面的高度
    var obj = window.parent.document.getElementById("articleIframe");  //取得父页面IFrame对象
    //alert(obj.height); //弹出父页面中IFrame中设置的高度
    obj.height = document.body.scrollHeight;  //调整父页面中IFrame的高度为此页面的高度
}