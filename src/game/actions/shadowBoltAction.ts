import {HitAction} from './hitAction';
import {DamageTypes} from '../models/damageTypes';

const NAME = 'Стрела тьмы';
const MIN_DAMAGE = 20;
const MAX_DAMAGE = 30;
const CRIT_CHANCE = 0;
const CRIT_MULTIPLIER = 1;
const COOLDOWN = 6;
const CHARGES = 1;

export class ShadowBoltAction extends HitAction {
    constructor() {
        super(NAME, MIN_DAMAGE, MAX_DAMAGE, DamageTypes.SHADOW, CRIT_CHANCE, CRIT_MULTIPLIER, COOLDOWN, CHARGES);

        this.charges = 0;
    }
}