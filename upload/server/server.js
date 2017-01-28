var express = require('express');
var app = express();
var path = require("path");
var upload = require("./multerUtils");
var log4js = require("log4js");
var log4js_config = require("./logger.json");
log4js.configure(log4js_config);

//直接发送index.html后，会出现css样式等找不到的问题，因为没有设置public路径
app.use(express.static(path.resolve(__dirname,"../")));



app.get('/',function(req,res)
{
    //当用户访问127.0.0.1:3000时，将上级目录的index.html返回
    //直接使用sendfile("../index.html")会出现异常，需要使用path模块解决
    res.sendfile(path.resolve("../index.html"));

}
);

var logger = log4js.getLogger('log_file');
app.use(log4js.connectLogger(logger , { level: log4js.levels.ALL }));

app.post('/file', upload.single('file_data'), function(req, res, next){
    
    var file = req.file;
    logger.info('文件类型：%s', file.mimetype);
    logger.info('原始文件名：%s', file.originalname);
    logger.info('文件大小：%s', file.size);
    logger.info('文件保存路径：%s', file.path);
    next();
});

app.post('/file', function(req, res){
  //var json = { error: '文件有问题' };
  var json = {};
  var str = JSON.stringify(json);
  res.send(str);
  
});
app.listen(3000);