//引入文件处理模块
var multer  = require('multer');

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//调用： var time1 = new Date().Format("yyyy-MM-dd");var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");

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
        //防止不同时间上传的相同文件相互覆盖
        cb(null, new Date().Format("yyyyMMddhhmmss") + "-" + file.originalname);
    }
});

//添加配置文件到muler对象。
var upload = multer({
    storage: storage
});

module.exports.upload = upload;
module.exports.format = Date.prototype.Format;