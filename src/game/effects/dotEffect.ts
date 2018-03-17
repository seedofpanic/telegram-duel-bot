import {Effect} from '../effect';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {Game} from '../game';

export class DotEffect extends Effect {
    constructor(private minDamage: number,
                private maxDamage: number,
                private type: DamageTypes,
                roundsCount: number,
    ) {
        super(roundsCount);
    }

    tick(player: Player) {

        player.decreaseHp(Game.calcDamage(this.minDamage, this.maxDamage)
            * player.getResist(this.type));

        return super.tick(player);
    }
}