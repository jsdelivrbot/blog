//引入文件处理模块
var multer  = require('multer');

var storage = multer.diskStorage({
    //设置上传后文件路径，需要手动创建。
    destination: function (req, file, cb) {
        //根据不同的文件类型，存储到不同的目录中
        if (file.mimetype === "application/pdf")
        {
            cb(null, "./uploads/pdf")
        }
        else if ((file.mimetype === "video/mp4"))
        {
            cb(null, "./uploads/video")
        }
        else
        {
            cb(null,"./uploads/other");
        }
        
    }, 
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        // var fileFormat = (file.originalname).split(".");
        // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        cb(null,file.originalname);
    }
});

//添加配置文件到muler对象。
var upload = multer({
    storage: storage
});

module.exports = upload;