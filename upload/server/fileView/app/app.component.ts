/**
 * Created by Administrator on 2016/10/28 0028.
 */
import { Component } from '@angular/core';
import { VideoComponent } from './video.component';
import { fileInfo } from './fileInfo';
import { fileService } from './file.Service';
import { OnInit } from '@angular/core';
import './rxjs-operators';

@Component({
    selector: 'my-app',
    template: `
        
        <div>
        <Video-Info *ngFor="let file of files" [video] = "file"></Video-Info>
        </div>
    `

})

export class AppComponent implements OnInit{
    
    files : fileInfo[] = [];
    errorMessage : string = undefined;
    constructor(private fileservice : fileService)
    {
    }

    ngOnInit() : void
    {
        this.fileservice.getFiles().subscribe(
            files => this.files = files,
            error => this.errorMessage = <any>error 

        );
        console.log(this.files);
        //this.files = this.fileservice.getFiles();
        
    }

 };
 

