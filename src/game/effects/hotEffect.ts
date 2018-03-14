import {Effect} from '../effect';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {Game} from '../game';

export class HotEffect extends Effect {
    constructor(private minHeal: number,
                private maxHeal: number,
                private type: DamageTypes,
                roundsCount: number,
    ) {
        super(roundsCount);
    }

    tick(player: Player): boolean {
        player.increaseHp(Game.calcDamage(this.minHeal, this.maxHeal));
        return super.tick(player);
    }
}