import {HitAction} from './hitAction';
import {Player} from '../player';
import {BurningDotEffect} from '../effects/burningDotEffect';
import {DamageTypes} from '../models/damageTypes';

const MIN_DAMAGE = 3;
const MAX_DAMAGE = 9;
const CRIT_CHANCE = 0.1;
const CRIT_MULTIPLIER = 1.5;

export class FrostArrowAction extends HitAction {
    private mod = 1;

    constructor() {
        super(
            MIN_DAMAGE,
            MAX_DAMAGE,
            DamageTypes.FROST,
            CRIT_CHANCE,
            CRIT_MULTIPLIER
        );
    }

    perform(player: Player, target: Player) {
        const oldEffects = target.effects;

        target.effects = oldEffects.filter(effect => !(effect instanceof BurningDotEffect));

        this.mod = oldEffects.length - target.effects.length;

        super.perform(player, target);
    }

    protected calcDamage(): number {
        return super.calcDamage() * this.mod;
    }
}