import {HitAction} from './hitAction';
import {Player} from '../player';
import {BurningDotEffect} from '../effects/burningDotEffect';

export class FireBallAction extends HitAction {
    perform(player: Player, target: Player): void {
        super.perform(player, target);
        target.addEffect(new BurningDotEffect(2, 3, 3));
    }
}