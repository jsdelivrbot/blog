import { Injectable } from '@angular/core';
import { HEROS } from './mock-heroes'
import { Hero } from './hero'

@Injectable()
export class HeroService {
    getHeroes() : Promise<Hero[]> {
        return Promise.resolve(HEROS) ;
    }
}