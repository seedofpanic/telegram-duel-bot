import {HitAction} from './hitAction';
import {Player} from '../player';
import {BurningDotEffect} from '../effects/burningDotEffect';
import {DamageTypes} from '../models/damageTypes';

export class FireBallAction extends HitAction {
    constructor() {
        super(5, 7, DamageTypes.FIRE, 0.3, 3);
    }

    perform(player: Player, target: Player): void {
        super.perform(player, target);
        target.addEffect(new BurningDotEffect(2, 3, 3));
    }
}