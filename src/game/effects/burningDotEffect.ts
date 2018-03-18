import {DotEffect} from './dotEffect';
import {DamageTypes} from '../models/damageTypes';

const NAME = 'Горение';

export class BurningDotEffect extends DotEffect {
    constructor(minDamage: number,
                maxDamage: number,
                roundsCount: number) {
        super(NAME, minDamage, maxDamage, DamageTypes.FIRE, roundsCount);
    }
}