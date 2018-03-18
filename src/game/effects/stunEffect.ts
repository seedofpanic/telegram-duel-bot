import {Effect} from '../effect';
import {Player} from '../player';
import {StunAction} from '../actions/stunAction';

const NAME = 'Оглушение';

export class StunEffect extends Effect {
    constructor(roundsCount: number) {
        super(NAME, roundsCount);
    }

    tick(player: Player): boolean {
        player.action = new StunAction();

        return super.tick(player);
    }
}