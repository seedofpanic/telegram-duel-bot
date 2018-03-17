import {HitAction} from './hitAction';
import {Player} from '../player';
import {BurningDotEffect} from '../effects/burningDotEffect';
import {DamageTypes} from '../models/damageTypes';

export class FrostArrowAction extends HitAction {
    private mod = 1;

    constructor() {
        super(3, 9, DamageTypes.FROST, 0.1, 1.5);
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