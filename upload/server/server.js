var express = require('express');
var app = express();
var path = require("path");
var upload = require("./multerUtils");
var log4js = require("log4js");
var log4js_config = require("./logger.json");
log4js.configure(log4js_config);
var fs = require('fs');

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
    logger.info('文件的新名字为：%s', file.filename);
    logger.info('文件保存路径：%s', file.path);

    next();
});


function getFileContent(jsonPath,callback) { 
    fs.readFile(jsonPath, function (err, data) {
            //当读取异常时，可能是文件不存在，设置初始状态
            var storeJsonData;
            if(!err)
            {
                storeJsonData = JSON.parse(data);
                logger.info("read " + jsonPath + " successfully:" + data);
                callback(storeJsonData);
                return;
            }

            if(err.code == 'ENOENT')
            {
                logger.error("read " + jsonPath + " error:" + err);
                storeJsonData = {"fileInfos":[]};
                callback(storeJsonData);
            }
            else
            {
                logger.error("read " + jsonPath + " error:" + err);
            }
        }
    );
}


function saveData(jsonPath,req)
{
    getFileContent(jsonPath,function(data)
    {
        //将当前获取到的信息保存到读出来的信息中
        var jsonData = req.body;
        jsonData["服务器存储文件名"] = req.file.filename;
        data.fileInfos.push(jsonData);
        fs.writeFile(jsonPath,JSON.stringify(data),function(err)
        {
            if(err)
            {
                logger.error("write into " + jsonPath + " error:" + err);
            }
            else
            {
                logger.info("write into " + jsonPath + " successfully:" + JSON.stringify(data));
            }
        });
    });
}    
//获取客户端的信息并输出到json文件中

app.post('/file', function(req, res, next){
    var jsonPath = path.resolve("./uploads/file.json");
    saveData(jsonPath,req);
    next();
});

app.post('/file', function(req, res){
  //var json = { error: '文件有问题' };
  var json = {};
  var str = JSON.stringify(json);
  res.send(str);
  
});
app.listen(3000);