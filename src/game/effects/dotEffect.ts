import {Effect} from '../effect';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {Game} from '../game';

export class DotEffect extends Effect {
    constructor(name: string,
                private minDamage: number,
                private maxDamage: number,
                private type: DamageTypes,
                roundsCount: number,
    ) {
        super(name, roundsCount);
    }

    tick(player: Player) {

        player.decreaseHp(this, Game.calcDamage(this.minDamage, this.maxDamage)
            * player.getResist(this.type));

        return super.tick(player);
    }
}