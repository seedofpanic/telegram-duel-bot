import {Action} from './action';

export abstract class Character {
    abstract getHealthMax(): number;
    abstract getActions(): {[name: string]: Action};
    abstract getResists(): {[name: string]: number};
}