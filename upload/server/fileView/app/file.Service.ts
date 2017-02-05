
import { Injectable } from '@angular/core';
import { fileInfo } from './fileInfo';
//import JsonInfo from "files.json"; 
import { Http,Response } from '@angular/http';
// Include all operators
import 'rxjs/Rx';

// Include all operators and import the Observable class
import {Observable} from 'rxjs/Observable';

// Include a particular operator
import 'rxjs/add/operator/map';


@Injectable()
export class fileService 
{
    constructor(private http: Http)
    {
    }

    videos : fileInfo[] = [];
    pdfs : fileInfo[] = [];
    others : fileInfo[] = [];

    private fileURL = "./uploads/file.json";


    getFiles(type ?: string, keyWord ?: string) : Observable<fileInfo[]>
    {
        //当都为空时，进行数据访问，并进行缓存
        if (type === undefined && keyWord === undefined)
        {
            // 进行数据的缓存，将this指针传递给extraData参数，防止出现this指针被MapSubcrict替换
            return this.http.get(this.fileURL).map(this.extractData,this).
            map(this.convertJsonToArray,this).share();
        }
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
            return this.getFilesByKeyWord(keyWord);
        }
    }

    getFilesByKeyWord(keyWord : string) : Observable<fileInfo[]>
    {
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

         return Observable.of(result);
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
        if(obj["作者"].search(key) != -1)
        {
            return true;
        }
        if(obj["备注"].search(key)!= -1)
        {
            return true;
        }
        if(obj["简介"].search(key)!= -1)
        {
            return true;
        }
        if(obj["标题"].search(key)!= -1)
        {
            return true;
        }
        if(obj["上传时间"].search(key)!= -1)
        {
            return true;
        }
        return false;
        
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
        //return Promise.reject(errMsg);
    }
}