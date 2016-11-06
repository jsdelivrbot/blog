import { Component, Input } from '@angular/core';
import { Hero } from './hero'

@Component({
    selector: 'my-hero-detail',
    template: `
    <div *ngIf="hero">
        <h1>{{title}}</h1>
        <h2>{{hero.name}}</h2>
        <div>
            <label >id:</label>{{hero.id}}
        </div>
        <div>
            <label >name:</label>
            <input [(ngModel)] = "hero.name">
        </div>
    </div>
    `
})

export class HeroDetailComponent{
    @Input()
    hero : Hero = {id : 1,name : "wenbaofu"};
}