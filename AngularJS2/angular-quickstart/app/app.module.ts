import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule} from '@angular/forms'
import { HeroDetailComponent} from './hero-detail.component'
import { HeroComponent } from './hero.component'
import { HeroService } from './hero.service'
import { RouterModule } from '@angular/router'



@NgModule({
    imports:      [ BrowserModule,
    FormsModule,
    RouterModule.forRoot([
            {
                path : 'heroes',
                component : HeroComponent
            }
        ])
     ],
    declarations: [ AppComponent,
                    HeroDetailComponent,
                    HeroComponent ],
    bootstrap:    [ AppComponent ],
    providers :   [HeroService]
})


export class AppModule {
    
 }


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
