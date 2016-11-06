/**
 * Created by Administrator on 2016/10/28 0028.
 */
import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    template: `   
    <h1>{{title}}</h1>
    <a routerLink="/heroes">Heroes</a>
    <router-outlet></router-outlet>

    
    `
})

export class AppComponent{
    title = 'Tour of Heroes';
 };
 

