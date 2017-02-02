
import { Injectable } from '@angular/core';
import { fileInfo } from './fileInfo';
//import JsonInfo from "files.json"; 
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class fileService 
{
    //使用单例模式，确保每次数据还能保存
    static instance: fileService;
    constructor(private http: Http)
    {
         return fileService.instance = fileService.instance || this;
    }

    videos : fileInfo[] = [];
    pdfs : fileInfo[] = [];
    others : fileInfo[] = [];

    private fileURL = "./uploads/file.json";


    getAllFiles() : Observable<fileInfo[]>
    {
        return this.http.get(this.fileURL).map(this.extractData).map(this.convertJsonToArray);
    }

    getFiles(type : string, keyWord : string) : fileInfo[]
    {
        if (type !== undefined)
        {
            //两个均不为空
            if(keyWord !== undefined)
            {

            }
            else
            {
                switch(type)
                {
                    case "全部":
                    {
                        break;
                    }
                    case "视频":
                    {
                        break;
                    }
                    case "文档":
                    {
                        break;
                    }
                    case "其他":
                    {
                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
            }
            return;
        }
        else
        {
            //只剩下keyWord不为空的场景
            let result : fileInfo[] = [];
            this.videos.forEach(video => {
                if(this.search(video,keyWord))
                {
                    result.push(new fileInfo(video));
                }
            });

            this.pdfs.forEach(pdf => {
                if(this.search(pdf,keyWord))
                {
                    result.push(new fileInfo(pdf));
                }
            });

            this.others.forEach(other => {
                if(this.search(other,keyWord))
                {
                    result.push(new fileInfo(other));
                }
            });

            return result;
        }
        
    }

    
    /**
     * 搜索该对象中是否包含用户关心的关键字
     * 
     * @private
     * @param {fileInfo} obj 待搜索对象
     * @param {string} key  被包含关键字
     * @returns {boolean} 是否包含关键字
     * 
     * @memberOf fileService
     */
    private search(obj : fileInfo, key:string) : boolean
    {
        return true;
    }

    private convertJsonToArray(files : Array<any>)
    {
        let result : Array<fileInfo> = [];
        if (files)
        {
            //files是个object {fileInfos: Object} 其中 key：filesInfos, files[key] 为 object
            Object.keys(files).forEach(key => 
            {
                let fileObject:Array<fileInfo> = [];
                fileObject = files[key];
                //fileObject Object {video: Array[2], pdf: Array[2], other: Array[2]}
                Object.keys(fileObject).forEach(
                    type => 
                    {
                        switch(type)
                        {
                            case "video":
                            {
                                this.videos = fileObject[type];
                                this.videos.forEach(file => {
                                    result.push(new fileInfo(file));
                                });
                                break;
                            }
                            case "pdf":
                            {
                                this.pdfs = fileObject[type];
                                this.pdfs.forEach(file => {
                                    result.push(new fileInfo(file));
                                });
                                break;
                            }
                            default:
                            {
                                this.others = fileObject[type];
                                this.others.forEach(file => {
                                    result.push(new fileInfo(file));
                                });
                                break;
                            }
                        }
                    }
                );
            });
        }
        return result;
    }

    private extractData(res: Response) 
    {
        let body = res.json();
        return body;
    }
    
    private handleError (error: Response | any)
    {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}