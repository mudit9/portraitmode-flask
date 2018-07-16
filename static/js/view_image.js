$(document).ready(function(){
var url_string = window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("Name");
console.log(c);

var changeImage = function () {
  document.getElementById("img").src= c;
  document.getElementById("download").href= c;
  document.getElementById("download").download = "foccused_"+c;
    };
    setTimeout(changeImage, 100);
});
