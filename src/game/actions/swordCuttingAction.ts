import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {HitAction} from './hitAction';
import {CuttingEffect} from '../effects/cuttingEffect';

const MIN_DAMAGE = 5;
const MAX_DAMAGE = 7;
const CRIT_CHANCE = 0.1;
const CRIT_MULTIPLIER = 1;
const COOLDOWN = 1;
const MAX_CHARGES = 1;

const CUTTING_EFFECT_MIN_DAMAGE = 2;
const CUTTING_EFFECT_MAX_DAMAGE = 3;
const CUTTING_EFFECT_ROUNDS_COUNT = 3;

export class SwordCuttingAction extends HitAction {
    constructor() {
        super(MIN_DAMAGE, MAX_DAMAGE, DamageTypes.CUTTING, CRIT_CHANCE, CRIT_MULTIPLIER, COOLDOWN, MAX_CHARGES);
    }

    perform(player: Player, target: Player): void {
        super.perform(player, target);

        target.addEffect(new CuttingEffect(
            CUTTING_EFFECT_MIN_DAMAGE,
            CUTTING_EFFECT_MAX_DAMAGE,
            DamageTypes.CUTTING,
            CUTTING_EFFECT_ROUNDS_COUNT
        ));
    }
}