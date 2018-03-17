import {DamageTypes} from '../models/damageTypes';
import {HitAction} from './hitAction';

const MIN_DAMAGE = 5;
const MAX_DAMAGE = 7;
const CRIT_CHANCE = 0.2;
const CRIT_MULTIPLIER = 2;

export class SwordAction extends HitAction {
    constructor() {
        super(
            MIN_DAMAGE,
            MAX_DAMAGE,
            DamageTypes.CUTTING,
            CRIT_CHANCE,
            CRIT_MULTIPLIER
        );
    }
}