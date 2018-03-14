import {Effect} from '../effect';
import {Player} from '../player';
import {StunAction} from '../actions/stunAction';

export class StunEffect extends Effect {
    tick(player: Player): boolean {
        player.action = new StunAction();

        return super.tick(player);
    }
}