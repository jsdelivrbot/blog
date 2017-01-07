document.write("<script language=javascript src=''></script>");
new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","https://rawgit.com/wenbaofu/blog/master/search/hilitor-utf8.js");
document.body.appendChild(new_element);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "": decodeURIComponent(results[1]);
}

var myHilitor; // global variable
document.addEventListener("DOMContentLoaded", function(e) {
    myHilitor = new Hilitor();
    var querystring = getParameterByName("query");
    myHilitor.apply(querystring);
  }, false);




