import {HitAction} from './hitAction';
import {Player} from '../player';
import {BurningDotEffect} from '../effects/burningDotEffect';
import {DamageTypes} from '../models/damageTypes';
import {Combat} from '../combat';

const NAME = 'Ледяная стрела';
const MIN_DAMAGE = 3;
const MAX_DAMAGE = 9;
const CRIT_CHANCE = 0.1;
const CRIT_MULTIPLIER = 1.5;

export class FrostArrowAction extends HitAction {
    private mod = 1;

    constructor() {
        super(
            NAME,
            MIN_DAMAGE,
            MAX_DAMAGE,
            DamageTypes.FROST,
            CRIT_CHANCE,
            CRIT_MULTIPLIER
        );
    }

    perform(combat: Combat, player?: Player, target?: Player) {
        const oldEffects = target.effects;

        target.effects = oldEffects.filter(effect => !(effect instanceof BurningDotEffect));

        this.mod = oldEffects.length - target.effects.length;

        super.perform(combat, player, target);
    }

    protected calcDamage(): number {
        return super.calcDamage() * this.mod;
    }
}