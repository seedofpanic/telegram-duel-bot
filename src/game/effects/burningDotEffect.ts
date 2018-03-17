import {DotEffect} from './dotEffect';
import {DamageTypes} from '../models/damageTypes';

export class BurningDotEffect extends DotEffect {
    constructor(minDamage: number,
                maxDamage: number,
                roundsCount: number) {
        super(minDamage, maxDamage, DamageTypes.FIRE, roundsCount);
    }
}