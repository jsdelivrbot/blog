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
        <input id="kw" #term (keyup)="search(term.value) " (focus)="enter=true" (focusout)="enter=false"/>
        <label *ngFor="let item of types">
        <input type="radio" disabled name="options">
            {{item}}
        </label>
        <div class="search-input" *ngIf="enter">
        <div *ngFor="let file of files" class="search-result" >
            {{file.title}} | ({{file.author}} @ {{file.uploadTime}})
        </div>
        </div>
        
        </div>
        <div>
        <Video-Info *ngFor="let file of files" [video] = "file"></Video-Info>
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

    types : string[] = ["全部","视频","文档","其他"];
    
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
 

