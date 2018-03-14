import {Action} from '../action';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {Game} from '../game';

export class HitAction extends Action {
    constructor(public minDamage: number, public maxDamage: number, private type: DamageTypes) {
        super();
    }

    perform(player: Player, target: Player): void {
        target.decreaseHp(Game.calcDamage(this.minDamage, this.maxDamage), this.type);
    }
}