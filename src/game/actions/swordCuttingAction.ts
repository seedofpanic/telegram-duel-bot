import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {HitAction} from './hitAction';
import {DotEffect} from '../effects/dotEffect';
import {CuttingEffect} from '../effects/cuttingEffect';

export class SwordCuttingAction extends HitAction {
    constructor() {
        super(5, 7, DamageTypes.CUTTING, 0.1, 2, 1, 1);
    }

    perform(player: Player, target: Player): void {
        super.perform(player, target);

        target.addEffect(new CuttingEffect(2, 3, DamageTypes.CUTTING, 3));
    }
}