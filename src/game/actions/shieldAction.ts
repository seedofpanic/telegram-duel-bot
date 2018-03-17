import {HitAction} from './hitAction';
import {DamageTypes} from '../models/damageTypes';
import {Player} from '../player';
import {StunEffect} from '../effects/stunEffect';
import {CuttingEffect} from '../effects/cuttingEffect';

const MIN_DAMAGE = 3;
const MAX_DAMAGE = 9;
const CRIT_CHANCE = 0;
const CRIT_MULTIPLIER = 1;
const COOLDOWN = 2;

export class ShieldAction extends HitAction {
    constructor() {
        super(
            MIN_DAMAGE,
            MAX_DAMAGE,
            DamageTypes.BLUNT,
            CRIT_CHANCE,
            CRIT_MULTIPLIER,
            COOLDOWN
        );
    }

    perform(player: Player, target: Player) {
        super.perform(player, target);

        const oldEffects = target.effects;

        target.effects = oldEffects.filter(effect => !(effect instanceof CuttingEffect));

        const mod = oldEffects.length - target.effects.length;

        if (mod > 0) {
            target.addEffect(new StunEffect(mod));
        }
    }
}