var express = require('express');
var app = express();
var path = require("path");

//直接发送index.html后，会出现css样式等找不到的问题，因为没有设置public路径
app.use(express.static(path.resolve(__dirname,"../")));

app.get('/',function(req,res)
{
    //当用户访问127.0.0.1:3000时，将上级目录的index.html返回
    //直接使用sendfile("../index.html")会出现异常，需要使用path模块解决
    res.sendfile(path.resolve("../index.html"));

}
);

app.post('/file', function(req, res){
  //var json = { error: '文件有问题' };
  var json = {};
  var str = JSON.stringify(json);
  res.send(str);
  
});
app.listen(3000);