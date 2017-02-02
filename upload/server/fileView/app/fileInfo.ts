export class fileInfo
{
    fileName : string;
    fileSize : string;
    LastModifyTime : string;
    title : string;
    author : string;
    summry : string;
    remark : string;
    storeFileName: string;
    uploadTime : string;
    uploader: string;
    fileType: string;
    prefix : string;

    constructor(json ?: Object )
    {
        if (json)
        {
            this.fileName = json["文件名"];
            this.fileSize = json["文件大小"];
            this.LastModifyTime = json["最后修改时间"];
            this.title = json["标题"];
            this.author = json["作者"];
            this.summry = (json["简介"] === undefined) ? "主人很懒，什么都没留下" :json["简介"] ;
            this.remark = (json["备注"] === undefined) ? "主人很懒，什么都没留下" : json["备注"];
            this.fileType = json["文件类型"];
            
            switch(this.fileType)
            {
                case "video/mp4":
                {
                    this.prefix = "./uploads/video/";
                    break;
                }
                case "application/pdf":
                {
                    this.prefix = "./uploads/pdf/";
                    break;
                }
                default:
                {
                    this.prefix = "./uploads/other/";
                    break;
                }
            }
            // 这个地方需要重构下
            this.storeFileName = this.prefix + json["服务器存储文件名"];
            this.uploadTime = json["上传时间"];
            this.uploader = json["上传者"];
        }
        else
        {
            this.fileName = "";
            this.fileSize = "";
            this.LastModifyTime = "";
            this.title = "";
            this.author = "";
            this.summry = "If I change the type of _possession to any[] and initialize _possession with new Array() exception is not thrown. Did I miss something?If I change the type of _possession to any[] and initialize _possession with new Array() exception is not thrown. Did I mIf I change the type of _possession to any[] and initialize _possession with new Array() exception is not thrown. Did I miss something?iss something?";
            this.remark = "主人很懒，什么都没留下";
            this.storeFileName = "";
            this.uploadTime = "";
            this.uploader = "";
            this.fileType = "";
            this.prefix = "";
        }
        
    }
};