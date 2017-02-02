
import { Injectable } from '@angular/core';
import { fileInfo } from './fileInfo';
//import JsonInfo from "files.json"; 
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


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

    /**
     * 该方法用于从json文件中获取符合条件的信息，不传入参数代表全量信息
     * 
     * @param {string} [type] 类型可选
     * @param {string} [keyWord] 关键字用于搜索可选
     * @returns {fileInfo[]} 返回包含所有文件的信息
     * 
     * @memberOf fileService
     */

    getFiles(type ?: string, keyWord ?: string) : Observable<fileInfo[]>
    {
        //返回全量的数据
        if (type === undefined && keyWord === undefined)
        {
            return this.http.get(this.fileURL).map(this.extractData).map(this.convertJsonToArray);
        }

        if (type !== undefined)
        {
            //两个均不为空
            if(keyWord !== undefined)
            {

            }
            else
            {

            }
        }
        else
        {
            //只剩下keyWork不为空的场景

        }
        return ;
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