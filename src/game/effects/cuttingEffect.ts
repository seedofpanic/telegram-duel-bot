import {DotEffect} from './dotEffect';
import {DamageTypes} from '../models/damageTypes';

const NAME = 'Кровотечение';

export class CuttingEffect extends DotEffect {
    constructor(minDamage: number,
                maxDamage: number,
                type: DamageTypes,
                roundsCount: number,) {
        super(NAME, minDamage, maxDamage, type, roundsCount);
    }
}