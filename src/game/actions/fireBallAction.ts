import {HitAction} from './hitAction';
import {Player} from '../player';
import {BurningDotEffect} from '../effects/burningDotEffect';
import {DamageTypes} from '../models/damageTypes';

const MIN_DAMAGE = 5;
const MAX_DAMAGE = 7;
const CRIT_CHANCE = 0.3;
const CRIT_MULTIPLIER = 3;

export class FireBallAction extends HitAction {
    constructor() {
        super(
            MIN_DAMAGE,
            MAX_DAMAGE,
            DamageTypes.FIRE,
            CRIT_CHANCE,
            CRIT_MULTIPLIER
        );
    }

    perform(player: Player, target: Player): void {
        super.perform(player, target);
        target.addEffect(new BurningDotEffect(2, 3, 3));
    }
}