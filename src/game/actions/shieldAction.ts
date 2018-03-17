import {HitAction} from './hitAction';
import {DamageTypes} from '../models/damageTypes';
import {Player} from '../player';
import {StunEffect} from '../effects/stunEffect';
import {CuttingEffect} from '../effects/cuttingEffect';

export class ShieldAction extends HitAction {
    constructor() {
        super(3, 9, DamageTypes.BLUNT, 0, 1, 2);
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