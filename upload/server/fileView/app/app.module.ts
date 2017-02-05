import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule} from '@angular/forms'
import { FileComponent } from './file.component';
import { fileService } from './file.Service';
import { HttpModule,JsonpModule } from '@angular/http';   
import { TypePipe } from './type.pipe';
import { EmbedChromeFix } from './file.component';

@NgModule({
    imports:      [ BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
     ],
    declarations: [ AppComponent,FileComponent,TypePipe,EmbedChromeFix],
    bootstrap:    [ AppComponent ],
    providers:    [fileService]
})


export class AppModule {
    
 }


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
