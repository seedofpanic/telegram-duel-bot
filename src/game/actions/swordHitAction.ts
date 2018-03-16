import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {HitAction} from './hitAction';
import {DotEffect} from '../effects/dotEffect';

export class Sword extends HitAction {
    constructor(minDamage: number,
                maxDamage: number,
                type: DamageTypes,
                cooldown = 0,
                maxCharges = 1) {
        super(minDamage, maxDamage, type, cooldown, maxCharges);
    }

    perform(player: Player, target: Player): void {
        super.perform(player, target);
        target.addEffect(new DotEffect(2, 3, DamageTypes.CUTTING, 3));
    }
}