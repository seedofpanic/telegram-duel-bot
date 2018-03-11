import {Action} from '../action';
import {Player} from '../player';
import {DamageTypes} from '../models/damageTypes';

export class Hit extends Action {
    constructor(public minDamage: number, public maxDamage: number, private type: DamageTypes) {
        super();
    }

    perform(player: Player, target: Player): void {
        target.decreaseHp(this.getDamage() * target.getResist(this.type));
    }

    private getDamage(): number {
        return Math.ceil(Math.random() * (this.maxDamage - this.minDamage)) + this.minDamage;
    }
}