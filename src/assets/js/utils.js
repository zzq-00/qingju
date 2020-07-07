/*
* 封装吸顶函数，需结合css实现。
*/
function ceiling (obj) {
  var ot = obj.offsetTop;
  document.onscroll = function () {
    var st = document.body.scrollTop || document.documentElement.scrollTop;
    /*
    * 在这里给obj添加一个自定义属性。className可能会影响原有的class
    */
    obj.setAttribute("data-fixed", st >= ot ? "fixed" : "");
  }
}
/*
* 写cookies
*/
function setCookie (name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
/*
* 读cookies
*/
function getCookie (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
/*
* 左补
*/
function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}
/*  初始形态
* 倒计时 endTime: 活动截止时间 standardTime： 现在的标准时间
*/
function countDown (endTime, standardTime) {
  var distance = endTime - standardTime
  var day = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor(distance / (1000 * 60 * 60) % 24);
  var minutes = Math.floor(distance / (1000 * 60) % 60);
  var seconds = Math.floor(distance / 1000 % 60);
  return {
    day: leftpad(day, 2, 0),
    hours: leftpad(hours, 2, 0),
    minutes: leftpad(minutes, 2, 0),
    seconds: leftpad(seconds, 2, 0)
  }
}

export { ceiling, setCookie, getCookie, countDown }
