import {HitAction} from './hitAction';
import {DamageTypes} from '../models/damageTypes';
import {Player} from '../player';
import {Combat} from '../combat';

const NAME = 'Укус вампира';
const MIN_DAMAGE = 5;
const MAX_DAMAGE = 7;
const CRIT_CHANCE = 0.2;
const CRIT_MULTIPLIER = 1.5;

const HEAL_AMOUNT = 20;

export class VampireBiteAction extends HitAction {
    constructor() {
        super(NAME, MIN_DAMAGE, MAX_DAMAGE, DamageTypes.PIERCING, CRIT_CHANCE, CRIT_MULTIPLIER);
    }

    perform(combat: Combat, player?: Player, target?: Player) {
        super.perform(combat, player, target);

        player.increaseHp(this, HEAL_AMOUNT);
    }

    modifyIncomeDamage(damage: number, type: DamageTypes) {
        return damage * 2;
    }
}