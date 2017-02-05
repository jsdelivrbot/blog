/**
 * Created by Administrator on 2016/10/28 0028.
 */
import { Component } from '@angular/core';
import { VideoComponent } from './video.component';
import { fileInfo } from './fileInfo';
import { fileService } from './file.Service';
import { OnInit } from '@angular/core';
import './rxjs-operators';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

@Component({
    selector: 'my-app',
    template: `
        <div>
        <input id="kw" #term (keyup)="search(term.value) " (focus)="enter=true" 
        (focusout)="enter=false" 
        placeholder="标题，作者，简介，备注，上传时间"/>
        <label *ngFor="let item of types">
        <input type="checkbox" [value]=item.value [checked]=item.checked [disabled]=item.disabled 
        (click)="changeState(item.value,item.checked)">
            {{item.display}}
        </label>
        <div class="search-input" *ngIf="enter">
        <div *ngFor="let file of (files|typePipe:types)" class="search-result" >
            {{file.title}} | ({{file.author}} @ {{file.uploadTime}})
        </div>
        </div>
        
        </div>
        <div>
        <Video-Info *ngFor="let file of (files|typePipe:types)" [video] = "file"></Video-Info>
        </div>
    `,
    styles: [`
    .search-input{
        border: 1px solid #ccc!important;
        width:471px;
        height:auto;
        margin-left: 9px;
        position: absolute;
        background: white;
        display:block;
        z-index:9999;
    }
    .search-result{
  border: none;
  width:465px;
  height: 20px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
  margin-left: 9px;
  font: 12px arial;
}
.search-result:hover {
      background-color: #dcdcdc;
      left: .1em;
    }
       #kw {
    width: 480px!important;
    padding-right: 50px!important;
}
#kw {
    padding: 10px 9px 10px 7px;
    border: 0;
    background-image: none;
    height: 30px;
    line-height: 20px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
#kw {
    margin-top: -6px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 9px;
}
#kw {
    font: 16px arial;
    vertical-align: top;
    outline: none;
}
    `]

})

export class AppComponent implements OnInit{

    changeState(value:string,checked:boolean) :void
    {
        //优先修改对应的checkbox的状态
        this.types.forEach(type => {
            if(type.value === value)
            {
                type.checked = !checked;
                return;
            }
        });

        //All被选中时，其他都置灰，checkbox清空
        if(value === 'All' && !checked === true)
        {
            this.types.forEach(type => {
            if(type.value !== 'All')
            {
                type.checked = false;
                type.disabled = true;
            }
        });
        }

        //All被不选中时，其他都ok
        if(value === 'All' && !checked === false)
        {
            this.types.forEach(type => {
            if(type.value !== 'All')
            {
                type.disabled = false;
            }
            if(type.value === 'video/mp4')
            {
                type.checked = true;
            }
        });
        }




    }

    types : any[] = [
    { value: 'All', display: '全部',checked:true,disabled:false },
    { value: 'video/mp4', display: '视频', checked:false,disabled:true},
    { value: 'application/pdf', display: '文档',checked:false,disabled:true },
    { value: 'other', display: '音频' ,checked:false,disabled:true}
    ];

    files : fileInfo[] = [];
    enter : boolean = false;
    //files : Observable <fileInfo[]>;
    errorMessage : string = undefined;
    private searchTermStream = new Subject<string>();

    constructor(private fileservice : fileService)
    {
        this.searchTermStream.debounceTime(500).distinctUntilChanged().
        switchMap(term => this.fileservice.getFiles(undefined,term)).subscribe(
            files => this.files = files
        );
        
    }

    ngOnInit() : void
    {
        this.fileservice.getFiles().subscribe(
                files => this.files = files,
            error => this.errorMessage = <any>error
        );
        
    }

    
    
    search(term: string) 
    { 
        this.searchTermStream.next(term); 
    }



    // search (term: string) {
    //     this.fileservice.getFiles(undefined,term).subscribe(
    //             files => this.files = files,
    //         error => this.errorMessage = <any>error
    //     );
    //}

 };
 

