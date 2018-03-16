import {Action} from '../action';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';
import {Game} from '../game';

export class HitAction extends Action {
    constructor(private minDamage: number,
                private maxDamage: number,
                private type: DamageTypes,
                cooldown = 0,
                maxCharges = 1) {
        super(cooldown, maxCharges);
    }

    perform(player: Player, target: Player): void {
        target.decreaseHp(Game.calcDamage(this.minDamage, this.maxDamage), this.type);

        super.perform();
    }
}