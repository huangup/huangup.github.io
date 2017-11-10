// var obj = window.parent.document.getElementById("articleIframe")  //取得父页面IFrame对象
// if (obj) {
//     obj.height = document.body.scrollHeight  //调整父页面中IFrame的高度为此页面的高度
// }
window.onload = function () {
  var obj = {
    iframeInnerHeight: document.body.scrollHeight
  }
  // window.parent.postMessage(obj, "http://localhost:8080");
  // window.parent.postMessage(obj, "http://localhost:63342");
  // window.parent.postMessage(obj, "https://huangup.github.io");
  window.parent.postMessage(obj, "http://www.huangup.top");
}
