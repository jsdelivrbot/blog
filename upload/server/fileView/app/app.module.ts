import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule} from '@angular/forms'
import { VideoComponent } from './video.component';
import { fileService } from './file.Service';
import { HttpModule,JsonpModule } from '@angular/http';   
import { TypePipe } from './type.pipe';

@NgModule({
    imports:      [ BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
     ],
    declarations: [ AppComponent,VideoComponent,TypePipe ],
    bootstrap:    [ AppComponent ],
    providers:    [fileService]
})


export class AppModule {
    
 }


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
