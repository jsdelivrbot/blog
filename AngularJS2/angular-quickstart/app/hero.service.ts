import { Injectable } from '@angular/core';
import { HEROS } from './mock-heroes'
import { Hero } from './hero'

@Injectable()
export class HeroService {
    getHeroes() : Promise<Hero[]> {
        return Promise.resolve(HEROS) ;
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 100)) // delay 10 seconds
            .then(() => this.getHeroes());
    }
}