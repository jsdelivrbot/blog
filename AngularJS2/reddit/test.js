document.write("<script language=javascript src='https://rawgit.com/GerHobbelt/hilitor/master/hilitor-utf8.js'></script>");

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
    alert(querystring);
    myHilitor.apply(querystring);
  }, false);

