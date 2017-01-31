import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router'



@NgModule({
    imports:      [ BrowserModule,
    FormsModule,
     ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
})


export class AppModule {
    
 }


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
