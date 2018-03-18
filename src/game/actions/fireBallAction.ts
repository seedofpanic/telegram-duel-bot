import {HitAction} from './hitAction';
import {Player} from '../player';
import {BurningDotEffect} from '../effects/burningDotEffect';
import {DamageTypes} from '../models/damageTypes';
import {Combat} from '../combat';

const NAME = 'Огненный шар';
const MIN_DAMAGE = 5;
const MAX_DAMAGE = 7;
const CRIT_CHANCE = 0.3;
const CRIT_MULTIPLIER = 3;

export class FireBallAction extends HitAction {
    constructor() {
        super(
            NAME,
            MIN_DAMAGE,
            MAX_DAMAGE,
            DamageTypes.FIRE,
            CRIT_CHANCE,
            CRIT_MULTIPLIER
        );
    }

    perform(combat: Combat, player?: Player, target?: Player) {
        super.perform(combat, player, target);
        target.addEffect(this, new BurningDotEffect(2, 3, 3));
    }
}